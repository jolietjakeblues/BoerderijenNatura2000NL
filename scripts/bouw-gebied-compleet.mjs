#!/usr/bin/env node
// Bouwt een nieuw gebied volledig automatisch, van RCE-naam tot gepubliceerde
// HTML, door de bestaande genummerde stappen te combineren met directe
// HTTP-aanroepen (scripts/lib/rce-direct.mjs) in plaats van de handmatige
// rce-cho MCP-tool-stappen. Draait 07-build-landing-html.mjs NIET zelf --
// dat doe je één keer na een hele batch gebieden.
//
// Gebruik: node scripts/bouw-gebied-compleet.mjs "<Natura2000-naam>" <slug> "<Weergavenaam>"
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import { runSparql, naarPipeTekst } from './lib/rce-direct.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const [, , naam, slug, weergavenaam] = process.argv;
if (!naam || !slug || !weergavenaam) {
  console.error('Gebruik: node scripts/bouw-gebied-compleet.mjs "<Natura2000-naam>" <slug> "<Weergavenaam>"');
  process.exit(1);
}
const dir = path.join(ROOT, 'data', 'gebieden', slug);

function run(script, ...args) {
  execFileSync('node', [path.join(ROOT, 'scripts', script), ...args], { stdio: 'inherit', cwd: ROOT });
}

console.log(`\n=== ${slug}: stap 2 (prepare-gebied) ===`);
run('02-prepare-gebied.mjs', naam, slug);

console.log(`\n=== ${slug}: monumentenquery direct ophalen ===`);
const monQuery = fs.readFileSync(path.join(dir, 'rce-monumenten-query.sparql'), 'utf-8');
const monJson = await runSparql(monQuery);
fs.writeFileSync(path.join(dir, 'monumenten-raw.txt'), naarPipeTekst(monJson, ['rm', 'rmnr', 'wkt']));
console.log(`${monJson.results.bindings.length} monumenten opgehaald (voor 5km-marge-filter).`);

console.log(`\n=== ${slug}: stap 3 (classify-monumenten) ===`);
run('03-classify-monumenten.mjs', slug);

if (!fs.existsSync(path.join(dir, 'rce-functie-query.sparql'))) {
  console.log(`\n${slug}: geen monumenten binnen bereik -- pijplijn stopt hier (0-monumenten-gebied).`);
} else {
  console.log(`\n=== ${slug}: functie- en adresquery direct ophalen ===`);
  const funcQuery = fs.readFileSync(path.join(dir, 'rce-functie-query.sparql'), 'utf-8');
  const funcJson = await runSparql(funcQuery);
  fs.writeFileSync(path.join(dir, 'functie-raw.txt'), naarPipeTekst(funcJson, ['rm', 'rmnr', 'fNaam']));

  const adresQuery = fs.readFileSync(path.join(dir, 'rce-adres-query.sparql'), 'utf-8');
  const adresJson = await runSparql(adresQuery);
  fs.writeFileSync(path.join(dir, 'adres-raw.txt'), naarPipeTekst(adresJson, ['rm', 'openbareRuimte', 'huisnummer', 'postcode', 'woonplaats']));
  console.log(`functie: ${funcJson.results.bindings.length} rijen, adres: ${adresJson.results.bindings.length} rijen.`);

  console.log(`\n=== ${slug}: stap 4 (verrijk-monumenten, BAG-check) ===`);
  run('04-verrijk-monumenten.mjs', slug);
}

console.log(`\n=== ${slug}: stap 5 (build-gebied-data) ===`);
run('05-build-gebied-data.mjs', slug, weergavenaam);

console.log(`\n=== ${slug}: richtlijn direct ophalen ===`);
try {
  run('08b-fetch-richtlijn-direct.mjs', slug, naam);
  run('08-verrijk-richtlijn.mjs', slug);
} catch (e) {
  console.warn(`${slug}: richtlijn-stap overgeslagen (${e.message.split('\n')[0]})`);
}

console.log(`\n=== ${slug}: stap 6 (build-gebied-html) ===`);
run('06-build-gebied-html.mjs', slug);

console.log(`\n=== ${slug}: stap 9 (bouw-manifest) ===`);
run('09-bouw-manifest.mjs', slug);

console.log(`\n${slug}: klaar. Vergeet niet: node scripts/07-build-landing-html.mjs na de hele batch, en node scripts/validate.mjs ter controle.`);
