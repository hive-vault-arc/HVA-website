'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion';
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
} from 'lucide-react';
import { useAnimationQuality } from '../lib/animationQuality';
import BottomCTA from '../components/BottomCTA';
import SectionBrandMark from '../components/SectionBrandMark';
import {
  BOT_DELIVERY_MODEL,
  CAPABILITY_DETAIL_SECTIONS,
  CAPABILITY_SOLUTION_PROGRAM_DETAILS,
} from '../lib/capabilities-content';

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

const heroStats = [
  { value: '6', label: 'Service pillars' },
  { value: '3', label: 'ARC phases' },
  { value: '30+', label: 'Sub-capabilities' },
];

const arcSignals = ['Clear diagnosis', 'Production build', 'Ongoing ownership'];
const featuredPrograms = CAPABILITY_SOLUTION_PROGRAM_DETAILS.slice(0, 3);

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const CapabilitiesInDetail: React.FC = () => {
  const { motionReduced } = useAnimationQuality();
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <MotionConfig reducedMotion={motionReduced ? 'always' : 'never'}>
      <main className="cap-detail-page">
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
                <span>Capabilities in detail</span>
              </motion.div>

              <motion.h1 variants={fadeUp} transition={{ duration: 0.5 }}>
                Capability depth, without the consulting maze.
              </motion.h1>

              <motion.p variants={fadeUp} transition={{ duration: 0.5 }} className="cap-detail-hero-copy">
                Six service pillars mapped to the decisions clients actually need: what to scope, what to build, and what HVA keeps accountable after launch.
              </motion.p>

              <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="cap-detail-actions">
                <Link href="#capability-map" className="sharp-edge btn-primary">
                  View the map
                </Link>
                <Link href="/capabilities/solution-programs" className="sharp-edge btn-outlined">
                  Solution programs
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
                <strong>At a glance</strong>
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
                Start with a pillar, then move into ARC delivery when the scope is ready to become production work.
              </p>
            </motion.aside>
          </div>
        </section>

        <nav className="cap-detail-index" aria-label="Capability sections">
          <div className="cap-detail-shell cap-detail-index-grid">
            {CAPABILITY_DETAIL_SECTIONS.map((domain, index) => (
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
                <span>Capability map</span>
              </div>
              <h2>Choose the layer that matches the problem.</h2>
              <p>
                Each card keeps the promise short. Open coverage only when you need the deeper list.
              </p>
            </div>

            <div className="cap-detail-pillar-grid">
              {CAPABILITY_DETAIL_SECTIONS.map((domain, index) => (
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
                      alt={`${domain.title} capability`}
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

                    <ul className="cap-detail-chip-list" aria-label={`${domain.title} core areas`}>
                      {domain.briefBullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>

                    <div className="cap-detail-outcome">
                      <span>Primary outcome</span>
                      <strong>{domain.relatedOutcomes[0]}</strong>
                    </div>

                    <details className="cap-detail-more">
                      <summary>
                        Full coverage
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
                <span>ARC delivery</span>
              </div>
              <h2>Capability only matters when it reaches production</h2>
              <p>
                HVA connects diagnosis, engineering, and managed operations in one accountable loop.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="cap-detail-arc-panel"
            >
              {BOT_DELIVERY_MODEL.phases.map((phase, index) => (
                <article key={phase.id} className="cap-detail-arc-phase">
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
                <span>From capability to program</span>
              </div>
              <h2>When scope is clear, use a ready delivery path.</h2>
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
                    View program <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.7} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <BottomCTA
          variant="light"
          headline="Need this mapped to your business constraints?"
          subtext="We align the right pillar, program, and operating model before execution starts."
          primaryLabel="Book Discovery Call"
          primaryHref="/contact"
          secondaryLabel="Back to Capabilities"
          secondaryHref="/capabilities"
        />
      </main>
    </MotionConfig>
  );
};

export default CapabilitiesInDetail;
