import type { Metadata } from 'next';
import Link from 'next/link';
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
    absolute: 'Hive Vault Arc (H.V.A) | AI & Digital Transformation · Technology Consulting · Tangier',
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
      <section className="border-t border-[#e2e8f0] bg-white py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-14">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">
            Service Landing Pages
          </p>
          <h2 className="font-headline text-3xl font-medium text-[#0F172A] md:text-4xl">
            Explore Local and National Service Guides
          </h2>
          <div className="mt-7 grid gap-3 md:grid-cols-2">
            {[
              { href: '/ai-agents-tangier', label: 'AI Agents in Tangier' },
              { href: '/ai-agents-morocco', label: 'AI Agents in Morocco' },
              { href: '/it-consulting-tangier', label: 'IT Consulting in Tangier' },
              { href: '/custom-software-morocco', label: 'Custom Software in Morocco' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border border-[#e2e8f0] bg-[#F8FAFC] px-5 py-4 text-sm font-bold uppercase tracking-[0.14em] text-[#2563EB] transition-colors hover:bg-[#ECF5FD] hover:text-[#1d4ed8]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <FaqSection faqs={HOME_FAQS} />
    </>
  );
}

