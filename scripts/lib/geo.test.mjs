import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  pointInRing, pointInPolygonWithHoles, pointInAnyPolygon,
  distanceToPolygonsMeters, classifyPoint, bboxOfRings, flattenRings
} from './geo.mjs';

const EENHEIDSVIERKANT = [[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]];

test('pointInRing: punt duidelijk binnen een vierkant', () => {
  assert.equal(pointInRing(0.5, 0.5, EENHEIDSVIERKANT), true);
});

test('pointInRing: punt duidelijk buiten een vierkant', () => {
  assert.equal(pointInRing(2, 2, EENHEIDSVIERKANT), false);
  assert.equal(pointInRing(-1, 0.5, EENHEIDSVIERKANT), false);
});

test('pointInRing: werkt ook voor een concave (L-vormige) ring, niet alleen de bounding box', () => {
  // L-vorm: vierkant [0,2]x[0,2] met de rechterbovenkwadrant [1,2]x[1,2] eruit gesneden.
  const lVorm = [[0, 0], [2, 0], [2, 1], [1, 1], [1, 2], [0, 2], [0, 0]];
  assert.equal(pointInRing(0.5, 0.5, lVorm), true, 'punt in het brede onderste deel');
  assert.equal(pointInRing(1.5, 1.5, lVorm), false, 'punt in de uitgesneden hoek (zou binnen de bounding box liggen)');
});

test('pointInPolygonWithHoles: punt binnen buitenring maar buiten alle gaten', () => {
  const gat = [[0.4, 0.4], [0.6, 0.4], [0.6, 0.6], [0.4, 0.6], [0.4, 0.4]];
  const poly = [EENHEIDSVIERKANT, gat];
  assert.equal(pointInPolygonWithHoles(0.1, 0.1, poly), true);
});

test('pointInPolygonWithHoles: punt binnen een gat telt niet als binnen de polygon', () => {
  const gat = [[0.4, 0.4], [0.6, 0.4], [0.6, 0.6], [0.4, 0.6], [0.4, 0.4]];
  const poly = [EENHEIDSVIERKANT, gat];
  assert.equal(pointInPolygonWithHoles(0.5, 0.5, poly), false);
});

test('pointInPolygonWithHoles: punt buiten de buitenring telt niet, ook al ligt het niet in een gat', () => {
  const gat = [[0.4, 0.4], [0.6, 0.4], [0.6, 0.6], [0.4, 0.6], [0.4, 0.4]];
  const poly = [EENHEIDSVIERKANT, gat];
  assert.equal(pointInPolygonWithHoles(5, 5, poly), false);
});

test('pointInAnyPolygon: punt in een van meerdere losse polygons', () => {
  const polyA = [EENHEIDSVIERKANT];
  const polyB = [[[10, 10], [11, 10], [11, 11], [10, 11], [10, 10]]];
  assert.equal(pointInAnyPolygon(0.5, 0.5, [polyA, polyB]), true);
  assert.equal(pointInAnyPolygon(10.5, 10.5, [polyA, polyB]), true);
});

test('pointInAnyPolygon: punt in geen van de polygons', () => {
  const polyA = [EENHEIDSVIERKANT];
  const polyB = [[[10, 10], [11, 10], [11, 11], [10, 11], [10, 10]]];
  assert.equal(pointInAnyPolygon(5, 5, [polyA, polyB]), false);
});

const DEG_TO_M = 111320;

test('distanceToPolygonsMeters: loodrecht op het midden van een rand', () => {
  const polys = [[EENHEIDSVIERKANT]];
  const d = distanceToPolygonsMeters(0.5, -0.1, polys, 1);
  assert.ok(Math.abs(d - 0.1 * DEG_TO_M) < 1, `verwacht ~${0.1 * DEG_TO_M}, kreeg ${d}`);
});

test('distanceToPolygonsMeters: dichtstbijzijnde punt is een hoekpunt (t geklemd op het segmenteinde)', () => {
  const polys = [[EENHEIDSVIERKANT]];
  const d = distanceToPolygonsMeters(1.5, 1.5, polys, 1);
  const verwacht = Math.sqrt(0.5 ** 2 + 0.5 ** 2) * DEG_TO_M;
  assert.ok(Math.abs(d - verwacht) < 1, `verwacht ~${verwacht}, kreeg ${d}`);
});

test('distanceToPolygonsMeters: telt ook de rand van een gat mee als "de rand"', () => {
  const gat = [[0.4, 0.4], [0.6, 0.4], [0.6, 0.6], [0.4, 0.6], [0.4, 0.4]];
  const polys = [[EENHEIDSVIERKANT, gat]];
  // Punt op (0.5, 0.5) zit midden in het gat; de rand van het gat is dichterbij
  // dan de rand van het buitenvierkant.
  const dTotGat = distanceToPolygonsMeters(0.5, 0.5, polys, 1);
  const verwachtTotGat = 0.1 * DEG_TO_M; // afstand tot dichtstbijzijnde gatrand
  assert.ok(Math.abs(dTotGat - verwachtTotGat) < 1, `verwacht ~${verwachtTotGat}, kreeg ${dTotGat}`);
});

test('distanceToPolygonsMeters: latCos schaalt de oost-westafstand correct', () => {
  const polys = [[EENHEIDSVIERKANT]];
  // Bij latCos=0.5 (hoge breedtegraad) weegt een oost-west-afwijking half zo zwaar
  // mee in de afstandsberekening als bij de evenaar.
  const dEvenaar = distanceToPolygonsMeters(1.5, 0.5, polys, 1);
  const dHogeBreedte = distanceToPolygonsMeters(1.5, 0.5, polys, 0.5);
  assert.ok(dHogeBreedte < dEvenaar, 'kleinere latCos moet een kortere berekende afstand geven voor eenzelfde punt');
});

test('classifyPoint: punt binnen het gebied geeft erin=true', () => {
  const polys = [[EENHEIDSVIERKANT]];
  const { erin } = classifyPoint(0.5, 0.5, polys);
  assert.equal(erin, true);
});

test('classifyPoint: punt buiten het gebied geeft erin=false en een positieve afstand', () => {
  const polys = [[EENHEIDSVIERKANT]];
  const { erin, distM } = classifyPoint(0.5, 1.1, polys);
  assert.equal(erin, false);
  assert.ok(distM > 0);
  assert.ok(Math.abs(distM - Math.round(0.1 * DEG_TO_M)) <= 1);
});

test('bboxOfRings: berekent de min/max over alle punten van alle ringen', () => {
  const ring1 = [[0, 0], [2, 0], [2, 2], [0, 2], [0, 0]];
  const ring2 = [[5, 5], [6, 5], [6, 6], [5, 6], [5, 5]];
  assert.deepEqual(bboxOfRings([ring1, ring2]), [0, 0, 6, 6]);
});

test('bboxOfRings: past de padding in graden toe aan alle zijden', () => {
  const ring1 = [[0, 0], [2, 0], [2, 2], [0, 2], [0, 0]];
  assert.deepEqual(bboxOfRings([ring1], 0.5), [-0.5, -0.5, 2.5, 2.5]);
});

test('flattenRings: haalt alle ringen van meerdere polygons naar één platte array, met behoud van volgorde', () => {
  const polyA = [['ringA-buiten'], ['ringA-gat']];
  const polyB = [['ringB-buiten']];
  assert.deepEqual(flattenRings([polyA, polyB]), [['ringA-buiten'], ['ringA-gat'], ['ringB-buiten']]);
});
