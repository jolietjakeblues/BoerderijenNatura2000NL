// Directe HTTP-toegang tot het RCE CHO SPARQL-endpoint, zonder de rce-cho
// MCP-tool. Ontdekt tijdens de opbouw van deze pijplijn (augustus 2026):
// https://api.linkeddata.cultureelerfgoed.nl/datasets/rce/cho/sparql accepteert
// gewone POST-aanvragen met Content-Type: application/sparql-query, zonder
// API-key. scripts/README.md documenteerde tot dan toe dat zo'n endpoint niet
// gevonden was; dat gold kennelijk niet meer (of was nooit volledig getest).
//
// Belangrijke valkuil: backslashes in de querytekst (regex-escapes zoals
// \( voor de bbox-filter) moeten in de brontekst VERDUBBELD worden. \( is
// geen geldig SPARQL ECHAR; een compliant parser (waaronder dit endpoint)
// wijst het af. \\( parseert wel tot het letterlijke \( dat REGEX() nodig
// heeft om een teken te escapen. Deze module verdubbelt daarom élke
// backslash in de meegegeven query automatisch, zodat de losse
// rce-*-query.sparql-bestanden (met enkele backslash, zoals bbox-regex.mjs
// ze schrijft) zowel leesbaar blijven als hier zonder aanpassing werken.
const ENDPOINT = 'https://api.linkeddata.cultureelerfgoed.nl/datasets/rce/cho/sparql';

export async function runSparql(query) {
  const veiligeQuery = query.replace(/\\/g, '\\\\');
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/sparql-query', 'Accept': 'application/sparql-results+json' },
    body: veiligeQuery
  });
  const tekst = await res.text();
  if (!res.ok) throw new Error(`RCE CHO SPARQL HTTP ${res.status}: ${tekst.slice(0, 500)}`);
  return JSON.parse(tekst);
}

// Zet SPARQL JSON-resultaten om naar het "kolom | kolom | ..."-tekstformaat
// dat 03/04-build-scripts (via het rm|rmnr|wkt-formaat) en 08-verrijk-richtlijn
// verwachten, in de opgegeven kolomvolgorde. Ontbrekende OPTIONAL-waarden
// worden "-" (zelfde conventie als de bestaande richtlijn-raw.txt-bestanden).
export function naarPipeTekst(json, kolommen, { metHeader = true, legeWaarde = '' } = {}) {
  const rijen = json.results.bindings.map(b =>
    kolommen.map(k => (b[k] ? b[k].value : legeWaarde)).join(' | ')
  );
  if (!metHeader) return rijen.join('\n');
  return `Gevonden: ${rijen.length} resultaat/resultaten\n\n${kolommen.join(' | ')}\n${'-'.repeat(60)}\n${rijen.join('\n')}`;
}
