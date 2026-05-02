import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/seo';
import { getAllPosts } from '../lib/blog';
import { getAllCaseStudies } from '../lib/proof';

const INDEXABLE_LOCALES = ['fr', 'ar', 'es'] as const;

const w = (priority: number) => ({ changeFrequency: 'weekly' as const, priority });
const m = (priority: number) => ({ changeFrequency: 'monthly' as const, priority });

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // ── Core pages ────────────────────────────────────────────────────────
    { url: SITE_URL,                                         lastModified: now, ...w(1) },
    { url: `${SITE_URL}/capabilities`,                       lastModified: now, ...w(0.9) },
    { url: `${SITE_URL}/capabilities/in-detail`,             lastModified: now, ...w(0.85) },
    { url: `${SITE_URL}/capabilities/solution-programs`,     lastModified: now, ...w(0.85) },
    { url: `${SITE_URL}/arc`,                                lastModified: now, ...w(0.85) },
    { url: `${SITE_URL}/industries`,                         lastModified: now, ...w(0.85) },
    { url: `${SITE_URL}/insights`,                           lastModified: now, ...w(0.85) },
    { url: `${SITE_URL}/insights/news-articles`,             lastModified: now, ...m(0.7) },
    { url: `${SITE_URL}/insights/perspectives`,              lastModified: now, ...m(0.7) },
    { url: `${SITE_URL}/insights/research-reports`,          lastModified: now, ...m(0.7) },
    { url: `${SITE_URL}/contact`,                            lastModified: now, ...m(0.8) },
    { url: `${SITE_URL}/whoweare/abouthva`,                  lastModified: now, ...m(0.7) },
    { url: `${SITE_URL}/whoarewe/portfolio`,                 lastModified: now, ...w(0.8) },

    // ── Geo landing pages ─────────────────────────────────────────────────
    { url: `${SITE_URL}/ai-agents-tangier`,                  lastModified: now, ...m(0.8) },
    { url: `${SITE_URL}/ai-agents-morocco`,                  lastModified: now, ...m(0.8) },
    { url: `${SITE_URL}/it-consulting-tangier`,              lastModified: now, ...m(0.8) },
    { url: `${SITE_URL}/custom-software-morocco`,            lastModified: now, ...m(0.8) },

    // ── Blog ──────────────────────────────────────────────────────────────
    { url: `${SITE_URL}/blog`,                               lastModified: now, ...w(0.8) },
    ...getAllPosts().map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      ...m(0.7),
    })),

    // ── Case studies ──────────────────────────────────────────────────────
    { url: `${SITE_URL}/case-studies`,                       lastModified: now, ...w(0.9) },
    ...getAllCaseStudies().map((cs) => ({
      url: `${SITE_URL}/case-studies/${cs.slug}`,
      lastModified: new Date(cs.lastUpdated),
      ...m(0.85),
    })),

    // ── Locale pages (fr · ar · es) ───────────────────────────────────────
    ...INDEXABLE_LOCALES.flatMap((locale) => [
      { url: `${SITE_URL}/${locale}`,                                  lastModified: now, ...w(0.85) },
      { url: `${SITE_URL}/${locale}/capabilities`,                     lastModified: now, ...w(0.8) },
      { url: `${SITE_URL}/${locale}/capabilities/in-detail`,           lastModified: now, ...m(0.7) },
      { url: `${SITE_URL}/${locale}/capabilities/solution-programs`,   lastModified: now, ...m(0.7) },
    ]),
  ];
}
