#!/usr/bin/env node
// Stap 7: de landingspagina (index.html) bouwen door alle
// data/gebieden/<slug>/data.json-bestanden in te lezen. Geen handmatig
// bijgehouden lijst meer -- een gebied toevoegen aan de site is dus:
// stappen 1-6 draaien, en dan dit script opnieuw draaien.
//
// Gebruik: node scripts/07-build-landing-html.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GEBIEDEN_BESCHRIJVING } from './lib/gebieden-beschrijving.mjs';
import { findProvincie } from './lib/provincie.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GEBIEDEN_DIR = path.join(__dirname, '..', 'data', 'gebieden');
const RAW_DIR = path.join(__dirname, '..', 'data', 'raw');
const OUT = path.join(__dirname, '..', 'index.html');

const provinciesGeoJSON = JSON.parse(fs.readFileSync(path.join(RAW_DIR, 'provincies.json'), 'utf-8'));

const slugs = fs.existsSync(GEBIEDEN_DIR)
  ? fs.readdirSync(GEBIEDEN_DIR).filter(f => fs.existsSync(path.join(GEBIEDEN_DIR, f, 'data.json')))
  : [];

const gebieden = slugs.map(slug => {
  const D = JSON.parse(fs.readFileSync(path.join(GEBIEDEN_DIR, slug, 'data.json'), 'utf-8'));
  const provs = Object.keys(D.provCounts);
  // Provincie wordt normaal afgeleid uit de gevonden monumenten. Een gebied
  // zonder monumenten (bv. De Bruuk, binnen de huidige 5km-grens) heeft dan
  // geen enkele provincie -- val in dat geval terug op het bbox-midden van
  // het Natura 2000-gebied zelf, zodat het toch in de juiste sectie belandt.
  let sectieProvincies = provs;
  if (sectieProvincies.length === 0 && D.bbox) {
    const [minLon, minLat, maxLon, maxLat] = D.bbox;
    const midden = findProvincie((minLon + maxLon) / 2, (minLat + maxLat) / 2, provinciesGeoJSON);
    if (midden) sectieProvincies = [midden];
  }
  const meta = GEBIEDEN_BESCHRIJVING[slug];
  return {
    slug,
    naam: D.gebied,
    ligging: meta?.ligging || null,
    provincies: provs,
    sectieProvincies: sectieProvincies.length ? sectieProvincies : ['Niet in te delen'],
    richtlijnBadge: D.richtlijn?.badge || null,
    n: D.n, ja: D.ja, onbekend: D.onbekend,
    href: `gebieden/${slug}.html`
  };
}).sort((a, b) => a.naam.localeCompare(b.naam));

const totaal = {
  gebieden: gebieden.length,
  n: gebieden.reduce((s, g) => s + g.n, 0),
  ja: gebieden.reduce((s, g) => s + g.ja, 0),
  onbekend: gebieden.reduce((s, g) => s + (g.onbekend || 0), 0)
};

function gcard(g) {
  const status = g.n === 0 ? 'Geen boerderijen gevonden' : null;
  return `
      <a class="gcard" href="${g.href}">
        <div class="gcard-top">
          ${status ? `<span class="gcard-status">${status}</span>` : ''}
          ${g.richtlijnBadge ? `<span class="badge-richtlijn">${g.richtlijnBadge}</span>` : ''}
        </div>
        <h3>${g.naam}</h3>
        <p class="gcard-sub">${[g.ligging, g.provincies.join(' / ')].filter(Boolean).join(' &middot; ')}</p>
        <div class="gcard-stats">
          <span><b>${g.n}</b> boerderijen</span>
          <span><b>${g.ja}</b> industriefunctie-indicatie</span>
        </div>
      </a>`;
}

const provincieSecties = new Map();
for (const g of gebieden) {
  for (const p of g.sectieProvincies) {
    if (!provincieSecties.has(p)) provincieSecties.set(p, []);
    provincieSecties.get(p).push(g);
  }
}
const NIET_INDELEN = 'Niet in te delen';
const provincieVolgorde = [...provincieSecties.keys()]
  .filter(p => p !== NIET_INDELEN)
  .sort((a, b) => a.localeCompare(b));
if (provincieSecties.has(NIET_INDELEN)) provincieVolgorde.push(NIET_INDELEN);

const provincieSlug = naam => naam.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const jumpNav = provincieVolgorde.map(p =>
  `<a href="#prov-${provincieSlug(p)}">${p} (${provincieSecties.get(p).length})</a>`
).join('\n      ');

const provincieSections = provincieVolgorde.map(p => {
  const lijst = provincieSecties.get(p);
  return `
  <div class="card" id="prov-${provincieSlug(p)}">
    <h2>${p} &middot; ${lijst.length} gebied${lijst.length === 1 ? '' : 'en'}</h2>
    <div class="gebieden-grid">${lijst.map(gcard).join('\n')}
    </div>
  </div>`;
}).join('\n');

const html = `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BoerderijenNatura2000NL &middot; rijksmonumentale boerderijen bij Natura 2000</title>
<style>
  :root{
    --paper:#F4F7F8; --panel:#FFFFFF; --ink:#16324F; --ink-soft:#4A6579;
    --blue-mid:#3E6C93; --alert:#D1401F; --line:#C9D6DE; --n2k:#5E7D46;
    --n2k-bg:#E9F0E6; --n2k-text:#3B5230;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html{-webkit-text-size-adjust:100%}
  body{background:var(--paper);color:var(--ink);
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
    line-height:1.5;padding:0 0 48px}
  .wrap{max-width:840px;margin:0 auto;padding:0 16px}
  .eyebrow{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--blue-mid);font-weight:600}
  header{padding:28px 0 18px;border-bottom:2px solid var(--ink)}
  h1{font-family:Palatino,"Palatino Linotype",Georgia,serif;font-size:30px;line-height:1.15;font-weight:700;margin-top:6px}
  header p{margin-top:10px;font-size:14px;color:var(--ink-soft);max-width:64ch}
  .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:16px 0}
  .stat{background:var(--panel);border:1px solid var(--line);border-radius:2px;padding:12px}
  .stat .num{font-family:Palatino,Georgia,serif;font-size:26px;font-weight:700;line-height:1.05}
  .stat.alert .num{color:var(--alert)}
  .stat.neutral .num{color:var(--ink-soft)}
  .stat .lbl{font-size:10px;letter-spacing:.05em;text-transform:uppercase;color:var(--ink-soft);margin-top:3px}
  .card{background:var(--panel);border:1px solid var(--line);border-radius:2px;padding:14px;margin:14px 0}
  .card h2{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--blue-mid);margin-bottom:8px}
  .gebieden-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;margin-top:8px}
  .gcard{display:block;background:var(--panel);border:1.5px solid var(--line);border-radius:2px;
    padding:12px;text-decoration:none;color:var(--ink);transition:border-color .15s}
  .gcard:hover{border-color:var(--ink)}
  .gcard-top{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
  .gcard-status{font-size:10px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--alert)}
  .badge-richtlijn{font-size:10px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;
    padding:2px 8px;background:var(--n2k-bg);color:var(--n2k-text);border-radius:8px}
  .gcard h3{font-family:Palatino,Georgia,serif;font-size:16px;margin-top:6px;line-height:1.25}
  .gcard-sub{font-size:12px;color:var(--ink-soft);margin-top:3px}
  .gcard-stats{display:flex;gap:14px;margin-top:10px;font-size:12px;color:var(--ink-soft)}
  .gcard-stats b{color:var(--ink);font-size:14px;font-family:Palatino,Georgia,serif}
  .jumpnav{display:flex;flex-wrap:wrap;gap:6px;margin:16px 0}
  .jumpnav a{font-size:12px;padding:4px 10px;border:1px solid var(--line);border-radius:12px;
    background:var(--panel);color:var(--ink);text-decoration:none}
  .jumpnav a:hover{border-color:var(--ink)}
  .jumpnav-note{font-size:12px;color:var(--ink-soft);margin:-8px 0 4px}
  footer{margin-top:22px;font-size:12px;color:var(--ink-soft);border-top:1px solid var(--line);padding-top:14px}
  footer p{margin-bottom:8px}
  @media (max-width:480px){ h1{font-size:24px} .stats{grid-template-columns:repeat(2,1fr)} }
</style>
</head>
<body>
<div class="wrap">
  <header>
    <div class="eyebrow">RCE &times; Kadaster &times; Natura 2000 &middot; linked data federatie</div>
    <h1>Rijksmonumentale boerderijen &amp; Natura 2000</h1>
    <p>Landsdekkend overzicht van rijksmonumentale boerderijen binnen 5&nbsp;km van een Natura
    2000-gebied. Vijf kilometer is een gekozen selectievenster, geen ecologische invloedssfeer &mdash;
    en dit gebruikt vooralsnog alle Natura 2000-gebieden, niet alleen de als stikstofgevoelig
    gemarkeerde subset (zie Methode). Opgebouwd gebied voor gebied &mdash; niet in &eacute;&eacute;n keer
    alle rijksmonumentale boerderijen in Nederland, maar per Natura 2000-gebied, zodat elk gebied
    apart te controleren en te verifi&euml;ren is voordat het volgende wordt toegevoegd. Provincie is
    hierbij een weergavelaag, geen zoekgrens: een gebied dat over een provinciegrens heen ligt wordt
    in zijn geheel behandeld.</p>
  </header>

  <div class="stats">
    <div class="stat"><div class="num">${totaal.gebieden}</div><div class="lbl">natura 2000-gebieden verwerkt</div></div>
    <div class="stat"><div class="num">${totaal.n}</div><div class="lbl">rijksmonumentale boerderijen</div></div>
    <div class="stat alert"><div class="num">${totaal.ja}</div><div class="lbl">BAG-industriefunctie-indicatie</div></div>
    <div class="stat neutral"><div class="num">${totaal.onbekend}</div><div class="lbl">BAG niet te controleren</div></div>
  </div>

  <div class="jumpnav">${jumpNav}</div>
  <p class="jumpnav-note">Provincie is een weergavelaag: een gebied dat over een provinciegrens
  heen ligt (bv. Rijntakken, Gelderland/Overijssel) staat in elke provincie waarin het (deels) ligt
  &mdash; het aantal gebieden per sectie telt dus niet op tot ${totaal.gebieden}.</p>
${provincieSections}

  <footer>
    <p><b>Methode.</b> Per Natura 2000-gebied: rijksmonumenten met oorspronkelijke functie boerderij ophalen
    (RCE CHO), de daadwerkelijke afstand tot de gebiedsrand berekenen (geen bounding box), provincie
    onafhankelijk bepalen via een point-in-polygon-toets tegen de PDOK-bestuurlijke grenzen, en een
    een BAG-industriefunctie-indicatie toevoegen via BAG-gebruiksdoel (industriefunctie op het adres
    is een aanwijzing, geen bewijs van actieve bedrijfsvoering).</p>
    <p><b>Let op dubbeltelling in de totalen.</b> Een monument dat dicht bij meerdere Natura 2000-gebieden
    ligt telt in elke relevante gebiedspagina mee &mdash; terecht, want het is voor elk van die gebieden
    relevant. De totalen hierboven zijn dus een som van per-gebied cijfers, geen aantal unieke monumenten
    landelijk.</p>
    <p><b>Kanttekeningen.</b> Dit zijn blootstellingskaarten: er is g&eacute;&eacute;n emissiedata (AERIUS/RAV)
    verwerkt. De oorspronkelijke functie zegt niet dat er nu een agrarisch bedrijf gevestigd is; de
    industriefunctie-vlag is een indicatie, geen bewijs.</p>
  </footer>
</div>
</body>
</html>
`;

fs.writeFileSync(OUT, html);
console.log(`written ${OUT} (${gebieden.length} gebieden uit data/gebieden/*/data.json)`);
