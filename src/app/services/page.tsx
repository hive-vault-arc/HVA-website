import type { Metadata } from 'next';
import Services from '../../views/Services';
import JsonLd from '../../components/JsonLd';
import { buildPageMetadata } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'AI Receptionist, Automation, SaaS & Cloud Services in Morocco',
  description:
    'Explore H.V.A service lines: AI receptionist systems, AI analyst reporting, workflow automation, custom software platforms, and cloud reliability engineering.',
  path: '/services',
  keywords: [
    'AI receptionist Morocco',
    'AI analyst Morocco',
    'workflow automation Morocco',
    'custom software development Morocco',
    'cloud infrastructure Morocco',
    'agents IA Maroc',
    'automatisation des workflows maroc',
    'موظف استقبال بالذكاء الاصطناعي المغرب',
    'أتمتة سير العمل المغرب',
    'recepcionista con ia marruecos',
    'automatizacion de flujos de trabajo marruecos',
  ],
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
      '@type': 'ProfessionalService',
      name: 'Hive Vault Arc',
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
    </>
  );
}

