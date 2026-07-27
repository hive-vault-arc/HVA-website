'use client';

import { type CSSProperties, useState } from 'react';
import {useLocale, useTranslations} from 'next-intl';
import Image from 'next/image';
import {Link} from '@/i18n/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Send, Settings, Wrench } from '@/components/icons';
import PageAmbientBackground from '../components/PageAmbientBackground';
import SectionBrandMark from '../components/SectionBrandMark';
import {CAPABILITY_SOLUTION_PROGRAM_DETAILS} from '../lib/capabilities-content';
import type { CapabilityProfile } from '../lib/capabilities';
import type {AppLocale} from '@/i18n/config';
import {isSanityCdnImage} from '../lib/image-delivery';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const BOT_CONFIG = [
  {
    step: '01',
    icon: <Wrench className="h-8 w-8" />,
    image: '/Images/capabilities/hva-arc-assess-operating-model.webp',
  },
  {
    step: '02',
    icon: <Settings className="h-8 w-8" />,
    image: '/Images/capabilities/hva-arc-reengineer-operating-model.webp',
  },
  {
    step: '03',
    icon: <Send className="h-8 w-8" />,
    image: '/Images/capabilities/hva-arc-command-operating-model.webp',
  },
];

const CAPABILITY_IMAGES = {
  strategyBusiness: '/Images/capabilities/hva-strategy-business-capability.webp',
  technologyConsulting: '/Images/capabilities/hva-technology-consulting-capability.webp',
  aiDataAnalytics: '/Images/capabilities/hva-ai-data-capability.webp',
  softwareEngineering: '/Images/capabilities/hva-software-engineering-capability.webp',
  cloudInfrastructure: '/Images/capabilities/hva-cloud-infrastructure-capability.webp',
  operationsManaged: '/Images/capabilities/hva-operations-managed-capability.webp',
};

const CAPABILITIES_PAGE_HERO_IMAGE = '/Images/page-heroes/hva-capabilities-hero-background.webp';

type CapabilitiesProps = {
  capabilities?: CapabilityProfile[];
};

const CARD_ORDER = [
  'ai-data-analytics',
  'technology-consulting',
  'strategy-business',
  'software-engineering',
  'cloud-infrastructure',
  'operations-managed',
];

export default function Capabilities({ capabilities = [] }: CapabilitiesProps) {
  const t = useTranslations('Capabilities');
  const tLocale = useTranslations('Locale');
  const locale = useLocale() as AppLocale;
  const botCopy = t.raw('botPhases') as Array<{
    step: string;
    title: string;
    detail: string;
    objective: string;
    hvaOwns: string;
    clientRole: string;
    checkpoints: string[];
    outputs: string[];
    imageAlt: string;
  }>;
  const botPhases = BOT_CONFIG.map((config, index) => ({...config, ...botCopy[index]}));
  const pageLinks = (t.raw('pageLinks') as Array<{label: string; meta: string}>).map(
    (item, index) => ({
      ...item,
      anchor: ['#capability-pillars', '#solution-programs', '#bot-model'][index]!,
    }),
  );
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [activeBOTStep, setActiveBOTStep] = useState(0);
  const activeBOTItem = botPhases[activeBOTStep] ?? botPhases[0];
  const activeBOTSnapshot = [
    {
      label: t('hvaFocus'),
      primary: activeBOTItem.hvaOwns.split(', ')[0],
      secondary: activeBOTItem.hvaOwns.split(', ')[1],
    },
    {
      label: t('clientRole'),
      primary: activeBOTItem.clientRole.split(', ')[0],
      secondary: activeBOTItem.clientRole.split(', ')[1],
    },
    {
      label: t('phaseOutput'),
      primary: activeBOTItem.outputs[0],
      secondary: activeBOTItem.checkpoints[0],
    },
  ];
  const fallbackCopy = t.raw('fallbackCards') as Array<{
    title: string;
    alt: string;
    summary: string;
  }>;
  const fallbackCapabilityCards = [
    {
      id: 'ai-data-analytics',
      ...fallbackCopy[0],
      image: CAPABILITY_IMAGES.aiDataAnalytics,
      href: locale === 'en' ? '/capabilities/ai-data-analytics' : undefined,
      variant: 'image' as const,
    },
    {
      id: 'technology-consulting',
      ...fallbackCopy[1],
      image: CAPABILITY_IMAGES.technologyConsulting,
      href: locale === 'en' ? '/capabilities/technology-consulting' : undefined,
      variant: 'image' as const,
    },
    {
      id: 'strategy-business',
      ...fallbackCopy[2],
      image: CAPABILITY_IMAGES.strategyBusiness,
      href: locale === 'en' ? '/capabilities/strategy-business' : undefined,
      variant: 'text' as const,
    },
    {
      id: 'software-engineering',
      ...fallbackCopy[3],
      image: CAPABILITY_IMAGES.softwareEngineering,
      href: locale === 'en' ? '/capabilities/software-engineering' : undefined,
      variant: 'image' as const,
    },
    {
      id: 'cloud-infrastructure',
      ...fallbackCopy[4],
      image: CAPABILITY_IMAGES.cloudInfrastructure,
      href: locale === 'en' ? '/capabilities/cloud-infrastructure' : undefined,
      variant: 'image' as const,
    },
    {
      id: 'operations-managed',
      ...fallbackCopy[5],
      image: CAPABILITY_IMAGES.operationsManaged,
      href: locale === 'en' ? '/capabilities/operations-managed' : undefined,
      variant: 'image' as const,
    },
  ];
  const fallbackCardById = new Map(fallbackCapabilityCards.map((card) => [card.id, card]));
  const capabilityBySlug = new Map(capabilities.map((capability) => [capability.slug, capability]));
  const capabilityCards = CARD_ORDER.map((slug) => {
    const fallback = fallbackCardById.get(slug);
    const capability = capabilityBySlug.get(slug);

    if (!capability) return fallback;

    return {
      id: capability.slug,
      title: capability.shortTitle || fallback?.title || capability.title,
      image: capability.heroImage || fallback?.image || CAPABILITY_IMAGES.aiDataAnalytics,
      alt: capability.heroImageAlt || fallback?.alt || `${capability.title} capability`,
      summary: capability.briefLine,
      href: `/capabilities/${capability.slug}`,
      variant: fallback?.variant ?? ('image' as const),
    };
  }).filter((card): card is NonNullable<typeof card> => Boolean(card));

  return (
    <div className="relative isolate overflow-x-hidden bg-[#FFFFFF] text-[#1A2535]">
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#E8A838] via-[#F0C15A] to-[#E8A838]"
        style={{ scaleX: progressScale }}
      />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="capabilities-hero"
        style={{ '--page-hero-image': `url(${CAPABILITIES_PAGE_HERO_IMAGE})` } as CSSProperties}
      >
        <PageAmbientBackground className="capabilities-hero-ambient" />
        <div aria-hidden="true" className="capabilities-hero-wash" />
        <div className="capabilities-hero-shell">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="capabilities-hero-grid"
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.65 }}
              className="capabilities-hero-copy"
            >
              <div className="capabilities-hero-mark">
                <SectionBrandMark size="sm" eager />
                <span>
                  {t('heroLabel')}
                </span>
              </div>
              <h1 className="capabilities-hero-title">
                {t('heroLine1')}
                <br />{' '}
                <em>{t('heroAccent')}</em>
                <br />{' '}
                {t('heroLine3')}
              </h1>
              <p className="capabilities-hero-lede">
                {t('heroDescription')}
              </p>
              <div className="capabilities-hero-actions">
                <Link href="/capabilities/in-detail" className="sharp-edge btn-primary">
                  {t('exploreDetail')}
                </Link>
                <Link
                  href="/capabilities/solution-programs"
                  className="capabilities-hero-secondary"
                >
                  {t('solutionPrograms')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>

            <motion.aside
              variants={fadeUp}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="capabilities-hero-aside"
            >
              <div className="capabilities-hero-wordmark">
                <strong data-label="Capabilities">
                  <span>Cap</span><span>abilities</span>
                </strong>
                <span aria-hidden="true" />
              </div>
            </motion.aside>
          </motion.div>
        </div>
      </section>

      {/* Separator */}
      <div aria-hidden="true" className="capabilities-separator" />

      {/* ── SERVICE PILLARS BENTO GRID ────────────────────────────────────── */}
      <section id="capability-pillars" className="capability-showcase-section scroll-mt-28">
        <div className="capability-showcase-shell">
          <motion.div
            className="capability-card-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            transition={{ staggerChildren: 0.07 }}
          >
            {capabilityCards.map((card) => (
              <motion.article
                key={card.id}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="capability-card"
              >
                {card.href ? (
                  <Link
                    href={card.href}
                    className="capability-card-link-shell"
                  >
                    <div className="capability-card-image">
                      <Image
                        src={card.image}
                        alt={card.alt}
                        fill
                        unoptimized={isSanityCdnImage(card.image)}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="capability-card-body">
                      <h2>{card.title}</h2>
                    </div>
                    <div className="capability-card-hover" aria-hidden="true">
                      <div>
                        <p className="capability-card-hover-title">{card.title}</p>
                        <p>{card.summary}</p>
                      </div>
                      <span className="capability-card-hover-link">
                        {t('learnMore')} <ArrowRight className="h-5 w-5" strokeWidth={1.7} />
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div
                    className="capability-card-link-shell"
                    aria-disabled="true"
                    title={tLocale('unavailable', {language: tLocale('french')})}
                  >
                  <div className="capability-card-image">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      unoptimized={isSanityCdnImage(card.image)}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="capability-card-body">
                    <h2>{card.title}</h2>
                  </div>
                  <div className="capability-card-hover" aria-hidden="true">
                    <div>
                      <p className="capability-card-hover-title">{card.title}</p>
                      <p>{card.summary}</p>
                    </div>
                    <span className="capability-card-hover-link">
                      {tLocale('unavailable', {language: tLocale('french')})}
                    </span>
                  </div>
                  </div>
                )}
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ARC OPERATING MODEL ────────────────────────────────────────────── */}
      <section id="bot-model" className="capabilities-arc-section soft-grid-section scroll-mt-28 px-6 py-28 lg:px-12">
        <div className="relative mx-auto max-w-screen-2xl">

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.08 }}
            className="arc-operating-stage"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.55 }} className="arc-operating-title">
              <div className="arc-operating-mark">
                <SectionBrandMark size="sm" />
                <span>{t('arcModel')}</span>
              </div>
              <h2>
                {(t.raw('arcWords') as string[]).map((word, index) => (
                  <span key={word}>{word}{index < 2 && <br />}</span>
                ))}
              </h2>
            </motion.div>
            <motion.div variants={fadeUp} transition={{ duration: 0.55 }} className="arc-operating-keys">
              {(t.raw('arcKeys') as string[]).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </motion.div>

            <div className="arc-operating-rail">
              <div className="arc-operating-progress">
                <span>{activeBOTItem.step}/03</span>
                <div>
                  <motion.div
                    className="arc-operating-progress-fill"
                    animate={{ width: `${((activeBOTStep + 1) / botPhases.length) * 100}%` }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {botPhases.map((item, index) => {
                const isActive = activeBOTStep === index;
                return (
                  <button
                    key={item.step}
                    type="button"
                    onClick={() => setActiveBOTStep(index)}
                    onMouseEnter={() => setActiveBOTStep(index)}
                    onFocus={() => setActiveBOTStep(index)}
                    aria-pressed={isActive}
                    className={`arc-operating-step ${isActive ? 'is-active' : ''}`}
                  >
                    <span className="arc-operating-step-icon">
                      {item.icon}
                    </span>
                    <span className="arc-operating-step-text">
                      <span>{item.step}</span>
                      <strong>{item.title}</strong>
                      <em>{item.outputs[0]}</em>
                    </span>
                  </button>
                );
              })}
            </div>

            <motion.div
              key={activeBOTItem.step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className="arc-operating-panel"
            >
              <div className="arc-operating-media">
                <Image
                  src={activeBOTItem.image}
                  alt={activeBOTItem.imageAlt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
                <div className="arc-operating-media-copy">
                  <span>{t('phase', {step: activeBOTItem.step})}</span>
                  <h3>{activeBOTItem.title}</h3>
                </div>
              </div>

              <div className="arc-operating-panel-copy">
                <p>{activeBOTItem.objective}</p>
                <div className="arc-operating-chip-row">
                  {activeBOTSnapshot.map((section) => (
                    <span key={section.label}>{section.primary.replace(/\.$/, '')}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="arc-operating-actions">
              <Link href="/capabilities/in-detail" className="sharp-edge btn-primary">
                {t('exploreDetail')}
              </Link>
              <Link
                href="/capabilities/solution-programs"
                className="text-sm font-bold uppercase tracking-wide text-[#E8A838] transition-colors duration-200 hover:text-[#C8891C]"
              >
                {t('viewPrograms')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ── EXPERT INSIGHT QUOTE ──────────────────────────────────────────── */}
      <section className="capabilities-quote-section px-6 lg:px-12 py-28">
        <div className="mx-auto max-w-screen-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65 }}
              className="capabilities-quote-card col-span-12 md:col-span-10 md:col-start-2 bg-[#E8EBF0] p-12 md:p-16 relative overflow-hidden"
            >
              {/* Decorative open-quote mark */}
              <div
                aria-hidden="true"
                className="absolute top-8 left-10 font-headline text-[9rem] leading-none text-[#E8A838]/10 select-none pointer-events-none"
              >
                &ldquo;
              </div>

              <div className="relative z-10 w-full">
                <h2 className="capabilities-quote-text font-headline text-3xl md:text-4xl lg:text-[2.8rem] italic leading-tight text-[#1A2535] mb-12">
                  “{t('quote')}”
                </h2>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-[#1A2535] overflow-hidden flex-shrink-0 relative">
                    <Image
                      src="/Images/team/ali-amrani-hva-co-founder.webp"
                      alt={t('quoteAlt')}
                      fill
                      sizes="64px"
                      className="object-cover grayscale"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-[#1A2535] text-sm">{t('quoteAuthor')}</p>
                    <p className="text-[0.7rem] text-[#536070] uppercase tracking-[0.14em] mt-1">
                      {t('quoteRole')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SOLUTION PROGRAMS ─────────────────────────────────────────────── */}
      <section id="solution-programs" className="scroll-mt-28 bg-[#FFFFFF] px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-screen-2xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.08 }}
            transition={{ staggerChildren: 0.08 }}
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="programs-header">
              <div className="programs-mark">
                <SectionBrandMark size="sm" />
                <span>{t('solutionPrograms')}</span>
              </div>
              <h2>{t('programsTitle')}</h2>
              <p>{t('programsDescription')}</p>
            </motion.div>

            <div className="programs-grid">
              {(t.raw('programs') as Array<{
                category: string;
                name: string;
                summary: string;
                outcomes: string[];
                alt: string;
              }>).map((program, i) => {
                const programCodes = ['A', 'B', 'C'];
                const programMedia = [
                  {
                    src: CAPABILITY_IMAGES.aiDataAnalytics,
                    alt: program.alt,
                  },
                  {
                    src: CAPABILITY_IMAGES.softwareEngineering,
                    alt: program.alt,
                  },
                  {
                    src: CAPABILITY_IMAGES.cloudInfrastructure,
                    alt: program.alt,
                  },
                ];
                return (
                  <motion.article
                    key={program.name}
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                    className="program-card"
                  >
                    <div className="program-card-media">
                      <Image
                        src={programMedia[i]!.src}
                        alt={programMedia[i]!.alt}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                      <div className="program-card-media-label">
                        <span>{programCodes[i]}</span>
                        <em>PRG-00{i + 1}</em>
                      </div>
                    </div>

                    <div className="program-card-body">
                      <div className="program-card-topline">
                        <span>{program.category}</span>
                      </div>
                      <h3>{program.name}</h3>
                      <p>{program.summary}</p>
                      <div className="program-card-chips">
                        {program.outcomes.slice(0, 2).map((outcome) => (
                          <span key={outcome}>{outcome}</span>
                        ))}
                      </div>

                      {CAPABILITY_SOLUTION_PROGRAM_DETAILS[i]?.proofLinks?.[0] && (
                        <Link
                          href={CAPABILITY_SOLUTION_PROGRAM_DETAILS[i]!.proofLinks[0]!}
                          className="program-card-link"
                        >
                          {t('caseStudy')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.4 }}
              className="mt-10 flex justify-center"
            >
              <Link href="/capabilities/solution-programs" className="sharp-edge btn-primary">
                {t('fullCatalog')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="capabilities-depth-cta-section">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="capabilities-depth-cta"
        >
          <div className="capabilities-depth-cta-copy">
            <div className="capabilities-depth-cta-mark">
              <SectionBrandMark surface="dark" size="sm" />
              <span>{t('nextStep')}</span>
            </div>
            <h2>{t('depthTitle')}</h2>
            <p>{t('depthDescription')}</p>
          </div>
          <div className="capabilities-depth-cta-actions">
            <Link href="/capabilities/in-detail" className="sharp-edge btn-primary">
              {t('exploreDetail')} <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
            </Link>
            <Link href="/contact" className="capabilities-depth-cta-secondary">
              {t('bookCall')}
            </Link>
          </div>
          <div className="capabilities-page-card capabilities-page-card--end">
            <p className="capabilities-page-card-title">
              {t('onPage')}
            </p>
            <nav>
              {pageLinks.map((item) => (
                <a
                  key={item.anchor}
                  href={item.anchor}
                  className="capabilities-page-card-link"
                >
                  <span>{item.label}</span>
                  <span>{item.meta}</span>
                </a>
              ))}
            </nav>
            <Link href="/capabilities/in-detail" className="capabilities-page-card-depth">
              {t('fullDepth')} <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
