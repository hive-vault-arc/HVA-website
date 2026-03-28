import type { Metadata } from 'next';
import Portfolio from '../../views/Portfolio';
import FaqSection from '../../components/FaqSection';
import JsonLd from '../../components/JsonLd';
import { PORTFOLIO_FAQS } from '../../data/faqs';
import { GLOBAL_KEYWORDS, SITE_URL, buildPageMetadata, mergeKeywords } from '../../lib/seo';
import { getAllCaseStudies } from '../../lib/proof';

export const metadata: Metadata = buildPageMetadata({
  title: 'Portfolio | Transformation Engagements and Delivery Outcomes',
  description:
    'Explore consulting-led transformation engagements delivered by H.V.A across AI operations, CRM modernization, analytics, software engineering, and cloud reliability.',
  path: '/portfolio',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'digital transformation portfolio Morocco',
    'technology consulting case examples',
    'software development portfolio Tangier',
    'mobile app case studies Morocco',
    'web app case studies Morocco',
    'cloud migration case studies Morocco',
    'CRM automation project examples Morocco',
    'portfolio projets IA maroc',
    'etudes de cas developpement logiciel maroc',
    'أعمال برمجية وذكاء اصطناعي المغرب',
    'دراسات حالة تطوير تطبيقات في المغرب',
    'portafolio desarrollo software marruecos',
    'casos de exito automatizacion y ia marruecos',
  ]),
});

export default function Page() {
  const caseStudies = getAllCaseStudies();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${SITE_URL}/portfolio` },
    ],
  };

  const caseItemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'H.V.A Transformation Outcomes',
    itemListElement: caseStudies.map((study, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: study.title,
      url: `${SITE_URL}/case-studies/${study.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema, caseItemListSchema]} />
      <Portfolio />
      <FaqSection faqs={PORTFOLIO_FAQS} />
    </>
  );
}
