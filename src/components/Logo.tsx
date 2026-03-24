import React from 'react';
import Link from 'next/link';

interface LogoProps {
  /** Extra classes on the root Link element */
  className?: string;
}

/**
 * Shared logo lockup — "HIVE" on top, "VAULT ARC" below.
 * SVG textLength="100%" stretches "VAULT ARC" to exactly match HIVE's width.
 */
const Logo: React.FC<LogoProps> = ({ className }) => (
  <Link
    href="/"
    className={['flex-shrink-0 inline-block relative', className].filter(Boolean).join(' ')}
    style={{ paddingBottom: '3px' }}
  >
    {/* HIVE — sets the inline-block container width */}
    <span
      className="font-headline font-bold leading-none tracking-tight text-[#0F172A] block"
      style={{ fontSize: '1.6rem', letterSpacing: '-0.01em' }}
    >
      HIVE
    </span>

    {/* VAULT ARC — absolutely positioned so width: 100% = HIVE's width */}
    <svg
      width="100%"
      height="9"
      overflow="visible"
      style={{ position: 'absolute', left: 0, bottom: 0 }}
    >
      <text
        y="8"
        textLength="100%"
        lengthAdjust="spacingAndGlyphs"
        style={{
          fontFamily: 'var(--font-body), sans-serif',
          fontSize: '7.5px',
          fontWeight: 700,
          fill: '#475569',
          textTransform: 'uppercase',
        }}
      >
        VAULT ARC
      </text>
    </svg>
  </Link>
);

export default Logo;
