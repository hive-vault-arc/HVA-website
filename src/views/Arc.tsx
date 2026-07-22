'use client';

import type { ElementType, ReactNode } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { track } from '@vercel/analytics/react';
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
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

const arcPhases: readonly ArcPhase[] = [
  {
    step: '01',
    title: 'Assess',
    purpose: 'Find the constraint before funding the build.',
    output: 'Constraint map',
    description:
      'We map the operating workflow, system dependencies, decision owners, and measurable target before build scope is approved.',
    checkpoints: ['Current-state evidence', 'Constraint priority', 'Decision-ready roadmap'],
    icon: Compass,
  },
  {
    step: '02',
    title: 'Re-engineer',
    purpose: 'Design and deliver the operating system.',
    output: 'Production-ready system',
    description:
      'We redesign the workflow and stack together, then validate integrations, controls, and release readiness against the approved outcome.',
    checkpoints: ['Target workflow', 'Integrated stack', 'Production gate'],
    icon: Settings2,
  },
  {
    step: '03',
    title: 'Command',
    purpose: 'Run, measure, and improve in production.',
    output: 'Live operating metrics',
    description:
      'The same accountable team monitors reliability, reports performance, and turns production evidence into the next improvement cycle.',
    checkpoints: ['Operating telemetry', 'Managed response', 'Improvement backlog'],
    icon: Gauge,
  },
];

const buyerFit = [
  'Fragmented operations',
  'Legacy bottlenecks',
  'AI workflow rollout',
  'Production accountability gaps',
] as const;

const differenceSignals = [
  {
    title: 'One team',
    description: 'Diagnosis, delivery, and live operations stay connected.',
    href: '/aboutus#founders',
    linkLabel: 'Meet the founders',
    icon: UsersRound,
  },
  {
    title: 'Production ownership',
    description: 'Launch is a control point, not the end of the engagement.',
    href: '/capabilities/operations-managed',
    linkLabel: 'See managed operations',
    icon: ShieldCheck,
  },
  {
    title: 'Decision gates',
    description: 'Scope advances only when constraints and evidence are clear.',
    href: '/capabilities/in-detail',
    linkLabel: 'Review delivery depth',
    icon: GitBranch,
  },
] as const;

const differenceStatement =
  'Strategy, build, and operations stay connected under one accountable model, so decisions are made against real constraints and post-launch performance.';

const preferredMetricLabel: Record<string, string> = {
  'top-tier-crm-transformation-program-real-estate-operations': 'Manual Data Entry',
  'multilingual-whatsapp-ai-agent': 'Manual Triage Reduction',
};

const caseDisplayTitle: Record<string, string> = {
  'top-tier-crm-transformation-program-real-estate-operations':
    'One CRM system for live real estate operations.',
  'multilingual-whatsapp-ai-agent': 'AI lead operations across WhatsApp and CRM.',
};

function recordArcEvent(name: string, properties: Record<string, string> = {}) {
  track(name, {
    content_group: 'ARC',
    ...properties,
  });
}

function getMonthYear(status: string) {
  const match = status.match(/(?:since|from)\s+([A-Za-z]+\s+\d{4})/i);
  return match?.[1] ?? 'Live';
}

export default function Arc({ studies, children }: ArcProps) {
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

  const immoWorldStudy = orderedStudies.find(
    (study) => study.slug === 'top-tier-crm-transformation-program-real-estate-operations'
  );

  const immediateProof = immoWorldStudy
    ? [
        ...immoWorldStudy.measuredOutcomes.slice(0, 3).map((metric) => ({
          value: metric.value,
          label: metric.label,
          context: metric.context,
        })),
        {
          value: getMonthYear(immoWorldStudy.deploymentStatus),
          label: 'Live rollout',
          context: immoWorldStudy.deploymentStatus,
        },
      ]
    : [];

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
                <span>ARC operating model</span>
              </motion.div>

              <motion.h1
                id="arc-page-title"
                variants={fadeUp}
                transition={{ duration: 0.55 }}
                className="arc-hero-title"
              >
                <span>Assess the constraint.</span>
                <span>Re-engineer the system.</span>
                <span>Command the outcome.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.55 }}
                className="arc-hero-lede"
              >
                ARC is a closed-loop operating model for technology transformation. We diagnose
                operational constraints, rebuild the workflow and stack, and stay accountable in
                live production until results hold. Strategy, engineering, and operations remain
                under one accountable team.
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
                  Book ARC Diagnostic
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
                  See ARC in Production
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
                  src="/Images/capabilities/hva-arc-operating-model-business-workspace.png"
                  alt="ARC operating model workspace connecting diagnostic evidence, a modular workflow, and an ordered command state"
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

        {immoWorldStudy && immediateProof.length === 4 && (
          <section
            className="arc-record-section"
            aria-labelledby="arc-proof-strip-title"
            data-arc-section="immediate-proof"
          >
            <div className="arc-record-shell">
              <h2 id="arc-proof-strip-title" className="sr-only">
                Published ImmoWorld operating record
              </h2>

              <motion.div
                className="arc-record-intro"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.38 }}
              >
                <div className="arc-record-intro__identity">
                  <SectionBrandMark surface="dark" size="sm" />
                  <span>
                    <small>Published operating record</small>
                    <strong>{immoWorldStudy.clientName}</strong>
                  </span>
                </div>
                <Link href={`/case-studies/${immoWorldStudy.slug}`}>
                  Open case study
                  <ArrowRight aria-hidden="true" />
                </Link>
              </motion.div>

              <div className="arc-record-grid">
                {immediateProof.map((item, index) => (
                  <motion.article
                    key={item.label}
                    className="arc-record-item"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.38, delay: index * 0.05 }}
                  >
                    <span className="arc-record-item__index" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="arc-record-item__label">{item.label}</span>
                    <strong>{item.value}</strong>
                    <p>{item.context}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section
          className="about-delivery-section"
          aria-labelledby="arc-process-title"
          data-arc-section="process"
        >
          <div className="about-editorial-shell">
            <div className="about-delivery-header">
              <div className="about-section-heading">
                <span>How ARC works</span>
                <h2 id="arc-process-title">Three connected decisions. One operating loop.</h2>
              </div>
              <p>
                Each phase ends with a concrete output and a decision gate before the next
                commitment. The model is designed for complex operational change that must hold in
                production.
              </p>
            </div>

            <div className="about-delivery-progress" aria-hidden="true">
              <motion.span
                animate={{ width: `${((activePhaseIndex + 1) / arcPhases.length) * 100}%` }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              />
            </div>

            <div className="about-delivery-grid" role="group" aria-label="ARC operating phases">
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
                  <em>{activePhase.title} output</em>
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

            <div className="arc-operating-keys mt-6" aria-label="ARC is designed for">
              <span>Best for</span>
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
              <span>Why ARC is different</span>
              <h2 id="arc-difference-title">One loop, not three disconnected vendors.</h2>
              <p>{differenceStatement}</p>
              <p>
                Traditional delivery advises, hands off, then supports. ARC diagnoses, builds, and
                operates against the same outcome.
              </p>
              <Link href="/aboutus#founders" className="about-trust-primary-link">
                Meet the team accountable for delivery
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
                    <p>Proof in production</p>
                    <h2 id="arc-cases-title">Two operating records. Context before claims.</h2>
                  </div>
                </div>
                <div className="home-proof-intro">
                  <p>
                    Each result stays attached to the business problem, the system delivered, the
                    deployment scope, and its published measurement context.
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
                        {`${study.clientName} record ->`}
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
                      loading="lazy"
                      sizes="(max-width: 900px) 70vw, 22vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="home-proof-caption">
                    <strong>Live systems, not slideware.</strong>
                    <span>
                      Named operating records with deployment scope and measurement context.
                    </span>
                  </div>
                </div>

                <div className="home-proof-list">
                  {orderedStudies.map((study) => {
                    const preferredLabel = preferredMetricLabel[study.slug];
                    const metric =
                      study.measuredOutcomes.find(
                        (outcome) => outcome.label === preferredLabel
                      ) ?? study.measuredOutcomes[0];

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
                          <strong>Problem:</strong> {study.problem}{' '}
                          <strong>What changed:</strong> {study.summary}{' '}
                          {metric && (
                            <>
                              <strong>Reported result:</strong> {metric.value} {metric.label}.{' '}
                              {metric.context}{' '}
                            </>
                          )}
                          <strong>Scope:</strong> {study.deploymentScale}.{' '}
                          <strong>Status:</strong> {study.deploymentStatus}.
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
                          View case snapshot
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
              <span>Apply ARC</span>
            </div>
            <div className="industries-mandate-content">
              <p className="industries-mandate-quote">
                One accountable team from constraint to production.
              </p>
              <div className="industries-mandate-cta">
                <h2 id="arc-closing-title">Want ARC applied to your operations?</h2>
                <p>
                  Share the constraint, target outcome, and current stack. We&apos;ll map the
                  fastest path to operational gain.
                </p>
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
                    Request ARC Assessment
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
                    See Case Studies
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
