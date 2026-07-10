import type { Metadata } from 'next';
import Link from 'next/link';
import Home from '../views/Home';
import JsonLd from '../components/JsonLd';
import type { InsightsCarouselItem } from '../components/InsightsCarousel';
import FaqSection from '../components/FaqSection';
import { HOME_FAQS } from '../data/faqs';
import { getAllPosts, type BlogPost } from '../lib/blog';
import { getAllCaseStudies, type CaseStudy } from '../lib/proof';
import {
  GLOBAL_KEYWORDS,
  SITELINK_CANDIDATES,
  SITE_URL,
  absoluteUrl,
  buildPageMetadata,
  mergeKeywords,
} from '../lib/seo';

const HOME_META_TITLE = 'Hive Vault Arc | Technology Consulting & AI Transformation';
const HOME_META_DESCRIPTION =
  'Hive Vault Arc is a technology transformation partner in Tangier, Morocco, combining strategy consulting, AI engineering, software development, cloud infrastructure, and managed operations.';

const serviceGuides = [
  {
    href: '/digital-services-tangier',
    label: 'Digital Services in Tangier',
    region: 'Tangier',
    summary: 'A practical guide for teams evaluating AI, software, consulting, and delivery partners in Tangier.',
  },
  {
    href: '/ai-agents-morocco',
    label: 'AI Agents in Morocco',
    region: 'Morocco',
    summary: 'How Moroccan businesses can use multilingual AI agents for sales, support, and operational workflows.',
  },
];

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: HOME_META_TITLE,
    description: HOME_META_DESCRIPTION,
    path: '/',
    keywords: mergeKeywords(GLOBAL_KEYWORDS, [
      'technology consulting firm Tangier',
      'digital transformation partner Morocco',
      'digital services Tangier',
      'digital services Morocco',
      'digital agency Tangier',
      'services digitaux Tanger',
      'agence digitale Tanger',
      'end-to-end consulting and technical execution',
      'AI automation consulting Morocco',
      'custom software and IT modernization',
      'long-term technology partner',
      'technology transformation partner Morocco',
      'technology transformation partner Tangier',
      'AI engineering firm Morocco',
      'managed operations Morocco',
      'strategy AI engineering operations',
      'agence pour creer application sur mesure au Maroc',
      'entreprise pour developper application mobile Tanger',
      "besoin d'une equipe pour application web sur mesure Maroc",
      'شركة لتطوير تطبيق مخصص في المغرب',
      'شركة لبناء تطبيق موبايل للشركات في طنجة',
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
    absolute: HOME_META_TITLE,
  },
};

function buildInsightsCarouselItems(
  posts: BlogPost[],
  studies: CaseStudy[],
  limit = 9
): InsightsCarouselItem[] {
  const postItems = posts
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

  const studyItems = studies
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
  while (result.length < limit && (blogIndex < postItems.length || studyIndex < studyItems.length)) {
    if (blogIndex < postItems.length) result.push(postItems[blogIndex++]);
    if (result.length >= limit) break;
    if (blogIndex < postItems.length) result.push(postItems[blogIndex++]);
    if (result.length >= limit) break;
    if (studyIndex < studyItems.length) result.push(studyItems[studyIndex++]);
  }

  return result.slice(0, limit);
}

export default async function Page() {
  const [posts, caseStudies] = await Promise.all([getAllPosts(), getAllCaseStudies()]);
  const insightsCarouselItems = buildInsightsCarouselItems(posts, caseStudies);
  const capabilitySchema = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'Service'],
    name: 'Hive Vault Arc Technology Transformation Partner Capabilities',
    provider: {
      '@id': `${SITE_URL}/#organization`,
    },
    description:
      'Consulting-led transformation programs combining strategy, architecture, engineering delivery, and ongoing operations support.',
    serviceType: [
      'Technology Consulting',
      'Technology Transformation',
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

  const homePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#homepage`,
    name: HOME_META_TITLE,
    description: HOME_META_DESCRIPTION,
    url: SITE_URL,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@id': `${SITE_URL}/#organization`,
    },
    primaryImageOfPage: absoluteUrl('/Images/brand/hva-ai-software-agency-tangier.webp'),
    significantLink: SITELINK_CANDIDATES.filter((item) => item.href !== '/').map((item) =>
      absoluteUrl(item.href)
    ),
  };

  const primaryNavigationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Primary Hive Vault Arc website sections',
    itemListElement: SITELINK_CANDIDATES.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      description: item.description,
      url: absoluteUrl(item.href),
    })),
  };

  return (
    <>
      <JsonLd data={[homePageSchema, capabilitySchema, primaryNavigationSchema]} />
      <Home insightsCarouselItems={insightsCarouselItems} />
      <section className="service-guides-section">
        <div className="service-guides-shell">
          <div className="service-guides-copy">
            <h2>Service guides for Morocco</h2>
            <p>
              Two focused entry points for teams comparing AI, consulting, and software delivery options.
            </p>
          </div>

          <div className="service-guides-carousel" aria-label="Service guide links">
            <div className="service-guides-track">
              {[...serviceGuides, serviceGuides[0]].map((guide, index) => (
                <Link
                  key={`${guide.href}-${index}`}
                  href={guide.href}
                  aria-hidden={index === serviceGuides.length}
                  tabIndex={index === serviceGuides.length ? -1 : undefined}
                  className="service-guide-card"
                >
                  <span className="service-guide-region">{guide.region}</span>
                  <span className="service-guide-title">{guide.label}</span>
                  <span className="service-guide-summary">{guide.summary}</span>
                  <span className="service-guide-link">Open guide</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <FaqSection faqs={HOME_FAQS} />
    </>
  );
}
