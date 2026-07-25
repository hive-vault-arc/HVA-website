import type { SanityImageSource } from '@sanity/image-url';
import {cache} from 'react';
import type {AppLocale} from '@/i18n/config';
import type {LocalizedContentMeta} from './localized-content';
import {
  getPublishedCollection,
  getPublishedDocument,
  localeTag,
} from './localized-content';
import { CAPABILITY_BRIEF_SECTIONS, CAPABILITY_DOMAINS } from './capabilities-content';
import { sanityFetch, withSanityFallback } from '../sanity/lib/fetch';
import { urlForImage } from '../sanity/lib/image';
import {
  allCapabilityProfilesQuery,
  capabilityProfileBySlugQuery,
  featuredCapabilityProfilesQuery,
} from '../sanity/queries/capabilities';

const CAPABILITIES_TAG = 'capabilities';
const CAPABILITY_IMAGE_WIDTH = 1600;
const CAPABILITY_IMAGE_HEIGHT = 1100;

type SanityImageValue = SanityImageSource | string | null | undefined;

export type CapabilityLandingLink = {
  _key?: string;
  label: string;
  href: string;
};

export type CapabilitySeo = {
  title?: string;
  description?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export type CapabilityProfileSummary = LocalizedContentMeta & {
  _id?: string;
  title: string;
  slug: string;
  shortTitle?: string;
  kicker?: string;
  briefLine: string;
  briefBullets: string[];
  heroImage: string;
  heroImageAlt: string;
  displayOrder: number;
  featuredOnCapabilities: boolean;
  visibility: 'published' | 'hidden' | string;
  seo?: CapabilitySeo;
};

export type CapabilityProfile = CapabilityProfileSummary & {
  strategicContext: string;
  executionContext: string;
  subCapabilities: string[];
  relatedOutcomes: string[];
  landingLinks: CapabilityLandingLink[];
  relatedCapabilities: CapabilityProfileSummary[];
};

type SanityCapabilityProfileSummary = Omit<CapabilityProfileSummary, 'heroImage'> & {
  heroImage?: SanityImageValue;
};

type SanityCapabilityProfile = Omit<
  CapabilityProfile,
  'heroImage' | 'relatedCapabilities'
> & {
  heroImage?: SanityImageValue;
  relatedCapabilities?: SanityCapabilityProfileSummary[];
};

const CAPABILITY_PRESENTATION: Record<
  string,
  {
    shortTitle: string;
    kicker: string;
    heroImage: string;
    heroImageAlt: string;
    displayOrder: number;
  }
> = {
  'strategy-business': {
    shortTitle: 'Strategy & Business',
    kicker: 'The thinking layer',
    heroImage: '/Images/capabilities/hva-strategy-business-capability.webp',
    heroImageAlt: 'Strategy and business consulting operating model design',
    displayOrder: 10,
  },
  'technology-consulting': {
    shortTitle: 'Technology Consulting',
    kicker: 'The architecture layer',
    heroImage: '/Images/capabilities/hva-technology-consulting-capability.webp',
    heroImageAlt: 'Technology consulting architecture and systems planning',
    displayOrder: 20,
  },
  'ai-data-analytics': {
    shortTitle: 'AI & Data',
    kicker: 'The intelligence layer',
    heroImage: '/Images/capabilities/hva-ai-data-capability.webp',
    heroImageAlt: 'AI and data analytics production intelligence systems',
    displayOrder: 30,
  },
  'software-engineering': {
    shortTitle: 'Software Engineering',
    kicker: 'The build layer',
    heroImage: '/Images/capabilities/hva-software-engineering-capability.webp',
    heroImageAlt: 'Software engineering production-grade systems workspace',
    displayOrder: 40,
  },
  'cloud-infrastructure': {
    shortTitle: 'Cloud & Infrastructure',
    kicker: 'The foundation layer',
    heroImage: '/Images/capabilities/hva-cloud-infrastructure-capability.webp',
    heroImageAlt: 'Cloud infrastructure secure systems and observability',
    displayOrder: 50,
  },
  'operations-managed': {
    shortTitle: 'Operations & Managed',
    kicker: 'The evolution layer',
    heroImage: '/Images/capabilities/hva-operations-managed-capability.webp',
    heroImageAlt: 'Operations and managed services monitoring workspace',
    displayOrder: 60,
  },
};

const FALLBACK_CAPABILITY_PROFILES: CapabilityProfile[] = CAPABILITY_DOMAINS.map((domain) => {
  const presentation = CAPABILITY_PRESENTATION[domain.id] ?? {
    shortTitle: domain.title,
    kicker: 'Capability',
    heroImage: '/Images/capabilities/hva-capabilities-expertise.webp',
    heroImageAlt: `${domain.title} capability`,
    displayOrder: 100,
  };
  const briefSection = CAPABILITY_BRIEF_SECTIONS.find((section) => section.id === domain.id);

  return {
    language: 'en',
    translationStatus: 'approved',
    title: domain.title,
    slug: domain.id,
    shortTitle: presentation.shortTitle,
    kicker: presentation.kicker,
    briefLine: domain.briefLine,
    briefBullets: domain.briefBullets,
    strategicContext: domain.strategicContext,
    executionContext: domain.executionContext,
    subCapabilities: domain.subCapabilities,
    relatedOutcomes: domain.relatedOutcomes,
    landingLinks: briefSection?.landingLinks ?? [],
    heroImage: presentation.heroImage,
    heroImageAlt: presentation.heroImageAlt,
    relatedCapabilities: [],
    displayOrder: presentation.displayOrder,
    featuredOnCapabilities: true,
    visibility: 'published',
    seo: {
      title: domain.title,
      description: domain.briefLine,
      keywords: [
        domain.title,
        'Hive Vault Arc capabilities',
        ...domain.briefBullets,
        ...domain.relatedOutcomes,
      ],
      noIndex: false,
    },
  };
});

function imageUrlFromSource(image: SanityImageValue): string {
  if (!image) return '';
  if (typeof image === 'string') return image;

  return urlForImage(image)
    .width(CAPABILITY_IMAGE_WIDTH)
    .height(CAPABILITY_IMAGE_HEIGHT)
    .fit('crop')
    .format('webp')
    .url();
}

function sortCapabilityProfiles(profiles: CapabilityProfile[]): CapabilityProfile[] {
  return [...profiles].sort((a, b) => {
    if (a.displayOrder !== b.displayOrder) return a.displayOrder - b.displayOrder;
    return a.title.localeCompare(b.title);
  });
}

function sortCapabilitySummaries(profiles: CapabilityProfileSummary[]): CapabilityProfileSummary[] {
  return [...profiles].sort((a, b) => {
    if (a.displayOrder !== b.displayOrder) return a.displayOrder - b.displayOrder;
    return a.title.localeCompare(b.title);
  });
}

function normalizeSeo(seo?: CapabilitySeo): CapabilitySeo {
  return {
    keywords: [],
    noIndex: false,
    ...seo,
  };
}

function normalizeCapabilitySummary(profile: SanityCapabilityProfileSummary): CapabilityProfileSummary {
  return {
    ...profile,
    shortTitle: profile.shortTitle ?? profile.title,
    kicker: profile.kicker ?? 'Capability',
    briefBullets: profile.briefBullets ?? [],
    heroImage: imageUrlFromSource(profile.heroImage),
    heroImageAlt: profile.heroImageAlt ?? `${profile.title} capability`,
    displayOrder: profile.displayOrder ?? 100,
    featuredOnCapabilities: profile.featuredOnCapabilities ?? false,
    visibility: profile.visibility ?? 'published',
    seo: normalizeSeo(profile.seo),
  };
}

function normalizeCapabilityProfile(profile: SanityCapabilityProfile): CapabilityProfile {
  return {
    ...normalizeCapabilitySummary(profile),
    strategicContext: profile.strategicContext ?? '',
    executionContext: profile.executionContext ?? '',
    subCapabilities: profile.subCapabilities ?? [],
    relatedOutcomes: profile.relatedOutcomes ?? [],
    landingLinks: profile.landingLinks ?? [],
    relatedCapabilities: sortCapabilitySummaries(
      (profile.relatedCapabilities ?? [])
        .map(normalizeCapabilitySummary)
        .filter((related) => related.visibility !== 'hidden')
    ),
  };
}

function publishedCapabilities(profiles: CapabilityProfile[]): CapabilityProfile[] {
  return sortCapabilityProfiles(profiles.filter((profile) => profile.visibility !== 'hidden'));
}

async function fetchCapabilityData<T>(options: Parameters<typeof sanityFetch<T>>[0], fallback: T): Promise<T> {
  return withSanityFallback(() => sanityFetch<T>(options), () => fallback, 'capability');
}

export function toCapabilityProfileSummary(profile: CapabilityProfile): CapabilityProfileSummary {
  return {
    _id: profile._id,
    language: profile.language,
    translationStatus: profile.translationStatus,
    translationTargets: profile.translationTargets,
    title: profile.title,
    slug: profile.slug,
    shortTitle: profile.shortTitle,
    kicker: profile.kicker,
    briefLine: profile.briefLine,
    briefBullets: profile.briefBullets,
    heroImage: profile.heroImage,
    heroImageAlt: profile.heroImageAlt,
    displayOrder: profile.displayOrder,
    featuredOnCapabilities: profile.featuredOnCapabilities,
    visibility: profile.visibility,
    seo: profile.seo,
  };
}

export async function getAllCapabilityProfiles(locale: AppLocale = 'en'): Promise<CapabilityProfile[]> {
  const fetchProfiles = async (targetLocale: AppLocale) => {
    const profiles = await fetchCapabilityData<SanityCapabilityProfile[]>(
      {
        query: allCapabilityProfilesQuery,
        params: {locale: targetLocale},
        tags: [
          CAPABILITIES_TAG,
          'capabilityProfiles',
          localeTag('capabilityProfiles', targetLocale),
        ],
      },
      [],
    );

    if (profiles.length === 0 && targetLocale === 'en') {
      return FALLBACK_CAPABILITY_PROFILES;
    }

    return publishedCapabilities(profiles.map(normalizeCapabilityProfile));
  };

  return (await getPublishedCollection(locale, fetchProfiles)).items;
}

export async function getFeaturedCapabilityProfiles(
  locale: AppLocale = 'en'
): Promise<CapabilityProfile[]> {
  const fetchProfiles = async (targetLocale: AppLocale) => {
    const profiles = await fetchCapabilityData<SanityCapabilityProfile[]>(
      {
        query: featuredCapabilityProfilesQuery,
        params: {locale: targetLocale},
        tags: [
          CAPABILITIES_TAG,
          'capabilityProfiles',
          localeTag('capabilityProfiles', targetLocale),
        ],
      },
      [],
    );

    if (profiles.length === 0 && targetLocale === 'en') {
      return FALLBACK_CAPABILITY_PROFILES.filter(
        (profile) => profile.featuredOnCapabilities,
      );
    }

    return publishedCapabilities(profiles.map(normalizeCapabilityProfile)).filter(
      (profile) => profile.featuredOnCapabilities,
    );
  };

  return (await getPublishedCollection(locale, fetchProfiles)).items;
}

export const getCapabilityProfileBySlug = cache(async function getCapabilityProfileBySlug(
  slug: string,
  locale: AppLocale = 'en'
): Promise<CapabilityProfile | null> {
  const profile = await getPublishedDocument(locale, async (targetLocale) => {
    const sanityProfile = await fetchCapabilityData<SanityCapabilityProfile | null>(
      {
        query: capabilityProfileBySlugQuery,
        params: {slug, locale: targetLocale},
        tags: [
          CAPABILITIES_TAG,
          'capabilityProfiles',
          localeTag('capabilityProfiles', targetLocale),
          `capability:${targetLocale}:${slug}`,
        ],
      },
      null,
    );

    if (!sanityProfile && targetLocale === 'en') {
      return FALLBACK_CAPABILITY_PROFILES.find((item) => item.slug === slug) ?? null;
    }

    return sanityProfile ? normalizeCapabilityProfile(sanityProfile) : null;
  });

  if (!profile) return null;

  return profile.visibility === 'hidden' ? null : profile;
});

export async function getRelatedCapabilityProfiles(
  currentSlug: string,
  limit = 3,
  locale: AppLocale = 'en'
): Promise<CapabilityProfileSummary[]> {
  const profiles = await getAllCapabilityProfiles(locale);
  return profiles
    .filter((profile) => profile.slug !== currentSlug)
    .slice(0, limit)
    .map(toCapabilityProfileSummary);
}
