import type { SanityImageSource } from '@sanity/image-url';
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

const FALLBACK_EMPLOYEE_PROFILES: EmployeeProfile[] = [
  {
    name: 'Khalid Chalhi',
    slug: 'khalid-chalhi',
    position: 'Co-Founder & CEO',
    responsibilityTag: 'Strategy · AI · Software Engineering',
    profileType: 'coFounder',
    summary:
      'Khalid Chalhi leads Hive Vault Arc across strategy, AI engineering, and software execution, connecting business direction with production-grade systems.',
    story:
      'Khalid works at the intersection of strategy, AI, and software engineering. His role at Hive Vault Arc is to turn transformation ambition into a practical operating path: define the business problem, shape the architecture, and keep delivery tied to measurable outcomes. Public LinkedIn information positions him as Co-Founder & CEO of Hive Vault Arc and an AI and software engineer based in Tangier, Morocco.',
    profileImage: '/Images/team/khalid-chalhi-hva-co-founder.webp',
    profileImageAlt: 'Khalid Chalhi, Co-Founder and CEO of Hive Vault Arc',
    experience: [
      {
        role: 'Co-Founder & CEO',
        organization: 'Hive Vault Arc',
        location: 'Tangier, Morocco',
        period: 'Current',
        summary:
          'Leads company direction across strategy, AI engineering, software execution, and transformation programs.',
        highlights: [
          'Shapes the ARC delivery model from strategy to production',
          'Guides AI agent, custom software, and operating-system engagements',
          'Connects leadership goals with engineering decisions',
        ],
      },
      {
        role: 'AI & Software Engineer',
        organization: 'Technology and software engineering practice',
        location: 'Morocco',
        summary:
          'Builds around AI-enabled workflows, production software systems, and business process transformation.',
      },
    ],
    education: [
      {
        institution: 'Ecole Marocaine des Sciences de l\'Ingenieur',
        credential: 'Computer engineering and networks background',
      },
    ],
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
    seo: {
      title: 'Khalid Chalhi | Co-Founder & CEO',
      description:
        'Khalid Chalhi leads strategy, AI engineering, and software execution for Hive Vault Arc transformation programs in Tangier, Morocco.',
      keywords: ['Khalid Chalhi', 'Hive Vault Arc', 'AI Software Engineer', 'Co-Founder CEO'],
      noIndex: false,
    },
  },
  {
    name: 'Ali Amrani',
    slug: 'ali-amrani',
    position: 'Co-Founder & CEO',
    responsibilityTag: 'Product · Systems · Full-Stack',
    profileType: 'coFounder',
    summary:
      'Ali Amrani owns product systems, full-stack engineering, and delivery architecture for Hive Vault Arc programs.',
    story:
      'Ali brings a software engineering background into the operating layer of Hive Vault Arc. His work focuses on turning strategy and AI ambition into product systems that teams can actually use: interfaces, workflows, integrations, and reliable delivery architecture. Public LinkedIn information describes him as CEO & Co-Founder of Hive Vault Arc, working across AI transformation, software engineering, and managed operations.',
    profileImage: '/Images/team/ali-amrani-hva-co-founder-portrait.jpeg',
    profileImageAlt: 'Ali Amrani, Co-Founder and CEO of Hive Vault Arc',
    experience: [
      {
        role: 'Co-Founder & CEO',
        organization: 'Hive Vault Arc',
        location: 'Tangier, Morocco',
        period: 'Current',
        summary:
          'Leads product systems, full-stack delivery, software architecture, and operational product execution.',
        highlights: [
          'Designs delivery architecture for client-facing and internal systems',
          'Connects AI transformation work to usable software products',
          'Supports managed operations through maintainable product engineering',
        ],
      },
      {
        role: 'Software Engineering Background',
        organization: 'EMSI',
        location: 'Tangier, Morocco',
        summary:
          'Public LinkedIn information references a software engineering background from EMSI and work at the intersection of technology, business, and AI.',
      },
    ],
    education: [
      {
        institution: 'EMSI Tanger',
        credential: 'Software engineering background',
      },
    ],
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
    seo: {
      title: 'Ali Amrani | Co-Founder & CEO',
      description:
        'Ali Amrani leads product systems, full-stack engineering, and delivery architecture for Hive Vault Arc.',
      keywords: ['Ali Amrani', 'Hive Vault Arc', 'Full-Stack Engineering', 'AI Transformation'],
      noIndex: false,
    },
  },
  {
    name: 'Oubay Ghamat',
    slug: 'oubay-ghamat',
    position: 'Co-Founder & CEO',
    responsibilityTag: 'Cloud · Infrastructure · Operations',
    profileType: 'coFounder',
    summary:
      'Oubay Ghamat leads cloud infrastructure, operations, and production reliability for Hive Vault Arc systems.',
    story:
      'Oubay focuses on the systems that keep transformation work stable after launch: cloud infrastructure, operational readiness, frontend delivery, and production reliability. Public LinkedIn information lists him as CEO & Co-Founder of Hive Vault Arc, Junior React Developer at Coffee IT, and a BSc Hons Computer Science graduate from Lancaster University.',
    profileImage: '/Images/team/oubay-ghamat-hva-co-founder.webp',
    profileImageAlt: 'Oubay Ghamat, Co-Founder and CEO of Hive Vault Arc',
    experience: [
      {
        role: 'Co-Founder & CEO',
        organization: 'Hive Vault Arc',
        location: 'Tangier, Morocco',
        period: 'Current',
        summary:
          'Leads cloud infrastructure, managed operations, production reliability, and delivery support for deployed systems.',
        highlights: [
          'Keeps infrastructure and operations close to the delivery loop',
          'Supports production readiness for AI, software, and cloud systems',
          'Aligns reliability decisions with long-term client operations',
        ],
      },
      {
        role: 'Junior React Developer',
        organization: 'Coffee IT',
        summary:
          'Public LinkedIn information references frontend development work as a Junior React Developer.',
      },
    ],
    education: [
      {
        institution: 'Lancaster University',
        credential: 'BSc Hons Computer Science',
      },
    ],
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
    seo: {
      title: 'Oubay Ghamat | Co-Founder & CEO',
      description:
        'Oubay Ghamat leads cloud infrastructure, managed operations, and production reliability for Hive Vault Arc.',
      keywords: ['Oubay Ghamat', 'Hive Vault Arc', 'Cloud Infrastructure', 'Managed Operations'],
      noIndex: false,
    },
  },
];

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

async function fetchEmployeeData<T>(options: Parameters<typeof sanityFetch<T>>[0], fallback: T): Promise<T> {
  return withSanityFallback(() => sanityFetch<T>(options), () => fallback, 'employee profile');
}

export async function getAllEmployeeProfiles(): Promise<EmployeeProfile[]> {
  const profiles = await fetchEmployeeData<SanityEmployeeProfile[]>(
    {
      query: allEmployeeProfilesQuery,
      tags: [PEOPLE_TAG, 'employeeProfiles'],
    },
    []
  );

  if (profiles.length === 0) return FALLBACK_EMPLOYEE_PROFILES;

  return publishedProfiles(profiles.map(normalizeEmployeeProfile));
}

export async function getFeaturedEmployeeProfiles(): Promise<EmployeeProfile[]> {
  const profiles = await fetchEmployeeData<SanityEmployeeProfile[]>(
    {
      query: featuredEmployeeProfilesQuery,
      tags: [PEOPLE_TAG, 'employeeProfiles'],
    },
    []
  );

  if (profiles.length === 0) return FALLBACK_EMPLOYEE_PROFILES.filter((profile) => profile.featuredOnAbout);

  return publishedProfiles(profiles.map(normalizeEmployeeProfile)).filter((profile) => profile.featuredOnAbout);
}

export async function getEmployeeProfileBySlug(slug: string): Promise<EmployeeProfile | null> {
  const profile = await fetchEmployeeData<SanityEmployeeProfile | null>(
    {
      query: employeeProfileBySlugQuery,
      params: { slug },
      tags: [PEOPLE_TAG, 'employeeProfiles', `employeeProfile:${slug}`],
    },
    null
  );

  if (!profile) {
    return FALLBACK_EMPLOYEE_PROFILES.find((item) => item.slug === slug) ?? null;
  }

  const normalized = normalizeEmployeeProfile(profile);
  return normalized.visibility === 'hidden' ? null : normalized;
}

export async function getRelatedEmployeeProfiles(currentSlug: string, limit = 2): Promise<EmployeeProfile[]> {
  const profiles = await getAllEmployeeProfiles();
  return profiles.filter((profile) => profile.slug !== currentSlug).slice(0, limit);
}
