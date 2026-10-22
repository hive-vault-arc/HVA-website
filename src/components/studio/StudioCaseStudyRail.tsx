'use client';

import {useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode} from 'react';
import {ArrowLeft, ArrowRight} from '@/components/icons';
import styles from './studio.module.css';

interface StudioCaseStudyRailProps {
  title: string;
  intro: string;
  previousLabel: string;
  nextLabel: string;
  count: number;
  children: ReactNode;
  titleId?: string;
  kind?: 'case-studies' | 'insights' | 'hero';
}

export default function StudioCaseStudyRail({title, intro, previousLabel, nextLabel, count, children, titleId = 'studio-work-title', kind = 'case-studies'}: StudioCaseStudyRailProps) {
  const viewportId = useId();
  const viewportRef = useRef<HTMLUListElement>(null);
  const [available, setAvailable] = useState({previous: false, next: false});

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    let frame = 0;

    function measure() {
      if (!viewport) return;
      const direction = getComputedStyle(viewport).direction === 'rtl' ? -1 : 1;
      const position = viewport.scrollLeft * direction;
      const limit = viewport.scrollWidth - viewport.clientWidth;
      const scrollable = limit > 8;
      const previous = scrollable && position > 1;
      const next = scrollable && position < limit - 1;
      setAvailable(current => current.previous === previous && current.next === next ? current : {previous, next});
    }

    function scheduleMeasure() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    }

    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(viewport);
    for (const card of viewport.children) observer.observe(card);
    viewport.addEventListener('scroll', scheduleMeasure, {passive: true});
    scheduleMeasure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      viewport.removeEventListener('scroll', scheduleMeasure);
    };
  }, [count]);

  function navigate(delta: number | 'start' | 'end', keyboard = false) {
    const viewport = viewportRef.current;
    if (!viewport || !viewport.children.length) return;
    const computed = getComputedStyle(viewport);
    const direction = computed.direction === 'rtl' ? -1 : 1;
    const limit = viewport.scrollWidth - viewport.clientWidth;
    const currentPosition = viewport.scrollLeft * direction;
    let position = delta === 'start' ? 0 : limit;
    if (typeof delta === 'number') {
      const viewportBounds = viewport.getBoundingClientRect();
      const starts = [...viewport.children].map(card => {
        const bounds = card.getBoundingClientRect();
        const offset = direction === 1 ? bounds.left - viewportBounds.left : viewportBounds.right - bounds.right;
        return currentPosition + offset;
      });
      const closest = starts.reduce((best, start, index) => Math.abs(start - currentPosition) < Math.abs(starts[best] - currentPosition) ? index : best, 0);
      position = starts[Math.max(0, Math.min(starts.length - 1, closest + delta))];
    }
    viewport.scrollTo({
      left: Math.max(0, Math.min(limit, position)) * direction,
      behavior: keyboard || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      navigate(event.key === 'Home' ? 'start' : 'end', true);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const direction = getComputedStyle(event.currentTarget).direction === 'rtl' ? -1 : 1;
      navigate((event.key === 'ArrowRight' ? 1 : -1) * direction, true);
    }
  }

  return <div className={styles.caseShowcase} data-studio-rail={kind} data-count={count}>
    <div className={styles.caseHeading}>
      <div><h2 id={titleId}>{title}</h2>{intro && <p className={styles.caseIntro}>{intro}</p>}</div>
      {count > 1 && <div className={styles.caseControls}>
        <button type="button" aria-label={previousLabel} aria-controls={viewportId} aria-disabled={!available.previous}
          onClick={() => available.previous && navigate(-1)} data-case-previous>
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <button type="button" aria-label={nextLabel} aria-controls={viewportId} aria-disabled={!available.next}
          onClick={() => available.next && navigate(1)} data-case-next>
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>}
    </div>
    <ul ref={viewportRef} id={viewportId} className={styles.caseViewport} tabIndex={count > 1 && (available.previous || available.next) ? 0 : undefined}
      aria-labelledby={titleId} onKeyDown={handleKeyDown} data-case-viewport>
      {children}
    </ul>
  </div>;
}
