import type {MetadataRoute} from 'next';
import {PUBLIC_LOCALES, type AppLocale} from '@/i18n/config';
import {
  ROUTE_MANIFEST,
  localizedAlternates,
  localizedPath,
} from '@/i18n/route-manifest';
import type {AppPathname} from '@/i18n/routing';
import {getAllPosts} from '@/lib/blog';
import {getAllCapabilityProfiles} from '@/lib/capabilities';
import {getAllCaseStudies} from '@/lib/proof';
import {getAllEmployeeProfiles} from '@/lib/employee-profiles';
import {getAllNewsArticles, getAllResearchReports} from '@/lib/insights';
import {getAllPerspectives} from '@/lib/perspectives';
import type {LocalizedContentMeta} from '@/lib/localized-content';
import {SITE_URL} from '@/lib/seo';

const BASE_URL = SITE_URL.replace(/\/$/, '');

function absolute(path: string): string {
  return path === '/' ? BASE_URL : `${BASE_URL}${path}`;
}

function absoluteLanguages(languages: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(languages).map(([locale, path]) => [locale, absolute(path)]),
  );
}

function staticEntry(
  pathname: AppPathname,
  locale: AppLocale,
  now: Date,
): MetadataRoute.Sitemap[number] {
  return {
    url: absolute(localizedPath(pathname, locale)),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: pathname === '/' ? (locale === 'en' ? 1 : 0.9) : 0.75,
    alternates: {
      languages: absoluteLanguages(localizedAlternates(pathname)),
    },
  };
}

type DynamicContent = LocalizedContentMeta & {
  slug: string;
  publishedAt?: string;
  lastUpdated?: string;
};

function dynamicEntries(
  items: DynamicContent[],
  locale: AppLocale,
  pathname: AppPathname,
  now: Date,
  paramName = 'slug',
): MetadataRoute.Sitemap {
  return items.map((item) => {
    const paramsByLocale: Partial<Record<AppLocale, Record<string, string>>> = {
      [locale]: {[paramName]: item.slug},
    };

    for (const target of (item.translationTargets ?? []).filter(Boolean)) {
      if (!target.language || !target.slug) continue;
      paramsByLocale[target.language] = {[paramName]: target.slug};
    }

    const lastModifiedValue = item.lastUpdated ?? item.publishedAt;

    return {
      url: absolute(localizedPath(pathname, locale, {[paramName]: item.slug})),
      lastModified: lastModifiedValue ? new Date(lastModifiedValue) : now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: absoluteLanguages(localizedAlternates(pathname, paramsByLocale)),
      },
    };
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticEntries = Object.values(ROUTE_MANIFEST)
    .filter((route) => route.indexable)
    .flatMap((route) =>
      PUBLIC_LOCALES.map((locale) => staticEntry(route.pathname, locale, now)),
    );

  const localizedContent = await Promise.all(
    PUBLIC_LOCALES.map(async (locale) => {
      const [posts, capabilities, caseStudies, employees, news, perspectives, research] =
        await Promise.all([
          getAllPosts(locale),
          getAllCapabilityProfiles(locale),
          getAllCaseStudies(locale),
          getAllEmployeeProfiles(locale),
          getAllNewsArticles(locale),
          getAllPerspectives(locale),
          getAllResearchReports(locale),
        ]);

      return [
        ...dynamicEntries(posts, locale, '/blog/[slug]', now),
        ...dynamicEntries(capabilities, locale, '/capabilities/[slug]', now),
        ...dynamicEntries(caseStudies, locale, '/case-studies/[slug]', now),
        ...dynamicEntries(
          employees,
          locale,
          '/aboutus/our-people/[employee]',
          now,
          'employee',
        ),
        ...dynamicEntries(news, locale, '/insights/news-articles/[slug]', now),
        ...dynamicEntries(
          perspectives,
          locale,
          '/insights/perspectives/[slug]',
          now,
        ),
        ...dynamicEntries(
          research,
          locale,
          '/insights/research-reports/[slug]',
          now,
        ),
      ];
    }),
  );

  return [
    ...staticEntries,
    ...localizedContent.flat(),
    {
      url: absolute('/ai/company'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];
}
