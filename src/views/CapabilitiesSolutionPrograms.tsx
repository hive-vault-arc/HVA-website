'use client';

import Image from 'next/image';
import {Link} from '@/i18n/navigation';
import {useEffect, useState} from 'react';
import {AnimatePresence, MotionConfig, motion, useScroll, useTransform} from 'framer-motion';
import {useLocale, useTranslations} from 'next-intl';
import {ArrowRight, ArrowUpRight, Bot, Cloud, Database, Layers3} from '@/components/icons';
import BottomCTA from '../components/BottomCTA';
import SectionBrandMark from '../components/SectionBrandMark';
import {CAPABILITY_SOLUTION_PROGRAM_DETAILS} from '../lib/capabilities-content';
import {useAnimationQuality} from '../lib/animationQuality';

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
};

const PROGRAM_IMAGES: Record<string, string> = {
  'ai-reception-and-lead-operations-program':
    '/Images/solution-programs/hva-ai-reception-lead-operations.webp',
  'enterprise-crm-modernization-program':
    '/Images/solution-programs/hva-enterprise-crm-modernization.webp',
  'cloud-delivery-reliability-stack':
    '/Images/solution-programs/hva-cloud-delivery-reliability-stack.webp',
};

const PROGRAM_HASHES = ['program-01', 'program-02', 'program-03'] as const;

function ProgramIcon({index}: {index: number}) {
  const props = {className: 'h-5 w-5', strokeWidth: 1.5};

  if (index === 0) return <Bot {...props} />;
  if (index === 1) return <Database {...props} />;
  return <Cloud {...props} />;
}

export default function CapabilitiesSolutionPrograms() {
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
      <div className="solution-programs-page">
        <motion.div
          aria-hidden="true"
          className="solution-programs-progress"
          style={{scaleX: progressScale}}
        />

        <section className="solution-programs-hero">
          <div className="solution-programs-hero__routes" aria-hidden="true">
            {programs.map((program) => (
              <span key={program.slug} className="solution-programs-hero__route">
                <span />
              </span>
            ))}
            <span className="solution-programs-hero__axis" />
          </div>

          <div className="site-frame-wide solution-programs-hero__grid">
            <motion.div
              initial={motionReduced ? false : {opacity: 0, y: 18}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.48}}
              className="solution-programs-hero__copy"
            >
              <div className="solution-programs-kicker">
                <SectionBrandMark size="sm" />
                <span>{t('hero.eyebrow')}</span>
              </div>
              <h1>{t('hero.title')}</h1>
              <p>{t('hero.description')}</p>
              <div className="solution-programs-hero__actions">
                <Link href="#program-explorer" className="sharp-edge btn-primary">
                  {t('hero.primaryCta')}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                </Link>
                <Link href="/capabilities/in-detail" className="solution-programs-text-link">
                  {t('hero.secondaryCta')}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={motionReduced ? false : {opacity: 0, x: 22}}
              animate={{opacity: 1, x: 0}}
              transition={{duration: 0.52, delay: motionReduced ? 0 : 0.1}}
              className="solution-programs-hero__signal"
              aria-hidden="true"
            >
              <span>{t('hero.signal')}</span>
              <div className="solution-programs-hero__signal-grid">
                {programs.map((program, index) => (
                  <motion.div
                    key={program.slug}
                    animate={
                      motionReduced
                        ? {opacity: index === activeIndex ? 1 : 0.42}
                        : {
                            opacity: index === activeIndex ? 1 : 0.42,
                            y: index === activeIndex ? -5 : 0,
                          }
                    }
                    transition={{duration: 0.36, ease: [0.16, 1, 0.3, 1]}}
                  >
                    <ProgramIcon index={index} />
                    <strong>{String(index + 1).padStart(2, '0')}</strong>
                  </motion.div>
                ))}
              </div>
              <p>{t('hero.signalDetail')}</p>
            </motion.div>
          </div>
        </section>

        <section id="program-explorer" className="solution-programs-explorer">
          <div className="site-frame-wide">
            <div className="solution-programs-explorer__heading">
              <div className="solution-programs-kicker">
                <SectionBrandMark size="sm" />
                <span>{t('navigator.eyebrow')}</span>
              </div>
              <h2>{t('navigator.title')}</h2>
              <p>{t('navigator.description')}</p>
            </div>

            <div className="solution-programs-explorer__layout">
              <nav className="solution-programs-switchboard" aria-label={t('navigator.ariaLabel')}>
                {programs.map((program, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={program.slug}
                      id={PROGRAM_HASHES[index]}
                      type="button"
                      className="solution-programs-switchboard__choice"
                      aria-pressed={isActive}
                      data-active={isActive || undefined}
                      onClick={() => selectProgram(index)}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="solution-program-active-choice"
                          className="solution-programs-switchboard__active"
                          transition={{type: 'spring', stiffness: 420, damping: 34}}
                        />
                      )}
                      <span className="solution-programs-switchboard__content">
                        <span className="solution-programs-switchboard__number">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="solution-programs-switchboard__title">
                          <ProgramIcon index={index} />
                          <strong>{program.name}</strong>
                        </span>
                        <ArrowRight className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                      </span>
                    </button>
                  );
                })}
              </nav>

              <div className="solution-programs-stage" aria-live="polite">
                <AnimatePresence mode="wait" initial={!motionReduced}>
                  <motion.article
                    key={activeProgram.slug}
                    initial={motionReduced ? false : {opacity: 0, y: 16}}
                    animate={{opacity: 1, y: 0}}
                    exit={motionReduced ? undefined : {opacity: 0, y: -12}}
                    transition={{duration: 0.34, ease: [0.16, 1, 0.3, 1]}}
                    className="solution-programs-stage__content"
                  >
                    <div className="solution-programs-stage__summary">
                      <span>{activeProgram.category}</span>
                      <h3>{activeProgram.name}</h3>
                      <p>{activeProgram.summary}</p>

                      <div className="solution-programs-stage__modules">
                        <span>{t('navigator.modules')}</span>
                        <ul>
                          {activeProgram.modules.map((module) => (
                            <li key={module}>{module}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="solution-programs-stage__details">
                        <div>
                          <span>{t('navigator.integrations')}</span>
                          <p>{activeProgram.integrations.join(', ')}</p>
                        </div>
                        <div>
                          <span>{t('navigator.delivery')}</span>
                          <p>{activeProgram.deliveryModel}</p>
                        </div>
                      </div>

                      {activeProgram.proofLinks[0] && (
                        <Link
                          href={programHref(activeProgram.proofLinks[0])!}
                          className="solution-programs-proof-link"
                        >
                          {t('navigator.openProgram')}
                          <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                        </Link>
                      )}
                    </div>

                    <figure className="solution-programs-stage__media">
                      <Image
                        src={PROGRAM_IMAGES[activeProgram.slug]!}
                        alt={t('navigator.imageAlt', {title: activeProgram.name})}
                        fill
                        sizes="(max-width: 760px) calc(100vw - 3rem), (max-width: 1120px) 44vw, 34rem"
                        className="object-cover"
                      />
                    </figure>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        <section className="solution-programs-ownership">
          <div className="site-frame-wide solution-programs-ownership__layout">
            <motion.div
              initial={false}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.3}}
              transition={{duration: 0.42}}
              className="solution-programs-ownership__intro"
            >
              <Layers3 className="h-6 w-6" strokeWidth={1.45} aria-hidden="true" />
              <h2>{t('ownership.title')}</h2>
              <p>{t('ownership.description')}</p>
            </motion.div>

            <div className="solution-programs-ownership__steps">
              {ownershipSteps.map((step, index) => (
                <motion.article
                  key={step.title}
                  initial={false}
                  whileInView={{opacity: 1, x: 0}}
                  viewport={{once: true, amount: 0.35}}
                  transition={{duration: 0.4, delay: motionReduced ? 0 : index * 0.08}}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <BottomCTA
          variant="light"
          headline={t('bottomCta.title')}
          subtext={t('bottomCta.description')}
          primaryLabel={t('bottomCta.primary')}
          primaryHref="/contact"
          revealImmediately
        />
      </div>
    </MotionConfig>
  );
}
