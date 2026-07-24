import type { Metadata } from 'next';
import type {AppLocale} from '@/i18n/config';
import {localizedPath} from '@/i18n/route-manifest';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import PerspectiveView from '@/views/Perspective';
import {
  getPerspectiveBySlug,
  getRelatedPerspectives,
  type Perspective,
} from '@/lib/perspectives';
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

function getFaqItems(perspective: Perspective) {
  return perspective.sections.flatMap((section) => (section.type === 'faq' ? section.items : []));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {locale, slug} = await params;
  const perspective = await getPerspectiveBySlug(slug, locale).catch(() => null);
  if (!perspective) return {};

  const base = buildLocalizedPageMetadata({
    title: perspective.seo?.title ?? perspective.title,
    description: perspective.seo?.description ?? perspective.summary,
    pathname: '/insights/perspectives/[slug]',
    locale,
    params: {slug: perspective.slug},
    translationParams: translationParams(perspective, locale, perspective.slug),
    keywords: perspective.seo?.keywords?.length ? perspective.seo.keywords : perspective.keywords,
  });
  const isoDate = perspective.publishedAt.includes('T')
    ? perspective.publishedAt
    : `${perspective.publishedAt}T00:00:00Z`;
  const coverUrl = absoluteUrl(perspective.coverImage);
  const authorUrl = absoluteUrl(localizedPath('/aboutus', locale));

  return {
    ...base,
    robots: {
      index: !perspective.seo?.noIndex,
      follow: !perspective.seo?.noIndex,
    },
    authors: perspective.authors.map((author) => ({
      name: author.name,
      url: authorUrl,
    })),
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime: isoDate,
      modifiedTime: isoDate,
      authors: [authorUrl],
      section: perspective.tag,
      images: [{ url: coverUrl, width: 1200, height: 630, alt: perspective.coverAlt }],
    },
    twitter: {
      ...base.twitter,
      images: [coverUrl],
    },
  };
}

export default async function PerspectivePage({ params }: Props) {
  const {locale, slug} = await params;
  const perspective = await getPerspectiveBySlug(slug, locale).catch(() => null);
  if (!perspective) notFound();
  const [relatedPerspectives, tContent] = await Promise.all([
    getRelatedPerspectives(perspective.slug, 3, locale),
    getTranslations({locale, namespace: 'DynamicContent'}),
  ]);

  const isoDate = perspective.publishedAt.includes('T')
    ? perspective.publishedAt
    : `${perspective.publishedAt}T00:00:00Z`;
  const faqItems = getFaqItems(perspective);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: perspective.title,
    description: perspective.summary,
    datePublished: isoDate,
    dateModified: isoDate,
    image: absoluteUrl(perspective.coverImage),
    inLanguage: locale,
    articleSection: perspective.tag,
    keywords: perspective.keywords.join(', '),
    author: perspective.authors.map((author) => ({
      '@type': 'Organization',
      name: author.name,
      url: SITE_URL,
    })),
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
        localizedPath('/insights/perspectives/[slug]', locale, {slug: perspective.slug}),
      ),
    },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: [
      { '@type': 'Thing', name: 'AI workflow automation strategy' },
      { '@type': 'Thing', name: 'AI implementation readiness' },
      { '@type': 'Thing', name: 'workflow automation before AI' },
    ],
  };

  const breadcrumbSchema = buildLocalizedBreadcrumbSchema(locale, [
    {name: tContent('home'), pathname: '/'},
    {name: tContent('insights'), pathname: '/insights'},
    {name: tContent('perspectives'), pathname: '/insights/perspectives'},
    {
      name: perspective.title,
      pathname: '/insights/perspectives/[slug]',
      params: {slug: perspective.slug},
    },
  ]);

  const faqSchema =
    faqItems.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : undefined;

  return (
    <>
      <TranslationTargets
        routes={translationRoutes(
          perspective,
          locale,
          perspective.slug,
          '/insights/perspectives/[slug]',
        )}
      />
      <JsonLd data={faqSchema ? [articleSchema, breadcrumbSchema, faqSchema] : [articleSchema, breadcrumbSchema]} />
      <PerspectiveView perspective={perspective} relatedPerspectives={relatedPerspectives} />
    </>
  );
}
