import type { Metadata } from 'next';
import type {AppLocale} from '@/i18n/config';
import {decodeRouteParam, localizedPath} from '@/i18n/route-manifest';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import CapabilityDetail from '@/views/CapabilityDetail';
import {
  getCapabilityProfileBySlug,
  getRelatedCapabilityProfiles,
} from '@/lib/capabilities';
import {
  CONTACT_PHONE_E164,
  GLOBAL_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  buildLocalizedBreadcrumbSchema,
  buildLocalizedPageMetadata,
  mergeKeywords,
} from '@/lib/seo';
import {translationParams, translationRoutes} from '@/lib/localized-content';
import {TranslationTargets} from '@/components/localization/TranslationAvailability';
import {getTranslations} from 'next-intl/server';

type Props = {
  params: Promise<{locale: AppLocale; slug: string}>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {locale, slug: routeSlug} = await params;
  const slug = decodeRouteParam(routeSlug);
  const capability = await getCapabilityProfileBySlug(slug, locale);

  if (!capability) {
    return {
      title: `Capability | ${SITE_NAME}`,
      robots: { index: false, follow: false },
    };
  }

  const metadata = buildLocalizedPageMetadata({
    title: capability.seo?.title ?? capability.title,
    description: capability.seo?.description ?? capability.briefLine,
    pathname: '/capabilities/[slug]',
    locale,
    params: {slug: capability.slug},
    translationParams: translationParams(capability, locale, capability.slug),
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
  const {locale, slug: routeSlug} = await params;
  const slug = decodeRouteParam(routeSlug);
  const capability = await getCapabilityProfileBySlug(slug, locale);

  if (!capability) notFound();

  const [relatedCapabilities, tContent] = await Promise.all([
    capability.relatedCapabilities.length > 0
      ? Promise.resolve(capability.relatedCapabilities)
      : getRelatedCapabilityProfiles(capability.slug, 3, locale),
    getTranslations({locale, namespace: 'DynamicContent'}),
  ]);
  const capabilityUrl = absoluteUrl(
    localizedPath('/capabilities/[slug]', locale, {slug: capability.slug}),
  );
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
      absoluteUrl(localizedPath('/capabilities', locale)),
      `${absoluteUrl(localizedPath('/capabilities/in-detail', locale))}#pillar-${capability.slug}`,
      absoluteUrl(localizedPath('/capabilities/solution-programs', locale)),
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${capabilityUrl}#webpage`,
    name: capability.title,
    description: capability.briefLine,
    url: capabilityUrl,
    inLanguage: locale,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    mainEntity: {
      '@id': `${capabilityUrl}#service`,
    },
  };

  const breadcrumbSchema = buildLocalizedBreadcrumbSchema(locale, [
    {name: tContent('home'), pathname: '/'},
    {name: tContent('capabilities'), pathname: '/capabilities'},
    {
      name: capability.title,
      pathname: '/capabilities/[slug]',
      params: {slug: capability.slug},
    },
  ]);

  return (
    <>
      <TranslationTargets
        routes={translationRoutes(
          capability,
          locale,
          capability.slug,
          '/capabilities/[slug]',
        )}
      />
      <JsonLd data={[serviceSchema, webPageSchema, breadcrumbSchema]} />
      <CapabilityDetail capability={capability} relatedCapabilities={relatedCapabilities} />
    </>
  );
}
