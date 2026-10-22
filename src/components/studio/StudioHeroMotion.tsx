'use client';

import {useEffect, useRef, useState} from 'react';
import {Pause, Play} from '@/components/icons';
import StudioHeroBackdrop from './StudioHeroBackdrop';
import styles from './studio.module.css';

interface StudioHeroMotionProps {
  pauseLabel: string;
  resumeLabel: string;
}

export default function StudioHeroMotion({pauseLabel, resumeLabel}: StudioHeroMotionProps) {
  const motionRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const motion = motionRef.current;
    const hero = motion?.closest('[data-studio-hero]');
    if (!motion || !hero) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    motion.dataset.ready = 'true';
    let inView = false;
    const update = () => {
      const running = String(inView && !document.hidden && !reducedMotion.matches && !paused);
      motion.dataset.running = running;
      (hero as HTMLElement).dataset.motionRunning = running;
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });

    observer.observe(hero);
    reducedMotion.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
      motion.dataset.running = 'false';
      delete (hero as HTMLElement).dataset.motionRunning;
    };
  }, [paused]);

  return <div ref={motionRef} className={styles.heroMotion} data-running="false" data-paused={paused}>
    <StudioHeroBackdrop />
    <button type="button" className={styles.heroMotionControl} onClick={() => setPaused(value => !value)} aria-label={paused ? resumeLabel : pauseLabel} title={paused ? resumeLabel : pauseLabel}>
      {paused ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}
    </button>
  </div>;
}
