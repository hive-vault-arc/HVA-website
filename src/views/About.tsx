'use client';

import {useState, type CSSProperties} from 'react';
import Image from 'next/image';
import {MotionConfig, motion, useScroll, useTransform} from 'framer-motion';
import {useLocale, useTranslations} from 'next-intl';
import {FaLinkedinIn, FaXTwitter} from 'react-icons/fa6';
import {Link} from '@/i18n/navigation';
import {
  ArrowUpRight,
  Compass,
  FileCheck2,
  Globe,
  Instagram,
  Landmark,
  LockKeyhole,
  Mail,
  MessageSquare,
  Phone,
  UsersRound,
} from '@/components/icons';
import BottomCTA from '../components/BottomCTA';
import type {EmployeeProfile} from '../lib/employee-profiles';
import type {CaseStudy} from '../lib/proof';
import {isSanityCdnImage} from '../lib/image-delivery';
import ResponsiveMedia from '@/components/media/ResponsiveMedia';
import type {AppLocale} from '@/i18n/config';
import {SEMANTIC_MEDIA} from '@/lib/semantic-media';
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_E164,
  SOCIAL_PROFILES,
} from '../lib/seo';

const ABOUT_SOCIAL_PROFILES = SOCIAL_PROFILES.filter(({label}) =>
  ['LinkedIn', 'Instagram', 'X'].includes(label),
);

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
  readonly featuredCaseStudy?: Pick<
    CaseStudy,
    'slug' | 'title' | 'clientName' | 'assets'
  >;
  readonly organizationFacts?: {
    email: string;
    telephone: string;
    sameAs: readonly string[];
  };
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
  SEMANTIC_MEDIA.arc.assess,
  SEMANTIC_MEDIA.arc.reengineer,
  SEMANTIC_MEDIA.arc.command,
] as const;

const DEFAULT_FEATURED_PROOF = {
  slug: 'premium-advice-training-keepzen-digital-academy',
  client: 'Premium Advice x KeepZen',
  image: '/Images/case-studies/premium-advice-keepzen-digital-academy.webp',
  imageAlt: 'Premium Advice and KeepZen digital academy platform',
} as const;

const trustSignalConfig = [
  {
    id: 'leadership',
    href: '#founders',
    icon: UsersRound,
  },
  {
    id: 'proof',
    href: `/case-studies/${DEFAULT_FEATURED_PROOF.slug}`,
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

const About = ({teamMembers, featuredCaseStudy, organizationFacts}: AboutProps) => {
  const t = useTranslations('About');
  const locale = useLocale() as AppLocale;
  const publicEmail = organizationFacts?.email || CONTACT_EMAIL;
  const publicTelephone = organizationFacts?.telephone || CONTACT_PHONE_E164;
  const publicSocialProfiles = organizationFacts?.sameAs?.length
    ? organizationFacts.sameAs.map((url) => {
        const known = ABOUT_SOCIAL_PROFILES.find((profile) => profile.url === url);
        if (known) return known;
        const hostname = new URL(url).hostname.replace(/^www\./, '');
        return {label: hostname, handle: hostname, url};
      })
    : ABOUT_SOCIAL_PROFILES;
  const featuredProof = featuredCaseStudy
    ? {
        slug: featuredCaseStudy.slug,
        client: featuredCaseStudy.clientName,
        image: featuredCaseStudy.assets.coverImage,
        imageAlt:
          featuredCaseStudy.assets.coverAlt ?? featuredCaseStudy.title,
      }
    : DEFAULT_FEATURED_PROOF;
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
                  <span className="page-family-label-line" aria-hidden="true" />
                  <span>{t('hero.eyebrow')}</span>
                </div>
                <h1 id="about-title">
                  <span>{t('hero.titleLineOne')}</span>
                  <em>{t('hero.emphasis')}</em>
                </h1>
                <p>{t('hero.description')}</p>
                <div className="about-v2__actions">
                  <Link href="/contact">
                    {t('hero.primaryCta')}
                  </Link>
                  <Link href="/capabilities">
                    {t('hero.secondaryCta')}
                  </Link>
                </div>
              </motion.div>

              <motion.figure
                className="about-v2__hero-media"
                initial={{opacity: 0.35, clipPath: 'inset(0 0 100% 0)'}}
                animate={{opacity: 1, clipPath: 'inset(0 0 0% 0)'}}
                transition={{duration: 0.72, delay: 0.1, ease: [0.23, 1, 0.32, 1]}}
              >
                <Image
                  src="/Images/about/hva-about-team-system-session-v3.webp"
                  alt={t('hero.imageAlt')}
                  fill
                  priority
                  quality={90}
                  sizes="(max-width: 767px) calc(100vw - 2rem), 56vw"
                  className="object-cover"
                />
                <figcaption>
                  <span>{t('hero.frameworkLabel')}</span>
                  <strong>{t('hero.frameworkLoop')}</strong>
                </figcaption>
              </motion.figure>
            </div>

            <motion.aside
              className="about-v2__facts"
              aria-labelledby="about-facts-title"
              initial={{opacity: 0, y: 12}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5, delay: 0.16, ease: [0.23, 1, 0.32, 1]}}
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
        </section>

        <section className="about-v2__loop" aria-labelledby="about-loop-title">
          <div className="site-frame-wide">
            <motion.header {...reveal}>
              <div className="about-v2__mark">
                <span className="page-family-label-line" aria-hidden="true" />
                <span>{t('delivery.eyebrow')}</span>
              </div>
              <h2 id="about-loop-title">{t('delivery.title')}</h2>
              <p>{t('delivery.description')}</p>
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
                <ResponsiveMedia
                  media={activePhaseMedia}
                  locale={locale}
                  sizes="(max-width: 1023px) 100vw, 58vw"
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
                  alt={featuredProof.imageAlt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 60vw"
                  className="object-contain"
                  unoptimized={isSanityCdnImage(featuredProof.image)}
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
                <Link href={`/case-studies/${featuredProof.slug}`}>
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
                          quality={90}
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
              <div className="about-v2__contact-details">
                <span>
                  <i className="about-v2__contact-icon"><Compass aria-hidden="true" /></i>
                  <span>{t('contact.location')}</span>
                </span>
                <span>
                  <i className="about-v2__contact-icon"><Globe aria-hidden="true" /></i>
                  <span>{t('contact.region')}</span>
                </span>
                <span>
                  <i className="about-v2__contact-icon"><MessageSquare aria-hidden="true" /></i>
                  <span>{t('contact.languages')}</span>
                </span>
                <a href={`mailto:${publicEmail}`}>
                  <i className="about-v2__contact-icon"><Mail aria-hidden="true" /></i>
                  <span>{publicEmail}</span>
                </a>
                <a href={`tel:${publicTelephone}`}>
                  <i className="about-v2__contact-icon"><Phone aria-hidden="true" /></i>
                  <span>{organizationFacts ? publicTelephone : CONTACT_PHONE_DISPLAY}</span>
                </a>
              </div>
              <div className="about-v2__contact-socials" aria-label={t('contact.socialLabel')}>
                {publicSocialProfiles.map((profile) => (
                  <a
                    key={profile.label}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${profile.label}: ${profile.handle}`}
                  >
                    <i className="about-v2__contact-icon about-v2__contact-social-icon">
                      {profile.label === 'Instagram' ? (
                        <Instagram aria-hidden="true" />
                      ) : profile.label === 'LinkedIn' ? (
                        <FaLinkedinIn aria-hidden="true" />
                      ) : (
                        <FaXTwitter aria-hidden="true" />
                      )}
                    </i>
                    <span>
                      <strong>{profile.label}</strong>
                    </span>
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                ))}
              </div>
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
