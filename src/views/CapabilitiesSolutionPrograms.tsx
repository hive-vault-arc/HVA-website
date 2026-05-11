'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Bot, Database, Cloud, Zap } from 'lucide-react';
import BottomCTA from '../components/BottomCTA';
import PageAmbientBackground from '../components/PageAmbientBackground';
import { CAPABILITY_SOLUTION_PROGRAM_DETAILS } from '../lib/capabilities-content';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const p1 = CAPABILITY_SOLUTION_PROGRAM_DETAILS[0];
const p2 = CAPABILITY_SOLUTION_PROGRAM_DETAILS[1];
const p3 = CAPABILITY_SOLUTION_PROGRAM_DETAILS[2];

const blueprintGrid = {
  backgroundImage:
    'linear-gradient(to right,#2563EB 1px,transparent 1px),linear-gradient(to bottom,#2563EB 1px,transparent 1px)',
  backgroundSize: '28px 28px',
};

export default function CapabilitiesSolutionPrograms() {
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const heroRef = useRef<HTMLDivElement>(null);
  const [heroSpot, setHeroSpot] = useState<{ x: number; y: number } | null>(null);
  const onHeroMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    setHeroSpot({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div className="relative isolate overflow-x-hidden bg-[#f7f9fb] text-[#191c1e]">

      {/* Scroll progress */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#2563EB] via-[#60a5fa] to-[#0ea5e9]"
        style={{ scaleX: progressScale }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[78vh] flex items-center pt-28 pb-20 px-6 md:px-12 overflow-hidden">
        {/* Mouse-tracking overlay — decorative spotlight only */}
        <div
          ref={heroRef}
          className="absolute inset-0 z-[1]"
          onMouseMove={onHeroMove}
          onMouseLeave={() => setHeroSpot(null)}
          aria-hidden="true"
        />
        {/* Plasma */}
        <PageAmbientBackground className="-z-10" />

        {/* Background image */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image
            src="/Images/hero/strategic-technology-consulting-tangier-morocco.webp"
            alt=""
            fill
            className="object-cover grayscale opacity-[0.10]"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7f9fb] via-[#f7f9fb]/92 to-[#f7f9fb]/40" />
        </div>

        {/* Cursor spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300"
          style={
            heroSpot
              ? { background: `radial-gradient(circle 260px at ${heroSpot.x}px ${heroSpot.y}px, rgba(37,99,235,0.12) 0%, transparent 100%)`, opacity: 1 }
              : { opacity: 0 }
          }
        />

        {/* Scanline */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.018]"
          style={{ background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, #2563EB 3px, #2563EB 4px)' }}
        />

        <div className="relative z-10 max-w-screen-2xl mx-auto w-full">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.09 } } }}
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="md:col-span-8">
              <span className="inline-block text-[10px] font-bold tracking-[0.24em] uppercase mb-8 text-[#2563EB] bg-[#dbeafe] px-3 py-1">
                Capabilities / Solution Programs
              </span>
              <h1 className="font-headline font-light text-[clamp(3rem,7vw,6.5rem)] leading-[1.03] tracking-tight text-[#0F172A]">
                Solution Programs:
                <br />
                <em className="italic text-[#45464d] font-light">Consulting-Led Systems</em>
                <br />
                at Full Depth.
              </h1>
              <p className="mt-7 text-[1.1rem] text-[#45464d] leading-relaxed max-w-xl">
                Three pre-scoped programs — strategy, build, and managed operations delivered by one team in one accountable engagement.
              </p>
              <div className="flex flex-wrap items-center gap-5 mt-9">
                <Link href="/contact" className="sharp-edge btn-primary">
                  Start a Program
                </Link>
                <Link
                  href="/capabilities/in-detail"
                  className="text-sm font-bold uppercase tracking-widest text-[#2563EB] border-b-2 border-[#2563EB]/20 hover:border-[#2563EB] transition-all pb-0.5"
                >
                  Explore In Detail →
                </Link>
              </div>
            </motion.div>

            {/* Right — 3-program index card */}
            <motion.aside
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="md:col-span-4 md:self-end"
            >
              <div className="relative overflow-hidden bg-[#0F172A] p-6">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.05]" style={blueprintGrid} />
                <p className="relative text-[9px] font-mono uppercase tracking-[0.3em] text-[#60a5fa] mb-4">
                  Program Index
                </p>
                <nav className="relative">
                  {[
                    { num: '01', label: 'AI Reception & Lead Ops', anchor: '#program-01' },
                    { num: '02', label: 'Enterprise CRM Modernization', anchor: '#program-02' },
                    { num: '03', label: 'Cloud Delivery Reliability', anchor: '#program-03' },
                  ].map((item) => (
                    <a
                      key={item.anchor}
                      href={item.anchor}
                      className="flex items-center justify-between border-b border-white/[0.08] py-3 last:border-0 group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-[#2563EB]/60 group-hover:text-[#2563EB] transition-colors">{item.num}</span>
                        <span className="text-sm font-medium text-white/65 group-hover:text-white transition-colors duration-200">{item.label}</span>
                      </div>
                      <ArrowRight className="w-3 h-3 text-[#60a5fa]/40 group-hover:text-[#60a5fa] group-hover:translate-x-0.5 transition-all" />
                    </a>
                  ))}
                </nav>
                <div className="relative mt-4 border-t border-white/10 pt-4">
                  <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/25">
                    All programs → ARC delivery model
                  </p>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        </div>
      </section>

      {/* ── PROGRAM OVERVIEW STRIP ───────────────────────────────────────── */}
      <div className="border-y border-[#e2e8f0] bg-white">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e2e8f0]">
            {[
              { icon: <Bot className="w-5 h-5" strokeWidth={1.3} />, num: '01', label: p1?.name ?? 'AI Reception & Lead Operations', tag: p1?.category ?? 'AI Program', anchor: '#program-01' },
              { icon: <Database className="w-5 h-5" strokeWidth={1.3} />, num: '02', label: p2?.name ?? 'Enterprise CRM Modernization', tag: p2?.category ?? 'CRM Program', anchor: '#program-02' },
              { icon: <Cloud className="w-5 h-5" strokeWidth={1.3} />, num: '03', label: p3?.name ?? 'Cloud Delivery Reliability Stack', tag: p3?.category ?? 'Cloud Program', anchor: '#program-03' },
            ].map((item) => (
              <a
                key={item.num}
                href={item.anchor}
                className="group flex items-start gap-4 px-8 py-6 hover:bg-[#f7f9fb] transition-colors duration-300"
              >
                <span className="mt-0.5 text-[#2563EB] shrink-0 group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#94a3b8] mb-1">{item.tag}</p>
                  <p className="font-headline text-base text-[#0F172A] leading-snug group-hover:text-[#2563EB] transition-colors duration-300">
                    {item.label}
                  </p>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#c6c6cd] group-hover:text-[#2563EB] ml-auto shrink-0 mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROGRAM 01 — AI Reception & Lead Operations ───────────────────── */}
      <section id="program-01" className="scroll-mt-28 bg-[#f2f4f6] py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — content */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            >
              <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="flex items-center gap-4 mb-8">
                <span className="w-10 h-px bg-[#0F172A]" />
                <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#0F172A]">Program 01</span>
              </motion.div>
              <motion.h2 variants={fadeUp} transition={{ duration: 0.5 }} className="font-headline text-4xl md:text-5xl text-[#0F172A] mb-6 leading-tight">
                {p1?.name}
              </motion.h2>
              <motion.p variants={fadeUp} transition={{ duration: 0.5 }} className="text-[#45464d] text-base leading-relaxed mb-10 max-w-lg">
                {p1?.summary}
              </motion.p>

              <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="grid grid-cols-2 gap-8 mb-10">
                <div>
                  <h4 className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#45464d] mb-4">Core Modules</h4>
                  <ul className="space-y-2">
                    {p1?.modules.map((mod) => (
                      <li key={mod} className="flex items-start gap-2 text-sm text-[#0F172A] font-medium">
                        <span className="mt-[6px] h-1 w-1 shrink-0 bg-[#2563EB] rounded-full" />
                        {mod}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#45464d] mb-4">Primary Stack</h4>
                  <p className="text-sm text-[#0F172A] font-medium leading-relaxed">{p1?.integrations.join(', ')}</p>
                  <div className="mt-5 pt-5 border-t border-[#c6c6cd]/40">
                    <h4 className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#45464d] mb-2">Delivery</h4>
                    <p className="text-xs text-[#45464d] leading-relaxed">{p1?.deliveryModel}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
                {p1?.proofLinks[0] && (
                  <Link href={p1.proofLinks[0]} className="group inline-flex items-center gap-3 font-bold text-[#0F172A] hover:text-[#2563EB] transition-colors text-sm uppercase tracking-[0.12em]">
                    View Case Study
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                )}
              </motion.div>
            </motion.div>

            {/* Right — image + blueprint data overlay */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative aspect-[4/5] overflow-hidden group bg-[#e0e3e5]">
                <Image
                  src="/Images/solution-programs/hva-ai-reception-lead-operations.png"
                  alt="AI reception and lead operations — H.V.A Morocco"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover grayscale blur-[2px] group-hover:grayscale-0 group-hover:blur-0 transition-all duration-700"
                />
                {/* Scanline overlay on image */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none opacity-[0.03]"
                  style={{ background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, #000 2px, #000 3px)' }}
                />
              </div>

              {/* Expert quote card */}
              <div className="absolute -bottom-8 -left-8 bg-white p-9 shadow-[0_10px_40px_rgba(25,28,30,0.12)] max-w-[320px] hidden xl:block">
                <p className="font-headline text-xl italic text-[#0F172A] leading-snug mb-5">
                  &ldquo;Answers faster than our sales desk — and updates the CRM automatically.&rdquo;
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#45464d]">
                  — Nadia El Idrissi, Head of Growth
                </p>
              </div>

              {/* Live status badge */}
              <div className="absolute top-5 right-5 bg-[#0F172A]/80 backdrop-blur-sm px-4 py-2.5 flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-[#2563EB] animate-pulse" />
                <span className="text-[10px] font-mono text-[#60a5fa] uppercase tracking-widest">Live in Production</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Outcomes metrics strip */}
        <div className="max-w-screen-2xl mx-auto mt-16 border-t border-[#c6c6cd]/40 pt-12">
          <div className="grid grid-cols-3 gap-8">
            {[
              { value: '< 18s', label: 'Lead Response Time', desc: 'Avg. first-response over last 90 days' },
              { value: '85%', label: 'Triage Reduction', desc: 'Manual workload eliminated post-launch' },
              { value: '+43%', label: 'Qualified Meetings', desc: 'QoQ increase in sales-qualified appointments' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-headline text-4xl md:text-5xl text-[#2563EB] mb-1 leading-none">{stat.value}</p>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0F172A] mt-2 mb-1">{stat.label}</p>
                <p className="text-[11px] text-[#45464d] leading-snug">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY A PROGRAM — dark contrast section (like ARC difference) ──── */}
      <section className="bg-[#0F172A] py-24 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg,#60a5fa 0,#60a5fa 1px,transparent 0,transparent 50%),repeating-linear-gradient(90deg,#60a5fa 0,#60a5fa 1px,transparent 0,transparent 50%)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="pointer-events-none absolute -top-32 left-1/3 h-96 w-96 rounded-full bg-[#2563EB]/20 blur-3xl" aria-hidden="true" />

        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#60a5fa] mb-4">Why a Program</p>
            <h2 className="font-headline text-5xl md:text-6xl text-white leading-tight mb-6">
              A Program,<br />
              <em className="italic font-light text-white/60">Not a Project.</em>
            </h2>
            <div className="w-16 h-[2px] bg-[#2563EB] mb-8" />
            <p className="text-[#7c839b] text-base leading-relaxed">
              Projects hand off. Programs stay accountable. Every H.V.A engagement runs from diagnosis through production — one team, one loop, no drift.
            </p>
          </motion.div>

          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <div className="space-y-px">
              {[
                { others: 'Vendors deliver and disappear.', arc: 'H.V.A stays through evolution — monitoring, extending, improving.' },
                { others: 'Strategy and engineering are separated.', arc: 'One team owns strategy and build — no handoff, no drift.' },
                { others: 'Programs are scoped by hours, not outcomes.', arc: 'Every program is scoped around measurable operating impact.' },
                { others: 'Integration is an afterthought.', arc: 'Architecture, stack selection, and integrations are designed in from day one.' },
              ].map((row, idx) => (
                <motion.div
                  key={row.others}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * idx }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.06]"
                >
                  <div className="bg-[#0F172A] px-5 py-4 flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-[#94a3b8]/40 rounded-full" />
                    <p className="text-sm text-[#475569] line-through">{row.others}</p>
                  </div>
                  <div className="bg-[#0F172A] px-5 py-4 flex items-start gap-3 border-l border-[#2563EB]/20">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-[#2563EB] rounded-full" />
                    <p className="text-sm text-white">{row.arc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROGRAM 02 — Enterprise CRM Modernization ────────────────────── */}
      <section id="program-02" className="scroll-mt-28 bg-white py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Sticky sidebar */}
            <motion.div
              className="lg:col-span-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            >
              <div className="lg:sticky lg:top-40">
                <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="flex items-center gap-4 mb-8">
                  <span className="w-10 h-px bg-[#0F172A]" />
                  <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#0F172A]">Program 02</span>
                </motion.div>
                <motion.h2 variants={fadeUp} transition={{ duration: 0.5 }} className="font-headline text-4xl md:text-5xl text-[#0F172A] mb-6 leading-tight">
                  {p2?.name}
                </motion.h2>
                <motion.p variants={fadeUp} transition={{ duration: 0.5 }} className="text-[#45464d] text-base leading-relaxed mb-8">
                  {p2?.summary}
                </motion.p>
                <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
                  <h4 className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#45464d] mb-2">Delivery Model</h4>
                  <p className="text-sm text-[#45464d] leading-relaxed mb-3">{p2?.deliveryModel}</p>
                  {/* Stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {p2?.integrations.map((tag) => (
                      <span key={tag} className="text-[9px] font-medium bg-[#f2f4f6] text-[#45464d] border border-[#e2e8f0] px-2.5 py-1 uppercase tracking-[0.1em]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {p2?.proofLinks[0] && (
                    <Link href={p2.proofLinks[0]} className="group inline-flex items-center gap-3 font-bold text-[#0F172A] hover:text-[#2563EB] transition-colors text-sm uppercase tracking-[0.12em]">
                      View Case Study
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  )}
                </motion.div>

                {/* Proof metrics */}
                <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="mt-10 pt-8 border-t border-[#e2e8f0] grid grid-cols-3 gap-4">
                  {[
                    { v: '100%', l: 'Pipeline Visibility' },
                    { v: '−40%', l: 'Data Entry' },
                    { v: '$2.4M', l: 'Pipeline Tracked' },
                  ].map((s) => (
                    <div key={s.l}>
                      <p className="font-headline text-2xl text-[#2563EB] leading-none mb-1">{s.v}</p>
                      <p className="text-[9px] uppercase tracking-[0.14em] text-[#45464d] leading-tight">{s.l}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Bento right column */}
            <motion.div
              className="lg:col-span-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            >
              {/* ARC-style module cards (2×2) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#e2e8f0]">
                {[
                  {
                    icon: <Database className="w-5 h-5" strokeWidth={1.25} />,
                    title: 'Pipeline Orchestration',
                    desc: 'Multi-stage deal pipelines with role-based workflows and automated follow-up sequences.',
                    outcome: 'OUTCOME: UNIFIED DATA OWNERSHIP',
                  },
                  {
                    icon: <Zap className="w-5 h-5" strokeWidth={1.25} />,
                    title: 'Predictive Reporting',
                    desc: 'BI connectors and executive dashboards surfacing real-time revenue intelligence across teams.',
                    outcome: 'OUTCOME: −40% DATA ENTRY TIME',
                  },
                ].map((card) => (
                  <motion.div
                    key={card.title}
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                    className="group bg-white p-10 flex flex-col justify-between aspect-square"
                  >
                    <div>
                      <div className="w-12 h-12 bg-[#f2f4f6] flex items-center justify-center mb-8 group-hover:bg-[#0F172A] transition-colors duration-300">
                        <span className="text-[#2563EB] group-hover:text-white transition-colors duration-300">{card.icon}</span>
                      </div>
                      <h3 className="font-headline text-2xl text-[#0F172A] mb-3">{card.title}</h3>
                      <p className="text-[#45464d] text-sm leading-relaxed">{card.desc}</p>
                    </div>
                    <div className="pt-6 border-t border-[#e2e8f0] flex justify-between items-center">
                      <span className="text-[9px] font-bold text-[#2563EB] uppercase tracking-[0.18em]">{card.outcome}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#94a3b8]" />
                    </div>
                  </motion.div>
                ))}

                {/* Spanning image */}
                <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="md:col-span-2 h-[520px] relative overflow-hidden group">
                  <Image
                    src="/Images/solution-programs/hva-enterprise-crm-modernization.png"
                    alt="Enterprise CRM modernization — H.V.A Morocco"
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-cover grayscale blur-[2px] group-hover:grayscale-0 group-hover:blur-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-[#0F172A]/25" />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none opacity-[0.025]"
                    style={{ background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, #fff 2px, #fff 3px)' }}
                  />
                  {/* Live badge */}
                  <div className="absolute top-5 right-5 bg-[#0F172A]/80 backdrop-blur-sm px-4 py-2.5 flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-[#2563EB] animate-pulse" />
                    <span className="text-[10px] font-mono text-[#60a5fa] uppercase tracking-widest">Live in Production</span>
                  </div>
                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-5">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#0F172A] mb-1">Deployment Scale</p>
                    <p className="font-headline text-lg text-[#0F172A]">94 active users · $2.4M pipeline tracked</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PROGRAM 03 — Cloud Delivery Reliability Stack ────────────────── */}
      <section id="program-03" className="scroll-mt-28 bg-[#0F172A] py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
        {/* Blueprint grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(to right,#60a5fa 1px,transparent 1px),linear-gradient(to bottom,#60a5fa 1px,transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div className="pointer-events-none absolute -bottom-20 right-1/4 h-80 w-80 rounded-full bg-[#2563EB]/15 blur-3xl" aria-hidden="true" />

        <div className="relative z-10 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* Left — text + metrics */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={{ show: { transition: { staggerChildren: 0.09 } } }}
            >
              <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="flex items-center gap-4 mb-8">
                <span className="w-10 h-px bg-[#60a5fa]/40" />
                <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#60a5fa]">Program 03</span>
              </motion.div>
              <motion.h2 variants={fadeUp} transition={{ duration: 0.5 }} className="font-headline text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                {p3?.name}
              </motion.h2>
              <motion.p variants={fadeUp} transition={{ duration: 0.5 }} className="text-[#7c839b] text-base leading-relaxed mb-10 max-w-lg">
                {p3?.summary}
              </motion.p>

              {/* Metrics */}
              <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="space-y-5 mb-10">
                {[
                  { value: '99.99%', label: 'SLA Architecture', desc: 'Multi-region failover with RTO/RPO planning and active-active redundancy.' },
                  { value: '<2ms', label: 'Deployment Latency', desc: 'Blue-green deployments with automated rollback and health-check gates.' },
                ].map((metric) => (
                  <div key={metric.label} className="flex gap-6 pb-5 border-b border-white/10">
                    <span className="font-headline text-3xl md:text-4xl text-[#60a5fa] shrink-0">{metric.value}</span>
                    <div>
                      <p className="font-bold text-white text-sm mb-1">{metric.label}</p>
                      <p className="text-[#7c839b] text-sm leading-relaxed">{metric.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Modules */}
              <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
                <h4 className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#7c839b] mb-4">Core Modules</h4>
                <ul className="grid grid-cols-2 gap-2 mb-8">
                  {p3?.modules.map((mod) => (
                    <li key={mod} className="flex items-start gap-2 text-sm text-[#94a3b8]">
                      <span className="mt-[6px] h-1 w-1 shrink-0 bg-[#60a5fa] rounded-full" />
                      {mod}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {p3?.integrations.map((tag) => (
                    <span key={tag} className="text-[9px] font-medium bg-white/5 text-[#94a3b8] border border-white/10 px-2.5 py-1 uppercase tracking-[0.1em]">
                      {tag}
                    </span>
                  ))}
                </div>
                {p3?.proofLinks[0] && (
                  <Link href={p3.proofLinks[0]} className="group inline-flex items-center gap-3 font-bold text-white hover:text-[#60a5fa] transition-colors text-sm uppercase tracking-[0.12em]">
                    Explore Capabilities
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                )}
              </motion.div>
            </motion.div>

            {/* Right — ARC-style blueprint diagram + image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              {/* Diagram card */}
              <div className="relative overflow-hidden border border-white/10 mb-4">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.06]" style={blueprintGrid} />
                <div className="relative p-6 h-full">
                  <div className="flex justify-between items-center mb-5">
                    <div className="bg-[#dbeafe]/10 px-2 py-1 text-[8px] font-mono text-[#60a5fa] border border-[#60a5fa]/20 uppercase tracking-wider">
                      RELIABILITY_STACK
                    </div>
                    <div className="text-[9px] font-mono text-[#475569]">ARC/03</div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { id: 'CI/CD', name: 'Pipeline Hardening', status: 'ACTIVE', pulse: true },
                      { id: 'OBS', name: 'Observability Layer', status: 'MONITORING', pulse: false },
                      { id: 'SEC', name: 'Security Controls', status: 'ENFORCED', pulse: false },
                      { id: 'DR', name: 'Disaster Recovery', status: 'STANDBY', pulse: true },
                    ].map((layer) => (
                      <div key={layer.id} className="bg-[#0a101f] border border-white/[0.07] px-4 py-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-1.5 h-1.5 rounded-full bg-[#60a5fa] ${layer.pulse ? 'animate-pulse' : ''}`} />
                          <span className="text-[8px] font-mono text-[#475569]">{layer.id}</span>
                          <span className="font-headline text-sm text-white/80">{layer.name}</span>
                        </div>
                        <span className="text-[7px] font-mono text-[#60a5fa] tracking-wider">{layer.status}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-[1px] flex-1 bg-[#2563EB]/20 relative">
                      <div className="absolute top-0 left-0 h-[1px] w-16 bg-[#60a5fa] animate-pulse" />
                    </div>
                    <span className="text-[7px] font-mono text-[#60a5fa] tracking-wider">SLA: 99.99%</span>
                  </div>
                </div>
              </div>

              {/* Image below */}
              <div className="relative w-full aspect-[16/9] overflow-hidden group">
                <div className="absolute inset-0 border border-white/10 translate-x-3 translate-y-3 z-0" />
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/Images/solution-programs/hva-cloud-delivery-reliability-stack.png"
                    alt="Cloud delivery reliability infrastructure — H.V.A Morocco"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-[#0F172A]/40" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="bg-[#e0e3e5] py-24 px-6 md:px-12 text-center relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(to right,#0F172A 1px,transparent 1px),linear-gradient(to bottom,#0F172A 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
          >
            <h2 className="font-headline text-4xl md:text-5xl text-[#0F172A] mb-6 max-w-2xl mx-auto leading-tight">
              Ready to architect your digital future?
            </h2>
            <p className="text-[#45464d] text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              We scope the right program for your operations — constraints, integrations, and timeline first.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="sharp-edge btn-primary">
                Start a Program
              </Link>
              <Link href="/capabilities" className="sharp-edge btn-outlined">
                View All Capabilities
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
