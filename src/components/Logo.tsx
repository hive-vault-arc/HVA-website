import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  /** Extra classes on the root Link element */
  className?: string;
  /** Use light (white) colors for dark backgrounds */
  light?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className, light = false }) => (
  <Link
    href="/"
    aria-label="H.V.A Home"
    className={['inline-flex flex-shrink-0 items-center', className].filter(Boolean).join(' ')}
  >
    <Image
      src="/Images/favico/logo.png"
      alt="H.V.A"
      width={2319}
      height={333}
      className={`h-7 w-auto object-contain ${light ? 'brightness-0 invert opacity-90' : ''}`}
      priority
    />
  </Link>
);

export default Logo;
