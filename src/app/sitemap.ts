import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/seo';

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
    },
    {
      url: `${SITE_URL}/portfolio`,
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
  ];
}
