import { WorldMap } from "./ui/world-map";

export function WorldMapDemo() {
  return (
    <div className="py-20  w-full">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="font-bold text-3xl md:text-7xl text-white mb-6">
          Global Reach, Local Impact
        </p>
        <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
          Our team spans across the globe, working together seamlessly to deliver
          exceptional results for our clients, no matter where they are located.
          Global Reach, Local Impact
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-12">
        <WorldMap
        dots={[
          // Africa to Europe
          {
            start: { lat: 22.9716, lng: -6.8498 }, // Casablanca, Morocco
            end: { lat: 40.4168, lng: -3.7038 },   // Madrid, Spain
          },
          // Europe to Middle East
          {
            start: { lat: 41.0082, lng: 28.9784 }, // Istanbul, Turkey
            end: { lat: 24.7136, lng: 46.6753 },   // Riyadh, Saudi Arabia
          },
          // Middle East to Asia
          {
            start: { lat: 24.7136, lng: 46.6753 }, // Riyadh, Saudi Arabia
            end: { lat: 28.6139, lng: 77.2090 },   // New Delhi, India
          },
          // Africa to Middle East
          {
            start: { lat: 30.0444, lng: 31.2357 }, // Cairo, Egypt
            end: { lat: 24.7136, lng: 46.6753 },   // Riyadh, Saudi Arabia
          },
          // Europe to Asia
          {
            start: { lat: 55.7558, lng: 37.6173 }, // Moscow, Russia
            end: { lat: 39.9042, lng: 116.4074 },  // Beijing, China
          },
          // Additional connection in Africa
          {
            start: { lat: -33.8688, lng: 18.5204 }, // Cape Town, South Africa
            end: { lat: 30.0444, lng: 31.2357 },    // Cairo, Egypt
          }
        ]}
          lineColor="#9333ea" // Purple color to match your theme
        />
      </div>
    </div>
  );
}
