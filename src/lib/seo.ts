import type { Metadata } from 'next';

export const SUPPORTED_LOCALES = ['en', 'fr', 'ar', 'es'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const SITE_NAME = 'H.V.A';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.hiva.ma';

export const BUSINESS_NAME = 'Hive Vault Arc';
export const DEFAULT_TITLE = `${SITE_NAME} | AI, Software & Cloud Engineering in Tangier, Morocco`;
export const DEFAULT_DESCRIPTION =
  'H.V.A builds AI agents, custom software platforms, workflow automations, and cloud infrastructure for businesses in Tangier and across Morocco.';

export const GLOBAL_KEYWORDS = [
  'AI agents Tangier',
  'AI agents Morocco',
  'AI receptionist Morocco',
  'custom software solutions Morocco',
  'IT services consultant Tangier',
  'services et conseil informatique Maroc',
  'agents IA Tanger',
  'وكلاء الذكاء الاصطناعي طنجة',
  'حلول برمجية مخصصة المغرب',
  'recepcionista con ia marruecos',
  'desarrollo de software a medida marruecos',
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
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
    },
  };
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
