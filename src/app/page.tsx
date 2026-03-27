import type { Metadata } from 'next';
import Home from '../views/Home';
import JsonLd from '../components/JsonLd';
import FaqSection from '../components/FaqSection';
import { HOME_FAQS } from '../data/faqs';
import { GLOBAL_KEYWORDS, SITE_URL, buildPageMetadata, mergeKeywords } from '../lib/seo';

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: 'AI-Driven Business Transformation Partner | AI Business Operating Systems',
    description:
      'Hive Vault Arc is an AI-driven business transformation partner that designs, builds, and operates intelligent systems that run core business operations. We redesign and automate how businesses operate through consulting, AI agents, CRM, custom software, mobile apps, and SaaS systems.',
    path: '/',
    keywords: mergeKeywords(GLOBAL_KEYWORDS, [
      'AI business operating systems Morocco',
      'AI-driven business transformation partner',
      'operational systems consulting',
      'real estate operating system',
      'clinic operating system',
      'construction operations system',
      'digital operating system for SMEs',
      'agence pour creer application sur mesure au Maroc',
      'entreprise pour developper application mobile Tanger',
      "besoin d'une equipe pour application web sur mesure Maroc",
      'شركة لتطوير تطبيق مخصص في المغرب',
      'شركة لبناء تطبيق موبايل للشركات طنجة',
      'agencia para crear app personalizada en marruecos',
      'empresa para desarrollar app movil a medida en tanger',
    ]),
    alternates: {
      en: '/',
      fr: '/fr',
      ar: '/ar',
      es: '/es',
      'x-default': '/',
    },
  }),
  title: {
    absolute: 'H.V.A | AI-Driven Business Transformation Partner',
  },
};

export default function Page() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'H.V.A',
    url: `${SITE_URL}/`,
    inLanguage: ['en', 'fr', 'ar', 'es'],
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
    keywords: mergeKeywords(GLOBAL_KEYWORDS, [
      'AI business operating systems',
      'business transformation consulting',
      'AI operational systems',
    ]),
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'Service'],
    name: 'H.V.A AI Business Transformation Services',
    provider: {
      '@id': `${SITE_URL}/#organization`,
    },
    description:
      'Consulting, engineering, and operations support to design, build, and run AI business operating systems.',
    serviceType: [
      'AI Business Operating Systems',
      'Business Transformation Consulting',
      'AI Agent Development',
      'CRM Systems Engineering',
      'Custom Software Development',
      'Mobile App Development',
      'SaaS Development',
      'Workflow Automation',
    ],
    areaServed: ['Morocco', 'Remote'],
    availableLanguage: ['en', 'fr', 'ar', 'es'],
    url: `${SITE_URL}/services`,
  };

  return (
    <>
      <JsonLd data={[websiteSchema, serviceSchema]} />
      <Home />
      <FaqSection faqs={HOME_FAQS} />
    </>
  );
}
