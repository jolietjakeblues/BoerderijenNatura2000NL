// Vogelrichtlijn/Habitatrichtlijn-status per gebied, opgehaald uit het losse
// RCE-graph <https://linkeddata.cultureelerfgoed.nl/graph/natura2000> (los van
// de PDOK-WFS die voor geometrie wordt gebruikt). Een officieel Natura
// 2000-gebied (dc:identifier, het RVO-gebiedsnummer) kan meerdere RCE-
// deelresources hebben -- bv. Rijntakken heeft een apart VR-deel en een
// VR+HR-deel, elk met eigen siteCode. Deze functie aggregeert die deel-
// resources tot één richtlijn-samenvatting per gebied.
export function aggregeerRichtlijn(rows) {
  // rows: [{ identifier, s, code, vhnAanvulling, siteCodeVR, siteCodeHR, stikstofgevoelig, status, wikidata }]
  const codes = rows.map(r => r.code);
  const heeftVR = codes.some(c => c === 'VR' || c === 'VR+HR');
  const heeftHR = codes.some(c => c === 'HR' || c === 'VR+HR' || c === 'HR groeve');
  const heeftGroeve = codes.includes('HR groeve');

  const label = heeftVR && heeftHR
    ? 'Vogelrichtlijn + Habitatrichtlijn'
    : heeftVR ? 'Vogelrichtlijn' : 'Habitatrichtlijn';
  const badge = (heeftVR && heeftHR ? 'VR+HR' : heeftVR ? 'VR' : 'HR') + (heeftGroeve ? ' + groeve' : '');

  const eersteNietLeeg = veld => {
    for (const r of rows) if (r[veld] && r[veld] !== '-') return r[veld];
    return null;
  };

  return {
    gebiedsnummer: rows[0].identifier,
    label,
    badge,
    heeftGroeveOnderdeel: heeftGroeve,
    siteCodeVogelrichtlijn: eersteNietLeeg('siteCodeVR'),
    siteCodeHabitatrichtlijn: eersteNietLeeg('siteCodeHR'),
    stikstofgevoelig: rows.some(r => r.stikstofgevoelig === 'true'),
    natura2000Status: eersteNietLeeg('status'),
    wikidata: eersteNietLeeg('wikidata'),
    rceUris: rows.map(r => r.s)
  };
}

export function parseRichtlijnRaw(tekst) {
  return tekst.trim().split('\n').filter(Boolean).map(line => {
    const [identifier, s, code, vhnAanvulling, siteCodeVR, siteCodeHR, stikstofgevoelig, status, wikidata] = line.split('|');
    return { identifier, s, code, vhnAanvulling, siteCodeVR, siteCodeHR, stikstofgevoelig, status, wikidata };
  });
}
