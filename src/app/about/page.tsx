import type { Metadata } from 'next';
import About from '../../views/About';
import FaqSection from '../../components/FaqSection';
import JsonLd from '../../components/JsonLd';
import { ABOUT_FAQS } from '../../data/faqs';
import { GLOBAL_KEYWORDS, SITE_URL, buildPageMetadata, mergeKeywords } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'About | Founding Team Behind H.V.A Operational Systems',
  description:
    'H.V.A is a founding-team-led AI-driven business transformation partner in Tangier. The same founders consult, design, build, and operate intelligent systems end to end.',
  path: '/about',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'software engineering team Tangier',
    'AI business transformation team Morocco',
    'company profile software and AI Morocco',
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
    description:
      'Hive Vault Arc (H.V.A) is a founding-team-led AI-driven business transformation partner based in Tangier, Morocco. Built and operated by three engineers with end-to-end ownership.',
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
