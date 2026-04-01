import type { Metadata } from 'next';
import CapabilitiesInDetail from '../../../views/CapabilitiesInDetail';
import JsonLd from '../../../components/JsonLd';
import FaqSection from '../../../components/FaqSection';
import { CAPABILITIES_FAQS } from '../../../data/faqs';
import { GLOBAL_KEYWORDS, SITE_URL, absoluteUrl, buildPageMetadata, mergeKeywords } from '../../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Capabilities In Detail | Full Capability Architecture and BOT Delivery Model',
  description:
    'Full capability depth across 8 capability domains including AI systems, transformation, consulting, engineering, data and growth, cybersecurity, emerging tech, and Build-Operate-Transfer delivery. Our capabilities are our services.',
  path: '/capabilities/in-detail',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'capabilities in detail technology consulting',
    'services in detail technology consulting',
    'detailed AI automation capabilities Morocco',
    'digital transformation execution details',
    'consulting and engineering delivery model',
    'cloud and data systems capabilities',
    'cybersecurity digital risk capabilities',
    'deep tech and IoT capability architecture',
    'build operate transfer technology delivery',
    'digital ecosystems and tech function advisory',
    'agile at scale transformation support',
  ]),
});

export default function CapabilitiesInDetailPage() {
  const capabilitySchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'H.V.A Capabilities In Detail',
    alternateName: 'H.V.A Services In Detail',
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
      'Business Transformation',
      'Digital Transformation Advisory',
      'Digital, Technology, and Data',
      'Digital Strategy',
      'Agile at Scale',
      'Tech Function Design',
      'Roadmap Architecture',
      'AI Agent Development',
      'Workflow Automation',
      'Decision Intelligence',
      'Custom Software Development',
      'Web and Mobile Engineering',
      'SaaS Platform Engineering',
      'Cloud Infrastructure and Reliability',
      'IT Modernization',
      'Data Capabilities and Analytics',
      'Marketing Systems',
      'Cybersecurity and Digital Risk',
      'Emerging Technologies',
      'Deep Tech',
      'Internet of Things',
      'Build-Operate-Transfer Delivery Model',
    ],
    availableLanguage: ['en', 'fr', 'ar', 'es'],
    url: `${SITE_URL}/capabilities/in-detail`,
    subjectOf: [
      `${SITE_URL}/capabilities/solution-programs`,
      `${SITE_URL}/case-studies/multilingual-whatsapp-ai-agent`,
      `${SITE_URL}/case-studies/zoho-grade-crm-platform`,
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
        name: 'Capabilities',
        item: `${SITE_URL}/capabilities`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'In Detail',
        item: `${SITE_URL}/capabilities/in-detail`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={[capabilitySchema, breadcrumbSchema]} />
      <CapabilitiesInDetail />
      <FaqSection faqs={CAPABILITIES_FAQS} />
    </>
  );
}

