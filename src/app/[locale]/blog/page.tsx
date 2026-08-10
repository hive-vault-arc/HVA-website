import type { Metadata } from 'next';
import type {AppLocale} from "@/i18n/config";
import {buildStaticRouteMetadata} from "@/i18n/metadata";
import {
  SITE_URL,
  absoluteUrl,
  buildLocalizedBreadcrumbSchema,
} from '@/lib/seo';
import {getResilientPaginatedInsightCollection} from '@/lib/resilient-insights';
import BlogIndex from '@/views/BlogIndex';
import JsonLd from '@/components/JsonLd';
import {localizedPath} from '@/i18n/route-manifest';
import {getTranslations} from 'next-intl/server';

type PageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  return buildStaticRouteMetadata(locale, "blog");
}

export default async function BlogPage({params}: PageProps) {
  const {locale} = await params;
  const [initialPage, tMeta, tNav] = await Promise.all([
    getResilientPaginatedInsightCollection(locale, 'post', null, null, true),
    getTranslations({locale, namespace: 'Metadata.pages.blog'}),
    getTranslations({locale, namespace: 'Navigation'}),
  ]);
  const pageUrl = absoluteUrl(localizedPath('/blog', locale));

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: tMeta('title'),
    url: pageUrl,
    inLanguage: locale,
    numberOfItems: initialPage.total,
    itemListElement: initialPage.items.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(
        localizedPath('/blog/[slug]', post.sourceLocale, {slug: post.slug}),
      ),
      name: post.title,
      inLanguage: post.sourceLocale,
    })),
  };

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: tMeta('title'),
    url: pageUrl,
    description: tMeta('description'),
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Hive Vault Arc',
    },
    inLanguage: locale,
  };

  const breadcrumbSchema = buildLocalizedBreadcrumbSchema(locale, [
    {name: tNav('home'), pathname: '/'},
    {name: tNav('blog'), pathname: '/blog'},
  ]);

  return (
    <>
      <JsonLd data={[itemListSchema, blogSchema, breadcrumbSchema]} />
      <BlogIndex
        initialPage={initialPage}
        industries={initialPage.industries}
      />
    </>
  );
}
