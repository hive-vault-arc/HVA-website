import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '../../../../components/JsonLd';
import PerspectiveView from '../../../../views/Perspective';
import { getAllPerspectives, getPerspectiveBySlug, getRelatedPerspectives, type Perspective } from '../../../../lib/perspectives';
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
  const perspectives = await getAllPerspectives();
  return perspectives.map((perspective) => ({ slug: perspective.slug }));
}

function getFaqItems(perspective: Perspective) {
  return perspective.sections.flatMap((section) => (section.type === 'faq' ? section.items : []));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const perspective = await getPerspectiveBySlug(slug).catch(() => null);
  if (!perspective) return {};

  const base = buildPageMetadata({
    title: perspective.title,
    description:
      'A Hive Vault Arc perspective on why companies should fix workflows, data, ownership, and success metrics before deploying AI agents or automation.',
    path: `/insights/perspectives/${perspective.slug}`,
    keywords: perspective.keywords,
  });
  const isoDate = perspective.publishedAt.includes('T')
    ? perspective.publishedAt
    : `${perspective.publishedAt}T00:00:00Z`;
  const coverUrl = absoluteUrl(perspective.coverImage);

  return {
    ...base,
    authors: perspective.authors.map((author) => ({
      name: author.name,
      url: absoluteUrl('/whoweare/abouthva'),
    })),
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime: isoDate,
      modifiedTime: isoDate,
      authors: [absoluteUrl('/whoweare/abouthva')],
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
  const { slug } = await params;
  const perspective = await getPerspectiveBySlug(slug).catch(() => null);
  if (!perspective) notFound();
  const relatedPerspectives = await getRelatedPerspectives(perspective.slug);

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
    inLanguage: 'en',
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
      '@id': absoluteUrl(`/insights/perspectives/${perspective.slug}`),
    },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: [
      { '@type': 'Thing', name: 'AI workflow automation strategy' },
      { '@type': 'Thing', name: 'AI implementation readiness' },
      { '@type': 'Thing', name: 'workflow automation before AI' },
    ],
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
    { name: 'Perspectives', path: '/insights/perspectives' },
    { name: perspective.title, path: `/insights/perspectives/${perspective.slug}` },
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
      <JsonLd data={faqSchema ? [articleSchema, breadcrumbSchema, faqSchema] : [articleSchema, breadcrumbSchema]} />
      <PerspectiveView perspective={perspective} relatedPerspectives={relatedPerspectives} />
    </>
  );
}
