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
import {getNoindexedPageOptimizationKeys} from '@/lib/page-optimization';

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
  routeKey: string,
  pathname: AppPathname,
  locale: AppLocale,
  noindexedPages: Set<string>,
): MetadataRoute.Sitemap[number] {
  const alternates = Object.fromEntries(
    Object.entries(localizedAlternates(pathname)).filter(([alternateLocale]) => {
      const contentLocale = alternateLocale === 'x-default' ? 'en' : alternateLocale;
      return !noindexedPages.has(`${routeKey}:${contentLocale}`);
    }),
  );
  return {
    url: absolute(localizedPath(pathname, locale)),
    changeFrequency: 'monthly',
    priority: pathname === '/' ? (locale === 'en' ? 1 : 0.9) : 0.75,
    alternates: {
      languages: absoluteLanguages(alternates),
    },
  };
}

type DynamicContent = LocalizedContentMeta & {
  slug: string;
  publishedAt?: string;
  lastUpdated?: string;
  seo?: {
    noIndex?: boolean;
  };
};

function dynamicEntries(
  items: DynamicContent[],
  locale: AppLocale,
  pathname: AppPathname,
  paramName = 'slug',
): MetadataRoute.Sitemap {
  return items.filter((item) => !item.seo?.noIndex).map((item) => {
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
      ...(lastModifiedValue ? {lastModified: new Date(lastModifiedValue)} : {}),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: absoluteLanguages(localizedAlternates(pathname, paramsByLocale)),
      },
    };
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const noindexedStaticPages = await getNoindexedPageOptimizationKeys();
  const staticEntries = Object.entries(ROUTE_MANIFEST)
    .filter(([, route]) => route.indexable)
    .flatMap(([routeKey, route]) =>
      PUBLIC_LOCALES.flatMap((locale) =>
        noindexedStaticPages.has(`${routeKey}:${locale}`)
          ? []
          : [staticEntry(routeKey, route.pathname, locale, noindexedStaticPages)],
      ),
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
        ...dynamicEntries(posts, locale, '/blog/[slug]'),
        ...dynamicEntries(capabilities, locale, '/capabilities/[slug]'),
        ...dynamicEntries(caseStudies, locale, '/case-studies/[slug]'),
        ...dynamicEntries(
          employees,
          locale,
          '/aboutus/our-people/[employee]',
          'employee',
        ),
        ...dynamicEntries(news, locale, '/insights/news-articles/[slug]'),
        ...dynamicEntries(
          perspectives,
          locale,
          '/insights/perspectives/[slug]',
        ),
        ...dynamicEntries(
          research,
          locale,
          '/insights/research-reports/[slug]',
        ),
      ];
    }),
  );

  const companyProfileEntry: MetadataRoute.Sitemap[number] = {
    url: absolute('/ai/company'),
    changeFrequency: 'monthly',
    priority: 0.8,
  };

  return [companyProfileEntry, ...staticEntries, ...localizedContent.flat()];
}
