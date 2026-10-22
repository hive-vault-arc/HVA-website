'use client';

import {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {Link} from '@/i18n/navigation';
import {ArrowLeft, ArrowRight} from '@/components/icons';
import type {AppLocale} from '@/i18n/config';
import type {CaseStudyShowcaseSummary} from '@/lib/proof';
import type {StudioCopy} from '@/data/studio-home';
import {isSanityCdnImage} from '@/lib/image-delivery';
import styles from './studio.module.css';

interface StudioHeroGalleryProps {
  projects: CaseStudyShowcaseSummary[];
  locale: AppLocale;
  workCopy: StudioCopy['work'];
}

const AUTOPLAY_DELAY_MS = 10_000;

export default function StudioHeroGallery({projects, locale, workCopy}: StudioHeroGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const resetAutoplayRef = useRef<() => void>(() => {});

  useEffect(() => {
    const gallery = galleryRef.current;
    const hero = gallery?.closest<HTMLElement>('[data-studio-hero]');
    if (!gallery || !hero || projects.length < 2) return;

    let visible = false;
    let hovered = false;
    let focused = false;
    let disposed = false;
    let timer: number | null = null;

    const stop = () => {
      if (timer !== null) window.clearInterval(timer);
      timer = null;
      gallery.dataset.autoplay = 'false';
    };
    const refresh = () => {
      if (disposed) return;
      const canRun = visible && hero.dataset.motionRunning === 'true' && !hovered && !focused;
      if (!canRun) {
        stop();
        return;
      }
      if (timer === null) {
        gallery.dataset.autoplay = 'true';
        timer = window.setInterval(() => {
          setActiveIndex(index => (index + 1) % projects.length);
        }, AUTOPLAY_DELAY_MS);
      }
    };
    const onMouseEnter = () => { hovered = true; refresh(); };
    const onMouseLeave = () => { hovered = false; refresh(); };
    const onFocusIn = () => { focused = true; refresh(); };
    const onFocusOut = () => {
      queueMicrotask(() => {
        focused = gallery.contains(document.activeElement);
        refresh();
      });
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.intersectionRatio >= 0.35;
      refresh();
    }, {threshold: 0.35});
    const motionObserver = new MutationObserver(refresh);
    visibilityObserver.observe(gallery);
    motionObserver.observe(hero, {attributes: true, attributeFilter: ['data-motion-running']});
    gallery.addEventListener('mouseenter', onMouseEnter);
    gallery.addEventListener('mouseleave', onMouseLeave);
    gallery.addEventListener('focusin', onFocusIn);
    gallery.addEventListener('focusout', onFocusOut);
    resetAutoplayRef.current = () => { stop(); refresh(); };
    refresh();

    return () => {
      disposed = true;
      stop();
      visibilityObserver.disconnect();
      motionObserver.disconnect();
      gallery.removeEventListener('mouseenter', onMouseEnter);
      gallery.removeEventListener('mouseleave', onMouseLeave);
      gallery.removeEventListener('focusin', onFocusIn);
      gallery.removeEventListener('focusout', onFocusOut);
      resetAutoplayRef.current = () => {};
    };
  }, [projects.length]);

  if (!projects.length) return null;

  const active = projects[activeIndex];
  const showPrevious = () => {
    setActiveIndex(index => (index - 1 + projects.length) % projects.length);
    resetAutoplayRef.current();
  };
  const showNext = () => {
    setActiveIndex(index => (index + 1) % projects.length);
    resetAutoplayRef.current();
  };

  return <div ref={galleryRef} className={styles.heroGallery} data-hero-gallery data-autoplay="false">
    <div className={styles.heroGalleryTop}>
      <div className={styles.heroGalleryLabel}><bdi className={styles.heroGalleryIndex} dir="ltr">{String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</bdi><span>{workCopy.title}</span></div>
      {projects.length > 1 && <div className={styles.heroGalleryControls}>
        <button type="button" onClick={showPrevious} aria-label={workCopy.previous}><ArrowLeft size={20} aria-hidden="true" /></button>
        <button type="button" onClick={showNext} aria-label={workCopy.next}><ArrowRight size={20} aria-hidden="true" /></button>
      </div>}
      {projects.length > 1 && <span key={active.slug} className={styles.heroGalleryProgress} aria-hidden="true" />}
    </div>
    <div className={styles.heroGalleryBody}>
      <Link key={active.slug} className={styles.heroGalleryFeature} href={`/case-studies/${active.slug}`} locale={active.sourceLocale || locale} aria-label={`${workCopy.open}: ${active.clientName} — ${active.title}`}>
        <span className={styles.heroGalleryMedia}><Image src={active.assets.coverImage} alt={active.assets.coverAlt || active.title} fill priority={activeIndex === 0} sizes="(min-width: 1600px) 1600px, (min-width: 1280px) 94vw, (min-width: 1024px) 1040px, (min-width: 640px) 85vw, 100vw" unoptimized={isSanityCdnImage(active.assets.coverImage)} /></span>
        <span className={styles.heroGalleryCaption}><span className={styles.heroGalleryClient}>{active.clientName}</span><strong>{active.title}</strong><span className={styles.heroGalleryArrow} aria-hidden="true"><ArrowRight size={20} /></span></span>
      </Link>
    </div>
  </div>;
}
