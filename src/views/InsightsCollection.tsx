'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { InsightCard } from '../lib/insights';

type InsightsCollectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  cards: InsightCard[];
};

/* ── Empty state ─────────────────────────────────────────────────────────── */

function EmptyState({ title }: { readonly title: string }) {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center text-center"
      >
        {/* Geometric mark */}
        <div className="relative mb-10" aria-hidden="true">
          <div className="w-20 h-20 border border-[#c6c6cd] rotate-45" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border border-[#2563EB]/30 rotate-45" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-[#2563EB] rounded-full" />
          </div>
        </div>

        <p
          className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#2563EB] mb-5"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Coming Soon
        </p>
        <h2
          className="text-3xl md:text-4xl font-light text-[#0F172A] leading-tight mb-5 max-w-lg"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          {title} are being
          <br />
          <span className="italic">prepared for publishing.</span>
        </h2>
        <p
          className="text-[#76777d] max-w-md leading-relaxed mb-10"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          We publish deliberately — only when the content meets our editorial standard.
          Check back soon or explore other sections in the meantime.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <Link
            href="/insights"
            className="text-sm font-bold tracking-[0.15em] uppercase pb-1 text-[#0F172A]"
            style={{ borderBottom: '2px solid #0F172A', fontFamily: 'var(--font-body)' }}
          >
            ← All Insights
          </Link>
          <Link
            href="/blog"
            className="text-sm font-bold tracking-[0.15em] uppercase pb-1 text-[#76777d] hover:text-[#2563EB] transition-colors"
            style={{ borderBottom: '2px solid transparent', fontFamily: 'var(--font-body)' }}
          >
            Read the Blog →
          </Link>
        </div>
      </motion.div>

      {/* Thin rule at bottom */}
      <div className="mt-24 h-px bg-[#e0e3e5]" />
    </section>
  );
}

/* ── Main view ───────────────────────────────────────────────────────────── */

export default function InsightsCollection({
  eyebrow,
  title,
  description,
  cards,
}: Readonly<InsightsCollectionProps>) {
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const featured = cards[0];
  const rest = cards.slice(1);

  return (
    <main className="bg-[#f7f9fb] min-h-screen">
      {/* Scroll progress */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#2563EB] via-[#60a5fa] to-[#0ea5e9]"
        style={{ scaleX: progressScale }}
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="bg-[#f2f4f6] pt-36 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <span
              className="block text-xs font-bold tracking-[0.2em] uppercase mb-6 text-[#2563EB]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {eyebrow}
            </span>
            <h1
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight text-[#0F172A]"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              The H.V.A
              <br />
              <span className="italic">{title}</span>
            </h1>
          </div>
          <div className="lg:col-span-4 pb-2">
            <p
              className="text-lg leading-relaxed pl-6 text-[#45464d]"
              style={{ fontFamily: 'var(--font-body)', borderLeft: '2px solid #c6c6cd' }}
            >
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* ── Divider ─────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-12 pb-8">
        <div className="flex items-center gap-6">
          <Link
            href="/insights"
            className="text-xs font-bold tracking-[0.18em] uppercase pb-2 text-[#76777d] hover:text-[#2563EB] transition-colors"
            style={{ fontFamily: 'var(--font-body)', borderBottom: '2px solid transparent' }}
          >
            ← All Insights
          </Link>
        </div>
        <div className="mt-4 h-px bg-[#e0e3e5]" />
      </div>

      {/* ── Empty state ─────────────────────────────────────────────────── */}
      {cards.length === 0 && <EmptyState title={title} />}

      {/* ── Featured card (text-only) ────────────────────────────────────── */}
      {featured && (
        <section className="max-w-7xl mx-auto px-6 md:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div
              className="bg-white p-10 lg:p-16 group"
              style={{ boxShadow: '0 10px 40px rgba(25,28,30,0.06)' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left — large title */}
                <div className="lg:col-span-8">
                  <div className="flex items-center gap-4 mb-6">
                    <span
                      className="text-xs font-bold tracking-widest uppercase px-3 py-1"
                      style={{
                        color: '#2563EB',
                        background: 'rgba(37,99,235,0.08)',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {featured.tag}
                    </span>
                    <span
                      className="text-xs font-medium text-[#76777d]"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {new Date(featured.publishedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <h2
                    className="text-3xl md:text-4xl lg:text-5xl leading-tight text-[#191c1e] group-hover:text-[#2563EB] transition-colors mb-0"
                    style={{ fontFamily: 'var(--font-headline)' }}
                  >
                    {featured.title}
                  </h2>
                </div>
                {/* Right — summary + link */}
                <div className="lg:col-span-4 flex flex-col justify-between h-full gap-8">
                  <p
                    className="text-[#45464d] leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {featured.summary}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-[#2563EB]" style={{ fontFamily: 'var(--font-body)' }}>
                    Read →
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* ── Grid ────────────────────────────────────────────────────────── */}
      {rest.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-8 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {rest.map((card, i) => (
              <motion.article
                key={card.slug}
                className="group border-t border-[#e0e3e5] pt-8"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              >
                <div className="space-y-4">
                  <div
                    className="flex justify-between items-center text-[10px] font-bold tracking-[0.2em] uppercase"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <span className="text-[#2563EB]">{card.tag}</span>
                    <span className="text-[#94a3b8]">
                      {new Date(card.publishedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <h3
                    className="text-xl leading-snug text-[#191c1e] group-hover:text-[#2563EB] transition-colors"
                    style={{ fontFamily: 'var(--font-headline)' }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-[#45464d] text-sm leading-relaxed line-clamp-3"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {card.summary}
                  </p>
                  <div className="pt-3 flex items-center justify-end">
                    <ArrowUpRight className="w-4 h-4 text-[#0F172A] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
