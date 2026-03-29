'use client';

import Link from 'next/link';
import BottomCTA from '../components/BottomCTA';
import PageAmbientBackground from '../components/PageAmbientBackground';
import { ENGAGEMENT_STEPS, SERVICE_BRIEF_SECTIONS, SOLUTION_PROGRAM_DETAILS } from '../lib/services-content';

const FEATURED_PROGRAMS = SOLUTION_PROGRAM_DETAILS.slice(0, 3);

export default function Services() {
  return (
    <main className="services-brief-page">
      <PageAmbientBackground className="-z-10" />

      <section className="services-brief-hero">
        <div className="services-brief-shell services-brief-hero-grid">
          <div>
            <p className="services-brief-kicker">Services</p>
            <h1 className="services-brief-title">
              Strategy, Consulting, and
              <br />
              <em className="italic">Engineering in One Loop.</em>
            </h1>
            <p className="services-brief-lead">
              H.V.A leads digital transformation programs from advisory to production operations, then stays accountable
              through maintenance and optimization.
            </p>
            <div className="services-brief-actions">
              <Link href="/services/solution-programs" className="editorial-cta sharp-edge">
                View Solution Programs
              </Link>
              <Link href="/services/in-detail" className="editorial-link">
                Explore In Detail →
              </Link>
            </div>
          </div>

          <aside className="services-brief-panel">
            <p className="services-brief-panel-kicker">What This Page Covers</p>
            <ul className="services-brief-panel-list">
              <li>High-level service pillars</li>
              <li>Solution programs preview</li>
              <li>How engagement works in practice</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="services-brief-pillars">
        <div className="services-brief-shell">
          <p className="services-brief-kicker">Service Pillars</p>
          <h2 className="services-brief-section-title">A concise view of how we deliver.</h2>
          <div className="services-brief-pillar-grid">
            {SERVICE_BRIEF_SECTIONS.map((pillar) => (
              <article key={pillar.id} className="services-brief-card">
                <h3>{pillar.title}</h3>
                <p>{pillar.summary}</p>
                <ul>
                  {pillar.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="solution-programs" className="services-brief-programs scroll-mt-36">
        <div className="services-brief-shell">
          <p className="services-brief-kicker">Solution Programs</p>
          <div className="services-brief-programs-head">
            <h2 className="services-brief-section-title">Program snapshots you can deploy and adapt.</h2>
            <Link href="/services/solution-programs" className="editorial-link editorial-link--strong">
              See full program catalog →
            </Link>
          </div>
          <div className="services-brief-program-grid">
            {FEATURED_PROGRAMS.map((program) => (
              <article key={program.slug} className="services-brief-program-card">
                <p className="services-brief-program-category">{program.category}</p>
                <h3>{program.name}</h3>
                <p>{program.summary}</p>
                <p className="services-brief-program-outcome">{program.outcomes[0]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-brief-flow">
        <div className="services-brief-shell">
          <p className="services-brief-kicker">How Engagement Works</p>
          <h2 className="services-brief-section-title">Four steps from diagnosis to operating impact.</h2>
          <div className="services-brief-flow-grid">
            {ENGAGEMENT_STEPS.map((step) => (
              <article key={step.step} className="services-brief-flow-card">
                <p className="services-brief-flow-step">{step.step}</p>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>
          <div className="services-brief-actions services-brief-actions--spaced">
            <Link href="/services/solution-programs" className="editorial-cta sharp-edge">
              View Solution Programs
            </Link>
            <Link href="/services/in-detail" className="editorial-link">
              Explore In Detail →
            </Link>
          </div>
        </div>
      </section>

      <BottomCTA
        variant="dark"
        headline="Need a transformation scope before implementation?"
        subtext="Book a discovery call and we will map services, solution programs, and delivery sequence for your context."
        primaryLabel="Book Discovery Call"
        primaryHref="/contact"
        secondaryLabel="View Case Studies"
        secondaryHref="/case-studies"
      />
    </main>
  );
}

