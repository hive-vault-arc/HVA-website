import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/seo';
import { getAllPosts } from '../lib/blog';

const LOCALES = ['en', 'fr', 'ar', 'es'] as const;

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

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: asAlternates({
        en: '/en',
        fr: '/fr',
        ar: '/ar',
        es: '/es',
      }),
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: asAlternates({
        en: '/en/services',
        fr: '/fr/services',
        ar: '/ar/services',
        es: '/es/services',
      }),
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: asAlternates({
        en: '/en/about',
        fr: '/fr/about',
        ar: '/ar/about',
        es: '/es/about',
      }),
    },
    {
      url: `${SITE_URL}/portfolio`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: asAlternates({
        en: '/en/portfolio',
        fr: '/fr/portfolio',
        ar: '/ar/portfolio',
        es: '/es/portfolio',
      }),
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: asAlternates({
        en: '/en/contact',
        fr: '/fr/contact',
        ar: '/ar/contact',
        es: '/es/contact',
      }),
    },
    ...LOCALES.flatMap((locale) => [
      {
        url: `${SITE_URL}/${locale}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: locale === 'en' ? 0.95 : 0.85,
      },
      {
        url: `${SITE_URL}/${locale}/services`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: locale === 'en' ? 0.9 : 0.8,
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
  ];
}
