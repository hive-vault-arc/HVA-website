import type { Metadata } from 'next';
import Home from '../views/Home';
import JsonLd from '../components/JsonLd';
import FaqSection from '../components/FaqSection';
import { HOME_FAQS } from '../data/faqs';
import { GLOBAL_KEYWORDS, buildPageMetadata, mergeKeywords } from '../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'AI Agents, Custom Software & Cloud Engineering in Tangier, Morocco',
  description:
    'H.V.A designs AI agents, custom software platforms, workflow automations, and cloud systems for businesses in Tangier and across Morocco.',
  path: '/',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'hire AI agency in Tangier',
    'best company to build custom software in Morocco',
    'who can build a custom mobile app for my company in Morocco',
    'need a team to develop web app for my business in Tangier',
    'AI and automation partner for SMEs in Morocco',
    'digital transformation partner Tangier',
    'software and cloud engineering agency Morocco',
    'AI software company Tangier',
    'agence pour créer application sur mesure au Maroc',
    'entreprise pour développer application mobile Tanger',
    'besoin d’une équipe pour application web sur mesure Maroc',
    'شركة لتطوير تطبيق مخصص في المغرب',
    'شركة لبناء تطبيق موبايل للشركات طنجة',
    'agencia para crear app personalizada en marruecos',
    'empresa para desarrollar app movil a medida en tanger',
  ]),
  alternates: {
    en: '/en',
    fr: '/fr',
    ar: '/ar',
    es: '/es',
    'x-default': '/en',
  },
});

export default function Page() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'H.V.A',
    url: 'https://www.hiva.ma/',
    inLanguage: ['en', 'fr', 'ar', 'es'],
    keywords: mergeKeywords(GLOBAL_KEYWORDS, [
      'AI receptionist',
      'AI analyst',
      'custom mobile app development',
      'custom web app development',
      'CRM migration',
      'cloud deployment',
    ]),
  };

  return (
    <>
      <JsonLd data={websiteSchema} />
      <Home />
      <FaqSection faqs={HOME_FAQS} />
    </>
  );
}

