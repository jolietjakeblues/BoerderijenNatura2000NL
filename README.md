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

## Status: 121 van de 162 Natura 2000-gebieden verwerkt

Nederland telt 162 Natura 2000-gebieden (bron: PDOK/RVO, waarvan 4 mariene gebieden in de
Exclusieve Economische Zone op de Noordzee). Hiervan zijn er tot nu toe 121 verwerkt, inclusief
alle 4 mariene gebieden - die laatste vier tonen structureel 0 boerderijen, omdat er simpelweg
geen rijksmonument binnen 5 km van open zee ligt, maar zijn voor de volledigheid van het
landsdekkende overzicht toch meegenomen:

### Eerste ronde (Gelderland/Achterhoek/IJssel en validatieprovincies)

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

### Tweede ronde: Limburg en Zeeland, zuid naar noord

| Gebied | Provincie(s) | Boerderijen | BAG-industriefunctie-indicatie | BAG niet te controleren |
|---|---|---:|---:|---:|
| [Noorbeemden & Hoogbos](gebieden/noorbeemden-hoogbos.html) | Limburg | 142 | 19 | 1 |
| [Savelsbos](gebieden/savelsbos.html) | Limburg | 235 | 35 | 3 |
| [Geuldal](gebieden/geuldal.html) | Limburg | 599 | 74 | 10 |
| [Sint Pietersberg & Jekerdal](gebieden/sint-pietersberg-jekerdal.html) | Limburg | 65 | 13 | 2 |
| [Bemelerberg & Schiepersberg](gebieden/bemelerberg-schiepersberg.html) | Limburg | 220 | 36 | 3 |
| [Kunderberg](gebieden/kunderberg.html) | Limburg | 128 | 21 | 2 |
| [Brunssummerheide](gebieden/brunssummerheide.html) | Limburg | 92 | 21 | 0 |
| [Bunder- en Elslooërbos](gebieden/bunder-elslooerbos.html) | Limburg | 77 | 11 | 1 |
| [Grensmaas](gebieden/grensmaas.html) | Limburg | 143 | 23 | 2 |
| [Abdij Lilbosch & voormalig Klooster Mariahoop](gebieden/abdij-lilbosch-mariahoop.html) | Limburg | 3 | 0 | 0 |
| [Meinweg](gebieden/meinweg.html) | Limburg | 13 | 1 | 1 |
| [Canisvliet](gebieden/canisvliet.html) | Zeeland | 2 | 1 | 0 |
| [Weerter- en Budelerbergen & Ringselven](gebieden/weerter-budelerbergen-ringselven.html) | Limburg / Noord-Brabant | 6 | 0 | 0 |
| [Sarsven en De Banen](gebieden/sarsven-de-banen.html) | Limburg | 6 | 1 | 0 |
| [Groote Gat](gebieden/groote-gat.html) | Zeeland | 2 | 1 | 0 |
| [Vogelkreek](gebieden/vogelkreek.html) | Zeeland | 6 | 0 | 0 |
| [Zwin & Kievittepolder](gebieden/zwin-kievittepolder.html) | Zeeland | 6 | 1 | 0 |
| [Westerschelde & Saeftinghe](gebieden/westerschelde-saeftinghe.html) | Zeeland | 58 | 24 | 0 |
| [Deurnsche Peel & Mariapeel](gebieden/deurnsche-peel-mariapeel.html) | Limburg / Noord-Brabant | 8 | 1 | 0 |
| [Zoommeer](gebieden/zoommeer.html) | Zeeland / Noord-Brabant | 14 | 4 | 0 |
| [Yerseke en Kapelse Moer](gebieden/yerseke-kapelse-moer.html) | Zeeland | 12 | 1 | 0 |
| [Boschhuizerbergen](gebieden/boschhuizerbergen.html) | Limburg / Noord-Brabant | 12 | 1 | 1 |
| [Maasduinen](gebieden/maasduinen.html) | Limburg / Noord-Brabant | 24 | 2 | 0 |
| [Veerse Meer](gebieden/veerse-meer.html) | Zeeland | 18 | 7 | 0 |
| [Oosterschelde](gebieden/oosterschelde.html) | Zeeland / Zuid-Holland / Noord-Brabant | 68 | 19 | 0 |
| [Manteling van Walcheren](gebieden/manteling-van-walcheren.html) | Zeeland | 22 | 6 | 0 |
| [Kop van Schouwen](gebieden/kop-van-schouwen.html) | Zeeland | 12 | 1 | 0 |
| [Grevelingen](gebieden/grevelingen.html) | Zeeland / Zuid-Holland | 24 | 9 | 0 |

### Derde ronde: Noord-Brabant, zuid naar noord

| Gebied | Provincie(s) | Boerderijen | BAG-industriefunctie-indicatie | BAG niet te controleren |
|---|---|---:|---:|---:|
| [Leenderbos, Groote Heide & De Plateaux](gebieden/leenderbos-groote-heide-de-plateaux.html) | Noord-Brabant | 53 | 3 | 1 |
| [Groote Peel](gebieden/groote-peel.html) | n.v.t. | 0 | 0 | 0 |
| [Strabrechtse Heide & Beuven](gebieden/strabrechtse-heide-beuven.html) | Noord-Brabant | 18 | 0 | 1 |
| [Brabantse Wal](gebieden/brabantse-wal.html) | Noord-Brabant | 15 | 1 | 0 |
| [Kempenland-West](gebieden/kempenland-west.html) | Noord-Brabant | 63 | 2 | 0 |
| [Markiezaat](gebieden/markiezaat.html) | Noord-Brabant / Zeeland | 8 | 2 | 0 |
| [Ulvenhoutse Bos](gebieden/ulvenhoutse-bos.html) | Noord-Brabant | 46 | 6 | 0 |
| [Kampina & Oisterwijkse Vennen](gebieden/kampina-oisterwijkse-vennen.html) | Noord-Brabant | 64 | 5 | 2 |
| [Loonse en Drunense Duinen & Leemkuilen](gebieden/loonse-drunense-duinen-leemkuilen.html) | Noord-Brabant | 46 | 6 | 1 |
| [Langstraat](gebieden/langstraat.html) | Noord-Brabant | 49 | 5 | 0 |
| [Oeffelter Meent](gebieden/oeffelter-meent.html) | Noord-Brabant / Limburg | 8 | 2 | 0 |
| [Biesbosch](gebieden/biesbosch.html) | Zuid-Holland / Noord-Brabant | 72 | 11 | 0 |
| [Loevestein, Pompveld & Kornsche Boezem](gebieden/loevestein-pompveld-kornsche-boezem.html) | Gelderland / Noord-Brabant / Zuid-Holland | 95 | 15 | 0 |

### Vierde ronde: Utrecht en Zuid-Holland, zuid naar noord

| Gebied | Provincie(s) | Boerderijen | BAG-industriefunctie-indicatie | BAG niet te controleren |
|---|---|---:|---:|---:|
| [Krammer-Volkerak](gebieden/krammer-volkerak.html) | Zuid-Holland / Noord-Brabant | 15 | 4 | 0 |
| [Hollands Diep](gebieden/hollands-diep.html) | Noord-Brabant / Zuid-Holland | 18 | 4 | 0 |
| [Oudeland van Strijen](gebieden/oudeland-van-strijen.html) | Zuid-Holland | 28 | 13 | 0 |
| [Haringvliet](gebieden/haringvliet.html) | Zuid-Holland / Noord-Brabant | 42 | 18 | 0 |
| [Duinen Goeree & Kwade Hoek](gebieden/duinen-goeree-kwade-hoek.html) | Zuid-Holland | 4 | 2 | 0 |
| [Oude Maas](gebieden/oude-maas.html) | Zuid-Holland | 60 | 22 | 0 |
| [Voornes Duin](gebieden/voornes-duin.html) | Zuid-Holland | 9 | 1 | 0 |
| [Boezems Kinderdijk](gebieden/boezems-kinderdijk.html) | Zuid-Holland | 49 | 8 | 0 |
| [Donkse Laagten](gebieden/donkse-laagten.html) | Zuid-Holland | 61 | 8 | 0 |
| [Lingegebied & Diefdijk-Zuid](gebieden/lingegebied-diefdijk-zuid.html) | Gelderland / Utrecht / Zuid-Holland / Noord-Brabant | 76 | 12 | 0 |
| [Uiterwaarden Lek](gebieden/uiterwaarden-lek.html) | Utrecht / Zuid-Holland | 121 | 10 | 1 |
| [Solleveld & Kapittelduinen](gebieden/solleveld-kapittelduinen.html) | Zuid-Holland | 9 | 0 | 0 |
| [Broekvelden, Vettenbroek & Polder Stein](gebieden/broekvelden-vettenbroek-polder-stein.html) | Zuid-Holland / Utrecht | 78 | 33 | 0 |
| [Westduinpark & Wapendal](gebieden/westduinpark-wapendal.html) | Zuid-Holland | 4 | 0 | 0 |
| [De Wilck](gebieden/de-wilck.html) | Zuid-Holland | 73 | 18 | 0 |
| [Nieuwkoopse Plassen & De Haeck](gebieden/nieuwkoopse-plassen-de-haeck.html) | Zuid-Holland / Utrecht | 37 | 8 | 1 |
| [Meijendel & Berkheide](gebieden/meijendel-berkheide.html) | Zuid-Holland | 61 | 8 | 0 |
| [Coepelduynen](gebieden/coepelduynen.html) | Zuid-Holland | 12 | 1 | 1 |
| [Botshol](gebieden/botshol.html) | Utrecht / Noord-Holland | 42 | 13 | 0 |

### Vijfde ronde: Noord-Holland, de Noordzee, en één gemist Limburgs gebied

Bij het scopen van deze ronde bleek Maas bij Eijsden (Limburg) geen provincietreffer op te leveren
via de gebruikelijke point-in-polygon-toets - een klein, langgerekt gebied direct langs de
Maasoever, buiten de vorige rondes gebleven. Verder onderzocht: van de 4 "geen provincietreffer"-
kandidaten bleken Vlakte van de Raan en Voordelta wél boerderijen binnen 5 km te hebben (resp. 8 en
47), tegenover 0 bij de vier écht ver op zee gelegen EEZ-gebieden.

| Gebied | Provincie(s) | Boerderijen | BAG-industriefunctie-indicatie | BAG niet te controleren |
|---|---|---:|---:|---:|
| [Maas bij Eijsden](gebieden/maas-bij-eijsden.html) | Limburg | 78 | 11 | 1 |
| [Oostelijke Vechtplassen](gebieden/oostelijke-vechtplassen.html) | Noord-Holland / Utrecht | 168 | 33 | 1 |
| [Naardermeer](gebieden/naardermeer.html) | Noord-Holland / Utrecht | 47 | 11 | 1 |
| [Eemmeer & Gooimeer Zuidoever](gebieden/eemmeer-gooimeer-zuidoever.html) | Noord-Holland / Utrecht | 82 | 4 | 0 |
| [Kennemerland-Zuid](gebieden/kennemerland-zuid.html) | Noord-Holland / Zuid-Holland | 33 | 11 | 1 |
| [Ilperveld, Varkensland, Oostzanerveld & Twiske](gebieden/ilperveld-varkensland-oostzanerveld-twiske.html) | Noord-Holland | 26 | 3 | 1 |
| [Polder Westzaan](gebieden/polder-westzaan.html) | Noord-Holland | 12 | 1 | 0 |
| [Wormer- en Jisperveld & Kalverpolder](gebieden/wormer-jisperveld-kalverpolder.html) | Noord-Holland | 34 | 8 | 0 |
| [Polder Zeevang](gebieden/polder-zeevang.html) | Noord-Holland | 31 | 8 | 1 |
| [Eilandspolder](gebieden/eilandspolder.html) | Noord-Holland | 40 | 11 | 0 |
| [Noordhollands Duinreservaat](gebieden/noordhollands-duinreservaat.html) | Noord-Holland | 28 | 7 | 1 |
| [Schoorlse Duinen](gebieden/schoorlse-duinen.html) | Noord-Holland | 13 | 3 | 0 |
| [Abtskolk & De Putten](gebieden/abtskolk-de-putten.html) | Noord-Holland | 14 | 3 | 0 |
| [Zwanenwater & Pettemerduinen](gebieden/zwanenwater-pettemerduinen.html) | Noord-Holland | 9 | 2 | 0 |
| [Duinen Den Helder-Callantsoog](gebieden/duinen-den-helder-callantsoog.html) | Noord-Holland | 3 | 0 | 0 |
| [Duinen en Lage Land Texel](gebieden/duinen-en-lage-land-texel.html) | Noord-Holland | 49 | 19 | 2 |
| [Vlakte van de Raan](gebieden/vlakte-van-de-raan.html) | Zeeland | 8 | 5 | 0 |
| [Voordelta](gebieden/voordelta.html) | Zeeland / Zuid-Holland | 47 | 12 | 0 |
| [Bruine Bank](gebieden/bruine-bank.html) | n.v.t. | 0 | 0 | 0 |
| [Friese Front](gebieden/friese-front.html) | n.v.t. | 0 | 0 | 0 |
| [Klaverbank](gebieden/klaverbank.html) | n.v.t. | 0 | 0 | 0 |
| [Doggersbank](gebieden/doggersbank.html) | n.v.t. | 0 | 0 | 0 |

**Totaal (107 gebieden): 5205 | 905 | 55**

### Zesde ronde: Fryslân, zuid naar noord

Twee gebieden bewust overgeslagen wegens omvang: Waddenzee en Noordzeekustzone (vergelijkbare
bbox-omvang als de al eerder om die reden uitgestelde Veluwe). Drie grensgebieden die op de
natura2000.nl-provinciepagina van Fryslân staan maar via de point-in-polygon-provincietoets als
Drenthe of Groningen classificeren (Drents-Friese Wold & Leggelderveld, Fochteloërveen,
Lauwersmeer) blijven voor een latere Drenthe/Groningen-ronde staan, consistent met de bestaande
methode (provincie = point-in-polygon-uitkomst, niet de website-indeling).

| Gebied | Provincie(s) | Boerderijen | BAG-industriefunctie-indicatie | BAG niet te controleren |
|---|---|---:|---:|---:|
| [IJsselmeer](gebieden/ijsselmeer.html) | Fryslân / Noord-Holland | 71 | 12 | 0 |
| [Rottige Meenthe & Brandemeer](gebieden/rottige-meenthe-brandemeer.html) | Overijssel | 1 | 0 | 0 |
| [Oudegaasterbrekken, Fluessen en omgeving](gebieden/oudegaasterbrekken-fluessen.html) | Fryslân | 24 | 6 | 0 |
| [Witte en Zwarte Brekken](gebieden/witte-zwarte-brekken.html) | Fryslân | 10 | 2 | 0 |
| [Deelen](gebieden/deelen.html) | Fryslân | 9 | 4 | 0 |
| [Van Oordt's Mersken](gebieden/van-oordts-mersken.html) | Fryslân | 12 | 3 | 0 |
| [Sneekermeergebied](gebieden/sneekermeergebied.html) | Fryslân | 27 | 8 | 0 |
| [Wijnjeterper Schar](gebieden/wijnjeterper-schar.html) | Fryslân | 7 | 0 | 0 |
| [Alde Feanen](gebieden/alde-feanen.html) | Fryslân | 21 | 8 | 0 |
| [Groote Wielen](gebieden/groote-wielen.html) | Fryslân | 13 | 3 | 0 |
| [Duinen Vlieland](gebieden/duinen-vlieland.html) | n.v.t. | 0 | 0 | 0 |
| [Duinen Terschelling](gebieden/duinen-terschelling.html) | Fryslân | 33 | 0 | 0 |
| [Duinen Ameland](gebieden/duinen-ameland.html) | Fryslân | 9 | 0 | 0 |
| [Duinen Schiermonnikoog](gebieden/duinen-schiermonnikoog.html) | n.v.t. | 0 | 0 | 0 |

**Totaal (121 gebieden): 5442 | 951 | 55**

Let op: de totaaltelling is een **som van per-gebied cijfers**, geen aantal unieke monumenten
landelijk - een monument dat dicht bij meerdere Natura 2000-gebieden ligt (bv. tussen Bekendelle en
Korenburgerveen) telt terecht in beide gebiedspagina's mee. De kolom "BAG niet te controleren" is
géén bevestigde NEE - zie Methode, punt 5.

**Resterend: 41 gebieden.** Eerste ronde gewerkt vanuit Gelderland (Achterhoek, IJssel,
Nijmegen-Mook, Gelderse Vallei), met bewust een paar provinciegrensgevallen erbij, uitgebreid naar
Groningen, Drenthe en Fryslân om de aanpak ook buiten het zuidoosten te valideren, en vervolgens
met eerste, losse gebieden in Utrecht, Zuid-Holland, Noord-Brabant en Zuid-Limburg. Tweede ronde:
heel Limburg en Zeeland, zuid naar noord (inclusief enkele grote wateren als
Oosterschelde/Westerschelde/Grevelingen, die dankzij de 5&nbsp;km-marge rond hun oevers nog altijd
relevante aantallen opleverden). Derde ronde: heel Noord-Brabant, zuid naar noord. Vierde ronde:
heel Utrecht en Zuid-Holland, zuid naar noord. Vijfde ronde: heel Noord-Holland, zuid naar noord,
plus de 4 mariene gebieden in de Noordzee-EEZ en Maas bij Eijsden (een gemist Limburgs gebied dat
bij de provincietoets geen polygontreffer opleverde). Zesde ronde: heel Fryslân, zuid naar noord
(op Waddenzee en Noordzeekustzone na, bewust overgeslagen wegens omvang). Nog niet aangeraakt:
Drenthe, Groningen en Noord-Limburg als hoofdgebied (inclusief de drie Friese grensgebieden die bij
Drenthe/Groningen classificeren: Drents-Friese Wold & Leggelderveld, Fochteloërveen, Lauwersmeer),
en de grote gebieden (Veluwe, Waddenzee, Noordzeekustzone) die vanwege hun omvang bewust nog niet
zijn opgepakt.

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
- De resterende ~41 Natura 2000-gebieden landsdekkend toevoegen.
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
