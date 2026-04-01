import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '../../../components/JsonLd';
import { getAllCaseStudies } from '../../../lib/proof';
import { SITE_URL, absoluteUrl, buildPageMetadata } from '../../../lib/seo';
import CaseStudyDetail from '../../../views/CaseStudyDetail';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCaseStudies().map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getAllCaseStudies().find((item) => item.slug === slug);
  if (!study) return {};

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
  if (!study) notFound();

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
    isPartOf: { '@id': `${SITE_URL}/#website` },
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
      provider: { '@id': `${SITE_URL}/#organization` },
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
      <CaseStudyDetail study={study} />
    </>
  );
}
