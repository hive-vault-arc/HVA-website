'use client';

import { useLayoutEffect, useRef, type ComponentType } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Compass,
  Layers3,
  Route,
  Users,
  type IconsaxGlyphProps,
} from '@/components/icons';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { HomeHeroMetric } from '../lib/home-hero';
import type { CaseStudyShowcaseSummary, ClientEvidenceSummary } from '../lib/proof';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type RouteItem = {
  href: string;
  label: string;
  title: string;
  icon: ComponentType<IconsaxGlyphProps>;
  image?: {
    src: string;
    alt: string;
  };
};

const ROUTES: Record<'industries' | 'caseStudies' | 'arc' | 'insights' | 'contact', RouteItem> = {
  industries: {
    href: '/industries',
    label: 'Where we work',
    title: 'Industries',
    icon: Building2,
    image: {
      src: '/Images/page-heroes/hva-industries-hero-background.webp',
      alt: 'Architectural industry structures in Hive Vault Arc navy',
    },
  },
  caseStudies: {
    href: '/case-studies',
    label: 'See it in action',
    title: 'Case Studies',
    icon: BarChart3,
    image: {
      src: '/Images/insights/hva-case-studies-ai-transformation-morocco.webp',
      alt: 'Business performance reports prepared for a case study review',
    },
  },
  arc: {
    href: '/arc',
    label: 'Our approach',
    title: 'ARC Framework',
    icon: Route,
  },
  insights: {
    href: '/insights',
    label: 'Stay informed',
    title: 'Insights',
    icon: BookOpen,
  },
  contact: {
    href: '/contact',
    label: "Let's talk",
    title: 'Book a Call',
    icon: CalendarCheck,
  },
};

const METRIC_ICONS = [BarChart3, Users, Building2] as const;

function RouteArrow() {
  return (
    <span className="decision-guide__arrow" aria-hidden="true">
      <ArrowRight />
    </span>
  );
}

function CompactRoute({ item, className = '' }: { item: RouteItem; className?: string }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`decision-route decision-route--compact ${className}`.trim()}
      data-guide-reveal
    >
      {item.image ? (
        <span className="decision-route__media" data-guide-image>
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(max-width: 480px) 92vw, (max-width: 760px) 44vw, (max-width: 1180px) 45vw, 22vw"
            className="object-cover"
          />
        </span>
      ) : null}
      <span className="decision-route__compact-body">
        <span className="decision-route__icon" aria-hidden="true">
          <Icon />
        </span>
        <span className="decision-route__copy">
          <span>{item.label}</span>
          <strong>{item.title}</strong>
        </span>
        <RouteArrow />
      </span>
    </Link>
  );
}

function getEvidenceDirection(language: string): 'ltr' | 'rtl' {
  const code = language.trim().toLowerCase().split(/[-_]/)[0];
  return code && ['ar', 'fa', 'he', 'ur'].includes(code) ? 'rtl' : 'ltr';
}

function FeaturedEvidence({ evidence }: { evidence?: ClientEvidenceSummary }) {
  if (!evidence) {
    return <div className="decision-proof-card decision-proof-card--featured is-empty" aria-hidden="true" />;
  }

  const proofCopy = evidence.quoteExcerpt ?? evidence.caseStudyTitle;
  const coverImage = evidence.coverImage ?? '/Images/home/pathfinder/pathfinder-proof.webp';
  const coverImageAlt =
    evidence.coverImageAlt ?? `${evidence.clientName} case study delivery environment`;

  return (
    <article className="decision-proof-card decision-proof-card--featured" data-proof-reveal>
      <div className="decision-proof-card__media" data-proof-image>
        <Image
          src={coverImage}
          alt={coverImageAlt}
          fill
          sizes="(max-width: 760px) 92vw, (max-width: 1120px) 38vw, 24vw"
          className="object-cover"
        />
      </div>

      <div className="decision-proof-card__content">
        <header className="decision-proof-card__identity">
          <span className="decision-proof-card__logo">
            {evidence.clientLogo ? (
              <Image
                src={evidence.clientLogo}
                alt={evidence.clientLogoAlt}
                fill
                sizes="4rem"
              />
            ) : (
              <span aria-hidden="true">{evidence.clientName.slice(0, 2).toUpperCase()}</span>
            )}
          </span>
          <span>
            <small>{evidence.industry}</small>
            <strong>{evidence.clientName}</strong>
          </span>
        </header>

        <div className="decision-proof-card__rule" aria-hidden="true" />

        <blockquote dir={getEvidenceDirection(evidence.documentLanguage)}>
          {proofCopy}
        </blockquote>

        <footer>
          <Link href={`/case-studies/${evidence.slug}`}>
            Read case study
            <ArrowRight aria-hidden="true" />
          </Link>
          <span>
            <CheckCircle2 aria-hidden="true" />
            Verified evidence
          </span>
        </footer>
      </div>
    </article>
  );
}

function CaseStudyPreview({
  study,
  position,
}: {
  study: CaseStudyShowcaseSummary;
  position: 'top' | 'bottom';
}) {
  return (
    <article
      className={`decision-proof-card decision-proof-card--compact decision-proof-card--secondary-${position}`}
      data-proof-reveal
    >
      <div className="decision-proof-card__media" data-proof-image>
        <Image
          src={study.assets.coverImage}
          alt={study.assets.coverAlt ?? `${study.clientName} case study delivery environment`}
          fill
          sizes="(max-width: 760px) 30vw, (max-width: 1180px) 14vw, 9vw"
          className="object-cover"
        />
      </div>

      <div className="decision-proof-card__content">
        <header className="decision-proof-card__identity">
          <span className="decision-proof-card__logo">
            {study.assets.clientLogo ? (
              <Image
                src={study.assets.clientLogo}
                alt={study.assets.clientLogoAlt ?? `${study.clientName} logo`}
                fill
                sizes="3rem"
              />
            ) : (
              <span aria-hidden="true">{study.clientName.slice(0, 2).toUpperCase()}</span>
            )}
          </span>
          <span>
            <span className="decision-proof-card__industry">{study.industry}</span>
            <strong>{study.clientName}</strong>
          </span>
        </header>

        <p className="decision-proof-card__summary">{study.summary}</p>

        <footer>
          <Link href={`/case-studies/${study.slug}`}>
            Read case study
            <ArrowRight aria-hidden="true" />
          </Link>
        </footer>
      </div>
    </article>
  );
}

export default function HomeDecisionGuide({
  evidence,
  caseStudies,
  metrics,
}: {
  readonly evidence: readonly ClientEvidenceSummary[];
  readonly caseStudies: readonly CaseStudyShowcaseSummary[];
  readonly metrics: readonly HomeHeroMetric[];
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const featuredEvidence = evidence[0];
  const secondaryCaseStudies = caseStudies
    .filter((study) => study.slug !== featuredEvidence?.slug)
    .slice(0, 2);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const motion = gsap.matchMedia();
    const context = gsap.context(() => {
      motion.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-guide-reveal]',
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            ease: 'power3.out',
            stagger: 0.07,
            scrollTrigger: {
              trigger: '.decision-guide',
              start: 'top 76%',
              once: true,
            },
          }
        );

        gsap.fromTo(
          '[data-guide-image]',
          { scale: 0.94 },
          {
            scale: 1,
            duration: 1.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.decision-guide',
              start: 'top 76%',
              once: true,
            },
          }
        );

        gsap.fromTo(
          '[data-proof-reveal]',
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: '.decision-proof',
              start: 'top 78%',
              once: true,
            },
          }
        );

        gsap.fromTo(
          '[data-proof-image] img',
          { scale: 1.08 },
          {
            scale: 1,
            duration: 1.25,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.decision-proof',
              start: 'top 78%',
              once: true,
            },
          }
        );
      });

      motion.add(
        '(prefers-reduced-motion: no-preference) and (min-width: 1181px)',
        () => {
          const routeLines = gsap.utils.toArray<SVGPathElement>(
            '[data-guide-route-line]'
          );
          const routeDots = gsap.utils.toArray<SVGCircleElement>(
            '[data-guide-route-dot]'
          );

          routeLines.forEach((line) => {
            const lineLength = line.getTotalLength();
            gsap.set(line, {
              strokeDasharray: lineLength,
              strokeDashoffset: -lineLength,
            });
          });
          gsap.set(routeDots, { autoAlpha: 0, y: -90 });

          const routeTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: '.decision-guide',
              start: 'top 76%',
              once: true,
            },
          });

          routeTimeline
            .to(
              routeLines,
              {
                strokeDashoffset: 0,
                duration: 4.35,
                ease: 'power1.inOut',
                stagger: 0.12,
              },
              0
            )
            .to(
              routeDots,
              {
                autoAlpha: 1,
                y: 0,
                duration: 4.1,
                ease: 'power2.out',
                stagger: 0.13,
              },
              0.12
            );
        }
      );
    }, root);

    return () => {
      motion.revert();
      context.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="home-decision-experience">
      <nav className="decision-guide" aria-labelledby="decision-guide-title">
        <svg
          className="decision-guide__route-art"
          viewBox="0 0 320 520"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M18 16C184 82 265 248 262 515"
            data-guide-route-line
          />
          <path
            d="M-18 88C139 148 213 295 210 515"
            data-guide-route-line
          />
          <path
            d="M-42 162C90 215 154 338 154 515"
            data-guide-route-line
          />
          <circle cx="205" cy="144" r="4" data-guide-route-dot />
          <circle cx="245" cy="232" r="5" data-guide-route-dot />
          <circle cx="209" cy="318" r="4" data-guide-route-dot />
          <circle cx="260" cy="405" r="5" data-guide-route-dot />
        </svg>

        <div className="decision-guide__shell">
          <header className="decision-guide__intro" data-guide-reveal>
            <p className="decision-eyebrow">Website guide</p>
            <h2 id="decision-guide-title">
              Choose your <span>route.</span>
            </h2>
            <span className="decision-intro-rule" aria-hidden="true" />
            <p className="decision-intro-copy">
              Smart paths to the expertise and insights that move your business forward.
            </p>
            <Link href="/capabilities" className="decision-guide__start">
              <Compass aria-hidden="true" />
              Find my starting point
              <ArrowRight motion="nudge" aria-hidden="true" />
            </Link>
          </header>

          <div className="decision-guide__matrix">
            <Link
              href="/capabilities"
              className="decision-route decision-route--capabilities"
              data-guide-reveal
            >
              <span className="decision-route__media" data-guide-image>
                <Image
                  src="/Images/page-heroes/hva-capabilities-hero-background.webp"
                  alt="Abstract systems map for Hive Vault Arc capabilities"
                  fill
                  sizes="(max-width: 760px) 92vw, (max-width: 1120px) 44vw, 30vw"
                  className="object-cover"
                />
              </span>
              <span className="decision-route__capability-body">
                <span className="decision-route__icon decision-route__icon--dark" aria-hidden="true">
                  <Layers3 />
                </span>
                <span className="decision-route__copy">
                  <span>Core offering</span>
                  <strong>Capabilities</strong>
                </span>
                <RouteArrow />
              </span>
            </Link>

            <CompactRoute item={ROUTES.industries} className="decision-route--industries" />
            <CompactRoute item={ROUTES.caseStudies} className="decision-route--case-studies" />

            <Link
              href={ROUTES.arc.href}
              className="decision-route decision-route--arc"
              data-guide-reveal
            >
              <span className="decision-route__arc-icon" aria-hidden="true">
                <Route />
              </span>
              <span className="decision-route__copy">
                <span>{ROUTES.arc.label}</span>
                <strong>{ROUTES.arc.title}</strong>
              </span>
              <RouteArrow />
            </Link>

            <div className="decision-guide__more" data-guide-reveal>
              More ways to connect
            </div>
            <div className="decision-guide__connections" data-guide-reveal>
              {[ROUTES.insights, ROUTES.contact].map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <Icon aria-hidden="true" />
                    <span className="decision-route__copy">
                      <span>{item.label}</span>
                      <strong>{item.title}</strong>
                    </span>
                    <RouteArrow />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      <section className="decision-proof" aria-labelledby="decision-proof-title">
        <div className="decision-proof__shell">
          <header className="decision-proof__intro" data-proof-reveal>
            <p className="decision-eyebrow">Client evidence</p>
            <h2 id="decision-proof-title">
              Proof in <span>motion.</span>
            </h2>
            <span className="decision-intro-rule" aria-hidden="true" />
            <p className="decision-intro-copy">Real outcomes. Measurable impact.</p>

            {metrics.length > 0 ? (
              <div className="decision-proof__metrics" aria-label="Measured case study outcomes">
                {metrics.slice(0, 3).map((metric, index) => {
                  const Icon = METRIC_ICONS[index] ?? BarChart3;
                  return (
                    <div key={`${metric.value}-${metric.label}`} className="decision-proof__metric">
                      <span aria-hidden="true">
                        <Icon />
                      </span>
                      <strong>{metric.value}</strong>
                      <small>{metric.label}</small>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </header>

          <div className="decision-proof__board">
            <FeaturedEvidence evidence={featuredEvidence} />
            {(['top', 'bottom'] as const).map((position, index) => {
              const study = secondaryCaseStudies[index];

              return study ? (
                <CaseStudyPreview key={study.slug} study={study} position={position} />
              ) : (
                <div
                  key={position}
                  className={`decision-proof-card decision-proof-card--empty-${position} is-empty`}
                  aria-hidden="true"
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
