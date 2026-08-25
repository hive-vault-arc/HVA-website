import type { Metadata } from 'next';
import type {AppLocale} from '@/i18n/config';
import {decodeRouteParam, localizedPath} from '@/i18n/route-manifest';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import {getCaseStudyBySlug, getRelatedCaseStudies} from '@/lib/proof';
import {
  SITE_URL,
  absoluteUrl,
  buildLocalizedBreadcrumbSchema,
  buildLocalizedPageMetadata,
} from '@/lib/seo';
import CaseStudyDetail from '@/views/CaseStudyDetail';
import {translationParams, translationRoutes} from '@/lib/localized-content';
import {TranslationTargets} from '@/components/localization/TranslationAvailability';
import {getTranslations} from 'next-intl/server';

type Props = {
  params: Promise<{locale: AppLocale; slug: string}>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {locale, slug: routeSlug} = await params;
  const slug = decodeRouteParam(routeSlug);
  const study = await getCaseStudyBySlug(slug, locale).catch(() => null);
  if (!study) return {};

  const metadata = buildLocalizedPageMetadata({
    title: study.seo?.title ?? `${study.title} | Case Study`,
    description: study.seo?.description ?? study.summary,
    pathname: '/case-studies/[slug]',
    locale,
    params: {slug: study.slug},
    translationParams: translationParams(study, locale, study.slug),
    keywords: study.seo?.keywords?.length
      ? study.seo.keywords
      : [
          study.industry,
          ...study.integrations,
          ...study.operationalModules,
          'case study',
          'digital transformation consulting',
          'technology consulting outcomes',
        ],
  });

  return {
    ...metadata,
    robots: {
      index: !study.seo?.noIndex,
      follow: !study.seo?.noIndex,
    },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const {locale, slug: routeSlug} = await params;
  const slug = decodeRouteParam(routeSlug);
  const study = await getCaseStudyBySlug(slug, locale).catch(() => null);
  if (!study) notFound();
  const [relatedStudies, tContent] = await Promise.all([
    getRelatedCaseStudies(study.slug, 3, locale),
    getTranslations({locale, namespace: 'DynamicContent'}),
  ]);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.title,
    description: study.summary,
    dateModified: study.lastUpdated,
    datePublished: study.lastUpdated,
    author: {
      '@type': 'Organization',
      name: 'Hive Vault Arc',
      url: SITE_URL,
    },
    image: absoluteUrl(study.assets.coverImage),
    mainEntityOfPage: absoluteUrl(
      localizedPath('/case-studies/[slug]', locale, {slug: study.slug}),
    ),
    inLanguage: locale,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: {
      '@type': 'Thing',
      name: `${study.industry} systems engineering`,
    },
  };

  const breadcrumbSchema = buildLocalizedBreadcrumbSchema(locale, [
    {name: tContent('home'), pathname: '/'},
    {name: tContent('caseStudies'), pathname: '/case-studies'},
    {
      name: study.title,
      pathname: '/case-studies/[slug]',
      params: {slug: study.slug},
    },
  ]);

  return (
    <>
      <TranslationTargets
        routes={translationRoutes(study, locale, study.slug, '/case-studies/[slug]')}
      />
      <JsonLd data={[articleSchema, breadcrumbSchema]} />
      <CaseStudyDetail study={study} relatedStudies={relatedStudies} />
    </>
  );
}
