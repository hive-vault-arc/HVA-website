'use client';

import { useState, type CSSProperties, type ElementType } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  Compass,
  FileCheck2,
  Landmark,
  LockKeyhole,
  Settings2,
  Terminal,
  UsersRound,
} from 'lucide-react';
import SectionBrandMark from '../components/SectionBrandMark';
import BottomCTA from '../components/BottomCTA';
import PageAmbientBackground from '../components/PageAmbientBackground';
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

type DeliveryStep = {
  number: string;
  title: string;
  description: string;
  icon: ElementType;
  checkpoints: string[];
};

type CapabilityPillar = {
  number: string;
  slug: string;
  title: string;
  description: string;
  outcome: string;
  phase: 'Assess' | 'Build' | 'Operate';
};

type TrustSignal = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  icon: ElementType;
};

const deliverySteps: DeliveryStep[] = [
  {
    number: '01',
    title: 'Assess',
    description: 'Map friction, define target architecture, and sequence the transformation before a single line of code is written.',
    icon: Compass,
    checkpoints: ['Define measurable outcomes', 'Audit current systems and blockers', 'Sequence strategy into milestones'],
  },
  {
    number: '02',
    title: 'Re-engineer',
    description: 'Build the systems, deploy the intelligence, and wire the infrastructure in transparent sprint increments.',
    icon: Settings2,
    checkpoints: ['Deliver AI, software, and cloud layers', 'Validate against real outcomes', 'Iterate through demos and QA loops'],
  },
  {
    number: '03',
    title: 'Command',
    description: 'Stabilize, monitor, and evolve the operation with the same team retaining long-term ownership.',
    icon: Terminal,
    checkpoints: ['Operate production systems', 'Monitor reliability and performance', 'Evolve as requirements grow'],
  },
];

const capabilityPillars: CapabilityPillar[] = [
  {
    number: '01',
    slug: 'strategy-business',
    title: 'Strategy',
    description: 'Enterprise strategy, operating models, and transformation roadmaps.',
    outcome: 'Shape the operating roadmap before build starts.',
    phase: 'Assess',
  },
  {
    number: '02',
    slug: 'technology-consulting',
    title: 'Technology',
    description: 'Architecture, platforms, integration, and emerging technology decisions.',
    outcome: 'Decide the architecture and integration path.',
    phase: 'Assess',
  },
  {
    number: '03',
    slug: 'ai-data-analytics',
    title: 'AI & Data',
    description: 'AI engineering, data strategy, analytics, and intelligent automation.',
    outcome: 'Turn data and workflows into useful intelligence.',
    phase: 'Build',
  },
  {
    number: '04',
    slug: 'software-engineering',
    title: 'Software',
    description: 'Custom software, product engineering, and digital experiences.',
    outcome: 'Ship the product layer people actually use.',
    phase: 'Build',
  },
  {
    number: '05',
    slug: 'cloud-infrastructure',
    title: 'Cloud',
    description: 'Cloud platforms, DevOps, security, and infrastructure modernization.',
    outcome: 'Make the system reliable, secure, and observable.',
    phase: 'Build',
  },
  {
    number: '06',
    slug: 'operations-managed',
    title: 'Operations',
    description: 'Managed services, automation, support, and continuous performance improvement.',
    outcome: 'Keep production improving after launch.',
    phase: 'Operate',
  },
];

const companyFacts = [
  {
    value: 'Founder-led',
    label: 'Senior ownership from first decision to live operation',
  },
  {
    value: 'Tangier, Morocco',
    label: 'Serving organizations across Morocco, France, and MENA',
  },
  {
    value: 'Six capabilities',
    label: 'Strategy, technology, AI, software, cloud, and operations',
  },
  {
    value: 'One operating loop',
    label: 'Assess, Re-engineer, and Command without a delivery handoff',
  },
] as const;

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
  metrics: [
    { value: '94', label: 'active users' },
    { value: '$2.4M', label: 'monthly pipeline tracked' },
    { value: '-40%', label: 'reported manual data entry' },
  ],
} as const;

const trustSignals: TrustSignal[] = [
  {
    title: 'Named leadership',
    description: 'Founder profiles show who owns strategy, engineering, product systems, cloud, and production reliability.',
    href: '#founders',
    linkLabel: 'Meet the founders',
    icon: UsersRound,
  },
  {
    title: 'Published delivery proof',
    description: 'The ImmoWorld case records the business challenge, production status, and reported operating figures.',
    href: `/case-studies/${featuredProof.slug}`,
    linkLabel: 'Read the case study',
    icon: FileCheck2,
  },
  {
    title: 'Public legal information',
    description: 'Our publisher, Tangier location, publication director, hosting provider, and official contacts are documented.',
    href: '/mentions-legales',
    linkLabel: 'View legal information',
    icon: Landmark,
  },
  {
    title: 'Clear data practices',
    description: 'Our privacy policy explains what we collect, why we collect it, and how Law 09-08 and GDPR obligations are addressed.',
    href: '/privacy-policy',
    linkLabel: 'Read the privacy policy',
    icon: LockKeyhole,
  },
];

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.5 },
};

const About = ({ teamMembers }: AboutProps) => {
  const { motionReduced } = useAnimationQuality();
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [activeDeliveryStep, setActiveDeliveryStep] = useState(0);
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
                <span>Who We Are</span>
              </div>
              <h1>
                We advise. We build.
                <br />
                We operate.
                <em>One accountable partner.</em>
              </h1>
              <p>
                Hive Vault Arc is a technology transformation partner combining strategy, AI
                engineering, software, cloud, and managed operations into one production-minded
                delivery model.
              </p>
              <div className="about-hero-actions">
                <Link href="/contact" className="about-button about-button-primary">
                  Book a Call <ArrowUpRight aria-hidden="true" />
                </Link>
                <Link href="/capabilities" className="about-button about-button-secondary">
                  View Capabilities <ArrowUpRight aria-hidden="true" />
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
                <span>ARC Framework</span>
                <strong>Assess. Re-engineer. Command.</strong>
              </div>
              <Image
                src="/Images/about/hva-team-strategy-room.webp"
                alt="Technology leadership team reviewing global operations in a strategy room at night"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover"
              />
              <div className="about-hero-media-caption">
                <SectionBrandMark surface="dark" size="sm" />
                <span>Strategy to production</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="about-proof-strip" aria-labelledby="about-proof-heading">
          <div className="about-editorial-shell">
            <h2 id="about-proof-heading" className="sr-only">Hive Vault Arc at a glance</h2>
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
                  <span>What We Do</span>
                </div>
                <h2>What we do, in one view.</h2>
                <p>Six connected capabilities move from business decision to reliable operation.</p>
                <Link href="/capabilities#capability-pillars" className="about-service-map-link">
                  Explore all capabilities <ArrowUpRight aria-hidden="true" />
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
                  alt="ARC operating model workspace"
                  fill
                  sizes="(max-width: 1040px) 100vw, 92vw"
                  className="object-cover"
                />
                <div className="about-service-map-media-caption">
                  <div>
                    <SectionBrandMark surface="dark" size="sm" />
                    <span>ARC operating model</span>
                  </div>
                  <p>Strategy connected to delivery and operations</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="about-delivery-section">
          <div className="about-editorial-shell">
            <motion.div className="about-delivery-header" {...reveal}>
              <div className="about-section-heading">
                <span>How We Deliver</span>
                <h2>One team through every phase.</h2>
              </div>
              <p>ARC turns strategy, engineering, and operations into one continuous accountability loop.</p>
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
                alt={featuredProof.imageAlt}
                fill
                sizes="(max-width: 767px) 100vw, 52vw"
                className="object-cover"
              />
            </motion.div>
            <motion.div className="about-proof-case-copy" {...reveal}>
              <div className="about-proof-case-client">
                <span>{featuredProof.client}</span>
                <span>{featuredProof.industry}</span>
              </div>
              <h2 id="about-proof-case-title">{featuredProof.title}</h2>
              <p>{featuredProof.summary}</p>
              <dl className="about-proof-case-metrics">
                {featuredProof.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt>{metric.label}</dt>
                    <dd>{metric.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="about-proof-case-status">{featuredProof.status}. Figures reflect the current reported operating record.</p>
              <Link href={`/case-studies/${featuredProof.slug}`} className="about-proof-case-link">
                Read the ImmoWorld case study <ArrowUpRight aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="about-trust-band" aria-labelledby="about-trust-title">
          <div aria-hidden="true" className="arc-dark-grid" />
          <div className="about-editorial-shell about-trust-grid">
            <motion.div className="about-trust-copy" {...reveal}>
              <span>Why buyers trust HVA</span>
              <h2 id="about-trust-title">Trust should be verifiable.</h2>
              <p>See who is responsible, what has shipped, how we operate, and how your information is handled.</p>
              <Link href="/case-studies" className="about-trust-primary-link">
                Review delivery proof <ArrowUpRight aria-hidden="true" />
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
              <span>Our Team</span>
              <h2>The People Behind Hive Vault Arc</h2>
              <p>
                Operators, engineers, and builders with deep expertise and a shared commitment to
                solving complex problems that matter.
              </p>
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
                    <a href={`/aboutus/our-people/${member.slug}`} className="about-team-card-link">
                      <div
                        className={`about-team-portrait about-team-portrait-${member.slug}`}
                        style={{ viewTransitionName: profileTransitionName } as CSSProperties}
                      >
                        <Image
                          src={member.profileImage}
                          alt={member.profileImageAlt}
                          fill
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
                          View Profile <ArrowUpRight aria-hidden="true" />
                        </strong>
                      </div>
                    </a>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="about-contact-strip" aria-labelledby="about-contact-title">
          <div className="about-editorial-shell about-contact-grid">
            <div>
              <h2 id="about-contact-title">Start in Tangier. Work across borders.</h2>
              <p>Direct access to the team responsible for the decision, delivery, and operation.</p>
            </div>
            <address>
              <span>Tangier, Morocco</span>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <a href={`tel:${CONTACT_PHONE_E164}`}>{CONTACT_PHONE_DISPLAY}</a>
            </address>
          </div>
        </section>

        <BottomCTA
          variant="light"
          headline="Bring us the outcome, not a prewritten solution."
          subtext="We will map the right strategy, engineering, and operations path, then stay accountable through production."
          primaryLabel="Book a Call"
          primaryHref="/contact"
          secondaryLabel="View Our Capabilities"
          secondaryHref="/capabilities"
        />
      </div>
    </MotionConfig>
  );
};

export default About;
