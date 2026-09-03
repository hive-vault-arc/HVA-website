import type {Metadata} from 'next';
import type {AppLocale} from '@/i18n/config';
import {getTranslations} from 'next-intl/server';
import JsonLd from '@/components/JsonLd';
import CookiePolicy from '@/views/CookiePolicy';
import {buildStaticRouteMetadata} from '@/i18n/metadata';
import {localizedPath} from '@/i18n/route-manifest';
import {absoluteUrl, buildBreadcrumbSchema, SITE_URL} from '@/lib/seo';

type CookiePolicyPageProps = Readonly<{params: Promise<{locale: AppLocale}>}>;

export async function generateMetadata({params}: CookiePolicyPageProps): Promise<Metadata> {
  const {locale} = await params;
  return buildStaticRouteMetadata(locale, 'cookiePolicy', ['cookie policy', 'Microsoft Clarity consent', 'privacy choices']);
}

export default async function CookiePolicyPage({params}: CookiePolicyPageProps) {
  const {locale} = await params;
  const [tMeta, tNav] = await Promise.all([
    getTranslations({locale, namespace: 'Metadata.pages.cookiePolicy'}),
    getTranslations({locale, namespace: 'Navigation'}),
  ]);
  const path = localizedPath('/cookie-policy', locale);
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: tMeta('title'),
    description: tMeta('description'),
    url: absoluteUrl(path),
    inLanguage: locale,
    dateModified: '2026-09-03',
    publisher: {'@type': 'Organization', '@id': `${SITE_URL}/#organization`},
  };
  const breadcrumbSchema = buildBreadcrumbSchema([
    {name: tNav('home'), path: localizedPath('/', locale)},
    {name: tMeta('title'), path},
  ]);

  return (
    <>
      <JsonLd data={[webPageSchema, breadcrumbSchema]} />
      <CookiePolicy />
    </>
  );
}
