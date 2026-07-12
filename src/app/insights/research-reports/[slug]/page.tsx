import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '../../../../components/JsonLd';
import ResearchReportView from '../../../../views/ResearchReport';
import {
  getAllResearchReports,
  getRelatedResearchReports,
  getResearchReportBySlug,
} from '../../../../lib/insights';
import {
  SITE_LOGO_HEIGHT,
  SITE_LOGO_PATH,
  SITE_LOGO_WIDTH,
  SITE_URL,
  absoluteUrl,
  buildBreadcrumbSchema,
  buildPageMetadata,
} from '../../../../lib/seo';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const reports = await getAllResearchReports();
  return reports.map((report) => ({ slug: report.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const report = await getResearchReportBySlug(slug).catch(() => null);
  if (!report) return {};

  const base = buildPageMetadata({
    title: report.seo?.title ?? report.title,
    description: report.seo?.description ?? report.summary,
    path: `/insights/research-reports/${report.slug}`,
    keywords: report.seo?.keywords?.length ? report.seo.keywords : report.keywords,
  });
  const coverUrl = absoluteUrl(report.coverImage ?? '/Images/media/og-default.png');
  const isoDate = report.publishedAt.includes('T') ? report.publishedAt : `${report.publishedAt}T00:00:00Z`;

  return {
    ...base,
    robots: {
      index: !report.seo?.noIndex,
      follow: !report.seo?.noIndex,
    },
    authors:
      report.authors.length > 0
        ? report.authors.map((author) => ({ name: author.name, url: absoluteUrl('/aboutus') }))
        : [{ name: 'Hive Vault Arc Research Team', url: absoluteUrl('/aboutus') }],
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime: isoDate,
      modifiedTime: isoDate,
      authors: [absoluteUrl('/aboutus')],
      section: report.tag,
      images: [{ url: coverUrl, width: 1200, height: 630, alt: report.coverAlt ?? report.title }],
    },
    twitter: {
      ...base.twitter,
      images: [coverUrl],
    },
  };
}

export default async function ResearchReportPage({ params }: Props) {
  const { slug } = await params;
  const report = await getResearchReportBySlug(slug).catch(() => null);
  if (!report) notFound();

  const relatedReports = await getRelatedResearchReports(report.slug);
  const isoDate = report.publishedAt.includes('T') ? report.publishedAt : `${report.publishedAt}T00:00:00Z`;

  const reportSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: report.title,
    description: report.summary,
    datePublished: isoDate,
    dateModified: isoDate,
    image: absoluteUrl(report.coverImage ?? '/Images/media/og-default.png'),
    inLanguage: 'en',
    articleSection: report.tag,
    keywords: report.keywords.join(', '),
    author:
      report.authors.length > 0
        ? report.authors.map((author) => ({
            '@type': 'Organization',
            name: author.name,
            url: SITE_URL,
          }))
        : {
            '@type': 'Organization',
            name: 'Hive Vault Arc',
            url: SITE_URL,
          },
    publisher: {
      '@type': 'Organization',
      name: 'Hive Vault Arc',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl(SITE_LOGO_PATH),
        contentUrl: absoluteUrl(SITE_LOGO_PATH),
        width: SITE_LOGO_WIDTH,
        height: SITE_LOGO_HEIGHT,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(`/insights/research-reports/${report.slug}`),
    },
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
    { name: 'Research Reports', path: '/insights/research-reports' },
    { name: report.title, path: `/insights/research-reports/${report.slug}` },
  ]);

  return (
    <>
      <JsonLd data={[reportSchema, breadcrumbSchema]} />
      <ResearchReportView report={report} relatedReports={relatedReports} />
    </>
  );
}
