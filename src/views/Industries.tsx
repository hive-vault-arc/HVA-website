'use client';

import {type CSSProperties} from 'react';
import {Link} from '@/i18n/navigation';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import {useTranslations} from 'next-intl';
import { BarChart3, MessageSquare, Network, ShieldCheck, ArrowUpRight } from '@/components/icons';
import InsightsSlider, {type SlideItem} from '@/components/InsightsSlider';
import PageAmbientBackground from '../components/PageAmbientBackground';
import SectionBrandMark from '../components/SectionBrandMark';

const IMGS = {
  realEstate:    '/Images/industries/real-estate-crm-lead-operations-morocco.webp',
  healthcare:    '/Images/industries/healthcare-clinical-operations-dashboard-men-morocco.webp',
  construction:  '/Images/industries/construction-project-management-automation-morocco.webp',
  logistics:     '/Images/industries/logistics-dispatch-workflow-automation-morocco.webp',
  finance:       '/Images/industries/finance-brokerage-deal-pipeline-morocco.webp',
  government:    '/Images/industries/government-public-sector-digital-services-men-morocco.webp',
  retail:        '/Images/industries/retail-ecommerce-operations-platform-morocco.webp',
  energy:        '/Images/industries/energy-sustainability-monitoring-morocco.webp',
  consumerGoods: '/Images/industries/consumer-goods-luxury-analytics-men-morocco.webp',
  rdLab:         '/Images/industries/hva-industries-research-development-framework.webp',
};

const INDUSTRIES_PAGE_HERO_IMAGE = '/Images/page-heroes/hva-industries-hero-background.webp';

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

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

function IndustryAtlas({
  cards,
  relatedWorkLabel,
}: {
  cards: IndustryCardData[];
  relatedWorkLabel: string;
}) {
  return (
    <div className="industry-atlas">
      <motion.div
        className="industry-atlas-index"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.08 }}
        transition={{ staggerChildren: 0.045 }}
      >
        {cards.map((card, index) => {
          return (
            <motion.article
              key={card.id}
              id={card.id}
              data-industry-card={card.id}
              variants={fadeUp}
              transition={{duration: 0.42}}
              className="industry-atlas-item"
            >
              <Link
                href={card.href}
                className="industry-atlas-item-link"
                aria-label={`${card.title}: ${relatedWorkLabel}`}
              >
                <div className="industry-atlas-item-media">
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    priority={index < 2}
                    loading={index < 2 ? 'eager' : 'lazy'}
                    sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 42vw"
                    className="object-cover"
                  />
                </div>
                <div className="industry-atlas-item-body">
                  <span className="industry-atlas-item-category">{card.category}</span>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <div className="industry-atlas-item-footer">
                    <span>{card.bullets.slice(0, 2).join(' / ')}</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4"
                      strokeWidth={1.7}
                    />
                  </div>
                </div>
              </Link>
            </motion.article>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function Industries({
  insightItems = [],
}: {
  readonly insightItems?: SlideItem[];
}) {
  const t = useTranslations('Industries');
  const { scrollYProgress } = useScroll();
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

  return (
    <div className="relative isolate overflow-x-hidden bg-[#FFFFFF] text-[#1A2535]">
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#E8A838] via-[#F0C15A] to-[#E8A838]"
        style={{ scaleX: progressScale }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        className="industries-hero"
        style={{ '--page-hero-image': `url(${INDUSTRIES_PAGE_HERO_IMAGE})` } as CSSProperties}
      >
        <PageAmbientBackground className="industries-hero-ambient" />
        <div aria-hidden="true" className="industries-hero-wash" />
        <div className="industries-hero-shell">
          <motion.div
            className="industries-hero-grid"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div
              className="industries-hero-copy"
              variants={fadeUp}
              transition={{ duration: 0.65 }}
            >
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
                  {t('hero.secondaryCta')} <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.7} />
                </Link>
              </div>
            </motion.div>

            <motion.aside
              className="industries-hero-aside"
              variants={fadeUp}
              transition={{ duration: 0.65, delay: 0.08 }}
            >
              <div className="industries-hero-wordmark">
                <strong data-label={t('hero.wordmark')}>
                  <span>{t('hero.wordmarkStart')}</span><span>{t('hero.wordmarkEnd')}</span>
                </strong>
                <span aria-hidden="true" />
              </div>
            </motion.aside>
          </motion.div>
        </div>
      </section>
      <div aria-hidden="true" className="capabilities-separator industries-separator" />

      {/* ── Industry atlas ──────────────────────────────────────────────────── */}
      <section id="industry-verticals" className="industry-atlas-section scroll-mt-28">
        <div className="industry-middle-shell">
          <div className="industry-atlas-heading">
            <div className="flex items-center gap-3">
              <SectionBrandMark size="sm" />
              <p>{t('coverage.eyebrow')}</p>
            </div>
            <h2>{t('coverage.title')}</h2>
            <p>{t('coverage.description')}</p>
          </div>

          <IndustryAtlas cards={cards} relatedWorkLabel={t('coverage.relatedWork')} />
        </div>
      </section>

      {/* ── Compact operating framework ─────────────────────────────────────── */}
      <section className="industries-framework-section">
        <div className="industry-middle-shell">
          <div className="industries-framework">
            <div className="industries-framework-media">
              <Image
                src={IMGS.rdLab}
                alt={t('research.imageAlt')}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1279px) 42vw, 36vw"
                className="object-cover"
              />
            </div>

            <div className="industries-framework-copy">
              <div className="industries-framework-mark">
                <SectionBrandMark size="sm" />
                <p>{t('research.eyebrow')}</p>
              </div>
              <h2>
                {t('research.title')}{' '}
                <em>{t('research.emphasis')}</em>
              </h2>

              <div className="industries-framework-principles">
                {approachTracks.map((track) => (
                  <article key={track.code}>
                    <div aria-hidden="true">{track.icon}</div>
                    <div>
                      <h3>{track.title}</h3>
                      <p>{track.description}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="industries-framework-actions">
                <Link href="/arc" className="industries-framework-primary">
                  {t('research.primaryCta')}
                </Link>
                <Link href="/capabilities" className="industries-framework-secondary">
                  {t('research.secondaryCta')}
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {insightItems.length > 0 ? (
        <div className="industries-insights">
          <InsightsSlider items={insightItems} randomize />
        </div>
      ) : null}

      <section className="industries-mandate-section">
        <motion.div
          className="industries-mandate-card"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.5 }}
        >
          <div className="industries-mandate-mark">
            <SectionBrandMark surface="dark" size="sm" />
            <span>{t('mandate.eyebrow')}</span>
          </div>
          <div className="industries-mandate-content">
            <p className="industries-mandate-quote">
              &ldquo;{t('mandate.quote')}&rdquo;
            </p>
            <div className="industries-mandate-cta">
              <h2>{t('mandate.title')}</h2>
              <p>{t('mandate.description')}</p>
              <div className="industries-mandate-actions">
                <Link href="/contact" className="industries-mandate-primary">
                  {t('mandate.primaryCta')}
                </Link>
                <Link href="/capabilities" className="industries-mandate-secondary">
                  {t('mandate.secondaryCta')} <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
