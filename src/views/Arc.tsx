'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FlaskConical, Layers, Target } from 'lucide-react';
import PageAmbientBackground from '../components/PageAmbientBackground';
import BottomCTA from '../components/BottomCTA';

const pillars = [
  {
    icon: <Target className="h-6 w-6" strokeWidth={1.5} />,
    label: 'Category Thesis',
    text: 'Transformation fails when advisory and engineering are separated. ARC keeps strategy and execution in one accountable loop — from whiteboard to production.',
  },
  {
    icon: <Layers className="h-6 w-6" strokeWidth={1.5} />,
    label: 'Operating Model',
    text: 'Programs are delivered through sequenced governance: diagnosis, architecture, delivery, validation, and managed evolution. Every phase has a clear owner.',
  },
  {
    icon: <FlaskConical className="h-6 w-6" strokeWidth={1.5} />,
    label: 'Innovation Lab',
    text: 'ARC tracks emerging patterns across AI, automation, and systems design — then tests practical methods that can be shipped directly into client operations.',
  },
];

const operatingModel = [
  {
    step: '01',
    title: 'Diagnose',
    text: 'Map operating friction, decision bottlenecks, and technology constraints with leadership and functional teams.',
  },
  {
    step: '02',
    title: 'Engineer',
    text: 'Translate strategy into architecture, workflows, and software modules that can run under real production pressure.',
  },
  {
    step: '03',
    title: 'Run and Evolve',
    text: 'Stabilize, monitor, optimize, and extend systems as your business model and scale requirements change.',
  },
];

const innovationTracks = [
  'AI agents for customer and internal operations',
  'Decision intelligence and KPI reliability',
  'CRM and workflow orchestration modernization',
  'Cloud reliability and release governance',
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Arc() {
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative isolate overflow-x-hidden bg-[#F8FAFC] text-[#0F172A]">
      {/* Scroll progress */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#2563EB] via-[#60a5fa] to-[#0ea5e9]"
        style={{ scaleX: progressScale }}
      />

      <PageAmbientBackground className="-z-10" />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-14">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">
            ARC — The H.V.A Framework
          </p>
          <h1 className="font-headline text-4xl font-medium leading-[1.04] tracking-tight sm:text-5xl lg:text-[4.5rem]">
            The ARC Framework:
            <br />
            <em className="italic text-[#475569]">Category Thinking + Field Execution.</em>
          </h1>
          <p className="mt-8 max-w-2xl text-xl font-light leading-relaxed text-[#0F172A]/60">
            ARC is H.V.A's flagship transformation framework. It combines strategic clarity,
            production-grade engineering, and operational iteration so your systems keep creating value after launch.
          </p>
        </motion.div>
      </section>

      {/* ── 3 Pillars ─────────────────────────────────────────────────────── */}
      <section className="bg-[#F2F4F6] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-14">
          <motion.div
            className="grid grid-cols-1 gap-px bg-[#e2e8f0] md:grid-cols-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {pillars.map((p) => (
              <motion.article
                key={p.label}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-5 bg-[#F2F4F6] p-8 md:p-10"
              >
                <div className="flex h-11 w-11 items-center justify-center bg-[#dbeafe] text-[#2563EB]">
                  {p.icon}
                </div>
                <div>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2563EB]">
                    {p.label}
                  </p>
                  <p className="text-base leading-relaxed text-[#475569]">{p.text}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Operating Model ───────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">
              How ARC Works
            </p>
            <h2 className="font-headline text-3xl font-medium text-[#0F172A] md:text-4xl">
              Three Phases. One Accountable Loop.
            </h2>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {operatingModel.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-6 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-[#2563EB]"
              >
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#94a3b8]">
                  Phase {s.step}
                </p>
                <h3 className="font-headline text-2xl text-[#0F172A]">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Innovation Tracks ─────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="bg-[#0F172A] p-8 md:p-14"
          >
            {/* Grid texture */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  'linear-gradient(to right,rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.1) 1px,transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <div className="relative">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#60a5fa]">
                Current Innovation Tracks
              </p>
              <h2 className="font-headline text-2xl text-white md:text-3xl">
                Active Research &amp; Development Themes
              </h2>
              <ul className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
                {innovationTracks.map((track) => (
                  <li
                    key={track}
                    className="flex items-center gap-3 bg-white/5 px-5 py-4 text-sm font-medium text-white/80"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]" />
                    {track}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-6">
                <Link
                  href="/insights"
                  className="sharp-edge inline-flex items-center gap-2 bg-[#2563EB] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#1d4ed8] transition-colors duration-200"
                >
                  Explore ARC Insights
                </Link>
                <Link
                  href="/services"
                  className="sharp-edge inline-flex items-center gap-2 border border-white/20 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white/80 hover:bg-white/10 transition-colors duration-200"
                >
                  Explore Services
                </Link>
              </div>
            </div>
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
