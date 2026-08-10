import type { Metadata } from 'next';
import type {AppLocale} from "@/i18n/config";
import {buildStaticRouteMetadata} from "@/i18n/metadata";
import JsonLd from '@/components/JsonLd';
import {getResilientPaginatedInsightCollection} from '@/lib/resilient-insights';
import {
  SITE_URL,
  absoluteUrl,
  buildLocalizedBreadcrumbSchema,
} from '@/lib/seo';
import CaseStudies from '@/views/CaseStudies';
import {localizedPath} from '@/i18n/route-manifest';
import {getTranslations} from 'next-intl/server';

type PageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  return buildStaticRouteMetadata(locale, "caseStudies");
}

export default async function CaseStudiesPage({params}: PageProps) {
  const {locale} = await params;
  const [initialPage, tMeta, tNav] = await Promise.all([
    getResilientPaginatedInsightCollection(
      locale,
      'caseStudy',
      null,
      null,
      true,
    ),
    getTranslations({locale, namespace: 'Metadata.pages.caseStudies'}),
    getTranslations({locale, namespace: 'Navigation'}),
  ]);
  const pageUrl = absoluteUrl(localizedPath('/case-studies', locale));

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: tMeta('title'),
    description: tMeta('description'),
    url: pageUrl,
    inLanguage: locale,
    numberOfItems: initialPage.total,
    itemListElement: initialPage.items.map((study, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: study.title,
      url: absoluteUrl(
        localizedPath('/case-studies/[slug]', study.sourceLocale, {
          slug: study.slug,
        }),
      ),
      inLanguage: study.sourceLocale,
    })),
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: tMeta('title'),
    description: tMeta('description'),
    url: pageUrl,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    inLanguage: locale,
  };
  const breadcrumbSchema = buildLocalizedBreadcrumbSchema(locale, [
    {name: tNav('home'), pathname: '/'},
    {name: tNav('caseStudies'), pathname: '/case-studies'},
  ]);

  return (
    <>
      <JsonLd data={[itemListSchema, collectionSchema, breadcrumbSchema]} />
      <CaseStudies
        initialPage={initialPage}
        industries={initialPage.industries}
      />
    </>
  );
}
