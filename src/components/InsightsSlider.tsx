'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ─── Types ───────────────────────────────────────────────────────────────── */

export type SlideItem = {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  href: string;
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

const AUTOPLAY_MS = 10_000;

/* ─── Component ───────────────────────────────────────────────────────────── */

export default function InsightsSlider({ items }: { readonly items: SlideItem[] }) {
  const slides = deterministicShuffle(items, 6);
  const total = slides.length;
  const [current, setCurrent] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (total < 2) return;
    timerRef.current = setTimeout(() => {
      setCurrent((p) => (p + 1) % total);
    }, AUTOPLAY_MS);
  }, [total]);

  // Autoplay
  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, resetTimer]);

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
    <section className="insights-slider-section">
      {/* ── Header ── */}
      <div className="insights-slider-header">
        <h2 className="insights-slider-eyebrow">Latest Publications</h2>
      </div>

      {/* ── Main layout: controls + track ── */}
      <div className="insights-slider-layout">
        {/* Left controls */}
        <div className="insights-slider-controls">
          <div className="insights-slider-counter" aria-live="polite" aria-atomic="true">
            <span className="insights-slider-counter-current">{current + 1}</span>
            <span className="insights-slider-counter-sep" aria-hidden="true" />
            <span className="insights-slider-counter-total">{total}</span>
          </div>

          <div className="insights-slider-nav">
            <button
              onClick={prev}
              aria-label="Previous insight"
              className="insights-slider-nav-btn"
            >
              <ChevronLeft className="insights-slider-nav-icon" />
            </button>
            <button
              onClick={next}
              aria-label="Next insight"
              className="insights-slider-nav-btn"
            >
              <ChevronRight className="insights-slider-nav-icon" />
            </button>
          </div>
        </div>

        {/* Sliding track */}
        <div className="insights-slider-track-outer" aria-label="Insights slider">
          <motion.div
            className="insights-slider-track"
            animate={{ x: `calc(-${current} * (var(--card-w) + var(--card-gap)))` }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            {slides.map((item, i) => {
              const isHovered = hoveredIndex === i;
              return (
                <div
                  key={item.id}
                  className="insights-slide-card"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Link
                    href={item.href}
                    aria-label={`Read ${item.title}`}
                    className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A838] focus-visible:ring-inset"
                    onFocus={() => setHoveredIndex(i)}
                    onBlur={() => setHoveredIndex(null)}
                  >
                  {/* Background image */}
                  <div className="insights-slide-bg">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="insights-slide-img"
                      animate={{
                        scale: isHovered ? 1.06 : 1,
                        filter: isHovered ? 'blur(8px)' : 'blur(0px)',
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
                      style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
                    >
                      <div className="insights-slide-hover-content">
                        <p className="insights-slide-hover-title">{item.title}</p>
                        <p className="insights-slide-hover-desc">{item.description}</p>
                        <span className="insights-slide-learn-more">
                          Read {item.tag} insight
                          <span className="insights-slide-learn-arrow" aria-hidden="true">→</span>
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
      <div className="insights-slider-dots" role="tablist" aria-label="Slide indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`insights-slider-dot${i === current ? ' insights-slider-dot--active' : ''}`}
          />
        ))}
      </div>
    </section>
  );
}
