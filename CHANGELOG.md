# Changelog

Overzicht van afgeronde verbeteringen, meestal naar aanleiding van een externe review.
Voor de huidige staat en openstaande punten: zie [README.md](README.md). Voor de
precieze wijzigingen per gebied: `git log`. Entries staan in omgekeerd-chronologische
volgorde; een latere entry kan dus een eerdere entry corrigeren of vervangen. Waar dat
kan verwarren, is dat expliciet benoemd.

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
