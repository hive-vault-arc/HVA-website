import type { Metadata } from 'next';
import type {AppLocale} from "@/i18n/config";
import {buildStaticRouteMetadata} from "@/i18n/metadata";
import Industries from '@/views/Industries';
import JsonLd from '@/components/JsonLd';
import {localizedPath} from '@/i18n/route-manifest';
import {absoluteUrl, buildLocalizedBreadcrumbSchema} from '@/lib/seo';
import {getTranslations} from 'next-intl/server';

type PageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  return buildStaticRouteMetadata(locale, "industries");
}

export default async function IndustriesPage({params}: PageProps) {
  const {locale} = await params;
  const [tMeta, tNav] = await Promise.all([
    getTranslations({locale, namespace: 'Metadata.pages.industries'}),
    getTranslations({locale, namespace: 'Navigation'}),
  ]);
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
      <Industries />
    </>
  );
}
