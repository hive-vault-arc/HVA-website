import { useRef, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Twitter, Linkedin, Github } from "lucide-react";
import type { WorldMapDot } from "../../data/worldMapDots";

interface MapProps {
  dots?: WorldMapDot[];
  lineColor?: string;
}

const projectPoint = (lat: number, lng: number) => {
  const x = (lng + 180) * (800 / 360);
  const y = (90 - lat) * (400 / 180);
  return { x, y };
};

const createCurvedPath = (
  start: { x: number; y: number },
  end: { x: number; y: number }
) => {
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) - 50;
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
};

export function WorldMap({ dots = [], lineColor = "#0ea5e9" }: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgMap, setSvgMap] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadDottedMap = async () => {
      const { default: DottedMap } = await import("dotted-map");
      if (!isMounted) return;

      const isDark = document.documentElement.classList.contains("dark");
      const dottedMap = new DottedMap({ height: 100, grid: "diagonal" });
      const mapSvg = dottedMap.getSVG({
        radius: 0.22,
        color: isDark ? "#FFFFFF40" : "#00000040",
        shape: "circle",
        backgroundColor: "white",
      });

      if (isMounted) {
        setSvgMap(mapSvg);
      }
    };

    loadDottedMap();
    return () => {
      isMounted = false;
    };
  }, []);

  const projectedDots = useMemo(
    () =>
      dots.map((dot) => {
        const startPoint = projectPoint(dot.start.lat, dot.start.lng);
        const endPoint = projectPoint(dot.end.lat, dot.end.lng);
        return {
          startPoint,
          endPoint,
          path: createCurvedPath(startPoint, endPoint),
        };
      }),
    [dots]
  );

  return (
    <div>
    <div className="w-full aspect-[2/1] bg-[#F5F6FA] relative font-sans rounded-2xl border border-[#1E272E]/10">
      <div 
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] pointer-events-none select-none"
        dangerouslySetInnerHTML={{ __html: svgMap }}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {projectedDots.map((dot, i) => {
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={dot.path}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: 1,
                }}
                transition={{
                  duration: 1,
                  delay: 0.5 * i,
                  ease: "easeOut",
                }}
                key={`start-upper-${i}`}
              ></motion.path>
            </g>
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="black" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </linearGradient>
        </defs>

        {projectedDots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g key={`start-${i}`}>
              <circle
                cx={dot.startPoint.x}
                cy={dot.startPoint.y}
                r="2"
                fill={lineColor}
              />
              <circle
                cx={dot.startPoint.x}
                cy={dot.startPoint.y}
                r="2"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="2"
                  to="8"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
            <g key={`end-${i}`}>
              <circle
                cx={dot.endPoint.x}
                cy={dot.endPoint.y}
                r="2"
                fill={lineColor}
              />
              <circle
                cx={dot.endPoint.x}
                cy={dot.endPoint.y}
                r="2"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="2"
                  to="8"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        ))}
      </svg>
    </div>
    <div className="w-full bg-white/90 p-6 md:p-8 mt-6 rounded-xl border border-[#1E272E]/10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-[#1E272E] flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-[#0984E3]" />
            Our Office
          </h3>
          <p className="text-[#1E272E]/70 text-sm">AVENUE TARIK IBN ZIAD N 38</p>
          <p className="text-[#1E272E]/70 text-sm">ETAGE 6 N 32 TANGER</p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-[#1E272E] flex items-center">
            <Phone className="w-5 h-5 mr-2 text-[#0984E3]" />
            Contact Us
          </h3>
          <p className="text-[#1E272E]/70 text-sm">+212688270772</p>
          <p className="text-[#1E272E]/70 text-sm">+212 691-918296</p>
          <p className="text-[#1E272E]/70 text-sm">Mon - Fri: 9:00 - 18:00</p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-[#1E272E] flex items-center">
            <Mail className="w-5 h-5 mr-2 text-[#0984E3]" />
            Get In Touch
          </h3>
          <p className="text-[#1E272E]/70 text-sm">khalid.chelhi@outlook.fr</p>
          <p className="text-[#1E272E]/70 text-sm">ali.amrani.dev@gmail.com</p>
          <div className="flex space-x-4 pt-2">
            <a href="https://x.com" target="_blank" rel="noreferrer noopener" className="text-[#0984E3] hover:text-[#1E272E] transition-colors" aria-label="X (Twitter)">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer noopener" className="text-[#0984E3] hover:text-[#1E272E] transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer noopener" className="text-[#0984E3] hover:text-[#1E272E] transition-colors" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-[#1E272E]/10 text-center">
        <p className="text-sm text-[#1E272E]/60">
          © {new Date().getFullYear()} H.V.A. All rights reserved.
        </p>
      </div>
    </div>
    </div>
    
  );
}
