import type { Metadata } from 'next';
import About from '../../views/About';
import FaqSection from '../../components/FaqSection';
import JsonLd from '../../components/JsonLd';
import { ABOUT_FAQS } from '../../data/faqs';
import { GLOBAL_KEYWORDS, SITE_URL, buildPageMetadata, mergeKeywords } from '../../lib/seo';
import { CANONICAL_MARKET_IDENTITY } from '../../lib/positioning';

export const metadata: Metadata = buildPageMetadata({
  title: 'About | Technology Consulting and Transformation Partner',
  description:
    'Meet the H.V.A team: a consulting-led digital transformation firm in Tangier that combines strategy, architecture, engineering delivery, and long-term operations ownership.',
  path: '/about',
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
    url: `${SITE_URL}/about`,
    description: CANONICAL_MARKET_IDENTITY.longDescriptor,
    mainEntity: {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${SITE_URL}/#organization`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
    ],
  };

  return (
    <>
      <JsonLd data={[aboutPageSchema, breadcrumbSchema]} />
      <About />
      <FaqSection faqs={ABOUT_FAQS} />
    </>
  );
}
