import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '../../../components/JsonLd';
import { getAllCaseStudies, getCaseStudyBySlug, getRelatedCaseStudies } from '../../../lib/proof';
import { SITE_URL, absoluteUrl, buildBreadcrumbSchema, buildPageMetadata } from '../../../lib/seo';
import CaseStudyDetail from '../../../views/CaseStudyDetail';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const studies = await getAllCaseStudies();
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug).catch(() => null);
  if (!study) return {};

  const metadata = buildPageMetadata({
    title: study.seo?.title ?? `${study.title} | Case Study`,
    description: study.seo?.description ?? study.summary,
    path: `/case-studies/${study.slug}`,
    keywords: study.seo?.keywords?.length
      ? study.seo.keywords
      : [
          study.industry,
          ...study.integrations,
          ...study.operationalModules,
          'case study',
          'digital transformation consulting',
          'technology consulting outcomes',
        ],
  });

  return {
    ...metadata,
    robots: {
      index: !study.seo?.noIndex,
      follow: !study.seo?.noIndex,
    },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug).catch(() => null);
  if (!study) notFound();
  const relatedStudies = await getRelatedCaseStudies(study.slug);

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

  const reviewSchema = study.testimonial
    ? {
        '@context': 'https://schema.org',
        '@type': 'Review',
        itemReviewed: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'Hive Vault Arc',
          url: SITE_URL,
        },
        reviewBody: study.testimonial.quote,
        author: {
          '@type': 'Person',
          name: study.testimonial.author,
        },
      }
    : null;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: study.title, path: `/case-studies/${study.slug}` },
  ]);

  return (
    <>
      <JsonLd data={[articleSchema, ...(reviewSchema ? [reviewSchema] : []), breadcrumbSchema]} />
      <CaseStudyDetail study={study} relatedStudies={relatedStudies} />
    </>
  );
}
