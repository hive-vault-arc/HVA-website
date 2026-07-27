import type { Metadata } from 'next';
import type {AppLocale} from "@/i18n/config";
import {buildStaticRouteMetadata} from "@/i18n/metadata";
import Industries from '@/views/Industries';
import JsonLd from '@/components/JsonLd';
import type {IndustryInsightItem} from '@/components/IndustryInsightsShowcase';
import {localizedPath} from '@/i18n/route-manifest';
import {absoluteUrl, buildLocalizedBreadcrumbSchema} from '@/lib/seo';
import {
  getSanityIndustryInsightCollections,
  type IndustryInsightCollections,
} from '@/lib/sanity-content';
import {
  buildPublishedCollection,
  type LocalizedContentMeta,
} from '@/lib/localized-content';
import {getTranslations} from 'next-intl/server';

type PageProps = {params: Promise<{locale: AppLocale}>};

type DatedIndustryInsightItem = IndustryInsightItem & {publishedAt: string};

function buildIndustryInsightItems(
  locale: AppLocale,
  collections: IndustryInsightCollections,
): IndustryInsightItem[] {
  const localized = <T extends LocalizedContentMeta & {slug: string}>(items: T[]) =>
    buildPublishedCollection(
      locale,
      items.filter((item) => item.language === locale),
      items.filter((item) => item.language === 'en'),
    );
  const posts = localized(collections.posts);
  const caseStudies = localized(collections.caseStudies);
  const newsArticles = localized(collections.newsArticles);
  const perspectives = localized(collections.perspectives);
  const researchReports = localized(collections.researchReports);

  const items: DatedIndustryInsightItem[] = [
    ...posts.items.map((post) => ({
      id: `blog-${post.slug}`,
      tag: post.category,
      title: post.title,
      description: post.excerpt,
      image: post.coverImage,
      href: `/blog/${post.slug}`,
      sourceLocale: posts.sourceLocale,
      publishedAt: post.publishedAt,
    })),
    ...caseStudies.items.map((study) => ({
      id: `case-${study.slug}`,
      tag: study.industry,
      title: study.title,
      description: study.summary,
      image: study.assets.coverImage,
      href: `/case-studies/${study.slug}`,
      sourceLocale: caseStudies.sourceLocale,
      publishedAt: study.lastUpdated,
    })),
    ...newsArticles.items.map((article) => ({
      id: `news-${article.slug}`,
      tag: article.category || article.tag,
      title: article.title,
      description: article.summary,
      image: article.coverImage ?? '',
      href: `/insights/news-articles/${article.slug}`,
      sourceLocale: newsArticles.sourceLocale,
      publishedAt: article.publishedAt,
    })),
    ...perspectives.items.map((perspective) => ({
      id: `perspective-${perspective.slug}`,
      tag: perspective.tag,
      title: perspective.title,
      description: perspective.summary,
      image: perspective.coverImage,
      href: `/insights/perspectives/${perspective.slug}`,
      sourceLocale: perspectives.sourceLocale,
      publishedAt: perspective.publishedAt,
    })),
    ...researchReports.items.map((report) => ({
      id: `research-${report.slug}`,
      tag: report.tag,
      title: report.title,
      description: report.summary,
      image: report.coverImage ?? '',
      href: `/insights/research-reports/${report.slug}`,
      sourceLocale: researchReports.sourceLocale,
      publishedAt: report.publishedAt,
    })),
  ];

  return items
    .filter((item) => item.image)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .map(({id, tag, title, description, image, href, sourceLocale}) => ({
      id,
      tag,
      title,
      description,
      image,
      href,
      sourceLocale,
    }));
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  return buildStaticRouteMetadata(locale, "industries");
}

export default async function IndustriesPage({params}: PageProps) {
  const {locale} = await params;
  const [tMeta, tNav, collections] = await Promise.all([
    getTranslations({locale, namespace: 'Metadata.pages.industries'}),
    getTranslations({locale, namespace: 'Navigation'}),
    getSanityIndustryInsightCollections(
      locale === 'fr' ? ['fr', 'en'] : ['en'],
    ),
  ]);
  const insightItems = buildIndustryInsightItems(locale, collections);
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: tMeta('title'),
    description: tMeta('description'),
    url: absoluteUrl(localizedPath('/industries', locale)),
    inLanguage: locale,
  };
  const breadcrumbSchema = buildLocalizedBreadcrumbSchema(locale, [
    {name: tNav('home'), pathname: '/'},
    {name: tNav('industries'), pathname: '/industries'},
  ]);

  return (
    <>
      <JsonLd data={[pageSchema, breadcrumbSchema]} />
      <Industries insightItems={insightItems} />
    </>
  );
}
