import { useEffect, useMemo, useState, type RefObject } from 'react';
import {
  useAnimationQuality,
  type AnimationQualityConfig,
  type AnimationQualityTier,
} from './animationQuality';

export interface PerformanceRuntimeConfig {
  allowTiers?: AnimationQualityTier[];
  threshold?: number;
  rootMargin?: string;
  disabled?: boolean;
}

export type PerformanceRuntimeState = AnimationQualityConfig & {
  isInView: boolean;
  isPageVisible: boolean;
  shouldAnimate: boolean;
};

export function usePerformanceRuntime<T extends Element>(
  ref: RefObject<T | null>,
  config: PerformanceRuntimeConfig = {}
): PerformanceRuntimeState {
  const quality = useAnimationQuality();
  const [isInView, setIsInView] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(
    typeof document === 'undefined' ? true : document.visibilityState === 'visible'
  );

  const {
    threshold = 0.1,
    rootMargin = '0px',
    disabled = false,
    allowTiers = ['high', 'medium', 'low'],
  } = config;

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(Boolean(entry?.isIntersecting)),
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, rootMargin, threshold]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const onVisibilityChange = () => setIsPageVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  const shouldAnimate = useMemo(() => {
    if (disabled) return false;
    if (quality.motionReduced) return false;
    if (!allowTiers.includes(quality.tier)) return false;
    return isInView && isPageVisible;
  }, [allowTiers, disabled, isInView, isPageVisible, quality.motionReduced, quality.tier]);

  return {
    ...quality,
    isInView,
    isPageVisible,
    shouldAnimate,
  };
}
