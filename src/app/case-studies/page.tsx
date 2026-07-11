import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import { getAllCaseStudies } from '../../lib/proof';
import {
  SITE_URL,
  absoluteUrl,
  buildBreadcrumbSchema,
  buildPageMetadata,
  mergeKeywords,
  GLOBAL_KEYWORDS,
} from '../../lib/seo';
import CaseStudies from '../../views/CaseStudies';

export const metadata: Metadata = buildPageMetadata({
  title: 'Case Studies | Consulting-Led Digital Transformation Outcomes',
  description:
      'Case studies from Hive Vault Arc documenting consulting strategy, engineering delivery, and reported operating impact.',
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

export default async function CaseStudiesPage() {
  const studies = await getAllCaseStudies();

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Hive Vault Arc Case Studies',
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
    name: 'Hive Vault Arc Case Studies',
    description:
      'Consulting-led transformation deployments delivered by Hive Vault Arc across AI operations, CRM architecture, and executive analytics systems.',
    url: `${SITE_URL}/case-studies`,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
  };
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Case Studies', path: '/case-studies' },
  ]);

  return (
    <>
      <JsonLd data={[itemListSchema, collectionSchema, breadcrumbSchema]} />
      <CaseStudies studies={studies} />
    </>
  );
}
