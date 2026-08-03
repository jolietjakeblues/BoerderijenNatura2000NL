# Bouwpijplijn

Herbruikbare scripts om een nieuw Natura 2000-gebied toe te voegen aan de site.
Zuivere Node.js (native `fetch`), geen dependencies, geen build-stap.

## Waarom dit bestaat

Tot juli 2026 leefde deze pijplijn alleen als losse, ad-hoc scripts in een
sessie-scratchpad: niet reproduceerbaar, niet controleerbaar, en gevoelig voor
handmatige fouten (zie hieronder). Dit is de duurzame versie in de repo zelf.

**Reproduceerbaarheidsstatus**: volledig automatisch reproduceerbaar zonder
externe tool. Tot augustus 2026 werd hier gedocumenteerd dat drie stappen de
`rce-cho` MCP-tool vereisten omdat er "geen publiek, sleutelloos SPARQL-
endpoint gevonden" zou zijn voor het RCE CHO-endpoint. Dat bleek niet (meer)
te kloppen: `https://api.linkeddata.cultureelerfgoed.nl/datasets/rce/cho/sparql`
accepteert gewone POST-aanvragen zonder API-key (zie `scripts/lib/rce-direct.mjs`
en de kanttekening hieronder over backslash-escaping). Alle drie voormalig
handmatige stappen zijn hierop overgezet.

## Volgorde

**Losse stappen** (voor als je zelf wilt sturen of debuggen):

```
node scripts/01-fetch-referentiedata.mjs
node scripts/02-prepare-gebied.mjs "<Natura2000-naam>" <slug>
# monumentenquery uitvoeren -> monumenten-raw.txt (zie lib/rce-direct.mjs)
node scripts/03-classify-monumenten.mjs <slug>
# functie- en adresquery uitvoeren -> functie-raw.txt, adres-raw.txt
node scripts/04-verrijk-monumenten.mjs <slug>
node scripts/05-build-gebied-data.mjs <slug> "<Weergavenaam>"
node scripts/08b-fetch-richtlijn-direct.mjs <slug> "<Natura2000-naam>"
node scripts/08-verrijk-richtlijn.mjs <slug>
node scripts/06-build-gebied-html.mjs <slug>
node scripts/09-bouw-manifest.mjs <slug>
node scripts/07-build-landing-html.mjs   # één keer na een hele batch gebieden
```

**Of in één keer**, alle bovenstaande stappen achter elkaar (behalve stap 7,
die je na een hele batch gebieden zelf draait):

```
node scripts/bouw-gebied-compleet.mjs "<Natura2000-naam>" <slug> "<Weergavenaam>"
```

`node scripts/list-gebieden.mjs` toont de exacte schrijfwijze van alle 162
`naamN2K`-namen uit de landelijke cache (nodig voor stap 2).

## Directe RCE-toegang (`scripts/lib/rce-direct.mjs`)

Ontdekt bij de uitbreiding naar Limburg/Zeeland (augustus 2026): het RCE CHO
SPARQL-endpoint is gewoon rechtstreeks bevraagbaar met een POST-request
(`Content-Type: application/sparql-query`), zonder API-key. `runSparql()`
in deze module doet dat, en `naarPipeTekst()` zet het JSON-resultaat om naar
hetzelfde `kolom | kolom | ...`-tekstformaat dat de rest van de pijplijn
verwacht (zelfde format als de eerdere handmatige MCP-tool-output).

**Valkuil: backslashes in de querytekst moeten verdubbeld worden.**
`\(` is geen geldig SPARQL ECHAR (toegestaan: `\t \n \r \b \f \" \' \\`); een
compliant parser (waaronder dit endpoint) wijst een query met een kale `\(`
af. `\\(` parseert wel tot het letterlijke `\(` dat `REGEX()` nodig heeft om
een teken te escapen (zoals in de bbox-regex-filter). `runSparql()`
verdubbelt daarom élke backslash in de meegegeven query automatisch, zodat de
losse `rce-*-query.sparql`-bestanden (met enkele backslash, zoals
`bbox-regex.mjs` ze schrijft, leesbaar voor mensen) hier zonder aanpassing
werken. Vergeet dit niet als je zelf een nieuwe query met een regex-filter
schrijft en rechtstreeks via `fetch()` uitprobeert.

`scripts/08b-fetch-richtlijn-direct.mjs <slug> "<Natura2000-naam>"` haalt de
richtlijn-status op via dezelfde route (zoekt op `dc:title` in het losse
graph `graph/natura2000`, zie ook de sectie hieronder) en schrijft
`richtlijn-raw.txt` in het formaat dat `scripts/lib/richtlijn.mjs` verwacht.

## Validatie en CI

`node scripts/validate.mjs` controleert alle `data/gebieden/*/data.json`:
verplichte velden, telinvarianten (n/ja/onbekend/provCounts/datakwaliteit
moeten optellen tot wat er echt in `mons[]` staat), dat elke gebied ook een
gepubliceerde HTML-pagina heeft, en dat elk gebied een actueel
`manifest.json` heeft (zie hieronder) -- als de vastgelegde SHA-256's niet
meer kloppen met de huidige bestandsinhoud, faalt de validatie.
`.github/workflows/validate.yml` draait dit bij elke push/PR naar `main`,
samen met de bbox-regex-zelftest en een volledige herbouw van alle HTML uit
de huidige data.json's -- als die herbouw een verschil oplevert met wat
gecommit is, faalt de workflow (data en HTML mogen niet uit elkaar lopen
zonder dat iemand het merkt).

## Herkomst-manifest (`manifest.json`)

`node scripts/09-bouw-manifest.mjs <slug>` bouwt `data/gebieden/<slug>/manifest.json`:
per tussenliggend artefact (SPARQL-query, queryresultaat, afgeleid bestand)
de bron/endpoint, of het een handmatige MCP-tool-stap was, een SHA-256 van de
huidige inhoud, en het git-commit waarin dat artefact voor het eerst is
toegevoegd (als benadering van het ophaalmoment). Draai dit opnieuw na elke
wijziging aan de brondata van een gebied (`validate.mjs` signaleert een
verouderd manifest).

**Grenzen van dit manifest** (bewust niet met terugwerkende kracht op te
lossen): het legt niet het exacte tijdstip van de live SPARQL/WFS-aanroep
zelf vast, niet het aantal retries tijdens de oorspronkelijke BAG-bevraging
(`lib/bag.mjs` voert retries uit maar bewaart alleen het eindresultaat), en
het `scripts/`-commit dat wordt vastgelegd is dat van het moment van
manifest-generatie, niet noodzakelijk het commit dat de oorspronkelijke
`data.json` produceerde.

## Richtlijn-status (Vogelrichtlijn / Habitatrichtlijn)

Los van de PDOK-WFS die voor geometrie wordt gebruikt, houdt RCE een eigen
graph (`graph/natura2000`) bij met per officieel Natura 2000-gebied (RVO-
gebiedsnummer, `dc:identifier`) de beschermingsrichtlijn(en), officiële
EU-sitecode(s), een `stikstofgevoelig`-vlag en een Wikidata-kruisverwijzing.
Belangrijke eigenaardigheid: één officieel gebied kan **meerdere**
RCE-deelresources hebben met elk hun eigen richtlijn-classificatie (bv.
Rijntakken heeft een apart Vogelrichtlijn-deel en een Vogel+Habitatrichtlijn-
deel). `scripts/lib/richtlijn.mjs` aggregeert die delen tot één samenvatting
per gebied (`VR` / `HR` / `VR+HR`, plus een aparte `HR groeve`-vlag voor de
Zuid-Limburgse kalksteengroeven). `stikstofgevoelig` varieert echt tussen
gebieden - vooral grote Vogelrichtlijn-only water-/moerasgebieden staan vaak
op `false` - dus nooit aannemen dat dit overal `true` is.

## lib/ en unittests

Losse hulpfuncties met echt vertakkende logica (niet alleen I/O of DOM-opbouw) staan
in `scripts/lib/` en hebben een bijbehorend `*.test.mjs`-bestand, getest met Node's
ingebouwde testrunner (geen dependency nodig). Draai ze met:

```
node --test scripts/lib/*.test.mjs
```

`.github/workflows/validate.yml` draait dit bij elke push/PR, naast de
schema-/telinvariant-validatie (`scripts/validate.mjs`) en de bbox-regex-zelftest.
Waar `validate.mjs` controleert of de **gegenereerde data** consistent is, controleren
deze unittests het **gedrag van de functies zelf** (zie ook `adres-match.mjs`
hieronder) - een fout in de logica zou anders deterministisch naar alle gebieden
worden weggeschreven zonder dat een diff-check dat opmerkt.

- **adres-match.mjs** - koppelt één RCE-adres aan zijn BAG-gebruiksdoel, op
  postcode + huisnummer + huisletter (nooit op straatnaam: RCE en BAG schrijven
  dezelfde straat soms anders, bv. hoofdletters of afkortingen). Gebruikt door
  `05-build-gebied-data.mjs` om dit één keer te berekenen en in `data.json` op te
  slaan, in plaats van dat het detailpaneel op de gebiedspagina deze koppeling
  clientside herhaalt (zie CHANGELOG.md voor de bug die dat veroorzaakte).
- **geo.mjs** - point-in-polygon (incl. gaten), afstand-tot-polygoonrand,
  bbox-hulpfuncties. Gedeeld door classificatie en databundel-opbouw.
- **bbox-regex.mjs** - leidt de SPARQL-REGEX-bboxfilter automatisch af uit een
  numeriek bereik, in plaats van 'm met de hand te typen. **Zie de kanttekening
  hieronder** - dit bestaat vanwege een echte fout die tijdens de opbouw van
  dit project is gemaakt. Zelftest: `node scripts/lib/bbox-regex.mjs`.
- **bag.mjs** - BAG-praktijkcheck via de open PDOK BAG-WFS, met retry/backoff
  (2 pogingen, oplopende wachttijd) en een expliciete `bagStatus` per monument
  (`ok` / `geen_adres` / `geen_match_in_bbox` / `fout`) zodat een mislukte
  opzoeking nooit stilzwijgend als "geen bedrijfsindicatie" telt.
- **provincie.mjs** - provincie bepalen via point-in-polygon tegen de
  PDOK-bestuurlijke-grenzenlaag, onafhankelijk van RCE en van het
  Natura 2000-gebied zelf. Deze functie werkt per monumentpunt; voor een
  gebied zonder monumenten (bv. De Bruuk binnen de huidige 5&nbsp;km-grens,
  0 boerderijen) is er dan geen enkele provincie af te leiden. Voor de
  provincie-indeling op de landingspagina (`07-build-landing-html.mjs`)
  wordt in dat geval hetzelfde `findProvincie` hergebruikt op het bbox-midden
  van het Natura 2000-gebied zelf - een gebied belandt zo alsnog in de juiste
  sectie, zonder losse gebiedsuitzonderingen hard te coderen.
- **gebieden-beschrijving.mjs** - korte, zelfgeschreven samenvatting per
  gebied (natura2000.nl als bron, geen letterlijke overname).

## Bekende valkuilen (waarom sommige dingen zijn zoals ze zijn)

- **Cross-graph dubbeltelling zonder `SELECT DISTINCT`**: het RCE CHO-endpoint
  slaat sommige triples dubbel op in twee named graphs tegelijk (bevestigd:
  `?rm ceo:rijksmonumentnummer "<nr>"` staat zowel in `graph/instanties-rce`
  als in `graph/punten`). Een query zonder `GRAPH`-clausule matcht dan in
  beide graphs, en zonder `DISTINCT` komt elke rij dubbel terug. Alle
  query-templates in dit project (`rce-monumenten-query.sparql`,
  `rce-functie-query.sparql`, `rce-adres-query.sparql`) gebruiken daarom
  bewust `SELECT DISTINCT` - nooit weglaten bij een nieuwe handmatige query,
  ook niet als die alleen een paar velden opvraagt.

- **CQL_FILTER wordt door de gebruikte PDOK-WFS-endpoints
  (`natura2000:natura2000`, `bag:verblijfsobject`) stilzwijgend genegeerd** —
  je krijgt dan alle features terug in plaats van een foutmelding. Alleen
  `BBOX`-filters (en de aanpak hier: ongefilterd ophalen + zelf filteren in
  JS) bleken op deze endpoints betrouwbaar. Test dit opnieuw als je ooit
  CQL_FILTER probeert te gebruiken op een van deze diensten - neem niet
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
- **Een monument in RCE's Rijksmonument-class is niet per se nog een actief
  rijksmonument.** `ceo:heeftJuridischeStatus` kent (naast `rijksmonument`)
  ook de waarde `geen rijksmonument` (SKOS-concept
  `https://data.cultureelerfgoed.nl/term/id/rn/2/3e79bb7c-b459-4998-a9ed-78d91d069227`),
  bijvoorbeeld na sloop of een statuswijziging. Ontdekt doordat 2 van de 38
  live-geverifieerde monumenten uit de handmatige steekproef een HTTP 404 gaven
  op het officiële Monumentenregister (zie `KWALITEITSCONTROLE.md`) - een
  daaropvolgende controle van alle op dat moment gepubliceerde monumenten
  vond 42 gevallen (~4%) met deze status, die de pijplijn tot dan toe niet
  filterde. `scripts/02-prepare-gebied.mjs` sluit deze status nu uit bij de
  bron (met `OPTIONAL`/`BOUND`, omdat een klein deel van alle Rijksmonument-
  records dit veld helemaal mist - vrijwel altijd aanwezig, 67494 van 67496
  landelijk, maar niet aannemen dat het overal gegarandeerd is).

## Dataset-release-kandidaat

`node scripts/10-bouw-release-kandidaat.mjs [versielabel]` schrijft
`release-kandidaat.json` (repo-root): per gebied naam/peildatum/aantallen en
een SHA-256 van `data.json`, plus een totaaltelling en het huidige commit.
Dit script tagt of publiceert zelf niets - het is alleen een voorbereid
overzicht dat als basis kan dienen voor een handmatige `git tag` + GitHub
Release, een keuze die bij de repo-eigenaar blijft.

## Status

Alle 53 gebieden staan in `data/gebieden/<slug>/data.json` en worden volledig
via deze pijplijn onderhouden; er is geen aparte, oudere aanpak meer.
`scripts/07-build-landing-html.mjs` genereert `index.html` puur uit
`data/gebieden/*/data.json` en kan op elk moment veilig opnieuw gedraaid
worden. De eerste 25 (Gelderland/validatieprovincies) zijn destijds via de
rce-cho MCP-tool opgebouwd; de 28 daarna (heel Limburg en Zeeland) via de
directe HTTP-route (`scripts/bouw-gebied-compleet.mjs`) - qua resultaat
identiek, alleen de manier van ophalen verschilt (zie hierboven).
