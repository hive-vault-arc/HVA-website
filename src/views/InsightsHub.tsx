'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageAmbientBackground from '../components/PageAmbientBackground';
import BottomCTA from '../components/BottomCTA';
import { INSIGHTS_CATEGORIES, NEWS_ARTICLES, PERSPECTIVES, RESEARCH_REPORTS } from '../lib/insights';
import { getAllPosts } from '../lib/blog';
import { getAllCaseStudies } from '../lib/proof';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

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
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-14">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">
            Insights
          </p>
          <h1 className="font-headline text-4xl font-medium leading-[1.04] tracking-tight sm:text-5xl lg:text-[4.5rem]">
            What We Think,
            <br />
            <em className="italic text-[#475569]">Test, and Ship.</em>
          </h1>
          <p className="mt-8 max-w-2xl text-xl font-light leading-relaxed text-[#0F172A]/60">
            One insight ecosystem for blogs, case studies, news articles, perspectives, and research
            reports — all grounded in real operational work.
          </p>
        </motion.div>
      </section>

      {/* ── Category Navigation ───────────────────────────────────────────── */}
      <section className="bg-[#F2F4F6] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-14">
          <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">
            Insight Types
          </p>
          <motion.div
            className="grid grid-cols-1 gap-px bg-[#e2e8f0] md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ staggerChildren: 0.08 }}
          >
            {INSIGHTS_CATEGORIES.map((category) => (
              <motion.div key={category.href} variants={fadeUp} transition={{ duration: 0.5 }}>
                <Link
                  href={category.href}
                  className="group flex flex-col bg-[#F2F4F6] p-8 transition-colors duration-200 hover:bg-white md:p-10"
                >
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#94a3b8]">
                    Insight Type
                  </p>
                  <h2 className="font-headline text-3xl text-[#0F172A]">{category.label}</h2>
                  <p className="mt-4 text-sm font-bold uppercase tracking-wide text-[#2563EB] transition-colors duration-200 group-hover:text-[#1d4ed8]">
                    {'Open '}
                    {category.label.toLowerCase()}
                    {' →'}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
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
        secondaryLabel="View Services"
        secondaryHref="/services"
      />
    </div>
  );
}
