import type { Metadata } from 'next';
import type {AppLocale} from "@/i18n/config";
import {buildStaticRouteMetadata} from "@/i18n/metadata";
import Contact from '@/views/Contact';
import JsonLd from '@/components/JsonLd';
import FaqSection from '@/components/FaqSection';
import {getLocalizedFaqs} from '@/i18n/faqs';
import {localizedPath} from '@/i18n/route-manifest';
import {getTranslations} from 'next-intl/server';
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_E164,
  GLOBAL_KEYWORDS,
  absoluteUrl,
  buildBreadcrumbSchema,
  mergeKeywords,
} from '@/lib/seo';

type PageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  return buildStaticRouteMetadata(locale, "contact");
}

export default async function Page({params}: PageProps) {
  const {locale} = await params;
  const [contactFaqs, tMeta, tNav] = await Promise.all([
    getLocalizedFaqs(locale, 'contact'),
    getTranslations({locale, namespace: 'Metadata.pages.contact'}),
    getTranslations({locale, namespace: 'Navigation'}),
  ]);
  const path = localizedPath('/contact', locale);
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: tMeta('title'),
    description: tMeta('description'),
    url: absoluteUrl(path),
    inLanguage: locale,
    mainEntity: {
      '@id': absoluteUrl('/#organization'),
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE_E164,
      availableLanguage: ['English', 'French', 'Arabic', 'Spanish'],
      areaServed: ['MA', 'FR', 'EU'],
    },
    keywords: mergeKeywords(GLOBAL_KEYWORDS, [
      'book transformation strategy call',
      'technology consulting discovery',
      'cloud and modernization consultation',
    ]),
  };
  const breadcrumbSchema = buildBreadcrumbSchema([
    {name: tNav('home'), path: localizedPath('/', locale)},
    {name: tNav('contact'), path},
  ]);

  return (
    <>
      <JsonLd data={[contactSchema, breadcrumbSchema]} />
      <Contact />
      <FaqSection faqs={contactFaqs.items} heading={contactFaqs.heading} />
    </>
  );
}
