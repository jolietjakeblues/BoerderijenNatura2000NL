#!/usr/bin/env node
// Stap 6: de D-databundel (data/gebieden/<slug>/data.json) renderen naar de
// publieke gebiedspagina gebieden/<slug>.html.
//
// Gebruik: node scripts/06-build-gebied-html.mjs <slug>
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GEBIEDEN_BESCHRIJVING } from './lib/gebieden-beschrijving.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const [, , slug] = process.argv;
if (!slug) { console.error('Gebruik: node scripts/06-build-gebied-html.mjs <slug>'); process.exit(1); }

const dir = path.join(__dirname, '..', 'data', 'gebieden', slug);
const D = fs.readFileSync(path.join(dir, 'data.json'), 'utf-8');
const Dobj = JSON.parse(D);
const meta = GEBIEDEN_BESCHRIJVING[slug] || { tekst: '(nog geen beschrijving toegevoegd aan scripts/lib/gebieden-beschrijving.mjs)', bron: 'https://www.natura2000.nl/gebieden' };
const provs = Object.keys(Dobj.provCounts);
const multiProv = provs.length > 1;

const statBlocks = multiProv
  ? `
  <div class="stat"><div class="num">\${fmt(D.n)}</div><div class="lbl">rijksmonumentale boerderijen</div></div>
  ${provs.map(p => `<div class="stat"><div class="num">\${fmt(D.provCounts['${p}'])}</div><div class="lbl">${p}</div></div>`).join('\n  ')}
  <div class="stat alert"><div class="num">\${fmt(D.ja)}</div><div class="lbl">BAG-industriefunctie-indicatie</div></div>
  ${provs.map(p => `<div class="stat alert"><div class="num">\${fmt(D.provJaCounts['${p}']||0)}</div><div class="lbl">${p} industriefunctie</div></div>`).join('\n  ')}
  <div class="stat neutral"><div class="num">\${fmt(D.onbekend)}</div><div class="lbl">BAG niet te controleren</div></div>`
  : `
  <div class="stat"><div class="num">\${fmt(D.n)}</div><div class="lbl">rijksmonumentale boerderijen</div></div>
  <div class="stat alert"><div class="num">\${fmt(D.ja)}</div><div class="lbl">BAG-industriefunctie-indicatie</div></div>
  <div class="stat neutral"><div class="num">\${fmt(D.onbekend)}</div><div class="lbl">BAG niet te controleren</div></div>`;

const gridCols = multiProv ? (3 + provs.length * 2) : 3;

const fmtNL = n => n.toLocaleString('nl-NL');
const STATUS_LABEL_STATIC = {
  industrie_aangetroffen: 'Industriefunctie aangetroffen (eenduidig)',
  industrie_deels_aangetroffen: 'Industriefunctie aangetroffen bij een deel van de adressen',
  geen_industrie_aangetroffen: 'Geen industriefunctie aangetroffen',
  geen_adres: 'BAG niet te controleren - geen adres bekend in RCE',
  geen_match: 'BAG niet te controleren - geen match gevonden',
  bag_mislukt: 'BAG niet te controleren - bevraging mislukt'
};

const dk = Dobj.datakwaliteit;
const datakwaliteitCard = dk ? `
  <div class="card">
    <h2>Datakwaliteit &middot; peildatum ${Dobj.peildatum}</h2>
    <div class="dk-grid">
      <div class="dk-item"><b>${dk.industrieAangetroffen}</b><span>industriefunctie aangetroffen</span></div>
      <div class="dk-item"><b>${dk.industrieDeelsAangetroffen}</b><span>industriefunctie bij deel van adressen</span></div>
      <div class="dk-item"><b>${dk.geenIndustrieAangetroffen}</b><span>geen industriefunctie aangetroffen</span></div>
      <div class="dk-item"><b>${dk.geenAdres}</b><span>geen adres bekend in RCE</span></div>
      <div class="dk-item"><b>${dk.geenMatch}</b><span>geen match in BAG</span></div>
      <div class="dk-item"><b>${dk.bagMislukt}</b><span>BAG-bevraging mislukt</span></div>
      <div class="dk-item"><b>${dk.meerdereAdressen}</b><span>monumenten met meerdere adressen</span></div>
    </div>
  </div>` : '';

// VR- en HR-sitecode zijn vaak identiek (één EU-sitecode voor een gecombineerd
// VR+HR-gebied); dat leverde een verwarrende "sitecode X / X" op. Bij gelijke
// codes tonen we 'm nu maar één keer; bij afwijkende codes expliciet gelabeld
// per richtlijn, in plaats van een dubbelzinnige "/"-scheiding.
function sitecodeTekst(r) {
  if (!r) return '';
  const vr = r.siteCodeVogelrichtlijn, hr = r.siteCodeHabitatrichtlijn;
  if (vr && hr && vr === hr) return ` &middot; sitecode ${vr}`;
  if (vr && hr) return ` &middot; VR-sitecode ${vr} &middot; HR-sitecode ${hr}`;
  if (vr || hr) return ` &middot; sitecode ${vr || hr}`;
  return '';
}

const head = `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${Dobj.gebied} &middot; Boerderij-rijksmonumenten &amp; Natura 2000</title>
<link rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
  integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
  crossorigin="" />
<style>
  :root{
    --paper:#F4F7F8; --panel:#FFFFFF; --ink:#16324F; --ink-soft:#4A6579;
    --blue-mid:#3E6C93; --alert:#D1401F; --line:#C9D6DE;
    --n2k:#5E7D46; --n2k-bg:#E9F0E6; --n2k-text:#3B5230;
    --k0:#7A1607; --k1:#D1401F; --k2:#E0703C; --k3:#E5B08E; --k4:#B7C7D2; --k5:#B7C7D2;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html{-webkit-text-size-adjust:100%}
  body{background:var(--paper);color:var(--ink);
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
    line-height:1.5;padding:0 0 48px}
  .wrap{max-width:760px;margin:0 auto;padding:0 16px}
  .eyebrow{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--blue-mid);font-weight:600}
  header{padding:18px 0 18px;border-bottom:2px solid var(--ink)}
  h1{font-family:Palatino,"Palatino Linotype",Georgia,serif;font-size:27px;line-height:1.18;font-weight:700;margin-top:6px}
  header p{margin-top:8px;font-size:14px;color:var(--ink-soft);
    text-align:justify;-webkit-hyphens:auto;hyphens:auto}
  .stats{display:grid;grid-template-columns:repeat(${gridCols},1fr);gap:8px;margin:16px 0}
  .stat{background:var(--panel);border:1px solid var(--line);border-radius:2px;padding:10px}
  .stat .num{font-family:Palatino,Georgia,serif;font-size:20px;font-weight:700;line-height:1.05}
  .stat.alert .num{color:var(--alert)}
  .stat.neutral .num{color:var(--ink-soft)}
  .stat .lbl{font-size:10px;letter-spacing:.05em;text-transform:uppercase;color:var(--ink-soft);margin-top:3px}
  .card{background:var(--panel);border:1px solid var(--line);border-radius:2px;padding:14px;margin:14px 0}
  .badge-richtlijn{display:inline-block;font-size:10px;font-weight:700;letter-spacing:.04em;
    text-transform:uppercase;padding:2px 8px;background:var(--n2k-bg);color:var(--n2k-text);border-radius:8px}
  .richtlijn-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:8px}
  .richtlijn-meta{font-size:12px;color:var(--ink-soft)}
  .dk-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px}
  .dk-item{background:var(--paper);border:1px solid var(--line);border-radius:2px;padding:8px 10px}
  .dk-item b{font-family:Palatino,Georgia,serif;font-size:18px;display:block}
  .dk-item span{font-size:11px;color:var(--ink-soft)}
  .detail{display:none;font-size:12px;color:var(--ink)}
  .detail.on{display:block}
  .detail dl{display:grid;grid-template-columns:auto 1fr;gap:2px 10px;margin-top:6px}
  .detail dt{color:var(--ink-soft)}
  .detail dd{margin:0}
  .mon-list{margin-top:12px;font-size:12px}
  .mon-list summary{cursor:pointer;color:var(--blue-mid);font-weight:600}
  .mon-list table{width:100%;border-collapse:collapse;margin-top:8px;font-size:12px}
  .mon-list th,.mon-list td{text-align:left;padding:4px 8px;border-bottom:1px solid var(--line)}
  .mon-list th{color:var(--ink-soft);font-size:10px;letter-spacing:.04em;text-transform:uppercase}
  .card h2{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--blue-mid);margin-bottom:8px}
  #map{width:100%;height:480px;border:1px solid var(--line);border-radius:2px;background:var(--paper)}
  .leaflet-popup-content-wrapper,.leaflet-popup-tip{background:var(--ink);color:#fff}
  .leaflet-popup-content{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;font-size:12px;margin:8px 10px}
  .legend{display:flex;gap:12px;flex-wrap:wrap;font-size:11px;color:var(--ink-soft);margin-top:8px}
  .legend span{display:inline-flex;align-items:center;gap:5px}
  .sw{width:9px;height:9px;border-radius:50%}
  .sq{width:11px;height:11px;border-radius:2px}
  .chips{display:flex;gap:8px;margin:10px 0 2px;flex-wrap:wrap}
  .chip{padding:7px 12px;border:1.5px solid var(--ink);background:var(--panel);color:var(--ink);
    font-size:12px;font-weight:600;cursor:pointer;border-radius:2px}
  .chip.on{background:var(--ink);color:#fff}
  .chip:focus-visible{outline:3px solid var(--alert);outline-offset:2px}
  footer{margin-top:22px;font-size:12px;color:var(--ink-soft);border-top:1px solid var(--line);padding-top:14px}
  footer p{margin-bottom:8px}
  @media (max-width:480px){ h1{font-size:21px} .stats{grid-template-columns:repeat(3,1fr)} #map{height:360px} }
</style>
</head>
<body>
<div class="wrap">
  <p style="font-size:13px;margin-top:14px"><a href="../index.html" style="color:var(--blue-mid)">&larr; terug naar overzicht alle Natura 2000-gebieden</a></p>
  <header>
    <div class="eyebrow">RCE &times; Kadaster &times; Natura 2000</div>
    <h1>${Dobj.gebied}</h1>
    ${Dobj.richtlijn ? `<div class="richtlijn-row">
      <span class="badge-richtlijn">${Dobj.richtlijn.label}</span>
      <span class="richtlijn-meta">Natura 2000-gebied nr. ${Dobj.richtlijn.gebiedsnummer}${sitecodeTekst(Dobj.richtlijn)} &middot; stikstofgevoelig: ${Dobj.richtlijn.stikstofgevoelig ? 'ja' : 'nee'}</span>
    </div>` : ''}
    <p>${meta.tekst} <a href="${meta.bron}" style="color:var(--blue-mid)" target="_blank" rel="noopener">Bron: natura2000.nl &rarr;</a>${Dobj.richtlijn ? ` &middot; <a href="${Dobj.richtlijn.rceUris[0]}" style="color:var(--blue-mid)" target="_blank" rel="noopener">RCE linked data${Dobj.richtlijn.rceUris.length > 1 ? ' (1 van ' + Dobj.richtlijn.rceUris.length + ' richtlijndelen)' : ''} &rarr;</a>` : ''}${Dobj.richtlijn?.wikidata ? ` &middot; <a href="${Dobj.richtlijn.wikidata}" style="color:var(--blue-mid)" target="_blank" rel="noopener">Wikidata &rarr;</a>` : ''}</p>
    <p>Rijksmonumentale boerderijen binnen dit Natura 2000-gebied of binnen 5&nbsp;km
    van de gebiedsrand (een gekozen selectievenster, geen ecologische invloedssfeer), met een
    BAG-industriefunctie-indicatie op basis van BAG-gebruiksdoel (een aanwijzing, geen bewijs van
    actieve bedrijfsvoering).</p>
  </header>

  <div class="stats" id="stats"></div>

  <div class="card">
    <h2>Kaart &middot; elk punt is een rijksmonumentale boerderij</h2>
    ${Dobj.n === 0
      ? `<p style="font-size:13px;color:var(--ink-soft);margin-bottom:8px">Geen rijksmonumentale boerderijen gevonden binnen of tot 5&nbsp;km van dit gebied.</p>`
      : `<div class="chips">
      <button class="chip on" id="fAll" aria-pressed="true">Alle __D_N__</button>
      <button class="chip" id="fJa" aria-pressed="false">Alleen BAG-industriefunctie-indicatie</button>
      <button class="chip" id="csvBtn" type="button">CSV downloaden &darr;</button>
    </div>`}
    <div id="map" aria-label="Kaart van het Natura 2000-gebied ${Dobj.gebied} met rijksmonumentale boerderijen, met een OpenStreetMap-ondergrond"></div>
    <div class="legend">
      <span><i class="sq" style="background:rgba(94,125,70,.3);border:1px solid var(--n2k)"></i>Natura 2000 (klikbaar)</span>
      <span><i class="sw" style="background:var(--k0)"></i>erin</span>
      <span><i class="sw" style="background:var(--k1)"></i>&lt;250 m</span>
      <span><i class="sw" style="background:var(--k2)"></i>&lt;1 km</span>
      <span><i class="sw" style="background:var(--k3)"></i>&lt;5 km</span>
    </div>
    <p style="font-size:12px;color:var(--ink-soft);margin-top:8px">Klik op het groene Natura 2000-gebied zelf voor
    de gebiedsbeschrijving. Klik op een punt voor details ("waarom staat
    dit punt hier?"), beweeg eroverheen voor een korte hint. Sleep om te verschuiven, scroll of gebruik de
    +/&minus;-knoppen om in te zoomen op de werkelijke ligging. Bij omrande punten (donkerblauw, effen) is
    eenduidig een industriefunctie in de BAG aangetroffen. Een dubbele donkerblauwe rand betekent: wel
    industriefunctie gevonden, maar niet bij alle adressen van dit monument eenduidig (zie klik-detail).
    Een gestippelde grijze rand: kon niet in de BAG worden gecontroleerd (geen adres bekend of geen match
    gevonden). Op basis van de BAG-koppeling is hierover geen uitspraak mogelijk, dit is geen bevestiging
    van afwezige bedrijfsvoering. Kaartondergrond: &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener" style="color:var(--blue-mid)">CARTO</a>
    &amp; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener" style="color:var(--blue-mid)">OpenStreetMap</a>-auteurs.</p>
    <div class="detail" id="detail"></div>
    ${Dobj.n > 0 ? `<details class="mon-list">
      <summary>Lijst van alle ${Dobj.n} monumenten (toetsenbord- en schermlezer-toegankelijk)</summary>
      <table>
        <thead><tr><th>Rm-nr</th><th>Plaats</th><th>Afstand</th><th>Status</th></tr></thead>
        <tbody>
          ${Dobj.mons.map(m => `<tr><td>${m.nr}</td><td>${m.wpl || '-'}</td><td>${m.erin ? 'binnen gebied' : fmtNL(m.afstandTotRand) + ' m'}</td><td>${STATUS_LABEL_STATIC[m.status] || m.status}</td></tr>`).join('\n          ')}
        </tbody>
      </table>
    </details>` : ''}
  </div>

  ${datakwaliteitCard}

  <footer>
    <p><b>Methodiek.</b> Monumenten: RCE CHO-endpoint, rijksmonumenten met oorspronkelijke functie
    Boerderij (M/M1), binnen 5&nbsp;km van of daadwerkelijk binnen het Natura 2000-gebied. Natura 2000-geometrie:
    officiële landelijke WFS (service.pdok.nl/rvo/natura2000). Afstand: monumentpunt tot de daadwerkelijke
    gebiedsrand. Provincie: point-in-polygon tegen de PDOK-bestuurlijke grenzen. BAG-industriefunctie-indicatie:
    BAG-gebruiksdoel (open WFS bag:verblijfsobject), gematcht op postcode en huisnummer; industriefunctie
    op een boerderijadres geldt als BAG-industriefunctie-indicatie: een aanwijzing, geen bewijs van
    actieve agrarische bedrijfsvoering. Monumenten met uitsluitend woonfunctie zijn conservatief niet als
    zodanig geteld; dat betekent een afwezige industriefunctie-aanwijzing, geen bevestiging dat er geen
    bedrijf is. Monumenten zonder BAG-adres in RCE of zonder match in de BAG-zoekbox staan apart als
    "BAG niet te controleren". Peildatum ${Dobj.peildatum}.</p>
    <p><b>Kanttekeningen.</b> Dit is een blootstellingskaart: er is g&eacute;&eacute;n emissiedata (AERIUS/RAV)
    verwerkt. De industriefunctie-vlag is een indicatie, geen bewijs van actieve bedrijfsvoering of
    stikstofuitstoot. Geen van de statuscategorie&euml;n op deze pagina is een uitspraak over daadwerkelijke
    bedrijfsvoering, alleen over wat wel of niet in de BAG is aangetroffen.</p>
  </footer>
</div>
<script id="meta" type="application/json">${JSON.stringify({ gebied: Dobj.gebied, tekst: meta.tekst, bron: meta.bron })}</script>
<script id="data" type="application/json">`;

const tail = `</script>
<script
  src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
  integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
  crossorigin=""></script>
<script>
const D = JSON.parse(document.getElementById('data').textContent);
const META = JSON.parse(document.getElementById('meta').textContent);
const $ = id => document.getElementById(id);
const fmt = n => n.toLocaleString('nl-NL');
const KC = ['#7A1607','#D1401F','#E0703C','#E5B08E','#B7C7D2','#B7C7D2'];
const KN = ['erin','<250 m','<1 km','<5 km','<25 km','\\u226525 km'];
let filterJa = false;

$('stats').innerHTML = \`${statBlocks}\`;

const map = L.map('map', { scrollWheelZoom: false });
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; OpenStreetMap contributors',
  maxZoom: 19
}).addTo(map);
const [bx0,by0,bx1,by1] = D.bbox;
map.fitBounds([[by0,bx0],[by1,bx1]], { padding: [10,10] });

const n2000Layer = L.layerGroup().addTo(map);
D.n2000.forEach(g => g.rings.forEach(ring => {
  const poly = L.polygon(ring.map(([lon,lat]) => [lat,lon]), {
    color: '#5E7D46', weight: 1, fillColor: '#5E7D46', fillOpacity: 0.28
  }).addTo(n2000Layer);
  poly.bindTooltip('Klik voor gebiedsbeschrijving', { sticky: true });
  poly.bindPopup(
    \`<b>\${META.gebied}</b><p style="margin-top:6px">\${META.tekst}</p><p style="margin-top:6px"><a href="\${META.bron}" target="_blank" rel="noopener" style="color:var(--blue-mid)">Bron: natura2000.nl &rarr;</a></p>\`,
    { maxWidth: 320 }
  );
}));

const STATUS_LABEL = {
  industrie_aangetroffen: 'Industriefunctie aangetroffen (eenduidig)',
  industrie_deels_aangetroffen: 'Industriefunctie aangetroffen bij een deel van de adressen',
  geen_industrie_aangetroffen: 'Geen industriefunctie aangetroffen',
  geen_adres: 'BAG niet te controleren \\u2014 geen adres bekend in RCE',
  geen_match: 'BAG niet te controleren \\u2014 geen match gevonden',
  bag_mislukt: 'BAG niet te controleren \\u2014 bevraging mislukt'
};
const detail = $('detail');
function toonDetail(m){
  const adressenHtml = (m.addressen||[]).map((a,i)=>
    \`<dt>adres \${i+1}</dt><dd>\${a.straat} \${a.huisnr}, \${a.postcode} \${a.woonplaats}\${a.gebruiksdoel ? ', gebruiksdoel: '+a.gebruiksdoel : ', geen BAG-match'}</dd>\`
  ).join('');
  detail.innerHTML = \`<dl>
    <dt>rijksmonumentnummer</dt><dd>\${m.nr} (<a href="https://monumentenregister.cultureelerfgoed.nl/monumenten/\${m.nr}" target="_blank" rel="noopener" style="color:var(--blue-mid)">Monumentenregister &rarr;</a>\${m.rm ? \` &middot; <a href="\${m.rm}" target="_blank" rel="noopener" style="color:var(--blue-mid)">RCE linked data &rarr;</a>\` : ''})</dd>
    <dt>oorspronkelijke functie</dt><dd>\${m.functie||'onbekend'}</dd>
    <dt>ligging</dt><dd>\${m.erin ? 'binnen het Natura 2000-gebied' : \`\${fmt(m.afstandTotRand)} m van de gebiedsrand\`} \\u00b7 \${KN[m.k]}-klasse \\u00b7 \${m.prov}</dd>
    <dt>status</dt><dd>\${STATUS_LABEL[m.status]||m.status}</dd>
    \${adressenHtml}
    <dt>peildatum</dt><dd>${Dobj.peildatum}</dd>
  </dl>\`;
  detail.classList.add('on');
}

function csvVeld(v){
  const s = String(v ?? '');
  return /[",\\n;]/.test(s) ? '"' + s.replace(/"/g,'""') + '"' : s;
}
function monumentenCsv(mons){
  const koppen = ['rijksmonumentnummer','adres','provincie','afstand_m','oorspronkelijke_functie','status'];
  const regels = mons.map(m => {
    const a0 = (m.addressen && m.addressen[0]) || {};
    const straatHuisnr = [a0.straat, a0.huisnr].filter(Boolean).join(' ');
    const plaats = a0.postcode || a0.woonplaats ? \`\${a0.postcode||''} \${a0.woonplaats||m.wpl||''}\`.trim() : (m.wpl||'');
    const adres = [straatHuisnr, plaats].filter(Boolean).join(', ');
    return [m.nr, adres, m.prov, m.erin ? 0 : m.afstandTotRand, m.functie||'', STATUS_LABEL[m.status]||m.status].map(csvVeld).join(',');
  });
  return '\\uFEFF' + [koppen.join(','), ...regels].join('\\r\\n');
}
if($('csvBtn')){
  $('csvBtn').onclick = () => {
    const blob = new Blob([monumentenCsv(D.mons)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = '${slug}-boerderijen.csv';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
}

const monLayer = L.layerGroup().addTo(map);
function renderMarkers(){
  monLayer.clearLayers();
  [...D.mons].sort((a,b)=>b.k-a.k).forEach(m=>{
    if(filterJa && !m.ja) return;
    const r = m.k<=1 ? 5 : m.k===2 ? 4.4 : 3.8;
    const marker = L.circleMarker([m.lat,m.lon], { radius:r, fillColor:KC[m.k], fillOpacity:0.9, weight:1, color:KC[m.k] });
    if(m.status==='industrie_deels_aangetroffen'){
      marker.setStyle({color:'#16324F', weight:1.3});
      L.circleMarker([m.lat,m.lon], { radius:r+2.2, fill:false, color:'#16324F', weight:1.3, interactive:false }).addTo(monLayer);
    } else if(m.ja){
      marker.setStyle({color:'#16324F', weight:1.3});
    } else if(m.bag!=='ok'){
      marker.setStyle({color:'#8A8A8A', weight:1, dashArray:'2,2'});
    }
    marker.bindTooltip(
      \`rm \${m.nr} \\u00b7 \${m.straat||''} \${m.huisnr||''}, \${m.wpl||''} \\u00b7 \${m.prov} \\u00b7 \${KN[m.k]} van ${Dobj.gebied}\`+
      (m.d>0 ? \` (\${fmt(m.d)} m)\` : '') + (m.ja ? ' \\u00b7 BAG-industriefunctie-indicatie' : (m.bag!=='ok' ? ' \\u00b7 BAG niet te controleren' : ''))
    );
    marker.on('click', ()=>toonDetail(m));
    marker.addTo(monLayer);
  });
}
renderMarkers();

if($('fAll')){
  $('fAll').onclick=()=>{filterJa=false;$('fAll').classList.add('on');$('fAll').setAttribute('aria-pressed','true');$('fJa').classList.remove('on');$('fJa').setAttribute('aria-pressed','false');renderMarkers();};
  $('fJa').onclick=()=>{filterJa=true;$('fJa').classList.add('on');$('fJa').setAttribute('aria-pressed','true');$('fAll').classList.remove('on');$('fAll').setAttribute('aria-pressed','false');renderMarkers();};
}
window.addEventListener('resize',()=>map.invalidateSize());
</script>
</body>
</html>
`;

const headFilled = head.replace('__D_N__', Dobj.n);
const OUT = path.join(__dirname, '..', 'gebieden', `${slug}.html`);
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, headFilled + D + tail);
console.log('written', OUT, 'bytes', fs.statSync(OUT).size);
