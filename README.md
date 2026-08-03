# BoerderijenNatura2000NL

Landsdekkend overzicht van rijksmonumentale boerderijen binnen 5 km van een Natura 2000-gebied
(een gekozen selectievenster, geen ecologische invloedssfeer). Opvolger van
[StikstofGelderland](https://github.com/jolietjakeblues/StikstofGelderland),
maar dan **gebied-primair in plaats van provincie-primair**: per Natura 2000-gebied verwerkt en
gepubliceerd, in plaats van in één keer alle rijksmonumentale boerderijen van een hele provincie.

Live: [index.html](index.html) · gebiedspagina's in [gebieden/](gebieden/)

Voor de geschiedenis van eerdere reviews en opgeloste punten: zie [CHANGELOG.md](CHANGELOG.md).

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

| Gebied | Provincie(s) | Boerderijen | BAG-industriefunctie-indicatie | BAG niet te controleren |
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
géén bevestigde NEE - zie Methode, punt 5.

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
   afgeknipt), met puntgeometrie. Monumenten die RCE zelf niet meer als rijksmonument classificeert
   (`heeftJuridischeStatus` = "geen rijksmonument", bv. na sloop) worden bij de bron uitgesloten.
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
   `stikstofgevoelig`-vlag is een getoond kenmerk, geen selectiefilter; hij varieert echt per gebied
   en staat bijvoorbeeld bij grote Vogelrichtlijn-only water-/moerasgebieden vaak op onwaar.

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
- De resterende ~137 Natura 2000-gebieden landsdekkend toevoegen.
- **Download-knop (CSV)** per gebiedspagina: monumentenlijst (nr, adres, provincie, afstand, functie,
  status) exporteren.
- **Klikbare popup voor het Natura 2000-gebied zelf** op de kaart, met de gebiedsbeschrijving.
- Normaliseren voor vergelijking tussen gebieden (per 100 km², per km gebiedsrand, aandeel actief,
  verdeling over afstandsklassen) - nadrukkelijk als beschrijvende statistiek, niet als stikstofmaat.
- Wijzigingsgeschiedenis/snapshots per peildatum (wat veranderde sinds de vorige versie).
- Correctie-/feedbackknop ("Meld een mogelijke fout") met changelog.
- Visuele scheiding tussen brongegevens, ruimtelijk afgeleide data en indicatieve classificatie
  (kleurcodering), zodat RCE-feiten en zelf afgeleide indicaties niet even zeker overkomen.
- Deelbare kaartweergaven via URL-parameters (`?gebied=…&afstand=…&bedrijfsindicatie=…`).
- Toegankelijkheid buiten de kaart: kleurenblind-vriendelijke symbolen op de kaart zelf (de
  uitklapbare tekstlijst bestaat al, zie CHANGELOG.md), en de kaartpunten focusbaar/toetsenbord-
  bedienbaar maken (Leaflet ondersteunt dit, nog niet aangesloten op de bestaande klik-detailweergave).
- Compacte "wat kun je hiermee wel/niet zeggen"-kaart prominent bij de opening.

### Bewust niet gepland

- **Eén landelijke pagina per monument.** Overwogen (o.a. om uiteenlopende info over gebiedspagina's
  heen bij overlappende monumenten te voorkomen), maar bewust niet gebouwd: elk monument heeft al een
  RCE Linked Data-URI (getoond in het detailpaneel) én een officiële pagina in het
  [Rijksmonumentenregister](https://monumentenregister.cultureelerfgoed.nl/monumenten/) op
  `/monumenten/{rijksmonumentnummer}`. Een eigen versie daarnaast zou alleen een tweede, mogelijk
  verouderende bron toevoegen.

## Kanttekeningen

Dit zijn blootstellingskaarten: er is géén emissiedata (AERIUS/RAV) verwerkt en afstand tot een
Natura 2000-gebied zegt niets over daadwerkelijke stikstofdepositie. De oorspronkelijke functie van
een rijksmonument zegt niet dat er nu nog een agrarisch bedrijf gevestigd is; de industriefunctie-vlag
uit de BAG is een aanwijzing, geen bewijs van actieve bedrijfsvoering of stikstofuitstoot. Geen van de
statuscategorieën (industriefunctie aangetroffen / bij een deel van de adressen / geen industriefunctie
aangetroffen) is een uitspraak over daadwerkelijke bedrijfsvoering.

Voor de kaartondergrond worden bij CARTO kaarttegels opgehaald; die dienst ontvangt daarbij technisch
gezien onder andere het IP-adres van de bezoeker. De inhoudelijke monument- en gebiedsdata zelf worden
statisch vanaf GitHub Pages geleverd, zonder een aparte aanroep naar een eigen server.

## Licentie & bronvermelding

Broncode: MIT, zie [LICENSE](LICENSE). Gepubliceerde datasets (`data/gebieden/*/data.json`
en tussenproducten): CC BY 4.0, zie [DATA_LICENSE.md](DATA_LICENSE.md) voor bronvermelding
en de onderliggende voorwaarden van RCE en PDOK.
