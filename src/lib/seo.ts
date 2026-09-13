import type { Metadata } from 'next';
import { CANONICAL_MARKET_IDENTITY } from './positioning';
import {COMPANY_ENTITY_FACTS, COMPANY_SOCIAL_PROFILES} from './entity-facts';
import {LOCALE_PROFILES, PUBLIC_LOCALES, type AppLocale} from '@/i18n/config';
import type {AppPathname} from '@/i18n/routing';
import {localizedAlternates, localizedPath} from '@/i18n/route-manifest';

export const SUPPORTED_LOCALES = PUBLIC_LOCALES;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export {COMPANY_ENTITY_FACTS};

export const SITE_NAME = COMPANY_ENTITY_FACTS.publicBrandName;
export const CANONICAL_SITE_URL = COMPANY_ENTITY_FACTS.canonicalWebsite;

export function resolveSiteUrl(
  configuredUrl = process.env.NEXT_PUBLIC_SITE_URL,
  vercelEnvironment = process.env.VERCEL_ENV,
): string {
  const candidate = configuredUrl?.trim() || CANONICAL_SITE_URL;
  let parsed: URL;

  try {
    parsed = new URL(candidate);
  } catch {
    throw new Error('NEXT_PUBLIC_SITE_URL must be a valid absolute URL.');
  }

  const hasUnexpectedParts =
    parsed.protocol !== 'https:' ||
    parsed.username !== '' ||
    parsed.password !== '' ||
    parsed.pathname !== '/' ||
    parsed.search !== '' ||
    parsed.hash !== '';

  if (hasUnexpectedParts) {
    throw new Error(
      'NEXT_PUBLIC_SITE_URL must be an HTTPS origin without a path, query, fragment, or credentials.',
    );
  }

  const normalized = parsed.origin.toLowerCase();
  if (vercelEnvironment === 'production' && normalized !== CANONICAL_SITE_URL) {
    throw new Error(
      `Vercel Production must use NEXT_PUBLIC_SITE_URL=${CANONICAL_SITE_URL}.`,
    );
  }

  return normalized;
}

export const SITE_URL = resolveSiteUrl();
export const LINKEDIN_URL = COMPANY_SOCIAL_PROFILES[0].url;
export const SITE_LOGO_PATH = '/Images/brand/hva-icon-static-light-surface.svg';
export const SITE_LOGO_WIDTH = 100;
export const SITE_LOGO_HEIGHT = 100;
// Social previews use a rasterized version of the same micro lockup rendered in
// the navbar. Keeping this as a 1200×630 WebP makes the mark reliable across
// LinkedIn, WhatsApp, Slack, and other link unfurlers that do not render SVG OG
// images consistently.
export const DEFAULT_OG_IMAGE_PATH = '/Images/brand/hva-og-share.webp';
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;

export const BUSINESS_NAME = COMPANY_ENTITY_FACTS.publicBrandName;
export const DISPLAY_BRAND_NAME = BUSINESS_NAME;
export const DISPLAY_BRAND_NAME_UPPER = 'HIVE VAULT ARC';
export const BRAND_ABBREVIATION = 'H.V.A';
export const BRAND_INITIALISM = 'HVA';
export const BRAND_ALIASES = [
  BRAND_ABBREVIATION,
  BRAND_INITIALISM,
  'HiveVaultArc',
  'hivevaultarc',
  'Hive Vault ARC',
];
export const BRAND_SEARCH_VARIANTS = [...BRAND_ALIASES, 'Hive Vault', 'Vault Arc', 'hivevaultarc.com'];
export const CONTACT_EMAIL = COMPANY_ENTITY_FACTS.publicEmail;
export const CONTACT_PHONE_E164 = COMPANY_ENTITY_FACTS.publicPhoneE164;
export const CONTACT_PHONE_DISPLAY = COMPANY_ENTITY_FACTS.publicPhoneDisplay;
export const WHATSAPP_URL = COMPANY_ENTITY_FACTS.whatsappUrl;
export const SOCIAL_PROFILES = COMPANY_SOCIAL_PROFILES;
export const SOCIAL_PROFILE_URLS = SOCIAL_PROFILES.map((profile) => profile.url);
export const DEFAULT_TITLE = `${SITE_NAME} | Technology Transformation Partner - Strategy, AI Engineering, Operations`;
export const DEFAULT_DESCRIPTION = CANONICAL_MARKET_IDENTITY.longDescriptor;

export const GLOBAL_KEYWORDS = [
  BUSINESS_NAME,
  ...BRAND_SEARCH_VARIANTS,
  // Core positioning
  'technology transformation partner Morocco',
  'technology transformation partner Tangier',
  'technology consulting firm Morocco',
  'AI engineering firm Morocco',
  'digital transformation company Morocco',
  'managed operations Morocco',
  // Service pillar keywords
  'strategy consulting Morocco',
  'AI agents Morocco',
  'WhatsApp AI agent Morocco',
  'custom software Morocco',
  'cloud infrastructure Morocco',
  'IT consulting Morocco',
  'IT consulting Tangier',
  // Industry keywords
  'real estate technology Morocco',
  'healthcare technology Morocco',
  'government digital transformation Morocco',
  // Local/multilingual
  'digital services Tangier',
  'digital services Morocco',
  'services digitaux Tanger',
  'agence digitale Tanger',
  'ARC program HVA',
  'CRM Morocco',
];

export const SITELINK_CANDIDATES = [
  {
    href: '/',
    label: 'Home',
    anchor: 'Visit the Hive Vault Arc homepage',
    description: 'Official homepage for Hive Vault Arc technology transformation programs.',
  },
  {
    href: '/capabilities',
    label: 'Capabilities',
    anchor: 'Explore Hive Vault Arc capabilities',
    description: 'Six service pillars across strategy, AI, software, cloud, and operations.',
  },
  {
    href: '/industries',
    label: 'Industries',
    anchor: 'View industries Hive Vault Arc serves',
    description: 'Industry transformation coverage across eight business verticals.',
  },
  {
    href: '/arc',
    label: 'ARC Framework',
    anchor: 'Learn the ARC operating model',
    description: 'Assess, Re-engineer, and Command: Hive Vault Arc delivery from strategy to production.',
  },
  {
    href: '/aboutus',
    label: 'Who We Are',
    anchor: 'Meet the Hive Vault Arc founding team',
    description: 'Founder-led team, operating principles, and transformation philosophy.',
  },
  {
    href: '/case-studies',
    label: 'Case Studies',
    anchor: 'Review Hive Vault Arc case studies',
    description: 'Production outcomes from AI operations and CRM modernization programs.',
  },
  {
    href: '/insights',
    label: 'Insights',
    anchor: 'Read Hive Vault Arc insights',
    description: 'Blogs, case studies, perspectives, news, and research reports.',
  },
  {
    href: '/contact',
    label: 'Contact',
    anchor: 'Start a transformation discovery',
    description: 'Book a discovery call to scope strategy, engineering, and operations needs.',
  },
  {
    href: '/ai-agents-tangier',
    label: 'AI Agents Tangier',
    anchor: 'Explore AI agents in Tangier',
    description: 'Local AI agent development for WhatsApp, lead operations, and support workflows.',
  },
] as const;

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  locale?: string;
  alternates?: Record<string, string>;
};

type LocalizedPageMetaInput = Omit<PageMetaInput, 'path' | 'locale' | 'alternates'> & {
  locale: AppLocale;
  pathname: AppPathname;
  params?: Record<string, string | number>;
  translationParams?: Partial<Record<AppLocale, Record<string, string | number>>>;
};

export function compactMetaDescription(description: string, maxLength = 160): string {
  const normalized = description.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;

  const candidate = normalized.slice(0, Math.max(1, maxLength - 3));
  const wordBoundary = candidate.lastIndexOf(' ');
  const shortened = wordBoundary > maxLength * 0.65 ? candidate.slice(0, wordBoundary) : candidate;

  return `${shortened.replace(/[.,;:!?-]+$/, '')}...`;
}

export function buildPageMetadata(input: PageMetaInput): Metadata {
  const canonical = new URL(input.path, SITE_URL).toString();
  const description = compactMetaDescription(input.description);
  const languages =
    input.alternates &&
    Object.fromEntries(
      Object.entries(input.alternates).map(([locale, path]) => [locale, new URL(path, SITE_URL).toString()])
    );

  return {
    title: input.title,
    description,
    keywords: input.keywords,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: input.title,
      description,
      siteName: SITE_NAME,
      locale: input.locale ?? 'en',
      images: [
        {
          url: new URL(DEFAULT_OG_IMAGE_PATH, SITE_URL).toString(),
          width: DEFAULT_OG_IMAGE_WIDTH,
          height: DEFAULT_OG_IMAGE_HEIGHT,
          alt: `${input.title} | ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description,
      images: [new URL(DEFAULT_OG_IMAGE_PATH, SITE_URL).toString()],
    },
  };
}

export function buildLocalizedPageMetadata(input: LocalizedPageMetaInput): Metadata {
  const path = localizedPath(input.pathname, input.locale, input.params);
  const alternates = localizedAlternates(
    input.pathname,
    input.translationParams ??
      (input.params
        ? {
            [input.locale]: input.params,
          }
        : undefined),
  );

  return buildPageMetadata({
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    path,
    locale: LOCALE_PROFILES[input.locale].openGraphLocale,
    alternates,
  });
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export const SCHEMA_IDS = Object.freeze({
  organization: absoluteUrl('/#organization'),
  website: absoluteUrl('/#website'),
});

export function schemaId(path: string, fragment: string): string {
  const url = new URL(path, SITE_URL);
  url.hash = fragment.replace(/^#/, '');
  return url.toString();
}

export function mergeKeywords(...groups: string[][]): string[] {
  return Array.from(new Set(groups.flat().map((keyword) => keyword.trim()).filter(Boolean)));
}

export function buildBreadcrumbSchema(crumbs: { name: string; path: string }[]) {
  const lastCrumb = crumbs.at(-1);
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    ...(lastCrumb ? {'@id': schemaId(lastCrumb.path, 'breadcrumb')} : {}),
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function buildLocalizedBreadcrumbSchema(
  locale: AppLocale,
  crumbs: Array<{
    name: string;
    pathname: AppPathname;
    params?: Record<string, string | number>;
  }>,
) {
  return buildBreadcrumbSchema(
    crumbs.map((crumb) => ({
      name: crumb.name,
      path: localizedPath(crumb.pathname, locale, crumb.params),
    })),
  );
}
