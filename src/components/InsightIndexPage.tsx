'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import BottomCTA from './BottomCTA';
import SectionBrandMark from './SectionBrandMark';

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
  metrics?: { value: string; label: string }[];
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

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function fmtShort(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
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
          Coming Soon
        </p>
        <h2 className="text-3xl md:text-4xl font-light text-[#1A2535] leading-tight mb-5 max-w-lg" style={{ fontFamily: 'var(--font-headline)' }}>
          {message}
          <br />
          <span className="italic">prepared for publishing.</span>
        </h2>
        <p className="text-[#6B7280] max-w-md leading-relaxed mb-10" style={{ fontFamily: 'var(--font-body)' }}>
          We publish deliberately — only when the content meets our editorial standard. Check back soon or explore other sections in the meantime.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {backHref && (
            <Link href={backHref} className="inline-flex min-h-11 items-center pb-1 text-sm font-bold uppercase tracking-[0.15em] text-[#1A2535]" style={{ borderBottom: '2px solid #1A2535', fontFamily: 'var(--font-body)' }}>
              ← All Insights
            </Link>
          )}
          <Link href="/blog" className="inline-flex min-h-11 items-center pb-1 text-sm font-bold uppercase tracking-[0.15em] text-[#6B7280] transition-colors hover:text-[#E8A838]" style={{ borderBottom: '2px solid transparent', fontFamily: 'var(--font-body)' }}>
            Read the Blog →
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
  backLabel = '← All Insights',
  emptyMessage = 'These articles are being',
  bottomCta,
}: Props) {
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const allFilters = filters ? ['All', ...filters.filter((f) => f !== 'All')] : [];
  const [active, setActive] = useState('All');

  const filtered =
    allFilters.length === 0 || active === 'All'
      ? items
      : items.filter((item) => filterKey?.(item) === active);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <main className="min-h-[100dvh] bg-[#FFFFFF]">
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#E8A838] via-[#F0C15A] to-[#E8A838]"
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
              <br />
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

      {/* ── Filter / nav bar ───────────────────────────────────────────────── */}
      <section className="max-w-[var(--site-frame)] mx-auto px-4 md:px-8 pt-12 pb-8">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {/* Back link */}
          {backHref && (
            <Link
              href={backHref}
              className="inline-flex min-h-11 items-center pb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#6B7280] transition-colors hover:text-[#E8A838]"
              style={{ fontFamily: 'var(--font-body)', borderBottom: '2px solid transparent' }}
            >
              {backLabel}
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
      {filtered.length === 0 && <EmptyState message={emptyMessage} backHref={backHref} />}

      {/* ── Featured item ──────────────────────────────────────────────────── */}
      {featured && (
        <section className="max-w-[var(--site-frame)] mx-auto px-4 md:px-8 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Link href={featured.href} className="group block">
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
                      <div className="flex items-center gap-2 text-sm font-bold text-[#E8A838]" style={{ fontFamily: 'var(--font-body)' }}>
                        Read <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
                <Link href={item.href} className="block">
                  {/* Image or placeholder */}
                  <div className="aspect-square bg-[#F7F8FA] mb-7 overflow-hidden relative">
                    {item.coverImage ? (
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
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
                      <span className="text-[#E8A838]">{item.tag}</span>
                      <span>{item.meta ?? (item.date ? fmtShort(item.date) : '')}</span>
                    </div>
                    <h3
                      className="text-xl leading-snug text-[#1A2535] group-hover:text-[#E8A838] transition-colors"
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
                    {/* Metrics row (case studies) */}
                    {item.metrics && item.metrics.length > 0 && (
                      <div className="flex gap-6 pt-3 border-t border-[#F7F8FA]">
                        {item.metrics.slice(0, 2).map((m) => (
                          <div key={m.label}>
                            <p className="text-lg font-semibold text-[#1A2535]" style={{ fontFamily: 'var(--font-headline)' }}>{m.value}</p>
                            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#9AA4B2] mt-0.5" style={{ fontFamily: 'var(--font-body)' }}>{m.label}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    <div
                      className="pt-4 flex items-center justify-between"
                      style={{ borderTop: item.metrics ? undefined : '1px solid rgba(198,198,205,0.3)' }}
                    >
                      <span className="text-xs text-[#6B7280] italic" style={{ fontFamily: 'var(--font-body)' }}>
                        {item.author?.name
                          ? `${item.author.name}${item.date ? ` • ${fmtShort(item.date)}` : ''}`
                          : item.date
                          ? fmtShort(item.date)
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
    </main>
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
  return (
    <>
      <div className="flex items-center gap-4 mb-5">
        <span
          className="text-xs font-bold tracking-widest uppercase px-3 py-1"
          style={{ color: '#E8A838', background: 'rgba(232,168,56,0.08)', fontFamily: 'var(--font-body)' }}
        >
          {item.tag}
        </span>
        {item.date && (
          <span className="text-xs font-medium text-[#6B7280]" style={{ fontFamily: 'var(--font-body)' }}>
            {fmt(item.date)}
          </span>
        )}
        {!item.date && item.meta && (
          <span className="text-xs font-medium text-[#6B7280]" style={{ fontFamily: 'var(--font-body)' }}>
            {item.meta}
          </span>
        )}
      </div>
      <h2
        className={`${titleSize === 'large' ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-3xl md:text-4xl'} mb-5 leading-tight text-[#1A2535] group-hover:text-[#E8A838] transition-colors`}
        style={{ fontFamily: 'var(--font-headline)' }}
      >
        {item.title}
      </h2>
      {titleSize === 'normal' && (
        <p className="text-[#536070] mb-6 leading-relaxed line-clamp-3" style={{ fontFamily: 'var(--font-body)' }}>
          {item.excerpt}
        </p>
      )}
      {/* Metrics (case studies) */}
      {item.metrics && item.metrics.length > 0 && (
        <div className="flex gap-8 mb-8 pt-5 border-t border-[#F7F8FA]">
          {item.metrics.slice(0, 2).map((m) => (
            <div key={m.label}>
              <p className="text-xl font-semibold text-[#1A2535]" style={{ fontFamily: 'var(--font-headline)' }}>{m.value}</p>
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#9AA4B2] mt-0.5" style={{ fontFamily: 'var(--font-body)' }}>{m.label}</p>
            </div>
          ))}
        </div>
      )}
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
          <span className="text-sm font-bold text-[#E8A838]" style={{ fontFamily: 'var(--font-body)' }}>
            {item.metrics ? 'Read Full Case Study' : 'Read →'}
          </span>
        )}
        <ArrowUpRight className="w-5 h-5 text-[#1A2535] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </div>
    </>
  );
}
