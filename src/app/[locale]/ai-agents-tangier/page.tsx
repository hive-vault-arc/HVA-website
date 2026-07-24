import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import type {AppLocale} from '@/i18n/config';
import {buildStaticRouteMetadata} from '@/i18n/metadata';
import {getLocalizedFaqs} from '@/i18n/faqs';
import GeoServicePage, {type GeoPageCopy} from '@/components/GeoServicePage';

type PageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  return buildStaticRouteMetadata(locale, 'aiAgentsTangier');
}

export default async function AIAgentsTangierPage({params}: PageProps) {
  const {locale} = await params;
  const [t, faqs] = await Promise.all([
    getTranslations({locale, namespace: 'GeoPages'}),
    getLocalizedFaqs(locale, 'aiAgentsTangier'),
  ]);

  return (
    <GeoServicePage
      locale={locale}
      pathname="/ai-agents-tangier"
      image="/Images/hero/ai-powered-transformation-operations-tangier-morocco.webp"
      copy={t.raw('aiAgentsTangier') as GeoPageCopy}
      faqs={faqs}
      heroSecondaryHref="/capabilities"
      ctaSecondaryHref="/digital-services-tangier"
      ctaTertiaryHref="/arc"
      tangier
    />
  );
}
