# BoerderijenNatura2000NL

Landsdekkend overzicht van rijksmonumentale boerderijen binnen 5 km van een Natura 2000-gebied
(een gekozen selectievenster, geen ecologische invloedssfeer). Opvolger van
[StikstofGelderland](https://github.com/jolietjakeblues/StikstofGelderland),
maar dan **gebied-primair in plaats van provincie-primair**: per Natura 2000-gebied verwerkt en
gepubliceerd, in plaats van in één keer alle rijksmonumentale boerderijen van een hele provincie.

Live: [index.html](index.html) · gebiedspagina's in [gebieden/](gebieden/)

Voor de geschiedenis van eerdere reviews en opgeloste punten: zie [CHANGELOG.md](CHANGELOG.md).
Voor alle geraadpleegde bronnen (brondata én achtergrond/verificatie): zie [BRONNEN.md](BRONNEN.md).

## Waarom gebied-primair

Een Natura 2000-gebied houdt zich niet aan provinciegrenzen. Door per gebied te werken (in plaats
van per provincie) hoeft er geen keuze gemaakt te worden aan welke provincie een grensoverschrijdend
gebied "toebehoort", en kan elk gebied apart geverifieerd worden voordat het volgende wordt
toegevoegd. Provincie is in deze opzet een **weergavelaag** (achteraf bepaald via een
point-in-polygon-toets tegen de officiële PDOK-provinciegrenzen), geen zoekgrens.

## Status: 160 van de 162 Natura 2000-gebieden verwerkt

Nederland telt 162 Natura 2000-gebieden (bron: PDOK/RVO). Hiervan zijn er 160 verwerkt:
**7255 boerderijen | 1225 met BAG-industriefunctie-indicatie | 77 niet te controleren** (som van
per-gebied cijfers, geen aantal unieke monumenten landelijk - zie "Methode per gebied", punt 5). De
resterende 2 (Waddenzee, Noordzeekustzone) zijn een bewuste, beargumenteerde uitzondering, zie
"Bewust niet gepland" hieronder.

Voor de volledige lijst per gebied, per bouwronde (met per-gebied cijfers en de redenering achter
elke ronde): zie **[GEBIEDEN.md](GEBIEDEN.md)**.

## Methode per gebied

1. **Monumenten**: RCE CHO-endpoint (linked data), rijksmonumenten met oorspronkelijke functie
   "boerderij" (labels als "Boerderij (M)", "Boerderij(M1)"; coderingen tussen haakjes worden
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
dichtstbijzijnde boerderij daar in werkelijkheid op 5,6 km ligt; net buiten de huidige grens, niet
omdat er niets in de buurt is.

### Waarom geen BAG API-key

De Kadaster "individuele bevragingen"-API voor BAG-detail (`bag_address_detail`) vereist een
`BAG_API_KEY` die in deze omgeving niet beschikbaar is. In plaats daarvan wordt de publieke,
sleutelloze PDOK BAG-WFS (`service.pdok.nl/lv/bag/wfs/v2_0`) gebruikt, die hetzelfde
`gebruiksdoel`-veld levert.

## Nog te doen

- **Volledig afstands-bucketschema** invoeren: erin / < 250 m / < 1 km / < 5 km / < 25 km / ≥ 25 km
  (nu alleen erin + ≤ 5 km). De weergavelaag hiervoor bestaat al (`k`-klasse per monument, kleuren
  en labels in de gebiedspagina); alleen de selectiegrens in `03-classify-monumenten.mjs` zit nog
  op 5 km. Bewust uitgesteld: een verkennende telling liet een groei van 9x tot 236x per gebied
  zien bij 25 km, wat een volledige herbouw van alle gebieden (vele uren) en ongeteste
  paginagrootte/kaartperformance (geen marker-clustering) zou betekenen. Eerst een pilot op een
  paar representatieve gebieden voordat dit op alle gebieden wordt losgelaten.
- Normaliseren voor vergelijking tussen gebieden (per 100 km², per km gebiedsrand, aandeel actief,
  verdeling over afstandsklassen) - nadrukkelijk als beschrijvende statistiek, niet als stikstofmaat.
- Wijzigingsgeschiedenis/snapshots per peildatum (wat veranderde sinds de vorige versie).
- Deelbare kaartweergaven via URL-parameters (`?gebied=…&afstand=…&bedrijfsindicatie=…`).
- Compacte "wat kun je hiermee wel/niet zeggen"-kaart prominent bij de opening.

### Bewust niet gepland

- **Eén landelijke pagina per monument.** Overwogen (o.a. om uiteenlopende info over gebiedspagina's
  heen bij overlappende monumenten te voorkomen), maar bewust niet gebouwd: elk monument heeft al een
  RCE Linked Data-URI (getoond in het detailpaneel) én een officiële pagina in het
  [Rijksmonumentenregister](https://monumentenregister.cultureelerfgoed.nl/monumenten/) op
  `/monumenten/{rijksmonumentnummer}`. Een eigen versie daarnaast zou alleen een tweede, mogelijk
  verouderende bron toevoegen.
- **Waddenzee en Noordzeekustzone.** Beide zijn kuststroken die vrijwel de volledige Nederlandse
  Noordzee-/Waddenkust bestrijken. Een verkennende telling (kandidaten binnen de bbox+marge, vóór de
  precieze 5&nbsp;km-classificatie) leverde circa 1.300 respectievelijk circa 1.900 kandidaat-
  boerderijen op, en een bbox-overlaptoets liet zien dat beide gebieden overlappen met tientallen
  al gebouwde gebieden (vrijwel elk duingebied van Texel tot Zeeland, plus de kustgebieden van
  Fryslân en Groningen). Bouwen zou een zeer grote pagina opleveren die grotendeels dezelfde
  boerderijen dubbel toont die al op specifiekere, betekenisvollere gebiedspagina's staan - weinig
  extra inzicht voor veel extra gewicht. Veluwe (het derde grote gebied) week hier bewust van af en
  is wél gebouwd: die overlapt slechts met een handvol directe buurgebieden.

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
