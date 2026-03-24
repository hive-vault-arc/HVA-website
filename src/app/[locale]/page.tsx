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
    servicesHref: string;
    cta: string;
  }
> = {
  en: {
    title: 'AI Agents and Custom Software in Tangier, Morocco',
    description:
      'H.V.A builds AI receptionist systems, AI analyst tools, workflow automations, custom software platforms, and cloud infrastructure.',
    h1: 'AI, Software, and Cloud Systems Built for Growth',
    body: 'We engineer AI agents, automation pipelines, and custom software products for companies in Tangier and across Morocco.',
    servicesHref: '/en/services',
    cta: 'Explore Services',
  },
  fr: {
    title: 'Agents IA et logiciels sur mesure à Tanger, Maroc',
    description:
      "H.V.A conçoit des systèmes de réceptionniste IA, d'analyse IA, d'automatisation des workflows, de plateformes logicielles et d'infrastructure cloud.",
    h1: 'Systèmes IA, logiciels et cloud pour la croissance',
    body: 'Nous développons des agents IA, des automatisations métiers et des plateformes sur mesure pour les entreprises à Tanger et au Maroc.',
    servicesHref: '/fr/services',
    cta: 'Voir les services',
  },
  ar: {
    title: 'وكلاء ذكاء اصطناعي وبرمجيات مخصصة في طنجة، المغرب',
    description:
      'تقوم H.V.A ببناء أنظمة استقبال بالذكاء الاصطناعي، أدوات تحليل ذكية، أتمتة سير العمل، منصات برمجية مخصصة، وبنية سحابية.',
    h1: 'أنظمة ذكاء اصطناعي وبرمجيات وسحابة تدعم النمو',
    body: 'نقوم بهندسة وكلاء الذكاء الاصطناعي وخطوط الأتمتة والمنتجات البرمجية للشركات في طنجة وفي مختلف أنحاء المغرب.',
    servicesHref: '/ar/services',
    cta: 'استكشف الخدمات',
  },
  es: {
    title: 'Agentes de IA y software a medida en Tánger, Marruecos',
    description:
      'H.V.A crea recepcionistas con IA, analistas IA, automatizacion de flujos, plataformas de software a medida e infraestructura cloud.',
    h1: 'Sistemas de IA, software y cloud para crecer',
    body: 'Desarrollamos agentes de IA, automatizaciones y productos de software para empresas en Tanger y en todo Marruecos.',
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
  return buildPageMetadata({
    title: content.title,
    description: content.description,
    path: `/${locale}`,
    locale,
    keywords: [content.title, content.h1],
    alternates: {
      en: '/en',
      fr: '/fr',
      ar: '/ar',
      es: '/es',
      'x-default': '/en',
    },
  });
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
