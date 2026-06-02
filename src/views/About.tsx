'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion';
import {
  Compass,
  Globe2,
  Layers3,
  Settings2,
  ShieldCheck,
  Target,
  Terminal,
  Workflow,
} from 'lucide-react';
import { useAnimationQuality } from '../lib/animationQuality';
import { HVA_CEO_ANSWER, HVA_CEO_ANSWER_FR, HVA_LEADERSHIP } from '../lib/leadership';
import PageAmbientBackground from '../components/PageAmbientBackground';
import BottomCTA from '../components/BottomCTA';
import SectionBrandMark from '../components/SectionBrandMark';

type Principle = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

type DeliveryStep = {
  step: string;
  icon: React.ReactNode;
  title: string;
  detail: string;
  checkpoints: string[];
};

type Pillar = {
  number: string;
  title: string;
  shortTitle: string;
  description: string;
};

const proofPoints = ['Based in Tangier, Morocco', 'Strategy · AI · Engineering · Operations', 'Serving Morocco & Europe'];

const principles: Principle[] = [
  {
    icon: <Target className="h-5 w-5" />,
    title: 'No Handoffs',
    description: 'The same team that defines strategy designs the architecture, writes the code, and operates the system. No agency-to-consultancy drift. No knowledge transfer failure.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: 'Outcomes Over Output',
    description: 'Every milestone is tied to a measurable business result. We do not ship features — we move metrics. Performance, reliability, and maintainability are built in from day one.',
  },
  {
    icon: <Globe2 className="h-5 w-5" />,
    title: 'Vertical Depth',
    description: 'We operate in defined industries — Real Estate, Healthcare, Financial Services, Logistics — because domain knowledge compounds. Generic technology advice does not.',
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    title: 'Founder Accountability',
    description: 'Hive Vault Arc is founder-led. Khalid, Ali, and Oubay are on every engagement. Decisions are made by the people who understand the full system — not escalated up a management chain.',
  },
];

const pillars: Pillar[] = [
  {
    number: '01',
    shortTitle: 'Strategy',
    title: 'Strategy & Business Consulting',
    description: 'Diagnose the transformation before any code is written. We redesign operating models, define AI strategy, sequence digital programs, and build the roadmap that connects business outcomes to technical execution.',
  },
  {
    number: '02',
    shortTitle: 'Technology',
    title: 'Technology Consulting',
    description: 'Design the architecture that serves the business 3–5 years out. Enterprise blueprints, technology roadmaps, platform strategy, IT modernization, systems integration, and infrastructure redesign.',
  },
  {
    number: '03',
    shortTitle: 'AI & Data',
    title: 'AI, Data & Analytics',
    description: 'Engineer intelligence into operations. Generative AI systems, autonomous agents, machine learning, data pipelines, business intelligence, MLOps, and conversational AI on WhatsApp and web channels.',
  },
  {
    number: '04',
    shortTitle: 'Software',
    title: 'Software Engineering & Product',
    description: 'Production-grade custom software, web and mobile applications, SaaS platforms, API ecosystems, DevOps pipelines, and UX-wired frontend delivery.',
  },
  {
    number: '05',
    shortTitle: 'Cloud',
    title: 'Cloud & Infrastructure',
    description: 'AWS, Azure, and GCP migration, cloud-native architecture, Terraform-based infrastructure automation, security design, disaster recovery, and production observability.',
  },
  {
    number: '06',
    shortTitle: 'Operations',
    title: 'Operations & Managed Services',
    description: 'Ongoing ownership of the systems Hive Vault Arc builds. Managed operations, application evolution, automation maintenance, IT support, and business process management — long after go-live.',
  },
];

const deliveryFlow: DeliveryStep[] = [
  {
    step: '01',
    icon: <Compass className="h-8 w-8" />,
    title: 'Assess',
    detail: 'Map friction, define target architecture, and sequence the transformation before a single line of code is written.',
    checkpoints: ['Define measurable outcomes', 'Audit current systems and blockers', 'Sequence strategy into milestones'],
  },
  {
    step: '02',
    icon: <Settings2 className="h-8 w-8" />,
    title: 'Re-engineer',
    detail: 'Build the systems, deploy the intelligence, and wire the infrastructure — shipped in sprint increments with full transparency.',
    checkpoints: ['Deliver AI, software, and cloud layers', 'Validate against real outcomes', 'Iterate with demos and QA loops'],
  },
  {
    step: '03',
    icon: <Terminal className="h-8 w-8" />,
    title: 'Command',
    detail: 'Stabilize, monitor, and evolve — the same team owns operations long-term. No handoff. No knowledge transfer failure.',
    checkpoints: ['Operate production systems', 'Monitor reliability and performance', 'Evolve as business requirements grow'],
  },
];

const About: React.FC = () => {
  const { motionReduced } = useAnimationQuality();
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const heroLift = useTransform(scrollYProgress, [0, 0.4], [0, -30]);
  const [activeDeliveryStep, setActiveDeliveryStep] = useState(0);
  const activeDeliveryItem = deliveryFlow[activeDeliveryStep] ?? deliveryFlow[0];

  return (
    <MotionConfig reducedMotion={motionReduced ? 'always' : 'never'}>
      <div className="relative isolate overflow-hidden bg-[#FFFFFF] text-[#1A2535]">
        <motion.div
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#E8A838] via-[#E8A838] to-[#E8A838]"
          style={{ scaleX: progressScale }}
        />
        <PageAmbientBackground className="-z-10" />

        {/* Hero Section */}
        <section className="relative pt-28 pb-10 md:pt-36 md:pb-14 px-6 lg:px-14">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left: content */}
              <motion.div
                className="lg:col-span-7 z-10"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                style={{ y: heroLift }}
              >
                <div className="mb-6 flex items-center gap-3">
                  <SectionBrandMark size="sm" />
                  <span className="inline-block text-[#E8A838] font-bold tracking-[0.22em] text-[10px] uppercase">
                    Technology Transformation Partner · Tangier, Morocco
                  </span>
                </div>
                <h1 className="mb-8 font-serif text-[clamp(3rem,13vw,4.2rem)] font-medium leading-[1.04] tracking-tight text-[#1A2535] md:text-7xl md:leading-[1.08]">
                  We Advise. We Build.<br />
                  <em className="italic">We Operate.</em>
                </h1>
                <p className="text-xl text-[#1A2535]/60 font-light max-w-xl leading-relaxed mb-10">
                  Hive Vault Arc is a technology transformation partner combining strategy consulting, AI engineering, software development, cloud infrastructure, and managed operations — delivered by one team, from first whiteboard to production. No handoffs. Same founders throughout.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="sharp-edge min-h-11 bg-[#1A2535] px-8 py-4 text-sm font-bold text-[#FFFFFF] transition-colors duration-300 hover:bg-[#E8A838] w-full sm:w-auto text-center"
                  >
                    Start Discovery
                  </Link>
                  <Link
                    href="/case-studies"
                    className="sharp-edge inline-flex min-h-11 items-center justify-center gap-2 bg-white/90 px-8 py-4 text-sm font-bold text-[#1A2535] shadow-[0_10px_25px_rgba(232,168,56,0.08)] transition-colors duration-300 hover:bg-[#FFF7E8] w-full sm:w-auto"
                  >
                    Explore Case Studies
                    <Layers3 className="h-4 w-4 text-[#E8A838]" />
                  </Link>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {proofPoints.map((point) => (
                    <span key={point} className="rounded-full bg-white/62 px-3 py-1 text-[11px] tracking-[0.13em] text-[#1A2535]/70">
                      {point}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Right: image + floating card (part in, part out) */}
              <motion.div
                className="lg:col-span-5 relative mt-20 lg:mt-12"
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                {/* Card straddling the top-left image edge — outside overflow-hidden */}
                <div className="absolute -top-10 left-5 z-10 hidden max-w-[240px] bg-white p-6 shadow-xl lg:block">
                  <p className="text-[10px] font-bold text-[#E8A838] tracking-[0.2em] uppercase mb-2">ARC Framework</p>
                  <p className="text-lg font-serif italic text-[#1A2535] leading-snug">
                    Assess. Re-engineer. Command.
                  </p>
                </div>
                <div className="relative aspect-square w-full bg-[#ECEFF3] overflow-hidden">
                  <Image
                    src="/Images/team/hva-team-tangier-morocco.webp"
                    alt="Hive Vault Arc co-founders team in Tangier, Morocco — Khalid Chalhi, Ali Amrani, Oubay Ghamat"
                    fill
                    className="object-cover w-full h-full"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    priority
                  />
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        <section className="relative px-6 lg:px-14 py-16 md:py-24 bg-[#F7F8FA]">
          <div className="container mx-auto">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.35 }}
              className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
            >
              <div className="flex items-start gap-3">
                <SectionBrandMark size="sm" className="mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E8A838] mb-3">The ARC Loop</p>
                  <h2 className="font-headline text-4xl md:text-5xl text-[#1A2535] leading-[1.02]">How We Deliver</h2>
                </div>
              </div>
              <p className="max-w-xl text-[#566274] leading-relaxed lg:text-right">
                The ARC loop — Assess, Re-engineer, Command — is not a handoff chain. It is a single continuous loop operated by the same team. Strategy informs build. Build informs operations. Operations feeds back into strategy.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.35 }}
            >
              {/* Slim progress track */}
              <div className="relative h-px w-full bg-slate-300 mb-8">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[#E8A838]"
                  animate={{ width: `${((activeDeliveryStep + 1) / deliveryFlow.length) * 100}%` }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              </div>

              {/* Step cards — separated by 1px lines */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-px bg-slate-300">
                {deliveryFlow.map((item, index) => {
                  const isActive = activeDeliveryStep === index;
                  return (
                    <button
                      key={item.step}
                      type="button"
                      onClick={() => setActiveDeliveryStep(index)}
                      onMouseEnter={() => setActiveDeliveryStep(index)}
                      onFocus={() => setActiveDeliveryStep(index)}
                      className={`relative bg-white p-8 text-left transition-all duration-300 group overflow-hidden ${
                        isActive ? 'bg-white' : 'hover:bg-[#FFFFFF]'
                      }`}
                    >
                      {/* Active top-bar */}
                      <div
                        className={`absolute top-0 left-0 right-0 h-[3px] transition-all duration-300 ${
                          isActive ? 'bg-[#E8A838]' : 'bg-transparent group-hover:bg-slate-200'
                        }`}
                      />

                      {/* Ghost step number */}
                      <p className="font-headline text-[5rem] leading-none text-[#1A2535]/[0.05] select-none mb-2 -ml-1">
                        {item.step}
                      </p>

                      {/* Icon */}
                      <div className={`mb-4 transition-colors duration-300 ${isActive ? 'text-[#E8A838]' : 'text-[#566274] group-hover:text-[#E8A838]'}`}>
                        {item.icon}
                      </div>

                      <h3 className={`font-headline text-xl leading-tight mb-2 transition-colors duration-300 ${
                        isActive ? 'text-[#1A2535]' : 'text-[#1A2535]/70'
                      }`}>
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#566274]">{item.detail}</p>
                    </button>
                  );
                })}
              </div>

              {/* Active step detail — dark panel */}
              <motion.div
                key={activeDeliveryItem.step}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="bg-[#1A2535] p-8 md:p-10"
              >
                <div className="flex flex-wrap items-start gap-x-8 gap-y-4 mb-6">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-10 w-10 items-center justify-center bg-[#E8A838] text-sm font-bold text-white font-label">
                      {activeDeliveryItem.step}
                    </span>
                    <div className="text-[#E8A838]">{activeDeliveryItem.icon}</div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8A838] mb-1">ARC Phase</p>
                    <h3 className="font-headline text-2xl text-white">{activeDeliveryItem.title}</h3>
                  </div>
                </div>
                <p className="text-[#9AA4B2] max-w-2xl leading-relaxed mb-6">{activeDeliveryItem.detail}</p>
                <ul className="grid grid-cols-1 gap-3 md:grid-cols-3 border-t border-white/10 pt-6">
                  {activeDeliveryItem.checkpoints.map((checkpoint) => (
                    <li key={checkpoint} className="flex items-start gap-3 text-sm text-[#C8CED7]">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#E8A838]" />
                      <span>{checkpoint}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Six Service Pillars */}
        <section className="relative px-6 lg:px-14 py-16 md:py-24 bg-white">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.35 }}
              className="mb-14"
            >
              <div className="mb-3 flex items-center gap-3">
                <SectionBrandMark size="sm" />
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E8A838]">What We Do</p>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#1A2535] leading-tight max-w-xl">
                  Six Integrated<br />Service Pillars
                </h2>
                <p className="max-w-md text-[#1A2535]/60 leading-relaxed lg:text-right">
                  These are not separate departments. They are phases of the same transformation loop — applied in full or in part depending on where the client is.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#ECEFF3]">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.number}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="bg-[#FFFFFF] p-8 group hover:bg-white transition-colors duration-300"
                >
                  <p className="font-headline text-[4rem] leading-none text-[#1A2535]/[0.05] select-none mb-4 -ml-1">
                    {pillar.number}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8A838] mb-2">{pillar.shortTitle}</p>
                  <h3 className="font-serif text-xl font-medium text-[#1A2535] mb-4 leading-snug">{pillar.title}</h3>
                  <p className="text-sm text-[#1A2535]/64 leading-relaxed">{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Operating Principles — redesigned */}
        <section className="relative px-6 lg:px-14 py-16 md:py-24">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

              {/* Left: heading + bordered rules */}
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-3 mb-6">
                  <Workflow className="h-5 w-5 text-[#E8A838]" />
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#1A2535]/58">Operating Principles</p>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#1A2535] mb-12 leading-tight">
                  Four Non-Negotiables<br />of Transformation
                </h2>
                <div className="space-y-10">
                  {principles.map((principle, index) => (
                    <motion.div
                      key={principle.title}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.38, delay: index * 0.08 }}
                      className={`border-l-2 pl-8 py-2 ${
                        index === 0 ? 'border-[#E8A838]' : 'border-[#1A2535]/20'
                      }`}
                    >
                      <h4 className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ${
                        index === 0 ? 'text-[#E8A838]' : 'text-[#1A2535]/45'
                      }`}>
                        {`Rule 0${index + 1}`}
                      </h4>
                      <h3 className="text-2xl font-medium text-[#1A2535] mb-3">{principle.title}</h3>
                      <p className="text-[#1A2535]/64 font-light leading-relaxed">{principle.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right: dark quote card */}
              <motion.div
                className="lg:col-span-7"
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative min-h-[320px] md:min-h-[480px] bg-[#1A2535] overflow-hidden flex flex-col justify-end">
                  <div className="pointer-events-none absolute -right-20 -top-16 h-52 w-52 rounded-full bg-[#E8A838]/35 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-20 left-[8%] h-56 w-56 rounded-full bg-[#E8A838]/20 blur-3xl" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E8A838]/50 to-transparent" />
                  <div className="relative z-10 p-10 md:p-14">
                    <p className="text-[#E8A838] text-[10px] font-bold tracking-[0.24em] uppercase mb-8">
                      Hive Vault Arc Core Creed
                    </p>
                    <blockquote className="font-serif text-2xl md:text-3xl italic text-[#FFFFFF] leading-snug mb-8">
                      "Real technology transformation is only complete when the systems are running, the team has handed off nothing, and the outcomes are measurable."
                    </blockquote>
                    <div className="h-px bg-gradient-to-r from-[#E8A838]/60 via-[#E8A838]/40 to-transparent mb-8" />
                    <p className="text-[#FFFFFF]/90 text-sm font-light leading-relaxed max-w-md">
                      Four non-negotiables that shape every engagement — from the first strategy session to the last infrastructure alert.
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Team Section — improved design */}
        <section className="relative px-6 lg:px-14 py-16 md:py-24 bg-[#ECEFF3]">
          <div className="container mx-auto">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <div className="mb-4 flex items-center justify-center gap-3">
                <SectionBrandMark size="sm" />
                <p className="text-[10px] font-bold tracking-[0.2em] text-[#1A2535]/58 uppercase">Our Team</p>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#1A2535] mb-6">
                The People Behind Hive Vault Arc
              </h2>
              <p className="text-[#1A2535]/64 leading-relaxed">
                Three co-founders. Six service pillars. One team that stays from strategy to operations. Hive Vault Arc was founded in Tangier by engineers who wanted to build transformation programs that do not fall apart after the first deployment.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-[#1A2535]/64">
                {HVA_CEO_ANSWER} In French: {HVA_CEO_ANSWER_FR}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
              {HVA_LEADERSHIP.map((member, index) => {
                const portraitClassName =
                  member.slug === 'ali-amrani'
                    ? 'w-full h-full object-cover object-[52%_38%] scale-[1.58] group-hover:scale-[1.66] transition-transform duration-700'
                    : 'w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700';

                return (
                  <motion.div
                    id={member.slug}
                    key={member.name}
                    className="group scroll-mt-28 bg-[#FFFFFF]"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.05 }}
                    transition={{ duration: 0.35, delay: index * 0.07 }}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                      <Image
                        src={member.image}
                        alt={`${member.name} — ${member.role} at Hive Vault Arc`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className={portraitClassName}
                      />
                    </div>
                    <div className="p-8">
                      <p className="text-[10px] font-bold text-[#E8A838] uppercase tracking-[0.18em] mb-1">{member.tag}</p>
                      <h3 className="font-serif text-2xl font-light text-[#1A2535] mb-1">{member.name}</h3>
                      <p className="text-sm text-[#1A2535]/70">{member.role}</p>
                      <p className="mt-1 text-xs text-[#1A2535]/55">{member.frenchRole}</p>
                      <p className="mt-4 text-sm leading-relaxed text-[#1A2535]/60">{member.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <BottomCTA
          variant="dark"
          headline="Ready to Start Your Transformation?"
          subtext="Tell us where you are and where you need to be. Hive Vault Arc will map the right strategy, engineering, and operations path — and stay involved until the outcome is measurable."
          primaryLabel="Book a Discovery Call"
          primaryHref="/contact"
          secondaryLabel="View Our Capabilities"
          secondaryHref="/capabilities"
        />
      </div>
    </MotionConfig>
  );
};

export default About;
