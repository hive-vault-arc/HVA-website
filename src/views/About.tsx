'use client';

import { useState, type CSSProperties, type ElementType } from 'react';
import Image from 'next/image';
import {Link} from '@/i18n/navigation';
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion';
import {useLocale, useTranslations} from 'next-intl';
import {
  ArrowUpRight,
  Compass,
  FileCheck2,
  Landmark,
  LockKeyhole,
  Settings2,
  Terminal,
  UsersRound,
} from '@/components/icons';
import SectionBrandMark from '../components/SectionBrandMark';
import BottomCTA from '../components/BottomCTA';
import PageAmbientBackground from '../components/PageAmbientBackground';
import {isSanityCdnImage} from '../lib/image-delivery';
import { useAnimationQuality } from '../lib/animationQuality';
import type { EmployeeProfile } from '../lib/employee-profiles';
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164 } from '../lib/seo';

type TeamMember = Pick<
  EmployeeProfile,
  | 'name'
  | 'slug'
  | 'position'
  | 'responsibilityTag'
  | 'summary'
  | 'profileImage'
  | 'profileImageAlt'
>;

type AboutProps = {
  readonly teamMembers: readonly TeamMember[];
};

type DeliveryStepCopy = {
  number: string;
  title: string;
  description: string;
  checkpoints: string[];
};

type CapabilityPillarCopy = {
  number: string;
  slug: string;
  title: string;
  description: string;
  outcome: string;
  phase: string;
};

type TrustSignalCopy = {
  id: string;
  title: string;
  description: string;
  linkLabel: string;
};

const deliveryStepIcons: ElementType[] = [Compass, Settings2, Terminal];

const featuredProof = {
  slug: 'top-tier-crm-transformation-program-real-estate-operations',
  client: 'ImmoWorld',
  industry: 'Luxury Real Estate',
  title: 'One CRM operating system for a live real estate operation.',
  summary:
    'Hive Vault Arc unified lead intake, buyer-journey pipeline work, team workflows, and operational reporting in one governed system.',
  status: 'Live operational rollout since May 2025',
  image: '/Images/case-studies/immoworld-crm-transformation-case-study-morocco.webp',
  imageAlt: 'ImmoWorld real estate CRM operating system engagement',
} as const;

const trustSignalConfig = [
  {
    id: 'leadership',
    href: '#founders',
    icon: UsersRound,
  },
  {
    id: 'proof',
    href: `/case-studies/${featuredProof.slug}`,
    icon: FileCheck2,
  },
  {
    id: 'legal',
    href: '/mentions-legales',
    icon: Landmark,
  },
  {
    id: 'privacy',
    href: '/privacy-policy',
    icon: LockKeyhole,
  },
] as const;

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.5 },
};

const About = ({ teamMembers }: AboutProps) => {
  const t = useTranslations('About');
  const locale = useLocale();
  const { motionReduced } = useAnimationQuality();
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [activeDeliveryStep, setActiveDeliveryStep] = useState(0);
  const deliveryStepCopy = t.raw('delivery.steps') as DeliveryStepCopy[];
  const deliverySteps = deliveryStepCopy.map((step, index) => ({
    ...step,
    icon: deliveryStepIcons[index] ?? Compass,
  }));
  const capabilityPillars = t.raw('capabilities.items') as CapabilityPillarCopy[];
  const companyFacts = t.raw('facts') as Array<{value: string; label: string}>;
  const trustSignalCopy = t.raw('trust.items') as TrustSignalCopy[];
  const trustSignals = trustSignalConfig.map((signal) => ({
    ...signal,
    ...trustSignalCopy.find((item) => item.id === signal.id)!,
    href: signal.id === 'proof' && locale === 'fr' ? '/case-studies' : signal.href,
  }));
  const activeDelivery = deliverySteps[activeDeliveryStep] ?? deliverySteps[0];
  const ActiveDeliveryIcon = activeDelivery.icon;

  return (
    <MotionConfig reducedMotion={motionReduced ? 'always' : 'never'}>
      <div className="about-hva-page about-redesign">
        <motion.div
          aria-hidden="true"
          className="about-scroll-progress"
          style={{ scaleX: progressScale }}
        />

        <section className="about-editorial-hero">
          <PageAmbientBackground className="about-editorial-hero-ambient" />
          <div className="about-editorial-shell about-editorial-hero-grid">
            <motion.div
              className="about-editorial-hero-copy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <div className="about-kicker">
                <SectionBrandMark size="sm" eager />
                <span>{t('hero.eyebrow')}</span>
              </div>
              <h1>
                {t('hero.titleLineOne')}
                <br />
                {t('hero.titleLineTwo')}
                <em>{t('hero.emphasis')}</em>
              </h1>
              <p>{t('hero.description')}</p>
              <div className="about-hero-actions">
                <Link href="/contact" className="about-button about-button-primary">
                  {t('hero.primaryCta')} <ArrowUpRight aria-hidden="true" />
                </Link>
                <Link href="/capabilities" className="about-button about-button-secondary">
                  {t('hero.secondaryCta')} <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="about-editorial-hero-media"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              <div className="about-hero-framework-card">
                <span>{t('hero.frameworkLabel')}</span>
                <strong>{t('hero.frameworkLoop')}</strong>
              </div>
              <Image
                src="/Images/about/hva-team-strategy-room.webp"
                alt={t('hero.imageAlt')}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover"
              />
              <div className="about-hero-media-caption">
                <SectionBrandMark surface="dark" size="sm" />
                <span>{t('hero.imageCaption')}</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="about-proof-strip" aria-labelledby="about-proof-heading">
          <div className="about-editorial-shell">
            <h2 id="about-proof-heading" className="sr-only">{t('factsHeading')}</h2>
            <div className="about-proof-grid">
              {companyFacts.map((fact) => (
                <motion.article key={fact.value} className="about-proof-item" {...reveal}>
                  <strong>{fact.value}</strong>
                  <p>{fact.label}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="service-map" className="about-service-map-section soft-grid-section">
          <div className="about-service-map-shell">
            <motion.div className="about-service-map-panel" {...reveal}>
              <div className="about-service-map-copy">
                <div aria-hidden="true" className="arc-dark-grid" />
                <div className="about-service-map-mark">
                  <SectionBrandMark surface="dark" size="sm" />
                  <span>{t('capabilities.eyebrow')}</span>
                </div>
                <h2>{t('capabilities.title')}</h2>
                <p>{t('capabilities.description')}</p>
                <Link href="/capabilities#capability-pillars" className="about-service-map-link">
                  {t('capabilities.cta')} <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>

              <div className="about-service-map-grid">
                {capabilityPillars.map((pillar) => (
                  <Link
                    key={pillar.number}
                    href={`/capabilities/${pillar.slug}`}
                    className="about-service-map-item"
                  >
                    <span className="about-service-map-text">
                      <span className="about-service-map-phase">{pillar.phase}</span>
                      <strong>{pillar.title}</strong>
                      <em>{pillar.outcome}</em>
                    </span>
                    <ArrowUpRight className="about-service-map-arrow" aria-hidden="true" />
                    <span className="sr-only">{pillar.description}</span>
                  </Link>
                ))}
              </div>

              <div className="about-service-map-media">
                <Image
                  src="/Images/capabilities/hva-arc-framework-operating-model.webp"
                  alt={t('capabilities.imageAlt')}
                  fill
                  sizes="(max-width: 1040px) 100vw, 92vw"
                  className="object-cover"
                />
                <div className="about-service-map-media-caption">
                  <div>
                    <SectionBrandMark surface="dark" size="sm" />
                    <span>{t('capabilities.imageLabel')}</span>
                  </div>
                  <p>{t('capabilities.imageCaption')}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="about-delivery-section">
          <div className="about-editorial-shell">
            <motion.div className="about-delivery-header" {...reveal}>
              <div className="about-section-heading">
                <span>{t('delivery.eyebrow')}</span>
                <h2>{t('delivery.title')}</h2>
              </div>
              <p>{t('delivery.description')}</p>
            </motion.div>
            <div className="about-delivery-progress" aria-hidden="true">
              <motion.span
                animate={{ width: `${((activeDeliveryStep + 1) / deliverySteps.length) * 100}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
            <div className="about-delivery-grid">
              {deliverySteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeDeliveryStep === index;
                return (
                  <motion.button
                    key={step.title}
                    type="button"
                    className={`about-delivery-step ${isActive ? 'about-delivery-step-active' : ''}`}
                    onMouseEnter={() => setActiveDeliveryStep(index)}
                    onFocus={() => setActiveDeliveryStep(index)}
                    onClick={() => setActiveDeliveryStep(index)}
                    aria-expanded={isActive}
                    aria-controls="about-delivery-detail"
                    {...reveal}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                  >
                    <Icon className="about-delivery-icon" aria-hidden="true" />
                    <h3>{step.title}</h3>
                  </motion.button>
                );
              })}
            </div>
            <motion.div
              id="about-delivery-detail"
              key={activeDelivery.title}
              className="about-delivery-detail"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
            >
              <div aria-hidden="true" className="arc-dark-grid" />
              <div className="about-delivery-detail-summary">
                <div className="about-delivery-detail-title">
                  <ActiveDeliveryIcon aria-hidden="true" />
                  <h3>{activeDelivery.title}</h3>
                </div>
                <p>{activeDelivery.description}</p>
              </div>
              <ul>
                {activeDelivery.checkpoints.map((checkpoint) => (
                  <li key={checkpoint}>{checkpoint}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        <section className="about-proof-case-section" aria-labelledby="about-proof-case-title">
          <div className="about-editorial-shell about-proof-case-grid">
            <motion.div className="about-proof-case-media" {...reveal}>
              <Image
                src={featuredProof.image}
                alt={t('proof.imageAlt')}
                fill
                sizes="(max-width: 767px) 100vw, 52vw"
                className="object-cover"
              />
            </motion.div>
            <motion.div className="about-proof-case-copy" {...reveal}>
              <div className="about-proof-case-client">
                <span>{featuredProof.client}</span>
                <span>{t('proof.industry')}</span>
              </div>
              <h2 id="about-proof-case-title">{t('proof.title')}</h2>
              <p>{t('proof.summary')}</p>
              <p className="about-proof-case-status">{t('proof.status')}</p>
              <Link
                href={locale === 'fr' ? '/case-studies' : `/case-studies/${featuredProof.slug}`}
                className="about-proof-case-link"
              >
                {t('proof.cta')} <ArrowUpRight aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="about-trust-band" aria-labelledby="about-trust-title">
          <div aria-hidden="true" className="arc-dark-grid" />
          <div className="about-editorial-shell about-trust-grid">
            <motion.div className="about-trust-copy" {...reveal}>
              <span>{t('trust.eyebrow')}</span>
              <h2 id="about-trust-title">{t('trust.title')}</h2>
              <p>{t('trust.description')}</p>
              <Link href="/case-studies" className="about-trust-primary-link">
                {t('trust.cta')} <ArrowUpRight aria-hidden="true" />
              </Link>
            </motion.div>
            <div className="about-trust-ledger">
              {trustSignals.map((signal) => {
                const Icon = signal.icon;
                return (
                  <motion.article
                    key={signal.title}
                    className="about-trust-item"
                    {...reveal}
                    transition={{ duration: 0.45 }}
                  >
                    <Icon aria-hidden="true" />
                    <div>
                      <h3>{signal.title}</h3>
                      <p>{signal.description}</p>
                    </div>
                    <Link href={signal.href}>
                      {signal.linkLabel} <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="founders" className="about-team-section">
          <div className="about-editorial-shell">
            <motion.div className="about-team-heading" {...reveal}>
              <span>{t('team.eyebrow')}</span>
              <h2>{t('team.title')}</h2>
              <p>{t('team.description')}</p>
            </motion.div>

            <div className="about-team-grid">
              {teamMembers.map((member, index) => {
                const profileTransitionName = `employee-profile-${member.slug}`;
                return (
                  <motion.article
                    id={member.slug}
                    key={member.slug}
                    className="about-team-card"
                    {...reveal}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                  >
                    <Link href={`/aboutus/our-people/${member.slug}`} className="about-team-card-link">
                      <div
                        className={`about-team-portrait about-team-portrait-${member.slug}`}
                        style={{ viewTransitionName: profileTransitionName } as CSSProperties}
                      >
                        <Image
                          src={member.profileImage}
                          alt={member.profileImageAlt}
                          fill
                          unoptimized={isSanityCdnImage(member.profileImage)}
                          loading={index === 0 ? 'eager' : 'lazy'}
                          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="about-team-card-copy">
                        <span className="about-team-responsibility">{member.responsibilityTag}</span>
                        <h3>{member.name}</h3>
                        <span className="about-team-position">{member.position}</span>
                        <p>{member.summary}</p>
                        <strong>
                          {t('team.viewProfile')} <ArrowUpRight aria-hidden="true" />
                        </strong>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="about-contact-strip" aria-labelledby="about-contact-title">
          <div className="about-editorial-shell about-contact-grid">
            <div>
              <h2 id="about-contact-title">{t('contact.title')}</h2>
              <p>{t('contact.description')}</p>
            </div>
            <address>
              <span>{t('contact.location')}</span>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <a href={`tel:${CONTACT_PHONE_E164}`}>{CONTACT_PHONE_DISPLAY}</a>
            </address>
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

export default About;
