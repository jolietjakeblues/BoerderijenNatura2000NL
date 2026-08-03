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
  }
};
