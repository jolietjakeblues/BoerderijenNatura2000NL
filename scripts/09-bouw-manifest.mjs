#!/usr/bin/env node
// Stap 9 (optioneel, na 05/06/08): bouwt een herkomst-manifest per gebied dat
// vastlegt welke brondata, endpoints en handmatige stappen tot data.json
// hebben geleid -- zodat een controleur kan navertellen waar elk cijfer
// vandaan komt, zonder de hele pijplijn opnieuw te hoeven draaien.
//
// Wat dit WEL vastlegt (ook retroactief, voor gebieden die al langer geleden
// zijn opgebouwd): SHA-256 van elk tussenliggend artefact zoals het nu in de
// repository staat, en het git-commit waarin dat artefact voor het eerst is
// toegevoegd (als benadering van het moment van ophalen/opslaan).
//
// Wat dit NIET met terugwerkende kracht kan vastleggen (nooit destijds apart
// opgeslagen): het exacte tijdstip van de live SPARQL/WFS-aanroep zelf, het
// aantal retries tijdens de oorspronkelijke BAG-bevraging (lib/bag.mjs voert
// deze uit maar bewaart alleen het eindresultaat, niet de retry-historie), en
// de precieze scriptversie die destijds actief was -- alleen het scripts/-
// commit op het moment van genereren van dit manifest wordt vastgelegd, niet
// noodzakelijk de commit die de oorspronkelijke data.json produceerde.
//
// Geen van de RCE-queries hieronder gebruikt een expliciete GRAPH-clausule
// (behalve de losse richtlijn-query), dus ze doorzoeken de standaard-graph-
// unie van het endpoint -- zie scripts/README.md, "Bekende valkuilen", voor de
// cross-graph-dubbeltelling die dit met zich meebrengt en waarom SELECT
// DISTINCT daarom overal verplicht is.
//
// Gebruik: node scripts/09-bouw-manifest.mjs <slug>
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');
const [, , slug] = process.argv;
if (!slug) { console.error('Gebruik: node scripts/09-bouw-manifest.mjs <slug>'); process.exit(1); }

const dir = path.join(REPO_ROOT, 'data', 'gebieden', slug);
if (!fs.existsSync(dir)) { console.error(`Niet gevonden: ${dir}`); process.exit(1); }

function sha256(p) {
  return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
}

// Eerste commit dat dit bestand toevoegde, als benadering van het moment van
// ophalen (git-geschiedenis is betrouwbaarder en reproduceerbaar-bij-clone,
// in tegenstelling tot lokale bestands-mtimes).
function eersteCommit(relPath) {
  try {
    const out = execSync(
      `git log --follow --format="%H|%aI" --diff-filter=A -- "${relPath}"`,
      { cwd: REPO_ROOT, encoding: 'utf-8' }
    ).trim();
    const regels = out.split('\n').filter(Boolean);
    if (regels.length === 0) return null;
    const [commit, datum] = regels[regels.length - 1].split('|');
    return { commit, datum };
  } catch {
    return null;
  }
}

let scriptsCommitOpGenereermoment = null;
try {
  scriptsCommitOpGenereermoment = execSync('git log -1 --format=%H -- scripts/', { cwd: REPO_ROOT, encoding: 'utf-8' }).trim() || null;
} catch { /* geen git beschikbaar; manifest blijft mogelijk maar zonder commit-referentie */ }

const RCE_CHO_ENDPOINT = 'linkeddata.cultureelerfgoed.nl (RCE CHO SPARQL-endpoint)';
const PDOK_BAG = 'service.pdok.nl/lv/bag/wfs/v2_0';
const PDOK_PROV = 'service.pdok.nl/kadaster/bestuurlijkegebieden/wfs/v1_0';

const ARTEFACTEN = [
  { bestand: 'geometrie.json', bron: 'afgeleid (geen eigen aanroep)', endpoint: null, handmatig: false,
    toelichting: 'Polygonen + bbox voor dit gebied, gefilterd uit het landelijke data/raw/natura2000-nationaal.json (PDOK Natura2000-WFS, éénmalig landelijk opgehaald).' },
  { bestand: 'rce-monumenten-query.sparql', bron: RCE_CHO_ENDPOINT, endpoint: RCE_CHO_ENDPOINT, handmatig: false,
    toelichting: 'Kant-en-klare SPARQL-query, automatisch samengesteld door 02-prepare-gebied.mjs. Geen expliciete GRAPH-clausule (standaard-graph-unie); SELECT DISTINCT voorkomt cross-graph-dubbeltelling.' },
  { bestand: 'monumenten-raw.txt', bron: RCE_CHO_ENDPOINT + ' (queryresultaat)', endpoint: RCE_CHO_ENDPOINT, handmatig: true,
    toelichting: 'Resultaat van rce-monumenten-query.sparql, handmatig uitgevoerd via de rce-cho MCP-tool (query_sparql) en als tabel opgeslagen.' },
  { bestand: 'monumenten-geclassificeerd.json', bron: 'afgeleid (geen eigen aanroep)', endpoint: null, handmatig: false,
    toelichting: 'Point-in-polygon + afstandsberekening (lib/geo.mjs) op monumenten-raw.txt tegen geometrie.json, lokaal berekend.' },
  { bestand: 'rce-functie-query.sparql', bron: RCE_CHO_ENDPOINT, endpoint: RCE_CHO_ENDPOINT, handmatig: false,
    toelichting: 'Kant-en-klare SPARQL-query, automatisch samengesteld door 03-classify-monumenten.mjs. Zelfde GRAPH/DISTINCT-kanttekening als hierboven.' },
  { bestand: 'functie-raw.txt', bron: RCE_CHO_ENDPOINT + ' (queryresultaat)', endpoint: RCE_CHO_ENDPOINT, handmatig: true,
    toelichting: 'Resultaat van rce-functie-query.sparql, handmatig uitgevoerd via de rce-cho MCP-tool.' },
  { bestand: 'rce-adres-query.sparql', bron: RCE_CHO_ENDPOINT, endpoint: RCE_CHO_ENDPOINT, handmatig: false,
    toelichting: 'Kant-en-klare SPARQL-query, automatisch samengesteld door 03-classify-monumenten.mjs. Zelfde GRAAG/DISTINCT-kanttekening als hierboven.' },
  { bestand: 'adres-raw.txt', bron: RCE_CHO_ENDPOINT + ' (queryresultaat)', endpoint: RCE_CHO_ENDPOINT, handmatig: true,
    toelichting: 'Resultaat van rce-adres-query.sparql, handmatig uitgevoerd via de rce-cho MCP-tool.' },
  { bestand: 'richtlijn-raw.txt', bron: RCE_CHO_ENDPOINT + ' -- graph/natura2000 (queryresultaat)', endpoint: RCE_CHO_ENDPOINT, handmatig: true, optioneel: true,
    toelichting: 'Richtlijnstatus/sitecode/stikstofgevoelig, handmatige query op het losse named graph <https://linkeddata.cultureelerfgoed.nl/graph/natura2000> via de rce-cho MCP-tool (zie scripts/README.md), verwerkt door 08-verrijk-richtlijn.mjs.' },
  { bestand: 'monumenten-verrijkt.json', bron: `PDOK BAG-WFS (${PDOK_BAG}) + PDOK bestuurlijkegebieden-WFS (${PDOK_PROV})`, endpoint: `${PDOK_BAG} ; ${PDOK_PROV}`, handmatig: false,
    toelichting: 'Automatisch door 04-verrijk-monumenten.mjs: BAG-gebruiksdoel per adres (lib/bag.mjs, met retry/backoff -- retry-aantallen zelf niet persistent gelogd) en provincie via point-in-polygon (lib/provincie.mjs) tegen het landelijke data/raw/provincies.json (éénmalig landelijk opgehaald).' },
  { bestand: 'data.json', bron: 'afgeleid (geen eigen aanroep)', endpoint: null, handmatig: false,
    toelichting: 'Eindbundel voor de gebiedspagina, gebouwd door 05-build-gebied-data.mjs (en eventueel 08-verrijk-richtlijn.mjs) uit monumenten-verrijkt.json.' }
];

const artefacten = ARTEFACTEN
  .map(a => {
    const p = path.join(dir, a.bestand);
    const aanwezig = fs.existsSync(p);
    const relPath = path.relative(REPO_ROOT, p).replace(/\\/g, '/');
    return {
      bestand: a.bestand,
      aanwezig,
      bron: a.bron,
      endpoint: a.endpoint,
      handmatigeStap: a.handmatig,
      toelichting: a.toelichting,
      sha256: aanwezig ? sha256(p) : null,
      eersteCommit: aanwezig ? eersteCommit(relPath) : null
    };
  })
  .filter(a => a.aanwezig || !ARTEFACTEN.find(x => x.bestand === a.bestand)?.optioneel);

const manifest = {
  slug,
  gegenereerdOp: new Date().toISOString(),
  scriptsCommitOpGenereermoment,
  toelichting:
    'Dit manifest legt vast welke brondata tot data.json in dit gebied hebben geleid: ' +
    'SHA-256 van elk tussenliggend artefact zoals dat nu in de repository staat, en het ' +
    'git-commit waarin dat artefact voor het eerst is toegevoegd (als benadering van het ' +
    'moment van ophalen). Het legt NIET met terugwerkende kracht vast: het exacte tijdstip ' +
    'van de live SPARQL/WFS-aanroep zelf, het aantal retries tijdens de oorspronkelijke ' +
    'BAG-bevraging, en de precieze scriptversie die destijds actief was -- alleen het ' +
    'scripts/-commit op het moment van genereren van dit manifest wordt vastgelegd, niet ' +
    'noodzakelijk de commit die de oorspronkelijke data.json produceerde.',
  artefacten
};

fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify(manifest, null, 1));
console.log(`${slug}: manifest.json geschreven (${artefacten.length} artefacten).`);
