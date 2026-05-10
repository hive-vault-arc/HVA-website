import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CapabilitiesInDetail from '../../../../views/CapabilitiesInDetail';
import FaqSection from '../../../../components/FaqSection';
import { CAPABILITIES_FAQS } from '../../../../data/faqs';
import { SUPPORTED_LOCALES, type SupportedLocale, buildPageMetadata } from '../../../../lib/seo';

type LocaleCapabilitiesInDetailPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleCapabilitiesInDetailPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as SupportedLocale)) {
    return {};
  }

  const base = buildPageMetadata({
    title: 'Capabilities In Detail | Six Service Pillars and ARC Delivery Model',
    description:
      'Full capability depth across six service pillars: strategy, technology consulting, AI and data, software engineering, cloud infrastructure, and managed operations with ARC delivery.',
    path: locale === 'en' ? '/capabilities/in-detail' : `/${locale}/capabilities/in-detail`,
    locale,
    alternates: {
      en: '/capabilities/in-detail',
      fr: '/fr/capabilities/in-detail',
      ar: '/ar/capabilities/in-detail',
      es: '/es/capabilities/in-detail',
      'x-default': '/capabilities/in-detail',
    },
  });

  if (locale === 'en') {
    return {
      ...base,
      robots: { index: false, follow: true },
      alternates: { ...(base.alternates ?? {}), canonical: '/capabilities/in-detail' },
    };
  }

  return base;
}

export default async function LocaleCapabilitiesInDetailPage({
  params,
}: LocaleCapabilitiesInDetailPageProps) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as SupportedLocale)) {
    notFound();
  }

  return (
    <>
      <CapabilitiesInDetail />
      <FaqSection faqs={CAPABILITIES_FAQS} />
    </>
  );
}
