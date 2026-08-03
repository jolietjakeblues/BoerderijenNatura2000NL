# BoerderijenNatura2000NL

Landsdekkend overzicht van rijksmonumentale boerderijen binnen 5 km van een Natura 2000-gebied
(een gekozen selectievenster, geen ecologische invloedssfeer). Opvolger van
[StikstofGelderland](https://github.com/jolietjakeblues/StikstofGelderland),
maar dan **gebied-primair in plaats van provincie-primair**: per Natura 2000-gebied verwerkt en
gepubliceerd, in plaats van in één keer alle rijksmonumentale boerderijen van een hele provincie.

Live: [index.html](index.html) · gebiedspagina's in [gebieden/](gebieden/)

## Waarom gebied-primair

Een Natura 2000-gebied houdt zich niet aan provinciegrenzen. Door per gebied te werken (in plaats
van per provincie) hoeft er geen keuze gemaakt te worden aan welke provincie een grensoverschrijdend
gebied "toebehoort", en kan elk gebied apart geverifieerd worden voordat het volgende wordt
toegevoegd. Provincie is in deze opzet een **weergavelaag** (achteraf bepaald via een
point-in-polygon-toets tegen de officiële PDOK-provinciegrenzen), geen zoekgrens.

## Status: 25 van de 162 Natura 2000-gebieden verwerkt

Nederland telt 162 Natura 2000-gebieden (bron: PDOK/RVO, waarvan 4 mariene gebieden in de
Exclusieve Economische Zone op de Noordzee, buiten scope voor dit project). Hiervan zijn er tot nu
toe 25 verwerkt:

| Gebied | Provincie(s) | Boerderijen | Actieve bedrijfsindicatie | BAG niet te controleren |
|---|---|---:|---:|---:|
| [Rijntakken – IJssel-traject](gebieden/rijntakken.html) | Gelderland / Overijssel | 241 | 49 | 3 |
| [Landgoederen Brummen](gebieden/landgoederen-brummen.html) | Gelderland | 59 | 10 | 0 |
| [Willinks Weust](gebieden/willinks-weust.html) | Gelderland | 21 | 3 | 0 |
| [Bekendelle](gebieden/bekendelle.html) | Gelderland | 25 | 2 | 0 |
| [Korenburgerveen](gebieden/korenburgerveen.html) | Gelderland | 24 | 3 | 0 |
| [Stelkampsveld](gebieden/stelkampsveld.html) | Gelderland | 25 | 4 | 0 |
| [Wooldse Veen](gebieden/wooldse-veen.html) | Gelderland | 10 | 1 | 0 |
| [Sint Jansberg](gebieden/sint-jansberg.html) | Limburg / Noord-Brabant | 4 | 1 | 0 |
| [Zeldersche Driessen](gebieden/zeldersche-driessen.html) | Limburg / Noord-Brabant | 4 | 1 | 0 |
| [Binnenveld](gebieden/binnenveld.html) | Gelderland / Utrecht | 6 | 0 | 1 |
| [De Bruuk](gebieden/de-bruuk.html) | Gelderland | 0 | 0 | 0 |
| [Lieftinghsbroek](gebieden/lieftinghsbroek.html) | Groningen | 14 | 2 | 0 |
| [Norgerholt](gebieden/norgerholt.html) | Drenthe | 44 | 3 | 0 |
| [Witterveld](gebieden/witterveld.html) | Drenthe | 8 | 1 | 0 |
| [Elperstroomgebied](gebieden/elperstroomgebied.html) | Drenthe | 33 | 4 | 1 |
| [Bakkeveense Duinen](gebieden/bakkeveense-duinen.html) | Fryslân | 6 | 1 | 0 |
| [Drouwenerzand](gebieden/drouwenerzand.html) | Drenthe | 8 | 2 | 0 |
| [Kolland & Overlangbroek](gebieden/kolland-overlangbroek.html) | Gelderland / Utrecht | 100 | 17 | 1 |
| [Zouweboezem](gebieden/zouweboezem.html) | Utrecht / Zuid-Holland | 64 | 6 | 0 |
| [Regte Heide & Riels Laag](gebieden/regte-heide-riels-laag.html) | Noord-Brabant | 16 | 1 | 1 |
| [Vlijmens Ven, Moerputten & Bossche Broek](gebieden/vlijmens-ven.html) | Noord-Brabant | 47 | 6 | 0 |
| [Leudal](gebieden/leudal.html) | Limburg | 22 | 4 | 0 |
| [Swalmdal](gebieden/swalmdal.html) | Limburg | 22 | 4 | 1 |
| [Roerdal](gebieden/roerdal.html) | Limburg | 31 | 4 | 0 |
| [Geleenbeekdal](gebieden/geleenbeekdal.html) | Limburg | 296 | 50 | 4 |
| **Totaal (25 gebieden)** | | **1130** | **179** | **12** |

Let op: de totaaltelling is een **som van per-gebied cijfers**, geen aantal unieke monumenten
landelijk - een monument dat dicht bij meerdere Natura 2000-gebieden ligt (bv. tussen Bekendelle en
Korenburgerveen) telt terecht in beide gebiedspagina's mee. De kolom "BAG niet te controleren" is
géén bevestigde NEE - zie de toelichting bij taak 10 hieronder. Deze aantallen zijn lager dan een
eerdere versie van deze tabel: 42 monumenten die RCE zelf niet meer als rijksmonument classificeert
(`heeftJuridischeStatus` = "geen rijksmonument") zijn verwijderd - zie
[KWALITEITSCONTROLE.md](KWALITEITSCONTROLE.md) voor de vondst en de aanpak.

**Resterend: 137 gebieden** (133 landgebieden + 4 mariene gebieden die waarschijnlijk buiten scope
blijven). Nog geen vaste volgorde vastgesteld; gewerkt vanuit Gelderland (Achterhoek, IJssel,
Nijmegen-Mook, Gelderse Vallei), met bewust een paar provinciegrensgevallen erbij
(Gelderland/Overijssel, Limburg/Noord-Brabant, Gelderland/Utrecht), uitgebreid naar Groningen,
Drenthe en Fryslân om de aanpak ook buiten het zuidoosten te valideren, en vervolgens naar Utrecht,
Zuid-Holland, Noord-Brabant en Zuid-Limburg (met opnieuw twee provinciegrensgevallen: Kolland &
Overlangbroek en Zouweboezem). Nog niet aangeraakt: Noord-Holland, Zeeland en Noord-Limburg als
hoofdgebied, en de grote gebieden (Veluwe, Waddenzee) die vanwege hun omvang bewust nog niet zijn
opgepakt.

## Methode per gebied

1. **Monumenten**: RCE CHO-endpoint (linked data), rijksmonumenten met oorspronkelijke functie
   "boerderij" (labels als "Boerderij (M)", "Boerderij(M1)";coderingen tussen haakjes worden
   afgeknipt), met puntgeometrie.
2. **Natura 2000-geometrie**: officiële landelijke WFS (`service.pdok.nl/rvo/natura2000`).
3. **Selectie**: een monument valt in de pilot-set van een gebied als het **binnen** de
   gebiedsgeometrie ligt (echte point-in-polygon-toets, inclusief gaten in de polygoon) **of**
   binnen **5 km** hemelsbreed van de daadwerkelijke gebiedsrand (niet van een bounding box).
4. **Provincie**: apart bepaald via point-in-polygon tegen de PDOK-bestuurlijke-grenzenlaag
   (`bestuurlijkegebieden:Provinciegebied`); onafhankelijk van het Natura 2000-gebied en van RCE.
5. **BAG-industriefunctie-indicatie**: adres per monument opgehaald via RCE (BAG-relatie), daarna
   gebruiksdoel opgezocht in de open PDOK BAG-WFS (`bag:verblijfsobject`), gematcht op postcode en
   huisnummer. Industriefunctie op het adres = BAG-industriefunctie-indicatie (een aanwijzing, geen
   bewijs van actieve bedrijfsvoering). Monumenten met uitsluitend woonfunctie (geen industrie, geen
   logies/bijeenkomst) tellen **niet** mee (conservatieve keuze) - dat betekent een afwezige
   industriefunctie-aanwijzing, geen bevestiging van inactiviteit. Monumenten zonder BAG-adres in RCE,
   of zonder match in de BAG-zoekbox, krijgen een aparte status **"BAG niet te controleren"** - deze
   tellen niet mee, maar zijn nadrukkelijk geen bevestigde afwezigheid van bedrijfsvoering (op de kaart
   een gestippelde grijze rand i.p.v. de blauwe rand van een gevonden industriefunctie).
6. **Gebiedsbeschrijving**: korte, zelfgeschreven samenvatting (type natuurgebied, ligging,
   oppervlakte, beschermingsreden) op basis van [natura2000.nl](https://www.natura2000.nl/gebieden),
   met bronvermelding per gebiedspagina.
7. **Richtlijn-status**: Vogelrichtlijn (VR) / Habitatrichtlijn (HR) / combinatie (VR+HR), plus een
   losse markering voor de Zuid-Limburgse Habitatrichtlijn-kalksteengroeven, opgehaald uit het losse
   RCE-graph `graph/natura2000` (naast de PDOK-WFS voor geometrie). Dit graph houdt ook een
   `stikstofgevoelig`-vlag en officiële EU-sitecodes per gebied bij, plus een Wikidata-kruisverwijzing
   - beide getoond op de gebiedspagina met een link naar de RCE linked-data-bron zelf. De
   `stikstofgevoelig`-vlag is een getoond kenmerk, geen selectiefilter (zie hieronder); hij varieert
   echt per gebied en staat bijvoorbeeld bij grote Vogelrichtlijn-only water-/moerasgebieden vaak op
   onwaar.

### Bewuste beperking van de huidige scope

Voor nu wordt alléén de klasse **"erin" + "≤ 5 km"** meegenomen (zie het TODO hieronder voor
uitbreiding). Dat betekent dat een gebied als De Bruuk als "0 boerderijen" verschijnt, terwijl de
dichtstbijzijnde boerderij daar in werkelijkheid op 5,6 km ligt;net buiten de huidige grens, niet
omdat er niets in de buurt is.

### Waarom geen BAG API-key

De Kadaster "individuele bevragingen"-API voor BAG-detail (`bag_address_detail`) vereist een
`BAG_API_KEY` die in deze omgeving niet beschikbaar is. In plaats daarvan wordt de publieke,
sleutelloze PDOK BAG-WFS (`service.pdok.nl/lv/bag/wfs/v2_0`) gebruikt, die hetzelfde
`gebruiksdoel`-veld levert.

## Nog te doen

- **Volledig afstands-bucketschema** invoeren: erin / < 250 m / < 1 km / < 5 km / < 25 km / ≥ 25 km
  (nu alleen erin + ≤ 5 km). Bewust uitgesteld tot na de landsdekkende opbouw van de eerste ronde
  gebieden.
- ~~Afstemmen op de **"stikstofgevoelig"-markering** uit de RCE natura2000-graph~~ - **opgelost.**
  De richtlijn-status (zie Methode, punt 7) haalt deze vlag nu per gebied op en toont 'm; de opzet
  filtert er nog steeds niet op (gebruikt de volledige landelijke PDOK-laag), maar de vlag zelf staat
  nu zichtbaar op elke gebiedspagina in plaats van ontbrekend.
- De resterende ~137 Natura 2000-gebieden landsdekkend toevoegen.
- **Download-knop (CSV)** per gebiedspagina: monumentenlijst (nr, adres, provincie, afstand, functie,
  status) exporteren.
- ~~**Klikbare popup voor een monument**~~ - **opgelost.** Zie Geloofwaardigheid/interpretatie, punt 2.
- **Klikbare popup voor het Natura 2000-gebied zelf** op de kaart, met de gebiedsbeschrijving.

### Stabiliteit / veiligheid (niet alleen features)

- ~~**Bouwpijplijn van scratchpad naar de repo**~~ - **opgelost.** Zie [`scripts/`](scripts/README.md):
  herbruikbare, dependency-loze Node-scripts voor referentiedata ophalen, een gebied voorbereiden,
  monumenten classificeren, verrijken (BAG + provincie) en de HTML genereren. Twee stappen blijven
  handmatig (de RCE CHO-query via de MCP-tool, zie `scripts/README.md`) - de rest is volledig
  geautomatiseerd en getest.
- ~~**Sanity-check op de handgeschreven bbox-regex**~~ - **opgelost.** `scripts/lib/bbox-regex.mjs`
  leidt de REGEX-bboxfilter nu mechanisch af uit de echte gebieds-bbox (met 0.15° marge), in plaats van
  'm met de hand te typen - inclusief een zelftest (`node scripts/lib/bbox-regex.mjs`) die precies de
  foutklasse afdekt die bij Rijntakken misging. Bijvangst tijdens het herbouwen: dezelfde
  Natura2000-WFS bleek zonder waarschuwing ook RD i.p.v. WGS84 te kunnen teruggeven (zie
  `scripts/README.md`) - ook daar is nu een harde controle tegen ingebouwd.
- ~~**Retry/backoff voor de BAG-WFS-calls**~~ - **opgelost.** `scripts/lib/bag.mjs` doet 2 automatische
  retries met oplopende wachttijd per monument.
- ~~**CQL_FILTER-valkuil documenteren**~~ - **opgelost.** Zie `scripts/README.md`, sectie
  "Bekende valkuilen".
- ~~**Migreer de 17 bestaande gebieden naar de nieuwe pijplijn**~~ - **opgelost.** Alle 17
  `data/gebieden/<slug>/data.json`-bestanden staan nu in de repo; `gebieden/*.html` en `index.html`
  worden voortaan met `scripts/06-build-gebied-html.mjs` resp. `scripts/07-build-landing-html.mjs`
  gegenereerd. Gecontroleerd dat alle cijfers (n, ja, onbekend, per-provincie) exact overeenkomen met
  de eerder gepubliceerde versie. Rijntakken had als enige nog een afwijkend databundel-schema
  (`gld`/`ovij` i.p.v. het generieke `provCounts`) en een losstaande titel/badge-opmaak; genormaliseerd
  naar hetzelfde schema en dezelfde generieke sjabloon als de andere 16 gebieden.
- ~~**Peildatum staat hardcoded**~~ - **opgelost.** De pijplijn (`scripts/05-build-gebied-data.mjs`)
  leidt 'm nu automatisch af uit het moment van genereren.
- ~~**"Getest" is niet hetzelfde als automatisch bewaakt**~~ - **opgelost.** CI-workflow
  (`.github/workflows/validate.yml`) draait bij elke push/PR: de bbox-regex-zelftest, schema- en
  telinvariant-validatie over alle `data.json`-bestanden (`scripts/validate.mjs`), en herbouwt alle
  HTML uit de huidige data om te controleren dat data en gepubliceerde pagina's niet uit elkaar lopen.
- ~~**Herkomst-manifest per gebied ontbreekt**~~ - **opgelost.** `scripts/09-bouw-manifest.mjs <slug>`
  legt per tussenliggend artefact (SPARQL-query, queryresultaat, afgeleid bestand) de bron/endpoint,
  of het een handmatige stap was, een SHA-256 en het git-commit van eerste toevoeging vast in
  `data/gebieden/<slug>/manifest.json`; `validate.mjs` faalt als een manifest achterhaald is geraakt.
  Zie `scripts/README.md` voor de expliciete grenzen (geen retroactief queryttijdstip of retry-historie).
  Daarnaast bereidt `scripts/10-bouw-release-kandidaat.mjs` een dataset-release-overzicht voor
  (`release-kandidaat.json`, niet zelf getagd of gepubliceerd - dat blijft aan de repo-eigenaar).

### Geloofwaardigheid / interpretatie (uit review)

- ~~**De term "actieve bedrijfsindicatie" is kwetsbaar.**~~ - **opgelost.** Overal hernoemd naar
  **BAG-industriefunctie-indicatie**, en de onzekerheidsstatus per monument (zie hierboven) heet nu
  `industrie_aangetroffen` / `industrie_deels_aangetroffen` / `geen_industrie_aangetroffen` in plaats
  van `actief`/`niet_actief` - vooral dat laatste suggereerde een bevestiging die de BAG niet levert.
  De BAG bevestigt een gebruiksdoel van een verblijfsobject, geen actieve of inactieve bedrijfsvoering.
- ~~**Inconsistentie "stikstofgevoelig" vs. volledige PDOK-laag**~~ - **gecorrigeerd.** De
  landingspagina claimde "stikstofgevoelige Natura 2000-gebieden" terwijl de methode expliciet zegt
  dat de volledige PDOK-laag zonder die filter wordt gebruikt. Tekst aangepast.
- ~~**"5 km" werd als ecologische invloedssfeer gepresenteerd**~~ - **gecorrigeerd.** Vijf kilometer
  is een gekozen selectievenster, geen vastgestelde ecologische invloedssfeer; de tekst benoemt dit nu
  expliciet.
- ~~**Pijplijn controleerde niet of een monument nog wél een rijksmonument is**~~ - **opgelost.**
  Gevonden tijdens de handmatige steekproefcontrole (zie [KWALITEITSCONTROLE.md](KWALITEITSCONTROLE.md)):
  RCE's eigen `heeftJuridischeStatus`-veld kent naast `rijksmonument` ook `geen rijksmonument`
  (bv. na sloop), en dit werd nergens gecontroleerd. Bij de op dat moment 25 gepubliceerde gebieden
  bleken 42 van de 1026 unieke monumenten (~4%) deze afgevoerde status te hebben.
  `scripts/02-prepare-gebied.mjs` sluit deze status nu uit bij de bron; de 42 al-gepubliceerde
  gevallen zijn verwijderd uit de 8 betrokken gebieden (zie de bijgewerkte aantallen hierboven).

**Aanvullende, waardevolle toevoegingen uit dezelfde review** (met de door de reviewer aangemerkte
top 3 vetgedrukt):

1. ~~**Explicietere onzekerheidsstatus per monument**~~ - **opgelost.** Elk monument krijgt nu een
   status uit `industrie_aangetroffen` (eenduidig) / `industrie_deels_aangetroffen` (industriefunctie
   gevonden, maar niet bij alle adressen van dit monument eensluidend) / `geen_industrie_aangetroffen` /
   `geen_adres` / `geen_match` / `bag_mislukt` - bewust géén "actief"/"niet actief"-taal, want de BAG
   bevestigt een gebruiksdoel, geen bedrijfsvoering. Op de kaart: een dubbele donkerblauwe rand voor
   `industrie_deels_aangetroffen`, zichtbaar naast de bestaande effen/gestippelde randen.
2. ~~**"Waarom staat dit punt hier?"-detailweergave per monument**~~ - **opgelost.** Klik op een punt
   op de kaart toont een detailpaneel: rijksmonumentnummer met link naar de RCE-bron, oorspronkelijke
   functie, afstand tot de gebiedsrand (of "binnen het gebied"), provincie, onzekerheidsstatus, elk
   bekend adres met het daarbij gevonden BAG-gebruiksdoel, en de peildatum.
3. ~~**Datakwaliteitsdashboard per gebied**~~ - **opgelost.** Nieuwe kaart op elke gebiedspagina:
   aantal eenduidig actief / actief maar onzeker / bevestigd niet-actief / geen adres bekend / geen
   BAG-match / BAG-bevraging mislukt / monumenten met meerdere adressen.
4. Normaliseren voor vergelijking tussen gebieden (per 100 km², per km gebiedsrand, aandeel actief,
   verdeling over afstandsklassen) - nadrukkelijk als beschrijvende statistiek, niet als stikstofmaat.
5. Eén landelijke, permanente pagina per monument (voorkomt uiteenlopende info over gebiedspagina's
   heen bij overlappende monumenten).
6. Wijzigingsgeschiedenis/snapshots per peildatum (wat veranderde sinds de vorige versie).
7. Correctie-/feedbackknop ("Meld een mogelijke fout") met changelog.
8. Visuele scheiding tussen brongegevens, ruimtelijk afgeleide data en indicatieve classificatie
   (kleurcodering), zodat RCE-feiten en zelf afgeleide indicaties niet even zeker overkomen.
9. Deelbare kaartweergaven via URL-parameters (`?gebied=…&afstand=…&bedrijfsindicatie=…`).
10. ~~Toegankelijkheid buiten de kaart~~ — **gedeeltelijk opgelost.** Elke gebiedspagina heeft nu een
    uitklapbare, toetsenbord- en schermlezer-toegankelijke lijst (rm-nr, plaats, afstand, status) als
    alternatief voor de canvas-kaart. Nog niet gedaan: kleurenblind-vriendelijke symbolen op de kaart
    zelf, en de canvas-punten blijven zelf niet direct focusbaar.
11. ~~Steekproefsgewijze validatie~~ — **opgelost.** Een steekproef van 95 monumenten is
    structureel gecontroleerd en een deelsteekproef van 38 daarvan handmatig geverifieerd
    tegen het officiële Rijksmonumentenregister. Geaggregeerde resultaten en fouttypen:
    zie [KWALITEITSCONTROLE.md](KWALITEITSCONTROLE.md).
12. Compacte "wat kun je hiermee wel/niet zeggen"-kaart prominent bij de opening.

## Kanttekeningen

Dit zijn blootstellingskaarten: er is géén emissiedata (AERIUS/RAV) verwerkt en afstand tot een
Natura 2000-gebied zegt niets over daadwerkelijke stikstofdepositie. De oorspronkelijke functie van
een rijksmonument zegt niet dat er nu nog een agrarisch bedrijf gevestigd is; de industriefunctie-vlag
uit de BAG is een aanwijzing, geen bewijs van actieve bedrijfsvoering of stikstofuitstoot. Geen van de
statuscategorieën (industriefunctie aangetroffen / bij een deel van de adressen / geen industriefunctie
aangetroffen) is een uitspraak over daadwerkelijke bedrijfsvoering.

## Licentie & bronvermelding

Broncode: MIT, zie [LICENSE](LICENSE). Gepubliceerde datasets (`data/gebieden/*/data.json`
en tussenproducten): CC BY 4.0, zie [DATA_LICENSE.md](DATA_LICENSE.md) voor bronvermelding
en de onderliggende voorwaarden van RCE en PDOK.
