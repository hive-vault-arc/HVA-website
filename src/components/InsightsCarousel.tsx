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

const X_TABLE = [0, 320, 620];
const SCALE_TABLE = [1, 0.5, 0.72];
const OPACITY_TABLE = [1, 0.7, 0.88];

function circularOffset(i: number, active: number, total: number): number {
  let d = i - active;
  if (d > total / 2) d -= total;
  if (d < -total / 2) d += total;
  return d;
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
    if (activeIndex >= total) {
      setActiveIndex(0);
    }
  }, [activeIndex, total]);

  // Pause auto-advance when the carousel is scrolled off-screen
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

  // Preload carousel images so hover transitions are smooth
  useEffect(() => {
    items.forEach((item) => {
      if (item.image) {
        const img = new globalThis.Image();
        img.src = item.image;
      }
    });
  }, [items]);

  // Reset hover state whenever the active card changes
  useEffect(() => {
    setHoveredCenter(false);
  }, [activeIndex]);

  // Auto-advance — paused when off-screen or manually paused
  useEffect(() => {
    if (isPaused || !isVisible || total < 2) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(id);
  }, [isPaused, isVisible, total]);

  const prev = useCallback(() => setActiveIndex((p) => (p - 1 + total) % total), [total]);
  const next = useCallback(() => setActiveIndex((p) => (p + 1) % total), [total]);

  if (!total) return null;

  return (
    <section ref={sectionRef} className="bg-white py-16 overflow-hidden border-t border-[#e2e8f0]">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 lg:px-14 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pb-10 border-b border-[#e2e8f0]">
          <div className="md:col-span-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB] mb-4">
              Welcome to H.V.A
            </p>
            <h2 className="font-headline text-5xl md:text-6xl leading-[1.04] tracking-tight text-[#0F172A]">
              Thinking, Testing,<br className="hidden md:block" /> Shipping.
            </h2>
          </div>
          <div className="md:col-span-5 flex flex-col gap-5">
            <p className="text-base text-[#475569] leading-relaxed">
              Articles, case studies, and perspectives from programs we&apos;ve built and teams we&apos;ve transformed — field notes from the work.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-[#e2e8f0]" />
              <span className="text-[9px] font-mono text-[#94a3b8] uppercase tracking-[0.24em] shrink-0">
                {total} entries
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel viewport — fixed height, overflow hidden */}
      <div className="relative h-[460px]">
        {items.map((item, i) => {
          const offset = circularOffset(i, activeIndex, total);
          const absOffset = Math.abs(offset);
          if (absOffset > 3) return null;

          const isCenter = offset === 0;
          const x = absOffset === 3
            ? (offset < 0 ? -960 : 960)
            : (offset < 0 ? -X_TABLE[absOffset] : X_TABLE[absOffset]);
          const scale = absOffset === 3 ? 0.65 : SCALE_TABLE[absOffset];
          const opacity = absOffset === 3 ? 0 : OPACITY_TABLE[absOffset];
          const zIndex = absOffset === 3 ? 0 : 20 - absOffset * 5;

          return (
            <motion.div
              key={item.id}
              className="absolute"
              style={{
                width: 340,
                height: 440,
                left: '50%',
                top: '50%',
                marginLeft: -170,
                marginTop: -220,
                zIndex,
                cursor: isCenter ? 'default' : 'pointer',
              }}
              animate={{ x, scale, opacity }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => { if (!isCenter) setActiveIndex(i); }}
              onMouseEnter={() => { if (isCenter) setHoveredCenter(true); }}
              onMouseLeave={() => { if (isCenter) setHoveredCenter(false); }}
            >
              <div className="relative overflow-hidden" style={{ height: '60%' }}>
                <span
                  className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-2.5 py-1
                             text-[9px] font-bold uppercase tracking-[0.2em] text-[#2563EB]"
                >
                  {item.tag}
                </span>

                {item.image ? (
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: isCenter && hoveredCenter ? 1.15 : 1,
                      filter:
                        isCenter && hoveredCenter ? 'blur(7px)' : 'blur(0px)',
                    }}
                    style={{ transformOrigin: 'top left' }}
                    transition={{
                      scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                      filter: { duration: 0.22 },
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#dbeafe] to-[#e0e7ff]" />
                )}

                <motion.div
                  className="absolute inset-0 flex items-center justify-center px-5 z-20"
                  animate={{ opacity: isCenter && hoveredCenter ? 1 : 0 }}
                  transition={{ duration: 0.28 }}
                  style={{ pointerEvents: 'none' }}
                >
                  <p className="font-headline text-white text-2xl font-semibold leading-snug text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
                    {item.title}
                  </p>
                </motion.div>
              </div>

              <div
                className="relative bg-white flex flex-col justify-between overflow-hidden"
                style={{ height: '40%', outline: '1px solid #e2e8f0', padding: '20px' }}
              >
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#94a3b8]">
                  {item.type === 'blog' ? 'Article' : 'Case Study'} · {item.date}
                </p>

                <motion.h3
                  className="font-headline text-lg leading-snug text-[#0F172A] mt-1"
                  animate={{ scale: isCenter && hoveredCenter ? 1.03 : 1 }}
                  style={{ transformOrigin: 'top left' }}
                  transition={{ duration: 0.35 }}
                >
                  {item.title}
                </motion.h3>

                <motion.div
                  className="absolute inset-0 flex flex-col justify-end"
                  style={{
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    background: 'rgba(248,250,252,0.88)',
                    padding: '20px',
                    pointerEvents: isCenter && hoveredCenter ? 'auto' : 'none',
                  }}
                  animate={{ opacity: isCenter && hoveredCenter ? 1 : 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <p className="text-xs leading-relaxed text-[#475569] line-clamp-3 mb-3">
                    {item.excerpt}
                  </p>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase
                               tracking-wide text-[#2563EB] hover:text-[#1d4ed8] transition-colors"
                  >
                    Expand →
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-14 mt-6 flex items-center gap-2">
        <button
          onClick={() => setIsPaused((p) => !p)}
          className="w-9 h-9 border border-[#e2e8f0] flex items-center justify-center
                     text-[#475569] hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB]
                     transition-colors duration-200"
          aria-label={isPaused ? 'Play' : 'Pause'}
        >
          {isPaused ? (
            <Play className="w-3.5 h-3.5" />
          ) : (
            <Pause className="w-3.5 h-3.5" />
          )}
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
