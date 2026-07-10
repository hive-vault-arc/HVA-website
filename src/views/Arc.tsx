'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BarChart3, Bot, Database, GitBranch, Send, Settings, ShieldCheck, UsersRound, Wrench } from 'lucide-react';
import BottomCTA from '../components/BottomCTA';
import PageAmbientBackground from '../components/PageAmbientBackground';
import SectionBrandMark from '../components/SectionBrandMark';

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

const arcPhases = [
  {
    step: '01',
    title: 'Assess',
    layer: 'Strategy and architecture',
    icon: <Wrench className="h-5 w-5" strokeWidth={1.5} />,
    image: '/Images/capabilities/hva-arc-assess-operating-model.webp',
    imageAlt: 'Consulting team assessing operating constraints and transformation priorities',
    summary:
      'Map the current operation, expose constraints, and define the target architecture before build scope begins.',
    short: 'Diagnose constraints before build.',
    owns: ['Operating diagnosis', 'Constraint map', 'Prioritized roadmap'],
    gate: 'Decision gate before build',
  },
  {
    step: '02',
    title: 'Re-engineer',
    layer: 'AI, software, and cloud',
    icon: <Settings className="h-5 w-5" strokeWidth={1.5} />,
    image: '/Images/capabilities/hva-arc-reengineer-operating-model.webp',
    imageAlt: 'Engineering workspace for re-engineering systems and operating workflows',
    summary:
      'Turn the roadmap into production systems, integrated workflows, release controls, and reliable infrastructure.',
    short: 'Build the operating system.',
    owns: ['Solution architecture', 'Integrated stack', 'Release controls'],
    gate: 'Production readiness',
  },
  {
    step: '03',
    title: 'Command',
    layer: 'Operate and evolve',
    icon: <Send className="h-5 w-5" strokeWidth={1.5} />,
    image: '/Images/capabilities/hva-arc-command-operating-model.webp',
    imageAlt: 'Managed operations room monitoring production systems and performance',
    summary:
      'Run the operation after launch with monitoring, optimization cycles, reporting, and managed accountability.',
    short: 'Operate, measure, improve.',
    owns: ['Managed operations', 'Performance reporting', 'Optimization releases'],
    gate: 'Continuous improvement',
  },
];

const proofCards = [
  {
    title: 'Customer Operations Engine',
    label: 'System built',
    metric: 'Zero manual intervention',
    image: '/Images/home/proof-in-production/customer-operations-engine-live-deployment.webp',
    alt: 'Customer operations engine dashboard and workflow system in production',
  },
  {
    title: 'Revenue Control Module',
    label: 'Live deployment',
    metric: '94 active users',
    image: '/Images/home/proof-in-production/revenue-control-module-live-operations.webp',
    alt: 'Revenue control module interface for live business operations',
  },
  {
    title: 'Quantified Results',
    label: 'Measured outcomes',
    metric: 'Manual triage down 85%',
    image: '/Images/home/proof-in-production/quantified-results-growth-dashboard.webp',
    alt: 'Quantified business results and growth metrics visualization',
  },
];

const differenceContrasts = [
  {
    title: 'One team',
    text: 'Diagnosis, build, and operations stay connected.',
    icon: <UsersRound className="h-7 w-7" strokeWidth={1.4} />,
  },
  {
    title: 'Production ownership',
    text: 'The system keeps improving after launch.',
    icon: <ShieldCheck className="h-7 w-7" strokeWidth={1.4} />,
  },
  {
    title: 'Decision gates',
    text: 'Build decisions wait until constraints are clear.',
    icon: <GitBranch className="h-7 w-7" strokeWidth={1.4} />,
  },
];

const innovationTracks = [
  {
    code: 'ARC-001',
    icon: <Bot className="h-5 w-5" strokeWidth={1.5} />,
    title: 'AI Agents',
    desc: 'Autonomous workflow layers for customer and internal operations.',
  },
  {
    code: 'ARC-002',
    icon: <BarChart3 className="h-5 w-5" strokeWidth={1.5} />,
    title: 'Decision Intel',
    desc: 'Analytics pipelines that turn operating telemetry into executive decisions.',
  },
  {
    code: 'ARC-003',
    icon: <Database className="h-5 w-5" strokeWidth={1.5} />,
    title: 'Modern CRM',
    desc: 'Customer systems designed around intent, revenue control, and lifetime value.',
  },
];

export default function Arc() {
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative isolate overflow-x-clip bg-[#FFFFFF] text-[#1A2535]">
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-[#E8A838]"
        style={{ scaleX: progressScale }}
      />

      <section className="arc-hero-section">
        <PageAmbientBackground className="arc-hero-ambient" />
        <div aria-hidden="true" className="arc-hero-light-wash" />

        <div className="arc-hero-shell">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.65 }}
            className="arc-hero-copy"
          >
            <div className="mb-6 flex items-center gap-3">
              <SectionBrandMark size="sm" />
              <span className="arc-hero-label">
                ARC framework
              </span>
            </div>
            <h1 className="arc-hero-title">
              <span>Assess.</span>{' '}
              <span>Re-engineer.</span>{' '}
              <span>Command.</span>
            </h1>
            <p className="arc-hero-lede">
              Hive Vault Arc's operating model for transformation work: strategy, AI engineering, software delivery, cloud, and managed operations in one continuous accountability loop.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/contact" className="arc-hero-primary">
                Book Discovery Call
              </Link>
              <Link href="/capabilities" className="arc-hero-secondary">
                View Capabilities <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="arc-hero-media-wrap"
          >
            <div className="arc-hero-media">
              <Image
                src="/Images/capabilities/hva-arc-framework-operating-model.webp"
                alt="Hive Vault Arc framework shown through calm operations screens and connected transformation stages"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="arc-method-section">
        <div className="arc-method-shell">
          <div className="arc-method-header">
            <div className="arc-method-mark">
              <SectionBrandMark size="sm" />
              <span>ARC method</span>
            </div>
            <h2>Three gates. One loop.</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ staggerChildren: 0.08 }}
            className="arc-method-grid"
          >
            {arcPhases.map((phase, idx) => (
              <motion.article key={phase.step} variants={fadeUp} transition={{ duration: 0.5 }} className="arc-method-card">
                <div className="arc-method-image">
                  <Image
                    src={phase.image}
                    alt={phase.imageAlt}
                    fill
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>

                <div className="arc-method-content">
                  <div>
                    <h3>{phase.title}</h3>
                    <p>{phase.short}</p>
                  </div>
                  <div className="arc-method-meta">
                    <span>{phase.layer}</span>
                    <strong>{phase.gate}</strong>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="arc-difference-section">
        <div aria-hidden="true" className="arc-dark-grid" />

        <div className="arc-difference-shell">
          <div className="arc-difference-copy">
            <div className="arc-difference-mark">
              <SectionBrandMark surface="dark" size="sm" />
              <span>Why ARC is different</span>
            </div>
            <h2>
              Accountability after launch.
            </h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.08 }}
            className="arc-difference-grid"
          >
            {differenceContrasts.map((item) => (
              <motion.div key={item.title} variants={fadeUp} transition={{ duration: 0.45 }} className="arc-difference-card">
                <span className="arc-difference-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="arc-proof-section">
        <div className="arc-proof-shell">
          <div className="arc-proof-header">
            <div>
              <div className="arc-proof-mark">
                <SectionBrandMark size="sm" />
                <p>
                  Proof In Production
                </p>
              </div>
              <h2>
                ARC shows up where systems carry real operating load.
              </h2>
            </div>
            <div>
              <p>
                The model is designed for production environments - measurable work, governed handoffs, and practical systems that teams actually use.
              </p>
            </div>
          </div>

          <div className="arc-proof-grid">
            {proofCards.map((card, idx) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="arc-proof-card group"
              >
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="arc-proof-overlay" />
                <span className="arc-proof-label">
                  {card.label}
                </span>
                <span className="arc-proof-number">0{idx + 1}</span>
                <div className="arc-proof-copy">
                  <h3>{card.title}</h3>
                  <p>{card.metric}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="arc-rd-section">
        <div className="arc-rd-shell">
          <div className="arc-rd-panel">
            <div className="arc-rd-header">
              <div className="arc-rd-mark">
                <SectionBrandMark surface="dark" size="sm" />
                <span>Active R&amp;D</span>
              </div>
              <h2>New technology, filtered into delivery patterns.</h2>
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ staggerChildren: 0.08 }}
              className="arc-rd-grid"
            >
              {innovationTracks.map((track) => (
                <motion.article key={track.code} variants={fadeUp} transition={{ duration: 0.45 }} className="arc-rd-item">
                  <div className="arc-rd-icon" aria-hidden="true">
                    {track.icon}
                  </div>
                  <div>
                    <h3>{track.title}</h3>
                    <p>{track.desc}</p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
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
