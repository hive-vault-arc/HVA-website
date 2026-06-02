'use client';
import { useRef, useState, type ReactNode } from 'react';

export default function FooterSpotlight({ children }: Readonly<{ children: ReactNode }>) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  // Radial glow centered on cursor — lighter gold circle that fades out
  const spotlightStyle = pos
    ? {
        background: `radial-gradient(circle 480px at ${pos.x}px ${pos.y}px, rgba(232, 168, 56, 0.18) 0%, rgba(232, 168, 56, 0.07) 50%, transparent 100%)`,
        opacity: 1,
      }
    : { opacity: 0 };

  return (
    <div
      ref={ref}
      className="site-footer__frame sharp-edge"
      onMouseMove={onMove}
      onMouseLeave={() => setPos(null)}
    >
      {/* Always-visible faint grid */}
      <div className="footer-grid-base" aria-hidden="true" />
      {/* Cursor-revealed bright grid */}
      <div className="footer-grid-spotlight" style={spotlightStyle} aria-hidden="true" />
      {/* z-index: 1 keeps all content above both grid layers */}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}
