import type { Metadata } from 'next';
import JsonLd from '../../../components/JsonLd';
import ServicesSolutionPrograms from '../../../views/ServicesSolutionPrograms';
import { SOLUTION_PROGRAM_DETAILS } from '../../../lib/services-content';
import { GLOBAL_KEYWORDS, SITE_URL, buildPageMetadata, mergeKeywords } from '../../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Solution Programs | Consulting-Led Operational Systems',
  description:
    'Explore H.V.A solution programs with modules, integrations, delivery model, outcomes, and proof references for production operations.',
  path: '/services/solution-programs',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'solution programs technology consulting',
    'operational system programs Morocco',
    'consulting led implementation programs',
    'AI CRM analytics solution programs',
  ]),
});

export default function ServicesSolutionProgramsPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'H.V.A Solution Programs',
    itemListElement: SOLUTION_PROGRAM_DETAILS.map((program, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: program.name,
        serviceType: program.category,
        description: program.summary,
        provider: { '@id': `${SITE_URL}/#organization` },
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
      { '@type': 'ListItem', position: 3, name: 'Solution Programs', item: `${SITE_URL}/services/solution-programs` },
    ],
  };

  return (
    <>
      <JsonLd data={[itemListSchema, breadcrumbSchema]} />
      <ServicesSolutionPrograms />
    </>
  );
}

