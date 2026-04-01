import type { Metadata } from 'next';
import Industries from '../../views/Industries';
import JsonLd from '../../components/JsonLd';
import { GLOBAL_KEYWORDS, SITE_URL, buildPageMetadata, mergeKeywords } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Industries | Sector-Focused Transformation Programs',
  description:
    'Explore how H.V.A applies consulting, engineering, and transformation delivery across real estate, healthcare, construction, logistics, finance and brokerage, and SME capabilities.',
  path: '/industries',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'industry specific digital transformation',
    'real estate technology consulting Morocco',
    'healthcare systems consulting Morocco',
    'logistics automation consulting Morocco',
    'construction operations digitization',
    'financial services automation Morocco',
    'broker workflow automation Morocco',
    'deal closing sales operations automation',
  ]),
});

export default function IndustriesPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'H.V.A Industries',
    description:
      'Industry-focused transformation programs delivered by H.V.A across real estate, healthcare, construction, logistics, finance and brokerage, and SME operations.',
    url: `${SITE_URL}/industries`,
  };

  return (
    <>
      <JsonLd data={pageSchema} />
      <Industries />
    </>
  );
}
