// Geometrische hulpfuncties, gedeeld door alle stappen van de pijplijn.
// Alles werkt in WGS84 (lon, lat) graden; afstanden worden lokaal plat benaderd
// (equirect. met een lengtegraad-correctie op basis van cos(lat)), voldoende
// nauwkeurig op de schaal van een enkel Natura 2000-gebied (nooit meer dan
// enkele tientallen km breed).

const DEG_TO_M = 111320;

export function pointInRing(px, py, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0], yi = ring[i][1], xj = ring[j][0], yj = ring[j][1];
    const intersect = ((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// poly = [buitenring, gat1, gat2, ...] (GeoJSON Polygon-conventie)
export function pointInPolygonWithHoles(px, py, poly) {
  if (!pointInRing(px, py, poly[0])) return false;
  for (let h = 1; h < poly.length; h++) {
    if (pointInRing(px, py, poly[h])) return false;
  }
  return true;
}

// polys = array van GeoJSON-achtige polygons (elk [buitenring, gat...])
export function pointInAnyPolygon(px, py, polys) {
  return polys.some(poly => pointInPolygonWithHoles(px, py, poly));
}

function pointToSegmentDistanceDeg(px, py, ax, ay, bx, by, latCos) {
  const dx = (bx - ax) * latCos, dy = by - ay;
  const wx = (px - ax) * latCos, wy = py - ay;
  const len2 = dx * dx + dy * dy;
  let t = len2 > 0 ? (wx * dx + wy * dy) / len2 : 0;
  t = Math.max(0, Math.min(1, t));
  const cx = ax + (t * dx) / latCos, cy = ay + t * dy;
  const ddx = (px - cx) * latCos, ddy = py - cy;
  return Math.sqrt(ddx * ddx + ddy * ddy);
}

// Kortste afstand (in meter) van een punt tot de rand van een set polygons
// (alle ringen meegerekend, dus ook gaten -- een gat-rand is ook "de rand").
export function distanceToPolygonsMeters(px, py, polys, latCos) {
  let best = Infinity;
  polys.forEach(poly => {
    poly.forEach(ring => {
      for (let i = 0; i < ring.length - 1; i++) {
        const [ax, ay] = ring[i], [bx, by] = ring[i + 1];
        const d = pointToSegmentDistanceDeg(px, py, ax, ay, bx, by, latCos);
        if (d < best) best = d;
      }
    });
  });
  return best * DEG_TO_M;
}

// Classificeert een punt tegen een gebied: erin (point-in-polygon, incl. gaten)
// en de afstand in meter tot de daadwerkelijke rand (niet tot een bounding box).
export function classifyPoint(lon, lat, polys) {
  const latCenter = polys[0][0].reduce((s, p) => s + p[1], 0) / polys[0][0].length;
  const latCos = Math.cos((latCenter * Math.PI) / 180);
  const erin = pointInAnyPolygon(lon, lat, polys);
  const distM = Math.round(distanceToPolygonsMeters(lon, lat, polys, latCos));
  return { erin, distM };
}

export function bboxOfRings(rings, padDeg = 0) {
  let lons = [], lats = [];
  rings.forEach(r => r.forEach(p => { lons.push(p[0]); lats.push(p[1]); }));
  return [
    Math.min(...lons) - padDeg,
    Math.min(...lats) - padDeg,
    Math.max(...lons) + padDeg,
    Math.max(...lats) + padDeg
  ];
}

export function flattenRings(polys) {
  const rings = [];
  polys.forEach(poly => poly.forEach(r => rings.push(r)));
  return rings;
}
