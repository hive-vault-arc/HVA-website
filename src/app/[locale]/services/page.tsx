import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '../../../components/JsonLd';
import FaqSection from '../../../components/FaqSection';
import { LOCALE_SERVICES_FAQS } from '../../../data/faqs';
import { SITE_URL, SUPPORTED_LOCALES, type SupportedLocale, buildPageMetadata } from '../../../lib/seo';
import { getLocaleMessaging } from '../../../lib/positioning';

const servicesContent: Record<
  SupportedLocale,
  {
    title: string;
    description: string;
    h1: string;
    intro: string;
    keywords: string[];
    bullets: string[];
  }
> = {
  en: {
    title: 'Technology Consulting Services in Morocco',
    description:
      'Consulting and engineering services from H.V.A: advisory, architecture, AI automation, custom software, modernization, cloud, and data services.',
    h1: 'Advisory to Execution Service Lines',
    intro:
      'Our engagement model spans strategic consulting, architecture, technical execution, and managed evolution so systems continue performing after launch.',
    keywords: [
      'technology consulting services morocco',
      'digital transformation services morocco',
      'it strategy advisory tangier',
      'workflow automation morocco',
      'custom software development morocco',
      'cloud infrastructure morocco',
      'custom mobile app development company morocco',
      'custom web app development company morocco',
      'crm migration and integration morocco',
      'build internal operations app morocco',
      'deploy my app to cloud morocco',
      'devops consulting for startups morocco',
      'ci cd setup for engineering teams morocco',
      'ai customer support agent implementation morocco',
      'ai lead qualification automation morocco',
      'legacy system modernization morocco',
      'enterprise saas engineering morocco',
      'business process automation tangier',
      'application performance optimization morocco',
      'security hardening and reliability engineering morocco',
    ],
    bullets: [
      'AI systems: agents, automation, and decision intelligence',
      'Business transformation: modernization and CRM operations redesign',
      'Consulting: strategy, architecture, roadmaps, and tech function',
      'Engineering: web, mobile, SaaS, and cloud systems',
      'Data and growth: analytics, data pipelines, and marketing systems',
      'Cybersecurity, emerging tech (deep tech + IoT), and BOT delivery model',
    ],
  },
  fr: {
    title: 'Services de conseil technologique au Maroc',
    description:
      'Services H.V.A: conseil technologique, transformation digitale, IA, automatisation, logiciel sur mesure, modernisation IT et cloud.',
    h1: 'Conseil, architecture et execution',
    intro:
      "Nous accompagnons les entreprises de la strategie jusqu'a l'exploitation en production avec un modele de delivery clair et mesurable.",
    keywords: [
      'services conseil technologique maroc',
      'transformation digitale entreprise maroc',
      'strategie IT et architecture maroc',
      'automatisation des workflows maroc',
      'développement logiciel sur mesure maroc',
      'infrastructure cloud maroc',
      'développement application mobile sur mesure entreprise maroc',
      'développement application web sur mesure entreprise maroc',
      'migration et intégration crm maroc',
      'création application interne entreprise maroc',
      'déployer mon application sur cloud maroc',
      'conseil devops startup maroc',
      'mise en place pipeline ci cd maroc',
      'agent ia service client maroc',
      'automatisation qualification de leads maroc',
      'modernisation système legacy maroc',
      'ingénierie saas entreprise maroc',
      'automatisation process métier tanger',
      'optimisation performance application maroc',
      'sécurité applicative et fiabilité cloud maroc',
    ],
    bullets: [
      "Systemes IA : agents, automatisation et intelligence decisionnelle",
      "Transformation metier et IT : modernisation et refonte CRM/operations",
      "Conseil : strategie, architecture, roadmaps et fonction technologique",
      "Ingenierie : web, mobile, SaaS et systemes cloud",
      "Data et croissance : analytics, pipelines data et marketing systems",
      "Cybersecurite, deep tech, IoT et modele Build-Operate-Transfer",
    ],
  },
  ar: {
    title: 'خدمات الاستشارات التقنية في المغرب',
    description:
      'خدمات H.V.A تشمل الاستشارات التقنية والتحول الرقمي والذكاء الاصطناعي والأتمتة وتطوير البرمجيات وتحديث البنية التقنية والسحابة.',
    h1: 'من الاستراتيجية الى التنفيذ',
    intro:
      'نعمل مع فرق القيادة لتحديد الاولويات وبناء الانظمة وتشغيلها وصيانتها ضمن دورة تسليم واضحة ومستمرة.',
    keywords: [
      'خدمات استشارات تقنية المغرب',
      'خدمات التحول الرقمي للشركات المغرب',
      'استراتيجية تقنية وهندسة حلول المغرب',
      'أتمتة سير العمل المغرب',
      'تطوير برمجيات مخصصة المغرب',
      'البنية التحتية السحابية المغرب',
      'شركة تطوير تطبيقات موبايل مخصصة المغرب',
      'شركة تطوير تطبيقات ويب مخصصة المغرب',
      'ترحيل وتكامل نظام CRM المغرب',
      'بناء تطبيق داخلي لإدارة العمليات المغرب',
      'نشر التطبيقات على السحابة المغرب',
      'استشارات DevOps للشركات الناشئة المغرب',
      'إعداد خطوط CI CD لفرق التطوير المغرب',
      'تنفيذ وكيل ذكاء اصطناعي لخدمة العملاء المغرب',
      'أتمتة تأهيل العملاء المحتملين المغرب',
      'تحديث الأنظمة القديمة إلى أنظمة حديثة المغرب',
      'هندسة منصات SaaS للمؤسسات المغرب',
      'أتمتة العمليات التجارية طنجة',
      'تحسين أداء التطبيقات المغرب',
      'تقوية أمن التطبيقات وموثوقية البنية السحابية المغرب',
    ],
    bullets: [
      'أنظمة الذكاء الاصطناعي: وكلاء، أتمتة، وذكاء قراري',
      'التحول المؤسسي والتقني: تحديث شامل وإعادة تصميم CRM والعمليات',
      'الاستشارات: استراتيجية، معمارية، خرائط طريق، وتصميم وظيفة التقنية',
      'الهندسة: تطبيقات ويب وموبايل ومنصات SaaS وأنظمة سحابية',
      'البيانات والنمو: تحليلات، خطوط بيانات، وأنظمة تسويق',
      'الأمن السيبراني، التقنيات الناشئة (Deep Tech وIoT)، ونموذج BOT',
    ],
  },
  es: {
    title: 'Servicios de consultoria tecnologica en Marruecos',
    description:
      'Servicios de H.V.A: consultoria tecnologica, transformacion digital, IA, automatizacion, software a medida, modernizacion IT y cloud.',
    h1: 'De la estrategia a la ejecucion',
    intro:
      'Trabajamos con equipos directivos para disenar la estrategia, ejecutar la ingenieria y mantener la operacion en produccion a largo plazo.',
    keywords: [
      'servicios de consultoria tecnologica marruecos',
      'transformacion digital para empresas marruecos',
      'estrategia IT y arquitectura tecnica marruecos',
      'automatizacion de flujos de trabajo marruecos',
      'desarrollo de software a medida marruecos',
      'infraestructura cloud marruecos',
      'empresa desarrollo app movil personalizada marruecos',
      'empresa desarrollo app web personalizada marruecos',
      'migracion e integracion crm marruecos',
      'crear aplicacion interna para operaciones marruecos',
      'desplegar mi aplicacion en cloud marruecos',
      'consultoria devops para startups marruecos',
      'implementacion pipeline ci cd para equipos de desarrollo',
      'agente de ia para atencion al cliente marruecos',
      'automatizacion de calificacion de leads marruecos',
      'modernizacion de sistemas legacy marruecos',
      'ingenieria saas empresarial marruecos',
      'automatizacion de procesos empresariales tanger',
      'optimizacion de rendimiento de aplicaciones marruecos',
      'seguridad de aplicaciones y confiabilidad cloud marruecos',
    ],
    bullets: [
      'Sistemas de IA: agentes, automatizacion e inteligencia de decision',
      'Transformacion negocio+IT: modernizacion y rediseño de CRM/operaciones',
      'Consultoria: estrategia, arquitectura, hojas de ruta y funcion tecnologica',
      'Ingenieria: web, movil, SaaS y sistemas cloud',
      'Data y crecimiento: analitica, pipelines de datos y marketing systems',
      'Ciberseguridad, deep tech, IoT y modelo Build-Operate-Transfer',
    ],
  },
};

type LocaleServicesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as SupportedLocale)) {
    return {};
  }

  const content = servicesContent[locale as SupportedLocale];
  const identity = getLocaleMessaging(locale).identity;

  const base = buildPageMetadata({
    title: content.title,
    description: identity.longDescriptor,
    path: locale === 'en' ? '/services' : `/${locale}/services`,
    locale,
    keywords: content.keywords,
    alternates: {
      en: '/services',
      fr: '/fr/services',
      ar: '/ar/services',
      es: '/es/services',
      'x-default': '/services',
    },
  });

  if (locale === 'en') {
    return {
      ...base,
      robots: { index: false, follow: true },
      alternates: { ...(base.alternates ?? {}), canonical: '/services' },
    };
  }

  return base;
}

export default async function LocaleServicesPage({ params }: LocaleServicesPageProps) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as SupportedLocale)) {
    notFound();
  }

  const content = servicesContent[locale as SupportedLocale];
  const isRtl = locale === 'ar';
  const identity = getLocaleMessaging(locale).identity;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: content.title,
    description: identity.longDescriptor,
    keywords: content.keywords,
    areaServed: ['Tangier', 'Morocco'],
    availableLanguage: locale,
    url: locale === 'en' ? `${SITE_URL}/services` : `${SITE_URL}/${locale}/services`,
  };

  return (
    <>
      <section
        className="mx-auto max-w-6xl px-6 py-28 md:py-36"
        lang={locale}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <JsonLd data={serviceSchema} />
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">{locale.toUpperCase()}</p>
        <h1 className="mb-6 font-serif text-4xl leading-tight text-[#0F172A] md:text-6xl">{content.h1}</h1>
        <p className="max-w-3xl text-lg leading-relaxed text-[#334155]">{identity.shortDescriptor}</p>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#334155]">{content.intro}</p>
        <ul className="mt-8 list-disc space-y-2 pl-5 text-[#0F172A]">
          {content.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </section>
      <FaqSection
        faqs={LOCALE_SERVICES_FAQS[locale as SupportedLocale]}
        dir={isRtl ? 'rtl' : 'ltr'}
      />
    </>
  );
}
