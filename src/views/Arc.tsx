'use client';

import type {ReactNode} from 'react';
import {useEffect, useMemo, useRef, useState} from 'react';
import {track} from '@vercel/analytics/react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {
  ArrowRight,
  ArrowUpRight,
  ChartArea,
  Gauge,
  TrendingUp,
} from '@/components/icons';
import type {CaseStudy} from '@/lib/proof';

type ArcProps = {
  readonly studies: readonly CaseStudy[];
  readonly children?: ReactNode;
};

type ArcPhaseCopy = {
  step: string;
  title: string;
  purpose: string;
  output: string;
  description: string;
  checkpoints: readonly string[];
  imageAlt: string;
};

type ArcPhase = ArcPhaseCopy & {
  image: string;
  letter: string;
};

const phaseImages = [
  '/Images/arc/hva-arc-assess-diagnostic-v2.webp',
  '/Images/arc/hva-arc-reengineer-architecture-v2.webp',
  '/Images/arc/hva-arc-command-network-v2.webp',
] as const;

const phaseLetters = ['A', 'R', 'C'] as const;

const differenceSignalConfig = [
  {href: '/aboutus#founders'},
  {href: '/capabilities/operations-managed'},
  {href: '/capabilities/in-detail'},
] as const;

const immoworldSlug =
  'top-tier-crm-transformation-program-real-estate-operations';

function recordArcEvent(name: string, properties: Record<string, string> = {}) {
  track(name, {
    content_group: 'ARC',
    ...properties,
  });
}

export default function Arc({studies, children}: ArcProps) {
  const t = useTranslations('Arc');
  const phaseCopy = t.raw('phases') as ArcPhaseCopy[];
  const arcPhases: readonly ArcPhase[] = phaseCopy.map((phase, index) => ({
    ...phase,
    image: phaseImages[index] ?? phaseImages[0],
    letter: phaseLetters[index] ?? 'A',
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

  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const leadRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);

  const outcomeStudy = useMemo(() => {
    return studies.find(
      (study) =>
        study.slug === immoworldSlug && study.publishedOutcomes.length > 0
    );
  }, [studies]);
  const benchmarkOutcomes =
    outcomeStudy?.publishedOutcomes.filter(
      (outcome) => outcome.scope === 'benchmark'
    ) ?? [];
  const caseOutcomes =
    outcomeStudy?.publishedOutcomes.filter(
      (outcome) => outcome.scope === 'caseStudy'
    ) ?? [];

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
            recordArcEvent('arc_section_view', {section});
          }

          if (proofVariant && !seen.has(`proof:${proofVariant}`)) {
            seen.add(`proof:${proofVariant}`);
            recordArcEvent('proof_card_view', {proof_variant: proofVariant});
          }
        });
      },
      {threshold: 0.32}
    );

    root
      .querySelectorAll<HTMLElement>('[data-arc-section], [data-proof-variant]')
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = pageRef.current;
    if (!root || !processRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([gsapModule, scrollTriggerModule]) => {
        if (cancelled) return;

        const gsap = gsapModule.gsap;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        const context = gsap.context(() => {
          if (progressRef.current) {
            gsap.fromTo(
              progressRef.current,
              {scaleX: 0},
              {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: root,
                  start: 'top top',
                  end: 'bottom bottom',
                  scrub: 0.25,
                },
              }
            );
          }

          const leadWords = gsap.utils.toArray<HTMLElement>(
            '.arc-briefing__lead-copy span:not(:first-child)'
          );
          if (leadWords.length > 0 && leadRef.current) {
            gsap.fromTo(
              leadWords,
              {opacity: 0.72},
              {
                opacity: 1,
                stagger: 0.12,
                ease: 'none',
                scrollTrigger: {
                  trigger: leadRef.current,
                  start: 'top 72%',
                  end: 'bottom 42%',
                  scrub: 0.6,
                },
              }
            );
          }

          const stages = gsap.utils.toArray<HTMLElement>(
            '.arc-briefing__stage'
          );
          stages.forEach((stage, index) => {
            const image = stage.querySelector<HTMLElement>(
              '.arc-briefing__stage-media'
            );

            if (image) {
              gsap.fromTo(
                image,
                {scale: 0.92, opacity: 0.55},
                {
                  scale: 1,
                  opacity: 1,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: stage,
                    start: 'top 82%',
                    end: 'top 36%',
                    scrub: 0.7,
                  },
                }
              );
            }

            ScrollTrigger.create({
              trigger: stage,
              start: 'top 56%',
              end: 'bottom 44%',
              onEnter: () => setActivePhaseIndex(index),
              onEnterBack: () => setActivePhaseIndex(index),
            });
          });

          cleanup = () => {
            context.revert();
          };
        }, root);
      }
    );

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  const selectPhase = (index: number) => {
    setActivePhaseIndex(index);
    recordArcEvent('arc_stage_click', {
      stage: arcPhases[index]?.title ?? 'Unknown',
    });
  };

  const leadSentences = t('leadDescription').split(/(?<=\.)\s+/);
  const leadTitleLines = t('leadTitle').split(/(?<=\.)\s+/);

  return (
    <div ref={pageRef} className="arc-briefing">
      <span
        ref={progressRef}
        className="arc-briefing__progress"
        aria-hidden="true"
      />

      <section
        className="arc-briefing__hero"
        aria-labelledby="arc-page-title"
        data-arc-section="hero"
      >
        <Image
          src="/Images/arc/hva-arc-systems-hero-v2.webp"
          alt={t('heroAlt')}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="arc-briefing__hero-image"
        />
        <div className="arc-briefing__hero-shade" aria-hidden="true" />
        <div className="arc-briefing__shell arc-briefing__hero-content">
          <p className="arc-briefing__hero-label">{t('label')}</p>
          <h1 id="arc-page-title">
            {(t.raw('heroLines') as string[]).map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="arc-briefing__hero-lede">{t('heroDescription')}</p>
          <div className="arc-briefing__hero-actions">
            <Link
              href="/contact"
              className="arc-briefing__button arc-briefing__button--gold"
              onClick={() =>
                recordArcEvent('hero_primary_cta_click', {
                  cta_variant: 'request_arc_assessment',
                })
              }
            >
              {t('requestAssessment')}
            </Link>
            <Link
              href="#proof-in-production"
              className="arc-briefing__button arc-briefing__button--quiet"
              onClick={() =>
                recordArcEvent('hero_secondary_cta_click', {
                  cta_variant: 'see_arc_in_production',
                })
              }
            >
              {t('seeProduction')}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section
        ref={leadRef}
        className="arc-briefing__lead"
        aria-labelledby="arc-lead-title"
        data-arc-section="summary"
      >
        <div className="arc-briefing__shell arc-briefing__lead-layout">
          <div className="arc-briefing__lead-heading">
            <h2 id="arc-lead-title">
              {leadTitleLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
          </div>
          <div className="arc-briefing__lead-content">
            <p className="arc-briefing__lead-copy">
              {leadSentences.map((sentence, index) => (
                <span key={`${sentence}-${index}`}>{sentence}</span>
              ))}
            </p>
            <div className="arc-briefing__fit" aria-label={t('bestFor')}>
              <strong>{t('bestFor')}</strong>
              <ul>
                {buyerFit.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="arc-briefing__marquee" aria-label={t('loopAria')}>
        <div aria-hidden="true">
          {[0, 1].map((copy) => (
            <span key={copy}>
              {arcPhases.map((phase) => (
                <b key={`${copy}-${phase.title}`}>{phase.title}</b>
              ))}
            </span>
          ))}
        </div>
      </div>

      <section
        className="arc-briefing__overview"
        aria-labelledby="arc-overview-title"
        data-arc-section="framework-overview"
      >
        <div className="arc-briefing__shell">
          <header className="arc-briefing__section-heading">
            <h2 id="arc-overview-title">{t('indexTitle')}</h2>
            <p>{t('indexDescription')}</p>
          </header>

          <div
            className={`arc-briefing__index arc-briefing__index--active-${
              activePhaseIndex + 1
            }`}
            role="group"
            aria-label={t('phasesLabel')}
          >
            {arcPhases.map((phase, index) => {
              const isActive = activePhaseIndex === index;
              return (
                <button
                  key={phase.title}
                  type="button"
                  className={isActive ? 'is-active' : undefined}
                  aria-pressed={isActive}
                  onMouseEnter={() => setActivePhaseIndex(index)}
                  onFocus={() => setActivePhaseIndex(index)}
                  onClick={() => selectPhase(index)}
                >
                  <span aria-hidden="true">{phase.letter}</span>
                  <div>
                    <h3>{phase.title}</h3>
                    <p>{phase.purpose}</p>
                    <strong>{phase.output}</strong>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section
        ref={processRef}
        className="arc-briefing__process"
        aria-labelledby="arc-process-title"
        data-arc-section="process"
      >
          <div className="arc-briefing__shell arc-briefing__process-layout">
          <div className="arc-briefing__process-intro">
            <h2 id="arc-process-title">
              {t('processTitle')
                .split(/(?<=\.)\s+/)
                .map((line) => (
                  <span key={line}>{line}</span>
                ))}
            </h2>
            <p>{t('processDescription')}</p>
            <ol aria-label={t('phasesLabel')}>
              {arcPhases.map((phase, index) => (
                <li
                  key={phase.title}
                  className={activePhaseIndex === index ? 'is-active' : undefined}
                >
                  <span>{phase.letter}</span>
                  {phase.title}
                </li>
              ))}
            </ol>
          </div>

          <div className="arc-briefing__stages">
            {arcPhases.map((phase) => (
              <article className="arc-briefing__stage" key={phase.title}>
                <figure className="arc-briefing__stage-media">
                  <Image
                    src={phase.image}
                    alt={phase.imageAlt}
                    fill
                    quality={90}
                    sizes="(max-width: 1023px) 100vw, 54vw"
                    className="arc-briefing__stage-image"
                  />
                </figure>
                <div className="arc-briefing__stage-copy">
                  <h3>{phase.title}</h3>
                  <p>{phase.description}</p>
                  <div>
                    <strong>{phase.output}</strong>
                    <ul>
                      {phase.checkpoints.map((checkpoint) => (
                        <li key={checkpoint}>{checkpoint}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="arc-briefing__shell arc-briefing__accountability">
          <div>
            <h2>{t('differenceTitle')}</h2>
            <p>{t('differenceStatement')}</p>
            <p>{t('differenceDescription')}</p>
          </div>
          <div className="arc-briefing__accountability-links">
            {differenceSignals.map((signal) => (
              <Link href={signal.href} key={signal.title}>
                <span>
                  <strong>{signal.title}</strong>
                  <em>{signal.description}</em>
                </span>
                <span>
                  {signal.linkLabel}
                  <ArrowUpRight aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {outcomeStudy && caseOutcomes.length > 0 && (
        <section
          id="proof-in-production"
          className="arc-briefing__outcomes"
          aria-labelledby="arc-outcomes-title"
          data-arc-section="proof-in-production"
        >
          <div className="arc-briefing__shell">
            <div className="arc-briefing__outcomes-overview">
              <header className="arc-briefing__outcomes-heading">
                <p>{t('outcomesEyebrow')}</p>
                <h2 id="arc-outcomes-title">{t('outcomesTitle')}</h2>
                <p>{t('outcomesDescription')}</p>
              </header>

              {benchmarkOutcomes.length > 0 && (
                <div className="arc-briefing__benchmarks">
                  {benchmarkOutcomes.map((outcome) => {
                    const BenchmarkIcon =
                      outcome.category === 'throughput'
                        ? TrendingUp
                        : outcome.category === 'cycleTime'
                          ? Gauge
                          : ChartArea;

                    return (
                      <article key={outcome._key} data-category={outcome.category}>
                        <BenchmarkIcon
                          aria-hidden="true"
                          color="var(--arc-gold)"
                        />
                        <div>
                          <strong>{outcome.value}</strong>
                          <h3>{outcome.label}</h3>
                          <p>{outcome.context}</p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>

            <article
              className="arc-briefing__outcome-case"
              data-proof-variant={outcomeStudy.slug}
            >
              <figure className="arc-briefing__outcome-case-media">
                <Image
                  src="/Images/arc/hva-arc-real-estate-operations-v2.webp"
                  alt={t('outcomesImageAlt')}
                  fill
                  quality={90}
                  sizes="(max-width: 1023px) 100vw, 48vw"
                />
              </figure>
              <div className="arc-briefing__outcome-case-content">
                <p>{t('outcomesCaseEyebrow')}</p>
                <h3>{t('caseTitles.crm')}</h3>
                <p>{outcomeStudy.summary}</p>
                <div className="arc-briefing__case-outcomes">
                  {caseOutcomes.map((outcome) => (
                    <div key={outcome._key}>
                      <strong>{outcome.value}</strong>
                      <span>{outcome.label}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/case-studies/${outcomeStudy.slug}`}
                  onClick={() =>
                    recordArcEvent('case_study_click', {
                      proof_variant: outcomeStudy.slug,
                    })
                  }
                >
                  {t('viewSnapshot')}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </article>
          </div>
        </section>
      )}

      <div className="arc-briefing__questions">{children}</div>

      <section
        className="arc-briefing__close"
        aria-labelledby="arc-closing-title"
        data-arc-section="conversion"
      >
        <div className="arc-briefing__shell arc-briefing__close-layout">
          <p>{t('closingQuote')}</p>
          <div>
            <h2 id="arc-closing-title">{t('closingTitle')}</h2>
            <p>{t('closingDescription')}</p>
            <div>
              <Link
                href="/contact"
                className="arc-briefing__button arc-briefing__button--gold"
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
                className="arc-briefing__button arc-briefing__button--quiet"
                onClick={() =>
                  recordArcEvent('final_secondary_cta_click', {
                    cta_variant: 'see_case_studies',
                  })
                }
              >
                {t('seeCaseStudies')}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
