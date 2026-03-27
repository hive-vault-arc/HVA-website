import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import JsonLd from '../../components/JsonLd';
import { getAllCaseStudies } from '../../lib/proof';
import { SITE_URL, buildPageMetadata, mergeKeywords, GLOBAL_KEYWORDS, absoluteUrl } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Case Studies | Proven AI Systems and Software Delivery',
  description:
    'Verified case studies from H.V.A: production AI WhatsApp agent operations, Zoho-grade CRM engineering, and executive analytics systems with measured outcomes.',
  path: '/case-studies',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'AI case studies Morocco',
    'WhatsApp AI agent case study',
    'CRM platform case study Morocco',
    'analytics dashboard system case study',
    'IT consulting engineering case studies',
  ]),
});

export default function CaseStudiesPage() {
  const studies = getAllCaseStudies();

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
      <main className="bg-[#F8FAFC] text-[#0F172A]">
        <section className="mx-auto max-w-7xl px-6 py-28 md:py-36">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">Proof Library</p>
          <h1 className="max-w-4xl font-serif text-4xl leading-tight md:text-6xl">
            Production Systems With Measured Outcomes
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#475569]">
            These deployments show how H.V.A operates as an IT consulting and engineering company that also builds sellable AI product systems.
            Each case includes architecture, integrations, deployment status, and verified metrics.
          </p>
        </section>

        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 pb-28 md:grid-cols-2 lg:grid-cols-3">
          {studies.map((study) => (
            <article key={study.slug} className="overflow-hidden border border-[#e2e8f0] bg-white shadow-sm transition hover:shadow-lg">
              <div className="relative h-56 w-full">
                <Image
                  src={study.assets.coverImage}
                  alt={study.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <div className="space-y-4 p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB]">{study.industry}</p>
                <h2 className="font-serif text-2xl leading-tight">{study.title}</h2>
                <p className="text-sm leading-relaxed text-[#475569]">{study.summary}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#1e293b]">
                  {study.deploymentStatus}
                </p>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="inline-flex items-center text-sm font-bold text-[#2563EB] hover:text-[#1d4ed8]"
                >
                  Read full case study &rarr;
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
