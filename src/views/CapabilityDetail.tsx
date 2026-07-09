'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowLeft,
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
} from 'lucide-react';
import BottomCTA from '../components/BottomCTA';
import SectionBrandMark from '../components/SectionBrandMark';
import { useAnimationQuality } from '../lib/animationQuality';
import type { CapabilityLandingLink, CapabilityProfile, CapabilityProfileSummary } from '../lib/capabilities';

type CapabilityDetailProps = {
  capability: CapabilityProfile;
  relatedCapabilities: CapabilityProfileSummary[];
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

function getCapabilityIcon(slug: string, cls = 'h-5 w-5', strokeWidth = 1.5) {
  switch (slug) {
    case 'strategy-business':
      return <Building2 className={cls} strokeWidth={strokeWidth} />;
    case 'technology-consulting':
      return <Wrench className={cls} strokeWidth={strokeWidth} />;
    case 'ai-data-analytics':
      return <Bot className={cls} strokeWidth={strokeWidth} />;
    case 'software-engineering':
      return <Cpu className={cls} strokeWidth={strokeWidth} />;
    case 'cloud-infrastructure':
      return <Cloud className={cls} strokeWidth={strokeWidth} />;
    case 'operations-managed':
      return <Settings className={cls} strokeWidth={strokeWidth} />;
    default:
      return <Layers3 className={cls} strokeWidth={strokeWidth} />;
  }
}

function LandingLink({ link }: { link: CapabilityLandingLink }) {
  const isExternal = /^https?:\/\//i.test(link.href);

  if (isExternal) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="capability-profile-landing-link"
      >
        {link.label}
        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.7} />
      </a>
    );
  }

  return (
    <Link href={link.href} className="capability-profile-landing-link">
      {link.label}
      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.7} />
    </Link>
  );
}

export default function CapabilityDetail({ capability, relatedCapabilities }: CapabilityDetailProps) {
  const { motionReduced } = useAnimationQuality();
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const primaryOutcome = capability.relatedOutcomes[0] ?? 'Clear operating movement';
  const secondaryOutcome = capability.relatedOutcomes[1] ?? capability.briefBullets[0] ?? 'Focused delivery';

  return (
    <MotionConfig reducedMotion={motionReduced ? 'always' : 'never'}>
      <main className="capability-profile-page">
        <motion.div
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-[#E8A838]"
          style={{ scaleX: progressScale }}
        />

        <section className="capability-profile-hero soft-grid-section">
          <div className="cap-detail-shell capability-profile-hero-grid">
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
              className="capability-profile-hero-copy"
            >
              <motion.nav variants={fadeUp} transition={{ duration: 0.4 }} aria-label="Breadcrumb">
                <Link href="/capabilities" className="capability-profile-back-link">
                  <ArrowLeft className="h-4 w-4" strokeWidth={1.7} />
                  Capabilities
                </Link>
              </motion.nav>

              <motion.div variants={fadeUp} transition={{ duration: 0.45 }} className="cap-detail-mark">
                <SectionBrandMark size="sm" />
                <span>{capability.kicker || 'Capability'}</span>
              </motion.div>

              <motion.h1 variants={fadeUp} transition={{ duration: 0.5 }}>
                {capability.title}
              </motion.h1>

              <motion.p variants={fadeUp} transition={{ duration: 0.5 }} className="capability-profile-lede">
                {capability.briefLine}
              </motion.p>

              <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="capability-profile-actions">
                <Link href="/contact" className="sharp-edge btn-primary">
                  Start a Conversation
                </Link>
                <Link href={`/capabilities/in-detail#pillar-${capability.slug}`} className="sharp-edge btn-outlined">
                  View in Full Map
                </Link>
              </motion.div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="capability-profile-hero-media"
            >
              <Image
                src={capability.heroImage}
                alt={capability.heroImageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              <div className="capability-profile-hero-card">
                <span>{getCapabilityIcon(capability.slug, 'h-5 w-5')}</span>
                <strong>{capability.shortTitle || capability.title}</strong>
                <em>{primaryOutcome}</em>
              </div>
            </motion.aside>
          </div>
        </section>

        <nav className="capability-profile-index" aria-label={`${capability.title} sections`}>
          <div className="cap-detail-shell capability-profile-index-grid">
            {[
              ['01', 'Context', '#context'],
              ['02', 'Coverage', '#coverage'],
              ['03', 'Outcomes', '#outcomes'],
              ['04', 'Related', '#related'],
            ].map(([number, label, href]) => (
              <a key={href} href={href} className="capability-profile-index-item">
                <span>{number}</span>
                <strong>{label}</strong>
              </a>
            ))}
          </div>
        </nav>

        <section id="context" className="capability-profile-context-section">
          <div className="cap-detail-shell capability-profile-context-grid">
            <div className="cap-detail-section-head">
              <div className="cap-detail-mark">
                <SectionBrandMark size="sm" />
                <span>Operating context</span>
              </div>
              <h2>Where this capability fits.</h2>
            </div>

            <motion.article
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.45 }}
              className="capability-profile-context-card"
            >
              <span>Strategic context</span>
              <p>{capability.strategicContext}</p>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.45, delay: 0.06 }}
              className="capability-profile-context-card capability-profile-context-card-dark"
            >
              <span>Execution context</span>
              <p>{capability.executionContext}</p>
            </motion.article>
          </div>
        </section>

        <section id="coverage" className="capability-profile-coverage-section soft-grid-section">
          <div className="cap-detail-shell capability-profile-coverage-grid">
            <div className="capability-profile-coverage-copy">
              <div className="cap-detail-mark">
                <SectionBrandMark size="sm" />
                <span>Capability coverage</span>
              </div>
              <h2>What HVA can own inside this pillar.</h2>
              <ul className="capability-profile-brief-list">
                {capability.briefBullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="capability-profile-coverage-list">
              {capability.subCapabilities.map((item, index) => (
                <motion.article
                  key={item}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.14 }}
                  transition={{ duration: 0.4, delay: (index % 3) * 0.04 }}
                  className="capability-profile-coverage-item"
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{item}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="outcomes" className="capability-profile-outcomes-section">
          <div className="cap-detail-shell capability-profile-outcomes-grid">
            <div className="capability-profile-outcomes-copy">
              <div className="cap-detail-mark cap-detail-mark-dark">
                <SectionBrandMark surface="dark" size="sm" />
                <span>Expected movement</span>
              </div>
              <h2>Useful when the goal is accountable progress.</h2>
              <p>
                This page focuses the pillar. The ARC model turns it into scoped work, production
                systems, and managed improvement.
              </p>
            </div>

            <div className="capability-profile-outcome-list">
              {[primaryOutcome, secondaryOutcome, ...(capability.relatedOutcomes.slice(2, 4))].map((outcome) => (
                <article key={outcome}>
                  <CheckCircle2 className="h-4 w-4" strokeWidth={1.7} />
                  <span>{outcome}</span>
                </article>
              ))}
            </div>

            {capability.landingLinks.length > 0 && (
              <div className="capability-profile-landing-links" aria-label="Related landing pages">
                {capability.landingLinks.map((link) => (
                  <LandingLink key={link._key ?? link.href} link={link} />
                ))}
              </div>
            )}
          </div>
        </section>

        {relatedCapabilities.length > 0 && (
          <section id="related" className="capability-profile-related-section">
            <div className="cap-detail-shell">
              <div className="cap-detail-section-head">
                <div className="cap-detail-mark">
                  <SectionBrandMark size="sm" />
                  <span>Related capabilities</span>
                </div>
                <h2>Adjacent pillars to explore next.</h2>
              </div>

              <div className="capability-profile-related-grid">
                {relatedCapabilities.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/capabilities/${related.slug}`}
                    className="capability-profile-related-card"
                  >
                    <div className="capability-profile-related-media">
                      <Image
                        src={related.heroImage}
                        alt={related.heroImageAlt}
                        fill
                        loading="lazy"
                        sizes="(max-width: 900px) 100vw, 31vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="capability-profile-related-body">
                      <span>{related.kicker || 'Capability'}</span>
                      <strong>{related.shortTitle || related.title}</strong>
                      <em>{related.briefLine}</em>
                    </div>
                    <span className="capability-profile-related-link">
                      Open <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.7} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <BottomCTA
          variant="light"
          headline={`Need ${capability.shortTitle || capability.title} mapped to your operation?`}
          subtext="Hive Vault Arc will scope the right diagnosis, build path, and operating model before execution starts."
          primaryLabel="Book Discovery Call"
          primaryHref="/contact"
          secondaryLabel="Back to Capabilities"
          secondaryHref="/capabilities"
        />
      </main>
    </MotionConfig>
  );
}
