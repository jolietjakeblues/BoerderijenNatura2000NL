import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normHuisnr, matchGebruiksdoel } from './adres-match.mjs';

test('normHuisnr splitst cijfer en huisletter', () => {
  assert.deepEqual(normHuisnr('22'), { nr: 22, letter: '' });
  assert.deepEqual(normHuisnr('22a'), { nr: 22, letter: 'A' });
  assert.deepEqual(normHuisnr('22 A'), { nr: 22, letter: 'A' });
  assert.deepEqual(normHuisnr('130 B'), { nr: 130, letter: 'B' });
});

test('normHuisnr geeft nr:null bij onherkenbare invoer', () => {
  assert.deepEqual(normHuisnr(''), { nr: null, letter: '' });
  assert.deepEqual(normHuisnr(null), { nr: null, letter: '' });
  assert.deepEqual(normHuisnr('ongeldig'), { nr: null, letter: '' });
});

// Regressietest: rmnr 37890 (Geleenbeekdal), gevonden via externe review.
// RCE levert de straatnaam als "Op Gen Hek", de BAG als "Op gen Hek". De
// vroegere clientside detailpaneel-logica vergeleek ook op straatnaam
// (hoofdlettergevoelig) en miste deze match daardoor, terwijl de eigenlijke
// BAG-koppeling (lib/bag.mjs, matcht nooit op straat) allang correct was.
test('matchGebruiksdoel vindt een match ondanks afwijkende hoofdletters in de straatnaam (rmnr 37890)', () => {
  const adres = { straat: 'Op Gen Hek', huisnr: '22', postcode: '6367GL', woonplaats: 'Voerendaal' };
  const matched = [
    { straat: 'Op gen Hek', huisnummer: 22, huisletter: '', postcode: '6367GL', gebruiksdoel: 'woonfunctie' }
  ];
  assert.equal(matchGebruiksdoel(adres, matched), 'woonfunctie');
});

test('matchGebruiksdoel matcht op postcode + huisnummer + huisletter, niet op straatnaam', () => {
  const adres = { straat: 'Een Heel Andere Naam', huisnr: '5', postcode: '1234AB', woonplaats: 'X' };
  const matched = [
    { straat: 'Origineel Anders Gespeld', huisnummer: 5, huisletter: '', postcode: '1234AB', gebruiksdoel: 'industriefunctie,woonfunctie' }
  ];
  assert.equal(matchGebruiksdoel(adres, matched), 'industriefunctie,woonfunctie');
});

test('matchGebruiksdoel onderscheidt huisletters correct (geen kruismatch tussen 31A en 31B)', () => {
  const adres = { straat: 'Straat', huisnr: '31 B', postcode: '1111AA', woonplaats: 'X' };
  const matched = [
    { straat: 'Straat', huisnummer: 31, huisletter: 'A', postcode: '1111AA', gebruiksdoel: 'woonfunctie' },
    { straat: 'Straat', huisnummer: 31, huisletter: 'B', postcode: '1111AA', gebruiksdoel: 'industriefunctie,woonfunctie' }
  ];
  assert.equal(matchGebruiksdoel(adres, matched), 'industriefunctie,woonfunctie');
});

test('matchGebruiksdoel geeft null als er geen treffer is', () => {
  const adres = { straat: 'Straat', huisnr: '1', postcode: '1111AA', woonplaats: 'X' };
  assert.equal(matchGebruiksdoel(adres, []), null);
  assert.equal(matchGebruiksdoel(adres, [{ straat: 'Straat', huisnummer: 2, huisletter: '', postcode: '1111AA', gebruiksdoel: 'woonfunctie' }]), null);
});

test('matchGebruiksdoel gebruikt de eerste treffer bij meerdere kandidaten op hetzelfde adres', () => {
  const adres = { straat: 'Straat', huisnr: '1', postcode: '1111AA', woonplaats: 'X' };
  const matched = [
    { straat: 'Straat', huisnummer: 1, huisletter: '', postcode: '1111AA', gebruiksdoel: 'woonfunctie' },
    { straat: 'Straat', huisnummer: 1, huisletter: '', postcode: '1111AA', gebruiksdoel: 'industriefunctie,woonfunctie' }
  ];
  assert.equal(matchGebruiksdoel(adres, matched), 'woonfunctie');
});
