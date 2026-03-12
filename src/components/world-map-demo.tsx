import { WorldMap } from "./ui/world-map";

export function WorldMapDemo() {
  return (
    <div className="py-12 w-full">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="font-bold text-3xl md:text-7xl text-[#1E272E] mb-6">
          Global Reach, Local Impact
        </p>
        <p className="text-sm md:text-lg text-neutral-400 max-w-3xl mx-auto py-2">
          We collaborate across regions to deliver consistent product quality and execution speed.
        </p>
        <p className="text-xs md:text-sm text-neutral-500 max-w-2xl mx-auto">
          Based in Morocco, delivering for clients worldwide.
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <WorldMap
        dots={[
          // Morocco -> Europe
          {
            start: { lat: 22.9716, lng: -6.8498 }, // Casablanca, Morocco
            end: { lat: 40.4168, lng: -3.7038 },   // Madrid, Spain
          },
          {
            start: { lat: 22.9716, lng: -6.8498 }, // Casablanca, Morocco
            end: { lat: 48.8566, lng: 2.3522 },    // Paris, France
          },
          {
            start: { lat: 22.9716, lng: -6.8498 }, // Casablanca, Morocco
            end: { lat: 51.5074, lng: -0.1278 },   // London, UK
          },
          {
            start: { lat: 35.7595, lng: -5.83395 }, // Tangier, Morocco
            end: { lat: 52.3676, lng: 4.9041 },     // Amsterdam, Netherlands
          },
          {
            start: { lat: 35.7595, lng: -5.83395 }, // Tangier, Morocco
            end: { lat: 50.1109, lng: 8.6821 },     // Frankfurt, Germany
          },
          {
            start: { lat: 22.9716, lng: -6.8498 }, // Casablanca, Morocco
            end: { lat: 45.4642, lng: 9.19 },      // Milan, Italy
          },
          // Morocco -> Middle East
          {
            start: { lat: 22.9716, lng: -6.8498 }, // Casablanca, Morocco
            end: { lat: 25.2048, lng: 55.2708 },   // Dubai, UAE
          },
          {
            start: { lat: 22.9716, lng: -6.8498 }, // Casablanca, Morocco
            end: { lat: 24.7136, lng: 46.6753 },   // Riyadh, Saudi Arabia
          },
          {
            start: { lat: 35.7595, lng: -5.83395 }, // Tangier, Morocco
            end: { lat: 31.9539, lng: 35.9106 },    // Amman, Jordan
          },
          // Morocco -> North America
          {
            start: { lat: 22.9716, lng: -6.8498 }, // Casablanca, Morocco
            end: { lat: 40.7128, lng: -74.0060 },  // New York, USA
          },
          {
            start: { lat: 22.9716, lng: -6.8498 }, // Casablanca, Morocco
            end: { lat: 45.5017, lng: -73.5673 },  // Montreal, Canada
          },
          // Morocco -> Africa
          {
            start: { lat: 22.9716, lng: -6.8498 }, // Casablanca, Morocco
            end: { lat: 30.0444, lng: 31.2357 },   // Cairo, Egypt
          },
          {
            start: { lat: 22.9716, lng: -6.8498 }, // Casablanca, Morocco
            end: { lat: 6.5244, lng: 3.3792 },     // Lagos, Nigeria
          },
          {
            start: { lat: 22.9716, lng: -6.8498 }, // Casablanca, Morocco
            end: { lat: -1.2921, lng: 36.8219 },   // Nairobi, Kenya
          },
          // Morocco -> Asia
          {
            start: { lat: 22.9716, lng: -6.8498 }, // Casablanca, Morocco
            end: { lat: 19.0760, lng: 72.8777 },   // Mumbai, India
          },
          {
            start: { lat: 22.9716, lng: -6.8498 }, // Casablanca, Morocco
            end: { lat: 1.3521, lng: 103.8198 },   // Singapore
          },
          {
            start: { lat: 22.9716, lng: -6.8498 }, // Casablanca, Morocco
            end: { lat: 35.6762, lng: 139.6503 },  // Tokyo, Japan
          },
          // Additional global links
          {
            start: { lat: 41.0082, lng: 28.9784 }, // Istanbul, Turkey
            end: { lat: 24.7136, lng: 46.6753 },   // Riyadh, Saudi Arabia
          },
          {
            start: { lat: 24.7136, lng: 46.6753 }, // Riyadh, Saudi Arabia
            end: { lat: 28.6139, lng: 77.2090 },   // New Delhi, India
          },
          {
            start: { lat: 30.0444, lng: 31.2357 }, // Cairo, Egypt
            end: { lat: 24.7136, lng: 46.6753 },   // Riyadh, Saudi Arabia
          },
          {
            start: { lat: 55.7558, lng: 37.6173 }, // Moscow, Russia
            end: { lat: 39.9042, lng: 116.4074 },  // Beijing, China
          },
          {
            start: { lat: -33.8688, lng: 18.5204 }, // Cape Town, South Africa
            end: { lat: 30.0444, lng: 31.2357 },    // Cairo, Egypt
          }
        ]}
          lineColor="#0984E3"
        />
      </div>
    </div>
  );
}
