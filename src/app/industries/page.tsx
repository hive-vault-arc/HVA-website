import type { Metadata } from 'next';
import Industries from '../../views/Industries';
import JsonLd from '../../components/JsonLd';
import { GLOBAL_KEYWORDS, SITE_URL, buildBreadcrumbSchema, buildPageMetadata, mergeKeywords } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Industries | Technology Transformation Across 8 Verticals',
  description:
    'Hive Vault Arc operates across 8 industry verticals — Real Estate, Healthcare, Financial Services, Government, Retail, Energy, Logistics, and Consumer Goods — combining domain expertise with strategy, AI engineering, and managed operations.',
  path: '/industries',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'real estate technology transformation Morocco',
    'healthcare digital transformation Morocco',
    'financial services technology Morocco',
    'government digital transformation Morocco Maroc IA 2030',
    'retail ecommerce technology Morocco',
    'energy sustainability technology Morocco',
    'logistics technology Morocco Tanger Med',
    'consumer goods luxury technology Morocco France',
    'industry-specific technology consulting Morocco',
    'secteur immobilier technologie Maroc',
    'transformation digitale secteur santé Maroc',
  ]),
});

export default function IndustriesPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Hive Vault Arc Industries',
    description:
      'Industry-focused transformation programs delivered by Hive Vault Arc across real estate and construction, healthcare and life sciences, financial services, government and public sector, retail and e-commerce, energy and sustainability, logistics and transportation, and consumer goods and luxury.',
    url: `${SITE_URL}/industries`,
  };
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Industries', path: '/industries' },
  ]);

  return (
    <>
      <JsonLd data={[pageSchema, breadcrumbSchema]} />
      <Industries />
    </>
  );
}
