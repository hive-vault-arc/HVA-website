'use client';

import { type CSSProperties, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Send, Settings, Wrench } from 'lucide-react';
import PageAmbientBackground from '../components/PageAmbientBackground';
import SectionBrandMark from '../components/SectionBrandMark';
import { CAPABILITY_BRIEF_SECTIONS, CAPABILITY_SOLUTION_PROGRAM_DETAILS } from '../lib/capabilities-content';
import type { CapabilityProfile } from '../lib/capabilities';

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

const CAPABILITIES_PAGE_HERO_IMAGE = '/Images/page-heroes/hva-capabilities-hero-background.webp';

const CAPABILITIES_PAGE_LINKS = [
  { label: 'Capability Pillars', anchor: '#capability-pillars', meta: '6 pillars' },
  { label: 'Solution Programs', anchor: '#solution-programs', meta: '3 active' },
  { label: 'ARC Engagement Model', anchor: '#bot-model', meta: 'How we work' },
];

type CapabilitiesProps = {
  capabilities?: CapabilityProfile[];
};

const CARD_ORDER = [
  'ai-data-analytics',
  'technology-consulting',
  'strategy-business',
  'software-engineering',
  'cloud-infrastructure',
  'operations-managed',
];

export default function Capabilities({ capabilities = [] }: CapabilitiesProps) {
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
  const fallbackCapabilityCards = [
    {
      id: 'ai-data-analytics',
      title: 'AI & Data',
      image: CAPABILITY_IMAGES.aiDataAnalytics,
      alt: 'AI and data analytics production intelligence systems',
      summary: pillar2?.summary ?? '',
      href: '/capabilities/ai-data-analytics',
      variant: 'image' as const,
    },
    {
      id: 'technology-consulting',
      title: 'Technology Consulting',
      image: CAPABILITY_IMAGES.technologyConsulting,
      alt: 'Technology consulting architecture and systems planning',
      summary: pillar1?.summary ?? '',
      href: '/capabilities/technology-consulting',
      variant: 'image' as const,
    },
    {
      id: 'strategy-business',
      title: 'Strategy & Business',
      image: CAPABILITY_IMAGES.strategyBusiness,
      alt: 'Strategy and business consulting operating model design',
      summary: pillar0?.summary ?? '',
      href: '/capabilities/strategy-business',
      variant: 'text' as const,
    },
    {
      id: 'software-engineering',
      title: 'Software Engineering',
      image: CAPABILITY_IMAGES.softwareEngineering,
      alt: 'Software engineering production-grade systems workspace',
      summary: pillar3?.summary ?? '',
      href: '/capabilities/software-engineering',
      variant: 'image' as const,
    },
    {
      id: 'cloud-infrastructure',
      title: 'Cloud & Infrastructure',
      image: CAPABILITY_IMAGES.cloudInfrastructure,
      alt: 'Cloud infrastructure secure systems and observability',
      summary: pillar4?.summary ?? '',
      href: '/capabilities/cloud-infrastructure',
      variant: 'image' as const,
    },
    {
      id: 'operations-managed',
      title: 'Operations & Managed Services',
      image: CAPABILITY_IMAGES.operationsManaged,
      alt: 'Operations and managed services monitoring workspace',
      summary: pillar5?.summary ?? '',
      href: '/capabilities/operations-managed',
      variant: 'image' as const,
    },
  ];
  const fallbackCardById = new Map(fallbackCapabilityCards.map((card) => [card.id, card]));
  const capabilityBySlug = new Map(capabilities.map((capability) => [capability.slug, capability]));
  const capabilityCards = CARD_ORDER.map((slug) => {
    const fallback = fallbackCardById.get(slug);
    const capability = capabilityBySlug.get(slug);

    if (!capability) return fallback;

    return {
      id: capability.slug,
      title: capability.shortTitle || fallback?.title || capability.title,
      image: capability.heroImage || fallback?.image || CAPABILITY_IMAGES.aiDataAnalytics,
      alt: capability.heroImageAlt || fallback?.alt || `${capability.title} capability`,
      summary: capability.briefLine,
      href: `/capabilities/${capability.slug}`,
      variant: fallback?.variant ?? ('image' as const),
    };
  }).filter((card): card is NonNullable<typeof card> => Boolean(card));

  return (
    <div className="relative isolate overflow-x-hidden bg-[#FFFFFF] text-[#1A2535]">
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#E8A838] via-[#F0C15A] to-[#E8A838]"
        style={{ scaleX: progressScale }}
      />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="capabilities-hero"
        style={{ '--page-hero-image': `url(${CAPABILITIES_PAGE_HERO_IMAGE})` } as CSSProperties}
      >
        <PageAmbientBackground className="capabilities-hero-ambient" />
        <div aria-hidden="true" className="capabilities-hero-wash" />
        <div className="capabilities-hero-shell">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="capabilities-hero-grid"
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.65 }}
              className="capabilities-hero-copy"
            >
              <div className="capabilities-hero-mark">
                <SectionBrandMark size="sm" eager />
                <span>
                  Capabilities &amp; Mastery
                </span>
              </div>
              <h1 className="capabilities-hero-title">
                Six Pillars.
                <br />{' '}
                <em>One Accountable</em>
                <br />{' '}
                Partner.
              </h1>
              <p className="capabilities-hero-lede">
                Hive Vault Arc delivers strategy, engineering, and managed operations across six pillars, one team, one accountability loop, from discovery to production.
              </p>
              <div className="capabilities-hero-actions">
                <Link href="/capabilities/in-detail" className="sharp-edge btn-primary">
                  Explore In Detail
                </Link>
                <Link
                  href="/capabilities/solution-programs"
                  className="capabilities-hero-secondary"
                >
                  Solution Programs →
                </Link>
              </div>
            </motion.div>

            <motion.aside
              variants={fadeUp}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="capabilities-hero-aside"
            >
              <div className="capabilities-hero-wordmark">
                <strong data-label="Capabilities">
                  <span>Cap</span><span>abilities</span>
                </strong>
                <span aria-hidden="true" />
              </div>
            </motion.aside>
          </motion.div>
        </div>
      </section>

      {/* Separator */}
      <div aria-hidden="true" className="capabilities-separator" />

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
                    <h2>{card.title}</h2>
                  </div>
                  <div className="capability-card-hover" aria-hidden="true">
                    <div>
                      <p className="capability-card-hover-title">{card.title}</p>
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
      <section id="bot-model" className="capabilities-arc-section soft-grid-section scroll-mt-28 px-6 py-28 lg:px-12">
        <div className="relative mx-auto max-w-screen-2xl">

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.08 }}
            className="arc-operating-stage"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.55 }} className="arc-operating-title">
              <div className="arc-operating-mark">
                <SectionBrandMark size="sm" />
                <span>ARC model</span>
              </div>
              <h2>
                Assess.
                <br />{' '}
                Build.
                <br />{' '}
                Operate.
              </h2>
            </motion.div>
            <motion.div variants={fadeUp} transition={{ duration: 0.55 }} className="arc-operating-keys">
              {['Decision gates', 'Joint ownership', 'Managed continuity'].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </motion.div>

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

            <div className="arc-operating-actions">
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
          </motion.div>
        </div>
      </section>


      {/* ── EXPERT INSIGHT QUOTE ──────────────────────────────────────────── */}
      <section className="capabilities-quote-section px-6 lg:px-12 py-28">
        <div className="mx-auto max-w-screen-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65 }}
              className="capabilities-quote-card col-span-12 md:col-span-10 md:col-start-2 bg-[#E8EBF0] p-12 md:p-16 relative overflow-hidden"
            >
              {/* Decorative open-quote mark */}
              <div
                aria-hidden="true"
                className="absolute top-8 left-10 font-headline text-[9rem] leading-none text-[#E8A838]/10 select-none pointer-events-none"
              >
                &ldquo;
              </div>

              <div className="relative z-10 max-w-3xl">
                <h2 className="capabilities-quote-text font-headline text-3xl md:text-4xl lg:text-[2.8rem] italic leading-tight text-[#1A2535] mb-12">
                  &ldquo;Transformation succeeds when strategy, engineering, and operations move together, from the first decision to the last deployment.&rdquo;
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
                      Strategy / Consulting / Engineering / Operations
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
                const programCodes = ['A', 'B', 'C'];
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
                      <div className="program-card-media-label">
                        <span>{programCodes[i]}</span>
                        <em>PRG-00{i + 1}</em>
                      </div>
                    </div>

                    <div className="program-card-body">
                      <div className="program-card-topline">
                        <span>{program.category}</span>
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

      <section className="capabilities-depth-cta-section">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="capabilities-depth-cta"
        >
          <div className="capabilities-depth-cta-copy">
            <div className="capabilities-depth-cta-mark">
              <SectionBrandMark surface="dark" size="sm" />
              <span>Next step</span>
            </div>
            <h2>Need the full capability map with delivery depth?</h2>
            <p>
              Use In Detail for strategic context, execution model, and full sub-capability coverage across all six service pillars.
            </p>
          </div>
          <div className="capabilities-depth-cta-actions">
            <Link href="/capabilities/in-detail" className="sharp-edge btn-primary">
              Explore In Detail <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
            </Link>
            <Link href="/contact" className="capabilities-depth-cta-secondary">
              Book Discovery Call
            </Link>
          </div>
          <div className="capabilities-page-card capabilities-page-card--end">
            <p className="capabilities-page-card-title">
              On This Page
            </p>
            <nav>
              {CAPABILITIES_PAGE_LINKS.map((item) => (
                <a
                  key={item.anchor}
                  href={item.anchor}
                  className="capabilities-page-card-link"
                >
                  <span>{item.label}</span>
                  <span>{item.meta}</span>
                </a>
              ))}
            </nav>
            <Link href="/capabilities/in-detail" className="capabilities-page-card-depth">
              Full depth <ArrowRight className="h-4 w-4" strokeWidth={1.6} /> /capabilities/in-detail
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
