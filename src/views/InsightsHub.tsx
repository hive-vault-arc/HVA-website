'use client';

import {startTransition, useEffect, useRef, useState} from 'react';
import {Link} from '@/i18n/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import {useLocale, useTranslations} from 'next-intl';
import { ArrowDown, ArrowRight, ArrowUpRight } from '@/components/icons';
import BottomCTA from '../components/BottomCTA';
import InsightsSlider, { type SlideItem } from '../components/InsightsSlider';
import PageAmbientBackground from '../components/PageAmbientBackground';
import SectionBrandMark from '../components/SectionBrandMark';
import type {
  InsightListingItem as InsightGridItem,
  InsightListingType,
  InsightPageCursor,
  PaginatedInsights,
} from '../lib/insight-pagination';
import type {AppLocale} from '@/i18n/config';

const CATEGORY_CARDS = [
  {
    key: 'blog',
    href: '/blog',
    image: '/Images/insights/hva-insights-blog-articles-tangier-morocco.webp',
  },
  {
    key: 'caseStudy',
    href: '/case-studies',
    image: '/Images/insights/hva-case-studies-ai-transformation-morocco.webp',
  },
  {
    key: 'news',
    href: '/insights/news-articles',
    image: '/Images/insights/hva-news-articles-ai-industry-updates.webp',
  },
  {
    key: 'perspective',
    href: '/insights/perspectives',
    image: '/Images/insights/hva-perspectives-strategic-ai-insights.webp',
  },
  {
    key: 'research',
    href: '/insights/research-reports',
    image: '/Images/insights/hva-research-reports-ai-technology-morocco.webp',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

/* ── Image category cards ─────────────────────────────────────────────────── */

function CategoryCards() {
  const t = useTranslations('InsightsHub');
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <motion.div
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ staggerChildren: 0.07 }}
    >
      {CATEGORY_CARDS.map((cat) => {
        const label = t(`types.${cat.key}`);
        const isHovered = hovered === cat.href;
        return (
          <Link
            key={cat.href}
            href={cat.href}
            className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A838] focus-visible:ring-offset-4"
            onMouseEnter={() => setHovered(cat.href)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(cat.href)}
            onBlur={() => setHovered(null)}
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="relative h-[300px] overflow-hidden"
            >
              <motion.img
                src={cat.image}
                alt=""
                className="insights-card-image absolute inset-0 h-full w-full object-cover"
                animate={{
                  scale: isHovered ? 1.07 : 1,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2535]/80 via-[#1A2535]/20 to-transparent" />

              <motion.div
                className="absolute bottom-0 left-0 right-0 p-5"
                animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? 6 : 0 }}
                transition={{ duration: 0.22 }}
              >
                <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.22em] text-white/50">
                  {t('categories.typeLabel')}
                </p>
                <span className="insights-category-title">{label}</span>
              </motion.div>

              <motion.div
                className="absolute inset-0 flex flex-col items-start justify-center p-6"
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                transition={{ duration: 0.28 }}
                aria-hidden={!isHovered}
              >
                <span className="insights-category-title insights-category-title--hover">
                  {label}
                </span>
                <span className="inline-flex items-center gap-2 border border-white/40 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-colors duration-200 group-hover:border-[#E8A838] group-hover:bg-[#E8A838]">
                  {t('categories.open', {type: label})}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </motion.div>
            </motion.div>
          </Link>
        );
      })}
    </motion.div>
  );
}

/* ── Latest section ───────────────────────────────────────────────────────── */

function useInsightTypeLabel() {
  const t = useTranslations('InsightsHub.types');

  return (type: InsightListingType) => {
    switch (type) {
      case 'blog':
        return t('blog');
      case 'case-study':
        return t('caseStudy');
      case 'news-article':
        return t('news');
      case 'perspective':
        return t('perspective');
      case 'research-report':
        return t('research');
    }
  };
}

type LatestProps = {
  readonly items: InsightGridItem[];
};

function LatestSection({ items }: LatestProps) {
  const t = useTranslations('InsightsHub');
  const typeLabelFor = useInsightTypeLabel();
  const [latestPrimary, latestSecondary] = items;
  const ctaLabelFor = (item: InsightGridItem) => {
    if (item.type === 'case-study') return t('latest.readCaseStudy');
    if (item.type === 'research-report') return t('latest.openReport');
    return t('latest.readInsight');
  };

  if (!latestPrimary && !latestSecondary) return null;

  return (
    <section className="soft-grid-section py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-14">
        <div className="mb-10 flex items-center gap-3">
          <SectionBrandMark size="sm" />
          <h2 className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--section-label-color)]">
            {t('latest.eyebrow')}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* ── Latest item — tall image card ── */}
          {latestPrimary && (
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55 }}
              className="group relative overflow-hidden bg-[#1A2535]"
              style={{ minHeight: 480 }}
            >
              {/* Cover image */}
              {latestPrimary.image && (
                <motion.img
                  src={latestPrimary.image}
                  alt={latestPrimary.title}
                  className="insights-card-image insights-card-image--zoom absolute inset-0 w-full h-full object-cover opacity-60
                             transition-transform duration-700 group-hover:scale-105"
                />
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2535] via-[#1A2535]/50 to-transparent" />

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-10" style={{ minHeight: 480 }}>
                <div className="mb-auto pt-6 flex items-center gap-2">
                  <span className="h-[1px] w-6 bg-[#E8A838]" />
                  <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[var(--section-label-color-dark)]">
                    {t('latest.label', {type: typeLabelFor(latestPrimary.type)})} · {latestPrimary.tag}
                  </p>
                </div>

                <div>
                  <h3 className="font-headline text-3xl font-medium leading-tight text-white md:text-4xl">
                    {latestPrimary.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/60 line-clamp-3 max-w-lg">
                    {latestPrimary.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <Link
                      href={latestPrimary.href}
                      locale={latestPrimary.sourceLocale}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-[10px] font-bold
                                 uppercase tracking-[0.14em] text-white border border-white/30
                                 bg-white/10 backdrop-blur-sm hover:bg-[#E8A838] hover:border-[#E8A838]
                                 transition-all duration-200"
                    >
                      {ctaLabelFor(latestPrimary)} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    {(latestPrimary.readTime || latestPrimary.date) && (
                      <span className="text-[10px] text-white/35 uppercase tracking-widest">
                        {latestPrimary.readTime ?? latestPrimary.date}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          )}

          {/* ── Second latest item — split layout ── */}
          {latestSecondary && (
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="group flex flex-col overflow-hidden"
              style={{ minHeight: 480 }}
            >
              {/* Top image */}
              <div className="relative overflow-hidden bg-[#1A2535]" style={{ height: 260 }}>
                {latestSecondary.image && (
                  <motion.img
                    src={latestSecondary.image}
                    alt={latestSecondary.title}
                    className="insights-card-image insights-card-image--zoom absolute inset-0 w-full h-full object-cover opacity-80
                               transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2535]/60 to-transparent" />
                {/* Industry pill */}
                <div className="absolute top-5 left-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[9px] font-bold
                                   uppercase tracking-[0.18em] text-white bg-[#E8A838]/80 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                    {latestSecondary.tag}
                  </span>
                </div>
              </div>

              {/* Bottom text panel */}
              <div className="flex flex-col flex-1 bg-white border border-[#DDE3EA] border-t-0 p-8">
                <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.24em] text-[var(--section-label-color)]">
                  {t('latest.label', {type: typeLabelFor(latestSecondary.type)})}
                </p>
                <h3 className="font-headline text-2xl font-medium leading-snug text-[#1A2535]">
                  {latestSecondary.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#566274] line-clamp-3">
                  {latestSecondary.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <Link
                    href={latestSecondary.href}
                    locale={latestSecondary.sourceLocale}
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase
                               tracking-[0.14em] text-[#1A2535] border border-[#1A2535]
                               px-4 py-2 hover:bg-[#1A2535] hover:text-white transition-all duration-200"
                  >
                    {ctaLabelFor(latestSecondary)} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  {(latestSecondary.meta || latestSecondary.readTime || latestSecondary.date) && (
                    <span className="text-[10px] text-[#9AA4B2] uppercase tracking-widest">
                      {latestSecondary.meta ?? latestSecondary.readTime ?? latestSecondary.date}
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── All Insights grid ────────────────────────────────────────────────────── */

function buildSliderItems(items: InsightGridItem[]): SlideItem[] {
  return items.map((item) => ({
    id: item.id,
    tag: item.tag,
    title: item.title,
    description: item.excerpt,
    image: item.image,
    href: item.href,
    sourceLocale: item.sourceLocale,
  }));
}

function InsightGridCard({ item, index }: { readonly item: InsightGridItem; readonly index: number }) {
  const t = useTranslations('InsightsHub');
  const typeLabelFor = useInsightTypeLabel();
  const [hovered, setHovered] = useState(false);
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.06 }}
      className="group relative overflow-hidden bg-[#1A2535]"
      style={{ height: 320 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      <Link
        href={item.href}
        locale={item.sourceLocale}
        className="absolute inset-0 block focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E8A838]"
      >
        {item.image && (
          <motion.img
            src={item.image}
            alt=""
            className="insights-card-image absolute inset-0 h-full w-full object-cover"
            animate={{
              scale: hovered ? 1.07 : 1,
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2535]/85 via-[#1A2535]/25 to-transparent" />

        <motion.div
          className="absolute left-4 top-4 flex items-center gap-1.5"
          animate={{ opacity: hovered ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#F0C15A]" />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white">
            {item.tag}
          </span>
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 p-5"
          animate={{ opacity: hovered ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="line-clamp-2 font-headline text-lg font-medium leading-snug text-white">
            {item.title}
          </h3>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col justify-start p-5 pt-8"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.28 }}
          aria-hidden={!hovered}
          style={{ background: 'rgba(15,23,42,0.72)', backdropFilter: 'blur(2px)' }}
        >
          <p className="mb-3 font-headline text-xl font-medium leading-snug text-white">
            {item.title}
          </p>
          <p className="mb-5 line-clamp-3 text-xs leading-relaxed text-white/65">
            {item.excerpt}
          </p>
          <span className="inline-flex items-center gap-2 self-start border border-white/35 bg-white/10 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-200 group-hover:border-[#E8A838] group-hover:bg-[#E8A838]">
            {t('grid.open', {type: typeLabelFor(item.type).toLocaleLowerCase()})}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </motion.div>
      </Link>
    </motion.article>
  );
}

type AllInsightsGridProps = {
  readonly initialItems: InsightGridItem[];
  readonly total: number;
  readonly initialCursor: InsightPageCursor | null;
  readonly locale: AppLocale;
};

export function AllInsightsGrid({
  initialItems,
  total,
  initialCursor,
  locale,
}: AllInsightsGridProps) {
  const t = useTranslations('InsightsHub');
  const [items, setItems] = useState(initialItems);
  const [cursor, setCursor] = useState(initialCursor);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const requestController = useRef<AbortController | null>(null);
  const hasMore = items.length < total && cursor !== null;

  useEffect(
    () => () => {
      requestController.current?.abort();
    },
    [],
  );

  const loadMore = async () => {
    if (!hasMore || isLoading || !cursor) return;

    requestController.current?.abort();
    const controller = new AbortController();
    requestController.current = controller;
    setIsLoading(true);
    setLoadError(false);

    const searchParams = new URLSearchParams({
      locale,
      cursorDate: cursor.date,
      cursorId: cursor.id,
    });

    try {
      const response = await fetch(`/api/insights?${searchParams.toString()}`, {
        headers: {Accept: 'application/json'},
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Insights request failed: ${response.status}`);

      const page = (await response.json()) as PaginatedInsights;
      startTransition(() => {
        setItems((currentItems) => {
          const knownIds = new Set(currentItems.map((item) => item.id));
          return [
            ...currentItems,
            ...page.items.filter((item) => !knownIds.has(item.id)),
          ];
        });
        setCursor(page.nextCursor);
      });
    } catch (error) {
      if ((error as Error).name !== 'AbortError') setLoadError(true);
    } finally {
      if (!controller.signal.aborted) setIsLoading(false);
    }
  };

  if (initialItems.length === 0) {
    return (
      <section className="insights-empty-state" aria-labelledby="insights-empty-title">
        <div className="insights-empty-state__inner">
          <SectionBrandMark size="sm" />
          <div>
            <h2 id="insights-empty-title">{t('grid.emptyTitle')}</h2>
            <p>{t('grid.emptyDescription')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#FFFFFF]">
      <div className="mx-auto max-w-7xl px-6 lg:px-14">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <SectionBrandMark size="sm" />
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--section-label-color)]">
                {t('grid.eyebrow')}
              </p>
            </div>
            <h2 className="font-headline text-2xl font-medium text-[#1A2535]">
              {t('grid.title')}
            </h2>
          </div>
          <span className="hidden text-[10px] uppercase tracking-widest text-[#566274] sm:block">
            {t('grid.itemCount', {count: total})}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <InsightGridCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {hasMore && (
          <div className="mt-12 flex flex-col items-center justify-center gap-3">
            <button
              type="button"
              onClick={loadMore}
              disabled={isLoading}
              aria-busy={isLoading}
              aria-describedby={loadError ? 'insights-load-error' : undefined}
              className="inline-flex min-h-11 items-center gap-3 px-8 py-3.5 text-[10px] font-bold
                         uppercase tracking-[0.18em] text-[#1A2535] border border-[#1A2535]
                         hover:bg-[#1A2535] hover:text-white transition-all duration-200
                         disabled:cursor-wait disabled:opacity-55"
            >
              {loadError
                ? t('grid.tryAgain')
                : isLoading
                  ? t('grid.loading')
                  : t('grid.loadMore')}
              <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            {loadError ? (
              <p
                id="insights-load-error"
                role="status"
                className="max-w-sm text-center text-xs leading-relaxed text-[#566274]"
              >
                {t('grid.loadError')}
              </p>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}

export default function InsightsHub({
  initialInsights,
  totalInsights,
  initialCursor,
  hasFallbackContent,
}: {
  readonly initialInsights: InsightGridItem[];
  readonly totalInsights: number;
  readonly initialCursor: InsightPageCursor | null;
  readonly hasFallbackContent: boolean;
}) {
  const t = useTranslations('InsightsHub');
  const locale = useLocale() as AppLocale;
  const sliderItems = buildSliderItems(initialInsights);
  const hasPublishedInsights = totalInsights > 0;
  const usesEnglishSources = locale === 'fr' && hasFallbackContent;

  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative isolate overflow-x-hidden bg-[#FFFFFF] text-[#1A2535]">
      {/* Scroll progress */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-[#E8A838]"
        style={{ scaleX: progressScale }}
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="insights-hub-hero relative isolate overflow-hidden border-b border-[#DDE3EA]">
        <PageAmbientBackground className="opacity-[0.92]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-white/50" />

        <div className="insights-hub-hero__shell relative z-10 mx-auto flex min-h-[340px] max-w-7xl items-end justify-between gap-12 px-6 pb-14 pt-32 lg:px-14 lg:pb-16">
          <motion.div
            className="insights-hub-hero__copy min-w-0 max-w-3xl flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="mb-5 flex items-center gap-3">
              <SectionBrandMark size="sm" eager />
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--section-label-color)]">
                {t('hero.eyebrow')}
              </p>
            </div>
            <h1 className="font-headline text-4xl font-medium leading-[1.04] sm:text-5xl lg:text-[4.25rem]">
              {t('hero.title')}
              <br />{' '}
              <em className="italic text-[#566274]">{t('hero.emphasis')}</em>
            </h1>
            <div className="mt-6 flex items-center gap-4">
              <span className="block h-px w-8 bg-[#E8A838] flex-shrink-0" />
              <p className="max-w-sm text-sm leading-relaxed text-[#566274]">
                {t('hero.description')}
              </p>
            </div>
          </motion.div>

          <motion.div
            className="insights-hub-hero__radar hidden flex-shrink-0 items-center justify-center lg:flex"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            aria-hidden="true"
          >
            <svg
              width="260"
              height="260"
              viewBox="0 0 220 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="110" cy="110" r="104" stroke="#E8A838" strokeWidth="1.4" strokeOpacity="0.38" />
              <circle cx="110" cy="110" r="76" stroke="#E8A838" strokeWidth="1.6" strokeOpacity="0.52" />
              <circle cx="110" cy="110" r="48" stroke="#1A2535" strokeWidth="1.25" strokeOpacity="0.22" />

              <line x1="6" y1="110" x2="214" y2="110" stroke="#1A2535" strokeWidth="1.15" strokeOpacity="0.16" />
              <line x1="110" y1="6" x2="110" y2="214" stroke="#1A2535" strokeWidth="1.15" strokeOpacity="0.16" />

              {Array.from({ length: 12 }).map((_, index) => {
                const angle = (index * 30 * Math.PI) / 180;
                const outerRadius = 98;
                const innerRadius = index % 3 === 0 ? 86 : 92;
                const x1 = 110 + outerRadius * Math.cos(angle);
                const y1 = 110 + outerRadius * Math.sin(angle);
                const x2 = 110 + innerRadius * Math.cos(angle);
                const y2 = 110 + innerRadius * Math.sin(angle);

                return (
                  <line
                    key={`tick-${index * 30}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#E8A838"
                    strokeWidth={index % 3 === 0 ? '2' : '1.35'}
                    strokeOpacity={index % 3 === 0 ? '0.78' : '0.45'}
                  />
                );
              })}

              <circle cx="110" cy="110" r="4.5" fill="#E8A838" fillOpacity="0.95" />
              <circle cx="152" cy="68" r="4" fill="#E8A838" fillOpacity="0.72" />

              <path
                d="M 34 143 A 80 80 0 0 1 77 34"
                stroke="#E8A838"
                strokeWidth="1.6"
                strokeOpacity="0.58"
                strokeDasharray="5 7"
                fill="none"
              />

              <text
                x="110"
                y="198"
                textAnchor="middle"
                fontSize="8"
                letterSpacing="3"
                fill="#566274"
                fillOpacity="0.72"
                fontFamily="system-ui, sans-serif"
              >
                {t('hero.diagramLabel')}
              </text>
            </svg>
          </motion.div>
        </div>
      </section>

      {usesEnglishSources ? (
        <aside className="border-b border-[#DDE3EA] bg-[#F8F9FB]">
          <div className="mx-auto flex max-w-7xl items-start gap-4 px-6 py-4 lg:px-14">
            <span className="mt-0.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#9A6B12]">
              EN
            </span>
            <div>
              <p className="text-sm font-bold text-[#1A2535]">
                {t('englishCatalogue.title')}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[#536070]">
                {t('englishCatalogue.description')}
              </p>
            </div>
          </div>
        </aside>
      ) : null}

      {/* ── Insights Slider ──────────────────────────────────────────────── */}
      <InsightsSlider items={sliderItems} />

      {/* ── Category Navigation ───────────────────────────────────────────── */}
      <section
        className={`soft-grid-section ${
          hasPublishedInsights ? 'py-20' : 'py-12 lg:py-14'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-14">
          <div className="mb-8 flex items-center gap-3">
            <SectionBrandMark size="sm" />
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--section-label-color)]">
              {t('categories.eyebrow')}
            </p>
          </div>
          <CategoryCards />
        </div>
      </section>

      {/* ── Latest Featured ───────────────────────────────────────────────── */}
      <LatestSection items={initialInsights.slice(0, 2)} />

      {/* ── All Insights Grid ────────────────────────────────────────────── */}
      <AllInsightsGrid
        initialItems={initialInsights}
        total={totalInsights}
        initialCursor={initialCursor}
        locale={locale}
      />

      <BottomCTA
        variant="light"
        headline={t('bottomCta.title')}
        subtext={t('bottomCta.description')}
        primaryLabel={t('bottomCta.primary')}
        primaryHref="/contact"
        secondaryLabel={t('bottomCta.secondary')}
        secondaryHref="/capabilities"
      />
    </div>
  );
}
