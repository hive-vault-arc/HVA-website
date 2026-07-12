import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/seo';
import { getAllPosts } from '../lib/blog';
import { getAllCapabilityProfiles } from '../lib/capabilities';
import { getAllCaseStudies } from '../lib/proof';
import { getAllEmployeeProfiles } from '../lib/employee-profiles';
import { getAllNewsArticles, getAllResearchReports } from '../lib/insights';
import { getAllPerspectives } from '../lib/perspectives';

const INDEXABLE_LOCALES = ['fr', 'ar', 'es'] as const;
const BASE_URL = SITE_URL.replace(/\/$/, '');

const w = (priority: number) => ({ changeFrequency: 'weekly' as const, priority });
const m = (priority: number) => ({ changeFrequency: 'monthly' as const, priority });

const absoluteUrl = (path: string) => (path === '/' ? BASE_URL : `${BASE_URL}${path}`);
const localizedSuffix = (path: string) => (path === '/' ? '' : path);

const localizedAlternates = (path: string) => ({
  en: absoluteUrl(path),
  ...Object.fromEntries(INDEXABLE_LOCALES.map((locale) => [locale, absoluteUrl(`/${locale}${localizedSuffix(path)}`)])),
});

type SitemapEntryOptions = {
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
  lastModified?: Date;
};

const entry = (
  path: string,
  now: Date,
  options: SitemapEntryOptions,
  languages?: Record<string, string>
): MetadataRoute.Sitemap[number] => ({
  url: absoluteUrl(path),
  lastModified: options.lastModified ?? now,
  changeFrequency: options.changeFrequency,
  priority: options.priority,
  ...(languages ? { alternates: { languages } } : {}),
});

const localizedEntries = (
  path: string,
  now: Date,
  baseOptions: SitemapEntryOptions,
  localeOptions: SitemapEntryOptions
) => {
  const languages = localizedAlternates(path);

  return [
    entry(path, now, baseOptions, languages),
    ...INDEXABLE_LOCALES.map((locale) => entry(`/${locale}${localizedSuffix(path)}`, now, localeOptions, languages)),
  ];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [
    posts,
    capabilityProfiles,
    caseStudies,
    newsArticles,
    perspectives,
    researchReports,
    employeeProfiles,
  ] = await Promise.all([
    getAllPosts(),
    getAllCapabilityProfiles(),
    getAllCaseStudies(),
    getAllNewsArticles(),
    getAllPerspectives(),
    getAllResearchReports(),
    getAllEmployeeProfiles(),
  ]);
  const now = new Date();
  const digitalServicesLanguages = {
    en: absoluteUrl('/digital-services-tangier'),
    fr: absoluteUrl('/services-digitaux-tanger'),
  };

  return [
    // Localized core pages.
    ...localizedEntries('/', now, w(1), w(0.85)),
    ...localizedEntries('/capabilities', now, w(0.9), w(0.8)),
    entry('/capabilities/in-detail', now, w(0.85)),
    entry('/capabilities/solution-programs', now, w(0.85)),
    ...capabilityProfiles.map((capability) => entry(`/capabilities/${capability.slug}`, now, m(0.78))),

    // Core pages.
    entry('/arc', now, w(0.85)),
    entry('/industries', now, w(0.85)),
    entry('/insights', now, w(0.85)),
    entry('/insights/news-articles', now, m(0.7)),
    ...newsArticles.map((article) => ({
      url: absoluteUrl(`/insights/news-articles/${article.slug}`),
      lastModified: new Date(article.publishedAt),
      ...m(0.7),
    })),
    entry('/insights/perspectives', now, m(0.7)),
    ...perspectives.map((perspective) => ({
      url: absoluteUrl(`/insights/perspectives/${perspective.slug}`),
      lastModified: new Date(perspective.publishedAt),
      ...m(0.7),
    })),
    entry('/insights/research-reports', now, m(0.7)),
    ...researchReports.map((report) => ({
      url: absoluteUrl(`/insights/research-reports/${report.slug}`),
      lastModified: new Date(report.publishedAt),
      ...m(0.7),
    })),
    entry('/contact', now, m(0.8)),
    entry('/aboutus', now, m(0.7)),
    ...employeeProfiles.map((profile) => entry(`/aboutus/our-people/${profile.slug}`, now, m(0.65))),
    entry('/privacy-policy', now, m(0.5)),
    entry('/mentions-legales', now, m(0.5)),
    entry('/whoarewe/portfolio', now, w(0.8)),

    // Geo landing pages.
    entry('/ai-agents-tangier', now, m(0.8)),
    entry('/ai-agents-morocco', now, m(0.8)),
    entry('/it-consulting-tangier', now, m(0.8)),
    entry('/custom-software-morocco', now, m(0.8)),
    entry('/digital-services-tangier', now, m(0.9), digitalServicesLanguages),
    entry('/services-digitaux-tanger', now, m(0.8), digitalServicesLanguages),

    // Blog.
    entry('/blog', now, w(0.8)),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.publishedAt),
      ...m(0.7),
    })),

    // Case studies.
    entry('/case-studies', now, w(0.9)),
    ...caseStudies.map((cs) => ({
      url: absoluteUrl(`/case-studies/${cs.slug}`),
      lastModified: new Date(cs.lastUpdated),
      ...m(0.85),
    })),

    // Machine-readable company profile.
    entry('/ai/company', now, m(0.4)),
  ];
}
