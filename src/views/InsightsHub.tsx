'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageAmbientBackground from '../components/PageAmbientBackground';
import BottomCTA from '../components/BottomCTA';
import InsightsSlider from '../components/InsightsSlider';
import { NEWS_ARTICLES, PERSPECTIVES, RESEARCH_REPORTS } from '../lib/insights';
// INSIGHTS_CATEGORIES replaced by CATEGORY_CARDS above
import { getAllPosts } from '../lib/blog';
import { getAllCaseStudies } from '../lib/proof';

const CATEGORY_CARDS = [
  {
    label: 'Blogs',
    href: '/insights/blogs',
    image: '/Images/ai-agents-integration-2026-enterprise-guide.webp',
  },
  {
    label: 'Case Studies',
    href: '/insights/case-studies',
    image: '/Images/whatsapp-ai-agent-operations-case-study-morocco.webp',
  },
  {
    label: 'News Articles',
    href: '/insights/news-articles',
    image: '/Images/hva-ai-software-agency-tangier.webp',
  },
  {
    label: 'Perspectives',
    href: '/insights/perspectives',
    image: '/Images/strategic-technology-consulting-tangier-morocco.png',
  },
  {
    label: 'Research Reports',
    href: '/insights/research-reports',
    image: '/Images/ai-powered-transformation-operations-tangier-morocco.webp',
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-[#0f172a]/20 to-transparent" />

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
                           bg-white/10 backdrop-blur-sm hover:bg-[#2563EB] hover:border-[#2563EB]
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

export default function InsightsHub() {
  const latestPost = getAllPosts()[0];
  const latestCaseStudy = getAllCaseStudies()[0];

  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative isolate overflow-x-hidden bg-[#F8FAFC] text-[#0F172A]">
      {/* Scroll progress */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#2563EB] via-[#60a5fa] to-[#0ea5e9]"
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
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">
              Insights
            </p>
            <h1 className="font-headline text-4xl font-medium leading-[1.04] tracking-tight sm:text-5xl lg:text-[4.25rem]">
              What We Think,
              <br />
              <em className="italic text-[#475569]">Test, and Ship.</em>
            </h1>
            <div className="mt-6 flex items-center gap-4">
              <span className="block h-px w-8 bg-[#2563EB] flex-shrink-0" />
              <p className="text-sm leading-relaxed text-[#0F172A]/55 max-w-sm">
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
              <circle cx="110" cy="110" r="104" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.18" />
              {/* Mid ring */}
              <circle cx="110" cy="110" r="76" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.28" />
              {/* Inner ring */}
              <circle cx="110" cy="110" r="48" stroke="#0F172A" strokeWidth="1" strokeOpacity="0.12" />

              {/* Crosshair lines */}
              <line x1="6" y1="110" x2="214" y2="110" stroke="#0F172A" strokeWidth="1" strokeOpacity="0.08" />
              <line x1="110" y1="6" x2="110" y2="214" stroke="#0F172A" strokeWidth="1" strokeOpacity="0.08" />

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
                    stroke="#2563EB"
                    strokeWidth={k % 3 === 0 ? '1.5' : '1'}
                    strokeOpacity={k % 3 === 0 ? '0.55' : '0.28'}
                  />
                );
              })}

              {/* Centre dot */}
              <circle cx="110" cy="110" r="3.5" fill="#2563EB" fillOpacity="0.7" />

              {/* Small accent dot — NE quadrant */}
              <circle cx="152" cy="68" r="3" fill="#2563EB" fillOpacity="0.45" />

              {/* Dashed arc segment — bottom-left quadrant */}
              <path
                d="M 34 143 A 80 80 0 0 1 77 34"
                stroke="#2563EB"
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
                fill="#475569"
                fillOpacity="0.5"
                fontFamily="system-ui, sans-serif"
              >
                H.V.A INSIGHTS
              </text>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* ── Insights Slider ──────────────────────────────────────────────── */}
      <InsightsSlider />

      {/* ── Category Navigation ───────────────────────────────────────────── */}
      <section className="bg-[#F2F4F6] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-14">
          <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">
            Insight Types
          </p>
          <CategoryCards />
        </div>
      </section>

      {/* ── Latest Featured ───────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-14">
          <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">
            Latest
          </p>
          <div className="grid grid-cols-1 gap-px bg-[#e2e8f0] lg:grid-cols-2">
            {latestPost && (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col bg-white p-8 md:p-10"
              >
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2563EB]">
                  Latest Blog
                </p>
                <h3 className="font-headline text-3xl text-[#0F172A]">{latestPost.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-[#475569]">{latestPost.excerpt}</p>
                <Link
                  href={`/blog/${latestPost.slug}`}
                  className="mt-6 inline-flex items-center text-sm font-bold uppercase tracking-wide text-[#2563EB] hover:text-[#1d4ed8] transition-colors duration-200"
                >
                  Read article →
                </Link>
              </motion.article>
            )}
            {latestCaseStudy && (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col bg-white p-8 md:p-10"
              >
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2563EB]">
                  Latest Case Study
                </p>
                <h3 className="font-headline text-3xl text-[#0F172A]">{latestCaseStudy.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-[#475569]">{latestCaseStudy.summary}</p>
                <Link
                  href={`/case-studies/${latestCaseStudy.slug}`}
                  className="mt-6 inline-flex items-center text-sm font-bold uppercase tracking-wide text-[#2563EB] hover:text-[#1d4ed8] transition-colors duration-200"
                >
                  Read case study →
                </Link>
              </motion.article>
            )}
          </div>
        </div>
      </section>

      {/* ── Signal Cards ──────────────────────────────────────────────────── */}
      <section className="bg-[#F2F4F6] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-14">
          <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">
            Recent Signals
          </p>
          <motion.div
            className="grid grid-cols-1 gap-px bg-[#e2e8f0] md:grid-cols-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ staggerChildren: 0.08 }}
          >
            {[
              { label: 'News Article', item: NEWS_ARTICLES[0] },
              { label: 'Perspective', item: PERSPECTIVES[0] },
              { label: 'Research Report', item: RESEARCH_REPORTS[0] },
            ].map(({ label, item }) =>
              item ? (
                <motion.article
                  key={label}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col bg-[#F2F4F6] p-8 md:p-10"
                >
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#94a3b8]">
                    {label}
                  </p>
                  <h4 className="font-headline text-2xl text-[#0F172A]">{item.title}</h4>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#475569]">{item.summary}</p>
                </motion.article>
              ) : null
            )}
          </motion.div>
        </div>
      </section>

      <BottomCTA
        variant="dark"
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


