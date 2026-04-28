import type { Metadata } from 'next';
import Arc from '../../views/Arc';
import JsonLd from '../../components/JsonLd';
import { GLOBAL_KEYWORDS, SITE_URL, buildBreadcrumbSchema, buildPageMetadata, mergeKeywords } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'ARC | Category Framework for Transformation Execution',
  description:
    'ARC is H.V.A’s category framework that combines strategic consulting, engineering execution, and operational evolution for long-term transformation outcomes.',
  path: '/arc',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'ARC transformation framework',
    'consulting and execution model',
    'technology strategy to production',
    'digital transformation operating model',
  ]),
});

export default function ArcPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'ARC Framework',
    description:
      'H.V.A ARC framework: diagnose, engineer, and run transformation programs with accountable execution.',
    url: `${SITE_URL}/arc`,
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'ARC Program', path: '/arc' },
  ]);

  return (
    <>
      <JsonLd data={[pageSchema, breadcrumbSchema]} />
      <Arc />
    </>
  );
}
