'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BarChart3, Bot, Cloud, Database, FlaskConical, Layers, RefreshCw, Target, Zap } from 'lucide-react';
import PageAmbientBackground from '../components/PageAmbientBackground';
import BottomCTA from '../components/BottomCTA';

const pillars = [
  {
    icon: <Target className="h-6 w-6" strokeWidth={1.5} />,
    label: 'Category Thesis',
    text: 'Transformation fails when advisory and engineering are separated. ARC keeps strategy and execution in one accountable loop — from whiteboard to production.',
  },
  {
    icon: <Layers className="h-6 w-6" strokeWidth={1.5} />,
    label: 'Operating Model',
    text: 'Programs are delivered through sequenced governance: diagnosis, architecture, delivery, validation, and managed evolution. Every phase has a clear owner.',
  },
  {
    icon: <FlaskConical className="h-6 w-6" strokeWidth={1.5} />,
    label: 'Innovation Lab',
    text: 'ARC tracks emerging patterns across AI, automation, and systems design — then tests practical methods that can be shipped directly into client operations.',
  },
];

const innovationTracks = [
  {
    code: 'ARC-001',
    icon: <Bot className="w-8 h-8" strokeWidth={1.25} />,
    title: 'AI agents for customer and internal operations',
    desc: 'Autonomous agents designed for high-precision task execution and complex problem resolution across multi-tenant environments.',
  },
  {
    code: 'ARC-002',
    icon: <BarChart3 className="w-8 h-8" strokeWidth={1.25} />,
    title: 'Decision intelligence and KPI reliability',
    desc: 'Advanced analytics engines that go beyond reporting to provide actionable, high-fidelity business intelligence.',
  },
  {
    code: 'ARC-003',
    icon: <Database className="w-8 h-8" strokeWidth={1.25} />,
    title: 'CRM and workflow orchestration modernization',
    desc: 'Re-engineering legacy workflows into modern, responsive architectures that reduce manual friction.',
  },
  {
    code: 'ARC-004',
    icon: <Cloud className="w-8 h-8" strokeWidth={1.25} />,
    title: 'Cloud reliability and release governance',
    desc: 'Implementing military-grade deployment protocols and fail-safe cloud infrastructure for zero-downtime evolution.',
  },
];

const differenceContrasts = [
  {
    others: 'Advisory firms advise.',
    arc: 'ARC executes — same team, from whiteboard to production.',
  },
  {
    others: 'Agencies ship and disappear.',
    arc: 'ARC stays through evolution — monitoring, extending, improving.',
  },
  {
    others: 'Strategy and engineering are separated.',
    arc: 'ARC keeps them in one accountable loop — no handoff, no drift.',
  },
  {
    others: 'Technology is treated as a cost center.',
    arc: 'ARC treats your systems as compounding operational assets.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Arc() {
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const heroRef = useRef<HTMLElement>(null);
  const [heroSpot, setHeroSpot] = useState<{ x: number; y: number } | null>(null);
  const onHeroMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    setHeroSpot({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div className="relative isolate overflow-x-clip bg-[#F8FAFC] text-[#0F172A]">
      {/* Scroll progress */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#2563EB] via-[#60a5fa] to-[#0ea5e9]"
        style={{ scaleX: progressScale }}
      />

      <PageAmbientBackground className="-z-10" />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative pt-24 pb-32 overflow-hidden"
        onMouseMove={onHeroMove}
        onMouseLeave={() => setHeroSpot(null)}
      >
        {/* Cursor spotlight — blue radial glow on white */}
        <div
          aria-hidden="true"
          className="arc-hero-spotlight"
          style={
            heroSpot
              ? {
                  background: `radial-gradient(circle 200px at ${heroSpot.x}px ${heroSpot.y}px, rgba(37,99,235,0.28) 0%, rgba(37,99,235,0.10) 55%, transparent 100%)`,
                  opacity: 1,
                }
              : { opacity: 0 }
          }
        />
        {/* Scanline texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, #2563EB 3px, #2563EB 4px)',
          }}
        />
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-20 -right-20 w-96 h-96 bg-[#2563EB]/8 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-14 grid grid-cols-12 gap-4">
          <motion.div
            className="col-span-12 lg:col-span-9 z-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">
              ARC — The H.V.A Framework
            </p>
            <h1 className="font-headline text-6xl md:text-8xl text-[#0F172A] leading-tight">
              The <span className="text-[#2563EB]">ARC</span> Framework:<br />
              <em className="italic font-light text-[#475569]">Category Thinking</em><br />
              <span className="inline-block translate-x-12 md:translate-x-32">+ Field Execution.</span>
            </h1>
          </motion.div>
          <motion.div
            className="col-span-12 lg:col-span-3 flex items-center justify-end"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            <div className="relative w-full max-w-[280px]">
              {/* Soft ambient glow */}
              <div className="absolute inset-0 rounded-3xl bg-[#2563EB]/20 blur-3xl scale-110" />

              {/* Image */}
              <img
                src="/Images/brand/Hva-pulse.png"
                alt="H.V.A Pulse"
                className="relative w-full rounded-3xl shadow-xl shadow-[#2563EB]/10"
              />

              {/* Frosted glass info card — floats over bottom of image */}
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/60 bg-white/75 p-4 shadow-sm backdrop-blur-md">
                <p className="mb-2 text-[8px] font-label uppercase tracking-[0.28em] text-[#2563EB]">
                  Status: Active_Framework
                </p>
                <p className="text-[11px] leading-relaxed text-[#475569]">
                  Strategic clarity, production-grade engineering, and operational iteration — in one accountable loop.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3 Pillars — editorial band layout ───────────────────────────── */}
      <section className="bg-white">
        {pillars.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative border-b border-[#e2e8f0] last:border-b-0"
          >
            {/* Hover blue left accent bar */}
            <div
              className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-[#2563EB] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
              aria-hidden="true"
            />

            <div className="mx-auto max-w-7xl px-6 lg:px-14 grid grid-cols-12 items-center gap-6 py-14">
              {/* Decorative number */}
              <div className="col-span-2 hidden lg:block">
                <span
                  className="font-headline text-[7rem] leading-none select-none text-[#f0f2f5] group-hover:text-[#dbeafe] transition-colors duration-500"
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>
              </div>

              {/* Label + icon */}
              <div className="col-span-12 lg:col-span-3 flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#dbeafe] text-[#2563EB]">
                  {p.icon}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#2563EB]">
                  {p.label}
                </p>
              </div>

              {/* Body text — large editorial style */}
              <div className="col-span-12 lg:col-span-7">
                <p className="font-headline text-xl md:text-2xl text-[#0F172A] leading-snug italic">
                  {p.text}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ── Phase 01: Diagnose ────────────────────────────────────────────── */}
      <section className="relative py-32 bg-[#F2F4F6]/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Visual HUD panel */}
          <motion.div
            className="relative order-2 md:order-1"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute -inset-4 bg-[#2563EB]/4 blur-xl" />
            <div className="relative aspect-video border border-[#e2e8f0] bg-[#F2F4F6] overflow-hidden">
              {/* Blueprint grid */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: 'linear-gradient(to right,#2563EB 1px,transparent 1px),linear-gradient(to bottom,#2563EB 1px,transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <div className="flex justify-between items-start">
                  <div className="bg-[#dbeafe] px-2 py-1 text-[8px] font-mono text-[#2563EB] uppercase border border-[#2563EB]/20">
                    SCANNING_BOTTLENECKS
                  </div>
                  <div className="text-[10px] font-mono text-[#94a3b8]">01011001 01011010</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white border border-[#e2e8f0] p-4">
                    <p className="text-[10px] uppercase tracking-wider text-[#94a3b8]">System Audit</p>
                  </div>
                  <div className="bg-white border border-[#e2e8f0] p-4">
                    <p className="text-[10px] uppercase tracking-wider text-[#94a3b8]">Network Mapping</p>
                  </div>
                </div>
                <div className="h-[1px] w-full bg-[#2563EB]/20 relative">
                  <div className="absolute top-0 left-0 h-[1px] w-24 bg-[#2563EB] animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            className="order-1 md:order-2"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="font-headline text-5xl text-[#2563EB]">01</span>
              <div className="h-[1px] flex-grow bg-[#2563EB]/30" />
            </div>
            <h2 className="font-headline text-4xl text-[#0F172A] mb-6">Diagnose</h2>
            <p className="text-[#475569] text-base leading-relaxed uppercase tracking-widest text-sm">
              Map operating friction, decision bottlenecks, and technology constraints with leadership and functional teams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Phase 02: Engineer ────────────────────────────────────────────── */}
      <section className="relative py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="font-headline text-5xl text-[#2563EB]">02</span>
              <div className="h-[1px] flex-grow bg-[#2563EB]/30" />
            </div>
            <h2 className="font-headline text-4xl text-[#0F172A] mb-6">Engineer</h2>
            <p className="text-[#475569] text-base leading-relaxed mb-10">
              Translate strategy into architecture, workflows, and software modules that can run under real production pressure.
            </p>
            {/* 3 layer labels */}
            <div className="space-y-0 border-l border-[#e2e8f0]">
              {[
                { label: 'Core Systems', desc: 'Bedrock infrastructure with unbreakable logic.' },
                { label: 'Workflow Modules', desc: 'Modular orchestration that scales with complexity.' },
                { label: 'Production Pressure', desc: 'Stress-tested for stability at peak velocity.' },
              ].map((item, i) => (
                <div key={item.label} className="pl-6 py-4 border-b border-[#e2e8f0] last:border-b-0 group hover:border-l-[#2563EB] transition-colors">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[9px] font-mono text-[#2563EB]">LAYER_{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h4 className="font-headline text-lg text-[#0F172A] group-hover:text-[#2563EB] transition-colors">{item.label}</h4>
                  <p className="text-xs text-[#94a3b8] mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Architecture stack visual panel */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-[#2563EB]/8 blur-[80px] opacity-40" />
            <div className="relative border border-[#e2e8f0] bg-[#F2F4F6] overflow-hidden">
              {/* Blueprint grid */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: 'linear-gradient(to right,#2563EB 1px,transparent 1px),linear-gradient(to bottom,#2563EB 1px,transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              <div className="relative p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                  <div className="bg-[#dbeafe] px-2 py-1 text-[8px] font-mono text-[#2563EB] uppercase border border-[#2563EB]/20">
                    BUILDING_ARCHITECTURE
                  </div>
                  <div className="text-[10px] font-mono text-[#94a3b8]">11001010 10110011</div>
                </div>

                {/* Stacked architecture layers */}
                <div className="space-y-0">
                  {[
                    { id: 'LAYER_01', name: 'Core Systems', status: 'COMPILED', color: 'bg-[#2563EB]' },
                    { id: 'LAYER_02', name: 'Workflow Modules', status: 'LINKED', color: 'bg-[#60a5fa]' },
                    { id: 'LAYER_03', name: 'Production Pressure', status: 'TESTING', color: 'bg-[#dbeafe]' },
                  ].map((layer, i) => (
                    <div key={layer.id}>
                      <div className="bg-white border border-[#e2e8f0] px-5 py-4 flex items-center justify-between group hover:border-[#2563EB]/40 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full ${layer.color} ${i === 1 ? 'animate-pulse' : ''}`} />
                          <span className="text-[9px] font-mono text-[#94a3b8]">{layer.id}</span>
                          <span className="font-headline text-sm text-[#0F172A]">{layer.name}</span>
                        </div>
                        <span className="text-[8px] font-mono text-[#2563EB] tracking-widest">{layer.status}</span>
                      </div>
                      {/* Connector */}
                      {i < 2 && (
                        <div className="flex justify-center h-6 items-center">
                          <div className="w-[1px] h-full bg-[#2563EB]/30 relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[#2563EB] rounded-full" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Bottom status */}
                <div className="mt-8 flex justify-between items-center">
                  <div className="h-[1px] flex-1 bg-[#2563EB]/20 relative">
                    <div className="absolute top-0 left-0 h-[1px] w-16 bg-[#2563EB] animate-pulse" />
                  </div>
                  <span className="ml-4 text-[9px] font-mono text-[#2563EB]">BUILD_IN_PROGRESS</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Phase 03: Run and Evolve ──────────────────────────────────────── */}
      <section className="relative py-32 bg-[#F8FAFC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="font-headline text-5xl text-[#2563EB]">03</span>
              <div className="h-[1px] flex-grow bg-[#2563EB]/30" />
            </div>
            <h2 className="font-headline text-4xl text-[#0F172A] mb-6">Run and Evolve</h2>
            <p className="text-[#475569] text-base leading-relaxed mb-10">
              Stabilize, monitor, optimize, and extend systems as your business model and scale requirements change.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <Zap className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <h4 className="text-[#0F172A] text-sm uppercase tracking-widest font-bold">Optimization Engine</h4>
                  <p className="text-xs text-[#94a3b8] mt-1">Continuous performance tuning for high-traffic environments.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <RefreshCw className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <h4 className="text-[#0F172A] text-sm uppercase tracking-widest font-bold">Dynamic Extension</h4>
                  <p className="text-xs text-[#94a3b8] mt-1">Agile system upgrades that prevent technical debt buildup.</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Rotating visual panel */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-[#2563EB]/15 blur-[100px] opacity-30" />
            <div className="relative p-2 bg-[#F2F4F6] border border-[#e2e8f0] overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-700 shadow-lg">
              {/* Blueprint grid */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: 'linear-gradient(to right,#2563EB 1px,transparent 1px),linear-gradient(to bottom,#2563EB 1px,transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />
              <div className="relative h-[500px] flex flex-col justify-between p-8">
                {/* Top decorative elements */}
                <div className="flex justify-between items-start">
                  <div className="text-[10px] font-mono text-[#94a3b8] uppercase tracking-widest">
                    SYSTEM_EVOLUTION
                  </div>
                  <div className="text-[10px] font-mono text-[#2563EB]">ARC/RUN</div>
                </div>

                {/* Center visualization */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 border border-[#2563EB]/20 flex items-center justify-center">
                      <div className="w-20 h-20 border border-[#2563EB]/40 flex items-center justify-center">
                        <div className="w-10 h-10 bg-[#2563EB]/10 border border-[#2563EB] flex items-center justify-center">
                          <RefreshCw className="w-4 h-4 text-[#2563EB]" strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>
                    {/* Orbit indicators */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#2563EB] rounded-full animate-pulse" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#2563EB]/40 rounded-full" />
                  </div>
                </div>

                {/* Status badge */}
                <div className="absolute top-10 right-10">
                  <div className="bg-[#F2F4F6]/80 p-3 border-l-2 border-[#2563EB]">
                    <p className="text-[10px] font-mono text-[#2563EB] uppercase">System Integrity: 99.99%</p>
                  </div>
                </div>

                {/* Bottom scan line */}
                <div className="h-[1px] w-full bg-[#2563EB]/20 relative">
                  <div className="absolute top-0 left-0 h-[1px] w-32 bg-[#2563EB] animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── The ARC Difference ────────────────────────────────────────────── */}
      <section className="bg-[#0F172A] py-32 relative overflow-hidden">
        {/* Blueprint grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg,#60a5fa 0,#60a5fa 1px,transparent 0,transparent 50%),repeating-linear-gradient(90deg,#60a5fa 0,#60a5fa 1px,transparent 0,transparent 50%)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-[#2563EB]/20 blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 lg:px-14 relative z-10 grid grid-cols-12 gap-8 items-start">
          {/* Left — manifesto */}
          <motion.div
            className="col-span-12 lg:col-span-5"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#2563EB] mb-6">
              Why ARC Is Different
            </p>
            <h2 className="font-headline text-5xl md:text-6xl text-white leading-tight mb-8">
              One firm.<br />
              Strategy.<br />
              Engineering.<br />
              <em className="italic text-[#2563EB]">Operations.</em>
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-8">
              Most transformation programs fail at the handoff. Advisory firms leave after the deck. Engineering agencies ship and disappear. ARC was built to eliminate that gap — permanently.
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
            {differenceContrasts.map((item, i) => (
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

      {/* ── Innovation Tracks ─────────────────────────────────────────────── */}
      <section className="bg-[#F2F4F6] py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 grid grid-cols-12 gap-8 items-start">
          {/* Left — sticky panel. No motion transform here — transforms break position:sticky */}
          <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-32">
            <p className="font-label text-[#2563EB] uppercase tracking-[0.4em] text-xs mb-4">
              Laboratory_Active
            </p>
            <h2 className="font-headline text-5xl text-[#0F172A] mb-8">
              Active Research &amp; Development
            </h2>
            <div className="p-6 border border-[#2563EB]/20 bg-[#2563EB]/5">
              <p className="text-sm text-[#475569] italic leading-relaxed">
                &ldquo;The framework isn&rsquo;t just a process — it&rsquo;s a living intelligence that responds to market entropy and compounds with every engagement.&rdquo;
              </p>
            </div>
          </div>

          {/* Right — 2×2 grid */}
          <motion.div
            className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-[#e2e8f0] border border-[#e2e8f0]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {innovationTracks.map((track) => (
              <motion.div
                key={track.code}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="p-10 bg-[#F2F4F6] hover:bg-white transition-colors group"
              >
                <div className="flex items-center justify-between mb-12">
                  <span className="text-[#2563EB]">{track.icon}</span>
                  <span className="text-[10px] font-mono text-[#94a3b8]">{track.code}</span>
                </div>
                <h4 className="font-headline text-xl text-[#0F172A] mb-4 group-hover:text-[#2563EB] transition-colors">
                  {track.title}
                </h4>
                <p className="text-sm text-[#94a3b8] leading-relaxed">{track.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Links */}
        <div className="max-w-7xl mx-auto px-6 lg:px-14 mt-14 flex flex-wrap gap-6">
          <Link
            href="/insights"
            className="sharp-edge inline-flex items-center gap-2 bg-[#2563EB] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#1d4ed8] transition-colors duration-200"
          >
            Explore ARC Insights
          </Link>
          <Link
            href="/capabilities"
            className="sharp-edge inline-flex items-center gap-2 border border-[#0F172A]/20 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-[#475569] hover:bg-[#0F172A]/5 transition-colors duration-200"
          >
            Explore Capabilities
          </Link>
        </div>
      </section>

      <BottomCTA
        variant="dark"
        headline="Want ARC Applied to Your Operations?"
        subtext="Share your constraints and goals. We will map where ARC can create the fastest operational gain."
        primaryLabel="Book a Discovery Call"
        primaryHref="/contact"
        secondaryLabel="See Case Studies"
        secondaryHref="/case-studies"
      />
    </div>
  );
}


