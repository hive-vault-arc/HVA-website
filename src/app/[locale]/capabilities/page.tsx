import type { Metadata } from 'next';
import type {AppLocale} from "@/i18n/config";
import {buildStaticRouteMetadata} from "@/i18n/metadata";
import SimpleServices from '@/views/SimpleServices';
import JsonLd from '@/components/JsonLd';
import {getLocalizedFaqs} from '@/i18n/faqs';
import { getFeaturedCapabilityProfiles } from '@/lib/capabilities';
import {getStudioServiceEntries, type LocalizedServiceSummary} from '@/data/studio-services';
import {
  SITE_URL,
  absoluteUrl,
  buildLocalizedBreadcrumbSchema,
} from '@/lib/seo';
import {localizedPath} from '@/i18n/route-manifest';
import {getTranslations} from 'next-intl/server';

type PageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  return buildStaticRouteMetadata(locale, "capabilities");
}

export default async function Page({params}: PageProps) {
  const {locale} = await params;
  const [capabilities, capabilitiesFaqs, tMeta, tNav, tDetail] = await Promise.all([
    getFeaturedCapabilityProfiles(locale),
    getLocalizedFaqs(locale, 'capabilities'),
    getTranslations({locale, namespace: 'Metadata.pages.capabilities'}),
    getTranslations({locale, namespace: 'Navigation'}),
    getTranslations({locale, namespace: 'CapabilitiesDetail'}),
  ]);
  const pageUrl = absoluteUrl(localizedPath('/capabilities', locale));
  const displayedServices = getStudioServiceEntries(locale, capabilities, tDetail.raw('pillars.items') as LocalizedServiceSummary[]);
  const breadcrumbSchema = buildLocalizedBreadcrumbSchema(locale, [
    {name: tNav('home'), pathname: '/'},
    {name: tNav('capabilities'), pathname: '/capabilities'},
  ]);
  const collectionSchema = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', '@id': `${pageUrl}#webpage`, name: tMeta('title'),
    description: tMeta('description'), url: pageUrl, inLanguage: locale,
    isPartOf: {'@id': `${SITE_URL}/#website`},
    publisher: {'@id': `${SITE_URL}/#organization`},
    mainEntity: {
      '@type': 'ItemList', '@id': `${pageUrl}#services`, numberOfItems: displayedServices.length,
      itemListElement: displayedServices.map((service, index) => ({
        '@type': 'ListItem', position: index + 1,
        item: {'@type': 'Service',
          '@id': `${pageUrl}#service-${service.slug}`,
          name: service.title, description: service.description,
          url: service.detailAvailable
            ? absoluteUrl(localizedPath('/capabilities/[slug]', locale, {slug: service.detailSlug}))
            : `${pageUrl}#service-${service.slug}`,
          provider: {'@id': `${SITE_URL}/#organization`}},
      })),
    },
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: capabilitiesFaqs.items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {'@type': 'Answer', text: item.answer},
    })),
  };

  return (
    <>
      <JsonLd data={[collectionSchema, breadcrumbSchema, faqSchema]} />
      <SimpleServices locale={locale} services={displayedServices} faqs={capabilitiesFaqs} />
    </>
  );
}
