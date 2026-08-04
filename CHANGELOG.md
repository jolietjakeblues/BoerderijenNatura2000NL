# Changelog

Overzicht van afgeronde verbeteringen, meestal naar aanleiding van een externe review.
Voor de huidige staat en openstaande punten: zie [README.md](README.md). Voor de
precieze wijzigingen per gebied: `git log`. Entries staan in omgekeerd-chronologische
volgorde; een latere entry kan dus een eerdere entry corrigeren of vervangen. Waar dat
kan verwarren, is dat expliciet benoemd.

## XSS-hardening compleet gemaakt, en CSV-formule-injectiebescherming

De eerdere `</script>`-injectiefix beschermde alleen het ingebedde JSON-blok; een audit van heel
`scripts/06-build-gebied-html.mjs` vond twee bredere, nog open categorieën:

- **Server-side gerenderde HTML zonder escaping.** Gebiedsnaam (landelijke WFS), richtlijn-label,
  -gebiedsnummer, -sitecodes, en de monumententabel (rijksmonumentnummer, woonplaats) werden
  rechtstreeks in de statische HTML geschreven, zonder HTML-escaping. Een nieuwe `esc()`-functie
  (server-side) is nu toegepast op elk van deze plekken.
- **Client-side `innerHTML`/Leaflet-tooltips en -popups zonder escaping.** `toonDetail()` (het
  monumentdetailpaneel) zette BAG-adresvelden (straat, huisnummer, postcode, woonplaats,
  gebruiksdoel) en de oorspronkelijke functie rechtstreeks in `innerHTML`; de kaartmarker-tooltips
  en de nieuwe gebiedspopup deden hetzelfde (Leaflet rendert tooltip-/popup-content als HTML, niet
  als platte tekst). Een nieuwe `escHtml()`-functie (client-side) is nu toegepast op alle
  BAG/RCE-afkomstige velden op deze plekken. Bijvangst: de gebiedsnaam werd in de tooltip-opbouw
  nog rechtstreeks als Node-side stringsplice ingevoegd (`${Dobj.gebied}` i.p.v. `\${D.gebied}`) -
  dat is nu een veilige runtime-referentie naar de al JSON-geparste waarde, in lijn met hoe alle
  andere velden op die regel al werkten.

Geverifieerd met daadwerkelijke payloads (`<img src=x onerror=...>`, `</script><script>...</script>`,
`<svg onload=...>`) door `toonDetail()`, de tooltip-opbouw en `esc()` zelf gehaald, in een echte
browser: geen van de payloads komt als uitvoerbare tag terug, overal consequent ge-escaped naar
`&lt;`/`&gt;`/etc. Bevestigd op echte data dat `esc()` een gebiedsnaam met een `&`
("Zwin & Kievittepolder") correct naar `&amp;` omzet.

**CSV-formule-injectie (OWASP CSV Injection).** De CSV-export quote'de al velden met komma's,
aanhalingstekens en regeleinden correct, maar beschermde niet tegen spreadsheetformules: een
BAG-adresveld dat toevallig begint met `=`, `+`, `-` of `@` zou door Excel/Sheets/LibreOffice bij
het openen als formule geïnterpreteerd kunnen worden. `csvVeld()` zet nu een voorloop-apostrof voor
een veld dat met een van die tekens (of tab/CR) begint, wat platte-tekstinterpretatie afdwingt
zonder de zichtbare celwaarde te veranderen. Geverifieerd met `=cmd|"/c calc"!A0` en `@SUM(A1:A9)`
als testinvoer.

**Zelfde audit uitgebreid naar `scripts/07-build-landing-html.mjs`** (de landingspagina): dezelfde
`esc()`-functie toegevoegd en toegepast op gebiedsnaam, richtlijn-badge, ligging en provincienaam,
zowel in tekstinhoud als in `data-*`-attributen (`gcard()`, de provincie-sectiekoppen, en de
filter-`<option>`-lijsten). Het client-side zoek-/filter-/sorteerscript in dit bestand gebruikte al
uitsluitend `textContent` en `dataset`-vergelijkingen, nooit `innerHTML` - daar was dus niets te
repareren. Herbouwd en in een browser getest: zoeken op een gebiedsnaam met een `&`
("Drents-Friese Wold & Leggelderveld") werkt en toont correct, geen consolefouten.

## BRONNEN.md toegevoegd

Nieuw overzicht van alle geraadpleegde bronnen: de brondata die de pijplijn programmatisch bevraagt
(RCE CHO-endpoint, RCE Natura 2000-graph, drie PDOK-WFS'en, Rijksmonumentenregister), en de
achtergrond- en verificatiebronnen die zijn gebruikt om Natura 2000 als landelijk stelsel te
begrijpen en losse bevindingen te controleren (natura2000.nl, de RVO-overzichtskaart en -PDF,
Wikipedia, RCE linked data, rwsnatura2000.nl). Vanuit README.md gelinkt.

## README opgesplitst: bouwgeschiedenis naar GEBIEDEN.md

README.md was 430 regels, waarvan 307 (71%) de tien ronde-tabellen met per-gebied cijfers waren -
gedetailleerde bouwgeschiedenis, niet iets dat een lezer moet doornemen om te begrijpen wat het
project is. Alle ronde-tabellen (inclusief de toelichtingen per ronde en de "Resterend"-paragraaf)
zijn ongewijzigd verplaatst naar het nieuwe [GEBIEDEN.md](GEBIEDEN.md). README.md houdt alleen een
korte statusregel met de huidige totalen en een link naar GEBIEDEN.md. "Methode per gebied" (de
methodologie-uitleg) bleef in README.md staan - dat is geen bouwlogboek maar de uitleg die het
project interpreteerbaar maakt. Kruisverwijzingen tussen de twee bestanden (bv. "Bewust niet
gepland", "Methode per gebied") zijn omgezet naar expliciete `README.md#anker`-links.

## `</script>`-injectiebescherming voor de ingebedde JSON

De gebiedspagina's bedden `data.json` rechtstreeks in als tekst binnen een
`<script type="application/json">`-element. HTML-parsing houdt rekening met de letterlijke tekst
`</script>`, ook binnen zo'n element met `type="application/json"` - een gemanipuleerde adres-,
functie- of plaatsnaam met die tekenreeks zou het scriptblok voortijdig kunnen afsluiten en nieuwe
HTML kunnen introduceren (OWASP: [XSS Prevention Cheat
Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)).
De drie HTML-significante tekens worden nu vóór het inbedden vervangen door hun JavaScript
Unicode-escape (kleiner-dan, groter-dan en ampersand elk als `\u00XX`-notatie), zodat een letterlijke
`</script>`-tekenreeks nooit meer in de brontekst van het scriptblok kan voorkomen. `JSON.parse()`
zet dit in de browser weer terug naar de oorspronkelijke tekens, dus de zichtbare data verandert
niet. Dezelfde bescherming ook toegepast op het losse `meta`-JSON-blok (gebiedsnaam + beschrijving
voor de klikbare kaartpopup) - dat viel buiten de oorspronkelijke aangeleverde patch, maar is exact
dezelfde kwetsbaarheidsklasse in hetzelfde bestand.

Geverifieerd met een gerichte test: een synthetische `</script><script>alert(...)</script>`-waarde
door de escape-functie gehaald bevat na escaping geen letterlijke `</script>` meer, en
`JSON.parse()` op het resultaat geeft de oorspronkelijke waarde exact terug. 37 van de 160
gebiedspagina's laten een daadwerkelijke bytewijziging zien (die met een `&` in de gebiedsnaam,
zoals "Zwin & Kievittepolder"); de overige 123 hadden geen enkel HTML-significant teken in hun data
en zijn dus byte-identiek gebleven.

## Correctie-/feedbackknop ("Meld een mogelijke fout")

Elke gebiedspagina heeft nu onderaan een "Meld een mogelijke fout op deze pagina"-link. Gekozen voor
een GitHub issue-form-template (`.github/ISSUE_TEMPLATE/gebied-fout.yml`) in plaats van een mailto-
link: velden voor gebied, paginalink, rijksmonumentnummer (optioneel) en een verplichte
probleembeschrijving, plus een korte toelichting bovenaan dat een aantal dingen die op het eerste
gezicht een fout lijken (BAG niet te controleren, geen industriefunctie-indicatie) bewuste, elders
toegelichte keuzes zijn - om te voorkomen dat elke melding in werkelijkheid een uitleg-vraag is.

De link zelf wordt per gebied gebouwd met `URLSearchParams` en bevat `template=gebied-fout.yml` plus
`gebied=<naam>&pagina=<paginaURL>` als query-parameters; GitHub's issue-forms vullen automatisch elk
formulierveld waarvan de `id` overeenkomt met een query-parameternaam, dus een melder hoeft niet zelf
te typen om welk gebied of welke pagina het gaat. YAML-syntax geverifieerd met `js-yaml` (parseert
naar de verwachte structuur); prefill zelf kon niet visueel bevestigd worden zonder in te loggen op
GitHub (geen toegang tot dat account), maar de queryparameternamen zijn expliciet gecontroleerd tegen
de `id`-velden in het template.

## Klikbare popup voor het Natura 2000-gebied zelf

Het groene Natura 2000-gebiedsvlak op de kaart is nu ook klikbaar (was `interactive: false`): een
klik toont de gebiedsnaam, de bestaande zelfgeschreven beschrijving (`gebieden-beschrijving.mjs`,
dezelfde tekst als in de pagina-header) en een link naar de natura2000.nl-bron, met een
hover-tooltip ("Klik voor gebiedsbeschrijving") als ontdekhint. Werkt ook bij de 0-monumenten-
gebieden (De Bruuk, Groote Peel e.d.), waar de polygoon het enige interactieve kaartelement is.

Technisch: de beschrijvingstekst wordt als los `<script id="meta" type="application/json">`-blok in
de pagina meegegeven (naast het bestaande `data`-blok), zodat de client-side popup-inhoud via
`JSON.parse` binnenkomt in plaats van rechtstreeks in een JS-template-literal - dat voorkomt
escape-gedoe met backticks/`${...}` mocht een beschrijving die ooit bevatten.

Gecontroleerd dat monumentmarkers en de gebiedspolygoon elkaars klikken niet verstoren: markers
worden ná de polygoon aan de kaart toegevoegd en staan daardoor later in de SVG-DOM (bevestigd via
directe inspectie), dus ze vangen kliks als eerste af. Getest in een echte browser op zowel een
gebied met monumenten (Dwingelderveld) als een 0-monumenten-gebied (De Bruuk): popup-inhoud correct,
monumentdetail-paneel blijft onafhankelijk werken, geen consolefouten.

## Subresource Integrity (SRI) voor de Leaflet-CDN-referenties

Elke gebiedspagina laadt Leaflet 1.9.4 (CSS + JS) van unpkg.com. `integrity`- en
`crossorigin`-attributen toegevoegd op beide `<link>`/`<script>`-tags in
`scripts/06-build-gebied-html.mjs`, zodat de browser de bestanden weigert als de CDN ooit andere
inhoud levert dan verwacht (verminkte CDN, gecompromitteerde registry, MITM). De aangeleverde
sha256-hashes zijn zelf geverifieerd door de daadwerkelijke bestanden van unpkg.com op te halen en
lokaal opnieuw te hashen, vóórdat ze zijn overgenomen - ze kwamen overeen. Alle 160 gebiedspagina's
herbouwd; per pagina verandert alleen de Leaflet-CDN-referentie (bevestigd via `git diff --stat`: 8
toevoegingen, 2 verwijderingen per bestand, verder niets). Gecontroleerd in een echte browser
(`.claude/launch.json`, Python `http.server`): Leaflet laadt en initialiseert (`L.version` =
"1.9.4"), de kaarttegels renderen, geen SRI- of CORS-fouten in de console.

## CSV-downloadknop per gebiedspagina

Elke gebiedspagina heeft nu een "CSV downloaden"-knop naast de bestaande filterknoppen (naast
"Alle N" / "Alleen BAG-industriefunctie-indicatie"), voor gebieden met minstens 1 monument. Volledig
client-side (`Blob` + tijdelijke `<a download>`, geen server nodig, past bij de statische
GitHub Pages-opzet): exporteert de complete monumentenlijst (rijksmonumentnummer, adres, provincie,
afstand in meters, oorspronkelijke functie, status) naar `<slug>-boerderijen.csv`, met UTF-8 BOM
voor correcte weergave van diakrieten in Excel. Genereert altijd de volledige lijst, ongeacht de
actieve kaartfilter.

Bijvangst: bij het testen bleek er geen lokale server-configuratie (`.claude/launch.json`) te
bestaan om deze statische site in de browser te verifiëren; toegevoegd (Python `http.server`) zodat
toekomstige UI-wijzigingen ook daadwerkelijk in een browser getest kunnen worden in plaats van
alleen via de generatiescripts.

## Veluwe toegevoegd; Waddenzee en Noordzeekustzone bewust definitief buiten scope

159 naar 160 verwerkte gebieden: Veluwe (tiende ronde), het laatste van de drie bewust uitgestelde
grote gebieden. Nieuwe totalen: 7255 boerderijen, 1225 met BAG-industriefunctie-indicatie, 77 niet
te controleren (was 7031/1188/67). Zie README.md voor het gebied.

**Onderzoek vooraf** naar de drie resterende grote gebieden (Veluwe, Waddenzee, Noordzeekustzone):
een verkennende COUNT-query tegen het RCE-endpoint (kandidaten binnen de bbox+0,15°-marge, vóór
precieze 5&nbsp;km-classificatie) gaf circa 1.189 (Veluwe), 1.317 (Waddenzee) en 1.919
(Noordzeekustzone) kandidaten. Een bbox-overlaptoets tegen alle 159 op dat moment gebouwde gebieden
liet zien dat Veluwe slechts met een handvol directe buurgebieden overlapt, tegenover 29
(Waddenzee) en 42 (Noordzeekustzone) - vrijwel elk duingebied van Texel tot Zeeland dat in eerdere
rondes al apart gebouwd is. Op basis daarvan is besloten: Veluwe bouwen, Waddenzee en
Noordzeekustzone bewust definitief buiten scope houden (verplaatst van "nog te doen" naar "bewust
niet gepland" in README.md) - de overlap met al gepubliceerde, specifiekere gebiedspagina's zou te
groot zijn voor de extra paginaomvang die het zou kosten.

**Veluwe zelf viel uiteindelijk fors kleiner uit dan de kandidatentelling deed vermoeden**: de
polygoon in de landelijke WFS bleek extreem gefragmenteerd (1.901 losse ringen, vermoedelijk
uitgesneden dorpskernen en erven middenin het bos), en na de precieze "erin of
≤5&nbsp;km"-classificatie bleven er 224 boerderijen over. Voor de zekerheid vooraf een
performancetest gedraaid (1.200 puntclassificaties tegen die 1.901 ringen: 616&nbsp;ms) - geen
technisch probleem gebleken.

**Bijvangst**: bij het navragen van deze bevindingen bleek er een tweede, apart RCE
SPARQL-endpoint te bestaan (`https://api.linkeddata.cultureelerfgoed.nl/datasets/rce/natura2000/sparql`,
~10.466 triples, bevat Natura2000-gebiedsnamen) dat de pijplijn nooit heeft gebruikt - de huidige
richtlijndata komt via een `GRAPH`-filter op het veel grotere `cho`-endpoint. Nog niet onderzocht of
overstappen zin heeft; apart genoteerd voor een latere sessie.

## Uitbreiding naar Drenthe en Groningen (11 nieuwe gebieden)

148 naar 159 verwerkte gebieden: heel Drenthe (op de vier gebieden uit de eerste, validatie-ronde
na) en de twee resterende Groningse gebieden, zuid naar noord (negende ronde). Nieuwe totalen: 7031
boerderijen, 1188 met BAG-industriefunctie-indicatie, 67 niet te controleren (was 6619/1130/64).
Zie README.md voor de volledige lijst per gebied.

Met deze ronde zijn alle "gewone" (niet bewust om hun omvang uitgestelde) Natura 2000-gebieden
verwerkt. Resteren nog drie: Veluwe, Waddenzee en Noordzeekustzone.

## Uitbreiding naar Overijssel, correctie van Rijntakken, en Arkemheen (21 nieuwe + 1 gecorrigeerd gebied)

127 naar 148 verwerkte gebieden: heel Overijssel, zuid naar noord (achtste ronde), plus Arkemheen
(Gelderland) en een correctie van Rijntakken. Nieuwe totalen: 6619 boerderijen, 1130 met
BAG-industriefunctie-indicatie, 64 niet te controleren (was 5632/989/60). Zie README.md voor de
volledige lijst per gebied.

**Rijntakken-correctie**: bij het scopen van deze ronde is voor het eerst systematisch
gecontroleerd of elk `data.json`-bestand zijn `gebied`-veld exact overeenkomt met een naam in de
landelijke WFS (`naamN2K`). Van de 127 op dat moment verwerkte gebieden bleek alleen `rijntakken`
niet exact te matchen: het was opgeslagen als "Rijntakken – IJssel-traject", terwijl de WFS één
polygoon "Rijntakken" aanhoudt die veel groter is (circa 23.047 hectare langs IJssel, Nederrijn,
Waal én Lek, in plaats van alleen het IJssel-traject rond Zutphen–Deventer–Zwolle). Rijntakken is
volledig opnieuw gebouwd op de juiste naam (zelfde slug/URL): van 241 naar 567 boerderijen, van 3
naar 4 provincies (Gelderland, Utrecht, Overijssel, en nu ook Noord-Brabant).

**Correctie op een eerdere correctie**: de Flevoland-ronde-entry hieronder claimde dat De Wieden al
eerder verwerkt was. Dat klopte niet - De Wieden was nog nooit gebouwd, en is nu alsnog toegevoegd
als onderdeel van de Overijssel-ronde (56 boerderijen, verspreid over Drenthe, Overijssel en
Flevoland).

Eigen fout gemaakt en gecorrigeerd tijdens deze ronde (derde keer dat dit patroon optreedt, na
Alde Feanen/Wijnjeterper Schar in de Friesland-ronde): de eerste versie van de beschrijvingen voor
Wierdense Veld en Witte Veen was geschreven zonder ze op natura2000.nl te hebben opgezocht. Beide
alsnog opgezocht en herschreven vóór het bouwen van de HTML-pagina's.

## Correctie: de CRLF/manifest-fix uit de Flevoland-ronde loste het probleem niet echt op

De vorige entry hieronder claimde dat het opnieuw genereren van alle manifesten de
CRLF/SHA-256-mismatch had opgelost. Dat klopte niet: de `flevoland`-branch faalde alsnog op
CI (`Valideer data.json-bestanden`) met exact dezelfde 97 fouten, ondanks dat
`node scripts/validate.mjs` lokaal groen was.

**Werkelijke oorzaak**: dit project had geen `.gitattributes`, en op deze Windows-omgeving staat
`core.autocrlf=true` globaal ingesteld. Git converteert daardoor tekstbestanden bij het uitchecken
stilzwijgend naar CRLF in de working tree, maar normaliseert ze bij het committen terug naar LF
voor opslag. `scripts/09-bouw-manifest.mjs` berekent SHA-256 over de working-tree-bytes (dus CRLF
op Windows) - dat is een andere hash dan die van de daadwerkelijk gecommitte (LF-)inhoud die CI
(Ubuntu, geen autocrlf) uitcheckt en opnieuw hasht. Geverifieerd door drie hashes naast elkaar te
leggen voor hetzelfde bestand: de working-tree-hash, de in `manifest.json` vastgelegde hash (gelijk
aan working-tree) en `git cat-file -p HEAD:<pad> | sha256sum` (de daadwerkelijk gecommitte hash) -
de laatste weekt af van de eerste twee.

**Fix**: `.gitattributes` toegevoegd (`* text=auto eol=lf`) zodat git voortaan altijd LF gebruikt in
de working tree, ongeacht lokale `core.autocrlf`-instellingen. Vervolgens de hele working tree
geforceerd opnieuw laten uitchecken (`git ls-files -z | xargs -0 rm -f && git checkout HEAD -- .`) -
een gewone `git checkout HEAD -- .` bleek bestanden die git als "ongewijzigd" beschouwt stil over
te slaan, ook met `--force`; alleen verwijderen-en-dan-uitchecken forceerde de daadwerkelijke
herschrijving naar LF. Daarna alle manifesten opnieuw gegenereerd tegen de nu correcte
LF-inhoud, en lokaal alle vier CI-stappen nagebootst (bbox-regex-zelftest, unittests,
`validate.mjs`, en de hele gebiedenset herbouwen + `git diff --quiet` op `gebieden/` en
`index.html`) om zeker te zijn dat de volgende push wél door CI komt.

## Uitbreiding naar Flevoland (6 nieuwe gebieden)

121 naar 127 verwerkte gebieden: heel Flevoland, zuid naar noord (zevende ronde) - de resterende 6
gebieden die niet al via een andere provincie waren meegenomen (IJsselmeer en Eemmeer & Gooimeer
Zuidoever liepen al eerder mee). **Correctie (achtste ronde):** hier stond eerder ook "De Wieden"
genoemd als al gedaan - dat klopte niet, De Wieden was nog nooit gebouwd en is alsnog toegevoegd in
de Overijssel-ronde. Nieuwe totalen: 5632 boerderijen, 989 met
BAG-industriefunctie-indicatie, 60 niet te controleren (was 5442/951/55). Zie README.md voor de
volledige lijst per gebied. Lepelaarplassen en Oostvaardersplassen leverden 0 boerderijen op binnen
de 5&nbsp;km-grens, verklaarbaar door de jonge inpoldering rond Almere en Lelystad.

Tweede ronde met een eigen git-branch per provincie (`flevoland`, na `friesland`). Tijdens het
opzetten bleek de lokale `main` zeven commits achter te lopen op `origin/main` (de `friesland`-PR
en een dependabot-config-PR waren op GitHub gemerged, maar nog niet lokaal opgehaald) - de
`flevoland`-branch was per ongeluk vanaf de verouderde lokale `main` aangemaakt. Hersteld door de
al gebouwde, nog niet gecommitte voortgang (Veluwerandmeren) te stashen, lokale `main`
fast-forward te brengen naar `origin/main`, `flevoland` daarna op de bijgewerkte `main` te zetten,
en de stash terug te zetten.

`validate.mjs`'s manifest-sha256-verscheheidscontrole (toegevoegd tijdens de `friesland`-ronde)
sloeg tijdens deze branch-correctie 97 keer aan: de git-operaties (`stash`/`checkout`/`reset
--hard`) schreven bestaande brontekstbestanden stilzwijgend van LF naar CRLF terug
(`core.autocrlf` op Windows), wat de eerder vastgelegde SHA-256-hashes in alle manifest.json's
ongeldig maakte zonder dat de inhoud inhoudelijk was veranderd. Opgelost door alle manifesten
opnieuw te genereren (`scripts/09-bouw-manifest.mjs` per gebied) - geen actie nodig in de
pijplijnscripts zelf, want de check deed precies waarvoor hij bedoeld was.

## Uitbreiding naar Fryslân (14 nieuwe gebieden)

107 naar 121 verwerkte gebieden: heel Fryslân, zuid naar noord (zesde ronde), op Waddenzee en
Noordzeekustzone na - beide bewust overgeslagen wegens omvang (bbox-schaal vergelijkbaar met de
al eerder om die reden uitgestelde Veluwe). Nieuwe totalen: 5442 boerderijen, 951 met
BAG-industriefunctie-indicatie, 55 niet te controleren (was 5205/905/55). Zie README.md voor de
volledige lijst per gebied.

Eerste ronde waarin gewerkt is met een eigen git-branch per provincie (`friesland`) in plaats van
rechtstreeks op `main` - een bewuste workflowwijziging van de gebruiker, geen technische noodzaak.

Drie gebieden die wél op de natura2000.nl-provinciepagina van Fryslân staan (Drents-Friese Wold &
Leggelderveld, Fochteloërveen, Lauwersmeer) classificeren via de bestaande point-in-polygon-
provincietoets als Drenthe of Groningen, en zijn daarom bewust **niet** in deze ronde meegenomen -
consistent met de methode dat provincie een afgeleide, geen aangenomen eigenschap is. Ze blijven
staan voor een latere Drenthe/Groningen-ronde.

Eigen fout gemaakt en gecorrigeerd tijdens deze ronde: de eerste versie van de beschrijvingen voor
Alde Feanen en Wijnjeterper Schar was geschreven zonder ze daadwerkelijk op natura2000.nl te hebben
opgezocht (een kopieerfout tussen twee onderzoeksbatches). Beide alsnog opgezocht en de
beschrijvingen herschreven op basis van de echte brontekst, vóór het bouwen van de HTML-pagina's.

## Uitbreiding naar Noord-Holland, de Noordzee-EEZ, en een gemist Limburgs gebied (22 nieuwe gebieden)

85 naar 107 verwerkte gebieden: heel Noord-Holland, zuid naar noord (vijfde ronde), plus alle 4
mariene Natura 2000-gebieden in de Nederlandse Exclusieve Economische Zone (Bruine Bank, Friese
Front, Klaverbank, Doggersbank) en Maas bij Eijsden. Nieuwe totalen: 5205 boerderijen, 905 met
BAG-industriefunctie-indicatie, 55 niet te controleren (was 4483/753/46). Zie README.md voor de
volledige lijst per gebied.

Twee bevindingen tijdens het scopen van deze ronde:
- **Maas bij Eijsden** leverde geen treffer op bij de gebruikelijke point-in-polygon-provincietoets
  - een klein, langgerekt gebied direct langs de Maasoever, kennelijk precies op een rand van de
  provinciepolygoon. Op het oog leek dit een mariene/EEZ-kandidaat, maar bleek bij nader onderzoek
  een gewoon Limburgs landgebied (78 boerderijen binnen 5&nbsp;km) dat in eerdere rondes gemist was.
- Van de 6 overige "geen provincietreffer"-kandidaten bleken **Vlakte van de Raan** en **Voordelta**
  (beide dicht bij de kust) wél boerderijen binnen 5&nbsp;km te hebben (resp. 8 en 47), tegenover 0
  bij de vier écht ver op zee gelegen EEZ-gebieden (Bruine Bank, Friese Front, Klaverbank,
  Doggersbank) - logisch, en netjes afgehandeld door hetzelfde 0-monumenten-pad als De Bruuk en
  Groote Peel eerder al gebruikten.

`validate.mjs`'s WGS84-Nederland-bbox-controle (bedoeld om verwisselde lon/lat te vangen) bleek te
strak voor Doggersbank, dat tot circa 55,7 graden noorderbreedte reikt - net buiten het oude bereik
van 50-55. Nieuwe, ruimere `WGS84_NL_EEZ`-controle toegevoegd specifiek voor gebieds-bbox's, terwijl
de striktere controle voor individuele monumenten (die altijd landgebonden zijn) ongewijzigd bleef.
Gebouwd met `scripts/bouw-gebied-compleet.mjs`.

## Uitbreiding naar Utrecht en Zuid-Holland (19 nieuwe gebieden)

66 naar 85 verwerkte gebieden: heel Utrecht en heel Zuid-Holland, zuid naar noord (vierde ronde).
Nieuwe totalen: 4483 boerderijen, 753 met BAG-industriefunctie-indicatie, 46 niet te controleren
(was 3684/570/43). Zie README.md voor de volledige lijst per gebied. Net als de vorige ronde
volledig gebouwd met `scripts/bouw-gebied-compleet.mjs`. Meerdere gebieden in dit deel van het land
liggen over drie of vier provincies verspreid (bv. Lingegebied & Diefdijk-Zuid: Gelderland, Utrecht,
Zuid-Holland én Noord-Brabant) - de bestaande provincie-als-weergavelaag-aanpak had daar geen
aanpassing voor nodig.

## Uitbreiding naar Noord-Brabant (13 nieuwe gebieden)

53 naar 66 verwerkte gebieden: heel Noord-Brabant, zuid naar noord (derde ronde na
Gelderland/validatieprovincies en Limburg/Zeeland). Nieuwe totalen: 3684 boerderijen,
570 met BAG-industriefunctie-indicatie, 43 niet te controleren (was 3147/512/38). Zie
README.md voor de volledige lijst per gebied. Gebouwd met
`scripts/bouw-gebied-compleet.mjs`, dezelfde volledig geautomatiseerde pijplijn als de
vorige ronde. Groote Peel leverde 0 monumenten op binnen de 5&nbsp;km-grens (zelfde
precedent als De Bruuk).

## Unittests voor geo.mjs, en het herkomst-manifest 15x sneller

Naar aanleiding van een eigen kritische zelfreflectie ("wat mis je aan wat je
gebouwd hebt"): `scripts/lib/geo.mjs` (point-in-polygon, afstand-tot-rand -
de geometrische kern die bepaalt of een monument bij een gebied hoort) had
geen unittests, in tegenstelling tot `adres-match.mjs`. 17 tests toegevoegd
(`geo.test.mjs`), inclusief een concave ring, gaten in een polygon, en de
clamp op een segmenteinde bij de afstandsberekening - geverifieerd met een
mutatietest (clamp weghalen laat de test falen).

**Herkomst-manifest was te traag om te blijven schalen.**
`scripts/09-bouw-manifest.mjs` deed één `git log --follow`-aanroep per
artefact (11 per gebied): ~1,8s per gebied, ~7 minuten voor alle 53 gebieden
samen. Nu één `git log`-aanroep per gebied die de hele geschiedenis van die
gebiedsmap in één keer doorloopt: ~0,4s per gebied, ~28s voor alle 53 samen
(15x sneller in totaal). Geverifieerd dat de uitkomst exact hetzelfde is als
voorheen (getest op een gebied met bestanden uit meerdere, verspreide
commits). Zie `scripts/README.md` voor de bewuste vereenvoudiging (geen
`--follow` meer nodig, want deze artefacten worden nooit hernoemd).

## Redactionele afronding van de 28 nieuwe gebieden, en een dubbele sitecode-weergave

Reviewer-vondst: Geuldal en Oosterschelde (en alle andere 26 nieuwe gebieden) toonden
nog de bouw-placeholder "(nog geen beschrijving toegevoegd aan
scripts/lib/gebieden-beschrijving.mjs)" in plaats van een echte gebiedsbeschrijving,
met de bronlink dus ook nog naar de algemene natura2000.nl-gebiedenlijst in plaats van
de eigen gebiedspagina. Technisch waren de pagina's af, redactioneel niet. Voor alle 28
gebieden is nu een eigen, zelfgeschreven samenvatting (type natuurgebied, ligging,
oppervlakte, beschermingsreden) en een directe natura2000.nl-link toegevoegd, op
dezelfde manier als de eerste 25 gebieden.

`scripts/validate.mjs` controleert voortaan of elk gebied een niet-placeholder
beschrijving heeft, en of de bronlink naar een specifieke gebiedspagina wijst
(`.../gebieden/<provincie>/<gebied>`) in plaats van naar de generieke lijst -- zodat een
volgende batch nieuwe gebieden niet opnieuw technisch groen maar redactioneel
onvolledig gepubliceerd kan worden.

**Bijvangst: dubbele sitecode-weergave.** Oosterschelde (en 5 andere gebieden) toonden
"sitecode NL3009016 / NL3009016" -- het Vogel- en Habitatrichtlijndeel delen daar
dezelfde EU-sitecode, en de weergavelogica dedupliceerde niet. Gelijke VR-/HR-codes
worden nu één keer getoond; bij afwijkende codes staat het nu expliciet als
"VR-sitecode ... · HR-sitecode ...".

**Bijvangst: een batch-rebuildbug door `ls`'s trailing slash.** Bij het herbouwen van
alle 53 gebiedspagina's bleek `for slug in $(ls data/gebieden); do ...` in deze
omgeving een `slug` met een trailende `/` op te leveren (deze `ls` classificeert
directories met een `/`-achtervoegsel), waardoor scripts stilzwijgend naar
`gebieden/<slug>/.html` schreven in plaats van naar `gebieden/<slug>.html` -- een
nieuwe, foutieve submap per gebied, terwijl het echte bestand ongemoeid bleef. Alle 53
foutieve submappen zijn verwijderd. Zie `scripts/README.md`, "Bekende valkuilen": voortaan
altijd itereren via `for dir in data/gebieden/*/; do slug=$(basename "$dir"); ...`,
nooit via `$(ls ...)`.

## Uitbreiding naar Limburg en Zeeland (28 nieuwe gebieden), en een grote pijplijnvereenvoudiging

25 naar 53 verwerkte gebieden: heel Limburg en heel Zeeland, zuid naar noord. Nieuwe
totalen: 3147 boerderijen, 512 met BAG-industriefunctie-indicatie, 38 niet te
controleren (was 1130/179/12). Zie README.md voor de volledige lijst per gebied.

**Bijvangst: het RCE CHO SPARQL-endpoint bleek direct bevraagbaar.**
`scripts/README.md` documenteerde tot dan toe dat er "geen publiek, sleutelloos
SPARQL-endpoint gevonden" was voor RCE CHO, en dat drie stappen daarom de rce-cho
MCP-tool nodig hadden. Bij het opzetten van deze batch bleek
`https://api.linkeddata.cultureelerfgoed.nl/datasets/rce/cho/sparql` gewoon te
reageren op een POST met `Content-Type: application/sparql-query`, zonder API-key.
Valkuil onderweg: backslashes in een regex-filter (de bbox-filter) moeten in de
querytekst verdubbeld worden om als geldige SPARQL-stringliteral-escape te parseren
(`\(` is geen geldig SPARQL ECHAR, `\\(` wel). Vastgelegd in het nieuwe
`scripts/lib/rce-direct.mjs`. Alle drie voormalig handmatige stappen (monumenten-,
functie/adres- en richtlijn-query) draaien hierdoor nu volledig automatisch, gebundeld
in het nieuwe `scripts/bouw-gebied-compleet.mjs` (één commando van Natura2000-naam tot
gepubliceerde HTML). De eerste 25 gebieden zijn destijds nog wel via de MCP-tool
gebouwd, wat inhoudelijk gelijkwaardig is; alleen de ophaalmethode verschilt.

## Detailpaneel toonde soms "geen BAG-match" terwijl er wel een match was

Gevonden via een externe review (rmnr 37890, Geleenbeekdal): het detailpaneel op de
gebiedspagina koppelde een RCE-adres aan zijn BAG-gebruiksdoel door onder andere de
straatnaam te vergelijken, hoofdlettergevoelig ("Op Gen Hek" vs. "Op gen Hek"). De
BAG-koppeling zelf (`lib/bag.mjs`) matcht nooit op straatnaam, alleen op postcode +
huisnummer + huisletter; het detailpaneel deed dus een eigen, striktere en foutieve
tweede vergelijking naast de al correcte eerste. Gecontroleerd over alle 25 gebieden:
44 van de 1514 adressen (circa 3%) hadden hierdoor een gemiste match, niet alleen door
hoofdletterverschillen maar ook door afwijkende schrijfwijzen ("Burg H vd Boschstraat"
vs. "Burgemeester van den Boschstraat").

Opgelost door de koppeling niet langer in de browser te herhalen: `scripts/lib/adres-match.mjs`
(nieuw, met unittests via `node --test`) berekent per adres het gebruiksdoel nu één
keer tijdens het bouwen van `data.json` (`scripts/05-build-gebied-data.mjs`), zonder
straatnaam als vergelijkingssleutel. Het detailpaneel leest dit veld nu alleen nog
uit. `scripts/validate.mjs` controleert voortaan dat dit veld overeenkomt met wat de
matchfunctie zelf zou opleveren, zodat build- en weergavelogica niet opnieuw uit elkaar
kunnen lopen.

## Echte kaartondergrond (Leaflet + CARTO/OpenStreetMap)

Reviewer-vraag: "ik zou willen doorklikken naar een gewone ondergrond om een idee te
krijgen van de werkelijke ligging". De kaart toonde alleen abstracte punten en een
polygoon, zonder wegen, plaatsnamen of andere geografische context. `scripts/06-build-gebied-html.mjs`
gebruikt nu Leaflet + CARTO `light_all`-tiles (hetzelfde patroon als
[aardbevingen-en-rijksmonumenten](https://jolietjakeblues.github.io/aardbevingen-en-rijksmonumenten/)
en [footprint_percelen](https://jolietjakeblues.github.io/footprint_percelen/)) in plaats van de
eigen canvas-tekening. Behouden: dezelfde kleur-/randcodering per status, klik-op-punt-detailpaneel,
filterchips en de toetsenbord-toegankelijke lijst. Geprototypeerd en gestresstest op Geleenbeekdal
(296 punten) voor akkoord, daarna doorgetrokken naar alle 25 gebieden.

**Let op:** dit vervangt de canvas-kaart uit de "Toegankelijkheid buiten de kaart"-entry
verderop in dit document; verwijzingen naar "de canvas-kaart" daar zijn dus historisch,
niet de huidige situatie.

Bewuste afweging: de gebiedspagina's waren tot nu toe volledig zelfstandige, offline-werkende
bestanden. Met een CARTO/OpenStreetMap-ondergrond laden ze voortaan tegels van een externe
tileserver bij elk bezoek.

## Kwaliteitscontrole, herkomst en licenties

- **Pijplijn controleerde niet of een monument nog wél een rijksmonument is.**
  Opgelost. Gevonden tijdens de handmatige steekproefcontrole: RCE's eigen
  `heeftJuridischeStatus`-veld kent naast `rijksmonument` ook `geen rijksmonument`
  (bv. na sloop), en dit werd nergens gecontroleerd. Bij de op dat moment 25
  gepubliceerde gebieden bleken 42 van de 1026 unieke monumenten (~4%) deze
  afgevoerde status te hebben. `scripts/02-prepare-gebied.mjs` sluit deze status nu
  uit bij de bron; de 42 al-gepubliceerde gevallen zijn verwijderd uit de 8
  betrokken gebieden.
- **Steekproefsgewijze validatie.** Opgelost. Een steekproef van 95 monumenten is
  structureel gecontroleerd en een deelsteekproef van 38 daarvan handmatig
  geverifieerd tegen het officiële Rijksmonumentenregister. Geaggregeerde
  resultaten en fouttypen: zie [KWALITEITSCONTROLE.md](KWALITEITSCONTROLE.md).
  Bijvangst: een traceerbaarheidsbug in `scripts/lib/bag.mjs` (ontbrekende
  huisletter in opgeslagen BAG-matchresultaten) gevonden en gerepareerd.
- **Herkomst-manifest per gebied ontbrak.** Opgelost. `scripts/09-bouw-manifest.mjs`
  legt per tussenliggend artefact (SPARQL-query, queryresultaat, afgeleid bestand)
  de bron/endpoint, of het een handmatige stap was, een SHA-256 en het git-commit
  van eerste toevoeging vast in `data/gebieden/<slug>/manifest.json`; `validate.mjs`
  faalt als een manifest achterhaald is geraakt. Zie `scripts/README.md` voor de
  expliciete grenzen (geen retroactief queryttijdstip of retry-historie). Daarnaast
  bereidt `scripts/10-bouw-release-kandidaat.mjs` een dataset-release-overzicht
  voor (`release-kandidaat.json`, niet zelf getagd of gepubliceerd).
- **Geen licentie aanwezig.** Opgelost. Broncode: MIT ([LICENSE](LICENSE)).
  Gepubliceerde datasets: CC BY 4.0 ([DATA_LICENSE.md](DATA_LICENSE.md)), met een
  per-bron overzicht van herkomst en voorwaarden (RCE, PDOK/RVO, BAG/Kadaster).
- **Verdiepte datavalidatie.** Opgelost. `scripts/validate.mjs` controleert nu
  per veld type/bereik, telt elke statuscategorie exact (niet alleen de som),
  detecteert ontbrekende én verweesde databestanden in beide richtingen, en
  controleert de herkomst-manifesten. `.github/workflows/validate.yml` draait dit
  bij elke push/PR, samen met een volledige HTML-herbouw-diff.

## Terminologie en toegankelijkheid

- **De term "actieve bedrijfsindicatie" was kwetsbaar.** Opgelost. Overal
  hernoemd naar **BAG-industriefunctie-indicatie**, en de onzekerheidsstatus per
  monument hernoemd naar `industrie_aangetroffen` / `industrie_deels_aangetroffen`
  / `geen_industrie_aangetroffen` in plaats van `actief`/`niet_actief`. Vooral
  dat laatste suggereerde een bevestiging die de BAG niet levert. De BAG bevestigt
  een gebruiksdoel van een verblijfsobject, geen actieve of inactieve
  bedrijfsvoering. Dit vervangt ook de labels "eenduidig actief / actief maar
  onzeker / bevestigd niet-actief" uit de oorspronkelijke aankondiging van het
  datakwaliteitsdashboard verderop in dit document; die labels zijn de
  toenmalige, inmiddels vervangen terminologie.
- **Inconsistentie "stikstofgevoelig" vs. volledige PDOK-laag.** Gecorrigeerd. De
  landingspagina claimde "stikstofgevoelige Natura 2000-gebieden" terwijl de
  methode expliciet zegt dat de volledige PDOK-laag zonder die filter wordt
  gebruikt. Tekst aangepast.
- **"5 km" werd als ecologische invloedssfeer gepresenteerd.** Gecorrigeerd. Vijf
  kilometer is een gekozen selectievenster, geen vastgestelde ecologische
  invloedssfeer; de tekst benoemt dit nu expliciet.
- **Toegankelijkheid buiten de kaart.** Gedeeltelijk opgelost (destijds; zie de
  Leaflet-migratie hierboven voor de huidige kaartimplementatie). Elke
  gebiedspagina kreeg een uitklapbare, toetsenbord- en schermlezer-toegankelijke
  lijst (rm-nr, plaats, afstand, status) als alternatief voor de toenmalige
  canvas-kaart. Nog open: kleurenblind-vriendelijke symbolen op de kaart zelf, en
  de kaartpunten focusbaar/toetsenbordbedienbaar maken (zie README, "Nog te doen").
- **Stikstofgevoelig-markering ontbrak.** Opgelost. De richtlijn-status haalt
  deze vlag nu per gebied op uit de RCE natura2000-graph en toont 'm; de opzet
  filtert er nog steeds niet op (gebruikt de volledige landelijke PDOK-laag),
  maar de vlag zelf staat nu zichtbaar op elke gebiedspagina.

## Onzekerheidsstatus, detailweergave en datakwaliteitsdashboard

Reviewer-aangemerkte topprioriteiten uit een externe review, alle drie opgelost. **Let
op:** de labels in punt 3 hieronder zijn de labels waarmee het dashboard oorspronkelijk
werd aangekondigd; ze zijn sindsdien hernoemd (zie "Terminologie en toegankelijkheid"
hierboven) naar `industrie_aangetroffen` / `industrie_deels_aangetroffen` / etc.

1. **Explicietere onzekerheidsstatus per monument.** Elk monument krijgt nu een
   status uit `industrie_aangetroffen` (eenduidig) / `industrie_deels_aangetroffen`
   (industriefunctie gevonden, maar niet bij alle adressen van dit monument
   eensluidend) / `geen_industrie_aangetroffen` / `geen_adres` / `geen_match` /
   `bag_mislukt`, bewust géén "actief"/"niet actief"-taal, want de BAG bevestigt
   een gebruiksdoel, geen bedrijfsvoering. Op de kaart: een dubbele donkerblauwe
   rand voor `industrie_deels_aangetroffen`, zichtbaar naast de bestaande
   effen/gestippelde randen.
2. **"Waarom staat dit punt hier?"-detailweergave per monument.** Klik op een
   punt op de kaart toont een detailpaneel: rijksmonumentnummer met link naar de
   RCE-bron, oorspronkelijke functie, afstand tot de gebiedsrand (of "binnen het
   gebied"), provincie, onzekerheidsstatus, elk bekend adres met het daarbij
   gevonden BAG-gebruiksdoel, en de peildatum.
3. **Datakwaliteitsdashboard per gebied.** Nieuwe kaart op elke gebiedspagina, toen
   aangekondigd met de labels: aantal eenduidig actief / actief maar onzeker /
   bevestigd niet-actief / geen adres bekend / geen BAG-match / BAG-bevraging
   mislukt / monumenten met meerdere adressen.

Retroactief toegepast op de oorspronkelijke 17 gemigreerde gebieden (opnieuw
volledig opgehaald, inclusief de tussenliggende provenance-data die bij de
eerste migratie verloren was gegaan).

## Bouwpijplijn (juli 2026)

Tot juli 2026 leefde deze pijplijn alleen als losse, ad-hoc scripts in een
sessie-scratchpad: niet reproduceerbaar, niet controleerbaar, en gevoelig voor
handmatige fouten. Omgezet naar de duurzame versie in [`scripts/`](scripts/README.md):

- Herbruikbare, dependency-loze Node-scripts voor referentiedata ophalen, een
  gebied voorbereiden, monumenten classificeren, verrijken (BAG + provincie) en
  de HTML genereren.
- **Sanity-check op de handgeschreven bbox-regex.** `scripts/lib/bbox-regex.mjs`
  leidt de REGEX-bboxfilter nu mechanisch af uit de echte gebieds-bbox (met
  0.15° marge), in plaats van 'm met de hand te typen. Inclusief een zelftest
  die precies de foutklasse afdekt die bij Rijntakken misging (een verkeerd
  cijferbereik hield een monument stilzwijgend buiten de query). Bijvangst:
  dezelfde Natura2000-WFS bleek zonder waarschuwing ook RD i.p.v. WGS84 te
  kunnen teruggeven; ook daar is een harde controle tegen ingebouwd
  (`assertWgs84NL`).
- **Retry/backoff voor de BAG-WFS-calls.** `scripts/lib/bag.mjs` doet 2
  automatische retries met oplopende wachttijd per monument.
- **CQL_FILTER-valkuil gedocumenteerd** in `scripts/README.md`, sectie "Bekende
  valkuilen": de gebruikte PDOK-WFS-endpoints negeren dit filter stilzwijgend.
- **De 17 oorspronkelijke gebieden gemigreerd** naar deze pijplijn. Alle
  `data/gebieden/<slug>/data.json`-bestanden staan sindsdien in de repo;
  `gebieden/*.html` en `index.html` worden met `scripts/06-build-gebied-html.mjs`
  resp. `scripts/07-build-landing-html.mjs` gegenereerd. Gecontroleerd dat alle
  cijfers (n, ja, onbekend, per-provincie) exact overeenkwamen met de eerder
  gepubliceerde versie. Rijntakken had als enige nog een afwijkend
  databundel-schema (`gld`/`ovij` i.p.v. het generieke `provCounts`);
  genormaliseerd naar hetzelfde schema als de andere 16 gebieden.
- **Peildatum stond hardcoded.** De pijplijn leidt 'm nu automatisch af uit het
  moment van genereren.
- **Eerste CI-validatie.** `.github/workflows/validate.yml` draait bij elke
  push/PR: de bbox-regex-zelftest, schema- en telinvariant-validatie
  (`scripts/validate.mjs`), en herbouwt alle HTML uit de huidige data om te
  controleren dat data en gepubliceerde pagina's niet uit elkaar lopen.

## Cross-graph dubbeltelling (RCE CHO)

Vastgesteld dat het RCE CHO-endpoint sommige triples dubbel opslaat in twee
named graphs tegelijk (`graph/instanties-rce` en `graph/punten`). Een query
zonder `GRAPH`-clausule matcht dan in beide graphs, en zonder `DISTINCT` komt
elke rij dubbel terug. Alle query-templates in dit project gebruiken daarom
`SELECT DISTINCT`. Zie `scripts/README.md`, "Bekende valkuilen".
