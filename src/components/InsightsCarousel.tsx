'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Pause, Play, ChevronLeft, ChevronRight } from '@/components/icons';
import type {AppLocale} from '@/i18n/config';

export type InsightsCarouselItem = {
  id: string;
  type: 'blog' | 'case-study';
  tag: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
  date: string;
  sourceLocale: AppLocale;
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
  const t = useTranslations('InsightsCarousel');
  const currentLocale = useLocale() as AppLocale;
  const total = items.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCenter, setHoveredCenter] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
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
    const updateWidth = () => {
      setViewportWidth(sectionRef.current?.clientWidth ?? window.innerWidth);
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

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

  const isCompact = viewportWidth > 0 && viewportWidth < 640;
  const cardW = isCompact ? Math.max(286, Math.min(viewportWidth - 32, 340)) : CARD_W;
  const cardH = isCompact ? 440 : CARD_H;
  const cardStep = isCompact ? cardW * 0.82 : CARD_STEP;

  return (
    <section ref={sectionRef} className="bg-white overflow-hidden border-t border-[#DDE3EA]">

      {/* ── Centered header ─────────────────────────────────────────── */}
      <div className="text-center pt-10 pb-8 px-6">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="block h-px w-8 bg-[#E8A838]/[0.35]" />
          <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[var(--section-label-color)]">{t('eyebrow')}</span>
          <span className="block h-px w-8 bg-[#E8A838]/[0.35]" />
        </div>
        <h2 className="font-headline text-[clamp(2rem,11vw,2.6rem)] md:text-5xl leading-[1.06] tracking-tight text-[#1A2535]">
          {t('title')}{' '}
          <em className="not-italic text-[#566274]">{t('titleAccent')}</em>
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#566274]">
          {t('description')}
        </p>
      </div>

      {/* ── Edgeless carousel ──────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ height: cardH + 40 }}>
        {items.map((item, i) => {
          const offset = circularOffset(i, activeIndex, total);
          const absOffset = Math.abs(offset);
          if (absOffset > 3) return null;

          const isCenter = offset === 0;
          const xDir = offset < 0 ? -1 : 1;
          const x = isCenter ? 0 : xDir * cardStep * absOffset;
          const scale = cardScale(absOffset);
          const opacity = cardOpacity(absOffset);
          const zIndex = 10 - absOffset;

          return (
            <motion.div
              key={item.id}
              className="absolute top-5"
              style={{
                width: cardW,
                height: cardH,
                left: '50%',
                marginLeft: -cardW / 2,
                zIndex,
                cursor: 'pointer',
              }}
              animate={{ x, scale, opacity }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => { if (!isCenter) setActiveIndex(i); }}
              onMouseEnter={() => { if (isCenter) setHoveredCenter(true); }}
              onMouseLeave={() => { if (isCenter) setHoveredCenter(false); }}
              aria-hidden={!isCenter}
              inert={!isCenter}
            >
              {/* Card shell */}
              <div className="relative w-full h-full overflow-hidden bg-white shadow-[0_4px_24px_rgba(15,23,42,0.10)]">

                {/* ── Image zone (72% height) ── */}
                <div className="relative overflow-hidden" style={{ height: '72%' }}>
                  {/* Category badge */}
                  <span
                    className="absolute top-4 left-4 z-10 px-3 py-1.5
                               bg-white/90 backdrop-blur-sm
                               text-[9px] font-bold uppercase tracking-[0.22em] text-[#1A2535]"
                  >
                    {item.tag}
                  </span>

                  {item.image ? (
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      loading={isCenter ? 'eager' : 'lazy'}
                      fetchPriority={isCenter ? 'high' : 'low'}
                      decoding="async"
                      className="w-full h-full object-cover"
                      animate={{ scale: isCenter && hoveredCenter ? 1.06 : 1 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#FFF4D8] to-[#FFF4D8]" />
                  )}
                </div>

                {/* ── Static bottom text panel (28% height) ── */}
                <Link
                  href={item.href}
                  locale={item.sourceLocale}
                  className="absolute bottom-0 left-0 right-0 bg-white px-5 pt-4 pb-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E8A838]"
                  style={{ height: '28%' }}
                >
                  <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.22em] text-[#566274]">
                    <span className="text-[#1A2535] font-extrabold">
                      {item.type === 'blog' ? t('article') : t('caseStudy')}
                    </span>
                    {'  '}{item.date}
                  </p>
                  {item.sourceLocale !== currentLocale ? (
                    <p className="mb-1 text-[8px] font-bold uppercase tracking-[0.18em] text-[#9A6B12]">
                      {t('availableInEnglish')}
                    </p>
                  ) : null}
                  <h3 className="font-headline text-[1.2rem] leading-snug text-[#1A2535] line-clamp-2">
                    {item.title}
                  </h3>
                </Link>

                {/* ── Hover CTA panel — slides up over text panel ── */}
                <motion.div
                  className="absolute left-0 right-0 bottom-0 bg-[#FFFFFF] px-5 pt-5 pb-5 flex flex-col justify-between"
                  style={{
                    height: '52%',
                    borderTop: '1px solid #DDE3EA',
                  }}
                  animate={{ y: isCenter && hoveredCenter ? 0 : '100%' }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.22em] text-[#566274]">
                    <span className="text-[#1A2535] font-extrabold">
                      {item.type === 'blog' ? t('article') : t('caseStudy')}
                    </span>
                    {'  '}{item.date}
                  </p>
                  <p className="font-headline text-[1.1rem] leading-snug text-[#1A2535] mb-3 line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-xs leading-relaxed text-[#566274] line-clamp-3 mb-4">
                    {item.excerpt}
                  </p>
                  <Link
                    href={item.href}
                    locale={item.sourceLocale}
                    tabIndex={-1}
                    className="inline-flex items-center justify-center gap-2
                               bg-[#E8A838] text-[#1A2535]
                               min-h-11 px-5 py-3.5 w-full
                               text-[10px] font-bold uppercase tracking-[0.18em]
                               hover:bg-[#C8891C] transition-colors duration-200"
                  >
                    {t('learnMore')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </motion.div>

              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Controls ────────────────────────────────────────────────── */}
      <div className="px-6 lg:px-14 pb-12 pt-4 flex items-center gap-2">
        <button
          onClick={() => setIsPaused((p) => !p)}
          className="w-11 h-11 border border-[#DDE3EA] flex items-center justify-center
                     text-[#566274] hover:bg-[#E8A838] hover:text-[#1A2535] hover:border-[#E8A838]
                     transition-colors duration-200"
          aria-label={isPaused ? t('play') : t('pause')}
        >
          {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={prev}
          className="w-11 h-11 border border-[#DDE3EA] flex items-center justify-center
                     text-[#566274] hover:bg-[#E8A838] hover:text-[#1A2535] hover:border-[#E8A838]
                     transition-colors duration-200"
          aria-label={t('previous')}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={next}
          className="w-11 h-11 border border-[#DDE3EA] flex items-center justify-center
                     text-[#566274] hover:bg-[#E8A838] hover:text-[#1A2535] hover:border-[#E8A838]
                     transition-colors duration-200"
          aria-label={t('next')}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </section>
  );
}
