import type { Metadata } from 'next';
import JsonLd from '../../../components/JsonLd';
import { PRODUCT_SYSTEMS } from '../../../lib/proof';
import { SITE_URL, buildPageMetadata, mergeKeywords, GLOBAL_KEYWORDS, absoluteUrl } from '../../../lib/seo';
import ProductsSystems from '../../../views/ProductsSystems';

export const metadata: Metadata = buildPageMetadata({
  title: 'Solutions Programs | Services',
  description:
    'Explore consulting-led solution programs delivered by H.V.A across customer operations, CRM modernization, executive analytics, automation, and cloud reliability.',
  path: '/services/solutions',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'consulting-led solution programs',
    'technology consulting accelerators',
    'AI and software systems engineering',
    'custom CRM modernization programs',
  ]),
});

export default function ServicesSolutionsPage() {
  const systemsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'H.V.A Service Solution Programs',
    itemListElement: PRODUCT_SYSTEMS.map((system, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: system.name,
        serviceType: system.category,
        areaServed: ['Morocco', 'Remote'],
        provider: {
          '@id': `${SITE_URL}/#organization`,
        },
        description: `${system.modules.join(', ')}. Outcomes: ${system.outcomes.join(', ')}.`,
      },
    })),
  };

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'H.V.A Service Solutions',
    description:
      'Consulting-led AI and software solution programs designed, built, and operated by H.V.A for production operations.',
    url: absoluteUrl('/services/solutions'),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
      { '@type': 'ListItem', position: 3, name: 'Solutions', item: `${SITE_URL}/services/solutions` },
    ],
  };

  return (
    <>
      <JsonLd data={[systemsSchema, pageSchema, breadcrumbSchema]} />
      <ProductsSystems />
    </>
  );
}
