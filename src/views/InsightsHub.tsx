'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import BottomCTA from '../components/BottomCTA';
import InsightsSlider, { type SlideItem } from '../components/InsightsSlider';
import PageAmbientBackground from '../components/PageAmbientBackground';
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
                className="absolute inset-0 h-full w-full object-cover"
                animate={{
                  scale: isHovered ? 1.07 : 1,
                  filter: isHovered ? 'blur(6px)' : 'blur(0px)',
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
                  Insight Type
                </p>
                <span className="insights-category-title">{cat.label}</span>
              </motion.div>

              <motion.div
                className="absolute inset-0 flex flex-col items-start justify-center p-6"
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                transition={{ duration: 0.28 }}
                aria-hidden={!isHovered}
              >
                <span className="insights-category-title insights-category-title--hover">
                  {cat.label}
                </span>
                <span className="inline-flex items-center gap-2 border border-white/40 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-colors duration-200 group-hover:border-[#E8A838] group-hover:bg-[#E8A838]">
                  Open {cat.label}
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
          <h2 className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--section-label-color)]">
            Latest
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
                  <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[var(--section-label-color-dark)]">
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
                <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.24em] text-[var(--section-label-color)]">
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
    href: `/insights/research-reports/${report.slug}`,
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
      className="group relative overflow-hidden bg-[#1A2535]"
      style={{ height: 320 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      <Link
        href={item.href}
        className="absolute inset-0 block focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E8A838]"
      >
        {item.image && (
          <motion.img
            src={item.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            animate={{
              scale: hovered ? 1.07 : 1,
              filter: hovered ? 'blur(6px)' : 'blur(0px)',
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
            Open {item.typeLabel.toLowerCase()}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </motion.div>
      </Link>
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
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--section-label-color)]">
                All Insights
              </p>
            </div>
            <h2 className="font-headline text-2xl font-medium text-[#1A2535]">
              Everything We've Published
            </h2>
          </div>
          <span className="hidden text-[10px] uppercase tracking-widest text-[#566274] sm:block">
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
              <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
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
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-[#E8A838]"
        style={{ scaleX: progressScale }}
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden border-b border-[#DDE3EA]">
        <PageAmbientBackground className="opacity-[0.92]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-white/50" />

        <div className="relative z-10 mx-auto flex min-h-[340px] max-w-7xl items-end justify-between gap-12 px-6 pb-14 pt-32 lg:px-14 lg:pb-16">
          <motion.div
            className="min-w-0 flex-1 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="mb-5 flex items-center gap-3">
              <SectionBrandMark size="sm" />
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--section-label-color)]">
                Insights
              </p>
            </div>
            <h1 className="font-headline text-4xl font-medium leading-[1.04] sm:text-5xl lg:text-[4.25rem]">
              What We Think,
              <br />{' '}
              <em className="italic text-[#566274]">Test, and Ship.</em>
            </h1>
            <div className="mt-6 flex items-center gap-4">
              <span className="block h-px w-8 bg-[#E8A838] flex-shrink-0" />
              <p className="max-w-sm text-sm leading-relaxed text-[#566274]">
                Blogs, case studies, perspectives, and research grounded in real operational work.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="hidden flex-shrink-0 items-center justify-center lg:flex"
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
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--section-label-color)]">
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
