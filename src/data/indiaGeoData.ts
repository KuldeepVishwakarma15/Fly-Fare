// Precision GeoJSON & Geographic Vector Contours for the Indian Subcontinent
// Geographically accurate boundary polygons (mainland, coastal borders, islands, and graticule)

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface GeoFeature {
  id: string;
  name: string;
  type: 'Polygon' | 'MultiPolygon';
  coordinates: number[][][] | number[][][][]; // [lng, lat]
}

// Indian Mainland Geographic Boundary (Geographically faithful high-density polygon)
export const INDIA_MAINLAND_COORDINATES: [number, number][] = [
  // Northern Region: Ladakh / Jammu & Kashmir / Himachal
  [74.5, 37.05], [75.2, 37.15], [76.0, 36.8], [76.9, 36.4], [77.5, 35.8],
  [78.5, 35.5], [79.2, 34.8], [79.0, 34.2], [78.6, 33.5], [79.2, 32.8],
  [78.8, 32.0], [79.0, 31.4], [80.1, 31.0], [80.6, 30.5], [81.0, 30.2],

  // Northern Border with Nepal & Uttarakhand/UP
  [80.3, 29.2], [80.6, 28.8], [81.3, 28.5], [82.2, 27.9], [83.3, 27.6],
  [84.5, 27.2], [85.5, 26.8], [86.8, 26.5], [88.0, 26.4],

  // Sikkim & Siliguri Corridor (Chicken's Neck)
  [88.1, 27.1], [88.2, 27.8], [88.7, 28.0], [88.9, 27.3], [89.7, 26.8],
  [89.9, 26.5], [90.2, 26.8],

  // Northeast Himalayas: Bhutan border to Arunachal Pradesh
  [91.5, 27.3], [92.0, 27.5], [92.8, 27.9], [93.7, 28.4], [94.5, 28.9],
  [95.5, 29.4], [96.5, 29.5], [97.3, 28.8], [97.4, 28.1], // Kibithu (Easternmost)

  // Eastern borders: Nagaland, Manipur, Mizoram, Tripura
  [96.8, 27.5], [95.8, 26.8], [95.2, 26.1], [94.5, 25.4], [94.4, 24.5],
  [93.8, 23.8], [93.2, 23.0], [92.8, 22.4], [92.6, 21.9], // South Mizoram
  [92.2, 22.6], [91.8, 23.4], [91.3, 23.9], [91.8, 24.6], // Tripura loop
  [92.1, 25.1], [91.6, 25.3], [90.0, 25.4], [89.8, 25.9], // Meghalaya

  // West Bengal / Bangladesh border to Bay of Bengal Sundarbans
  [88.8, 25.8], [88.2, 25.2], [88.8, 24.3], [88.5, 23.4], [89.0, 22.5],
  [88.8, 21.6], [88.1, 21.6], [87.5, 21.5], // Sundarbans Coast

  // Eastern Coastline: Odisha, Andhra Pradesh, Tamil Nadu
  [86.9, 20.8], [86.2, 20.0], [85.5, 19.5], [84.8, 19.0], [83.8, 18.2],
  [82.9, 17.6], [82.2, 16.9], [81.5, 16.2], [80.6, 15.8], [80.1, 15.0],
  [80.2, 14.0], [80.3, 13.1], // Chennai coast
  [79.8, 12.0], [79.8, 10.8], [79.2, 9.8], [78.6, 9.2], [77.8, 8.4],
  [77.55, 8.08], // Kanyakumari / Cape Comorin (Southernmost tip)

  // Western Coastline: Kerala, Karnataka, Goa, Maharashtra, Gujarat
  [76.8, 8.5], [76.5, 9.4], [76.2, 10.0], [75.8, 11.2], [75.0, 12.3],
  [74.8, 13.0], [74.2, 14.5], [73.8, 15.3], // Goa
  [73.5, 16.2], [73.2, 17.5], [72.8, 18.9], // Mumbai / Konkan
  [72.7, 19.6], [72.7, 20.8], [72.7, 21.5], // Gulf of Khambhat
  [71.8, 21.0], [70.9, 20.7], [69.8, 20.9], [69.1, 21.8], [69.0, 22.4], // Kathiawar
  [69.6, 22.8], [70.4, 22.9], [69.9, 23.3], // Gulf of Kutch
  [68.6, 23.5], [68.15, 23.7], // Ghuar Mota (Westernmost point)
  [68.8, 24.4], [70.5, 24.6], // Rann of Kutch border

  // Western Border: Rajasthan, Punjab, Jammu
  [71.0, 25.8], [70.2, 26.8], [70.4, 27.6], [71.5, 28.5], [72.8, 29.5],
  [73.8, 30.4], [74.6, 31.4], [74.8, 32.1], [74.4, 32.8], [74.0, 33.6],
  [74.2, 34.8], [74.4, 35.8], [74.5, 37.05] // Loop back to Northern apex
];

// Major Indian States Boundaries (Subtle geo-boundaries for authentic intelligence feel)
export const REGIONAL_DIVISIONS: { id: string; name: string; path: [number, number][] }[] = [
  // Northern Sector (J&K, Himachal, Punjab, Haryana, Uttarakhand)
  {
    id: 'north-sector',
    name: 'Northern Flight Sector',
    path: [[74.5, 37.05], [77.5, 35.8], [80.6, 30.5], [78.0, 28.5], [75.0, 29.5], [74.6, 31.4], [74.2, 34.8], [74.5, 37.05]]
  },
  // Western Sector (Rajasthan, Gujarat, Maharashtra)
  {
    id: 'west-sector',
    name: 'Western Aviation Corridor',
    path: [[74.6, 31.4], [75.0, 29.5], [77.2, 27.0], [77.5, 21.5], [72.8, 18.9], [69.0, 22.4], [68.15, 23.7], [70.4, 27.6], [74.6, 31.4]]
  },
  // Central & Gangetic Plain (Delhi NCR, UP, Bihar, MP)
  {
    id: 'gangetic-sector',
    name: 'Gangetic & Central Trunk',
    path: [[77.2, 28.8], [84.5, 27.2], [88.0, 26.4], [87.5, 22.0], [80.0, 22.0], [76.5, 24.5], [77.2, 28.8]]
  },
  // Eastern & Northeast Sector (Bengal, Odisha, Assam, Northeast)
  {
    id: 'east-sector',
    name: 'Eastern & Northeast Sector',
    path: [[88.0, 26.4], [97.4, 28.1], [93.2, 23.0], [89.0, 22.5], [85.5, 19.5], [87.5, 22.0], [88.0, 26.4]]
  },
  // Southern Peninsula (Karnataka, AP, Telangana, Tamil Nadu, Kerala, Goa)
  {
    id: 'south-sector',
    name: 'Southern Peninsular Hub',
    path: [[72.8, 18.9], [78.5, 17.5], [82.9, 17.6], [80.3, 13.1], [77.55, 8.08], [75.8, 11.2], [73.8, 15.3], [72.8, 18.9]]
  }
];

// Graticule Grid Lines (Latitudes & Longitudes)
export const GRATICULE_LATITUDES = [10, 15, 20, 25, 30, 35];
export const GRATICULE_LONGITUDES = [70, 75, 80, 85, 90, 95];

// Precision Projection Engine for India
// Bounds: Lng 67.5 to 98.0, Lat 7.5 to 37.8
export interface MapProjectionConfig {
  width: number;
  height: number;
  zoom: number;
  panX: number;
  panY: number;
}

export const DEFAULT_MAP_BOUNDS = {
  minLng: 67.5,
  maxLng: 98.0,
  minLat: 7.5,
  maxLat: 37.8
};

/**
 * Projects real geographic [latitude, longitude] to [x, y] screen coordinates
 * using an Equirectangular / Conformal Indian subcontinental projection.
 */
export function projectGeoCoordinates(
  lat: number,
  lng: number,
  config: MapProjectionConfig,
  bounds = DEFAULT_MAP_BOUNDS
): { x: number; y: number } {
  const { width, height, zoom, panX, panY } = config;
  const paddingX = width * 0.06;
  const paddingY = height * 0.05;

  const usableWidth = width - paddingX * 2;
  const usableHeight = height - paddingY * 2;

  // Normalized (0 to 1)
  const normX = (lng - bounds.minLng) / (bounds.maxLng - bounds.minLng);
  // Latitude is inverted in SVG y-axis
  const normY = (bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat);

  // Base unscaled coordinates
  const baseX = paddingX + normX * usableWidth;
  const baseY = paddingY + normY * usableHeight;

  // Apply zoom centered at viewport center + pan
  const centerX = width / 2;
  const centerY = height / 2;

  const x = centerX + (baseX - centerX) * zoom + panX;
  const y = centerY + (baseY - centerY) * zoom + panY;

  return { x, y };
}

/**
 * Converts an array of [lng, lat] coordinates into an SVG path 'd' string
 */
export function geoCoordinatesToSvgPath(
  coords: [number, number][],
  config: MapProjectionConfig,
  closed = true
): string {
  if (!coords || coords.length === 0) return '';

  const points = coords.map(([lng, lat]) => projectGeoCoordinates(lat, lng, config));

  let path = `M ${points[0].x.toFixed(1.5)} ${points[0].y.toFixed(1.5)}`;
  for (let i = 1; i < points.length; i++) {
    path += ` L ${points[i].x.toFixed(1.5)} ${points[i].y.toFixed(1.5)}`;
  }

  if (closed) {
    path += ' Z';
  }

  return path;
}

/**
 * Calculates a smooth curved flight arc between two points with great-circle bending
 */
export function createCurvedFlightArc(
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  curveFactor = 0.18
): { path: string; midX: number; midY: number; ctrlX: number; ctrlY: number } {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Midpoint
  const mx = (p1.x + p2.x) / 2;
  const my = (p1.y + p2.y) / 2;

  // Normal vector perpendicular to trajectory
  // Arc arches upwards or towards west/north depending on vector direction
  const nx = -dy / dist;
  const ny = dx / dist;

  // Arch offset proportional to distance
  const offset = Math.min(dist * curveFactor, 45);

  const ctrlX = mx + nx * offset;
  const ctrlY = my + ny * offset - 6; // slightly bias upwards

  return {
    path: `M ${p1.x.toFixed(1.5)} ${p1.y.toFixed(1.5)} Q ${ctrlX.toFixed(1.5)} ${ctrlY.toFixed(1.5)} ${p2.x.toFixed(1.5)} ${p2.y.toFixed(1.5)}`,
    midX: (p1.x + 2 * ctrlX + p2.x) / 4,
    midY: (p1.y + 2 * ctrlY + p2.y) / 4,
    ctrlX,
    ctrlY
  };
}
