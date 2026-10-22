import type { Metadata } from 'next';
import type {AppLocale} from '@/i18n/config';
import {decodeRouteParam, localizedPath} from '@/i18n/route-manifest';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import {getCaseStudyBySlug, getRelatedCaseStudies, isSelectedClientCaseStudy} from '@/lib/proof';
import {
  SITE_URL,
  absoluteUrl,
  buildLocalizedBreadcrumbSchema,
  buildLocalizedPageMetadata,
} from '@/lib/seo';
import CaseStudyDetail from '@/views/CaseStudyDetail';
import SimpleCaseStudyDetail from '@/views/SimpleCaseStudyDetail';
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
    getRelatedCaseStudies(study.slug, 24, locale),
    getTranslations({locale, namespace: 'DynamicContent'}),
  ]);
  const pageUrl = absoluteUrl(localizedPath('/case-studies/[slug]', locale, {slug: study.slug}));
  const articleId = `${pageUrl}#article`;
  const pageId = `${pageUrl}#webpage`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': articleId,
    headline: study.title,
    description: study.summary,
    ...(study.lastUpdated ? {dateModified: study.lastUpdated} : {}),
    author: {'@id': `${SITE_URL}/#organization`},
    publisher: {'@id': `${SITE_URL}/#organization`},
    ...(study.assets.coverImage ? {image: absoluteUrl(study.assets.coverImage)} : {}),
    mainEntityOfPage: {'@id': pageId},
    inLanguage: locale,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: {
      '@type': 'Thing',
      name: study.industry,
    },
  };
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': pageId,
    name: study.title,
    description: study.summary,
    url: pageUrl,
    inLanguage: locale,
    isPartOf: {'@id': `${SITE_URL}/#website`},
    mainEntity: {'@id': articleId},
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
      <JsonLd data={[articleSchema, webPageSchema, breadcrumbSchema]} />
      {isSelectedClientCaseStudy(study) ? <SimpleCaseStudyDetail locale={locale} study={study} relatedStudies={relatedStudies.filter(isSelectedClientCaseStudy)} labels={{
        client: tContent('client'), industry: tContent('industry'), status: tContent('status'),
        challenge: tContent('caseSections.challenge'), architecture: tContent('caseSections.architecture'),
        modules: tContent('caseSections.modules'), projectMedia: tContent('caseSections.projectMedia'),
        outcomes: tContent('caseSections.outcomesTitle'), testimonial: tContent('caseSections.testimonial'),
        openTestimonial: tContent('openTestimonial'), more: tContent('moreCaseStudies'),
      }} /> : <CaseStudyDetail study={study} relatedStudies={relatedStudies} />}
    </>
  );
}
