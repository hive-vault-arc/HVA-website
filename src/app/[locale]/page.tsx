import type { Metadata } from 'next';
import type {AppLocale} from '@/i18n/config';
import {buildStaticRouteMetadata} from '@/i18n/metadata';
import {Link} from '@/i18n/navigation';
import Home from '@/views/Home';
import JsonLd from '@/components/JsonLd';
import type { InsightsCarouselItem } from '@/components/InsightsCarousel';
import FaqSection from '@/components/FaqSection';
import {getLocalizedFaqs} from '@/i18n/faqs';
import {localizedPath} from '@/i18n/route-manifest';
import { getAllPosts, type BlogPost } from '@/lib/blog';
import { buildHomeHeroProof } from '@/lib/home-hero';
import {getTranslations} from 'next-intl/server';
import {
  getAllCaseStudies,
  getClientEvidenceShowcase,
  type CaseStudy,
  type CaseStudyShowcaseSummary,
} from '@/lib/proof';
import {
  GLOBAL_KEYWORDS,
  SITE_URL,
  absoluteUrl,
} from '@/lib/seo';
import {getPublishedCollection} from '@/lib/localized-content';

type PageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  const metadata = await buildStaticRouteMetadata(locale, 'home', GLOBAL_KEYWORDS);
  return {
    ...metadata,
    title: {absolute: String(metadata.title)},
  };
}

function buildInsightsCarouselItems(
  posts: BlogPost[],
  studies: CaseStudy[],
  postLocale: AppLocale,
  caseStudyLocale: AppLocale,
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
      sourceLocale: postLocale,
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
      sourceLocale: caseStudyLocale,
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

export default async function Page({params}: PageProps) {
  const {locale} = await params;
  const [posts, caseStudies, clientEvidence] = await Promise.all([
    getPublishedCollection(locale, getAllPosts),
    getPublishedCollection(locale, getAllCaseStudies),
    getClientEvidenceShowcase(locale),
  ]);
  const [homeFaqs, tHome, tHomeMeta, tCapabilitiesMeta, tNavigation] = await Promise.all([
    getLocalizedFaqs(locale, 'home'),
    getTranslations({locale, namespace: 'Home'}),
    getTranslations({locale, namespace: 'Metadata.pages.home'}),
    getTranslations({locale, namespace: 'Metadata.pages.capabilities'}),
    getTranslations({locale, namespace: 'Navigation'}),
  ]);
  const serviceGuides = tHome.raw('serviceGuides.items') as Array<{
    href: '/digital-services-tangier' | '/ai-agents-morocco';
    label: string;
    region: string;
    summary: string;
  }>;
  const localizedCaseStudies =
    caseStudies.sourceLocale === locale ? caseStudies.items : [];
  const insightsCarouselItems = buildInsightsCarouselItems(
    posts.items,
    caseStudies.items,
    posts.sourceLocale,
    caseStudies.sourceLocale,
  );
  const { trustedPartners } = buildHomeHeroProof(
    caseStudies.items,
    caseStudies.sourceLocale,
  );
  const caseStudyShowcase: CaseStudyShowcaseSummary[] = localizedCaseStudies.map((study) => ({
    slug: study.slug,
    title: study.title,
    clientName: study.clientName,
    industry: study.industry,
    summary: study.summary,
    assets: {
      coverImage: study.assets.coverImage,
      coverAlt: study.assets.coverAlt,
      clientLogo: study.assets.clientLogo,
      clientLogoAlt: study.assets.clientLogoAlt,
    },
  }));
  const capabilitySchema = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'Service'],
    name: tCapabilitiesMeta('title'),
    provider: {
      '@id': `${SITE_URL}/#organization`,
    },
    description: tCapabilitiesMeta('description'),
    serviceType:
      locale === 'fr'
        ? [
            'Conseil technologique',
            'Transformation technologique',
            'Architecture des systèmes',
            'Développement d’agents IA',
            'Automatisation par l’IA',
            'Ingénierie CRM et systèmes',
            'Développement logiciel sur mesure',
            'Applications mobiles',
            'Infrastructure cloud',
            'Données et analytique',
          ]
        : [
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
    availableLanguage: [locale],
    url: absoluteUrl(localizedPath('/capabilities', locale)),
    inLanguage: locale,
  };

  const homePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl(localizedPath('/', locale))}#homepage`,
    name: tHomeMeta('title'),
    description: tHomeMeta('description'),
    url: absoluteUrl(localizedPath('/', locale)),
    inLanguage: locale,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@id': `${SITE_URL}/#organization`,
    },
    primaryImageOfPage: absoluteUrl('/Images/brand/hva-ai-software-agency-tangier.webp'),
    significantLink: [
      '/capabilities',
      '/industries',
      '/aboutus',
      '/insights',
      '/contact',
    ].map((path) => absoluteUrl(localizedPath(path as '/capabilities', locale))),
  };

  const navigationItems = [
    {name: tNavigation('capabilities'), path: '/capabilities' as const, description: tCapabilitiesMeta('description')},
    {name: tNavigation('industries'), path: '/industries' as const, description: tNavigation('industries')},
    {name: tNavigation('whoWeAre'), path: '/aboutus' as const, description: tNavigation('whoWeAre')},
    {name: tNavigation('insights'), path: '/insights' as const, description: tNavigation('insights')},
    {name: tNavigation('contact'), path: '/contact' as const, description: tNavigation('contact')},
  ];
  const primaryNavigationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: locale === 'fr' ? 'Sections principales du site Hive Vault Arc' : 'Primary Hive Vault Arc website sections',
    itemListElement: navigationItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      description: item.description,
      url: absoluteUrl(localizedPath(item.path, locale)),
    })),
  };

  return (
    <>
      <JsonLd data={[homePageSchema, capabilitySchema, primaryNavigationSchema]} />
      <Home
        insightsCarouselItems={insightsCarouselItems}
        clientEvidence={clientEvidence}
        caseStudies={caseStudyShowcase}
        trustedPartners={trustedPartners}
      />
      <section className="service-guides-section">
        <div className="service-guides-shell">
          <div className="service-guides-copy">
            <h2>{tHome('serviceGuides.title')}</h2>
            <p>{tHome('serviceGuides.description')}</p>
          </div>

          <div className="service-guides-carousel" aria-label={tHome('serviceGuides.aria')}>
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
                  <span className="service-guide-link">{tHome('serviceGuides.open')}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <FaqSection faqs={homeFaqs.items} heading={homeFaqs.heading} />
    </>
  );
}
