'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import BottomCTA from '../components/BottomCTA';
import { getAllCaseStudies } from '../lib/proof';

export default function CaseStudies() {
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const allStudies = getAllCaseStudies();
  const industries = ['All', ...Array.from(new Set(allStudies.map((s) => s.industry)))];
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All' ? allStudies : allStudies.filter((s) => s.industry === activeFilter);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <main className="bg-[#f7f9fb] min-h-screen">
      {/* Scroll progress */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#2563EB] via-[#60a5fa] to-[#0ea5e9]"
        style={{ scaleX: progressScale }}
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#f2f4f6] pt-36 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <span
              className="block text-xs font-bold tracking-[0.2em] uppercase mb-6 text-[#2563EB]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Transformation Proof
            </span>
            <h1
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight text-[#0F172A]"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              Consulting-Led
              <br />
              <span className="italic">Case Studies</span>
            </h1>
          </div>
          <div className="lg:col-span-4 pb-2">
            <p
              className="text-lg leading-relaxed pl-6 text-[#45464d]"
              style={{ fontFamily: 'var(--font-body)', borderLeft: '2px solid #c6c6cd' }}
            >
              Each case documents the business challenge, execution architecture, and measurable
              operating impact — no marketing, just production proof.
            </p>
          </div>
        </div>
      </section>

      {/* ── Industry filter ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pt-12 pb-8">
        <div className="flex flex-wrap items-center gap-8">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setActiveFilter(ind)}
              className="text-sm font-bold tracking-[0.15em] uppercase pb-2 transition-colors duration-200"
              style={{
                fontFamily: 'var(--font-body)',
                color: activeFilter === ind ? '#0F172A' : '#76777d',
                borderBottom: activeFilter === ind ? '2px solid #0F172A' : '2px solid transparent',
              }}
            >
              {ind}
            </button>
          ))}
        </div>
        <div className="mt-4 h-px bg-[#e0e3e5]" />
      </section>

      {/* ── Featured case study ───────────────────────────────────────────── */}
      {featured && (
        <section className="max-w-7xl mx-auto px-6 md:px-8 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Link href={`/case-studies/${featured.slug}`} className="group block">
              <div className="flex flex-col lg:flex-row items-stretch">
                {/* Image — 60% */}
                <div className="w-full lg:w-[60%] shrink-0 relative">
                  <div className="aspect-[4/3] relative overflow-hidden bg-[#e0e3e5]">
                    <Image
                      src={featured.assets.coverImage}
                      alt={featured.title}
                      fill
                      className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>
                </div>
                {/* Content — overlaps image */}
                <div className="w-full lg:w-[46%] lg:-ml-[6%] z-10 flex items-center relative">
                  <div
                    className="bg-white p-10 lg:p-14"
                    style={{ boxShadow: '0 10px 40px rgba(25,28,30,0.08)' }}
                  >
                    <div className="flex items-center gap-4 mb-5">
                      <span
                        className="text-xs font-bold tracking-widest uppercase px-3 py-1"
                        style={{
                          color: '#2563EB',
                          background: 'rgba(37,99,235,0.08)',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {featured.industry}
                      </span>
                      <span
                        className="text-xs font-medium text-[#76777d]"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {featured.deploymentStatus}
                      </span>
                    </div>
                    <h2
                      className="text-3xl md:text-4xl mb-5 leading-tight text-[#191c1e] group-hover:text-[#2563EB] transition-colors"
                      style={{ fontFamily: 'var(--font-headline)' }}
                    >
                      {featured.title}
                    </h2>
                    <p
                      className="text-[#45464d] mb-6 leading-relaxed line-clamp-3"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {featured.summary}
                    </p>
                    {/* Key metrics */}
                    <div className="flex gap-8 mb-8 pt-5 border-t border-[#f0f0f3]">
                      {featured.measuredOutcomes.slice(0, 2).map((metric) => (
                        <div key={metric.label}>
                          <p
                            className="text-xl font-semibold text-[#0F172A]"
                            style={{ fontFamily: 'var(--font-headline)' }}
                          >
                            {metric.value}
                          </p>
                          <p
                            className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#94a3b8] mt-0.5"
                            style={{ fontFamily: 'var(--font-body)' }}
                          >
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-sm font-bold text-[#2563EB]"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        Read Full Case Study
                      </span>
                      <ArrowUpRight className="w-5 h-5 text-[#0F172A] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </section>
      )}

      {/* ── Remaining grid ────────────────────────────────────────────────── */}
      {rest.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-8 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {rest.map((study, i) => (
              <motion.article
                key={study.slug}
                className="group"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              >
                <Link href={`/case-studies/${study.slug}`} className="block">
                  <div className="aspect-square bg-[#f2f4f6] mb-7 overflow-hidden relative">
                    <Image
                      src={study.assets.coverImage}
                      alt={study.title}
                      fill
                      className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="space-y-3">
                    <div
                      className="flex justify-between items-center text-[10px] font-bold tracking-[0.2em] uppercase text-[#45464d]"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      <span className="text-[#2563EB]">{study.industry}</span>
                      <span>{study.measuredOutcomes.length} outcomes</span>
                    </div>
                    <h3
                      className="text-xl leading-snug text-[#191c1e] group-hover:text-[#2563EB] transition-colors"
                      style={{ fontFamily: 'var(--font-headline)' }}
                    >
                      {study.title}
                    </h3>
                    <p
                      className="text-[#45464d] text-sm leading-relaxed line-clamp-2"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {study.summary}
                    </p>
                    <div
                      className="pt-4 flex items-center justify-between"
                      style={{ borderTop: '1px solid rgba(198,198,205,0.3)' }}
                    >
                      <span
                        className="text-xs text-[#76777d] italic"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {study.deploymentStatus}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#0F172A] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>
      )}

      {/* Empty state when a filter returns nothing */}
      {filtered.length === 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-8 py-24 text-center">
          <p
            className="text-sm text-[#76777d]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            No case studies in this category yet.
          </p>
        </section>
      )}

      <BottomCTA
        headline="Ready to See How Transformation Looks in Production?"
        subtext="Start with a discovery call. We'll show you exactly how strategy, architecture, and delivery are aligned in real environments."
        primaryLabel="Start Discovery"
        primaryHref="/contact"
        secondaryLabel="View Solution Programs"
        secondaryHref="/capabilities/solution-programs"
      />
    </main>
  );
}
