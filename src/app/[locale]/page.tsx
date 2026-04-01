import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '../../components/JsonLd';
import { SITE_NAME, SITE_URL, SUPPORTED_LOCALES, type SupportedLocale, buildPageMetadata } from '../../lib/seo';
import { getLocaleMessaging } from '../../lib/positioning';

const homeContent: Record<
  SupportedLocale,
  {
    title: string;
    h1: string;
    body: string;
    keywords: string[];
    primaryHref: string;
    cta: string;
  }
> = {
  en: {
    title: 'Technology Consulting and Digital Transformation in Tangier, Morocco',
    h1: 'Technology Consulting + Engineering Execution',
    body: 'We guide strategy, architect solutions, build systems, and maintain production operations for teams scaling with AI, automation, software, cloud, and data.',
    keywords: [
      'technology consulting Morocco',
      'digital transformation consulting Tangier',
      'IT advisory and engineering execution',
      'AI and automation consulting Morocco',
      'workflow automation partner Morocco',
      'CRM integration with ERP Morocco',
      'cloud reliability and CI/CD Morocco',
      'data capabilities and analytics consulting Morocco',
    ],
    primaryHref: '/case-studies',
    cta: 'View Case Studies',
  },
  fr: {
    title: 'Conseil technologique et transformation digitale à Tanger, Maroc',
    h1: 'Conseil stratégique et execution technique',
    body: "Nous accompagnons les entreprises de la strategie a la production: conseil, architecture, IA, automatisation, logiciel sur mesure, cloud et capacites data.",
    keywords: [
      'conseil technologique maroc',
      'cabinet transformation digitale tanger',
      'strategie IT et execution technique',
      'développement logiciel sur mesure Maroc',
      'développement application mobile entreprise Maroc',
      'développement application web sur mesure Tanger',
      'migration CRM Maroc',
      'intégration CRM et ERP Maroc',
      'automatisation des workflows entreprise Maroc',
      'migration cloud et déploiement Maroc',
      'conseil DevOps et CI/CD Maroc',
      'consulting IA et automatisation maroc',
      'capacites data et reporting decisionnel maroc',
      'j’ai besoin d’une équipe pour créer mon application au Maroc',
      'meilleure equipe software pour startup à Tanger',
    ],
    primaryHref: '/fr/capabilities',
    cta: 'Voir les capacites',
  },
  ar: {
    title: 'استشارات تقنية وتحول رقمي في طنجة، المغرب',
    h1: 'استشارات استراتيجية وتنفيذ تقني',
    body: 'نرافق الشركات من الاستراتيجية الى التشغيل الفعلي: استشارات تقنية وهندسة حلول وذكاء اصطناعي واتوماسيون وبرمجيات مخصصة وبنية سحابية وخدمات بيانات.',
    keywords: [
      'استشارات تقنية المغرب',
      'شركة تحول رقمي طنجة',
      'استشارات التحول الرقمي المغرب',
      'تطوير برمجيات مخصصة المغرب',
      'تطوير تطبيق موبايل مخصص للشركات المغرب',
      'تطوير تطبيق ويب مخصص طنجة',
      'خدمات ترحيل CRM المغرب',
      'تكامل CRM مع ERP المغرب',
      'أتمتة سير العمل للشركات المغرب',
      'ترحيل ونشر سحابي المغرب',
      'استشارات DevOps و CI/CD المغرب',
      'استشارات الذكاء الاصطناعي والاتمتة للمؤسسات',
      'خدمات البيانات ولوحات القرار للمؤسسات',
      'أحتاج فريق لتطوير تطبيقي في المغرب',
      'افضل فريق برمجة للشركات الناشئة في طنجة',
    ],
    primaryHref: '/ar/capabilities',
    cta: 'استكشف القدرات',
  },
  es: {
    title: 'Consultoria tecnologica y transformacion digital en Tanger, Marruecos',
    h1: 'Consultoria estrategica y ejecucion tecnica',
    body: 'Acompanamos a empresas desde la estrategia hasta la operacion en produccion con IA, automatizacion, software a medida, modernizacion IT, cloud y datos.',
    keywords: [
      'consultoria tecnologica marruecos',
      'transformacion digital tanger',
      'consultoria IT y ejecucion tecnica',
      'desarrollo de software a medida marruecos',
      'desarrollo de app movil personalizada para empresa',
      'desarrollo de app web personalizada tanger',
      'servicios de migracion de CRM marruecos',
      'integracion de CRM con ERP marruecos',
      'automatizacion de flujos de trabajo empresariales',
      'migracion y despliegue cloud marruecos',
      'consultoria DevOps y CI/CD marruecos',
      'consultoria de IA y automatizacion para empresas',
      'capacidades de datos y reporting ejecutivo marruecos',
      'necesito equipo para crear mi app en marruecos',
      'mejor equipo de software para startup en tanger',
    ],
    primaryHref: '/es/capabilities',
    cta: 'Ver capacidades',
  },
};

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as SupportedLocale)) {
    return {};
  }

  const content = homeContent[locale as SupportedLocale];
  const identity = getLocaleMessaging(locale).identity;
  const base = buildPageMetadata({
    title: content.title,
    description: identity.longDescriptor,
    path: `/${locale}`,
    locale,
    keywords: content.keywords,
    alternates: {
      en: '/',
      fr: '/fr',
      ar: '/ar',
      es: '/es',
      'x-default': '/',
    },
  });

  // /en duplicates the English root page — keep it crawlable but non-indexed
  // so link equity and canonical authority stay on /
  if (locale === 'en') {
    return {
      ...base,
      robots: { index: false, follow: true },
      alternates: { canonical: '/' },
    };
  }

  return base;
}

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as SupportedLocale)) {
    notFound();
  }

  const isRtl = locale === 'ar';
  const content = homeContent[locale as SupportedLocale];
  const identity = getLocaleMessaging(locale).identity;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: content.title,
    description: identity.longDescriptor,
    keywords: content.keywords,
    url: `${SITE_URL}/${locale}`,
    inLanguage: locale,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <section
      className="mx-auto max-w-6xl px-6 py-28 md:py-36"
      lang={locale}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <JsonLd data={schema} />
      <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">{locale.toUpperCase()}</p>
      <h1 className="mb-6 font-serif text-4xl leading-tight text-[#0F172A] md:text-6xl">{content.h1}</h1>
      <p className="max-w-3xl text-lg leading-relaxed text-[#334155]">{identity.shortDescriptor}</p>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#334155]">{content.body}</p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#475569]">{identity.proofStatement}</p>
      <Link
        href={content.primaryHref}
        className="mt-10 inline-flex items-center rounded bg-[#0F172A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2563EB]"
      >
        {content.cta}
      </Link>
    </section>
  );
}

