import type { Metadata } from 'next';
import Capabilities from '../../views/Capabilities';
import JsonLd from '../../components/JsonLd';
import FaqSection from '../../components/FaqSection';
import { CAPABILITIES_FAQS } from '../../data/faqs';
import { getFeaturedCapabilityProfiles } from '../../lib/capabilities';
import {
  CONTACT_PHONE_E164,
  GLOBAL_KEYWORDS,
  SITE_URL,
  absoluteUrl,
  buildBreadcrumbSchema,
  buildPageMetadata,
  mergeKeywords,
} from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Capabilities | Six Service Pillars — Strategy to Operations',
  description:
    'Hive Vault Arc delivers across six integrated service pillars: Strategy & Business Consulting, Technology Consulting, AI & Data Analytics, Software Engineering, Cloud & Infrastructure, and Operations & Managed Services.',
  path: '/capabilities',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'strategy consulting Morocco',
    'technology consulting Morocco',
    'AI data analytics Morocco',
    'software engineering Morocco',
    'cloud infrastructure Morocco',
    'managed operations Morocco',
    'six service pillars technology firm',
    'end-to-end technology delivery Morocco',
  ]),
  alternates: {
    en: '/capabilities',
    fr: '/fr/capabilities',
    ar: '/ar/capabilities',
    es: '/es/capabilities',
    'x-default': '/capabilities',
  },
});

export default async function Page() {
  const capabilities = await getFeaturedCapabilityProfiles();
  const capabilitySchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Hive Vault Arc Capabilities Brief and Solution Preview',
    alternateName: 'Hive Vault Arc Capabilities and Services',
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
      name: 'Hive Vault Arc Capability Pillars',
      itemListElement: capabilities.map((capability, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Service',
          name: capability.title,
          description: capability.briefLine,
          url: `${SITE_URL}/capabilities/${capability.slug}`,
          serviceType: capability.briefBullets,
          provider: { '@id': `${SITE_URL}/#organization` },
        },
      })),
    },
    availableLanguage: ['en', 'fr', 'ar', 'es'],
    keywords: mergeKeywords(GLOBAL_KEYWORDS, [
      'technology consulting and execution',
      'capabilities and services',
      'transformation roadmap and delivery',
      'long-term systems maintenance partner',
    ]).join(', '),
    url: `${SITE_URL}/capabilities`,
    subjectOf: [
      `${SITE_URL}/case-studies/multilingual-whatsapp-ai-agent`,
      `${SITE_URL}/case-studies/top-tier-crm-transformation-program-real-estate-operations`,
      `${SITE_URL}/capabilities/solution-programs`,
      `${SITE_URL}/capabilities/in-detail`,
      ...capabilities.map((capability) => `${SITE_URL}/capabilities/${capability.slug}`),
    ],
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Capabilities', path: '/capabilities' },
  ]);

  return (
    <>
      <JsonLd data={[capabilitySchema, breadcrumbSchema]} />
      <Capabilities capabilities={capabilities} />
      <FaqSection faqs={CAPABILITIES_FAQS} />
    </>
  );
}
