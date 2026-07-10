import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
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
    serviceHeading: string;
    serviceIntro: string;
    primaryCta: string;
    secondaryCta: string;
    services: Array<{
      title: string;
      description: string;
      slug: string;
    }>;
  }
> = {
  en: {
    title: 'Technology Consulting Capabilities in Morocco',
    description:
      'Six Hive Vault Arc service pillars: strategy, technology consulting, AI and data, software engineering, cloud infrastructure, and managed operations.',
    h1: 'Six Service Pillars from Strategy to Operations',
    intro:
      'Our engagement model spans strategic consulting, architecture, technical execution, and managed evolution so systems continue performing after launch.',
    serviceHeading: 'The Service Model',
    serviceIntro:
      'Each pillar can stand alone or combine into one accountable transformation program, from first decision through production ownership.',
    primaryCta: 'Discuss a Program',
    secondaryCta: 'See Case Studies',
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
    services: [
      {
        title: 'Strategy and Business Consulting',
        description: 'Diagnostics, transformation roadmaps, and operating model design.',
        slug: 'strategy-business',
      },
      {
        title: 'Technology Consulting',
        description: 'Enterprise architecture, technical roadmaps, and systems integration.',
        slug: 'technology-consulting',
      },
      {
        title: 'AI, Data, and Analytics',
        description: 'Agents, generative AI, predictive analytics, decision systems, and BI.',
        slug: 'ai-data-analytics',
      },
      {
        title: 'Software Engineering and Product',
        description: 'Web, mobile, SaaS, APIs, internal platforms, and UX/UI engineering.',
        slug: 'software-engineering',
      },
      {
        title: 'Cloud and Infrastructure',
        description: 'Migration, security architecture, observability, automation, and reliability.',
        slug: 'cloud-infrastructure',
      },
      {
        title: 'Operations and Managed Services',
        description: 'Post-launch ownership, maintenance, monitoring, and AI system evolution.',
        slug: 'operations-managed',
      },
    ],
  },
  fr: {
    title: 'Capacités de conseil technologique au Maroc',
    description:
      'Six piliers de service Hive Vault Arc: stratégie, conseil technologique, IA et data, logiciel, cloud, infrastructure et opérations managées.',
    h1: 'Six piliers de service de la stratégie aux opérations',
    intro:
      "Nous accompagnons les entreprises de la stratégie jusqu'à l'exploitation en production avec un modèle de livraison clair et mesurable.",
    serviceHeading: 'Le modèle de services',
    serviceIntro:
      "Chaque pilier peut être engagé séparément ou intégré dans un programme de transformation piloté par une seule équipe responsable.",
    primaryCta: 'Parler de votre programme',
    secondaryCta: 'Voir les cas clients',
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
    services: [
      {
        title: 'Stratégie et conseil métier',
        description: 'Diagnostic, feuille de route de transformation et modèle opérationnel.',
        slug: 'strategy-business',
      },
      {
        title: 'Conseil technologique',
        description: "Architecture d'entreprise, trajectoires techniques et intégration des systèmes.",
        slug: 'technology-consulting',
      },
      {
        title: 'IA, data et analytics',
        description: 'Agents, IA générative, analytique prédictive, systèmes de décision et BI.',
        slug: 'ai-data-analytics',
      },
      {
        title: 'Ingénierie logicielle et produit',
        description: 'Web, mobile, SaaS, API, plateformes internes et ingénierie UX/UI.',
        slug: 'software-engineering',
      },
      {
        title: 'Cloud et infrastructure',
        description: 'Migration, sécurité, observabilité, automatisation et fiabilité.',
        slug: 'cloud-infrastructure',
      },
      {
        title: 'Opérations managées',
        description: 'Responsabilité post-lancement, maintenance, suivi et évolution des systèmes IA.',
        slug: 'operations-managed',
      },
    ],
  },
  ar: {
    title: 'قدرات الاستشارات التقنية في المغرب',
    description:
      'تغطي قدرات Hive Vault Arc الاستراتيجية والاستشارات التقنية والذكاء الاصطناعي والبيانات وهندسة البرمجيات والبنية السحابية والعمليات المُدارة.',
    h1: 'ست ركائز للخدمات من الاستراتيجية إلى العمليات',
    intro:
      'نعمل مع فرق القيادة لتحديد الأولويات، وبناء الأنظمة، وتشغيلها وصيانتها ضمن دورة تسليم واضحة ومستمرّة.',
    serviceHeading: 'نموذج الخدمات',
    serviceIntro:
      'يمكن تنفيذ كل ركيزة بشكل مستقل أو دمجها في برنامج تحول واحد تتولى مسؤوليته جهة تنفيذية واحدة.',
    primaryCta: 'ناقش برنامجك معنا',
    secondaryCta: 'اطلع على دراسات الحالة',
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
    services: [
      {
        title: 'استشارات الاستراتيجية والأعمال',
        description: 'التشخيص وخرائط طريق التحول وتصميم نموذج التشغيل.',
        slug: 'strategy-business',
      },
      {
        title: 'الاستشارات التقنية',
        description: 'معمارية المؤسسات والمسارات التقنية وتكامل الأنظمة.',
        slug: 'technology-consulting',
      },
      {
        title: 'الذكاء الاصطناعي والبيانات والتحليلات',
        description: 'الوكلاء والذكاء التوليدي والتحليلات التنبؤية وأنظمة القرار وذكاء الأعمال.',
        slug: 'ai-data-analytics',
      },
      {
        title: 'هندسة البرمجيات والمنتجات',
        description: 'الويب والموبايل ومنصات SaaS وواجهات API والمنصات الداخلية وتجربة المستخدم.',
        slug: 'software-engineering',
      },
      {
        title: 'السحابة والبنية التحتية',
        description: 'الترحيل والأمان والمراقبة والأتمتة والموثوقية.',
        slug: 'cloud-infrastructure',
      },
      {
        title: 'العمليات والخدمات المُدارة',
        description: 'الملكية بعد الإطلاق والصيانة والمراقبة وتطوير أنظمة الذكاء الاصطناعي.',
        slug: 'operations-managed',
      },
    ],
  },
  es: {
    title: 'Capacidades de consultoría tecnológica en Marruecos',
    description:
      'Seis pilares de servicio de Hive Vault Arc: estrategia, consultoría tecnológica, IA y datos, software, cloud, infraestructura y operaciones gestionadas.',
    h1: 'Seis pilares de servicio, de la estrategia a las operaciones',
    intro:
      'Trabajamos con equipos directivos para diseñar la estrategia, ejecutar la ingeniería y mantener la operación en producción a largo plazo.',
    serviceHeading: 'El modelo de servicios',
    serviceIntro:
      'Cada pilar puede contratarse por separado o integrarse en un programa de transformación dirigido por un único equipo responsable.',
    primaryCta: 'Hablemos de su programa',
    secondaryCta: 'Ver casos de éxito',
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
    services: [
      {
        title: 'Consultoría estratégica y de negocio',
        description: 'Diagnóstico, hoja de ruta de transformación y diseño del modelo operativo.',
        slug: 'strategy-business',
      },
      {
        title: 'Consultoría tecnológica',
        description: 'Arquitectura empresarial, trayectorias técnicas e integración de sistemas.',
        slug: 'technology-consulting',
      },
      {
        title: 'IA, datos y analítica',
        description: 'Agentes, IA generativa, analítica predictiva, sistemas de decisión y BI.',
        slug: 'ai-data-analytics',
      },
      {
        title: 'Ingeniería de software y producto',
        description: 'Web, móvil, SaaS, APIs, plataformas internas e ingeniería UX/UI.',
        slug: 'software-engineering',
      },
      {
        title: 'Cloud e infraestructura',
        description: 'Migración, seguridad, observabilidad, automatización y fiabilidad.',
        slug: 'cloud-infrastructure',
      },
      {
        title: 'Operaciones gestionadas',
        description: 'Responsabilidad posterior al lanzamiento, mantenimiento, monitorización y evolución de sistemas de IA.',
        slug: 'operations-managed',
      },
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
        className="relative overflow-hidden border-b border-[#DDE3EA] bg-[#F7F8FA] px-6 pb-16 pt-28 md:px-8 md:pb-24 md:pt-36"
        lang={locale}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <JsonLd data={capabilitySchema} />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'linear-gradient(rgba(26,37,53,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(26,37,53,0.035) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.75fr)] lg:items-end lg:gap-16">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--section-label-color)]">
              {locale.toUpperCase()}
            </p>
            <h1 className="max-w-[14ch] font-serif text-[clamp(2.75rem,7vw,5.75rem)] leading-[0.98] text-[#1A2535]">
              {content.h1}
            </h1>
          </div>

          <div className="max-w-2xl lg:pb-1">
            <p className="text-lg font-medium leading-relaxed text-[#3D4858] md:text-xl">
              {content.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#1A2535] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#E8A838] hover:text-[#1A2535]"
              >
                <span>{content.primaryCta}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className={`h-4 w-4 shrink-0 ${isRtl ? '-scale-x-100' : ''}`}
                />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex min-h-12 items-center justify-center border border-[#B8C0CB] bg-white px-6 py-3 text-sm font-bold text-[#1A2535] transition-colors hover:border-[#1A2535]"
              >
                {content.secondaryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="localized-capability-index"
        className="bg-white px-6 py-20 md:px-8 md:py-28"
        lang={locale}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="mx-auto max-w-7xl">
          <header className="mb-12 max-w-3xl md:mb-16">
            <h2
              id="localized-capability-index"
              className="font-serif text-4xl leading-tight text-[#1A2535] md:text-6xl"
            >
              {content.serviceHeading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#566274] md:text-lg">
              {content.serviceIntro}
            </p>
          </header>

          <div className="border-y border-[#B8C0CB]">
            {content.services.map((service, index) => (
              <Link
                key={service.slug}
                href={`/capabilities/${service.slug}`}
                className="group grid min-h-32 grid-cols-[2.75rem_minmax(0,1fr)_1.5rem] items-start gap-4 border-b border-[#DDE3EA] py-7 transition-colors last:border-b-0 hover:bg-[#F7F8FA] md:grid-cols-[4rem_minmax(15rem,0.7fr)_minmax(0,1fr)_2rem] md:items-center md:gap-8 md:px-5"
              >
                <span className="pt-1 text-xs font-bold tabular-nums text-[var(--section-label-color)] md:pt-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-2xl leading-tight text-[#1A2535] md:text-3xl">
                  {service.title}
                </h3>
                <p className="col-start-2 text-sm leading-relaxed text-[#566274] md:col-start-3 md:text-base">
                  {service.description}
                </p>
                <ArrowUpRight
                  aria-hidden="true"
                  className={`col-start-3 row-start-1 mt-1 h-5 w-5 text-[#566274] transition-colors group-hover:text-[var(--section-label-color)] md:col-start-4 md:row-start-auto md:mt-0 ${isRtl ? '-scale-x-100' : ''}`}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <FaqSection
        faqs={LOCALE_CAPABILITIES_FAQS[locale as SupportedLocale]}
        heading={faqHeadings[locale as SupportedLocale]}
        dir={isRtl ? 'rtl' : 'ltr'}
      />
    </>
  );
}
