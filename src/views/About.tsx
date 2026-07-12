'use client';

import { useState, type CSSProperties, type ElementType } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  Compass,
  Gauge,
  Network,
  Settings2,
  ShieldCheck,
  Target,
  Terminal,
  UserRoundCheck,
} from 'lucide-react';
import SectionBrandMark from '../components/SectionBrandMark';
import BottomCTA from '../components/BottomCTA';
import PageAmbientBackground from '../components/PageAmbientBackground';
import { useAnimationQuality } from '../lib/animationQuality';
import type { EmployeeProfile } from '../lib/employee-profiles';

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

type Principle = {
  title: string;
  description: string;
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

const principles: Principle[] = [
  {
    title: 'No Handoffs',
    description: 'One team, end to end, accountable for every outcome.',
    icon: Network,
  },
  {
    title: 'Outcomes Over Output',
    description: 'We align on business impact, not activity or deliverables.',
    icon: Target,
  },
  {
    title: 'Vertical Depth',
    description: 'Deep expertise in key sectors and technical domains.',
    icon: Gauge,
  },
  {
    title: 'Founder Accountability',
    description: 'Senior leadership stays engaged from strategy to scale.',
    icon: UserRoundCheck,
  },
  {
    title: 'Production Ownership',
    description: 'We design, build, and operate with long-term ownership.',
    icon: ShieldCheck,
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
                <SectionBrandMark size="sm" />
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

        <section className="about-delivery-section">
          <div className="about-editorial-shell">
            <motion.div className="about-delivery-header" {...reveal}>
              <div className="about-section-heading">
                <span>The ARC Loop</span>
                <h2>How We Deliver</h2>
              </div>
              <p>
                Assess, Re-engineer, and Command form one continuous loop operated by the same
                team. Strategy informs build, build informs operations, and operations feeds back
                into strategy.
              </p>
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
                    key={step.number}
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
                    <span className="about-delivery-number">{step.number}</span>
                    <Icon className="about-delivery-icon" aria-hidden="true" />
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </motion.button>
                );
              })}
            </div>
            <motion.div
              id="about-delivery-detail"
              key={activeDelivery.number}
              className="about-delivery-detail"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
            >
              <div className="about-delivery-detail-header">
                <span>{activeDelivery.number}</span>
                <ActiveDeliveryIcon aria-hidden="true" />
                <div>
                  <span>ARC Phase</span>
                  <h3>{activeDelivery.title}</h3>
                </div>
              </div>
              <p>{activeDelivery.description}</p>
              <ul>
                {activeDelivery.checkpoints.map((checkpoint) => (
                  <li key={checkpoint}>{checkpoint}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        <section id="service-map" className="about-service-map-section soft-grid-section">
          <div className="about-service-map-shell">
            <motion.div className="about-service-map-panel" {...reveal}>
              <div className="about-service-map-copy">
                <div className="about-service-map-media">
                  <Image
                    src="/Images/capabilities/hva-arc-framework-operating-model.webp"
                    alt="ARC operating model workspace"
                    fill
                    sizes="(max-width: 1040px) 100vw, 32vw"
                    className="object-cover"
                  />
                </div>
                <div className="about-service-map-mark">
                  <SectionBrandMark size="sm" />
                  <span>What We Do</span>
                </div>
                <h2>Six pillars. One loop.</h2>
                <p>Diagnose the work. Build the system. Keep it running.</p>
                <Link href="/capabilities#capability-pillars" className="about-service-map-link">
                  View full map <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>

              <div className="about-service-map-grid">
                {capabilityPillars.map((pillar) => (
                  <Link
                    key={pillar.number}
                    href={`/capabilities/${pillar.slug}`}
                    className="about-service-map-item"
                  >
                    <span className="about-service-map-number">{pillar.number}</span>
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
            </motion.div>
          </div>
        </section>

        <section className="about-principles-band">
          <div aria-hidden="true" className="arc-dark-grid" />
          <div className="about-editorial-shell">
            <motion.div className="about-principles-heading" {...reveal}>
              <span>Our Principles</span>
              <h2>The principles behind accountable delivery.</h2>
            </motion.div>
            <div className="about-principles-grid">
              {principles.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <motion.article
                    key={principle.title}
                    className="about-principle-item"
                    {...reveal}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                  >
                    <Icon aria-hidden="true" />
                    <h3>{principle.title}</h3>
                    <p>{principle.description}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="about-team-section">
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

        <BottomCTA
          variant="light"
          headline="Ready to Start Your Transformation?"
          subtext="Tell us where you are and where you need to be. Hive Vault Arc will map the right strategy, engineering, and operations path - and stay involved until the outcome is measurable."
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
