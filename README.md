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

## Status: 17 van de 162 Natura 2000-gebieden verwerkt

Nederland telt 162 Natura 2000-gebieden (bron: PDOK/RVO, waarvan 4 mariene gebieden in de
Exclusieve Economische Zone op de Noordzee, buiten scope voor dit project). Hiervan zijn er tot nu
toe 17 verwerkt:

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
| **Totaal (17 gebieden)** | | **532** | **87** | **5** |

Let op: de totaaltelling is een **som van per-gebied cijfers**, geen aantal unieke monumenten
landelijk — een monument dat dicht bij meerdere Natura 2000-gebieden ligt (bv. tussen Bekendelle en
Korenburgerveen) telt terecht in beide gebiedspagina's mee. De kolom "BAG niet te controleren" is
géén bevestigde NEE — zie de toelichting bij taak 10 hieronder.

**Resterend: 145 gebieden** (141 landgebieden + 4 mariene gebieden die waarschijnlijk buiten scope
blijven). Nog geen vaste volgorde vastgesteld; tot nu toe is gewerkt vanuit Gelderland (Achterhoek,
IJssel, Nijmegen-Mook, Gelderse Vallei), met bewust een paar provinciegrensgevallen erbij
(Gelderland/Overijssel, Limburg/Noord-Brabant, Gelderland/Utrecht), en daarna uitgebreid naar
Groningen, Drenthe en Fryslân om de aanpak ook buiten het zuidoosten te valideren. Nog niet
aangeraakt: Utrecht, Noord-Holland, Zuid-Holland, Zeeland, Noord-Brabant en Limburg als hoofdgebied
(alleen als grensgeval bijgekomen), en de grote gebieden (Veluwe, Waddenzee) die vanwege hun omvang
bewust nog niet zijn opgepakt.

## Methode per gebied

1. **Monumenten**: RCE CHO-endpoint (linked data), rijksmonumenten met oorspronkelijke functie
   "boerderij" (labels als "Boerderij (M)", "Boerderij(M1)";coderingen tussen haakjes worden
   afgeknipt), met puntgeometrie.
2. **Natura 2000-geometrie**: officiële landelijke WFS (`service.pdok.nl/rvo/natura2000`).
3. **Selectie**: een monument valt in de pilot-set van een gebied als het **binnen** de
   gebiedsgeometrie ligt (echte point-in-polygon-toets, inclusief gaten in de polygoon) **of**
   binnen **5 km** hemelsbreed van de daadwerkelijke gebiedsrand (niet van een bounding box).
4. **Provincie**: apart bepaald via point-in-polygon tegen de PDOK-bestuurlijke-grenzenlaag
   (`bestuurlijkegebieden:Provinciegebied`);onafhankelijk van het Natura 2000-gebied en van RCE.
5. **Actieve bedrijfsindicatie**: adres per monument opgehaald via RCE (BAG-relatie), daarna
   gebruiksdoel opgezocht in de open PDOK BAG-WFS (`bag:verblijfsobject`), gematcht op postcode en
   huisnummer. Industriefunctie op het adres = actieve bedrijfsindicatie. Monumenten met uitsluitend
   woonfunctie (geen industrie, geen logies/bijeenkomst) tellen **niet** mee als actief
   (conservatieve keuze). Monumenten zonder BAG-adres in RCE, of zonder match in de BAG-zoekbox,
   krijgen een aparte status **"BAG niet te controleren"** — deze tellen niet mee als actief, maar
   worden nadrukkelijk niet als bevestigde NEE geteld (op de kaart een gestippelde grijze rand
   i.p.v. de blauwe rand van een bevestigde actieve indicatie).
6. **Gebiedsbeschrijving**: korte, zelfgeschreven samenvatting (type natuurgebied, ligging,
   oppervlakte, beschermingsreden) op basis van [natura2000.nl](https://www.natura2000.nl/gebieden),
   met bronvermelding per gebiedspagina.

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
- Afstemmen op de **"stikstofgevoelig"-markering** uit de RCE natura2000-graph (de oude
  StikstofGelderland-kaart gebruikte een subset van 173 als stikstofgevoelig gemarkeerde gebieden
  uit die graph; deze opzet gebruikt vooralsnog de volledige landelijke PDOK-laag zonder die filter).
- De resterende ~145 Natura 2000-gebieden landsdekkend toevoegen.
- **Download-knop (CSV)** per gebiedspagina: monumentenlijst (nr, adres, provincie, afstand, functie,
  actieve bedrijfsindicatie) exporteren.
- **Klikbare popup voor een monument** in plaats van alleen hover — belangrijk voor mobiel/touch.
- **Klikbare popup voor het Natura 2000-gebied zelf** op de kaart, met de gebiedsbeschrijving.

### Stabiliteit / veiligheid (niet alleen features)

- ~~**Bouwpijplijn van scratchpad naar de repo**~~ — **opgelost.** Zie [`scripts/`](scripts/README.md):
  herbruikbare, dependency-loze Node-scripts voor referentiedata ophalen, een gebied voorbereiden,
  monumenten classificeren, verrijken (BAG + provincie) en de HTML genereren. Twee stappen blijven
  handmatig (de RCE CHO-query via de MCP-tool, zie `scripts/README.md`) — de rest is volledig
  geautomatiseerd en getest.
- ~~**Sanity-check op de handgeschreven bbox-regex**~~ — **opgelost.** `scripts/lib/bbox-regex.mjs`
  leidt de REGEX-bboxfilter nu mechanisch af uit de echte gebieds-bbox (met 0.15° marge), in plaats van
  'm met de hand te typen — inclusief een zelftest (`node scripts/lib/bbox-regex.mjs`) die precies de
  foutklasse afdekt die bij Rijntakken misging. Bijvangst tijdens het herbouwen: dezelfde
  Natura2000-WFS bleek zonder waarschuwing ook RD i.p.v. WGS84 te kunnen teruggeven (zie
  `scripts/README.md`) — ook daar is nu een harde controle tegen ingebouwd.
- ~~**Retry/backoff voor de BAG-WFS-calls**~~ — **opgelost.** `scripts/lib/bag.mjs` doet 2 automatische
  retries met oplopende wachttijd per monument.
- ~~**CQL_FILTER-valkuil documenteren**~~ — **opgelost.** Zie `scripts/README.md`, sectie
  "Bekende valkuilen".
- ~~**Migreer de 17 bestaande gebieden naar de nieuwe pijplijn**~~ — **opgelost.** Alle 17
  `data/gebieden/<slug>/data.json`-bestanden staan nu in de repo; `gebieden/*.html` en `index.html`
  worden voortaan met `scripts/06-build-gebied-html.mjs` resp. `scripts/07-build-landing-html.mjs`
  gegenereerd. Gecontroleerd dat alle cijfers (n, ja, onbekend, per-provincie) exact overeenkomen met
  de eerder gepubliceerde versie. Rijntakken had als enige nog een afwijkend databundel-schema
  (`gld`/`ovij` i.p.v. het generieke `provCounts`) en een losstaande titel/badge-opmaak; genormaliseerd
  naar hetzelfde schema en dezelfde generieke sjabloon als de andere 16 gebieden.
- ~~**Peildatum staat hardcoded**~~ — **opgelost.** De pijplijn (`scripts/05-build-gebied-data.mjs`)
  leidt 'm nu automatisch af uit het moment van genereren.

### Geloofwaardigheid / interpretatie (uit review)

- **De term "actieve bedrijfsindicatie" is kwetsbaar.** Een BAG-industriefunctie bewijst geen actief
  agrarisch bedrijf, laat staan stikstofuitstoot. De kanttekeningen erkennen dit al, maar de
  opvallende totaalcijfers kunnen los daarvan verkeerd worden gelezen. Op te lossen in samenhang met
  de laatste twee punten hieronder, niet als losse woordwijziging.
- ~~**Inconsistentie "stikstofgevoelig" vs. volledige PDOK-laag**~~ — **gecorrigeerd.** De
  landingspagina claimde "stikstofgevoelige Natura 2000-gebieden" terwijl de methode expliciet zegt
  dat de volledige PDOK-laag zonder die filter wordt gebruikt. Tekst aangepast.
- ~~**"5 km" werd als ecologische invloedssfeer gepresenteerd**~~ — **gecorrigeerd.** Vijf kilometer
  is een gekozen selectievenster, geen vastgestelde ecologische invloedssfeer; de tekst benoemt dit nu
  expliciet.

**Aanvullende, waardevolle toevoegingen uit dezelfde review** (met de door de reviewer aangemerkte
top 3 vetgedrukt):

1. **Explicietere onzekerheidsstatus per monument** — verder dan ok/geen_adres/geen_match/fout:
   bv. aanwijzing gevonden / geen aanwijzing gevonden / adres niet eenduidig gekoppeld / BAG-bevraging
   mislukt / handmatig gecontroleerd. Voorkomt dat "onbekend" als "nee" gelezen wordt.
2. **"Waarom staat dit punt hier?"-detailweergave per monument** — afstand tot gebied/gebiedsrand,
   binnen/buiten, gebruikte RCE- en BAG-object-ID's, gevonden gebruiksdoelen, raadpleegdatum,
   toewijzingswijze, link naar brondata.
3. **Datakwaliteitsdashboard per gebied** — aantal geselecteerd, adressen succesvol gekoppeld,
   adressen ambigu, mislukte BAG-bevragingen, handmatig gecontroleerd, peildatum brondata.
4. Normaliseren voor vergelijking tussen gebieden (per 100 km², per km gebiedsrand, aandeel actief,
   verdeling over afstandsklassen) — nadrukkelijk als beschrijvende statistiek, niet als stikstofmaat.
5. Eén landelijke, permanente pagina per monument (voorkomt uiteenlopende info over gebiedspagina's
   heen bij overlappende monumenten).
6. Wijzigingsgeschiedenis/snapshots per peildatum (wat veranderde sinds de vorige versie).
7. Correctie-/feedbackknop ("Meld een mogelijke fout") met changelog.
8. Visuele scheiding tussen brongegevens, ruimtelijk afgeleide data en indicatieve classificatie
   (kleurcodering), zodat RCE-feiten en zelf afgeleide indicaties niet even zeker overkomen.
9. Deelbare kaartweergaven via URL-parameters (`?gebied=…&afstand=…&bedrijfsindicatie=…`).
10. Toegankelijkheid buiten de kaart: volwaardige tabelweergave, kleurenblind-vriendelijke symbolen.
11. Steekproefsgewijze validatie (bv. 10 willekeurige positieve/negatieve classificaties handmatig
    controleren, resultaat publiceren).
12. Compacte "wat kun je hiermee wel/niet zeggen"-kaart prominent bij de opening.

## Kanttekeningen

Dit zijn blootstellingskaarten: er is géén emissiedata (AERIUS/RAV) verwerkt en afstand tot een
Natura 2000-gebied zegt niets over daadwerkelijke stikstofdepositie. De oorspronkelijke functie van
een rijksmonument zegt niet dat er nu nog een agrarisch bedrijf gevestigd is; de
industriefunctie-vlag uit de BAG is een indicatie, geen bewijs.
