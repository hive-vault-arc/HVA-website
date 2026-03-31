'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bot, Briefcase, Building2, ChartColumn, Cpu, Send, Settings, Shield, Sparkles, Wrench } from 'lucide-react';
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

      <section className="mx-auto max-w-7xl px-6 pt-32 pb-16 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12"
        >
          <div className="lg:col-span-8">
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">
              Strategy · Consulting · Engineering
            </p>
            <h1 className="font-headline text-4xl font-medium leading-[1.04] tracking-tight sm:text-5xl lg:text-[4.2rem]">
              Service Coverage at a Glance.
              <br />
              <em className="italic text-[#475569]">Built for fast decision-making.</em>
            </h1>
            <p className="mt-7 max-w-2xl text-xl font-light leading-relaxed text-[#0F172A]/60">
              This page gives a concise service scan. Full execution depth lives in In Detail.
            </p>
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

          <aside className="lg:col-span-4 lg:self-end">
            <div className="bg-[#F2F4F6] p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#94a3b8]">Quick Orientation</p>
              <ul className="mt-4 space-y-2.5">
                {['8 service pillars', 'Program preview', 'BOT engagement model'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#475569]">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </motion.div>
      </section>

      <section className="bg-[#F2F4F6] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
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
                className="group flex min-h-[210px] flex-col bg-white p-5 md:min-h-[230px] md:p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center bg-[#dbeafe] text-[#2563EB]">
                  {getPillarIcon(pillar.id)}
                </div>
                <h3 className="font-headline text-2xl leading-tight text-[#0F172A]">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">{pillar.summary}</p>
                <p className="mt-2 hidden text-[10px] font-bold uppercase tracking-[0.14em] text-[#94a3b8] md:block">
                  Hover to preview subservices
                </p>
                <ul className="max-h-0 overflow-hidden space-y-1.5 opacity-0 transition-all duration-300 md:group-hover:mt-3 md:group-hover:max-h-24 md:group-hover:opacity-100">
                  {pillar.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#2563EB]">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-[#2563EB]" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="solution-programs" className="scroll-mt-36 bg-[#F2F4F6] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-14">
          <div className="grid grid-cols-12 gap-8 items-start">

            {/* ── Sticky left panel ── */}
            <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#2563EB] mb-4">Solution Programs</p>
                <h2 className="font-headline text-4xl md:text-5xl text-[#0F172A] leading-tight mb-6">
                  Pre-scoped.<br />
                  <em className="italic text-[#2563EB]">Production-ready.</em>
                </h2>
                <p className="text-[#475569] leading-relaxed mb-8">
                  Each program is a consulting-led engagement combining architecture decisions, delivery execution, and operational ownership — not a one-off project.
                </p>

                {/* Quote card */}
                <div className="border border-[#2563EB]/20 bg-[#2563EB]/5 p-6">
                  <p className="text-sm italic leading-relaxed text-[#0F172A]/70 mb-4">
                    "Programs are designed to be complete operating capabilities — not deliverables that require another team to run them."
                  </p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">H.V.A ARC Framework</p>
                </div>

                <div className="mt-8">
                  <Link
                    href="/services/solution-programs"
                    className="sharp-edge inline-flex items-center gap-2 bg-[#0F172A] px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-[#2563EB]"
                  >
                    Full Program Catalog →
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* ── Program cards ── */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-px bg-[#e2e8f0] border border-[#e2e8f0]">
              {SOLUTION_PROGRAM_DETAILS.map((program, i) => (
                <motion.article
                  key={program.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-white hover:bg-[#F8FAFC] transition-colors group"
                >
                  {/* Card header */}
                  <div className="p-8 pb-6 border-b border-[#e2e8f0]">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#2563EB] mb-2">{program.category}</p>
                        <h3 className="font-headline text-2xl md:text-3xl text-[#0F172A] leading-tight group-hover:text-[#2563EB] transition-colors duration-300">
                          {program.name}
                        </h3>
                      </div>
                      <span className="shrink-0 text-[10px] font-mono text-[#94a3b8] mt-1">PRG-00{i + 1}</span>
                    </div>
                    <p className="text-[#475569] leading-relaxed">{program.summary}</p>
                  </div>

                  {/* Card body — 3-col detail grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#e2e8f0]">

                    {/* Modules */}
                    <div className="bg-white p-6">
                      <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#94a3b8] mb-3">Modules</p>
                      <ul className="space-y-1.5">
                        {program.modules.map((m) => (
                          <li key={m} className="flex items-start gap-2 text-xs text-[#475569]">
                            <span className="mt-1.5 h-1 w-1 shrink-0 bg-[#2563EB]" />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Outcomes */}
                    <div className="bg-white p-6">
                      <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#94a3b8] mb-3">Outcomes</p>
                      <ul className="space-y-1.5">
                        {program.outcomes.map((o) => (
                          <li key={o} className="flex items-start gap-2 text-xs text-[#475569]">
                            <span className="mt-1.5 h-1 w-1 shrink-0 bg-[#2563EB]" />
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Integrations + Delivery */}
                    <div className="bg-white p-6">
                      <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#94a3b8] mb-3">Integrations</p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {program.integrations.map((intg) => (
                          <span key={intg} className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wide bg-[#F2F4F6] border border-[#e2e8f0] text-[#475569]">
                            {intg}
                          </span>
                        ))}
                      </div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#94a3b8] mb-2">Delivery Model</p>
                      <p className="text-xs text-[#475569] leading-relaxed">{program.deliveryModel}</p>
                    </div>
                  </div>

                  {/* Card footer */}
                  {program.proofLinks.length > 0 && (
                    <div className="px-8 py-4 flex items-center gap-6 border-t border-[#e2e8f0]">
                      <Link
                        href={program.proofLinks[0]!}
                        className="text-[10px] font-bold uppercase tracking-wide text-[#2563EB] hover:text-[#1d4ed8] transition-colors"
                      >
                        View Case Study →
                      </Link>
                    </div>
                  )}
                </motion.article>
              ))}
            </div>

          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#F2F4F6] py-16 md:py-24">
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
            className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
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
              className="bg-[#0F172A] p-8 md:p-10"
            >
              <div className="mb-6 flex flex-wrap items-start gap-x-8 gap-y-4">
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center bg-[#2563EB] text-sm font-bold text-white font-label">
                    {activeBOTItem.step}
                  </span>
                  <div className="text-[#2563EB]">{activeBOTItem.icon}</div>
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB]">Current Phase</p>
                  <h3 className="font-headline text-2xl text-white">{activeBOTItem.title}</h3>
                </div>
              </div>

              <p className="mb-7 max-w-2xl leading-relaxed text-[#94a3b8]">{activeBOTItem.detail}</p>

              <div className="grid grid-cols-1 gap-5 border-t border-white/10 pt-6 md:grid-cols-2">
                <article className="border border-white/10 bg-white/5 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#60a5fa]">H.V.A Owns</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#cbd5e1]">{activeBOTItem.hvaOwns}</p>
                </article>
                <article className="border border-white/10 bg-white/5 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#60a5fa]">Client Role</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#cbd5e1]">{activeBOTItem.clientRole}</p>
                </article>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <article>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#60a5fa]">Phase Outputs</p>
                  <ul className="mt-3 space-y-2">
                    {activeBOTItem.outputs.map((output) => (
                      <li key={output} className="flex items-start gap-3 text-sm text-[#cbd5e1]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#2563EB]" />
                        <span>{output}</span>
                      </li>
                    ))}
                  </ul>
                </article>
                <article>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#60a5fa]">Execution Checkpoints</p>
                  <ul className="mt-3 space-y-2">
                    {activeBOTItem.checkpoints.map((checkpoint) => (
                      <li key={checkpoint} className="flex items-start gap-3 text-sm text-[#cbd5e1]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#2563EB]" />
                        <span>{checkpoint}</span>
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
