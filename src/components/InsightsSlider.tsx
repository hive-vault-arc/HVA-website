'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllPosts } from '../lib/blog';
import { getAllCaseStudies } from '../lib/proof';

/* ─── Types ───────────────────────────────────────────────────────────────── */

type SlideItem = {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

/* ─── Build pool — only items that have a real cover image ────────────────── */

function buildPool(): SlideItem[] {
  const items: SlideItem[] = [];

  getAllPosts()
    .filter((p) => !!p.coverImage)
    .forEach((p) =>
      items.push({
        id: `blog-${p.slug}`,
        tag: p.category,
        title: p.title,
        description: p.excerpt,
        image: p.coverImage,
        href: `/blog/${p.slug}`,
      })
    );

  getAllCaseStudies()
    .filter((s) => !!s.assets.coverImage)
    .forEach((s) =>
      items.push({
        id: `case-${s.slug}`,
        tag: s.industry,
        title: s.title,
        description: s.summary,
        image: s.assets.coverImage,
        href: `/case-studies/${s.slug}`,
      })
    );

  return items;
}

/* ─── Seeded deterministic shuffle — consistent SSR/CSR ───────────────────── */

function deterministicShuffle(arr: SlideItem[], count: number): SlideItem[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = (i * 13 + 7) % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

const SLIDES = deterministicShuffle(buildPool(), 6);
const TOTAL = SLIDES.length;
const AUTOPLAY_MS = 10_000;

/* ─── Component ───────────────────────────────────────────────────────────── */

export default function InsightsSlider() {
  const [current, setCurrent] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCurrent((p) => (p + 1) % TOTAL);
    }, AUTOPLAY_MS);
  }, []);

  // Autoplay
  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, resetTimer]);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + TOTAL) % TOTAL);
  }, []);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % TOTAL);
  }, []);

  return (
    <section className="insights-slider-section">
      {/* ── Header ── */}
      <div className="insights-slider-header">
        <p className="insights-slider-eyebrow">Latest Publications</p>
      </div>

      {/* ── Main layout: controls + track ── */}
      <div className="insights-slider-layout">
        {/* Left controls */}
        <div className="insights-slider-controls">
          <div className="insights-slider-counter" aria-live="polite" aria-atomic="true">
            <span className="insights-slider-counter-current">{current + 1}</span>
            <span className="insights-slider-counter-sep" aria-hidden="true" />
            <span className="insights-slider-counter-total">{TOTAL}</span>
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
            {SLIDES.map((item, i) => {
              const isHovered = hoveredIndex === i;
              return (
                <div
                  key={item.id}
                  className="insights-slide-card"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
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
                        <h3 className="insights-slide-hover-title">{item.title}</h3>
                        <p className="insights-slide-hover-desc">{item.description}</p>
                        <Link href={item.href} className="insights-slide-learn-more">
                          Learn more
                          <span className="insights-slide-learn-arrow" aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ── Dot indicators ── */}
      <div className="insights-slider-dots" role="tablist" aria-label="Slide indicators">
        {SLIDES.map((_, i) => (
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
