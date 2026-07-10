import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '../../../components/JsonLd';
import CapabilityDetail from '../../../views/CapabilityDetail';
import {
  getAllCapabilityProfiles,
  getCapabilityProfileBySlug,
  getRelatedCapabilityProfiles,
} from '../../../lib/capabilities';
import {
  CONTACT_PHONE_E164,
  GLOBAL_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  buildBreadcrumbSchema,
  buildPageMetadata,
  mergeKeywords,
} from '../../../lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const capabilities = await getAllCapabilityProfiles();
  return capabilities.map((capability) => ({ slug: capability.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const capability = await getCapabilityProfileBySlug(slug);

  if (!capability) {
    return {
      title: `Capability | ${SITE_NAME}`,
      robots: { index: false, follow: false },
    };
  }

  const metadata = buildPageMetadata({
    title: capability.seo?.title ?? capability.title,
    description: capability.seo?.description ?? capability.briefLine,
    path: `/capabilities/${capability.slug}`,
    keywords: mergeKeywords(GLOBAL_KEYWORDS, capability.seo?.keywords ?? [], [
      capability.title,
      `${capability.title} Morocco`,
      ...(capability.briefBullets ?? []),
      ...(capability.relatedOutcomes ?? []),
    ]),
  });

  return {
    ...metadata,
    robots: {
      index: !capability.seo?.noIndex,
      follow: !capability.seo?.noIndex,
    },
  };
}

export default async function CapabilityProfilePage({ params }: Props) {
  const { slug } = await params;
  const capability = await getCapabilityProfileBySlug(slug);

  if (!capability) notFound();

  const relatedCapabilities =
    capability.relatedCapabilities.length > 0
      ? capability.relatedCapabilities
      : await getRelatedCapabilityProfiles(capability.slug);
  const capabilityUrl = absoluteUrl(`/capabilities/${capability.slug}`);
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${capabilityUrl}#service`,
    name: capability.title,
    alternateName: capability.shortTitle,
    description: capability.briefLine,
    serviceType: [capability.title, ...capability.briefBullets],
    url: capabilityUrl,
    image: absoluteUrl(capability.heroImage),
    provider: {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${SITE_URL}/#organization`,
      name: 'Hive Vault Arc',
      url: SITE_URL,
      telephone: CONTACT_PHONE_E164,
      image: absoluteUrl('/Images/brand/hva-ai-software-agency-tangier.webp'),
      areaServed: ['Morocco', 'Remote'],
    },
    areaServed: ['Morocco', 'Remote'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${capability.title} coverage`,
      itemListElement: capability.subCapabilities.map((item, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Service',
          name: item,
          provider: { '@id': `${SITE_URL}/#organization` },
        },
      })),
    },
    subjectOf: [
      `${SITE_URL}/capabilities`,
      `${SITE_URL}/capabilities/in-detail#pillar-${capability.slug}`,
      `${SITE_URL}/capabilities/solution-programs`,
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${capabilityUrl}#webpage`,
    name: capability.title,
    description: capability.briefLine,
    url: capabilityUrl,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    mainEntity: {
      '@id': `${capabilityUrl}#service`,
    },
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Capabilities', path: '/capabilities' },
    { name: capability.title, path: `/capabilities/${capability.slug}` },
  ]);

  return (
    <>
      <JsonLd data={[serviceSchema, webPageSchema, breadcrumbSchema]} />
      <CapabilityDetail capability={capability} relatedCapabilities={relatedCapabilities} />
    </>
  );
}
