'use client';

import React from 'react';
import Image from 'next/image';
import {MotionConfig, motion, useScroll, useTransform} from 'framer-motion';
import {useLocale, useTranslations} from 'next-intl';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Building2,
  Cloud,
  Cpu,
  Layers3,
  Network,
  Settings,
  Wrench,
  X,
} from '@/components/icons';
import {Link} from '@/i18n/navigation';
import BottomCTA from '../components/BottomCTA';
import {CAPABILITY_SOLUTION_PROGRAM_DETAILS} from '../lib/capabilities-content';
import type {CapabilityDetailSection} from '../lib/capabilities-content';
import {useAnimationQuality} from '../lib/animationQuality';
import {isSanityCdnImage} from '../lib/image-delivery';
import {
  DEFAULT_SOLUTION_PROGRAM_MEDIA,
  type SolutionProgramMedia,
} from '../lib/solution-program-media';
import styles from './CapabilityIndustryPages.module.css';
import type {AppLocale} from '@/i18n/config';
import ResponsiveMedia from '@/components/media/ResponsiveMedia';
import CloudEcosystemRail from '@/components/media/CloudEcosystemRail';
import {SEMANTIC_MEDIA, semanticMediaAlt} from '@/lib/semantic-media';

function getDetailIcon(id: string, cls = 'h-5 w-5', sw = 1.5) {
  switch (id) {
    case 'strategy-business':
      return <Building2 className={cls} strokeWidth={sw} />;
    case 'technology-consulting':
      return <Wrench className={cls} strokeWidth={sw} />;
    case 'ai-data-analytics':
      return <Bot className={cls} strokeWidth={sw} />;
    case 'software-engineering':
      return <Cpu className={cls} strokeWidth={sw} />;
    case 'cloud-infrastructure':
      return <Cloud className={cls} strokeWidth={sw} />;
    case 'operations-managed':
      return <Settings className={cls} strokeWidth={sw} />;
    default:
      return <Wrench className={cls} strokeWidth={sw} />;
  }
}

const capabilityMedia = {
  'strategy-business': SEMANTIC_MEDIA.capabilities.strategyBusiness,
  'technology-consulting': SEMANTIC_MEDIA.capabilities.technologyConsulting,
  'ai-data-analytics': SEMANTIC_MEDIA.capabilities.aiData,
  'software-engineering': SEMANTIC_MEDIA.capabilities.softwareEngineering,
  'cloud-infrastructure': SEMANTIC_MEDIA.capabilities.cloudInfrastructure,
  'operations-managed': SEMANTIC_MEDIA.capabilities.operationsManaged,
};

const detailStatIcons = [Network, Settings, Layers3];

type ProgramCopy = {category: string; name: string; summary: string};
type DeliveryStageCopy = {title: string; detail: string};

export default function CapabilitiesInDetail({
  programMedia = DEFAULT_SOLUTION_PROGRAM_MEDIA,
}: {
  programMedia?: SolutionProgramMedia;
}) {
  const t = useTranslations('CapabilitiesDetail');
  const capabilitiesT = useTranslations('Capabilities');
  const locale = useLocale() as AppLocale;
  const {motionReduced} = useAnimationQuality();
  const coverageDialogRef = React.useRef<HTMLDialogElement>(null);
  const [activeCoverage, setActiveCoverage] = React.useState<CapabilityDetailSection | null>(null);
  const {scrollYProgress} = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const detailSections = t.raw('pillars.items') as CapabilityDetailSection[];
  const heroStats = t.raw('hero.stats') as Array<{value: string; label: string}>;
  const deliveryStages = t.raw('delivery.stages') as DeliveryStageCopy[];
  const programCopy = capabilitiesT.raw('programs') as ProgramCopy[];
  const pillarIdKey = detailSections.map((domain) => domain.id).join('|');
  const [activePillarId, setActivePillarId] = React.useState(detailSections[0]?.id ?? '');
  const featuredPrograms = CAPABILITY_SOLUTION_PROGRAM_DETAILS.slice(0, 3).map((program, index) => ({
    ...program,
    ...programCopy[index],
  }));

  React.useEffect(() => {
    if (activeCoverage && !coverageDialogRef.current?.open) coverageDialogRef.current?.showModal();
  }, [activeCoverage]);

  React.useEffect(() => {
    const sections = pillarIdKey
      .split('|')
      .map((id) => document.getElementById(`pillar-${id}`))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top);
        const id = visible[0]?.target.id.replace('pillar-', '');
        if (id) setActivePillarId(id);
      },
      {rootMargin: '-18% 0px -62% 0px', threshold: 0},
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pillarIdKey]);

  const closeCoverage = () => coverageDialogRef.current?.close();

  const scrollToPillar = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    document.getElementById(`pillar-${id}`)?.scrollIntoView({
      behavior: motionReduced ? 'auto' : 'smooth',
      block: 'start',
    });
    window.history.replaceState(null, '', `#pillar-${id}`);
  };

  return (
    <MotionConfig reducedMotion={motionReduced ? 'always' : 'never'}>
      <div className={styles.page}>
        <motion.div aria-hidden="true" className={styles.progress} style={{scaleX: progressScale}} />

        <section className={styles.detailHero}>
          <div className={`${styles.shell} ${styles.detailHeroGrid}`}>
            <motion.div
              initial={motionReduced ? false : {opacity: 0, y: 18}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.48}}
              className={styles.detailHeroCopy}
            >
              <p className={styles.sectionLabel}>{t('hero.eyebrow')}</p>
              <h1>{t('hero.title')}</h1>
              <p>{t('hero.description')}</p>
              <div className={styles.heroActions}>
                <Link href="#capability-map" className={styles.buttonPrimary}>
                  {t('hero.primaryCta')}
                </Link>
                <Link href="/capabilities/solution-programs" className={styles.buttonSecondary}>
                  {t('hero.secondaryCta')}
                </Link>
              </div>
            </motion.div>

            <motion.figure
              initial={motionReduced ? false : {opacity: 0, y: 16}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.52, delay: motionReduced ? 0 : 0.1}}
              className={styles.detailHeroMedia}
            >
              <Image
                src="/Images/capabilities/editorial/hva-capability-atlas-hero-v2.webp"
                alt={t('hero.imageAlt')}
                fill
                priority
                quality={90}
                sizes="(max-width: 900px) calc(100vw - 2rem), 54vw"
              />
              <figcaption className={styles.detailHeroCaption}>
                <Layers3 className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                <span>
                  <strong>{t('hero.panelTitle')}</strong>
                  <small>{t('hero.panelDescription')}</small>
                </span>
              </figcaption>
            </motion.figure>
          </div>

          <div className={`${styles.shell} ${styles.detailStats}`}>
            {heroStats.map((stat, index) => {
              const StatIcon = detailStatIcons[index] ?? Layers3;

              return (
                <div key={stat.label} className={styles.detailStat}>
                  <span className={styles.detailStatIcon} aria-hidden="true">
                    <StatIcon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <span className={styles.detailStatCopy}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <section id="capability-map" className={styles.capabilityAtlas}>
          <div className={`${styles.shell} ${styles.capabilityAtlasGrid}`}>
            <aside className={styles.capabilityAtlasIntro}>
              <header className={styles.detailSectionIntro}>
                <p className={styles.sectionLabel}>{t('pillars.eyebrow')}</p>
                <h2>{t('pillars.title')}</h2>
                <p>{t('pillars.description')}</p>
              </header>
              <nav className={styles.capabilityIndex} aria-label={t('indexAria')}>
                {detailSections.map((domain, index) => (
                  <a
                    key={domain.id}
                    href={`#pillar-${domain.id}`}
                    className={styles.capabilityIndexLink}
                    data-active={activePillarId === domain.id || undefined}
                    aria-current={activePillarId === domain.id ? 'step' : undefined}
                    onClick={(event) => scrollToPillar(event, domain.id)}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{domain.title.replace(' & Product Development', '')}</strong>
                  </a>
                ))}
              </nav>
            </aside>

            <div className={styles.capabilityChapters}>
              {detailSections.map((domain, index) => (
                <motion.article
                  key={domain.id}
                  id={`pillar-${domain.id}`}
                  className={styles.capabilityChapter}
                  initial={motionReduced ? false : {opacity: 0, y: 18}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true, amount: 0.12}}
                  transition={{duration: 0.46}}
                >
                  <figure className={styles.capabilityMedia}>
                    <ResponsiveMedia
                      media={capabilityMedia[domain.id as keyof typeof capabilityMedia]}
                      locale={locale}
                      sizes="(max-width: 900px) 100vw, 62vw"
                    />
                    {domain.id === 'cloud-infrastructure' ? (
                      <CloudEcosystemRail
                        ariaLabel={locale === 'fr' ? 'Technologies cloud et de conteneurs' : 'Cloud and container technologies'}
                      />
                    ) : null}
                    <span className={styles.capabilityNumber}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </figure>

                  <div className={styles.capabilityContent}>
                    <div className={styles.capabilityTitle}>
                      {getDetailIcon(domain.id)}
                      <h3>{domain.title}</h3>
                    </div>
                    <p>{domain.briefLine}</p>
                    <div className={styles.capabilityEvidence}>
                      <ul className={styles.capabilityBullets} aria-label={t('pillars.coreAreas', {title: domain.title})}>
                        {domain.briefBullets.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                      <div className={styles.capabilityOutcome}>
                        <span>{t('pillars.primaryOutcome')}</span>
                        <strong>{domain.relatedOutcomes[0]}</strong>
                      </div>
                    </div>
                    <div className={styles.capabilityActions}>
                      <button
                        type="button"
                        className={styles.coverageButton}
                        aria-haspopup="dialog"
                        aria-controls="cap-detail-coverage-dialog"
                        onClick={() => setActiveCoverage(domain)}
                      >
                        {t('pillars.fullCoverage')}
                        <ArrowRight className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                      </button>
                      <Link href={`/capabilities/${domain.id}`} className={styles.capabilityLink}>
                        {t('pillars.openCapability')}
                        <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <dialog
          id="cap-detail-coverage-dialog"
          ref={coverageDialogRef}
          className={styles.dialog}
          aria-labelledby="cap-detail-coverage-title"
          onClose={() => setActiveCoverage(null)}
        >
          {activeCoverage && (
            <article>
              <header className={styles.dialogHeader}>
                <div>
                  <span>{t('pillars.fullCoverage')}</span>
                  <h2 id="cap-detail-coverage-title">{activeCoverage.title}</h2>
                </div>
                <button type="button" onClick={closeCoverage} aria-label={t('pillars.closeCoverage')}>
                  <X className="h-5 w-5" strokeWidth={1.8} />
                </button>
              </header>
              <div className={styles.dialogBody}>
                <figure>
                  <ResponsiveMedia
                    media={capabilityMedia[activeCoverage.id as keyof typeof capabilityMedia]}
                    locale={locale}
                    alt={semanticMediaAlt(
                      capabilityMedia[activeCoverage.id as keyof typeof capabilityMedia],
                      locale,
                    )}
                    sizes="(max-width: 720px) calc(100vw - 4rem), 34rem"
                  />
                  {activeCoverage.id === 'cloud-infrastructure' ? (
                    <CloudEcosystemRail
                      ariaLabel={locale === 'fr' ? 'Technologies cloud et de conteneurs' : 'Cloud and container technologies'}
                    />
                  ) : null}
                </figure>
                <div className={styles.dialogCopy}>
                  <p>{activeCoverage.executionContext}</p>
                  <ul className={styles.coverageList}>
                    {activeCoverage.subCapabilities.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <Link href={`/capabilities/${activeCoverage.id}`} className={styles.dialogLink} onClick={closeCoverage}>
                    {t('pillars.openCapability')}
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          )}
        </dialog>

        <section id="delivery-commitment" className={styles.delivery}>
          <div className={`${styles.shell} ${styles.deliveryPanel}`}>
            <div className={styles.deliveryCopy}>
              <p className={`${styles.sectionLabel} ${styles.sectionLabelDark}`}>{t('delivery.eyebrow')}</p>
              <h2>{t('delivery.title')}</h2>
              <p>{t('delivery.description')}</p>
              <Link href="/case-studies">
                {t('delivery.proofLink')}
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
              </Link>
            </div>
            <div className={styles.deliveryStages}>
              {deliveryStages.map((stage, index) => (
                <article key={stage.title} className={styles.deliveryStage}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{stage.title}</h3>
                  <p>{stage.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.programRail}>
          <div className={styles.shell}>
            <header className={styles.programRailHeader}>
              <div>
                <p className={styles.sectionLabel}>{t('programs.eyebrow')}</p>
                <h2>{t('programs.title')}</h2>
              </div>
            </header>
            <div className={styles.programRailGrid}>
              {featuredPrograms.map((program, index) => {
                const media =
                  programMedia[program.slug] ??
                  DEFAULT_SOLUTION_PROGRAM_MEDIA[program.slug];

                return (
                  <Link
                    key={program.slug}
                    href={`/capabilities/solution-programs#program-0${index + 1}`}
                    className={styles.programCard}
                  >
                    <figure className={styles.programCardMedia}>
                      <Image
                        src={media.cardImage}
                        alt={media.alt || t('programs.imageAlt', {title: program.name})}
                        fill
                        quality={90}
                        sizes="(max-width: 760px) 100vw, 33vw"
                        style={{
                          objectFit: media.cardFit,
                          objectPosition: media.objectPosition,
                        }}
                        unoptimized={isSanityCdnImage(media.cardImage)}
                      />
                    </figure>
                    <div className={styles.programCardCopy}>
                      <span>{program.category}</span>
                      <h3>{program.name}</h3>
                      <p>{program.summary}</p>
                      <span className={styles.programCardCta}>
                        {t('programs.view')}
                        <ArrowRight className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <BottomCTA
          headline={t('bottomCta.title')}
          subtext={t('bottomCta.description')}
          primaryLabel={t('bottomCta.primary')}
          primaryHref="/contact"
          secondaryLabel={t('bottomCta.secondary')}
          secondaryHref="/capabilities"
          variant="light"
          compact
        />
      </div>
    </MotionConfig>
  );
}
