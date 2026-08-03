#!/usr/bin/env node
// Stap 8 (optioneel, na stap 5): richtlijn-status (Vogelrichtlijn/Habitatrichtlijn/
// combinatie/Habitatrichtlijn groeve) plus stikstofgevoelig-vlag toevoegen aan
// een al gebouwde data.json, op basis van data/gebieden/<slug>/richtlijn-raw.txt.
// Die raw-file komt uit een handmatige RCE CHO-query op het losse
// natura2000-graph (zie scripts/README.md) en wordt hier verwerkt zonder
// nieuwe MCP-tool-aanroep.
//
// Gebruik: node scripts/08-verrijk-richtlijn.mjs <slug>
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseRichtlijnRaw, aggregeerRichtlijn } from './lib/richtlijn.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const [, , slug] = process.argv;
if (!slug) { console.error('Gebruik: node scripts/08-verrijk-richtlijn.mjs <slug>'); process.exit(1); }

const dir = path.join(__dirname, '..', 'data', 'gebieden', slug);
const rawPath = path.join(dir, 'richtlijn-raw.txt');
const dataPath = path.join(dir, 'data.json');
if (!fs.existsSync(rawPath)) { console.error(`Niet gevonden: ${rawPath}`); process.exit(1); }
if (!fs.existsSync(dataPath)) { console.error(`Niet gevonden: ${dataPath}`); process.exit(1); }

const rows = parseRichtlijnRaw(fs.readFileSync(rawPath, 'utf-8'));
const richtlijn = aggregeerRichtlijn(rows);

const D = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
D.richtlijn = richtlijn;
fs.writeFileSync(dataPath, JSON.stringify(D));

console.log(`${slug} -> ${richtlijn.label} (gebiedsnr. ${richtlijn.gebiedsnummer}), stikstofgevoelig=${richtlijn.stikstofgevoelig}`);
console.log(`Volgende stap: node scripts/06-build-gebied-html.mjs ${slug}`);
