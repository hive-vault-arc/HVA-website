import type { Metadata } from 'next';
import JsonLd from '../../../components/JsonLd';
import CapabilitiesSolutionPrograms from '../../../views/CapabilitiesSolutionPrograms';
import { CAPABILITY_SOLUTION_PROGRAM_DETAILS } from '../../../lib/capabilities-content';
import { GLOBAL_KEYWORDS, SITE_URL, buildPageMetadata, mergeKeywords } from '../../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Capability Solution Programs | Consulting-Led Operational Systems',
  description:
    'Explore Hive Vault Arc capability solution programs with modules, integrations, delivery model, outcomes, and proof references for production operations. Our six service pillars are our delivery model.',
  path: '/capabilities/solution-programs',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'capability solution programs technology consulting',
    'service solution programs technology consulting',
    'operational system programs Morocco',
    'consulting led implementation programs',
    'AI CRM analytics solution programs',
  ]),
});

export default function CapabilitiesSolutionProgramsPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Hive Vault Arc Capability Solution Programs',
    alternateName: 'Hive Vault Arc Service Solution Programs',
    itemListElement: CAPABILITY_SOLUTION_PROGRAM_DETAILS.map((program, index) => ({
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
      { '@type': 'ListItem', position: 2, name: 'Capabilities', item: `${SITE_URL}/capabilities` },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Solution Programs',
        item: `${SITE_URL}/capabilities/solution-programs`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={[itemListSchema, breadcrumbSchema]} />
      <CapabilitiesSolutionPrograms />
    </>
  );
}


