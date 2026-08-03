#!/usr/bin/env node
// Stap 5: van de verrijkte monumentenlijst naar de D-databundel die de
// gebiedspagina rendert (zelfde schema als de bestaande gebieden/*.html:
// n, ja, onbekend, provCounts, provJaCounts, bbox, n2000.rings, mons[]).
//
// Gebruik: node scripts/05-build-gebied-data.mjs <slug> "<Weergavenaam>"
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { bboxOfRings, flattenRings } from './lib/geo.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const [, , slug, naam] = process.argv;
if (!slug || !naam) {
  console.error('Gebruik: node scripts/05-build-gebied-data.mjs <slug> "<Weergavenaam>"');
  process.exit(1);
}

const dir = path.join(__dirname, '..', 'data', 'gebieden', slug);

function bucket(distM, erin) {
  if (erin) return 0;
  if (distM < 250) return 1;
  if (distM < 1000) return 2;
  if (distM < 5000) return 3;
  if (distM < 25000) return 4;
  return 5;
}

const { polys } = JSON.parse(fs.readFileSync(path.join(dir, 'geometrie.json'), 'utf-8'));
const verrijkt = fs.existsSync(path.join(dir, 'monumenten-verrijkt.json'))
  ? JSON.parse(fs.readFileSync(path.join(dir, 'monumenten-verrijkt.json'), 'utf-8'))
  : [];

// Onzekerheidsstatus per monument: verder dan de simpele ja/bag-tweedeling.
// Meerdere BAG-adressen bij één monument komen vaak voor (bv. hoofdgebouw +
// bijgebouw) en zijn meestal eensluidend -- maar niet altijd: soms wijst het
// ene gematchte adres wel industriefunctie aan en het andere niet. Dat laatste
// is een echte onzekerheid die tot nu toe stilzwijgend werd weggemiddeld tot
// "ja" (ja = industrie bij minstens één adres); nu expliciet zichtbaar.
function bepaalStatus(m) {
  if (m.bagStatus === 'fout') return 'bag_mislukt';
  if (m.bagStatus === 'geen_adres') return 'geen_adres';
  if (m.bagStatus === 'geen_match_in_bbox') return 'geen_match';
  const gebruiksdoelen = (m.matched || []).map(x => (x.gebruiksdoel || '').toLowerCase().includes('industriefunctie'));
  const eenduidig = new Set(gebruiksdoelen).size <= 1;
  if (m.industrie) return eenduidig ? 'actief' : 'actief_onzeker';
  return 'niet_actief';
}

const outMons = verrijkt.map(m => {
  const addr0 = (m.addressen && m.addressen[0]) || {};
  return {
    nr: m.rmnr,
    rm: m.rm || null,
    functie: m.functie || null,
    wpl: addr0.woonplaats || null,
    straat: addr0.straat || null,
    huisnr: addr0.huisnr || null,
    prov: m.provincie,
    k: bucket(m.distM, m.erin),
    d: m.erin ? 0 : m.distM,
    erin: m.erin === true,
    afstandTotRand: m.distM,
    lon: m.lon, lat: m.lat,
    ja: m.industrie === true,
    bag: m.bagStatus || 'onbekend',
    status: bepaalStatus(m),
    addressen: m.addressen || [],
    matched: m.matched || []
  };
});

const rings = flattenRings(polys);
const monsAsRing = outMons.map(m => [m.lon, m.lat]);
const bbox = bboxOfRings([...rings, monsAsRing], 0.015);

const provCounts = {};
outMons.forEach(m => { provCounts[m.prov] = (provCounts[m.prov] || 0) + 1; });
const provJaCounts = {};
outMons.forEach(m => { if (m.ja) provJaCounts[m.prov] = (provJaCounts[m.prov] || 0) + 1; });
const onbekend = outMons.filter(m => m.bag !== 'ok').length;

const datakwaliteit = {
  actief: outMons.filter(m => m.status === 'actief').length,
  actiefOnzeker: outMons.filter(m => m.status === 'actief_onzeker').length,
  nietActief: outMons.filter(m => m.status === 'niet_actief').length,
  geenAdres: outMons.filter(m => m.status === 'geen_adres').length,
  geenMatch: outMons.filter(m => m.status === 'geen_match').length,
  bagMislukt: outMons.filter(m => m.status === 'bag_mislukt').length,
  meerdereAdressen: outMons.filter(m => m.addressen.length > 1).length
};

const D = {
  gebied: naam,
  peildatum: new Date().toISOString().slice(0, 10),
  n: outMons.length,
  ja: outMons.filter(m => m.ja).length,
  onbekend,
  provCounts, provJaCounts,
  datakwaliteit,
  bbox,
  n2000: [{ naam, rings }],
  mons: outMons
};
fs.writeFileSync(path.join(dir, 'data.json'), JSON.stringify(D));
console.log(`${slug} -> n=${D.n} ja=${D.ja} onbekend=${D.onbekend} provincies=${JSON.stringify(provCounts)}`);
console.log(`Volgende stap: node scripts/06-build-gebied-html.mjs ${slug}`);
