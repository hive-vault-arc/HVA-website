'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bot, Building2, Cloud, Cpu, Database, Send, Settings, Wrench } from 'lucide-react';
import BottomCTA from '../components/BottomCTA';
import PageAmbientBackground from '../components/PageAmbientBackground';
import SectionBrandMark from '../components/SectionBrandMark';
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
    image: '/Images/capabilities/hva-arc-assess-operating-model.webp',
    imageAlt: 'Consulting team assessing operating constraints and transformation priorities',
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
    image: '/Images/capabilities/hva-arc-reengineer-operating-model.webp',
    imageAlt: 'Engineering workspace for re-engineering systems and operating workflows',
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
    image: '/Images/capabilities/hva-arc-command-operating-model.webp',
    imageAlt: 'Managed operations room monitoring production systems and performance',
  },
];

const CAPABILITY_IMAGES = {
  strategyBusiness: '/Images/capabilities/hva-strategy-business-capability.webp',
  technologyConsulting: '/Images/capabilities/hva-technology-consulting-capability.webp',
  aiDataAnalytics: '/Images/capabilities/hva-ai-data-capability.webp',
  softwareEngineering: '/Images/capabilities/hva-software-engineering-capability.webp',
  cloudInfrastructure: '/Images/capabilities/hva-cloud-infrastructure-capability.webp',
  operationsManaged: '/Images/capabilities/hva-operations-managed-capability.webp',
};

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
  const activeBOTSnapshot = [
    {
      label: 'Hive Vault Arc focus',
      primary: activeBOTItem.hvaOwns.split(', ')[0],
      secondary: activeBOTItem.hvaOwns.split(', ')[1],
    },
    {
      label: 'Client Role',
      primary: activeBOTItem.clientRole.split(', ')[0],
      secondary: activeBOTItem.clientRole.split(', ')[1],
    },
    {
      label: 'Phase Output',
      primary: activeBOTItem.outputs[0],
      secondary: activeBOTItem.checkpoints[0],
    },
  ];
  const activeBOTExecutionDetail = [
    {
      label: 'Hive Vault Arc Owns',
      items: activeBOTItem.hvaOwns.split(', ').slice(2).map((entry) => entry.replace(/\.$/, '')),
    },
    {
      label: 'Outputs',
      items: activeBOTItem.outputs.slice(1),
    },
    {
      label: 'Gate Checks',
      items: activeBOTItem.checkpoints.slice(1),
    },
  ];

  const [pillar0, pillar1, pillar2, pillar3, pillar4, pillar5] = CAPABILITY_BRIEF_SECTIONS;

  return (
    <div className="relative isolate overflow-x-hidden bg-[#FFFFFF] text-[#1A2535]">
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#E8A838] via-[#F0C15A] to-[#E8A838]"
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
              <div className="mb-6 flex items-center gap-3">
                <SectionBrandMark size="sm" />
                <span className="text-[#E8A838] font-bold tracking-[0.24em] text-[10px] uppercase block">
                  Capabilities &amp; Mastery
                </span>
              </div>
              <h1 className="font-headline text-[clamp(2.75rem,13vw,3.9rem)] font-light leading-[1.02] tracking-tight text-[#1A2535] sm:text-6xl lg:text-[5.2rem]">
                Six Pillars.
                <br />
                <em className="italic text-[#E8A838]">One Accountable</em>
                <br />
                Partner.
              </h1>
              <p className="mt-6 max-w-xl text-[1.05rem] text-[#536070]/80 leading-relaxed">
                Hive Vault Arc delivers strategy, engineering, and managed operations across six pillars — one team, one accountability loop, from discovery to production.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/capabilities/in-detail" className="sharp-edge btn-primary">
                  Explore In Detail
                </Link>
                <Link
                  href="/capabilities/solution-programs"
                  className="inline-flex min-h-11 items-center gap-1.5 border-b border-[#1A2535]/30 pb-0.5 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[#1A2535] transition-colors hover:border-[#E8A838] hover:text-[#E8A838]"
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
              <div className="relative overflow-hidden bg-[#1A2535] p-6">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.05]"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right,#F0C15A 1px,transparent 1px),linear-gradient(to bottom,#F0C15A 1px,transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
                <p className="relative text-[9px] font-mono uppercase tracking-[0.3em] text-[#F0C15A] mb-4">
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
                      <span className="text-[9px] font-mono text-[#F0C15A]/60 group-hover:text-[#F0C15A] transition-colors">
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
      <div aria-hidden="true" className="h-px bg-[#DDE3EA] mx-6 lg:mx-12" />

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
              className="group relative flex min-h-[340px] flex-col justify-between overflow-hidden bg-white p-6 sm:min-h-[380px] sm:p-8 lg:h-[420px] lg:p-10"
            >
              <Image
                src={CAPABILITY_IMAGES.strategyBusiness}
                alt="Strategy and business consulting operating model design"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover opacity-55 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/82 to-white/35" />
              <div className="relative z-10">
                <div className="mb-8 flex h-12 w-12 items-center justify-center bg-white/78 text-[#E8A838] ring-1 ring-[#1A2535]/10">
                  {getPillarIcon('strategy-business')}
                </div>
                <h3 className="font-headline text-2xl text-[#1A2535] mb-3">
                  Strategy &amp; Business
                </h3>
                <p className="text-[#3D4858] leading-relaxed text-sm">
                  {pillar0?.summary}
                </p>
              </div>
              <ul className="relative z-10 mt-8 space-y-2">
                {pillar0?.bullets.map((b) => (
                  <li key={b} className="text-[0.68rem] font-bold tracking-[0.14em] text-[#566274]/75 uppercase">
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* 2 — Technology Consulting (2-col wide + image overlay) */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="group relative min-h-[360px] overflow-hidden bg-[#1A2535] md:col-span-2 lg:h-[420px]"
            >
              <Image
                src={CAPABILITY_IMAGES.technologyConsulting}
                alt="Technology consulting architecture — Hive Vault Arc Tangier Morocco"
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover opacity-34 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="relative z-10 flex min-h-[360px] flex-col justify-between bg-gradient-to-t from-[#1A2535]/95 via-[#1A2535]/58 to-[#E8A838]/12 p-6 sm:p-8 lg:min-h-[420px] lg:p-10">
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
              className="group relative flex min-h-[340px] flex-col justify-between overflow-hidden bg-[#1A2535] p-6 sm:min-h-[380px] sm:p-8 lg:h-[420px] lg:p-10"
            >
              <Image
                src={CAPABILITY_IMAGES.aiDataAnalytics}
                alt="AI and data analytics production intelligence systems"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover opacity-35 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2535]/95 via-[#1A2535]/64 to-[#E8A838]/14" />
              <div className="relative z-10">
                <div className="mb-8 flex h-12 w-12 items-center justify-center bg-white/10 text-white">
                  {getPillarIcon('ai-data-analytics')}
                </div>
                <h3 className="font-headline text-2xl text-white mb-3">AI &amp; Data</h3>
                <p className="text-white/65 leading-relaxed text-sm">{pillar2?.summary}</p>
              </div>
              {(pillar2?.landingLinks.length ?? 0) > 0 && (
                <div className="relative z-10 mt-8 flex flex-col gap-2">
                  {pillar2?.landingLinks.map((lnk) => (
                    <Link
                      key={lnk.href}
                      href={lnk.href}
                      className="inline-flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[#F4D27C] hover:text-white transition-colors group/link"
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
              className="group relative flex min-h-[340px] flex-col justify-between overflow-hidden bg-white p-6 sm:min-h-[380px] sm:p-8 lg:h-[420px] lg:p-10"
            >
              <Image
                src={CAPABILITY_IMAGES.softwareEngineering}
                alt="Software engineering production-grade systems workspace"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover opacity-55 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/32" />
              <div className="relative z-10">
                <div className="mb-8 flex h-12 w-12 items-center justify-center bg-white/78 text-[#E8A838] ring-1 ring-[#1A2535]/10">
                  {getPillarIcon('software-engineering')}
                </div>
                <h3 className="font-headline text-2xl text-[#1A2535] mb-3">
                  Software Engineering
                </h3>
                <p className="text-[#3D4858] leading-relaxed text-sm">{pillar3?.summary}</p>
              </div>
              <div className="relative z-10 mt-8 space-y-2">
                <div className="w-full h-px bg-[#1A2535]/15" />
                <p className="text-[0.62rem] font-bold text-[#566274]/75 uppercase tracking-[0.16em] py-2">
                  Full-Stack Sovereignty
                </p>
              </div>
            </motion.div>

            {/* 5 — Cloud & Infrastructure */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="group relative flex min-h-[340px] flex-col justify-between overflow-hidden bg-white p-6 sm:min-h-[380px] sm:p-8 lg:h-[420px] lg:p-10"
            >
              <Image
                src={CAPABILITY_IMAGES.cloudInfrastructure}
                alt="Cloud infrastructure secure systems and observability"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover opacity-52 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/82 to-white/34" />
              <div className="relative z-10">
                <div className="mb-8 flex h-12 w-12 items-center justify-center bg-white/78 text-[#E8A838] ring-1 ring-[#1A2535]/10">
                  {getPillarIcon('cloud-infrastructure')}
                </div>
                <h3 className="font-headline text-2xl text-[#1A2535] mb-3">
                  Cloud &amp; Infrastructure
                </h3>
                <p className="text-[#3D4858] leading-relaxed text-sm">{pillar4?.summary}</p>
              </div>
              <div className="relative z-10 flex flex-wrap gap-2 mt-8">
                {['AWS', 'Azure', 'GCP', 'Hybrid'].map((tag) => (
                  <span
                    key={tag}
                    className="border border-[#1A2535]/15 bg-white/70 px-3 py-1 text-[0.6rem] font-bold text-[#3D4858] uppercase tracking-[0.12em]"
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
            className="mt-4 bg-[#1A2535] p-10 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden"
          >
            <Image
              src={CAPABILITY_IMAGES.operationsManaged}
              alt="Operations and managed services monitoring workspace"
              fill
              sizes="100vw"
              className="object-cover opacity-34"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A2535]/95 via-[#1A2535]/76 to-[#E8A838]/20" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.045]"
              style={{
                backgroundImage:
                  'linear-gradient(to right,#F0C15A 1px,transparent 1px),linear-gradient(to bottom,#F0C15A 1px,transparent 1px)',
                backgroundSize: '44px 44px',
              }}
            />
            <div className="relative z-10 flex items-center gap-8">
              <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center bg-white/5 text-[#E8A838]">
                <Settings className="h-8 w-8" strokeWidth={1.2} />
              </div>
              <div>
                <h3 className="font-headline text-2xl md:text-3xl text-white mb-2">
                  Operations &amp; Managed Services
                </h3>
                <p className="text-[#778192] max-w-xl text-sm leading-relaxed">
                  {pillar5?.summary}
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="sharp-edge relative z-10 inline-flex min-h-11 items-center justify-center gap-1.5 bg-[#E8A838] px-8 py-3.5 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#C8891C] w-full sm:w-auto"
            >
              Delegate Operations →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── ARC OPERATING MODEL ────────────────────────────────────────────── */}
      <section id="bot-model" className="scroll-mt-28 bg-[#F7F8FA] py-28 px-6 lg:px-12 overflow-hidden relative">
        {/* Blueprint grid — subtle structural texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage:
              'linear-gradient(to right,#1A2535 1px,transparent 1px),linear-gradient(to bottom,#1A2535 1px,transparent 1px)',
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
            className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-12"
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              className="md:col-span-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <SectionBrandMark size="sm" />
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E8A838] block">
                  Engagement Methodology
                </span>
              </div>
              <h2 className="font-headline text-5xl md:text-6xl text-[#1A2535] leading-[1.05]">
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
              <div className="w-full">
                <p className="text-[#536070] text-base leading-relaxed mb-6">
                  Our proprietary engagement methodology ensures every project is predictable, rigorous, and impactful. One accountable sequence — from diagnosis to managed operations.
                </p>
                <div className="grid grid-cols-1 gap-px bg-[#C8CED7] sm:grid-cols-3">
                  {['Decision gates', 'Joint governance', 'Managed continuity'].map((item, index) => (
                    <div key={item} className="bg-white px-4 py-3">
                      <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#E8A838]">
                        0{index + 1}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-[#3D4858]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Interactive ARC sequence */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 gap-5 lg:h-[760px] lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch"
          >
            <div className="flex flex-col gap-3 lg:min-h-0">
              <div className="border border-[#C8CED7] bg-white p-4">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1A2535]">
                      ARC sequence
                    </p>
                    <p className="mt-2 max-w-md text-xs leading-relaxed text-[#566274]">
                      Hover a phase to see ownership, outputs, and decision gates.
                    </p>
                  </div>
                  <span className="border border-[#C8CED7] px-3 py-2 text-xs font-bold text-[#E8A838]">
                    {activeBOTItem.step}/03
                  </span>
                </div>

                <div className="relative h-2 bg-[#DDE3EA]">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-[#E8A838]"
                    animate={{ width: `${((activeBOTStep + 1) / BOT_PHASES.length) * 100}%` }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-px bg-[#C8CED7]">
                  {BOT_PHASES.map((item, index) => (
                    <button
                      key={`arc-rail-${item.step}`}
                      type="button"
                      onClick={() => setActiveBOTStep(index)}
                      onMouseEnter={() => setActiveBOTStep(index)}
                      onFocus={() => setActiveBOTStep(index)}
                      aria-pressed={activeBOTStep === index}
                      className={`bg-white px-3 py-2.5 text-left transition-colors duration-150 ${
                        activeBOTStep === index ? 'text-[#E8A838]' : 'text-[#657384] hover:text-[#1A2535]'
                      }`}
                    >
                      <span className="block text-[0.6rem] font-bold uppercase tracking-[0.14em]">
                        Phase {item.step}
                      </span>
                      <span className="mt-1 block text-sm font-semibold">{item.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {BOT_PHASES.map((item, index) => {
                const isActive = activeBOTStep === index;
                return (
                  <button
                    key={item.step}
                    type="button"
                    onClick={() => setActiveBOTStep(index)}
                    onMouseEnter={() => setActiveBOTStep(index)}
                    onFocus={() => setActiveBOTStep(index)}
                    aria-pressed={isActive}
                    className={`group relative grid flex-1 min-h-0 w-full overflow-hidden border bg-white text-left transition-colors duration-150 sm:grid-cols-[1fr_140px] ${
                      isActive ? 'border-[#E8A838]' : 'border-[#DDE3EA] hover:border-[#9AA4B2]'
                    }`}
                  >
                    <div
                      className={`absolute bottom-0 left-0 top-0 w-[3px] transition-colors duration-150 ${
                        isActive ? 'bg-[#E8A838]' : 'bg-transparent group-hover:bg-[#C8CED7]'
                      }`}
                    />
                    <div className="flex items-start gap-4 p-4">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center border transition-colors duration-150 ${
                          isActive
                            ? 'border-[#E8A838] bg-[#E8A838] text-white'
                            : 'border-[#C8CED7] text-[#566274] group-hover:text-[#E8A838]'
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#E8A838]">
                          Phase {item.step}
                        </p>
                        <h3 className="mt-1.5 font-headline text-2xl leading-none text-[#1A2535]">
                          {item.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#566274]">{item.objective}</p>
                      </div>
                    </div>
                    <div className="relative min-h-32 border-t border-[#DDE3EA] sm:min-h-0 sm:border-l sm:border-t-0">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, 140px"
                        className="object-cover opacity-85 transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        className={`absolute inset-0 transition-colors duration-150 ${
                          isActive ? 'bg-[#E8A838]/10' : 'bg-[#1A2535]/18 group-hover:bg-[#1A2535]/8'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <motion.div
              key={activeBOTItem.step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className="h-full self-stretch bg-[#1A2535] p-4 md:p-5"
            >
              <div className="grid h-full gap-4">
                <div className="relative min-h-[220px] overflow-hidden border border-white/[0.08] bg-white/[0.04]">
                  <Image
                    src={activeBOTItem.image}
                    alt={activeBOTItem.imageAlt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover opacity-78"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1A2535]/92 via-[#1A2535]/46 to-[#1A2535]/8" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1A2535] to-transparent p-4 md:p-5">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                      <div>
                        <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#F4D27C]">
                          Phase {activeBOTItem.step}
                        </p>
                        <p className="mt-2 font-headline text-3xl leading-none text-white md:text-4xl">
                          {activeBOTItem.title}
                        </p>
                      </div>
                      <p className="max-w-sm text-sm leading-relaxed text-white/70">
                        {activeBOTItem.outputs[0]}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-px border border-white/[0.08] bg-white/[0.08] md:grid-cols-[1fr_220px]">
                  <div className="bg-[#1A2535] p-4">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center bg-[#E8A838] text-xs font-bold text-white">
                        {activeBOTItem.step}
                      </span>
                      <div className="text-[#F0C15A] shrink-0">{activeBOTItem.icon}</div>
                    </div>
                    <p className="max-w-2xl text-base leading-relaxed text-white">
                      {activeBOTItem.objective}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 bg-white/[0.03] md:grid-cols-1">
                    {BOT_PHASES.map((item, index) => (
                      <button
                        key={`arc-panel-${item.step}`}
                        type="button"
                        onClick={() => setActiveBOTStep(index)}
                        onMouseEnter={() => setActiveBOTStep(index)}
                        onFocus={() => setActiveBOTStep(index)}
                        aria-pressed={activeBOTStep === index}
                        className={`flex min-h-11 items-center justify-between border-r border-white/[0.08] px-3 py-3 text-left text-[0.65rem] font-bold uppercase tracking-[0.12em] last:border-r-0 md:border-b md:border-r-0 md:last:border-b-0 transition-colors duration-150 ${
                          activeBOTStep === index
                            ? 'bg-[#E8A838] text-white'
                            : 'text-[#9AA4B2] hover:bg-white/[0.06] hover:text-white'
                        }`}
                      >
                        <span>{item.title}</span>
                        <span>{item.step}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-px border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
                  {activeBOTSnapshot.map((section) => (
                    <article key={section.label} className="bg-[#1A2535] p-4">
                      <p className="mb-3 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#F0C15A]">
                        {section.label}
                      </p>
                      <p className="text-sm font-semibold leading-relaxed text-white">
                        {section.primary.replace(/\.$/, '')}
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#9AA4B2]">
                        {section.secondary.replace(/\.$/, '')}
                      </p>
                    </article>
                  ))}
                </div>

                <div className="border border-white/[0.08] bg-[#1A2535]">
                  <div className="border-b border-white/[0.08] px-4 py-3">
                    <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#F4D27C]">
                      Execution detail
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-px bg-white/[0.08] md:grid-cols-3">
                    {activeBOTExecutionDetail.map((section) => (
                      <article key={section.label} className="bg-[#1A2535] p-4">
                        <p className="mb-3 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#F0C15A]">
                          {section.label}
                        </p>
                        <ul className="space-y-2">
                          {section.items.map((item) => (
                            <li key={`${section.label}-${item}`} className="flex items-start gap-2 text-xs leading-relaxed text-[#AEB7C4]">
                              <span className="mt-1.5 h-1 w-1 shrink-0 bg-[#E8A838]" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/capabilities/in-detail" className="sharp-edge btn-primary">
              Explore In Detail
            </Link>
            <Link
              href="/capabilities/solution-programs"
              className="text-sm font-bold uppercase tracking-wide text-[#E8A838] transition-colors duration-200 hover:text-[#C8891C]"
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
              className="col-span-12 md:col-span-10 md:col-start-2 bg-[#E8EBF0] p-12 md:p-16 relative overflow-hidden"
            >
              {/* Decorative open-quote mark */}
              <div
                aria-hidden="true"
                className="absolute top-8 left-10 font-headline text-[9rem] leading-none text-[#E8A838]/10 select-none pointer-events-none"
              >
                &ldquo;
              </div>

              <div className="relative z-10 max-w-3xl">
                <h2 className="font-headline text-3xl md:text-4xl lg:text-[2.8rem] italic leading-tight text-[#1A2535] mb-12">
                  &ldquo;Transformation succeeds when strategy, engineering, and operations move
                  together &mdash; from the first decision to the last deployment.&rdquo;
                </h2>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-[#1A2535] overflow-hidden flex-shrink-0 relative">
                    <Image
                      src="/Images/capabilities/hva-capabilities-expertise.png"
                      alt="Hive Vault Arc framework expertise"
                      fill
                      sizes="64px"
                      className="object-cover grayscale"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-[#1A2535] text-sm">ARC Framework</p>
                    <p className="text-[0.7rem] text-[#536070] uppercase tracking-[0.14em] mt-1">
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
      <section id="solution-programs" className="scroll-mt-28 bg-[#FFFFFF] px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-screen-2xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.08 }}
            transition={{ staggerChildren: 0.08 }}
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="mb-10 border-t border-[#C8CED7] pt-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
                <div className="md:col-span-7">
                  <div className="flex items-start gap-3">
                    <SectionBrandMark size="sm" className="mt-0.5" />
                    <div>
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#E8A838]">
                        Solution Programs
                      </p>
                      <h2 className="font-headline text-4xl leading-[1.06] text-[#1A2535] md:text-5xl">
                        Pre-scoped.
                        <br />
                        <em className="italic">Production-ready.</em>
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-5">
                  <p className="max-w-md text-sm leading-relaxed text-[#536070]">
                    Consulting-led engagements combining architecture decisions, delivery execution,
                    and operational ownership — not a one-off project.
                  </p>
                  <div className="mt-5 grid grid-cols-3 gap-px bg-[#C8CED7]">
                    {['Scoped', 'Built', 'Operated'].map((item, index) => (
                      <div key={item} className="bg-white px-3 py-2.5">
                        <p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-[#E8A838]">
                          0{index + 1}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-[#3D4858]">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-px border border-[#DDE3EA] bg-[#DDE3EA] md:grid-cols-3">
              {CAPABILITY_SOLUTION_PROGRAM_DETAILS.map((program, i) => {
                const programIcons = [
                  <Bot key="bot" className="h-5 w-5" strokeWidth={1.3} />,
                  <Database key="db" className="h-5 w-5" strokeWidth={1.3} />,
                  <Cloud key="cloud" className="h-5 w-5" strokeWidth={1.3} />,
                ];
                const programMedia = [
                  {
                    src: CAPABILITY_IMAGES.aiDataAnalytics,
                    alt: 'AI reception and lead operations program workspace',
                  },
                  {
                    src: CAPABILITY_IMAGES.softwareEngineering,
                    alt: 'CRM modernization program engineering and workflow workspace',
                  },
                  {
                    src: CAPABILITY_IMAGES.cloudInfrastructure,
                    alt: 'Cloud delivery reliability infrastructure operations workspace',
                  },
                ];
                return (
                  <motion.article
                    key={program.slug}
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                    className="group flex min-h-[440px] flex-col bg-white transition-colors duration-200 hover:bg-[#FFFFFF] md:min-h-[520px]"
                  >
                    <div className="relative h-40 overflow-hidden bg-[#1A2535]">
                      <Image
                        src={programMedia[i]!.src}
                        alt={programMedia[i]!.alt}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover opacity-62 transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A2535]/88 via-[#1A2535]/36 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                        <span className="text-white">{programIcons[i]}</span>
                        <span className="font-mono text-[0.58rem] text-white/70">PRG-00{i + 1}</span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-7">
                      <p className="mb-2 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#E8A838]">
                        {program.category}
                      </p>
                      <h3 className="mb-3 font-headline text-xl leading-tight text-[#1A2535] transition-colors duration-200 group-hover:text-[#E8A838]">
                        {program.name}
                      </h3>
                      <p className="mb-5 flex-1 text-sm leading-relaxed text-[#536070]">
                        {program.summary}
                      </p>

                      <div className="mb-5 grid grid-cols-1 gap-px bg-[#DDE3EA]">
                        <div className="bg-[#FFFFFF] p-3">
                          <p className="mb-2 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-[#657384]">
                            Build Scope
                          </p>
                          <p className="text-xs leading-relaxed text-[#3D4858]">
                            {program.modules.slice(0, 2).join(' · ')}
                          </p>
                        </div>
                        <div className="bg-[#FFFFFF] p-3">
                          <p className="mb-2 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-[#657384]">
                            Operating Gain
                          </p>
                          <p className="text-xs leading-relaxed text-[#3D4858]">
                            {program.outcomes.slice(0, 2).join(' · ')}
                          </p>
                        </div>
                      </div>

                      <div className="mb-5 flex flex-wrap gap-1.5">
                        {program.integrations.slice(0, 3).map((integration) => (
                          <span
                            key={integration}
                            className="border border-[#DDE3EA] bg-white px-2 py-1 text-[0.58rem] font-bold uppercase tracking-[0.1em] text-[#566274]"
                          >
                            {integration}
                          </span>
                        ))}
                      </div>

                      {program.proofLinks.length > 0 && (
                        <Link
                          href={program.proofLinks[0]!}
                          className="mt-auto inline-flex min-h-11 items-center text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#E8A838] transition-colors hover:text-[#C8891C]"
                        >
                          View Case Study →
                        </Link>
                      )}
                    </div>
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
