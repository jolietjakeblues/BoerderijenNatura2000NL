// Korte, zelfgeschreven samenvattingen per Natura 2000-gebied (type
// natuurgebied, ligging, oppervlakte, beschermingsreden), gebaseerd op
// https://www.natura2000.nl/gebieden -- geen letterlijke overname, zie
// README sectie "Methode per gebied", punt 6.
export const GEBIEDEN_BESCHRIJVING = {
  'rijntakken': {
    ligging: 'Zutphen–Deventer–Zwolle',
    tekst: 'Rivierengebied van circa 23.000 hectare langs de uiterwaarden van IJssel, Nederrijn, Waal en Lek, verspreid over Gelderland, Overijssel en Utrecht. Beschermd vanwege stroomdalgraslanden, ooibossen en moerasvegetatie langs de rivieren; het gebied kampt zelf met stikstofoverbelasting.',
    bron: 'https://www.natura2000.nl/gebieden/gelderland/rijntakken'
  },
  'landgoederen-brummen': {
    ligging: 'Achterhoek',
    tekst: 'Bos- en heidegebied van circa 677 hectare tussen de Veluwe en de IJsselvallei (Apeldoorn/Brummen), met vier deelgebieden. Beschermd om een grote populatie kamsalamander en om blauwgraslanden en vengroeiingen die elders in de regio grotendeels zijn verdwenen.',
    bron: 'https://www.natura2000.nl/gebieden/gelderland/landgoederen-brummen'
  },
  'willinks-weust': {
    ligging: 'Achterhoek',
    tekst: 'Klein kalkgraslandgebied (circa 52 hectare) ten oosten van Winterswijk, op het zogeheten Muschelkalk-eiland - het enige kalkhoudende gebied van dit type buiten Zuid-Limburg. Beschermd vanwege zeldzame blauwgraslanden, jeneverbesstruweel en eiken-haagbeukenbos, met bijzondere planten, paddenstoelen en amfibieën zoals de kamsalamander.',
    bron: 'https://www.natura2000.nl/gebieden/gelderland/willinks-weust'
  },
  'bekendelle': {
    ligging: 'Achterhoek',
    tekst: 'Beekbegeleidend bos (circa 88 hectare) ten zuiden van Winterswijk, met een vrijwel complete reeks overstromingsbostypen (els, es-iep, eiken-haagbeuk). Bekend om de grootste natuurlijke groeiplaats van bosgeelster in Nederland en een van de grootste populaties bosbeekjuffer.',
    bron: 'https://www.natura2000.nl/gebieden/gelderland/bekendelle'
  },
  'korenburgerveen': {
    ligging: 'Achterhoek',
    tekst: 'Hoogveenrestant (circa 459 hectare) ten westen van Winterswijk, tegen de Duitse grens, met een intacte kern van 40 hectare regenererend hoogveen. Beschermd vanwege zeldzame libellen, vlinders, planten en broedvogels zoals wespendief en bruine kiekendief.',
    bron: 'https://www.natura2000.nl/gebieden/gelderland/korenburgerveen'
  },
  'stelkampsveld': {
    ligging: 'Achterhoek',
    tekst: 'Kleinschalig dekzand- en beekdallandschap (circa 102 hectare) bij Borculo (gemeente Lochem), met heide, blauwgrasland en kalkmoeras. Bekend om orchideeënrijke graslanden en bijzondere libellen- en vlindersoorten.',
    bron: 'https://www.natura2000.nl/gebieden/gelderland/stelkampsveld'
  },
  'sint-jansberg': {
    ligging: 'Nijmegen-Mook',
    tekst: 'Bosgebied (circa 226 hectare) op een stuwwal tussen Nijmegen en de Duitse grens (Berg en Dal/Gennep/Mook en Middelaar), tegen het Reichswald. Beschermd vanwege oude eiken-beuken- en eiken-haagbeukenbossen, bronbossen en kalkmoeras, met vliegend hert en zeldzame slakken als kenmerkende soorten.',
    bron: 'https://www.natura2000.nl/gebieden/limburg/sint-jansberg'
  },
  'zeldersche-driessen': {
    ligging: 'Gennep',
    tekst: 'Rivierduinbos (circa 82 hectare) in een bocht van de Niers, ten oosten van Gennep in Noord-Limburg, met een strook stroomdalgrasland langs de oever - een van de weinige overgebleven stroomdalgraslanden in het Maasstroomgebied.',
    bron: 'https://www.natura2000.nl/gebieden/limburg/zeldersche-driessen'
  },
  'binnenveld': {
    ligging: 'Ede-Rhenen-Veenendaal',
    tekst: 'Blauwgraslandreservaat (circa 111 hectare) in de zuidelijke Gelderse Vallei, tussen Veluwe en Utrechtse Heuvelrug (Ede, Rhenen, Veenendaal), over de grens van Gelderland en Utrecht. Bevat een van de grootste aaneengesloten blauwgraslanden van Nederland en het zeldzame trilveen.',
    bron: 'https://www.natura2000.nl/gebieden/utrecht/binnenveld'
  },
  'wooldse-veen': {
    ligging: 'Achterhoek, grens met Duitsland',
    tekst: 'Grensoverschrijdend hoogveengebiedje (circa 63 hectare) bij Winterswijk, samen met Duitsland. Regenererend hoogveen en hoogveenbos, met zeldzame libellen (noordse glazenmaker, venwitsnuitlibel) en veenvlinders.',
    bron: 'https://www.natura2000.nl/gebieden/gelderland/wooldse-veen'
  },
  'de-bruuk': {
    ligging: 'Groesbeek',
    tekst: 'Kleinschalig moerasgebied (circa 99 hectare) bij Groesbeek, ten oosten van Nijmegen, met hooilanden, struweel en elzenbroekbos gevoed door kalkrijk kwelwater. Bekend om orchideeënrijke blauwgraslanden en een grote nachtegalenpopulatie.',
    bron: 'https://www.natura2000.nl/gebieden/gelderland/de-bruuk'
  },
  'lieftinghsbroek': {
    ligging: 'Westerwolde',
    tekst: 'Loofbos (circa 20 hectare) op de flank van de Ruiten Aa, zo’n 2 km ten zuiden van Vlagtwedde in Groningen (gemeente Westerwolde). Beschermd vanwege oud eiken-beukenbos en eiken-haagbeukenbos met een kern ouder dan 1800 - het noordelijkste stukje oud loofbos van Zuid-Groningen.',
    bron: 'https://www.natura2000.nl/gebieden/groningen/lieftinghsbroek'
  },
  'norgerholt': {
    ligging: 'Norg',
    tekst: 'Oud eiken-hulstbos (circa 26 hectare) op een zandrug tussen twee beken, ten noorden van Norg in Drenthe. Bekend om een unieke, alleen hier voorkomende ondersoort van de bosmuur en een ongestoorde bodemopbouw.',
    bron: 'https://www.natura2000.nl/gebieden/drenthe/norgerholt'
  },
  'witterveld': {
    ligging: 'Assen',
    tekst: 'Heide- en hoogveengebied (circa 481 hectare) ten zuidwesten van Assen (gemeenten Assen en Midden-Drenthe). Een van de weinige ongeschonden, niet-afgegraven hoogvenen van Nederland, met levend hoogveen, twee vennen en een volledige overgang naar heide.',
    bron: 'https://www.natura2000.nl/gebieden/drenthe/witterveld'
  },
  'elperstroomgebied': {
    ligging: 'Westerbork-Orvelte',
    tekst: 'Beekdallandschap (circa 351 hectare) in West-Drenthe (Aa en Hunze/Midden-Drenthe), op de westflank van de Hondsrug. Beschermd vanwege kalkmoeras en blauwgrasland met zeldzame zeggesoorten, orchideeën en vlinders zoals het zilveren maantje.',
    bron: 'https://www.natura2000.nl/gebieden/drenthe/elperstroomgebied'
  },
  'bakkeveense-duinen': {
    ligging: 'Opsterland',
    tekst: 'Stuifzand-, heide- en bosgebied (circa 258 hectare) aan de westrand van het Drents Plateau in Friesland (gemeente Opsterland). Bekend om zeldzame korstmossen en mossen op het stuifzand en het bedreigde gentiaanblauwtje.',
    bron: 'https://www.natura2000.nl/gebieden/friesland/bakkeveense-duinen'
  },
  'drouwenerzand': {
    ligging: 'Borger-Odoorn',
    tekst: 'Actief stuifzandlandschap met heide en jeneverbesstruweel (circa 222 hectare) op de oostflank van de Hondsrug, tussen Drouwen en Gasselte in Drenthe. Beschermd vanwege pionierbegroeiing met rendiermos en heidevogels als nachtzwaluw en tapuit.',
    bron: 'https://www.natura2000.nl/gebieden/drenthe/drouwenerzand'
  },
  'kolland-overlangbroek': {
    ligging: 'Wijk bij Duurstede-Utrechtse Heuvelrug',
    tekst: 'Kleinschalig cultuurlandschap (circa 107 hectare) in het stroomgebied van de Kromme Rijn, tussen Wijk bij Duurstede en de Utrechtse Heuvelrug, op de grens van Gelderland en Utrecht. Beschermd vanwege actief beheerd essenhakhoutbos op voedselrijke kleigrond - internationaal een zeldzaam bostype - met een rijke mos-, korstmos- en paddenstoelenflora en de nachtegaal als kenmerkende broedvogel.',
    bron: 'https://www.natura2000.nl/gebieden/utrecht/kolland-overlangbroek'
  },
  'zouweboezem': {
    ligging: 'Ameide-Meerkerk',
    tekst: '14e-eeuws boezemgebied (circa 257 hectare) tussen Ameide en Meerkerk in het Groene Hart, op de grens van Utrecht en Zuid-Holland. Bekend om de grootste kolonie purperreigers van Nederland en Noordwest-Europa, gevoed door een grote populatie grote modderkruiper, en om resterende blauwgraslanden in het rietmoeras.',
    bron: 'https://www.natura2000.nl/gebieden/utrecht/zouweboezem'
  },
  'regte-heide-riels-laag': {
    ligging: 'Goirle',
    tekst: 'Heide-, ven- en bosgebied (circa 538 hectare) tussen de beken Lei en Roppelsche Leij bij Goirle in Noord-Brabant. Bevat een vrijwel complete gradiënt van droge heide tot beek, met heischraalgrasland en zwakgebufferd water; kenmerkende soorten zijn heideblauwtje, gentiaanblauwtje en broedvogels als wulp en roodborsttapuit.',
    bron: 'https://www.natura2000.nl/gebieden/noord-brabant/regte-heide-riels-laag'
  },
  'vlijmens-ven': {
    ligging: "'s-Hertogenbosch",
    tekst: 'Samengesteld gebied (circa 897 hectare) ten zuidwesten van \'s-Hertogenbosch in Noord-Brabant, bestaand uit een kwelgebied (Vlijmens Ven), een voormalig veenmoeras (Moerputten) en moeras langs de Dommel (Bossche Broek). Beschermd vanwege kranswierwater, blauwgrasland met grote pimpernel en de heruitgezette vlindersoorten pimpernelblauwtje en donker pimpernelblauwtje.',
    bron: 'https://www.natura2000.nl/gebieden/noord-brabant/vlijmens-ven-moerputten-bossche-broek'
  },
  'leudal': {
    ligging: 'Roermond',
    tekst: 'Bosgebied met beekdalen (circa 340 hectare) in Midden-Limburg, ten noordwesten van Roermond, tussen vijf kerkdorpen. Beschermd vanwege vochtige alluviale bossen (elzenbroek- en essenbos) met kwelwater van uiteenlopende herkomst, en als refugium voor oude-loofbosvogels zoals kleine bonte specht en nachtegaal.',
    bron: 'https://www.natura2000.nl/gebieden/limburg/leudal'
  },
  'swalmdal': {
    ligging: 'Roermond-Beesel',
    tekst: 'Meanderend beekdal (circa 123 hectare) tussen Roermond en Beesel in Midden-Limburg, diep ingesneden in het Maasterrassenlandschap. Beschermd vanwege kwelgevoede elzenbroekbossen en waterranonkelbegroeiing, met de zeggekorfslak en de in 2006 herontdekte gaffellibel als kenmerkende soorten.',
    bron: 'https://www.natura2000.nl/gebieden/limburg/swalmdal'
  },
  'roerdal': {
    ligging: 'Roermond',
    tekst: 'Rivierdal (circa 834 hectare) langs het Nederlandse traject van de Roer, die bij Roermond in de Maas uitmondt - een van de weinige Natura 2000-gebieden met natuurlijke meandervorming. Beschermd vanwege waterranonkelbegroeiing en elzenbroekbos in oude meanders, drie priksoorten en de grootste Nederlandse populatie gaffellibel.',
    bron: 'https://www.natura2000.nl/gebieden/limburg/roerdal'
  },
  'geleenbeekdal': {
    ligging: 'Sittard-Geleen',
    tekst: 'Beekdal (circa 253 hectare) langs de Geleenbeek, verspreid over Beekdaelen, Heerlen en Voerendaal in Zuid-Limburg. Beschermd vanwege vochtige alluviale bossen, het Imstenraderbos (beuken-eikenbos) en alkalisch laagveen met het Kathagerbroek als kerngebied; herbergt een van de grootste Nederlandse populaties zeggekorfslak.',
    bron: 'https://www.natura2000.nl/gebieden/limburg/geleenbeekdal'
  },
  'noorbeemden-hoogbos': {
    ligging: 'Eijsden-Margraten, grens met België',
    tekst: 'Kleinschalig kalkmoerasgebied (circa 55 hectare) in het zuidwesten van het Mergelland, bij Eijsden-Margraten. Beschermd vanwege kalkbronnen met bijzondere mosvegetatie, vochtige essen-elzenbossen en oude hooilanden met een grote plantenrijkdom.',
    bron: 'https://www.natura2000.nl/gebieden/limburg/noorbeemden-hoogbos'
  },
  'savelsbos': {
    ligging: 'Eijsden-Margraten/Maastricht',
    tekst: 'Hellingbos (circa 360 hectare) langs de oostoever van de Maas tussen Cadier en Keer en Eijsden, met eiken-haagbeukenbos en kalksteenbeukenbos, doorsneden door erosiegeulen (grubben). De enige Nederlandse groeiplaats van amandelwolfsmelk, met bosvogels als wespendief en middelste bonte specht en een grote dassenpopulatie.',
    bron: 'https://www.natura2000.nl/gebieden/limburg/savelsbos'
  },
  'geuldal': {
    ligging: 'Zuid-Limburgse heuvelland',
    tekst: 'Uitgestrekt heuvellandgebied (circa 2.500 hectare) langs de Geul, over zeven Zuid-Limburgse gemeenten - een van de grootste en meest gevarieerde Natura 2000-gebieden van Nederland. Beukenbossen, hellingbossen en kalkgraslanden bieden onderdak aan baardvleermuis, mopsvleermuis, vliegend hert en geelbuikvuurpad, met orchideeënrijke beukenbossen en zeldzame kalkgraslandplanten.',
    bron: 'https://www.natura2000.nl/gebieden/limburg/geuldal'
  },
  'sint-pietersberg-jekerdal': {
    ligging: 'Maastricht',
    tekst: 'Krijtlandschap (circa 280 hectare) ten zuiden van Maastricht langs de Maas en de Jeker, met kalkgraslanden, hellingbos en eeuwenoude mergelgroeven. De ondergrondse groeven (ruim 200 km gangen) zijn van groot belang als overwinteringsplek voor negen vleermuissoorten, waaronder vale vleermuis en ingekorven vleermuis.',
    bron: 'https://www.natura2000.nl/gebieden/limburg/sint-pietersberg-jekerdal'
  },
  'bemelerberg-schiepersberg': {
    ligging: 'Eijsden-Margraten/Maastricht/Valkenburg aan de Geul',
    tekst: "Hellingen en groeves (circa 196 hectare) aan de oostzijde van het Maasdal, verspreid over drie Zuid-Limburgse gemeenten. Beschermd vanwege kalkgraslanden met de enige Nederlandse groeiplaats van bergganderik, en om de belangrijkste Nederlandse populatie geelbuikvuurpad in de groeve 't Rooth.",
    bron: 'https://www.natura2000.nl/gebieden/limburg/bemelerberg-en-schiepersberg'
  },
  'kunderberg': {
    ligging: 'Heerlen/Simpelveld/Voerendaal',
    tekst: 'Kalkgraslandgebied (circa 95 hectare) op de noordflank van het Ubachsberg-plateau, met holle wegen, struweel en eiken-haagbeukenbos (Putberg). Bekend om zeldzame orchideeën en om stabiele populaties van wilde weit, Duitse gamander en hauwklaver.',
    bron: 'https://www.natura2000.nl/gebieden/limburg/kunderberg'
  },
  'brunssummerheide': {
    ligging: 'Brunssum/Heerlen/Landgraaf',
    tekst: 'Heide- en hoogveengebied (circa 542 hectare) op een geologisch bijzondere ondergrond van zilverzand, met vennen, stuifzand en de beek de Rode Beek. Beschermd vanwege actief hoogveen, 106 bijensoorten en een van de drie Nederlandse populaties van de noordse glazenmaker.',
    bron: 'https://www.natura2000.nl/gebieden/limburg/brunssummerheide'
  },
  'bunder-elslooerbos': {
    ligging: 'Meerssen/Stein',
    tekst: 'Vijf aaneengesloten bossen (circa 190 hectare) op de steile oostflank van het Maasdal tussen Elsloo en Bunde, met kalkbronnen en het enige Nederlandse tufsteen-brontype. Herbergt de grootste vuursalamanderpopulatie van het land, met naar schatting zeventig exemplaren in het Bunderbos.',
    bron: 'https://www.natura2000.nl/gebieden/limburg/bunder-en-elslooerbos'
  },
  'grensmaas': {
    ligging: 'Zuid-Limburg, grens met België',
    tekst: "Heuvellandrivier (circa 314 hectare) die over zo'n 45 km de grens met België vormt, met meanderende oevers, grind- en zandbanken en wilgenstruweel. Beschermd vanwege trekvissen als rivierprik, zeeprik en zalm, en om een voor Nederland unieke riviervisfauna met barbeel en kopvoorn.",
    bron: 'https://www.natura2000.nl/gebieden/limburg/grensmaas'
  },
  'abdij-lilbosch-mariahoop': {
    ligging: 'Echt-Susteren',
    tekst: 'Twee kleine deelgebieden (samen circa 15 hectare) met kleinschalig landschap van akkers, bomenrijen, holle wegen en natte laagtes bij Echt-Susteren. Aangewezen vanwege kraamkolonies van de kleine hoefijzerneus: ruim 170 dieren bij de abdij Lilbosch en circa 100 bij het voormalige klooster Mariahoop, aan de noordgrens van het verspreidingsgebied van deze soort.',
    bron: 'https://www.natura2000.nl/gebieden/limburg/abdij-lilbosch-voormalig-klooster-mariahoop'
  },
  'meinweg': {
    ligging: 'Roerdalen/Roermond',
    tekst: 'Bos- en heidegebied (circa 1.822 hectare) langs de oostoever van de Maas in Midden-Limburg, met droge en natte heide, elzenbroek langs de Roode Beek en Boschbeek. Bekend om grote populaties adders, 12 amfibieën- en 40 libellensoorten, en de grootste Limburgse populatie sprinkhaanzanger.',
    bron: 'https://www.natura2000.nl/gebieden/limburg/meinweg'
  },
  'canisvliet': {
    ligging: 'Terneuzen, Zeeuws-Vlaanderen',
    tekst: 'Voormalige kreek (circa 141 hectare) met vochtige graslanden en rietvegetatie, ten oosten van het kanaal Terneuzen-Gent bij Sas van Gent. Aangewezen vanwege een van de belangrijkste Nederlandse groeiplaatsen van kruipend moerasscherm, hier in 1983 herontdekt na lange afwezigheid.',
    bron: 'https://www.natura2000.nl/gebieden/zeeland/canisvliet'
  },
  'weerter-budelerbergen-ringselven': {
    ligging: 'Cranendonck/Nederweert/Someren/Weert',
    tekst: 'Samengesteld bos-, heide- en moerasgebied (circa 3.164 hectare) op de grens van Limburg en Noord-Brabant, met vochtige berkenbroekbossen, stuifzand en het grootste galigaanmoeras van Nederland. Herbergt duizenden kokmeeuwen en de grootste Nederlandse populatie beekoeverlibel.',
    bron: 'https://www.natura2000.nl/gebieden/limburg/weerter-en-budelerbergen-ringselven'
  },
  'sarsven-de-banen': {
    ligging: 'Nederweert',
    tekst: "Twee aangrenzende heidevennen (circa 154 hectare) in Midden-Limburg, met zwak gebufferd water, elzenbroek en vochtige graslanden. Sinds herstelmaatregelen in de jaren '90 teruggekeerde zeldzaamheden zijn onder meer stekelharig kransblad en drijvende waterweegbree.",
    bron: 'https://www.natura2000.nl/gebieden/limburg/sarsven-en-de-banen'
  },
  'groote-gat': {
    ligging: 'Sluis, Zeeuws-Vlaanderen',
    tekst: 'Voormalige kreek met graslanden (circa 70 hectare) ten zuiden van Oostburg in West-Zeeuws-Vlaanderen. Herbergt de grootste Nederlandse groeiplaats van kruipend moerasscherm, plus rietvelden die broedplaats bieden aan bruine kiekendief, waterrail en blauwborst.',
    bron: 'https://www.natura2000.nl/gebieden/zeeland/groote-gat'
  },
  'vogelkreek': {
    ligging: 'Hulst, Zeeuws-Vlaanderen',
    tekst: 'Voormalige kreek met natte en zilte graslanden (circa 97 hectare) bij Hengstdijk in Oost-Zeeuws-Vlaanderen. Een van de grootste Zeeuwse groeiplaatsen van kruipend moerasscherm (herontdekt in 1983), met broedende steltlopers als tureluur en kluut.',
    bron: 'https://www.natura2000.nl/gebieden/zeeland/vogelkreek'
  },
  'zwin-kievittepolder': {
    ligging: 'Sluis/Vlissingen, grens met België',
    tekst: 'Grensoverschrijdend duin- en schorrengebied (circa 121 hectare), voor ongeveer een derde in Nederland. Een van de weinige zandige schorren van het Deltagebied, met de zuidwestelijkste Nederlandse populatie kamsalamander en de eerste vaste vestiging van kleine zilverreiger in ons land.',
    bron: 'https://www.natura2000.nl/gebieden/zeeland/zwin-kievittepolder'
  },
  'westerschelde-saeftinghe': {
    ligging: 'Zeeuws-Vlaanderen/Zuid-Beveland/Walcheren',
    tekst: 'Estuarium (circa 44.000 hectare), het enige natuurlijke getijdenestuarium van Zuidwest-Nederland, met platen, slikken en schorren. Saeftinghe is met circa 3.000 hectare het grootste schorrengebied van het land; het estuarium is van internationaal belang voor duizenden overwinterende en trekkende steltlopers en herbergt zeehonden en trekvissen.',
    bron: 'https://www.natura2000.nl/gebieden/zeeland/westerschelde-saeftinghe'
  },
  'deurnsche-peel-mariapeel': {
    ligging: 'Deurne/Horst aan de Maas/Peel en Maas/Venray',
    tekst: 'Hoogveenrestant (circa 2.734 hectare) op de grens van Limburg en Noord-Brabant, met actief hoogveen, regenererende venen en heide op voormalige veenwinningsgrond. Herbergt meer dan 100 broedparen kleine vliegenvanger en honderden paren baardmannetje, met de zwarte ooievaar als bijzondere doortrekker.',
    bron: 'https://www.natura2000.nl/gebieden/noord-brabant/deurnsche-peel-mariapeel'
  },
  'zoommeer': {
    ligging: 'Bergen op Zoom/Reimerswaal/Tholen',
    tekst: 'Zoetwatermeer (circa 1.046 hectare) tussen Noord-Brabant en Zeeland, ontstaan in 1987 na afsluiting van de voormalige Oosterschelde-mond. Belangrijk rust- en foerageergebied voor watervogels als fuut, krakeend en pijlstaart, en voor scholeksters die bij hoogwater uitwijken vanuit de Oosterschelde.',
    bron: 'https://www.natura2000.nl/gebieden/noord-brabant/zoommeer'
  },
  'yerseke-kapelse-moer': {
    ligging: 'Kapelle/Reimerswaal',
    tekst: 'Oud polderlandschap (circa 433 hectare) tussen Kapelle en Yerseke, met kreekruggen, slootjes en overgebleven reliëf van vroegere zout- en veenwinning. Belangrijk winterverblijf voor rietganzen en smienten, en broedgebied voor tureluur, grutto en kluut.',
    bron: 'https://www.natura2000.nl/gebieden/zeeland/yerseke-en-kapelse-moer'
  },
  'boschhuizerbergen': {
    ligging: 'Land van Cuijk/Venray',
    tekst: 'Naaldbos-, heide- en stuifzandcomplex (circa 277 hectare) op de grens van Limburg en Noord-Brabant. Bevat de grootste jeneverbesstruwelen van Zuid-Nederland, met naar schatting 4.500 jeneverbesstruiken.',
    bron: 'https://www.natura2000.nl/gebieden/limburg/boschhuizerbergen'
  },
  'maasduinen': {
    ligging: 'Bergen (L)/Gennep/Venlo',
    tekst: 'Uitgestrekt heide-, bos- en stuifzandgebied (circa 5.274 hectare) in Noord-Limburg, van Heijen tot Schandelo, met parabolduinen, vennen en resten van hoogveen. Beschermd vanwege zandhagedis, rugstreeppad, rondbladige zonnedauw en broedende roerdompen en baardmannetjes.',
    bron: 'https://www.natura2000.nl/gebieden/limburg/maasduinen'
  },
  'veerse-meer': {
    ligging: 'Tussen Walcheren, Noord- en Zuid-Beveland',
    tekst: 'Brak tot zout meer (circa 2.539 hectare) tussen Walcheren en de Bevelanden, met ondiepe randen, zandplaten en eilandjes. Belangrijkste Nederlandse overwinteringsgebied voor de fuut, met sinds 2004 een getijdeverbinding met de Oosterschelde die de waterkwaliteit herstelde.',
    bron: 'https://www.natura2000.nl/gebieden/zeeland/veerse-meer'
  },
  'oosterschelde': {
    ligging: 'Midden-Zeeland',
    tekst: 'Voormalig estuarium, nu een ondiepe zoutwaterbaai met beperkte getijdenwerking (circa 37.000 hectare), met droogvallende platen, schorren en tot 45 meter diepe geulen. Belangrijkste getijdennatuur van Zuidwest-Nederland, met een van de grootste zeegrasvelden van het land en grote aantallen foeragerende en rustende steltlopers.',
    bron: 'https://www.natura2000.nl/gebieden/zeeland/oosterschelde'
  },
  'manteling-van-walcheren': {
    ligging: 'Veere',
    tekst: 'Laaggelegen duingebied (circa 735 hectare) aan de noordwestrand van Walcheren, met duindoornstruweel, eikenbos en een natuurlijke, door de wind gevormde bosgrens. Bekend om de enige Nederlandse groeiplaats van de braamsoort Rubus ulmifolius en om broedende nachtegalen.',
    bron: 'https://www.natura2000.nl/gebieden/zeeland/manteling-van-walcheren'
  },
  'kop-van-schouwen': {
    ligging: 'Schouwen-Duiveland',
    tekst: 'Afwisselend duingebied (circa 2.242 hectare) aan de westpunt van Schouwen-Duiveland, met kalkrijke jonge duinen, kalkarme oude duinen, klifduinen en actief stuifzand. Op de Zoute Haard, na Texel het belangrijkste Nederlandse bolwerk van de sterk bedreigde harlekijnorchis.',
    bron: 'https://www.natura2000.nl/gebieden/zeeland/kop-van-schouwen'
  },
  'grevelingen': {
    ligging: 'Tussen Goeree-Overflakkee en Schouwen-Duiveland',
    tekst: 'Grootste zoutwatermeer van Europa (circa 13.750 hectare), ontstaan na afsluiting door de Deltawerken in 1971, met eilandjes, duinvalleien en schorren. Van groot belang voor overwinterende viseters als fuut en middelste zaagbek, en met de harlekijnorchis in de duinvalleien een van de vijf grootste Nederlandse groeiplaatsen van deze soort.',
    bron: 'https://www.natura2000.nl/gebieden/zeeland/grevelingen'
  },
  'leenderbos-groote-heide-de-plateaux': {
    ligging: 'Bergeijk/Cranendonck/Eersel/Eindhoven/Heeze-Leende/Valkenswaard/Veldhoven/Waalre',
    tekst: 'Samengesteld heide-, ven- en bosgebied (circa 4.390 hectare) over acht Kempense gemeenten. Beschermd vanwege droge en natte heide, vennen en beekdalen, met nachtzwaluw, boompieper en de enige Noord-Brabantse populatie beekprik.',
    bron: 'https://www.natura2000.nl/gebieden/noord-brabant/leenderbos-groote-heide-de-plateaux'
  },
  'groote-peel': {
    ligging: 'Asten/Peel en Maas/Nederweert, grens Noord-Brabant/Limburg',
    tekst: 'Hoogveenrestant (circa 1.348 hectare) op de grens van Noord-Brabant en Limburg, met heide, vennen en veenputten - een restant van een ooit uitgestrekt hoogveenlandschap. Bekend om duizenden overwinterende ganzen, een grote kokmeeuwenkolonie en doortrekkende kraanvogels.',
    bron: 'https://www.natura2000.nl/gebieden/noord-brabant/groote-peel'
  },
  'strabrechtse-heide-beuven': {
    ligging: 'Heeze-Leende/Someren',
    tekst: 'Heide- en vennengebied (circa 1.843 hectare) ten zuidoosten van Geldrop, met droge heide, stuifzand en het Beuven - met ruim 60 hectare het grootste heideven van Nederland. Beschermd vanwege broedende roerdompen, het pimpernelblauwtje en de grootste aaneengesloten open heide van Noord-Brabant.',
    bron: 'https://www.natura2000.nl/gebieden/noord-brabant/strabrechtse-heide-beuven'
  },
  'brabantse-wal': {
    ligging: 'Bergen op Zoom/Roosendaal/Woensdrecht',
    tekst: 'Overgangslandschap (circa 4.874 hectare) van zandgronden naar kleigronden, aan de westrand van het Zuid-Nederlandse dekzandgebied. Het Groote Meer en Kleine Meer horen tot de grootste vennen van Nederland; het gebied sluit aan op de Belgische Kalmthoutse Heide en herbergt meer dan vijftig broedparen nachtzwaluw.',
    bron: 'https://www.natura2000.nl/gebieden/noord-brabant/brabantse-wal'
  },
  'kempenland-west': {
    ligging: 'Bladel/Eersel/Hilvarenbeek/Oirschot/Reusel-De Mierden',
    tekst: 'Restanten van een vroeger uitgestrekt heidelandschap (circa 1.882 hectare) rond de beken Reusel, Groote Beerze en Kleine Beerze. Herbergt de grootste Nederlandse populatie van de drijvende waterweegbree.',
    bron: 'https://www.natura2000.nl/gebieden/noord-brabant/kempenland-west'
  },
  'markiezaat': {
    ligging: 'Bergen op Zoom/Reimerswaal/Woensdrecht',
    tekst: 'Brak tot zoet meer (circa 1.832 hectare) op de grens van Noord-Brabant en Zeeland, ontstaan uit voormalige kreken en schorren die geleidelijk verzoeten. Broedplaats van lepelaars sinds 1995, en belangrijk rustgebied voor futen en eendensoorten die bij hoogwater uitwijken vanuit de Oosterschelde.',
    bron: 'https://www.natura2000.nl/gebieden/noord-brabant/markiezaat'
  },
  'ulvenhoutse-bos': {
    ligging: 'Breda',
    tekst: 'Beuken-zomereikenbos (circa 112 hectare) ten zuidoosten van Breda, op een voormalige overstromingsvlakte met kwelwater door een slecht doorlatende kleilaag. Beschermd vanwege een zeldzame, soortenrijke ondergroei met bijzondere mossen en varens, en broedende spechten in het oude bos.',
    bron: 'https://www.natura2000.nl/gebieden/noord-brabant/ulvenhoutse-bos'
  },
  'kampina-oisterwijkse-vennen': {
    ligging: 'Boxtel/Oirschot/Oisterwijk',
    tekst: 'Vennengebied (circa 2.278 hectare) op een golvend dekzandlandschap met paraboolduinen, met meer dan honderd vennen, heide en elzenbroekbos. Beschermd vanwege een grote variatie aan vengemeenschappen en broedende wulpen, tureluurs en blauwborsten.',
    bron: 'https://www.natura2000.nl/gebieden/noord-brabant/kampina-en-oisterwijkse-vennen'
  },
  'loonse-drunense-duinen-leemkuilen': {
    ligging: 'Haaren/Heusden/Loon op Zand/Tilburg/Waalwijk',
    tekst: 'Drie samengevoegde deelgebieden (circa 3.975 hectare): actief stuifzand (ruim 1.000 hectare, een van de grootste van Europa), het beekdal De Brand, en de voormalige kleiputten de Leemkuilen. Beschermd vanwege kamsalamander en boomkikker, en broedende kleine vliegenvanger en spechten in de omringende bossen.',
    bron: 'https://www.natura2000.nl/gebieden/noord-brabant/loonse-en-drunense-duinen-leemkuilen'
  },
  'langstraat': {
    ligging: 'Sprang-Capelle, gemeente Waalwijk',
    tekst: 'Hersteld stroken-landschap (circa 506 hectare) bij Sprang-Capelle, met kwelsloten, blauwgraslanden en veenmoeras rond een oude eendenkooi. De kwelsloten herbergen zeldzame kranswiergemeenschappen, en het gebied heeft de grootste Nederlandse populatie van de zegge Carex flava, die in Nederland verder nog maar op enkele plekken voorkomt.',
    bron: 'https://www.natura2000.nl/gebieden/noord-brabant/langstraat'
  },
  'oeffelter-meent': {
    ligging: 'Land van Cuijk, ten zuiden van de Maas',
    tekst: 'Reliëfrijk, soortenrijk graslandgebied (circa 101 hectare) op oude rivierterrassen ten zuiden van de Maas bij Oeffelt, afgewisseld met meidoorn- en sleedoornhagen. Beschermd vanwege een zeldzaam, voedselarm type beekdalgrasland (Sedo-Thymetum) met pioniersoorten op zand-grindbodem, en broedende steenuilen en dassen.',
    bron: 'https://www.natura2000.nl/gebieden/noord-brabant/oeffelter-meent'
  },
  'biesbosch': {
    ligging: 'Altena/Dordrecht/Drimmelen/Geertruidenberg/Moerdijk',
    tekst: 'Zoetwatergetijdengebied (circa 9.640 hectare) op de grens van Noord-Brabant en Zuid-Holland, met wilgenvloedbos, rietland en grienden. Sinds 1988 succesvol geherintroduceerde bevers, broedende blauwborsten, en zeldzame epifytische mossen die wereldwijd maar op twee andere plekken voorkomen.',
    bron: 'https://www.natura2000.nl/gebieden/noord-brabant/biesbosch'
  },
  'loevestein-pompveld-kornsche-boezem': {
    ligging: 'Altena/Zaltbommel, grens Gelderland/Noord-Brabant',
    tekst: 'Drie deelgebieden (samen circa 750 hectare) rond de Merwede, met binnendijks moeras, grienden en vochtige graslanden, en buitendijks stroomdalgrasland langs de rivier. Beschermd vanwege een grote populatie grote modderkruiper en de meest westelijke rivierengebied-populatie kamsalamander.',
    bron: 'https://www.natura2000.nl/gebieden/gelderland/loevestein-pompveld-kornsche-boezem'
  },
  'krammer-volkerak': {
    ligging: 'Grens Zeeland/Noord-Brabant/Zuid-Holland, tussen Goeree-Overflakkee en Tholen',
    tekst: 'Voormalige zeearm, nu een zoetwatermeer met vaste waterstand (circa 6.081 hectare), met een diepe vaargeul en glooiende, deels droogvallende platen. Broedplaats van lepelaars sinds 1997, en belangrijk voor overwinterende nonnetjes en andere duikeenden.',
    bron: 'https://www.natura2000.nl/gebieden/zeeland/krammer-volkerak'
  },
  'hollands-diep': {
    ligging: 'Tussen Biesbosch en Haringvliet, grens Zuid-Holland/Noord-Brabant',
    tekst: 'Voormalig zoutwatergetijdengebied (circa 4.225 hectare), sinds de afsluiting van het Haringvliet in 1970 zoet, met wilgenvloedbossen, rietland en natte graslanden. Rust- en foerageergebied voor ganzen en eenden, met de noordse woelmuis in de natte graslanden en een doortrekroute voor rivierprik, zeeprik en fint.',
    bron: 'https://www.natura2000.nl/gebieden/noord-brabant/hollands-diep'
  },
  'oudeland-van-strijen': {
    ligging: 'Hoeksche Waard',
    tekst: 'Open polderlandschap (circa 1.568 hectare) in de Hoeksche Waard, met oude graslanden en sloten op kleigrond. Belangrijk overwinteringsgebied voor duizenden rotganzen en grauwe ganzen, met een opvallende populatie dwerggans en doortrekkende goudplevieren.',
    bron: 'https://www.natura2000.nl/gebieden/zuid-holland/oudeland-van-strijen'
  },
  'haringvliet': {
    ligging: 'Goeree-Overflakkee/Hoeksche Waard/Nissewaard/Voorne aan Zee',
    tekst: 'Voormalige zeearm (circa 11.196 hectare) met slikken, schorren en rietland langs de oevers, met het eiland Tiengemeten in het midden. Belangrijk broedgebied voor sterns, plevieren en meeuwen, rust- en foerageergebied voor ganzen, en leefgebied voor de noordse woelmuis.',
    bron: 'https://www.natura2000.nl/gebieden/zuid-holland/haringvliet'
  },
  'duinen-goeree-kwade-hoek': {
    ligging: 'Goeree-Overflakkee',
    tekst: 'Kustgebied (circa 1.624 hectare) met spontaan gevormde jonge duintjes, slikken en schorren met kronkelende kreken, en oudere, glooiende binnenduinen. Beschermd vanwege zeldzame heischrale duingraslanden met orchideeën, en de noordse woelmuis en nauwe korfslak.',
    bron: 'https://www.natura2000.nl/gebieden/zuid-holland/duinen-goeree-kwade-hoek'
  },
  'oude-maas': {
    ligging: 'Albrandswaard/Barendrecht/Hoeksche Waard/Nissewaard/Rotterdam',
    tekst: 'Zoetwatergetijdengebied (circa 474 hectare), het enige overgebleven zoetwatergetijdengebied van Nederland, met wilgenvloedbossen, rietland en zeggevelden. Herbergt de grootste Noordwest-Europese populatie zomerklokje en de noordse woelmuis.',
    bron: 'https://www.natura2000.nl/gebieden/zuid-holland/oude-maas'
  },
  'voornes-duin': {
    ligging: 'Oostvoorne, Rotterdam/Voorne aan Zee',
    tekst: 'Kalkrijk duingebied (circa 1.432 hectare) bij Oostvoorne, met duinvalleien, twee grote duinmeren, moeras, bos en schorren langs het Brielse Gat. Met 715 inheemse plantensoorten een van de soortenrijkste gebieden van Nederland, met de nauwe korfslak, de noordse woelmuis en een grote aalscholverkolonie.',
    bron: 'https://www.natura2000.nl/gebieden/zuid-holland/voornes-duin'
  },
  'boezems-kinderdijk': {
    ligging: 'Alblasserdam/Molenlanden',
    tekst: 'Boezemgebied (circa 331 hectare) met open water, riet- en zeggemoeras, grienden en de historische Kinderdijkse molens. Broedplaats van purperreigers en zwarte sterns, en een van de grootste Nederlandse populaties van de zeggekorfslak.',
    bron: 'https://www.natura2000.nl/gebieden/zuid-holland/boezems-kinderdijk'
  },
  'donkse-laagten': {
    ligging: 'Molenlanden, tussen Bleskensgraaf en Streefkerk',
    tekst: 'Nat polderlandschap (circa 190 hectare) ten zuiden van de Lek, met blauwgrasland en dotterbloemhooiland. Sinds 1983 natuurgebied, aangewezen als foerageer- en slaapplaats voor de kolgans, met tot 25.000 overwinterende vogels.',
    bron: 'https://www.natura2000.nl/gebieden/zuid-holland/donkse-laagten'
  },
  'lingegebied-diefdijk-zuid': {
    ligging: 'Gorinchem/Molenlanden/Vijfheerenlanden/West Betuwe, grens Gelderland/Utrecht/Zuid-Holland',
    tekst: "Drie deelgebieden (samen circa 750 hectare) langs de Linge bij Leerdam, met grienden, rietland en voormalige kleiputten die zijn dichtgegroeid tot kalkmoeras. De Put van Bullee geldt als referentiegebied voor een orchideeënrijk kalkmoerastype; verder een kwetsbare, geïsoleerde populatie kamsalamander.",
    bron: 'https://www.natura2000.nl/gebieden/gelderland/lingegebied-diefdijk-zuid'
  },
  'uiterwaarden-lek': {
    ligging: 'Lopik/Vijfheerenlanden, tussen Vianen en Schoonhoven',
    tekst: 'Vier verspreide uiterwaarden (samen circa 148 hectare) langs de Lek tussen Vianen en Schoonhoven. Herbergt de best ontwikkelde stroomdalgraslanden langs de Lek, met warmteminnende planten en op de Luistenbuul de grootste Nederlandse groeiplaats van het mos Entodon concinnus.',
    bron: 'https://www.natura2000.nl/gebieden/utrecht/uiterwaarden-lek'
  },
  'solleveld-kapittelduinen': {
    ligging: 'Den Haag/Rotterdam/Westland, tussen Den Haag en Hoek van Holland',
    tekst: "Duingebied (circa 827 hectare) tussen Den Haag en Hoek van Holland: oudere duinen met heide in Solleveld, jongere duinen met valleien en moeras in de Kapittelduinen. Broedende sprinkhaanzangers en Cetti's zangers, en meer dan honderd overwinterende vleermuizen in de bunkers van het Staelduinse Bos.",
    bron: 'https://www.natura2000.nl/gebieden/zuid-holland/solleveld-kapittelduinen'
  },
  'broekvelden-vettenbroek-polder-stein': {
    ligging: 'Bodegraven-Reeuwijk, ten westen van Gouda',
    tekst: 'Veenweidepolder met plassen (circa 696 hectare) in het Groene Hart, ten westen van Gouda, ontstaan door vroegere turfwinning. Een van de laatste grote groeiplaatsen van de wilde kievitsbloem in West-Nederland, en belangrijk overwinteringsgebied voor smienten en wilde zwanen.',
    bron: 'https://www.natura2000.nl/gebieden/zuid-holland/broekvelden-vettenbroek-polder-stein'
  },
  'westduinpark-wapendal': {
    ligging: 'Den Haag, tussen Kijkduin en Scheveningen',
    tekst: 'Duingebied (circa 246 hectare) in Den Haag, tussen Kijkduin en Scheveningen, met jonge en oude droge duinen, duinbos en in Wapendal droge heide. Een van de laatst overgebleven stukken van het oorspronkelijke, 5.000 jaar oude duinlandschap, met zeldzame zeedorpenplanten als blauwe bremraap en wondklaver.',
    bron: 'https://www.natura2000.nl/gebieden/zuid-holland/westduinpark-wapendal'
  },
  'de-wilck': {
    ligging: 'Alphen aan den Rijn, tussen Zoetermeer en Alphen aan den Rijn',
    tekst: "Veenweidegebied (circa 116 hectare) tussen Zoetermeer en Alphen aan den Rijn, met bloemrijke dotterbloemgraslanden. Oorspronkelijk aangewezen voor de kleine zwaan; nu vooral van belang voor broedende grutto's (rond de 70 paar per jaar) en andere weidevogels.",
    bron: 'https://www.natura2000.nl/gebieden/zuid-holland/de-wilck'
  },
  'nieuwkoopse-plassen-de-haeck': {
    ligging: 'Alphen aan den Rijn/Nieuwkoop/Woerden, grens Utrecht/Zuid-Holland',
    tekst: 'Veenplassengebied (circa 2.008 hectare) op de grens van Utrecht en Zuid-Holland, restant van een uitgestrekt hoogveenlandschap, met trilveen, veenmosrietland en open water. Broedplaats van circa 120 paar purperreigers, en een van de drie grootste Noordwest-Europese kraamkolonies vleermuizen.',
    bron: 'https://www.natura2000.nl/gebieden/zuid-holland/nieuwkoopse-plassen-de-haeck'
  },
  'meijendel-berkheide': {
    ligging: 'Den Haag/Katwijk/Wassenaar',
    tekst: 'Duingebied (circa 2.878 hectare) tussen Den Haag en Katwijk, met paraboolduinen, duingraslanden, struweel en binnenduinbos. Beschermd vanwege soortenrijke duingraslanden met zeldzame paardenbloemsoorten en gentianen, vochtige duinvalleien met orchideeën, en vleermuizen die overwinteren in bunkers uit de Tweede Wereldoorlog.',
    bron: 'https://www.natura2000.nl/gebieden/zuid-holland/meijendel-berkheide'
  },
  'coepelduynen': {
    ligging: 'Tussen Katwijk en Noordwijk',
    tekst: 'Smalle strook kalkrijke jonge duinen (circa 188 hectare) tussen Katwijk en Noordwijk, met een fijnmazig mozaïek van open en gesloten duingrasland. Beschermd vanwege grijze duinen met zeldzame planten als kegelsilene en in topjaren duizenden exemplaren welriekende nachtorchis.',
    bron: 'https://www.natura2000.nl/gebieden/zuid-holland/coepelduynen'
  },
  'botshol': {
    ligging: 'De Ronde Venen',
    tekst: 'Licht brak laagveengebied (circa 218 hectare) met twee grote plassen (Grote en Kleine Wije), rietland, bos en struweel, ontstaan door vroegere veenwinning. Een van de belangrijkste Nederlandse groeiplaatsen van kranswiervegetatie en galigaanmoeras, met broedende purperreigers en lepelaars.',
    bron: 'https://www.natura2000.nl/gebieden/utrecht/botshol'
  },
  'oostelijke-vechtplassen': {
    ligging: 'Grens Noord-Holland/Utrecht, rond Hilversum en Weesp',
    tekst: 'Aaneenschakeling van laagveenplassen en moerassen (circa 6.475 hectare) ontstaan door vervening, verspreid over Amsterdam, De Bilt, Hilversum, Stichtse Vecht en Wijdemeren. Beschermd vanwege trilvenen en broekbossen met de groenknolorchis, en broedende roerdompen, purperreigers en zwarte sterns - samen met de Wieden en Weerribben een van de belangrijkste laagveenmoerasgebieden van Nederland.',
    bron: 'https://www.natura2000.nl/gebieden/noord-holland/oostelijke-vechtplassen'
  },
  'eemmeer-gooimeer-zuidoever': {
    ligging: 'Grens Flevoland/Noord-Holland/Utrecht, tussen Huizen en Bunschoten',
    tekst: 'Ondiep randmeer (circa 1.584 hectare) met rietoevers, zandplaten en aangelegde eilandjes, verspreid over zeven gemeenten. Beschermd als broedgebied voor de visdief en als rust- en overwinteringsgebied voor futen, aalscholvers en rietvogels; herstellende waterkwaliteit brengt waterplanten en mosselen terug.',
    bron: 'https://www.natura2000.nl/gebieden/noord-holland/eemmeer-gooimeer-zuidoever'
  },
  'naardermeer': {
    ligging: 'Amsterdam/Gooise Meren/Hilversum',
    tekst: 'Meer op de overgang van stuwwal naar laagveenlandschap (circa 1.151 hectare), met open water, rietland en circa 250 hectare vrijwel ongestoord els- en berkenbroekbos. Beschermd vanwege kranswiervegetatie, broedende grote karekieten en purperreigers, en de zeldzame groenknolorchis (Liparis loeselii).',
    bron: 'https://www.natura2000.nl/gebieden/noord-holland/naardermeer'
  },
  'kennemerland-zuid': {
    ligging: 'Bloemendaal/Haarlem/Heemstede/Velsen/Zandvoort, zuid van het Noordzeekanaal',
    tekst: 'Uitgestrekt kalkrijk duingebied (circa 8.171 hectare) met dungraslanden, vochtige duinvalleien en parabolduincomplexen - het breedste en kalkrijkste deel van de Hollandse kust. Beschermd vanwege het zeedorpenlandschap met wilde marjolein en kegelsilene, rijke vlinder- en vogelpopulaties (circa 10% van de Nederlandse nachtegalen), en oude landgoedbossen met voorjaarsflora.',
    bron: 'https://www.natura2000.nl/gebieden/noord-holland/kennemerland-zuid'
  },
  'ilperveld-varkensland-oostzanerveld-twiske': {
    ligging: 'Landsmeer/Oostzaan/Waterland/Wormerland/Zaanstad, ten noorden van Amsterdam',
    tekst: 'Grootste afgegraven laagveencomplex ten noorden van Amsterdam (circa 2.553 hectare), met veenweiden, rietmoeras en overgangsvenen met veenmosbegroeiing. Beschermd vanwege de noordse woelmuis, broedende roerdompen, bruine kiekendieven en watersnippen, en heldere kwelsloten met waterranonkel en bittervoorn.',
    bron: 'https://www.natura2000.nl/gebieden/noord-holland/ilperveld-varkensland-oostzanerveld-twiske'
  },
  'polder-westzaan': {
    ligging: 'Zaanstad',
    tekst: 'Brak veenweidegebied (circa 1.057 hectare) met talloze sloten, rietland en overgangsveen. Vormt het belangrijkste leefgebied van de noordse woelmuis in West-Europa, en beschermt daarnaast broedende roerdompen en porseleinhoenen, koekoeksbloemrietland en veenmosrijke vegetatie.',
    bron: 'https://www.natura2000.nl/gebieden/noord-holland/polder-westzaan'
  },
  'wormer-jisperveld-kalverpolder': {
    ligging: 'Wormerland/Zaanstad',
    tekst: 'Open veenweidegebied (circa 1.839 hectare) met graslanden doorsneden door smalle veensloten en brakwaterverlandingen. Zeer belangrijk broedgebied voor weidevogels als kemphaan, en voor moerasvogels als roerdomp en rietzanger; herbergt zeldzame flora zoals de veenorchis en heemst in de veenmosrietlanden.',
    bron: 'https://www.natura2000.nl/gebieden/noord-holland/wormer-en-jisperveld-kalverpolder'
  },
  'polder-zeevang': {
    ligging: 'Edam-Volendam, tussen Purmerend en Oosthuizen',
    tekst: 'Vrijwel boomloos veenweidelandschap (circa 1.813 hectare) met lange, haaks op de ontwatering gerichte kavels en waterplassen in de voormalige Zuiderzeedijk. Beschermd als broedgebied voor grutto\'s (meer dan 50 paar per 100 hectare) en als overwinteringsgebied voor smienten, pijlstaarten en brandganzen.',
    bron: 'https://www.natura2000.nl/gebieden/noord-holland/polder-zeevang'
  },
  'eilandspolder': {
    ligging: 'Alkmaar',
    tekst: 'Ontgonnen hoogveenvlakte (circa 1.397 hectare) tussen twee grote poldersystemen, met een open, vrijwel boomloos veenweidelandschap. Aangewezen voor overwinterende smienten en broedende rietzangers, en beschermt de noordse woelmuis, bittervoorn en kleine modderkruiper.',
    bron: 'https://www.natura2000.nl/gebieden/noord-holland/eilandspolder'
  },
  'noordhollands-duinreservaat': {
    ligging: 'Bergen (NH)/Beverwijk/Castricum/Heemskerk/Velsen, van het Noordzeekanaal tot Bergen',
    tekst: 'Duingebied (circa 5.242 hectare) met een gevarieerde opbouw van kalkrijke jonge duinen, ontkalkte oudere duinen, vochtige duinvalleien en gemengd bos. Bevat een van de soortenrijkste duingraslanden van Nederland, met plantengemeenschappen die elders niet voorkomen, de nauwe korfslak en zeldzame vlinders en broedvogels van open duin.',
    bron: 'https://www.natura2000.nl/gebieden/noord-holland/noordhollands-duinreservaat'
  },
  'schoorlse-duinen': {
    ligging: 'Tussen Bergen en de Hondsbossche Zeewering',
    tekst: 'Duinstrook (circa 1.737 hectare) met de hoogste duinen van Nederland (tot 58 meter), met witte en grijze duinen, heide, dennenbos en zoete duinmeren. Beschermd vanwege de nachtzwaluw - de laatste broedplaats in de Hollandse duinen -, kalkminnende planten als parnassia in de duinvalleien, en de grootste Nederlandse populatie dennenorchis.',
    bron: 'https://www.natura2000.nl/gebieden/noord-holland/schoorlse-duinen'
  },
  'abtskolk-de-putten': {
    ligging: 'Bergen (NH)/Schagen',
    tekst: 'Twee laaggelegen polders (circa 500 hectare) achter de Hondsbossche Zeewering, met brakke sloten en twee wateren (Abtskolk en De Putten) ontstaan door kleiwinning. Aangewezen vanwege de zeer zeldzame dwerggans, met historische tellingen tot 33 exemplaren, en als rust- en foerageergebied voor trekkende watervogels langs de kust.',
    bron: 'https://www.natura2000.nl/gebieden/noord-holland/abtskolk-de-putten'
  },
  'zwanenwater-pettemerduinen': {
    ligging: 'Schagen, ten zuiden van Callantsoog',
    tekst: 'Duingebied (circa 770 hectare) met twee evenwijdige duinreeksen, vochtige duinvalleien en twee grote duinmeren, met zeldzaam elzenbroekbos. Beschermd vanwege broedende lepelaars en aalscholvers, roerdompen en bruine kiekendieven, en soortenrijke heischrale graslanden met orchideeën die elders in de Hollandse duinen grotendeels ontbreken.',
    bron: 'https://www.natura2000.nl/gebieden/noord-holland/zwanenwater-pettemerduinen'
  },
  'duinen-den-helder-callantsoog': {
    ligging: 'Den Helder/Schagen',
    tekst: 'Duingebied (circa 645 hectare) met zeereepduinen, droge duingraslanden en heide met kraaihei, aangevuld met eiken-berkenbos. Herbergt een van de grootste Nederlandse populaties tapuit en twee zeldzame parelmoervlindersoorten, en is als noordelijkste duinstrook van Holland een belangrijke pleisterplaats voor trekvogels.',
    bron: 'https://www.natura2000.nl/gebieden/noord-holland/duinen-den-helder-callantsoog'
  },
  'duinen-en-lage-land-texel': {
    ligging: 'Texel',
    tekst: 'Duingebied met slufter en polders (circa 4.083 hectare) op het eiland Texel, met oude duinen en heide in het noorden, jonge dynamische duinen in het zuiden en laaggelegen polders met rietranden. Beschermd vanwege de grootste Nederlandse populatie parelmoervlinders, de noordse woelmuis, en het soldaatje - een orchidee met hier een van de grootste populaties van Europa.',
    bron: 'https://www.natura2000.nl/gebieden/noord-holland/duinen-en-lage-land-texel'
  },
  'maas-bij-eijsden': {
    ligging: 'Eijsden-Margraten/Maastricht',
    tekst: 'Twee kleine deelgebieden (samen circa 63 hectare) langs de Maasoever bij Eijsden, met bloemrijke graslanden en ooibos in de winterbedding van de rivier. Beschermd vanwege de grote fonteinkruid en het leefgebied dat de rivier hier biedt aan kenmerkende Maasvissen.',
    bron: 'https://www.natura2000.nl/gebieden/limburg/maas-bij-eijsden'
  },
  'vlakte-van-de-raan': {
    ligging: 'Monding van de Westerschelde, Noordzee voor Zeeuws-Vlaanderen',
    tekst: 'Ondiep zandplatengebied (circa 17.521 hectare) in de monding van de Westerschelde, met een hoge productiviteit van bodemdieren. Functioneert als kraamkamer voor vis en als trekroute voor rivierprik, zalm, elft en houting, en is van belang voor overwinterende zee-eenden en rustende zeehonden.',
    bron: 'https://www.natura2000.nl/gebieden/zeeland/vlakte-van-de-raan'
  },
  'voordelta': {
    ligging: 'Noordzee voor Goeree-Overflakkee, Voorne en Schouwen-Duiveland',
    tekst: 'Ondiepe zeebodem (circa 83.534 hectare) gevormd door de buitendelta\'s van Haringvliet, Grevelingen, Oosterschelde en Westerschelde. Kraamkamer voor vis met een hoge bodemdierdichtheid, en belangrijk rustgebied voor zeehonden die uitwijken vanuit de aangrenzende Deltawateren.',
    bron: 'https://www.natura2000.nl/gebieden/zeeland/voordelta'
  },
  'bruine-bank': {
    ligging: 'Westelijke Noordzee, bij de grens met het Verenigd Koninkrijk',
    tekst: 'Noordzeegebied (circa 136.548 hectare) met fossiele onderwaterduinen, ver uit de Nederlandse kust. Belangrijk voor overwinterende zeevogels, paaiende vis en bruinvissen die het gebied als foerageergebied gebruiken.',
    bron: 'https://www.natura2000.nl/gebieden/noordzee/bruine-bank'
  },
  'friese-front': {
    ligging: 'Noordzee, 50 tot 80 kilometer ten noorden van de Waddeneilanden',
    tekst: 'Uitgestrekt Noordzeegebied (circa 288.200 hectare) rond een getijdenfront waar gelaagd en gemengd zeewater elkaar ontmoeten, wat lokaal tot hoge voedselrijkdom leidt. Van internationaal belang voor de zwarte zee-eend, met meer dan 1% van de Europese populatie in het gebied.',
    bron: 'https://www.natura2000.nl/gebieden/noordzee/friese-front'
  },
  'klaverbank': {
    ligging: 'Noordwestelijke Nederlandse Noordzee',
    tekst: 'Grindrug in de Noordzee (circa 153.900 hectare) met een grind- en riffenhabitat dat uniek is voor Nederland. Herbergt 376 diersoorten, waarvan 44% nergens anders in Nederlandse wateren wordt aangetroffen.',
    bron: 'https://www.natura2000.nl/gebieden/noordzee/klaverbank'
  },
  'doggersbank': {
    ligging: 'Noordrand van het Nederlandse continentale plat, Noordzee',
    tekst: 'Uitgestrekte, permanent onder water gelegen zandbank (circa 473.500 hectare) op de noordrand van het Nederlandse deel van de Noordzee. Beschermd vanwege de ondiepe, dynamische zandbankhabitat met een gespecialiseerde bodemfauna die aan deze omstandigheden is aangepast.',
    bron: 'https://www.natura2000.nl/gebieden/noordzee/doggersbank'
  },
  'ijsselmeer': {
    ligging: 'Grens Fryslân/Flevoland/Noord-Holland',
    tekst: 'Ondiep zoetwatermeer (circa 113.341 hectare), ontstaan na de afsluiting van de Zuiderzee, met uitgestrekte rietlanden en moerasvegetatie langs de Friese oever. Van internationaal belang voor viseters als aalscholver, fuut en sterns die op spiering jagen, en beschermt daarnaast de groenknolorchis en de noordse woelmuis.',
    bron: 'https://www.natura2000.nl/gebieden/flevoland/ijsselmeer'
  },
  'rottige-meenthe-brandemeer': {
    ligging: 'Weststellingwerf',
    tekst: 'Verveend moerasgebied (circa 1.369 hectare) in Zuidwest-Fryslân, met petgaten en legakkers uit de vroegere turfwinning. De enige Friese groeiplaats van trilveen, en een van de weinige overgebleven leefgebieden van de grote vuurvlinder; vormt tevens een ecologische verbinding met de veengebieden in Overijssel.',
    bron: 'https://www.natura2000.nl/gebieden/friesland/rottige-meenthe-brandemeer'
  },
  'oudegaasterbrekken-fluessen': {
    ligging: 'Súdwest-Fryslân/De Fryske Marren',
    tekst: 'Aaneenschakeling van meren en moeras (circa 3.054 hectare) in een laagveen- en kleiplandschap, met rietland, dotterbloemhooiland en open water ontstaan door vervening. Bijna 40% van de Noordwest-Europese smientenpopulatie overwintert hier, met daarnaast broedende grutto\'s en kieviten en de noordse woelmuis in de rietvegetatie.',
    bron: 'https://www.natura2000.nl/gebieden/friesland/oudegaasterbrekken-fluessen-en-omgeving'
  },
  'witte-zwarte-brekken': {
    ligging: 'Ten zuiden van Sneek, De Fryske Marren/Súdwest-Fryslân',
    tekst: 'Meren-, grasland- en rietlandgebied (circa 433 hectare) met drie eilanden (Krite, Deeklân, Lange Warren), doorsneden door sloten en zomerpolders. Belangrijk overwinteringsgebied voor ganzen, waaronder grote aantallen kleine rietgans, met broedende kemphanen, grutto\'s en roerdompen, en de bedreigde noordse woelmuis.',
    bron: 'https://www.natura2000.nl/gebieden/friesland/witte-en-zwarte-brekken'
  },
  'sneekermeergebied': {
    ligging: 'De Fryske Marren/Súdwest-Fryslân',
    tekst: 'Complex van grotere en kleinere wateren en graslanden (circa 2.279 hectare) met her en der rietland en wilgenbosjes, ontstaan door vervening en windwerking. Belangrijk broed- en pleistergebied voor grauwe gans, kolgans en steltlopers als kemphaan en grutto, met dotterbloemhooiland en de noordse woelmuis als kenmerkende soorten.',
    bron: 'https://www.natura2000.nl/gebieden/friesland/sneekermeergebied'
  },
  'deelen': {
    ligging: 'Heerenveen',
    tekst: 'Laagveenmoeras (circa 514 hectare), een van de weinige overgebleven restanten van een omvangrijk veencomplex, met petgaten, rietland, struweel en legakkers. Broedplaats van purperreiger, zwarte stern, bruine kiekendief en baardmannetje, en overwinteringsgebied voor tienduizenden grauwe en kolganzen.',
    bron: 'https://www.natura2000.nl/gebieden/friesland/deelen'
  },
  'van-oordts-mersken': {
    ligging: 'Opsterland',
    tekst: 'Beekdallandschap (circa 842 hectare) in de benedenloop van de Boorne, op de overgang van zandgronden naar laagveen. Beschermd vanwege blauwgraslanden en dotterbloemhooilanden met de moerasviool, en als belangrijke ganzenpleisterplaats voor tienduizenden overwinterende ganzen en broedende wulpen en tureluurs.',
    bron: 'https://www.natura2000.nl/gebieden/friesland/van-oordts-mersken'
  },
  'wijnjeterper-schar': {
    ligging: 'Opsterland',
    tekst: 'Reliëfrijk zandlandschap met veenzones langs de Boorne (circa 170 hectare) in Zuidoost-Fryslân. Beschermd vanwege goed ontwikkelde overgangen tussen blauwgrasland, heischraal grasland en vochtige heide, met soorten als blonde zegge en klokjesgentiaan, en broedende houtsnippen en wulpen aan de noordgrens van hun Nederlandse verspreidingsgebied.',
    bron: 'https://www.natura2000.nl/gebieden/friesland/wijnjeterper-schar'
  },
  'alde-feanen': {
    ligging: 'Leeuwarden/Smallingerland/Tytsjerksteradiel',
    tekst: 'Laagveenmoeras (circa 2.124 hectare) tussen Leeuwarden en Drachten, met een netwerk van wateren en vaarten, rietland, moerasbos en zeggegrasland - een van de weinige overgebleven restanten van een omvangrijk veenwinningslandschap. Beschermd vanwege galigaanvegetatie en drijvend veenmos, de zeldzame veenorchis, broedende grote karekieten en baardmannetjes, en de noordse woelmuis.',
    bron: 'https://www.natura2000.nl/gebieden/friesland/alde-feanen'
  },
  'groote-wielen': {
    ligging: 'Ten noordoosten van Leeuwarden, Leeuwarden/Tytsjerksteradiel',
    tekst: 'Meren- en moerasgebied (circa 604 hectare) op de overgang van zandgrond, veen en klei, met rietmoeras, graslanden en twee eendenkooien. Broed- en trekgebied voor grutto, kievit, kemphaan en wulp, met de noordse woelmuis en de meervleermuis als kenmerkende zoogdieren.',
    bron: 'https://www.natura2000.nl/gebieden/friesland/groote-wielen'
  },
  'duinen-vlieland': {
    ligging: 'Vlieland',
    tekst: 'Duingebied met ingedijkte kwelders (circa 1.484 hectare) op het Waddeneiland Vlieland, met kraaihei-heide, grijze duinen en de Kroon\'s Polders als karakteristiek stelsel van ingedijkte valleien. Een van de belangrijkste Nederlandse groeiplaatsen van kraaiheihei, met de groenknolorchis in de vochtige duinvalleien en internationaal belangrijke zeevogelkolonies.',
    bron: 'https://www.natura2000.nl/gebieden/friesland/duinen-vlieland'
  },
  'duinen-terschelling': {
    ligging: 'Terschelling',
    tekst: 'Goed ontwikkeld duinlandschap (circa 4.040 hectare) op het Waddeneiland Terschelling, met droge duingraslanden, heide, vochtige duinvalleien en wilgen- en berkenbos. Beschermd vanwege de groenknolorchis, broedende bruine en blauwe kiekendieven en velduilen, en een grote rijkdom aan mossen en korstmossen in de kalkarme duingraslanden.',
    bron: 'https://www.natura2000.nl/gebieden/friesland/duinen-terschelling'
  },
  'duinen-ameland': {
    ligging: 'Ameland',
    tekst: 'Duingebied (circa 2.055 hectare) dat het hele Waddeneiland Ameland doorkruist, met grijze duinen, heide, duinvalleien en de Oerderplassen als zeldzame duinmeren. Belangrijkste Nederlandse broedgebied voor de duinpieper, met daarnaast broedende blauwe kiekendieven en uitgestrekte rietmoerassen rond de duinmeren.',
    bron: 'https://www.natura2000.nl/gebieden/friesland/duinen-ameland'
  },
  'duinen-schiermonnikoog': {
    ligging: 'Schiermonnikoog',
    tekst: 'Gevarieerd duingebied (circa 833 hectare) op het kleinste bewoonde Waddeneiland, met goed ontwikkelde kalkrijke duinvalleien, de Westerplas als zoetwaterplas en bos. Broedplaats van circa 2.000 paar eidereenden en van kiekendieven, roerdompen en baardmannetjes, met zeldzame orchideeën in de duinvalleien.',
    bron: 'https://www.natura2000.nl/gebieden/friesland/duinen-schiermonnikoog'
  },
  'veluwerandmeren': {
    ligging: 'Grens Flevoland/Gelderland/Overijssel, van Elburg tot Zeewolde',
    tekst: 'Vier ondiepe randmeren (Drontermeer, Veluwemeer, Wolderwijd, Nuldernauw; samen circa 6.166 hectare) tussen de Veluwe en Flevoland, met rietoevers en kunstmatige eilanden. Sinds midden jaren negentig begroeid met kranswieren en fonteinkruid over meer dan de helft van de bodem - een van de grootste groeiplaatsen van Europa - en van internationaal belang voor wintergasten als wilde zwaan, tafeleend en witoogeend.',
    bron: 'https://www.natura2000.nl/gebieden/gelderland/veluwerandmeren'
  },
  'lepelaarplassen': {
    ligging: 'Almere',
    tekst: 'Kwelgevoed plassen- en moerasgebied (circa 356 hectare) bij Almere, ontstaan door zandwinning, met rietvelden, wilgenbos en open water. Beschermd vanwege broedende aalscholvers (jaarlijks meer dan 1.000 nesten) en lepelaars, en vormt een schakel in de natte ecologische as van Fryslân tot Zeeland.',
    bron: 'https://www.natura2000.nl/gebieden/flevoland/lepelaarplassen'
  },
  'oostvaardersplassen': {
    ligging: 'Lelystad',
    tekst: 'Door dijken omsloten zoetwatermoeras (circa 5.477 hectare) bij Lelystad, met uitgestrekte ondiepe waterpartijen, eindeloze rietvelden en begraasde graslanden. Het belangrijkste zoetwatermoeras van Nederland, met broedende lepelaars, roerdompen, baardmannetjes en zeearenden, en een gevestigde beverpopulatie.',
    bron: 'https://www.natura2000.nl/gebieden/flevoland/oostvaardersplassen'
  },
  'markermeer-ijmeer': {
    ligging: 'Grens Flevoland/Noord-Holland',
    tekst: 'Ondiep zoetwatermeer (circa 68.463 hectare) met een slibrijke bodem die door de wind makkelijk troebel wordt, met de Gouwzee en de kust bij Muiden als heldere uitzonderingen. In de Gouwzee ligt met ruim 500 hectare verreweg de grootste kranswiervegetatie van Nederland, van internationaal belang voor viseters als nonnetje en futen en voor kuifeenden en tafeleenden die op kranswier foerageren.',
    bron: 'https://www.natura2000.nl/gebieden/flevoland/markermeer-ijmeer'
  },
  'ketelmeer-vossemeer': {
    ligging: 'Grens Flevoland/Overijssel, tussen Dronten, Kampen en Noordoostpolder',
    tekst: 'Ondiep zoetwatersysteem met kenmerken van zowel meer als rivier (circa 3.843 hectare), met zand- en slikbanken, rietvegetatie en eilanden - het Ketelmeer gemiddeld 2,9 meter diep en slibrijk, het ondiepere en zandigere Vossemeer. Beschermd vanwege moerasbroedvogels als de grote karekiet, tot 15.000 kuifeenden, meer dan 40 vissoorten en een zeldzaam veld van vinelfontkruid.',
    bron: 'https://www.natura2000.nl/gebieden/flevoland/ketelmeer-vossemeer'
  },
  'zwarte-meer': {
    ligging: 'Grens Flevoland/Overijssel, tussen Noordoostpolder en Kampereiland',
    tekst: 'Groot, ondiep randmeer (circa 2.162 hectare) in de voormalige IJsseldelta, met rietmoeras in het zuiden, een kunstmatig vogeleiland en soortenrijke graslanden met wilde kievitsbloem. Broedplaats van purperreigers en grote karekieten, met tienduizenden overwinterende watervogels en herstellende kranswier- en fonteinkruidvegetatie na jaren van eutrofiëring.',
    bron: 'https://www.natura2000.nl/gebieden/overijssel/zwarte-meer'
  }
};
