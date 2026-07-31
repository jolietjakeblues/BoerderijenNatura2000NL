// Automatisch een SPARQL REGEX-bbox-filter afleiden uit numerieke grenzen,
// in plaats van 'm met de hand te schrijven.
//
// Waarom dit bestaat: bij de handmatige opbouw van dit project (Rijntakken,
// juli 2026) is een bbox-regex een keer verkeerd getypt (verkeerd cijferbereik),
// waardoor een monument stilzwijgend buiten de RCE-query zou zijn gevallen als
// het niet via een tweede, bredere query alsnog was gevonden. Dit bestand
// vervangt het handmatig typen van zo'n regex door een functie die het
// getallenbereik zelf in stapjes van 0.1 graad opdeelt en daaruit een
// regex-alternatie bouwt. Bewust ruimer dan het exacte bereik (naar boven
// afgerond op 0.1) -- te ruim is onschadelijk (wordt later alsnog precies
// gefilterd met echte point-in-polygon/afstandsberekening in geo.mjs), te
// smal is de fout die dit juist moet voorkomen.

// Bouwt "N\.D[0-9]*" fragmenten voor elke 0.1-stap tussen min en max (ruim
// naar buiten afgerond), en alterneert ze. Werkt voor niet-negatieve NL-coördinaten
// (lon ~0-8, lat ~50-54); niet bedoeld voor bereiken die 0 of een geheel getal
// middenin overschrijden op een manier die de aanname "1 decimaal volstaat" breekt
// (in de praktijk: prima voor elk Natura 2000-gebied, die zijn nooit graden breed).
export function decimalRangeRegex(min, max, step = 0.1) {
  if (max < min) throw new Error(`decimalRangeRegex: max (${max}) < min (${min})`);
  const lo = Math.floor((min - 1e-9) / step) * step;
  const hi = Math.ceil((max + 1e-9) / step) * step;
  const parts = [];
  for (let v = lo; v <= hi + 1e-9; v += step) {
    const rounded = Math.round(v * 10) / 10;
    const [intPart, decPart] = rounded.toFixed(1).split('.');
    parts.push(`${escapeRegex(intPart)}\\.${decPart}[0-9]*`);
  }
  return `(${parts.join('|')})`;
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Bouwt het complete REGEX-fragment voor een SPARQL FILTER op een
// "Point (lon lat)" WKT-string, gegeven de bbox van een gebied plus marge.
// bbox = [lonMin, latMin, lonMax, latMax] (zoals geo.bboxOfRings teruggeeft).
export function pointRegexForBbox(bbox, marginDeg = 0.1) {
  const [lonMin, latMin, lonMax, latMax] = bbox;
  const lonRe = decimalRangeRegex(lonMin - marginDeg, lonMax + marginDeg);
  const latRe = decimalRangeRegex(latMin - marginDeg, latMax + marginDeg);
  return `^Point \\(${lonRe} ${latRe}\\)$`;
}

// --- zelftest: `node scripts/lib/bbox-regex.mjs` ---
// Dient als documentén regressietest tegen precies de foutklasse die dit
// bestand moet voorkomen (een handmatig verkeerd cijferbereik).
import { pathToFileURL } from 'url';
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const assert = (cond, msg) => {
    if (!cond) { console.error('FAIL:', msg); process.exitCode = 1; }
    else console.log('ok  ', msg);
  };

  // Rijntakken-achtig bereik: lon 5.758-6.309, lat 51.934-52.615 (zie README).
  const bbox = [5.758, 51.934, 6.309, 52.615];
  const re = new RegExp(pointRegexForBbox(bbox, 0));

  assert(re.test('Point (5.758123 51.934001)'), 'ondergrens lon/lat matcht');
  assert(re.test('Point (6.308999 52.614999)'), 'bovengrens lon/lat matcht');
  assert(re.test('Point (5.9 52.3)'), 'midden van het bereik matcht');
  // De exacte bug die dit bestand voorkomt: een handmatig bereik dat per
  // ongeluk een stukje te smal is (bv. "6.0-6.3" i.p.v. "5.8-6.4" voor lon).
  // Met automatische afleiding uit de echte bbox kan dit per definitie niet
  // meer gebeuren, want de regex wordt uit min/max zelf berekend.
  assert(!re.test('Point (4.0 52.3)'), 'ver buiten het bereik matcht niet (lon)');
  assert(!re.test('Point (5.9 40.0)'), 'ver buiten het bereik matcht niet (lat)');

  console.log('\nVoorbeeldregex (marge 0.1 graad):');
  console.log(pointRegexForBbox(bbox, 0.1));
}
