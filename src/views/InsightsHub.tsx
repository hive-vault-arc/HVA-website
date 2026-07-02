'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageAmbientBackground from '../components/PageAmbientBackground';
import BottomCTA from '../components/BottomCTA';
import InsightsSlider, { type SlideItem } from '../components/InsightsSlider';
import SectionBrandMark from '../components/SectionBrandMark';
import type { BlogPost } from '../lib/blog';
import type { InsightCard as ResearchReport, NewsArticle } from '../lib/insights';
import type { Perspective } from '../lib/perspectives';
import type { CaseStudy } from '../lib/proof';

const CATEGORY_CARDS = [
  {
    label: 'Blogs',
    href: '/blog',
    image: '/Images/insights/hva-insights-blog-articles-tangier-morocco.webp',
  },
  {
    label: 'Case Studies',
    href: '/case-studies',
    image: '/Images/insights/hva-case-studies-ai-transformation-morocco.webp',
  },
  {
    label: 'News Articles',
    href: '/insights/news-articles',
    image: '/Images/insights/hva-news-articles-ai-industry-updates.webp',
  },
  {
    label: 'Perspectives',
    href: '/insights/perspectives',
    image: '/Images/insights/hva-perspectives-strategic-ai-insights.webp',
  },
  {
    label: 'Research Reports',
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
        const isHovered = hovered === cat.href;
        return (
          <motion.div
            key={cat.href}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden"
            style={{ height: 300 }}
            onMouseEnter={() => setHovered(cat.href)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Image */}
            <motion.img
              src={cat.image}
              alt={cat.label}
              className="absolute inset-0 w-full h-full object-cover"
              animate={{
                scale: isHovered ? 1.07 : 1,
                filter: isHovered ? 'blur(6px)' : 'blur(0px)',
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Always-on dark gradient at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A2535]/80 via-[#1A2535]/20 to-transparent" />

            {/* Default state — small label bottom-left */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-5"
              animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? 6 : 0 }}
              transition={{ duration: 0.22 }}
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">
                Insight Type
              </p>
              <h2 className="font-headline text-lg font-medium text-white leading-tight">
                {cat.label}
              </h2>
            </motion.div>

            {/* Hover state — bigger title + button */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-center items-start p-6"
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.28 }}
              style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
            >
              <h2 className="font-headline text-2xl font-medium text-white leading-tight mb-5">
                {cat.label}
              </h2>
              <Link
                href={cat.href}
                className="inline-flex items-center gap-2 px-4 py-2 text-[10px] font-bold
                           uppercase tracking-[0.14em] text-white border border-white/40
                           bg-white/10 backdrop-blur-sm hover:bg-[#E8A838] hover:border-[#E8A838]
                           transition-colors duration-200"
              >
                Open {cat.label}
                <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ── Latest section ───────────────────────────────────────────────────────── */

type InsightGridItem = {
  id: string;
  type: 'blog' | 'case-study' | 'news-article' | 'perspective' | 'research-report';
  typeLabel: string;
  tag: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
  date: string;
  readTime?: string;
  meta?: string;
};

type LatestProps = {
  readonly items: InsightGridItem[];
};

function ctaLabelFor(item: InsightGridItem) {
  if (item.type === 'case-study') return 'Read case study';
  if (item.type === 'research-report') return 'Open report';
  return 'Read insight';
}

function LatestSection({ items }: LatestProps) {
  const [latestPrimary, latestSecondary] = items;

  if (!latestPrimary && !latestSecondary) return null;

  return (
    <section className="soft-grid-section py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-14">
        <div className="mb-10 flex items-center gap-3">
          <SectionBrandMark size="sm" />
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E8A838]">
            Latest
          </p>
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
                  className="absolute inset-0 w-full h-full object-cover opacity-60
                             transition-transform duration-700 group-hover:scale-105"
                />
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2535] via-[#1A2535]/50 to-transparent" />

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-10" style={{ minHeight: 480 }}>
                <div className="mb-auto pt-6 flex items-center gap-2">
                  <span className="h-[1px] w-6 bg-[#E8A838]" />
                  <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#F0C15A]">
                    Latest {latestPrimary.typeLabel} · {latestPrimary.tag}
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
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-[10px] font-bold
                                 uppercase tracking-[0.14em] text-white border border-white/30
                                 bg-white/10 backdrop-blur-sm hover:bg-[#E8A838] hover:border-[#E8A838]
                                 transition-all duration-200"
                    >
                      {ctaLabelFor(latestPrimary)} <span aria-hidden="true">→</span>
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
                    className="absolute inset-0 w-full h-full object-cover opacity-80
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
                <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.24em] text-[#E8A838]">
                  Latest {latestSecondary.typeLabel}
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
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase
                               tracking-[0.14em] text-[#1A2535] border border-[#1A2535]
                               px-4 py-2 hover:bg-[#1A2535] hover:text-white transition-all duration-200"
                  >
                    {ctaLabelFor(latestSecondary)} <span aria-hidden="true">→</span>
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

function timeValue(date: string) {
  const value = Date.parse(date);
  return Number.isNaN(value) ? 0 : value;
}

function sortLatestFirst(items: InsightGridItem[]) {
  return [...items].sort((a, b) => timeValue(b.date) - timeValue(a.date));
}

function buildAllInsights(
  posts: BlogPost[],
  studies: CaseStudy[],
  newsArticles: NewsArticle[],
  perspectives: Perspective[],
  researchReports: ResearchReport[],
): InsightGridItem[] {
  const blogItems = posts.map((p) => ({
    id: `blog-${p.slug}`,
    type: 'blog' as const,
    typeLabel: 'Blog',
    tag: p.category,
    title: p.title,
    excerpt: p.excerpt,
    image: p.coverImage ?? '',
    href: `/blog/${p.slug}`,
    date: p.publishedAt,
    readTime: p.readTime,
  }));

  const caseItems = studies.map((s) => ({
    id: `case-${s.slug}`,
    type: 'case-study' as const,
    typeLabel: 'Case Study',
    tag: s.industry,
    title: s.title,
    excerpt: s.summary,
    image: s.assets.coverImage ?? '',
    href: `/case-studies/${s.slug}`,
    date: s.lastUpdated,
    meta: s.clientName,
  }));

  const newsItems = newsArticles.map((article) => ({
    id: `news-${article.slug}`,
    type: 'news-article' as const,
    typeLabel: 'News Article',
    tag: article.category || article.tag,
    title: article.title,
    excerpt: article.summary,
    image: article.coverImage ?? '',
    href: `/insights/news-articles/${article.slug}`,
    date: article.publishedAt,
    readTime: article.readTime,
  }));

  const perspectiveItems = perspectives.map((perspective) => ({
    id: `perspective-${perspective.slug}`,
    type: 'perspective' as const,
    typeLabel: 'Perspective',
    tag: perspective.tag,
    title: perspective.title,
    excerpt: perspective.summary,
    image: perspective.coverImage ?? '',
    href: `/insights/perspectives/${perspective.slug}`,
    date: perspective.publishedAt,
    readTime: perspective.readTime,
  }));

  const reportItems = researchReports.map((report) => ({
    id: `research-${report.slug}`,
    type: 'research-report' as const,
    typeLabel: 'Research Report',
    tag: report.tag,
    title: report.title,
    excerpt: report.summary,
    image: report.coverImage ?? '',
    href: '/insights/research-reports',
    date: report.publishedAt,
    readTime: report.readTime,
  }));

  return sortLatestFirst([
    ...blogItems,
    ...caseItems,
    ...newsItems,
    ...perspectiveItems,
    ...reportItems,
  ]);
}

const INITIAL_COUNT = 6;

function buildSliderItems(items: InsightGridItem[]): SlideItem[] {
  return items.map((item) => ({
    id: item.id,
    tag: item.tag,
    title: item.title,
    description: item.excerpt,
    image: item.image,
    href: item.href,
  }));
}

function InsightGridCard({ item, index }: { readonly item: InsightGridItem; readonly index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.06 }}
      className="group relative overflow-hidden bg-[#1A2535] cursor-pointer"
      style={{ height: 320 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      {item.image && (
        <motion.img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{
            scale: hovered ? 1.07 : 1,
            filter: hovered ? 'blur(6px)' : 'blur(0px)',
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      )}

      {/* Base overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A2535]/85 via-[#1A2535]/25 to-transparent" />

      {/* Tag — fades on hover */}
      <motion.div
        className="absolute top-4 left-4 flex items-center gap-1.5"
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#F0C15A]" />
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white">
          {item.tag}
        </span>
      </motion.div>

      {/* Default bottom title */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-5"
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <p className="font-headline text-lg font-medium text-white leading-snug line-clamp-2">
          {item.title}
        </p>
      </motion.div>

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-start p-5 pt-8"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.28 }}
        style={{ pointerEvents: hovered ? 'auto' : 'none', background: 'rgba(15,23,42,0.72)', backdropFilter: 'blur(2px)' }}
      >
        <h3 className="font-headline text-xl font-medium text-white leading-snug mb-3">
          {item.title}
        </h3>
        <p className="text-xs leading-relaxed text-white/65 line-clamp-3 mb-5">
          {item.excerpt}
        </p>
        <Link
          href={item.href}
          className="inline-flex items-center gap-2 self-start px-4 py-2 text-[9px] font-bold
                     uppercase tracking-[0.14em] text-white border border-white/35
                     bg-white/10 backdrop-blur-sm hover:bg-[#E8A838] hover:border-[#E8A838]
                     transition-all duration-200"
        >
          Open {item.typeLabel.toLowerCase()} <span aria-hidden="true">→</span>
        </Link>
      </motion.div>
    </motion.article>
  );
}

function AllInsightsGrid({ items }: { readonly items: InsightGridItem[] }) {
  const [revealed, setRevealed] = useState(false);
  const visible = revealed ? items : items.slice(0, INITIAL_COUNT);
  const hasMore = items.length > INITIAL_COUNT && !revealed;

  return (
    <section className="py-20 bg-[#FFFFFF]">
      <div className="mx-auto max-w-7xl px-6 lg:px-14">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <SectionBrandMark size="sm" />
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E8A838]">
                All Insights
              </p>
            </div>
            <h2 className="font-headline text-2xl font-medium text-[#1A2535]">
              Everything We've Published
            </h2>
          </div>
          <span className="text-[10px] text-[#9AA4B2] uppercase tracking-widest hidden sm:block">
            {items.length} items
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, i) => (
            <InsightGridCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setRevealed(true)}
              className="inline-flex min-h-11 items-center gap-3 px-8 py-3.5 text-[10px] font-bold
                         uppercase tracking-[0.18em] text-[#1A2535] border border-[#1A2535]
                         hover:bg-[#1A2535] hover:text-white transition-all duration-200"
            >
              {"Load more "}
              <span aria-hidden="true" className="text-xs">↓</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function InsightsHub({
  posts,
  caseStudies,
  newsArticles,
  perspectives,
  researchReports,
}: {
  readonly posts: BlogPost[];
  readonly caseStudies: CaseStudy[];
  readonly newsArticles: NewsArticle[];
  readonly perspectives: Perspective[];
  readonly researchReports: ResearchReport[];
}) {
  const allInsights = buildAllInsights(posts, caseStudies, newsArticles, perspectives, researchReports);
  const sliderItems = buildSliderItems(allInsights);

  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative isolate overflow-x-hidden bg-[#FFFFFF] text-[#1A2535]">
      {/* Scroll progress */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#E8A838] via-[#F0C15A] to-[#E8A838]"
        style={{ scaleX: progressScale }}
      />

      <PageAmbientBackground className="-z-10" />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pt-28 pb-10 lg:px-14">
        <div className="flex items-center justify-between gap-12">
          {/* Left — text */}
          <motion.div
            className="flex-1 min-w-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="mb-5 flex items-center gap-3">
              <SectionBrandMark size="sm" />
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E8A838]">
                Insights
              </p>
            </div>
            <h1 className="font-headline text-4xl font-medium leading-[1.04] tracking-tight sm:text-5xl lg:text-[4.25rem]">
              What We Think,
              <br />
              <em className="italic text-[#566274]">Test, and Ship.</em>
            </h1>
            <div className="mt-6 flex items-center gap-4">
              <span className="block h-px w-8 bg-[#E8A838] flex-shrink-0" />
              <p className="text-sm leading-relaxed text-[#1A2535]/55 max-w-sm">
                Blogs, case studies, perspectives &amp; research — grounded in real operational work.
              </p>
            </div>
          </motion.div>

          {/* Right — decorative geometric mark */}
          <motion.div
            className="hidden lg:flex flex-shrink-0 items-center justify-center"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            aria-hidden="true"
          >
            <svg
              width="220"
              height="220"
              viewBox="0 0 220 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer ring */}
              <circle cx="110" cy="110" r="104" stroke="#E8A838" strokeWidth="1" strokeOpacity="0.18" />
              {/* Mid ring */}
              <circle cx="110" cy="110" r="76" stroke="#E8A838" strokeWidth="1" strokeOpacity="0.28" />
              {/* Inner ring */}
              <circle cx="110" cy="110" r="48" stroke="#1A2535" strokeWidth="1" strokeOpacity="0.12" />

              {/* Crosshair lines */}
              <line x1="6" y1="110" x2="214" y2="110" stroke="#1A2535" strokeWidth="1" strokeOpacity="0.08" />
              <line x1="110" y1="6" x2="110" y2="214" stroke="#1A2535" strokeWidth="1" strokeOpacity="0.08" />

              {/* Tick marks at 12 positions on outer ring */}
              {Array.from({ length: 12 }).map((_, k) => {
                const angle = (k * 30 * Math.PI) / 180;
                const r1 = 98;
                const r2 = k % 3 === 0 ? 86 : 92;
                const x1 = 110 + r1 * Math.cos(angle);
                const y1 = 110 + r1 * Math.sin(angle);
                const x2 = 110 + r2 * Math.cos(angle);
                const y2 = 110 + r2 * Math.sin(angle);
                return (
                  <line
                    key={`tick-${k * 30}`}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#E8A838"
                    strokeWidth={k % 3 === 0 ? '1.5' : '1'}
                    strokeOpacity={k % 3 === 0 ? '0.55' : '0.28'}
                  />
                );
              })}

              {/* Centre dot */}
              <circle cx="110" cy="110" r="3.5" fill="#E8A838" fillOpacity="0.7" />

              {/* Small accent dot — NE quadrant */}
              <circle cx="152" cy="68" r="3" fill="#E8A838" fillOpacity="0.45" />

              {/* Dashed arc segment — bottom-left quadrant */}
              <path
                d="M 34 143 A 80 80 0 0 1 77 34"
                stroke="#E8A838"
                strokeWidth="1"
                strokeOpacity="0.35"
                strokeDasharray="4 6"
                fill="none"
              />

              {/* Label text */}
              <text
                x="110"
                y="198"
                textAnchor="middle"
                fontSize="7"
                letterSpacing="3"
                fill="#566274"
                fillOpacity="0.5"
                fontFamily="system-ui, sans-serif"
              >
                HIVE VAULT ARC INSIGHTS
              </text>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* ── Insights Slider ──────────────────────────────────────────────── */}
      <InsightsSlider items={sliderItems} />

      {/* ── Category Navigation ───────────────────────────────────────────── */}
      <section className="soft-grid-section py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-14">
          <div className="mb-8 flex items-center gap-3">
            <SectionBrandMark size="sm" />
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E8A838]">
              Insight Types
            </p>
          </div>
          <CategoryCards />
        </div>
      </section>

      {/* ── Latest Featured ───────────────────────────────────────────────── */}
      <LatestSection items={allInsights.slice(0, 2)} />

      {/* ── All Insights Grid ────────────────────────────────────────────── */}
      <AllInsightsGrid items={allInsights} />

      <BottomCTA
        variant="light"
        headline="Need Insights Mapped to Your Operations?"
        subtext="We can translate these insights into a practical transformation roadmap for your team."
        primaryLabel="Book Discovery Call"
        primaryHref="/contact"
        secondaryLabel="View Capabilities"
        secondaryHref="/capabilities"
      />
    </div>
  );
}
