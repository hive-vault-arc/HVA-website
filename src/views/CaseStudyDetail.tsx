'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import BottomCTA from '../components/BottomCTA';
import type { CaseStudy } from '../lib/proof';

interface Props {
  readonly study: CaseStudy;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function CaseStudyDetail({ study }: Props) {
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative isolate bg-[#F8FAFC] text-[#0F172A]">
      {/* Scroll progress */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#2563EB] via-[#60a5fa] to-[#0ea5e9]"
        style={{ scaleX: progressScale }}
      />

      {/* ── Dark hero ─────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0F172A] pt-28 pb-0 md:pt-36 md:pb-0 overflow-hidden">
        {/*
          Navbar contrast helper — the navbar is transparent with dark text when not scrolled.
          This gradient lightens the area behind it (top ~88px) then fades to transparent,
          keeping the dark hero intact for all visible content below.
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-[2]"
          style={{
            height: '110px',
            background: 'linear-gradient(to bottom, #F8FAFC 0%, rgba(248,250,252,0.55) 50%, transparent 100%)',
          }}
        />

        {/* Blueprint grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,#60a5fa 0,#60a5fa 1px,transparent 0,transparent 48px),repeating-linear-gradient(90deg,#60a5fa 0,#60a5fa 1px,transparent 0,transparent 48px)',
          }}
        />
        {/* Ambient glows */}
        <div className="pointer-events-none absolute -top-32 -right-24 w-[500px] h-[500px] bg-[#2563EB]/20 rounded-full blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 w-72 h-72 bg-[#3b82f6]/15 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 mb-8"
          >
            <Link
              href="/case-studies"
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-[#2563EB] transition-colors"
            >
              ← Case Studies
            </Link>
            <span className="text-white/20 text-xs">/</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 truncate max-w-[200px]">
              {study.assets.logoLabel}
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            {/* Left — title block */}
            <motion.div
              className="lg:col-span-8"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              {/* Industry badge */}
              <span className="inline-block mb-6 bg-[#2563EB] text-white text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                {study.industry}
              </span>
              <h1 className="font-headline text-4xl md:text-6xl text-white leading-[1.04] tracking-tight mb-6">
                {study.title}
              </h1>
              <p className="text-lg text-white/60 max-w-3xl leading-relaxed">
                {study.summary}
              </p>
            </motion.div>

            {/* Right — meta strip */}
            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
            >
              <div className="space-y-4 border-l border-white/10 pl-6">
                {[
                  { label: 'Client', value: study.clientName },
                  { label: 'Industry', value: study.industry },
                  { label: 'Status', value: study.deploymentStatus },
                  { label: 'Scale', value: study.deploymentScale },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-sm text-white/70">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Cover image — full-bleed, no gaps, no radius ─────────────────── */}
      <motion.div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: '16 / 7' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Image
          src={study.assets.coverImage}
          alt={study.title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority
        />
      </motion.div>

      {/* ── Metrics strip ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-14 pt-0 pb-16">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#e2e8f0] border border-[#e2e8f0]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {study.measuredOutcomes.map((metric) => (
            <motion.div
              key={metric.label}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="bg-white px-8 py-8 group hover:bg-[#2563EB] transition-colors duration-300"
            >
              <p className="font-headline text-4xl md:text-5xl text-[#0F172A] group-hover:text-white transition-colors duration-300 mb-2">
                {metric.value}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB] group-hover:text-white/80 transition-colors duration-300">
                {metric.label}
              </p>
              <p className="mt-2 text-xs text-[#94a3b8] group-hover:text-white/60 transition-colors duration-300 leading-relaxed">
                {metric.context}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Body — challenge + impact ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-14 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* Left — challenge, architecture, stack */}
        <motion.div
          className="lg:col-span-7 space-y-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.12 }}
        >
          {/* Business challenge */}
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-4 mb-5">
              <span className="font-headline text-5xl text-[#2563EB] select-none">01</span>
              <div className="h-[1px] flex-grow bg-[#2563EB]/20" />
            </div>
            <h2 className="font-headline text-3xl text-[#0F172A] mb-4">Business Challenge</h2>
            <p className="text-[#475569] leading-relaxed">{study.problem}</p>
          </motion.div>

          {/* Architecture */}
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-4 mb-5">
              <span className="font-headline text-5xl text-[#2563EB] select-none">02</span>
              <div className="h-[1px] flex-grow bg-[#2563EB]/20" />
            </div>
            <h2 className="font-headline text-3xl text-[#0F172A] mb-4">Execution Architecture</h2>
            <p className="text-[#475569] leading-relaxed">{study.systemArchitecture}</p>
          </motion.div>

          {/* Modules */}
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-4 mb-5">
              <span className="font-headline text-5xl text-[#2563EB] select-none">03</span>
              <div className="h-[1px] flex-grow bg-[#2563EB]/20" />
            </div>
            <h2 className="font-headline text-3xl text-[#0F172A] mb-5">Modules Activated</h2>
            <ul className="space-y-2">
              {study.operationalModules.map((mod) => (
                <li key={mod} className="flex items-start gap-3 text-sm text-[#334155]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]" />
                  {mod}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Stack */}
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#2563EB] mb-4">
              Stack &amp; Integrations
            </p>
            <div className="flex flex-wrap gap-2">
              {study.integrations.map((integration) => (
                <span
                  key={integration}
                  className="text-[11px] font-medium bg-[#F0F4FF] text-[#2563EB] border border-[#2563EB]/20 px-3 py-1.5 rounded-full"
                >
                  {integration}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right — testimonial + deployment */}
        <motion.div
          className="lg:col-span-5 space-y-6"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Testimonial card */}
          <div className="relative bg-[#0F172A] p-8 md:p-10 overflow-hidden">
            {/* Blueprint grid */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg,#60a5fa 0,#60a5fa 1px,transparent 0,transparent 48px),repeating-linear-gradient(90deg,#60a5fa 0,#60a5fa 1px,transparent 0,transparent 48px)',
              }}
            />
            <div className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 bg-[#2563EB]/20 rounded-full blur-3xl" />

            <p className="relative z-10 text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-6">
              Client Testimony
            </p>
            <blockquote className="relative z-10 font-headline text-xl text-white leading-relaxed italic mb-8">
              &ldquo;{study.testimonial.quote}&rdquo;
            </blockquote>
            <div className="relative z-10 border-t border-white/10 pt-5">
              <p className="text-sm font-semibold text-white">{study.testimonial.author}</p>
              <p className="text-xs text-white/50 mt-0.5">{study.testimonial.role}</p>
            </div>
          </div>

          {/* Deployment card */}
          <div className="border border-[#e2e8f0] bg-white p-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-4">
              Deployment Scale
            </p>
            <p className="font-headline text-2xl text-[#0F172A] leading-snug">
              {study.deploymentScale}
            </p>
            <div className="mt-4 pt-4 border-t border-[#e2e8f0]">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#94a3b8]">
                {study.deploymentStatus}
              </p>
            </div>
          </div>

          {/* Back link */}
          <div className="pt-2">
            <Link
              href="/case-studies"
              className="text-sm font-bold text-[#475569] hover:text-[#2563EB] transition-colors"
            >
              ← Back to all case studies
            </Link>
          </div>
        </motion.div>
      </section>

      <BottomCTA
        headline="Apply This Transformation Pattern to Your Operations"
        subtext="Review the relevant solution programs, then book a discovery call to scope your roadmap."
        primaryLabel="Book Discovery Call"
        primaryHref="/contact"
        secondaryLabel="View Solution Programs"
        secondaryHref="/capabilities/solution-programs"
      />
    </div>
  );
}
