#!/usr/bin/env node
// Stap 3: het ruwe RCE-queryresultaat (rm | rmnr | wkt regels) parsen,
// dedupliceren, en per monument de "erin"-toets en de echte afstand tot de
// gebiedsrand berekenen (geo.mjs -- point-in-polygon incl. gaten, geen
// bounding box). Behoudt alleen erin + binnen 5 km (zie README, "Bewuste
// beperking van de huidige scope").
//
// Gebruik: node scripts/03-classify-monumenten.mjs <slug>
// Verwacht: data/gebieden/<slug>/monumenten-raw.txt (opgeslagen vanuit de
// tabelweergave die de rce-cho MCP-tool query_sparql teruggeeft voor de
// query uit stap 2).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { classifyPoint } from './lib/geo.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const [, , slug] = process.argv;
if (!slug) { console.error('Gebruik: node scripts/03-classify-monumenten.mjs <slug>'); process.exit(1); }

const dir = path.join(__dirname, '..', 'data', 'gebieden', slug);
const rawPath = path.join(dir, 'monumenten-raw.txt');
if (!fs.existsSync(rawPath)) {
  console.error(`Niet gevonden: ${rawPath}`);
  console.error('Voer eerst de query uit data/gebieden/<slug>/rce-monumenten-query.sparql uit via de rce-cho MCP-tool en sla de tabel hier op.');
  process.exit(1);
}
const { polys } = JSON.parse(fs.readFileSync(path.join(dir, 'geometrie.json'), 'utf-8'));

const raw = fs.readFileSync(rawPath, 'utf-8');
// Tolerant voor zowel de volledige tool-output (met "Gevonden: N resultaten"
// header en scheidingsstreep) als een kale "rm | rmnr | wkt"-tabel.
const lines = raw.split('\n')
  .map(l => l.trim())
  .filter(l => l.startsWith('http') && l.includes('|'));

const seen = new Set();
const mons = [];
lines.forEach(l => {
  const parts = l.split('|').map(s => s.trim());
  const rm = parts[0];
  if (seen.has(rm)) return; // eerste geometrie per monument houden (zie ook README-noot over dubbele Point-varianten per rm)
  const m = parts[2].match(/Point \(([\d.\-]+) ([\d.\-]+)\)/);
  if (!m) return;
  seen.add(rm);
  mons.push({ rm, rmid: rm.split('/').pop(), rmnr: parts[1], lon: parseFloat(m[1]), lat: parseFloat(m[2]) });
});

mons.forEach(m => {
  const { erin, distM } = classifyPoint(m.lon, m.lat, polys);
  m.erin = erin;
  m.distM = distM;
});

const pilot = mons.filter(m => m.erin || m.distM <= 5000);
fs.writeFileSync(path.join(dir, 'monumenten-geclassificeerd.json'), JSON.stringify(pilot));

console.log(`${slug}: ${mons.length} opgehaald, ${pilot.length} binnen bereik (erin of ≤ 5 km).`);

if (pilot.length === 0) {
  console.log('Geen monumenten binnen bereik -- dit gebied krijgt een pagina met 0 boerderijen (zie De Bruuk als precedent).');
  process.exit(0);
}

const values = pilot.map(m => `<${m.rm}>`).join(' ');
const functieQuery = `PREFIX ceo: <https://linkeddata.cultureelerfgoed.nl/def/ceo#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
SELECT DISTINCT ?rm ?rmnr ?fNaam WHERE {
  VALUES ?rm { ${values} }
  ?rm ceo:rijksmonumentnummer ?rmnr .
  ?rm ceo:heeftOorspronkelijkeFunctie ?fObj .
  ?fObj ceo:heeftFunctieNaam ?fC .
  ?fC skos:prefLabel ?fNaam .
  FILTER(lang(?fNaam) = "nl")
}`;
const adresQuery = `PREFIX ceo: <https://linkeddata.cultureelerfgoed.nl/def/ceo#>
SELECT DISTINCT ?rm ?openbareRuimte ?huisnummer ?postcode ?woonplaats WHERE {
  VALUES ?rm { ${values} }
  ?rm ceo:heeftBasisregistratieRelatie ?br .
  ?br ceo:heeftBAGRelatie ?bag .
  OPTIONAL { ?bag ceo:openbareRuimte ?openbareRuimte }
  OPTIONAL { ?bag ceo:huisnummer ?huisnummer }
  OPTIONAL { ?bag ceo:postcode ?postcode }
  OPTIONAL { ?bag ceo:woonplaatsnaam ?woonplaats }
}`;
fs.writeFileSync(path.join(dir, 'rce-functie-query.sparql'), functieQuery);
fs.writeFileSync(path.join(dir, 'rce-adres-query.sparql'), adresQuery);

console.log(`\nVolgende stap (handmatig, via de rce-cho MCP-tool query_sparql):`);
console.log(`  1. Voer data/gebieden/${slug}/rce-functie-query.sparql uit -> opslaan als functie-raw.txt`);
console.log(`  2. Voer data/gebieden/${slug}/rce-adres-query.sparql uit -> opslaan als adres-raw.txt`);
console.log(`  3. Draai: node scripts/04-verrijk-monumenten.mjs ${slug}`);
