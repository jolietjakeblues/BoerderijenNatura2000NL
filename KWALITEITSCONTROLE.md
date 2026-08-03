# Steekproefsgewijze validatie (handmatige controle)

Dit document rapporteert de resultaten van een handmatige steekproefcontrole op de
koppeling tussen RCE-rijksmonumentgegevens en BAG-gebruiksdoel, uitgevoerd volgens
punt 11 van de openstaande verbeterpunten in de
[README](README.md#geloofwaardigheid--interpretatie-uit-review) en naar aanleiding
van een externe review. Conform het verzoek van de reviewer worden hier **alleen
geaggregeerde resultaten en fouttypen** gepubliceerd, geen ruwe per-monument
gegevens.

## Opzet

- **Populatie:** alle 1159 monumenten in de op dit moment 25 gepubliceerde gebieden.
- **Steekproef (n=95):** 20 willekeurige monumenten met status `industrie_aangetroffen`,
  20 willekeurige met `geen_industrie_aangetroffen`, alle 42 met
  `industrie_deels_aangetroffen`, alle 5 met `geen_adres`, alle 8 met `geen_match` en
  0 met `bag_mislukt` (deze status kwam op peildatum niet voor). Willekeurige selectie
  via een gedetermineerde, herhaalbare shuffle (vaste seed), zodat de steekproef bij
  een herhaling van deze controle reproduceerbaar is.
- **Twee controlestappen:**
  1. **Structurele audit** (programmatisch, geen externe aanroepen): voor alle 95
     monumenten is gecontroleerd of elk RCE-adres een exact overeenkomende
     (postcode + huisnummer + huisletter) ingang heeft in de eigen BAG-koppeling.
  2. **Live verificatie** (handmatig, tegen de officiële bron): een deelsteekproef van
     38 van de 95 monumenten is gecontroleerd tegen het officiële
     [Rijksmonumentenregister](https://monumentenregister.cultureelerfgoed.nl/) —
     alle 13 `geen_match`-gevallen, 15 van de 42 `industrie_deels_aangetroffen`, en 5
     van elk van de 20 `industrie_aangetroffen`/`geen_industrie_aangetroffen`.

## Resultaten — structurele audit (n=95)

| Categorie | Aantal |
|---|---|
| Juiste postcode-/huisnummermatch | 56 |
| Deels gematcht (niet elk RCE-adres vond een BAG-treffer) | 24 |
| Geen adres bekend bij RCE | 5 |
| Bevestigd geen BAG-match (adres wel bekend, geen BAG-treffer in zoekgebied) | 8 |
| Mogelijk verkeerd gekoppeld verblijfsobject | 2 |

Aanvullend gemarkeerd (niet exclusief): **41 van de 95** monumenten hebben meerdere
RCE-adressen met onderling verschillende BAG-gebruiksdoelen (bv. het ene adres
"woonfunctie", het andere "industriefunctie,woonfunctie") — dit is inherent aan
grotere boerderijcomplexen met meerdere huisnummers en geen fout op zich, maar wel
relevant voor de interpretatie van de statuscategorie `industrie_deels_aangetroffen`.

### Verkeerd gekoppeld verblijfsobject: root cause gevonden, geen echte fout

De 2 als "mogelijk verkeerd gekoppeld" gemarkeerde gevallen bleken bij nader onderzoek
**geen koppelfouten**, maar het gevolg van een bug in de eigen matchlogica
(`scripts/lib/bag.mjs`): de huisletter werd wel gebruikt om een BAG-object te vinden,
maar niet meegeschreven in het opgeslagen matchresultaat. Daardoor leek een
post-hoc structurele controle op huisletter een mismatch te zien, terwijl de
onderliggende koppeling correct was. Dit is gerepareerd (de huisletter wordt nu wel
bewaard, zowel in de bouwstap als in de detailweergave op de gebiedspagina's). De
**aggregate statusclassificatie** (`industrie_aangetroffen` / `_deels_` / `geen_...`)
was door deze bug niet beïnvloed — alleen de per-adres weergave in het detailpaneel.
Een volledige herberekening van de al gepubliceerde 25 gebieden (nodig om de
huisletter met terugwerkende kracht te vullen) is een aparte, grotere vervolgstap die
nog niet is uitgevoerd.

## Resultaten — live verificatie tegen het Rijksmonumentenregister (38 van de 95)

Van de 38 geselecteerde gevallen waren er **36 succesvol te verifiëren** en **2
structureel onbereikbaar** bij het officiële register (beide HTTP 404). Een derde
geval gaf aanvankelijk HTTP 500, maar bleek bij een latere herhaling gewoon te laden
— een tijdelijke serverfout, geen structureel probleem.

De 2 structureel onbereikbare gevallen (rmnr 28340, 513954) zijn **uitgezocht in
plaats van afgedaan als toeval**: RCE's eigen linked data kent een
`ceo:heeftJuridischeStatus`-veld met twee waarden, `rijksmonument` en **`geen
rijksmonument`**. Beide 404-gevallen hebben de waarde `geen rijksmonument` — de 404
op het officiële register is dus een terechte weergave van een echt afgevoerde
status, geen toevallige serverfout. Zie de aparte sectie hieronder voor de
vervolgstap: dit bleek geen incident maar een pijplijnhiaat.

- **Juiste postcode-/huisnummermatch:** in alle 35 bereikbare gevallen kwam het door
  ons opgeslagen RCE-adres (straat, huisnummer, postcode, plaats) letterlijk overeen
  met het adres op de officiële registerpagina. Geen enkele afwijking gevonden.
- **Historisch of samengesteld adres:** niet aangetroffen in deze steekproef.
- **Verkeerd gekoppeld verblijfsobject:** niet aangetroffen in deze steekproef (zie
  hierboven voor de eerdere programmatische signalering die op een eigen bug bleek te
  berusten, niet op een echte koppelfout).
- **Meerdere adressen met verschillende functies:** bevestigd in de gecontroleerde
  `industrie_deels_aangetroffen`-gevallen; steeds plausibele multi-adres
  boerderijcomplexen (bijgebouw met eigen huisnummer, bijvoorbeeld "A"/"B"-nummering).
- **Belangrijke aanvullende bevinding, alle 13 `geen_match`-gevallen:** in elk van de
  (10 bereikbare van de) 13 gevallen kwam ons RCE-adres exact overeen met het
  officiële register, terwijl de BAG-koppeling toch geen treffer opleverde. Dit
  bevestigt dat de eigen adresextractie uit RCE betrouwbaar is, en dat het ontbreken
  van een match in deze gevallen bij de BAG-zoekstap zelf ligt (zoekradius en/of een
  gat in de BAG-data), niet bij onze eigen verwerking.

## Afgevoerde rijksmonumenten: pijplijnhiaat gevonden en verholpen

De twee structureel onbereikbare registerpagina's leidden tot een bredere controle:
de pijplijn (`scripts/02-prepare-gebied.mjs`) controleerde tot nu toe nergens
`ceo:heeftJuridischeStatus`, en kon dus zonder het te signaleren monumenten opnemen
die RCE zelf niet meer als rijksmonument classificeert (bijvoorbeeld na sloop of
statuswijziging). Een controle van alle 1026 unieke monumentnummers in de op dat
moment 25 gepubliceerde gebieden tegen dit veld leverde **42 monumenten (~4%)** op
met status `geen rijksmonument`, verspreid over 8 gebieden (Geleenbeekdal,
Kolland & Overlangbroek, Leudal, Regte Heide & Riels Laag, Roerdal, Swalmdal,
Vlijmens Ven/Moerputten/Bossche Broek, Zouweboezem).

**Verholpen op twee niveaus:**
1. De RCE-monumentenquery in `scripts/02-prepare-gebied.mjs` sluit `geen
   rijksmonument`-status voortaan uit bij de bron (nieuwe gebieden krijgen deze
   monumenten dus nooit meer binnen).
2. De 42 al-gepubliceerde monumenten zijn verwijderd uit de tussenliggende
   artefacten en `data.json` van de 8 betrokken gebieden, gevolgd door een volledige
   herbouw van HTML, richtlijn-verrijking en herkomst-manifest voor die gebieden.

Dit is geen aanwijzing van een BAG- of adresextractiefout (dat blijft de conclusie
van de steekproef hierboven), maar een apart, eerder onopgemerkt hiaat: het
onderscheid tussen "was ooit een rijksmonument" en "is dat nu nog volgens RCE zelf".

## Conclusie

Op basis van deze steekproef is er geen aanwijzing gevonden dat de RCE→BAG-koppeling
systematisch verkeerde adressen aan monumenten toekent. De belangrijkste reële
bevindingen zijn (1) een traceerbaarheidsbug (ontbrekende huisletter in opgeslagen
matchresultaten) die de weergave voor multi-adrescomplexen kon vertroebelen, inmiddels
gerepareerd voor nieuwe koppelingen, en (2) het hierboven beschreven ontbreken van een
juridische-statuscontrole, dat 42 afgevoerde monumenten liet doorsijpelen — inmiddels
verholpen bij de bron én met terugwerkende kracht. De bekende beperking dat een deel
van de monumenten geen BAG-match oplevert (`geen_match`) is, voor zover in deze
steekproef gecontroleerd, geen extractiefout maar een grens van de BAG-zoekstap.
