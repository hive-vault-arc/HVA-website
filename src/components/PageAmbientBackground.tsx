import React from 'react';
import Plasma from './Plasma';
import { cn } from '../lib/utils';
import { useAnimationQuality } from '../lib/animationQuality';

interface PageAmbientBackgroundProps {
  className?: string;
  animated?: boolean;
}

const PageAmbientBackground: React.FC<PageAmbientBackgroundProps> = ({ className, animated = true }) => {
  const { tier, motionReduced } = useAnimationQuality();

  if (animated && tier === 'high' && !motionReduced) {
    return (
      <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0', className)}>
        <Plasma
          color="#0984E3"
          speed={0.6}
          direction="forward"
          scale={1.1}
          opacity={0.26}
          mouseInteractive={false}
          maxDprCap={0.7}
          targetFpsCap={12}
          visibilityThreshold={0.2}
        />
      </div>
    );
  }

  return null;
};

export default PageAmbientBackground;
