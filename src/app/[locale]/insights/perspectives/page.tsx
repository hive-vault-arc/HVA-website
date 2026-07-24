import type { Metadata } from 'next';
import type {AppLocale} from "@/i18n/config";
import {buildStaticRouteMetadata} from "@/i18n/metadata";
import InsightsCollection from '@/views/InsightsCollection';
import { getAllPerspectives } from '@/lib/perspectives';
import {getTranslations} from 'next-intl/server';
import JsonLd from '@/components/JsonLd';
import {localizedPath} from '@/i18n/route-manifest';
import {absoluteUrl, buildLocalizedBreadcrumbSchema} from '@/lib/seo';
import {getPublishedCollection} from '@/lib/localized-content';

type PageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  return buildStaticRouteMetadata(locale, "perspectives");
}

export default async function InsightsPerspectivesPage({params}: PageProps) {
  const {locale} = await params;
  const [allPerspectives, t, tNav] = await Promise.all([
    getPublishedCollection(locale, getAllPerspectives),
    getTranslations({locale, namespace: 'Collections.perspectives'}),
    getTranslations({locale, namespace: 'Navigation'}),
  ]);
  const perspectives = allPerspectives.items.map((perspective) => ({
    title: perspective.title,
    slug: perspective.slug,
    summary: perspective.summary,
    publishedAt: perspective.publishedAt,
    tag: perspective.tag,
    readTime: perspective.readTime,
    coverImage: perspective.coverImage,
    coverAlt: perspective.coverAlt,
  }));
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('title'),
    description: t('description'),
    url: absoluteUrl(localizedPath('/insights/perspectives', locale)),
    inLanguage: locale,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: perspectives.length,
      itemListElement: perspectives.map((perspective, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: perspective.title,
        url: absoluteUrl(
          localizedPath('/insights/perspectives/[slug]', allPerspectives.sourceLocale, {
            slug: perspective.slug,
          }),
        ),
        inLanguage: allPerspectives.sourceLocale,
      })),
    },
  };
  const breadcrumbSchema = buildLocalizedBreadcrumbSchema(locale, [
    {name: tNav('home'), pathname: '/'},
    {name: tNav('insights'), pathname: '/insights'},
    {name: tNav('perspectives'), pathname: '/insights/perspectives'},
  ]);

  return (
    <>
      <JsonLd data={[collectionSchema, breadcrumbSchema]} />
      <InsightsCollection
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
        cards={perspectives}
        basePath="/insights/perspectives"
        contentLocale={allPerspectives.sourceLocale}
      />
    </>
  );
}
