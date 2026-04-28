import type { Metadata } from 'next';
import Capabilities from '../../views/Capabilities';
import JsonLd from '../../components/JsonLd';
import FaqSection from '../../components/FaqSection';
import { CAPABILITIES_FAQS } from '../../data/faqs';
import {
  GLOBAL_KEYWORDS,
  SITE_URL,
  absoluteUrl,
  buildBreadcrumbSchema,
  buildPageMetadata,
  mergeKeywords,
} from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Capabilities | 8 Capability Domains and Solution Program Overview',
  description:
    'Concise capabilities overview across AI systems, transformation, consulting, engineering, data and growth, cybersecurity, and emerging tech with a BOT delivery model snapshot. Our capabilities are our services.',
  path: '/capabilities',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'technology consulting capabilities Morocco',
    'technology consulting services Morocco',
    'digital transformation capabilities Tangier',
    'digital transformation services Tangier',
    'IT strategy and architecture consulting',
    'AI transformation consulting',
    'custom CRM development and migration',
    'ERP and CRM integration capabilities',
    'workflow automation for operations teams',
    'devops and CI/CD setup for product teams',
    'cloud migration and deployment partner',
    'mobile app development for companies',
    'web app development for internal operations',
    'migration from legacy systems to modern cloud',
    'capability partner for app deployment Morocco',
    'IT consulting engineering team Morocco',
    'custom software and maintenance capabilities',
    'team to automate sales and support workflows',
    'consulting-led solution programs',
    'cybersecurity and digital risk consulting',
    'emerging technologies advisory',
    'deep tech implementation capabilities',
    'internet of things consulting and delivery',
    'build operate transfer model technology projects',
    'digital ecosystems strategy',
    'agile at scale transformation',
    'data and digital platform strategy',
    'capacites IA pour entreprise au Maroc',
    'migration CRM et integration API Maroc',
    'developpement application web et mobile entreprise Maroc',
    'قدرات استقبال ذكي وتحليل أعمال بالذكاء الاصطناعي',
    'ترحيل CRM وتكامل الأنظمة في المغرب',
    'capacidades de software empresarial y automatizacion marruecos',
    'migracion de sistemas legacy a cloud en marruecos',
    'capacidades y servicios para empresas en marruecos',
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
    name: 'H.V.A Capabilities Brief and Solution Preview',
    alternateName: 'H.V.A Capabilities and Services',
    provider: {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${SITE_URL}/#organization`,
      name: 'Hive Vault Arc',
      url: SITE_URL,
      telephone: ['+212688270772', '+212691918296'],
      priceRange: '$$',
      image: absoluteUrl('/Images/brand/hva-ai-software-agency-tangier.webp'),
      areaServed: ['Morocco', 'Remote'],
    },
    areaServed: ['Morocco', 'Remote'],
    serviceType: [
      'Technology Consulting',
      'Business Transformation',
      'Digital Transformation Advisory',
      'Digital, Technology, and Data',
      'Enterprise Architecture',
      'Digital Strategy',
      'Agile at Scale',
      'Tech Function Design',
      'Roadmap Design',
      'AI Agent Development',
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
      'Emerging Technologies',
      'Deep Tech',
      'Internet of Things',
      'Build-Operate-Transfer Delivery Model',
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
      `${SITE_URL}/case-studies/zoho-grade-crm-platform`,
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
