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
  <div class="stat alert"><div class="num">\${fmt(D.ja)}</div><div class="lbl">actieve bedrijfsindicatie</div></div>
  ${provs.map(p => `<div class="stat alert"><div class="num">\${fmt(D.provJaCounts['${p}']||0)}</div><div class="lbl">${p} actief</div></div>`).join('\n  ')}
  <div class="stat neutral"><div class="num">\${fmt(D.onbekend)}</div><div class="lbl">BAG niet te controleren</div></div>`
  : `
  <div class="stat"><div class="num">\${fmt(D.n)}</div><div class="lbl">rijksmonumentale boerderijen</div></div>
  <div class="stat alert"><div class="num">\${fmt(D.ja)}</div><div class="lbl">actieve bedrijfsindicatie</div></div>
  <div class="stat neutral"><div class="num">\${fmt(D.onbekend)}</div><div class="lbl">BAG niet te controleren</div></div>`;

const gridCols = multiProv ? (3 + provs.length * 2) : 3;

const dk = Dobj.datakwaliteit;
const datakwaliteitCard = dk ? `
  <div class="card">
    <h2>Datakwaliteit &middot; peildatum ${Dobj.peildatum}</h2>
    <div class="dk-grid">
      <div class="dk-item"><b>${dk.actief}</b><span>actief, eenduidig</span></div>
      <div class="dk-item"><b>${dk.actiefOnzeker}</b><span>actief, adres niet eenduidig</span></div>
      <div class="dk-item"><b>${dk.nietActief}</b><span>niet actief (bevestigd)</span></div>
      <div class="dk-item"><b>${dk.geenAdres}</b><span>geen adres bekend in RCE</span></div>
      <div class="dk-item"><b>${dk.geenMatch}</b><span>geen match in BAG</span></div>
      <div class="dk-item"><b>${dk.bagMislukt}</b><span>BAG-bevraging mislukt</span></div>
      <div class="dk-item"><b>${dk.meerdereAdressen}</b><span>monumenten met meerdere adressen</span></div>
    </div>
  </div>` : '';

const head = `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${Dobj.gebied} &middot; Boerderij-rijksmonumenten &amp; Natura 2000</title>
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
  header p{margin-top:8px;font-size:14px;color:var(--ink-soft);max-width:58ch}
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
  .card h2{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--blue-mid);margin-bottom:8px}
  #map{width:100%;display:block;cursor:crosshair}
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
  .tip{position:fixed;pointer-events:none;background:var(--ink);color:#fff;font-size:12px;
    padding:5px 8px;border-radius:2px;display:none;z-index:9;max-width:260px}
  @media (max-width:480px){ h1{font-size:21px} .stats{grid-template-columns:repeat(3,1fr)} }
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
      <span class="richtlijn-meta">Natura 2000-gebied nr. ${Dobj.richtlijn.gebiedsnummer}${[Dobj.richtlijn.siteCodeVogelrichtlijn, Dobj.richtlijn.siteCodeHabitatrichtlijn].filter(Boolean).length ? ' &middot; sitecode ' + [Dobj.richtlijn.siteCodeVogelrichtlijn, Dobj.richtlijn.siteCodeHabitatrichtlijn].filter(Boolean).join(' / ') : ''} &middot; stikstofgevoelig: ${Dobj.richtlijn.stikstofgevoelig ? 'ja' : 'nee'}</span>
    </div>` : ''}
    <p>${meta.tekst} <a href="${meta.bron}" style="color:var(--blue-mid)" target="_blank" rel="noopener">Bron: natura2000.nl &rarr;</a>${Dobj.richtlijn ? ` &middot; <a href="${Dobj.richtlijn.rceUris[0]}" style="color:var(--blue-mid)" target="_blank" rel="noopener">RCE linked data${Dobj.richtlijn.rceUris.length > 1 ? ' (1 van ' + Dobj.richtlijn.rceUris.length + ' richtlijndelen)' : ''} &rarr;</a>` : ''}${Dobj.richtlijn?.wikidata ? ` &middot; <a href="${Dobj.richtlijn.wikidata}" style="color:var(--blue-mid)" target="_blank" rel="noopener">Wikidata &rarr;</a>` : ''}</p>
    <p>Rijksmonumentale boerderijen binnen dit Natura 2000-gebied of binnen 5&nbsp;km
    van de gebiedsrand (een gekozen selectievenster, geen ecologische invloedssfeer), met een
    actieve-bedrijfsindicatie op basis van BAG-gebruiksdoel.</p>
  </header>

  <div class="stats" id="stats"></div>

  <div class="card">
    <h2>Kaart &middot; elk punt is een rijksmonumentale boerderij</h2>
    ${Dobj.n === 0
      ? `<p style="font-size:13px;color:var(--ink-soft);margin-bottom:8px">Geen rijksmonumentale boerderijen gevonden binnen of tot 5&nbsp;km van dit gebied.</p>`
      : `<div class="chips">
      <button class="chip on" id="fAll">Alle __D_N__</button>
      <button class="chip" id="fJa">Alleen actieve bedrijfsindicatie</button>
    </div>`}
    <canvas id="map" aria-label="Kaart van het Natura 2000-gebied ${Dobj.gebied} met rijksmonumentale boerderijen"></canvas>
    <div class="legend">
      <span><i class="sq" style="background:rgba(94,125,70,.3);border:1px solid var(--n2k)"></i>Natura 2000</span>
      <span><i class="sw" style="background:var(--k0)"></i>erin</span>
      <span><i class="sw" style="background:var(--k1)"></i>&lt;250 m</span>
      <span><i class="sw" style="background:var(--k2)"></i>&lt;1 km</span>
      <span><i class="sw" style="background:var(--k3)"></i>&lt;5 km</span>
    </div>
    <p style="font-size:12px;color:var(--ink-soft);margin-top:8px">Klik op een punt voor details ("waarom staat
    dit punt hier?"), beweeg eroverheen voor een korte hint. Omrande punten (donkerblauw, effen) hebben een
    eenduidige industriefunctie in de BAG &mdash; actieve bedrijfsindicatie. Een dubbele donkerblauwe rand
    betekent: wel industriefunctie gevonden, maar niet bij alle adressen van dit monument eenduidig (zie klik-detail).
    Een gestippelde grijze rand: kon niet in de BAG worden gecontroleerd (geen adres bekend of geen match
    gevonden) &mdash; telt niet mee als actief, maar is ook niet bevestigd als inactief.</p>
    <div class="detail" id="detail"></div>
  </div>

  ${datakwaliteitCard}

  <footer>
    <p><b>Methodiek.</b> Monumenten: RCE CHO-endpoint, rijksmonumenten met oorspronkelijke functie
    Boerderij (M/M1), binnen 5&nbsp;km van of daadwerkelijk binnen het Natura 2000-gebied. Natura 2000-geometrie:
    officiële landelijke WFS (service.pdok.nl/rvo/natura2000). Afstand: monumentpunt tot de daadwerkelijke
    gebiedsrand. Provincie: point-in-polygon tegen de PDOK-bestuurlijke grenzen. Bedrijfsindicatie:
    BAG-gebruiksdoel (open WFS bag:verblijfsobject), gematcht op postcode en huisnummer; industriefunctie
    op een boerderijadres geldt als actieve bedrijfsindicatie. Monumenten met uitsluitend woonfunctie zijn
    conservatief niet als actieve bedrijfsindicatie geteld. Monumenten zonder BAG-adres in RCE of zonder
    match in de BAG-zoekbox staan apart als "BAG niet te controleren" &mdash; deze tellen niet mee als
    actief, maar zijn nadrukkelijk geen bevestigde inactieve gevallen. Peildatum ${Dobj.peildatum}.</p>
    <p><b>Kanttekeningen.</b> Dit is een blootstellingskaart: er is g&eacute;&eacute;n emissiedata (AERIUS/RAV)
    verwerkt. De industriefunctie-vlag is een indicatie, geen bewijs van actieve bedrijfsvoering of
    stikstofuitstoot.</p>
  </footer>
</div>
<div class="tip" id="tip"></div>
<script id="data" type="application/json">`;

const tail = `</script>
<script>
const D = JSON.parse(document.getElementById('data').textContent);
const $ = id => document.getElementById(id);
const fmt = n => n.toLocaleString('nl-NL');
const KC = ['#7A1607','#D1401F','#E0703C','#E5B08E','#B7C7D2','#B7C7D2'];
const KN = ['erin','<250 m','<1 km','<5 km','<25 km','\\u226525 km'];
let filterJa = false;

$('stats').innerHTML = \`${statBlocks}\`;

const canvas = $('map'), ctx = canvas.getContext('2d');
let proj = null;
function drawMap(){
  const w = canvas.clientWidth, h = Math.min(Math.round(w*0.9), 520);
  const dpr = window.devicePixelRatio||1;
  canvas.width=w*dpr; canvas.height=h*dpr; canvas.style.height=h+'px';
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.clearRect(0,0,w,h);
  const [x0,y0,x1,y1] = D.bbox;
  const latC = Math.cos((y0+y1)/2*Math.PI/180);
  const spanX=(x1-x0)*latC, spanY=y1-y0, pad=10;
  const s = Math.min((w-2*pad)/spanX,(h-2*pad)/spanY);
  const ox=(w-spanX*s)/2, oy=(h-spanY*s)/2;
  proj = ([x,y])=>[ox+(x-x0)*latC*s, h-oy-(y-y0)*s];
  ctx.fillStyle='rgba(94,125,70,0.28)'; ctx.strokeStyle='#5E7D46'; ctx.lineWidth=1;
  D.n2000.forEach(g=>g.rings.forEach(r=>{
    ctx.beginPath();
    r.forEach((p,i)=>{const [px,py]=proj(p); i?ctx.lineTo(px,py):ctx.moveTo(px,py);});
    ctx.closePath(); ctx.fill(); ctx.stroke();
  }));
  [...D.mons].sort((a,b)=>b.k-a.k).forEach(m=>{
    if(filterJa && !m.ja) return;
    const [px,py]=proj([m.lon,m.lat]);
    ctx.fillStyle = KC[m.k];
    const r = m.k<=1 ? 3.6 : m.k===2 ? 3.1 : 2.6;
    ctx.beginPath(); ctx.arc(px,py,r,0,7); ctx.fill();
    if(m.status==='actief_onzeker'){ ctx.strokeStyle='#16324F'; ctx.lineWidth=1.2; ctx.stroke(); ctx.beginPath(); ctx.arc(px,py,r+2.2,0,7); ctx.stroke(); }
    else if(m.ja){ ctx.strokeStyle='#16324F'; ctx.lineWidth=1.2; ctx.stroke(); }
    else if(m.bag!=='ok'){ ctx.setLineDash([1.5,1.5]); ctx.strokeStyle='#8A8A8A'; ctx.lineWidth=1; ctx.stroke(); ctx.setLineDash([]); }
  });
}
const tip=$('tip');
canvas.addEventListener('pointermove',e=>{
  if(!proj) return;
  const r=canvas.getBoundingClientRect();
  const mx=e.clientX-r.left, my=e.clientY-r.top;
  let best=null,bd=90;
  D.mons.forEach(m=>{
    if(filterJa && !m.ja) return;
    const [px,py]=proj([m.lon,m.lat]), d=(px-mx)**2+(py-my)**2;
    if(d<bd){bd=d;best=m;}
  });
  if(best){
    tip.style.display='block';
    tip.style.left=Math.min(e.clientX+12, innerWidth-260)+'px'; tip.style.top=(e.clientY-10)+'px';
    tip.textContent = \`rm \${best.nr} \\u00b7 \${best.straat||''} \${best.huisnr||''}, \${best.wpl||''} \\u00b7 \${best.prov} \\u00b7 \${KN[best.k]} van ${Dobj.gebied}\`+
      (best.d>0 ? \` (\${fmt(best.d)} m)\` : '') + (best.ja ? ' \\u00b7 actieve bedrijfsindicatie' : (best.bag!=='ok' ? ' \\u00b7 BAG niet te controleren' : ''));
  } else tip.style.display='none';
});
canvas.addEventListener('pointerleave',()=>tip.style.display='none');
const STATUS_LABEL = {
  actief: 'Actieve bedrijfsindicatie (eenduidig)',
  actief_onzeker: 'Actieve bedrijfsindicatie, maar adres niet eenduidig',
  niet_actief: 'Geen actieve bedrijfsindicatie (bevestigd)',
  geen_adres: 'BAG niet te controleren \\u2014 geen adres bekend in RCE',
  geen_match: 'BAG niet te controleren \\u2014 geen match gevonden',
  bag_mislukt: 'BAG niet te controleren \\u2014 bevraging mislukt'
};
const detail = $('detail');
function vindDichtstbijzijnde(e){
  const r=canvas.getBoundingClientRect();
  const mx=e.clientX-r.left, my=e.clientY-r.top;
  let best=null,bd=90;
  D.mons.forEach(m=>{
    if(filterJa && !m.ja) return;
    const [px,py]=proj([m.lon,m.lat]), d=(px-mx)**2+(py-my)**2;
    if(d<bd){bd=d;best=m;}
  });
  return best;
}
canvas.addEventListener('click',e=>{
  if(!proj) return;
  const m = vindDichtstbijzijnde(e);
  if(!m){ detail.classList.remove('on'); return; }
  const adressenHtml = (m.addressen||[]).map((a,i)=>{
    const match = (m.matched||[]).find(x=>x.straat===a.straat && String(x.huisnummer)===String(parseInt(a.huisnr,10)));
    return \`<dt>adres \${i+1}</dt><dd>\${a.straat} \${a.huisnr}, \${a.postcode} \${a.woonplaats}\${match ? ' \\u2014 gebruiksdoel: '+match.gebruiksdoel : ' \\u2014 geen BAG-match'}</dd>\`;
  }).join('');
  detail.innerHTML = \`<dl>
    <dt>rijksmonumentnummer</dt><dd>\${m.nr}\${m.rm ? \` (<a href="\${m.rm}" target="_blank" rel="noopener" style="color:var(--blue-mid)">RCE-bron &rarr;</a>)\` : ''}</dd>
    <dt>oorspronkelijke functie</dt><dd>\${m.functie||'onbekend'}</dd>
    <dt>ligging</dt><dd>\${m.erin ? 'binnen het Natura 2000-gebied' : \`\${fmt(m.afstandTotRand)} m van de gebiedsrand\`} \\u00b7 \${KN[m.k]}-klasse \\u00b7 \${m.prov}</dd>
    <dt>status</dt><dd>\${STATUS_LABEL[m.status]||m.status}</dd>
    \${adressenHtml}
    <dt>peildatum</dt><dd>${Dobj.peildatum}</dd>
  </dl>\`;
  detail.classList.add('on');
});
if($('fAll')){
  $('fAll').onclick=()=>{filterJa=false;$('fAll').classList.add('on');$('fJa').classList.remove('on');drawMap();};
  $('fJa').onclick=()=>{filterJa=true;$('fJa').classList.add('on');$('fAll').classList.remove('on');drawMap();};
}
drawMap();
window.addEventListener('resize',drawMap);
</script>
</body>
</html>
`;

const headFilled = head.replace('__D_N__', Dobj.n);
const OUT = path.join(__dirname, '..', 'gebieden', `${slug}.html`);
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, headFilled + D + tail);
console.log('written', OUT, 'bytes', fs.statSync(OUT).size);
