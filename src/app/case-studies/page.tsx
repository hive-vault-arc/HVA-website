import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import JsonLd from '../../components/JsonLd';
import { getAllCaseStudies } from '../../lib/proof';
import { SITE_URL, buildPageMetadata, mergeKeywords, GLOBAL_KEYWORDS, absoluteUrl } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Case Studies | Proven AI Business Operating Systems',
  description:
    'Verified case studies from H.V.A showing AI business operating systems running customer operations, CRM workflows, and executive analytics in production.',
  path: '/case-studies',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'AI case studies Morocco',
    'WhatsApp AI agent case study',
    'CRM operating system case study Morocco',
    'analytics dashboard system case study',
    'IT consulting engineering case studies',
  ]),
});

export default function CaseStudiesPage() {
  const studies = getAllCaseStudies();
  const totalOutcomes = studies.reduce((sum, study) => sum + study.measuredOutcomes.length, 0);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'H.V.A Case Studies',
    itemListElement: studies.map((study, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: study.title,
      url: absoluteUrl(`/case-studies/${study.slug}`),
    })),
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'H.V.A Case Studies',
    description:
      'Production deployments delivered by H.V.A across AI operations, CRM architecture, and executive analytics systems.',
    url: `${SITE_URL}/case-studies`,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
  };

  return (
    <>
      <JsonLd data={[itemListSchema, collectionSchema]} />
      <main className="editorial-page case-studies-page">
        <section className="editorial-hero editorial-hero--case">
          <div className="editorial-shell">
            <p className="editorial-kicker">Proof Library</p>
            <h1 className="editorial-title">Production Systems With Measured Outcomes</h1>
            <p className="editorial-lead">
              Each case documents the system built, integrations, deployment reality, and measurable business outcomes
              in production environments.
            </p>
            <div className="editorial-actions">
              <Link href="/products-systems" className="editorial-cta">
                View Products and Systems
              </Link>
              <Link href="/services" className="editorial-link">
                Implementation Services &rarr;
              </Link>
            </div>
            <aside className="expert-insight-card">
              <p className="expert-insight-card__kicker">Expert Insight</p>
              <p className="expert-insight-card__quote">
                “Mature engineering shows up in operating systems that run daily with measurable outcomes, not just demos.”
              </p>
              <div className="expert-insight-card__meta">
                <span>{studies.length} published case studies</span>
                <span>{totalOutcomes} verified outcome points</span>
              </div>
            </aside>
          </div>
        </section>

        <section className="case-grid-zone">
          <div className="editorial-shell case-grid">
            {studies.map((study, index) => (
              <article key={study.slug} className={`case-card ${index % 2 === 1 ? 'case-card--alt' : ''}`}>
                <div className="case-card__media">
                  <Image
                    src={study.assets.coverImage}
                    alt={study.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="case-card__body">
                  <p className="case-card__industry">{study.industry}</p>
                  <h2 className="case-card__title">{study.title}</h2>
                  <p className="case-card__summary">{study.summary}</p>
                  <p className="case-card__status">{study.deploymentStatus}</p>
                  <ul className="case-card__metrics">
                    {study.measuredOutcomes.slice(0, 2).map((metric) => (
                      <li key={metric.label}>
                        <span>{metric.value}</span>
                        <small>{metric.label}</small>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/case-studies/${study.slug}`} className="editorial-link editorial-link--strong">
                    Read Full Case Study &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
