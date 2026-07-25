'use client';

import type { ElementType, ReactNode } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {useTranslations} from 'next-intl';
import { track } from '@vercel/analytics/react';
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import {Link} from '@/i18n/navigation';
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Gauge,
  GitBranch,
  Settings2,
  ShieldCheck,
  UsersRound,
} from '@/components/icons';
import PageAmbientBackground from '../components/PageAmbientBackground';
import {isSanityCdnImage} from '../lib/image-delivery';
import SectionBrandMark from '../components/SectionBrandMark';
import type { CaseStudy } from '../lib/proof';

type ArcProps = {
  readonly studies: readonly CaseStudy[];
  readonly children?: ReactNode;
};

type ArcPhase = {
  step: string;
  title: string;
  purpose: string;
  output: string;
  description: string;
  checkpoints: readonly string[];
  icon: ElementType;
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const phaseIcons = [Compass, Settings2, Gauge] as const;
const differenceSignalConfig = [
  {
    href: '/aboutus#founders',
    icon: UsersRound,
  },
  {
    href: '/capabilities/operations-managed',
    icon: ShieldCheck,
  },
  {
    href: '/capabilities/in-detail',
    icon: GitBranch,
  },
] as const;

function recordArcEvent(name: string, properties: Record<string, string> = {}) {
  track(name, {
    content_group: 'ARC',
    ...properties,
  });
}

export default function Arc({ studies, children }: ArcProps) {
  const t = useTranslations('Arc');
  const phaseCopy = t.raw('phases') as Array<Omit<ArcPhase, 'icon'>>;
  const arcPhases: readonly ArcPhase[] = phaseCopy.map((phase, index) => ({
    ...phase,
    icon: phaseIcons[index] ?? Compass,
  }));
  const buyerFit = t.raw('buyerFit') as string[];
  const signalCopy = t.raw('signals') as Array<{
    title: string;
    description: string;
    linkLabel: string;
  }>;
  const differenceSignals = differenceSignalConfig.map((signal, index) => ({
    ...signal,
    ...signalCopy[index],
  }));
  const caseDisplayTitle: Record<string, string> = {
    'top-tier-crm-transformation-program-real-estate-operations': t('caseTitles.crm'),
    'multilingual-whatsapp-ai-agent': t('caseTitles.whatsapp'),
  };
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const activePhase = arcPhases[activePhaseIndex] ?? arcPhases[0];
  const ActivePhaseIcon = activePhase.icon;

  const orderedStudies = useMemo(() => {
    const preferredOrder = [
      'top-tier-crm-transformation-program-real-estate-operations',
      'multilingual-whatsapp-ai-agent',
    ];

    return preferredOrder
      .map((slug) => studies.find((study) => study.slug === slug))
      .filter((study): study is CaseStudy => Boolean(study));
  }, [studies]);

  useEffect(() => {
    const root = pageRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') return;

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          const section = element.dataset.arcSection;
          const proofVariant = element.dataset.proofVariant;

          if (section && !seen.has(`section:${section}`)) {
            seen.add(`section:${section}`);
            recordArcEvent('arc_section_view', { section });
          }

          if (proofVariant && !seen.has(`proof:${proofVariant}`)) {
            seen.add(`proof:${proofVariant}`);
            recordArcEvent('proof_card_view', { proof_variant: proofVariant });
          }
        });
      },
      { threshold: 0.35 }
    );

    root.querySelectorAll<HTMLElement>('[data-arc-section], [data-proof-variant]').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const selectPhase = (index: number) => {
    setActivePhaseIndex(index);
    recordArcEvent('arc_stage_click', {
      stage: arcPhases[index]?.title ?? 'Unknown',
    });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={pageRef}
        className="arc-redesign about-redesign relative isolate overflow-x-hidden bg-[#FFFFFF] text-[#1A2535]"
      >
        <motion.div
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-[#CD9F40]"
          style={{ scaleX: progressScale }}
        />

        <section
          className="arc-hero-section"
          aria-labelledby="arc-page-title"
          data-arc-section="hero"
        >
          <PageAmbientBackground className="arc-hero-ambient" />
          <div aria-hidden="true" className="arc-hero-light-wash" />

          <div className="arc-hero-shell">
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
              className="arc-hero-copy"
            >
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.55 }}
                className="arc-hero-label"
              >
                <SectionBrandMark size="sm" eager />
                <span>{t('label')}</span>
              </motion.div>

              <motion.h1
                id="arc-page-title"
                variants={fadeUp}
                transition={{ duration: 0.55 }}
                className="arc-hero-title"
              >
                {(t.raw('heroLines') as string[]).map((line) => <span key={line}>{line}</span>)}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.55 }}
                className="arc-hero-lede"
              >
                {t('heroDescription')}
              </motion.p>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.55 }}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <Link
                  href="/contact"
                  className="arc-hero-primary"
                  onClick={() =>
                    recordArcEvent('hero_primary_cta_click', {
                      cta_variant: 'book_arc_diagnostic',
                    })
                  }
                >
                  {t('bookDiagnostic')}
                </Link>
                <Link
                  href="#proof-in-production"
                  className="arc-hero-secondary"
                  onClick={() =>
                    recordArcEvent('hero_secondary_cta_click', {
                      cta_variant: 'see_arc_in_production',
                    })
                  }
                >
                  {t('seeProduction')}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="arc-hero-media-wrap"
            >
              <div className="arc-hero-media">
                <Image
                  src="/Images/capabilities/hva-arc-operating-model-business-workspace.webp"
                  alt={t('heroAlt')}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
              <div
                aria-hidden="true"
                className="capabilities-hero-wordmark pointer-events-none !absolute inset-0 z-[3] !justify-start px-6 md:px-10"
              >
                <strong data-label="ARC" className="!text-[clamp(5rem,8vw,8.5rem)]">
                  <span>ARC</span>
                </strong>
                <span />
              </div>
            </motion.div>
          </div>
        </section>

        <section
          className="about-delivery-section"
          aria-labelledby="arc-process-title"
          data-arc-section="process"
        >
          <div className="about-editorial-shell">
            <div className="about-delivery-header">
              <div className="about-section-heading">
                <span>{t('how')}</span>
                <h2 id="arc-process-title">{t('processTitle')}</h2>
              </div>
              <p>
                {t('processDescription')}
              </p>
            </div>

            <div className="about-delivery-progress" aria-hidden="true">
              <motion.span
                animate={{ width: `${((activePhaseIndex + 1) / arcPhases.length) * 100}%` }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              />
            </div>

            <div className="about-delivery-grid" role="group" aria-label={t('phasesLabel')}>
              {arcPhases.map((phase, index) => {
                const Icon = phase.icon;
                const isActive = activePhaseIndex === index;

                return (
                  <button
                    key={phase.title}
                    type="button"
                    className={`about-delivery-step ${
                      isActive ? 'about-delivery-step-active' : ''
                    }`}
                    onMouseEnter={() => setActivePhaseIndex(index)}
                    onFocus={() => setActivePhaseIndex(index)}
                    onClick={() => selectPhase(index)}
                    aria-expanded={isActive}
                    aria-controls="arc-active-phase"
                  >
                    <Icon className="about-delivery-icon" aria-hidden="true" />
                    <h3>{phase.title}</h3>
                    <p>{phase.purpose}</p>
                  </button>
                );
              })}
            </div>

            <motion.div
              id="arc-active-phase"
              key={activePhase.title}
              className="about-delivery-detail"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              aria-live="polite"
            >
              <div aria-hidden="true" className="arc-dark-grid" />
              <div className="about-delivery-detail-summary">
                <div className="about-delivery-detail-label">
                  <span>{activePhase.step}</span>
                  <em>{t('output', {phase: activePhase.title})}</em>
                </div>
                <div className="about-delivery-detail-title">
                  <ActivePhaseIcon aria-hidden="true" />
                  <h3>{activePhase.output}</h3>
                </div>
                <p>{activePhase.description}</p>
              </div>
              <ul>
                {activePhase.checkpoints.map((checkpoint) => (
                  <li key={checkpoint}>{checkpoint}</li>
                ))}
              </ul>
            </motion.div>

            <div className="arc-operating-keys mt-6" aria-label={t('bestFor')}>
              <span>{t('bestFor')}</span>
              {buyerFit.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section
          className="about-trust-band"
          aria-labelledby="arc-difference-title"
          data-arc-section="difference"
        >
          <div aria-hidden="true" className="arc-dark-grid" />
          <div className="about-editorial-shell about-trust-grid">
            <motion.div
              className="about-trust-copy"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45 }}
            >
              <span>{t('differenceEyebrow')}</span>
              <h2 id="arc-difference-title">{t('differenceTitle')}</h2>
              <p>{t('differenceStatement')}</p>
              <p>{t('differenceDescription')}</p>
              <Link href="/aboutus#founders" className="about-trust-primary-link">
                {t('meetTeam')}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </motion.div>

            <div className="about-trust-ledger">
              {differenceSignals.map((signal) => {
                const Icon = signal.icon;

                return (
                  <motion.article
                    key={signal.title}
                    className="about-trust-item"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.28 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon aria-hidden="true" />
                    <div>
                      <h3>{signal.title}</h3>
                      <p>{signal.description}</p>
                    </div>
                    <Link href={signal.href}>
                      {signal.linkLabel}
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {orderedStudies.length >= 2 && (
          <section
            id="proof-in-production"
            className="home-proof-section scroll-mt-28"
            aria-labelledby="arc-cases-title"
            data-arc-section="proof-in-production"
          >
            <div className="home-proof-shell">
              <div className="home-proof-header">
                <div className="home-proof-title">
                  <SectionBrandMark size="sm" className="mt-0.5" />
                  <div>
                    <p>{t('proofEyebrow')}</p>
                    <h2 id="arc-cases-title">{t('proofTitle')}</h2>
                  </div>
                </div>
                <div className="home-proof-intro">
                  <p>
                    {t('proofDescription')}
                  </p>
                  <div className="home-proof-actions">
                    {orderedStudies.map((study) => (
                      <Link
                        key={study.slug}
                        href={`/case-studies/${study.slug}`}
                        onClick={() =>
                          recordArcEvent('case_study_click', {
                            proof_variant: study.slug,
                          })
                        }
                      >
                        {t('record', {client: study.clientName})}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="home-proof-layout">
                <div className="home-proof-visual">
                  <div className="home-proof-photo home-proof-photo--main">
                    <Image
                      src={orderedStudies[0].assets.coverImage}
                      alt={
                        orderedStudies[0].assets.coverAlt ??
                        `${orderedStudies[0].clientName} transformation engagement`
                      }
                      fill
                      unoptimized={isSanityCdnImage(orderedStudies[0].assets.coverImage)}
                      loading="lazy"
                      sizes="(max-width: 900px) 100vw, 48vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="home-proof-photo home-proof-photo--support">
                    <Image
                      src={orderedStudies[1].assets.coverImage}
                      alt={
                        orderedStudies[1].assets.coverAlt ??
                        `${orderedStudies[1].clientName} transformation engagement`
                      }
                      fill
                      unoptimized={isSanityCdnImage(orderedStudies[1].assets.coverImage)}
                      loading="lazy"
                      sizes="(max-width: 900px) 70vw, 22vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="home-proof-caption">
                    <strong>{t('liveSystems')}</strong>
                    <span>{t('liveSystemsDescription')}</span>
                  </div>
                </div>

                <div className="home-proof-list">
                  {orderedStudies.map((study) => {
                    return (
                      <article
                        key={study.slug}
                        className="home-proof-row"
                        data-proof-variant={study.slug}
                      >
                        <em>
                          {study.clientName} · {study.industry}
                        </em>
                        <h3>{caseDisplayTitle[study.slug] ?? study.title}</h3>
                        <p>
                          <strong>{t('problem')}</strong> {study.problem}{' '}
                          <strong>{t('whatChanged')}</strong> {study.summary}{' '}
                          <strong>{t('status')}</strong> {study.deploymentStatus}.
                        </p>
                        <Link
                          href={`/case-studies/${study.slug}`}
                          className="about-proof-case-link"
                          onClick={() =>
                            recordArcEvent('case_study_click', {
                              proof_variant: study.slug,
                            })
                          }
                        >
                          {t('viewSnapshot')}
                          <ArrowUpRight aria-hidden="true" />
                        </Link>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {children}

        <section
          className="industries-mandate-section"
          aria-labelledby="arc-closing-title"
          data-arc-section="conversion"
        >
          <motion.div
            className="industries-mandate-card"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 0.45 }}
          >
            <div className="industries-mandate-mark">
              <SectionBrandMark surface="dark" size="sm" />
              <span>{t('apply')}</span>
            </div>
            <div className="industries-mandate-content">
              <p className="industries-mandate-quote">
                {t('closingQuote')}
              </p>
              <div className="industries-mandate-cta">
                <h2 id="arc-closing-title">{t('closingTitle')}</h2>
                <p>{t('closingDescription')}</p>
                <div className="industries-mandate-actions">
                  <Link
                    href="/contact"
                    className="industries-mandate-primary"
                    onClick={() =>
                      recordArcEvent('final_primary_cta_click', {
                        cta_variant: 'request_arc_assessment',
                      })
                    }
                  >
                    {t('requestAssessment')}
                  </Link>
                  <Link
                    href="/case-studies"
                    className="industries-mandate-secondary"
                    onClick={() =>
                      recordArcEvent('final_secondary_cta_click', {
                        cta_variant: 'see_case_studies',
                      })
                    }
                  >
                    {t('seeCaseStudies')}
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </MotionConfig>
  );
}
