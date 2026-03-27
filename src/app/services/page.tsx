import type { Metadata } from 'next';
import Services from '../../views/Services';
import JsonLd from '../../components/JsonLd';
import FaqSection from '../../components/FaqSection';
import { SERVICES_FAQS } from '../../data/faqs';
import { GLOBAL_KEYWORDS, SITE_URL, absoluteUrl, buildPageMetadata, mergeKeywords } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Services | AI Business Transformation Consulting and Engineering',
  description:
    'H.V.A provides consulting, solution design, implementation, and operations support for AI agents, CRM systems, workflow automation, custom software, mobile apps, SaaS, and cloud reliability.',
  path: '/services',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'AI receptionist implementation for businesses',
    'AI analyst dashboards for executives',
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
    'AI system implementation Morocco',
    'team to automate sales and support workflows',
    'services IA pour entreprise au Maroc',
    'migration CRM et integration API Maroc',
    'developpement application web et mobile entreprise Maroc',
    'خدمات استقبال ذكي وتحليل أعمال بالذكاء الاصطناعي',
    'ترحيل CRM وتكامل الأنظمة في المغرب',
    'desarrollo de software empresarial y automatizacion marruecos',
    'migracion de sistemas legacy a cloud en marruecos',
  ]),
  alternates: {
    en: '/en/services',
    fr: '/fr/services',
    ar: '/ar/services',
    es: '/es/services',
    'x-default': '/en/services',
  },
});

export default function Page() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Business Transformation and Systems Engineering',
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
      'Business Transformation Consulting',
      'AI Agent Development',
      'CRM Systems Engineering',
      'Workflow Automation',
      'Custom Software Development',
      'Mobile and Web App Engineering',
      'Cloud Reliability Advisory',
      'CI/CD and DevOps',
    ],
    availableLanguage: ['en', 'fr', 'ar', 'es'],
    keywords: mergeKeywords(GLOBAL_KEYWORDS, [
      'AI receptionist systems',
      'AI analyst and decision intelligence',
      'production AI systems',
      'custom software development',
      'cloud reliability engineering',
    ]).join(', '),
    url: `${SITE_URL}/services`,
    subjectOf: [
      `${SITE_URL}/case-studies/multilingual-whatsapp-ai-agent`,
      `${SITE_URL}/case-studies/zoho-grade-crm-platform`,
      `${SITE_URL}/case-studies/executive-analytics-control-tower`,
      `${SITE_URL}/products-systems`,
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
