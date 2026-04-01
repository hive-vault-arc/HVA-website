import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CapabilitiesSolutionPrograms from '../../../../views/CapabilitiesSolutionPrograms';
import { SUPPORTED_LOCALES, type SupportedLocale, buildPageMetadata } from '../../../../lib/seo';

type LocaleCapabilitiesSolutionProgramsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleCapabilitiesSolutionProgramsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as SupportedLocale)) {
    return {};
  }

  const base = buildPageMetadata({
    title: 'Capability Solution Programs | Consulting-Led Operational Systems',
    description:
      'Explore H.V.A capability solution programs with modules, integrations, delivery model, outcomes, and proof references for production operations.',
    path:
      locale === 'en'
        ? '/capabilities/solution-programs'
        : `/${locale}/capabilities/solution-programs`,
    locale,
    alternates: {
      en: '/capabilities/solution-programs',
      fr: '/fr/capabilities/solution-programs',
      ar: '/ar/capabilities/solution-programs',
      es: '/es/capabilities/solution-programs',
      'x-default': '/capabilities/solution-programs',
    },
  });

  if (locale === 'en') {
    return {
      ...base,
      robots: { index: false, follow: true },
      alternates: { ...(base.alternates ?? {}), canonical: '/capabilities/solution-programs' },
    };
  }

  return base;
}

export default async function LocaleCapabilitiesSolutionProgramsPage({
  params,
}: LocaleCapabilitiesSolutionProgramsPageProps) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as SupportedLocale)) {
    notFound();
  }

  return <CapabilitiesSolutionPrograms />;
}
