# Changelog

Overzicht van afgeronde verbeteringen, meestal naar aanleiding van een externe review.
Voor de huidige staat en openstaande punten: zie [README.md](README.md). Voor de
precieze wijzigingen per gebied: `git log`. Entries staan in omgekeerd-chronologische
volgorde; een latere entry kan dus een eerdere entry corrigeren of vervangen. Waar dat
kan verwarren, is dat expliciet benoemd.

## Unittests voor geo.mjs, en het herkomst-manifest 15x sneller

Naar aanleiding van een eigen kritische zelfreflectie ("wat mis je aan wat je
gebouwd hebt"): `scripts/lib/geo.mjs` (point-in-polygon, afstand-tot-rand -
de geometrische kern die bepaalt of een monument bij een gebied hoort) had
geen unittests, in tegenstelling tot `adres-match.mjs`. 17 tests toegevoegd
(`geo.test.mjs`), inclusief een concave ring, gaten in een polygon, en de
clamp op een segmenteinde bij de afstandsberekening - geverifieerd met een
mutatietest (clamp weghalen laat de test falen).

**Herkomst-manifest was te traag om te blijven schalen.**
`scripts/09-bouw-manifest.mjs` deed één `git log --follow`-aanroep per
artefact (11 per gebied): ~1,8s per gebied, ~7 minuten voor alle 53 gebieden
samen. Nu één `git log`-aanroep per gebied die de hele geschiedenis van die
gebiedsmap in één keer doorloopt: ~0,4s per gebied, ~28s voor alle 53 samen
(15x sneller in totaal). Geverifieerd dat de uitkomst exact hetzelfde is als
voorheen (getest op een gebied met bestanden uit meerdere, verspreide
commits). Zie `scripts/README.md` voor de bewuste vereenvoudiging (geen
`--follow` meer nodig, want deze artefacten worden nooit hernoemd).

## Redactionele afronding van de 28 nieuwe gebieden, en een dubbele sitecode-weergave

Reviewer-vondst: Geuldal en Oosterschelde (en alle andere 26 nieuwe gebieden) toonden
nog de bouw-placeholder "(nog geen beschrijving toegevoegd aan
scripts/lib/gebieden-beschrijving.mjs)" in plaats van een echte gebiedsbeschrijving,
met de bronlink dus ook nog naar de algemene natura2000.nl-gebiedenlijst in plaats van
de eigen gebiedspagina. Technisch waren de pagina's af, redactioneel niet. Voor alle 28
gebieden is nu een eigen, zelfgeschreven samenvatting (type natuurgebied, ligging,
oppervlakte, beschermingsreden) en een directe natura2000.nl-link toegevoegd, op
dezelfde manier als de eerste 25 gebieden.

`scripts/validate.mjs` controleert voortaan of elk gebied een niet-placeholder
beschrijving heeft, en of de bronlink naar een specifieke gebiedspagina wijst
(`.../gebieden/<provincie>/<gebied>`) in plaats van naar de generieke lijst -- zodat een
volgende batch nieuwe gebieden niet opnieuw technisch groen maar redactioneel
onvolledig gepubliceerd kan worden.

**Bijvangst: dubbele sitecode-weergave.** Oosterschelde (en 5 andere gebieden) toonden
"sitecode NL3009016 / NL3009016" -- het Vogel- en Habitatrichtlijndeel delen daar
dezelfde EU-sitecode, en de weergavelogica dedupliceerde niet. Gelijke VR-/HR-codes
worden nu één keer getoond; bij afwijkende codes staat het nu expliciet als
"VR-sitecode ... · HR-sitecode ...".

**Bijvangst: een batch-rebuildbug door `ls`'s trailing slash.** Bij het herbouwen van
alle 53 gebiedspagina's bleek `for slug in $(ls data/gebieden); do ...` in deze
omgeving een `slug` met een trailende `/` op te leveren (deze `ls` classificeert
directories met een `/`-achtervoegsel), waardoor scripts stilzwijgend naar
`gebieden/<slug>/.html` schreven in plaats van naar `gebieden/<slug>.html` -- een
nieuwe, foutieve submap per gebied, terwijl het echte bestand ongemoeid bleef. Alle 53
foutieve submappen zijn verwijderd. Zie `scripts/README.md`, "Bekende valkuilen": voortaan
altijd itereren via `for dir in data/gebieden/*/; do slug=$(basename "$dir"); ...`,
nooit via `$(ls ...)`.

## Uitbreiding naar Limburg en Zeeland (28 nieuwe gebieden), en een grote pijplijnvereenvoudiging

25 naar 53 verwerkte gebieden: heel Limburg en heel Zeeland, zuid naar noord. Nieuwe
totalen: 3147 boerderijen, 512 met BAG-industriefunctie-indicatie, 38 niet te
controleren (was 1130/179/12). Zie README.md voor de volledige lijst per gebied.

**Bijvangst: het RCE CHO SPARQL-endpoint bleek direct bevraagbaar.**
`scripts/README.md` documenteerde tot dan toe dat er "geen publiek, sleutelloos
SPARQL-endpoint gevonden" was voor RCE CHO, en dat drie stappen daarom de rce-cho
MCP-tool nodig hadden. Bij het opzetten van deze batch bleek
`https://api.linkeddata.cultureelerfgoed.nl/datasets/rce/cho/sparql` gewoon te
reageren op een POST met `Content-Type: application/sparql-query`, zonder API-key.
Valkuil onderweg: backslashes in een regex-filter (de bbox-filter) moeten in de
querytekst verdubbeld worden om als geldige SPARQL-stringliteral-escape te parseren
(`\(` is geen geldig SPARQL ECHAR, `\\(` wel). Vastgelegd in het nieuwe
`scripts/lib/rce-direct.mjs`. Alle drie voormalig handmatige stappen (monumenten-,
functie/adres- en richtlijn-query) draaien hierdoor nu volledig automatisch, gebundeld
in het nieuwe `scripts/bouw-gebied-compleet.mjs` (één commando van Natura2000-naam tot
gepubliceerde HTML). De eerste 25 gebieden zijn destijds nog wel via de MCP-tool
gebouwd, wat inhoudelijk gelijkwaardig is; alleen de ophaalmethode verschilt.

## Detailpaneel toonde soms "geen BAG-match" terwijl er wel een match was

Gevonden via een externe review (rmnr 37890, Geleenbeekdal): het detailpaneel op de
gebiedspagina koppelde een RCE-adres aan zijn BAG-gebruiksdoel door onder andere de
straatnaam te vergelijken, hoofdlettergevoelig ("Op Gen Hek" vs. "Op gen Hek"). De
BAG-koppeling zelf (`lib/bag.mjs`) matcht nooit op straatnaam, alleen op postcode +
huisnummer + huisletter; het detailpaneel deed dus een eigen, striktere en foutieve
tweede vergelijking naast de al correcte eerste. Gecontroleerd over alle 25 gebieden:
44 van de 1514 adressen (circa 3%) hadden hierdoor een gemiste match, niet alleen door
hoofdletterverschillen maar ook door afwijkende schrijfwijzen ("Burg H vd Boschstraat"
vs. "Burgemeester van den Boschstraat").

Opgelost door de koppeling niet langer in de browser te herhalen: `scripts/lib/adres-match.mjs`
(nieuw, met unittests via `node --test`) berekent per adres het gebruiksdoel nu één
keer tijdens het bouwen van `data.json` (`scripts/05-build-gebied-data.mjs`), zonder
straatnaam als vergelijkingssleutel. Het detailpaneel leest dit veld nu alleen nog
uit. `scripts/validate.mjs` controleert voortaan dat dit veld overeenkomt met wat de
matchfunctie zelf zou opleveren, zodat build- en weergavelogica niet opnieuw uit elkaar
kunnen lopen.

## Echte kaartondergrond (Leaflet + CARTO/OpenStreetMap)

Reviewer-vraag: "ik zou willen doorklikken naar een gewone ondergrond om een idee te
krijgen van de werkelijke ligging". De kaart toonde alleen abstracte punten en een
polygoon, zonder wegen, plaatsnamen of andere geografische context. `scripts/06-build-gebied-html.mjs`
gebruikt nu Leaflet + CARTO `light_all`-tiles (hetzelfde patroon als
[aardbevingen-en-rijksmonumenten](https://jolietjakeblues.github.io/aardbevingen-en-rijksmonumenten/)
en [footprint_percelen](https://jolietjakeblues.github.io/footprint_percelen/)) in plaats van de
eigen canvas-tekening. Behouden: dezelfde kleur-/randcodering per status, klik-op-punt-detailpaneel,
filterchips en de toetsenbord-toegankelijke lijst. Geprototypeerd en gestresstest op Geleenbeekdal
(296 punten) voor akkoord, daarna doorgetrokken naar alle 25 gebieden.

**Let op:** dit vervangt de canvas-kaart uit de "Toegankelijkheid buiten de kaart"-entry
verderop in dit document; verwijzingen naar "de canvas-kaart" daar zijn dus historisch,
niet de huidige situatie.

Bewuste afweging: de gebiedspagina's waren tot nu toe volledig zelfstandige, offline-werkende
bestanden. Met een CARTO/OpenStreetMap-ondergrond laden ze voortaan tegels van een externe
tileserver bij elk bezoek.

## Kwaliteitscontrole, herkomst en licenties

- **Pijplijn controleerde niet of een monument nog wél een rijksmonument is.**
  Opgelost. Gevonden tijdens de handmatige steekproefcontrole: RCE's eigen
  `heeftJuridischeStatus`-veld kent naast `rijksmonument` ook `geen rijksmonument`
  (bv. na sloop), en dit werd nergens gecontroleerd. Bij de op dat moment 25
  gepubliceerde gebieden bleken 42 van de 1026 unieke monumenten (~4%) deze
  afgevoerde status te hebben. `scripts/02-prepare-gebied.mjs` sluit deze status nu
  uit bij de bron; de 42 al-gepubliceerde gevallen zijn verwijderd uit de 8
  betrokken gebieden.
- **Steekproefsgewijze validatie.** Opgelost. Een steekproef van 95 monumenten is
  structureel gecontroleerd en een deelsteekproef van 38 daarvan handmatig
  geverifieerd tegen het officiële Rijksmonumentenregister. Geaggregeerde
  resultaten en fouttypen: zie [KWALITEITSCONTROLE.md](KWALITEITSCONTROLE.md).
  Bijvangst: een traceerbaarheidsbug in `scripts/lib/bag.mjs` (ontbrekende
  huisletter in opgeslagen BAG-matchresultaten) gevonden en gerepareerd.
- **Herkomst-manifest per gebied ontbrak.** Opgelost. `scripts/09-bouw-manifest.mjs`
  legt per tussenliggend artefact (SPARQL-query, queryresultaat, afgeleid bestand)
  de bron/endpoint, of het een handmatige stap was, een SHA-256 en het git-commit
  van eerste toevoeging vast in `data/gebieden/<slug>/manifest.json`; `validate.mjs`
  faalt als een manifest achterhaald is geraakt. Zie `scripts/README.md` voor de
  expliciete grenzen (geen retroactief queryttijdstip of retry-historie). Daarnaast
  bereidt `scripts/10-bouw-release-kandidaat.mjs` een dataset-release-overzicht
  voor (`release-kandidaat.json`, niet zelf getagd of gepubliceerd).
- **Geen licentie aanwezig.** Opgelost. Broncode: MIT ([LICENSE](LICENSE)).
  Gepubliceerde datasets: CC BY 4.0 ([DATA_LICENSE.md](DATA_LICENSE.md)), met een
  per-bron overzicht van herkomst en voorwaarden (RCE, PDOK/RVO, BAG/Kadaster).
- **Verdiepte datavalidatie.** Opgelost. `scripts/validate.mjs` controleert nu
  per veld type/bereik, telt elke statuscategorie exact (niet alleen de som),
  detecteert ontbrekende én verweesde databestanden in beide richtingen, en
  controleert de herkomst-manifesten. `.github/workflows/validate.yml` draait dit
  bij elke push/PR, samen met een volledige HTML-herbouw-diff.

## Terminologie en toegankelijkheid

- **De term "actieve bedrijfsindicatie" was kwetsbaar.** Opgelost. Overal
  hernoemd naar **BAG-industriefunctie-indicatie**, en de onzekerheidsstatus per
  monument hernoemd naar `industrie_aangetroffen` / `industrie_deels_aangetroffen`
  / `geen_industrie_aangetroffen` in plaats van `actief`/`niet_actief`. Vooral
  dat laatste suggereerde een bevestiging die de BAG niet levert. De BAG bevestigt
  een gebruiksdoel van een verblijfsobject, geen actieve of inactieve
  bedrijfsvoering. Dit vervangt ook de labels "eenduidig actief / actief maar
  onzeker / bevestigd niet-actief" uit de oorspronkelijke aankondiging van het
  datakwaliteitsdashboard verderop in dit document; die labels zijn de
  toenmalige, inmiddels vervangen terminologie.
- **Inconsistentie "stikstofgevoelig" vs. volledige PDOK-laag.** Gecorrigeerd. De
  landingspagina claimde "stikstofgevoelige Natura 2000-gebieden" terwijl de
  methode expliciet zegt dat de volledige PDOK-laag zonder die filter wordt
  gebruikt. Tekst aangepast.
- **"5 km" werd als ecologische invloedssfeer gepresenteerd.** Gecorrigeerd. Vijf
  kilometer is een gekozen selectievenster, geen vastgestelde ecologische
  invloedssfeer; de tekst benoemt dit nu expliciet.
- **Toegankelijkheid buiten de kaart.** Gedeeltelijk opgelost (destijds; zie de
  Leaflet-migratie hierboven voor de huidige kaartimplementatie). Elke
  gebiedspagina kreeg een uitklapbare, toetsenbord- en schermlezer-toegankelijke
  lijst (rm-nr, plaats, afstand, status) als alternatief voor de toenmalige
  canvas-kaart. Nog open: kleurenblind-vriendelijke symbolen op de kaart zelf, en
  de kaartpunten focusbaar/toetsenbordbedienbaar maken (zie README, "Nog te doen").
- **Stikstofgevoelig-markering ontbrak.** Opgelost. De richtlijn-status haalt
  deze vlag nu per gebied op uit de RCE natura2000-graph en toont 'm; de opzet
  filtert er nog steeds niet op (gebruikt de volledige landelijke PDOK-laag),
  maar de vlag zelf staat nu zichtbaar op elke gebiedspagina.

## Onzekerheidsstatus, detailweergave en datakwaliteitsdashboard

Reviewer-aangemerkte topprioriteiten uit een externe review, alle drie opgelost. **Let
op:** de labels in punt 3 hieronder zijn de labels waarmee het dashboard oorspronkelijk
werd aangekondigd; ze zijn sindsdien hernoemd (zie "Terminologie en toegankelijkheid"
hierboven) naar `industrie_aangetroffen` / `industrie_deels_aangetroffen` / etc.

1. **Explicietere onzekerheidsstatus per monument.** Elk monument krijgt nu een
   status uit `industrie_aangetroffen` (eenduidig) / `industrie_deels_aangetroffen`
   (industriefunctie gevonden, maar niet bij alle adressen van dit monument
   eensluidend) / `geen_industrie_aangetroffen` / `geen_adres` / `geen_match` /
   `bag_mislukt`, bewust géén "actief"/"niet actief"-taal, want de BAG bevestigt
   een gebruiksdoel, geen bedrijfsvoering. Op de kaart: een dubbele donkerblauwe
   rand voor `industrie_deels_aangetroffen`, zichtbaar naast de bestaande
   effen/gestippelde randen.
2. **"Waarom staat dit punt hier?"-detailweergave per monument.** Klik op een
   punt op de kaart toont een detailpaneel: rijksmonumentnummer met link naar de
   RCE-bron, oorspronkelijke functie, afstand tot de gebiedsrand (of "binnen het
   gebied"), provincie, onzekerheidsstatus, elk bekend adres met het daarbij
   gevonden BAG-gebruiksdoel, en de peildatum.
3. **Datakwaliteitsdashboard per gebied.** Nieuwe kaart op elke gebiedspagina, toen
   aangekondigd met de labels: aantal eenduidig actief / actief maar onzeker /
   bevestigd niet-actief / geen adres bekend / geen BAG-match / BAG-bevraging
   mislukt / monumenten met meerdere adressen.

Retroactief toegepast op de oorspronkelijke 17 gemigreerde gebieden (opnieuw
volledig opgehaald, inclusief de tussenliggende provenance-data die bij de
eerste migratie verloren was gegaan).

## Bouwpijplijn (juli 2026)

Tot juli 2026 leefde deze pijplijn alleen als losse, ad-hoc scripts in een
sessie-scratchpad: niet reproduceerbaar, niet controleerbaar, en gevoelig voor
handmatige fouten. Omgezet naar de duurzame versie in [`scripts/`](scripts/README.md):

- Herbruikbare, dependency-loze Node-scripts voor referentiedata ophalen, een
  gebied voorbereiden, monumenten classificeren, verrijken (BAG + provincie) en
  de HTML genereren.
- **Sanity-check op de handgeschreven bbox-regex.** `scripts/lib/bbox-regex.mjs`
  leidt de REGEX-bboxfilter nu mechanisch af uit de echte gebieds-bbox (met
  0.15° marge), in plaats van 'm met de hand te typen. Inclusief een zelftest
  die precies de foutklasse afdekt die bij Rijntakken misging (een verkeerd
  cijferbereik hield een monument stilzwijgend buiten de query). Bijvangst:
  dezelfde Natura2000-WFS bleek zonder waarschuwing ook RD i.p.v. WGS84 te
  kunnen teruggeven; ook daar is een harde controle tegen ingebouwd
  (`assertWgs84NL`).
- **Retry/backoff voor de BAG-WFS-calls.** `scripts/lib/bag.mjs` doet 2
  automatische retries met oplopende wachttijd per monument.
- **CQL_FILTER-valkuil gedocumenteerd** in `scripts/README.md`, sectie "Bekende
  valkuilen": de gebruikte PDOK-WFS-endpoints negeren dit filter stilzwijgend.
- **De 17 oorspronkelijke gebieden gemigreerd** naar deze pijplijn. Alle
  `data/gebieden/<slug>/data.json`-bestanden staan sindsdien in de repo;
  `gebieden/*.html` en `index.html` worden met `scripts/06-build-gebied-html.mjs`
  resp. `scripts/07-build-landing-html.mjs` gegenereerd. Gecontroleerd dat alle
  cijfers (n, ja, onbekend, per-provincie) exact overeenkwamen met de eerder
  gepubliceerde versie. Rijntakken had als enige nog een afwijkend
  databundel-schema (`gld`/`ovij` i.p.v. het generieke `provCounts`);
  genormaliseerd naar hetzelfde schema als de andere 16 gebieden.
- **Peildatum stond hardcoded.** De pijplijn leidt 'm nu automatisch af uit het
  moment van genereren.
- **Eerste CI-validatie.** `.github/workflows/validate.yml` draait bij elke
  push/PR: de bbox-regex-zelftest, schema- en telinvariant-validatie
  (`scripts/validate.mjs`), en herbouwt alle HTML uit de huidige data om te
  controleren dat data en gepubliceerde pagina's niet uit elkaar lopen.

## Cross-graph dubbeltelling (RCE CHO)

Vastgesteld dat het RCE CHO-endpoint sommige triples dubbel opslaat in twee
named graphs tegelijk (`graph/instanties-rce` en `graph/punten`). Een query
zonder `GRAPH`-clausule matcht dan in beide graphs, en zonder `DISTINCT` komt
elke rij dubbel terug. Alle query-templates in dit project gebruiken daarom
`SELECT DISTINCT`. Zie `scripts/README.md`, "Bekende valkuilen".
