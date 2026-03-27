'use client';

import React from 'react';
import Link from 'next/link';
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion';
import {
  Bot,
  CheckCircle2,
  Cloud,
  Database,
  Workflow,
} from 'lucide-react';
import { useAnimationQuality } from '../lib/animationQuality';
import PageAmbientBackground from '../components/PageAmbientBackground';
import BottomCTA from '../components/BottomCTA';

/* ── Data ─────────────────────────────────────────────────────────────────── */

const serviceLines = [
  {
    num: '01',
    icon: <Bot className="h-6 w-6" />,
    title: 'AI Receptionist & Agent Operations',
    summary:
      'Customer-facing and internal AI agents that respond, route, and execute routine workflows continuously — with no human intervention required.',
    outcomes: [
      'AI receptionist for WhatsApp, web, and voice',
      'Automated lead qualification and smart routing',
      'CRM & calendar deep integration',
    ],
    accent: 'dark',
  },
  {
    num: '02',
    icon: <Database className="h-6 w-6" />,
    title: 'AI Analyst & Decision Intelligence',
    summary:
      'Internal analyst copilots that organize data, generate reports, and surface the operational insights your team needs — exactly when they need them.',
    outcomes: [
      'Predictive performance dashboards',
      'NLP-based reporting and summarization',
      'Insight workflows tied to business KPIs',
    ],
    accent: 'light',
  },
  {
    num: '03',
    icon: <Workflow className="h-6 w-6" />,
    title: 'Automation & Custom Platforms',
    summary:
      'We design and engineer the operational backbone of your digital product — from bespoke SaaS platforms to enterprise workflow orchestration systems.',
    outcomes: [
      'Custom enterprise SaaS engineering',
      'Internal portals and API architecture',
      'Cross-system workflow automations',
    ],
    accent: 'light',
  },
  {
    num: '04',
    icon: <Cloud className="h-6 w-6" />,
    title: 'Delivery Ecosystem & Reliability',
    summary:
      'Scalability is not an accident. We implement the infrastructure, security controls, and CI/CD pipelines that ensure zero-downtime production operations.',
    outcomes: [
      'Cloud infrastructure and AWS/Azure setup',
      'End-to-end security auditing and hardening',
      'Automated scaling and deployment pipelines',
    ],
    accent: 'dark',
  },
];

const competencies = [
  {
    num: '01',
    title: 'Software Product Engineering',
    detail:
      'Production-ready web and mobile systems built with modern frameworks — clear architecture, ownership, and maintainability from day one.',
  },
  {
    num: '02',
    title: 'AI Receptionist Systems',
    detail:
      'Always-on front-desk automation for conversations, qualification, and scheduling — natural language understanding with custom LLM tuning.',
  },
  {
    num: '03',
    title: 'AI Analyst Reporting',
    detail:
      'Decision support workflows for reporting, insight extraction, and operational control. Real-time dashboards for executive teams.',
  },
  {
    num: '04',
    title: 'Workflow Orchestration',
    detail:
      'Automated handoffs between tools, teams, and systems with fewer manual bottlenecks. Built on Python, Make, or custom microservices.',
  },
  {
    num: '05',
    title: 'CI/CD and Deployment',
    detail:
      'Hardened deployment pipelines with quality gates — every push to production is secure, tested, and fully reversible.',
  },
  {
    num: '06',
    title: 'Security and Reliability',
    detail:
      'Infrastructure-as-code and persistent monitoring for enterprise-grade security. Validation, rate limits, and control layers from day one.',
  },
];

const brandPrinciples = [
  {
    num: '01',
    title: 'Outcome-Driven',
    desc: 'Every milestone is tied to measurable business outcomes, not just output.',
  },
  {
    num: '02',
    title: 'Quality by Default',
    desc: 'Performance, reliability, and maintainability are built in from day one — never bolted on.',
  },
  {
    num: '03',
    title: 'End-to-End Ownership',
    desc: 'We own the delivery from architecture to production. No hand-offs in the dark.',
  },
];

const deliveryFlow = [
  {
    num: '01',
    step: 'Discover',
    detail: 'We audit your current bottlenecks and map out the highest-impact AI and automation opportunities.',
    width: '28%',
  },
  {
    num: '02',
    step: 'Design',
    detail: 'Engineering the blueprints: tech stack, security protocols, architecture decisions, and UX flows.',
    width: '52%',
  },
  {
    num: '03',
    step: 'Build',
    detail: 'Sprint-based delivery. We code, test, and integrate the system into your active environment.',
    width: '75%',
  },
  {
    num: '04',
    step: 'Scale',
    detail: 'Production hand-off and continuous monitoring to ensure the system scales with your volume.',
    width: '100%',
  },
];

const heroStats = [
  { value: '4', label: 'Core Service Lines', sub: 'AI · Automation · Cloud · Platform' },
  { value: '24/7', label: 'Continuous AI Coverage', sub: 'Agents always operational' },
  { value: '100%', label: 'Production Delivery', sub: 'Every sprint ships to prod' },
];

/* ── Component ────────────────────────────────────────────────────────────── */

const Services: React.FC = () => {
  const { motionReduced } = useAnimationQuality();
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const heroShift = useTransform(scrollYProgress, [0, 0.3], [0, 30]);

  return (
    <MotionConfig reducedMotion={motionReduced ? 'always' : 'never'}>
      <div className="relative isolate min-h-screen overflow-x-hidden bg-[#F8FAFC] text-[#0F172A]">

        {/* Scroll progress */}
        <motion.div
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#2563EB] via-[#3b82f6] to-[#60a5fa]"
          style={{ scaleX: progressScale }}
        />
        <PageAmbientBackground className="-z-10" />

        {/* ────────────────────────────────────────────────────────────────────
            SECTION 1 — HERO
        ──────────────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-white">
          {/* Blueprint grid */}
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(37,99,235,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          {/* Skewed right panel */}
          <div className="absolute top-0 right-0 w-2/5 h-full bg-[#f1f5f9] skew-x-6 translate-x-20 hidden lg:block" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-14 pt-32 pb-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left: copy */}
              <motion.div
                className="lg:col-span-8"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                style={{ y: heroShift }}
              >
                <span className="inline-block text-[#2563EB] font-bold tracking-[0.22em] text-[10px] uppercase mb-6">
                  Engineering Excellence
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-8xl text-[#0F172A] leading-[1.03] tracking-tight mb-8">
                  Systems that move faster<br />
                  than your <em className="italic">bottlenecks.</em>
                </h1>
                <p className="text-xl md:text-2xl text-[#475569] font-light max-w-2xl leading-relaxed mb-10">
                  We deploy the operational layer for growth and control — integrating AI agents,
                  custom platforms, and reliable delivery ecosystems into the core of your business.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="sharp-edge bg-[#0F172A] text-[#F8FAFC] px-8 py-4 text-sm font-bold uppercase tracking-wide hover:bg-[#2563EB] transition-colors duration-300"
                  >
                    View Capabilities
                  </Link>
                  <Link
                    href="/portfolio"
                    className="sharp-edge bg-white border border-[#0F172A]/15 px-8 py-4 text-sm font-bold uppercase tracking-wide hover:bg-[#f1f5f9] transition-colors duration-300"
                  >
                    Client Portfolio →
                  </Link>
                </div>
              </motion.div>

              {/* Right: stat cards */}
              <motion.div
                className="lg:col-span-4 flex flex-col gap-4"
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white p-6 shadow-[0_10px_28px_rgba(37,99,235,0.09)] border-l-4 border-[#2563EB]"
                  >
                    <p className="font-serif text-4xl font-medium text-[#2563EB]">{stat.value}</p>
                    <p className="text-[#0F172A] font-bold text-sm mt-1">{stat.label}</p>
                    <p className="text-[#475569] text-xs mt-1 font-light tracking-wide">{stat.sub}</p>
                  </div>
                ))}
              </motion.div>

            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────
            SECTION 2 — CORE SERVICE LINES
        ──────────────────────────────────────────────────────────────────── */}
        <section className="bg-[#f2f4f6] py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-14">

            <div className="mb-16">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#475569] font-bold mb-3">
                Core Service Lines
              </p>
              <div className="flex items-end justify-between flex-wrap gap-6">
                <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-[#0F172A] leading-tight max-w-2xl">
                  What We Actually Deliver
                </h2>
                <p className="text-[#475569] max-w-md font-light leading-relaxed">
                  Four connected service lines that cover the full operational spectrum — from intelligent customer-facing agents to the infrastructure that keeps them running.
                </p>
              </div>
              <div className="mt-8 w-16 h-[3px] bg-[#2563EB]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1px] bg-[#d1d5db]">
              {serviceLines.map((line) => (
                <article
                  key={line.title}
                  className={[
                    'relative flex flex-col gap-6 p-6 sm:p-8 md:p-10 lg:p-14 group transition-all duration-300',
                    line.accent === 'dark'
                      ? 'bg-[#0F172A] text-[#F8FAFC]'
                      : 'bg-white text-[#0F172A] hover:bg-[#F8FAFC]',
                  ].join(' ')}
                >
                  {/* Large background number */}
                  <span
                    className={[
                      'absolute top-8 right-10 font-serif text-[7rem] font-medium leading-none select-none pointer-events-none',
                      line.accent === 'dark' ? 'text-white/6' : 'text-[#0F172A]/5',
                    ].join(' ')}
                  >
                    {line.num}
                  </span>

                  {/* Icon + badge */}
                  <div className="flex items-center gap-3">
                    <div
                      className={[
                        'inline-flex p-2.5',
                        line.accent === 'dark'
                          ? 'bg-white/12 text-[#60a5fa]'
                          : 'bg-[#dbeafe] text-[#2563EB]',
                      ].join(' ')}
                    >
                      {line.icon}
                    </div>
                    <span
                      className={[
                        'text-[10px] font-bold uppercase tracking-[0.18em]',
                        line.accent === 'dark' ? 'text-[#60a5fa]' : 'text-[#2563EB]',
                      ].join(' ')}
                    >
                      Service Line {line.num}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-serif text-3xl leading-tight mb-4">{line.title}</h3>
                    <p
                      className={[
                        'leading-relaxed mb-6 font-light',
                        line.accent === 'dark' ? 'text-[#F8FAFC]/75' : 'text-[#475569]',
                      ].join(' ')}
                    >
                      {line.summary}
                    </p>
                    <ul className="space-y-3">
                      {line.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-3 text-sm">
                          <CheckCircle2
                            className={[
                              'mt-0.5 h-4 w-4 shrink-0',
                              line.accent === 'dark' ? 'text-[#60a5fa]' : 'text-[#2563EB]',
                            ].join(' ')}
                          />
                          <span
                            className={
                              line.accent === 'dark' ? 'text-[#F8FAFC]/85 font-medium' : 'text-[#0F172A] font-medium'
                            }
                          >
                            {outcome}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom accent bar */}
                  <div
                    className={[
                      'h-[2px] w-full mt-auto',
                      line.accent === 'dark'
                        ? 'bg-gradient-to-r from-[#2563EB]/60 to-transparent'
                        : 'bg-gradient-to-r from-[#2563EB] to-[#60a5fa] opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                    ].join(' ')}
                  />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────
            SECTION 3 — TECHNICAL COMPETENCIES
        ──────────────────────────────────────────────────────────────────── */}
        <section className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-14">

            <div className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#475569] font-bold mb-3">
                  Capability Catalog
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-[#0F172A] leading-tight">
                  Technical Competencies
                </h2>
                <div className="mt-6 w-16 h-[3px] bg-[#2563EB]" />
              </div>
              <p className="text-[#475569] text-lg font-light leading-relaxed max-w-lg">
                From AI receptionist and analyst systems to workflow automation and deployment
                reliability — our capability set is designed as one connected delivery ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {competencies.map((cap, index) => (
                <article
                  key={cap.title}
                  className={[
                    'relative flex flex-col justify-between min-h-[260px] p-8 border border-[#e2e8f0]',
                    'group hover:border-[#2563EB]/40 hover:shadow-[0_16px_32px_rgba(37,99,235,0.08)] transition-all duration-300',
                    index % 2 === 0 ? 'bg-[#F8FAFC]' : 'bg-white',
                  ].join(' ')}
                >
                  <span className="text-[10px] font-bold text-[#94a3b8] tracking-[0.18em]">
                    {cap.num}
                  </span>
                  <div>
                    <h4 className="text-xl font-bold text-[#0F172A] mb-3 leading-tight">{cap.title}</h4>
                    <p className="text-sm text-[#475569] leading-relaxed">{cap.detail}</p>
                  </div>
                  {/* Hover accent */}
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#2563EB] group-hover:w-full transition-all duration-500" />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────
            SECTION 4 — BRAND STANDARDS  (the "Why H.V.A" section)
        ──────────────────────────────────────────────────────────────────── */}
        <section className="bg-[#0F172A] text-[#F8FAFC] py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

              {/* Left: quote */}
              <motion.div
                className="lg:col-span-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-[#2563EB] text-[10px] font-bold tracking-[0.22em] uppercase mb-8">
                  Our Standard
                </p>
                <blockquote className="font-serif text-3xl md:text-4xl italic text-[#F8FAFC] leading-snug">
                  "We don't ship features.<br />
                  We ship systems that operate<br />
                  with or without you in the room."
                </blockquote>
                <div className="mt-10 h-px bg-gradient-to-r from-[#2563EB]/60 via-[#3b82f6]/40 to-transparent" />
                <p className="mt-6 text-[#F8FAFC]/55 text-sm font-light leading-relaxed max-w-md">
                  Every engagement is structured around production outcomes, not deliverable counts.
                  The goal is a system your team trusts and your business depends on.
                </p>

                {/* Stat strip */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-[#F8FAFC]/10">
                  {[
                    { v: '4+', l: 'Years Delivering' },
                    { v: '2+', l: 'Products Shipped' },
                    { v: '3', l: 'Co-Founders Engineering' },
                  ].map((s) => (
                    <div key={s.l}>
                      <p className="font-serif text-3xl text-[#2563EB]">{s.v}</p>
                      <p className="text-[#F8FAFC]/50 text-[10px] uppercase tracking-wider mt-1 font-bold">{s.l}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right: 3 principles */}
              <motion.div
                className="lg:col-span-6 space-y-8"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                {brandPrinciples.map((p, i) => (
                  <div
                    key={p.title}
                    className={[
                      'border-l-2 pl-8 py-2',
                      i === 0 ? 'border-[#2563EB]' : 'border-[#F8FAFC]/15',
                    ].join(' ')}
                  >
                    <p
                      className={[
                        'text-[10px] font-bold uppercase tracking-[0.2em] mb-2',
                        i === 0 ? 'text-[#2563EB]' : 'text-[#F8FAFC]/35',
                      ].join(' ')}
                    >
                      Rule {p.num}
                    </p>
                    <h3 className="text-2xl font-medium text-[#F8FAFC] mb-2">{p.title}</h3>
                    <p className="text-[#F8FAFC]/55 font-light text-sm leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </motion.div>

            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────
            SECTION 5 — EXECUTION FLOW
        ──────────────────────────────────────────────────────────────────── */}
        <section className="bg-white py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-14">

            <div className="text-center mb-20">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#475569] font-bold mb-4">
                Execution Flow
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-[#0F172A] leading-tight">
                How Delivery Moves to Production
              </h2>
              <p className="mt-4 text-[#475569] font-light text-lg max-w-xl mx-auto">
                The architectural lifecycle of every H.V.A engagement.
              </p>
            </div>

            {/* Step cards with connecting line */}
            <div className="relative">
              {/* Horizontal connector (desktop) */}
              <div className="hidden lg:block absolute top-[2.25rem] left-[12.5%] right-[12.5%] h-px bg-[#e2e8f0] z-0" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {deliveryFlow.map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    className="flex flex-col items-start"
                  >
                    {/* Step number circle */}
                    <div className="w-10 h-10 md:w-[4.5rem] md:h-[4.5rem] bg-[#0F172A] text-[#F8FAFC] flex items-center justify-center text-base md:text-xl font-bold font-serif mb-6 shrink-0">
                      {item.num}
                    </div>
                    <h4 className="text-2xl font-bold text-[#0F172A] mb-3">{item.step}</h4>
                    <p className="text-[#475569] text-sm leading-relaxed font-light mb-4">{item.detail}</p>
                    {/* Progress bar */}
                    <div className="w-full h-[3px] bg-[#e2e8f0] mt-auto">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#2563EB] to-[#60a5fa]"
                        initial={{ width: 0 }}
                        whileInView={{ width: item.width }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────
            SECTION 6 — CTA
        ──────────────────────────────────────────────────────────────────── */}
        <BottomCTA
          variant="dark"
          headline="Need AI agents that actually understand your business?"
          subtext="Share your operational goals and constraints. We'll propose a practical scope and delivery path you can execute with confidence."
          primaryLabel="Book a Discovery Call"
          primaryHref="/contact"
          secondaryLabel="Explore Delivered Work"
          secondaryHref="/portfolio"
        />

      </div>
    </MotionConfig>
  );
};

export default Services;
