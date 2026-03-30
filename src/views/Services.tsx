'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bot, Code2, Database, Target } from 'lucide-react';
import PageAmbientBackground from '../components/PageAmbientBackground';
import BottomCTA from '../components/BottomCTA';
import { ENGAGEMENT_STEPS, SERVICE_BRIEF_SECTIONS, SOLUTION_PROGRAM_DETAILS } from '../lib/services-content';

const FEATURED_PROGRAMS = SOLUTION_PROGRAM_DETAILS.slice(0, 3);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function getPillarIcon(id: string) {
  const cls = 'h-5 w-5';
  const sw = 1.5;
  switch (id) {
    case 'strategy':      return <Target className={cls} strokeWidth={sw} />;
    case 'ai-automation': return <Bot className={cls} strokeWidth={sw} />;
    case 'engineering':   return <Code2 className={cls} strokeWidth={sw} />;
    default:              return <Database className={cls} strokeWidth={sw} />;
  }
}

export default function Services() {
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative isolate overflow-x-hidden bg-[#F8FAFC] text-[#0F172A]">
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#2563EB] via-[#60a5fa] to-[#0ea5e9]"
        style={{ scaleX: progressScale }}
      />

      <PageAmbientBackground className="-z-10" />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">
            Strategy · Consulting · Engineering
          </p>

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            {/* Left — headline + CTAs */}
            <div className="lg:col-span-8">
              <h1 className="font-headline text-4xl font-medium leading-[1.04] tracking-tight sm:text-5xl lg:text-[4.5rem]">
                Strategy, Consulting, and Engineering
                <br />
                <em className="italic text-[#475569]">in One Loop.</em>
              </h1>
              <p className="mt-8 max-w-2xl text-xl font-light leading-relaxed text-[#0F172A]/60">
                H.V.A leads digital transformation programs from advisory to production operations,
                then stays accountable through maintenance and optimization.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/services/solution-programs"
                  className="sharp-edge inline-flex items-center gap-2 bg-[#2563EB] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#1d4ed8] transition-colors duration-200"
                >
                  View Solution Programs
                </Link>
                <Link
                  href="/services/in-detail"
                  className="text-sm font-bold uppercase tracking-wide text-[#2563EB] hover:text-[#1d4ed8] transition-colors duration-200"
                >
                  Explore In Detail →
                </Link>
              </div>
            </div>

            {/* Right — what this page covers panel */}
            <aside className="lg:col-span-4 lg:self-end">
              <div className="bg-[#F2F4F6] p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#94a3b8]">
                  What This Page Covers
                </p>
                <ul className="mt-4 space-y-2.5">
                  {[
                    'High-level service pillars',
                    'Solution programs preview',
                    'How engagement works in practice',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-[#475569]">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </motion.div>
      </section>

      {/* ── Service Pillars ───────────────────────────────────────────────── */}
      <section className="bg-[#F2F4F6] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">
                Service Pillars
              </p>
              <h2 className="font-headline text-3xl font-medium text-[#0F172A] md:text-4xl">
                A concise view of how we deliver.
              </h2>
            </div>
            <div aria-hidden="true" className="hidden h-[2px] w-20 shrink-0 bg-[#2563EB] md:block" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-px bg-[#e2e8f0] md:grid-cols-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.08 }}
          >
            {SERVICE_BRIEF_SECTIONS.map((pillar) => (
              <motion.article
                key={pillar.id}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="flex flex-col bg-white p-8 md:p-10"
              >
                {/* Icon */}
                <div className="mb-5 flex h-11 w-11 items-center justify-center bg-[#dbeafe] text-[#2563EB]">
                  {getPillarIcon(pillar.id)}
                </div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#94a3b8]">
                  Service Pillar
                </p>
                <h3 className="font-headline text-2xl text-[#0F172A]">{pillar.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-[#475569]">{pillar.summary}</p>
                <ul className="mt-5 space-y-1.5">
                  {pillar.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#2563EB]"
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-[#2563EB]" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Solution Programs (Bento) ─────────────────────────────────────── */}
      <section id="solution-programs" className="py-20 scroll-mt-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">
                Solution Programs
              </p>
              <h2 className="font-headline text-3xl font-medium text-[#0F172A] md:text-4xl">
                Program snapshots you can deploy and adapt.
              </h2>
            </div>
            <Link
              href="/services/solution-programs"
              className="whitespace-nowrap text-sm font-bold uppercase tracking-wide text-[#2563EB] hover:text-[#1d4ed8] transition-colors duration-200"
            >
              See full program catalog →
            </Link>
          </motion.div>

          {/* Bento grid — 12-column */}
          <div className="grid grid-cols-1 gap-px bg-[#e2e8f0] lg:grid-cols-12">

            {/* ── Large featured card (col-span-8) ── */}
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55 }}
              className="flex min-h-[320px] flex-col justify-between bg-white p-10 md:p-12 lg:col-span-8"
            >
              <div>
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2563EB]">
                  {FEATURED_PROGRAMS[0]?.category ?? 'Accelerated Path'}
                </p>
                <h3 className="font-headline text-4xl leading-[1.08] text-[#0F172A]">
                  {FEATURED_PROGRAMS[0]?.name}
                </h3>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#475569]">
                  {FEATURED_PROGRAMS[0]?.summary}
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/services/solution-programs"
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#2563EB] hover:text-[#1d4ed8] transition-colors duration-200"
                >
                  View Scope →
                </Link>
              </div>
            </motion.article>

            {/* ── Small card (col-span-4) ── */}
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="flex flex-col justify-between bg-[#F2F4F6] p-8 md:p-10 lg:col-span-4"
            >
              <div>
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#94a3b8]">
                  {FEATURED_PROGRAMS[1]?.category ?? 'Program'}
                </p>
                <h3 className="font-headline text-2xl text-[#0F172A]">{FEATURED_PROGRAMS[1]?.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#475569]">{FEATURED_PROGRAMS[1]?.summary}</p>
              </div>
              <Link
                href="/services/solution-programs"
                className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB] hover:text-[#1d4ed8] transition-colors duration-200"
              >
                Learn More →
              </Link>
            </motion.article>

            {/* ── Wide dark card (col-span-12) ── */}
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="relative overflow-hidden bg-[#0F172A] p-10 md:p-12 lg:col-span-12"
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
              <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <div>
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#60a5fa]">
                    {FEATURED_PROGRAMS[2]?.category ?? 'Program'}
                  </p>
                  <h3 className="font-headline text-3xl text-white">{FEATURED_PROGRAMS[2]?.name}</h3>
                  <p className="mt-4 text-base leading-relaxed text-white/60">{FEATURED_PROGRAMS[2]?.summary}</p>
                  <Link
                    href="/services/solution-programs"
                    className="sharp-edge mt-8 inline-flex items-center gap-2 bg-[#2563EB] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#1d4ed8] transition-colors duration-200"
                  >
                    Start Assessment
                  </Link>
                </div>
                {(FEATURED_PROGRAMS[2]?.outcomes?.length ?? 0) > 0 && (
                  <ul className="space-y-2">
                    {FEATURED_PROGRAMS[2].outcomes.slice(0, 3).map((outcome) => (
                      <li
                        key={outcome}
                        className="flex items-center gap-3 bg-white/5 px-5 py-3.5 text-sm text-white/75"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      {/* ── Engagement Steps ──────────────────────────────────────────────── */}
      <section className="bg-[#F2F4F6] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">
              How Engagement Works
            </p>
            <h2 className="font-headline text-3xl font-medium text-[#0F172A] md:text-4xl">
              Four steps from diagnosis to operating impact.
            </h2>
          </motion.div>

          <div className="relative">
            {/* Decorative horizontal connector line */}
            <div
              aria-hidden="true"
              className="absolute top-8 left-0 right-0 hidden h-px bg-[#e2e8f0] lg:block"
            />
            <div className="grid grid-cols-1 gap-px bg-[#e2e8f0] md:grid-cols-2 lg:grid-cols-4">
              {ENGAGEMENT_STEPS.map((step, i) => (
                <motion.article
                  key={step.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative bg-[#F2F4F6] p-8 pt-14 md:p-10 md:pt-16"
                >
                  {/* Large decorative italic number */}
                  <p
                    aria-hidden="true"
                    className="absolute top-2 left-5 select-none font-headline text-[4.5rem] italic leading-none text-[#e2e8f0]"
                  >
                    {step.step}
                  </p>
                  <h3 className="relative z-10 mb-3 font-headline text-2xl text-[#0F172A]">
                    {step.title}
                  </h3>
                  <p className="relative z-10 text-sm leading-relaxed text-[#475569]">{step.detail}</p>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/services/solution-programs"
              className="sharp-edge inline-flex items-center gap-2 bg-[#2563EB] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#1d4ed8] transition-colors duration-200"
            >
              View Solution Programs
            </Link>
            <Link
              href="/services/in-detail"
              className="text-sm font-bold uppercase tracking-wide text-[#2563EB] hover:text-[#1d4ed8] transition-colors duration-200"
            >
              Explore In Detail →
            </Link>
          </div>
        </div>
      </section>

      <BottomCTA
        variant="dark"
        headline="Need a transformation scope before implementation?"
        subtext="Book a discovery call and we will map services, solution programs, and delivery sequence for your context."
        primaryLabel="Book Discovery Call"
        primaryHref="/contact"
        secondaryLabel="View Case Studies"
        secondaryHref="/case-studies"
      />
    </div>
  );
}
