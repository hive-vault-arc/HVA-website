'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';

export type InsightsCarouselItem = {
  id: string;
  type: 'blog' | 'case-study';
  tag: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
  date: string;
};

const CARD_W = 360;
const CARD_H = 520;
const CARD_STEP = 388;

function circularOffset(i: number, active: number, total: number): number {
  let d = i - active;
  if (d > total / 2) d -= total;
  if (d < -total / 2) d += total;
  return d;
}

function cardScale(absOffset: number): number {
  if (absOffset === 0) return 1;
  if (absOffset === 1) return 0.88;
  return 0.76;
}

function cardOpacity(absOffset: number): number {
  if (absOffset === 3) return 0;
  if (absOffset === 0) return 1;
  if (absOffset === 1) return 0.85;
  return 0.5;
}

type InsightsCarouselProps = {
  items: InsightsCarouselItem[];
};

export default function InsightsCarousel({ items }: InsightsCarouselProps) {
  const total = items.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCenter, setHoveredCenter] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (activeIndex >= total) setActiveIndex(0);
  }, [activeIndex, total]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    items.forEach((item) => {
      if (item.image) {
        const img = new globalThis.Image();
        img.src = item.image;
      }
    });
  }, [items]);

  useEffect(() => {
    setHoveredCenter(false);
  }, [activeIndex]);

  useEffect(() => {
    if (isPaused || !isVisible || total < 2) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(id);
  }, [isPaused, isVisible, total]);

  const prev = useCallback(() => setActiveIndex((p) => (p - 1 + total) % total), [total]);
  const next = useCallback(() => setActiveIndex((p) => (p + 1) % total), [total]);

  if (!total) return null;

  return (
    <section ref={sectionRef} className="bg-white overflow-hidden border-t border-[#e2e8f0]">

      {/* ── Centered header ─────────────────────────────────────────── */}
      <div className="text-center pt-10 pb-8 px-6">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="block h-px w-8 bg-[#2563EB]/35" />
          <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#2563EB]">Welcome to H.V.A</span>
          <span className="block h-px w-8 bg-[#2563EB]/35" />
        </div>
        <h2 className="font-headline text-[2.6rem] md:text-5xl leading-[1.06] tracking-tight text-[#0F172A]">
          Thinking, Testing,{' '}
          <em className="not-italic text-[#0F172A]/40">Shipping.</em>
        </h2>
        <p className="mt-3 text-sm text-[#94a3b8] max-w-sm mx-auto leading-relaxed">
          Field notes from programs we&apos;ve built and teams we&apos;ve transformed.
        </p>
      </div>

      {/* ── Edgeless carousel ──────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ height: CARD_H + 40 }}>
        {items.map((item, i) => {
          const offset = circularOffset(i, activeIndex, total);
          const absOffset = Math.abs(offset);
          if (absOffset > 3) return null;

          const isCenter = offset === 0;
          const xDir = offset < 0 ? -1 : 1;
          const x = isCenter ? 0 : xDir * CARD_STEP * absOffset;
          const scale = cardScale(absOffset);
          const opacity = cardOpacity(absOffset);
          const zIndex = 10 - absOffset;

          return (
            <motion.div
              key={item.id}
              className="absolute top-5"
              style={{
                width: CARD_W,
                height: CARD_H,
                left: '50%',
                marginLeft: -CARD_W / 2,
                zIndex,
                cursor: isCenter ? 'default' : 'pointer',
              }}
              animate={{ x, scale, opacity }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => { if (!isCenter) setActiveIndex(i); }}
              onMouseEnter={() => { if (isCenter) setHoveredCenter(true); }}
              onMouseLeave={() => { if (isCenter) setHoveredCenter(false); }}
            >
              {/* Card shell */}
              <div className="relative w-full h-full overflow-hidden bg-white shadow-[0_4px_24px_rgba(15,23,42,0.10)]">

                {/* ── Image zone (72% height) ── */}
                <div className="relative overflow-hidden" style={{ height: '72%' }}>
                  {/* Category badge */}
                  <span
                    className="absolute top-4 left-4 z-10 px-3 py-1.5
                               bg-white/90 backdrop-blur-sm
                               text-[9px] font-bold uppercase tracking-[0.22em] text-[#0F172A]"
                  >
                    {item.tag}
                  </span>

                  {item.image ? (
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      animate={{ scale: isCenter && hoveredCenter ? 1.06 : 1 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#dbeafe] to-[#e0e7ff]" />
                  )}
                </div>

                {/* ── Static bottom text panel (28% height) ── */}
                <div className="absolute bottom-0 left-0 right-0 bg-white px-5 pt-4 pb-5" style={{ height: '28%' }}>
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#94a3b8] mb-2">
                    <span className="text-[#0F172A] font-extrabold">
                      {item.type === 'blog' ? 'Article' : 'Case Study'}
                    </span>
                    {'  '}{item.date}
                  </p>
                  <h3 className="font-headline text-[1.2rem] leading-snug text-[#0F172A] line-clamp-2">
                    {item.title}
                  </h3>
                </div>

                {/* ── Hover CTA panel — slides up over text panel ── */}
                <motion.div
                  className="absolute left-0 right-0 bottom-0 bg-[#F8FAFC] px-5 pt-5 pb-5 flex flex-col justify-between"
                  style={{
                    height: '52%',
                    borderTop: '1px solid #e2e8f0',
                  }}
                  animate={{ y: isCenter && hoveredCenter ? 0 : '100%' }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#94a3b8] mb-1">
                    <span className="text-[#0F172A] font-extrabold">
                      {item.type === 'blog' ? 'Article' : 'Case Study'}
                    </span>
                    {'  '}{item.date}
                  </p>
                  <p className="font-headline text-[1.1rem] leading-snug text-[#0F172A] mb-3 line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-xs leading-relaxed text-[#475569] line-clamp-3 mb-4">
                    {item.excerpt}
                  </p>
                  <Link
                    href={item.href}
                    className="inline-flex items-center justify-center gap-2
                               bg-[#2563EB] text-white
                               px-5 py-3.5 w-full
                               text-[10px] font-bold uppercase tracking-[0.18em]
                               hover:bg-[#1d4ed8] transition-colors duration-200"
                  >
                    Learn More →
                  </Link>
                </motion.div>

              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Controls ────────────────────────────────────────────────── */}
      <div className="px-8 lg:px-14 pb-12 pt-4 flex items-center gap-2">
        <button
          onClick={() => setIsPaused((p) => !p)}
          className="w-9 h-9 border border-[#e2e8f0] flex items-center justify-center
                     text-[#475569] hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB]
                     transition-colors duration-200"
          aria-label={isPaused ? 'Play' : 'Pause'}
        >
          {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={prev}
          className="w-9 h-9 border border-[#e2e8f0] flex items-center justify-center
                     text-[#475569] hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB]
                     transition-colors duration-200"
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={next}
          className="w-9 h-9 border border-[#e2e8f0] flex items-center justify-center
                     text-[#475569] hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB]
                     transition-colors duration-200"
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </section>
  );
}
