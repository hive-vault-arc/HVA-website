import type { Metadata } from 'next';
import type {AppLocale} from "@/i18n/config";
import {buildStaticRouteMetadata} from "@/i18n/metadata";
import Portfolio from '@/views/Portfolio';
import FaqSection from '@/components/FaqSection';
import JsonLd from '@/components/JsonLd';
import {getLocalizedFaqs} from '@/i18n/faqs';
import {absoluteUrl, buildLocalizedBreadcrumbSchema} from '@/lib/seo';
import {getPortfolioCaseStudies} from '@/lib/proof';
import {localizedPath} from '@/i18n/route-manifest';
import {getTranslations} from 'next-intl/server';
import {getPublishedCollection} from '@/lib/localized-content';

type PageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  return buildStaticRouteMetadata(locale, "portfolio");
}

export default async function Page({params}: PageProps) {
  const {locale} = await params;
  const [caseStudyCollection, portfolioFaqs, tMeta, tNav] = await Promise.all([
    getPublishedCollection(locale, getPortfolioCaseStudies),
    getLocalizedFaqs(locale, 'portfolio'),
    getTranslations({locale, namespace: 'Metadata.pages.portfolio'}),
    getTranslations({locale, namespace: 'Navigation'}),
  ]);
  const caseStudies = caseStudyCollection.items;

  const breadcrumbSchema = buildLocalizedBreadcrumbSchema(locale, [
    {name: tNav('home'), pathname: '/'},
    {name: tNav('portfolio'), pathname: '/whoarewe/portfolio'},
  ]);

  const caseItemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: tMeta('title'),
    description: tMeta('description'),
    url: absoluteUrl(localizedPath('/whoarewe/portfolio', locale)),
    inLanguage: locale,
    itemListElement: caseStudies.map((study, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: study.title,
      url: absoluteUrl(
        localizedPath('/case-studies/[slug]', locale, {slug: study.slug}),
      ),
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema, caseItemListSchema]} />
      <Portfolio projects={caseStudies} />
      <FaqSection faqs={portfolioFaqs.items} heading={portfolioFaqs.heading} />
    </>
  );
}
