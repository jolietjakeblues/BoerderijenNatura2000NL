// BAG-praktijkcheck: gebruiksdoel opzoeken via de open PDOK BAG-WFS
// (bag:verblijfsobject), zonder API-key (zie README: "Waarom geen BAG API-key").
//
// Bepaalt per monument een status naast de industrie-vlag, zodat een mislukte
// of niet-matchende opzoeking nooit stilzwijgend als "NEE" telt (zie README,
// sectie "Geloofwaardigheid/interpretatie" en taak "BAG-fouten onderscheiden
// van bevestigde NEE").
//
// bagStatus:
//   'ok'                 -- minstens één adres gematcht met een BAG-object
//   'geen_adres'         -- geen BAG-adresrelatie bekend bij RCE voor dit monument
//   'geen_match_in_bbox' -- wel adres(sen), maar geen match gevonden in de zoekbox
//   'fout'               -- de WFS-aanvraag zelf faalde (netwerk/HTTP)

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 800;

function normHuisnr(h) {
  const m = String(h).trim().match(/^(\d+)\s*([A-Za-z]?)$/);
  if (!m) return { nr: null, letter: '' };
  return { nr: parseInt(m[1], 10), letter: m[2].toUpperCase() };
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

async function bboxQueryWithRetry(lon, lat, { dLat = 0.0018, dLon = 0.003 } = {}) {
  const params = new URLSearchParams({
    service: 'WFS', version: '2.0.0', request: 'GetFeature',
    typeNames: 'bag:verblijfsobject', outputFormat: 'json',
    srsName: 'urn:ogc:def:crs:EPSG::4326',
    bbox: `${(lat - dLat).toFixed(6)},${(lon - dLon).toFixed(6)},${(lat + dLat).toFixed(6)},${(lon + dLon).toFixed(6)},urn:ogc:def:crs:EPSG::4326`
  });
  const url = `https://service.pdok.nl/lv/bag/wfs/v2_0?${params.toString()}`;
  let lastErr;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      lastErr = e;
      if (attempt < MAX_RETRIES) await sleep(RETRY_DELAY_MS * (attempt + 1));
    }
  }
  throw lastErr;
}

// monument: { lon, lat, addressen: [{straat,huisnr,postcode,woonplaats}] | null }
// Retourneert { bagStatus, matched: [...], industrie: bool, logiesOfBijeenkomst: bool }
export async function checkMonumentBag(monument) {
  const result = { bagStatus: 'geen_adres', matched: [], industrie: false, logiesOfBijeenkomst: false };
  const addrs = monument.addressen;
  if (!addrs || addrs.length === 0) return result;

  try {
    const geo = await bboxQueryWithRetry(monument.lon, monument.lat);
    const feats = (geo.features || []).map(f => f.properties);
    addrs.forEach(a => {
      const target = normHuisnr(a.huisnr);
      const cand = feats.filter(p =>
        p.postcode === a.postcode &&
        p.huisnummer === target.nr &&
        (p.huisletter || '').toUpperCase() === target.letter
      );
      cand.forEach(c => {
        result.matched.push({ straat: c.openbare_ruimte, huisnummer: c.huisnummer, postcode: c.postcode, gebruiksdoel: c.gebruiksdoel });
        const gd = (c.gebruiksdoel || '').toLowerCase();
        if (gd.includes('industriefunctie')) result.industrie = true;
        if (gd.includes('logiesfunctie') || gd.includes('bijeenkomstfunctie')) result.logiesOfBijeenkomst = true;
      });
    });
    result.bagStatus = result.matched.length > 0 ? 'ok' : 'geen_match_in_bbox';
  } catch (e) {
    result.bagStatus = 'fout';
    result.bagError = e.message;
  }
  return result;
}

// Verwerkt een lijst monumenten sequentieel (bewust niet parallel: de PDOK-WFS
// is een gedeelde publieke dienst, geen eigen infrastructuur -- rustig aan
// blijft hoffelijk en voorkomt rate-limiting).
export async function checkMonumentenBag(monumenten, onProgress) {
  let done = 0;
  for (const m of monumenten) {
    const r = await checkMonumentBag(m);
    Object.assign(m, r);
    done++;
    if (onProgress && done % 20 === 0) onProgress(done, monumenten.length);
  }
  return monumenten;
}
