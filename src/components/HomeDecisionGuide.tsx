'use client';

import { useLayoutEffect, useRef, type ComponentType } from 'react';
import {useTranslations} from 'next-intl';
import Image from 'next/image';
import {Link} from '@/i18n/navigation';
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
  type IconsaxGlyphProps,
} from '@/components/icons';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { CaseStudyShowcaseSummary, ClientEvidenceSummary } from '../lib/proof';
import {isSanityCdnImage} from '../lib/image-delivery';

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

function RouteArrow() {
  return (
    <span className="decision-guide__arrow" aria-hidden="true">
      <ArrowRight size={16} />
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
            quality={90}
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

function FeaturedEvidence({
  evidence,
  readCaseStudy,
  verified,
  deliveryAlt,
}: {
  evidence?: ClientEvidenceSummary;
  readCaseStudy: string;
  verified: string;
  deliveryAlt: (client: string) => string;
}) {
  if (!evidence) return null;

  const proofCopy = evidence.quoteExcerpt ?? evidence.caseStudyTitle;
  const coverImage = evidence.coverImage ?? '/Images/home/pathfinder/pathfinder-proof.webp';
  const coverImageAlt =
    evidence.coverImageAlt ?? deliveryAlt(evidence.clientName);

  return (
    <article className="decision-proof-card decision-proof-card--featured" data-proof-reveal>
      <div className="decision-proof-card__media" data-proof-image>
        <Image
          src={coverImage}
          alt={coverImageAlt}
          fill
          quality={90}
          unoptimized={isSanityCdnImage(coverImage)}
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
                unoptimized={isSanityCdnImage(evidence.clientLogo)}
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
            {readCaseStudy}
            <ArrowRight aria-hidden="true" />
          </Link>
          <span>
            <CheckCircle2 aria-hidden="true" />
            {verified}
          </span>
        </footer>
      </div>
    </article>
  );
}

function CaseStudyPreview({
  study,
  position,
  readCaseStudy,
  deliveryAlt,
  logoAlt,
}: {
  study: CaseStudyShowcaseSummary;
  position: 'top' | 'bottom';
  readCaseStudy: string;
  deliveryAlt: (client: string) => string;
  logoAlt: (client: string) => string;
}) {
  return (
    <article
      className={`decision-proof-card decision-proof-card--compact decision-proof-card--secondary-${position}`}
      data-proof-reveal
    >
      <div className="decision-proof-card__media" data-proof-image>
        <Image
          src={study.assets.coverImage}
          alt={study.assets.coverAlt ?? deliveryAlt(study.clientName)}
          fill
          unoptimized={isSanityCdnImage(study.assets.coverImage)}
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
                alt={study.assets.clientLogoAlt ?? logoAlt(study.clientName)}
                fill
                unoptimized={isSanityCdnImage(study.assets.clientLogo)}
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
            {readCaseStudy}
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
}: {
  readonly evidence: readonly ClientEvidenceSummary[];
  readonly caseStudies: readonly CaseStudyShowcaseSummary[];
}) {
  const t = useTranslations('HomeDecision');
  const rootRef = useRef<HTMLDivElement | null>(null);
  const routes: Record<'industries' | 'caseStudies' | 'arc' | 'insights' | 'contact', RouteItem> = {
    industries: {
      href: '/industries',
      label: t('routes.industriesLabel'),
      title: t('routes.industriesTitle'),
      icon: Building2,
      image: {
        src: '/Images/page-heroes/hva-industries-hero-background.webp',
        alt: t('routes.industriesAlt'),
      },
    },
    caseStudies: {
      href: '/case-studies',
      label: t('routes.caseStudiesLabel'),
      title: t('routes.caseStudiesTitle'),
      icon: BarChart3,
      image: {
        src: '/Images/insights/hva-case-studies-ai-transformation-morocco.webp',
        alt: t('routes.caseStudiesAlt'),
      },
    },
    arc: {
      href: '/arc',
      label: t('routes.arcLabel'),
      title: t('routes.arcTitle'),
      icon: Route,
    },
    insights: {
      href: '/insights',
      label: t('routes.insightsLabel'),
      title: t('routes.insightsTitle'),
      icon: BookOpen,
    },
    contact: {
      href: '/contact',
      label: t('routes.contactLabel'),
      title: t('routes.contactTitle'),
      icon: CalendarCheck,
    },
  };
  const featuredEvidence = evidence[0];
  const secondaryCaseStudies = caseStudies
    .filter((study) => study.slug !== featuredEvidence?.slug)
    .slice(0, 2);
  const proofCount = Number(Boolean(featuredEvidence)) + secondaryCaseStudies.length;
  const hasProofContent = proofCount > 0;

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

        const proofSection = root.querySelector<HTMLElement>('.decision-proof');
        const proofRevealTargets = gsap.utils.toArray<HTMLElement>(
          '[data-proof-reveal]',
          root,
        );
        const proofImageTargets = gsap.utils.toArray<HTMLImageElement>(
          '[data-proof-image] img',
          root,
        );

        if (proofSection && proofRevealTargets.length > 0) {
          gsap.fromTo(
            proofRevealTargets,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              ease: 'power3.out',
              stagger: 0.08,
              scrollTrigger: {
                trigger: proofSection,
                start: 'top 78%',
                once: true,
              },
            },
          );
        }

        if (proofSection && proofImageTargets.length > 0) {
          gsap.fromTo(
            proofImageTargets,
            { scale: 1.08 },
            {
              scale: 1,
              duration: 1.25,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: proofSection,
                start: 'top 78%',
                once: true,
              },
            },
          );
        }
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
  }, [hasProofContent]);

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
            <p className="decision-eyebrow">{t('websiteGuide')}</p>
            <h2 id="decision-guide-title">
              {t('choose')} <span>{t('route')}</span>
            </h2>
            <span className="decision-intro-rule" aria-hidden="true" />
            <p className="decision-intro-copy">
              {t('intro')}
            </p>
            <Link href="/capabilities" className="decision-guide__start">
              <Compass aria-hidden="true" />
              {t('start')}
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
                  alt={t('routes.capabilitiesAlt')}
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
                  <span>{t('coreOffering')}</span>
                  <strong>{t('capabilities')}</strong>
                </span>
                <RouteArrow />
              </span>
            </Link>

            <CompactRoute item={routes.industries} className="decision-route--industries" />
            <CompactRoute item={routes.caseStudies} className="decision-route--case-studies" />

            <Link
              href={routes.arc.href}
              className="decision-route decision-route--arc"
              data-guide-reveal
            >
              <span className="decision-route__arc-icon" aria-hidden="true">
                <Route />
              </span>
              <span className="decision-route__copy">
                <span>{routes.arc.label}</span>
                <strong>{routes.arc.title}</strong>
              </span>
              <RouteArrow />
            </Link>

            <div className="decision-guide__more" data-guide-reveal>
              {t('more')}
            </div>
            <div className="decision-guide__connections" data-guide-reveal>
              {[routes.insights, routes.contact].map((item) => {
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

      {hasProofContent ? (
        <section className="decision-proof" aria-labelledby="decision-proof-title">
          <div className="decision-proof__shell">
            <header className="decision-proof__intro" data-proof-reveal>
              <p className="decision-eyebrow">{t('clientEvidence')}</p>
              <h2 id="decision-proof-title">
                {t('proof')} <span>{t('motion')}</span>
              </h2>
              <span className="decision-intro-rule" aria-hidden="true" />
              <p className="decision-intro-copy">{t('proofDescription')}</p>
            </header>

            <div className={`decision-proof__board decision-proof__board--${proofCount}`}>
              {featuredEvidence ? (
                <FeaturedEvidence
                  evidence={featuredEvidence}
                  readCaseStudy={t('readCaseStudy')}
                  verified={t('verified')}
                  deliveryAlt={(client) => t('deliveryAlt', {client})}
                />
              ) : null}
              {secondaryCaseStudies.map((study, index) => (
                <CaseStudyPreview
                  key={study.slug}
                  study={study}
                  position={index === 0 ? 'top' : 'bottom'}
                  readCaseStudy={t('readCaseStudy')}
                  deliveryAlt={(client) => t('deliveryAlt', {client})}
                  logoAlt={(client) => t('logoAlt', {client})}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
