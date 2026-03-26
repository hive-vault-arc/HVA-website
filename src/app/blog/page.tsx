import type { Metadata } from 'next';
import { buildPageMetadata, GLOBAL_KEYWORDS, SITE_URL, absoluteUrl, mergeKeywords } from '../../lib/seo';
import { getAllPosts } from '../../lib/blog';
import BlogIndex from '../../views/BlogIndex';
import JsonLd from '../../components/JsonLd';

export const metadata: Metadata = buildPageMetadata({
  title: 'Blog | AI, Software & Digital Strategy Insights',
  description:
    'Practical guides on AI automation, WhatsApp chatbots, and custom software for Moroccan businesses. Written for decision-makers, not tech enthusiasts.',
  path: '/blog',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'agentic AI future',
    'AI agents Morocco blog',
    'custom software ROI Morocco',
    'digital transformation Morocco',
    'custom CRM real estate Morocco',
    'AI automation blog',
  ]),
});

export default function BlogPage() {
  const posts = getAllPosts();

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'H.V.A Blog',
    url: `${SITE_URL}/blog`,
    numberOfItems: posts.length,
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/blog/${post.slug}`),
      name: post.title,
    })),
  };

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'H.V.A Blog',
    url: `${SITE_URL}/blog`,
    description:
      'Practical guides on AI automation, WhatsApp chatbots, and custom software for Moroccan businesses.',
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Hive Vault Arc',
    },
    inLanguage: ['en', 'fr', 'ar', 'es'],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
    ],
  };

  return (
    <>
      <JsonLd data={[itemListSchema, blogSchema, breadcrumbSchema]} />
      <BlogIndex />
    </>
  );
}
