#!/usr/bin/env node
// Print alle 162 Natura 2000-gebiedsnamen zoals ze in de landelijke cache
// staan (naamN2K-veld), zodat je de exacte schrijfwijze hebt voor
// scripts/02-prepare-gebied.mjs.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n2000 = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'raw', 'natura2000-nationaal.json'), 'utf-8'));
const namen = [...new Set(n2000.features.map(f => f.properties.naamN2K))].sort();
namen.forEach(n => console.log(n));
console.error(`\n(${namen.length} gebieden totaal)`);
