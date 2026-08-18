import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import type {AppLocale} from '@/i18n/config';
import {buildStaticRouteMetadata} from '@/i18n/metadata';
import {getLocalizedFaqs} from '@/i18n/faqs';
import GeoServicePage, {type GeoPageCopy} from '@/components/GeoServicePage';

type PageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  return buildStaticRouteMetadata(locale, 'aiAgentsMorocco');
}

export default async function AIAgentsMoroccoPage({params}: PageProps) {
  const {locale} = await params;
  const [t, faqs] = await Promise.all([
    getTranslations({locale, namespace: 'GeoPages'}),
    getLocalizedFaqs(locale, 'aiAgentsMorocco'),
  ]);

  return (
    <GeoServicePage
      locale={locale}
      pathname="/ai-agents-morocco"
      image="/Images/blog/ai-agent-development-service.webp"
      copy={t.raw('aiAgentsMorocco') as GeoPageCopy}
      faqs={faqs}
      heroSecondaryHref="/ai-agents-tangier"
      ctaSecondaryHref="/capabilities/in-detail"
      ctaTertiaryHref="/digital-services-tangier"
    />
  );
}
