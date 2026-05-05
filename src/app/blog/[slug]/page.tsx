import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPosts } from '../../../lib/blog';
import {
  SITE_LOGO_HEIGHT,
  SITE_LOGO_PATH,
  SITE_LOGO_WIDTH,
  SITE_URL,
  absoluteUrl,
  buildBreadcrumbSchema,
  buildPageMetadata,
} from '../../../lib/seo';
import JsonLd from '../../../components/JsonLd';
import FaqSection from '../../../components/FaqSection';
import BlogPostView from '../../../views/BlogPost';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  const base = buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.tags,
  });

  const isoDate = post.publishedAt.includes('T') ? post.publishedAt : `${post.publishedAt}T00:00:00Z`;
  const coverUrl = absoluteUrl(post.coverImage);

  return {
    ...base,
    authors: [{ name: 'H.V.A Research Team', url: absoluteUrl('/whoweare/abouthva') }],
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime: isoDate,
      modifiedTime: isoDate,
      authors: [absoluteUrl('/whoweare/abouthva')],
      section: post.category,
      images: [{ url: coverUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      ...base.twitter,
      images: [coverUrl],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const isoDate = post.publishedAt.includes('T') ? post.publishedAt : `${post.publishedAt}T00:00:00Z`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: 'H.V.A Research Team',
      url: absoluteUrl('/whoweare/abouthva'),
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
    datePublished: isoDate,
    dateModified: isoDate,
    image: absoluteUrl(post.coverImage),
    inLanguage: 'en',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(`/blog/${post.slug}`),
    },
    keywords: post.tags.join(', '),
    about: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
    },
    articleSection: post.category,
  };
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbSchema]} />
      <BlogPostView post={post} />
      {post.faqs && post.faqs.length > 0 && (
        <FaqSection faqs={post.faqs} heading="Questions About This Article" />
      )}
    </>
  );
}
