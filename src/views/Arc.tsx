'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BarChart3, Bot, Cloud, Database, Send, Settings, Wrench } from 'lucide-react';
import BottomCTA from '../components/BottomCTA';
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
  { title: 'One team', text: 'Diagnosis, build, and operations stay connected.' },
  { title: 'Production ownership', text: 'The system keeps improving after launch.' },
  { title: 'Decision gates', text: 'Build decisions wait until constraints are clear.' },
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
  {
    code: 'ARC-004',
    icon: <Cloud className="h-5 w-5" strokeWidth={1.5} />,
    title: 'Cloud Governance',
    desc: 'Secure deployment foundations built for scale, observability, and control.',
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

      <section className="relative overflow-hidden bg-[#FFFFFF] px-6 pb-16 pt-36 text-white lg:px-12 lg:pb-20">
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 top-28 bg-[#1A2535]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 top-28 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(to right,#F0C15A 1px,transparent 1px),linear-gradient(to bottom,#F0C15A 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-screen-2xl grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.65 }}
            className="lg:col-span-7"
          >
            <div className="mb-6 flex items-center gap-3">
              <SectionBrandMark surface="dark" size="sm" />
              <span className="arc-hero-label">
                ARC framework
              </span>
            </div>
            <h1 className="arc-hero-title">
              <span>Assess.</span>
              <span>Re-engineer.</span>
              <span>Command.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/70">
              Hive Vault Arc's operating model for transformation work: strategy, AI engineering, software delivery, cloud, and managed operations in one continuous accountability loop.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/contact" className="sharp-edge inline-flex min-h-11 items-center justify-center bg-[#E8A838] px-7 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#C8891C] w-full sm:w-auto">
                Book Discovery Call
              </Link>
              <Link href="/capabilities" className="inline-flex min-h-11 items-center gap-2 border-b border-white/25 pb-1 text-sm font-bold uppercase tracking-[0.14em] text-white/80 transition-colors hover:border-[#F0C15A] hover:text-white">
                View Capabilities <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="lg:col-span-5"
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
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,#F0C15A 0,#F0C15A 1px,transparent 0,transparent 48px),repeating-linear-gradient(90deg,#F0C15A 0,#F0C15A 1px,transparent 0,transparent 48px)',
            backgroundSize: '48px 48px',
          }}
        />

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
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-[#FFFFFF] py-16 md:py-20">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
          <div className="mb-10 grid grid-cols-1 gap-7 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <div className="mb-3 flex items-center gap-3">
                <SectionBrandMark size="sm" />
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#E8A838]">
                  Proof In Production
                </p>
              </div>
              <h2 className="font-headline text-4xl font-light leading-[1.02] text-[#1A2535] md:text-6xl">
                ARC shows up where systems carry real operating load.
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="max-w-xl text-base leading-relaxed text-[#566274]">
                The model is designed for production environments - measurable work, governed handoffs, and practical systems that teams actually use.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {proofCards.map((card, idx) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative h-[360px] overflow-hidden bg-[#1A2535]"
              >
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2535]/95 via-[#1A2535]/45 to-transparent" />
                <span className="absolute left-5 top-5 bg-white/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-white ring-1 ring-white/15">
                  {card.label}
                </span>
                <span className="absolute right-5 top-5 font-mono text-[10px] text-white/55">0{idx + 1}</span>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-headline text-3xl leading-tight text-white">{card.title}</h3>
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/60">{card.metric}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="arc-rd-section">
        <div className="arc-rd-shell">
          <div className="arc-rd-header">
            <span>Active R&amp;D</span>
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
