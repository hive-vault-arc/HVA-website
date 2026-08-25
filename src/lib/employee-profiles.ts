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
const PROFILE_WIDTH = 1800;
const PROFILE_HEIGHT = 2250;
const PROFILE_IMAGE_QUALITY = 90;

const LEADERSHIP_IDENTITY = {
  'khalid-chalhi': {
    en: 'Co-Founder & CEO',
    fr: 'Cofondateur et CEO',
  },
  'ali-amrani': {
    en: 'Co-Founder & CTO',
    fr: 'Cofondateur et CTO',
  },
  'oubay-ghamat': {
    en: 'Co-Founder & COO',
    fr: 'Cofondateur et COO',
  },
} as const;

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
  operatingPrinciple?: string;
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
    position: 'Co-Founder & CTO',
    responsibilityTag: 'Product · Systems · Full-Stack',
    profileType: 'coFounder',
    summary:
      'Ali Amrani owns product systems, full-stack engineering, and delivery architecture for Hive Vault Arc programs.',
    story:
      'Ali brings a software engineering background into the operating layer of Hive Vault Arc. His work focuses on turning strategy and AI ambition into product systems that teams can actually use: interfaces, workflows, integrations, and reliable delivery architecture.',
    profileImage: '/Images/team/ali-amrani-founder-2026.webp',
    profileImageAlt: 'Ali Amrani, Co-Founder and CTO of Hive Vault Arc',
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
    position: 'Co-Founder & COO',
    responsibilityTag: 'Cloud · Infrastructure · Operations',
    profileType: 'coFounder',
    summary:
      'Oubay Ghamat leads cloud infrastructure, operations, and production reliability for Hive Vault Arc systems.',
    story:
      'Oubay focuses on the systems that keep transformation work stable after launch: cloud infrastructure, operational readiness, frontend delivery, and production reliability.',
    profileImage: '/Images/team/oubay-ghamat-founder-2026.webp',
    profileImageAlt: 'Oubay Ghamat, Co-Founder and COO of Hive Vault Arc',
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

const CURATED_LEADERSHIP_CONTENT = {
  'khalid-chalhi': {
    name: 'Khalid Chalhi',
    responsibilityTag: 'Strategy / AI Engineering / Software Systems',
    summary: 'Khalid leads company direction across strategy, AI engineering, and software delivery.',
    story: 'Khalid works across business strategy and system architecture. He turns operating problems into AI and software programs that can run in production.',
    experience: [
      {
        role: 'Chief Executive Officer',
        organization: 'Hive Vault Arc',
        location: 'Morocco / Hybrid',
        period: 'Apr 2026 - Present',
        summary: 'Leads company strategy and delivery across AI, software, cloud, and managed operations.',
      },
      {
        role: 'Lead AI Software Engineer & System Architect',
        organization: 'ImmoWorld',
        location: 'Tangier / Remote',
        period: 'Jun 2025 - Mar 2026',
        summary: 'Designed an AI-enabled real estate operating platform spanning CRM, agents, property workflows, and analytics.',
      },
      {
        role: 'Process Automation Engineer',
        organization: 'TE Connectivity',
        location: 'Tangier / Hybrid',
        period: 'Mar 2025 - Oct 2025',
        summary: 'Built automation services and real-time system integrations with FastAPI and WebSockets.',
      },
    ],
    education: [
      {
        institution: "Ecole Marocaine des Sciences de l'Ingenieur",
        credential: "Master's degree, Computer Science Applied to Business Administration",
        period: 'Oct 2020 - Oct 2025',
      },
    ],
    expertise: [
      'Business Strategy',
      'AI Engineering',
      'Software Systems',
      'System Architecture',
      'Process Automation',
    ],
    operatingPrinciple: 'Build the operating system around the outcome, not the technology.',
    linkedinUrl: 'https://www.linkedin.com/in/khalid-chalhi/',
  },
  'ali-amrani': {
    name: 'Ali Amrani',
    responsibilityTag: 'AI Transformation / Software Engineering / Operations',
    summary: 'Ali leads technology architecture, software engineering, and production delivery at Hive Vault Arc.',
    story: 'Ali connects product decisions to implementation. His background spans full-stack platforms, process automation, and software systems built for daily operations.',
    experience: [
      {
        role: 'Chief Technology Officer',
        organization: 'Hive Vault Arc',
        location: 'Tangier / On-site',
        period: 'Jan 2026 - Present',
        summary: 'Owns technical direction across software, AI integration, delivery architecture, and managed operations.',
      },
      {
        role: 'IT Intern - Digital Process Automation',
        organization: 'TE Connectivity',
        location: 'Tangier / On-site',
        period: 'Apr 2025 - Sep 2025',
        summary: 'Worked on enterprise automation and service integration using Angular and ASP.NET Web API.',
      },
      {
        role: 'Web Developer',
        organization: 'Premium Advice & Training',
        location: 'Tangier / On-site',
        period: 'Jul 2024 - Sep 2024',
        summary: 'Built a full-stack learning platform with Next.js, TypeScript, Firebase, tracking, and administration workflows.',
      },
    ],
    education: [
      {
        institution: "Ecole Marocaine des Sciences de l'Ingenieur",
        credential: "Master's degree, Computer and Network Engineering",
        period: 'Oct 2020 - Aug 2025',
      },
    ],
    expertise: [
      'Software Architecture',
      'Full-Stack Engineering',
      'AI Transformation',
      'Process Automation',
      'Managed Operations',
    ],
    operatingPrinciple: 'A technical decision is useful only when the team can operate it.',
    linkedinUrl: 'https://www.linkedin.com/in/ali-amrani-566361349/',
  },
  'oubay-ghamat': {
    name: 'Oubaye El Ghammat Ghori',
    responsibilityTag: 'Operations / Product Delivery / Reliability',
    summary: 'Oubaye leads operating delivery, coordination, and production continuity at Hive Vault Arc.',
    story: 'Oubaye brings full-stack product experience into the operating side of delivery. He keeps teams, releases, and client systems aligned from build through live operation.',
    experience: [
      {
        role: 'Co-Founder & Chief Operating Officer',
        organization: 'Hive Vault Arc',
        period: 'Mar 2026 - Present',
        summary: 'Leads delivery operations, coordination, and production continuity across client programs.',
      },
      {
        role: 'Junior React Developer',
        organization: 'Coffee IT',
        location: 'Utrecht / Hybrid',
        period: 'Dec 2025 - Jun 2026',
        summary: 'Delivered web application interfaces within a collaborative product team.',
      },
      {
        role: 'Software Engineer',
        organization: 'Jordi Hans Design',
        location: 'Sweden / Hybrid',
        period: 'Aug 2023 - Dec 2025',
        summary: 'Built scalable web and mobile experiences across client projects.',
      },
    ],
    education: [
      {
        institution: 'Lancaster University',
        credential: 'BSc (Hons) Computer Science',
        period: 'Oct 2020 - Jun 2024',
      },
    ],
    expertise: [
      'Operating Delivery',
      'Full-Stack Development',
      'React',
      'Docker',
      'Production Reliability',
    ],
    operatingPrinciple: 'Keep ownership visible from the first decision to the live system.',
    linkedinUrl: 'https://www.linkedin.com/in/oubaye-el-ghammat-ghori-68a50a213/',
  },
} satisfies Record<string, Partial<EmployeeProfile>>;

function imageUrlFromSource(image: SanityImageValue): string {
  if (!image) return '';
  if (typeof image === 'string') return image;

  return urlForImage(image)
    .width(PROFILE_WIDTH)
    .height(PROFILE_HEIGHT)
    .fit('crop')
    .format('webp')
    .quality(PROFILE_IMAGE_QUALITY)
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

function applyLeadershipIdentity(
  profile: EmployeeProfile,
  locale: AppLocale,
): EmployeeProfile {
  const identity = LEADERSHIP_IDENTITY[
    profile.slug as keyof typeof LEADERSHIP_IDENTITY
  ];
  const curated = CURATED_LEADERSHIP_CONTENT[
    profile.slug as keyof typeof CURATED_LEADERSHIP_CONTENT
  ];

  if (!identity) return profile;

  return {
    ...profile,
    ...curated,
    position: locale === 'fr' ? identity.fr : identity.en,
    // Portraits are editorial fields in Sanity. Keep the CMS value intact so
    // image updates do not require a frontend code change.
    profileImage: profile.profileImage,
    profileImageAlt:
      locale === 'fr'
        ? `${curated?.name ?? profile.name}, ${identity.fr.toLocaleLowerCase('fr-FR')} de Hive Vault Arc`
        : `${curated?.name ?? profile.name}, ${identity.en} of Hive Vault Arc`,
  };
}

function applyLeadershipIdentities(
  profiles: EmployeeProfile[],
  locale: AppLocale,
): EmployeeProfile[] {
  return profiles.map((profile) => applyLeadershipIdentity(profile, locale));
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
  const profiles = await withSanityFallback(
    async () => {
      const collection = await getPublishedCollection(locale, (targetLocale) =>
        fetchEmployeeProfiles(targetLocale, allEmployeeProfilesQuery),
      );
      return collection.items;
    },
    () => fallbackEmployeeProfiles(locale),
    'employee profiles',
  );

  return applyLeadershipIdentities(profiles, locale);
});

export const getFeaturedEmployeeProfiles = cache(async function getFeaturedEmployeeProfiles(
  locale: AppLocale = 'en'
): Promise<EmployeeProfile[]> {
  const profiles = await withSanityFallback(
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

  return applyLeadershipIdentities(profiles, locale);
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
  return profile.visibility === 'hidden'
    ? null
    : applyLeadershipIdentity(profile, locale);
});

export async function getRelatedEmployeeProfiles(
  currentSlug: string,
  limit = 2,
  locale: AppLocale = 'en'
): Promise<EmployeeProfile[]> {
  const profiles = await getAllEmployeeProfiles(locale);
  return profiles.filter((profile) => profile.slug !== currentSlug).slice(0, limit);
}
