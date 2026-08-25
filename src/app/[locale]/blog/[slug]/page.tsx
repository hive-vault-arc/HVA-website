import type { Metadata } from 'next';
import type {AppLocale} from '@/i18n/config';
import {decodeRouteParam, localizedPath} from '@/i18n/route-manifest';
import { notFound } from 'next/navigation';
import {getPostBySlug, getRelatedPosts} from '@/lib/blog';
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
import JsonLd from '@/components/JsonLd';
import FaqSection from '@/components/FaqSection';
import BlogPostView from '@/views/BlogPost';
import {getTranslations} from 'next-intl/server';

type Props = { params: Promise<{locale: AppLocale; slug: string}> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {locale, slug: routeSlug} = await params;
  const slug = decodeRouteParam(routeSlug);
  const post = await getPostBySlug(slug, locale).catch(() => null);
  if (!post) return {};

  const base = buildLocalizedPageMetadata({
    title: post.seo?.title ?? post.title,
    description: post.seo?.description ?? post.excerpt,
    pathname: '/blog/[slug]',
    locale,
    params: {slug: post.slug},
    translationParams: translationParams(post, locale, post.slug),
    keywords: post.seo?.keywords?.length ? post.seo.keywords : post.tags,
  });

  const isoDate = post.publishedAt.includes('T') ? post.publishedAt : `${post.publishedAt}T00:00:00Z`;
  const coverUrl = absoluteUrl(post.coverImage);
  const authorUrl = absoluteUrl(localizedPath('/aboutus', locale));

  return {
    ...base,
    robots: {
      index: !post.seo?.noIndex,
      follow: !post.seo?.noIndex,
    },
    authors: [{ name: 'Hive Vault Arc Research Team', url: authorUrl }],
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime: isoDate,
      modifiedTime: isoDate,
      authors: [authorUrl],
      section: post.category,
      images: [{ url: coverUrl, width: 1200, height: 630, alt: post.coverAlt ?? post.title }],
    },
    twitter: {
      ...base.twitter,
      images: [coverUrl],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const {locale, slug: routeSlug} = await params;
  const slug = decodeRouteParam(routeSlug);
  const post = await getPostBySlug(slug, locale).catch(() => null);
  if (!post) notFound();
  const relatedPosts = await getRelatedPosts(post.slug, 3, locale);
  const [tFaq, tContent] = await Promise.all([
    getTranslations({locale, namespace: 'Faqs'}),
    getTranslations({locale, namespace: 'DynamicContent'}),
  ]);
  const authorUrl = absoluteUrl(localizedPath('/aboutus', locale));

  const isoDate = post.publishedAt.includes('T') ? post.publishedAt : `${post.publishedAt}T00:00:00Z`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: 'Hive Vault Arc Research Team',
      url: authorUrl,
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
    inLanguage: locale,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(localizedPath('/blog/[slug]', locale, {slug: post.slug})),
    },
    keywords: post.tags.join(', '),
    about: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
    },
    articleSection: post.category,
  };
  const breadcrumbSchema = buildLocalizedBreadcrumbSchema(locale, [
    {name: tContent('home'), pathname: '/'},
    {name: tContent('blog'), pathname: '/blog'},
    {name: post.title, pathname: '/blog/[slug]', params: {slug: post.slug}},
  ]);

  return (
    <>
      <TranslationTargets
        routes={translationRoutes(post, locale, post.slug, '/blog/[slug]')}
      />
      <JsonLd data={[articleSchema, breadcrumbSchema]} />
      <BlogPostView post={post} relatedPosts={relatedPosts} />
      {post.faqs && post.faqs.length > 0 && (
        <FaqSection faqs={post.faqs} heading={tFaq('articleHeading')} />
      )}
    </>
  );
}
