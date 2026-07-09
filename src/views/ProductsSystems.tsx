'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageAmbientBackground from '../components/PageAmbientBackground';
import BottomCTA from '../components/BottomCTA';
import SectionBrandMark from '../components/SectionBrandMark';
import { PRODUCT_SYSTEMS } from '../lib/proof';

const ProductsSystems: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const moduleCount = PRODUCT_SYSTEMS.reduce((sum, s) => sum + s.modules.length, 0);
  const integrationCount = PRODUCT_SYSTEMS.reduce((sum, s) => sum + s.integrations.length, 0);

  return (
    <div className="relative isolate overflow-hidden bg-[#FFFFFF] text-[#1A2535]">
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#E8A838] via-[#E8A838] to-[#E8A838]"
        style={{ scaleX: progressScale }}
      />

      <PageAmbientBackground className="-z-10" />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-6 lg:px-14">
        <div className="container mx-auto">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <SectionBrandMark size="sm" />
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--section-label-color)]">
                Consulting-Led System Programs
              </span>
            </div>
            <h1 className="mb-8 font-serif text-[clamp(2.75rem,13vw,4rem)] font-medium leading-[1.04] tracking-tight text-[#1A2535] sm:text-5xl md:text-[4.5rem] xl:text-[5rem]">
              Operational Programs<br />
              <em className="italic">Designed and Delivered</em><br />
              with Consulting Rigor.
            </h1>
            <p className="text-xl text-[#1A2535]/60 max-w-2xl mb-10 font-light leading-relaxed">
              These offerings package proven solution patterns, then adapt them through advisory, architecture, engineering, and long-term maintenance to match your operating context.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/case-studies"
                className="sharp-edge inline-flex min-h-11 items-center justify-center bg-[#1A2535] px-8 py-4 text-center text-sm font-bold text-[#FFFFFF] transition-colors duration-300 hover:bg-[#E8A838] w-full sm:w-auto"
              >
                View Case Studies
              </Link>
              <Link
                href="/contact"
                className="sharp-edge inline-flex min-h-11 items-center justify-center gap-2 bg-white/90 px-8 py-4 text-sm font-bold text-[#1A2535] shadow-[0_10px_25px_rgba(232,168,56,0.08)] transition-colors duration-300 hover:bg-[#FFF7E8] w-full sm:w-auto"
              >
                Start Discovery <ArrowRight className="h-4 w-4 text-[#E8A838]" />
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-14 flex flex-wrap gap-10 border-t border-[#1A2535]/10 pt-10">
              {[
                { val: String(PRODUCT_SYSTEMS.length), label: 'System families' },
                { val: String(moduleCount), label: 'Operational modules' },
                { val: String(integrationCount), label: 'Integration pathways' },
              ].map(({ val, label }) => (
                <div key={label}>
                  <p className="font-serif text-4xl font-medium text-[#1A2535]">{val}</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#566274] mt-1">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Dark identity strip ───────────────────────────────────────────── */}
      <section className="relative bg-[#1A2535] px-6 lg:px-14 py-16 md:py-24 overflow-hidden">
        {/* Dot grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(#F0C15A 1px, transparent 0)', backgroundSize: '28px 28px' }}
        />
        {/* Left accent bar */}
        <div className="pointer-events-none absolute left-0 inset-y-0 w-[3px] bg-[#E8A838]" />

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45 }}
            >
              <div className="mb-6 flex items-center gap-3">
                <SectionBrandMark surface="dark" size="sm" />
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--section-label-color-dark)]">
                  Why modular systems
                </p>
              </div>
              <h2 className="font-headline text-4xl md:text-5xl text-white leading-[1.08] mb-6">
                Built for Real Operations.<br />
                <em className="italic text-white/35">Not Generic Templates.</em>
              </h2>
              <p className="text-white/60 font-body leading-relaxed text-base max-w-lg">
                Each system program targets a specific business capability. We keep what works, redesign what blocks growth, and integrate with your existing stack using a consulting-first approach.
              </p>
              <div className="h-px w-12 bg-[#E8A838] mt-10" />
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              {[
                { label: 'Modular architecture', desc: 'Deploy one module or a full program without coupling risk.' },
                { label: 'Real integrations', desc: 'Mapped to the tools your team already depends on.' },
                { label: 'Consulting-backed', desc: 'Every program includes advisory, implementation, and maintenance support.' },
                { label: 'Outcome-linked', desc: 'Each module maps to a measurable business objective.' },
              ].map(({ label, desc }) => (
                <div
                  key={label}
                  className="bg-white/5 p-6 hover:bg-white/[0.09] transition-colors duration-300 group"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#E8A838] mb-3" />
                  <p className="font-headline text-base text-white mb-2">{label}</p>
                  <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Systems grid ─────────────────────────────────────────────────── */}
      <section className="systems-grid-zone">
        <div className="editorial-shell systems-grid">
          {PRODUCT_SYSTEMS.map((system, index) => (
            <motion.article
              key={system.name}
              className={`system-card ${index % 2 === 0 ? 'system-card--tinted' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.4, delay: (index % 2) * 0.08 }}
            >
              <div className="system-card__header">
                <p className="system-card__category">{system.category}</p>
                <h2 className="system-card__title">{system.name}</h2>
              </div>

              <div className="system-card__blocks">
                <section className="system-block">
                  <h3>Modules</h3>
                  <ul>
                    {system.modules.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </section>
                <section className="system-block">
                  <h3>Integrations</h3>
                  <p>{system.integrations.join(', ')}</p>
                </section>
                <section className="system-block">
                  <h3>Delivery Model</h3>
                  <p>{system.deliveryModel}</p>
                </section>
                <section className="system-block">
                  <h3>Outcomes</h3>
                  <ul>
                    {system.outcomes.map((o) => (
                      <li key={o}>{o}</li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className="system-card__proof-links">
                {system.proofLinks.map((link) => (
                  <Link key={link} href={link} className="editorial-link editorial-link--strong">
                    View Proof &rarr;
                  </Link>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <BottomCTA
        variant="light"
        headline="Ready to Scope the Right Operational Program?"
        subtext="Start with a discovery call. We align on goals, constraints, and the right consulting-led system path before scope is locked."
        primaryLabel="Start Discovery"
        primaryHref="/contact"
        secondaryLabel="Explore Case Studies"
        secondaryHref="/case-studies"
      />
    </div>
  );
};

export default ProductsSystems;
