#!/usr/bin/env node
// Haalt de twee landelijke referentielagen op die voor élk gebied hergebruikt
// worden, en cachet ze in data/raw/. Beide zijn open PDOK-WFS'en zonder
// API-key en zonder CQL_FILTER-ondersteuning (zie README: "CQL_FILTER wordt
// stilzwijgend genegeerd") -- daarom hier bewust ongefilterd opgehaald en pas
// achteraf in JS gefilterd.
//
// Gebruik: node scripts/01-fetch-referentiedata.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_DIR = path.join(__dirname, '..', 'data', 'raw');
fs.mkdirSync(RAW_DIR, { recursive: true });

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} voor ${url}`);
  return res.json();
}

// Sommige PDOK-WFS'en geven zonder (of zelfs mét) expliciete srsName soms RD
// (EPSG:28992, coördinaten in de honderdduizenden) i.p.v. WGS84 terug --
// vastgesteld tijdens de opbouw van dit project. Een RD-coördinaat die
// per ongeluk als lon/lat wordt behandeld, geeft geen fout maar stilzwijgend
// onzinnige geometrie verderop in de pijplijn. Deze check breekt liever nu
// hard af dan dat later te laten gebeuren.
function assertWgs84NL(featureCollection, label) {
  const [lon, lat] = featureCollection.features[0].geometry.coordinates.flat(3);
  const looksLikeWgs84 = lon > 2 && lon < 8 && lat > 50 && lat < 55;
  if (!looksLikeWgs84) {
    throw new Error(
      `${label}: coördinaten zien er niet uit als WGS84 lon/lat voor Nederland ` +
      `(eerste punt: [${lon}, ${lat}]). Dit is vermoedelijk RD (EPSG:28992) i.p.v. ` +
      `WGS84 -- controleer de srsName-parameter van deze WFS-aanvraag.`
    );
  }
}

async function main() {
  console.log('Ophalen Natura 2000-gebieden (service.pdok.nl/rvo/natura2000)...');
  // srsName expliciet meegeven: deze WFS levert zonder dat argument soms RD
  // (EPSG:28992) en soms WGS84 op (server-side inconsistent gedrag,
  // vastgesteld tijdens de opbouw van dit project) -- expliciet vragen om
  // EPSG:4326 voorkomt dat dit onopgemerkt verkeerd gaat.
  const n2000Url = 'https://service.pdok.nl/rvo/natura2000/wfs/v1_0?' + new URLSearchParams({
    service: 'WFS', version: '2.0.0', request: 'GetFeature',
    typeNames: 'natura2000:natura2000', outputFormat: 'json',
    srsName: 'urn:ogc:def:crs:EPSG::4326'
  });
  const n2000 = await fetchJSON(n2000Url);
  assertWgs84NL(n2000, 'natura2000-nationaal');
  const namen = [...new Set(n2000.features.map(f => f.properties.naamN2K))];
  fs.writeFileSync(path.join(RAW_DIR, 'natura2000-nationaal.json'), JSON.stringify(n2000));
  console.log(`  ${n2000.features.length} features, ${namen.length} unieke gebieden -> data/raw/natura2000-nationaal.json`);

  console.log('Ophalen provinciegrenzen (service.pdok.nl/kadaster/bestuurlijkegebieden)...');
  const provUrl = 'https://service.pdok.nl/kadaster/bestuurlijkegebieden/wfs/v1_0?' + new URLSearchParams({
    service: 'WFS', version: '2.0.0', request: 'GetFeature',
    typeNames: 'bestuurlijkegebieden:Provinciegebied', outputFormat: 'json',
    srsName: 'urn:ogc:def:crs:EPSG::4326'
  });
  const prov = await fetchJSON(provUrl);
  assertWgs84NL(prov, 'provincies');
  fs.writeFileSync(path.join(RAW_DIR, 'provincies.json'), JSON.stringify(prov));
  console.log(`  ${prov.features.length} provincies -> data/raw/provincies.json`);
}

main().catch(e => { console.error(e); process.exitCode = 1; });
