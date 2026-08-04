# Dataset-release 2026-08-04

Tweede gemarkeerde release van de dataset. De vorige release (`dataset-2026-08-03`) dekte 25 van de
162 Natura 2000-gebieden; deze release dekt 160 van de 162 - vrijwel landsdekkend, met de twee
resterende gebieden bewust en beargumenteerd buiten scope (zie hieronder). De vorige release bleef
sindsdien als enige gemarkeerde versie op GitHub staan terwijl de site zelf al veel verder was;
hergebruikers die op de gemarkeerde release afgaan zouden een sterk verouderd beeld krijgen zonder
deze update.

## Omvang

- 160 van de 162 Natura 2000-gebieden verwerkt
- 7.255 gebiedsvermeldingen (rijksmonumentale boerderijen binnen 5 km van of binnen een Natura
  2000-gebied). **Dit is een som van per-gebied cijfers, geen aantal unieke monumenten landelijk**:
  een monument nabij meerdere Natura 2000-gebieden telt terecht in elk relevant gebied mee (bv. een
  monument tussen Bekendelle en Korenburgerveen telt in beide gebiedspagina's).
- 1.225 met een BAG-industriefunctie-indicatie (een aanwijzing op basis van BAG-gebruiksdoel, geen
  bewijs van actieve agrarische bedrijfsvoering)
- 77 waarvan de BAG-koppeling niet te controleren was (geen adres bekend bij RCE, of geen match in
  de BAG-zoekbox); dit is nadrukkelijk geen bevestigde afwezigheid van bedrijfsvoering

## Bewuste uitzonderingen: 2 van de 162 gebieden

- **Waddenzee** en **Noordzeekustzone** zijn niet verwerkt. Beide zijn kuststroken die vrijwel de
  volledige Nederlandse Noordzee-/Waddenkust bestrijken. Een verkennende telling gaf circa 1.300
  respectievelijk circa 1.900 kandidaat-boerderijen, en een bbox-overlaptoets liet zien dat beide
  overlappen met tientallen al verwerkte, specifiekere gebieden (vrijwel elk duingebied van Texel
  tot Zeeland, plus de kustgebieden van Fryslân en Groningen). Verwerken zou een zeer grote pagina
  opleveren die grotendeels dezelfde boerderijen dubbel toont - weinig extra inzicht voor veel extra
  gewicht. Zie [README.md, "Bewust niet gepland"](README.md#bewust-niet-gepland).
- Veluwe (het derde, eerder even grote gebied) is in deze release wél verwerkt: die overlapt slechts
  met een handvol directe buurgebieden en viel na de precieze afstandsclassificatie met 224
  boerderijen ook veel kleiner uit dan de kandidatentelling (circa 1.189) deed vermoeden.

## Nieuwe security- en CI-maatregelen sinds de vorige release

- **`.gitattributes` toegevoegd** (`* text=auto eol=lf`): git gebruikt voortaan altijd LF in de
  working tree, ongeacht lokale `core.autocrlf`-instellingen. Dit verhelpt een reëel gevonden
  probleem waarbij Windows-CRLF-conversie de SHA-256-checksums in `manifest.json` liet afwijken van
  de daadwerkelijk gecommitte inhoud, wat pas op CI (Ubuntu) opviel.
- **GitHub Actions gepind op commit-SHA** (`actions/checkout`, `actions/setup-node`) plus een
  Dependabot-configuratie voor automatische updates daarvan.
- **Subresource Integrity (SRI)** voor de Leaflet-CDN-referenties (CSS + JS): de browser weigert de
  bestanden te laden als unpkg.com ooit andere inhoud zou leveren dan verwacht. Hashes zelf
  geverifieerd door de bestanden opnieuw te downloaden en te hashen.
- **`</script>`-injectiebescherming voor de ingebedde JSON**: de gebiedspagina's bedden `data.json`
  in als tekst binnen een `<script type="application/json">`-element; een gemanipuleerde adres- of
  plaatsnaam met een letterlijke `</script>`-tekenreeks kon dat element voortijdig afsluiten en
  nieuwe HTML introduceren. `<`, `>` en `&` worden nu Unicode-geëscaped vóór het inbedden
  (OWASP XSS Prevention Cheat Sheet); `JSON.parse()` herstelt de oorspronkelijke tekens in de
  browser, de zichtbare data verandert niet.

## Nieuwe functionaliteit

- **CSV-download** per gebiedspagina: exporteert de volledige monumentenlijst (rijksmonumentnummer,
  adres, provincie, afstand, functie, status) client-side, zonder server.
- **Klikbare popup voor het Natura 2000-gebied zelf** op de kaart, met de gebiedsbeschrijving.
- **Correctie-/feedbackknop** ("Meld een mogelijke fout"): opent een vooringevulde GitHub-issue via
  een issue-form-template (`.github/ISSUE_TEMPLATE/gebied-fout.yml`), met gebied en paginalink al
  ingevuld.

## Correcties sinds de vorige release

- **Rijntakken was onvolledig.** De eerste verwerking dekte alleen het IJssel-traject (241
  boerderijen); de landelijke WFS houdt één samenhangende polygoon aan van circa 23.047 hectare
  langs IJssel, Nederrijn, Waal én Lek. Volledig opnieuw gebouwd op de juiste naam (zelfde
  slug/URL): 567 boerderijen, van 3 naar 4 provincies. Gevonden door voor het eerst systematisch elk
  gebied tegen de landelijke WFS-namen te controleren - de enige mismatch van de 127 op dat moment
  verwerkte gebieden.
- Twee keer een eigen documentatiefout gecorrigeerd (De Wieden ten onrechte als "al verwerkt"
  vermeld; de CRLF/manifest-fix bleek bij de eerste poging niet compleet) - beide met volledige
  toelichting in [CHANGELOG.md](CHANGELOG.md).

## Herkomst en reproduceerbaarheid

- Elk gebied heeft een herkomst-manifest (`data/gebieden/<slug>/manifest.json`): bron/endpoint per
  artefact, SHA-256-checksum en het git-commit van eerste toevoeging.
- Per-gebied aantallen en checksums op het moment van deze release staan in
  [`release-kandidaat.json`](release-kandidaat.json), opnieuw gegenereerd tegen het getagde commit.
- CI (schema-/telinvariantvalidatie plus unittests, zie [scripts/README.md](scripts/README.md)) was
  groen op het getagde commit.
- Reproduceerbaarheidsstatus: controleerbaar en grotendeels reproduceerbaar, niet volledig
  automatisch reproduceerbaar (enkele stappen gebruiken directe RCE-CHO-bevraging, zie
  scripts/README.md).

## Documentatie

README.md is sinds de vorige release opgesplitst: de volledige lijst per gebied en per bouwronde
staat nu in [GEBIEDEN.md](GEBIEDEN.md), en alle geraadpleegde bronnen (brondata én
achtergrond/verificatie) staan in [BRONNEN.md](BRONNEN.md).

## Licentie en bronvermelding

- Broncode: MIT, zie [LICENSE](LICENSE)
- Datasets: CC BY 4.0, zie [DATA_LICENSE.md](DATA_LICENSE.md) voor de per-bron attributie-eisen
  (RCE, PDOK/RVO, Kadaster)

## Kanttekening

Dit zijn blootstellingskaarten: er is géén emissiedata (AERIUS/RAV) verwerkt, en afstand tot een
Natura 2000-gebied zegt niets over daadwerkelijke stikstofdepositie. Geen van de statuscategorieën
op deze pagina's is een uitspraak over daadwerkelijke agrarische bedrijfsvoering.
