'use client';

import {useState, type CSSProperties} from 'react';
import Image from 'next/image';
import {MotionConfig, motion, useScroll, useTransform} from 'framer-motion';
import {useLocale, useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {
  ArrowUpRight,
  FileCheck2,
  Landmark,
  LockKeyhole,
  UsersRound,
} from '@/components/icons';
import BottomCTA from '../components/BottomCTA';
import SectionBrandMark from '../components/SectionBrandMark';
import type {EmployeeProfile} from '../lib/employee-profiles';
import {isSanityCdnImage} from '../lib/image-delivery';
import {CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164} from '../lib/seo';

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

const phaseCapabilitySlugs = [
  new Set(['strategy-business', 'technology-consulting']),
  new Set(['ai-data-analytics', 'software-engineering', 'cloud-infrastructure']),
  new Set(['operations-managed']),
] as const;

const phaseMedia = [
  '/Images/capabilities/hva-arc-assess-operating-model.webp',
  '/Images/capabilities/hva-arc-reengineer-operating-model.webp',
  '/Images/capabilities/hva-arc-command-operating-model.webp',
] as const;

const featuredProof = {
  slug: 'top-tier-crm-transformation-program-real-estate-operations',
  client: 'ImmoWorld',
  image: '/Images/case-studies/immoworld-crm-transformation-case-study-morocco.webp',
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
  initial: {opacity: 0, y: 14},
  whileInView: {opacity: 1, y: 0},
  viewport: {once: true, amount: 0.14},
  transition: {duration: 0.48, ease: [0.23, 1, 0.32, 1]},
} as const;

const About = ({teamMembers}: AboutProps) => {
  const t = useTranslations('About');
  const locale = useLocale();
  const {scrollYProgress} = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  const deliveryStepCopy = t.raw('delivery.steps') as DeliveryStepCopy[];
  const deliverySteps = deliveryStepCopy;
  const capabilityPillars = t.raw('capabilities.items') as CapabilityPillarCopy[];
  const companyFacts = t.raw('facts') as Array<{value: string; label: string}>;
  const trustSignalCopy = t.raw('trust.items') as TrustSignalCopy[];
  const trustSignals = trustSignalConfig.map((signal) => ({
    ...signal,
    ...trustSignalCopy.find((item) => item.id === signal.id)!,
    href: signal.id === 'proof' && locale === 'fr' ? '/case-studies' : signal.href,
  }));

  const activePhase = deliverySteps[activePhaseIndex] ?? deliverySteps[0];
  const activePhaseMedia = phaseMedia[activePhaseIndex] ?? phaseMedia[0];
  const activeCapabilities = capabilityPillars.filter((pillar) =>
    phaseCapabilitySlugs[activePhaseIndex]?.has(pillar.slug),
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="about-hva-page about-v2">
        <motion.div
          aria-hidden="true"
          className="about-v2__progress"
          style={{scaleX: progressScale}}
        />

        <section className="about-v2__hero" aria-labelledby="about-title">
          <div className="site-frame-wide">
            <div className="about-v2__hero-grid">
              <motion.div
                className="about-v2__hero-copy"
                initial={{opacity: 0, y: 18}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.52, ease: [0.23, 1, 0.32, 1]}}
              >
                <div className="about-v2__mark">
                  <SectionBrandMark size="sm" eager />
                  <span>{t('hero.eyebrow')}</span>
                </div>
                <h1 id="about-title">
                  <span>{t('hero.titleLineOne')}</span>
                  <em>{t('hero.emphasis')}</em>
                </h1>
                <p>{t('hero.description')}</p>
                <div className="about-v2__actions">
                  <Link href="/contact">
                    {t('hero.primaryCta')} <ArrowUpRight aria-hidden="true" />
                  </Link>
                  <Link href="/capabilities">
                    {t('hero.secondaryCta')} <ArrowUpRight aria-hidden="true" />
                  </Link>
                </div>
              </motion.div>

              <motion.aside
                className="about-v2__facts"
                aria-labelledby="about-facts-title"
                initial={{opacity: 0, x: 16}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.5, delay: 0.08, ease: [0.23, 1, 0.32, 1]}}
              >
                <span id="about-facts-title">{t('factsHeading')}</span>
                <ol>
                  {companyFacts.map((fact, index) => (
                    <li key={fact.value}>
                      <small>{String(index + 1).padStart(2, '0')}</small>
                      <div>
                        <strong>{fact.value}</strong>
                        <p>{fact.label}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </motion.aside>
            </div>

            <div className="about-v2__hero-lower">
              <motion.aside
                className="about-v2__framework"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.42, delay: 0.18}}
              >
                <span>{t('hero.frameworkLabel')}</span>
                <strong>{t('hero.frameworkLoop')}</strong>
                <p>{t('hero.imageCaption')}</p>
              </motion.aside>

              <motion.figure
                className="about-v2__hero-media"
                initial={{opacity: 0.35, clipPath: 'inset(0 0 100% 0)'}}
                animate={{opacity: 1, clipPath: 'inset(0 0 0% 0)'}}
                transition={{duration: 0.72, delay: 0.1, ease: [0.23, 1, 0.32, 1]}}
              >
                <Image
                  src="/Images/about/hva-team-strategy-room.webp"
                  alt={t('hero.imageAlt')}
                  fill
                  priority
                  sizes="(max-width: 767px) 100vw, 78vw"
                  className="object-cover"
                />
                <figcaption>
                  <SectionBrandMark surface="dark" size="sm" />
                  <span>{t('hero.imageCaption')}</span>
                </figcaption>
              </motion.figure>
            </div>
          </div>
        </section>

        <section className="about-v2__loop" aria-labelledby="about-loop-title">
          <div className="site-frame-wide">
            <motion.header {...reveal}>
              <div className="about-v2__mark">
                <SectionBrandMark size="sm" />
                <span>{t('delivery.eyebrow')}</span>
              </div>
              <div>
                <h2 id="about-loop-title">{t('delivery.title')}</h2>
                <p>{t('delivery.description')}</p>
              </div>
            </motion.header>

            <div className="about-v2__phase-nav" aria-label={t('delivery.eyebrow')}>
              {deliverySteps.map((step, index) => {
                const isActive = index === activePhaseIndex;
                return (
                  <button
                    key={step.number}
                    type="button"
                    className={isActive ? 'is-active' : undefined}
                    aria-pressed={isActive}
                    aria-controls="about-phase-panel"
                    onClick={() => setActivePhaseIndex(index)}
                    onFocus={() => setActivePhaseIndex(index)}
                    onMouseEnter={() => setActivePhaseIndex(index)}
                  >
                    <small>{step.number}</small>
                    <strong>{step.title}</strong>
                  </button>
                );
              })}
            </div>

            <motion.div
              id="about-phase-panel"
              key={activePhase.number}
              className="about-v2__phase-panel"
              initial={{opacity: 0, y: 8}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.24, ease: 'easeOut'}}
            >
              <div className="about-v2__phase-copy">
                <h3>{activePhase.title}</h3>
                <p>{activePhase.description}</p>
                <ul>
                  {activePhase.checkpoints.map((checkpoint) => (
                    <li key={checkpoint}>{checkpoint}</li>
                  ))}
                </ul>
              </div>

              <figure className="about-v2__phase-media">
                <Image
                  src={activePhaseMedia}
                  alt={`${activePhase.title}: ${t('capabilities.imageAlt')}`}
                  fill
                  sizes="(max-width: 1023px) 100vw, 58vw"
                  className="object-cover"
                />
                <figcaption>
                  <span>{t('capabilities.imageLabel')}</span>
                  <strong>{t('capabilities.imageCaption')}</strong>
                </figcaption>
              </figure>

              <nav className="about-v2__capabilities" aria-label={t('capabilities.title')}>
                {activeCapabilities.map((capability) => (
                  <Link key={capability.slug} href={`/capabilities/${capability.slug}`}>
                    <span>{capability.number}</span>
                    <strong>{capability.title}</strong>
                    <em>{capability.outcome}</em>
                  </Link>
                ))}
              </nav>
            </motion.div>

            <Link href="/capabilities#capability-pillars" className="about-v2__all-capabilities">
              {t('capabilities.cta')} <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="about-v2__proof" aria-labelledby="about-proof-title">
          <div className="site-frame-wide">
            <div className="about-v2__proof-layout">
              <motion.figure className="about-v2__proof-media" {...reveal}>
                <Image
                  src={featuredProof.image}
                  alt={t('proof.imageAlt')}
                  fill
                  sizes="(max-width: 1023px) 100vw, 60vw"
                  className="object-cover"
                />
                <figcaption>
                  <span>{featuredProof.client}</span>
                  <strong>{t('proof.status')}</strong>
                </figcaption>
              </motion.figure>

              <motion.div className="about-v2__proof-copy" {...reveal}>
                <span>{t('proof.eyebrow')}</span>
                <small>{t('proof.industry')}</small>
                <h2 id="about-proof-title">{t('proof.title')}</h2>
                <p>{t('proof.summary')}</p>
                <Link
                  href={locale === 'fr' ? '/case-studies' : `/case-studies/${featuredProof.slug}`}
                >
                  {t('proof.cta')} <ArrowUpRight aria-hidden="true" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="about-v2__trust" aria-labelledby="about-trust-title">
          <div aria-hidden="true" className="arc-dark-grid" />
          <div className="site-frame-wide">
            <motion.div className="about-v2__trust-copy" {...reveal}>
              <span>{t('trust.eyebrow')}</span>
              <h2 id="about-trust-title">{t('trust.title')}</h2>
              <p>{t('trust.description')}</p>
              <Link href="/case-studies">
                {t('trust.cta')} <ArrowUpRight aria-hidden="true" />
              </Link>
            </motion.div>

            <div className="about-v2__trust-ledger">
              {trustSignals.map((signal, index) => {
                const Icon = signal.icon;
                return (
                  <motion.article key={signal.id} {...reveal}>
                    <small>{String(index + 1).padStart(2, '0')}</small>
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

        <section id="founders" className="about-team-section" aria-labelledby="about-team-title">
          <div className="about-editorial-shell">
            <motion.div className="about-team-heading" {...reveal}>
              <span>{t('team.eyebrow')}</span>
              <h2 id="about-team-title">{t('team.title')}</h2>
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
                    transition={{duration: 0.5, delay: index * 0.08}}
                  >
                    <Link
                      href={`/aboutus/our-people/${member.slug}`}
                      className="about-team-card-link"
                    >
                      <div
                        className={`about-team-portrait about-team-portrait-${member.slug}`}
                        style={{viewTransitionName: profileTransitionName} as CSSProperties}
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
                        <span className="about-team-responsibility">
                          {member.responsibilityTag}
                        </span>
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

        <section className="about-v2__contact" aria-labelledby="about-contact-title">
          <div className="site-frame-wide">
            <div>
              <span>{t('contact.eyebrow')}</span>
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
