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

const outMons = verrijkt.map(m => {
  const addr0 = (m.addressen && m.addressen[0]) || {};
  return {
    nr: m.rmnr,
    wpl: addr0.woonplaats || null,
    straat: addr0.straat || null,
    huisnr: addr0.huisnr || null,
    prov: m.provincie,
    k: bucket(m.distM, m.erin),
    d: m.erin ? 0 : m.distM,
    lon: m.lon, lat: m.lat,
    ja: m.industrie === true,
    bag: m.bagStatus || 'onbekend'
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

const D = {
  gebied: naam,
  peildatum: new Date().toISOString().slice(0, 10),
  n: outMons.length,
  ja: outMons.filter(m => m.ja).length,
  onbekend,
  provCounts, provJaCounts,
  bbox,
  n2000: [{ naam, rings }],
  mons: outMons
};
fs.writeFileSync(path.join(dir, 'data.json'), JSON.stringify(D));
console.log(`${slug} -> n=${D.n} ja=${D.ja} onbekend=${D.onbekend} provincies=${JSON.stringify(provCounts)}`);
console.log(`Volgende stap: node scripts/06-build-gebied-html.mjs ${slug}`);
