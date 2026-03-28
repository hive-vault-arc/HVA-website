import type { Metadata } from 'next';
import Home from '../views/Home';
import JsonLd from '../components/JsonLd';
import FaqSection from '../components/FaqSection';
import { HOME_FAQS } from '../data/faqs';
import { GLOBAL_KEYWORDS, SITE_URL, buildPageMetadata, mergeKeywords } from '../lib/seo';
import { CANONICAL_MARKET_IDENTITY } from '../lib/positioning';

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: 'Technology Consulting and Digital Transformation Firm',
    description: CANONICAL_MARKET_IDENTITY.longDescriptor,
    path: '/',
    keywords: mergeKeywords(GLOBAL_KEYWORDS, [
      'technology consulting firm Tangier',
      'digital transformation partner Morocco',
      'end-to-end consulting and technical execution',
      'AI automation consulting Morocco',
      'custom software and IT modernization',
      'long-term technology partner',
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
    absolute: 'H.V.A | Technology Consulting and Digital Transformation Firm',
  },
};

export default function Page() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'Service'],
    name: 'H.V.A Technology Consulting and Digital Transformation Services',
    provider: {
      '@id': `${SITE_URL}/#organization`,
    },
    description:
      'Consulting-led transformation programs combining strategy, architecture, engineering delivery, and ongoing operations support.',
    serviceType: [
      'Technology Consulting',
      'Digital Transformation',
      'IT Advisory and Architecture',
      'AI Agent Development',
      'AI Automation',
      'CRM and Systems Engineering',
      'Custom Software Development',
      'Mobile App Development',
      'Cloud Infrastructure',
      'Data Services',
    ],
    areaServed: ['Morocco', 'Remote'],
    availableLanguage: ['en', 'fr', 'ar', 'es'],
    url: `${SITE_URL}/services`,
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <Home />
      <FaqSection faqs={HOME_FAQS} />
    </>
  );
}
