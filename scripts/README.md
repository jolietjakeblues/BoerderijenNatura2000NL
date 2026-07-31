# Bouwpijplijn

Herbruikbare scripts om een nieuw Natura 2000-gebied toe te voegen aan de site.
Zuivere Node.js (native `fetch`), geen dependencies, geen build-stap.

## Waarom dit bestaat

Tot juli 2026 leefde deze pijplijn alleen als losse, ad-hoc scripts in een
sessie-scratchpad: niet reproduceerbaar, niet controleerbaar, en gevoelig voor
handmatige fouten (zie hieronder). Dit is de duurzame versie in de repo zelf.

## Volgorde

```
node scripts/01-fetch-referentiedata.mjs
node scripts/02-prepare-gebied.mjs "<Natura2000-naam>" <slug>
# -- handmatige stap, zie hieronder --
node scripts/03-classify-monumenten.mjs <slug>
# -- handmatige stap, zie hieronder --
node scripts/04-verrijk-monumenten.mjs <slug>
node scripts/05-build-gebied-data.mjs <slug> "<Weergavenaam>"
node scripts/06-build-gebied-html.mjs <slug>
node scripts/07-build-landing-html.mjs
```

`node scripts/list-gebieden.mjs` toont de exacte schrijfwijze van alle 162
`naamN2K`-namen uit de landelijke cache (nodig voor stap 2).

## De twee handmatige stappen

Er is geen publiek, sleutelloos SPARQL-endpoint gevonden voor het RCE
CHO-endpoint (in tegenstelling tot de Kadaster Kennisgraaf, die wel zo'n
endpoint heeft). De RCE-query's moeten daarom via de `rce-cho`
MCP-tool (`query_sparql`) uitgevoerd worden, niet vanuit een los script:

1. **Na stap 2**: voer `data/gebieden/<slug>/rce-monumenten-query.sparql` uit.
   Sla de tabelweergave (kolommen `rm | rmnr | wkt`) op als
   `data/gebieden/<slug>/monumenten-raw.txt`.
2. **Na stap 3**: voer `data/gebieden/<slug>/rce-functie-query.sparql` en
   `rce-adres-query.sparql` uit. Sla ze op als `functie-raw.txt` resp.
   `adres-raw.txt` in dezelfde map.

Alle overige stappen (geometrie ophalen, classificatie, BAG-check,
provincie-toewijzing, HTML genereren) zijn volledig automatisch.

## lib/

- **geo.mjs** — point-in-polygon (incl. gaten), afstand-tot-polygoonrand,
  bbox-hulpfuncties. Gedeeld door classificatie en databundel-opbouw.
- **bbox-regex.mjs** — leidt de SPARQL-REGEX-bboxfilter automatisch af uit een
  numeriek bereik, in plaats van 'm met de hand te typen. **Zie de kanttekening
  hieronder** — dit bestaat vanwege een echte fout die tijdens de opbouw van
  dit project is gemaakt. Zelftest: `node scripts/lib/bbox-regex.mjs`.
- **bag.mjs** — BAG-praktijkcheck via de open PDOK BAG-WFS, met retry/backoff
  (2 pogingen, oplopende wachttijd) en een expliciete `bagStatus` per monument
  (`ok` / `geen_adres` / `geen_match_in_bbox` / `fout`) zodat een mislukte
  opzoeking nooit stilzwijgend als "geen bedrijfsindicatie" telt.
- **provincie.mjs** — provincie bepalen via point-in-polygon tegen de
  PDOK-bestuurlijke-grenzenlaag, onafhankelijk van RCE en van het
  Natura 2000-gebied zelf.
- **gebieden-beschrijving.mjs** — korte, zelfgeschreven samenvatting per
  gebied (natura2000.nl als bron, geen letterlijke overname).

## Bekende valkuilen (waarom sommige dingen zijn zoals ze zijn)

- **CQL_FILTER wordt door de gebruikte PDOK-WFS-endpoints
  (`natura2000:natura2000`, `bag:verblijfsobject`) stilzwijgend genegeerd** —
  je krijgt dan alle features terug in plaats van een foutmelding. Alleen
  `BBOX`-filters (en de aanpak hier: ongefilterd ophalen + zelf filteren in
  JS) bleken op deze endpoints betrouwbaar. Test dit opnieuw als je ooit
  CQL_FILTER probeert te gebruiken op een van deze diensten — neem niet
  klakkeloos aan dat het inmiddels wel werkt.
- **Dezelfde WFS kan zonder waarschuwing RD (EPSG:28992) in plaats van WGS84
  teruggeven.** Bij het herbouwen van deze pijplijn in de repo (juli 2026)
  gaf `service.pdok.nl/rvo/natura2000` zonder expliciete `srsName` één keer
  RD-coördinaten terug, terwijl exact dezelfde aanroep eerder in het project
  WGS84 opleverde. `scripts/01-fetch-referentiedata.mjs` vraagt daarom altijd
  expliciet `srsName=urn:ogc:def:crs:EPSG::4326` op én controleert na het
  ophalen of de coördinaten er ook echt als WGS84-graden voor Nederland
  uitzien (`assertWgs84NL`) -- een RD-coördinaat die per ongeluk als lon/lat
  wordt behandeld, geeft anders geen fout, alleen stilzwijgend onzinnige
  geometrie verderop in de pijplijn.
- **De bbox-regex voor de RCE-monumentenquery is eerder met de hand fout
  getypt** (Rijntakken, juli 2026): een verkeerd cijferbereik zou een
  monument stilzwijgend buiten de query hebben gehouden als het niet met een
  aparte, bredere query alsnog was gevonden. `scripts/lib/bbox-regex.mjs`
  bestaat om dit mechanisch onmogelijk te maken: de regex wordt berekend uit
  de echte bbox-getallen (met een marge van 0.15 graad, ruim boven de
  5&nbsp;km-selectiegrens), nooit met de hand getypt.

## Nog niet gedaan

De 17 gebieden die vóór deze pijplijn in de repo bestonden (zie hoofd-README)
zijn nog niet ge-migreerd naar dit `data/gebieden/<slug>/data.json`-formaat;
`index.html` wordt voor die 17 dus nog met de oude, losse aanpak onderhouden.
`scripts/07-build-landing-html.mjs` genereert de landingspagina puur uit
`data/gebieden/*/data.json` en zal dus pas de volledige (huidige) lijst tonen
zodra die migratie is gedaan — draai dit script niet blind, want met een
onvolledige `data/gebieden/`-map overschrijft het de huidige, complete
`index.html` met een onvolledige versie.
