import React from 'react';
import Plasma from './Plasma';
import { cn } from '../lib/utils';
import { useAnimationQuality } from '../lib/animationQuality';

interface PageAmbientBackgroundProps {
  className?: string;
}

const PageAmbientBackground: React.FC<PageAmbientBackgroundProps> = ({ className }) => {
  const { tier } = useAnimationQuality();

  if (tier === 'high') {
    return (
      <Plasma
        color="#0984E3"
        speed={0.34}
        direction="forward"
        scale={1.02}
        opacity={0.22}
        mouseInteractive={false}
        maxDprCap={0.85}
        targetFpsCap={18}
        visibilityThreshold={0.2}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0',
        'bg-[radial-gradient(circle_at_18%_18%,rgba(9,132,227,0.22),transparent_45%),radial-gradient(circle_at_80%_8%,rgba(0,206,201,0.16),transparent_38%),linear-gradient(180deg,#F5F6FA_0%,#ECF5FD_100%)]',
        className
      )}
    />
  );
};

export default PageAmbientBackground;
