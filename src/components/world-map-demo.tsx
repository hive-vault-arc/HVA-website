import { WorldMap } from "./ui/world-map";
import { WORLD_MAP_DOTS } from "../data/worldMapDots";

export function WorldMapDemo() {
  return (
    <div className="w-full pt-4 pb-12">
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
      <div className="max-w-6xl mx-auto px-4 mt-7">
        <WorldMap dots={WORLD_MAP_DOTS} lineColor="#0984E3" />
      </div>
    </div>
  );
}
