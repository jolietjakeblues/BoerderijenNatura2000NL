# Licentie voor de gepubliceerde datasets

De afgeleide datasets in deze repository (`data/gebieden/*/data.json` en de
tussenproducten daarin, zoals `monumenten-*.json`, `*-raw.txt`) worden
gepubliceerd onder [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.nl)
(Naamsvermelding 4.0 Internationaal).

Dit is een bewuste keuze, geen vrijblijvende default: de belangrijkste
brondataset (RCE CHO linked data, de rijksmonumentengegevens) wordt door de
Rijksdienst voor het Cultureel Erfgoed zelf al onder CC BY 4.0 aangeboden
(zie [linkeddata.cultureelerfgoed.nl](https://linkeddata.cultureelerfgoed.nl/)),
dus CC BY 4.0 hier sluit daar direct op aan en voldoet aan de
naamsvermeldingsplicht van die bron. De overige brondiensten (PDOK: Natura
2000-geometrie, BAG, bestuurlijke grenzen) zijn open overheidsdata; PDOK
vermeldt op zijn website dat de diensten op open data zijn gebaseerd en
"vrij beschikbaar", zonder overal een expliciete, per-dataset licentietekst
te tonen op het moment van schrijven -- controleer bij twijfel de metadata
van de specifieke PDOK-dataset zelf.

## Bronvermelding

Bij hergebruik van de datasets in deze repository, vermeld:

- **Rijksmonumentengegevens**: Rijksdienst voor het Cultureel Erfgoed (RCE),
  via [linkeddata.cultureelerfgoed.nl](https://linkeddata.cultureelerfgoed.nl/) (CC BY 4.0).
- **Natura 2000-geometrie en richtlijnstatus**: RCE / RVO, via de PDOK
  Natura2000-WFS resp. het RCE `graph/natura2000`.
- **BAG-gebruiksdoel en provinciegrenzen**: Kadaster, via PDOK
  (`bag:verblijfsobject`, `bestuurlijkegebieden:Provinciegebied`).
- **Deze afgeleide dataset**: BoerderijenNatura2000NL (jolietjakeblues), CC BY 4.0.

De broncode (scripts, HTML/CSS/JS) valt onder de MIT-licentie -- zie LICENSE.
