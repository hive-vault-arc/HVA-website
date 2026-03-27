import type { Metadata } from 'next';
import Home from '../views/Home';
import JsonLd from '../components/JsonLd';
import FaqSection from '../components/FaqSection';
import { HOME_FAQS } from '../data/faqs';
import { GLOBAL_KEYWORDS, SITE_URL, buildPageMetadata, mergeKeywords } from '../lib/seo';

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: 'IT Consulting, AI Product Systems & Software Engineering in Tangier',
    description:
      'H.V.A builds proven AI product systems, full CRM platforms, and cloud software infrastructure with measurable production outcomes for businesses in Morocco.',
    path: '/',
    keywords: mergeKeywords(GLOBAL_KEYWORDS, [
      'hire AI agency in Tangier',
      'IT consulting and AI systems Tangier',
      'AI product builder Morocco',
      'best company to build custom software in Morocco',
      'who can build a custom mobile app for my company in Morocco',
      'need a team to develop web app for my business in Tangier',
      'AI and automation partner for SMEs in Morocco',
      'digital transformation partner Tangier',
      'software and cloud engineering agency Morocco',
      'AI software company Tangier',
      'agence pour cr\u00e9er application sur mesure au Maroc',
      'entreprise pour d\u00e9velopper application mobile Tanger',
      "besoin d'une \u00e9quipe pour application web sur mesure Maroc",
      '\u0634\u0631\u0643\u0629 \u0644\u062a\u0637\u0648\u064a\u0631 \u062a\u0637\u0628\u064a\u0642 \u0645\u062e\u0635\u0635 \u0641\u064a \u0627\u0644\u0645\u063a\u0631\u0628',
      '\u0634\u0631\u0643\u0629 \u0644\u0628\u0646\u0627\u0621 \u062a\u0637\u0628\u064a\u0642 \u0645\u0648\u0628\u0627\u064a\u0644 \u0644\u0644\u0634\u0631\u0643\u0627\u062a \u0637\u0646\u062c\u0629',
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
    absolute: 'H.V.A | AI Agents & Custom Software in Tangier, Morocco',
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
      'AI receptionist',
      'AI analyst',
      'AI product systems',
      'custom mobile app development',
      'custom web app development',
      'CRM migration',
      'cloud deployment',
      'measured software delivery outcomes',
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
