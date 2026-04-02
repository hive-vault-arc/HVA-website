'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import BottomCTA from '../components/BottomCTA';
import { CAPABILITY_SOLUTION_PROGRAM_DETAILS } from '../lib/capabilities-content';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function CapabilitiesSolutionPrograms() {
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <main className="bg-[#F8FAFC] min-h-screen">
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
              Capabilities / Solution Programs
            </span>
            <h1
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight text-[#0F172A]"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              Solution Programs:
              <br />
              <span className="italic">Consulting-Led Systems at Full Depth.</span>
            </h1>
          </div>
          <div className="lg:col-span-4 pb-2 flex flex-col gap-6">
            <p
              className="text-lg leading-relaxed pl-6 text-[#45464d]"
              style={{ fontFamily: 'var(--font-body)', borderLeft: '2px solid #c6c6cd' }}
            >
              Full program view including modules, integrations, delivery model, outcomes, and proof links.
              Intentionally operational and implementation-ready.
            </p>
            <div className="flex flex-wrap gap-6 pl-6">
              <Link
                href="/capabilities/in-detail"
                className="text-sm font-bold text-[#2563EB] hover:text-[#1d4ed8] transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Explore In Detail →
              </Link>
              <Link
                href="/contact"
                className="text-sm font-bold text-[#475569] hover:text-[#0F172A] transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Book Discovery →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Programs section ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-14 pt-14 pb-32">

        {/* Section header */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Program Catalog
            </p>
            <h2 className="font-headline text-3xl font-medium text-[#0F172A] md:text-4xl">
              {CAPABILITY_SOLUTION_PROGRAM_DETAILS.length} programs ready for deployment.
            </h2>
          </div>
          <div aria-hidden="true" className="hidden h-[2px] w-20 shrink-0 bg-[#2563EB] md:block" />
        </div>

        {/* Programs grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {CAPABILITY_SOLUTION_PROGRAM_DETAILS.map((program, index) => (
            <motion.article
              key={program.slug}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6 border-t-2 border-[#2563EB] border-x border-b border-x-[#e2e8f0] border-b-[#e2e8f0] bg-white p-8 md:p-10"
            >
              {/* Category + index number */}
              <div className="flex items-start justify-between">
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#2563EB] bg-[#F0F4FF] border border-[#2563EB]/20 px-3 py-1.5"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {program.category}
                </span>
                <span className="font-headline text-4xl text-[#e2e8f0] select-none leading-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Name + summary */}
              <div>
                <h2 className="font-headline text-2xl md:text-3xl text-[#0F172A] leading-tight mb-3">
                  {program.name}
                </h2>
                <p
                  className="text-sm text-[#475569] leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {program.summary}
                </p>
              </div>

              {/* Modules + Outcomes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#f0f0f3]">
                <div>
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-3"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Modules
                  </p>
                  <ul className="space-y-1.5">
                    {program.modules.map((mod) => (
                      <li key={mod} className="flex items-start gap-2.5 text-sm text-[#334155]" style={{ fontFamily: 'var(--font-body)' }}>
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]" />
                        {mod}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-3"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Outcomes
                  </p>
                  <ul className="space-y-1.5">
                    {program.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2.5 text-sm text-[#334155]" style={{ fontFamily: 'var(--font-body)' }}>
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Delivery model */}
              <div className="pt-4 border-t border-[#f0f0f3]">
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-1.5"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Delivery Model
                </p>
                <p className="text-sm text-[#475569]" style={{ fontFamily: 'var(--font-body)' }}>
                  {program.deliveryModel}
                </p>
              </div>

              {/* Integrations */}
              <div>
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-3"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Stack &amp; Integrations
                </p>
                <div className="flex flex-wrap gap-2">
                  {program.integrations.map((integration) => (
                    <span
                      key={integration}
                      className="text-[11px] font-medium bg-[#F0F4FF] text-[#2563EB] border border-[#2563EB]/20 px-3 py-1.5"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {integration}
                    </span>
                  ))}
                </div>
              </div>

              {/* Proof links */}
              {program.proofLinks.length > 0 && (
                <div className="mt-auto pt-4 border-t border-[#f0f0f3] flex flex-wrap gap-4">
                  {program.proofLinks.map((link) => (
                    <Link
                      key={link}
                      href={link}
                      className="group inline-flex items-center gap-2 text-sm font-bold text-[#0F172A] hover:text-[#2563EB] transition-colors"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      View Proof
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  ))}
                </div>
              )}
            </motion.article>
          ))}
        </motion.div>
      </section>

      <BottomCTA
        variant="light"
        headline="Want the right program scoped for your operations?"
        subtext="We align solution program selection with your constraints, integrations, and timeline before execution starts."
        primaryLabel="Book Discovery Call"
        primaryHref="/contact"
        secondaryLabel="View Capabilities"
        secondaryHref="/capabilities"
      />
    </main>
  );
}
