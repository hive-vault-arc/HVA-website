'use client';

import {useState} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import Image from 'next/image';
import {Link} from '@/i18n/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Send, Settings, Wrench } from '@/components/icons';
import {CAPABILITY_SOLUTION_PROGRAM_DETAILS} from '../lib/capabilities-content';
import type { CapabilityProfile } from '../lib/capabilities';
import type {AppLocale} from '@/i18n/config';
import {isSanityCdnImage} from '../lib/image-delivery';
import {
  DEFAULT_SOLUTION_PROGRAM_MEDIA,
  type SolutionProgramMedia,
} from '../lib/solution-program-media';
import ResponsiveMedia from '@/components/media/ResponsiveMedia';
import CloudEcosystemRail from '@/components/media/CloudEcosystemRail';
import {SEMANTIC_MEDIA, semanticMediaAlt} from '@/lib/semantic-media';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const BOT_CONFIG = [
  {
    step: '01',
    icon: <Wrench className="h-8 w-8" />,
    media: SEMANTIC_MEDIA.arc.assess,
  },
  {
    step: '02',
    icon: <Settings className="h-8 w-8" />,
    media: SEMANTIC_MEDIA.arc.reengineer,
  },
  {
    step: '03',
    icon: <Send className="h-8 w-8" />,
    media: SEMANTIC_MEDIA.arc.command,
  },
];

const CAPABILITY_MEDIA = {
  strategyBusiness: SEMANTIC_MEDIA.capabilities.strategyBusiness,
  technologyConsulting: SEMANTIC_MEDIA.capabilities.technologyConsulting,
  aiDataAnalytics: SEMANTIC_MEDIA.capabilities.aiData,
  softwareEngineering: SEMANTIC_MEDIA.capabilities.softwareEngineering,
  cloudInfrastructure: SEMANTIC_MEDIA.capabilities.cloudInfrastructure,
  operationsManaged: SEMANTIC_MEDIA.capabilities.operationsManaged,
};

const CAPABILITIES_PAGE_HERO_IMAGE =
  '/Images/page-heroes/hva-capabilities-magnetic-fields-hero-v2.webp';

type CapabilitiesProps = {
  capabilities?: CapabilityProfile[];
  aliProfileImage?: string;
  aliProfileImageAlt?: string;
  programMedia?: SolutionProgramMedia;
};

const CARD_ORDER = [
  'strategy-business',
  'technology-consulting',
  'ai-data-analytics',
  'software-engineering',
  'cloud-infrastructure',
  'operations-managed',
];

export default function Capabilities({
  capabilities = [],
  aliProfileImage = '/Images/team/ali-amrani-founder-2026.webp',
  aliProfileImageAlt,
  programMedia = DEFAULT_SOLUTION_PROGRAM_MEDIA,
}: CapabilitiesProps) {
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
      media: CAPABILITY_MEDIA.aiDataAnalytics,
      href: locale === 'en' ? '/capabilities/ai-data-analytics' : undefined,
      variant: 'image' as const,
    },
    {
      id: 'technology-consulting',
      ...fallbackCopy[1],
      media: CAPABILITY_MEDIA.technologyConsulting,
      href: locale === 'en' ? '/capabilities/technology-consulting' : undefined,
      variant: 'image' as const,
    },
    {
      id: 'strategy-business',
      ...fallbackCopy[2],
      media: CAPABILITY_MEDIA.strategyBusiness,
      href: locale === 'en' ? '/capabilities/strategy-business' : undefined,
      variant: 'text' as const,
    },
    {
      id: 'software-engineering',
      ...fallbackCopy[3],
      media: CAPABILITY_MEDIA.softwareEngineering,
      href: locale === 'en' ? '/capabilities/software-engineering' : undefined,
      variant: 'image' as const,
    },
    {
      id: 'cloud-infrastructure',
      ...fallbackCopy[4],
      media: CAPABILITY_MEDIA.cloudInfrastructure,
      href: locale === 'en' ? '/capabilities/cloud-infrastructure' : undefined,
      variant: 'image' as const,
    },
    {
      id: 'operations-managed',
      ...fallbackCopy[5],
      media: CAPABILITY_MEDIA.operationsManaged,
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
      media: fallback?.media || CAPABILITY_MEDIA.aiDataAnalytics,
      alt: fallback?.media
        ? semanticMediaAlt(fallback.media, locale)
        : capability.heroImageAlt || `${capability.title} capability`,
      summary: capability.briefLine,
      href: `/capabilities/${capability.slug}`,
      variant: fallback?.variant ?? ('image' as const),
    };
  }).filter((card): card is NonNullable<typeof card> => Boolean(card));

  return (
    <div className="relative isolate overflow-x-clip bg-[#FFFFFF] text-[#1A2535]">
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#E8A838] via-[#F0C15A] to-[#E8A838]"
        style={{ scaleX: progressScale }}
      />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="capabilities-hero">
        <Image
          src={CAPABILITIES_PAGE_HERO_IMAGE}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="capabilities-hero-background"
          aria-hidden="true"
        />
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
                <span>{t('heroLabel')}</span>
              </div>
              <h1 className="capabilities-hero-title">
                <span>{t('heroLine1')}</span>
                <em>{t('heroAccent')} {t('heroLine3')}</em>
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

          </motion.div>
        </div>
      </section>

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
            {capabilityCards.map((card, index) => (
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
                      <ResponsiveMedia
                        media={card.media}
                        locale={locale}
                        alt={card.alt}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                      {card.id === 'cloud-infrastructure' ? (
                        <CloudEcosystemRail
                          ariaLabel={locale === 'fr' ? 'Technologies cloud et de conteneurs' : 'Cloud and container technologies'}
                        />
                      ) : null}
                    </div>
                    <div className="capability-card-body">
                      <div className="capability-card-meta">
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <ArrowRight className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                      </div>
                      <h2>{card.title}</h2>
                      <p>{card.summary}</p>
                      <span className="capability-card-action">
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
                    <ResponsiveMedia
                      media={card.media}
                      locale={locale}
                      alt={card.alt}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    {card.id === 'cloud-infrastructure' ? (
                      <CloudEcosystemRail
                        ariaLabel={locale === 'fr' ? 'Technologies cloud et de conteneurs' : 'Cloud and container technologies'}
                      />
                    ) : null}
                  </div>
                  <div className="capability-card-body">
                    <div className="capability-card-meta">
                      <span>{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <h2>{card.title}</h2>
                    <p>{card.summary}</p>
                    <span className="capability-card-action">
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
      <section id="bot-model" className="capabilities-arc-section soft-grid-section scroll-mt-28 py-28">
        <div className="site-frame-wide relative">

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.08 }}
            className="arc-operating-stage"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.55 }} className="arc-operating-title">
              <div className="arc-operating-mark">
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
                    transition={{ duration: 0.5, ease: 'easeOut' }}
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
              transition={{ duration: 0.5 }}
              className="arc-operating-panel"
            >
              <div className="arc-operating-media">
                <ResponsiveMedia
                  media={activeBOTItem.media}
                  locale={locale}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="arc-operating-image"
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
                className="text-sm font-bold uppercase tracking-wide text-[#E8A838] transition-opacity duration-200 hover:opacity-80"
              >
                {t('viewPrograms')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ── EXPERT INSIGHT QUOTE ──────────────────────────────────────────── */}
      <section className="capabilities-quote-section py-28">
        <div className="site-frame-wide">
          <div className="grid grid-cols-1 md:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65 }}
              className="capabilities-quote-card col-span-12 md:col-span-10 md:col-start-2"
            >
              <div className="capabilities-quote-content">
                <blockquote className="capabilities-quote-text">
                  <p>&ldquo;{t('quote')}&rdquo;</p>
                </blockquote>
                <div className="capabilities-quote-author flex items-center gap-5">
                  <div className="w-16 h-16 bg-[#1A2535] overflow-hidden flex-shrink-0 relative">
                    <Image
                      src={aliProfileImage}
                      alt={aliProfileImageAlt ?? t('quoteAlt')}
                      fill
                      quality={90}
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-[#1A2535] text-sm">{t('quoteAuthor')}</p>
                    <p className="text-[0.7rem] text-[#536174] uppercase tracking-[0.14em] mt-1">
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
      <section id="solution-programs" className="scroll-mt-28 bg-[#FFFFFF] py-20">
        <div className="site-frame-wide">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.08 }}
            transition={{ staggerChildren: 0.08 }}
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="programs-header">
              <div className="programs-mark">
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
                const programDetail = CAPABILITY_SOLUTION_PROGRAM_DETAILS[i];
                const media = programDetail
                  ? programMedia[programDetail.slug] ??
                    DEFAULT_SOLUTION_PROGRAM_MEDIA[programDetail.slug]
                  : undefined;
                const proofLink = media?.proofHref ?? programDetail?.proofLinks?.[0];
                const caseStudyLink = proofLink?.startsWith('/case-studies/')
                  ? proofLink
                  : undefined;
                return (
                  <motion.article
                    key={program.name}
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                    className="program-card"
                  >
                    <div className="program-card-media">
                      <Image
                        src={media?.cardImage ?? ''}
                        alt={media?.alt ?? program.alt}
                        fill
                        loading="lazy"
                        quality={90}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                        style={{
                          objectFit: media?.cardFit ?? 'cover',
                          objectPosition: media?.objectPosition ?? 'center',
                        }}
                        unoptimized={isSanityCdnImage(media?.cardImage ?? '')}
                      />
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

                      {caseStudyLink && (
                        <Link
                          href={caseStudyLink}
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
                {t('fullCatalog')}
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
              <span>{t('nextStep')}</span>
            </div>
            <h2>{t('depthTitle')}</h2>
            <p>{t('depthDescription')}</p>
          </div>
          <div className="capabilities-depth-cta-actions">
            <Link href="/capabilities/in-detail" className="sharp-edge btn-primary">
              {t('exploreDetail')}
            </Link>
            <Link href="/contact" className="capabilities-depth-cta-secondary">
              {t('bookCall')}
            </Link>
          </div>
          <div className="capabilities-page-index">
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
