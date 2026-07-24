import type { Metadata } from 'next';
import type {AppLocale} from "@/i18n/config";
import {buildStaticRouteMetadata} from "@/i18n/metadata";
import InsightsCollection from '@/views/InsightsCollection';
import { getAllNewsArticles } from '@/lib/insights';
import {getTranslations} from 'next-intl/server';
import JsonLd from '@/components/JsonLd';
import {localizedPath} from '@/i18n/route-manifest';
import {absoluteUrl, buildLocalizedBreadcrumbSchema} from '@/lib/seo';

type PageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  return buildStaticRouteMetadata(locale, "news");
}

export default async function InsightsNewsArticlesPage({params}: PageProps) {
  const {locale} = await params;
  const [newsArticles, t, tNav] = await Promise.all([
    getAllNewsArticles(locale),
    getTranslations({locale, namespace: 'Collections.news'}),
    getTranslations({locale, namespace: 'Navigation'}),
  ]);
  const pageUrl = absoluteUrl(localizedPath('/insights/news-articles', locale));
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('title'),
    description: t('description'),
    url: pageUrl,
    inLanguage: locale,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: newsArticles.length,
      itemListElement: newsArticles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: article.title,
        url: absoluteUrl(
          localizedPath('/insights/news-articles/[slug]', locale, {
            slug: article.slug,
          }),
        ),
      })),
    },
  };
  const breadcrumbSchema = buildLocalizedBreadcrumbSchema(locale, [
    {name: tNav('home'), pathname: '/'},
    {name: tNav('insights'), pathname: '/insights'},
    {name: tNav('newsArticles'), pathname: '/insights/news-articles'},
  ]);

  return (
    <>
      <JsonLd data={[collectionSchema, breadcrumbSchema]} />
      <InsightsCollection
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
        cards={newsArticles}
        basePath="/insights/news-articles"
      />
    </>
  );
}
