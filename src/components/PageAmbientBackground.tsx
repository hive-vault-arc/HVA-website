import React from 'react';
import dynamic from 'next/dynamic';
import { cn } from '../lib/utils';
import { useAnimationQuality } from '../lib/animationQuality';

interface PageAmbientBackgroundProps {
  className?: string;
  animated?: boolean;
}

const Plasma = dynamic(() => import('./Plasma'), { ssr: false });

const PageAmbientBackground: React.FC<PageAmbientBackgroundProps> = ({ className, animated = true }) => {
  const { tier, motionReduced } = useAnimationQuality();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!animated) return null;

  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0', className)}>
      {isMounted && tier === 'high' && !motionReduced ? (
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
      ) : null}
    </div>
  );
};

export default PageAmbientBackground;
