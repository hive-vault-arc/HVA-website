import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import type {AppLocale} from '@/i18n/config';
import {buildStaticRouteMetadata} from '@/i18n/metadata';
import {getLocalizedFaqs} from '@/i18n/faqs';
import GeoServicePage, {type GeoPageCopy} from '@/components/GeoServicePage';

type PageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  return buildStaticRouteMetadata(locale, 'digitalServicesTangier');
}

export default async function DigitalServicesTangierPage({params}: PageProps) {
  const {locale} = await params;
  const [t, faqs] = await Promise.all([
    getTranslations({locale, namespace: 'GeoPages'}),
    getLocalizedFaqs(locale, 'digitalServicesTangier'),
  ]);

  return (
    <GeoServicePage
      locale={locale}
      pathname="/digital-services-tangier"
      image="/Images/hero/digital-transformation-scalable-systems-tangier-morocco.webp"
      copy={t.raw('digitalServicesTangier') as GeoPageCopy}
      faqs={faqs}
      heroSecondaryHref="/capabilities"
      ctaSecondaryHref="/capabilities"
      ctaTertiaryHref="/arc"
      tangier
    />
  );
}
