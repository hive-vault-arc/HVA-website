import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import type {AppLocale} from '@/i18n/config';
import {buildStaticRouteMetadata} from '@/i18n/metadata';
import {getLocalizedFaqs} from '@/i18n/faqs';
import GeoServicePage, {type GeoPageCopy} from '@/components/GeoServicePage';

type PageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  return buildStaticRouteMetadata(locale, 'itConsultingTangier');
}

export default async function ITConsultingTangierPage({params}: PageProps) {
  const {locale} = await params;
  const [t, faqs] = await Promise.all([
    getTranslations({locale, namespace: 'GeoPages'}),
    getLocalizedFaqs(locale, 'itConsultingTangier'),
  ]);

  return (
    <GeoServicePage
      locale={locale}
      pathname="/it-consulting-tangier"
      image="/Images/hero/strategic-technology-consulting-tangier-morocco.webp"
      copy={t.raw('itConsultingTangier') as GeoPageCopy}
      faqs={faqs}
      heroSecondaryHref="/arc"
      ctaSecondaryHref="/arc"
      ctaTertiaryHref="/digital-services-tangier"
      tangier
    />
  );
}
