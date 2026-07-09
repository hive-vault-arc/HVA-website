import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '../../../../components/JsonLd';
import EmployeeProfileView from '../../../../views/EmployeeProfile';
import {
  getAllEmployeeProfiles,
  getEmployeeProfileBySlug,
  getRelatedEmployeeProfiles,
} from '../../../../lib/employee-profiles';
import {
  GLOBAL_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  buildBreadcrumbSchema,
  buildPageMetadata,
  mergeKeywords,
} from '../../../../lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const profiles = await getAllEmployeeProfiles();
  return profiles.map((profile) => ({ slug: profile.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = await getEmployeeProfileBySlug(slug);

  if (!profile) {
    return {
      title: `Employee Profile | ${SITE_NAME}`,
      robots: { index: false, follow: false },
    };
  }

  const metadata = buildPageMetadata({
    title: profile.seo?.title ?? `${profile.name} | ${profile.position}`,
    description: profile.seo?.description ?? profile.summary,
    path: `/abouthva/people/${profile.slug}`,
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
  const { slug } = await params;
  const profile = await getEmployeeProfileBySlug(slug);

  if (!profile) notFound();

  const relatedProfiles = await getRelatedEmployeeProfiles(profile.slug);
  const profileUrl = absoluteUrl(`/abouthva/people/${profile.slug}`);
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
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    mainEntity: {
      '@id': `${profileUrl}#person`,
    },
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'About Hive Vault Arc', path: '/whoweare/abouthva' },
    { name: profile.name, path: `/abouthva/people/${profile.slug}` },
  ]);

  return (
    <>
      <JsonLd data={[personSchema, profilePageSchema, breadcrumbSchema]} />
      <EmployeeProfileView profile={profile} relatedProfiles={relatedProfiles} />
    </>
  );
}
