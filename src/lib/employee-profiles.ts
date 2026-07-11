import type { SanityImageSource } from '@sanity/image-url';
import { sanityFetch } from '../sanity/lib/fetch';
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

export type EmployeeProfile = {
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

function imageUrlFromSource(image: SanityImageValue): string {
  if (!image) return '';
  if (typeof image === 'string') return image;

  return urlForImage(image)
    .width(PROFILE_WIDTH)
    .height(PROFILE_HEIGHT)
    .fit('crop')
    .auto('format')
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

export async function getAllEmployeeProfiles(): Promise<EmployeeProfile[]> {
  const profiles = await sanityFetch<SanityEmployeeProfile[]>({
    query: allEmployeeProfilesQuery,
    tags: [PEOPLE_TAG, 'employeeProfiles'],
  });

  return publishedProfiles(profiles.map(normalizeEmployeeProfile));
}

export async function getFeaturedEmployeeProfiles(): Promise<EmployeeProfile[]> {
  const profiles = await sanityFetch<SanityEmployeeProfile[]>({
    query: featuredEmployeeProfilesQuery,
    tags: [PEOPLE_TAG, 'employeeProfiles'],
  });

  return publishedProfiles(profiles.map(normalizeEmployeeProfile)).filter(
    (profile) => profile.featuredOnAbout
  );
}

export async function getEmployeeProfileBySlug(slug: string): Promise<EmployeeProfile | null> {
  const profile = await sanityFetch<SanityEmployeeProfile | null>({
    query: employeeProfileBySlugQuery,
    params: { slug },
    tags: [PEOPLE_TAG, 'employeeProfiles', `employeeProfile:${slug}`],
  });

  if (!profile) return null;

  const normalized = normalizeEmployeeProfile(profile);
  return normalized.visibility === 'hidden' ? null : normalized;
}

export async function getRelatedEmployeeProfiles(
  currentSlug: string,
  limit = 2
): Promise<EmployeeProfile[]> {
  const profiles = await getAllEmployeeProfiles();
  return profiles.filter((profile) => profile.slug !== currentSlug).slice(0, limit);
}
