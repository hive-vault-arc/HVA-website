'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import BottomCTA from './BottomCTA';
import SectionBrandMark from './SectionBrandMark';

/* ── Types ───────────────────────────────────────────────────────────────── */

export type RelatedItem = {
  href: string;
  title: string;
  tag: string;
  coverImage?: string;
};

type BottomCtaConfig = {
  variant?: 'dark' | 'blue' | 'light';
  headline: string;
  subtext: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  // Breadcrumb
  backHref: string;
  backLabel: string;
  crumbText?: string;
  breadcrumbs?: BreadcrumbItem[];

  // Hero meta
  eyebrow: string;
  publishedAt?: string;
  readTime?: string;
  metaLabel?: string;

  // Headline
  title: string;
  subtitle?: string;

  // Author (blogs only)
  author?: { name: string; role: string; initials: string };
  authorHref?: string;

  // Cover image
  coverImage?: string;
  coverAlt?: string;

  // Content slots
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  contentAsArticle?: boolean;

  // About strip
  showAboutStrip?: boolean;

  // Related grid
  relatedItems?: RelatedItem[];
  relatedTitle?: string;
  relatedAllHref?: string;
  relatedAllLabel?: string;

  // Bottom CTA
  bottomCta?: BottomCtaConfig;
};

/* ── Date helpers ────────────────────────────────────────────────────────── */

function toIsoDateTime(input: string) {
  return input.includes('T') ? input : `${input}T00:00:00Z`;
}

function fmtDate(isoDateTime: string) {
  return new Date(isoDateTime).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/* ── Component ───────────────────────────────────────────────────────────── */

export default function ArticleDetailPage({
  backHref,
  backLabel,
  crumbText,
  breadcrumbs,
  eyebrow,
  publishedAt,
  readTime,
  metaLabel,
  title,
  subtitle,
  author,
  authorHref = '/whoweare/abouthva',
  coverImage,
  coverAlt,
  children,
  sidebar,
  contentAsArticle = false,
  showAboutStrip = false,
  relatedItems = [],
  relatedTitle = 'Related Insights',
  relatedAllHref,
  relatedAllLabel = 'All Articles',
  bottomCta,
}: Props) {
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const isoDate = publishedAt ? toIsoDateTime(publishedAt) : undefined;
  const resolvedBreadcrumbs =
    breadcrumbs && breadcrumbs.length > 0
      ? breadcrumbs
      : [
          { label: 'Home', href: '/' },
          { label: backLabel, href: backHref },
          { label: crumbText ?? title },
        ];

  return (
    <div className="bg-[#FFFFFF]">
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#E8A838] via-[#F0C15A] to-[#E8A838]"
        style={{ scaleX: progressScale }}
      />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#F7F8FA] pt-28 pb-14 sm:pt-32 md:pt-36 md:pb-16">
        <div className="site-frame-narrow">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-[#6B7280]">
              {resolvedBreadcrumbs.map((crumb, index) => {
                const isCurrent = index === resolvedBreadcrumbs.length - 1;
                return (
                  <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                    {index === 1 && crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="inline-flex items-center gap-2 hover:text-[#1A2535] transition-colors"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        <ArrowLeft className="w-4 h-4" />
                        {crumb.label}
                      </Link>
                    ) : crumb.href && !isCurrent ? (
                      <Link
                        href={crumb.href}
                        className="hover:text-[#1A2535] transition-colors"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span
                        aria-current={isCurrent ? 'page' : undefined}
                        className={isCurrent ? 'font-medium text-[#1A2535] truncate max-w-[12rem] sm:max-w-[240px]' : undefined}
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {crumb.label}
                      </span>
                    )}
                    {!isCurrent && <span aria-hidden="true" className="text-[#CDD2DA] text-xs">/</span>}
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Meta row */}
          <div
            className="flex flex-wrap items-center gap-4 mb-7 text-xs font-bold tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <SectionBrandMark size="sm" className="mr-1" />
            <span style={{ color: 'var(--section-label-color)' }}>{eyebrow}</span>
            {isoDate && (
              <>
                <span className="w-1 h-1 rounded-full bg-[#CDD2DA]" />
                <time dateTime={isoDate} className="text-[#6B7280]">
                  {fmtDate(isoDate)}
                </time>
              </>
            )}
            {readTime && (
              <>
                <span className="w-1 h-1 rounded-full bg-[#CDD2DA]" />
                <span className="text-[#6B7280]">{readTime}</span>
              </>
            )}
            {!readTime && metaLabel && (
              <>
                <span className="w-1 h-1 rounded-full bg-[#CDD2DA]" />
                <span className="text-[#6B7280]">{metaLabel}</span>
              </>
            )}
          </div>

          {/* Title */}
          <motion.h1
            className="mb-6 text-[clamp(2.4rem,11vw,3.8rem)] leading-tight tracking-tight text-[#1A2535] md:text-6xl"
            style={{ fontFamily: 'var(--font-headline)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              className="text-lg text-[#536070] leading-relaxed max-w-2xl mb-10"
              style={{ fontFamily: 'var(--font-body)' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Author block */}
          {author && (
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="w-10 h-10 bg-[#1A2535] flex items-center justify-center text-white text-xs font-bold shrink-0">
                {author.initials}
              </div>
              <address className="not-italic">
                <p className="text-sm text-[#1A2535]" style={{ fontFamily: 'var(--font-body)' }}>
                  <span>By </span>
                  <Link rel="author" href={authorHref} className="text-[var(--section-label-color)] hover:underline">
                    {author.name}
                  </Link>
                </p>
                <p className="text-xs text-[#6B7280]" style={{ fontFamily: 'var(--font-body)' }}>
                  {author.role}
                </p>
              </address>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Cover image ────────────────────────────────────────────────────── */}
      {coverImage && (
        <div className="site-frame-narrow -mt-1">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E8EBF0] sm:aspect-[16/9] lg:aspect-[21/9]">
            <Image
              src={coverImage}
              alt={coverAlt ?? title}
              fill
              className="object-cover"
              loading="eager"
              sizes="(max-width: 1024px) calc(100vw - 2rem), min(1640px, calc(100vw - 5rem))"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-transparent to-transparent" />
          </div>
        </div>
      )}

      {/* ── Body + Sidebar ─────────────────────────────────────────────────── */}
      <section className="site-frame-narrow py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Sticky Sidebar — 3 cols */}
          {sidebar && (
            <aside className="order-2 lg:order-1 lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                {sidebar}
              </div>
            </aside>
          )}

          {/* Main content — 9 cols (or full 12 if no sidebar) */}
          <div className={sidebar ? 'order-1 lg:order-2 lg:col-span-9' : 'lg:col-span-12'}>
            {contentAsArticle ? (
              <motion.article
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                itemScope
                itemType="https://schema.org/Article"
              >
                {children}
              </motion.article>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                {children}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── About Hive Vault Arc strip ──────────────────────────────────────────────── */}
      {showAboutStrip && (
        <section className="bg-[#F7F8FA] py-16">
          <div className="site-frame-narrow flex flex-col md:flex-row gap-10 items-center md:items-start">
            <SectionBrandMark size="lg" />
            <div className="flex-1 text-center md:text-left">
              <h2
                className="text-2xl mb-3 text-[#1A2535]"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                About Hive Vault Arc
              </h2>
              <p
                className="text-[#536070] leading-relaxed mb-6 max-w-xl"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Hive Vault Arc is a technology consulting and digital transformation firm based in Tangier, Morocco. We advise, engineer, build, ship, and maintain intelligent systems across AI, automation, custom software, IT modernization, cloud infrastructure, and data capabilities.
              </p>
              <Link
                href="/case-studies"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--section-label-color)] transition-all hover:gap-4"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Explore case studies
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Related items ──────────────────────────────────────────────────── */}
      {relatedItems.length > 0 && (
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest text-[var(--section-label-color)] mb-3"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Continue Reading
                </p>
                <h2
                  className="text-4xl text-[#1A2535]"
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  {relatedTitle}
                </h2>
              </div>
              {relatedAllHref && (
                <Link
                  href={relatedAllHref}
                  className="hidden md:inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#1A2535] hover:text-[#E8A838] transition-colors pb-1"
                  style={{ fontFamily: 'var(--font-body)', borderBottom: '2px solid #1A2535' }}
                >
                  {relatedAllLabel}
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {relatedItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  className="group"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                >
                  <Link href={item.href} className="block">
                    <div className="aspect-[4/3] mb-5 overflow-hidden bg-[#E8EBF0] relative">
                      {item.coverImage ? (
                        <Image
                          src={item.coverImage}
                          alt={item.title}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span
                            className="text-3xl font-light italic text-[#CDD2DA] select-none"
                            style={{ fontFamily: 'var(--font-headline)' }}
                          >
                            {item.tag}
                          </span>
                        </div>
                      )}
                    </div>
                    <p
                      className="text-xs font-bold uppercase tracking-widest mb-3"
                      style={{ color: '#E8A838', fontFamily: 'var(--font-body)' }}
                    >
                      {item.tag}
                    </p>
                    <h3
                      className="text-xl text-[#1A2535] group-hover:text-[#E8A838] transition-colors leading-snug"
                      style={{ fontFamily: 'var(--font-headline)' }}
                    >
                      {item.title}
                    </h3>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ─────────────────────────────────────────────────────── */}
      {bottomCta && (
        <BottomCTA
          variant={bottomCta.variant}
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
