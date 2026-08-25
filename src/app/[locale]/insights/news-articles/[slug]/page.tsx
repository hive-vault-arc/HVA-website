import type { Metadata } from 'next';
import type {AppLocale} from '@/i18n/config';
import {decodeRouteParam, localizedPath} from '@/i18n/route-manifest';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import NewsArticleView from '@/views/NewsArticle';
import {getNewsArticleBySlug, getRelatedNewsArticles} from '@/lib/insights';
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
  const {locale, slug: routeSlug} = await params;
  const slug = decodeRouteParam(routeSlug);
  const article = await getNewsArticleBySlug(slug, locale);
  if (!article) return {};

  const base = buildLocalizedPageMetadata({
    title: article.seo?.title ?? article.title,
    description: article.seo?.description ?? article.summary,
    pathname: '/insights/news-articles/[slug]',
    locale,
    params: {slug: article.slug},
    translationParams: translationParams(article, locale, article.slug),
    keywords: article.seo?.keywords?.length ? article.seo.keywords : article.tags,
  });
  const coverUrl = absoluteUrl(article.coverImage ?? '/Images/media/og-default.webp');
  const isoDate = article.publishedAt.includes('T') ? article.publishedAt : `${article.publishedAt}T00:00:00Z`;
  const authorUrl = absoluteUrl(localizedPath('/aboutus', locale));

  return {
    ...base,
    robots: {
      index: !article.seo?.noIndex,
      follow: !article.seo?.noIndex,
    },
    authors: [{ name: 'Hive Vault Arc Research Team', url: authorUrl }],
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime: isoDate,
      modifiedTime: isoDate,
      authors: [authorUrl],
      section: article.category,
      images: [{ url: coverUrl, width: 1200, height: 630, alt: article.coverAlt ?? article.title }],
    },
    twitter: {
      ...base.twitter,
      images: [coverUrl],
    },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const {locale, slug: routeSlug} = await params;
  const slug = decodeRouteParam(routeSlug);
  const article = await getNewsArticleBySlug(slug, locale);
  if (!article) notFound();
  const [relatedArticles, tContent] = await Promise.all([
    getRelatedNewsArticles(article.slug, 3, locale),
    getTranslations({locale, namespace: 'DynamicContent'}),
  ]);

  const isoDate = article.publishedAt.includes('T') ? article.publishedAt : `${article.publishedAt}T00:00:00Z`;

  const newsArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.summary,
    datePublished: isoDate,
    dateModified: isoDate,
    image: absoluteUrl(article.coverImage ?? '/Images/media/og-default.webp'),
    inLanguage: locale,
    articleSection: article.category,
    keywords: article.tags.join(', '),
    author: {
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
        localizedPath('/insights/news-articles/[slug]', locale, {slug: article.slug}),
      ),
    },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: [
      { '@type': 'Thing', name: 'NVIDIA RTX Spark' },
      { '@type': 'Thing', name: 'local AI agents' },
      { '@type': 'Thing', name: 'private local LLMs' },
    ],
  };

  const breadcrumbSchema = buildLocalizedBreadcrumbSchema(locale, [
    {name: tContent('home'), pathname: '/'},
    {name: tContent('insights'), pathname: '/insights'},
    {name: tContent('newsArticles'), pathname: '/insights/news-articles'},
    {
      name: article.title,
      pathname: '/insights/news-articles/[slug]',
      params: {slug: article.slug},
    },
  ]);

  return (
    <>
      <TranslationTargets
        routes={translationRoutes(
          article,
          locale,
          article.slug,
          '/insights/news-articles/[slug]',
        )}
      />
      <JsonLd data={[newsArticleSchema, breadcrumbSchema]} />
      <NewsArticleView article={article} relatedArticles={relatedArticles} />
    </>
  );
}
