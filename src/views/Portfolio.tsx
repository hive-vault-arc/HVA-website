'use client';

import React from 'react';
import Link from 'next/link';
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

/* ── Blueprint grid background (reused in hero + CTA) ── */
const blueprintGrid: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(to right,  rgba(37,99,235,0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(37,99,235,0.05) 1px, transparent 1px)
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
      <div className="relative isolate min-h-screen overflow-x-hidden bg-[#F8FAFC] text-[#0F172A]">

        {/* Scroll progress bar */}
        <motion.div
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#2563EB] via-[#3b82f6] to-[#60a5fa]"
          style={{ scaleX: progressScale }}
        />
        <PageAmbientBackground className="-z-10" />

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[420px] sm:min-h-[560px] lg:min-h-[680px] flex items-center overflow-hidden bg-white">
          {/* Blueprint grid overlay */}
          <div className="absolute inset-0 opacity-60" style={blueprintGrid} />
          {/* Right-side decorative skewed panel */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#f2f4f6] skew-x-12 translate-x-32 hidden lg:block" />

          <div className="relative max-w-7xl mx-auto px-8 w-full py-32">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-4 py-1 mb-6 bg-[#2563EB]/10 text-[#2563EB] font-bold text-[10px] uppercase tracking-[0.2em]">
                Transformation Portfolio
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-[#0F172A] leading-tight mb-8">
                Consulting-Led Programs in Production
              </h1>
              <p className="text-xl text-[#475569] max-w-xl leading-relaxed font-light">
                These are not isolated builds. Each engagement shows how H.V.A turns strategic priorities into measurable operational impact.
              </p>
            </motion.div>

            {/* Scroll cue */}
            <div className="absolute bottom-12 right-12 hidden md:flex items-center gap-4 text-[#475569]">
              <span className="text-sm font-bold tracking-[0.2em] uppercase">Scroll to explore</span>
              <div className="w-12 h-px bg-[#475569]/40" />
            </div>
          </div>
        </section>

        {/* ── Projects ──────────────────────────────────────────────────────── */}
        <section className="py-24 space-y-32">

          {/* Project 1 — AI Assistant (image left, content right) */}
          <motion.div
            className="max-w-7xl mx-auto px-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid lg:grid-cols-12 gap-12 items-center">

              {/* Image */}
              <div className="lg:col-span-7 relative group pb-10 pr-8">
                <div className="absolute -inset-4 bg-[#2563EB]/5 transition-all duration-300 group-hover:bg-[#2563EB]/10" />
                <img
                  alt="Custom AI agent WhatsApp assistant built by H.V.A Morocco"
                  src="/Images/blog/custom-ai-agent-morocco.webp"
                  className="relative w-full h-[260px] sm:h-[380px] md:h-[500px] object-cover shadow-lg"
                  loading="lazy"
                  decoding="async"
                />
                {/* Floating info card */}
                <div className="absolute -bottom-4 -right-4 w-52 bg-white p-6 shadow-xl hidden md:block">
                  <Bot className="h-8 w-8 text-[#2563EB] mb-3" />
                  <p className="text-[10px] font-bold text-[#475569] uppercase tracking-wider leading-relaxed">
                    Program Stream 01: Conversational Intelligence
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-5 space-y-5">
                <h2 className="font-serif text-4xl text-[#0F172A] leading-tight">
                  Smart WhatsApp AI Assistant
                </h2>
                <div className="flex flex-wrap gap-2">
                  {['Multilingual', 'CRM Integration', 'Automated Scheduling'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#e2e8f0] text-[#475569] text-[10px] font-bold uppercase tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-[#475569] leading-relaxed font-light">
                  Delivered a consulting-led AI transformation stream for global lead management. The system handles initial inquiries in 12 languages, qualifies prospects with custom logic, and updates CRM records automatically.
                </p>
                <div className="border border-[#e2e8f0] bg-[#F8FAFC] p-4 text-sm text-[#334155]">
                  <p><span className="font-semibold">Deployment status:</span> Live in production since October 2025.</p>
                  <p className="mt-1"><span className="font-semibold">Stack/integrations:</span> WhatsApp API, HubSpot, Google Calendar, PostgreSQL, orchestration flows.</p>
                </div>
                <ul className="space-y-3 text-sm text-[#475569]">
                  {[
                    '85% reduction in manual qualification time',
                    '24/7 lead capture across timezones',
                    'Direct HubSpot & Salesforce synchronization',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-[#2563EB] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <blockquote className="border-l-2 border-[#2563EB] pl-3 text-sm italic text-[#1E272E]/80">
                  "H.V.A translated our strategy into a production AI workflow our team trusts daily."
                  <footer className="mt-1 text-xs not-italic text-[#475569]">
                    — Head of Growth, Atlas Property Group
                  </footer>
                </blockquote>
                <div className="pt-3">
                  <Link
                    href="/case-studies/multilingual-whatsapp-ai-agent"
                    className="inline-flex items-center gap-2 text-[#2563EB] font-bold border-b-2 border-[#2563EB] pb-1 hover:text-[#1d4ed8] hover:border-[#1d4ed8] transition-all group"
                  >
                    View Technical Breakdown
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Project 2 — CRM Operating System (content left, image right) */}
          <div className="bg-[#f2f4f6] py-24">
            <motion.div
              className="max-w-7xl mx-auto px-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid lg:grid-cols-12 gap-12 items-center">

                {/* Content */}
                <div className="lg:col-span-5 space-y-5 order-2 lg:order-1">
                  <h2 className="font-serif text-4xl text-[#0F172A] leading-tight">
                    Real-Estate CRM Transformation Program
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {['Custom SaaS', 'Team Collaboration', 'Pipeline Automation'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-[#e0e3e5] text-[#475569] text-[10px] font-bold uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                <p className="text-[#475569] leading-relaxed font-light">
                  A consulting and engineering engagement for a luxury real estate group. We replaced three disconnected tools with one unified CRM operation that tracks the full buyer journey.
                </p>
                <div className="border border-[#e2e8f0] bg-white p-4 text-sm text-[#334155]">
                  <p><span className="font-semibold">Deployment status:</span> Live in production since May 2025 across sales and operations.</p>
                  <p className="mt-1"><span className="font-semibold">Stack/integrations:</span> CRM core, DocuSign, Meta Lead Sync, pipeline automation, BI reporting.</p>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 border-l-4 border-[#2563EB]">
                      <p className="font-serif text-2xl text-[#2563EB]">40%</p>
                      <p className="text-[10px] font-bold text-[#475569] uppercase tracking-wider">
                        Efficiency Gain
                      </p>
                    </div>
                    <div className="bg-white p-4 border-l-4 border-[#2563EB]">
                      <p className="font-serif text-2xl text-[#2563EB]">$2.4M</p>
                      <p className="text-[10px] font-bold text-[#475569] uppercase tracking-wider">
                        Tracked Pipeline
                      </p>
                  </div>
                </div>
                <blockquote className="border-l-2 border-[#2563EB] pl-3 text-sm italic text-[#1E272E]/80">
                  "Forecast and pipeline meetings are now based on one trusted operating model."
                  <footer className="mt-1 text-xs not-italic text-[#475569]">
                    — COO, Capstone Living Morocco
                  </footer>
                </blockquote>
                <div className="pt-3">
                  <Link
                    href="/case-studies/zoho-grade-crm-platform"
                    className="inline-flex items-center gap-2 text-[#2563EB] font-bold border-b-2 border-[#2563EB] pb-1 hover:text-[#1d4ed8] hover:border-[#1d4ed8] transition-all group"
                  >
                    Read Case Study
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Image */}
                <div className="lg:col-span-7 relative order-1 lg:order-2 pt-10 pl-8">
                  <img
                    alt="Custom real estate CRM system built by H.V.A for Moroccan businesses"
                    src="/Images/blog/custom-crm-system-morocco.webp"
                    className="w-full h-[260px] sm:h-[380px] md:h-[500px] object-cover shadow-2xl"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Floating header card — blue */}
                  <div className="absolute -top-4 -left-4 bg-[#2563EB] text-white p-8 hidden md:block">
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
              <h2 className="mx-auto max-w-5xl font-serif text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-semibold leading-[0.96] text-[#1E272E]">
                Redefining Modern
                <br />
                Transformation Delivery
              </h2>
              <p className="mt-10 text-xs uppercase tracking-[0.2em] text-[#1E272E]/58">Delivery Signature</p>
              <h3 className="mt-3 font-serif text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold leading-[1.02] text-[#1E272E]">Power. Speed. Control.</h3>
              <p className="mx-auto mt-3 max-w-4xl text-base leading-relaxed text-[#1E272E]/72 md:text-[1.55rem]">
                Everything needed to advise, engineer, deploy, and maintain reliable digital operations.
              </p>
            </motion.div>

            <div className="mt-10 overflow-hidden border border-[#1E272E]/12 bg-white/84">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {proofBlocks.map((block, index) => (
                  <motion.article
                    key={block.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    className={[
                      'relative border border-[#1E272E]/10 p-5 md:p-6 py-6',
                      'bg-[linear-gradient(rgba(30,39,46,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(30,39,46,0.055)_1px,transparent_1px)] bg-[size:26px_26px]',
                      index % 2 === 0 ? 'bg-[#F8FAFD]' : 'bg-[#F4F8FD]',
                    ].join(' ')}
                  >
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_28%_24%,rgba(9,132,227,0.09),transparent_52%)]" />
                    <div className="relative z-10">
                      <div className="inline-flex text-[#0984E3]">{block.icon}</div>
                      <h4 className="mt-3 text-3xl font-semibold tracking-tight text-[#1E272E] md:text-[2.1rem]">
                        {block.title}
                      </h4>
                      <p className="mt-2 max-w-md text-base leading-relaxed text-[#1E272E]/82 md:text-xl">
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
