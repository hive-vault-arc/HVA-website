'use client';

import { motion } from 'framer-motion';
import type { CaseStudy } from '../lib/proof';
import { getAllCaseStudies } from '../lib/proof';
import ArticleDetailPage from '../components/ArticleDetailPage';

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

/* ── Case study sidebar ──────────────────────────────────────────────────── */

function CaseStudySidebar({ study }: { readonly study: CaseStudy }) {
  const meta = [
    { label: 'Client', value: study.clientName },
    { label: 'Industry', value: study.industry },
    { label: 'Status', value: study.deploymentStatus },
    { label: 'Scale', value: study.deploymentScale },
  ];

  return (
    <div className="space-y-8">
      {/* Meta fields */}
      <div className="space-y-5 border-l-2 border-[#2563EB] pl-5">
        {meta.map((item) => (
          <div key={item.label}>
            <p
              className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#2563EB] mb-0.5"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {item.label}
            </p>
            <p className="text-sm text-[#45464d]" style={{ fontFamily: 'var(--font-body)' }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Program delivery record */}
      <div className="relative bg-[#0F172A] p-6 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,#60a5fa 0,#60a5fa 1px,transparent 0,transparent 48px),repeating-linear-gradient(90deg,#60a5fa 0,#60a5fa 1px,transparent 0,transparent 48px)',
          }}
        />
        <div className="pointer-events-none absolute -top-8 -right-8 w-32 h-32 bg-[#2563EB]/20 rounded-full blur-2xl" />

        <p
          className="relative z-10 text-[9px] font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-4"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Program Delivery Record
        </p>
        <div className="relative z-10 space-y-0">
          {([
            { label: 'Deployment status', value: 'Live', pulse: true },
            { label: 'Architecture review', value: 'Passed', pulse: false },
            { label: 'Delivery framework', value: 'ARC', pulse: false },
            { label: 'Accountability model', value: 'End-to-end', pulse: false },
          ] as { label: string; value: string; pulse: boolean }[]).map((row) => (
            <div key={row.label} className="flex items-center justify-between border-t border-white/10 py-3">
              <span className="text-xs text-white/50" style={{ fontFamily: 'var(--font-body)' }}>{row.label}</span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-[#2563EB]" style={{ fontFamily: 'var(--font-body)' }}>
                {row.pulse && <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB] animate-pulse inline-block" />}
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Case study body content ─────────────────────────────────────────────── */

function CaseStudyBody({ study }: { readonly study: CaseStudy }) {
  return (
    <div>
      {/* Metrics strip */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#e2e8f0] border border-[#e2e8f0] mb-14"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {study.measuredOutcomes.map((metric) => (
          <motion.div
            key={metric.label}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="bg-white px-6 py-7 group hover:bg-[#2563EB] transition-colors duration-300"
          >
            <p
              className="font-headline text-4xl md:text-5xl text-[#0F172A] group-hover:text-white transition-colors duration-300 mb-2"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              {metric.value}
            </p>
            <p
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB] group-hover:text-white/80 transition-colors duration-300"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {metric.label}
            </p>
            <p
              className="mt-2 text-xs text-[#94a3b8] group-hover:text-white/60 transition-colors duration-300 leading-relaxed"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {metric.context}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Numbered sections */}
      <motion.div
        className="space-y-12"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        transition={{ staggerChildren: 0.12 }}
      >
        {/* 01 Business Challenge */}
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-4 mb-5">
            <span
              className="text-5xl select-none text-[#2563EB]"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              01
            </span>
            <div className="h-px flex-grow bg-[#2563EB]/20" />
          </div>
          <h2
            className="text-3xl text-[#0F172A] mb-4"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Business Challenge
          </h2>
          <p className="text-[#475569] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            {study.problem}
          </p>
        </motion.div>

        {/* 02 Execution Architecture */}
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-4 mb-5">
            <span
              className="text-5xl select-none text-[#2563EB]"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              02
            </span>
            <div className="h-px flex-grow bg-[#2563EB]/20" />
          </div>
          <h2
            className="text-3xl text-[#0F172A] mb-4"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Execution Architecture
          </h2>
          <p className="text-[#475569] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            {study.systemArchitecture}
          </p>
        </motion.div>

        {/* 03 Modules Activated */}
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-4 mb-5">
            <span
              className="text-5xl select-none text-[#2563EB]"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              03
            </span>
            <div className="h-px flex-grow bg-[#2563EB]/20" />
          </div>
          <h2
            className="text-3xl text-[#0F172A] mb-5"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Modules Activated
          </h2>
          <ul className="space-y-2">
            {study.operationalModules.map((mod) => (
              <li key={mod} className="flex items-start gap-3 text-sm text-[#334155]" style={{ fontFamily: 'var(--font-body)' }}>
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]" />
                {mod}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Stack & Integrations */}
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
          <p
            className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#2563EB] mb-4"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Stack &amp; Integrations
          </p>
          <div className="flex flex-wrap gap-2">
            {study.integrations.map((integration) => (
              <span
                key={integration}
                className="text-[11px] font-medium bg-[#F0F4FF] text-[#2563EB] border border-[#2563EB]/20 px-3 py-1.5 rounded-full"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {integration}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ── Main view ───────────────────────────────────────────────────────────── */

export default function CaseStudyDetail({ study }: { readonly study: CaseStudy }) {
  const allStudies = getAllCaseStudies();
  const related = allStudies
    .filter((s) => s.slug !== study.slug)
    .slice(0, 3)
    .map((s) => ({
      href: `/case-studies/${s.slug}`,
      title: s.title,
      tag: s.industry,
      coverImage: s.assets.coverImage || undefined,
    }));

  return (
    <ArticleDetailPage
      backHref="/case-studies"
      backLabel="Case Studies"
      crumbText={study.assets.logoLabel.toUpperCase()}
      eyebrow={study.industry}
      metaLabel={study.deploymentStatus}
      title={study.title}
      subtitle={study.summary}
      coverImage={study.assets.coverImage || undefined}
      coverAlt={study.title}
      showAboutStrip={false}
      relatedItems={related}
      relatedTitle="More Case Studies"
      relatedAllHref="/case-studies"
      relatedAllLabel="All Case Studies"
      bottomCta={{
        headline: 'Apply This Transformation Pattern to Your Operations',
        subtext: 'Review the relevant solution programs, then book a discovery call to scope your roadmap.',
        primaryLabel: 'Book Discovery Call',
        primaryHref: '/contact',
        secondaryLabel: 'View Solution Programs',
        secondaryHref: '/capabilities/solution-programs',
      }}
      sidebar={<CaseStudySidebar study={study} />}
    >
      <CaseStudyBody study={study} />
    </ArticleDetailPage>
  );
}
