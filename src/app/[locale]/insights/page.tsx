import type { Metadata } from 'next';
import type {AppLocale} from "@/i18n/config";
import {buildStaticRouteMetadata} from "@/i18n/metadata";
import InsightsHub from '@/views/InsightsHub';
import JsonLd from '@/components/JsonLd';
import {
  getResilientPaginatedInsightCollection,
  getResilientPaginatedInsights,
} from '@/lib/resilient-insights';
import {absoluteUrl, buildLocalizedBreadcrumbSchema, SITE_URL} from '@/lib/seo';
import {localizedPath} from '@/i18n/route-manifest';
import {getTranslations} from 'next-intl/server';
import type {InsightListingItem} from '@/lib/insight-pagination';

type PageProps = {params: Promise<{locale: AppLocale}>};

function insightUrl(item: InsightListingItem) {
  const slug = decodeURIComponent(item.href.split('/').filter(Boolean).at(-1) ?? '');
  const route = item.type === 'blog' ? '/blog/[slug]' :
    item.type === 'news-article' ? '/insights/news-articles/[slug]' :
    item.type === 'perspective' ? '/insights/perspectives/[slug]' :
    item.type === 'research-report' ? '/insights/research-reports/[slug]' : '/case-studies/[slug]';
  return absoluteUrl(localizedPath(route, item.sourceLocale, {slug}));
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  return buildStaticRouteMetadata(locale, "insights");
}

export default async function InsightsPage({params}: PageProps) {
  const {locale} = await params;
  const [initialPage, evidencePage, tMeta, tNav] = await Promise.all([
    getResilientPaginatedInsights(locale),
    getResilientPaginatedInsightCollection(locale, 'caseStudy'),
    getTranslations({locale, namespace: 'Metadata.pages.insights'}),
    getTranslations({locale, namespace: 'Navigation'}),
  ]);

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: tMeta('title'),
    description: tMeta('description'),
    url: absoluteUrl(localizedPath('/insights', locale)),
    inLanguage: locale,
    isPartOf: {'@id': `${SITE_URL}/#website`},
    mainEntity: {
      '@type': 'ItemList', numberOfItems: initialPage.total,
      itemListElement: initialPage.items.map((item, index) => ({'@type': 'ListItem', position: index + 1, name: item.title, url: insightUrl(item)})),
    },
  };
  const breadcrumbSchema = buildLocalizedBreadcrumbSchema(locale, [
    {name: tNav('home'), pathname: '/'},
    {name: tNav('insights'), pathname: '/insights'},
  ]);

  return (
    <>
      <JsonLd data={[pageSchema, breadcrumbSchema]} />
      <InsightsHub
        initialInsights={initialPage.items}
        evidenceItems={evidencePage.items.map((item) => ({
          id: item.id,
          type: 'case-study' as const,
          tag: item.industry?.title ?? 'Case study',
          title: item.title,
          excerpt: item.excerpt,
          image: item.image,
          href: item.href,
          date: item.date,
          sourceLocale: item.sourceLocale,
          editorialFormat: item.editorialFormat,
          topics: item.topics,
          directAnswer: item.directAnswer,
          evidenceType: item.evidenceType,
          meta: item.deploymentStatus,
        }))}
        totalInsights={initialPage.total}
        initialCursor={initialPage.nextCursor}
        hasFallbackContent={initialPage.hasFallbackContent}
      />
    </>
  );
}
