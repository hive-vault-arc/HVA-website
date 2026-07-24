import type { Metadata } from 'next';
import type {AppLocale} from "@/i18n/config";
import {buildStaticRouteMetadata} from "@/i18n/metadata";
import InsightsCollection from '@/views/InsightsCollection';
import { getAllResearchReports } from '@/lib/insights';
import {getTranslations} from 'next-intl/server';
import JsonLd from '@/components/JsonLd';
import {localizedPath} from '@/i18n/route-manifest';
import {absoluteUrl, buildLocalizedBreadcrumbSchema} from '@/lib/seo';

type PageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  return buildStaticRouteMetadata(locale, "research");
}

export default async function InsightsResearchReportsPage({params}: PageProps) {
  const {locale} = await params;
  const [researchReports, t, tNav] = await Promise.all([
    getAllResearchReports(locale),
    getTranslations({locale, namespace: 'Collections.research'}),
    getTranslations({locale, namespace: 'Navigation'}),
  ]);
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('title'),
    description: t('description'),
    url: absoluteUrl(localizedPath('/insights/research-reports', locale)),
    inLanguage: locale,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: researchReports.length,
      itemListElement: researchReports.map((report, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: report.title,
        url: absoluteUrl(
          localizedPath('/insights/research-reports/[slug]', locale, {
            slug: report.slug,
          }),
        ),
      })),
    },
  };
  const breadcrumbSchema = buildLocalizedBreadcrumbSchema(locale, [
    {name: tNav('home'), pathname: '/'},
    {name: tNav('insights'), pathname: '/insights'},
    {name: tNav('researchReports'), pathname: '/insights/research-reports'},
  ]);

  return (
    <>
      <JsonLd data={[collectionSchema, breadcrumbSchema]} />
      <InsightsCollection
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
        cards={researchReports}
        basePath="/insights/research-reports"
      />
    </>
  );
}
