import type { Metadata } from 'next';
import type {AppLocale} from "@/i18n/config";
import {buildStaticRouteMetadata} from "@/i18n/metadata";
import InsightsHub from '@/views/InsightsHub';
import JsonLd from '@/components/JsonLd';
import {getSanityInsightCollections} from '@/lib/sanity-content';
import {absoluteUrl, buildLocalizedBreadcrumbSchema} from '@/lib/seo';
import {localizedPath} from '@/i18n/route-manifest';
import {getTranslations} from 'next-intl/server';
import {
  buildPublishedCollection,
  type LocalizedContentMeta,
} from '@/lib/localized-content';

type PageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  return buildStaticRouteMetadata(locale, "insights");
}

export default async function InsightsPage({params}: PageProps) {
  const {locale} = await params;
  const [collections, tMeta, tNav] = await Promise.all([
    getSanityInsightCollections(locale === 'fr' ? ['fr', 'en'] : ['en']),
    getTranslations({locale, namespace: 'Metadata.pages.insights'}),
    getTranslations({locale, namespace: 'Navigation'}),
  ]);
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

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: tMeta('title'),
    description: tMeta('description'),
    url: absoluteUrl(localizedPath('/insights', locale)),
    inLanguage: locale,
  };
  const breadcrumbSchema = buildLocalizedBreadcrumbSchema(locale, [
    {name: tNav('home'), pathname: '/'},
    {name: tNav('insights'), pathname: '/insights'},
  ]);

  return (
    <>
      <JsonLd data={[pageSchema, breadcrumbSchema]} />
      <InsightsHub
        posts={posts.items}
        caseStudies={caseStudies.items}
        newsArticles={newsArticles.items}
        perspectives={perspectives.items}
        researchReports={researchReports.items}
        contentLocales={{
          posts: posts.sourceLocale,
          caseStudies: caseStudies.sourceLocale,
          newsArticles: newsArticles.sourceLocale,
          perspectives: perspectives.sourceLocale,
          researchReports: researchReports.sourceLocale,
        }}
      />
    </>
  );
}
