'use client';

import {useLayoutEffect, useRef, type CSSProperties} from 'react';
import {Link} from '@/i18n/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {motion, useScroll, useTransform} from 'framer-motion';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useTranslations} from 'next-intl';
import {
  ArrowUpRight,
  BarChart3,
  MessageSquare,
  Network,
  ShieldCheck,
} from '@/components/icons';
import DeferredMount from '@/components/DeferredMount';
import type {IndustryInsightItem} from '@/components/IndustryInsightsShowcase';
import PageAmbientBackground from '../components/PageAmbientBackground';
import SectionBrandMark from '../components/SectionBrandMark';

const IndustryInsightsShowcase = dynamic(
  () => import('@/components/IndustryInsightsShowcase'),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="industries-insights-deferred-placeholder"
      />
    ),
  },
);

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const IMGS = {
  realEstate: '/Images/industries/real-estate-crm-lead-operations-morocco.webp',
  healthcare:
    '/Images/industries/healthcare-clinical-operations-dashboard-men-morocco.webp',
  logistics: '/Images/industries/logistics-dispatch-workflow-automation-morocco.webp',
  finance: '/Images/industries/finance-brokerage-deal-pipeline-morocco.webp',
  government:
    '/Images/industries/government-public-sector-digital-services-men-morocco.webp',
  retail: '/Images/industries/retail-ecommerce-operations-platform-morocco.webp',
  energy: '/Images/industries/energy-sustainability-monitoring-morocco.webp',
  consumerGoods:
    '/Images/industries/consumer-goods-luxury-analytics-men-morocco.webp',
  rdLab: '/Images/industries/hva-industries-research-development-framework.webp',
};

const INDUSTRIES_PAGE_HERO_IMAGE =
  '/Images/page-heroes/hva-industries-hero-background.webp';

const approachTrackConfig = [
  {
    code: 'IND-001',
    icon: <BarChart3 className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    code: 'IND-002',
    icon: <Network className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    code: 'IND-003',
    icon: <ShieldCheck className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    code: 'IND-004',
    icon: <MessageSquare className="h-5 w-5" strokeWidth={1.5} />,
  },
];

const industryCardConfig = [
  {
    id: 'real-estate',
    image: IMGS.realEstate,
    href: '/case-studies/top-tier-crm-transformation-program-real-estate-operations',
  },
  {
    id: 'healthcare',
    image: IMGS.healthcare,
    href: '/case-studies',
  },
  {
    id: 'financial-services',
    image: IMGS.finance,
    href: '/case-studies',
  },
  {
    id: 'government',
    image: IMGS.government,
    href: '/case-studies',
  },
  {
    id: 'retail',
    image: IMGS.retail,
    href: '/case-studies',
  },
  {
    id: 'energy',
    image: IMGS.energy,
    href: '/case-studies',
  },
  {
    id: 'logistics',
    image: IMGS.logistics,
    href: '/case-studies',
  },
  {
    id: 'consumer-goods',
    image: IMGS.consumerGoods,
    href: '/case-studies',
  },
] as const;

type IndustryCardCopy = {
  id: string;
  category: string;
  title: string;
  description: string;
  imageAlt: string;
  bullets: string[];
};

type IndustryCardData = IndustryCardCopy & {
  image: string;
  href: string;
};

type ApproachTrackCopy = {
  code: string;
  title: string;
  description: string;
  group: 'methodology' | 'compliance';
};

function SectorGallery({
  cards,
  relatedWorkLabel,
}: {
  cards: IndustryCardData[];
  relatedWorkLabel: string;
}) {
  const sectorBands = Array.from(
    {length: Math.ceil(cards.length / 2)},
    (_, bandIndex) => cards.slice(bandIndex * 2, bandIndex * 2 + 2),
  );

  return (
    <div className="industries-dossier-gallery" data-industries-gallery>
      {sectorBands.map((band, bandIndex) => (
        <div
          key={band.map((card) => card.id).join('-')}
          className={`industries-dossier-band ${
            bandIndex % 2 === 1 ? 'industries-dossier-band--reverse' : ''
          }`}
          data-industries-band
        >
          {band.map((card) => {
            const cardIndex = cards.findIndex((item) => item.id === card.id);

            return (
              <article
                key={card.id}
                id={card.id}
                data-industry-card={card.id}
                data-industries-card
                className="industries-dossier-sector"
              >
                <Link
                  href={card.href}
                  className="industries-dossier-sector-link"
                  aria-label={`${card.title}: ${relatedWorkLabel}`}
                >
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    priority={cardIndex < 2}
                    loading={cardIndex < 2 ? 'eager' : 'lazy'}
                    sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 42vw"
                    className="object-cover"
                    data-industries-card-image
                  />
                  <span
                    aria-hidden="true"
                    className="industries-dossier-sector-shade"
                  />

                  <span className="industries-dossier-sector-meta">
                    <span>{String(cardIndex + 1).padStart(2, '0')}</span>
                    <span>{card.category}</span>
                  </span>

                  <span className="industries-dossier-sector-copy">
                    <strong>{card.title}</strong>
                    <span>{card.description}</span>
                    <span className="industries-dossier-sector-tags">
                      {card.bullets.map((bullet) => (
                        <span key={bullet}>{bullet}</span>
                      ))}
                    </span>
                  </span>

                  <span
                    className="industries-dossier-sector-arrow"
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                </Link>
              </article>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function Industries({
  insightItems = [],
}: {
  readonly insightItems?: IndustryInsightItem[];
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations('Industries');
  const {scrollYProgress} = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const cardCopy = t.raw('cards') as IndustryCardCopy[];
  const cards = industryCardConfig.map((config) => ({
    ...config,
    ...cardCopy.find((item) => item.id === config.id)!,
  }));
  const trackCopy = t.raw('research.tracks') as ApproachTrackCopy[];
  const approachTracks = approachTrackConfig.map((config) => ({
    ...config,
    ...trackCopy.find((item) => item.code === config.code)!,
  }));

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const revealTargets = gsap.utils.toArray<HTMLElement>(
          '[data-industries-reveal]',
          root,
        );
        const cardTargets = gsap.utils.toArray<HTMLElement>(
          '[data-industries-card]',
          root,
        );
        const principleTargets = gsap.utils.toArray<HTMLElement>(
          '[data-industries-principle]',
          root,
        );

        revealTargets.forEach((target) => {
          gsap.fromTo(
            target,
            {opacity: 0, y: 28},
            {
              opacity: 1,
              y: 0,
              duration: 0.72,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: target,
                start: 'top 88%',
                once: true,
              },
            },
          );
        });

        cardTargets.forEach((card, index) => {
          gsap.fromTo(
            card,
            {opacity: 0, y: 42},
            {
              opacity: 1,
              y: 0,
              duration: 0.78,
              delay: (index % 4) * 0.045,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                once: true,
              },
            },
          );
        });

        if (principleTargets.length > 0) {
          gsap.fromTo(
            principleTargets,
            {opacity: 0, y: 22},
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: principleTargets[0].parentElement,
                start: 'top 84%',
                once: true,
              },
            },
          );
        }
      });

      media.add(
        '(prefers-reduced-motion: no-preference) and (min-width: 768px)',
        () => {
          const hero = root.querySelector<HTMLElement>('.industries-hero');
          const heroCopy = root.querySelector<HTMLElement>(
            '[data-industries-hero-copy]',
          );
          const heroWordmark = root.querySelector<HTMLElement>(
            '[data-industries-hero-wordmark]',
          );

          if (hero && heroCopy && heroWordmark) {
            gsap.to(heroCopy, {
              y: -24,
              opacity: 0.78,
              ease: 'none',
              scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.65,
              },
            });
            gsap.to(heroWordmark, {
              y: -38,
              ease: 'none',
              scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.65,
              },
            });
          }

          gsap.utils
            .toArray<HTMLElement>('[data-industries-card]', root)
            .forEach((card) => {
              const image = card.querySelector<HTMLElement>(
                '[data-industries-card-image]',
              );
              if (!image) return;

              gsap.fromTo(
                image,
                {'--industries-scroll-scale': 1.085},
                {
                  '--industries-scroll-scale': 1.001,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: card,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.7,
                  },
                },
              );
            });

          const method = root.querySelector<HTMLElement>(
            '[data-industries-method]',
          );
          const methodImage = root.querySelector<HTMLElement>(
            '[data-industries-method-image]',
          );
          const methodCopy = root.querySelector<HTMLElement>(
            '[data-industries-method-copy]',
          );

          if (method && methodImage) {
            gsap.fromTo(
              methodImage,
              {scale: 1.07},
              {
                scale: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: method,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.75,
                },
              },
            );
          }

          if (method && methodCopy) {
            gsap.fromTo(
              methodCopy,
              {opacity: 0.48, y: 18},
              {
                opacity: 1,
                y: 0,
                ease: 'none',
                scrollTrigger: {
                  trigger: method,
                  start: 'top 82%',
                  end: 'center 48%',
                  scrub: 0.65,
                },
              },
            );
          }
        },
      );

      media.add(
        '(prefers-reduced-motion: no-preference) and (min-width: 1200px)',
        () => {
          const atlasLayout = root.querySelector<HTMLElement>(
            '[data-industries-atlas-layout]',
          );
          const atlasIntro = root.querySelector<HTMLElement>(
            '[data-industries-atlas-intro]',
          );
          const gallery = root.querySelector<HTMLElement>(
            '[data-industries-gallery]',
          );
          const indexLinks = gsap.utils.toArray<HTMLAnchorElement>(
            '[data-industries-index-link]',
            root,
          );
          const sectorCards = gsap.utils.toArray<HTMLElement>(
            '[data-industries-card]',
            root,
          );

          if (atlasLayout && atlasIntro && gallery) {
            ScrollTrigger.create({
              trigger: atlasLayout,
              start: 'top 116px',
              endTrigger: gallery,
              end: 'bottom bottom-=48',
              pin: atlasIntro,
              pinSpacing: false,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            });
          }

          sectorCards.forEach((card) => {
            ScrollTrigger.create({
              trigger: card,
              start: 'top center',
              end: 'bottom center',
              onToggle: ({isActive}) => {
                if (!isActive) return;

                indexLinks.forEach((link) => {
                  link.classList.toggle(
                    'is-active',
                    link.dataset.industriesIndexLink ===
                      card.dataset.industryCard,
                  );
                });
              },
            });
          });

          return () => {
            indexLinks.forEach((link) => link.classList.remove('is-active'));
          };
        },
      );
    }, root);

    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="industries-dossier-page">
      <motion.div
        aria-hidden="true"
        className="industries-dossier-progress"
        style={{scaleX: progressScale}}
      />
      <div aria-hidden="true" className="industries-dossier-nav-veil" />

      <section
        className="industries-hero"
        style={
          {'--page-hero-image': `url(${INDUSTRIES_PAGE_HERO_IMAGE})`} as CSSProperties
        }
      >
        <PageAmbientBackground className="industries-hero-ambient" />
        <div aria-hidden="true" className="industries-hero-wash" />
        <div className="industries-hero-shell">
          <div className="industries-hero-grid">
            <div className="industries-hero-copy" data-industries-hero-copy>
              <div className="industries-hero-mark">
                <SectionBrandMark size="sm" eager />
                <span>{t('hero.eyebrow')}</span>
              </div>
              <h1 className="industries-hero-title">
                {t('hero.title')}
                <br /> <em>{t('hero.emphasis')}</em>
              </h1>
              <p className="industries-hero-lede">{t('hero.description')}</p>
              <div className="industries-hero-actions">
                <Link href="#industry-verticals" className="sharp-edge btn-primary">
                  {t('hero.primaryCta')}
                </Link>
                <Link href="/case-studies" className="industries-hero-secondary">
                  {t('hero.secondaryCta')}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4"
                    strokeWidth={1.7}
                  />
                </Link>
              </div>
            </div>

            <aside className="industries-hero-aside" data-industries-hero-wordmark>
              <div className="industries-hero-wordmark">
                <strong data-label={t('hero.wordmark')}>
                  <span>{t('hero.wordmarkStart')}</span>
                  <span>{t('hero.wordmarkEnd')}</span>
                </strong>
                <span aria-hidden="true" />
              </div>
            </aside>
          </div>
        </div>
      </section>
      <div aria-hidden="true" className="capabilities-separator industries-separator" />

      <section id="industry-verticals" className="industries-dossier-gallery-section scroll-mt-24">
        <div className="site-frame-wide">
          <div
            className="industries-dossier-atlas-layout"
            data-industries-atlas-layout
          >
            <motion.aside
              className="industries-dossier-section-heading"
              data-industries-atlas-intro
              data-industries-reveal
            >
              <div className="industries-dossier-mark">
                <SectionBrandMark size="sm" />
                <span>{t('coverage.eyebrow')}</span>
              </div>
              <h2>{t('coverage.title')}</h2>
              <p>{t('coverage.description')}</p>

              <nav
                className="industries-dossier-index"
                aria-label={t('coverage.eyebrow')}
              >
                {cards.map((card, index) => (
                  <a
                    key={card.id}
                    href={`#${card.id}`}
                    className={index === 0 ? 'is-active' : undefined}
                    data-industries-index-link={card.id}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{card.title}</strong>
                  </a>
                ))}
              </nav>
            </motion.aside>

            <SectorGallery
              cards={cards}
              relatedWorkLabel={t('coverage.relatedWork')}
            />
          </div>
        </div>
      </section>

      <section className="industries-dossier-method">
        <div className="site-frame-wide">
          <div
            className="industries-dossier-method-layout"
            data-industries-method
          >
            <div className="industries-dossier-method-visual">
              <Image
                src={IMGS.rdLab}
                alt={t('research.imageAlt')}
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover"
                data-industries-method-image
              />
              <span
                aria-hidden="true"
                className="industries-dossier-method-shade"
              />
            </div>

            <div
              className="industries-dossier-method-content"
              data-industries-method-copy
            >
              <div className="industries-dossier-mark industries-dossier-mark--light">
                <SectionBrandMark surface="dark" size="sm" />
                <span>{t('research.eyebrow')}</span>
              </div>
              <h2 className="industries-dossier-method-heading">
                {t('research.title')} <em>{t('research.emphasis')}</em>
              </h2>

              <div className="industries-dossier-principles">
                {approachTracks.map((track, index) => (
                  <article key={track.code} data-industries-principle>
                    <span className="industries-dossier-principle-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      aria-hidden="true"
                      className="industries-dossier-principle-icon"
                    >
                      {track.icon}
                    </span>
                    <h3>{track.title}</h3>
                    <p>{track.description}</p>
                  </article>
                ))}
              </div>

              <div
                className="industries-dossier-method-actions"
                data-industries-reveal
              >
                <Link href="/arc" className="industries-dossier-primary">
                  {t('research.primaryCta')}
                </Link>
                <Link
                  href="/capabilities"
                  className="industries-dossier-text-link"
                >
                  {t('research.secondaryCta')}
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {insightItems.length > 0 ? (
        <div className="industries-dossier-insights" data-industries-reveal>
          <DeferredMount
            rootMargin="900px 0px"
            fallback={
              <div
                aria-hidden="true"
                className="industries-insights-deferred-placeholder"
              />
            }
          >
            <IndustryInsightsShowcase items={insightItems} />
          </DeferredMount>
        </div>
      ) : null}

      <section className="industries-dossier-cta">
        <div className="site-frame-wide industries-dossier-cta-layout">
          <div className="industries-dossier-cta-quote" data-industries-reveal>
            <div className="industries-dossier-mark industries-dossier-mark--light">
              <SectionBrandMark surface="dark" size="sm" />
              <span>{t('mandate.eyebrow')}</span>
            </div>
            <p>&ldquo;{t('mandate.quote')}&rdquo;</p>
          </div>

          <div className="industries-dossier-cta-action" data-industries-reveal>
            <h2>{t('mandate.title')}</h2>
            <p>{t('mandate.description')}</p>
            <div>
              <Link href="/contact" className="industries-dossier-cta-primary">
                {t('mandate.primaryCta')}
              </Link>
              <Link href="/capabilities" className="industries-dossier-cta-secondary">
                {t('mandate.secondaryCta')}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.7} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
