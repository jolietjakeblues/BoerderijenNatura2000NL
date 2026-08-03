#!/usr/bin/env node
// Bouwt een dataset-release-kandidaat: een overzicht van alle gepubliceerde
// gebieden met peildatum, aantallen en een SHA-256 per data.json, plus een
// totaaltelling. Dit script tagt of publiceert zelf niets -- het bereidt
// alleen het manifestbestand voor dat bij een GitHub Release gevoegd kan
// worden (`git tag`/"Create a new release" blijven een bewuste, handmatige
// keuze van de repo-eigenaar).
//
// Gebruik: node scripts/10-bouw-release-kandidaat.mjs [versielabel]
// Schrijft: release-kandidaat.json (repo-root)
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const GEBIEDEN_DIR = path.join(ROOT, 'data', 'gebieden');

const [, , versielabel] = process.argv;

function sha256(p) {
  return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
}

let commit = null;
try { commit = execSync('git rev-parse HEAD', { cwd: ROOT, encoding: 'utf-8' }).trim(); } catch { /* geen git beschikbaar */ }

const slugs = fs.readdirSync(GEBIEDEN_DIR)
  .filter(f => fs.existsSync(path.join(GEBIEDEN_DIR, f, 'data.json')))
  .sort();

const gebieden = slugs.map(slug => {
  const p = path.join(GEBIEDEN_DIR, slug, 'data.json');
  const d = JSON.parse(fs.readFileSync(p, 'utf-8'));
  return {
    slug,
    naam: d.gebied,
    peildatum: d.peildatum,
    n: d.n,
    ja: d.ja,
    onbekend: d.onbekend,
    sha256DataJson: sha256(p)
  };
});

const kandidaat = {
  versielabel: versielabel || null,
  gegenereerdOp: new Date().toISOString(),
  commit,
  toelichting:
    'Dit bestand is een voorbereide kandidaat voor een dataset-release, geen ' +
    'gepubliceerde release zelf. Het legt het commit en de per-gebied ' +
    'aantallen/checksums vast op het moment van genereren; git tag en GitHub ' +
    'Release blijven een handmatige stap van de repo-eigenaar.',
  totaalGebieden: gebieden.length,
  totaalMonumenten: gebieden.reduce((s, g) => s + g.n, 0),
  totaalMetIndicatie: gebieden.reduce((s, g) => s + g.ja, 0),
  gebieden
};

fs.writeFileSync(path.join(ROOT, 'release-kandidaat.json'), JSON.stringify(kandidaat, null, 1));
console.log(`release-kandidaat.json geschreven: ${gebieden.length} gebieden, ${kandidaat.totaalMonumenten} monumenten totaal.`);
console.log('Dit script tagt/publiceert niets zelf -- dat blijft een handmatige keuze.');
