#!/usr/bin/env node
// Alternatief voor stap 8's handmatige MCP-tool-stap: haalt de richtlijn-data
// rechtstreeks op via het RCE CHO SPARQL-endpoint (zie scripts/lib/rce-direct.mjs)
// en schrijft data/gebieden/<slug>/richtlijn-raw.txt in het formaat dat
// scripts/lib/richtlijn.mjs verwacht. Vervolgens nog steeds
// scripts/08-verrijk-richtlijn.mjs <slug> draaien om het in data.json te zetten.
//
// Gebruik: node scripts/08b-fetch-richtlijn-direct.mjs <slug> "<officiële Natura2000-naam>"
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { runSparql } from './lib/rce-direct.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const [, , slug, naam] = process.argv;
if (!slug || !naam) {
  console.error('Gebruik: node scripts/08b-fetch-richtlijn-direct.mjs <slug> "<officiële Natura2000-naam>"');
  process.exit(1);
}

const query = `PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX ceox: <https://linkeddata.cultureelerfgoed.nl/def/ceox#>
PREFIX schema: <https://schema.org/>
SELECT DISTINCT ?identifier ?s ?code ?vhnAanvulling ?siteCodeVR ?siteCodeHR ?stikstofgevoelig ?status ?wikidata WHERE {
  GRAPH <https://linkeddata.cultureelerfgoed.nl/graph/natura2000> {
    VALUES ?title { "${naam}" }
    ?s dc:title ?title ;
       dc:identifier ?identifier .
    OPTIONAL { ?s ceox:beschermingsrichtlijnCode ?code }
    OPTIONAL { ?s ceox:vhnAanvulling ?vhnAanvulling }
    OPTIONAL { ?s ceox:siteCodeVogelRichtlijn ?siteCodeVR }
    OPTIONAL { ?s ceox:siteCodeHabitatRichtlijn ?siteCodeHR }
    OPTIONAL { ?s ceox:stikstofgevoelig ?stikstofgevoelig }
    OPTIONAL { ?s ceox:natura2000Status ?status }
    OPTIONAL { ?s schema:url ?wikidata }
  }
}`;

const json = await runSparql(query);
if (json.results.bindings.length === 0) {
  console.error(`Geen richtlijn-resource gevonden voor dc:title = "${naam}" -- controleer de exacte schrijfwijze.`);
  process.exit(1);
}

const kolommen = ['identifier', 's', 'code', 'vhnAanvulling', 'siteCodeVR', 'siteCodeHR', 'stikstofgevoelig', 'status', 'wikidata'];
const regels = json.results.bindings.map(b => kolommen.map(k => (b[k] ? b[k].value : '-')).join('|'));

const dir = path.join(__dirname, '..', 'data', 'gebieden', slug);
fs.writeFileSync(path.join(dir, 'richtlijn-raw.txt'), regels.join('\n') + '\n');
console.log(`${slug}: richtlijn-raw.txt geschreven (${regels.length} deelresource(s)).`);
console.log(`Volgende stap: node scripts/08-verrijk-richtlijn.mjs ${slug}`);
