'use client';

import Image from 'next/image';
import {useLocale, useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  ChartArea,
  CheckCircle2,
  ExternalLink,
  Gauge,
  GitBranch,
  Layers,
  Network,
  TrendingUp,
  Users,
  Workflow,
} from '@/components/icons';
import SectionBrandMark from '@/components/SectionBrandMark';
import CaseStudyProjectMedia, {
  type CaseStudyProjectMediaLabels,
} from '@/components/CaseStudyProjectMedia';
import CaseStudyTestimonial from '@/components/CaseStudyTestimonial';
import EditorialAnswerPanel from '@/components/EditorialAnswerPanel';
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

function orderProjectMedia(items: ProjectMedia[]) {
  return [
    ...items.filter((item) => item.deviceType !== 'phone'),
    ...items.filter((item) => item.deviceType === 'phone'),
  ];
}

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
      <header className="case-study-template__headline-metrics-intro">
        <div className="case-study-template__headline-metrics-intro-copy">
          <span className="case-study-template__headline-metrics-eyebrow">
            {t('caseSections.headlineMetrics')}
          </span>
          <h2>{t('caseSections.outcomesTitle')}</h2>
        </div>
      </header>
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
              <h3 className="case-study-template__headline-metric-title">
                {metric.label}
              </h3>
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
  mediaLabels,
}: {
  readonly challengeTitle: string;
  readonly challenge: string;
  readonly solutionTitle: string;
  readonly solution: string;
  readonly media: ProjectMedia[];
  readonly mediaLabel: string;
  readonly mediaLabels: CaseStudyProjectMediaLabels;
}) {
  return (
    <section
      className="case-study-template__narrative"
      aria-labelledby="challenge-title solution-title"
      data-has-media={media.length > 0 ? 'true' : 'false'}
    >
      <div className="case-study-template__narrative-pair">
        <article
          id="challenge"
          className="case-study-template__narrative-panel"
        >
          <span
            className="case-study-template__narrative-kicker"
            aria-hidden="true"
          >
            01 /
          </span>
          <h2 id="challenge-title">{challengeTitle}</h2>
          <p>{challenge}</p>
        </article>
        <article
          id="solution"
          className="case-study-template__narrative-panel case-study-template__narrative-panel--dark"
        >
          <span
            className="case-study-template__narrative-kicker"
            aria-hidden="true"
          >
            02 /
          </span>
          <h2 id="solution-title">{solutionTitle}</h2>
          <p>{solution}</p>
        </article>
      </div>
      <CaseStudyProjectMedia
        items={media}
        label={mediaLabel}
        mediaLabels={mediaLabels}
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
}: {
  readonly study: CaseStudy;
}) {
  const t = useTranslations('DynamicContent');
  const hasModules = study.operationalModules.length > 0;
  const hasIntegrations = study.integrations.length > 0;

  if (!hasModules && !hasIntegrations) return null;

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
      data-has-media="false"
    >
      {hasModules ? (
        <div className="case-study-template__modules">
          <div className="case-study-template__systems-heading">
            <span className="case-study-template__systems-heading-icon" aria-hidden="true">
              <Layers />
            </span>
            <div>
              <span className="case-study-template__systems-eyebrow">01 / OPERATING LAYER</span>
              <h2 id="case-study-systems-title">{t('caseSections.modules')}</h2>
            </div>
          </div>
          <ol>
            {study.operationalModules.map((module, index) => (
              <li key={module}>
                <span className="case-study-template__systems-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{module}</span>
                <CheckCircle2 aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {hasIntegrations ? (
        <div className="case-study-template__integrations">
          <div className="case-study-template__systems-heading">
            <span className="case-study-template__systems-heading-icon" aria-hidden="true">
              <GitBranch />
            </span>
            <div>
              <span className="case-study-template__systems-eyebrow">02 / DELIVERY STACK</span>
              <h2 id="case-study-integrations-title">{t('caseSections.stack')}</h2>
            </div>
          </div>
          <ol>
            {study.integrations.map((integration, index) => (
              <li key={integration}>
                <span className="case-study-template__systems-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{integration}</span>
                <CheckCircle2 aria-hidden="true" />
              </li>
            ))}
          </ol>
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
                  quality={90}
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
      ? (study.projectMedia ?? []).filter(
          (item) => item.publicationStatus === 'approved',
        )
      : [];
  const desktopMedia = orderProjectMedia(
    projectMedia.filter((item) => item.deviceType !== 'phone'),
  );
  const phoneMedia = orderProjectMedia(
    projectMedia.filter((item) => item.deviceType === 'phone'),
  );
  const proofMedia = orderProjectMedia([...desktopMedia, ...phoneMedia]);
  const projectMediaLabels: CaseStudyProjectMediaLabels = {
    desktop: {
      eyebrow: t('caseSections.desktopProofEyebrow'),
      title: t('caseSections.desktopProof'),
      previousLabel: t('caseSections.desktopPrevious'),
      nextLabel: t('caseSections.desktopNext'),
    },
    phone: {
      eyebrow:
        desktopMedia.length > 0
          ? t('caseSections.mobileProofEyebrow')
          : t('caseSections.mobileProofEyebrow').replace(/^\d{2}/, '01'),
      title: t('caseSections.mobileProof'),
      previousLabel: t('caseSections.mobilePrevious'),
      nextLabel: t('caseSections.mobileNext'),
    },
  };
  const heroDesktopMedia = desktopMedia.find(
    (item) => item.deviceType === 'desktop',
  );
  const heroCoverImage = study.assets.coverImage;

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
                  <span className="case-study-template__hero-label-line" aria-hidden="true" />
                  <span>{study.industry}</span>
                </div>
                <h1>{study.title}</h1>
                <p className="case-study-template__summary">{study.summary}</p>
              </div>

              <div className="case-study-template__hero-visual">
                {heroDesktopMedia ? (
                  <figure className="case-study-template__hero-screen">
                    <Image
                      src={heroDesktopMedia.image}
                      alt={heroDesktopMedia.alt}
                      width={heroDesktopMedia.width}
                      height={heroDesktopMedia.height}
                      priority
                      quality={90}
                      unoptimized={isSanityCdnImage(heroDesktopMedia.image)}
                      className="case-study-template__hero-screen-image"
                      sizes="(max-width: 900px) calc(100vw - 2rem), min(64vw, 76rem)"
                    />
                  </figure>
                ) : (
                  <figure className="case-study-template__cover">
                    <Image
                      src={heroCoverImage}
                      alt={study.assets.coverAlt ?? study.title}
                      fill
                      priority
                      quality={90}
                      unoptimized={isSanityCdnImage(heroCoverImage)}
                      className="case-study-template__cover-image"
                      sizes="(max-width: 900px) calc(100vw - 2rem), min(58vw, 68rem)"
                    />
                    {study.coverDisclosure ? (
                      <figcaption className="case-study-template__cover-disclosure">
                        {study.coverDisclosure}
                      </figcaption>
                    ) : null}
                  </figure>
                )}
                <CaseStudyIdentity study={study} />
              </div>
            </div>
          </div>
        </header>

        <EditorialAnswerPanel editorial={study} />

        <div className="site-frame-wide case-study-template__dossier">
          <CaseStudyTestimonial evidence={study.clientEvidence} />
          <CaseStudyNarrative
            challengeTitle={t('caseSections.challenge')}
            challenge={study.problem}
            solutionTitle={t('caseSections.architecture')}
            solution={study.systemArchitecture}
            media={proofMedia}
            mediaLabel={t('caseSections.projectMedia')}
            mediaLabels={projectMediaLabels}
          />
          <CaseStudySystems study={study} />
          <CaseStudyHeadlineMetrics metrics={study.headlineMetrics} />
          {study.headlineMetrics.length === 0 ? (
            <CaseStudyOutcomes study={study} />
          ) : null}
        </div>

        <RelatedCaseStudies studies={relatedStudies} />
        <CaseStudyCta />
      </article>
    </main>
  );
}
