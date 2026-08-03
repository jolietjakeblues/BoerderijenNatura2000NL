// Koppelt één RCE-adres aan het bijbehorende BAG-gebruiksdoel.
//
// Gevonden via een externe review (rmnr 37890, Geleenbeekdal): het
// detailpaneel op de gebiedspagina deed deze koppeling clientside opnieuw,
// en vergeleek daarbij ook de straatnaam als sleutel ("Op Gen Hek" vs.
// "Op gen Hek" -- hoofdlettergevoelig, dus geen match, terwijl de BAG-
// koppeling zelf al correct had plaatsgevonden). De echte, unieke sleutel in
// de BAG is postcode + huisnummer + huisletter (zie lib/bag.mjs, dat óók
// nooit op straatnaam matcht) -- straat wordt hier daarom bewust helemaal
// niet als vergelijkingssleutel gebruikt, niet eens hoofdletter-ongevoelig:
// straatnamen kunnen ook verschillen in spelling, afkorting of spatiëring,
// en postcode+huisnummer+huisletter is altijd voldoende.

export function normHuisnr(h) {
  const m = String(h || '').trim().match(/^(\d+)\s*([A-Za-z]?)$/);
  if (!m) return { nr: null, letter: '' };
  return { nr: parseInt(m[1], 10), letter: m[2].toUpperCase() };
}

// adres: {straat, huisnr, postcode, woonplaats}
// matched: [{straat, huisnummer, huisletter, postcode, gebruiksdoel}, ...] (uit lib/bag.mjs)
// Retourneert het gebruiksdoel-veld van de eerste treffer, of null.
export function matchGebruiksdoel(adres, matched) {
  const target = normHuisnr(adres.huisnr);
  const treffer = (matched || []).find(x =>
    x.postcode === adres.postcode &&
    x.huisnummer === target.nr &&
    String(x.huisletter || '').toUpperCase() === target.letter
  );
  return treffer ? treffer.gebruiksdoel : null;
}
