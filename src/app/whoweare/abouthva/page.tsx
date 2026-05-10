import type { Metadata } from 'next';
import About from '../../../views/About';
import FaqSection from '../../../components/FaqSection';
import JsonLd from '../../../components/JsonLd';
import { ABOUT_FAQS } from '../../../data/faqs';
import { GLOBAL_KEYWORDS, SITE_URL, buildBreadcrumbSchema, buildPageMetadata, mergeKeywords } from '../../../lib/seo';
import { CANONICAL_MARKET_IDENTITY } from '../../../lib/positioning';

export const metadata: Metadata = buildPageMetadata({
  title: 'About H.V.A | Technology Transformation Partner — Tangier, Morocco',
  description:
    'Hive Vault Arc (H.V.A) is a technology transformation partner based in Tangier, Morocco — combining strategy, AI engineering, software development, cloud infrastructure, and managed operations in one team.',
  path: '/whoweare/abouthva',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'software engineering team Tangier',
    'digital transformation consulting team Morocco',
    'technology advisory firm Morocco',
    'team for custom software projects Morocco',
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
    name: 'About H.V.A',
    url: `${SITE_URL}/whoweare/abouthva`,
    description: CANONICAL_MARKET_IDENTITY.longDescriptor,
    mainEntity: {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${SITE_URL}/#organization`,
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
