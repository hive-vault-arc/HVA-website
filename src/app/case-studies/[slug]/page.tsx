import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '../../../components/JsonLd';
import { getAllCaseStudies } from '../../../lib/proof';
import { SITE_URL, absoluteUrl, buildPageMetadata } from '../../../lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCaseStudies().map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getAllCaseStudies().find((item) => item.slug === slug);
  if (!study) {
    return {};
  }

  return buildPageMetadata({
    title: `${study.title} | Case Study`,
    description: study.summary,
    path: `/case-studies/${study.slug}`,
    keywords: [
      study.industry,
      ...study.integrations,
      ...study.operationalModules,
      'case study',
      'digital transformation consulting',
      'technology consulting outcomes',
    ],
  });
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = getAllCaseStudies().find((item) => item.slug === slug);
  if (!study) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.title,
    description: study.summary,
    dateModified: study.lastUpdated,
    datePublished: study.lastUpdated,
    author: {
      '@type': 'Organization',
      name: 'Hive Vault Arc',
      url: SITE_URL,
    },
    image: absoluteUrl(study.assets.coverImage),
    mainEntityOfPage: absoluteUrl(`/case-studies/${study.slug}`),
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@type': 'Thing',
      name: `${study.industry} systems engineering`,
    },
  };

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Service',
      name: study.title,
      provider: {
        '@id': `${SITE_URL}/#organization`,
      },
    },
    reviewBody: study.testimonial.quote,
    author: {
      '@type': 'Person',
      name: study.testimonial.author,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${SITE_URL}/case-studies` },
      { '@type': 'ListItem', position: 3, name: study.title, item: `${SITE_URL}/case-studies/${study.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={[articleSchema, reviewSchema, breadcrumbSchema]} />
      <main className="bg-[#F8FAFC] text-[#0F172A]">
        <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">Case Study</p>
          <h1 className="max-w-4xl font-serif text-4xl leading-tight md:text-6xl">{study.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#475569]">{study.summary}</p>
          <div className="mt-6 grid grid-cols-1 gap-4 text-sm text-[#334155] md:grid-cols-3">
            <p><span className="font-semibold">Client:</span> {study.clientName}</p>
            <p><span className="font-semibold">Industry:</span> {study.industry}</p>
            <p><span className="font-semibold">Status:</span> {study.deploymentStatus}</p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="relative h-[300px] w-full overflow-hidden rounded">
            <Image
              src={study.assets.coverImage}
              alt={study.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 pb-24 md:grid-cols-2">
          <article className="border border-[#e2e8f0] bg-white p-6">
            <h2 className="mb-3 font-serif text-2xl">Business Challenge and Strategy</h2>
            <p className="leading-relaxed text-[#475569]">{study.problem}</p>
            <h3 className="mt-6 mb-2 text-sm font-bold uppercase tracking-[0.15em] text-[#2563EB]">Execution Architecture</h3>
            <p className="leading-relaxed text-[#475569]">{study.systemArchitecture}</p>
            <h3 className="mt-6 mb-2 text-sm font-bold uppercase tracking-[0.15em] text-[#2563EB]">Execution Modules Activated</h3>
            <ul className="list-disc space-y-1 pl-5 text-[#334155]">
              {study.operationalModules.map((moduleName) => (
                <li key={moduleName}>{moduleName}</li>
              ))}
            </ul>
            <h3 className="mt-6 mb-2 text-sm font-bold uppercase tracking-[0.15em] text-[#2563EB]">Stack and Integrations</h3>
            <ul className="list-disc space-y-1 pl-5 text-[#334155]">
              {study.integrations.map((integration) => (
                <li key={integration}>{integration}</li>
              ))}
            </ul>
          </article>

          <article className="border border-[#e2e8f0] bg-white p-6">
            <h2 className="mb-3 font-serif text-2xl">Operating Impact</h2>
            <ul className="space-y-4">
              {study.measuredOutcomes.map((metric) => (
                <li key={metric.label} className="border-l-2 border-[#2563EB] pl-4">
                  <p className="text-2xl font-bold text-[#0F172A]">{metric.value}</p>
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#2563EB]">{metric.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#475569]">{metric.context}</p>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 mb-2 text-sm font-bold uppercase tracking-[0.15em] text-[#2563EB]">Deployment Scale</h3>
            <p className="text-[#334155]">{study.deploymentScale}</p>
            <blockquote className="mt-8 border-l-2 border-[#1e293b] pl-4 text-[#0F172A]">
              "{study.testimonial.quote}"
              <footer className="mt-2 text-sm text-[#475569]">
                {study.testimonial.author}, {study.testimonial.role}
              </footer>
            </blockquote>
          </article>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="border border-[#e2e8f0] bg-white p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB]">Next Step</p>
            <h2 className="mt-2 font-serif text-3xl">Apply This Transformation Pattern to Your Operations</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#475569]">
              Review the relevant system programs, then book a discovery call to scope your transformation roadmap.
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <Link href="/services/solutions" className="text-sm font-bold text-[#2563EB] hover:text-[#1d4ed8]">
                View solution programs &rarr;
              </Link>
              <Link href="/contact" className="text-sm font-bold text-[#2563EB] hover:text-[#1d4ed8]">
                Book discovery call &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
