import type { Metadata } from 'next';
import Home from '../views/Home';
import JsonLd from '../components/JsonLd';
import { buildPageMetadata } from '../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'AI Agents, Custom Software & Cloud Engineering in Tangier, Morocco',
  description:
    'H.V.A designs AI agents, custom software platforms, workflow automations, and cloud systems for businesses in Tangier and across Morocco.',
  path: '/',
  keywords: [
    'AI agents Tangier',
    'AI agents Morocco',
    'custom software solutions Morocco',
    'IT services consultant Tangier',
    'agents IA Tanger',
    'services et conseil informatique Maroc',
    'وكلاء الذكاء الاصطناعي طنجة',
    'حلول برمجية مخصصة المغرب',
    'agentes de ia tanger',
    'desarrollo de software a medida marruecos',
  ],
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
  };

  return (
    <>
      <JsonLd data={websiteSchema} />
      <Home />
    </>
  );
}

