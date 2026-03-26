import type { Metadata } from 'next';
import About from '../../views/About';
import FaqSection from '../../components/FaqSection';
import JsonLd from '../../components/JsonLd';
import { ABOUT_FAQS } from '../../data/faqs';
import { GLOBAL_KEYWORDS, SITE_URL, buildPageMetadata, mergeKeywords } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'About | AI and Software Engineering Team in Tangier',
  description:
    'H.V.A is a founding-team-led engineering firm in Tangier. Our founders design and build every project — no account managers, no handoffs, no surprises.',
  path: '/about',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'software engineering team Tangier',
    'AI agency Morocco',
    'company profile software and AI Morocco',
    'team for custom software projects Morocco',
    'équipe ingénierie logicielle Tanger',
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
      'Hive Vault Arc (H.V.A) is a founding-team-led AI and software engineering firm based in Tangier, Morocco. Founded by three engineers with end-to-end ownership from system design to cloud deployment.',
    mainEntity: {
      '@type': ['LocalBusiness', 'ProfessionalService'],
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

