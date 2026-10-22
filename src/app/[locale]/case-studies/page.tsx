import type { Metadata } from 'next';
import type {AppLocale} from "@/i18n/config";
import {buildStaticRouteMetadata} from "@/i18n/metadata";
import JsonLd from '@/components/JsonLd';
import {getPublishedHomeCaseStudyProof, isSelectedClientCaseStudy} from '@/lib/proof';
import {
  SITE_URL,
  absoluteUrl,
  buildLocalizedBreadcrumbSchema,
} from '@/lib/seo';
import SimpleCaseStudies from '@/views/SimpleCaseStudies';
import {localizedPath} from '@/i18n/route-manifest';
import {getTranslations} from 'next-intl/server';

type PageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  return buildStaticRouteMetadata(locale, "caseStudies");
}

export default async function CaseStudiesPage({params}: PageProps) {
  const {locale} = await params;
  const [homeProof, tMeta, tNav] = await Promise.all([
    getPublishedHomeCaseStudyProof(locale),
    getTranslations({locale, namespace: 'Metadata.pages.caseStudies'}),
    getTranslations({locale, namespace: 'Navigation'}),
  ]);
  const pageUrl = absoluteUrl(localizedPath('/case-studies', locale));
  const studies = homeProof.caseStudies.items.filter(isSelectedClientCaseStudy).slice(0, 3);
  const sourceLocale = homeProof.caseStudies.sourceLocale;

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${pageUrl}#projects`,
    name: tMeta('title'),
    description: tMeta('description'),
    url: pageUrl,
    inLanguage: locale,
    numberOfItems: studies.length,
    itemListElement: studies.map((study, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'WebPage',
        '@id': `${absoluteUrl(localizedPath('/case-studies/[slug]', study.language ?? sourceLocale, {slug: study.slug}))}#webpage`,
        name: study.title,
        url: absoluteUrl(localizedPath('/case-studies/[slug]', study.language ?? sourceLocale, {
          slug: study.slug,
        })),
        inLanguage: study.language ?? sourceLocale,
        ...(study.assets.coverImage ? {image: absoluteUrl(study.assets.coverImage)} : {}),
      },
    })),
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#webpage`,
    name: tMeta('title'),
    description: tMeta('description'),
    url: pageUrl,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    inLanguage: locale,
    mainEntity: {'@id': `${pageUrl}#projects`},
  };
  const breadcrumbSchema = buildLocalizedBreadcrumbSchema(locale, [
    {name: tNav('home'), pathname: '/'},
    {name: tNav('caseStudies'), pathname: '/case-studies'},
  ]);

  return (
    <>
      <JsonLd data={[itemListSchema, collectionSchema, breadcrumbSchema]} />
      <SimpleCaseStudies locale={locale} sourceLocale={sourceLocale} studies={studies} />
    </>
  );
}
