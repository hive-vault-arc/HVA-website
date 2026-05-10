import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '../../../components/JsonLd';
import FaqSection from '../../../components/FaqSection';
import { LOCALE_CAPABILITIES_FAQS } from '../../../data/faqs';
import { SITE_URL, SUPPORTED_LOCALES, type SupportedLocale, buildPageMetadata } from '../../../lib/seo';
import { getLocaleMessaging } from '../../../lib/positioning';

const capabilitiesContent: Record<
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
    title: 'Technology Consulting Capabilities in Morocco',
    description:
      'Six H.V.A service pillars: strategy, technology consulting, AI and data, software engineering, cloud infrastructure, and managed operations.',
    h1: 'Six Service Pillars from Strategy to Operations',
    intro:
      'Our engagement model spans strategic consulting, architecture, technical execution, and managed evolution so systems continue performing after launch.',
    keywords: [
      'technology consulting capabilities morocco',
      'digital transformation capabilities morocco',
      'technology consulting services morocco',
      'digital transformation services morocco',
      'ai automation services tangier',
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
      'Strategy and business consulting: diagnostics, transformation, and operating model design',
      'Technology consulting: enterprise architecture, roadmaps, and systems integration',
      'AI, data, and analytics: agents, generative AI, predictive analytics, and BI',
      'Software engineering and product development: web, mobile, SaaS, APIs, and UX/UI engineering',
      'Cloud and infrastructure: migration, security architecture, observability, and automation',
      'Operations and managed services: post-launch ownership, maintenance, and AI system evolution',
    ],
  },
  fr: {
    title: 'Capacités de conseil technologique au Maroc',
    description:
      'Six piliers de service H.V.A: stratégie, conseil technologique, IA et data, logiciel, cloud, infrastructure et opérations managées.',
    h1: 'Six piliers de service de la stratégie aux opérations',
    intro:
      "Nous accompagnons les entreprises de la strategie jusqu'a l'exploitation en production avec un modele de delivery clair et mesurable.",
    keywords: [
      'capacites conseil technologique maroc',
      'transformation digitale entreprise maroc',
      'services de conseil technologique maroc',
      'services de transformation digitale maroc',
      'services IA et automatisation maroc',
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
      'agent ia operations client maroc',
      'automatisation qualification de leads maroc',
      'modernisation système legacy maroc',
      'ingénierie saas entreprise maroc',
      'automatisation process métier tanger',
      'optimisation performance application maroc',
      'sécurité applicative et fiabilité cloud maroc',
    ],
    bullets: [
      'Stratégie et conseil métier : diagnostic, transformation et modèle opérationnel',
      'Conseil technologique : architecture d entreprise, roadmaps et intégration systèmes',
      'IA, data et analytics : agents, IA générative, analytique prédictive et BI',
      'Ingénierie logicielle et produit : web, mobile, SaaS, API et UX/UI',
      'Cloud et infrastructure : migration, sécurité, observabilité et automatisation',
      'Opérations managées : ownership post-lancement, maintenance et évolution des systèmes IA',
    ],
  },
  ar: {
    title: 'قدرات الاستشارات التقنية في المغرب',
    description:
      'قدرات H.V.A تشمل الاستشارات التقنية والتحول الرقمي والذكاء الاصطناعي والأتمتة وتطوير البرمجيات وتحديث البنية التقنية والسحابة.',
    h1: 'من الاستراتيجية الى التنفيذ',
    intro:
      'نعمل مع فرق القيادة لتحديد الاولويات وبناء الانظمة وتشغيلها وصيانتها ضمن دورة تسليم واضحة ومستمرة.',
    keywords: [
      'قدرات استشارات تقنية المغرب',
      'قدرات التحول الرقمي للشركات المغرب',
      'خدمات الاستشارات التقنية المغرب',
      'خدمات التحول الرقمي المغرب',
      'خدمات أتمتة الذكاء الاصطناعي المغرب',
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
      'تنفيذ وكيل ذكاء اصطناعي لعمليات العملاء المغرب',
      'أتمتة تأهيل العملاء المحتملين المغرب',
      'تحديث الأنظمة القديمة إلى أنظمة حديثة المغرب',
      'هندسة منصات SaaS للمؤسسات المغرب',
      'أتمتة العمليات التجارية طنجة',
      'تحسين أداء التطبيقات المغرب',
      'تقوية أمن التطبيقات وموثوقية البنية السحابية المغرب',
    ],
    bullets: [
      'استشارات الاستراتيجية والأعمال: التشخيص والتحول وتصميم نموذج التشغيل',
      'الاستشارات التقنية: معمارية المؤسسات وخرائط الطريق وتكامل الأنظمة',
      'الذكاء الاصطناعي والبيانات والتحليلات: وكلاء وذكاء اصطناعي توليدي وتحليلات وBI',
      'هندسة البرمجيات والمنتجات: ويب وموبايل وSaaS وAPI وتجربة المستخدم',
      'السحابة والبنية التحتية: الترحيل والأمان والمراقبة والأتمتة',
      'العمليات والخدمات المُدارة: الملكية بعد الإطلاق والصيانة وتطوير أنظمة الذكاء الاصطناعي',
    ],
  },
  es: {
    title: 'Capacidades de consultoria tecnologica en Marruecos',
    description:
      'Seis pilares de servicio de H.V.A: estrategia, consultoria tecnologica, IA y datos, software, cloud, infraestructura y operaciones gestionadas.',
    h1: 'Seis pilares de servicio de la estrategia a operaciones',
    intro:
      'Trabajamos con equipos directivos para disenar la estrategia, ejecutar la ingenieria y mantener la operacion en produccion a largo plazo.',
    keywords: [
      'capacidades de consultoria tecnologica marruecos',
      'transformacion digital para empresas marruecos',
      'servicios de consultoria tecnologica marruecos',
      'servicios de transformacion digital marruecos',
      'servicios de automatizacion con IA marruecos',
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
      'agente de ia para operaciones de clientes marruecos',
      'automatizacion de calificacion de leads marruecos',
      'modernizacion de sistemas legacy marruecos',
      'ingenieria saas empresarial marruecos',
      'automatizacion de procesos empresariales tanger',
      'optimizacion de rendimiento de aplicaciones marruecos',
      'seguridad de aplicaciones y confiabilidad cloud marruecos',
    ],
    bullets: [
      'Estrategia y consultoria de negocio: diagnostico, transformacion y modelo operativo',
      'Consultoria tecnologica: arquitectura empresarial, roadmaps e integracion de sistemas',
      'IA, datos y analitica: agentes, IA generativa, analitica predictiva y BI',
      'Ingenieria de software y producto: web, movil, SaaS, APIs y UX/UI',
      'Cloud e infraestructura: migracion, seguridad, observabilidad y automatizacion',
      'Operaciones gestionadas: ownership post-lanzamiento, mantenimiento y evolucion de sistemas IA',
    ],
  },
};

type LocaleCapabilitiesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleCapabilitiesPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as SupportedLocale)) {
    return {};
  }

  const content = capabilitiesContent[locale as SupportedLocale];
  const { serviceEquivalence } = getLocaleMessaging(locale);

  const base = buildPageMetadata({
    title: content.title,
    description: `${content.description} ${serviceEquivalence}`,
    path: locale === 'en' ? '/capabilities' : `/${locale}/capabilities`,
    locale,
    keywords: content.keywords,
    alternates: {
      en: '/capabilities',
      fr: '/fr/capabilities',
      ar: '/ar/capabilities',
      es: '/es/capabilities',
      'x-default': '/capabilities',
    },
  });

  if (locale === 'en') {
    return {
      ...base,
      robots: { index: false, follow: true },
      alternates: { ...(base.alternates ?? {}), canonical: '/capabilities' },
    };
  }

  return base;
}

export default async function LocaleCapabilitiesPage({ params }: LocaleCapabilitiesPageProps) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as SupportedLocale)) {
    notFound();
  }

  const content = capabilitiesContent[locale as SupportedLocale];
  const isRtl = locale === 'ar';
  const { identity, serviceEquivalence } = getLocaleMessaging(locale);

  const capabilitySchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: content.title,
    alternateName: [serviceEquivalence],
    description: `${identity.longDescriptor} ${serviceEquivalence}`,
    keywords: content.keywords,
    areaServed: ['Tangier', 'Morocco'],
    availableLanguage: locale,
    url: locale === 'en' ? `${SITE_URL}/capabilities` : `${SITE_URL}/${locale}/capabilities`,
  };

  return (
    <>
      <section
        className="mx-auto max-w-6xl px-6 py-28 md:py-36"
        lang={locale}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <JsonLd data={capabilitySchema} />
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">{locale.toUpperCase()}</p>
        <h1 className="mb-6 font-serif text-4xl leading-tight text-[#0F172A] md:text-6xl">{content.h1}</h1>
        <p className="max-w-3xl text-lg leading-relaxed text-[#334155]">{identity.shortDescriptor}</p>
        <p className="mt-4 max-w-3xl text-base font-semibold leading-relaxed text-[#0F172A]">{serviceEquivalence}</p>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#334155]">{content.intro}</p>
        <ul className="mt-8 list-disc space-y-2 pl-5 text-[#0F172A]">
          {content.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </section>
      <FaqSection
        faqs={LOCALE_CAPABILITIES_FAQS[locale as SupportedLocale]}
        dir={isRtl ? 'rtl' : 'ltr'}
      />
    </>
  );
}
