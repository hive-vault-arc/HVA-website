'use client';

import Image from 'next/image';
import type {ReactNode} from 'react';
import {ExternalLink} from '@/components/icons';
import {TbChartLine, TbClockHour4, TbCurrencyDollar} from 'react-icons/tb';
import type {CaseStudy, CaseStudyOutcome} from '../lib/proof';
import ArticleDetailPage from '../components/ArticleDetailPage';
import {
  getEvidenceDirection,
  getEvidenceLanguageCode,
} from '../components/ClientEvidenceCard';
import CaseStudyProjectMedia from '../components/CaseStudyProjectMedia';
import {useLocale, useTranslations} from 'next-intl';
import {isSanityCdnImage} from '../lib/image-delivery';

function CaseStudyLeadCard({study}: {readonly study: CaseStudy}) {
  const t = useTranslations('DynamicContent');
  const evidence = study.clientEvidence;
  const evidenceLanguage = evidence
    ? getEvidenceLanguageCode(evidence.documentLanguage)
    : undefined;
  const evidenceDirection = evidence
    ? getEvidenceDirection(evidence.documentLanguage)
    : undefined;
  const primaryHref = evidence?.testimonialPdf.url ?? study.assets.clientWebsite;
  const primaryLabel = evidence ? t('openTestimonial') : t('visitClient');

  return (
    <div className="case-study-lead-card">
      <p
        className="case-study-lead-card__label"
        style={{fontFamily: 'var(--font-body)'}}
      >
        {t('atAGlance')}
      </p>

      <div className="case-study-lead-card__identity">
        {study.assets.clientLogo ? (
          <div className="case-study-lead-card__logo">
            <Image
              src={study.assets.clientLogo}
              alt={study.assets.clientLogoAlt ?? `${study.clientName} logo`}
              fill
              unoptimized={isSanityCdnImage(study.assets.clientLogo)}
              sizes="8rem"
            />
          </div>
        ) : null}
        <div>
          <strong style={{fontFamily: 'var(--font-body)'}}>{study.clientName}</strong>
          <span style={{fontFamily: 'var(--font-body)'}}>{study.industry}</span>
        </div>
      </div>

      {evidence?.quoteExcerpt ? (
        <figure
          className="case-study-lead-card__quote"
          lang={evidenceLanguage}
          dir={evidenceDirection}
        >
          <blockquote style={{fontFamily: 'var(--font-headline)'}}>
            {evidence.quoteExcerpt}
          </blockquote>
          {evidence.signatoryName || evidence.signatoryRole ? (
            <figcaption style={{fontFamily: 'var(--font-body)'}}>
              {evidence.signatoryName ? <strong>{evidence.signatoryName}</strong> : null}
              {evidence.signatoryRole ? <span>{evidence.signatoryRole}</span> : null}
            </figcaption>
          ) : null}
        </figure>
      ) : (
        <p
          className="case-study-lead-card__summary"
          style={{fontFamily: 'var(--font-body)'}}
        >
          {study.deploymentStatus}
        </p>
      )}

      {primaryHref ? (
        <a
          href={primaryHref}
          target="_blank"
          rel="noopener noreferrer"
          className="case-study-lead-card__action"
          style={{fontFamily: 'var(--font-body)'}}
        >
          {primaryLabel}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      ) : null}
    </div>
  );
}

function NarrativeSection({
  title,
  children,
  className = '',
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`case-study-story__copy ${className}`.trim()}>
      <h2
        className="case-study-story__title"
        style={{fontFamily: 'var(--font-headline)'}}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function OutcomeIcon({outcome}: {readonly outcome: CaseStudyOutcome}) {
  const Icon =
    outcome.category === 'throughput'
      ? TbChartLine
      : outcome.category === 'cycleTime'
        ? TbClockHour4
        : TbCurrencyDollar;

  return <Icon aria-hidden="true" />;
}

export function CaseStudyOutcomes({study}: {readonly study: CaseStudy}) {
  const t = useTranslations('DynamicContent');
  const benchmarkOutcomes = study.publishedOutcomes.filter(
    (outcome) => outcome.scope === 'benchmark'
  );
  const caseOutcomes = study.publishedOutcomes.filter(
    (outcome) => outcome.scope === 'caseStudy'
  );

  if (benchmarkOutcomes.length === 0 && caseOutcomes.length === 0) return null;

  return (
    <section
      className="case-study-story__outcomes"
      aria-labelledby="case-study-outcomes-title"
    >
      <header className="case-study-story__outcomes-heading">
        <p style={{fontFamily: 'var(--font-body)'}}>
          {t('caseSections.outcomesEyebrow')}
        </p>
        <h2
          id="case-study-outcomes-title"
          style={{fontFamily: 'var(--font-headline)'}}
        >
          {t('caseSections.outcomesTitle')}
        </h2>
        <p style={{fontFamily: 'var(--font-body)'}}>
          {t('caseSections.outcomesDescription', {client: study.clientName})}
        </p>
      </header>

      {benchmarkOutcomes.length > 0 ? (
        <div
          className="case-study-story__outcome-group"
          aria-label={t('caseSections.benchmarks')}
        >
          <p
            className="case-study-story__outcome-group-label"
            style={{fontFamily: 'var(--font-body)'}}
          >
            {t('caseSections.benchmarks')}
          </p>
          <div className="case-study-story__outcome-grid">
            {benchmarkOutcomes.map((outcome) => (
              <article key={outcome._key}>
                <OutcomeIcon outcome={outcome} />
                <div>
                  <strong style={{fontFamily: 'var(--font-headline)'}}>
                    {outcome.value}
                  </strong>
                  <h3 style={{fontFamily: 'var(--font-headline)'}}>
                    {outcome.label}
                  </h3>
                  <p style={{fontFamily: 'var(--font-body)'}}>{outcome.context}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {caseOutcomes.length > 0 ? (
        <div
          className="case-study-story__outcome-group case-study-story__outcome-group--case"
          aria-label={t('caseSections.caseResults', {client: study.clientName})}
        >
          <p
            className="case-study-story__outcome-group-label"
            style={{fontFamily: 'var(--font-body)'}}
          >
            {t('caseSections.caseResults', {client: study.clientName})}
          </p>
          <div className="case-study-story__outcome-grid">
            {caseOutcomes.map((outcome) => (
              <article key={outcome._key}>
                <div>
                  <strong style={{fontFamily: 'var(--font-headline)'}}>
                    {outcome.value}
                  </strong>
                  <h3 style={{fontFamily: 'var(--font-headline)'}}>
                    {outcome.label}
                  </h3>
                  <p style={{fontFamily: 'var(--font-body)'}}>{outcome.context}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function CaseStudyBody({study}: {readonly study: CaseStudy}) {
  const t = useTranslations('DynamicContent');
  const locale = useLocale();
  const projectMedia =
    !study.language || study.language === locale ? (study.projectMedia ?? []) : [];
  const primaryMedia =
    projectMedia.find((item) => item.deviceType === 'desktop') ?? projectMedia[0];
  const openingMedia = primaryMedia ? [primaryMedia] : [];
  const supportingMedia = primaryMedia
    ? projectMedia.filter((item) => item._key !== primaryMedia._key)
    : [];

  return (
    <div className="case-study-story">
      <section
        className={`case-study-story__opening ${
          openingMedia.length === 0 ? 'case-study-story__opening--text-only' : ''
        }`.trim()}
      >
        <div className="case-study-story__narrative-stack">
          <NarrativeSection title={t('caseSections.challenge')}>
            <p className="case-study-story__body" style={{fontFamily: 'var(--font-body)'}}>
              {study.problem}
            </p>
          </NarrativeSection>

          <NarrativeSection title={t('caseSections.architecture')}>
            <p className="case-study-story__body" style={{fontFamily: 'var(--font-body)'}}>
              {study.systemArchitecture}
            </p>
          </NarrativeSection>
        </div>

        <CaseStudyProjectMedia
          items={openingMedia}
          label={t('caseSections.projectMedia')}
          className="case-study-story__media case-study-story__media--primary"
        />
      </section>

      {study.operationalModules.length > 0 ? (
        <section className="case-study-story__modules">
          <h2
            className="case-study-story__title"
            style={{fontFamily: 'var(--font-headline)'}}
          >
            {t('caseSections.modules')}
          </h2>
          <ul className="case-study-story__module-grid">
            {study.operationalModules.map((module) => (
              <li
                key={module}
                className="case-study-story__module"
                style={{fontFamily: 'var(--font-body)'}}
              >
                {module}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {supportingMedia.length > 0 || study.integrations.length > 0 ? (
        <section
          className={`case-study-story__chapter case-study-story__chapter--closing ${
            supportingMedia.length === 0 || study.integrations.length === 0
              ? 'case-study-story__chapter--text-only'
              : ''
          }`.trim()}
        >
          <CaseStudyProjectMedia
            items={supportingMedia}
            label={t('caseSections.projectMedia')}
            className="case-study-story__media"
          />

          {study.integrations.length > 0 ? (
            <NarrativeSection title={t('caseSections.stack')}>
              <ul className="case-study-story__stack-list">
                {study.integrations.map((integration) => (
                  <li
                    key={integration}
                    className="case-study-story__stack-item"
                    style={{fontFamily: 'var(--font-body)'}}
                  >
                    {integration}
                  </li>
                ))}
              </ul>
            </NarrativeSection>
          ) : null}
        </section>
      ) : null}

      <CaseStudyOutcomes study={study} />
    </div>
  );
}

export default function CaseStudyDetail({
  study,
  relatedStudies,
}: {
  readonly study: CaseStudy;
  readonly relatedStudies: CaseStudy[];
}) {
  const t = useTranslations('DynamicContent');
  const related = relatedStudies.map((relatedStudy) => ({
    href: `/case-studies/${relatedStudy.slug}`,
    title: relatedStudy.title,
    tag: relatedStudy.industry,
    coverImage: relatedStudy.assets.coverImage || undefined,
  }));

  return (
    <ArticleDetailPage
      variant="caseStudy"
      backHref="/case-studies"
      backLabel={t('caseStudies')}
      breadcrumbs={[
        {label: t('home'), href: '/'},
        {label: t('caseStudies'), href: '/case-studies'},
        {label: study.title},
      ]}
      eyebrow={study.industry}
      metaLabel={study.deploymentStatus}
      title={study.title}
      subtitle={study.summary}
      coverImage={study.assets.coverImage || undefined}
      coverAlt={study.assets.coverAlt ?? study.title}
      coverAside={<CaseStudyLeadCard study={study} />}
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
    >
      <CaseStudyBody study={study} />
    </ArticleDetailPage>
  );
}
