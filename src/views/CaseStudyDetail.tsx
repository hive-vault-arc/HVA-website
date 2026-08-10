'use client';

import Image from 'next/image';
import {useLocale, useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  ChartArea,
  ExternalLink,
  Gauge,
  Network,
  TrendingUp,
  Users,
  Workflow,
} from '@/components/icons';
import SectionBrandMark from '@/components/SectionBrandMark';
import CaseStudyProjectMedia from '@/components/CaseStudyProjectMedia';
import CaseStudyTestimonial from '@/components/CaseStudyTestimonial';
import {
  getEvidenceDirection,
  getEvidenceLanguageCode,
} from '@/components/ClientEvidenceCard';
import {isSanityCdnImage} from '@/lib/image-delivery';
import type {
  CaseStudy,
  CaseStudyHeadlineMetric,
  CaseStudyOutcome,
  CaseStudyProjectMedia as ProjectMedia,
} from '@/lib/proof';

export function formatCaseStudyHeadlineMetric(
  metric: CaseStudyHeadlineMetric,
  locale: string,
): string {
  const numberFormat = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
  });
  const isRange =
    metric.valueType === 'numberRange' ||
    metric.valueType === 'percentageRange' ||
    metric.valueType === 'multiplierRange';
  const number = isRange
    ? `${numberFormat.format(metric.minimum ?? 0)}–${numberFormat.format(metric.maximum ?? 0)}`
    : numberFormat.format(metric.value ?? 0);
  const percentage = locale.startsWith('fr') ? '\u00a0%' : '%';
  const unit = metric.unit ? `\u00a0${metric.unit}` : '';

  if (
    metric.valueType === 'percentage' ||
    metric.valueType === 'percentageRange'
  ) {
    return `${number}${percentage}`;
  }
  if (
    metric.valueType === 'multiplier' ||
    metric.valueType === 'multiplierRange'
  ) {
    return `${number}×`;
  }
  return `${number}${unit}`;
}

export function CaseStudyHeadlineMetrics({
  metrics,
}: {
  readonly metrics: CaseStudyHeadlineMetric[];
}) {
  const t = useTranslations('DynamicContent');
  const locale = useLocale();

  if (metrics.length === 0) return null;

  return (
    <section
      className="case-study-template__headline-metrics"
      aria-label={t('caseSections.headlineMetrics')}
    >
      <div
        className="case-study-template__headline-metrics-grid"
        data-count={metrics.length}
      >
        {metrics.map((metric, index) => {
          const MetricIcon = [
            TrendingUp,
            Gauge,
            BarChart3,
            Users,
            Workflow,
            Network,
          ][index % 6];

          return (
            <article key={metric._key}>
              <div
                className="case-study-template__headline-metric-icon"
                aria-hidden="true"
              >
                <MetricIcon />
              </div>
              <strong>{formatCaseStudyHeadlineMetric(metric, locale)}</strong>
              <h2>{metric.label}</h2>
              <p>{metric.context}</p>
              <span>{t(`caseSections.metricBasis.${metric.basis}`)}</span>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function CaseStudyIdentity({study}: {readonly study: CaseStudy}) {
  const t = useTranslations('DynamicContent');
  const evidence = study.clientEvidence;
  const evidenceLanguage = evidence
    ? getEvidenceLanguageCode(evidence.documentLanguage)
    : undefined;
  const evidenceDirection = evidence
    ? getEvidenceDirection(evidence.documentLanguage)
    : undefined;
  const testimonialHref = evidence?.testimonialPdf?.url;
  const primaryHref = testimonialHref ?? study.assets.clientWebsite;
  const primaryLabel = testimonialHref
    ? t('openTestimonial')
    : t('visitClient');

  return (
    <div className="case-study-template__identity">
      <div className="case-study-template__client">
        {study.assets.clientLogo ? (
          <div className="case-study-template__client-logo">
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
          <span>{t('client')}</span>
          <strong>{study.clientName}</strong>
        </div>
      </div>

      <dl className="case-study-template__facts">
        <div>
          <dt>{t('industry')}</dt>
          <dd>{study.industry}</dd>
        </div>
        <div>
          <dt>{t('status')}</dt>
          <dd>{study.deploymentStatus}</dd>
        </div>
      </dl>

      {evidence?.quoteExcerpt && !evidence.testimonialImage ? (
        <figure
          className="case-study-template__quote"
          lang={evidenceLanguage}
          dir={evidenceDirection}
        >
          <blockquote>{evidence.quoteExcerpt}</blockquote>
          {evidence.signatoryName || evidence.signatoryRole ? (
            <figcaption>
              {evidence.signatoryName ? (
                <strong>{evidence.signatoryName}</strong>
              ) : null}
              {evidence.signatoryRole ? (
                <span>{evidence.signatoryRole}</span>
              ) : null}
            </figcaption>
          ) : null}
        </figure>
      ) : null}

      {primaryHref ? (
        <a
          href={primaryHref}
          target="_blank"
          rel="noopener noreferrer"
          className="case-study-template__external-link"
        >
          {primaryLabel}
          <ExternalLink aria-hidden="true" />
        </a>
      ) : null}
    </div>
  );
}

function CaseStudyNarrative({
  challengeTitle,
  challenge,
  solutionTitle,
  solution,
  media,
  mediaLabel,
}: {
  readonly challengeTitle: string;
  readonly challenge: string;
  readonly solutionTitle: string;
  readonly solution: string;
  readonly media: ProjectMedia[];
  readonly mediaLabel: string;
}) {
  return (
    <section
      className="case-study-template__narrative"
      aria-labelledby="challenge-title solution-title"
    >
      <div className="case-study-template__narrative-pair">
        <article
          id="challenge"
          className="case-study-template__narrative-panel"
        >
          <h2 id="challenge-title">{challengeTitle}</h2>
          <p>{challenge}</p>
        </article>
        <article
          id="solution"
          className="case-study-template__narrative-panel case-study-template__narrative-panel--dark"
        >
          <h2 id="solution-title">{solutionTitle}</h2>
          <p>{solution}</p>
        </article>
      </div>
      <CaseStudyProjectMedia
        items={media}
        label={mediaLabel}
        className="case-study-template__narrative-media"
      />
    </section>
  );
}

function OutcomeIcon({outcome}: {readonly outcome: CaseStudyOutcome}) {
  const Icon =
    outcome.category === 'throughput'
      ? TrendingUp
      : outcome.category === 'cycleTime'
        ? Gauge
        : ChartArea;

  return <Icon aria-hidden="true" color="#DBAA4D" />;
}

function OutcomeGroup({
  label,
  outcomes,
  showIcons = false,
}: {
  readonly label: string;
  readonly outcomes: CaseStudyOutcome[];
  readonly showIcons?: boolean;
}) {
  if (outcomes.length === 0) return null;

  return (
    <div className="case-study-story__outcome-group" aria-label={label}>
      <p className="case-study-story__outcome-group-label">{label}</p>
      <div
        className="case-study-story__outcome-grid"
        data-count={outcomes.length}
      >
        {outcomes.map((outcome) => (
          <article key={outcome._key}>
            {showIcons ? <OutcomeIcon outcome={outcome} /> : null}
            <div>
              <strong>{outcome.value}</strong>
              <h3>{outcome.label}</h3>
              <p>{outcome.context}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function CaseStudyOutcomes({study}: {readonly study: CaseStudy}) {
  const t = useTranslations('DynamicContent');
  const benchmarkOutcomes = study.publishedOutcomes.filter(
    (outcome) => outcome.scope === 'benchmark',
  );
  const caseOutcomes = study.publishedOutcomes.filter(
    (outcome) => outcome.scope === 'caseStudy',
  );

  if (benchmarkOutcomes.length === 0 && caseOutcomes.length === 0) return null;

  return (
    <section
      className="case-study-story__outcomes"
      aria-labelledby="case-study-outcomes-title"
    >
      <header className="case-study-story__outcomes-heading">
        <p>{t('caseSections.outcomesEyebrow')}</p>
        <h2 id="case-study-outcomes-title">
          {t('caseSections.outcomesTitle')}
        </h2>
        <p>
          {t('caseSections.outcomesDescription', {client: study.clientName})}
        </p>
      </header>

      <div className="case-study-story__outcomes-groups">
        <OutcomeGroup
          label={t('caseSections.benchmarks')}
          outcomes={benchmarkOutcomes}
          showIcons
        />
        <OutcomeGroup
          label={t('caseSections.caseResults', {client: study.clientName})}
          outcomes={caseOutcomes}
        />
      </div>
    </section>
  );
}

function CaseStudySystems({
  study,
  media,
}: {
  readonly study: CaseStudy;
  readonly media: ProjectMedia[];
}) {
  const t = useTranslations('DynamicContent');
  const hasModules = study.operationalModules.length > 0;
  const hasIntegrations = study.integrations.length > 0;
  const hasMedia = media.length > 0;

  if (!hasModules && !hasIntegrations && !hasMedia) return null;

  return (
    <section
      className="case-study-template__systems"
      aria-labelledby={
        hasModules
          ? 'case-study-systems-title'
          : hasIntegrations
            ? 'case-study-integrations-title'
            : undefined
      }
      data-has-media={hasMedia ? 'true' : 'false'}
    >
      {hasModules ? (
        <div className="case-study-template__modules">
          <h2 id="case-study-systems-title">{t('caseSections.modules')}</h2>
          <ul>
            {study.operationalModules.map((module) => (
              <li key={module}>{module}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <CaseStudyProjectMedia
        items={media}
        label={t('caseSections.projectMedia')}
        className="case-study-template__systems-media"
      />

      {hasIntegrations ? (
        <div className="case-study-template__integrations">
          <h2 id="case-study-integrations-title">{t('caseSections.stack')}</h2>
          <ul>
            {study.integrations.map((integration) => (
              <li key={integration}>{integration}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

function RelatedCaseStudies({studies}: {readonly studies: CaseStudy[]}) {
  const t = useTranslations('DynamicContent');

  if (studies.length === 0) return null;

  return (
    <section
      className="case-study-template__related"
      aria-labelledby="related-case-studies-title"
    >
      <div className="site-frame-wide">
        <header className="case-study-template__related-heading">
          <h2 id="related-case-studies-title">{t('moreCaseStudies')}</h2>
          <Link href="/case-studies" className="case-study-template__text-link">
            {t('allCaseStudies')}
            <ArrowRight aria-hidden="true" />
          </Link>
        </header>

        <div
          className="case-study-template__related-grid"
          data-count={Math.min(studies.length, 3)}
        >
          {studies.map((relatedStudy) => (
            <Link
              key={relatedStudy.slug}
              href={`/case-studies/${relatedStudy.slug}`}
              className="case-study-template__related-item"
            >
              <div className="case-study-template__related-media">
                <Image
                  src={relatedStudy.assets.coverImage}
                  alt={relatedStudy.assets.coverAlt ?? relatedStudy.title}
                  fill
                  loading="lazy"
                  unoptimized={isSanityCdnImage(relatedStudy.assets.coverImage)}
                  sizes="(max-width: 760px) calc(100vw - 2rem), (max-width: 1100px) 50vw, 33vw"
                />
              </div>
              <div className="case-study-template__related-copy">
                <span>{relatedStudy.industry}</span>
                <h3>{relatedStudy.title}</h3>
                <ArrowRight aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudyCta() {
  const t = useTranslations('DynamicContent');

  return (
    <section className="case-study-template__cta">
      <div className="site-frame-wide case-study-template__cta-grid">
        <div>
          <SectionBrandMark surface="dark" size="sm" />
          <h2>{t('caseCta.title')}</h2>
          <p>{t('caseCta.description')}</p>
        </div>
        <div className="case-study-template__cta-actions">
          <Link href="/contact" className="case-study-template__cta-primary">
            {t('caseCta.primary')}
            <ArrowRight aria-hidden="true" />
          </Link>
          <Link
            href="/capabilities/solution-programs"
            className="case-study-template__cta-secondary"
          >
            {t('caseCta.secondary')}
          </Link>
        </div>
      </div>
    </section>
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
  const locale = useLocale();
  const projectMedia =
    !study.language || study.language === locale
      ? (study.projectMedia ?? [])
      : [];
  const narrativeMedia = projectMedia.filter(
    (item) =>
      item.deviceType !== 'phone' &&
      (item.placement === 'afterChallenge' ||
        item.placement === 'afterArchitecture'),
  );
  const moduleMedia = projectMedia.filter(
    (item) => item.deviceType === 'phone' || item.placement === 'afterModules',
  );

  return (
    <main
      className="case-study-detail case-study-template"
      data-engagement-type={study.engagementType}
    >
      <article>
        <header className="case-study-template__hero">
          <div className="site-frame-wide">
            <nav
              aria-label={t('breadcrumb')}
              className="case-study-template__breadcrumbs"
            >
              <ol>
                <li>
                  <Link href="/">{t('home')}</Link>
                </li>
                <li>
                  <ArrowLeft aria-hidden="true" />
                  <Link href="/case-studies">{t('caseStudies')}</Link>
                </li>
                <li aria-current="page">{study.title}</li>
              </ol>
            </nav>

            <div className="case-study-template__hero-grid">
              <div className="case-study-template__hero-copy">
                <div className="case-study-template__hero-label">
                  <SectionBrandMark surface="light" size="sm" />
                  <span>{study.industry}</span>
                </div>
                <h1>{study.title}</h1>
                <p className="case-study-template__summary">{study.summary}</p>
              </div>

              <div className="case-study-template__hero-visual">
                <figure className="case-study-template__cover">
                  <Image
                    src={study.assets.coverImage}
                    alt={study.assets.coverAlt ?? study.title}
                    fill
                    priority
                    unoptimized={isSanityCdnImage(study.assets.coverImage)}
                    className="case-study-template__cover-image"
                    sizes="(max-width: 900px) calc(100vw - 2rem), min(58vw, 68rem)"
                  />
                </figure>
                <CaseStudyIdentity study={study} />
              </div>
            </div>
          </div>
        </header>

        <div className="site-frame-wide case-study-template__dossier">
          <CaseStudyNarrative
            challengeTitle={t('caseSections.challenge')}
            challenge={study.problem}
            solutionTitle={t('caseSections.architecture')}
            solution={study.systemArchitecture}
            media={narrativeMedia}
            mediaLabel={t('caseSections.projectMedia')}
          />
          <CaseStudySystems study={study} media={moduleMedia} />
          <CaseStudyHeadlineMetrics metrics={study.headlineMetrics} />
          {study.headlineMetrics.length === 0 ? (
            <CaseStudyOutcomes study={study} />
          ) : null}
          <CaseStudyTestimonial evidence={study.clientEvidence} />
        </div>

        <RelatedCaseStudies studies={relatedStudies} />
        <CaseStudyCta />
      </article>
    </main>
  );
}
