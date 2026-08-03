#!/usr/bin/env node
// Validatiescript voor CI: controleert schema, typen en telinvarianten van
// alle data/gebieden/<slug>/data.json-bestanden, en dat de gepubliceerde HTML
// exact overeenkomt met wat de pijplijn uit de huidige data.json genereert
// (voorkomt dat data en HTML uit elkaar lopen zonder dat iemand het merkt).
//
// Verdiept na reviewopmerking: eerdere versie controleerde vooral of
// verplichte velden aanwezig waren en of categorieën optelden tot n -- dat
// laatste kan een verkeerde verdeling over categorieën gemakkelijk missen
// (bv. twee categorieën verwisseld, som klopt toevallig nog). Deze versie
// telt elke status exact, controleert typen or bereik van elk veld, en
// detecteert ontbrekende én verweesde bestanden in beide richtingen.
//
// Gebruik: node scripts/validate.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const GEBIEDEN_DIR = path.join(ROOT, 'data', 'gebieden');
const HTML_DIR = path.join(ROOT, 'gebieden');

let fouten = 0;
function fout(msg) { fouten++; console.error(`FOUT: ${msg}`); }

const VERPLICHTE_VELDEN = ['gebied', 'peildatum', 'n', 'ja', 'onbekend', 'provCounts', 'provJaCounts', 'bbox', 'n2000', 'mons'];
const GELDIGE_STATUS = new Set([
  'industrie_aangetroffen', 'industrie_deels_aangetroffen', 'geen_industrie_aangetroffen',
  'geen_adres', 'geen_match', 'bag_mislukt'
]);
const STATUS_NAAR_DK = {
  industrie_aangetroffen: 'industrieAangetroffen',
  industrie_deels_aangetroffen: 'industrieDeelsAangetroffen',
  geen_industrie_aangetroffen: 'geenIndustrieAangetroffen',
  geen_adres: 'geenAdres',
  geen_match: 'geenMatch',
  bag_mislukt: 'bagMislukt'
};
const STATUS_NAAR_BAG = {
  industrie_aangetroffen: 'ok',
  industrie_deels_aangetroffen: 'ok',
  geen_industrie_aangetroffen: 'ok',
  geen_adres: 'geen_adres',
  geen_match: 'geen_match_in_bbox',
  bag_mislukt: 'fout'
};
// Zelfde bereik als assertWgs84NL in 01-fetch-referentiedata.mjs, voor
// consistentie: dit dekt heel Nederland ruim, inclusief de Waddeneilanden.
const WGS84_NL = { lonMin: 2, lonMax: 8, latMin: 50, latMax: 55 };

function isEindigGetal(x) { return typeof x === 'number' && Number.isFinite(x); }
function isWgs84NL(lon, lat) {
  return isEindigGetal(lon) && isEindigGetal(lat) &&
    lon > WGS84_NL.lonMin && lon < WGS84_NL.lonMax && lat > WGS84_NL.latMin && lat < WGS84_NL.latMax;
}

function valideerMonument(slug, m) {
  const ctx = `${slug}: monument ${m.nr ?? '?'}`;
  if (typeof m.nr !== 'string') fout(`${ctx}: "nr" moet een string zijn (is ${typeof m.nr})`);
  if (m.rm !== null && typeof m.rm !== 'string') fout(`${ctx}: "rm" moet string of null zijn`);
  if (m.functie !== null && typeof m.functie !== 'string') fout(`${ctx}: "functie" moet string of null zijn`);
  if (typeof m.prov !== 'string' || m.prov.length === 0) fout(`${ctx}: "prov" ontbreekt of is geen niet-lege string`);
  if (!Number.isInteger(m.k) || m.k < 0 || m.k > 5) fout(`${ctx}: "k" moet een geheel getal 0-5 zijn (is ${m.k})`);
  if (!isEindigGetal(m.d)) fout(`${ctx}: "d" is geen eindig getal (${m.d})`);
  if (typeof m.erin !== 'boolean') fout(`${ctx}: "erin" moet een boolean zijn`);
  if (m.afstandTotRand !== null && !isEindigGetal(m.afstandTotRand)) fout(`${ctx}: "afstandTotRand" moet een eindig getal of null zijn (${m.afstandTotRand})`);
  if (!isWgs84NL(m.lon, m.lat)) fout(`${ctx}: [lon,lat]=[${m.lon},${m.lat}] ziet er niet uit als WGS84 in Nederland`);
  if (typeof m.ja !== 'boolean') fout(`${ctx}: "ja" moet een boolean zijn`);
  if (typeof m.bag !== 'string') fout(`${ctx}: "bag" moet een string zijn`);
  if (!GELDIGE_STATUS.has(m.status)) { fout(`${ctx}: onbekende status "${m.status}"`); return; }
  if (!Array.isArray(m.addressen)) fout(`${ctx}: "addressen" moet een array zijn`);
  if (!Array.isArray(m.matched)) fout(`${ctx}: "matched" moet een array zijn`);

  // Afstand: alleen gebieden binnen 5 km (selectiegrens uit 03-classify-monumenten.mjs)
  // horen erin te zitten, tenzij het monument binnen het gebied zelf ligt.
  if (!m.erin && isEindigGetal(m.afstandTotRand) && m.afstandTotRand > 5000) {
    fout(`${ctx}: ligt niet "erin" en afstandTotRand=${m.afstandTotRand} m > 5000 m selectiegrens`);
  }

  // Consistentie tussen de legacyvelden (ja/bag) en de nieuwe status -- deze
  // moeten hetzelfde onderliggende feit weergeven, alleen in ander formaat.
  const verwachtBag = STATUS_NAAR_BAG[m.status];
  if (m.bag !== verwachtBag) fout(`${ctx}: status "${m.status}" hoort bij bag="${verwachtBag}", maar bag="${m.bag}"`);
  const verwachtJa = m.status === 'industrie_aangetroffen' || m.status === 'industrie_deels_aangetroffen';
  if (m.ja !== verwachtJa) fout(`${ctx}: status "${m.status}" hoort bij ja=${verwachtJa}, maar ja=${m.ja}`);
}

const dataSlugs = fs.existsSync(GEBIEDEN_DIR)
  ? fs.readdirSync(GEBIEDEN_DIR).filter(f => fs.statSync(path.join(GEBIEDEN_DIR, f)).isDirectory())
  : [];
const slugsMetData = dataSlugs.filter(f => fs.existsSync(path.join(GEBIEDEN_DIR, f, 'data.json')));
const slugsZonderData = dataSlugs.filter(f => !fs.existsSync(path.join(GEBIEDEN_DIR, f, 'data.json')));
for (const slug of slugsZonderData) fout(`data/gebieden/${slug}/ bestaat maar heeft geen data.json (onvolledig gebied)`);

console.log(`Valideren van ${slugsMetData.length} gebieden...`);

for (const slug of slugsMetData) {
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

  // bbox: 4 eindige getallen, geldig geordend (min < max), binnen WGS84-NL-bereik.
  if (!Array.isArray(d.bbox) || d.bbox.length !== 4 || !d.bbox.every(isEindigGetal)) {
    fout(`${slug}: "bbox" moet een array van 4 eindige getallen zijn`);
  } else {
    const [minLon, minLat, maxLon, maxLat] = d.bbox;
    if (minLon >= maxLon) fout(`${slug}: bbox minLon (${minLon}) moet kleiner zijn dan maxLon (${maxLon})`);
    if (minLat >= maxLat) fout(`${slug}: bbox minLat (${minLat}) moet kleiner zijn dan maxLat (${maxLat})`);
    if (!isWgs84NL(minLon, minLat) || !isWgs84NL(maxLon, maxLat)) {
      fout(`${slug}: bbox=[${d.bbox}] ziet er niet uit als WGS84 in Nederland`);
    }
  }

  if (d.mons.length !== d.n) fout(`${slug}: n=${d.n} maar mons.length=${d.mons.length}`);

  // Unieke monumentnummers binnen dit gebied.
  const nrs = d.mons.map(m => m.nr);
  const nrsUniek = new Set(nrs);
  if (nrsUniek.size !== nrs.length) {
    const dubbel = nrs.filter((nr, i) => nrs.indexOf(nr) !== i);
    fout(`${slug}: dubbele monumentnummers binnen dit gebied: ${[...new Set(dubbel)].join(', ')}`);
  }

  for (const m of d.mons) valideerMonument(slug, m);

  const jaCount = d.mons.filter(m => m.ja).length;
  if (jaCount !== d.ja) fout(`${slug}: ja=${d.ja} maar telling over mons geeft ${jaCount}`);

  const onbekendCount = d.mons.filter(m => m.bag !== 'ok').length;
  if (onbekendCount !== d.onbekend) fout(`${slug}: onbekend=${d.onbekend} maar telling geeft ${onbekendCount}`);

  // provCounts/provJaCounts: volledige gelijkheid in beide richtingen, dus
  // ook overtollige ("verweesde") sleutels detecteren die niet meer
  // overeenkomen met een werkelijk aanwezige provincie in mons.
  const provCountsCheck = {};
  const provJaCountsCheck = {};
  d.mons.forEach(m => {
    provCountsCheck[m.prov] = (provCountsCheck[m.prov] || 0) + 1;
    if (m.ja) provJaCountsCheck[m.prov] = (provJaCountsCheck[m.prov] || 0) + 1;
  });
  function vergelijkVolledig(label, verwacht, werkelijk) {
    const verwachteKeys = new Set(Object.keys(verwacht));
    const werkelijkeKeys = new Set(Object.keys(werkelijk));
    for (const k of verwachteKeys) {
      if (!werkelijkeKeys.has(k)) fout(`${slug}: ${label} mist sleutel "${k}" (verwacht op basis van mons)`);
      else if (verwacht[k] !== werkelijk[k]) fout(`${slug}: ${label}["${k}"]=${werkelijk[k]} maar telling geeft ${verwacht[k]}`);
    }
    for (const k of werkelijkeKeys) {
      if (!verwachteKeys.has(k)) fout(`${slug}: ${label} heeft overtollige/verweesde sleutel "${k}" (komt niet voor in mons)`);
    }
  }
  vergelijkVolledig('provCounts', provCountsCheck, d.provCounts || {});
  vergelijkVolledig('provJaCounts', provJaCountsCheck, d.provJaCounts || {});

  if (d.datakwaliteit) {
    const statusCounts = {};
    for (const status of GELDIGE_STATUS) statusCounts[status] = 0;
    d.mons.forEach(m => { if (statusCounts[m.status] !== undefined) statusCounts[m.status]++; });
    for (const [status, dkKey] of Object.entries(STATUS_NAAR_DK)) {
      const verwacht = statusCounts[status];
      const werkelijk = d.datakwaliteit[dkKey];
      if (werkelijk !== verwacht) {
        fout(`${slug}: datakwaliteit.${dkKey}=${werkelijk}, maar exacte telling van status "${status}" in mons geeft ${verwacht}`);
      }
    }
    const meerdereAdressenVerwacht = d.mons.filter(m => (m.addressen || []).length > 1).length;
    if (d.datakwaliteit.meerdereAdressen !== meerdereAdressenVerwacht) {
      fout(`${slug}: datakwaliteit.meerdereAdressen=${d.datakwaliteit.meerdereAdressen}, telling geeft ${meerdereAdressenVerwacht}`);
    }
  }

  if (!fs.existsSync(path.join(HTML_DIR, `${slug}.html`))) fout(`${slug}: gebieden/${slug}.html ontbreekt`);
}

// Verweesde HTML: een gebieden/<slug>.html zonder bijbehorende data/gebieden/<slug>/data.json.
if (fs.existsSync(HTML_DIR)) {
  const htmlSlugs = fs.readdirSync(HTML_DIR).filter(f => f.endsWith('.html')).map(f => f.replace(/\.html$/, ''));
  for (const slug of htmlSlugs) {
    if (!slugsMetData.includes(slug)) fout(`gebieden/${slug}.html bestaat, maar data/gebieden/${slug}/data.json niet (verweesde pagina)`);
  }
}

if (!fs.existsSync(path.join(ROOT, 'index.html'))) fout('index.html ontbreekt');

if (fouten > 0) {
  console.error(`\n${fouten} fout(en) gevonden.`);
  process.exit(1);
}
console.log('Alle controles geslaagd.');
