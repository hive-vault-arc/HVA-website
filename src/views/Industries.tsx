'use client';

import React, {type CSSProperties} from 'react';
import dynamic from 'next/dynamic';
import {motion, useScroll, useTransform} from 'framer-motion';
import {useLocale, useTranslations} from 'next-intl';
import {ArrowUpRight, BarChart3, MessageSquare, Network, ShieldCheck} from '@/components/icons';
import DeferredMount from '@/components/DeferredMount';
import type {IndustryInsightItem} from '@/components/IndustryInsightsShowcase';
import {Link} from '@/i18n/navigation';
import ResponsiveMedia from '@/components/media/ResponsiveMedia';
import type {AppLocale} from '@/i18n/config';
import {
  SEMANTIC_MEDIA,
  type SemanticMediaDefinition,
} from '@/lib/semantic-media';
import styles from './CapabilityIndustryPages.module.css';

const IndustryInsightsShowcase = dynamic(
  () => import('@/components/IndustryInsightsShowcase'),
  {ssr: false, loading: () => <div aria-hidden="true" className={styles.insights} />},
);

const IMGS = {
  realEstate: SEMANTIC_MEDIA.industries.realEstate,
  healthcare: SEMANTIC_MEDIA.industries.healthcare,
  logistics: SEMANTIC_MEDIA.industries.logistics,
  finance: SEMANTIC_MEDIA.industries.finance,
  government: SEMANTIC_MEDIA.industries.government,
  retail: SEMANTIC_MEDIA.industries.retail,
  energy: SEMANTIC_MEDIA.industries.energy,
  consumerGoods: SEMANTIC_MEDIA.industries.consumerLuxury,
  rdLab: SEMANTIC_MEDIA.industries.method,
};

const HERO_BACKGROUND = '/Images/page-heroes/hva-industries-adaptive-fields-hero-v2.webp';

const approachTrackConfig = [
  {code: 'IND-001', icon: <BarChart3 className="h-5 w-5" strokeWidth={1.5} />},
  {code: 'IND-002', icon: <Network className="h-5 w-5" strokeWidth={1.5} />},
  {code: 'IND-003', icon: <ShieldCheck className="h-5 w-5" strokeWidth={1.5} />},
  {code: 'IND-004', icon: <MessageSquare className="h-5 w-5" strokeWidth={1.5} />},
];

export const INDUSTRY_CARD_CONFIG = [
  {id: 'real-estate', image: IMGS.realEstate.desktopSrc, media: IMGS.realEstate, href: '/case-studies/top-tier-crm-transformation-program-real-estate-operations'},
  {id: 'healthcare', image: IMGS.healthcare.desktopSrc, media: IMGS.healthcare, href: '/case-studies'},
  {id: 'financial-services', image: IMGS.finance.desktopSrc, media: IMGS.finance, href: '/case-studies'},
  {id: 'government', image: IMGS.government.desktopSrc, media: IMGS.government, href: '/case-studies'},
  {id: 'retail', image: IMGS.retail.desktopSrc, media: IMGS.retail, href: '/case-studies'},
  {id: 'energy', image: IMGS.energy.desktopSrc, media: IMGS.energy, href: '/case-studies'},
  {id: 'logistics', image: IMGS.logistics.desktopSrc, media: IMGS.logistics, href: '/case-studies'},
  {id: 'consumer-goods', image: IMGS.consumerGoods.desktopSrc, media: IMGS.consumerGoods, href: '/case-studies'},
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
  media: SemanticMediaDefinition;
  href: string;
};
type ApproachTrackCopy = {code: string; title: string; description: string; group: 'methodology' | 'compliance'};

function SectorGallery({
  cards,
  relatedWorkLabel,
  locale,
}: {
  cards: IndustryCardData[];
  relatedWorkLabel: string;
  locale: AppLocale;
}) {
  return (
    <div className={styles.sectorGallery}>
      {cards.map((card, cardIndex) => (
        <motion.article
          key={card.id}
          id={card.id}
          data-sector={card.id}
          className={styles.sectorCard}
          initial={{opacity: 0, y: 18}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.12}}
          transition={{duration: 0.48}}
        >
          <Link href={card.href} className={styles.sectorCardLink} aria-label={`${card.title}: ${relatedWorkLabel}`}>
            <ResponsiveMedia
              media={card.media}
              locale={locale}
              priority={cardIndex < 2}
              sizes="(max-width: 900px) 100vw, 62vw"
            />
            <span className={styles.sectorMeta}>
              <span>{String(cardIndex + 1).padStart(2, '0')}</span>
              <span>{card.category}</span>
            </span>
            <span className={styles.sectorCopy}>
              <strong>{card.title}</strong>
              <span>{card.description}</span>
              <span className={styles.sectorTags}>
                {card.bullets.map((bullet) => <span key={bullet}>{bullet}</span>)}
              </span>
            </span>
            <span className={styles.sectorArrow} aria-hidden="true">
              <ArrowUpRight className="h-5 w-5" strokeWidth={1.6} />
            </span>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}

export default function Industries({insightItems = []}: {readonly insightItems?: IndustryInsightItem[]}) {
  const t = useTranslations('Industries');
  const locale = useLocale() as AppLocale;
  const {scrollYProgress} = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const cardCopy = t.raw('cards') as IndustryCardCopy[];
  const cards = INDUSTRY_CARD_CONFIG.map((config) => ({
    ...config,
    ...cardCopy.find((item) => item.id === config.id)!,
  }));
  const sectorIdKey = cards.map((card) => card.id).join('|');
  const [activeSectorId, setActiveSectorId] = React.useState(cards[0]?.id ?? '');
  const trackCopy = t.raw('research.tracks') as ApproachTrackCopy[];
  const approachTracks = approachTrackConfig.map((config) => ({
    ...config,
    ...trackCopy.find((item) => item.code === config.code)!,
  }));
  const heroStyle = {'--industries-hero-image': `url("${HERO_BACKGROUND}")`} as CSSProperties;

  React.useEffect(() => {
    const sections = sectorIdKey
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top);
        const id = visible[0]?.target.id;
        if (id) setActiveSectorId(id);
      },
      {rootMargin: '-18% 0px -62% 0px', threshold: 0},
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectorIdKey]);

  const scrollToSector = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({behavior: 'smooth', block: 'start'});
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <div className={styles.page}>
      <motion.div aria-hidden="true" className={styles.progress} style={{scaleX: progressScale}} />

      <section className={styles.industriesHero} style={heroStyle}>
        <div className={`${styles.shell} ${styles.industriesHeroGrid}`}>
          <motion.div
            initial={{opacity: 0, y: 18}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.48}}
            className={styles.industriesHeroCopy}
          >
            <p className={styles.sectionLabel}>{t('hero.eyebrow')}</p>
            <h1>
              {t('hero.title')} <em>{t('hero.emphasis')}</em>
            </h1>
            <p>{t('hero.description')}</p>
            <div className={styles.heroActions}>
              <Link href="#industry-atlas" className={styles.buttonPrimary}>
                {t('hero.primaryCta')}
              </Link>
              <Link href="/case-studies" className={styles.textLink}>
                {t('hero.secondaryCta')}
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      <section id="industry-atlas" className={styles.industryAtlas}>
        <div className={`${styles.shell} ${styles.industryAtlasGrid}`}>
          <aside className={styles.industryAtlasIntro}>
            <p className={styles.sectionLabel}>{t('coverage.eyebrow')}</p>
            <h2>{t('coverage.title')}</h2>
            <p>{t('coverage.description')}</p>
            <nav className={styles.sectorIndex} aria-label={t('coverage.eyebrow')}>
              {cards.map((card, index) => (
                <a
                  key={card.id}
                  href={`#${card.id}`}
                  className={styles.sectorIndexLink}
                  data-active={activeSectorId === card.id || undefined}
                  aria-current={activeSectorId === card.id ? 'step' : undefined}
                  onClick={(event) => scrollToSector(event, card.id)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{card.title}</strong>
                </a>
              ))}
            </nav>
          </aside>

          <SectorGallery
            cards={cards}
            relatedWorkLabel={t('coverage.relatedWork')}
            locale={locale}
          />
        </div>
      </section>

      <section className={styles.methodSection}>
        <div className={styles.shell}>
          <div className={styles.method}>
            <figure className={styles.methodMedia}>
              <ResponsiveMedia
                media={IMGS.rdLab}
                locale={locale}
                sizes="(max-width: 900px) 100vw, 44vw"
              />
            </figure>
            <div className={styles.methodCopy}>
              <p className={`${styles.sectionLabel} ${styles.sectionLabelDark}`}>{t('research.eyebrow')}</p>
              <h2>{t('research.title')} <em>{t('research.emphasis')}</em></h2>
              <div className={styles.principles}>
                {approachTracks.map((track, index) => (
                  <article key={track.code} className={styles.principle}>
                    <div className={styles.principleHeader}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      {track.icon}
                    </div>
                    <h3>{track.title}</h3>
                    <p>{track.description}</p>
                  </article>
                ))}
              </div>
              <div className={styles.methodActions}>
                <Link href="/arc">{t('research.primaryCta')}</Link>
                <Link href="/capabilities">
                  {t('research.secondaryCta')}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {insightItems.length > 0 ? (
        <div className={styles.insights}>
          <DeferredMount rootMargin="900px 0px" fallback={<div aria-hidden="true" className={styles.insights} />}>
            <IndustryInsightsShowcase items={insightItems} />
          </DeferredMount>
        </div>
      ) : null}

      <section className={styles.industriesCta}>
        <div className={`${styles.shell} ${styles.industriesCtaGrid}`}>
          <div>
            <p className={styles.sectionLabel}>{t('mandate.eyebrow')}</p>
            <p className={styles.industriesQuote}>&ldquo;{t('mandate.quote')}&rdquo;</p>
          </div>
          <div className={styles.industriesCtaCopy}>
            <h2>{t('mandate.title')}</h2>
            <p>{t('mandate.description')}</p>
            <div className={styles.heroActions}>
              <Link href="/contact" className={styles.buttonPrimary}>{t('mandate.primaryCta')}</Link>
              <Link href="/capabilities" className={styles.textLink}>
                {t('mandate.secondaryCta')}
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
