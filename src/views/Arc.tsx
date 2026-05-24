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
  { others: 'Advisory ends at recommendations', arc: 'ARC connects diagnosis, build, and operations in one accountable team.' },
  { others: 'Agencies hand over after launch', arc: 'ARC stays in production and improves the operating system over time.' },
  { others: 'Engineering starts before clarity', arc: 'ARC creates decision gates before expensive build decisions are locked.' },
  { others: 'Technology is treated as a project', arc: 'ARC treats systems as compounding operational assets.' },
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
              <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-[#F0C15A]">
                ARC Framework
              </span>
            </div>
            <h1 className="max-w-4xl font-headline text-[clamp(3rem,14vw,7.4rem)] font-light leading-[0.94] tracking-tight md:leading-[0.92]">
              Assess.
              <br />
              Re-engineer.
              <br />
              <em className="font-headline italic text-[#F0C15A]">Command.</em>
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
            <div className="relative h-[320px] overflow-hidden border border-white/10 bg-white/5 sm:h-[380px] lg:h-[420px]">
              <Image
                src="/Images/capabilities/hva-arc-framework-operating-model.webp"
                alt="Hive Vault Arc framework shown through calm operations screens and connected transformation stages"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2535]/85 via-[#1A2535]/35 to-[#E8A838]/10" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-7">
                <div className="grid grid-cols-3 border border-white/15 bg-[#1A2535]/70">
                  {arcPhases.map((phase) => (
                    <div key={phase.step} className="border-r border-white/10 px-3 py-4 last:border-r-0 sm:px-4 sm:py-5">
                      <span className="block text-[10px] font-mono text-[#E8A838]">{phase.step}</span>
                      <span className="mt-2 block font-headline text-lg leading-none text-white sm:text-2xl">{phase.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
          <div className="mb-10 grid grid-cols-1 gap-7 border-b border-[#DDE3EA] pb-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <div className="mb-3 flex items-center gap-3">
                <SectionBrandMark size="sm" />
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#E8A838]">
                  Engagement Method
                </p>
              </div>
              <h2 className="max-w-3xl font-headline text-4xl font-light leading-[1.02] text-[#1A2535] md:text-6xl">
                A transformation model built around decision gates.
              </h2>
            </div>
            <p className="md:col-span-5 text-base leading-relaxed text-[#566274]">
              ARC turns transformation into a governed sequence. Each phase has ownership, outputs, and a clear handoff into the next operating state.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ staggerChildren: 0.08 }}
            className="grid grid-cols-1 gap-px bg-[#DDE3EA] lg:grid-cols-3"
          >
            {arcPhases.map((phase, idx) => (
              <motion.article key={phase.step} variants={fadeUp} transition={{ duration: 0.5 }} className="bg-white">
                <div className="relative h-64 overflow-hidden bg-[#1A2535]">
                  <Image
                    src={phase.image}
                    alt={phase.imageAlt}
                    fill
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover opacity-80 transition-transform duration-500 hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A2535]/95 via-[#1A2535]/40 to-transparent" />
                  <span className="absolute left-5 top-5 bg-[#E8A838] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                    Phase {phase.step}
                  </span>
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                    <h3 className="font-headline text-4xl leading-none text-white">{phase.title}</h3>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/20 bg-white/10 text-white">
                      {phase.icon}
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-7">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8A838]">
                    {phase.layer}
                  </p>
                  <p className="min-h-[84px] text-sm leading-relaxed text-[#566274]">{phase.summary}</p>
                  <div className="mt-6 border-t border-[#DDE3EA] pt-5">
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9AA4B2]">
                      Outputs
                    </p>
                    <ul className="space-y-2">
                      {phase.owns.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-[#1A2535]">
                          <span className="mt-2 h-1 w-1 shrink-0 bg-[#E8A838]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 border border-[#DDE3EA] bg-[#FFFFFF] px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#566274]">
                    {phase.gate}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#1A2535] py-16 text-white md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,#F0C15A 0,#F0C15A 1px,transparent 0,transparent 48px),repeating-linear-gradient(90deg,#F0C15A 0,#F0C15A 1px,transparent 0,transparent 48px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-screen-2xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-5">
            <div className="mb-4 flex items-center gap-3">
              <SectionBrandMark surface="dark" size="sm" />
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#F0C15A]">
                Why ARC Is Different
              </p>
            </div>
            <h2 className="max-w-xl font-headline text-4xl font-light leading-[1.03] md:text-6xl">
              The hard part is not launching. It is staying accountable after launch.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/65">
              ARC removes the familiar fracture between advisory, build, and operations. The same partner that diagnoses the constraint is accountable for making the system work in production.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.08 }}
            className="lg:col-span-7 grid grid-cols-1 gap-px bg-white/10"
          >
            {differenceContrasts.map((item) => (
              <motion.div key={item.others} variants={fadeUp} transition={{ duration: 0.45 }} className="grid gap-4 bg-[#1A2535] p-6 md:grid-cols-[0.9fr_1.1fr] md:p-7">
                <p className="text-sm leading-relaxed text-white/40 line-through decoration-white/20">
                  {item.others}
                </p>
                <p className="font-headline text-xl leading-snug text-white md:text-2xl">
                  {item.arc}
                </p>
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

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-px bg-[#DDE3EA] px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-12">
          <div className="bg-[#1A2535] p-8 text-white md:p-10">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#F0C15A]">
              Active R&amp;D
            </p>
            <h2 className="font-headline text-4xl font-light leading-tight md:text-5xl">
              The framework keeps absorbing new technology.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/65">
              Hive Vault Arc tracks the technologies that change operating models first, then folds the useful ones into ARC delivery patterns.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ staggerChildren: 0.08 }}
            className="grid grid-cols-1 gap-px bg-[#DDE3EA] md:grid-cols-2"
          >
            {innovationTracks.map((track) => (
              <motion.article key={track.code} variants={fadeUp} transition={{ duration: 0.45 }} className="bg-white p-7">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center bg-[#FFF4D8] text-[#E8A838]">
                    {track.icon}
                  </div>
                  <span className="font-mono text-[10px] text-[#9AA4B2]">{track.code}</span>
                </div>
                <h3 className="font-headline text-2xl text-[#1A2535]">{track.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#566274]">{track.desc}</p>
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
