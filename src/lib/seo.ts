import type { Metadata } from 'next';
import { CANONICAL_MARKET_IDENTITY } from './positioning';

export const SUPPORTED_LOCALES = ['en', 'fr', 'ar', 'es'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const SITE_NAME = 'Hive Vault Arc';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hivevaultarc.com';
export const LINKEDIN_URL = 'https://www.linkedin.com/company/hive-vault-arc';
export const SITE_LOGO_PATH = '/Images/favico/logo.png';
export const SITE_LOGO_WIDTH = 359;
export const SITE_LOGO_HEIGHT = 359;

export const BUSINESS_NAME = 'Hive Vault Arc';
export const BRAND_ALIASES = [
  'H.V.A',
  'HVA',
  'HiveVaultArc',
  'hivevaultarc',
  'Hive Vault ARC',
];
export const BRAND_SEARCH_VARIANTS = [...BRAND_ALIASES, 'Hive Vault', 'Vault Arc', 'hivevaultarc.com'];
export const DEFAULT_TITLE = `${SITE_NAME} | Technology Transformation Partner · Strategy · AI Engineering · Operations`;
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
    description: 'Official homepage for H.V.A technology transformation programs.',
  },
  {
    href: '/capabilities',
    label: 'Capabilities',
    anchor: 'Explore H.V.A capabilities',
    description: 'Six service pillars across strategy, AI, software, cloud, and operations.',
  },
  {
    href: '/industries',
    label: 'Industries',
    anchor: 'View industries H.V.A serves',
    description: 'Industry transformation coverage across eight business verticals.',
  },
  {
    href: '/arc',
    label: 'ARC Framework',
    anchor: 'Learn the ARC operating model',
    description: 'Assess, Re-engineer, and Command: H.V.A delivery from strategy to production.',
  },
  {
    href: '/whoweare/abouthva',
    label: 'Who We Are',
    anchor: 'Meet the H.V.A founding team',
    description: 'Founder-led team, operating principles, and transformation philosophy.',
  },
  {
    href: '/case-studies',
    label: 'Case Studies',
    anchor: 'Review H.V.A case studies',
    description: 'Production outcomes from AI operations and CRM modernization programs.',
  },
  {
    href: '/insights',
    label: 'Insights',
    anchor: 'Read H.V.A insights',
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

export function buildPageMetadata(input: PageMetaInput): Metadata {
  const canonical = new URL(input.path, SITE_URL).toString();
  const languages =
    input.alternates &&
    Object.fromEntries(
      Object.entries(input.alternates).map(([locale, path]) => [locale, new URL(path, SITE_URL).toString()])
    );

  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: input.title,
      description: input.description,
      siteName: SITE_NAME,
      locale: input.locale ?? 'en',
      images: [
        {
          url: new URL('/Images/brand/hva-ai-software-agency-tangier.webp', SITE_URL).toString(),
          width: 1200,
          height: 630,
          alt: `${input.title} | ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [new URL('/Images/brand/hva-ai-software-agency-tangier.webp', SITE_URL).toString()],
    },
  };
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function mergeKeywords(...groups: string[][]): string[] {
  return Array.from(new Set(groups.flat().map((keyword) => keyword.trim()).filter(Boolean)));
}

export function buildBreadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
