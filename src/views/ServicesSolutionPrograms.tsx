'use client';

import Link from 'next/link';
import BottomCTA from '../components/BottomCTA';
import PageAmbientBackground from '../components/PageAmbientBackground';
import { SOLUTION_PROGRAM_DETAILS } from '../lib/services-content';

export default function ServicesSolutionPrograms() {
  return (
    <main className="editorial-page">
      <PageAmbientBackground className="-z-10" />

      <section className="editorial-hero">
        <div className="editorial-shell">
          <p className="editorial-kicker">Services / Solution Programs</p>
          <h1 className="editorial-title">
            Solution Programs:
            <br />
            <em className="italic">Consulting-Led Systems at Full Depth.</em>
          </h1>
          <p className="editorial-lead">
            Full program view including modules, integrations, delivery model, outcomes, and proof links. This page
            is intentionally operational and implementation-ready.
          </p>
          <div className="editorial-actions">
            <Link href="/services/in-detail" className="editorial-link editorial-link--strong">
              Explore In Detail →
            </Link>
          </div>
        </div>
      </section>

      <section className="systems-grid-zone">
        <div className="editorial-shell systems-grid">
          {SOLUTION_PROGRAM_DETAILS.map((program, index) => (
            <article key={program.slug} className={`system-card ${index % 2 === 0 ? 'system-card--tinted' : ''}`}>
              <p className="system-card__category">{program.category}</p>
              <h2 className="system-card__title">{program.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#334155]">{program.summary}</p>

              <div className="system-card__blocks">
                <section className="system-block">
                  <h3>Modules</h3>
                  <ul>
                    {program.modules.map((moduleName) => (
                      <li key={moduleName}>{moduleName}</li>
                    ))}
                  </ul>
                </section>
                <section className="system-block">
                  <h3>Integrations</h3>
                  <p>{program.integrations.join(', ')}</p>
                </section>
                <section className="system-block">
                  <h3>Delivery Model</h3>
                  <p>{program.deliveryModel}</p>
                </section>
                <section className="system-block">
                  <h3>Outcomes</h3>
                  <ul>
                    {program.outcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className="system-card__proof-links">
                {program.proofLinks.map((link) => (
                  <Link key={link} href={link} className="editorial-link editorial-link--strong">
                    View Proof →
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <BottomCTA
        variant="light"
        headline="Want the right program scoped for your operations?"
        subtext="We align solution program selection with your constraints, integrations, and timeline before execution starts."
        primaryLabel="Book Discovery Call"
        primaryHref="/contact"
        secondaryLabel="View Services"
        secondaryHref="/services"
      />
    </main>
  );
}

