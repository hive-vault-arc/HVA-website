import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import type {AppLocale} from '@/i18n/config';
import {buildStaticRouteMetadata} from '@/i18n/metadata';
import {localizedPath} from '@/i18n/route-manifest';
import Home from '@/views/Home';
import JsonLd from '@/components/JsonLd';
import {STUDIO_COPY} from '@/data/studio-home';
import {getStudioServiceEntries} from '@/data/studio-services';
import {getFeaturedCapabilityProfiles} from '@/lib/capabilities';
import {buildHomeHeroProof} from '@/lib/home-hero';
import {getAllEmployeeProfiles, getFeaturedEmployeeProfiles} from '@/lib/employee-profiles';
import {getResilientPaginatedInsights} from '@/lib/resilient-insights';
import {selectHomeInsights} from '@/lib/home-insights';
import {selectHomeClientQuote} from '@/lib/home-client-quote';
import {getPublishedHomeCaseStudyProof, isSelectedClientCaseStudy, type CaseStudyShowcaseSummary} from '@/lib/proof';
import {GLOBAL_KEYWORDS, SITE_URL, absoluteUrl} from '@/lib/seo';

type PageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  const metadata = await buildStaticRouteMetadata(locale, 'home', GLOBAL_KEYWORDS);
  return {...metadata, title: {absolute: String(metadata.title)}};
}

export default async function Page({params}: PageProps) {
  const {locale} = await params;
  const [homeProof, tHomeMeta, employeeProfiles, teamMembers, insightPage, capabilityProfiles] = await Promise.all([
    getPublishedHomeCaseStudyProof(locale),
    getTranslations({locale, namespace: 'Metadata.pages.home'}),
    getAllEmployeeProfiles('en'),
    getFeaturedEmployeeProfiles(locale),
    getResilientPaginatedInsights(locale),
    getFeaturedCapabilityProfiles(locale),
  ]);
  const insightCandidates = [...insightPage.items];
  let cursor = insightPage.nextCursor;
  const seenCursors = new Set<string>();
  while (cursor && insightCandidates.length < Math.min(insightPage.total, 24)) {
    const cursorKey = `${cursor.date}:${cursor.id}`;
    if (seenCursors.has(cursorKey)) break;
    seenCursors.add(cursorKey);
    const nextPage = await getResilientPaginatedInsights(locale, cursor);
    insightCandidates.push(...nextPage.items);
    cursor = nextPage.nextCursor;
  }
  const insights = selectHomeInsights(insightCandidates, locale);
  const {caseStudies} = homeProof;
  const clientStudies = caseStudies.items.filter(isSelectedClientCaseStudy);
  const {trustedPartners} = buildHomeHeroProof(clientStudies, caseStudies.sourceLocale);
  const clientQuote = selectHomeClientQuote(homeProof.clientEvidence, new Set(clientStudies.map(study => study.slug)), locale);
  const caseStudyShowcase: CaseStudyShowcaseSummary[] = clientStudies.map(study => ({
    slug: study.slug, title: study.title, clientName: study.clientName, industry: study.industry, summary: study.summary, problem: study.problem,
    sourceLocale: study.language ?? caseStudies.sourceLocale,
    assets: {coverImage: study.assets.coverImage, coverAlt: study.assets.coverAlt, clientLogo: study.assets.clientLogo, clientLogoAlt: study.assets.clientLogoAlt},
  }));
  const copy = STUDIO_COPY[locale];
  const serviceEntries = getStudioServiceEntries(locale, capabilityProfiles, []);
  const pageUrl = absoluteUrl(localizedPath('/', locale));
  return <>
    <JsonLd data={[
      {
        '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${pageUrl}#homepage`,
        name: tHomeMeta('title'), description: tHomeMeta('description'), url: pageUrl, inLanguage: locale,
        isPartOf: {'@id': `${SITE_URL}/#website`}, about: {'@id': `${SITE_URL}/#organization`},
        ...(caseStudyShowcase[0]?.assets.coverImage ? {primaryImageOfPage: absoluteUrl(caseStudyShowcase[0].assets.coverImage)} : {}),
        significantLink: ['/capabilities', '/case-studies', '/aboutus', '/insights', '/contact'].map(path => absoluteUrl(localizedPath(path as '/' | '/capabilities' | '/case-studies' | '/aboutus' | '/insights' | '/contact', locale))),
      },
      {
        '@context': 'https://schema.org', '@type': 'FAQPage', inLanguage: locale,
        mainEntity: copy.faq.items.map(item => ({'@type': 'Question', name: item.question, acceptedAnswer: {'@type': 'Answer', text: item.answer}})),
      },
    ]} />
    <Home locale={locale} caseStudies={caseStudyShowcase} clientQuote={clientQuote} trustedPartners={trustedPartners} founderCount={employeeProfiles.filter(profile => profile.profileType === 'coFounder').length} teamMembers={teamMembers} insights={insights} serviceEntries={serviceEntries} />
  </>;
}
