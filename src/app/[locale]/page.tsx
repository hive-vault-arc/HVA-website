import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '../../components/JsonLd';
import LocaleDocumentAttributes from '../../components/LocaleDocumentAttributes';
import { SITE_NAME, SITE_URL, SUPPORTED_LOCALES, type SupportedLocale, buildPageMetadata } from '../../lib/seo';
import { NOT_FOUND_METADATA } from '../../lib/not-found';
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
    secondaryLabel: string;
    proofPoints: string[];
    locationLabel: string;
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
    secondaryLabel: 'Explore ARC',
    proofPoints: ['Strategy', 'AI Engineering', 'Managed Operations'],
    locationLabel: 'Tangier, Morocco',
  },
  fr: {
    title: 'Conseil technologique et transformation digitale à Tanger, Maroc',
    h1: 'Conseil stratégique et exécution technique',
    body: "Nous accompagnons les entreprises de la stratégie à la production : conseil, architecture, IA, automatisation, logiciel sur mesure, cloud et capacités data.",
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
    cta: 'Voir les capacités',
    secondaryLabel: 'Découvrir ARC',
    proofPoints: ['Stratégie', 'Ingénierie IA', 'Opérations managées'],
    locationLabel: 'Tanger, Maroc',
  },
  ar: {
    title: 'استشارات تقنية وتحول رقمي في طنجة، المغرب',
    h1: 'استشارات استراتيجية وتنفيذ تقني',
    body: 'نرافق الشركات من الاستراتيجية إلى التشغيل الفعلي عبر الاستشارات التقنية، وهندسة الحلول، والذكاء الاصطناعي، والأتمتة، والبرمجيات المخصصة، والبنية السحابية، وخدمات البيانات.',
    keywords: [
      'استشارات تقنية في المغرب',
      'شركة تحول رقمي في طنجة',
      'استشارات التحول الرقمي في المغرب',
      'تطوير برمجيات مخصصة في المغرب',
      'تطوير تطبيقات للشركات في المغرب',
      'خدمات ترحيل نظام CRM في المغرب',
      'أتمتة سير العمل للشركات',
      'استشارات الذكاء الاصطناعي في المغرب',
      'خدمات البيانات والتحليلات للشركات',
      'فريق برمجة للشركات الناشئة في طنجة',
    ],
    primaryHref: '/ar/capabilities',
    cta: 'استكشف القدرات',
    secondaryLabel: 'اكتشف إطار ARC',
    proofPoints: ['الاستراتيجية', 'هندسة الذكاء الاصطناعي', 'العمليات المُدارة'],
    locationLabel: 'طنجة، المغرب',
  },
  es: {
    title: 'Consultoría tecnológica y transformación digital en Tánger, Marruecos',
    h1: 'Consultoría estratégica y ejecución técnica',
    body: 'Acompañamos a las empresas desde la estrategia hasta la operación en producción con IA, automatización, software a medida, modernización tecnológica, cloud y datos.',
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
    secondaryLabel: 'Descubrir ARC',
    proofPoints: ['Estrategia', 'Ingeniería de IA', 'Operaciones gestionadas'],
    locationLabel: 'Tánger, Marruecos',
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
    return NOT_FOUND_METADATA;
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

  const direction = isRtl ? 'rtl' : 'ltr';

  return (
    <>
      <LocaleDocumentAttributes locale={locale} direction={direction} />
      <JsonLd data={schema} />
      <div lang={locale} dir={direction} className="bg-white text-[#1A2535]">
        <section className="editorial-hero">
          <div className="editorial-shell grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
            <div>
              <p className="geo-kicker">{locale.toUpperCase()} · {content.locationLabel}</p>
              <h1 className="editorial-title max-w-[13ch]">{content.h1}</h1>
              <p className="editorial-lead max-w-3xl">{identity.shortDescriptor}</p>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#536070] md:text-lg">
                {content.body}
              </p>
              <div className="editorial-actions">
                <Link href={content.primaryHref} className="editorial-cta sharp-edge">
                  {content.cta}
                </Link>
                <Link href="/arc" className="editorial-link">
                  {content.secondaryLabel}
                </Link>
              </div>
            </div>
            <div className="relative min-h-[18rem] overflow-hidden bg-[#E8EBF0] md:min-h-[25rem]">
              <Image
                src="/Images/brand/hva-ai-software-agency-tangier.webp"
                alt={content.title}
                fill
                priority
                className="object-cover grayscale"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
          </div>
        </section>

        <section className="border-y border-[#DDE3EA] bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
            <ul className="grid gap-px bg-[#DDE3EA] sm:grid-cols-3" aria-label="Delivery coverage">
              {content.proofPoints.map((point, index) => (
                <li key={point} className="bg-white px-5 py-4">
                  <span className="block text-[10px] font-bold tracking-[0.18em] text-[var(--section-label-color)]">
                    0{index + 1}
                  </span>
                  <span className="mt-2 block text-sm font-semibold text-[#1A2535]">{point}</span>
                </li>
              ))}
            </ul>
            <p className="self-center text-sm leading-relaxed text-[#536070] md:text-base">
              {identity.proofStatement}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

