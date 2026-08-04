# Bronnen

Overzicht van alle bronnen die voor dit project zijn geraadpleegd: zowel de brondata die de
pijplijn programmatisch bevraagt, als de achtergrond- en verificatiebronnen die zijn gebruikt om
Natura 2000 als geheel te begrijpen en losse bevindingen te controleren. Dit document bestaat om
expliciet te maken dat keuzes in dit project (welke gebieden, welke selectiegrens, welke
provincie-indeling) zijn onderbouwd en niet uit de losse pols zijn gegrepen.

## Brondata (programmatisch bevraagd door de pijplijn)

- **RCE CHO SPARQL-endpoint** (rijksmonumenten, oorspronkelijke functie, BAG-adresrelatie):
  `https://api.linkeddata.cultureelerfgoed.nl/datasets/rce/cho/sparql`
  ([RCE linked data](https://linkeddata.cultureelerfgoed.nl/rce/natura2000)), zie
  `scripts/lib/rce-direct.mjs`.
- **RCE linked data, named graph Natura 2000** (richtlijnstatus, sitecode, stikstofgevoelig,
  gebiedsnummer, Wikidata-kruisverwijzing): `https://linkeddata.cultureelerfgoed.nl/graph/natura2000`,
  zie `scripts/08b-fetch-richtlijn-direct.mjs`. Los, nog niet gebruikt: het kleinere, specifiekere
  endpoint `https://api.linkeddata.cultureelerfgoed.nl/datasets/rce/natura2000/sparql` (zie
  CHANGELOG.md, "Veluwe toegevoegd").
- **PDOK Natura 2000-WFS** (officiële landelijke gebiedsgeometrie): `service.pdok.nl/rvo/natura2000`.
- **PDOK BAG-WFS** (gebruiksdoel per adres, `bag:verblijfsobject`): `service.pdok.nl/lv/bag/wfs/v2_0`.
- **PDOK bestuurlijke grenzen-WFS** (provinciegrenzen, `bestuurlijkegebieden:Provinciegebied`):
  `service.pdok.nl/kadaster/bestuurlijkegebieden/wfs/v1_0`.
- **Rijksmonumentenregister** (officiële monumentpagina per rijksmonumentnummer, getoond in het
  detailpaneel van elke gebiedspagina): `https://monumentenregister.cultureelerfgoed.nl/monumenten/{rijksmonumentnummer}`.

## Gebiedsbeschrijvingen (per gebied)

Elke gebiedspagina toont een zelfgeschreven samenvatting (type natuurgebied, ligging, oppervlakte,
beschermingsreden), gebaseerd op de officiële natura2000.nl-pagina van dat specifieke gebied - geen
letterlijke overname. De exacte bron-URL per gebied staat onderaan de gebiedspagina zelf en in
`scripts/lib/gebieden-beschrijving.mjs`.

## Achtergrond- en verificatiebronnen

Gebruikt om Natura 2000 als landelijk stelsel te begrijpen (aantal gebieden, indeling,
Vogel-/Habitatrichtlijn-onderscheid) en om losse bevindingen tegen te controleren:

- <https://www.natura2000.nl/> - overzicht en per-gebied informatie
- <https://www.natura2000.nl/meer-informatie>
- <https://www.natura2000.nl/sites/default/files/Kaart%20Natura%202000%20NL%202023%20VHR%20VRL.pdf> -
  landelijke overzichtskaart (VHR/VRL, 2023)
- <https://nl.wikipedia.org/wiki/Natura_2000>
- <https://geocontent.rvo.nl/Natura2000/Overzichtskaart/index.html?provincie=1> - interactieve
  RVO-overzichtskaart per provincie
- <https://linkeddata.cultureelerfgoed.nl/rce/natura2000> - RCE linked-data-ingang voor Natura 2000
- <https://rwsnatura2000.nl/default.aspx> - Rijkswaterstaat Natura 2000 (beheerplannen rijkswateren;
  relevant voor de grote water-/kustgebieden zoals Oosterschelde, Waddenzee, Noordzeekustzone)

## Referentiecode

- [StikstofGelderland](https://github.com/jolietjakeblues/StikstofGelderland) - voorganger van dit
  project (provincie-primair in plaats van gebied-primair).

## Zie ook

- [README.md](README.md) - uitleg van het project en de methodiek.
- [GEBIEDEN.md](GEBIEDEN.md) - volledige lijst verwerkte gebieden per bouwronde.
- [DATA_LICENSE.md](DATA_LICENSE.md) - licentie en bronvermelding voor de gepubliceerde datasets.
