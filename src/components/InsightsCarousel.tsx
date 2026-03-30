'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllPosts } from '../lib/blog';
import { getAllCaseStudies } from '../lib/proof';

type CarouselItem = {
  id: string;
  type: 'blog' | 'case-study';
  tag: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
  date: string;
};

function buildItems(): CarouselItem[] {
  const posts = getAllPosts().map((p) => ({
    id: `blog-${p.slug}`,
    type: 'blog' as const,
    tag: p.category,
    title: p.title,
    excerpt: p.excerpt,
    image: p.coverImage,
    href: `/blog/${p.slug}`,
    date: p.publishedAt,
  }));

  const studies = getAllCaseStudies().map((s) => ({
    id: `case-${s.slug}`,
    type: 'case-study' as const,
    tag: s.industry,
    title: s.title,
    excerpt: s.summary,
    image: s.assets.coverImage,
    href: `/case-studies/${s.slug}`,
    date: s.lastUpdated,
  }));

  // Interleave 2 blogs then 1 case-study for visual variety
  const result: CarouselItem[] = [];
  let bi = 0;
  let si = 0;
  while (bi < posts.length || si < studies.length) {
    if (bi < posts.length) result.push(posts[bi++]);
    if (bi < posts.length) result.push(posts[bi++]);
    if (si < studies.length) result.push(studies[si++]);
  }
  return result;
}

const ITEMS = buildItems();
const TOTAL = ITEMS.length;
const X_TABLE = [0, 320, 620];
const SCALE_TABLE = [1, 0.5, 0.72];
const OPACITY_TABLE = [1, 0.7, 0.88];

function circularOffset(i: number, active: number): number {
  let d = i - active;
  if (d > TOTAL / 2) d -= TOTAL;
  if (d < -TOTAL / 2) d += TOTAL;
  return d;
}

export default function InsightsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCenter, setHoveredCenter] = useState(false);

  // Reset hover state whenever the active card changes
  useEffect(() => {
    setHoveredCenter(false);
  }, [activeIndex]);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TOTAL);
    }, 4000);
    return () => clearInterval(id);
  }, [isPaused]);

  const prev = useCallback(() => setActiveIndex((p) => (p - 1 + TOTAL) % TOTAL), []);
  const next = useCallback(() => setActiveIndex((p) => (p + 1) % TOTAL), []);

  return (
    <section className="bg-[#F8FAFC] py-20 overflow-hidden">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 lg:px-14 mb-14">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB] mb-4">
          Welcome to H.V.A
        </p>
        <h2 className="font-headline text-4xl font-medium leading-[1.04] tracking-tight text-[#0F172A] md:text-5xl">
          Thinking, Testing, Shipping.
        </h2>
      </div>

      {/* Carousel viewport — fixed height, overflow hidden */}
      <div className="relative h-[480px]">
        {ITEMS.map((item, i) => {
          const offset = circularOffset(i, activeIndex);
          const absOffset = Math.abs(offset);
          if (absOffset > 2) return null;

          const isCenter = offset === 0;
          const x = offset < 0 ? -X_TABLE[absOffset] : X_TABLE[absOffset];
          const scale = SCALE_TABLE[absOffset];
          const opacity = OPACITY_TABLE[absOffset];
          const zIndex = 20 - absOffset * 5;

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
              {/* ── Image section (top 60%) ── */}
              <div className="relative overflow-hidden" style={{ height: '60%' }}>
                {/* Category badge */}
                <span
                  className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-2.5 py-1
                             text-[9px] font-bold uppercase tracking-[0.2em] text-[#2563EB]"
                >
                  {item.tag}
                </span>

                {/* Image with zoom + blur on center hover */}
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
              </div>

              {/* ── Text section (bottom 40%) ── */}
              <div
                className="relative bg-white flex flex-col justify-between overflow-hidden"
                style={{ height: '40%', outline: '1px solid #e2e8f0', padding: '20px' }}
              >
                {/* Eyebrow */}
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#94a3b8]">
                  {item.type === 'blog' ? 'Article' : 'Case Study'} · {item.date}
                </p>

                {/* Title — subtle zoom on center hover */}
                <motion.h3
                  className="font-headline text-lg leading-snug text-[#0F172A] mt-1"
                  animate={{ scale: isCenter && hoveredCenter ? 1.03 : 1 }}
                  style={{ transformOrigin: 'top left' }}
                  transition={{ duration: 0.35 }}
                >
                  {item.title}
                </motion.h3>

                {/* Hover overlay — description + expand button with backdrop blur */}
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

      {/* Navigation controls */}
      <div className="mx-auto max-w-7xl px-6 lg:px-14 mt-10 flex items-center gap-2">
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
