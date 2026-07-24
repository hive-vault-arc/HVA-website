import type { Metadata } from 'next';
import type {AppLocale} from "@/i18n/config";
import {buildStaticRouteMetadata} from "@/i18n/metadata";
import JsonLd from '@/components/JsonLd';
import { getAllCaseStudies } from '@/lib/proof';
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
  const [studies, tMeta, tNav] = await Promise.all([
    getAllCaseStudies(locale),
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
    itemListElement: studies.map((study, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: study.title,
      url: absoluteUrl(
        localizedPath('/case-studies/[slug]', locale, {slug: study.slug}),
      ),
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
      <CaseStudies studies={studies} />
    </>
  );
}
