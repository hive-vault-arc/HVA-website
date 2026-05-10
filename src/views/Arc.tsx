'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BarChart3, Bot, Cloud, Database, RefreshCw, Zap } from 'lucide-react';
import BottomCTA from '../components/BottomCTA';

/* ── Data ────────────────────────────────────────────────────────────────── */

const innovationTracks = [
  {
    code: 'ARC-001',
    icon: <Bot className="w-6 h-6" strokeWidth={1.25} />,
    title: 'AI Agents',
    desc: 'Autonomous logic layers that manage customer and internal workflows without manual intervention.',
  },
  {
    code: 'ARC-002',
    icon: <BarChart3 className="w-6 h-6" strokeWidth={1.25} />,
    title: 'Decision Intel',
    desc: 'Analytics pipelines that convert raw telemetry into executive-ready strategic options.',
  },
  {
    code: 'ARC-003',
    icon: <Database className="w-6 h-6" strokeWidth={1.25} />,
    title: 'Modern CRM',
    desc: 'Replacing legacy siloes with real-time relational systems of customer intent and lifetime value.',
  },
  {
    code: 'ARC-004',
    icon: <Cloud className="w-6 h-6" strokeWidth={1.25} />,
    title: 'Cloud Governance',
    desc: 'Zero-trust deployment frameworks designed for high-compliance global operations.',
  },
];

const differenceContrasts = [
  { others: 'Advisory firms advise.', arc: 'ARC executes — same team, from whiteboard to production.' },
  { others: 'Agencies ship and disappear.', arc: 'ARC stays through evolution — monitoring, extending, improving.' },
  { others: 'Strategy and engineering are separated.', arc: 'ARC keeps them in one accountable loop — no handoff, no drift.' },
  { others: 'Technology is treated as a cost center.', arc: 'ARC treats your systems as compounding operational assets.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

/* ── Blueprint grid shared style ─────────────────────────────────────────── */
const blueprintGrid = {
  backgroundImage: 'linear-gradient(to right,#2563EB 1px,transparent 1px),linear-gradient(to bottom,#2563EB 1px,transparent 1px)',
  backgroundSize: '32px 32px',
};

/* ── Component ────────────────────────────────────────────────────────────── */

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
    <div className="relative isolate overflow-x-clip bg-[var(--surface)] text-[var(--color-tertiary)]">

      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#2563EB] via-[#60a5fa] to-[#0ea5e9]"
        style={{ scaleX: progressScale }}
      />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[88vh] flex items-center pt-28 pb-20 overflow-hidden"
        onMouseMove={onHeroMove}
        onMouseLeave={() => setHeroSpot(null)}
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image
            src="/Images/brand/hva-ai-software-agency-tangier.webp"
            alt=""
            fill
            className="w-full h-full object-cover grayscale opacity-[0.14]"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--surface)] via-[var(--surface)]/90 to-[var(--surface)]/30" />
        </div>

        {/* Cursor spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300"
          style={
            heroSpot
              ? {
                  background: `radial-gradient(circle 240px at ${heroSpot.x}px ${heroSpot.y}px, rgba(37,99,235,0.15) 0%, transparent 100%)`,
                  opacity: 1,
                }
              : { opacity: 0 }
          }
        />

        {/* Scanline */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.022]"
          style={{ background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, #2563EB 3px, #2563EB 4px)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">

          {/* Left — copy */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.28em] text-[#2563EB] bg-[#dbeafe] px-3 py-1 mb-8">
              Operational Excellence
            </span>
            <h1 className="font-headline text-[clamp(3rem,7vw,6rem)] text-[#0F172A] leading-[1.02] tracking-tight mb-8">
              The <span className="text-[#2563EB]">ARC</span> Model:
              <br />
              <em className="italic font-light text-[var(--on-surface-variant)]">Assess.</em>
              <span className="block md:ml-[0.7em]">
                <em className="italic font-light text-[var(--on-surface-variant)]">Re-engineer.</em>
              </span>
              <span className="block md:ml-[2.1em]">Command.</span>
            </h1>
            <p className="text-xl text-[var(--on-surface-variant)] font-light max-w-xl leading-relaxed mb-10">
              H.V.A's delivery model. Strategy and consulting. AI engineering and software. Operations and managed services — in one team, across the full lifecycle. No handoff.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <Link
                href="/contact"
                className="sharp-edge bg-[#0F172A] text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#2563EB] transition-colors duration-300"
              >
                Initiate Discovery
              </Link>
              <Link
                href="/case-studies"
                className="text-sm font-bold uppercase tracking-widest text-[#2563EB] border-b-2 border-[#2563EB]/20 hover:border-[#2563EB] transition-all pb-0.5"
              >
                View Programs →
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── LIFECYCLE OF SCALE — 3 phases in one grid ─────────────────────── */}
      <section className="py-24 bg-[var(--surface-low)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">

          {/* Header */}
          <div className="mb-16">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#2563EB] mb-3">How ARC Works</p>
            <h2 className="font-headline text-5xl text-[#0F172A] leading-tight">The Lifecycle of Scale</h2>
            <div className="w-16 h-[2px] bg-[#2563EB] mt-5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Phase 01 — Assess */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative overflow-hidden mb-6 aspect-[4/3] border border-[var(--outline-variant)] bg-white group">
                <div aria-hidden="true" className="absolute inset-0 opacity-[0.05]" style={blueprintGrid} />
                <div className="absolute inset-0 flex flex-col justify-between p-5">
                  <div className="flex justify-between items-start">
                    <div className="bg-[#dbeafe] px-2 py-1 text-[8px] font-mono text-[#2563EB] border border-[#2563EB]/20 uppercase tracking-wider">
                      ASSESSING_CONSTRAINTS
                    </div>
                    <div className="text-[9px] font-mono text-[#94a3b8]">01011001</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[var(--surface-low)] border border-[#e2e8f0] p-3">
                      <p className="text-[9px] uppercase tracking-wider text-[#94a3b8]">System Audit</p>
                    </div>
                    <div className="bg-[var(--surface-low)] border border-[#e2e8f0] p-3">
                      <p className="text-[9px] uppercase tracking-wider text-[#94a3b8]">Network Mapping</p>
                    </div>
                  </div>
                  <div className="h-[1px] w-full bg-[#2563EB]/20 relative">
                    <div className="absolute top-0 left-0 h-[1px] w-16 bg-[#2563EB] animate-pulse" />
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-[#2563EB] text-white w-9 h-9 flex items-center justify-center font-headline text-sm leading-none z-10">
                  01
                </div>
              </div>
              <h3 className="font-headline text-3xl text-[#0F172A] mb-3">Assess</h3>
              <p className="text-[var(--on-surface-variant)] leading-relaxed text-sm">
                Map operating friction, define target architecture, and sequence the transformation — strategy and technology consulting before a single line of code is written.
              </p>
            </motion.div>

            {/* Phase 02 — Re-engineer (offset) */}
            <motion.div
              className="md:mt-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="relative overflow-hidden mb-6 aspect-[4/3] border border-[var(--outline-variant)] bg-white">
                <div aria-hidden="true" className="absolute inset-0 opacity-[0.05]" style={blueprintGrid} />
                <div className="relative p-5 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <div className="bg-[#dbeafe] px-2 py-1 text-[8px] font-mono text-[#2563EB] border border-[#2563EB]/20 uppercase tracking-wider">
                      BUILDING_ARCHITECTURE
                    </div>
                    <div className="text-[9px] font-mono text-[#94a3b8]">11001010</div>
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { id: 'LAYER_01', name: 'Core Systems', status: 'COMPILED', pulse: false, color: 'bg-[#2563EB]' },
                      { id: 'LAYER_02', name: 'Workflow Modules', status: 'LINKED', pulse: true, color: 'bg-[#60a5fa]' },
                      { id: 'LAYER_03', name: 'Prod. Pressure', status: 'TESTING', pulse: false, color: 'bg-[#dbeafe]' },
                    ].map((layer) => (
                      <div key={layer.id} className="bg-[var(--surface-low)] border border-[#e2e8f0] px-3 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${layer.color} ${layer.pulse ? 'animate-pulse' : ''}`} />
                          <span className="text-[8px] font-mono text-[#94a3b8]">{layer.id}</span>
                          <span className="font-headline text-xs text-[#0F172A]">{layer.name}</span>
                        </div>
                        <span className="text-[7px] font-mono text-[#2563EB] tracking-wider">{layer.status}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-[1px] flex-1 bg-[#2563EB]/20 relative">
                      <div className="absolute top-0 left-0 h-[1px] w-12 bg-[#2563EB] animate-pulse" />
                    </div>
                    <span className="text-[7px] font-mono text-[#2563EB] tracking-wider">BUILD_IN_PROGRESS</span>
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-[#2563EB] text-white w-9 h-9 flex items-center justify-center font-headline text-sm leading-none z-10">
                  02
                </div>
              </div>
              <h3 className="font-headline text-3xl text-[#0F172A] mb-3">Re-engineer</h3>
              <p className="text-[var(--on-surface-variant)] leading-relaxed text-sm">
                Build the systems, deploy the intelligence, wire the infrastructure — AI engineering, custom software, and cloud delivered under real production pressure.
              </p>
            </motion.div>

            {/* Phase 03 — Command */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative overflow-hidden mb-6 aspect-[4/3] border border-[var(--outline-variant)] bg-white">
                <div aria-hidden="true" className="absolute inset-0 opacity-[0.04]"
                  style={{ backgroundImage: 'linear-gradient(to right,#2563EB 1px,transparent 1px),linear-gradient(to bottom,#2563EB 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
                <div className="relative h-full flex flex-col justify-between p-5">
                  <div className="flex justify-between items-start">
                    <div className="text-[9px] font-mono text-[#94a3b8] uppercase tracking-widest">SYSTEM_EVOLUTION</div>
                    <div className="text-[9px] font-mono text-[#2563EB]">ARC/RUN</div>
                  </div>
                  <div className="flex items-center justify-center flex-1">
                    <div className="relative">
                      <div className="w-24 h-24 border border-[#2563EB]/20 flex items-center justify-center">
                        <div className="w-16 h-16 border border-[#2563EB]/40 flex items-center justify-center">
                          <div className="w-8 h-8 bg-[#2563EB]/10 border border-[#2563EB] flex items-center justify-center">
                            <RefreshCw className="w-3.5 h-3.5 text-[#2563EB]" strokeWidth={1.5} />
                          </div>
                        </div>
                      </div>
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#2563EB] rounded-full animate-pulse" />
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#2563EB]/30 rounded-full" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-[var(--surface-low)] px-3 py-2 border-l-2 border-[#2563EB]">
                      <p className="text-[8px] font-mono text-[#2563EB] uppercase tracking-wider">System Integrity: 99.99%</p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-[#2563EB] text-white w-9 h-9 flex items-center justify-center font-headline text-sm leading-none z-10">
                  03
                </div>
              </div>
              <h3 className="font-headline text-3xl text-[#0F172A] mb-3">Command</h3>
              <p className="text-[var(--on-surface-variant)] leading-relaxed text-sm mb-5">
                Stabilize, monitor, and evolve — managing operations, AI systems, and applications long-term. Same team. No handoff.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Zap className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#0F172A]">Optimization Engine</p>
                    <p className="text-[10px] text-[#94a3b8] mt-0.5">Continuous performance tuning for high-traffic environments.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <RefreshCw className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#0F172A]">Dynamic Extension</p>
                    <p className="text-[10px] text-[#94a3b8] mt-0.5">Agile system upgrades that prevent technical debt buildup.</p>
                  </div>
                </li>
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── ARC DIFFERENCE — dark contrast section ────────────────────────── */}
      <section className="bg-[#0F172A] py-24 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg,#60a5fa 0,#60a5fa 1px,transparent 0,transparent 50%),repeating-linear-gradient(90deg,#60a5fa 0,#60a5fa 1px,transparent 0,transparent 50%)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-[#2563EB]/20 blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 lg:px-14 relative z-10 grid grid-cols-12 gap-8 items-start">

          <motion.div
            className="col-span-12 lg:col-span-5"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#2563EB] mb-6">Why ARC Is Different</p>
            <h2 className="font-headline text-5xl md:text-6xl text-white leading-tight mb-8">
              One firm.<br />
              Strategy.<br />
              Engineering.<br />
              <em className="italic text-[#2563EB]">Operations.</em>
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-8">
              Most transformation programs fail at the handoff. Advisory firms leave after the deck. Agencies ship and disappear. H.V.A eliminates that gap entirely — same team, strategy through production, no drift.
            </p>
            <div className="h-px w-12 bg-[#2563EB]" />
          </motion.div>

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

      {/* ── PHILOSOPHY STRIP — asymmetric ─────────────────────────────────── */}
      <section className="overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <motion.div
            className="flex flex-col md:flex-row items-stretch"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Text card */}
            <div className="w-full md:w-3/5 bg-[var(--surface-highest)] p-12 md:p-20 z-10 relative">
              <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#2563EB] mb-8">ARC Framework Principle</p>
              <blockquote className="font-headline text-3xl md:text-4xl text-[#0F172A] leading-tight mb-8 italic">
                "ARC isn't just a framework — it's the operating system for organizations that refuse to outsource accountability."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-8 h-[2px] bg-[#2563EB]" />
                <p className="text-sm font-bold text-[var(--on-surface-variant)] uppercase tracking-widest">H.V.A — Founding Mandate</p>
              </div>
            </div>
            {/* Image */}
            <div className="w-full md:w-2/5 md:-ml-8 h-64 md:h-auto min-h-[300px]">
              <Image
                src="/Images/brand/hva-ai-software-agency-tangier.webp"
                alt="H.V.A engineering operations — Tangier"
                fill
                className="w-full h-full object-cover grayscale"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── LABORATORY ACTIVE — R&D dark section ──────────────────────────── */}
      <section className="py-24 bg-[#131b2e] relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg,#7c839b 0,#7c839b 1px,transparent 0,transparent 48px),repeating-linear-gradient(90deg,#7c839b 0,#7c839b 1px,transparent 0,transparent 48px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#2563EB]/8 blur-[140px]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-14 grid grid-cols-12 gap-8 items-start relative z-10">

          {/* Left — sticky */}
          <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-28">
            <p className="font-label text-[#497cff] uppercase tracking-[0.4em] text-[10px] mb-4">
              Laboratory_Active
            </p>
            <h2 className="font-headline text-4xl md:text-5xl text-white mb-6 leading-tight">
              Active Research &amp; Development
            </h2>
            <p className="text-[#7c839b] text-sm leading-relaxed mb-8">
              Our lab monitors emerging technologies to integrate them into ARC before they become industry commodities.
            </p>
            <div className="p-6 border border-[#497cff]/20 bg-[#497cff]/5">
              <p className="font-mono text-[#497cff] text-3xl leading-none mb-4" aria-hidden="true">&ldquo;</p>
              <p className="text-sm text-[#bec6e0] italic leading-relaxed">
                &ldquo;The framework isn&rsquo;t just a process — it&rsquo;s a living intelligence that responds to market entropy and compounds with every engagement.&rdquo;
              </p>
            </div>
          </div>

          {/* Right — 2×2 grid */}
          <motion.div
            className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-[#7c839b]/20"
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
                className="p-8 bg-[#131b2e] hover:bg-[#1a2540] transition-colors group"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-full bg-[#497cff]/10 flex items-center justify-center text-[#497cff] group-hover:bg-[#497cff] group-hover:text-[#131b2e] transition-all duration-300">
                    {track.icon}
                  </div>
                  <span className="text-[9px] font-mono text-[#7c839b]">{track.code}</span>
                </div>
                <h4 className="font-headline text-2xl text-white mb-3 group-hover:text-[#497cff] transition-colors">
                  {track.title}
                </h4>
                <p className="text-sm text-[#7c839b] leading-relaxed">{track.desc}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* Links */}
        <div className="max-w-7xl mx-auto px-6 lg:px-14 mt-14 flex flex-wrap gap-4 relative z-10">
          <Link
            href="/insights"
            className="sharp-edge inline-flex items-center gap-2 bg-[#2563EB] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#1d4ed8] transition-colors"
          >
            Explore ARC Insights
          </Link>
          <Link
            href="/capabilities"
            className="sharp-edge inline-flex items-center gap-2 border border-[#7c839b]/30 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-[#7c839b] hover:bg-white/5 transition-colors"
          >
            Explore Capabilities
          </Link>
        </div>
      </section>

      {/* ── CTA SECTION ────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[var(--surface)] text-center px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563EB] mb-5">Ready to begin?</p>
            <h2 className="font-headline text-5xl md:text-6xl text-[#0F172A] mb-6 leading-tight">
              Ready to implement<br />the ARC Protocol?
            </h2>
            <p className="text-xl text-[var(--on-surface-variant)] mb-12 max-w-xl mx-auto leading-relaxed font-light">
              Connect with our advisory board to evaluate your current trajectory and design a transformation roadmap.
            </p>
            <div className="inline-flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="sharp-edge bg-[#0F172A] text-white px-10 py-5 font-bold text-sm uppercase tracking-widest hover:bg-[#2563EB] transition-colors duration-300"
              >
                Initiate Framework Protocol
              </Link>
              <Link
                href="/case-studies"
                className="sharp-edge border border-[var(--outline-variant)] px-10 py-5 font-bold text-sm uppercase tracking-widest text-[#475569] hover:bg-[var(--surface-low)] transition-colors"
              >
                Request Case Study
              </Link>
            </div>
          </motion.div>
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
