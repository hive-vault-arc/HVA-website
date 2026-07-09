'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  CloudCog,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { useAnimationQuality } from '../lib/animationQuality';
import PageAmbientBackground from '../components/PageAmbientBackground';
import BottomCTA from '../components/BottomCTA';
import SectionBrandMark from '../components/SectionBrandMark';

/* ── Blueprint grid background (reused in hero + CTA) ── */
const blueprintGrid: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(to right,  rgba(232,168,56,0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(232,168,56,0.05) 1px, transparent 1px)
  `,
  backgroundSize: '40px 40px',
};

/* ── Data ─────────────────────────────────────────────────────────────────── */

const proofBlocks = [
  {
    icon: <Bot className="h-5 w-5" />,
    title: 'Agent Workflows',
    detail: 'AI receptionist and operational agents integrated with real business processes.',
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: 'Decision Clarity',
    detail: 'Reporting and analyst pipelines built for measurable operational control.',
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    title: 'Automation Layer',
    detail: 'From intake to delivery, workflows are structured to reduce manual friction.',
  },
  {
    icon: <CloudCog className="h-5 w-5" />,
    title: 'Production Delivery',
    detail: 'CI/CD, monitoring, and reliability patterns aligned with long-term scale.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: 'Secure By Default',
    detail: 'Validation, rate limits, and control layers are included from day one.',
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: 'AI-Ready Products',
    detail: 'Practical AI features where they improve speed, quality, and decisions.',
  },
];

/* ── Component ────────────────────────────────────────────────────────────── */

const Portfolio: React.FC = () => {
  const { motionReduced } = useAnimationQuality();
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <MotionConfig reducedMotion={motionReduced ? 'always' : 'never'}>
      <div className="relative isolate min-h-[100dvh] overflow-x-hidden bg-[#FFFFFF] text-[#1A2535]">

        {/* Scroll progress bar */}
        <motion.div
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#E8A838] via-[#F0C15A] to-[#F0C15A]"
          style={{ scaleX: progressScale }}
        />
        <PageAmbientBackground className="-z-10" />

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[420px] sm:min-h-[560px] lg:min-h-[680px] flex items-center overflow-hidden bg-white">
          {/* Blueprint grid overlay */}
          <div className="absolute inset-0 opacity-60" style={blueprintGrid} />
          {/* Right-side decorative skewed panel */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F7F8FA] skew-x-12 translate-x-32 hidden lg:block" />

          <div className="relative mx-auto w-full max-w-7xl px-6 py-28 sm:px-8 md:py-32">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-6 flex items-center gap-3">
                <SectionBrandMark size="sm" />
                <span className="inline-block bg-[#E8A838]/10 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--section-label-color)]">
                  Transformation Portfolio
                </span>
              </div>
              <h1 className="mb-8 font-serif text-[clamp(2.6rem,12vw,4.1rem)] leading-[1.02] text-[#1A2535] sm:text-5xl md:text-6xl lg:text-8xl">
                Consulting-Led Programs in Production
              </h1>
              <p className="text-xl text-[#566274] max-w-xl leading-relaxed font-light">
                These are not isolated builds. Each engagement shows how Hive Vault Arc turns strategic priorities into measurable operational impact.
              </p>
            </motion.div>

            {/* Scroll cue */}
            <div className="absolute bottom-12 right-12 hidden md:flex items-center gap-4 text-[#566274]">
              <span className="text-sm font-bold tracking-[0.2em] uppercase">Scroll to explore</span>
              <div className="w-12 h-px bg-[#566274]/40" />
            </div>
          </div>
        </section>

        {/* ── Projects ──────────────────────────────────────────────────────── */}
        <section className="space-y-24 py-20 md:space-y-32 md:py-24">

          {/* Project 1 — AI Assistant (image left, content right) */}
          <motion.div
            className="mx-auto max-w-7xl px-6 sm:px-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid lg:grid-cols-12 gap-12 items-center">

              {/* Image */}
              <div className="relative pb-8 sm:pr-8 lg:col-span-7 group lg:pb-10">
                <div className="absolute -inset-4 bg-[#E8A838]/5 transition-all duration-300 group-hover:bg-[#E8A838]/10" />
                <div className="relative w-full h-[260px] sm:h-[380px] md:h-[500px] shadow-lg">
                  <Image
                    alt="Custom AI agent WhatsApp assistant built by Hive Vault Arc Morocco"
                    src="/Images/blog/custom-ai-agent-morocco.webp"
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="relative w-full h-full object-cover"
                  />
                </div>
                {/* Floating info card */}
                <div className="absolute -bottom-4 -right-4 hidden w-52 bg-white p-6 shadow-xl lg:block">
                  <Bot className="h-8 w-8 text-[#E8A838] mb-3" />
                  <p className="text-[10px] font-bold text-[#566274] uppercase tracking-wider leading-relaxed">
                    Program Stream 01: Conversational Intelligence
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-5 space-y-5">
                <h2 className="font-serif text-4xl text-[#1A2535] leading-tight">
                  Smart WhatsApp AI Assistant
                </h2>
                <div className="flex flex-wrap gap-2">
                  {['Multilingual', 'CRM Integration', 'Automated Scheduling'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#DDE3EA] text-[#566274] text-[10px] font-bold uppercase tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-[#566274] leading-relaxed font-light">
                  Delivered a consulting-led AI transformation stream for global lead management. The system handles initial inquiries in 12 languages, qualifies prospects with custom logic, and updates CRM records automatically.
                </p>
                <div className="border border-[#DDE3EA] bg-[#FFFFFF] p-4 text-sm text-[#3D4858]">
                  <p><span className="font-semibold">Deployment status:</span> Live in production since October 2025.</p>
                  <p className="mt-1"><span className="font-semibold">Stack/integrations:</span> WhatsApp API, HubSpot, Google Calendar, PostgreSQL, orchestration flows.</p>
                </div>
                <ul className="space-y-3 text-sm text-[#566274]">
                  {[
                    '85% reduction in manual qualification time',
                    '24/7 lead capture across timezones',
                    'Direct HubSpot & Salesforce synchronization',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-[#E8A838] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-0 border border-[#DDE3EA] overflow-hidden">
                  {[
                    { value: '85%', label: 'Triage cut' },
                    { value: '24/7', label: 'Autonomous' },
                    { value: '12', label: 'Languages' },
                  ].map((m, i) => (
                    <div key={m.label} className={`flex-1 text-center py-4 ${i < 2 ? 'border-r border-[#DDE3EA]' : ''}`}>
                      <p className="font-serif text-2xl text-[#E8A838]">{m.value}</p>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-[#566274] mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-3">
                  <Link
                    href="/case-studies/multilingual-whatsapp-ai-agent"
                    className="inline-flex min-h-11 items-center gap-2 border-b-2 border-[#E8A838] pb-1 font-bold text-[#E8A838] transition-all hover:border-[#C8891C] hover:text-[#C8891C] group"
                  >
                    View Technical Breakdown
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Project 2 — CRM Operating System (content left, image right) */}
          <div className="bg-[#F7F8FA] py-24">
            <motion.div
              className="mx-auto max-w-7xl px-6 sm:px-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid lg:grid-cols-12 gap-12 items-center">

                {/* Content */}
                <div className="lg:col-span-5 space-y-5 order-2 lg:order-1">
                  <h2 className="font-serif text-4xl text-[#1A2535] leading-tight">
                    Real-Estate CRM Transformation Program
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {['Custom SaaS', 'Team Collaboration', 'Pipeline Automation'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-[#E8EBF0] text-[#566274] text-[10px] font-bold uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                <p className="text-[#566274] leading-relaxed font-light">
                  A consulting and engineering engagement for a luxury real estate group. We replaced three disconnected tools with one unified CRM operation that tracks the full buyer journey.
                </p>
                <div className="border border-[#DDE3EA] bg-white p-4 text-sm text-[#3D4858]">
                  <p><span className="font-semibold">Deployment status:</span> Live in production since May 2025 across sales and operations.</p>
                  <p className="mt-1"><span className="font-semibold">Stack/integrations:</span> CRM core, DocuSign, Meta Lead Sync, pipeline automation, BI reporting.</p>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 border-l-4 border-[#E8A838]">
                      <p className="font-serif text-2xl text-[#E8A838]">40%</p>
                      <p className="text-[10px] font-bold text-[#566274] uppercase tracking-wider">
                        Efficiency Gain
                      </p>
                    </div>
                    <div className="bg-white p-4 border-l-4 border-[#E8A838]">
                      <p className="font-serif text-2xl text-[#E8A838]">$2.4M</p>
                      <p className="text-[10px] font-bold text-[#566274] uppercase tracking-wider">
                        Tracked Pipeline
                      </p>
                  </div>
                </div>
                <div className="border-l-4 border-[#E8A838] bg-[#FFFFFF] px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--section-label-color)]">Program status: Live in production</p>
                  <p className="text-[9px] text-[#9AA4B2] mt-0.5">Full-stack CRM · BI reporting layer · real-time lead sync</p>
                </div>
                <div className="pt-3">
                  <Link
                    href="/case-studies/top-tier-crm-transformation-program-real-estate-operations"
                    className="inline-flex min-h-11 items-center gap-2 border-b-2 border-[#E8A838] pb-1 font-bold text-[#E8A838] transition-all hover:border-[#C8891C] hover:text-[#C8891C] group"
                  >
                    Read Case Study
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Image */}
                <div className="relative order-1 pt-8 sm:pl-8 lg:order-2 lg:col-span-7 lg:pt-10">
                  <div className="relative w-full h-[260px] sm:h-[380px] md:h-[500px] shadow-2xl">
                    <Image
                      alt="Custom real estate CRM system built by Hive Vault Arc for Moroccan businesses"
                      src="/Images/blog/custom-crm-system-morocco.webp"
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Floating header card — blue */}
                  <div className="absolute -top-4 -left-4 hidden bg-[#E8A838] p-8 text-white lg:block">
                    <h3 className="font-serif text-2xl mb-2">Architectural Precision</h3>
                    <p className="text-[10px] font-bold opacity-80 uppercase tracking-[0.2em]">
                      Consulting-led execution
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

        </section>

        {/* ── Delivery Signature — DO NOT CHANGE ─────────────────────────────── */}
        <section className="relative py-14 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <h2 className="mx-auto max-w-5xl font-serif text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-semibold leading-[0.96] text-[#1A2535]">
                Redefining Modern
                <br />
                Transformation Delivery
              </h2>
              <div className="mt-10 flex items-center justify-center gap-3">
                <SectionBrandMark size="sm" />
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--section-label-color)]">Delivery Signature</p>
              </div>
              <h3 className="mt-3 font-serif text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold leading-[1.02] text-[#1A2535]">Power. Speed. Control.</h3>
              <p className="mx-auto mt-3 max-w-4xl text-base leading-relaxed text-[#1A2535]/72 md:text-[1.55rem]">
                Everything needed to advise, engineer, deploy, and maintain reliable digital operations.
              </p>
            </motion.div>

            <div className="mt-10 overflow-hidden border border-[#1A2535]/12 bg-white/84">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {proofBlocks.map((block, index) => (
                  <motion.article
                    key={block.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    className={[
                      'relative border border-[#1A2535]/10 p-5 md:p-6 py-6',
                      'bg-[linear-gradient(rgba(30,39,46,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(30,39,46,0.055)_1px,transparent_1px)] bg-[size:26px_26px]',
                      index % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#F7F8FA]',
                    ].join(' ')}
                  >
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_28%_24%,rgba(232,168,56,0.09),transparent_52%)]" />
                    <div className="relative z-10">
                      <div className="inline-flex text-[#E8A838]">{block.icon}</div>
                      <h4 className="mt-3 text-3xl font-semibold tracking-tight text-[#1A2535] md:text-[2.1rem]">
                        {block.title}
                      </h4>
                      <p className="mt-2 max-w-md text-base leading-relaxed text-[#1A2535]/82 md:text-xl">
                        {block.detail}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <BottomCTA
          variant="dark"
          headline="Ready to Move from Fragmented Projects to Guided Transformation?"
          subtext="Share your constraints and we will map the right consulting and engineering path for your operating model."
          primaryLabel="Book Discovery Call"
          primaryHref="/contact"
          secondaryLabel="View Case Studies"
          secondaryHref="/case-studies"
        />

      </div>
    </MotionConfig>
  );
};

export default Portfolio;
