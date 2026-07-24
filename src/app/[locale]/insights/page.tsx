import type { Metadata } from 'next';
import type {AppLocale} from "@/i18n/config";
import {buildStaticRouteMetadata} from "@/i18n/metadata";
import InsightsHub from '@/views/InsightsHub';
import JsonLd from '@/components/JsonLd';
import { getAllPosts } from '@/lib/blog';
import { getAllNewsArticles, getAllResearchReports } from '@/lib/insights';
import { getAllPerspectives } from '@/lib/perspectives';
import { getAllCaseStudies } from '@/lib/proof';
import {absoluteUrl, buildLocalizedBreadcrumbSchema} from '@/lib/seo';
import {localizedPath} from '@/i18n/route-manifest';
import {getTranslations} from 'next-intl/server';

type PageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  return buildStaticRouteMetadata(locale, "insights");
}

export default async function InsightsPage({params}: PageProps) {
  const {locale} = await params;
  const [
    posts,
    caseStudies,
    newsArticles,
    perspectives,
    researchReports,
    tMeta,
    tNav,
  ] = await Promise.all([
    getAllPosts(locale),
    getAllCaseStudies(locale),
    getAllNewsArticles(locale),
    getAllPerspectives(locale),
    getAllResearchReports(locale),
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
  };
  const breadcrumbSchema = buildLocalizedBreadcrumbSchema(locale, [
    {name: tNav('home'), pathname: '/'},
    {name: tNav('insights'), pathname: '/insights'},
  ]);

  return (
    <>
      <JsonLd data={[pageSchema, breadcrumbSchema]} />
      <InsightsHub
        posts={posts}
        caseStudies={caseStudies}
        newsArticles={newsArticles}
        perspectives={perspectives}
        researchReports={researchReports}
      />
    </>
  );
}
