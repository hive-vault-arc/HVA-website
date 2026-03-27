import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '../../components/JsonLd';
import { SITE_NAME, SITE_URL, SUPPORTED_LOCALES, type SupportedLocale, buildPageMetadata } from '../../lib/seo';

const homeContent: Record<
  SupportedLocale,
  {
    title: string;
    description: string;
    h1: string;
    body: string;
    keywords: string[];
    servicesHref: string;
    cta: string;
  }
> = {
  en: {
    title: 'AI-Driven Business Transformation Partner in Tangier, Morocco',
    description:
      'Hive Vault Arc is an AI-driven business transformation partner that designs, builds, and operates intelligent systems that run core business operations.',
    h1: 'AI Business Operating Systems for Core Operations',
    body: 'We redesign and automate how businesses operate through consulting, AI agents, CRM, custom software, mobile apps, and SaaS systems.',
    keywords: [
      'AI business operating systems Morocco',
      'AI-driven business transformation partner',
      'AI agents Morocco',
      'operational systems consulting',
      'workflow automation partner Morocco',
      'CRM integration with ERP Morocco',
      'cloud reliability and CI/CD Morocco',
      'AI analyst dashboards for company decisions',
      'real estate operating system',
      'clinic operating system',
      'construction operations system',
    ],
    servicesHref: '/case-studies',
    cta: 'View Case Studies',
  },
  fr: {
    title: 'Agents IA et logiciels sur mesure à Tanger, Maroc',
    description:
      "H.V.A conçoit des systèmes de réceptionniste IA, d'analyse IA, d'automatisation des workflows, de plateformes logicielles et d'infrastructure cloud.",
    h1: 'Systèmes IA, logiciels et cloud pour la croissance',
    body: 'Nous développons des agents IA, des automatisations métiers et des plateformes sur mesure pour les entreprises à Tanger et au Maroc.',
    keywords: [
      'agence IA Tanger',
      'agents IA Maroc',
      'développement logiciel sur mesure Maroc',
      'développement application mobile entreprise Maroc',
      'développement application web sur mesure Tanger',
      'migration CRM Maroc',
      'intégration CRM et ERP Maroc',
      'automatisation des workflows entreprise Maroc',
      'migration cloud et déploiement Maroc',
      'conseil DevOps et CI/CD Maroc',
      'mise en place réceptionniste IA entreprise',
      'analyste IA pour reporting décisionnel',
      'j’ai besoin d’une équipe pour créer mon application au Maroc',
      'meilleure agence software pour startup à Tanger',
    ],
    servicesHref: '/fr/services',
    cta: 'Voir les services',
  },
  ar: {
    title: 'وكلاء ذكاء اصطناعي وبرمجيات مخصصة في طنجة، المغرب',
    description:
      'تقوم H.V.A ببناء أنظمة استقبال بالذكاء الاصطناعي، أدوات تحليل ذكية، أتمتة سير العمل، منصات برمجية مخصصة، وبنية سحابية.',
    h1: 'أنظمة ذكاء اصطناعي وبرمجيات وسحابة تدعم النمو',
    body: 'نقوم بهندسة وكلاء الذكاء الاصطناعي وخطوط الأتمتة والمنتجات البرمجية للشركات في طنجة وفي مختلف أنحاء المغرب.',
    keywords: [
      'وكالة ذكاء اصطناعي طنجة',
      'وكلاء ذكاء اصطناعي المغرب',
      'تطوير برمجيات مخصصة المغرب',
      'تطوير تطبيق موبايل مخصص للشركات المغرب',
      'تطوير تطبيق ويب مخصص طنجة',
      'خدمات ترحيل CRM المغرب',
      'تكامل CRM مع ERP المغرب',
      'أتمتة سير العمل للشركات المغرب',
      'ترحيل ونشر سحابي المغرب',
      'استشارات DevOps و CI/CD المغرب',
      'تنفيذ استقبال آلي بالذكاء الاصطناعي للشركات',
      'محلل ذكاء اصطناعي لتقارير الإدارة',
      'أحتاج فريق لتطوير تطبيقي في المغرب',
      'أفضل شركة برمجة للشركات الناشئة في طنجة',
    ],
    servicesHref: '/ar/services',
    cta: 'استكشف الخدمات',
  },
  es: {
    title: 'Agentes de IA y software a medida en Tánger, Marruecos',
    description:
      'H.V.A crea recepcionistas con IA, analistas IA, automatizacion de flujos, plataformas de software a medida e infraestructura cloud.',
    h1: 'Sistemas de IA, software y cloud para crecer',
    body: 'Desarrollamos agentes de IA, automatizaciones y productos de software para empresas en Tanger y en todo Marruecos.',
    keywords: [
      'agencia de IA en tanger',
      'agentes de IA marruecos',
      'desarrollo de software a medida marruecos',
      'desarrollo de app movil personalizada para empresa',
      'desarrollo de app web personalizada tanger',
      'servicios de migracion de CRM marruecos',
      'integracion de CRM con ERP marruecos',
      'automatizacion de flujos de trabajo empresariales',
      'migracion y despliegue cloud marruecos',
      'consultoria DevOps y CI/CD marruecos',
      'implementacion recepcionista con IA para negocios',
      'analista de IA para reportes ejecutivos',
      'necesito equipo para crear mi app en marruecos',
      'mejor empresa de software para startup en tanger',
    ],
    servicesHref: '/es/services',
    cta: 'Ver servicios',
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
  const base = buildPageMetadata({
    title: content.title,
    description: content.description,
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
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: content.title,
    description: content.description,
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
      <p className="max-w-3xl text-lg leading-relaxed text-[#334155]">{content.body}</p>
      <Link
        href={content.servicesHref}
        className="mt-10 inline-flex items-center rounded bg-[#0F172A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2563EB]"
      >
        {content.cta}
      </Link>
    </section>
  );
}
