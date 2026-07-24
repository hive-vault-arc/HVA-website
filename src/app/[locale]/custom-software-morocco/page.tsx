import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import type {AppLocale} from '@/i18n/config';
import {buildStaticRouteMetadata} from '@/i18n/metadata';
import {getLocalizedFaqs} from '@/i18n/faqs';
import GeoServicePage, {type GeoPageCopy} from '@/components/GeoServicePage';

type PageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  return buildStaticRouteMetadata(locale, 'customSoftwareMorocco');
}

export default async function CustomSoftwareMoroccoPage({params}: PageProps) {
  const {locale} = await params;
  const [t, faqs] = await Promise.all([
    getTranslations({locale, namespace: 'GeoPages'}),
    getLocalizedFaqs(locale, 'customSoftwareMorocco'),
  ]);

  return (
    <GeoServicePage
      locale={locale}
      pathname="/custom-software-morocco"
      image="/Images/blog/custom-crm-system-morocco.webp"
      copy={t.raw('customSoftwareMorocco') as GeoPageCopy}
      faqs={faqs}
      heroSecondaryHref="/it-consulting-tangier"
      ctaSecondaryHref="/case-studies"
      ctaTertiaryHref="/digital-services-tangier"
    />
  );
}
