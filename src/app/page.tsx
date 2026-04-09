import type { Metadata } from 'next';
import Home from '../views/Home';
import JsonLd from '../components/JsonLd';
import type { InsightsCarouselItem } from '../components/InsightsCarousel';
import FaqSection from '../components/FaqSection';
import { HOME_FAQS } from '../data/faqs';
import { getAllPosts } from '../lib/blog';
import { getAllCaseStudies } from '../lib/proof';
import { GLOBAL_KEYWORDS, SITE_URL, buildPageMetadata, mergeKeywords } from '../lib/seo';
import { CANONICAL_MARKET_IDENTITY } from '../lib/positioning';

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: 'Technology Consulting and Digital Transformation Firm',
    description: CANONICAL_MARKET_IDENTITY.longDescriptor,
    path: '/',
    keywords: mergeKeywords(GLOBAL_KEYWORDS, [
      'technology consulting firm Tangier',
      'digital transformation partner Morocco',
      'end-to-end consulting and technical execution',
      'AI automation consulting Morocco',
      'custom software and IT modernization',
      'long-term technology partner',
      'agence pour creer application sur mesure au Maroc',
      'entreprise pour developper application mobile Tanger',
      "besoin d'une equipe pour application web sur mesure Maroc",
      'شركة لتطوير تطبيق مخصص في المغرب',
      'شركة لبناء تطبيق موبايل للشركات طنجة',
      'agencia para crear app personalizada en marruecos',
      'empresa para desarrollar app movil a medida en tanger',
    ]),
    alternates: {
      en: '/',
      fr: '/fr',
      ar: '/ar',
      es: '/es',
      'x-default': '/',
    },
  }),
  title: {
    absolute: 'H.V.A | Technology Consulting and Digital Transformation Firm',
  },
};

function buildInsightsCarouselItems(limit = 9): InsightsCarouselItem[] {
  const posts = getAllPosts()
    .filter((post) => Boolean(post.coverImage))
    .slice(0, 10)
    .map((post) => ({
      id: `blog-${post.slug}`,
      type: 'blog' as const,
      tag: post.category,
      title: post.title,
      excerpt: post.excerpt,
      image: post.coverImage,
      href: `/blog/${post.slug}`,
      date: post.publishedAt,
    }));

  const studies = getAllCaseStudies()
    .filter((study) => Boolean(study.assets.coverImage))
    .slice(0, 8)
    .map((study) => ({
      id: `case-${study.slug}`,
      type: 'case-study' as const,
      tag: study.industry,
      title: study.title,
      excerpt: study.summary,
      image: study.assets.coverImage,
      href: `/case-studies/${study.slug}`,
      date: study.lastUpdated,
    }));

  // Interleave 2 blogs then 1 case-study for variety while keeping payload small.
  const result: InsightsCarouselItem[] = [];
  let blogIndex = 0;
  let studyIndex = 0;
  while (result.length < limit && (blogIndex < posts.length || studyIndex < studies.length)) {
    if (blogIndex < posts.length) result.push(posts[blogIndex++]);
    if (result.length >= limit) break;
    if (blogIndex < posts.length) result.push(posts[blogIndex++]);
    if (result.length >= limit) break;
    if (studyIndex < studies.length) result.push(studies[studyIndex++]);
  }

  return result.slice(0, limit);
}

export default function Page() {
  const insightsCarouselItems = buildInsightsCarouselItems();
  const capabilitySchema = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'Service'],
    name: 'H.V.A Technology Consulting and Digital Transformation Capabilities',
    provider: {
      '@id': `${SITE_URL}/#organization`,
    },
    description:
      'Consulting-led transformation programs combining strategy, architecture, engineering delivery, and ongoing operations support.',
    serviceType: [
      'Technology Consulting',
      'Digital Transformation',
      'IT Advisory and Architecture',
      'AI Agent Development',
      'AI Automation',
      'CRM and Systems Engineering',
      'Custom Software Development',
      'Mobile App Development',
      'Cloud Infrastructure',
      'Data Capabilities',
    ],
    areaServed: ['Morocco', 'Remote'],
    availableLanguage: ['en', 'fr', 'ar', 'es'],
    url: `${SITE_URL}/capabilities`,
  };

  return (
    <>
      <JsonLd data={capabilitySchema} />
      <Home insightsCarouselItems={insightsCarouselItems} />
      <FaqSection faqs={HOME_FAQS} />
    </>
  );
}

