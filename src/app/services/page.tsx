import type { Metadata } from 'next';
import Services from '../../views/Services';
import JsonLd from '../../components/JsonLd';
import FaqSection from '../../components/FaqSection';
import { SERVICES_FAQS } from '../../data/faqs';
import { GLOBAL_KEYWORDS, SITE_URL, absoluteUrl, buildPageMetadata, mergeKeywords } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Services | 8 Service Domains and Solution Program Overview',
  description:
    'Concise services overview across AI systems, transformation, consulting, engineering, data and growth, cybersecurity, and emerging tech with a BOT delivery model snapshot.',
  path: '/services',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'technology consulting services Morocco',
    'digital transformation services Tangier',
    'IT strategy and architecture consulting',
    'AI transformation consulting',
    'custom CRM development and migration',
    'ERP and CRM integration services',
    'workflow automation for operations teams',
    'devops and CI/CD setup for product teams',
    'cloud migration and deployment partner',
    'mobile app development for companies',
    'web app development for internal operations',
    'migration from legacy systems to modern cloud',
    'service company for app deployment Morocco',
    'IT consulting engineering team Morocco',
    'custom software and maintenance services',
    'team to automate sales and support workflows',
    'consulting-led solution programs',
    'cybersecurity and digital risk consulting',
    'emerging technologies advisory',
    'deep tech implementation services',
    'internet of things consulting and delivery',
    'build operate transfer model technology projects',
    'digital ecosystems strategy',
    'agile at scale transformation',
    'data and digital platform strategy',
    'services IA pour entreprise au Maroc',
    'migration CRM et integration API Maroc',
    'developpement application web et mobile entreprise Maroc',
    'خدمات استقبال ذكي وتحليل أعمال بالذكاء الاصطناعي',
    'ترحيل CRM وتكامل الأنظمة في المغرب',
    'desarrollo de software empresarial y automatizacion marruecos',
    'migracion de sistemas legacy a cloud en marruecos',
  ]),
  alternates: {
    en: '/services',
    fr: '/fr/services',
    ar: '/ar/services',
    es: '/es/services',
    'x-default': '/services',
  },
});

export default function Page() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'H.V.A Services Brief and Solution Preview',
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
      'Data Services and Analytics',
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
      'transformation roadmap and delivery',
      'long-term systems maintenance partner',
    ]).join(', '),
    url: `${SITE_URL}/services`,
    subjectOf: [
      `${SITE_URL}/case-studies/multilingual-whatsapp-ai-agent`,
      `${SITE_URL}/case-studies/zoho-grade-crm-platform`,
      `${SITE_URL}/services/solution-programs`,
      `${SITE_URL}/services/in-detail`,
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
    ],
  };

  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema]} />
      <Services />
      <FaqSection faqs={SERVICES_FAQS} />
    </>
  );
}
