import type { Metadata } from 'next';
import Arc from '../../views/Arc';
import FaqSection from '../../components/FaqSection';
import JsonLd from '../../components/JsonLd';
import { CASE_STUDIES } from '../../lib/proof';
import { GLOBAL_KEYWORDS, SITE_URL, buildBreadcrumbSchema, buildPageMetadata, mergeKeywords } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'ARC Operating Model | Strategy Through Production',
  description:
    'ARC connects operational diagnosis, system delivery, and production accountability in one loop, with decision gates and documented delivery proof.',
  path: '/arc',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'ARC operating model',
    'assess re-engineer command',
    'technology strategy to production Morocco',
    'closed loop technology transformation',
    'production accountability model',
    'technology transformation proof Morocco',
  ]),
});

const ARC_FAQS = [
  {
    question: 'What happens in Assess?',
    answer:
      'Assess maps the current workflow, system dependencies, decision owners, and measurable target. The output is a constraint map and a decision-ready roadmap before build scope is approved.',
  },
  {
    question: 'What data do we need?',
    answer:
      'We start with the evidence your teams already use: workflow steps, operating metrics, system access, known failure points, and ownership. Missing evidence is documented as a constraint, not replaced with assumptions.',
  },
  {
    question: 'How long to first production proof?',
    answer:
      'Timing is set after Assess, when scope, dependencies, and decision gates are known. The roadmap identifies the shortest production slice that can be delivered and measured safely.',
  },
  {
    question: 'How does ARC work with internal teams?',
    answer:
      'ARC assigns clear ownership between Hive Vault Arc and your internal leaders. Your teams validate operating reality and business impact while the same HVA team carries architecture, delivery, release controls, and agreed production responsibilities.',
  },
  {
    question: 'When is ARC not the right fit?',
    answer:
      'ARC is not the best fit when the need is only temporary staff capacity, a standalone advisory artifact, or a build with no expectation of measurable operating accountability after launch.',
  },
] as const;

const ARC_CASE_SLUGS = [
  'top-tier-crm-transformation-program-real-estate-operations',
  'multilingual-whatsapp-ai-agent',
] as const;

export default function ArcPage() {
  const arcCaseStudies = ARC_CASE_SLUGS.map((slug) =>
    CASE_STUDIES.find((study) => study.slug === slug)
  ).filter((study): study is (typeof CASE_STUDIES)[number] => Boolean(study));

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'ARC Operating Model',
    description:
      'ARC connects operational diagnosis, system delivery, and production accountability through Assess, Re-engineer, and Command.',
    url: `${SITE_URL}/arc`,
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/arc#service`,
    name: 'ARC Technology Transformation Operating Model',
    serviceType: 'Technology transformation strategy, engineering, and managed operations',
    description:
      'A closed-loop operating model that diagnoses operational constraints, delivers production systems, and retains accountability through live operations.',
    url: `${SITE_URL}/arc`,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: [
      { '@type': 'Country', name: 'Morocco' },
      { '@type': 'Country', name: 'France' },
      { '@type': 'AdministrativeArea', name: 'Middle East and North Africa' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'ARC operating phases',
      itemListElement: ['Assess', 'Re-engineer', 'Command'].map((name) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name,
        },
      })),
    },
  };
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'ARC Operating Model', path: '/arc' },
  ]);

  return (
    <>
      <JsonLd data={[pageSchema, serviceSchema, breadcrumbSchema]} />
      <Arc studies={arcCaseStudies}>
        <FaqSection
          faqs={[...ARC_FAQS]}
          heading="Questions buyers ask before an ARC engagement"
        />
      </Arc>
    </>
  );
}
