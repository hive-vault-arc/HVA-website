import type { Metadata } from 'next';
import type {AppLocale} from '@/i18n/config';
import {buildStaticRouteMetadata} from '@/i18n/metadata';
import About from '@/views/About';
import FaqSection from '@/components/FaqSection';
import JsonLd from '@/components/JsonLd';
import {getLocalizedFaqs} from '@/i18n/faqs';
import { getFeaturedEmployeeProfiles, type EmployeeProfile } from '@/lib/employee-profiles';
import {
  BRAND_SEARCH_VARIANTS,
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
  const founders = foundersFrom(await getFeaturedEmployeeProfiles(locale));

  return buildStaticRouteMetadata(
    locale,
    'about',
    mergeKeywords(GLOBAL_KEYWORDS, [
      ...founders.flatMap((member) => [member.name, member.position, ...member.expertise]),
      'CEO of HVA',
      'CEO of Hive Vault Arc',
      'Hive Vault Arc CEO',
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
  const [teamMembers, aboutFaqs, tMeta, tNav] = await Promise.all([
    getFeaturedEmployeeProfiles(locale),
    getLocalizedFaqs(locale, 'about'),
    getTranslations({locale, namespace: 'Metadata.pages.about'}),
    getTranslations({locale, namespace: 'Navigation'}),
  ]);
  const founders = foundersFrom(teamMembers);
  const leadershipPeople = founders.map((member) => personSchema(member, locale));
  const pageUrl = absoluteUrl(localizedPath('/aboutus', locale));

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: tMeta('title'),
    url: pageUrl,
    description: tMeta('description'),
    inLanguage: locale,
    mainEntity: {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': absoluteUrl('/#organization'),
      name: 'Hive Vault Arc',
      alternateName: BRAND_SEARCH_VARIANTS,
      description: tMeta('description'),
      founder: leadershipPeople,
      founders: leadershipPeople,
      employee: teamMembers.map((member) => personSchema(member, locale)),
      member: leadershipPeople,
      foundingLocation: 'Tangier, Morocco',
      areaServed: ['Morocco', 'France', 'Europe', 'MENA'],
      knowsAbout: [
        'Technology Transformation',
        'AI Engineering',
        'Strategy Consulting',
        'Software Development',
        'Cloud Infrastructure',
        'Managed Operations',
      ],
    },
  };

  const breadcrumbSchema = buildLocalizedBreadcrumbSchema(locale, [
    {name: tNav('home'), pathname: '/'},
    {name: tNav('whoWeAre'), pathname: '/aboutus'},
  ]);

  return (
    <>
      <JsonLd data={[aboutPageSchema, ...leadershipPeople, breadcrumbSchema]} />
      <About teamMembers={teamMembers} />
      <FaqSection faqs={aboutFaqs.items} heading={aboutFaqs.heading} />
    </>
  );
}
