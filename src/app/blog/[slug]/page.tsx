import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '../../../lib/blog';
import { buildPageMetadata, absoluteUrl } from '../../../lib/seo';
import JsonLd from '../../../components/JsonLd';
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

  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.tags,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Organization',
      name: 'Hive Vault Arc',
      url: 'https://www.hiva.ma',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Hive Vault Arc',
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/Images/favico/android-chrome-512x512.png'),
      },
    },
    datePublished: post.publishedAt,
    image: absoluteUrl(post.coverImage),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(`/blog/${post.slug}`),
    },
    keywords: post.tags.join(', '),
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <BlogPostView post={post} />
    </>
  );
}
