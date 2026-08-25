'use client';

import Image from 'next/image';
import {useEffect, useState} from 'react';
import {AnimatePresence, MotionConfig, motion, useScroll, useTransform} from 'framer-motion';
import {useLocale, useTranslations} from 'next-intl';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Cloud,
  Compass,
  Database,
  Gauge,
  Workflow,
} from '@/components/icons';
import {Link} from '@/i18n/navigation';
import BottomCTA from '../components/BottomCTA';
import {CAPABILITY_SOLUTION_PROGRAM_DETAILS} from '../lib/capabilities-content';
import {useAnimationQuality} from '../lib/animationQuality';
import {isSanityCdnImage} from '../lib/image-delivery';
import {
  DEFAULT_SOLUTION_PROGRAM_MEDIA,
  type SolutionProgramMedia,
} from '../lib/solution-program-media';
import styles from './CapabilityIndustryPages.module.css';

type ProgramCopy = {
  name: string;
  category: string;
  summary: string;
  modules: string[];
  integrations: string[];
  deliveryModel: string;
};

type OwnershipStep = {
  title: string;
  detail: string;
  output: string;
};

const PROGRAM_HASHES = ['program-01', 'program-02', 'program-03'] as const;

function ProgramIcon({index}: {index: number}) {
  const props = {className: 'h-5 w-5', strokeWidth: 1.5};

  if (index === 0) return <Bot {...props} />;
  if (index === 1) return <Database {...props} />;
  return <Cloud {...props} />;
}

function OwnershipIcon({index}: {index: number}) {
  const props = {className: 'h-5 w-5', strokeWidth: 1.5};

  if (index === 0) return <Compass {...props} />;
  if (index === 1) return <Workflow {...props} />;
  return <Gauge {...props} />;
}

export default function CapabilitiesSolutionPrograms({
  programMedia = DEFAULT_SOLUTION_PROGRAM_MEDIA,
}: {
  programMedia?: SolutionProgramMedia;
}) {
  const t = useTranslations('SolutionPrograms');
  const locale = useLocale();
  const {motionReduced} = useAnimationQuality();
  const {scrollYProgress} = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [activeIndex, setActiveIndex] = useState(0);

  const programCopy = t.raw('programs') as ProgramCopy[];
  const ownershipSteps = t.raw('ownership.steps') as OwnershipStep[];
  const programs = CAPABILITY_SOLUTION_PROGRAM_DETAILS.map((program, index) => ({
    ...program,
    ...programCopy[index],
  }));
  const activeProgram = programs[activeIndex]!;
  const activeMedia =
    programMedia[activeProgram.slug] ??
    DEFAULT_SOLUTION_PROGRAM_MEDIA[activeProgram.slug];

  const programHref = (href: string | undefined) =>
    locale === 'fr' && href?.startsWith('/case-studies/') ? '/case-studies' : href;

  useEffect(() => {
    const selectProgramFromHash = () => {
      const matchingIndex = PROGRAM_HASHES.indexOf(
        window.location.hash.slice(1) as (typeof PROGRAM_HASHES)[number],
      );

      if (matchingIndex >= 0) setActiveIndex(matchingIndex);
    };

    selectProgramFromHash();
    window.addEventListener('hashchange', selectProgramFromHash);
    return () => window.removeEventListener('hashchange', selectProgramFromHash);
  }, []);

  const selectProgram = (index: number) => {
    setActiveIndex(index);
    window.history.replaceState(null, '', `#${PROGRAM_HASHES[index]}`);
  };

  return (
    <MotionConfig reducedMotion={motionReduced ? 'always' : 'never'}>
      <div className={styles.page}>
        <motion.div aria-hidden="true" className={styles.progress} style={{scaleX: progressScale}} />

        <section className={styles.programHero}>
          <div className={`${styles.shell} ${styles.programHeroGrid}`}>
            <motion.div
              initial={motionReduced ? false : {opacity: 0, y: 18}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.48}}
              className={styles.programHeroCopy}
            >
              <p className={styles.sectionLabel}>{t('hero.eyebrow')}</p>
              <h1>{t('hero.title')}</h1>
              <p>{t('hero.description')}</p>
              <div className={styles.heroActions}>
                <Link href="#program-explorer" className={styles.buttonPrimary}>
                  {t('hero.primaryCta')}
                </Link>
                <Link href="/capabilities/in-detail" className={styles.textLink}>
                  {t('hero.secondaryCta')}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                </Link>
              </div>
            </motion.div>

            <motion.figure
              initial={motionReduced ? false : {opacity: 0, y: 16}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.52, delay: motionReduced ? 0 : 0.1}}
              className={styles.programHeroMedia}
            >
              <Image
                src="/Images/solution-programs/hva-solution-programs-hero-v2.webp"
                alt={t('hero.imageAlt')}
                fill
                priority
                quality={90}
                sizes="(max-width: 900px) calc(100vw - 2rem), 54vw"
              />
              <figcaption className={styles.programHeroCaption}>
                <span>{t('hero.signal')}</span>
                <strong>{t('hero.signalDetail')}</strong>
              </figcaption>
            </motion.figure>
          </div>
        </section>

        <section id="program-explorer" className={styles.programExplorer}>
          <div className={styles.shell}>
            <header className={styles.sectionIntro}>
              <div>
                <p className={styles.sectionLabel}>{t('navigator.eyebrow')}</p>
                <h2>{t('navigator.title')}</h2>
              </div>
              <div className={styles.sectionIntroContext}>
                <p>{t('navigator.description')}</p>
                <div className={styles.sectionIntroNote}>
                  <strong>{t('hero.signal')}</strong>
                  <span>{t('hero.signalDetail')}</span>
                </div>
              </div>
            </header>

            <div className={styles.programWorkbench}>
              <nav className={styles.programChoices} aria-label={t('navigator.ariaLabel')}>
                {programs.map((program, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={program.slug}
                      id={PROGRAM_HASHES[index]}
                      type="button"
                      className={styles.choice}
                      aria-pressed={isActive}
                      data-active={isActive || undefined}
                      onClick={() => selectProgram(index)}
                    >
                      <span className={styles.choiceIcon} aria-hidden="true">
                        <ProgramIcon index={index} />
                      </span>
                      <span className={styles.choiceTitle}>
                        <span className={styles.choiceNumber}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <strong>{program.name}</strong>
                        <small>{program.category}</small>
                      </span>
                      <ArrowRight className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                    </button>
                  );
                })}
              </nav>

              <div className={styles.programStage} aria-live="polite">
                <AnimatePresence mode="wait" initial={!motionReduced}>
                  <motion.article
                    key={activeProgram.slug}
                    initial={motionReduced ? false : {opacity: 0, y: 14}}
                    animate={{opacity: 1, y: 0}}
                    exit={motionReduced ? undefined : {opacity: 0, y: -10}}
                    transition={{duration: 0.4, ease: [0.16, 1, 0.3, 1]}}
                    className={styles.programStageArticle}
                  >
                    <figure className={styles.programStageMedia}>
                      <picture className="semantic-responsive-picture">
                        {activeMedia.mobileImage !== activeMedia.stageImage ? (
                          <source media="(max-width: 40rem)" srcSet={activeMedia.mobileImage} />
                        ) : null}
                        <Image
                          src={activeMedia.stageImage}
                          alt={activeMedia.alt || t('navigator.imageAlt', {title: activeProgram.name})}
                          fill
                          quality={90}
                          sizes="(max-width: 760px) calc(100vw - 3rem), (max-width: 1120px) 44vw, 34rem"
                          style={{
                            objectFit: activeMedia.stageFit,
                            objectPosition: activeMedia.objectPosition,
                          }}
                          unoptimized={isSanityCdnImage(activeMedia.stageImage)}
                        />
                      </picture>
                    </figure>

                    <div className={styles.programStageCopy}>
                      <span className={styles.programStageKicker}>{activeProgram.category}</span>
                      <h3>{activeProgram.name}</h3>
                      <p>{activeProgram.summary}</p>

                      <div className={styles.programModules}>
                        <span className={styles.metaLabel}>{t('navigator.modules')}</span>
                        <ul>
                          {activeProgram.modules.map((module) => (
                            <li key={module}>{module}</li>
                          ))}
                        </ul>
                      </div>

                      <div className={styles.programDetails}>
                        <div>
                          <span className={styles.metaLabel}>{t('navigator.integrations')}</span>
                          <p>{activeProgram.integrations.join(', ')}</p>
                        </div>
                        <div>
                          <span className={styles.metaLabel}>{t('navigator.delivery')}</span>
                          <p>{activeProgram.deliveryModel}</p>
                        </div>
                      </div>

                      {activeProgram.proofLinks[0] && (
                        <Link
                          href={programHref(activeProgram.proofLinks[0])!}
                          className={styles.programProofLink}
                        >
                          {t('navigator.openProgram')}
                          <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.ownership}>
          <div className={`${styles.shell} ${styles.ownershipPanel}`}>
            <div className={styles.ownershipIntro}>
              <p className={`${styles.sectionLabel} ${styles.sectionLabelDark}`}>
                ARC delivery
              </p>
              <h2>{t('ownership.title')}</h2>
              <p>{t('ownership.description')}</p>
            </div>
            <div className={styles.ownershipPhases}>
              {ownershipSteps.map((step, index) => (
                <article key={step.title} className={styles.ownershipPhase}>
                  <div className={styles.ownershipPhaseHeader}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <i aria-hidden="true"><OwnershipIcon index={index} /></i>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                  <div className={styles.ownershipOutput}>
                    <small>{t('ownership.outputLabel')}</small>
                    <strong>{step.output}</strong>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <BottomCTA
          headline={t('bottomCta.title')}
          subtext={t('bottomCta.description')}
          primaryLabel={t('bottomCta.primary')}
          primaryHref="/contact"
          variant="light"
          compact
        />
      </div>
    </MotionConfig>
  );
}
