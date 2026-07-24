import type { Metadata } from 'next';
import type {AppLocale} from "@/i18n/config";
import {buildStaticRouteMetadata} from "@/i18n/metadata";
import PrivacyPolicy from '@/views/PrivacyPolicy';
import JsonLd from '@/components/JsonLd';
import {SITE_URL, absoluteUrl, buildBreadcrumbSchema} from '@/lib/seo';
import {localizedPath} from '@/i18n/route-manifest';
import {getTranslations} from 'next-intl/server';

type PageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  return buildStaticRouteMetadata(locale, "privacy");
}

export default async function PrivacyPolicyPage({params}: PageProps) {
  const {locale} = await params;
  const [tMeta, tNav] = await Promise.all([
    getTranslations({locale, namespace: 'Metadata.pages.privacy'}),
    getTranslations({locale, namespace: 'Navigation'}),
  ]);
  const path = localizedPath('/privacy-policy', locale);
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: tMeta('title'),
    description: tMeta('description'),
    url: absoluteUrl(path),
    inLanguage: locale,
    dateModified: '2026-05-03',
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
    },
    image: absoluteUrl('/Images/brand/hva-ai-software-agency-tangier.webp'),
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    {name: tNav('home'), path: localizedPath('/', locale)},
    {name: tMeta('title'), path},
  ]);

  return (
    <>
      <JsonLd data={[webPageSchema, breadcrumbSchema]} />
      <PrivacyPolicy />
    </>
  );
}
