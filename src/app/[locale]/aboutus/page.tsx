import type { Metadata } from 'next';
import type {AppLocale} from '@/i18n/config';
import {buildStaticRouteMetadata} from '@/i18n/metadata';
import SimpleAbout from '@/views/SimpleAbout';
import StudioFaqSection from '@/components/studio/StudioFaqSection';
import JsonLd from '@/components/JsonLd';
import {getLocalizedFaqs} from '@/i18n/faqs';
import { getFeaturedEmployeeProfiles, type EmployeeProfile } from '@/lib/employee-profiles';
import {getPublishedHomeCaseStudyProof, isSelectedClientCaseStudy, type CaseStudyShowcaseSummary} from '@/lib/proof';
import {
  GLOBAL_KEYWORDS,
  SITE_URL,
  absoluteUrl,
  buildLocalizedBreadcrumbSchema,
  mergeKeywords,
} from '@/lib/seo';
import {localizedPath} from '@/i18n/route-manifest';
import {getTranslations} from 'next-intl/server';

function foundersFrom(teamMembers: EmployeeProfile[]): EmployeeProfile[] {
  return teamMembers.filter((member) => member.profileType === 'coFounder');
}

function personSchema(member: EmployeeProfile, locale: AppLocale) {
  const personUrl = absoluteUrl(
    localizedPath('/aboutus/our-people/[employee]', locale, {
      employee: member.slug,
    }),
  );
  return {
    '@type': 'Person',
    '@id': `${personUrl}#person`,
    name: member.name,
    jobTitle: member.position,
    description: member.summary,
    image: absoluteUrl(member.profileImage),
    url: personUrl,
    worksFor: {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': absoluteUrl('/#organization'),
      name: 'Hive Vault Arc',
      url: SITE_URL,
    },
    knowsAbout: member.expertise,
  };
}

type PageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;

  return buildStaticRouteMetadata(
    locale,
    'about',
    mergeKeywords(GLOBAL_KEYWORDS, [
      'Khalid Chalhi',
      'Ali Amrani',
      'Oubay Ghamat',
      'Hive Vault Arc leadership',
      'Hive Vault Arc CEO CTO COO',
      'Hive Vault Arc founders',
      'HVA founders',
      'Hive Vault Arc founders',
      'technology transformation partner Morocco',
      'software engineering team Tangier',
      'digital transformation consulting team Morocco',
      'technology advisory firm Morocco',
      'ARC framework assess re-engineer command',
      'AI engineering firm Morocco',
      'managed operations technology Morocco',
      'founder-led technology firm Morocco',
      'six service pillars technology transformation',
      'what is Hive Vault Arc',
      'who founded HVA Morocco',
      'equipe ingenierie logicielle Tanger',
      'agence software et cloud Maroc',
      'equipo de ingenieria de software tanger',
      'agencia de software e ia en marruecos',
    ]),
  );
}

export default async function Page({params}: PageProps) {
  const {locale} = await params;
  const [teamMembers, aboutFaqs, tMeta, tNav, homeProof] = await Promise.all([
    getFeaturedEmployeeProfiles(locale),
    getLocalizedFaqs(locale, 'about'),
    getTranslations({locale, namespace: 'Metadata.pages.about'}),
    getTranslations({locale, namespace: 'Navigation'}),
    getPublishedHomeCaseStudyProof(locale),
  ]);
  const founders = foundersFrom(teamMembers);
  const caseStudies: CaseStudyShowcaseSummary[] = homeProof.caseStudies.items.filter(isSelectedClientCaseStudy).slice(0, 3).map(study => ({
    slug: study.slug,
    title: study.title,
    clientName: study.clientName,
    industry: study.industry,
    summary: study.summary,
    sourceLocale: study.language ?? homeProof.caseStudies.sourceLocale,
    assets: {coverImage: study.assets.coverImage, coverAlt: study.assets.coverAlt, clientLogo: study.assets.clientLogo, clientLogoAlt: study.assets.clientLogoAlt},
  }));
  const leadershipPeople = founders.map((member) => personSchema(member, locale));
  const pageUrl = absoluteUrl(localizedPath('/aboutus', locale));

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${pageUrl}#webpage`,
    name: tMeta('title'),
    url: pageUrl,
    description: tMeta('description'),
    inLanguage: locale,
    isPartOf: {'@id': absoluteUrl('/#website')},
    mainEntity: {'@id': absoluteUrl('/#organization')},
  };

  const breadcrumbSchema = buildLocalizedBreadcrumbSchema(locale, [
    {name: tNav('home'), pathname: '/'},
    {name: tNav('whoWeAre'), pathname: '/aboutus'},
  ]);

  return (
    <>
      <JsonLd data={[aboutPageSchema, ...leadershipPeople, breadcrumbSchema]} />
      <SimpleAbout locale={locale} teamMembers={teamMembers} caseStudies={caseStudies} />
      <StudioFaqSection faqs={aboutFaqs.items} heading={aboutFaqs.heading} />
    </>
  );
}
