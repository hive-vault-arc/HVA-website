'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BarChart3, MessageSquare, Network, ShieldCheck } from 'lucide-react';
import PageAmbientBackground from '../components/PageAmbientBackground';
import BottomCTA from '../components/BottomCTA';

const industries = [
  {
    anchorId: 'real-estate',
    name: 'Real Estate',
    sector: 'Real Estate & Property',
    focus: 'Lead operations, CRM modernization, pipeline governance, multilingual client workflows.',
    href: '/case-studies/zoho-grade-crm-platform',
  },
  {
    anchorId: 'healthcare',
    name: 'Healthcare',
    sector: 'Healthcare & Clinical Ops',
    focus: 'Executive reporting, clinical operations dashboards, workflow reliability, decision intelligence.',
    href: '/case-studies',
  },
  {
    anchorId: 'construction',
    name: 'Construction',
    sector: 'Construction & Projects',
    focus: 'Operational planning, schedule visibility, field-to-office process automation, risk tracking.',
    href: '/capabilities',
  },
  {
    anchorId: 'logistics',
    name: 'Logistics',
    sector: 'Logistics & Operations',
    focus: 'Dispatch workflows, operations automation, SLA monitoring, control-tower visibility.',
    href: '/capabilities',
  },
  {
    anchorId: 'finance-brokerage',
    name: 'Finance & Brokerage',
    sector: 'Financial Services & Deal Operations',
    focus:
      'Deal pipeline visibility, sales-agent and broker workflows, lead qualification, closing cadence, and commission reporting.',
    href: '/capabilities/solution-programs',
  },
  {
    anchorId: 'sme-capabilities',
    name: 'SME Capabilities',
    sector: 'SME & Professional Capabilities',
    focus: 'AI-assisted client operations, custom software, IT modernization, and scalable cloud foundations.',
    href: '/capabilities/solution-programs',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const approachTracks = [
  {
    code: 'IND-001',
    icon: <BarChart3 className="h-6 w-6" strokeWidth={1.5} />,
    title: 'Sector-calibrated diagnostics',
    desc: 'We calibrate diagnostics to sector economics, cycle times, and bottleneck patterns before architecture decisions.',
  },
  {
    code: 'IND-002',
    icon: <Network className="h-6 w-6" strokeWidth={1.5} />,
    title: 'Domain-aware architecture decisions',
    desc: 'Architecture choices reflect domain language, data structures, and decision hierarchies specific to each industry.',
  },
  {
    code: 'IND-003',
    icon: <ShieldCheck className="h-6 w-6" strokeWidth={1.5} />,
    title: 'Regulatory and compliance awareness',
    desc: 'Controls are introduced early to reduce delivery risk in healthcare, finance-like workflows, and sensitive operations.',
  },
  {
    code: 'IND-004',
    icon: <MessageSquare className="h-6 w-6" strokeWidth={1.5} />,
    title: 'Stakeholder communication patterns',
    desc: 'Execution plans are adapted to how leadership, operations, and technical teams actually communicate in that sector.',
  },
];

export default function Industries() {
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
            Industries
          </p>
          <h1 className="font-headline text-4xl font-medium leading-[1.04] tracking-tight sm:text-5xl lg:text-[4.5rem]">
            Industry Context,
            <br />
            <em className="italic text-[#475569]">Not Generic Delivery.</em>
          </h1>
          <p className="mt-8 max-w-2xl text-xl font-light leading-relaxed text-[#0F172A]/60">
            H.V.A designs transformation programs around sector workflows, operating constraints, and
            decision models — not copied templates.
          </p>
        </motion.div>
      </section>

      {/* ── Industry Cards ────────────────────────────────────────────────── */}
      <section className="bg-[#F2F4F6] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-14">
          <motion.div
            className="grid grid-cols-1 gap-px bg-[#e2e8f0] md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ staggerChildren: 0.08 }}
          >
            {industries.map((item) => (
              <motion.article
                key={item.name}
                id={item.anchorId}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="group flex scroll-mt-36 flex-col bg-[#F2F4F6] p-8 md:p-10"
              >
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2563EB]">
                  {item.sector}
                </p>
                <h2 className="font-headline text-3xl text-[#0F172A]">{item.name}</h2>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-[#475569]">{item.focus}</p>
                <Link
                  href={item.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#2563EB] transition-colors duration-200 hover:text-[#1d4ed8]"
                >
                  {'See related work '}
                  <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Cross-industry note ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#F2F4F6] py-20 md:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(to right,#2563EB 1px,transparent 1px),linear-gradient(to bottom,#2563EB 1px,transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#2563EB]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-[#2563EB]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-14 grid grid-cols-12 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="col-span-12 lg:col-span-4 lg:sticky lg:top-32"
          >
            <p className="font-label text-[#2563EB] uppercase tracking-[0.4em] text-[10px] mb-3">
              Laboratory_Active
            </p>
            <h3 className="font-headline text-4xl md:text-5xl text-[#0F172A] leading-tight mb-8">
              Active Research &amp; Development
            </h3>

            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">
              Our Approach
            </p>
            <h2 className="font-headline text-3xl font-medium text-[#0F172A] md:text-4xl">
              One Framework. Many Operating Contexts.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#475569]">
              The ARC framework adapts to sector terminology, decision hierarchies, and workflow constraints without
              losing engineering rigor. We run a continuous calibration loop that turns field feedback into better
              execution patterns across industries.
            </p>
            <Link
              href="/arc"
              className="sharp-edge mt-8 inline-flex items-center gap-2 bg-[#2563EB] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#1d4ed8] transition-colors duration-200"
            >
              Learn About ARC
            </Link>
          </motion.div>

          <motion.div
            className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-[#dbe3f0] border border-[#dbe3f0]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.08 }}
          >
            {approachTracks.map((track) => (
              <motion.article
                key={track.code}
                variants={fadeUp}
                transition={{ duration: 0.45 }}
                className="group bg-white p-7 hover:bg-[#F8FAFC] transition-colors duration-300"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="text-[#2563EB]">{track.icon}</div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#94a3b8]">{track.code}</span>
                </div>
                <h4 className="font-headline text-2xl leading-tight text-[#0F172A] group-hover:text-[#2563EB] transition-colors duration-300">
                  {track.title}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">{track.desc}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <BottomCTA
        variant="dark"
        headline="Need an Industry-Specific Transformation Plan?"
        subtext="Book a discovery call and we'll map the right capability and system program for your sector."
        primaryLabel="Book Discovery Call"
        primaryHref="/contact"
        secondaryLabel="View Capabilities"
        secondaryHref="/capabilities"
      />
    </div>
  );
}


