'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
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
    href: '/case-studies/executive-analytics-control-tower',
  },
  {
    anchorId: 'construction',
    name: 'Construction',
    sector: 'Construction & Projects',
    focus: 'Operational planning, schedule visibility, field-to-office process automation, risk tracking.',
    href: '/services',
  },
  {
    anchorId: 'logistics',
    name: 'Logistics',
    sector: 'Logistics & Operations',
    focus: 'Dispatch workflows, service operations automation, SLA monitoring, control-tower visibility.',
    href: '/services',
  },
  {
    anchorId: 'sme-services',
    name: 'SME Services',
    sector: 'SME & Professional Services',
    focus: 'AI-assisted client operations, custom software, IT modernization, and scalable cloud foundations.',
    href: '/services/solution-programs',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

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
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20"
          >
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">
                Our Approach
              </p>
              <h2 className="font-headline text-3xl font-medium text-[#0F172A] md:text-4xl">
                One Framework. Many Operating Contexts.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#475569]">
                The ARC framework adapts to sector-specific terminology, decision hierarchies, and workflow constraints
                without losing the engineering rigor that makes outcomes stick.
              </p>
              <Link
                href="/arc"
                className="sharp-edge mt-8 inline-flex items-center gap-2 bg-[#2563EB] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#1d4ed8] transition-colors duration-200"
              >
                Learn About ARC
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {['Sector-calibrated diagnostics', 'Domain-aware architecture decisions', 'Regulatory and compliance awareness', 'Stakeholder communication patterns'].map((item) => (
                <div key={item} className="flex items-center gap-4 bg-[#F2F4F6] px-6 py-4">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]" />
                  <p className="text-sm font-semibold text-[#0F172A]">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <BottomCTA
        variant="dark"
        headline="Need an Industry-Specific Transformation Plan?"
        subtext="Book a discovery call and we'll map the right service and system program for your sector."
        primaryLabel="Book Discovery Call"
        primaryHref="/contact"
        secondaryLabel="View Services"
        secondaryHref="/services"
      />
    </div>
  );
}
