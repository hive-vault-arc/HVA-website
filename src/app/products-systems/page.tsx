import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '../../components/JsonLd';
import { PRODUCT_SYSTEMS } from '../../lib/proof';
import { SITE_URL, buildPageMetadata, mergeKeywords, GLOBAL_KEYWORDS, absoluteUrl } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Products & Systems | AI Products, CRM Platforms, and Analytics Systems',
  description:
    'Explore H.V.A productized systems: AI reception and lead engines, Zoho-grade CRM platforms, executive analytics control towers, and reliability infrastructure stacks.',
  path: '/products-systems',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'AI product builder Morocco',
    'product systems engineering',
    'custom CRM product development',
    'IT consulting and system architecture',
  ]),
});

export default function ProductsSystemsPage() {
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
      <main className="bg-[#F8FAFC] text-[#0F172A]">
        <section className="mx-auto max-w-7xl px-6 py-28 md:py-36">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">Product and Systems Builder</p>
          <h1 className="max-w-5xl font-serif text-4xl leading-tight md:text-6xl">
            AI Products and Operational Systems You Can Deploy and Scale
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#475569]">
            H.V.A sells and implements mature product systems, not only service hours. Each system includes architecture,
            integrations, rollout model, and measurable outcomes.
          </p>
        </section>

        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 pb-24 md:grid-cols-2">
          {PRODUCT_SYSTEMS.map((system) => (
            <article key={system.name} className="border border-[#e2e8f0] bg-white p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB]">{system.category}</p>
              <h2 className="mt-2 font-serif text-2xl">{system.name}</h2>

              <h3 className="mt-6 mb-2 text-sm font-bold uppercase tracking-[0.14em] text-[#1e293b]">Modules</h3>
              <ul className="list-disc space-y-1 pl-5 text-sm text-[#475569]">
                {system.modules.map((module) => (
                  <li key={module}>{module}</li>
                ))}
              </ul>

              <h3 className="mt-6 mb-2 text-sm font-bold uppercase tracking-[0.14em] text-[#1e293b]">Integrations</h3>
              <p className="text-sm leading-relaxed text-[#475569]">{system.integrations.join(', ')}</p>

              <h3 className="mt-6 mb-2 text-sm font-bold uppercase tracking-[0.14em] text-[#1e293b]">Delivery Model</h3>
              <p className="text-sm leading-relaxed text-[#475569]">{system.deliveryModel}</p>

              <h3 className="mt-6 mb-2 text-sm font-bold uppercase tracking-[0.14em] text-[#1e293b]">Outcomes</h3>
              <ul className="list-disc space-y-1 pl-5 text-sm text-[#475569]">
                {system.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                {system.proofLinks.map((proofLink) => (
                  <Link key={proofLink} href={proofLink} className="text-sm font-semibold text-[#2563EB] hover:text-[#1d4ed8]">
                    View proof &rarr;
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
