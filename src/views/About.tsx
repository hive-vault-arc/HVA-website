'use client';

import type { CSSProperties, ElementType } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  Cloud,
  Code2,
  Cpu,
  Gauge,
  Network,
  Settings2,
  ShieldCheck,
  Target,
  UserRoundCheck,
} from 'lucide-react';
import SectionBrandMark from '../components/SectionBrandMark';
import BottomCTA from '../components/BottomCTA';
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
};

type CapabilityPillar = {
  slug: string;
  title: string;
  description: string;
  icon: ElementType;
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
    description: 'We diagnose the current state, define outcomes, and build the case for change with clarity.',
  },
  {
    number: '02',
    title: 'Re-engineer',
    description: 'We redesign systems, data, and processes into scalable, production-ready solutions.',
  },
  {
    number: '03',
    title: 'Command',
    description: 'We operate, automate, and continuously improve the systems that carry the business forward.',
  },
];

const capabilityPillars: CapabilityPillar[] = [
  {
    slug: 'strategy-business',
    title: 'Strategy',
    description: 'Enterprise strategy, operating models, and transformation roadmaps.',
    icon: BriefcaseBusiness,
  },
  {
    slug: 'technology-consulting',
    title: 'Technology',
    description: 'Architecture, platforms, integration, and emerging technology decisions.',
    icon: Cpu,
  },
  {
    slug: 'ai-data-analytics',
    title: 'AI & Data',
    description: 'AI engineering, data strategy, analytics, and intelligent automation.',
    icon: BrainCircuit,
  },
  {
    slug: 'software-engineering',
    title: 'Software',
    description: 'Custom software, product engineering, and digital experiences.',
    icon: Code2,
  },
  {
    slug: 'cloud-infrastructure',
    title: 'Cloud',
    description: 'Cloud platforms, DevOps, security, and infrastructure modernization.',
    icon: Cloud,
  },
  {
    slug: 'operations-managed',
    title: 'Operations',
    description: 'Managed services, automation, support, and continuous performance improvement.',
    icon: Settings2,
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

  return (
    <MotionConfig reducedMotion={motionReduced ? 'always' : 'never'}>
      <div className="about-hva-page about-redesign">
        <motion.div
          aria-hidden="true"
          className="about-scroll-progress"
          style={{ scaleX: progressScale }}
        />

        <section className="about-editorial-hero">
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
              <Image
                src="/Images/about/hva-team-strategy-room.webp"
                alt="Technology leadership team reviewing global operations in a strategy room at night"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover"
              />
              <div className="about-hero-media-caption">
                <SectionBrandMark size="sm" />
                <span>Strategy to production</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="about-delivery-section">
          <div className="about-editorial-shell">
            <motion.div className="about-section-heading" {...reveal}>
              <span>Our Operating Model</span>
              <h2>How We Deliver</h2>
            </motion.div>
            <div className="about-delivery-grid">
              {deliverySteps.map((step, index) => (
                <motion.article
                  key={step.number}
                  className={`about-delivery-step ${index === 1 ? 'about-delivery-step-featured' : ''}`}
                  {...reveal}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <span className="about-delivery-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-capability-section">
          <div className="about-editorial-shell about-capability-layout">
            <motion.div className="about-capability-intro" {...reveal}>
              <span>Our Capabilities</span>
              <h2>Six pillars.<br />One loop.</h2>
              <p>
                Our capabilities are integrated across the full transformation lifecycle, designed
                to move together from strategy to scale.
              </p>
              <Link href="/capabilities" className="about-text-link">
                Explore Capabilities <ArrowUpRight aria-hidden="true" />
              </Link>
            </motion.div>

            <div className="about-capability-grid">
              {capabilityPillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.slug}
                    {...reveal}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                  >
                    <Link href={`/capabilities/${pillar.slug}`} className="about-capability-item">
                      <Icon aria-hidden="true" />
                      <h3>{pillar.title}</h3>
                      <p>{pillar.description}</p>
                      <ArrowUpRight className="about-capability-arrow" aria-hidden="true" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="about-principles-band">
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
                    <a href={`/abouthva/people/${member.slug}`} className="about-team-card-link">
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
                        <h3>{member.name}</h3>
                        <span>{member.position}</span>
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
