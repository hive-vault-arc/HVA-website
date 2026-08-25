import type { Metadata } from 'next';
import type {AppLocale} from '@/i18n/config';
import {decodeRouteParam, localizedPath} from '@/i18n/route-manifest';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import EmployeeProfileView from '@/views/EmployeeProfile';
import {
  getEmployeeProfileBySlug,
  getRelatedEmployeeProfiles,
} from '@/lib/employee-profiles';
import {
  GLOBAL_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  buildLocalizedBreadcrumbSchema,
  buildLocalizedPageMetadata,
  mergeKeywords,
} from '@/lib/seo';
import {translationParams, translationRoutes} from '@/lib/localized-content';
import {TranslationTargets} from '@/components/localization/TranslationAvailability';
import {getTranslations} from 'next-intl/server';

type Props = {
  params: Promise<{locale: AppLocale; employee: string}>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {locale, employee: routeEmployee} = await params;
  const employee = decodeRouteParam(routeEmployee);
  const profile = await getEmployeeProfileBySlug(employee, locale);

  if (!profile) {
    return {
      title: `Employee Profile | ${SITE_NAME}`,
      robots: { index: false, follow: false },
    };
  }

  const isFounder = profile.profileType === 'coFounder';
  const metadata = buildLocalizedPageMetadata({
    title: isFounder
      ? `${profile.name} | ${profile.position}`
      : profile.seo?.title ?? `${profile.name} | ${profile.position}`,
    description: profile.seo?.description ?? profile.summary,
    pathname: '/aboutus/our-people/[employee]',
    locale,
    params: {employee: profile.slug},
    translationParams: translationParams(profile, locale, profile.slug, 'employee'),
    keywords: mergeKeywords(GLOBAL_KEYWORDS, profile.seo?.keywords ?? [], [
      profile.name,
      `${profile.name} Hive Vault Arc`,
      profile.position,
      ...(profile.expertise ?? []),
    ]),
  });

  return {
    ...metadata,
    robots: {
      index: !profile.seo?.noIndex,
      follow: !profile.seo?.noIndex,
    },
  };
}

export default async function EmployeeProfilePage({ params }: Props) {
  const {locale, employee: routeEmployee} = await params;
  const employee = decodeRouteParam(routeEmployee);
  const profile = await getEmployeeProfileBySlug(employee, locale);

  if (!profile) notFound();

  const [relatedProfiles, tContent] = await Promise.all([
    getRelatedEmployeeProfiles(profile.slug, 2, locale),
    getTranslations({locale, namespace: 'DynamicContent'}),
  ]);
  const profileUrl = absoluteUrl(
    localizedPath('/aboutus/our-people/[employee]', locale, {employee: profile.slug}),
  );
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${profileUrl}#person`,
    name: profile.name,
    jobTitle: profile.position,
    description: profile.summary,
    image: absoluteUrl(profile.profileImage),
    url: profileUrl,
    sameAs: profile.linkedinUrl ? [profile.linkedinUrl] : undefined,
    worksFor: {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${SITE_URL}/#organization`,
      name: 'Hive Vault Arc',
      url: SITE_URL,
    },
    knowsAbout: profile.expertise,
  };

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${profileUrl}#profile-page`,
    name: `${profile.name} - ${profile.position}`,
    description: profile.summary,
    url: profileUrl,
    inLanguage: locale,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    mainEntity: {
      '@id': `${profileUrl}#person`,
    },
  };

  const breadcrumbSchema = buildLocalizedBreadcrumbSchema(locale, [
    {name: tContent('home'), pathname: '/'},
    {name: tContent('aboutHiva'), pathname: '/aboutus'},
    {
      name: profile.name,
      pathname: '/aboutus/our-people/[employee]',
      params: {employee: profile.slug},
    },
  ]);

  return (
    <>
      <TranslationTargets
        routes={translationRoutes(
          profile,
          locale,
          profile.slug,
          '/aboutus/our-people/[employee]',
          'employee',
        )}
      />
      <JsonLd data={[personSchema, profilePageSchema, breadcrumbSchema]} />
      <EmployeeProfileView profile={profile} relatedProfiles={relatedProfiles} />
    </>
  );
}
