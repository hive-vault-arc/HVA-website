'use client';

import { useState } from 'react';
import {Link} from '@/i18n/navigation';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import {useLocale, useTranslations} from 'next-intl';
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@/components/icons';
import BottomCTA from './BottomCTA';
import SectionBrandMark from './SectionBrandMark';
import type {AppLocale} from '@/i18n/config';
import {isSanityCdnImage} from '@/lib/image-delivery';

/* ── Shared item shape ───────────────────────────────────────────────────── */

export type PageItem = {
  href: string;
  title: string;
  excerpt: string;
  tag: string;
  date?: string;          // ISO string — shown formatted
  meta?: string;          // free-text secondary label (readTime, status, etc.)
  coverImage?: string;    // optional — shows image card; omit for text-only card
  author?: { name: string; initials: string };
  evidenceLabel?: string;
  sourceLocale?: AppLocale;
};

/* ── Props ───────────────────────────────────────────────────────────────── */

type BottomCtaConfig = {
  headline: string;
  subtext: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: 'dark' | 'light';
};

type Props = {
  eyebrow: string;
  headline: string;
  headlineItalic: string;
  description: string;
  items: PageItem[];
  /** Visible filter labels. First item is always "All". */
  filters?: string[];
  /** Returns the bucket a PageItem belongs to for filtering. */
  filterKey?: (item: PageItem) => string;
  /** Show a back-link above the filter bar */
  backHref?: string;
  backLabel?: string;
  emptyMessage?: string;
  bottomCta?: BottomCtaConfig;
};

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function fmt(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function fmtShort(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: 'short',
  });
}

/* ── Image placeholder (when no coverImage) ──────────────────────────────── */

function ImagePlaceholder({ tag, aspect = 'square' }: { tag: string; aspect?: 'video' | 'square' }) {
  return (
    <div
      className={`w-full bg-[#F7F8FA] overflow-hidden flex items-center justify-center ${
        aspect === 'video' ? 'aspect-[4/3]' : 'aspect-square'
      }`}
    >
      <span
        className="text-5xl font-light italic text-[#DDE3EA] select-none px-6 text-center leading-tight"
        style={{ fontFamily: 'var(--font-headline)' }}
      >
        {tag}
      </span>
    </div>
  );
}

/* ── Empty state ─────────────────────────────────────────────────────────── */

function EmptyState({ message, backHref }: { message: string; backHref?: string }) {
  const t = useTranslations('CollectionUi');
  return (
    <section className="max-w-[var(--site-frame)] mx-auto px-4 md:px-8 py-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center"
      >
        <div className="relative mb-10" aria-hidden>
          <div className="w-20 h-20 border border-[#CDD2DA] rotate-45" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border border-[#E8A838]/30 rotate-45" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-[#E8A838] rounded-full" />
          </div>
        </div>
        <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[var(--section-label-color)] mb-5" style={{ fontFamily: 'var(--font-body)' }}>
          {t('comingSoon')}
        </p>
        <h2 className="text-3xl md:text-4xl font-light text-[#1A2535] leading-tight mb-5 max-w-lg" style={{ fontFamily: 'var(--font-headline)' }}>
          {message}
          <br />
          <span className="italic">{t('prepared')}</span>
        </h2>
        <p className="text-[#6B7280] max-w-md leading-relaxed mb-10" style={{ fontFamily: 'var(--font-body)' }}>
          {t('emptyDescription')}
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {backHref && (
            <Link href={backHref} className="inline-flex min-h-11 items-center pb-1 text-sm font-bold uppercase tracking-[0.15em] text-[#1A2535]" style={{ borderBottom: '2px solid #1A2535', fontFamily: 'var(--font-body)' }}>
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" /> {t('allInsights')}
            </Link>
          )}
          <Link href="/blog" className="inline-flex min-h-11 items-center pb-1 text-sm font-bold uppercase tracking-[0.15em] text-[#6B7280] transition-colors hover:text-[var(--section-label-color)]" style={{ borderBottom: '2px solid transparent', fontFamily: 'var(--font-body)' }}>
            {t('readBlog')} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </motion.div>
      <div className="mt-24 h-px bg-[#E8EBF0]" />
    </section>
  );
}

/* ── Main component ──────────────────────────────────────────────────────── */

export default function InsightIndexPage({
  eyebrow,
  headline,
  headlineItalic,
  description,
  items,
  filters,
  filterKey,
  backHref,
  backLabel,
  emptyMessage,
  bottomCta,
}: Props) {
  const t = useTranslations('CollectionUi');
  const locale = useLocale() as AppLocale;
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const allLabel = t('all');
  const allFilters = filters ? [allLabel, ...filters.filter((f) => f !== 'All' && f !== allLabel)] : [];
  const [active, setActive] = useState(allLabel);

  const filtered =
    allFilters.length === 0 || active === allLabel
      ? items
      : items.filter((item) => filterKey?.(item) === active);

  const featured = filtered[0];
  const rest = filtered.slice(1);
  const usesEnglishSources =
    locale === 'fr' && items.some((item) => item.sourceLocale === 'en');

  return (
    <div className="min-h-[100dvh] bg-[#FFFFFF]">
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-[#E8A838]"
        style={{ scaleX: progressScale }}
      />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#F7F8FA] px-4 pt-28 pb-16 sm:pt-32 md:px-8 md:pt-36 md:pb-20">
        <div className="max-w-[var(--site-frame)] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <div className="mb-6 flex items-center gap-3">
              <SectionBrandMark size="sm" />
              <span
                className="block text-xs font-bold tracking-[0.2em] uppercase text-[var(--section-label-color)]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {eyebrow}
              </span>
            </div>
            <h1
              className="text-[clamp(2.6rem,12vw,4rem)] font-light leading-[1.04] tracking-tight text-[#1A2535] md:text-6xl lg:text-7xl"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              {headline}
              <br />{' '}
              <span className="italic">{headlineItalic}</span>
            </h1>
          </div>
          <div className="lg:col-span-4 pb-2">
            <p
              className="text-lg leading-relaxed pl-6 text-[#536070]"
              style={{ fontFamily: 'var(--font-body)', borderLeft: '2px solid #CDD2DA' }}
            >
              {description}
            </p>
          </div>
        </div>
      </section>

      {usesEnglishSources ? (
        <aside className="max-w-[var(--site-frame)] mx-auto px-4 pt-8 md:px-8">
          <div className="flex items-start gap-4 border-l-2 border-[#CD9F40] bg-[#F8F9FB] px-5 py-4">
            <span className="mt-0.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#9A6B12]">
              EN
            </span>
            <div>
              <p className="text-sm font-bold text-[#1A2535]">
                {t('englishCatalogueTitle')}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[#536070]">
                {t('englishCatalogueDescription')}
              </p>
            </div>
          </div>
        </aside>
      ) : null}

      {/* ── Filter / nav bar ───────────────────────────────────────────────── */}
      <section className="max-w-[var(--site-frame)] mx-auto px-4 md:px-8 pt-12 pb-8">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {/* Back link */}
          {backHref && (
            <Link
              href={backHref}
              className="inline-flex min-h-11 items-center pb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#6B7280] transition-colors hover:text-[var(--section-label-color)]"
              style={{ fontFamily: 'var(--font-body)', borderBottom: '2px solid transparent' }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" /> {backLabel ?? t('allInsights')}
            </Link>
          )}
          {/* Filter tabs */}
          {allFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="min-h-11 pb-2 text-sm font-bold uppercase tracking-[0.15em] transition-colors duration-200"
              style={{
                fontFamily: 'var(--font-body)',
                color: active === f ? '#1A2535' : '#6B7280',
                borderBottom: active === f ? '2px solid #1A2535' : '2px solid transparent',
              }}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="mt-4 h-px bg-[#E8EBF0]" />
      </section>

      {/* ── Empty state ────────────────────────────────────────────────────── */}
      {filtered.length === 0 && <EmptyState message={emptyMessage ?? t('defaultEmpty')} backHref={backHref} />}

      {/* ── Featured item ──────────────────────────────────────────────────── */}
      {featured && (
        <section className="max-w-[var(--site-frame)] mx-auto px-4 md:px-8 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Link href={featured.href} locale={featured.sourceLocale} className="group block">
              {featured.coverImage ? (
                /* ── Image featured: image left, card overlapping right ── */
                <div className="flex flex-col lg:flex-row items-stretch">
                  <div className="w-full lg:w-[60%] shrink-0 relative">
                    <div className="aspect-[4/3] relative overflow-hidden bg-[#E8EBF0]">
                      <Image
                        src={featured.coverImage}
                        alt={featured.title}
                        fill
                        priority
                        unoptimized={isSanityCdnImage(featured.coverImage)}
                        className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-[46%] lg:-ml-[6%] z-10 flex items-center relative">
                    <div className="w-full bg-white p-6 sm:p-8 lg:p-14" style={{ boxShadow: '0 10px 40px rgba(25,28,30,0.08)' }}>
                      <FeaturedCardContent item={featured} />
                    </div>
                  </div>
                </div>
              ) : (
                /* ── Text-only featured: full-width card ── */
                <div className="w-full bg-white p-6 sm:p-8 lg:p-16" style={{ boxShadow: '0 10px 40px rgba(25,28,30,0.06)' }}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    <div className="lg:col-span-8">
                      <FeaturedCardContent item={featured} titleSize="large" />
                    </div>
                    <div className="lg:col-span-4 flex flex-col gap-6">
                      <p className="text-[#536070] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-sm font-bold text-[var(--section-label-color)]" style={{ fontFamily: 'var(--font-body)' }}>
                        {t('read')} <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Link>
          </motion.div>
        </section>
      )}

      {/* ── Grid ───────────────────────────────────────────────────────────── */}
      {rest.length > 0 && (
        <section className="max-w-[var(--site-frame)] mx-auto px-4 md:px-8 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {rest.map((item, i) => (
              <motion.article
                key={item.href}
                className="group"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              >
                <Link href={item.href} locale={item.sourceLocale} className="block">
                  {/* Image or placeholder */}
                  <div className="aspect-square bg-[#F7F8FA] mb-7 overflow-hidden relative">
                    {item.coverImage ? (
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        unoptimized={isSanityCdnImage(item.coverImage)}
                        className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <ImagePlaceholder tag={item.tag} />
                    )}
                  </div>
                  {/* Meta */}
                  <div className="space-y-3">
                    <div
                      className="flex justify-between items-center text-[10px] font-bold tracking-[0.2em] uppercase text-[#536070]"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      <span className="text-[var(--section-label-color)]">{item.tag}</span>
                      <span>{item.meta ?? (item.date ? fmtShort(item.date, locale) : '')}</span>
                    </div>
                    <h3
                      className="text-xl leading-snug text-[#1A2535] transition-colors group-hover:text-[var(--section-label-color)]"
                      style={{ fontFamily: 'var(--font-headline)' }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-[#536070] text-sm leading-relaxed line-clamp-2"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {item.excerpt}
                    </p>
                    {item.evidenceLabel ? (
                      <span className="case-evidence-marker">{item.evidenceLabel}</span>
                    ) : null}
                    <div
                      className="pt-4 flex items-center justify-between"
                      style={{ borderTop: '1px solid rgba(198,198,205,0.3)' }}
                    >
                      <span className="text-xs text-[#6B7280] italic" style={{ fontFamily: 'var(--font-body)' }}>
                        {item.author?.name
                          ? `${item.author.name}${item.date ? ` • ${fmtShort(item.date, locale)}` : ''}`
                          : item.date
                          ? fmtShort(item.date, locale)
                          : item.meta ?? ''}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#1A2535] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>
      )}

      {/* ── Bottom CTA ─────────────────────────────────────────────────────── */}
      {bottomCta && (
        <BottomCTA
          variant={bottomCta.variant ?? 'dark'}
          headline={bottomCta.headline}
          subtext={bottomCta.subtext}
          primaryLabel={bottomCta.primaryLabel}
          primaryHref={bottomCta.primaryHref}
          secondaryLabel={bottomCta.secondaryLabel}
          secondaryHref={bottomCta.secondaryHref}
        />
      )}
    </div>
  );
}

/* ── FeaturedCardContent (internal) ─────────────────────────────────────── */

function FeaturedCardContent({
  item,
  titleSize = 'normal',
}: {
  item: PageItem;
  titleSize?: 'normal' | 'large';
}) {
  const t = useTranslations('CollectionUi');
  const locale = useLocale();
  return (
    <>
      <div className="flex items-center gap-4 mb-5">
        <span
          className="text-xs font-bold tracking-widest uppercase px-3 py-1"
          style={{ color: 'var(--section-label-color)', background: 'rgba(232,168,56,0.08)', fontFamily: 'var(--font-body)' }}
        >
          {item.tag}
        </span>
        {item.date && (
          <span className="text-xs font-medium text-[#6B7280]" style={{ fontFamily: 'var(--font-body)' }}>
            {fmt(item.date, locale)}
          </span>
        )}
        {!item.date && item.meta && (
          <span className="text-xs font-medium text-[#6B7280]" style={{ fontFamily: 'var(--font-body)' }}>
            {item.meta}
          </span>
        )}
        {item.sourceLocale && item.sourceLocale !== locale ? (
          <span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#9A6B12]">
            {t('availableInEnglish')}
          </span>
        ) : null}
      </div>
      <h2
        className={`${titleSize === 'large' ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-3xl md:text-4xl'} mb-5 leading-tight text-[#1A2535] transition-colors group-hover:text-[var(--section-label-color)]`}
        style={{ fontFamily: 'var(--font-headline)' }}
      >
        {item.title}
      </h2>
      {titleSize === 'normal' && (
        <p className="text-[#536070] mb-6 leading-relaxed line-clamp-3" style={{ fontFamily: 'var(--font-body)' }}>
          {item.excerpt}
        </p>
      )}
      {item.evidenceLabel ? (
        <span className="case-evidence-marker case-evidence-marker--featured">
          {item.evidenceLabel}
        </span>
      ) : null}
      <div className="flex items-center justify-between">
        {item.author ? (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#E8EBF0] flex items-center justify-center text-xs font-bold text-[#1A2535]">
              {item.author.initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1A2535]" style={{ fontFamily: 'var(--font-body)' }}>{item.author.name}</p>
              {item.meta && <p className="text-xs text-[#6B7280]" style={{ fontFamily: 'var(--font-body)' }}>{item.meta}</p>}
            </div>
          </div>
        ) : (
          <span className="text-sm font-bold text-[var(--section-label-color)]" style={{ fontFamily: 'var(--font-body)' }}>
            {t('read')}
          </span>
        )}
        <ArrowUpRight className="w-5 h-5 text-[#1A2535] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </div>
    </>
  );
}
