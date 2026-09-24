import type { Metadata } from 'next';
import type {AppLocale} from "@/i18n/config";
import {buildStaticRouteMetadata} from "@/i18n/metadata";
import CapabilitiesInDetail from '@/views/CapabilitiesInDetail';
import JsonLd from '@/components/JsonLd';
import FaqSection from '@/components/FaqSection';
import {getLocalizedFaqs} from '@/i18n/faqs';
import {
  CONTACT_PHONE_E164S,
  SITE_URL,
  absoluteUrl,
  buildLocalizedBreadcrumbSchema,
} from '@/lib/seo';
import {localizedPath} from '@/i18n/route-manifest';
import {getTranslations} from 'next-intl/server';
import {getSolutionProgramMedia} from '@/lib/solution-program-media.server';

type PageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  return buildStaticRouteMetadata(locale, "capabilitiesDetail");
}

export default async function CapabilitiesInDetailPage({params}: PageProps) {
  const {locale} = await params;
  const [capabilitiesFaqs, programMedia, tMeta, tNav] = await Promise.all([
    getLocalizedFaqs(locale, 'capabilities'),
    getSolutionProgramMedia(locale),
    getTranslations({locale, namespace: 'Metadata.pages.capabilitiesDetail'}),
    getTranslations({locale, namespace: 'Navigation'}),
  ]);
  const pageUrl = absoluteUrl(localizedPath('/capabilities/in-detail', locale));
  const capabilitySchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: tMeta('title'),
    alternateName: tNav('inDetail'),
    description: tMeta('description'),
    provider: {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${SITE_URL}/#organization`,
      name: 'Hive Vault Arc',
      url: SITE_URL,
      telephone: CONTACT_PHONE_E164S,
      priceRange: '$$',
      image: absoluteUrl('/Images/brand/hva-ai-software-agency-tangier.webp'),
      areaServed: ['Morocco', 'Remote'],
    },
    areaServed: ['Morocco', 'Remote'],
    serviceType: [
      'Technology Consulting',
      'Business Transformation',
      'Digital Transformation Advisory',
      'Digital Strategy',
      'Agile at Scale',
      'Tech Function Design',
      'Roadmap Architecture',
      'Strategy and Business Consulting',
      'Technology Consulting',
      'AI Agent Development',
      'AI, Data, and Analytics',
      'Workflow Automation',
      'Decision Intelligence',
      'Custom Software Development',
      'Web and Mobile Engineering',
      'SaaS Platform Engineering',
      'Cloud Infrastructure and Reliability',
      'IT Modernization',
      'Data Capabilities and Analytics',
      'Marketing Systems',
      'Cybersecurity and Digital Risk',
      'Operations and Managed Services',
      'ARC Assess Re-engineer Command Delivery Model',
    ],
    availableLanguage: [locale],
    url: pageUrl,
    subjectOf: [
      absoluteUrl(localizedPath('/capabilities/solution-programs', locale)),
      `${SITE_URL}/case-studies/multilingual-whatsapp-ai-agent`,
      `${SITE_URL}/case-studies/top-tier-crm-transformation-program-real-estate-operations`,
    ],
  };

  const breadcrumbSchema = buildLocalizedBreadcrumbSchema(locale, [
    {name: tNav('home'), pathname: '/'},
    {name: tNav('capabilities'), pathname: '/capabilities'},
    {name: tNav('inDetail'), pathname: '/capabilities/in-detail'},
  ]);

  return (
    <>
      <JsonLd data={[capabilitySchema, breadcrumbSchema]} />
      <CapabilitiesInDetail programMedia={programMedia} />
      <FaqSection faqs={capabilitiesFaqs.items} heading={capabilitiesFaqs.heading} />
    </>
  );
}
