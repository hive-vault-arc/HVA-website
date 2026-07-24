'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from '@/components/icons';
import type { CaseStudy } from '../lib/proof';
import ArticleDetailPage from '../components/ArticleDetailPage';
import ClientEvidenceCard from '../components/ClientEvidenceCard';
import {useTranslations} from 'next-intl';

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

/* ── Case study sidebar ──────────────────────────────────────────────────── */

function CaseStudySidebar({ study }: { readonly study: CaseStudy }) {
  const t = useTranslations('DynamicContent');
  const meta = [
    { label: t('industry'), value: study.industry },
    { label: t('status'), value: study.deploymentStatus },
  ];

  return (
    <div className="space-y-8">
      {(study.assets.clientLogo || study.assets.clientWebsite) && (
        <div className="border border-[#DDE3EA] bg-white p-5">
          <p
            className="mb-4 text-[9px] font-bold uppercase tracking-[0.22em] text-[var(--section-label-color)]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {t('client')}
          </p>
          {study.assets.clientLogo && (
            <div className="mb-5 flex h-20 items-center bg-[#1A2535] px-4">
              <Image
                src={study.assets.clientLogo}
                alt={study.assets.clientLogoAlt ?? `${study.clientName} logo`}
                width={210}
                height={64}
                className="max-h-11 w-auto max-w-full object-contain object-left"
              />
            </div>
          )}
          <p className="text-base font-semibold text-[#1A2535]" style={{ fontFamily: 'var(--font-body)' }}>
            {study.clientName}
          </p>
          {study.assets.clientWebsite && (
            <a
              href={study.assets.clientWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center gap-2 text-xs font-bold text-[var(--section-label-color)] transition-colors hover:text-[#1A2535]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {t('visitClient')} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      )}

      {study.clientEvidence ? (
        <ClientEvidenceCard
          evidence={{
            ...study.clientEvidence,
            clientName: study.clientName,
            clientLogo: study.assets.clientLogo || undefined,
            clientLogoAlt: study.assets.clientLogoAlt ?? `${study.clientName} logo`,
          }}
          industry={study.industry}
          showQuote
          className="hidden lg:block"
        />
      ) : null}

      {/* Meta fields */}
      <div className="space-y-5 border-l-2 border-[#E8A838] pl-5">
        {meta.map((item) => (
          <div key={item.label}>
            <p
              className="text-[9px] font-bold uppercase tracking-[0.22em] text-[var(--section-label-color)] mb-0.5"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {item.label}
            </p>
            <p className="text-sm text-[#536070]" style={{ fontFamily: 'var(--font-body)' }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

/* ── Case study body content ─────────────────────────────────────────────── */

function CaseStudyBody({ study }: { readonly study: CaseStudy }) {
  const t = useTranslations('DynamicContent');
  return (
    <div>
      {study.clientEvidence ? (
        <ClientEvidenceCard
          evidence={{
            ...study.clientEvidence,
            clientName: study.clientName,
            clientLogo: study.assets.clientLogo || undefined,
            clientLogoAlt: study.assets.clientLogoAlt ?? `${study.clientName} logo`,
          }}
          industry={study.industry}
          showQuote
          className="mb-10 lg:hidden"
        />
      ) : null}

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
              className="text-5xl select-none text-[#E8A838]"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              01
            </span>
            <div className="h-px flex-grow bg-[#E8A838]/20" />
          </div>
          <h2
            className="text-3xl text-[#1A2535] mb-4"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            {t('caseSections.challenge')}
          </h2>
          <p className="text-[#566274] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            {study.problem}
          </p>
        </motion.div>

        {/* 02 Execution Architecture */}
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-4 mb-5">
            <span
              className="text-5xl select-none text-[#E8A838]"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              02
            </span>
            <div className="h-px flex-grow bg-[#E8A838]/20" />
          </div>
          <h2
            className="text-3xl text-[#1A2535] mb-4"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            {t('caseSections.architecture')}
          </h2>
          <p className="text-[#566274] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            {study.systemArchitecture}
          </p>
        </motion.div>

        {/* 03 Modules Activated */}
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-4 mb-5">
            <span
              className="text-5xl select-none text-[#E8A838]"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              03
            </span>
            <div className="h-px flex-grow bg-[#E8A838]/20" />
          </div>
          <h2
            className="text-3xl text-[#1A2535] mb-5"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            {t('caseSections.modules')}
          </h2>
          <ul className="space-y-2">
            {study.operationalModules.map((mod) => (
              <li key={mod} className="flex items-start gap-3 text-sm text-[#3D4858]" style={{ fontFamily: 'var(--font-body)' }}>
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E8A838]" />
                {mod}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Stack & Integrations */}
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
          <p
            className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--section-label-color)] mb-4"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {t('caseSections.stack')}
          </p>
          <div className="flex flex-wrap gap-2">
            {study.integrations.map((integration) => (
              <span
                key={integration}
                className="text-[11px] font-medium bg-[#FFF7E8] text-[#E8A838] border border-[#E8A838]/20 px-3 py-1.5 rounded-full"
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

export default function CaseStudyDetail({
  study,
  relatedStudies,
}: {
  readonly study: CaseStudy;
  readonly relatedStudies: CaseStudy[];
}) {
  const t = useTranslations('DynamicContent');
  const related = relatedStudies.map((s) => ({
      href: `/case-studies/${s.slug}`,
      title: s.title,
      tag: s.industry,
      coverImage: s.assets.coverImage || undefined,
    }));

  return (
    <ArticleDetailPage
      backHref="/case-studies"
      backLabel={t('caseStudies')}
      breadcrumbs={[
        { label: t('home'), href: '/' },
        { label: t('caseStudies'), href: '/case-studies' },
        { label: study.title },
      ]}
      eyebrow={study.industry}
      metaLabel={study.deploymentStatus}
      title={study.title}
      subtitle={study.summary}
      coverImage={study.assets.coverImage || undefined}
      coverAlt={study.assets.coverAlt ?? study.title}
      showAboutStrip={false}
      relatedItems={related}
      relatedTitle={t('moreCaseStudies')}
      relatedAllHref="/case-studies"
      relatedAllLabel={t('allCaseStudies')}
      bottomCta={{
        headline: t('caseCta.title'),
        subtext: t('caseCta.description'),
        primaryLabel: t('caseCta.primary'),
        primaryHref: '/contact',
        secondaryLabel: t('caseCta.secondary'),
        secondaryHref: '/capabilities/solution-programs',
      }}
      sidebar={<CaseStudySidebar study={study} />}
    >
      <CaseStudyBody study={study} />
    </ArticleDetailPage>
  );
}
