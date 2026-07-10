import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '../../../components/JsonLd';
import FaqSection from '../../../components/FaqSection';
import LocaleDocumentAttributes from '../../../components/LocaleDocumentAttributes';
import { LOCALE_CAPABILITIES_FAQS } from '../../../data/faqs';
import { SITE_URL, SUPPORTED_LOCALES, type SupportedLocale, buildPageMetadata } from '../../../lib/seo';
import { getLocaleMessaging } from '../../../lib/positioning';

const faqHeadings: Record<SupportedLocale, string> = {
  en: 'Technology Consulting Capabilities: Frequently Asked Questions',
  fr: 'Capacités de conseil technologique : questions fréquentes',
  ar: 'الأسئلة الشائعة حول قدرات الاستشارات التقنية',
  es: 'Capacidades de consultoría tecnológica: preguntas frecuentes',
};

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
      'Six Hive Vault Arc service pillars: strategy, technology consulting, AI and data, software engineering, cloud infrastructure, and managed operations.',
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
      'Six piliers de service Hive Vault Arc: stratégie, conseil technologique, IA et data, logiciel, cloud, infrastructure et opérations managées.',
    h1: 'Six piliers de service de la stratégie aux opérations',
    intro:
      "Nous accompagnons les entreprises de la stratégie jusqu'à l'exploitation en production avec un modèle de livraison clair et mesurable.",
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
      'Conseil technologique : architecture d’entreprise, feuilles de route et intégration des systèmes',
      'IA, data et analytics : agents, IA générative, analytique prédictive et BI',
      'Ingénierie logicielle et produit : web, mobile, SaaS, API et UX/UI',
      'Cloud et infrastructure : migration, sécurité, observabilité et automatisation',
      'Opérations managées : responsabilité post-lancement, maintenance et évolution des systèmes IA',
    ],
  },
  ar: {
    title: 'قدرات الاستشارات التقنية في المغرب',
    description:
      'تغطي قدرات Hive Vault Arc الاستراتيجية والاستشارات التقنية والذكاء الاصطناعي والبيانات وهندسة البرمجيات والبنية السحابية والعمليات المُدارة.',
    h1: 'ست ركائز للخدمات من الاستراتيجية إلى العمليات',
    intro:
      'نعمل مع فرق القيادة لتحديد الأولويات، وبناء الأنظمة، وتشغيلها وصيانتها ضمن دورة تسليم واضحة ومستمرّة.',
    keywords: [
      'قدرات الاستشارات التقنية في المغرب',
      'خدمات التحول الرقمي في المغرب',
      'خدمات الذكاء الاصطناعي والأتمتة',
      'استراتيجية تقنية وهندسة حلول',
      'أتمتة سير العمل في المغرب',
      'تطوير برمجيات مخصصة',
      'البنية التحتية السحابية في المغرب',
      'ترحيل وتكامل نظام CRM',
      'بناء تطبيقات داخلية للشركات',
      'استشارات DevOps في المغرب',
      'تحديث الأنظمة القديمة',
      'أمن التطبيقات وموثوقية السحابة',
    ],
    bullets: [
      'استشارات الاستراتيجية والأعمال: التشخيص والتحول وتصميم نموذج التشغيل',
      'الاستشارات التقنية: معمارية المؤسسات وخرائط الطريق وتكامل الأنظمة',
      'الذكاء الاصطناعي والبيانات والتحليلات: الوكلاء والذكاء التوليدي والتحليلات وذكاء الأعمال',
      'هندسة البرمجيات والمنتجات: الويب والموبايل ومنصات SaaS وواجهات API وتجربة المستخدم',
      'السحابة والبنية التحتية: الترحيل والأمان والمراقبة والأتمتة',
      'العمليات والخدمات المُدارة: الملكية بعد الإطلاق والصيانة وتطوير أنظمة الذكاء الاصطناعي',
    ],
  },
  es: {
    title: 'Capacidades de consultoría tecnológica en Marruecos',
    description:
      'Seis pilares de servicio de Hive Vault Arc: estrategia, consultoría tecnológica, IA y datos, software, cloud, infraestructura y operaciones gestionadas.',
    h1: 'Seis pilares de servicio, de la estrategia a las operaciones',
    intro:
      'Trabajamos con equipos directivos para diseñar la estrategia, ejecutar la ingeniería y mantener la operación en producción a largo plazo.',
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
      'Consultoría estratégica y de negocio: diagnóstico, transformación y diseño del modelo operativo',
      'Consultoría tecnológica: arquitectura empresarial, hojas de ruta e integración de sistemas',
      'IA, datos y analítica: agentes, IA generativa, analítica predictiva y BI',
      'Ingeniería de software y producto: web, móvil, SaaS, APIs y UX/UI',
      'Cloud e infraestructura: migración, seguridad, observabilidad y automatización',
      'Operaciones gestionadas: responsabilidad posterior al lanzamiento, mantenimiento y evolución de sistemas de IA',
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
      <LocaleDocumentAttributes locale={locale} direction={isRtl ? 'rtl' : 'ltr'} />
      <section
        className="mx-auto max-w-6xl px-6 py-28 md:py-36"
        lang={locale}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <JsonLd data={capabilitySchema} />
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--section-label-color)]">{locale.toUpperCase()}</p>
        <h1 className="mb-6 font-serif text-4xl leading-tight text-[#1A2535] md:text-6xl">{content.h1}</h1>
        <p className="max-w-3xl text-lg leading-relaxed text-[#3D4858]">{identity.shortDescriptor}</p>
        <p className="mt-4 max-w-3xl text-base font-semibold leading-relaxed text-[#1A2535]">{serviceEquivalence}</p>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#3D4858]">{content.intro}</p>
        <ul className="mt-8 list-disc space-y-2 pl-5 text-[#1A2535]">
          {content.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </section>
      <FaqSection
        faqs={LOCALE_CAPABILITIES_FAQS[locale as SupportedLocale]}
        heading={faqHeadings[locale as SupportedLocale]}
        dir={isRtl ? 'rtl' : 'ltr'}
      />
    </>
  );
}
