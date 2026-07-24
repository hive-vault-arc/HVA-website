import type { Metadata } from 'next';
import type {AppLocale} from "@/i18n/config";
import {buildStaticRouteMetadata} from "@/i18n/metadata";
import Arc from '@/views/Arc';
import FaqSection from '@/components/FaqSection';
import JsonLd from '@/components/JsonLd';
import {getAllCaseStudies} from '@/lib/proof';
import {getLocalizedFaqs} from '@/i18n/faqs';
import {localizedPath} from '@/i18n/route-manifest';
import {SITE_URL, absoluteUrl, buildLocalizedBreadcrumbSchema} from '@/lib/seo';
import {getTranslations} from 'next-intl/server';

type PageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  return buildStaticRouteMetadata(locale, "arc");
}

const ARC_CASE_SLUGS = [
  'top-tier-crm-transformation-program-real-estate-operations',
  'multilingual-whatsapp-ai-agent',
] as const;

export default async function ArcPage({params}: PageProps) {
  const {locale} = await params;
  const [arcFaqs, tArc, tMeta, tNav, caseStudies] = await Promise.all([
    getLocalizedFaqs(locale, 'arc'),
    getTranslations({locale, namespace: 'Arc'}),
    getTranslations({locale, namespace: 'Metadata.pages.arc'}),
    getTranslations({locale, namespace: 'Navigation'}),
    getAllCaseStudies(locale),
  ]);
  const arcCaseStudies = ARC_CASE_SLUGS.map((slug) =>
    caseStudies.find((study) => study.slug === slug)
  ).filter((study): study is (typeof caseStudies)[number] => Boolean(study));
  const pageUrl = absoluteUrl(localizedPath('/arc', locale));

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: tMeta('title'),
    description: tMeta('description'),
    url: pageUrl,
    inLanguage: locale,
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: tMeta('title'),
    serviceType: tArc('label'),
    description: tMeta('description'),
    url: pageUrl,
    availableLanguage: [locale],
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: [
      { '@type': 'Country', name: 'Morocco' },
      { '@type': 'Country', name: 'France' },
      { '@type': 'AdministrativeArea', name: 'Middle East and North Africa' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: tArc('phasesLabel'),
      itemListElement: (tArc.raw('phases') as Array<{title: string}>).map((phase) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: phase.title,
        },
      })),
    },
  };
  const breadcrumbSchema = buildLocalizedBreadcrumbSchema(locale, [
    {name: tNav('home'), pathname: '/'},
    {name: tNav('arc'), pathname: '/arc'},
  ]);

  return (
    <>
      <JsonLd data={[pageSchema, serviceSchema, breadcrumbSchema]} />
      <Arc studies={arcCaseStudies}>
        <FaqSection
          faqs={arcFaqs.items}
          heading={arcFaqs.heading}
        />
      </Arc>
    </>
  );
}
