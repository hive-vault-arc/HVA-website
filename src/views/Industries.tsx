'use client';

import type { CSSProperties } from 'react';
import {Link} from '@/i18n/navigation';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import {useTranslations} from 'next-intl';
import { BarChart3, MessageSquare, Network, ShieldCheck, ArrowUpRight } from '@/components/icons';
import PageAmbientBackground from '../components/PageAmbientBackground';
import SectionBrandMark from '../components/SectionBrandMark';

const IMGS = {
  realEstate:    '/Images/industries/real-estate-crm-lead-operations-morocco.webp',
  healthcare:    '/Images/industries/healthcare-clinical-operations-dashboard-morocco.webp',
  construction:  '/Images/industries/construction-project-management-automation-morocco.webp',
  logistics:     '/Images/industries/logistics-dispatch-workflow-automation-morocco.webp',
  finance:       '/Images/industries/finance-brokerage-deal-pipeline-morocco.webp',
  government:    '/Images/industries/government-public-sector-digital-services-morocco.webp',
  retail:        '/Images/industries/retail-ecommerce-operations-platform-morocco.webp',
  energy:        '/Images/industries/energy-sustainability-monitoring-morocco.webp',
  consumerGoods: '/Images/industries/consumer-goods-luxury-analytics-morocco.webp',
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
    layout: 'split',
    tone: 'light',
  },
  {
    id: 'healthcare',
    image: IMGS.healthcare,
    href: '/case-studies',
    layout: 'overlay',
    tone: 'dark',
  },
  {
    id: 'financial-services',
    image: IMGS.finance,
    href: '/case-studies',
    layout: 'stack',
    tone: 'light',
  },
  {
    id: 'government',
    image: IMGS.government,
    href: '/case-studies',
    layout: 'stack',
    tone: 'light',
  },
  {
    id: 'retail',
    image: IMGS.retail,
    href: '/case-studies',
    layout: 'stack',
    tone: 'dark',
  },
  {
    id: 'energy',
    image: IMGS.energy,
    href: '/case-studies',
    layout: 'split',
    tone: 'light',
  },
  {
    id: 'logistics',
    image: IMGS.logistics,
    href: '/case-studies',
    layout: 'split',
    tone: 'dark',
  },
  {
    id: 'consumer-goods',
    image: IMGS.consumerGoods,
    href: '/case-studies',
    layout: 'wide',
    tone: 'light',
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
  layout: string;
  tone: string;
};

type ApproachTrackCopy = {
  code: string;
  title: string;
  description: string;
  group: 'methodology' | 'compliance';
};

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

function IndustryCard({
  card,
  index,
  relatedWorkLabel,
}: {
  card: IndustryCardData;
  index: number;
  relatedWorkLabel: string;
}) {
  return (
    <motion.article
      id={card.id}
      data-industry-card={card.id}
      variants={fadeUp}
      transition={{ duration: 0.5 }}
      className={`industry-card industry-card--${card.layout} industry-card--${card.tone}`}
    >
      <Link href={card.href} className="industry-card-link">
        <div className="industry-card-image">
          <Image
            src={card.image}
            alt={card.imageAlt}
            fill
            priority={index < 2}
            loading={index < 2 ? 'eager' : 'lazy'}
            sizes={
              card.layout === 'split'
                ? '(max-width: 768px) 100vw, 46vw'
                : card.layout === 'overlay'
                  ? '(max-width: 768px) 100vw, 40vw'
                  : '(max-width: 768px) 100vw, 33vw'
            }
            className="object-cover"
          />
        </div>

        <div className="industry-card-body">
          <div className="industry-card-topline">
            <span>{card.category}</span>
            <span>0{index + 1}</span>
          </div>
          <h3>{card.title}</h3>
          <p className="industry-card-summary">{card.description}</p>
          <ul>
            {card.bullets.slice(0, 2).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <span className="industry-card-cta">
            {relatedWorkLabel}
            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.8} />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export default function Industries() {
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

      {/* ── Bento Industry Grid ──────────────────────────────────────────────── */}
      <section id="industry-verticals" className="soft-grid-section pt-16 pb-5 md:pt-20 md:pb-6 scroll-mt-28">
        <div className="mx-auto max-w-[1720px] px-5 sm:px-6 lg:px-10">
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <div className="mb-3 flex items-center gap-3">
                <SectionBrandMark size="sm" />
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--section-label-color)]">
                  {t('coverage.eyebrow')}
                </p>
              </div>
              <h2 className="max-w-3xl font-headline text-4xl font-light leading-[1.05] text-[#1A2535] md:text-5xl">
                {t('coverage.title')}
              </h2>
            </div>
            <p className="md:col-span-5 max-w-xl text-base leading-relaxed text-[#536070]">
              {t('coverage.description')}
            </p>
          </div>

          <motion.div
            className="industry-card-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.08 }}
            transition={{ staggerChildren: 0.06 }}
          >
            {cards.map((card, index) => (
              <IndustryCard
                key={card.id}
                card={card}
                index={index}
                relatedWorkLabel={t('coverage.relatedWork')}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── R&D / Laboratory_Active ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pt-6 pb-20 sm:px-8 md:pt-8 md:pb-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-14 items-center">
          {/* Image left with decorative offset */}
          <div className="lg:w-1/2">
            <div className="relative pl-8 pt-8 sm:pl-10 sm:pt-10">
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 z-0 h-44 w-44 border border-[#C8CED7] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(232,168,56,0.10)_1px,transparent_1px),linear-gradient(0deg,rgba(232,168,56,0.10)_1px,transparent_1px)] bg-[size:18px_18px]" />
                <div className="absolute left-0 top-0 h-full w-1.5 bg-[#E8A838]" />
                <span className="absolute left-7 top-5 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--section-label-color)]">
                  {t('research.shortLabel')}
                </span>
                <span className="absolute left-7 top-12 block h-px w-20 bg-[#E8A838]/35" />
              </div>
              <div aria-hidden="true" className="absolute -left-3 top-16 z-0 h-24 w-24 bg-[#FFF4D8]" />
              <Image
                src={IMGS.rdLab}
                alt={t('research.imageAlt')}
                width={1023}
                height={1537}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="relative z-10 w-full border border-white/80 shadow-2xl shadow-[#1A2535]/18"
              />
            </div>
          </div>

          {/* Content right */}
          <div className="lg:w-1/2">
            <div className="mb-3 flex items-center gap-3">
              <SectionBrandMark size="sm" />
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--section-label-color)]">
                {t('research.eyebrow')}
              </p>
            </div>
            <h2
              className="mb-8 text-[clamp(2.25rem,11vw,3rem)] leading-tight text-[#1A2535] md:text-5xl"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              {t('research.title')}<br />{' '}
              <em className="font-light italic">{t('research.emphasis')}</em>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {(['methodology', 'compliance'] as const).map((group) => (
                <div key={group}>
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-4 text-[var(--section-label-color)]">
                    {t(`research.groups.${group}`)}
                  </p>
                  <ul className="space-y-5">
                    {approachTracks
                      .filter((t) => t.group === group)
                      .map((t) => (
                        <li key={t.code} className="flex gap-3 items-start">
                          <div className="mt-0.5 shrink-0 text-[var(--section-label-color)]">{t.icon}</div>
                          <span className="text-sm text-[#566274] leading-relaxed">{t.title}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/arc"
                className="inline-flex min-h-11 items-center justify-center bg-[#1A2535] px-8 py-4 text-center text-sm font-bold uppercase tracking-widest text-white transition-colors duration-200 hover:bg-[#E8A838] w-full sm:w-auto"
              >
                {t('research.primaryCta')}
              </Link>
              <Link
                href="/capabilities"
                className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold uppercase tracking-widest text-[var(--section-label-color)] transition-colors duration-200 hover:text-[#1A2535]"
              >
                {t('research.secondaryCta')} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

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
