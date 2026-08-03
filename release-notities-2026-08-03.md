# Dataset-release 2026-08-03

Eerste gemarkeerde release van de dataset, na afronding van de methodologische
verantwoording, kwaliteitscontrole en herkomst-registratie.

## Omvang

- 25 van de 162 Natura 2000-gebieden verwerkt
- 1.130 gebiedsvermeldingen (rijksmonumentale boerderijen binnen 5 km van of
  binnen een Natura 2000-gebied). Dit is een som van per-gebied cijfers, geen
  aantal unieke monumenten landelijk: een monument nabij meerdere Natura
  2000-gebieden telt terecht in elk relevant gebied mee.
- 179 met een BAG-industriefunctie-indicatie (een aanwijzing op basis van
  BAG-gebruiksdoel, geen bewijs van actieve agrarische bedrijfsvoering)
- 12 waarvan de BAG-koppeling niet te controleren was (geen adres bekend bij
  RCE, of geen match in de BAG-zoekbox); dit is nadrukkelijk geen bevestigde
  afwezigheid van bedrijfsvoering

## Datakwaliteit in deze release

- **42 voormalige rijksmonumenten verwijderd.** RCE classificeert ze zelf niet
  meer als rijksmonument (`heeftJuridischeStatus` = "geen rijksmonument", bv.
  na sloop) - de pijplijn controleerde dit voorheen niet. Zie
  [CHANGELOG.md](CHANGELOG.md).
- **Steekproefsgewijze validatie uitgevoerd:** 95 monumenten structureel
  gecontroleerd, 38 daarvan handmatig geverifieerd tegen het officiële
  Rijksmonumentenregister. Geaggregeerde resultaten en fouttypen:
  [KWALITEITSCONTROLE.md](KWALITEITSCONTROLE.md).
- **Adreskoppelingsbug in het detailpaneel gevonden en gerepareerd:** 44 van
  de 1.514 adressen (circa 3%) toonden ten onrechte "geen BAG-match" door een
  te strikte, inmiddels verwijderde vergelijking op straatnaam. Zie
  [CHANGELOG.md](CHANGELOG.md).

## Herkomst en reproduceerbaarheid

- Elk gebied heeft een herkomst-manifest
  (`data/gebieden/<slug>/manifest.json`): bron/endpoint per artefact,
  SHA-256-checksum en het git-commit van eerste toevoeging.
- Per-gebied aantallen en checksums op het moment van deze release staan in
  [`release-kandidaat.json`](release-kandidaat.json).
- CI (schema-/telinvariantvalidatie plus unittests, zie
  [scripts/README.md](scripts/README.md)) was groen op het getagde commit.
- Reproduceerbaarheidsstatus: controleerbaar en grotendeels reproduceerbaar,
  niet volledig automatisch reproduceerbaar (twee stappen vereisen de
  `rce-cho` MCP-tool, zie scripts/README.md).

## Licentie en bronvermelding

- Broncode: MIT, zie [LICENSE](LICENSE)
- Datasets: CC BY 4.0, zie [DATA_LICENSE.md](DATA_LICENSE.md) voor de
  per-bron attributie-eisen (RCE, PDOK/RVO, Kadaster)

## Kanttekening

Dit zijn blootstellingskaarten: er is géén emissiedata (AERIUS/RAV) verwerkt,
en afstand tot een Natura 2000-gebied zegt niets over daadwerkelijke
stikstofdepositie. Geen van de statuscategorieën op deze pagina's is een
uitspraak over daadwerkelijke agrarische bedrijfsvoering.
