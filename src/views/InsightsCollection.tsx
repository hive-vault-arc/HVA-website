'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageAmbientBackground from '../components/PageAmbientBackground';
import type { InsightCard } from '../lib/insights';

type InsightsCollectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  cards: InsightCard[];
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function InsightsCollection({ eyebrow, title, description, cards }: Readonly<InsightsCollectionProps>) {
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
            {eyebrow}
          </p>
          <h1 className="font-headline text-4xl font-medium leading-[1.04] tracking-tight sm:text-5xl lg:text-[4.5rem]">
            {title}
          </h1>
          <p className="mt-8 max-w-2xl text-xl font-light leading-relaxed text-[#0F172A]/60">
            {description}
          </p>
          <Link
            href="/insights"
            className="mt-8 inline-flex items-center text-sm font-bold uppercase tracking-wide text-[#2563EB] hover:text-[#1d4ed8] transition-colors duration-200"
          >
            ← Back to all insights
          </Link>
        </motion.div>
      </section>

      {/* ── Cards Grid ────────────────────────────────────────────────────── */}
      <section className="bg-[#F2F4F6] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-14">
          {cards.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-[#94a3b8]">
                No entries yet — check back soon.
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 gap-px bg-[#e2e8f0] md:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ staggerChildren: 0.07 }}
            >
              {cards.map((card) => (
                <motion.article
                  key={card.slug}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col bg-[#F2F4F6] p-8 md:p-10"
                >
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#94a3b8]">
                    {card.tag}
                  </p>
                  <h2 className="font-headline text-2xl text-[#0F172A]">{card.title}</h2>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-[#475569]">{card.summary}</p>
                  <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#94a3b8]">
                    {card.publishedAt}
                  </p>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
