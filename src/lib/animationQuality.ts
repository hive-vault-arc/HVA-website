import { useEffect, useMemo, useState } from 'react';

export type AnimationQualityTier = 'high' | 'medium' | 'low';

export interface AnimationQualityConfig {
  tier: AnimationQualityTier;
  plasmaMaxDpr: number;
  plasmaTargetFps: number;
  splineEnabled: boolean;
  splineMouseSensitivity: number;
  splineMouseUpdateIntervalMs: number;
  splineInteractive: boolean;
  motionReduced: boolean;
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

  let score = 0;
  if (saveData) score -= 2;
  if (deviceMemory >= 8) score += 1;
  if (cores >= 8) score += 1;
  if (!isCoarsePointer) score += 1;
  if (deviceMemory <= 4) score -= 1;
  if (deviceMemory <= 2) score -= 1;
  if (cores <= 4) score -= 1;
  if (cores <= 2) score -= 1;
  if (isCoarsePointer) score -= 1;

  if (score >= 2) return 'high';
  if (score >= 0) return 'medium';
  return 'low';
};

const CONFIGS: Record<AnimationQualityTier, Omit<AnimationQualityConfig, 'tier' | 'motionReduced'>> = {
  high: {
    plasmaMaxDpr: 0.75,
    plasmaTargetFps: 15,
    splineEnabled: true,
    splineMouseSensitivity: 0.85,
    splineMouseUpdateIntervalMs: 33,
    splineInteractive: true,
  },
  medium: {
    plasmaMaxDpr: 0.6,
    plasmaTargetFps: 12,
    splineEnabled: false,
    splineMouseSensitivity: 0.6,
    splineMouseUpdateIntervalMs: 50,
    splineInteractive: false,
  },
  low: {
    plasmaMaxDpr: 0.5,
    plasmaTargetFps: 8,
    splineEnabled: false,
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

  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => getPrefersReduced());

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const nav = navigator as NavigatorWithHints;
    const onSignalsChange = () => setPrefersReducedMotion(media.matches);

    if (media.addEventListener) {
      media.addEventListener('change', onSignalsChange);
    } else {
      media.addListener(onSignalsChange);
    }

    nav.connection?.addEventListener?.('change', onSignalsChange);
    window.addEventListener('resize', onSignalsChange);

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', onSignalsChange);
      } else {
        media.removeListener(onSignalsChange);
      }
      nav.connection?.removeEventListener?.('change', onSignalsChange);
      window.removeEventListener('resize', onSignalsChange);
    };
  }, []);

  return useMemo(() => {
    const tier = getTierFromSignals(prefersReducedMotion);
    return {
      tier,
      motionReduced: prefersReducedMotion,
      ...CONFIGS[tier],
    };
  }, [prefersReducedMotion]);
};
