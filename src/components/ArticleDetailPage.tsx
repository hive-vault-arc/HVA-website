'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import BottomCTA from './BottomCTA';

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
    <main className="bg-[#f7f9fb]">
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#2563EB] via-[#60a5fa] to-[#0ea5e9]"
        style={{ scaleX: progressScale }}
      />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#f2f4f6] pt-36 pb-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-[#76777d]">
              {resolvedBreadcrumbs.map((crumb, index) => {
                const isCurrent = index === resolvedBreadcrumbs.length - 1;
                return (
                  <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                    {index === 1 && crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="inline-flex items-center gap-2 hover:text-[#0F172A] transition-colors"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        <ArrowLeft className="w-4 h-4" />
                        {crumb.label}
                      </Link>
                    ) : crumb.href && !isCurrent ? (
                      <Link
                        href={crumb.href}
                        className="hover:text-[#0F172A] transition-colors"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span
                        aria-current={isCurrent ? 'page' : undefined}
                        className={isCurrent ? 'font-medium text-[#191c1e] truncate max-w-[240px]' : undefined}
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {crumb.label}
                      </span>
                    )}
                    {!isCurrent && <span aria-hidden="true" className="text-[#c6c6cd] text-xs">/</span>}
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
            <span style={{ color: '#2563EB' }}>{eyebrow}</span>
            {isoDate && (
              <>
                <span className="w-1 h-1 rounded-full bg-[#c6c6cd]" />
                <time dateTime={isoDate} className="text-[#76777d]">
                  {fmtDate(isoDate)}
                </time>
              </>
            )}
            {readTime && (
              <>
                <span className="w-1 h-1 rounded-full bg-[#c6c6cd]" />
                <span className="text-[#76777d]">{readTime}</span>
              </>
            )}
            {!readTime && metaLabel && (
              <>
                <span className="w-1 h-1 rounded-full bg-[#c6c6cd]" />
                <span className="text-[#76777d]">{metaLabel}</span>
              </>
            )}
          </div>

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-6xl leading-tight tracking-tight text-[#0F172A] mb-6"
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
              className="text-lg text-[#45464d] leading-relaxed max-w-2xl mb-10"
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
              <div className="w-10 h-10 bg-[#0F172A] flex items-center justify-center text-white text-xs font-bold shrink-0">
                {author.initials}
              </div>
              <address className="not-italic">
                <p className="text-sm text-[#191c1e]" style={{ fontFamily: 'var(--font-body)' }}>
                  <span>By </span>
                  <Link rel="author" href={authorHref} className="text-[#2563EB] hover:underline">
                    {author.name}
                  </Link>
                </p>
                <p className="text-xs text-[#76777d]" style={{ fontFamily: 'var(--font-body)' }}>
                  {author.role}
                </p>
              </address>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Cover image ────────────────────────────────────────────────────── */}
      {coverImage && (
        <div className="max-w-5xl mx-auto px-4 md:px-8 -mt-1">
          <div className="relative w-full aspect-[21/9] overflow-hidden bg-[#e0e3e5]">
            <Image
              src={coverImage}
              alt={coverAlt ?? title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f7f9fb] via-transparent to-transparent" />
          </div>
        </div>
      )}

      {/* ── Body + Sidebar ─────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Sticky Sidebar — 3 cols */}
          {sidebar && (
            <aside className="md:col-span-3 order-2 md:order-1">
              <div className="sticky top-28">
                {sidebar}
              </div>
            </aside>
          )}

          {/* Main content — 9 cols (or full 12 if no sidebar) */}
          <div className={sidebar ? 'md:col-span-9 order-1 md:order-2' : 'md:col-span-12'}>
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

      {/* ── About H.V.A strip ──────────────────────────────────────────────── */}
      {showAboutStrip && (
        <section className="bg-[#f2f4f6] py-16 px-4 md:px-8">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-center md:items-start">
            <div className="w-16 h-16 bg-[#0F172A] flex items-center justify-center text-white text-sm font-bold shrink-0">
              HV
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3
                className="text-2xl mb-3 text-[#191c1e]"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                About Hive Vault Arc
              </h3>
              <p
                className="text-[#45464d] leading-relaxed mb-6 max-w-xl"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                H.V.A is a technology consulting and digital transformation firm based in Tangier, Morocco. We advise, engineer, build, ship, and maintain intelligent systems across AI, automation, custom software, IT modernization, cloud infrastructure, and data capabilities.
              </p>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-[#2563EB] hover:gap-4 transition-all"
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
            <div className="flex justify-between items-end mb-12">
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest text-[#76777d] mb-3"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Continue Reading
                </p>
                <h2
                  className="text-4xl text-[#191c1e]"
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  {relatedTitle}
                </h2>
              </div>
              {relatedAllHref && (
                <Link
                  href={relatedAllHref}
                  className="hidden md:inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#0F172A] hover:text-[#2563EB] transition-colors pb-1"
                  style={{ fontFamily: 'var(--font-body)', borderBottom: '2px solid #0F172A' }}
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
                    <div className="aspect-[4/3] mb-5 overflow-hidden bg-[#e0e3e5] relative">
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
                            className="text-3xl font-light italic text-[#c6c6cd] select-none"
                            style={{ fontFamily: 'var(--font-headline)' }}
                          >
                            {item.tag}
                          </span>
                        </div>
                      )}
                    </div>
                    <p
                      className="text-xs font-bold uppercase tracking-widest mb-3"
                      style={{ color: '#2563EB', fontFamily: 'var(--font-body)' }}
                    >
                      {item.tag}
                    </p>
                    <h3
                      className="text-xl text-[#191c1e] group-hover:text-[#2563EB] transition-colors leading-snug"
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
    </main>
  );
}
