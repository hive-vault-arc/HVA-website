'use client';

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import {MotionConfig, motion} from 'framer-motion';
import {usePathname} from 'next/navigation';

export const SITE_MOTION = {
  cardStaggerMs: 50,
  maxStaggerMs: 250,
  routeEnterMs: 180,
  sectionEnterMs: 520,
  hydrationDelayMs: 900,
} as const;

export function siteMotionDelay(index: number) {
  return Math.min(index * SITE_MOTION.cardStaggerMs, SITE_MOTION.maxStaggerMs);
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  return prefersReducedMotion;
}

function canAnimateNode(node: HTMLElement) {
  return !node.closest('[data-skip-site-motion]');
}

type SiteMotionProps = {
  children: ReactNode;
};

export default function SiteMotion({children}: SiteMotionProps) {
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    let startTimer: number | null = null;
    let revealOnFocus: ((event: Event) => void) | null = null;

    const initialiseMotion = () => {
      if (cancelled) return;

      const sections = Array.from(root.querySelectorAll<HTMLElement>('section')).filter(
        canAnimateNode,
      );
      const cards = Array.from(root.querySelectorAll<HTMLElement>('article')).filter(
        canAnimateNode,
      );
      const mediaFrames = Array.from(root.querySelectorAll<HTMLElement>('figure, article')).filter(
        (node) => canAnimateNode(node) && Boolean(node.querySelector('img, video')),
      );

      const reveal = (node: HTMLElement) => {
        node.dataset.motionState = 'revealed';
      };

      sections.forEach((section, index) => {
        section.dataset.motionSection = 'true';
        section.dataset.motionState = 'pending';
        section.style.setProperty('--site-motion-delay', `${siteMotionDelay(index)}ms`);
      });

      cards.forEach((card, index) => {
        card.dataset.motionCard = 'true';
        card.dataset.motionState = 'pending';
        card.style.setProperty('--site-motion-delay', `${siteMotionDelay(index)}ms`);
      });

      mediaFrames.forEach((frame) => {
        frame.dataset.motionMedia = 'true';
      });

      if (prefersReducedMotion) {
        root.dataset.motionMode = 'reduced';
        root.dataset.motionReady = 'false';
        [...sections, ...cards].forEach(reveal);
        return;
      }

      root.dataset.motionMode = 'standard';
      root.dataset.motionReady = 'true';

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            reveal(entry.target as HTMLElement);
            observer?.unobserve(entry.target);
          });
        },
        {rootMargin: '0px 0px -10%', threshold: 0.08},
      );

      [...sections, ...cards].forEach((node) => observer?.observe(node));

      revealOnFocus = (event: Event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        const pendingNode = target.closest<HTMLElement>('[data-motion-state="pending"]');
        if (pendingNode) reveal(pendingNode);
      };

      root.addEventListener('focusin', revealOnFocus);
    };

    const scheduleMotion = () => {
      // Let nested client components finish hydrating before annotating their DOM nodes.
      startTimer = window.setTimeout(
        initialiseMotion,
        SITE_MOTION.hydrationDelayMs,
      );
    };

    if (document.readyState === 'complete') {
      scheduleMotion();
    } else {
      window.addEventListener('load', scheduleMotion, {once: true});
    }

    return () => {
      cancelled = true;
      window.removeEventListener('load', scheduleMotion);
      if (startTimer) window.clearTimeout(startTimer);
      observer?.disconnect();
      if (revealOnFocus) root.removeEventListener('focusin', revealOnFocus);
      root.dataset.motionReady = 'false';
    };
  }, [pathname, prefersReducedMotion]);

  const routeTransition = {
    '--site-motion-route-duration': `${SITE_MOTION.routeEnterMs}ms`,
  } as CSSProperties;

  return (
    <MotionConfig reducedMotion={prefersReducedMotion ? 'always' : 'never'}>
      <motion.main
        ref={rootRef}
        className="site-motion min-h-[100dvh] w-full"
        data-site-motion
        data-motion-mode={prefersReducedMotion ? 'reduced' : 'standard'}
        initial={prefersReducedMotion ? false : {opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: SITE_MOTION.routeEnterMs / 1000, ease: [0.16, 1, 0.3, 1]}}
        style={routeTransition}
      >
        {children}
      </motion.main>
    </MotionConfig>
  );
}
