import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import { PRODUCT_SYSTEMS } from '../../lib/proof';
import { SITE_URL, buildPageMetadata, mergeKeywords, GLOBAL_KEYWORDS, absoluteUrl } from '../../lib/seo';
import ProductsSystems from '../../views/ProductsSystems';

export const metadata: Metadata = buildPageMetadata({
  title: 'Products and Systems | Consulting-Led Programs by H.V.A',
  description:
    'Explore consulting-led system programs delivered by H.V.A across customer operations, CRM modernization, executive analytics, automation, and cloud reliability.',
  path: '/products-systems',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'consulting-led system programs',
    'technology consulting productized accelerators',
    'AI and software systems engineering',
    'custom CRM product development',
    'IT consulting and system architecture',
  ]),
});

export default function ProductsSystemsPage() {
  const systemsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'H.V.A Consulting-Led System Programs',
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
    name: 'H.V.A Products and Systems',
    description:
      'Consulting-led AI and software system programs designed, built, and operated by H.V.A for production operations.',
    url: absoluteUrl('/products-systems'),
  };

  return (
    <>
      <JsonLd data={[systemsSchema, pageSchema]} />
      <ProductsSystems />
    </>
  );
}
