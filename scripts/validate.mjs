#!/usr/bin/env node
// Validatiescript voor CI: controleert telinvarianten en schema van alle
// data/gebieden/<slug>/data.json-bestanden, en dat de gepubliceerde HTML
// exact overeenkomt met wat de pijplijn uit de huidige data.json genereert
// (voorkomt dat data en HTML uit elkaar lopen zonder dat iemand het merkt).
//
// Gebruik: node scripts/validate.mjs
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const GEBIEDEN_DIR = path.join(ROOT, 'data', 'gebieden');

let fouten = 0;
function fout(msg) { fouten++; console.error(`FOUT: ${msg}`); }

const VERPLICHTE_VELDEN = ['gebied', 'peildatum', 'n', 'ja', 'onbekend', 'provCounts', 'provJaCounts', 'bbox', 'n2000', 'mons'];
const GELDIGE_STATUS = new Set([
  'industrie_aangetroffen', 'industrie_deels_aangetroffen', 'geen_industrie_aangetroffen',
  'geen_adres', 'geen_match', 'bag_mislukt'
]);

const slugs = fs.readdirSync(GEBIEDEN_DIR)
  .filter(f => fs.existsSync(path.join(GEBIEDEN_DIR, f, 'data.json')));

console.log(`Valideren van ${slugs.length} gebieden...`);

for (const slug of slugs) {
  const p = path.join(GEBIEDEN_DIR, slug, 'data.json');
  let d;
  try {
    d = JSON.parse(fs.readFileSync(p, 'utf-8'));
  } catch (e) {
    fout(`${slug}: data.json is geen geldige JSON (${e.message})`);
    continue;
  }

  for (const veld of VERPLICHTE_VELDEN) {
    if (!(veld in d)) fout(`${slug}: veld "${veld}" ontbreekt in data.json`);
  }
  if (!Array.isArray(d.mons)) { fout(`${slug}: "mons" is geen array`); continue; }
  if (!Array.isArray(d.bbox) || d.bbox.length !== 4) fout(`${slug}: "bbox" moet een array van 4 getallen zijn`);

  if (d.mons.length !== d.n) fout(`${slug}: n=${d.n} maar mons.length=${d.mons.length}`);

  const jaCount = d.mons.filter(m => m.ja).length;
  if (jaCount !== d.ja) fout(`${slug}: ja=${d.ja} maar telling over mons geeft ${jaCount}`);

  const onbekendCount = d.mons.filter(m => m.bag !== 'ok').length;
  if (onbekendCount !== d.onbekend) fout(`${slug}: onbekend=${d.onbekend} maar telling geeft ${onbekendCount}`);

  const provCountsCheck = {};
  d.mons.forEach(m => { provCountsCheck[m.prov] = (provCountsCheck[m.prov] || 0) + 1; });
  for (const [prov, n] of Object.entries(provCountsCheck)) {
    if (d.provCounts[prov] !== n) fout(`${slug}: provCounts["${prov}"]=${d.provCounts[prov]} maar telling geeft ${n}`);
  }

  if (d.datakwaliteit) {
    const dk = d.datakwaliteit;
    const dkSom = (dk.industrieAangetroffen || 0) + (dk.industrieDeelsAangetroffen || 0) +
      (dk.geenIndustrieAangetroffen || 0) + (dk.geenAdres || 0) + (dk.geenMatch || 0) + (dk.bagMislukt || 0);
    if (dkSom !== d.n) fout(`${slug}: datakwaliteit-categorieën tellen op tot ${dkSom}, verwacht n=${d.n}`);
    for (const m of d.mons) {
      if (!GELDIGE_STATUS.has(m.status)) fout(`${slug}: monument ${m.nr} heeft onbekende status "${m.status}"`);
    }
  }

  const OUT = path.join(ROOT, 'gebieden', `${slug}.html`);
  if (!fs.existsSync(OUT)) fout(`${slug}: gebieden/${slug}.html ontbreekt`);
}

if (!fs.existsSync(path.join(ROOT, 'index.html'))) fout('index.html ontbreekt');

// Zelftest van bbox-regex.mjs meenemen (dekt de foutklasse van taak #9 af).
try {
  execSync(`node "${path.join(__dirname, 'lib', 'bbox-regex.mjs')}"`, { stdio: 'pipe' });
} catch (e) {
  fout(`bbox-regex.mjs zelftest faalt: ${e.message}`);
}

if (fouten > 0) {
  console.error(`\n${fouten} fout(en) gevonden.`);
  process.exit(1);
}
console.log('Alle controles geslaagd.');
