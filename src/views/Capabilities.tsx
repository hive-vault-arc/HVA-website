'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bot, Building2, Cloud, Cpu, Database, Send, Settings, Wrench } from 'lucide-react';
import BottomCTA from '../components/BottomCTA';
import PageAmbientBackground from '../components/PageAmbientBackground';
import { CAPABILITY_BRIEF_SECTIONS, CAPABILITY_SOLUTION_PROGRAM_DETAILS } from '../lib/capabilities-content';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const BOT_PHASES = [
  {
    step: '01',
    icon: <Wrench className="h-8 w-8" />,
    title: 'Assess',
    detail: 'Diagnose operating constraints, technology readiness, business priorities, and the transformation path.',
    objective: 'Create a clear operating diagnosis before decisions turn into build scope.',
    hvaOwns: 'Discovery design, constraint mapping, architecture review, opportunity sizing, roadmap framing.',
    clientRole: 'Share operating reality, align priorities, confirm constraints, identify accountable owners.',
    checkpoints: ['Map current operations', 'Prioritize transformation constraints', 'Confirm target outcomes'],
    outputs: ['Operating diagnosis', 'Capability gap map', 'Prioritized transformation roadmap'],
  },
  {
    step: '02',
    icon: <Settings className="h-8 w-8" />,
    title: 'Re-engineer',
    detail: 'Redesign processes, architecture, systems, and delivery controls around the approved target state.',
    objective: 'Turn the roadmap into production systems and operating changes without losing continuity.',
    hvaOwns: 'Solution architecture, build sprints, QA gates, integration reliability, release readiness.',
    clientRole: 'Validate process changes, provide access, approve milestones, and coordinate stakeholders.',
    checkpoints: ['Design target architecture', 'Build core workflows', 'Validate production readiness'],
    outputs: ['Technical blueprint', 'Integrated production stack', 'Release playbook and controls'],
  },
  {
    step: '03',
    icon: <Send className="h-8 w-8" />,
    title: 'Command',
    detail: 'Run, stabilize, monitor, and improve the production operation with long-term accountability.',
    objective: 'Keep transformation alive after launch through managed operations and measurable improvement loops.',
    hvaOwns: 'Operational governance, incident response, KPI monitoring, optimization backlog execution.',
    clientRole: 'Review performance trends, validate business impact, and co-prioritize optimization cycles.',
    checkpoints: ['Lead production operations', 'Monitor performance metrics', 'Improve continuously'],
    outputs: ['Performance reporting', 'Optimization releases', 'Operational risk controls'],
  },
];

function getPillarIcon(id: string, cls = 'h-6 w-6', sw = 1.4) {
  switch (id) {
    case 'strategy-business': return <Building2 className={cls} strokeWidth={sw} />;
    case 'technology-consulting': return <Wrench className={cls} strokeWidth={sw} />;
    case 'ai-data-analytics': return <Bot className={cls} strokeWidth={sw} />;
    case 'software-engineering': return <Cpu className={cls} strokeWidth={sw} />;
    case 'cloud-infrastructure': return <Cloud className={cls} strokeWidth={sw} />;
    case 'operations-managed': return <Settings className={cls} strokeWidth={sw} />;
    default: return <Wrench className={cls} strokeWidth={sw} />;
  }
}

export default function Capabilities() {
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [activeBOTStep, setActiveBOTStep] = useState(0);
  const activeBOTItem = BOT_PHASES[activeBOTStep] ?? BOT_PHASES[0];

  const [pillar0, pillar1, pillar2, pillar3, pillar4, pillar5] = CAPABILITY_BRIEF_SECTIONS;

  return (
    <div className="relative isolate overflow-x-hidden bg-[#f7f9fb] text-[#191c1e]">
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#2563EB] via-[#60a5fa] to-[#0ea5e9]"
        style={{ scaleX: progressScale }}
      />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 px-6 lg:px-12 overflow-hidden">
        <PageAmbientBackground className="-z-10" />
        <div className="mx-auto max-w-screen-2xl">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end"
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.65 }}
              className="md:col-span-7"
            >
              <span className="text-[#2563EB] font-bold tracking-[0.24em] text-[10px] uppercase block mb-6">
                Capabilities &amp; Mastery
              </span>
              <h1 className="font-headline font-light text-[3.6rem] sm:text-7xl lg:text-[5.2rem] leading-[1.02] tracking-tight text-[#0F172A]">
                Six Pillars.
                <br />
                <em className="italic text-[#2563EB]">One Accountable</em>
                <br />
                Partner.
              </h1>
              <p className="mt-6 max-w-xl text-[1.05rem] text-[#45464d]/80 leading-relaxed">
                H.V.A delivers strategy, engineering, and managed operations across six pillars — one team, one accountability loop, from discovery to production.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/capabilities/in-detail" className="sharp-edge btn-primary">
                  Explore In Detail
                </Link>
                <Link
                  href="/capabilities/solution-programs"
                  className="inline-flex items-center gap-1.5 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[#0F172A] border-b border-[#0F172A]/30 pb-0.5 hover:text-[#2563EB] hover:border-[#2563EB] transition-colors"
                >
                  Solution Programs →
                </Link>
              </div>
            </motion.div>

            {/* On This Page nav panel */}
            <motion.aside
              variants={fadeUp}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="md:col-span-5 md:self-end"
            >
              <div className="relative overflow-hidden bg-[#0F172A] p-6">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.05]"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right,#60a5fa 1px,transparent 1px),linear-gradient(to bottom,#60a5fa 1px,transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
                <p className="relative text-[9px] font-mono uppercase tracking-[0.3em] text-[#60a5fa] mb-4">
                  On This Page
                </p>
                <nav className="relative">
                  {[
                    { label: 'Capability Pillars', anchor: '#capability-pillars', meta: '6 pillars' },
                    { label: 'Solution Programs', anchor: '#solution-programs', meta: '3 active' },
                    { label: 'ARC Engagement Model', anchor: '#bot-model', meta: 'How we work' },
                  ].map((item) => (
                    <a
                      key={item.anchor}
                      href={item.anchor}
                      className="flex items-center justify-between border-b border-white/[0.08] py-3 last:border-0 group"
                    >
                      <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-200">
                        {item.label}
                      </span>
                      <span className="text-[9px] font-mono text-[#60a5fa]/60 group-hover:text-[#60a5fa] transition-colors">
                        {item.meta}
                      </span>
                    </a>
                  ))}
                </nav>
                <div className="relative mt-4 border-t border-white/10 pt-4">
                  <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/25">
                    Full depth → /capabilities/in-detail
                  </p>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        </div>
      </section>

      {/* Separator */}
      <div aria-hidden="true" className="h-px bg-[#e2e8f0] mx-6 lg:mx-12" />

      {/* ── SERVICE PILLARS BENTO GRID ────────────────────────────────────── */}
      <section id="capability-pillars" className="scroll-mt-28 px-6 lg:px-12 pb-24">
        <div className="mx-auto max-w-screen-2xl">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            transition={{ staggerChildren: 0.07 }}
          >
            {/* 1 — Strategy & Business */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="group bg-[#f2f4f6] p-10 flex flex-col justify-between min-h-[420px] hover:bg-[#e6e8ea] transition-colors duration-500"
            >
              <div>
                <div className="mb-8 flex h-12 w-12 items-center justify-center bg-white text-[#2563EB]">
                  {getPillarIcon('strategy-business')}
                </div>
                <h3 className="font-headline text-2xl text-[#0F172A] mb-3">
                  Strategy &amp; Business
                </h3>
                <p className="text-[#45464d] leading-relaxed text-sm">
                  {pillar0?.summary}
                </p>
              </div>
              <ul className="mt-8 space-y-2">
                {pillar0?.bullets.map((b) => (
                  <li key={b} className="text-[0.68rem] font-bold tracking-[0.14em] text-[#45464d]/55 uppercase">
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* 2 — Technology Consulting (2-col wide + image overlay) */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="group relative md:col-span-2 overflow-hidden bg-[#0F172A] min-h-[420px]"
            >
              <Image
                src="/Images/capabilities/hva-technology-consulting-tangier.png"
                alt="Technology consulting architecture — H.V.A Tangier Morocco"
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="relative z-10 p-10 flex flex-col justify-between min-h-[420px] bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/40 to-transparent">
                <div>
                  <div className="mb-8 flex h-12 w-12 items-center justify-center bg-white/10 text-white">
                    {getPillarIcon('technology-consulting')}
                  </div>
                  <h3 className="font-headline text-3xl text-white mb-3">
                    Technology Consulting
                  </h3>
                  <p className="text-white/65 max-w-md text-sm leading-relaxed">
                    {pillar1?.summary}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 mt-8">
                  {['Legacy Modernization', 'Stack Optimization', 'Architecture Design'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 border border-white/20 text-white text-[0.62rem] tracking-[0.15em] uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 3 — AI & Data */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="group bg-[#e0e3e5] p-10 flex flex-col justify-between min-h-[420px]"
            >
              <div>
                <div className="mb-8 flex h-12 w-12 items-center justify-center bg-white text-[#2563EB]">
                  {getPillarIcon('ai-data-analytics')}
                </div>
                <h3 className="font-headline text-2xl text-[#0F172A] mb-3">AI &amp; Data</h3>
                <p className="text-[#45464d] leading-relaxed text-sm">{pillar2?.summary}</p>
              </div>
              {(pillar2?.landingLinks.length ?? 0) > 0 && (
                <div className="mt-8 flex flex-col gap-2">
                  {pillar2?.landingLinks.map((lnk) => (
                    <Link
                      key={lnk.href}
                      href={lnk.href}
                      className="inline-flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[#2563EB] hover:text-[#1d4ed8] transition-colors group/link"
                    >
                      {lnk.label}
                      <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>

            {/* 4 — Software Engineering */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="group bg-[#f2f4f6] p-10 flex flex-col justify-between min-h-[420px] hover:bg-[#e6e8ea] transition-colors duration-500"
            >
              <div>
                <div className="mb-8 flex h-12 w-12 items-center justify-center bg-white text-[#2563EB]">
                  {getPillarIcon('software-engineering')}
                </div>
                <h3 className="font-headline text-2xl text-[#0F172A] mb-3">
                  Software Engineering
                </h3>
                <p className="text-[#45464d] leading-relaxed text-sm">{pillar3?.summary}</p>
              </div>
              <div className="mt-8 space-y-2">
                <div className="w-full h-px bg-[#c6c6cd]/40" />
                <p className="text-[0.62rem] font-bold text-[#45464d]/50 uppercase tracking-[0.16em] py-2">
                  Full-Stack Sovereignty
                </p>
              </div>
            </motion.div>

            {/* 5 — Cloud & Infrastructure */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="group bg-white p-10 flex flex-col justify-between min-h-[420px] shadow-[0_10px_40px_rgba(25,28,30,0.06)]"
            >
              <div>
                <div className="mb-8 flex h-12 w-12 items-center justify-center bg-[#f2f4f6] text-[#2563EB]">
                  {getPillarIcon('cloud-infrastructure')}
                </div>
                <h3 className="font-headline text-2xl text-[#0F172A] mb-3">
                  Cloud &amp; Infrastructure
                </h3>
                <p className="text-[#45464d] leading-relaxed text-sm">{pillar4?.summary}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-8">
                {['AWS', 'Azure', 'GCP', 'Hybrid'].map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#eceef0] px-3 py-1 text-[0.6rem] font-bold text-[#45464d] uppercase tracking-[0.12em]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* 6 — Operations & Managed Services (full-width dark banner) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mt-4 bg-[#0F172A] p-10 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  'linear-gradient(to right,#60a5fa 1px,transparent 1px),linear-gradient(to bottom,#60a5fa 1px,transparent 1px)',
                backgroundSize: '44px 44px',
              }}
            />
            <div className="relative flex items-center gap-8">
              <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center bg-white/5 text-[#2563EB]">
                <Settings className="h-8 w-8" strokeWidth={1.2} />
              </div>
              <div>
                <h3 className="font-headline text-2xl md:text-3xl text-white mb-2">
                  Operations &amp; Managed Services
                </h3>
                <p className="text-[#7c839b] max-w-xl text-sm leading-relaxed">
                  {pillar5?.summary}
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="relative inline-flex items-center gap-1.5 sharp-edge whitespace-nowrap px-8 py-3.5 bg-[#2563EB] text-white text-[0.78rem] font-bold uppercase tracking-[0.14em] hover:bg-[#1d4ed8] transition-colors"
            >
              Delegate Operations →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── ARC OPERATING MODEL ────────────────────────────────────────────── */}
      <section id="bot-model" className="scroll-mt-28 bg-[#f2f4f6] py-28 px-6 lg:px-12 overflow-hidden relative">
        {/* Blueprint grid — subtle structural texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage:
              'linear-gradient(to right,#0F172A 1px,transparent 1px),linear-gradient(to bottom,#0F172A 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative mx-auto max-w-screen-2xl">

          {/* Editorial header split */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20"
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              className="md:col-span-6"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB] block mb-5">
                Engagement Methodology
              </span>
              <h2 className="font-headline text-5xl md:text-6xl text-[#0F172A] leading-[1.05]">
                The ARC
                <br />
                <em className="italic">Operating Model</em>
              </h2>
            </motion.div>
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              className="md:col-span-6 flex items-end"
            >
              <div>
                <p className="text-[#45464d] text-base leading-relaxed mb-6">
                  Our proprietary engagement methodology ensures every project is predictable, rigorous, and impactful. One accountable sequence — from diagnosis to managed operations.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Decision gates at every phase', 'Joint governance', 'Operational accountability'].map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 bg-white text-[0.6rem] font-bold uppercase tracking-[0.12em] text-[#2563EB]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Progress track + phase labels */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.35 }}
          >
            <div className="mb-7">
              <div className="relative mb-3 h-[2px] w-full bg-slate-200">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[#2563EB]"
                  animate={{ width: `${((activeBOTStep + 1) / BOT_PHASES.length) * 100}%` }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-[#94a3b8]">
                {BOT_PHASES.map((item) => (
                  <span key={`track-${item.step}`}>{item.title}</span>
                ))}
              </div>
            </div>

            {/* 3 white selector cards */}
            <div className="grid grid-cols-1 gap-px bg-slate-300 sm:grid-cols-3">
              {BOT_PHASES.map((item, index) => {
                const isActive = activeBOTStep === index;
                return (
                  <button
                    key={item.step}
                    type="button"
                    onClick={() => setActiveBOTStep(index)}
                    onMouseEnter={() => setActiveBOTStep(index)}
                    onFocus={() => setActiveBOTStep(index)}
                    className={`group relative overflow-hidden bg-white p-7 text-left transition-all duration-300 ${
                      isActive ? 'bg-white' : 'hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <div
                      className={`absolute left-0 right-0 top-0 h-[3px] transition-all duration-300 ${
                        isActive ? 'bg-[#2563EB]' : 'bg-transparent group-hover:bg-slate-200'
                      }`}
                    />
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB]">
                      Phase {item.step}
                    </p>
                    <div
                      className={`mb-3 transition-colors duration-300 ${
                        isActive ? 'text-[#2563EB]' : 'text-[#475569] group-hover:text-[#2563EB]'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <h3
                      className={`font-headline text-3xl leading-tight transition-colors duration-300 ${
                        isActive ? 'text-[#0F172A]' : 'text-[#0F172A]/80'
                      }`}
                    >
                      <span
                        className={`text-[2.6rem] font-bold transition-colors duration-300 ${
                          isActive ? 'text-[#2563EB]' : 'text-[#0F172A]/40 group-hover:text-[#2563EB]'
                        }`}
                      >
                        {item.title[0]}
                      </span>
                      {item.title.slice(1)}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#475569]">{item.objective}</p>
                  </button>
                );
              })}
            </div>

            {/* Dark detail panel */}
            <motion.div
              key={activeBOTItem.step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className="bg-[#0F172A] p-5 md:p-7"
            >
              <div className="mb-4 flex items-center gap-4">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center bg-[#2563EB] text-xs font-bold text-white">
                  {activeBOTItem.step}
                </span>
                <div className="text-[#2563EB] shrink-0">{activeBOTItem.icon}</div>
                <h3 className="font-headline text-xl text-white">{activeBOTItem.title}</h3>
              </div>

              <div className="grid grid-cols-2 gap-px bg-white/[0.08] border border-white/[0.08] md:grid-cols-4">
                <article className="bg-[#0F172A] p-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#60a5fa] mb-2">H.V.A Owns</p>
                  <ul className="space-y-1.5">
                    {activeBOTItem.hvaOwns.split(', ').map((entry) => (
                      <li key={entry} className="flex items-start gap-1.5 text-xs text-[#94a3b8]">
                        <span className="mt-1.5 h-1 w-1 shrink-0 bg-[#2563EB]" />
                        {entry.replace(/\.$/, '')}
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="bg-[#0F172A] p-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#60a5fa] mb-2">Client Role</p>
                  <ul className="space-y-1.5">
                    {activeBOTItem.clientRole.split(', ').map((entry) => (
                      <li key={entry} className="flex items-start gap-1.5 text-xs text-[#94a3b8]">
                        <span className="mt-1.5 h-1 w-1 shrink-0 bg-[#2563EB]" />
                        {entry.replace(/\.$/, '')}
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="bg-[#0F172A] p-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#60a5fa] mb-2">Outputs</p>
                  <ul className="space-y-1.5">
                    {activeBOTItem.outputs.map((output) => (
                      <li key={output} className="flex items-start gap-1.5 text-xs text-[#94a3b8]">
                        <span className="mt-1.5 h-1 w-1 shrink-0 bg-[#2563EB]" />
                        {output}
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="bg-[#0F172A] p-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#60a5fa] mb-2">Checkpoints</p>
                  <ul className="space-y-1.5">
                    {activeBOTItem.checkpoints.map((checkpoint) => (
                      <li key={checkpoint} className="flex items-start gap-1.5 text-xs text-[#94a3b8]">
                        <span className="mt-1.5 h-1 w-1 shrink-0 bg-[#2563EB]" />
                        {checkpoint}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </motion.div>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/capabilities/in-detail" className="sharp-edge btn-primary">
              Explore In Detail
            </Link>
            <Link
              href="/capabilities/solution-programs"
              className="text-sm font-bold uppercase tracking-wide text-[#2563EB] transition-colors duration-200 hover:text-[#1d4ed8]"
            >
              View Solution Programs →
            </Link>
          </div>
        </div>
      </section>


      {/* ── EXPERT INSIGHT QUOTE ──────────────────────────────────────────── */}
      <section className="px-6 lg:px-12 py-28">
        <div className="mx-auto max-w-screen-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65 }}
              className="col-span-12 md:col-span-10 md:col-start-2 bg-[#e0e3e5] p-12 md:p-16 relative overflow-hidden"
            >
              {/* Decorative open-quote mark */}
              <div
                aria-hidden="true"
                className="absolute top-8 left-10 font-headline text-[9rem] leading-none text-[#2563EB]/10 select-none pointer-events-none"
              >
                &ldquo;
              </div>

              <div className="relative z-10 max-w-3xl">
                <h2 className="font-headline text-3xl md:text-4xl lg:text-[2.8rem] italic leading-tight text-[#0F172A] mb-12">
                  &ldquo;Transformation succeeds when strategy, engineering, and operations move
                  together &mdash; from the first decision to the last deployment.&rdquo;
                </h2>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-[#0F172A] overflow-hidden flex-shrink-0 relative">
                    <Image
                      src="/Images/capabilities/hva-capabilities-expertise.png"
                      alt="H.V.A ARC expertise"
                      fill
                      sizes="64px"
                      className="object-cover grayscale"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-[#0F172A] text-sm">H.V.A ARC Framework</p>
                    <p className="text-[0.7rem] text-[#45464d] uppercase tracking-[0.14em] mt-1">
                      Strategy · Consulting · Engineering · Operations
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SOLUTION PROGRAMS ─────────────────────────────────────────────── */}
      <section id="solution-programs" className="scroll-mt-28 bg-[#f7f9fb] py-20 px-6 lg:px-12">
        <div className="mx-auto max-w-screen-2xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.08 }}
            transition={{ staggerChildren: 0.08 }}
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="mb-12">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB] mb-3">
                Solution Programs
              </p>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <h2 className="font-headline text-4xl md:text-5xl text-[#0F172A] leading-[1.06]">
                  Pre-scoped.
                  <br />
                  <em className="italic">Production-ready.</em>
                </h2>
                <p className="max-w-sm text-sm text-[#45464d] leading-relaxed">
                  Consulting-led engagements combining architecture decisions, delivery execution,
                  and operational ownership — not a one-off project.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CAPABILITY_SOLUTION_PROGRAM_DETAILS.map((program, i) => {
                const programIcons = [
                  <Bot key="bot" className="w-6 h-6" strokeWidth={1.3} />,
                  <Database key="db" className="w-6 h-6" strokeWidth={1.3} />,
                  <Cloud key="cloud" className="w-6 h-6" strokeWidth={1.3} />,
                ];
                return (
                  <motion.article
                    key={program.slug}
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                    className="group bg-[#f2f4f6] p-8 flex flex-col hover:bg-white transition-colors duration-300 border-b-2 border-transparent hover:border-[#2563EB]"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <span className="text-[#2563EB]">{programIcons[i]}</span>
                      <span className="text-[0.58rem] font-mono text-[#94a3b8]">PRG-00{i + 1}</span>
                    </div>
                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#2563EB] mb-2">
                      {program.category}
                    </p>
                    <h3 className="font-headline text-xl text-[#0F172A] mb-3 group-hover:text-[#2563EB] transition-colors duration-300">
                      {program.name}
                    </h3>
                    <p className="text-sm text-[#45464d] leading-relaxed mb-5 flex-1">
                      {program.summary}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {program.outcomes.slice(0, 3).map((o) => (
                        <span
                          key={o}
                          className="px-2 py-1 text-[0.58rem] font-bold uppercase tracking-[0.1em] bg-white text-[#45464d] border border-[#e2e8f0]"
                        >
                          {o}
                        </span>
                      ))}
                    </div>
                    {program.proofLinks.length > 0 && (
                      <Link
                        href={program.proofLinks[0]!}
                        className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#2563EB] hover:text-[#1d4ed8] transition-colors mt-auto"
                      >
                        View Case Study →
                      </Link>
                    )}
                  </motion.article>
                );
              })}
            </div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.4 }}
              className="mt-10 flex justify-center"
            >
              <Link href="/capabilities/solution-programs" className="sharp-edge btn-primary">
                Full Program Catalog →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-12 py-28 text-center">
        <div className="mx-auto max-w-screen-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-headline text-4xl md:text-5xl text-[#0F172A] mb-6">
              Ready to Architect Your Future?
            </h2>
            <p className="text-[1.05rem] text-[#45464d] max-w-2xl mx-auto mb-10 leading-relaxed">
              Schedule a capability deep-dive with our senior partners to explore how the ARC model
              applies to your specific challenges.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="sharp-edge btn-primary">
                Request Discovery Briefing
              </Link>
              <Link href="/capabilities/solution-programs" className="sharp-edge btn-outlined">
                View Solution Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <BottomCTA
        variant="dark"
        headline="Need the full capability map with delivery depth?"
        subtext="Use In Detail for strategic context, execution model, and full sub-capability coverage across all six service pillars."
        primaryLabel="Explore In Detail"
        primaryHref="/capabilities/in-detail"
        secondaryLabel="Book Discovery Call"
        secondaryHref="/contact"
      />
    </div>
  );
}
