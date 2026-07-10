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
import { HVA_LEADERSHIP } from '../lib/leadership';
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
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  outcome: string;
  phase: 'Assess' | 'Build' | 'Operate';
};

const principles: Principle[] = [
  {
    icon: <Target className="h-5 w-5" />,
    title: 'No Handoffs',
    description: 'Strategy, build, and operations stay with one accountable team.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: 'Outcomes Over Output',
    description: 'Work is judged by measurable business movement.',
  },
  {
    icon: <Globe2 className="h-5 w-5" />,
    title: 'Vertical Depth',
    description: 'Industry context shapes the system before technology choices.',
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    title: 'Founder Accountability',
    description: 'Senior decisions stay close to the people doing the work.',
  },
];

const pillars: Pillar[] = [
  {
    number: '01',
    slug: 'strategy-business',
    shortTitle: 'Strategy',
    title: 'Strategy & Business Consulting',
    description: 'Diagnose the transformation before any code is written. We redesign operating models, define AI strategy, sequence digital programs, and build the roadmap that connects business outcomes to technical execution.',
    outcome: 'Shape the operating roadmap before build starts.',
    phase: 'Assess',
  },
  {
    number: '02',
    slug: 'technology-consulting',
    shortTitle: 'Technology',
    title: 'Technology Consulting',
    description: 'Design the architecture that serves the business 3–5 years out. Enterprise blueprints, technology roadmaps, platform strategy, IT modernization, systems integration, and infrastructure redesign.',
    outcome: 'Decide the architecture and integration path.',
    phase: 'Assess',
  },
  {
    number: '03',
    slug: 'ai-data-analytics',
    shortTitle: 'AI & Data',
    title: 'AI, Data & Analytics',
    description: 'Engineer intelligence into operations. Generative AI systems, autonomous agents, machine learning, data pipelines, business intelligence, MLOps, and conversational AI on WhatsApp and web channels.',
    outcome: 'Turn data and workflows into useful intelligence.',
    phase: 'Build',
  },
  {
    number: '04',
    slug: 'software-engineering',
    shortTitle: 'Software',
    title: 'Software Engineering & Product',
    description: 'Production-grade custom software, web and mobile applications, SaaS platforms, API ecosystems, DevOps pipelines, and UX-wired frontend delivery.',
    outcome: 'Ship the product layer people actually use.',
    phase: 'Build',
  },
  {
    number: '05',
    slug: 'cloud-infrastructure',
    shortTitle: 'Cloud',
    title: 'Cloud & Infrastructure',
    description: 'AWS, Azure, and GCP migration, cloud-native architecture, Terraform-based infrastructure automation, security design, disaster recovery, and production observability.',
    outcome: 'Make the system reliable, secure, and observable.',
    phase: 'Build',
  },
  {
    number: '06',
    slug: 'operations-managed',
    shortTitle: 'Operations',
    title: 'Operations & Managed Services',
    description: 'Ongoing ownership of the systems Hive Vault Arc builds. Managed operations, application evolution, automation maintenance, IT support, and business process management — long after go-live.',
    outcome: 'Keep production improving after launch.',
    phase: 'Operate',
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
      <div className="about-hva-page relative isolate overflow-hidden bg-[#FFFFFF] text-[#1A2535]">
        <motion.div
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#E8A838] via-[#E8A838] to-[#E8A838]"
          style={{ scaleX: progressScale }}
        />
        <PageAmbientBackground className="-z-10" />

        {/* Hero Section */}
        <section className="relative px-6 pb-10 pt-24 md:pb-14 md:pt-32 lg:px-14">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 items-start gap-9 lg:grid-cols-12 lg:items-center lg:gap-12">

              {/* Left: content */}
              <motion.div
                className="lg:col-span-7 z-10"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                style={{ y: heroLift }}
              >
                <div className="mb-5 flex items-center gap-3">
                  <SectionBrandMark size="sm" />
                  <span className="inline-block text-[var(--section-label-color)] font-bold tracking-[0.22em] text-[10px] uppercase">
                    Founder-Led Technology Transformation
                  </span>
                </div>
                <h1 className="mb-6 font-serif text-[clamp(3rem,13vw,4.2rem)] font-medium leading-[1.04] tracking-tight text-[#1A2535] md:text-7xl md:leading-[1.08]">
                  We Advise. We Build.<br />
                  <em className="italic">We Operate.</em>
                </h1>
                <p className="mb-8 max-w-xl text-lg font-light leading-relaxed text-[#1A2535]/68 md:text-xl">
                  Founder-led strategy, AI engineering, software, cloud, and operations. One accountable team from first whiteboard to production.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="sharp-edge min-h-11 bg-[#1A2535] px-8 py-4 text-sm font-bold text-[#FFFFFF] transition-colors duration-300 hover:bg-[#E8A838] w-full sm:w-auto text-center"
                  >
                    Book a Call
                  </Link>
                  <Link
                    href="/case-studies"
                    className="sharp-edge inline-flex min-h-11 items-center justify-center gap-2 bg-white/90 px-8 py-4 text-sm font-bold text-[#1A2535] shadow-[0_10px_25px_rgba(232,168,56,0.08)] transition-colors duration-300 hover:bg-[#FFF7E8] w-full sm:w-auto"
                  >
                    View Case Studies
                    <Layers3 className="h-4 w-4 text-[#E8A838]" />
                  </Link>
                </div>
              </motion.div>

              {/* Right: image + floating card (part in, part out) */}
              <motion.div
                className="relative mt-1 lg:col-span-5 lg:mt-12"
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                {/* Card straddling the top-left image edge — outside overflow-hidden */}
                <div className="absolute -top-10 left-5 z-10 hidden max-w-[240px] bg-white p-6 shadow-xl lg:block">
                  <p className="text-[10px] font-bold text-[var(--section-label-color)] tracking-[0.2em] uppercase mb-2">ARC Framework</p>
                  <p className="text-lg font-serif italic text-[#1A2535] leading-snug">
                    Assess. Re-engineer. Command.
                  </p>
                </div>
                <div className="relative aspect-square w-full bg-[#ECEFF3] overflow-hidden">
                  <Image
                    src="/Images/team/hva-team-tangier-morocco.webp"
                    alt="Archival engineering workshop representing accountable systems delivery"
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
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--section-label-color)] mb-3">The ARC Loop</p>
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
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--section-label-color-dark)] mb-1">ARC Phase</p>
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
        <section id="service-map" className="about-service-map-section soft-grid-section">
          <div className="about-service-map-shell">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.35 }}
              className="about-service-map-panel"
            >
              <div className="about-service-map-copy">
                <div className="about-service-map-media">
                  <Image
                    src="/Images/capabilities/hva-arc-framework-operating-model.webp"
                    alt="ARC operating model workspace"
                    fill
                    sizes="(max-width: 1040px) 100vw, 32vw"
                    className="object-cover"
                  />
                </div>
                <div className="about-service-map-mark">
                  <SectionBrandMark size="sm" />
                  <span>What We Do</span>
                </div>
                <h2>Six pillars. One loop.</h2>
                <p>
                  Diagnose the work. Build the system. Keep it running.
                </p>
                <Link href="/capabilities#capability-pillars" className="about-service-map-link">
                  View full map <span aria-hidden="true">→</span>
                </Link>
              </div>

              <div className="about-service-map-grid">
                {pillars.map((pillar) => (
                  <Link
                    key={pillar.number}
                    href={`/capabilities/${pillar.slug}`}
                    aria-label={`View capability details for ${pillar.title}`}
                    className="about-service-map-item"
                  >
                    <span className="about-service-map-number">{pillar.number}</span>
                    <span className="about-service-map-text">
                      <span className="about-service-map-phase">{pillar.phase}</span>
                      <strong>{pillar.shortTitle}</strong>
                      <em>{pillar.outcome}</em>
                    </span>
                    <span className="about-service-map-arrow" aria-hidden="true">
                      →
                    </span>
                    <span className="sr-only">{pillar.description}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Operating Principles */}
        <section id="operating-principles" className="about-principles-section">
          <div className="about-principles-shell">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 0.35 }}
              className="about-principles-panel"
            >
              <div className="about-principles-copy">
                <div className="about-principles-mark">
                  <Workflow className="h-4 w-4" />
                  <span>Operating Principles</span>
                </div>
                <h2>Four rules for accountable delivery.</h2>
                <p>No handoff chain. No vague success metric. No detached ownership.</p>
              </div>

              <div className="about-principles-list">
                {principles.map((principle, index) => (
                  <div key={principle.title} className="about-principles-item">
                    <span className="about-principles-number">{`0${index + 1}`}</span>
                    <span className="about-principles-icon" aria-hidden="true">
                      {principle.icon}
                    </span>
                    <strong>{principle.title}</strong>
                    <em>{principle.description}</em>
                  </div>
                ))}
              </div>

              <p className="about-principles-creed">
                Complete means running, owned, and measurable.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Team Section — improved design */}
        <section className="relative px-6 lg:px-14 py-16 md:py-24 bg-[#ECEFF3]">
          <div className="container mx-auto">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <div className="mb-4 flex items-center justify-center gap-3">
                <SectionBrandMark size="sm" />
                <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--section-label-color)] uppercase">Our Team</p>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#1A2535] mb-6">
                The People Behind Hive Vault Arc
              </h2>
              <p className="text-[#1A2535]/64 leading-relaxed">
                Three co-founders. Six service pillars. One team that stays from strategy to operations. Hive Vault Arc was founded in Tangier by engineers who wanted to build transformation programs that do not fall apart after the first deployment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
              {HVA_LEADERSHIP.map((member, index) => {
                const portraitClassName =
                  member.slug === 'ali-amrani'
                    ? 'w-full h-full object-cover object-[52%_38%] scale-[1.58] group-hover:scale-[1.66] transition-transform duration-700'
                    : 'w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700';
                const profileTransitionName = `employee-profile-${member.slug}`;

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
                    <a
                      href={`/abouthva/people/${member.slug}`}
                      aria-label={`Read ${member.name}'s Hive Vault Arc profile`}
                      className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A838] focus-visible:ring-offset-4"
                    >
                      <div
                        className="relative aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700"
                        style={{ viewTransitionName: profileTransitionName } as React.CSSProperties}
                      >
                        <Image
                          src={member.image}
                          alt={`${member.name} — ${member.role} at Hive Vault Arc`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className={portraitClassName}
                        />
                      </div>
                      <div className="p-8">
                        <p className="text-[10px] font-bold text-[var(--section-label-color)] uppercase tracking-[0.18em] mb-1">{member.tag}</p>
                        <h3 className="font-serif text-2xl font-light text-[#1A2535] mb-1 transition-colors duration-200 group-hover:text-[#E8A838]">{member.name}</h3>
                        <p className="text-sm text-[#1A2535]/70">{member.role}</p>
                        <p className="mt-4 text-sm leading-relaxed text-[#1A2535]/60">{member.description}</p>
                        <span className="mt-5 inline-flex text-xs font-bold uppercase tracking-[0.16em] text-[#1A2535] transition-colors duration-200 group-hover:text-[#E8A838]">
                          Read profile →
                        </span>
                      </div>
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <BottomCTA
          variant="light"
          headline="Ready to Start Your Transformation?"
          subtext="Tell us where you are and where you need to be. Hive Vault Arc will map the right strategy, engineering, and operations path — and stay involved until the outcome is measurable."
          primaryLabel="Book a Call"
          primaryHref="/contact"
          secondaryLabel="View Our Capabilities"
          secondaryHref="/capabilities"
        />
      </div>
    </MotionConfig>
  );
};

export default About;
