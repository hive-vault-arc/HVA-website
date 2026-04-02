'use client';

import React from 'react';
import Link from 'next/link';
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion';
import { Bot, Briefcase, Building2, ChartColumn, Cpu, Shield, Sparkles, Wrench } from 'lucide-react';
import { useAnimationQuality } from '../lib/animationQuality';
import BottomCTA from '../components/BottomCTA';
import { BOT_DELIVERY_MODEL, CAPABILITY_DETAIL_SECTIONS } from '../lib/capabilities-content';

function getDetailIcon(id: string) {
  const cls = 'h-5 w-5';
  const sw = 1.6;

  switch (id) {
    case 'ai-systems':
      return <Bot className={cls} strokeWidth={sw} />;
    case 'business-transformation':
      return <Building2 className={cls} strokeWidth={sw} />;
    case 'digital-technology-data':
      return <Briefcase className={cls} strokeWidth={sw} />;
    case 'consulting':
      return <Wrench className={cls} strokeWidth={sw} />;
    case 'engineering':
      return <Cpu className={cls} strokeWidth={sw} />;
    case 'data-growth':
      return <ChartColumn className={cls} strokeWidth={sw} />;
    case 'cybersecurity-risk':
      return <Shield className={cls} strokeWidth={sw} />;
    default:
      return <Sparkles className={cls} strokeWidth={sw} />;
  }
}

const CapabilitiesInDetail: React.FC = () => {
  const { motionReduced } = useAnimationQuality();
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <MotionConfig reducedMotion={motionReduced ? 'always' : 'never'}>
      <div className="relative isolate min-h-screen overflow-x-hidden bg-[#F8FAFC] text-[#0F172A]">
        {/* Scroll progress */}
        <motion.div
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#2563EB] via-[#3b82f6] to-[#60a5fa]"
          style={{ scaleX: progressScale }}
        />

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="bg-[#f2f4f6] pt-36 pb-20 px-6 md:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <motion.div
              className="lg:col-span-8"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <span
                className="block text-xs font-bold tracking-[0.2em] uppercase mb-6 text-[#2563EB]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Capabilities In Detail
              </span>
              <h1
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight text-[#0F172A]"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                Full capability depth:
                <br />
                <span className="italic text-[#475569]">strategy, execution, and operating ownership.</span>
              </h1>
            </motion.div>
            <motion.div
              className="lg:col-span-4 pb-2 flex flex-col gap-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
            >
              <p
                className="text-lg leading-relaxed pl-6 text-[#45464d]"
                style={{ fontFamily: 'var(--font-body)', borderLeft: '2px solid #c6c6cd' }}
              >
                Eight domains with strategic context, execution context, and full sub-capability coverage —
                including cybersecurity, deep tech, and IoT.
              </p>
              <div className="flex flex-wrap gap-4 pl-6">
                <Link
                  href="/capabilities/solution-programs"
                  className="inline-block bg-[#0F172A] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-[#2563EB]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  View Solution Programs
                </Link>
                <Link
                  href="/capabilities"
                  className="text-sm font-bold text-[#2563EB] hover:text-[#1d4ed8] transition-colors self-center"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Back to Capabilities →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Domain Catalog ────────────────────────────────────────────────── */}
        <section className="bg-[#F2F4F6] py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-14">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p
                  className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Domain Catalog
                </p>
                <h2 className="font-headline text-3xl font-medium text-[#0F172A] md:text-4xl">
                  Eight domains with full capability context.
                </h2>
              </div>
              <div aria-hidden="true" className="hidden h-[2px] w-20 shrink-0 bg-[#2563EB] md:block" />
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {CAPABILITY_DETAIL_SECTIONS.map((domain, index) => (
                <motion.article
                  key={domain.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: index * 0.03 }}
                  className="flex flex-col gap-5 border-t-2 border-[#2563EB] border-x border-b border-x-[#e2e8f0] border-b-[#e2e8f0] bg-white p-7 md:p-8"
                >
                  {/* Number + icon + domain label */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center bg-[#dbeafe] text-[#2563EB] shrink-0">
                        {getDetailIcon(domain.id)}
                      </div>
                      <p
                        className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94a3b8]"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        Capability Domain
                      </p>
                    </div>
                    <span className="font-headline text-4xl text-[#e2e8f0] select-none leading-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-headline text-3xl leading-tight text-[#0F172A]">{domain.title}</h3>

                  {/* Strategic + Execution context */}
                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <p
                        className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB]"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        Strategic Context
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[#475569]" style={{ fontFamily: 'var(--font-body)' }}>
                        {domain.strategicContext}
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB]"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        Execution Context
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[#475569]" style={{ fontFamily: 'var(--font-body)' }}>
                        {domain.executionContext}
                      </p>
                    </div>
                  </div>

                  {/* Sub-capabilities + Outcomes */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 pt-4 border-t border-[#f0f0f3]">
                    <div>
                      <p
                        className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB]"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        Sub-Capabilities
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {domain.subCapabilities.map((sub) => (
                          <li key={sub} className="flex items-start gap-2.5 text-sm text-[#0F172A]" style={{ fontFamily: 'var(--font-body)' }}>
                            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]" />
                            {sub}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p
                        className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB]"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        Related Outcomes
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {domain.relatedOutcomes.map((outcome) => (
                          <li key={outcome} className="flex items-start gap-2.5 text-sm text-[#0F172A]" style={{ fontFamily: 'var(--font-body)' }}>
                            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOT Delivery Model ────────────────────────────────────────────── */}
        <section className="relative bg-[#0F172A] py-20 md:py-24 text-[#F8FAFC] overflow-hidden">
          {/* Blueprint grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg,#60a5fa 0,#60a5fa 1px,transparent 0,transparent 48px),repeating-linear-gradient(90deg,#60a5fa 0,#60a5fa 1px,transparent 0,transparent 48px)',
            }}
          />
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -top-32 -right-24 w-[500px] h-[500px] bg-[#2563EB]/15 rounded-full blur-[120px]" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-14">
            <div className="mb-10">
              <p
                className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#60a5fa]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Delivery Model
              </p>
              <h2 className="font-headline text-3xl font-medium md:text-4xl">
                {BOT_DELIVERY_MODEL.name} as an operating model.
              </h2>
              <p
                className="mt-4 max-w-3xl text-sm leading-relaxed text-[#F8FAFC]/70"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Use BOT when leadership needs accelerated capability delivery now, with structured transfer once internal
                teams are ready to own systems independently.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-px bg-[#334155] md:grid-cols-3">
              {BOT_DELIVERY_MODEL.phases.map((phase, index) => (
                <article key={phase.id} className="bg-[#111827] p-7 md:p-8">
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#60a5fa]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Phase {index + 1}
                  </p>
                  <h3 className="mt-2 font-headline text-2xl">{phase.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#F8FAFC]/75" style={{ fontFamily: 'var(--font-body)' }}>
                    {phase.detail}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#60a5fa] mb-3"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                When BOT Is Recommended
              </p>
              <ul className="grid grid-cols-1 gap-2 md:grid-cols-3">
                {BOT_DELIVERY_MODEL.fitCriteria.map((criteria) => (
                  <li
                    key={criteria}
                    className="flex items-start gap-2.5 bg-white/5 px-4 py-3 text-sm text-[#F8FAFC]/80"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#60a5fa]" />
                    {criteria}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <BottomCTA
          variant="dark"
          headline="Need this mapped to your business constraints?"
          subtext="Book a discovery session and we will align capability domains, sub-capabilities, and delivery model to your roadmap."
          primaryLabel="Book Discovery Call"
          primaryHref="/contact"
          secondaryLabel="View Solution Programs"
          secondaryHref="/capabilities/solution-programs"
        />
      </div>
    </MotionConfig>
  );
};

export default CapabilitiesInDetail;
