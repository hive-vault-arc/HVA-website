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
  'AI agency Tangier',
  'AI automation agency Morocco',
  'AI receptionist Morocco',
  'AI receptionist Tangier',
  'AI analyst Morocco',
  'AI chatbot development Morocco',
  'WhatsApp AI chatbot Morocco',
  'voice AI receptionist Morocco',
  'custom software solutions Morocco',
  'custom software development Morocco',
  'custom software company Morocco',
  'custom web application development Morocco',
  'custom mobile app development Morocco',
  'CRM migration services Morocco',
  'CRM integration services Morocco',
  'enterprise software development Morocco',
  'SaaS development Morocco',
  'product engineering agency Morocco',
  'workflow automation Morocco',
  'business process automation Morocco',
  'cloud migration Morocco',
  'cloud deployment services Morocco',
  'DevOps consulting Morocco',
  'CI/CD implementation Morocco',
  'application modernization Morocco',
  'legacy system modernization Morocco',
  'IT consulting Morocco',
  'IT services consultant Tangier',
  'IT service and consulting Morocco',
  'software company Tangier',
  'hire developers in Morocco',
  'software outsourcing Morocco',
  'build app for my company Morocco',
  'build custom CRM for my business Morocco',
  'company to build mobile app in Morocco',
  'team to build web app for startup Morocco',
  'agency to deploy my app in cloud Morocco',
  'services et conseil informatique Maroc',
  'agents IA Tanger',
  'agence IA Maroc',
  'agence automatisation Maroc',
  'réceptionniste IA Maroc',
  'analyste IA Maroc',
  'développement logiciel sur mesure Maroc',
  'développement application mobile sur mesure Maroc',
  'développement application web sur mesure Maroc',
  'migration CRM Maroc',
  'intégration CRM Maroc',
  'déploiement cloud Maroc',
  'conseil DevOps Maroc',
  'automatisation des workflows Maroc',
  'transformation digitale Maroc',
  'prestataire IT Tanger',
  'وكلاء الذكاء الاصطناعي طنجة',
  'وكالة ذكاء اصطناعي المغرب',
  'حلول برمجية مخصصة المغرب',
  'تطوير تطبيقات موبايل مخصصة المغرب',
  'تطوير تطبيقات ويب مخصصة المغرب',
  'ترحيل نظام CRM المغرب',
  'تكامل CRM المغرب',
  'خدمات ديف أوبس المغرب',
  'نشر تطبيقات سحابية المغرب',
  'أتمتة العمليات التجارية المغرب',
  'شركة برمجة طنجة',
  'استشارات تقنية المعلومات المغرب',
  'recepcionista con ia marruecos',
  'desarrollo de software a medida marruecos',
  'agencia de ia marruecos',
  'agentes de ia tanger',
  'analista de ia marruecos',
  'automatizacion de procesos marruecos',
  'desarrollo de app movil a medida marruecos',
  'desarrollo de app web a medida marruecos',
  'migracion de CRM marruecos',
  'integracion de CRM marruecos',
  'consultoria DevOps marruecos',
  'despliegue cloud marruecos',
  'empresa de software en tanger',
  'consultoria IT en marruecos',
  // Pain-point & competitive intent keywords
  'automate WhatsApp customer service Morocco',
  'WhatsApp chatbot business Morocco',
  'WhatsApp automation Morocco',
  'WhatsApp Business API integration Morocco',
  'AI WhatsApp chatbot Arabic French Morocco',
  '24/7 AI customer support Morocco',
  'reduce missed calls with AI Morocco',
  'AI receptionist replace human Morocco',
  'AI lead qualification Morocco',
  'AI appointment booking Morocco',
  'AI agent for real estate Morocco',
  'AI agent for healthcare clinic Morocco',
  'AI agent for logistics Morocco',
  'custom CRM Arabic interface Morocco',
  'bilingual chatbot French Arabic Morocco',
  'best AI agency Morocco 2025',
  'best AI agency Morocco 2026',
  'AI automation for SMEs Morocco',
  'digital transformation small business Morocco',
  'no-code automation Morocco',
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
          url: new URL('/Images/hero.webp', SITE_URL).toString(),
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
      images: [new URL('/Images/hero.webp', SITE_URL).toString()],
    },
  };
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function mergeKeywords(...groups: string[][]): string[] {
  return Array.from(new Set(groups.flat().map((keyword) => keyword.trim()).filter(Boolean)));
}
