import type { Metadata } from 'next';
import Portfolio from '../../views/Portfolio';
import FaqSection from '../../components/FaqSection';
import JsonLd from '../../components/JsonLd';
import { PORTFOLIO_FAQS } from '../../data/faqs';
import { GLOBAL_KEYWORDS, SITE_URL, buildPageMetadata, mergeKeywords } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Portfolio | AI, Automation and Software Projects',
  description:
    'AI receptionists, custom CRM systems, cloud infrastructure, and mobile apps delivered for Moroccan businesses. Production-ready work, not prototypes.',
  path: '/portfolio',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'AI project portfolio Morocco',
    'software development portfolio Tangier',
    'mobile app case studies Morocco',
    'web app case studies Morocco',
    'cloud migration case studies Morocco',
    'CRM automation project examples Morocco',
    'portfolio projets IA maroc',
    'études de cas développement logiciel maroc',
    'أعمال برمجية وذكاء اصطناعي المغرب',
    'دراسات حالة تطوير تطبيقات في المغرب',
    'portafolio desarrollo software marruecos',
    'casos de exito automatizacion y ia marruecos',
  ]),
});

export default function Page() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${SITE_URL}/portfolio` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Portfolio />
      <FaqSection faqs={PORTFOLIO_FAQS} />
    </>
  );
}

