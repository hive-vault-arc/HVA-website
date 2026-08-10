'use client';

import { useState, useEffect, useCallback } from 'react';
import {Link} from '@/i18n/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import {useTranslations} from 'next-intl';
import { ArrowRight, ChevronLeft, ChevronRight } from '@/components/icons';
import type {AppLocale} from '@/i18n/config';

/* ─── Types ───────────────────────────────────────────────────────────────── */

export type SlideItem = {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  href: string;
  sourceLocale: AppLocale;
};

/* ─── Seeded deterministic shuffle — consistent SSR/CSR ───────────────────── */

function deterministicShuffle(arr: SlideItem[], count: number): SlideItem[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = (i * 13 + 7) % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

function randomShuffle(arr: SlideItem[], count: number): SlideItem[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

/* ─── Component ───────────────────────────────────────────────────────────── */

export default function InsightsSlider({
  items,
  randomize = false,
}: {
  readonly items: SlideItem[];
  readonly randomize?: boolean;
}) {
  const t = useTranslations('InsightsHub.slider');
  const [slides, setSlides] = useState(() => deterministicShuffle(items, 6));
  const total = slides.length;
  const [current, setCurrent] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setSlides(
      randomize ? randomShuffle(items, 6) : deterministicShuffle(items, 6),
    );
  }, [items, randomize]);

  useEffect(() => {
    if (current >= total) setCurrent(0);
  }, [current, total]);

  const prev = useCallback(() => {
    if (total === 0) return;
    setCurrent((p) => (p - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    if (total === 0) return;
    setCurrent((p) => (p + 1) % total);
  }, [total]);

  if (total === 0) return null;

  return (
    <section
      className="insights-slider-section"
      aria-label={t('ariaLabel')}
      aria-roledescription="carousel"
    >
      {/* ── Header ── */}
      <div className="insights-slider-header">
        <h2 className="insights-slider-eyebrow">{t('title')}</h2>
      </div>

      {/* ── Main layout: controls + track ── */}
      <div className="insights-slider-layout">
        {/* Left controls */}
        <div className="insights-slider-controls">
          <div className="insights-slider-counter" aria-live="polite" aria-atomic="true">
            <span className="insights-slider-counter-current">
              {String(current + 1).padStart(2, '0')}
            </span>
            <span className="insights-slider-counter-sep" aria-hidden="true" />
            <span className="insights-slider-counter-total">
              {String(total).padStart(2, '0')}
            </span>
          </div>

          <div className="insights-slider-nav">
            <button
              onClick={prev}
              aria-label={t('previous')}
              className="insights-slider-nav-btn"
            >
              <ChevronLeft className="insights-slider-nav-icon" />
            </button>
            <button
              onClick={next}
              aria-label={t('next')}
              className="insights-slider-nav-btn"
            >
              <ChevronRight className="insights-slider-nav-icon" />
            </button>
          </div>
        </div>

        {/* Sliding track */}
        <div className="insights-slider-track-outer" aria-label={t('trackLabel')}>
          <motion.div
            className="insights-slider-track"
            animate={{ x: `calc(-${current} * (var(--card-w) + var(--card-gap)))` }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            {slides.map((item, i) => {
              const isHovered = hoveredIndex === i;
              return (
                <div
                  key={item.id}
                  className="insights-slide-card"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={t('slidePosition', {current: i + 1, total})}
                  onPointerEnter={(event) => {
                    if (event.pointerType === 'mouse') setHoveredIndex(i);
                  }}
                  onPointerLeave={(event) => {
                    if (event.pointerType === 'mouse') setHoveredIndex(null);
                  }}
                >
                  <Link
                    href={item.href}
                    locale={item.sourceLocale}
                    className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A838] focus-visible:ring-inset"
                    tabIndex={i === current ? 0 : -1}
                    aria-current={i === current ? 'true' : undefined}
                    onFocus={() => setHoveredIndex(i)}
                    onBlur={() => setHoveredIndex(null)}
                  >
                  {/* Background image */}
                  <div className="insights-slide-bg">
                    <span className="insights-slide-index" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      loading={i === current ? 'eager' : 'lazy'}
                      fetchPriority={i === current ? 'high' : 'low'}
                      decoding="async"
                      className="insights-slide-img insights-card-image"
                      animate={{
                        scale: isHovered ? 1.06 : 1,
                      }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />

                    {/* Static bottom gradient overlay */}
                    <div className="insights-slide-overlay-base" />

                    {/* Tag badge — hidden on hover */}
                    <motion.div
                      className="insights-slide-tag-row"
                      animate={{ opacity: isHovered ? 0 : 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="insights-slide-tag-dot" aria-hidden="true" />
                      <span className="insights-slide-tag-label">{item.tag.toUpperCase()}</span>
                    </motion.div>

                    {/* Default title (bottom) — fades out on hover */}
                    <motion.div
                      className="insights-slide-default-content"
                      animate={{ opacity: isHovered ? 0 : 1 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h3 className="insights-slide-title-default">{item.title}</h3>
                    </motion.div>

                    {/* Hover overlay — full dark backdrop + title + desc + CTA */}
                    <motion.div
                      className="insights-slide-hover-overlay"
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ pointerEvents: 'none' }}
                    >
                      <div className="insights-slide-hover-content">
                        <p className="insights-slide-hover-title">{item.title}</p>
                        <p className="insights-slide-hover-desc">{item.description}</p>
                        <span className="insights-slide-learn-more">
                          {t('readType', {type: item.tag})}
                          <ArrowRight className="insights-slide-learn-arrow h-4 w-4" aria-hidden="true" />
                        </span>
                      </div>
                    </motion.div>
                  </div>
                  </Link>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ── Dot indicators ── */}
      <div className="insights-slider-dots" role="group" aria-label={t('choose')}>
        {slides.map((_, i) => (
          <button
            key={i}
            aria-pressed={i === current}
            aria-label={t('goTo', {number: i + 1})}
            onClick={() => setCurrent(i)}
            className={`insights-slider-dot${i === current ? ' insights-slider-dot--active' : ''}`}
          />
        ))}
      </div>
    </section>
  );
}
