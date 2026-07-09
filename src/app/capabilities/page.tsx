import type { Metadata } from 'next';
import Capabilities from '../../views/Capabilities';
import JsonLd from '../../components/JsonLd';
import FaqSection from '../../components/FaqSection';
import { CAPABILITIES_FAQS } from '../../data/faqs';
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

export default function Page() {
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
    serviceType: [
      'Technology Consulting',
      'Business Transformation',
      'Digital Transformation Advisory',
      'Enterprise Architecture',
      'Digital Strategy',
      'Agile at Scale',
      'Tech Function Design',
      'Roadmap Design',
      'Strategy and Business Consulting',
      'AI Agent Development',
      'AI, Data, and Analytics',
      'Workflow Automation',
      'Decision Intelligence',
      'CRM and Systems Engineering',
      'Custom Software Development',
      'Mobile and Web App Engineering',
      'IT Modernization',
      'Cloud Infrastructure and Reliability',
      'CI/CD and DevOps',
      'Data Capabilities and Analytics',
      'Marketing Systems',
      'Cybersecurity and Digital Risk',
      'Operations and Managed Services',
      'ARC Assess Re-engineer Command Delivery Model',
    ],
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
    ],
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Capabilities', path: '/capabilities' },
  ]);

  return (
    <>
      <JsonLd data={[capabilitySchema, breadcrumbSchema]} />
      <Capabilities />
      <FaqSection faqs={CAPABILITIES_FAQS} />
    </>
  );
}
