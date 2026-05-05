import type { Metadata } from 'next';
import { CANONICAL_MARKET_IDENTITY } from './positioning';

export const SUPPORTED_LOCALES = ['en', 'fr', 'ar', 'es'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const SITE_NAME = 'H.V.A';
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
  'hivevaultarc.com',
  'Hive Vault ARC',
];
export const BRAND_SEARCH_VARIANTS = [...BRAND_ALIASES, 'Hive Vault', 'Vault Arc'];
export const DEFAULT_TITLE = `${SITE_NAME} | AI & Automation · Digital Transformation · Technology Consulting`;
export const DEFAULT_DESCRIPTION = CANONICAL_MARKET_IDENTITY.longDescriptor;

export const GLOBAL_KEYWORDS = [
  BUSINESS_NAME,
  ...BRAND_SEARCH_VARIANTS,
  'AI Morocco',
  'AI consulting Tangier',
  'WhatsApp AI agent',
  'AI agents Morocco',
  'digital transformation',
  'custom software Morocco',
  'CRM Morocco',
  'IT consulting Morocco',
  'ARC program HVA',
];

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
