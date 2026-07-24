import type { Metadata } from 'next';
import type {AppLocale} from '@/i18n/config';
import {localizedPath} from '@/i18n/route-manifest';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import ResearchReportView from '@/views/ResearchReport';
import {
  getRelatedResearchReports,
  getResearchReportBySlug,
} from '@/lib/insights';
import {
  SITE_LOGO_HEIGHT,
  SITE_LOGO_PATH,
  SITE_LOGO_WIDTH,
  SITE_URL,
  absoluteUrl,
  buildLocalizedBreadcrumbSchema,
  buildLocalizedPageMetadata,
} from '@/lib/seo';
import {translationParams, translationRoutes} from '@/lib/localized-content';
import {TranslationTargets} from '@/components/localization/TranslationAvailability';
import {getTranslations} from 'next-intl/server';

type Props = {params: Promise<{locale: AppLocale; slug: string}>};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {locale, slug} = await params;
  const report = await getResearchReportBySlug(slug, locale).catch(() => null);
  if (!report) return {};

  const base = buildLocalizedPageMetadata({
    title: report.seo?.title ?? report.title,
    description: report.seo?.description ?? report.summary,
    pathname: '/insights/research-reports/[slug]',
    locale,
    params: {slug: report.slug},
    translationParams: translationParams(report, locale, report.slug),
    keywords: report.seo?.keywords?.length ? report.seo.keywords : report.keywords,
  });
  const coverUrl = absoluteUrl(report.coverImage ?? '/Images/media/og-default.png');
  const isoDate = report.publishedAt.includes('T') ? report.publishedAt : `${report.publishedAt}T00:00:00Z`;
  const authorUrl = absoluteUrl(localizedPath('/aboutus', locale));

  return {
    ...base,
    robots: {
      index: !report.seo?.noIndex,
      follow: !report.seo?.noIndex,
    },
    authors:
      report.authors.length > 0
        ? report.authors.map((author) => ({name: author.name, url: authorUrl}))
        : [{name: 'Hive Vault Arc Research Team', url: authorUrl}],
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime: isoDate,
      modifiedTime: isoDate,
      authors: [authorUrl],
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
  const {locale, slug} = await params;
  const report = await getResearchReportBySlug(slug, locale).catch(() => null);
  if (!report) notFound();

  const [relatedReports, tContent] = await Promise.all([
    getRelatedResearchReports(report.slug, 3, locale),
    getTranslations({locale, namespace: 'DynamicContent'}),
  ]);
  const isoDate = report.publishedAt.includes('T') ? report.publishedAt : `${report.publishedAt}T00:00:00Z`;

  const reportSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: report.title,
    description: report.summary,
    datePublished: isoDate,
    dateModified: isoDate,
    image: absoluteUrl(report.coverImage ?? '/Images/media/og-default.png'),
    inLanguage: locale,
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
      '@id': absoluteUrl(
        localizedPath('/insights/research-reports/[slug]', locale, {slug: report.slug}),
      ),
    },
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };

  const breadcrumbSchema = buildLocalizedBreadcrumbSchema(locale, [
    {name: tContent('home'), pathname: '/'},
    {name: tContent('insights'), pathname: '/insights'},
    {name: tContent('researchReports'), pathname: '/insights/research-reports'},
    {
      name: report.title,
      pathname: '/insights/research-reports/[slug]',
      params: {slug: report.slug},
    },
  ]);

  return (
    <>
      <TranslationTargets
        routes={translationRoutes(
          report,
          locale,
          report.slug,
          '/insights/research-reports/[slug]',
        )}
      />
      <JsonLd data={[reportSchema, breadcrumbSchema]} />
      <ResearchReportView report={report} relatedReports={relatedReports} />
    </>
  );
}
