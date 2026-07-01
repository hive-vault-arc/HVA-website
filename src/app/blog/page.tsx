import type { Metadata } from 'next';
import { buildPageMetadata, GLOBAL_KEYWORDS, SITE_URL, absoluteUrl, mergeKeywords } from '../../lib/seo';
import { getAllPosts } from '../../lib/blog';
import BlogIndex from '../../views/BlogIndex';
import JsonLd from '../../components/JsonLd';

export const metadata: Metadata = buildPageMetadata({
  title: 'Blog | Technology Strategy and Execution Insights',
  description:
    'Practical insights on technology consulting, digital transformation, AI automation, software engineering, and operating model execution for decision-makers.',
  path: '/blog',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'agentic AI future',
    'technology strategy insights Morocco',
    'digital transformation execution playbooks',
    'AI agents Morocco blog',
    'custom software ROI Morocco',
    'digital transformation Morocco',
    'custom CRM real estate Morocco',
    'AI automation blog',
  ]),
});

export default async function BlogPage() {
  const posts = await getAllPosts();

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Hive Vault Arc Blog',
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
    name: 'Hive Vault Arc Blog',
    url: `${SITE_URL}/blog`,
    description:
      'Strategy and execution insights on digital transformation, AI automation, and engineering delivery.',
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
      <BlogIndex posts={posts} />
    </>
  );
}
