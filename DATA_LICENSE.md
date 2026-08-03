# Licentie voor de gepubliceerde datasets

De afgeleide datasets in deze repository (`data/gebieden/*/data.json` en de
tussenproducten daarin, zoals `monumenten-*.json`, `*-raw.txt`) worden
gepubliceerd onder [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.nl)
(Naamsvermelding 4.0 Internationaal).

Dit is een bewuste keuze, geen vrijblijvende default: de brondata zelf staat
onder een mix van CC BY 4.0 en CC0/publiek domein (zie hieronder per bron).
CC BY 4.0 is de striktste van die voorwaarden en dus de juiste keuze voor de
gecombineerde, afgeleide dataset — CC0-brondata mag altijd verder onder een
strengere licentie herverspreid worden, maar niet andersom. Waar een bron
zelf al CC BY 4.0 vereist (RCE), voldoet deze licentie direct aan die eis.

## Bronnen, herkomst en voorwaarden

| Gegeven in deze dataset | Bron | Endpoint/dienst | Licentie van de bron |
|---|---|---|---|
| Rijksmonumenten (nummer, functie, geometrie) | Rijksdienst voor het Cultureel Erfgoed (RCE) | RCE CHO linked data (`linkeddata.cultureelerfgoed.nl`, cho-kennis/instanties-rce) | **CC BY 4.0** |
| Richtlijnstatus (VR/HR/VR+HR/groeve), EU-sitecode, stikstofgevoelig-vlag, Wikidata-kruisverwijzing | RCE | los graph `linkeddata.cultureelerfgoed.nl/graph/natura2000` | **CC BY 4.0** |
| Natura 2000-gebiedsgeometrie | Rijksdienst voor Ondernemend Nederland (RVO) | PDOK-WFS `service.pdok.nl/rvo/natura2000` | **Publiek domein** |
| BAG-gebruiksdoel (industriefunctie-indicatie) | Kadaster | PDOK-WFS `bag:verblijfsobject` (`service.pdok.nl/lv/bag`) | **CC0 1.0** |
| Bestuurlijke grenzen (provincies, voor de provincie-indeling) | Kadaster (afgeleid van de BRK) | PDOK-WFS `bestuurlijkegebieden:Provinciegebied` | **CC0 1.0** |
| Gebiedsbeschrijvingen (`scripts/lib/gebieden-beschrijving.mjs`) | Zelf geschreven samenvatting, geen letterlijke overname | bron: [natura2000.nl](https://www.natura2000.nl/gebieden) (RVO/provincies) | n.v.t. — eigen tekst, bron vermeld per gebiedspagina |

Bovenstaande is gecontroleerd op basis van de publiek toegankelijke
documentatie van elke bron (augustus 2026); PDOK zelf toont niet overal een
even expliciete, per-dataset licentietekst op de eigen website — controleer
bij twijfel of bij hergebruik altijd de actuele metadata van de specifieke
PDOK-dataset (via `pdok.nl/datasets` of het Nationaal Georegister), aangezien
licenties van overheidsdata in de tijd kunnen wijzigen.

## Bronvermelding

Bij hergebruik van de datasets in deze repository, vermeld ten minste:

- **Rijksmonumentengegevens en richtlijnstatus**: Rijksdienst voor het
  Cultureel Erfgoed (RCE), via [linkeddata.cultureelerfgoed.nl](https://linkeddata.cultureelerfgoed.nl/) (CC BY 4.0) — verplichte naamsvermelding.
- **Natura 2000-geometrie**: Rijksdienst voor Ondernemend Nederland (RVO), via PDOK.
- **BAG-gebruiksdoel**: Kadaster, via PDOK (CC0, naamsvermelding niet verplicht maar op prijs gesteld).
- **Bestuurlijke grenzen**: Kadaster, via PDOK (CC0).
- **Deze afgeleide dataset**: BoerderijenNatura2000NL (jolietjakeblues), CC BY 4.0.

De broncode (scripts, HTML/CSS/JS) valt onder de MIT-licentie — zie LICENSE.
