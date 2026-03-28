import type { Metadata } from 'next';
import { CANONICAL_MARKET_IDENTITY } from './positioning';

export const SUPPORTED_LOCALES = ['en', 'fr', 'ar', 'es'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const SITE_NAME = 'H.V.A';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hiva-nine.vercel.app';

export const BUSINESS_NAME = 'Hive Vault Arc';
export const DEFAULT_TITLE = `${SITE_NAME} | AI & Automation · Digital Transformation · Technology Consulting`;
export const DEFAULT_DESCRIPTION = CANONICAL_MARKET_IDENTITY.longDescriptor;

export const GLOBAL_KEYWORDS = [
  'AI automation company Morocco',
  'AI agents Morocco',
  'intelligent automation Morocco',
  'AI-powered digital transformation Morocco',
  'digital transformation company Morocco',
  'digital transformation firm Tangier',
  'technology consulting firm Morocco',
  'digital transformation consulting Morocco',
  'IT consulting and engineering Morocco',
  'AI consulting and automation Morocco',
  'custom software development Morocco',
  'custom enterprise software Tangier',
  'custom CRM development Morocco',
  'CRM migration and integration Morocco',
  'workflow automation consulting Morocco',
  'business process automation Morocco',
  'AI agent development Morocco',
  'WhatsApp AI agent Morocco',
  'AI receptionist Morocco',
  'decision intelligence dashboards Morocco',
  'mobile app development Morocco',
  'web application engineering Morocco',
  'SaaS development Morocco',
  'legacy system modernization Morocco',
  'application modernization Morocco',
  'cloud infrastructure consulting Morocco',
  'cloud migration Morocco',
  'DevOps consulting Morocco',
  'CI/CD engineering Morocco',
  'data services consulting Morocco',
  'managed software maintenance Morocco',
  'long-term technology partner Morocco',
  'technology strategy consulting Tangier',
  'services et conseil informatique Maroc',
  'cabinet conseil transformation digitale Maroc',
  'conseil technologie et architecture Maroc',
  'agents IA Tanger',
  'agence IA Maroc',
  'développement logiciel sur mesure Maroc',
  'migration CRM Maroc',
  'intégration CRM Maroc',
  'déploiement cloud Maroc',
  'conseil DevOps Maroc',
  'modernisation informatique Maroc',
  'وكلاء الذكاء الاصطناعي طنجة',
  'استشارات التحول الرقمي المغرب',
  'استشارات تقنية المعلومات المغرب',
  'تطوير برمجيات مخصصة المغرب',
  'ترحيل نظام CRM المغرب',
  'تكامل CRM المغرب',
  'نشر تطبيقات سحابية المغرب',
  'خدمات ديف أوبس المغرب',
  'consultoria transformacion digital marruecos',
  'consultoria tecnologica marruecos',
  'agencia de ia marruecos',
  'desarrollo de software a medida marruecos',
  'migracion de CRM marruecos',
  'integracion de CRM marruecos',
  'despliegue cloud marruecos',
  'consultoria DevOps marruecos',
  'software company Tangier',
  'AI agency Morocco',
  'software agency Tangier',
  'automation agency Morocco',
  'automate WhatsApp customer service Morocco',
  'WhatsApp Business API integration Morocco',
  'AI lead qualification Morocco',
  'AI appointment booking Morocco',
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
          url: new URL('/Images/hva-ai-software-agency-tangier.webp', SITE_URL).toString(),
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
      images: [new URL('/Images/hva-ai-software-agency-tangier.webp', SITE_URL).toString()],
    },
  };
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function mergeKeywords(...groups: string[][]): string[] {
  return Array.from(new Set(groups.flat().map((keyword) => keyword.trim()).filter(Boolean)));
}
