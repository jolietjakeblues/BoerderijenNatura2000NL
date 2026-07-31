// Bepaalt de provincie van een punt via point-in-polygon tegen de PDOK
// bestuurlijke-grenzenlaag -- onafhankelijk van het Natura 2000-gebied en van
// RCE (zie README, sectie "Methode per gebied", punt 4).
import { pointInPolygonWithHoles } from './geo.mjs';

export function findProvincie(lon, lat, provinciesGeoJSON) {
  for (const f of provinciesGeoJSON.features) {
    const polys = f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates];
    if (polys.some(poly => pointInPolygonWithHoles(lon, lat, poly))) {
      return f.properties.naam;
    }
  }
  return null;
}
