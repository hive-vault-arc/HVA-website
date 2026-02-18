import { useEffect, useMemo, useState } from 'react';

export type AnimationQualityTier = 'high' | 'medium' | 'low';

export interface AnimationQualityConfig {
  tier: AnimationQualityTier;
  plasmaMaxDpr: number;
  plasmaTargetFps: number;
  splineMouseSensitivity: number;
  splineMouseUpdateIntervalMs: number;
  splineInteractive: boolean;
}

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: {
    saveData?: boolean;
    addEventListener?: (type: 'change', listener: () => void) => void;
    removeEventListener?: (type: 'change', listener: () => void) => void;
  };
};

const getTierFromSignals = (prefersReducedMotion: boolean): AnimationQualityTier => {
  if (typeof window === 'undefined') return 'high';
  if (prefersReducedMotion) return 'low';

  const nav = navigator as NavigatorWithHints;
  const deviceMemory = nav.deviceMemory ?? 8;
  const cores = nav.hardwareConcurrency ?? 8;
  const saveData = Boolean(nav.connection?.saveData);
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

  let score = 2; // high baseline

  if (saveData) score -= 2;
  if (deviceMemory <= 4) score -= 1;
  if (deviceMemory <= 2) score -= 1;
  if (cores <= 4) score -= 1;
  if (cores <= 2) score -= 1;
  if (isCoarsePointer) score -= 1;

  if (score <= 0) return 'low';
  if (score === 1) return 'medium';
  return 'high';
};

const CONFIGS: Record<AnimationQualityTier, Omit<AnimationQualityConfig, 'tier'>> = {
  high: {
    plasmaMaxDpr: 1.75,
    plasmaTargetFps: 60,
    splineMouseSensitivity: 1,
    splineMouseUpdateIntervalMs: 16,
    splineInteractive: true,
  },
  medium: {
    plasmaMaxDpr: 1.25,
    plasmaTargetFps: 45,
    splineMouseSensitivity: 0.7,
    splineMouseUpdateIntervalMs: 33,
    splineInteractive: true,
  },
  low: {
    plasmaMaxDpr: 1,
    plasmaTargetFps: 30,
    splineMouseSensitivity: 0.45,
    splineMouseUpdateIntervalMs: 66,
    splineInteractive: false,
  },
};

export const useAnimationQuality = (): AnimationQualityConfig => {
  const getPrefersReduced = () =>
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [tier, setTier] = useState<AnimationQualityTier>(() =>
    getTierFromSignals(getPrefersReduced())
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const nav = navigator as NavigatorWithHints;
    const onChange = () => setTier(getTierFromSignals(media.matches));

    if (media.addEventListener) {
      media.addEventListener('change', onChange);
    } else {
      media.addListener(onChange);
    }

    nav.connection?.addEventListener?.('change', onChange);
    window.addEventListener('resize', onChange);

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', onChange);
      } else {
        media.removeListener(onChange);
      }
      nav.connection?.removeEventListener?.('change', onChange);
      window.removeEventListener('resize', onChange);
    };
  }, []);

  return useMemo(() => ({ tier, ...CONFIGS[tier] }), [tier]);
};
