import type { Metadata } from 'next';
import About from '../../../views/About';
import FaqSection from '../../../components/FaqSection';
import JsonLd from '../../../components/JsonLd';
import { ABOUT_FAQS } from '../../../data/faqs';
import { GLOBAL_KEYWORDS, SITE_URL, buildBreadcrumbSchema, buildPageMetadata, mergeKeywords } from '../../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'About H.V.A | Technology Transformation Partner — Tangier, Morocco',
  description:
    'Hive Vault Arc (H.V.A) is a technology transformation partner based in Tangier, Morocco. We combine strategy consulting, AI engineering, software development, cloud infrastructure, and managed operations in one founder-led team — from first whiteboard to production operations. No handoffs.',
  path: '/whoweare/abouthva',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'technology transformation partner Morocco',
    'software engineering team Tangier',
    'digital transformation consulting team Morocco',
    'technology advisory firm Morocco',
    'ARC framework assess re-engineer command',
    'AI engineering firm Morocco',
    'managed operations technology Morocco',
    'founder-led technology firm Morocco',
    'six service pillars technology transformation',
    'what is Hive Vault Arc',
    'who founded HVA Morocco',
    'equipe ingenierie logicielle Tanger',
    'agence software et cloud Maroc',
    'فريق هندسة برمجيات طنجة',
    'شركة متخصصة في الذكاء الاصطناعي والبرمجيات المغرب',
    'equipo de ingenieria de software tanger',
    'agencia de software e ia en marruecos',
  ]),
});

export default function Page() {
  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About H.V.A — Technology Transformation Partner',
    url: `${SITE_URL}/whoweare/abouthva`,
    description:
      'Hive Vault Arc (H.V.A) is a technology transformation partner based in Tangier, Morocco combining strategy, AI engineering, software development, cloud infrastructure, and managed operations.',
    mainEntity: {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${SITE_URL}/#organization`,
      name: 'Hive Vault Arc',
      alternateName: 'H.V.A',
      description:
        'Technology transformation partner — strategy consulting, AI engineering, software development, cloud infrastructure, and managed operations delivered by one founder-led team.',
      foundingLocation: 'Tangier, Morocco',
      areaServed: ['Morocco', 'France', 'Europe', 'MENA'],
      knowsAbout: [
        'Technology Transformation',
        'AI Engineering',
        'Strategy Consulting',
        'Software Development',
        'Cloud Infrastructure',
        'Managed Operations',
      ],
    },
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'About H.V.A', path: '/whoweare/abouthva' },
  ]);

  return (
    <>
      <JsonLd data={[aboutPageSchema, breadcrumbSchema]} />
      <About />
      <FaqSection faqs={ABOUT_FAQS} />
    </>
  );
}
