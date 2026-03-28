import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import { getAllCaseStudies } from '../../lib/proof';
import { SITE_URL, buildPageMetadata, mergeKeywords, GLOBAL_KEYWORDS, absoluteUrl } from '../../lib/seo';
import CaseStudies from '../../views/CaseStudies';

export const metadata: Metadata = buildPageMetadata({
  title: 'Case Studies | Consulting-Led Digital Transformation Outcomes',
  description:
    'Verified case studies from H.V.A showing consulting strategy translated into real engineering delivery, production deployment, and measurable operating impact.',
  path: '/case-studies',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'digital transformation case studies Morocco',
    'technology consulting case studies',
    'WhatsApp AI agent case study',
    'CRM modernization case study Morocco',
    'analytics dashboard system case study',
    'IT consulting and engineering outcomes',
  ]),
});

export default function CaseStudiesPage() {
  const studies = getAllCaseStudies();

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'H.V.A Case Studies',
    itemListElement: studies.map((study, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: study.title,
      url: absoluteUrl(`/case-studies/${study.slug}`),
    })),
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'H.V.A Case Studies',
    description:
      'Consulting-led transformation deployments delivered by H.V.A across AI operations, CRM architecture, and executive analytics systems.',
    url: `${SITE_URL}/case-studies`,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
  };

  return (
    <>
      <JsonLd data={[itemListSchema, collectionSchema]} />
      <CaseStudies />
    </>
  );
}
