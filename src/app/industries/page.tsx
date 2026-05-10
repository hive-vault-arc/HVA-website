import type { Metadata } from 'next';
import Industries from '../../views/Industries';
import JsonLd from '../../components/JsonLd';
import { GLOBAL_KEYWORDS, SITE_URL, buildBreadcrumbSchema, buildPageMetadata, mergeKeywords } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Industries | 8 Sector-Focused Transformation Verticals',
  description:
    'Explore how H.V.A applies ARC delivery across 8 industry verticals: real estate and construction, healthcare, financial services, government, retail, energy, logistics, and consumer goods.',
  path: '/industries',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'industry specific digital transformation',
    'real estate technology consulting Morocco',
    'healthcare systems consulting Morocco',
    'logistics automation consulting Morocco',
    'construction operations digitization',
    'financial services automation Morocco',
    'government digital transformation Morocco',
    'retail ecommerce platform Morocco',
    'energy sustainability digital Morocco',
    'consumer goods luxury operations Morocco',
  ]),
});

export default function IndustriesPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'H.V.A Industries',
    description:
      'Industry-focused transformation programs delivered by H.V.A across real estate and construction, healthcare and life sciences, financial services, government and public sector, retail and e-commerce, energy and sustainability, logistics and transportation, and consumer goods and luxury.',
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
