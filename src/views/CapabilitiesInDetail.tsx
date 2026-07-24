'use client';

import React from 'react';
import {Link} from '@/i18n/navigation';
import Image from 'next/image';
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion';
import {useTranslations} from 'next-intl';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Building2,
  CheckCircle2,
  Cloud,
  Cpu,
  Layers3,
  Settings,
  Wrench,
} from '@/components/icons';
import { useAnimationQuality } from '../lib/animationQuality';
import BottomCTA from '../components/BottomCTA';
import SectionBrandMark from '../components/SectionBrandMark';
import {
  CAPABILITY_SOLUTION_PROGRAM_DETAILS,
} from '../lib/capabilities-content';
import type {CapabilityDetailSection} from '../lib/capabilities-content';

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

const capabilityImages: Record<string, string> = {
  'strategy-business': '/Images/capabilities/hva-strategy-business-capability.webp',
  'technology-consulting': '/Images/capabilities/hva-technology-consulting-capability.webp',
  'ai-data-analytics': '/Images/capabilities/hva-ai-data-capability.webp',
  'software-engineering': '/Images/capabilities/hva-software-engineering-capability.webp',
  'cloud-infrastructure': '/Images/capabilities/hva-cloud-infrastructure-capability.webp',
  'operations-managed': '/Images/capabilities/hva-operations-managed-capability.webp',
};

type ProgramCopy = {category: string; name: string; summary: string};
type PhaseCopy = {title: string; detail: string};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const CapabilitiesInDetail: React.FC = () => {
  const t = useTranslations('CapabilitiesDetail');
  const capabilitiesT = useTranslations('Capabilities');
  const { motionReduced } = useAnimationQuality();
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const detailSections = t.raw('pillars.items') as CapabilityDetailSection[];
  const heroStats = t.raw('hero.stats') as Array<{value: string; label: string}>;
  const arcSignals = t.raw('arc.signals') as string[];
  const arcPhases = capabilitiesT.raw('botPhases') as PhaseCopy[];
  const programCopy = capabilitiesT.raw('programs') as ProgramCopy[];
  const featuredPrograms = CAPABILITY_SOLUTION_PROGRAM_DETAILS.slice(0, 3).map((program, index) => ({
    ...program,
    ...programCopy[index],
  }));

  return (
    <MotionConfig reducedMotion={motionReduced ? 'always' : 'never'}>
      <div className="cap-detail-page">
        <motion.div
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-[#E8A838]"
          style={{ scaleX: progressScale }}
        />

        <section className="cap-detail-hero soft-grid-section">
          <div className="cap-detail-shell cap-detail-hero-grid">
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            >
              <motion.div variants={fadeUp} transition={{ duration: 0.45 }} className="cap-detail-mark">
                <SectionBrandMark size="sm" />
                <span>{t('hero.eyebrow')}</span>
              </motion.div>

              <motion.h1 variants={fadeUp} transition={{ duration: 0.5 }}>
                {t('hero.title')}
              </motion.h1>

              <motion.p variants={fadeUp} transition={{ duration: 0.5 }} className="cap-detail-hero-copy">
                {t('hero.description')}
              </motion.p>

              <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="cap-detail-actions">
                <Link href="#capability-map" className="sharp-edge btn-primary">
                  {t('hero.primaryCta')}
                </Link>
                <Link href="/capabilities/solution-programs" className="sharp-edge btn-outlined">
                  {t('hero.secondaryCta')}
                </Link>
              </motion.div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="cap-detail-hero-panel"
            >
              <div className="cap-detail-hero-panel-head">
                <Layers3 className="h-5 w-5" strokeWidth={1.5} />
                <strong>{t('hero.panelTitle')}</strong>
              </div>
              <div className="cap-detail-stat-grid">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="cap-detail-stat">
                    <span>{stat.value}</span>
                    <em>{stat.label}</em>
                  </div>
                ))}
              </div>
              <p>
                {t('hero.panelDescription')}
              </p>
            </motion.aside>
          </div>
        </section>

        <nav className="cap-detail-index" aria-label={t('indexAria')}>
          <div className="cap-detail-shell cap-detail-index-grid">
            {detailSections.map((domain, index) => (
              <a key={domain.id} href={`#pillar-${domain.id}`} className="cap-detail-index-item">
                <span>{String(index + 1).padStart(2, '0')}</span>
                {getDetailIcon(domain.id, 'h-4 w-4')}
                <strong>{domain.title.replace(' & Product Development', '')}</strong>
              </a>
            ))}
          </div>
        </nav>

        <section id="capability-map" className="cap-detail-map-section">
          <div className="cap-detail-shell">
            <div className="cap-detail-section-head">
              <div className="cap-detail-mark">
                <SectionBrandMark size="sm" />
                <span>{t('pillars.eyebrow')}</span>
              </div>
              <h2>{t('pillars.title')}</h2>
              <p>{t('pillars.description')}</p>
            </div>

            <div className="cap-detail-pillar-grid">
              {detailSections.map((domain, index) => (
                <motion.article
                  key={domain.id}
                  id={`pillar-${domain.id}`}
                  className="cap-detail-pillar-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.4, delay: (index % 2) * 0.05 }}
                >
                  <div className="cap-detail-card-media">
                    <Image
                      src={capabilityImages[domain.id]}
                      alt={t('pillars.imageAlt', {title: domain.title})}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </div>

                  <div className="cap-detail-card-body">
                    <div className="cap-detail-card-title">
                      <span aria-hidden="true">{getDetailIcon(domain.id, 'h-5 w-5')}</span>
                      <h3>{domain.title}</h3>
                    </div>
                    <p>{domain.briefLine}</p>

                    <ul className="cap-detail-chip-list" aria-label={t('pillars.coreAreas', {title: domain.title})}>
                      {domain.briefBullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>

                    <div className="cap-detail-outcome">
                      <span>{t('pillars.primaryOutcome')}</span>
                      <strong>{domain.relatedOutcomes[0]}</strong>
                    </div>

                    <details className="cap-detail-more">
                      <summary>
                        {t('pillars.fullCoverage')}
                        <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.7} />
                      </summary>
                      <div className="cap-detail-more-content">
                        <p>{domain.executionContext}</p>
                        <ul>
                          {domain.subCapabilities.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </details>

                    <Link href={`/capabilities/${domain.id}`} className="cap-detail-card-link">
                      {t('pillars.openCapability')}
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.7} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="arc-delivery" className="cap-detail-arc-section">
          <div className="cap-detail-shell cap-detail-arc-grid">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.45 }}
              className="cap-detail-arc-copy"
            >
              <div className="cap-detail-mark cap-detail-mark-dark">
                <SectionBrandMark surface="dark" size="sm" />
                <span>{t('arc.eyebrow')}</span>
              </div>
              <h2>{t('arc.title')}</h2>
              <p>{t('arc.description')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="cap-detail-arc-panel"
            >
              {arcPhases.map((phase, index) => (
                <article key={phase.title} className="cap-detail-arc-phase">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{phase.title}</h3>
                  <p>{phase.detail}</p>
                </article>
              ))}
            </motion.div>

            <motion.ul
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="cap-detail-signal-list"
            >
              {arcSignals.map((signal) => (
                <li key={signal}>
                  <CheckCircle2 className="h-4 w-4" strokeWidth={1.7} />
                  {signal}
                </li>
              ))}
            </motion.ul>
          </div>
        </section>

        <section className="cap-detail-program-section soft-grid-section">
          <div className="cap-detail-shell">
            <div className="cap-detail-section-head cap-detail-section-head-center">
              <div className="cap-detail-mark">
                <SectionBrandMark size="sm" />
                <span>{t('programs.eyebrow')}</span>
              </div>
              <h2>{t('programs.title')}</h2>
            </div>

            <div className="cap-detail-program-grid">
              {featuredPrograms.map((program, index) => (
                <Link
                  key={program.slug}
                  href={`/capabilities/solution-programs#program-${String(index + 1).padStart(2, '0')}`}
                  className="cap-detail-program-card"
                >
                  <span>{program.category}</span>
                  <strong>{program.name}</strong>
                  <em>{program.summary}</em>
                  <span className="cap-detail-program-link">
                    {t('programs.view')} <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.7} />
                  </span>
                </Link>
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
          secondaryLabel={t('bottomCta.secondary')}
          secondaryHref="/capabilities"
        />
      </div>
    </MotionConfig>
  );
};

export default CapabilitiesInDetail;
