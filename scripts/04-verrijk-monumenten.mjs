#!/usr/bin/env node
// Stap 4: de handmatig opgehaalde functienaam- en adresresultaten samenvoegen
// met de geclassificeerde monumentenlijst, en dan volledig automatisch (geen
// MCP-tool meer nodig vanaf hier):
//   - functienaam opschonen (coderingen tussen haakjes afknippen, bv. "Boerderij (M)" -> "Boerderij")
//   - BAG-praktijkcheck via de open PDOK BAG-WFS (lib/bag.mjs, met retry/backoff)
//   - provincie bepalen via point-in-polygon tegen de PDOK-bestuurlijke grenzen (lib/provincie.mjs)
//
// Gebruik: node scripts/04-verrijk-monumenten.mjs <slug>
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { checkMonumentenBag } from './lib/bag.mjs';
import { findProvincie } from './lib/provincie.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const [, , slug] = process.argv;
if (!slug) { console.error('Gebruik: node scripts/04-verrijk-monumenten.mjs <slug>'); process.exit(1); }

const dir = path.join(__dirname, '..', 'data', 'gebieden', slug);
const RAW_DIR = path.join(__dirname, '..', 'data', 'raw');

function parsePipeFile(file, expectedCols) {
  const p = path.join(dir, file);
  if (!fs.existsSync(p)) { console.error(`Niet gevonden: ${p}`); process.exit(1); }
  return fs.readFileSync(p, 'utf-8').split('\n')
    .map(l => l.trim())
    .filter(l => l.startsWith('http') && l.includes('|'))
    .map(l => l.split('|').map(s => s.trim()));
}

const mons = JSON.parse(fs.readFileSync(path.join(dir, 'monumenten-geclassificeerd.json'), 'utf-8'));
const provincies = JSON.parse(fs.readFileSync(path.join(RAW_DIR, 'provincies.json'), 'utf-8'));

// functie: rm | rmnr | fNaam (kan meerdere rijen per rm hebben)
const functieMap = {};
parsePipeFile('functie-raw.txt').forEach(([rm, rmnr, fNaam]) => {
  const rmid = rm.split('/').pop();
  const clean = fNaam.replace(/\s*\([^)]*\)\s*$/, '').trim();
  if (!functieMap[rmid]) functieMap[rmid] = [];
  functieMap[rmid].push(clean);
});

// adres: rm | openbareRuimte | huisnummer | postcode | woonplaats
const adresMap = {};
parsePipeFile('adres-raw.txt').forEach(([rm, straat, huisnr, postcode, woonplaats]) => {
  const rmid = rm.split('/').pop();
  if (!adresMap[rmid]) adresMap[rmid] = [];
  adresMap[rmid].push({ straat, huisnr, postcode, woonplaats });
});

mons.forEach(m => {
  const functies = functieMap[m.rmid] || [];
  m.functie = functies.find(f => /boerderij/i.test(f)) || functies[0] || null;
  m.addressen = adresMap[m.rmid] || null;
  m.provincie = findProvincie(m.lon, m.lat, provincies);
});

console.log(`${slug}: BAG-praktijkcheck voor ${mons.length} monumenten...`);
await checkMonumentenBag(mons, (done, total) => console.log(`  ... ${done}/${total}`));

fs.writeFileSync(path.join(dir, 'monumenten-verrijkt.json'), JSON.stringify(mons));

const counts = mons.reduce((acc, m) => { acc[m.bagStatus] = (acc[m.bagStatus] || 0) + 1; return acc; }, {});
const provCounts = mons.reduce((acc, m) => { acc[m.provincie] = (acc[m.provincie] || 0) + 1; return acc; }, {});
console.log(`\nklaar: data/gebieden/${slug}/monumenten-verrijkt.json`);
console.log('bagStatus:', JSON.stringify(counts));
console.log('provincies:', JSON.stringify(provCounts));
console.log(`\nVolgende stap: node scripts/05-build-gebied-data.mjs ${slug} "<weergavenaam van het gebied>"`);
