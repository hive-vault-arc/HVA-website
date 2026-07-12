import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '../../../../components/JsonLd';
import NewsArticleView from '../../../../views/NewsArticle';
import { getAllNewsArticles, getNewsArticleBySlug, getRelatedNewsArticles } from '../../../../lib/insights';
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
  const articles = await getAllNewsArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);
  if (!article) return {};

  const base = buildPageMetadata({
    title: article.seo?.title ?? article.title,
    description: article.seo?.description ?? article.summary,
    path: `/insights/news-articles/${article.slug}`,
    keywords: article.seo?.keywords?.length ? article.seo.keywords : article.tags,
  });
  const coverUrl = absoluteUrl(article.coverImage ?? '/Images/media/og-default.png');
  const isoDate = article.publishedAt.includes('T') ? article.publishedAt : `${article.publishedAt}T00:00:00Z`;

  return {
    ...base,
    robots: {
      index: !article.seo?.noIndex,
      follow: !article.seo?.noIndex,
    },
    authors: [{ name: 'Hive Vault Arc Research Team', url: absoluteUrl('/aboutus') }],
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime: isoDate,
      modifiedTime: isoDate,
      authors: [absoluteUrl('/aboutus')],
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
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);
  if (!article) notFound();
  const relatedArticles = await getRelatedNewsArticles(article.slug);

  const isoDate = article.publishedAt.includes('T') ? article.publishedAt : `${article.publishedAt}T00:00:00Z`;

  const newsArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.summary,
    datePublished: isoDate,
    dateModified: isoDate,
    image: absoluteUrl(article.coverImage ?? '/Images/media/og-default.png'),
    inLanguage: 'en',
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
      '@id': absoluteUrl(`/insights/news-articles/${article.slug}`),
    },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: [
      { '@type': 'Thing', name: 'NVIDIA RTX Spark' },
      { '@type': 'Thing', name: 'local AI agents' },
      { '@type': 'Thing', name: 'private local LLMs' },
    ],
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
    { name: 'News Articles', path: '/insights/news-articles' },
    { name: article.title, path: `/insights/news-articles/${article.slug}` },
  ]);

  return (
    <>
      <JsonLd data={[newsArticleSchema, breadcrumbSchema]} />
      <NewsArticleView article={article} relatedArticles={relatedArticles} />
    </>
  );
}
