# BoerderijenNatura2000NL

Landsdekkend overzicht van rijksmonumentale boerderijen binnen de invloedssfeer van Natura
2000-gebieden. Opvolger van [StikstofGelderland](https://github.com/jolietjakeblues/StikstofGelderland),
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

| Gebied | Provincie(s) | Boerderijen | Actieve bedrijfsindicatie |
|---|---|---:|---:|
| [Rijntakken – IJssel-traject](gebieden/rijntakken.html) | Gelderland / Overijssel | 241 | 49 |
| [Landgoederen Brummen](gebieden/landgoederen-brummen.html) | Gelderland | 59 | 10 |
| [Willinks Weust](gebieden/willinks-weust.html) | Gelderland | 21 | 3 |
| [Bekendelle](gebieden/bekendelle.html) | Gelderland | 25 | 2 |
| [Korenburgerveen](gebieden/korenburgerveen.html) | Gelderland | 24 | 3 |
| [Stelkampsveld](gebieden/stelkampsveld.html) | Gelderland | 25 | 4 |
| [Wooldse Veen](gebieden/wooldse-veen.html) | Gelderland | 10 | 1 |
| [Sint Jansberg](gebieden/sint-jansberg.html) | Limburg / Noord-Brabant | 4 | 1 |
| [Zeldersche Driessen](gebieden/zeldersche-driessen.html) | Limburg / Noord-Brabant | 4 | 1 |
| [Binnenveld](gebieden/binnenveld.html) | Gelderland / Utrecht | 6 | 0 |
| [De Bruuk](gebieden/de-bruuk.html) | Gelderland | 0 | 0 |
| [Lieftinghsbroek](gebieden/lieftinghsbroek.html) | Groningen | 14 | 2 |
| [Norgerholt](gebieden/norgerholt.html) | Drenthe | 44 | 3 |
| [Witterveld](gebieden/witterveld.html) | Drenthe | 8 | 1 |
| [Elperstroomgebied](gebieden/elperstroomgebied.html) | Drenthe | 33 | 4 |
| [Bakkeveense Duinen](gebieden/bakkeveense-duinen.html) | Fryslân | 6 | 1 |
| [Drouwenerzand](gebieden/drouwenerzand.html) | Drenthe | 8 | 2 |
| **Totaal (17 gebieden)** | | **532** | **87** |

Let op: de totaaltelling is een **som van per-gebied cijfers**, geen aantal unieke monumenten
landelijk — een monument dat dicht bij meerdere Natura 2000-gebieden ligt (bv. tussen Bekendelle en
Korenburgerveen) telt terecht in beide gebiedspagina's mee.

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
   (conservatieve keuze).
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
- Losse `gebied_*.json`/`D_*.json`-tussenbestanden en bouwscripts zijn nu nog scratchpad-only
  (niet in deze repo) — overwegen om het bouwproces (RCE-query → afstand/point-in-polygon →
  BAG-check → provincie → HTML) als herbruikbaar script in de repo zelf op te nemen in plaats van
  telkens opnieuw te genereren.
- **Download-knop (CSV)** per gebiedspagina: monumentenlijst (nr, adres, provincie, afstand, functie,
  actieve bedrijfsindicatie) exporteren.
- **Klikbare popup voor een monument** in plaats van alleen hover — belangrijk voor mobiel/touch.
- **Klikbare popup voor het Natura 2000-gebied zelf** op de kaart, met de gebiedsbeschrijving.

### Stabiliteit / veiligheid (niet alleen features)

- **Sanity-check op de handgeschreven bbox-regex** waarmee rijksmonumenten per gebied bij RCE worden
  opgehaald: deze is per batch met de hand geschreven en dus foutgevoelig (tijdens de opbouw van dit
  project zelf een keer verkeerd geschreven bij Rijntakken, wat een monument stilzwijgend had kunnen
  laten wegvallen). Regex idealiter automatisch afleiden uit de werkelijke gebieds-bbox, met een
  controlestap tegen een ruimere marge.
- **BAG-fouten onderscheiden van een bevestigde NEE**: een mislukte BAG-WFS-call of een adres dat niet
  binnen de 200 m-zoekbox matcht, resulteert nu in dezelfde `industrie=false`-status als een echt
  gecontroleerde NEE. Dit kan de actieve-bedrijfsindicatie stil ondertellen zonder dat dat zichtbaar is.
- **Retry/backoff voor de BAG-WFS-calls**: nu geen enkele retry bij een mislukte fetch in een batch.
- **CQL_FILTER wordt door de gebruikte PDOK-WFS-endpoints (natura2000, bag:verblijfsobject)
  stilzwijgend genegeerd** — je krijgt dan ongefilterde data terug zonder foutmelding. Ontdekt tijdens
  de opbouw van dit project; alleen BBOX-filters bleken betrouwbaar te werken op deze endpoints.
- **Peildatum staat hardcoded** in elk bouwscript; zou automatisch afgeleid moeten worden uit het
  moment van genereren in plaats van handmatig bijgewerkt te worden.

## Kanttekeningen

Dit zijn blootstellingskaarten: er is géén emissiedata (AERIUS/RAV) verwerkt en afstand tot een
Natura 2000-gebied zegt niets over daadwerkelijke stikstofdepositie. De oorspronkelijke functie van
een rijksmonument zegt niet dat er nu nog een agrarisch bedrijf gevestigd is; de
industriefunctie-vlag uit de BAG is een indicatie, geen bewijs.
