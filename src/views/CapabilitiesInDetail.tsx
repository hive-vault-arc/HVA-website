'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion';
import { Bot, Building2, Cloud, Cpu, Settings, Wrench, ArrowUpRight, ArrowRight } from 'lucide-react';
import { useAnimationQuality } from '../lib/animationQuality';
import BottomCTA from '../components/BottomCTA';
import PageAmbientBackground from '../components/PageAmbientBackground';
import SectionBrandMark from '../components/SectionBrandMark';
import { BOT_DELIVERY_MODEL, CAPABILITY_DETAIL_SECTIONS } from '../lib/capabilities-content';

/* ── Icons ────────────────────────────────────────────────────────────────── */

function getDetailIcon(id: string, cls = 'h-5 w-5', sw = 1.5) {
  switch (id) {
    case 'strategy-business':     return <Building2 className={cls} strokeWidth={sw} />;
    case 'technology-consulting': return <Wrench className={cls} strokeWidth={sw} />;
    case 'ai-data-analytics':    return <Bot className={cls} strokeWidth={sw} />;
    case 'software-engineering':  return <Cpu className={cls} strokeWidth={sw} />;
    case 'cloud-infrastructure':  return <Cloud className={cls} strokeWidth={sw} />;
    case 'operations-managed':    return <Settings className={cls} strokeWidth={sw} />;
    default:                      return <Wrench className={cls} strokeWidth={sw} />;
  }
}

const pillarAnchors = [
  { id: 'strategy-business',     short: 'Strategy' },
  { id: 'technology-consulting', short: 'Technology' },
  { id: 'ai-data-analytics',    short: 'AI & Data' },
  { id: 'software-engineering',  short: 'Software' },
  { id: 'cloud-infrastructure',  short: 'Cloud' },
  { id: 'operations-managed',    short: 'Operations' },
];

/* ── Shared animation ─────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0 },
};

/* ── Component ────────────────────────────────────────────────────────────── */

const CapabilitiesInDetail: React.FC = () => {
  const { motionReduced } = useAnimationQuality();
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const heroRef = useRef<HTMLDivElement>(null);
  const [heroSpot, setHeroSpot] = useState<{ x: number; y: number } | null>(null);
  const onHeroMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    setHeroSpot({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <MotionConfig reducedMotion={motionReduced ? 'always' : 'never'}>
      <div className="relative isolate overflow-x-hidden bg-[#FFFFFF] text-[#1A2535]">

        {/* Scroll progress */}
        <motion.div
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#E8A838] via-[#F0C15A] to-[#E8A838]"
          style={{ scaleX: progressScale }}
        />

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="relative flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden px-6 pt-28 pb-20 md:px-12 lg:min-h-[78vh]">
          <PageAmbientBackground className="-z-10" />

          {/* Background image */}
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <Image
              src="/Images/hero/ai-powered-transformation-operations-tangier-morocco.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover grayscale opacity-[0.09]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFFFFF] via-[#FFFFFF]/92 to-[#FFFFFF]/35" />
          </div>

          {/* Cursor spotlight */}
          <div
            ref={heroRef}
            className="absolute inset-0 z-[1]"
            onMouseMove={onHeroMove}
            onMouseLeave={() => setHeroSpot(null)}
            aria-hidden="true"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[2] transition-opacity duration-300"
            style={
              heroSpot
                ? { background: `radial-gradient(circle 260px at ${heroSpot.x}px ${heroSpot.y}px, rgba(232,168,56,0.12) 0%, transparent 100%)`, opacity: 1 }
                : { opacity: 0 }
            }
          />
          {/* Scanline */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[2] opacity-[0.018]"
            style={{ background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, #E8A838 3px, #E8A838 4px)' }}
          />

          <div className="relative z-10 max-w-screen-2xl mx-auto w-full">
            <motion.div
              className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.09 } } }}
            >
              {/* Left — headline */}
              <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="lg:col-span-8">
                <div className="mb-8 flex items-center gap-3">
                  <SectionBrandMark size="sm" />
                  <span className="inline-block bg-[#FFF4D8] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[#E8A838]">
                    Capabilities In Detail
                  </span>
                </div>
                <h1 className="font-headline font-light text-[clamp(2.8rem,6vw,6rem)] leading-[1.04] tracking-tight text-[#1A2535]">
                  Full capability depth:
                  <br />
                  <em className="italic font-light text-[#536070]">strategy, execution,</em>
                  <br />
                  and operating ownership.
                </h1>
                <div className="mt-10 flex flex-wrap items-center gap-8">
                  {[
                    { n: '6', label: 'Service Pillars' },
                    { n: '3', label: 'ARC Phases' },
                    { n: '30+', label: 'Sub-Capabilities' },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-baseline gap-2">
                      <span className="font-headline text-3xl text-[#E8A838]">{stat.n}</span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#536070]">{stat.label}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-5 mt-9">
                  <Link href="/capabilities/solution-programs" className="sharp-edge btn-primary">
                    View Solution Programs
                  </Link>
                  <Link
                    href="/capabilities"
                    className="inline-flex min-h-11 items-center border-b-2 border-[#E8A838]/20 pb-0.5 text-sm font-bold uppercase tracking-widest text-[#E8A838] transition-all hover:border-[#E8A838]"
                  >
                    Back to Capabilities →
                  </Link>
                </div>
              </motion.div>

              {/* Right — dark index panel */}
              <motion.aside
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="lg:col-span-4 lg:self-end"
              >
                <div className="relative overflow-hidden bg-[#1A2535] p-6">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.05]"
                    style={{
                      backgroundImage: 'linear-gradient(to right,#E8A838 1px,transparent 1px),linear-gradient(to bottom,#E8A838 1px,transparent 1px)',
                      backgroundSize: '28px 28px',
                    }}
                  />
                  <p className="relative text-[9px] font-mono uppercase tracking-[0.3em] text-[#F0C15A] mb-4">
                    Six Service Pillars
                  </p>
                  <nav className="relative">
                    {pillarAnchors.map((item, i) => (
                      <a
                        key={item.id}
                        href={`#pillar-${item.id}`}
                        className="flex items-center justify-between border-b border-white/[0.08] py-2.5 last:border-0 group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[9px] text-[#E8A838]/50 group-hover:text-[#E8A838] transition-colors">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-sm font-medium text-white/65 group-hover:text-white transition-colors duration-200">
                            {item.short}
                          </span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-[#F0C15A]/30 group-hover:text-[#F0C15A] group-hover:translate-x-0.5 transition-all" />
                      </a>
                    ))}
                  </nav>
                  <div className="relative mt-4 border-t border-white/10 pt-4">
                    <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/25">
                      All pillars → ARC delivery model
                    </p>
                  </div>
                </div>
              </motion.aside>
            </motion.div>
          </div>
        </section>

        {/* ── PILLAR QUICK-NAV STRIP ────────────────────────────────────────── */}
        <div className="overflow-x-auto border-y border-[#DDE3EA] bg-white [scrollbar-width:none]">
          <div className="max-w-screen-2xl mx-auto">
            <div className="flex min-w-max md:min-w-0 md:grid md:grid-cols-6 divide-x divide-[#DDE3EA]">
              {pillarAnchors.map((item, i) => (
                <a
                  key={item.id}
                  href={`#pillar-${item.id}`}
                  className="group flex items-center gap-3 px-6 py-5 hover:bg-[#FFFFFF] transition-colors duration-200"
                >
                  <span className="text-[#E8A838] shrink-0 group-hover:scale-110 transition-transform duration-200">
                    {getDetailIcon(item.id, 'h-4 w-4')}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#9AA4B2] mb-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <p className="text-sm font-medium text-[#1A2535] transition-colors group-hover:text-[#E8A838]">
                      {item.short}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── SERVICE PILLAR CATALOG ────────────────────────────────────────── */}
        <section className="bg-[#F7F8FA] py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-screen-2xl mx-auto">

            {/* Section header */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20"
            >
              <motion.div variants={fadeUp} transition={{ duration: 0.55 }} className="md:col-span-6">
                <div className="mb-5 flex items-center gap-3">
                  <SectionBrandMark size="sm" />
                  <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-[#E8A838]">
                    Service Pillar Catalog
                  </span>
                </div>
                <h2 className="font-headline text-5xl md:text-6xl text-[#1A2535] leading-[1.05]">
                  Six pillars.<br />
                  <em className="italic">Full context.</em>
                </h2>
              </motion.div>
              <motion.div variants={fadeUp} transition={{ duration: 0.55 }} className="md:col-span-6 flex items-end">
                <div>
                  <p className="text-[#536070] text-base leading-relaxed mb-5 max-w-lg">
                    Strategic context, execution context, and full sub-capability coverage — from business strategy to managed operations.
                  </p>
                  <div className="w-16 h-[2px] bg-[#E8A838]" />
                </div>
              </motion.div>
            </motion.div>

            {/* 2-col card grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {CAPABILITY_DETAIL_SECTIONS.map((domain, index) => (
                <motion.article
                  key={domain.id}
                  id={`pillar-${domain.id}`}
                  className="scroll-mt-28 bg-white flex flex-col shadow-[0_10px_40px_rgba(25,28,30,0.06)]"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: (index % 2) * 0.06 }}
                >
                  {/* Card header */}
                  <div className="flex items-start justify-between p-8 pb-0">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center bg-[#FFF4D8] text-[#E8A838] shrink-0">
                        {getDetailIcon(domain.id)}
                      </div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#9AA4B2]">
                        Service Pillar
                      </p>
                    </div>
                    <span className="font-headline text-[4rem] text-[#F7F8FA] select-none leading-none -mt-2">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="border-b border-[#F7F8FA] px-6 pt-3 pb-6 sm:px-8">
                    <h3 className="font-headline text-3xl text-[#1A2535] leading-tight">{domain.title}</h3>
                    {/* Strategic context — italic quote treatment */}
                    <p
                      className="mt-5 text-[0.95rem] italic text-[#536070] leading-relaxed pl-5"
                      style={{ borderLeft: '2px solid #CDD2DA' }}
                    >
                      {domain.strategicContext}
                    </p>
                  </div>

                  {/* Execution context */}
                  <div className="border-b border-[#F7F8FA] px-6 py-6 sm:px-8">
                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#E8A838] mb-3">
                      Execution Approach
                    </p>
                    <p className="text-sm text-[#536070] leading-relaxed">{domain.executionContext}</p>
                  </div>

                  {/* Sub-caps + outcomes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#F7F8FA]">
                    <div className="px-6 py-6 sm:px-8">
                      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#E8A838] mb-4">
                        Sub-Capabilities
                      </p>
                      <ul className="space-y-2">
                        {domain.subCapabilities.map((sub) => (
                          <li key={sub} className="flex items-start gap-2.5 text-[0.8rem] text-[#1A2535] leading-snug">
                            <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#E8A838]" />
                            {sub}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-[#FFFFFF] px-6 py-6 sm:px-8">
                      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#E8A838] mb-4">
                        Related Outcomes
                      </p>
                      <div className="flex flex-col gap-2.5">
                        {domain.relatedOutcomes.map((outcome) => (
                          <div key={outcome} className="flex items-start gap-2.5">
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#E8A838] shrink-0 mt-[2px]" />
                            <span className="text-[0.8rem] font-medium text-[#1A2535]">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPERT INSIGHT QUOTE (reference.html "Expert Insight" card) ──── */}
        <section className="bg-white py-20 px-6 md:px-12">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Rotated testimonial card */}
              <div className="lg:col-span-5 relative">
                <div className="bg-[#E8EBF0] p-10 md:p-12 relative overflow-hidden -rotate-1">
                  <div
                    aria-hidden="true"
                    className="absolute top-6 left-8 font-headline text-[8rem] leading-none text-[#E8A838]/10 select-none pointer-events-none"
                  >
                    &ldquo;
                  </div>
                  <p className="relative font-headline text-2xl md:text-3xl italic text-[#1A2535] leading-snug mb-8">
                    &ldquo;Transformation succeeds when strategy, engineering, and operations move together — from the first decision to the last deployment.&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#1A2535] flex items-center justify-center shrink-0">
                      <SectionBrandMark surface="dark" size="sm" className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#1A2535]">ARC Framework</p>
                      <p className="text-[10px] text-[#536070] uppercase tracking-[0.14em] mt-0.5">
                        Strategy · Engineering · Operations
                      </p>
                    </div>
                  </div>
                </div>
                {/* Decorative offset element */}
                <div className="absolute -top-10 -right-10 w-56 h-56 bg-[#E8A838]/5 -z-10" />
              </div>

              {/* Right side — program links */}
              <div className="lg:col-span-7">
                <div className="mb-5 flex items-center gap-3">
                  <SectionBrandMark size="sm" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E8A838]">
                    Where Depth Goes to Work
                  </p>
                </div>
                <h2 className="font-headline text-4xl md:text-5xl text-[#1A2535] mb-8 leading-tight">
                  Capability without execution<br />
                  <em className="italic font-light text-[#536070]">is just strategy.</em>
                </h2>
                <div className="space-y-px">
                  {[
                    {
                      num: '01',
                      label: 'AI Reception & Lead Operations Program',
                      desc: 'Full-stack AI engagement — from diagnosis to production agent.',
                      href: '/capabilities/solution-programs#program-01',
                    },
                    {
                      num: '02',
                      label: 'Enterprise CRM Modernization Program',
                      desc: 'Transform fragmented CRM into one governed operating system.',
                      href: '/capabilities/solution-programs#program-02',
                    },
                    {
                      num: '03',
                      label: 'Cloud Delivery Reliability Stack',
                      desc: 'Hardened release infrastructure with 99.99% SLA architecture.',
                      href: '/capabilities/solution-programs#program-03',
                    },
                  ].map((item) => (
                    <Link
                      key={item.num}
                      href={item.href}
                      className="group flex items-start justify-between gap-6 bg-[#FFFFFF] hover:bg-[#F7F8FA] px-6 py-5 transition-colors duration-200"
                    >
                      <div className="flex items-start gap-5">
                        <span className="font-headline text-2xl text-[#DDE3EA] group-hover:text-[#FFF4D8] transition-colors leading-none mt-1">
                          {item.num}
                        </span>
                        <div>
                          <p className="font-bold text-sm text-[#1A2535] group-hover:text-[#E8A838] transition-colors mb-1">
                            {item.label}
                          </p>
                          <p className="text-xs text-[#536070]">{item.desc}</p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#CDD2DA] group-hover:text-[#E8A838] shrink-0 mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ARC DELIVERY MODEL — dark section, keep bg + squares ─────────── */}
        <section className="relative bg-[#1A2535] py-24 md:py-32 px-6 md:px-12 text-white overflow-hidden">
          {/* Blueprint grid — keep as requested */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg,#F0C15A 0,#F0C15A 1px,transparent 0,transparent 48px),repeating-linear-gradient(90deg,#F0C15A 0,#F0C15A 1px,transparent 0,transparent 48px)',
            }}
          />
          {/* Ambient glow — keep */}
          <div className="pointer-events-none absolute -top-32 right-0 w-[500px] h-[500px] bg-[#E8A838]/15 rounded-full blur-[120px]" aria-hidden="true" />
          <div className="pointer-events-none absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-[#E8A838]/10 rounded-full blur-[80px]" aria-hidden="true" />

          <div className="relative max-w-screen-2xl mx-auto">

            {/* Editorial header */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={{ show: { transition: { staggerChildren: 0.09 } } }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16"
            >
              <motion.div variants={fadeUp} transition={{ duration: 0.55 }} className="md:col-span-8">
                <div className="mb-5 flex items-center gap-3">
                  <SectionBrandMark surface="dark" size="sm" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#F0C15A]">
                    Delivery Model
                  </p>
                </div>
                <h2 className="font-headline text-5xl md:text-6xl text-white leading-[1.05]">
                  {BOT_DELIVERY_MODEL.name}
                  <br />
                  <em className="italic font-light text-white/55">as an operating model.</em>
                </h2>
              </motion.div>
              <motion.div variants={fadeUp} transition={{ duration: 0.55 }} className="md:col-span-4 flex items-end">
                <p className="text-[#778192] text-base leading-relaxed">
                  Use ARC when leadership needs strategy and build delivered by the same team, with production operations kept stable while transformation scales.
                </p>
              </motion.div>
            </motion.div>

            {/* Phase progress indicator */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-3"
            >
              <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.22em] text-[#F0C15A]/50 mb-2">
                {BOT_DELIVERY_MODEL.phases.map((p) => (
                  <span key={p.id}>{p.title}</span>
                ))}
              </div>
              <div className="h-[2px] w-full bg-white/[0.08] relative">
                <div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-[#E8A838] via-[#F0C15A] to-[#E8A838]/30" />
              </div>
            </motion.div>

            {/* 3 Phase cards — keep the squares layout */}
            <div className="grid grid-cols-1 gap-px bg-[#3D4858] md:grid-cols-3">
              {BOT_DELIVERY_MODEL.phases.map((phase, index) => (
                <motion.article
                  key={phase.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="bg-[#1A2535] p-8 md:p-10 relative overflow-hidden group hover:bg-[#1A2535] transition-colors duration-300"
                >
                  {/* Phase number — large decorative */}
                  <div className="absolute top-5 right-6 font-headline text-[5rem] text-white/[0.03] leading-none select-none">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  {/* Top accent bar */}
                  <div className="h-[2px] w-12 bg-[#E8A838] mb-8 group-hover:w-20 transition-all duration-500" />
                  <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#F0C15A] mb-3">
                    Phase {index + 1}
                  </p>
                  <h3 className="font-headline text-4xl text-white mb-4 leading-tight">
                    {phase.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#778192] group-hover:text-[#9AA4B2] transition-colors">
                    {phase.detail}
                  </p>
                </motion.article>
              ))}
            </div>

            {/* When ARC is Recommended */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="mt-6"
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#F0C15A] mb-4">
                When ARC Is Recommended
              </p>
              <ul className="grid grid-cols-1 gap-px bg-white/[0.06] md:grid-cols-3">
                {BOT_DELIVERY_MODEL.fitCriteria.map((criteria) => (
                  <li
                    key={criteria}
                    className="flex items-start gap-3 bg-[#1A2535] px-6 py-5 text-sm text-white/75"
                  >
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#F0C15A]" />
                    {criteria}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ARC CTA row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <Link href="/contact" className="sharp-edge btn-primary">
                Initiate a Discovery
              </Link>
              <Link
                href="/capabilities/solution-programs"
                className="text-sm font-bold uppercase tracking-widest text-[#F0C15A] border-b-2 border-[#F0C15A]/20 hover:border-[#F0C15A] transition-all pb-0.5"
              >
                View Solution Programs →
              </Link>
            </motion.div>
          </div>
        </section>

        <BottomCTA
          variant="light"
          headline="Need this mapped to your business constraints?"
          subtext="We align service pillars, sub-capabilities, and delivery model to your roadmap before execution starts."
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
