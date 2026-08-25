import type { Metadata } from 'next';
import type {AppLocale} from "@/i18n/config";
import {buildStaticRouteMetadata} from "@/i18n/metadata";
import JsonLd from '@/components/JsonLd';
import CapabilitiesSolutionPrograms from '@/views/CapabilitiesSolutionPrograms';
import { CAPABILITY_SOLUTION_PROGRAM_DETAILS } from '@/lib/capabilities-content';
import {
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
  return buildStaticRouteMetadata(locale, "capabilitiesPrograms");
}

export default async function CapabilitiesSolutionProgramsPage({params}: PageProps) {
  const {locale} = await params;
  const [programMedia, tMeta, tNav] = await Promise.all([
    getSolutionProgramMedia(locale),
    getTranslations({locale, namespace: 'Metadata.pages.capabilitiesPrograms'}),
    getTranslations({locale, namespace: 'Navigation'}),
  ]);
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: tMeta('title'),
    alternateName: tNav('solutionPrograms'),
    description: tMeta('description'),
    url: absoluteUrl(localizedPath('/capabilities/solution-programs', locale)),
    inLanguage: locale,
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

  const breadcrumbSchema = buildLocalizedBreadcrumbSchema(locale, [
    {name: tNav('home'), pathname: '/'},
    {name: tNav('capabilities'), pathname: '/capabilities'},
    {
      name: tNav('solutionPrograms'),
      pathname: '/capabilities/solution-programs',
    },
  ]);

  return (
    <>
      <JsonLd data={[itemListSchema, breadcrumbSchema]} />
      <CapabilitiesSolutionPrograms programMedia={programMedia} />
    </>
  );
}


