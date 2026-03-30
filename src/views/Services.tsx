'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bot, Briefcase, Building2, ChartColumn, Cpu, Shield, Sparkles, Wrench } from 'lucide-react';
import PageAmbientBackground from '../components/PageAmbientBackground';
import BottomCTA from '../components/BottomCTA';
import { BOT_DELIVERY_MODEL, SERVICE_BRIEF_SECTIONS, SOLUTION_PROGRAM_DETAILS } from '../lib/services-content';

const FEATURED_PROGRAMS = SOLUTION_PROGRAM_DETAILS.slice(0, 3);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function getPillarIcon(id: string) {
  const cls = 'h-5 w-5';
  const sw = 1.6;

  switch (id) {
    case 'ai-systems':
      return <Bot className={cls} strokeWidth={sw} />;
    case 'business-transformation':
      return <Building2 className={cls} strokeWidth={sw} />;
    case 'digital-technology-data':
      return <Briefcase className={cls} strokeWidth={sw} />;
    case 'consulting':
      return <Wrench className={cls} strokeWidth={sw} />;
    case 'engineering':
      return <Cpu className={cls} strokeWidth={sw} />;
    case 'data-growth':
      return <ChartColumn className={cls} strokeWidth={sw} />;
    case 'cybersecurity-risk':
      return <Shield className={cls} strokeWidth={sw} />;
    default:
      return <Sparkles className={cls} strokeWidth={sw} />;
  }
}

export default function Services() {
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative isolate overflow-x-hidden bg-[#F8FAFC] text-[#0F172A]">
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#2563EB] via-[#60a5fa] to-[#0ea5e9]"
        style={{ scaleX: progressScale }}
      />

      <PageAmbientBackground className="-z-10" />

      <section className="mx-auto max-w-7xl px-6 pt-32 pb-16 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12"
        >
          <div className="lg:col-span-8">
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">
              Strategy · Consulting · Engineering
            </p>
            <h1 className="font-headline text-4xl font-medium leading-[1.04] tracking-tight sm:text-5xl lg:text-[4.2rem]">
              Service Coverage at a Glance.
              <br />
              <em className="italic text-[#475569]">Built for fast decision-making.</em>
            </h1>
            <p className="mt-7 max-w-2xl text-xl font-light leading-relaxed text-[#0F172A]/60">
              This page gives a concise service scan. Full execution depth lives in In Detail.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/services/in-detail"
                className="sharp-edge inline-flex items-center gap-2 bg-[#2563EB] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-[#1d4ed8]"
              >
                Explore In Detail
              </Link>
              <Link
                href="/services/solution-programs"
                className="text-sm font-bold uppercase tracking-wide text-[#2563EB] transition-colors duration-200 hover:text-[#1d4ed8]"
              >
                View Solution Programs →
              </Link>
            </div>
          </div>

          <aside className="lg:col-span-4 lg:self-end">
            <div className="bg-[#F2F4F6] p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#94a3b8]">Quick Orientation</p>
              <ul className="mt-4 space-y-2.5">
                {['8 service pillars', 'Program preview', 'BOT engagement model'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#475569]">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </motion.div>
      </section>

      <section className="bg-[#F2F4F6] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">Service Pillars</p>
              <h2 className="font-headline text-3xl font-medium text-[#0F172A] md:text-4xl">Eight concise service domains.</h2>
            </div>
            <div aria-hidden="true" className="hidden h-[2px] w-20 shrink-0 bg-[#2563EB] md:block" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-px bg-[#e2e8f0] md:grid-cols-2 xl:grid-cols-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.06 }}
          >
            {SERVICE_BRIEF_SECTIONS.map((pillar) => (
              <motion.article key={pillar.id} variants={fadeUp} transition={{ duration: 0.45 }} className="flex flex-col bg-white p-7">
                <div className="mb-4 flex h-10 w-10 items-center justify-center bg-[#dbeafe] text-[#2563EB]">
                  {getPillarIcon(pillar.id)}
                </div>
                <h3 className="font-headline text-2xl leading-tight text-[#0F172A]">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">{pillar.summary}</p>
                <ul className="mt-4 space-y-1.5">
                  {pillar.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#2563EB]">
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

      <section id="solution-programs" className="scroll-mt-36 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-14">
          <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">Solution Programs</p>
              <h2 className="font-headline text-3xl font-medium text-[#0F172A] md:text-4xl">Program snapshots, not full scope.</h2>
            </div>
            <Link
              href="/services/solution-programs"
              className="text-sm font-bold uppercase tracking-wide text-[#2563EB] transition-colors duration-200 hover:text-[#1d4ed8]"
            >
              See full program catalog →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-px bg-[#e2e8f0] md:grid-cols-3">
            {FEATURED_PROGRAMS.map((program) => (
              <article key={program.slug} className="bg-white p-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94a3b8]">{program.category}</p>
                <h3 className="mt-2 font-headline text-2xl leading-tight text-[#0F172A]">{program.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">{program.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F2F4F6] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-14">
          <div className="mb-8 text-center">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">How Engagement Works</p>
            <h2 className="font-headline text-3xl font-medium text-[#0F172A] md:text-4xl">Build-Operate-Transfer in one model.</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#475569]">
              BOT callout: recommended when internal teams want staged ownership transfer without operational disruption.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px bg-[#e2e8f0] md:grid-cols-3">
            {BOT_DELIVERY_MODEL.phases.map((phase, index) => (
              <article key={phase.id} className="bg-white p-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB]">Phase {index + 1}</p>
                <h3 className="mt-2 font-headline text-2xl text-[#0F172A]">{phase.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">{phase.detail}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/services/in-detail"
              className="sharp-edge inline-flex items-center gap-2 bg-[#2563EB] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-[#1d4ed8]"
            >
              Explore In Detail
            </Link>
            <Link
              href="/services/solution-programs"
              className="text-sm font-bold uppercase tracking-wide text-[#2563EB] transition-colors duration-200 hover:text-[#1d4ed8]"
            >
              View Solution Programs →
            </Link>
          </div>
        </div>
      </section>

      <BottomCTA
        variant="dark"
        headline="Need the full capability map with delivery depth?"
        subtext="Use In Detail for strategic context, execution model, and full subservice coverage across all domains."
        primaryLabel="Explore In Detail"
        primaryHref="/services/in-detail"
        secondaryLabel="Book Discovery Call"
        secondaryHref="/contact"
      />
    </div>
  );
}
