import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '../../components/JsonLd';
import { PRODUCT_SYSTEMS } from '../../lib/proof';
import { SITE_URL, buildPageMetadata, mergeKeywords, GLOBAL_KEYWORDS, absoluteUrl } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Products and Systems | AI Business Operating Systems by H.V.A',
  description:
    'Explore AI business operating systems designed and delivered by H.V.A: customer operations, CRM control, executive analytics, automation, and cloud reliability modules.',
  path: '/products-systems',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'AI business operating systems',
    'AI product builder Morocco',
    'product systems engineering',
    'custom CRM product development',
    'IT consulting and system architecture',
  ]),
});

export default function ProductsSystemsPage() {
  const moduleCount = PRODUCT_SYSTEMS.reduce((sum, system) => sum + system.modules.length, 0);
  const integrationCount = PRODUCT_SYSTEMS.reduce((sum, system) => sum + system.integrations.length, 0);

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'H.V.A Product and System Portfolio',
    itemListElement: PRODUCT_SYSTEMS.map((system, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: system.name,
        applicationCategory: system.category,
        operatingSystem: 'Web / Cloud',
        creator: {
          '@id': `${SITE_URL}/#organization`,
        },
      },
    })),
  };

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'H.V.A Products and Systems',
    description:
      'Productized AI and software systems designed, built, and deployed by H.V.A for production operations.',
    url: absoluteUrl('/products-systems'),
  };

  return (
    <>
      <JsonLd data={[softwareSchema, pageSchema]} />
      <main className="editorial-page products-systems-page">
        <section className="editorial-hero editorial-hero--systems">
          <div className="editorial-shell">
            <p className="editorial-kicker">Products and Systems Builder</p>
            <h1 className="editorial-title">AI Business Operating Systems for Core Operations</h1>
            <p className="editorial-lead">
              Modular systems designed for real operations, then implemented with consulting, engineering, and
              automation support so teams execute with more control.
            </p>
            <div className="editorial-actions">
              <Link href="/case-studies" className="editorial-cta">
                View Case Studies
              </Link>
              <Link href="/contact" className="editorial-link">
                Start Discovery &rarr;
              </Link>
            </div>
            <div className="systems-hero-stats">
              <article>
                <p>{PRODUCT_SYSTEMS.length}</p>
                <span>System families</span>
              </article>
              <article>
                <p>{moduleCount}</p>
                <span>Operational modules</span>
              </article>
              <article>
                <p>{integrationCount}</p>
                <span>Integration pathways</span>
              </article>
            </div>
          </div>
        </section>

        <section className="systems-grid-zone">
          <div className="editorial-shell systems-grid">
            {PRODUCT_SYSTEMS.map((system, index) => (
              <article key={system.name} className={`system-card ${index % 2 === 0 ? 'system-card--tinted' : ''}`}>
                <div className="system-card__header">
                  <p className="system-card__category">{system.category}</p>
                  <h2 className="system-card__title">{system.name}</h2>
                </div>

                <div className="system-card__blocks">
                  <section className="system-block">
                    <h3>Modules</h3>
                    <ul>
                      {system.modules.map((module) => (
                        <li key={module}>{module}</li>
                      ))}
                    </ul>
                  </section>

                  <section className="system-block">
                    <h3>Integrations</h3>
                    <p>{system.integrations.join(', ')}</p>
                  </section>

                  <section className="system-block">
                    <h3>Delivery Model</h3>
                    <p>{system.deliveryModel}</p>
                  </section>

                  <section className="system-block">
                    <h3>Outcomes</h3>
                    <ul>
                      {system.outcomes.map((outcome) => (
                        <li key={outcome}>{outcome}</li>
                      ))}
                    </ul>
                  </section>
                </div>

                <div className="system-card__proof-links">
                  {system.proofLinks.map((proofLink) => (
                    <Link key={proofLink} href={proofLink} className="editorial-link editorial-link--strong">
                      View Proof &rarr;
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
