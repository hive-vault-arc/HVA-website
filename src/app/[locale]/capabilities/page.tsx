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
    title: 'Ù‚Ø¯Ø±Ø§Øª Ø§Ù„Ø§Ø³ØªØ´Ø§Ø±Ø§Øª Ø§Ù„ØªÙ‚Ù†ÙŠØ© ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨',
    description:
      'Ù‚Ø¯Ø±Ø§Øª Hive Vault Arc ØªØ´Ù…Ù„ Ø§Ù„Ø§Ø³ØªØ´Ø§Ø±Ø§Øª Ø§Ù„ØªÙ‚Ù†ÙŠØ© ÙˆØ§Ù„ØªØ­ÙˆÙ„ Ø§Ù„Ø±Ù‚Ù…ÙŠ ÙˆØ§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ ÙˆØ§Ù„Ø£ØªÙ…ØªØ© ÙˆØªØ·ÙˆÙŠØ± Ø§Ù„Ø¨Ø±Ù…Ø¬ÙŠØ§Øª ÙˆØªØ­Ø¯ÙŠØ« Ø§Ù„Ø¨Ù†ÙŠØ© Ø§Ù„ØªÙ‚Ù†ÙŠØ© ÙˆØ§Ù„Ø³Ø­Ø§Ø¨Ø©.',
    h1: 'Ù…Ù† Ø§Ù„Ø§Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠØ© Ø§Ù„Ù‰ Ø§Ù„ØªÙ†ÙÙŠØ°',
    intro:
      'Ù†Ø¹Ù…Ù„ Ù…Ø¹ ÙØ±Ù‚ Ø§Ù„Ù‚ÙŠØ§Ø¯Ø© Ù„ØªØ­Ø¯ÙŠØ¯ Ø§Ù„Ø§ÙˆÙ„ÙˆÙŠØ§Øª ÙˆØ¨Ù†Ø§Ø¡ Ø§Ù„Ø§Ù†Ø¸Ù…Ø© ÙˆØªØ´ØºÙŠÙ„Ù‡Ø§ ÙˆØµÙŠØ§Ù†ØªÙ‡Ø§ Ø¶Ù…Ù† Ø¯ÙˆØ±Ø© ØªØ³Ù„ÙŠÙ… ÙˆØ§Ø¶Ø­Ø© ÙˆÙ…Ø³ØªÙ…Ø±Ø©.',
    keywords: [
      'Ù‚Ø¯Ø±Ø§Øª Ø§Ø³ØªØ´Ø§Ø±Ø§Øª ØªÙ‚Ù†ÙŠØ© Ø§Ù„Ù…ØºØ±Ø¨',
      'Ù‚Ø¯Ø±Ø§Øª Ø§Ù„ØªØ­ÙˆÙ„ Ø§Ù„Ø±Ù‚Ù…ÙŠ Ù„Ù„Ø´Ø±ÙƒØ§Øª Ø§Ù„Ù…ØºØ±Ø¨',
      'Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ø§Ø³ØªØ´Ø§Ø±Ø§Øª Ø§Ù„ØªÙ‚Ù†ÙŠØ© Ø§Ù„Ù…ØºØ±Ø¨',
      'Ø®Ø¯Ù…Ø§Øª Ø§Ù„ØªØ­ÙˆÙ„ Ø§Ù„Ø±Ù‚Ù…ÙŠ Ø§Ù„Ù…ØºØ±Ø¨',
      'Ø®Ø¯Ù…Ø§Øª Ø£ØªÙ…ØªØ© Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ Ø§Ù„Ù…ØºØ±Ø¨',
      'Ø§Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠØ© ØªÙ‚Ù†ÙŠØ© ÙˆÙ‡Ù†Ø¯Ø³Ø© Ø­Ù„ÙˆÙ„ Ø§Ù„Ù…ØºØ±Ø¨',
      'Ø£ØªÙ…ØªØ© Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„Ù…ØºØ±Ø¨',
      'ØªØ·ÙˆÙŠØ± Ø¨Ø±Ù…Ø¬ÙŠØ§Øª Ù…Ø®ØµØµØ© Ø§Ù„Ù…ØºØ±Ø¨',
      'Ø§Ù„Ø¨Ù†ÙŠØ© Ø§Ù„ØªØ­ØªÙŠØ© Ø§Ù„Ø³Ø­Ø§Ø¨ÙŠØ© Ø§Ù„Ù…ØºØ±Ø¨',
      'Ø´Ø±ÙƒØ© ØªØ·ÙˆÙŠØ± ØªØ·Ø¨ÙŠÙ‚Ø§Øª Ù…ÙˆØ¨Ø§ÙŠÙ„ Ù…Ø®ØµØµØ© Ø§Ù„Ù…ØºØ±Ø¨',
      'Ø´Ø±ÙƒØ© ØªØ·ÙˆÙŠØ± ØªØ·Ø¨ÙŠÙ‚Ø§Øª ÙˆÙŠØ¨ Ù…Ø®ØµØµØ© Ø§Ù„Ù…ØºØ±Ø¨',
      'ØªØ±Ø­ÙŠÙ„ ÙˆØªÙƒØ§Ù…Ù„ Ù†Ø¸Ø§Ù… CRM Ø§Ù„Ù…ØºØ±Ø¨',
      'Ø¨Ù†Ø§Ø¡ ØªØ·Ø¨ÙŠÙ‚ Ø¯Ø§Ø®Ù„ÙŠ Ù„Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø¹Ù…Ù„ÙŠØ§Øª Ø§Ù„Ù…ØºØ±Ø¨',
      'Ù†Ø´Ø± Ø§Ù„ØªØ·Ø¨ÙŠÙ‚Ø§Øª Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø­Ø§Ø¨Ø© Ø§Ù„Ù…ØºØ±Ø¨',
      'Ø§Ø³ØªØ´Ø§Ø±Ø§Øª DevOps Ù„Ù„Ø´Ø±ÙƒØ§Øª Ø§Ù„Ù†Ø§Ø´Ø¦Ø© Ø§Ù„Ù…ØºØ±Ø¨',
      'Ø¥Ø¹Ø¯Ø§Ø¯ Ø®Ø·ÙˆØ· CI CD Ù„ÙØ±Ù‚ Ø§Ù„ØªØ·ÙˆÙŠØ± Ø§Ù„Ù…ØºØ±Ø¨',
      'ØªÙ†ÙÙŠØ° ÙˆÙƒÙŠÙ„ Ø°ÙƒØ§Ø¡ Ø§ØµØ·Ù†Ø§Ø¹ÙŠ Ù„Ø¹Ù…Ù„ÙŠØ§Øª Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡ Ø§Ù„Ù…ØºØ±Ø¨',
      'Ø£ØªÙ…ØªØ© ØªØ£Ù‡ÙŠÙ„ Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡ Ø§Ù„Ù…Ø­ØªÙ…Ù„ÙŠÙ† Ø§Ù„Ù…ØºØ±Ø¨',
      'ØªØ­Ø¯ÙŠØ« Ø§Ù„Ø£Ù†Ø¸Ù…Ø© Ø§Ù„Ù‚Ø¯ÙŠÙ…Ø© Ø¥Ù„Ù‰ Ø£Ù†Ø¸Ù…Ø© Ø­Ø¯ÙŠØ«Ø© Ø§Ù„Ù…ØºØ±Ø¨',
      'Ù‡Ù†Ø¯Ø³Ø© Ù…Ù†ØµØ§Øª SaaS Ù„Ù„Ù…Ø¤Ø³Ø³Ø§Øª Ø§Ù„Ù…ØºØ±Ø¨',
      'Ø£ØªÙ…ØªØ© Ø§Ù„Ø¹Ù…Ù„ÙŠØ§Øª Ø§Ù„ØªØ¬Ø§Ø±ÙŠØ© Ø·Ù†Ø¬Ø©',
      'ØªØ­Ø³ÙŠÙ† Ø£Ø¯Ø§Ø¡ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚Ø§Øª Ø§Ù„Ù…ØºØ±Ø¨',
      'ØªÙ‚ÙˆÙŠØ© Ø£Ù…Ù† Ø§Ù„ØªØ·Ø¨ÙŠÙ‚Ø§Øª ÙˆÙ…ÙˆØ«ÙˆÙ‚ÙŠØ© Ø§Ù„Ø¨Ù†ÙŠØ© Ø§Ù„Ø³Ø­Ø§Ø¨ÙŠØ© Ø§Ù„Ù…ØºØ±Ø¨',
    ],
    bullets: [
      'Ø§Ø³ØªØ´Ø§Ø±Ø§Øª Ø§Ù„Ø§Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠØ© ÙˆØ§Ù„Ø£Ø¹Ù…Ø§Ù„: Ø§Ù„ØªØ´Ø®ÙŠØµ ÙˆØ§Ù„ØªØ­ÙˆÙ„ ÙˆØªØµÙ…ÙŠÙ… Ù†Ù…ÙˆØ°Ø¬ Ø§Ù„ØªØ´ØºÙŠÙ„',
      'Ø§Ù„Ø§Ø³ØªØ´Ø§Ø±Ø§Øª Ø§Ù„ØªÙ‚Ù†ÙŠØ©: Ù…Ø¹Ù…Ø§Ø±ÙŠØ© Ø§Ù„Ù…Ø¤Ø³Ø³Ø§Øª ÙˆØ®Ø±Ø§Ø¦Ø· Ø§Ù„Ø·Ø±ÙŠÙ‚ ÙˆØªÙƒØ§Ù…Ù„ Ø§Ù„Ø£Ù†Ø¸Ù…Ø©',
      'Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ ÙˆØ§Ù„Ø¨ÙŠØ§Ù†Ø§Øª ÙˆØ§Ù„ØªØ­Ù„ÙŠÙ„Ø§Øª: ÙˆÙƒÙ„Ø§Ø¡ ÙˆØ°ÙƒØ§Ø¡ Ø§ØµØ·Ù†Ø§Ø¹ÙŠ ØªÙˆÙ„ÙŠØ¯ÙŠ ÙˆØªØ­Ù„ÙŠÙ„Ø§Øª ÙˆBI',
      'Ù‡Ù†Ø¯Ø³Ø© Ø§Ù„Ø¨Ø±Ù…Ø¬ÙŠØ§Øª ÙˆØ§Ù„Ù…Ù†ØªØ¬Ø§Øª: ÙˆÙŠØ¨ ÙˆÙ…ÙˆØ¨Ø§ÙŠÙ„ ÙˆSaaS ÙˆAPI ÙˆØªØ¬Ø±Ø¨Ø© Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…',
      'Ø§Ù„Ø³Ø­Ø§Ø¨Ø© ÙˆØ§Ù„Ø¨Ù†ÙŠØ© Ø§Ù„ØªØ­ØªÙŠØ©: Ø§Ù„ØªØ±Ø­ÙŠÙ„ ÙˆØ§Ù„Ø£Ù…Ø§Ù† ÙˆØ§Ù„Ù…Ø±Ø§Ù‚Ø¨Ø© ÙˆØ§Ù„Ø£ØªÙ…ØªØ©',
      'Ø§Ù„Ø¹Ù…Ù„ÙŠØ§Øª ÙˆØ§Ù„Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ù…ÙØ¯Ø§Ø±Ø©: Ø§Ù„Ù…Ù„ÙƒÙŠØ© Ø¨Ø¹Ø¯ Ø§Ù„Ø¥Ø·Ù„Ø§Ù‚ ÙˆØ§Ù„ØµÙŠØ§Ù†Ø© ÙˆØªØ·ÙˆÙŠØ± Ø£Ù†Ø¸Ù…Ø© Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ',
    ],
  },
  es: {
    title: 'Capacidades de consultoria tecnologica en Marruecos',
    description:
      'Seis pilares de servicio de Hive Vault Arc: estrategia, consultoria tecnologica, IA y datos, software, cloud, infraestructura y operaciones gestionadas.',
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
        dir={isRtl ? 'rtl' : 'ltr'}
      />
    </>
  );
}
