import type { SanityImageSource } from '@sanity/image-url';
import {cache} from 'react';
import type {AppLocale} from '@/i18n/config';
import type {LocalizedContentMeta} from './localized-content';
import {
  buildPublishedCollection,
  getPublishedCollection,
  getPublishedDocument,
  localeTag,
} from './localized-content';
import { sanityFetch, withSanityFallback } from '../sanity/lib/fetch';
import { urlForImage } from '../sanity/lib/image';
import {
  allEmployeeProfilesQuery,
  employeeProfileBySlugQuery,
  featuredEmployeeProfilesQuery,
} from '../sanity/queries/people';

const PEOPLE_TAG = 'people';
const PROFILE_WIDTH = 1400;
const PROFILE_HEIGHT = 1750;

type SanityImageValue = SanityImageSource | string | null | undefined;

export type EmployeeProfileExperience = {
  _key?: string;
  role: string;
  organization: string;
  location?: string;
  period?: string;
  summary?: string;
  highlights?: string[];
};

export type EmployeeProfileEducation = {
  _key?: string;
  institution: string;
  credential?: string;
  period?: string;
  summary?: string;
};

export type EmployeeProfileSeo = {
  title?: string;
  description?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export type EmployeeProfile = LocalizedContentMeta & {
  _id?: string;
  name: string;
  slug: string;
  position: string;
  responsibilityTag?: string;
  profileType?: 'coFounder' | 'employee' | 'advisor' | string;
  summary: string;
  story: string;
  profileImage: string;
  profileImageAlt: string;
  experience: EmployeeProfileExperience[];
  education: EmployeeProfileEducation[];
  expertise: string[];
  linkedinUrl?: string;
  displayOrder: number;
  featuredOnAbout: boolean;
  visibility: 'published' | 'hidden' | string;
  seo?: EmployeeProfileSeo;
};

type SanityEmployeeProfile = Omit<EmployeeProfile, 'profileImage'> & {
  profileImage?: SanityImageValue;
};

const FALLBACK_EMPLOYEE_PROFILES: EmployeeProfile[] = [
  {
    language: 'en',
    translationStatus: 'approved',
    name: 'Khalid Chalhi',
    slug: 'khalid-chalhi',
    position: 'Co-Founder & CEO',
    responsibilityTag: 'Strategy · AI · Software Engineering',
    profileType: 'coFounder',
    summary:
      'Khalid Chalhi leads Hive Vault Arc across strategy, AI engineering, and software execution, connecting business direction with production-grade systems.',
    story:
      'Khalid works at the intersection of strategy, AI, and software engineering. His role at Hive Vault Arc is to turn transformation ambition into a practical operating path: define the business problem, shape the architecture, and keep delivery tied to measurable outcomes.',
    profileImage: '/Images/team/khalid-chalhi-founder-2026.webp',
    profileImageAlt: 'Khalid Chalhi, Co-Founder and CEO of Hive Vault Arc',
    experience: [],
    education: [],
    expertise: [
      'Strategy Consulting',
      'AI Engineering',
      'Software Engineering',
      'Technology Transformation',
      'AI Agents',
      'Custom Software',
    ],
    linkedinUrl: 'https://www.linkedin.com/in/khalid-chalhi/',
    displayOrder: 10,
    featuredOnAbout: true,
    visibility: 'published',
  },
  {
    language: 'en',
    translationStatus: 'approved',
    name: 'Ali Amrani',
    slug: 'ali-amrani',
    position: 'Co-Founder & CEO',
    responsibilityTag: 'Product · Systems · Full-Stack',
    profileType: 'coFounder',
    summary:
      'Ali Amrani owns product systems, full-stack engineering, and delivery architecture for Hive Vault Arc programs.',
    story:
      'Ali brings a software engineering background into the operating layer of Hive Vault Arc. His work focuses on turning strategy and AI ambition into product systems that teams can actually use: interfaces, workflows, integrations, and reliable delivery architecture.',
    profileImage: '/Images/team/ali-amrani-founder-2026.webp',
    profileImageAlt: 'Ali Amrani, Co-Founder of Hive Vault Arc',
    experience: [],
    education: [],
    expertise: [
      'Full-Stack Engineering',
      'Product Systems',
      'Software Architecture',
      'Technology Delivery',
      'AI Transformation',
      'Managed Operations',
    ],
    linkedinUrl: 'https://www.linkedin.com/in/ali-amrani-566361349/',
    displayOrder: 20,
    featuredOnAbout: true,
    visibility: 'published',
  },
  {
    language: 'en',
    translationStatus: 'approved',
    name: 'Oubay Ghamat',
    slug: 'oubay-ghamat',
    position: 'Co-Founder & CEO',
    responsibilityTag: 'Cloud · Infrastructure · Operations',
    profileType: 'coFounder',
    summary:
      'Oubay Ghamat leads cloud infrastructure, operations, and production reliability for Hive Vault Arc systems.',
    story:
      'Oubay focuses on the systems that keep transformation work stable after launch: cloud infrastructure, operational readiness, frontend delivery, and production reliability.',
    profileImage: '/Images/team/oubay-ghamat-founder-2026.webp',
    profileImageAlt: 'Oubay Ghamat, Co-Founder of Hive Vault Arc',
    experience: [],
    education: [],
    expertise: [
      'Cloud Infrastructure',
      'Managed Operations',
      'Production Reliability',
      'DevOps',
      'React Development',
      'Computer Science',
    ],
    linkedinUrl: 'https://www.linkedin.com/in/oubaye-el-ghammat-ghori-68a50a213/',
    displayOrder: 30,
    featuredOnAbout: true,
    visibility: 'published',
  },
];

function imageUrlFromSource(image: SanityImageValue): string {
  if (!image) return '';
  if (typeof image === 'string') return image;

  return urlForImage(image)
    .width(PROFILE_WIDTH)
    .height(PROFILE_HEIGHT)
    .fit('crop')
    .format('webp')
    .url();
}

function sortProfiles(profiles: EmployeeProfile[]): EmployeeProfile[] {
  return [...profiles].sort((a, b) => {
    if (a.displayOrder !== b.displayOrder) return a.displayOrder - b.displayOrder;
    return a.name.localeCompare(b.name);
  });
}

function normalizeEmployeeProfile(profile: SanityEmployeeProfile): EmployeeProfile {
  return {
    ...profile,
    profileImage: imageUrlFromSource(profile.profileImage),
    profileImageAlt: profile.profileImageAlt ?? profile.name,
    responsibilityTag: profile.responsibilityTag ?? '',
    experience: profile.experience ?? [],
    education: profile.education ?? [],
    expertise: profile.expertise ?? [],
    displayOrder: profile.displayOrder ?? 100,
    featuredOnAbout: profile.featuredOnAbout ?? false,
    visibility: profile.visibility ?? 'published',
    seo: {
      keywords: [],
      noIndex: false,
      ...profile.seo,
    },
  };
}

function publishedProfiles(profiles: EmployeeProfile[]): EmployeeProfile[] {
  return sortProfiles(profiles.filter((profile) => profile.visibility !== 'hidden'));
}

function fallbackEmployeeProfiles(locale: AppLocale): EmployeeProfile[] {
  return buildPublishedCollection(
    locale,
    [],
    FALLBACK_EMPLOYEE_PROFILES,
  ).items;
}

async function fetchEmployeeProfiles(
  locale: AppLocale,
  query: string,
): Promise<EmployeeProfile[]> {
  const profiles = await sanityFetch<SanityEmployeeProfile[]>({
    query,
    params: {locale},
    tags: [
      PEOPLE_TAG,
      'employeeProfiles',
      localeTag('employeeProfiles', locale),
    ],
  });

  return publishedProfiles(profiles.map(normalizeEmployeeProfile));
}

export const getAllEmployeeProfiles = cache(async function getAllEmployeeProfiles(
  locale: AppLocale = 'en',
): Promise<EmployeeProfile[]> {
  return withSanityFallback(
    async () => {
      const collection = await getPublishedCollection(locale, (targetLocale) =>
        fetchEmployeeProfiles(targetLocale, allEmployeeProfilesQuery),
      );
      return collection.items;
    },
    () => fallbackEmployeeProfiles(locale),
    'employee profiles',
  );
});

export const getFeaturedEmployeeProfiles = cache(async function getFeaturedEmployeeProfiles(
  locale: AppLocale = 'en'
): Promise<EmployeeProfile[]> {
  return withSanityFallback(
    async () => {
      const collection = await getPublishedCollection(locale, (targetLocale) =>
        fetchEmployeeProfiles(targetLocale, featuredEmployeeProfilesQuery),
      );
      return collection.items;
    },
    () =>
      fallbackEmployeeProfiles(locale).filter(
        (profile) => profile.featuredOnAbout,
      ),
    'featured employee profiles',
  );
});

export const getEmployeeProfileBySlug = cache(async function getEmployeeProfileBySlug(
  slug: string,
  locale: AppLocale = 'en'
): Promise<EmployeeProfile | null> {
  const profile = await withSanityFallback(
    () =>
      getPublishedDocument(locale, async (targetLocale) => {
        const sanityProfile = await sanityFetch<SanityEmployeeProfile | null>({
          query: employeeProfileBySlugQuery,
          params: {slug, locale: targetLocale},
          tags: [
            PEOPLE_TAG,
            'employeeProfiles',
            localeTag('employeeProfiles', targetLocale),
            `employeeProfile:${targetLocale}:${slug}`,
          ],
        });

        return sanityProfile ? normalizeEmployeeProfile(sanityProfile) : null;
      }),
    () =>
      fallbackEmployeeProfiles(locale).find(
        (fallbackProfile) => fallbackProfile.slug === slug,
      ) ?? null,
    'employee profile',
  );

  if (!profile) return null;
  return profile.visibility === 'hidden' ? null : profile;
});

export async function getRelatedEmployeeProfiles(
  currentSlug: string,
  limit = 2,
  locale: AppLocale = 'en'
): Promise<EmployeeProfile[]> {
  const profiles = await getAllEmployeeProfiles(locale);
  return profiles.filter((profile) => profile.slug !== currentSlug).slice(0, limit);
}
