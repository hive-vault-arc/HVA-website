import type { Metadata } from 'next';
import ServicesInDetail from '../../../views/ServicesInDetail';
import JsonLd from '../../../components/JsonLd';
import FaqSection from '../../../components/FaqSection';
import { SERVICES_FAQS } from '../../../data/faqs';
import { GLOBAL_KEYWORDS, SITE_URL, absoluteUrl, buildPageMetadata, mergeKeywords } from '../../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Services In Detail | Technical Capability Depth and Execution Model',
  description:
    'Deep technical breakdown of H.V.A consulting execution capabilities across architecture, AI, automation, software, cloud, and data operations.',
  path: '/services/in-detail',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'services in detail technology consulting',
    'detailed AI automation services Morocco',
    'digital transformation execution details',
    'consulting and engineering delivery model',
    'cloud and data systems capabilities',
  ]),
});

export default function ServicesInDetailPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'H.V.A Services In Detail',
    provider: {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${SITE_URL}/#organization`,
      name: 'Hive Vault Arc',
      url: SITE_URL,
      telephone: ['+212688270772', '+212691918296'],
      priceRange: '$$',
      image: absoluteUrl('/Images/hva-ai-software-agency-tangier.webp'),
      areaServed: ['Morocco', 'Remote'],
    },
    areaServed: ['Morocco', 'Remote'],
    serviceType: [
      'Technology Consulting',
      'Digital Transformation Advisory',
      'AI Agent Development',
      'Workflow Automation',
      'Custom Software Development',
      'Cloud Infrastructure and Reliability',
      'Data Services and Analytics',
    ],
    availableLanguage: ['en', 'fr', 'ar', 'es'],
    url: `${SITE_URL}/services/in-detail`,
    subjectOf: [
      `${SITE_URL}/services/solution-programs`,
      `${SITE_URL}/case-studies/multilingual-whatsapp-ai-agent`,
      `${SITE_URL}/case-studies/zoho-grade-crm-platform`,
      `${SITE_URL}/case-studies/executive-analytics-control-tower`,
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${SITE_URL}/services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'In Detail',
        item: `${SITE_URL}/services/in-detail`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema]} />
      <ServicesInDetail />
      <FaqSection faqs={SERVICES_FAQS} />
    </>
  );
}
