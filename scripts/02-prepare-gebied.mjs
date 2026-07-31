#!/usr/bin/env node
// Stap 2 van de pijplijn: voor één Natura 2000-gebied de polygonen + bbox
// uit de landelijke cache halen, en de SPARQL-query klaarzetten om
// rijksmonumentale boerderijen op te halen -- met een automatisch afgeleide
// bbox-regex (scripts/lib/bbox-regex.mjs) in plaats van een handmatig getypte
// (zie README, taak "sanity-check op de handgeschreven bbox-regex").
//
// De RCE CHO SPARQL-query zelf kan niet vanuit een los script worden
// uitgevoerd (geen publiek, sleutelloos endpoint gevonden -- zie
// scripts/README.md); dit script print de kant-en-klare query zodat die
// via de rce-cho MCP-tool (query_sparql) uitgevoerd kan worden. Sla het
// resultaat op als data/gebieden/<slug>/monumenten-raw.txt in het
// "rm | rmnr | wkt"-formaat dat de tool teruggeeft, en ga dan verder met
// stap 3 (03-classify-monumenten.mjs).
//
// Gebruik: node scripts/02-prepare-gebied.mjs "<Natura2000-naam>" <slug>
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { bboxOfRings, flattenRings } from './lib/geo.mjs';
import { pointRegexForBbox } from './lib/bbox-regex.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_DIR = path.join(__dirname, '..', 'data', 'raw');
const GEBIEDEN_DIR = path.join(__dirname, '..', 'data', 'gebieden');

const [, , naam, slug] = process.argv;
if (!naam || !slug) {
  console.error('Gebruik: node scripts/02-prepare-gebied.mjs "<Natura2000-naam>" <slug>');
  process.exit(1);
}

const n2000 = JSON.parse(fs.readFileSync(path.join(RAW_DIR, 'natura2000-nationaal.json'), 'utf-8'));
const feats = n2000.features.filter(f => f.properties.naamN2K === naam);
if (feats.length === 0) {
  console.error(`Geen gebied gevonden met naamN2K === "${naam}" in data/raw/natura2000-nationaal.json.`);
  console.error('Tip: run "node scripts/list-gebieden.mjs" voor de exacte schrijfwijze.');
  process.exit(1);
}

const polys = [];
feats.forEach(f => f.geometry.coordinates.forEach(p => polys.push(p)));
const rings = flattenRings(polys);
// 5 km selectievenster (zie README) + royale marge zodat de RCE-prefilter
// nooit een randgeval afknipt; de precieze 5km-grens wordt hierna in stap 3
// met echte afstandsberekening toegepast, dit is alleen de ruwe voorfilter.
const bboxTight = bboxOfRings(rings, 0);
const bboxMargin = 0.15; // ~15-17 km, ruim boven de 5 km selectiegrens
const regex = pointRegexForBbox(bboxTight, bboxMargin);

const outDir = path.join(GEBIEDEN_DIR, slug);
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'geometrie.json'), JSON.stringify({ naam, slug, polys, bbox: bboxTight }));

const query = `PREFIX ceo: <https://linkeddata.cultureelerfgoed.nl/def/ceo#>
PREFIX geo: <http://www.opengis.net/ont/geosparql#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
SELECT DISTINCT ?rm ?rmnr ?wkt WHERE {
  ?rm a ceo:Rijksmonument ;
      ceo:rijksmonumentnummer ?rmnr .
  ?rm ceo:heeftOorspronkelijkeFunctie ?fObj .
  ?fObj ceo:heeftFunctieNaam ?fC .
  ?fC skos:prefLabel ?fNaam .
  FILTER(lang(?fNaam) = "nl")
  FILTER(CONTAINS(LCASE(?fNaam), "boerderij"))
  ?rm ceo:heeftGeometrie ?geomObj .
  ?geomObj geo:asWKT ?wkt .
  FILTER(STRSTARTS(STR(?wkt), "Point"))
  FILTER(REGEX(STR(?wkt), "${regex}"))
}`;

fs.writeFileSync(path.join(outDir, 'rce-monumenten-query.sparql'), query);

console.log(`Gebied: ${naam} (${feats.length} polygondelen)`);
console.log(`Bbox (excl. marge): [${bboxTight.map(n => n.toFixed(4)).join(', ')}]`);
console.log(`\nOpgeslagen:`);
console.log(`  data/gebieden/${slug}/geometrie.json`);
console.log(`  data/gebieden/${slug}/rce-monumenten-query.sparql`);
console.log(`\nVolgende stap (handmatig, via de rce-cho MCP-tool query_sparql):`);
console.log(`  1. Voer de query in data/gebieden/${slug}/rce-monumenten-query.sparql uit.`);
console.log(`  2. Sla de tabelweergave (rm | rmnr | wkt) op als data/gebieden/${slug}/monumenten-raw.txt.`);
console.log(`  3. Draai: node scripts/03-classify-monumenten.mjs ${slug}`);
