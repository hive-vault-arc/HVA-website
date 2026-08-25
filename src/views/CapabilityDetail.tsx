'use client';

import Image from 'next/image';
import {MotionConfig, motion, useScroll, useTransform} from 'framer-motion';
import {useLocale, useTranslations} from 'next-intl';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Compass,
  Gauge,
  Layers3,
  Route,
  ShieldCheck,
  Workflow,
} from '@/components/icons';
import BottomCTA from '../components/BottomCTA';
import {Link} from '@/i18n/navigation';
import {useAnimationQuality} from '../lib/animationQuality';
import type {CapabilityProfile, CapabilityProfileSummary} from '../lib/capabilities';
import {isSanityCdnImage} from '../lib/image-delivery';
import {
  SEMANTIC_MEDIA,
  semanticMediaAlt,
  type SemanticMediaDefinition,
} from '../lib/semantic-media';
import type {AppLocale} from '../i18n/config';
import styles from './CapabilityDetail.module.css';

type CapabilityDetailProps = {
  capability: CapabilityProfile;
  relatedCapabilities: CapabilityProfileSummary[];
};

type DeliveryStep = {
  step: string;
  title: string;
  detail: string;
  output: string;
};

const CAPABILITY_VISUALS: Record<string, SemanticMediaDefinition> = {
  'strategy-business': SEMANTIC_MEDIA.capabilities.strategyBusiness,
  'technology-consulting': SEMANTIC_MEDIA.capabilities.technologyConsulting,
  'ai-data-analytics': SEMANTIC_MEDIA.capabilities.aiData,
  'software-engineering': SEMANTIC_MEDIA.capabilities.softwareEngineering,
  'cloud-infrastructure': SEMANTIC_MEDIA.capabilities.cloudInfrastructure,
  'operations-managed': SEMANTIC_MEDIA.capabilities.operationsManaged,
};

const SCOPE_ICONS = [Compass, Route, Workflow, Layers3, ShieldCheck, Gauge];
const DELIVERY_ICONS = [Compass, Workflow, Gauge];

function getCapabilityVisual(slug: string) {
  return CAPABILITY_VISUALS[slug];
}

export default function CapabilityDetail({capability, relatedCapabilities}: CapabilityDetailProps) {
  const t = useTranslations('DynamicContent');
  const locale = useLocale() as AppLocale;
  const {motionReduced} = useAnimationQuality();
  const {scrollYProgress} = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const primaryOutcome = capability.relatedOutcomes[0] ?? t('capability.fallbackOutcome');
  const secondaryOutcome =
    capability.relatedOutcomes[1] ?? capability.briefBullets[0] ?? t('capability.fallbackDelivery');
  const outcomes = [primaryOutcome, secondaryOutcome, ...capability.relatedOutcomes.slice(2, 4)].filter(
    (outcome, index, all) => all.indexOf(outcome) === index,
  );
  const deliverySteps = t.raw('capability.deliverySteps') as DeliveryStep[];
  const capabilityVisual = getCapabilityVisual(capability.slug);
  const capabilityVisualSrc = capabilityVisual?.desktopSrc ?? capability.heroImage;
  const capabilityVisualAlt = capabilityVisual
    ? semanticMediaAlt(capabilityVisual, locale)
    : t('capability.heroImageAlt', {title: capability.title});

  return (
    <MotionConfig reducedMotion={motionReduced ? 'always' : 'never'}>
      <main className={styles.page} data-capability={capability.slug}>
        <motion.div
          aria-hidden="true"
          className={styles.progress}
          style={{scaleX: progressScale}}
        />

        <section className={styles.hero}>
          <div className={`site-frame ${styles.heroFrame}`}>
            <Image
              src={capabilityVisualSrc}
              alt={capabilityVisualAlt}
              fill
              priority
              quality={90}
              unoptimized={isSanityCdnImage(capabilityVisualSrc)}
              sizes="(max-width: 820px) calc(100vw - 32px), calc(100vw - 64px)"
              className={styles.heroImage}
            />
            <div className={styles.heroShade} aria-hidden="true" />

            <div className={styles.heroContent}>
              <nav aria-label={t('breadcrumb')}>
                <Link href="/capabilities" className={styles.backLink}>
                  <ArrowLeft className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                  {t('capabilities')}
                </Link>
              </nav>

              <div className={styles.eyebrow}>
                <span aria-hidden="true" />
                {capability.kicker || t('capability.label')}
              </div>

              <h1>{capability.title}</h1>

              <p className={styles.lede}>
                {capability.briefLine}
              </p>

              <div className={styles.heroActions}>
                <Link href="/contact" className={styles.primaryAction}>
                  {t('capability.start')}
                </Link>
                <Link href={`/capabilities/in-detail#pillar-${capability.slug}`} className={styles.secondaryAction}>
                  {t('capability.fullMap')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.briefBand} aria-label={t('capability.atAGlance')}>
          <div className={`site-frame ${styles.briefGrid}`}>
            <div className={styles.briefLabel}>{t('capability.atAGlance')}</div>
            <ol>
              {capability.briefBullets.slice(0, 3).map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="context" className={styles.decisionSection}>
          <div className={`site-frame ${styles.decisionGrid}`}>
            <header className={styles.sectionHeading}>
              <div className={styles.lightEyebrow}>{t('capability.contextEyebrow')}</div>
              <h2>{t('capability.contextTitle')}</h2>
            </header>

            <article className={styles.decisionColumn}>
              <span>01</span>
              <h3>{t('capability.strategicContext')}</h3>
              <p>{capability.strategicContext}</p>
            </article>

            <article className={styles.decisionColumn}>
              <span>02</span>
              <h3>{t('capability.executionContext')}</h3>
              <p>{capability.executionContext}</p>
            </article>
          </div>
        </section>

        <section id="coverage" className={styles.scopeSection}>
          <div className={`site-frame ${styles.scopeGrid}`}>
            <header className={styles.sectionHeading}>
              <div className={styles.lightEyebrow}>{t('capability.coverageEyebrow')}</div>
              <h2>{t('capability.coverageTitle')}</h2>
              <p>{t('capability.scopeDescription')}</p>
            </header>

            <ol className={styles.scopeList}>
              {capability.subCapabilities.map((item, index) => {
                const ScopeIcon = SCOPE_ICONS[index % SCOPE_ICONS.length];

                return (
                  <li key={item}>
                    <div className={styles.scopeMeta}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <span className={styles.iconFrame} aria-hidden="true">
                        <ScopeIcon className="h-4 w-4" strokeWidth={1.6} />
                      </span>
                    </div>
                    <p>{item}</p>
                  </li>
                );
              })}
            </ol>
          </div>

        </section>

        <section id="outcomes" className={styles.deliverySection}>
          <div className={`site-frame ${styles.deliveryPanel}`}>
            <div className={styles.deliveryGrid}>
              <header className={styles.deliveryHeading}>
                <div className={styles.darkEyebrow}>{t('capability.deliveryEyebrow')}</div>
                <h2>{t('capability.deliveryTitle')}</h2>
                <p>{t('capability.deliveryDescription')}</p>
              </header>

              <ol className={styles.deliverySteps}>
                {deliverySteps.map((step, index) => {
                  const StepIcon = DELIVERY_ICONS[index % DELIVERY_ICONS.length];

                  return (
                    <li key={step.step}>
                      <div className={styles.stepMeta}>
                        <span>{step.step}</span>
                        <span className={styles.deliveryIcon} aria-hidden="true">
                          <StepIcon className="h-4 w-4" strokeWidth={1.6} />
                        </span>
                      </div>
                      <div className={styles.stepCopy}>
                        <h3>{step.title}</h3>
                        <p>{step.detail}</p>
                      </div>
                      <div className={styles.stepOutput}>
                        <span>{t('capability.workingOutput')}</span>
                        <strong>{step.output}</strong>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className={styles.outcomesBlock}>
              <div>
                <span>{t('capability.outcomesEyebrow')}</span>
                <h3>{t('capability.outcomesTitle')}</h3>
              </div>
              <ul>
                {outcomes.map((outcome) => (
                  <li key={outcome}>
                    <CheckCircle2 className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {relatedCapabilities.length > 0 && (
          <section id="related" className={styles.relatedSection}>
            <div className="site-frame">
              <header className={styles.relatedHeading}>
                <div className={styles.lightEyebrow}>{t('capability.relatedEyebrow')}</div>
                <h2>{t('capability.relatedTitle')}</h2>
              </header>

              <div className={styles.relatedGrid}>
                {relatedCapabilities.map((related, index) => (
                  <Link key={related.slug} href={`/capabilities/${related.slug}`} className={styles.relatedLink}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <strong>{related.shortTitle || related.title}</strong>
                      <p>{related.briefLine}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <BottomCTA
          compact
          variant="light"
          headline={t('capability.bottomTitle', {title: capability.shortTitle || capability.title})}
          subtext={t('capability.bottomDescription')}
          primaryLabel={t('capability.bottomPrimary')}
          primaryHref="/contact"
          secondaryLabel={t('capability.bottomSecondary')}
          secondaryHref="/capabilities"
        />
      </main>
    </MotionConfig>
  );
}
