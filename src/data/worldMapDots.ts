export type WorldMapDot = {
  start: { lat: number; lng: number; label?: string };
  end: { lat: number; lng: number; label?: string };
};

type Coordinate = [number, number];
type RouteTuple = [Coordinate, Coordinate];

const ROUTES: RouteTuple[] = [
  // Morocco -> Europe
  [[22.9716, -6.8498], [40.4168, -3.7038]], // Casablanca -> Madrid
  [[22.9716, -6.8498], [48.8566, 2.3522]], // Casablanca -> Paris
  [[22.9716, -6.8498], [51.5074, -0.1278]], // Casablanca -> London
  [[35.7595, -5.83395], [52.3676, 4.9041]], // Tangier -> Amsterdam
  [[35.7595, -5.83395], [50.1109, 8.6821]], // Tangier -> Frankfurt
  [[22.9716, -6.8498], [45.4642, 9.19]], // Casablanca -> Milan
  // Morocco -> Middle East
  [[22.9716, -6.8498], [25.2048, 55.2708]], // Casablanca -> Dubai
  [[22.9716, -6.8498], [24.7136, 46.6753]], // Casablanca -> Riyadh
  [[35.7595, -5.83395], [31.9539, 35.9106]], // Tangier -> Amman
  // Morocco -> North America
  [[22.9716, -6.8498], [40.7128, -74.006]], // Casablanca -> New York
  [[22.9716, -6.8498], [45.5017, -73.5673]], // Casablanca -> Montreal
  // Morocco -> Africa
  [[22.9716, -6.8498], [30.0444, 31.2357]], // Casablanca -> Cairo
  [[22.9716, -6.8498], [6.5244, 3.3792]], // Casablanca -> Lagos
  [[22.9716, -6.8498], [-1.2921, 36.8219]], // Casablanca -> Nairobi
  // Morocco -> Asia
  [[22.9716, -6.8498], [19.076, 72.8777]], // Casablanca -> Mumbai
  [[22.9716, -6.8498], [1.3521, 103.8198]], // Casablanca -> Singapore
  [[22.9716, -6.8498], [35.6762, 139.6503]], // Casablanca -> Tokyo
  // Additional global links
  [[41.0082, 28.9784], [24.7136, 46.6753]], // Istanbul -> Riyadh
  [[24.7136, 46.6753], [28.6139, 77.209]], // Riyadh -> New Delhi
  [[30.0444, 31.2357], [24.7136, 46.6753]], // Cairo -> Riyadh
  [[55.7558, 37.6173], [39.9042, 116.4074]], // Moscow -> Beijing
  [[-33.8688, 18.5204], [30.0444, 31.2357]], // Cape Town -> Cairo
];

export const WORLD_MAP_DOTS: WorldMapDot[] = ROUTES.map(([start, end]) => ({
  start: { lat: start[0], lng: start[1] },
  end: { lat: end[0], lng: end[1] },
}));

