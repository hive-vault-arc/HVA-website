import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/seo';
import { getAllPosts } from '../lib/blog';
import { getAllCaseStudies } from '../lib/proof';

const LOCALES = ['en', 'fr', 'ar', 'es'] as const;
const INDEXABLE_LOCALES = LOCALES.filter((locale) => locale !== 'en');

function asAlternates(pathByLocale: Record<(typeof LOCALES)[number], string>) {
  return {
    languages: {
      en: `${SITE_URL}${pathByLocale.en}`,
      fr: `${SITE_URL}${pathByLocale.fr}`,
      ar: `${SITE_URL}${pathByLocale.ar}`,
      es: `${SITE_URL}${pathByLocale.es}`,
      'x-default': `${SITE_URL}${pathByLocale.en}`,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const caseStudies = getAllCaseStudies();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: asAlternates({
        en: '/',
        fr: '/fr',
        ar: '/ar',
        es: '/es',
      }),
    },
    {
      url: `${SITE_URL}/capabilities`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: asAlternates({
        en: '/capabilities',
        fr: '/fr/capabilities',
        ar: '/ar/capabilities',
        es: '/es/capabilities',
      }),
    },
    {
      url: `${SITE_URL}/capabilities/in-detail`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/capabilities/solution-programs`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/arc`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/industries`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/whoweare/abouthva`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/whoarewe/portfolio`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/ai-agents-tangier`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/ai-agents-morocco`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/it-consulting-tangier`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/custom-software-morocco`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/case-studies`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/insights`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/insights/news-articles`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/insights/perspectives`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/insights/research-reports`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...INDEXABLE_LOCALES.flatMap((locale) => [
      {
        url: `${SITE_URL}/${locale}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.85,
      },
      {
        url: `${SITE_URL}/${locale}/capabilities`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${SITE_URL}/${locale}/capabilities/in-detail`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: `${SITE_URL}/${locale}/capabilities/solution-programs`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
    ]),
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...getAllPosts().map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...caseStudies.map((caseStudy) => ({
      url: `${SITE_URL}/case-studies/${caseStudy.slug}`,
      lastModified: new Date(caseStudy.lastUpdated),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
  ];
}

