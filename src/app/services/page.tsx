import type { Metadata } from 'next';
import Services from '../../views/Services';
import JsonLd from '../../components/JsonLd';
import FaqSection from '../../components/FaqSection';
import { SERVICES_FAQS } from '../../data/faqs';
import { GLOBAL_KEYWORDS, SITE_URL, absoluteUrl, buildPageMetadata, mergeKeywords } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'AI Receptionist, Automation, SaaS & Cloud Services in Morocco',
  description:
    'Explore H.V.A service lines: AI receptionist systems, AI analyst reporting, workflow automation, custom software platforms, and cloud reliability engineering.',
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
    'team to automate sales and support workflows',
    'services IA pour entreprise au Maroc',
    'migration CRM et intégration API Maroc',
    'développement application web et mobile entreprise Maroc',
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
    name: 'AI, Automation, Software and Cloud Services',
    provider: {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      // @id links this node to the root organization defined in layout.tsx,
      // so Google treats them as the same entity and inherits all its fields.
      '@id': `${SITE_URL}/#organization`,
      name: 'Hive Vault Arc',
      url: SITE_URL,
      telephone: ['+212688270772', '+212691918296'],
      priceRange: '$$',
      image: absoluteUrl('/Images/hero.webp'),
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Avenue Tarik Ibn Ziad N 38, Etage 6 N 32',
        addressLocality: 'Tangier',
        addressRegion: 'Tanger-Tétouan-Al Hoceïma',
        postalCode: '90000',
        addressCountry: 'MA',
      },
      areaServed: ['Tangier', 'Morocco'],
    },
    areaServed: ['Tangier', 'Morocco'],
    serviceType: [
      'AI Receptionist Systems',
      'AI Analyst Reporting',
      'Workflow Automation',
      'Custom SaaS Engineering',
      'Cloud Infrastructure',
      'CI/CD and DevOps',
    ],
    availableLanguage: ['en', 'fr', 'ar', 'es'],
    keywords: mergeKeywords(GLOBAL_KEYWORDS, [
      'AI receptionist systems',
      'AI analyst and decision intelligence',
      'custom platform development',
      'cloud reliability engineering',
    ]),
    url: 'https://www.hiva.ma/services',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.hiva.ma/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://www.hiva.ma/services',
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

