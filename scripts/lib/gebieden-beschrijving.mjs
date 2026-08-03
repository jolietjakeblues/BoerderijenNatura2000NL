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
  }
};
