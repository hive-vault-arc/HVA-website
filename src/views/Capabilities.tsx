'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Bot, Cloud, Database, Send, Settings, Wrench } from 'lucide-react';
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
  const [pillar0, pillar1, pillar2, pillar3, pillar4, pillar5] = CAPABILITY_BRIEF_SECTIONS;
  const capabilityCards = [
    {
      id: 'ai-data-analytics',
      title: 'AI & Data',
      image: CAPABILITY_IMAGES.aiDataAnalytics,
      alt: 'AI and data analytics production intelligence systems',
      summary: pillar2?.summary ?? '',
      href: '/capabilities/in-detail#pillar-ai-data-analytics',
      variant: 'image' as const,
    },
    {
      id: 'technology-consulting',
      title: 'Technology Consulting',
      image: CAPABILITY_IMAGES.technologyConsulting,
      alt: 'Technology consulting architecture and systems planning',
      summary: pillar1?.summary ?? '',
      href: '/capabilities/in-detail#pillar-technology-consulting',
      variant: 'image' as const,
    },
    {
      id: 'strategy-business',
      title: 'Strategy & Business',
      image: CAPABILITY_IMAGES.strategyBusiness,
      alt: 'Strategy and business consulting operating model design',
      summary: pillar0?.summary ?? '',
      href: '/capabilities/in-detail#pillar-strategy-business',
      variant: 'text' as const,
    },
    {
      id: 'software-engineering',
      title: 'Software Engineering',
      image: CAPABILITY_IMAGES.softwareEngineering,
      alt: 'Software engineering production-grade systems workspace',
      summary: pillar3?.summary ?? '',
      href: '/capabilities/in-detail#pillar-software-engineering',
      variant: 'image' as const,
    },
    {
      id: 'cloud-infrastructure',
      title: 'Cloud & Infrastructure',
      image: CAPABILITY_IMAGES.cloudInfrastructure,
      alt: 'Cloud infrastructure secure systems and observability',
      summary: pillar4?.summary ?? '',
      href: '/capabilities/in-detail#pillar-cloud-infrastructure',
      variant: 'image' as const,
    },
    {
      id: 'operations-managed',
      title: 'Operations & Managed Services',
      image: CAPABILITY_IMAGES.operationsManaged,
      alt: 'Operations and managed services monitoring workspace',
      summary: pillar5?.summary ?? '',
      href: '/capabilities/in-detail#pillar-operations-managed',
      variant: 'image' as const,
    },
  ];

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
      <section id="capability-pillars" className="capability-showcase-section scroll-mt-28">
        <div className="capability-showcase-shell">
          <motion.div
            className="capability-card-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            transition={{ staggerChildren: 0.07 }}
          >
            {capabilityCards.map((card) => (
              <motion.article
                key={card.id}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="capability-card"
              >
                <Link
                  href={card.href}
                  className="capability-card-link-shell"
                  aria-label={`View ${card.title}: ${card.summary}`}
                >
                  <div className="capability-card-image">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="capability-card-body">
                    <h3>{card.title}</h3>
                  </div>
                  <div className="capability-card-hover" aria-hidden="true">
                    <div>
                      <h3>{card.title}</h3>
                      <p>{card.summary}</p>
                    </div>
                    <span className="capability-card-hover-link">
                      Learn more <ArrowRight className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ARC OPERATING MODEL ────────────────────────────────────────────── */}
      <section id="bot-model" className="soft-grid-section scroll-mt-28 px-6 py-28 lg:px-12">
        <div className="relative mx-auto max-w-screen-2xl">

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.1 }}
            className="arc-operating-header"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.55 }} className="arc-operating-title">
              <div className="arc-operating-mark">
                <SectionBrandMark size="sm" />
                <span>ARC model</span>
              </div>
              <h2>
                Assess.
                <br />
                Build.
                <br />
                Operate.
              </h2>
            </motion.div>
            <motion.div variants={fadeUp} transition={{ duration: 0.55 }} className="arc-operating-keys">
              {['Decision gates', 'Joint ownership', 'Managed continuity'].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.35 }}
            className="arc-operating-layout"
          >
            <div className="arc-operating-rail">
              <div className="arc-operating-progress">
                <span>{activeBOTItem.step}/03</span>
                <div>
                  <motion.div
                    className="arc-operating-progress-fill"
                    animate={{ width: `${((activeBOTStep + 1) / BOT_PHASES.length) * 100}%` }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  />
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
                    className={`arc-operating-step ${isActive ? 'is-active' : ''}`}
                  >
                    <span className="arc-operating-step-icon">
                        {item.icon}
                    </span>
                    <span className="arc-operating-step-text">
                      <span>{item.step}</span>
                      <strong>{item.title}</strong>
                      <em>{item.outputs[0]}</em>
                    </span>
                  </button>
                );
              })}
            </div>

            <motion.div
              key={activeBOTItem.step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className="arc-operating-panel"
            >
              <div className="arc-operating-media">
                  <Image
                    src={activeBOTItem.image}
                    alt={activeBOTItem.imageAlt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                  />
                <div className="arc-operating-media-copy">
                  <span>Phase {activeBOTItem.step}</span>
                  <h3>{activeBOTItem.title}</h3>
                </div>
              </div>

              <div className="arc-operating-panel-copy">
                <p>{activeBOTItem.objective}</p>
                <div className="arc-operating-chip-row">
                  {activeBOTSnapshot.map((section) => (
                    <span key={section.label}>{section.primary.replace(/\.$/, '')}</span>
                  ))}
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
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="programs-header">
              <div className="programs-mark">
                <SectionBrandMark size="sm" />
                <span>Solution programs</span>
              </div>
              <h2>Choose the starting point.</h2>
              <p>Three focused programs. Each one is scoped, built, and operated with one accountable team.</p>
            </motion.div>

            <div className="programs-grid">
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
                    className="program-card"
                  >
                    <div className="program-card-media">
                      <Image
                        src={programMedia[i]!.src}
                        alt={programMedia[i]!.alt}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="program-card-body">
                      <div className="program-card-topline">
                        <span>{programIcons[i]}</span>
                        <span>Program 0{i + 1}</span>
                      </div>
                      <h3>{program.name}</h3>
                      <p>{program.summary}</p>
                      <div className="program-card-chips">
                        {program.outcomes.slice(0, 2).map((outcome) => (
                          <span key={outcome}>{outcome}</span>
                        ))}
                      </div>

                      {program.proofLinks.length > 0 && (
                        <Link
                          href={program.proofLinks[0]!}
                          className="program-card-link"
                        >
                          Case study →
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
