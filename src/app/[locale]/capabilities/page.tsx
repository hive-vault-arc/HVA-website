import type { Metadata } from 'next';
import type {AppLocale} from "@/i18n/config";
import {buildStaticRouteMetadata} from "@/i18n/metadata";
import Capabilities from '@/views/Capabilities';
import JsonLd from '@/components/JsonLd';
import FaqSection from '@/components/FaqSection';
import {getLocalizedFaqs} from '@/i18n/faqs';
import { getFeaturedCapabilityProfiles } from '@/lib/capabilities';
import {getEmployeeProfileBySlug} from '@/lib/employee-profiles';
import {getSolutionProgramMedia} from '@/lib/solution-program-media.server';
import {
  CONTACT_PHONE_E164,
  GLOBAL_KEYWORDS,
  SITE_URL,
  absoluteUrl,
  buildLocalizedBreadcrumbSchema,
  mergeKeywords,
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
  const [capabilities, capabilitiesFaqs, aliProfile, programMedia, tMeta, tNav] = await Promise.all([
    getFeaturedCapabilityProfiles(locale),
    getLocalizedFaqs(locale, 'capabilities'),
    getEmployeeProfileBySlug('ali-amrani', locale),
    getSolutionProgramMedia(locale),
    getTranslations({locale, namespace: 'Metadata.pages.capabilities'}),
    getTranslations({locale, namespace: 'Navigation'}),
  ]);
  const pageUrl = absoluteUrl(localizedPath('/capabilities', locale));
  const capabilitySchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: tMeta('title'),
    alternateName: tNav('capabilities'),
    description: tMeta('description'),
    provider: {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${SITE_URL}/#organization`,
      name: 'Hive Vault Arc',
      url: SITE_URL,
      telephone: CONTACT_PHONE_E164,
      priceRange: '$$',
      image: absoluteUrl('/Images/brand/hva-ai-software-agency-tangier.webp'),
      areaServed: ['Morocco', 'Remote'],
    },
    areaServed: ['Morocco', 'Remote'],
    serviceType: capabilities.map((capability) => capability.title),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: tNav('capabilities'),
      itemListElement: capabilities.map((capability, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Service',
          name: capability.title,
          description: capability.briefLine,
          url: absoluteUrl(
            localizedPath('/capabilities/[slug]', locale, {slug: capability.slug}),
          ),
          serviceType: capability.briefBullets,
          provider: { '@id': `${SITE_URL}/#organization` },
        },
      })),
    },
    availableLanguage: [locale],
    keywords: mergeKeywords(GLOBAL_KEYWORDS, [
      'technology consulting and execution',
      'capabilities and services',
      'transformation roadmap and delivery',
      'long-term systems maintenance partner',
    ]).join(', '),
    url: pageUrl,
    subjectOf: [
      `${SITE_URL}/case-studies/multilingual-whatsapp-ai-agent`,
      `${SITE_URL}/case-studies/top-tier-crm-transformation-program-real-estate-operations`,
      absoluteUrl(localizedPath('/capabilities/solution-programs', locale)),
      absoluteUrl(localizedPath('/capabilities/in-detail', locale)),
      ...capabilities.map((capability) =>
        absoluteUrl(
          localizedPath('/capabilities/[slug]', locale, {slug: capability.slug}),
        ),
      ),
    ],
  };

  const breadcrumbSchema = buildLocalizedBreadcrumbSchema(locale, [
    {name: tNav('home'), pathname: '/'},
    {name: tNav('capabilities'), pathname: '/capabilities'},
  ]);

  return (
    <>
      <JsonLd data={[capabilitySchema, breadcrumbSchema]} />
      <Capabilities
        capabilities={capabilities}
        aliProfileImage={aliProfile?.profileImage}
        aliProfileImageAlt={aliProfile?.profileImageAlt}
        programMedia={programMedia}
      />
      <FaqSection faqs={capabilitiesFaqs.items} heading={capabilitiesFaqs.heading} />
    </>
  );
}
