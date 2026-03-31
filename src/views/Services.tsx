'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bot, Briefcase, Building2, ChartColumn, Cloud, Cpu, Database, Send, Settings, Shield, Sparkles, Wrench } from 'lucide-react';
import PageAmbientBackground from '../components/PageAmbientBackground';
import BottomCTA from '../components/BottomCTA';
import { SERVICE_BRIEF_SECTIONS, SOLUTION_PROGRAM_DETAILS } from '../lib/services-content';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function getPillarIcon(id: string) {
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

const BOT_PHASES = [
  {
    step: '01',
    icon: <Wrench className="h-8 w-8" />,
    title: 'Build',
    detail: 'Design and implement the target system, controls, and integrations required for production.',
    objective: 'Create a production-ready foundation with clear architecture, integrations, and security controls.',
    hvaOwns: 'Solution architecture, build sprints, QA gates, integration reliability, release readiness.',
    clientRole: 'Validate priorities, provide domain access, approve milestones, and align stakeholders.',
    checkpoints: ['Define system architecture', 'Implement core integrations', 'Validate production readiness'],
    outputs: ['Technical blueprint', 'Integrated production stack', 'Release playbook and controls'],
  },
  {
    step: '02',
    icon: <Settings className="h-8 w-8" />,
    title: 'Operate',
    detail: 'Run and optimize operations with H.V.A-led execution, governance, and performance management.',
    objective: 'Stabilize operations and improve performance through measured optimization cycles.',
    hvaOwns: 'Operational governance, incident response, KPI monitoring, optimization backlog execution.',
    clientRole: 'Review performance trends, validate business impact, and co-prioritize optimization cycles.',
    checkpoints: ['Lead day-to-day operations', 'Monitor performance metrics', 'Iterate and optimize continuously'],
    outputs: ['Weekly performance reporting', 'Optimization releases', 'Operational risk controls'],
  },
  {
    step: '03',
    icon: <Send className="h-8 w-8" />,
    title: 'Transfer',
    detail: 'Transfer capabilities, documentation, and operating ownership to the client team when ready.',
    objective: 'Move ownership without losing quality, speed, or operational continuity.',
    hvaOwns: 'Documentation framework, knowledge transfer, shadow-to-owner transition plan, readiness validation.',
    clientRole: 'Assign internal owners, complete enablement, and execute staged handover checkpoints.',
    checkpoints: ['Document all processes', 'Train internal team', 'Hand over with confidence'],
    outputs: ['Transfer runbook', 'Team enablement sessions', 'Signed operational handover'],
  },
];

export default function Services() {
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [activeBOTStep, setActiveBOTStep] = useState(0);
  const activeBOTItem = BOT_PHASES[activeBOTStep] ?? BOT_PHASES[0];

  return (
    <div className="relative isolate overflow-x-hidden bg-[#F8FAFC] text-[#0F172A]">
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#2563EB] via-[#60a5fa] to-[#0ea5e9]"
        style={{ scaleX: progressScale }}
      />

      <PageAmbientBackground className="-z-10" />

      <section className="mx-auto max-w-7xl px-6 pt-32 pb-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">
              Strategy · Consulting · Engineering
            </p>
            <h1 className="font-headline text-4xl font-medium leading-[1.04] tracking-tight sm:text-5xl lg:text-[4.2rem]">
              Service Coverage at a Glance.
              <br />
              <em className="italic text-[#475569]">Built for fast decision-making.</em>
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-[#0F172A]/60">
              A concise service scan across all eight domains. Full execution depth lives in In Detail.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href="/services/in-detail"
                className="sharp-edge inline-flex items-center gap-2 bg-[#2563EB] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-[#1d4ed8]"
              >
                Explore In Detail
              </Link>
              <Link
                href="/services/solution-programs"
                className="text-sm font-bold uppercase tracking-wide text-[#2563EB] transition-colors duration-200 hover:text-[#1d4ed8]"
              >
                View Solution Programs →
              </Link>
            </div>
          </div>

          <aside className="lg:col-span-5 lg:self-end">
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
                  { label: 'Service Pillars', anchor: '#service-pillars', meta: '8 domains' },
                  { label: 'Solution Programs', anchor: '#solution-programs', meta: '3 active' },
                  { label: 'BOT Engagement Model', anchor: '#bot-model', meta: 'How we work' },
                ].map((item) => (
                  <a
                    key={item.anchor}
                    href={item.anchor}
                    className="flex items-center justify-between border-b border-white/8 py-3 last:border-0 group"
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
                  Full depth → /services/in-detail
                </p>
              </div>
            </div>
          </aside>
        </motion.div>
      </section>

      <section id="service-pillars" className="scroll-mt-28 bg-[#F2F4F6] py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">Service Pillars</p>
              <h2 className="font-headline text-3xl font-medium text-[#0F172A] md:text-4xl">Eight concise service domains.</h2>
            </div>
            <div aria-hidden="true" className="hidden h-[2px] w-20 shrink-0 bg-[#2563EB] md:block" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-px bg-[#e2e8f0] md:grid-cols-2 xl:grid-cols-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.06 }}
          >
            {SERVICE_BRIEF_SECTIONS.map((pillar) => (
              <motion.article
                key={pillar.id}
                variants={fadeUp}
                transition={{ duration: 0.45 }}
                className="group relative flex flex-col overflow-hidden bg-white p-5 md:p-6"
              >
                {/* Left accent bar */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-[#2563EB] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
                />

                {/* Blue tint overlay on hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[#2563EB]/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* ── Default content — blurs + fades out on hover ── */}
                <div className="relative flex flex-col transition-all duration-300 group-hover:opacity-0 group-hover:blur-sm">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center bg-[#dbeafe] text-[#2563EB]">
                    {getPillarIcon(pillar.id)}
                  </div>
                  <h3 className="font-headline text-xl leading-tight text-[#0F172A]">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#475569]">{pillar.summary}</p>
                </div>

                {/* ── Hover overlay — fades in, no layout impact ── */}
                <div className="absolute inset-0 flex flex-col p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75 md:p-6">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center bg-[#2563EB] text-white">
                    {getPillarIcon(pillar.id)}
                  </div>
                  <h3 className="font-headline text-xl leading-tight text-[#2563EB] mb-3">{pillar.title}</h3>
                  <ul className="space-y-2.5">
                    {pillar.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#2563EB]">
                        <span className="h-1 w-1 shrink-0 bg-[#2563EB]" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="solution-programs" className="scroll-mt-28 relative bg-[#F2F4F6] py-14 md:py-20 overflow-hidden">
        {/* Blueprint grid background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #2563EB 1px, transparent 1px), linear-gradient(to bottom, #2563EB 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-[#2563EB]/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-14 grid grid-cols-12 gap-8 items-start">

          {/* ── Sticky left panel — no motion transform (breaks position:sticky) ── */}
          <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-32">
            <p className="text-[9px] font-mono uppercase tracking-[0.4em] text-[#2563EB] mb-1">
              STATUS: ACTIVE_PROGRAMS
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#2563EB] mb-3">Solution Programs</p>
            <h2 className="font-headline text-3xl text-[#0F172A] leading-tight mb-4">
              Pre-scoped.<br />
              <em className="italic text-[#2563EB]">Production-ready.</em>
            </h2>
            <p className="text-sm text-[#475569] leading-relaxed mb-5">
              Consulting-led engagements combining architecture decisions, delivery execution, and operational ownership — not a one-off project.
            </p>

            {/* Quote card */}
            <div className="relative border border-[#2563EB]/20 bg-[#2563EB]/5 p-5 overflow-hidden mb-5">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                  background:
                    'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, #2563EB 3px, #2563EB 4px)',
                }}
              />
              <p className="relative text-sm italic leading-relaxed text-[#0F172A]/70 mb-3">
                "Programs are complete operating capabilities — not deliverables that need another team to run."
              </p>
              <p className="relative text-[9px] font-mono uppercase tracking-[0.24em] text-[#2563EB]">H.V.A ARC Framework</p>
            </div>

            {/* Program Registry HUD */}
            <div className="border border-[#e2e8f0] bg-white overflow-hidden mb-6">
              <div className="px-4 py-2 bg-[#F2F4F6] border-b border-[#e2e8f0] flex items-center justify-between">
                <span className="text-[8px] font-mono text-[#2563EB] uppercase tracking-widest">PROGRAM_REGISTRY</span>
                <span className="text-[8px] font-mono text-[#94a3b8]">3 ACTIVE</span>
              </div>
              {SOLUTION_PROGRAM_DETAILS.map((prog, i) => (
                <div key={prog.slug} className="px-4 py-2.5 border-b border-[#e2e8f0] last:border-b-0 flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#2563EB] animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                  <span className="text-[10px] font-mono text-[#475569]">PRG-00{i + 1}</span>
                  <span className="text-[10px] text-[#0F172A] truncate">{prog.name.split(' ').slice(0, 3).join(' ')}</span>
                </div>
              ))}
            </div>

            <Link
              href="/services/solution-programs"
              className="sharp-edge inline-flex items-center gap-2 bg-[#0F172A] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-[#2563EB]"
            >
              Full Program Catalog →
            </Link>
          </div>

          {/* ── Program cards — Arc R&D grid style ── */}
          <motion.div
            className="col-span-12 lg:col-span-8 grid grid-cols-1 gap-px bg-[#e2e8f0] border border-[#e2e8f0]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {SOLUTION_PROGRAM_DETAILS.map((program, i) => {
              const programIcons = [
                <Bot key="bot" className="w-7 h-7" strokeWidth={1.25} />,
                <Database key="db" className="w-7 h-7" strokeWidth={1.25} />,
                <Cloud key="cloud" className="w-7 h-7" strokeWidth={1.25} />,
              ];
              return (
                <motion.article
                  key={program.slug}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="relative p-8 bg-[#F2F4F6] hover:bg-white transition-colors group overflow-hidden"
                >
                  {/* Left accent bar */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-[#2563EB] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
                  />

                  {/* Top: icon + code */}
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-[#2563EB]">{programIcons[i]}</span>
                    <span className="text-[10px] font-mono text-[#94a3b8] tabular-nums">PRG-00{i + 1}</span>
                  </div>

                  {/* Category + name */}
                  <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#2563EB] mb-1.5">{program.category}</p>
                  <h3 className="font-headline text-2xl text-[#0F172A] mb-3 group-hover:text-[#2563EB] transition-colors duration-300">
                    {program.name}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm text-[#475569] leading-relaxed mb-5">{program.summary}</p>

                  {/* Outcome pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {program.outcomes.map((o) => (
                      <span key={o} className="px-2 py-1 text-[9px] font-mono uppercase tracking-wide bg-white border border-[#e2e8f0] text-[#475569] group-hover:border-[#2563EB]/20 transition-colors">
                        {o}
                      </span>
                    ))}
                  </div>

                  {/* Footer: integrations + case study link */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#e2e8f0]">
                    <div className="flex flex-wrap gap-2">
                      {program.integrations.slice(0, 3).map((intg) => (
                        <span key={intg} className="text-[9px] font-mono text-[#94a3b8]">{intg}</span>
                      ))}
                      {program.integrations.length > 3 && (
                        <span className="text-[9px] font-mono text-[#94a3b8]">+{program.integrations.length - 3}</span>
                      )}
                    </div>
                    {program.proofLinks.length > 0 && (
                      <Link
                        href={program.proofLinks[0]!}
                        className="text-[10px] font-bold uppercase tracking-wide text-[#2563EB] hover:text-[#1d4ed8] transition-colors shrink-0"
                      >
                        Case Study →
                      </Link>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* ── Program vs. Project — Arc "Difference" dark contrast section ── */}
      <section className="bg-[#0F172A] py-16 relative overflow-hidden">
        {/* Blueprint grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,#60a5fa 0,#60a5fa 1px,transparent 0,transparent 50%),repeating-linear-gradient(90deg,#60a5fa 0,#60a5fa 1px,transparent 0,transparent 50%)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-[#2563EB]/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-14 grid grid-cols-12 gap-8 items-start">
          {/* Left — manifesto */}
          <motion.div
            className="col-span-12 lg:col-span-5"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#2563EB] mb-6">Program vs. Project</p>
            <h2 className="font-headline text-5xl md:text-6xl text-white leading-tight mb-8">
              Not a project.<br />
              Not a retainer.<br />
              <em className="italic text-[#2563EB]">A program.</em>
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-8">
              Most engagements end at delivery. Programs are different — structured around outcomes, not outputs, with H.V.A accountable through operations.
            </p>
            <div className="h-px w-12 bg-[#2563EB]" />
          </motion.div>

          {/* Right — contrast cards */}
          <motion.div
            className="col-span-12 lg:col-span-7 grid grid-cols-1 gap-px bg-white/5 border border-white/5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {[
              {
                others: 'Projects end at delivery.',
                arc: 'Programs run until outcomes are confirmed and owned by your team.',
              },
              {
                others: 'Vendors hand off documentation.',
                arc: 'H.V.A stays through full operational transfer — no documentation-only handoffs.',
              },
              {
                others: 'Scope is defined by deliverables.',
                arc: 'Scope is defined by business outcomes. Deliverables follow.',
              },
              {
                others: 'Strategy and engineering are separate teams.',
                arc: 'One accountable loop — from architecture decision to production operation.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="p-8 bg-[#0F172A] hover:bg-slate-900/50 transition-colors"
              >
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#94a3b8] mb-2 line-through decoration-[#94a3b8]/40">
                  {item.others}
                </p>
                <h3 className="font-headline text-xl text-white">{item.arc}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="bot-model" className="scroll-mt-28 relative overflow-hidden bg-[#F2F4F6] py-14 md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #2563EB 1px, transparent 1px), linear-gradient(to bottom, #2563EB 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#2563EB]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.35 }}
            className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">How Engagement Works</p>
              <h2 className="font-headline text-4xl leading-[1.02] text-[#0F172A] md:text-5xl">
                Build-Operate-Transfer in one model.
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#475569]">
                ARC-style execution logic: one accountable sequence from architecture to operational ownership transfer.
                Each phase defines what H.V.A owns, what client teams own, and what must be delivered before the next gate.
              </p>
            </div>
            <p className="max-w-xl text-[#475569] leading-relaxed lg:text-right">
              Recommended when internal teams want staged ownership transfer without operational disruption.
            </p>
          </motion.div>

          <div className="mb-8 grid grid-cols-1 gap-px bg-[#d8e2f5] md:grid-cols-3">
            {[
              'Decision gates at every phase transition',
              'Joint governance between H.V.A and client leadership',
              'Clear handover criteria before transfer',
            ].map((item) => (
              <div key={item} className="bg-white px-5 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#2563EB]">
                {item}
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.35 }}
          >
            <div className="mb-7">
              <div className="relative mb-3 h-px w-full bg-slate-300">
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
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB]">Phase {item.step}</p>
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
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#475569]">{item.objective}</p>
                  </button>
                );
              })}
            </div>

            <motion.div
              key={activeBOTItem.step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className="bg-[#0F172A] p-5 md:p-7"
            >
              {/* Compact header */}
              <div className="mb-4 flex items-center gap-4">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center bg-[#2563EB] text-xs font-bold text-white">
                  {activeBOTItem.step}
                </span>
                <div className="text-[#2563EB] shrink-0">{activeBOTItem.icon}</div>
                <h3 className="font-headline text-xl text-white">{activeBOTItem.title}</h3>
              </div>

              {/* 4-col bullet grid */}
              <div className="grid grid-cols-2 gap-px bg-white/8 border border-white/8 md:grid-cols-4">
                <article className="bg-[#0F172A] p-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#60a5fa] mb-2">H.V.A Owns</p>
                  <ul className="space-y-1.5">
                    {activeBOTItem.hvaOwns.split(', ').map((item) => (
                      <li key={item} className="flex items-start gap-1.5 text-xs text-[#94a3b8]">
                        <span className="mt-1.5 h-1 w-1 shrink-0 bg-[#2563EB]" />
                        {item.replace(/\.$/, '')}
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="bg-[#0F172A] p-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#60a5fa] mb-2">Client Role</p>
                  <ul className="space-y-1.5">
                    {activeBOTItem.clientRole.split(', ').map((item) => (
                      <li key={item} className="flex items-start gap-1.5 text-xs text-[#94a3b8]">
                        <span className="mt-1.5 h-1 w-1 shrink-0 bg-[#2563EB]" />
                        {item.replace(/\.$/, '')}
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
            <Link
              href="/services/in-detail"
              className="sharp-edge inline-flex items-center gap-2 bg-[#2563EB] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-[#1d4ed8]"
            >
              Explore In Detail
            </Link>
            <Link
              href="/services/solution-programs"
              className="text-sm font-bold uppercase tracking-wide text-[#2563EB] transition-colors duration-200 hover:text-[#1d4ed8]"
            >
              View Solution Programs →
            </Link>
          </div>
        </div>
      </section>

      <BottomCTA
        variant="dark"
        headline="Need the full capability map with delivery depth?"
        subtext="Use In Detail for strategic context, execution model, and full subservice coverage across all domains."
        primaryLabel="Explore In Detail"
        primaryHref="/services/in-detail"
        secondaryLabel="Book Discovery Call"
        secondaryHref="/contact"
      />
    </div>
  );
}
