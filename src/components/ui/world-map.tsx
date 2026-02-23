import { useRef, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";
import { MapPin, Phone, Mail, Twitter, Linkedin, Github } from "lucide-react";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

export function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const map = useMemo(() => new DottedMap({ height: 100, grid: "diagonal" }), []);

  const [svgMap, setSvgMap] = useState("");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    const mapSvg = map.getSVG({
      radius: 0.22,
      color: isDark ? "#FFFFFF40" : "#00000040",
      shape: "circle",
      backgroundColor: "white",
    });
    setSvgMap(mapSvg);
  }, [map]);

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
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
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

        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g key={`start-${i}`}>
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="2"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
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
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="2"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
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
    <div className="w-full bg-white/80 backdrop-blur-sm p-6 md:p-8 mt-6 rounded-xl border border-[#1E272E]/10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-[#1E272E] flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-[#0984E3]" />
            Our Office
          </h3>
          <p className="text-[#1E272E]/70 text-sm">Technopark Tangier</p>
          <p className="text-[#1E272E]/70 text-sm">Route de Rabat</p>
          <p className="text-[#1E272E]/70 text-sm">Tangier, Morocco</p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-[#1E272E] flex items-center">
            <Phone className="w-5 h-5 mr-2 text-[#0984E3]" />
            Contact Us
          </h3>
          <p className="text-[#1E272E]/70 text-sm">+212 600-000-000</p>
          <p className="text-[#1E272E]/70 text-sm">Mon - Fri: 9:00 - 18:00</p>
          <p className="text-[#1E272E]/70 text-sm">Sat - Sun: Closed</p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-[#1E272E] flex items-center">
            <Mail className="w-5 h-5 mr-2 text-[#0984E3]" />
            Get In Touch
          </h3>
          <p className="text-[#1E272E]/70 text-sm">hello@hiiva.com</p>
          <p className="text-[#1E272E]/70 text-sm">contact@hiiva.com</p>
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
          © {new Date().getFullYear()} Hive Vault Arc (HIIVA). All rights reserved.
        </p>
      </div>
    </div>
    </div>
    
  );
}
