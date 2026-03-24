import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '../../../components/JsonLd';
import { SITE_URL, SUPPORTED_LOCALES, type SupportedLocale, buildPageMetadata } from '../../../lib/seo';

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
    title: 'AI Receptionist, Automation, and Cloud Services in Morocco',
    description:
      'Service lines from H.V.A: AI receptionist operations, AI analyst reporting, workflow automation, custom software, and cloud delivery reliability.',
    h1: 'Service Lines for AI, Automation, and Scalable Delivery',
    intro:
      'Our team delivers AI receptionist systems, AI analyst reporting, workflow orchestration, custom SaaS engineering, and cloud infrastructure in Morocco.',
    keywords: [
      'ai receptionist morocco',
      'ai analyst morocco',
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
      'AI Receptionist and customer-facing agents',
      'AI Analyst dashboards and reporting workflows',
      'Custom SaaS and enterprise software engineering',
      'Cloud, CI/CD, and zero-downtime delivery systems',
    ],
  },
  fr: {
    title: 'Services IA, automatisation et cloud au Maroc',
    description:
      "Services H.V.A: réceptionniste IA, analyste IA, automatisation des workflows, développement logiciel sur mesure et fiabilité cloud.",
    h1: 'Services IA, automatisation et livraison à grande échelle',
    intro:
      'Nous livrons des systèmes de réceptionniste IA, des analyses métiers IA, des automatisations opérationnelles et des plateformes cloud robustes au Maroc.',
    keywords: [
      'réceptionniste ia maroc',
      'analyste ia maroc',
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
      'Réceptionniste IA et agents conversationnels',
      'Tableaux de bord analyste IA et reporting',
      'Ingénierie SaaS et plateformes d’entreprise',
      'Cloud, CI/CD et déploiement sans interruption',
    ],
  },
  ar: {
    title: 'خدمات الذكاء الاصطناعي والأتمتة والسحابة في المغرب',
    description:
      'تشمل خدمات H.V.A: أنظمة استقبال بالذكاء الاصطناعي، تحليلات ذكية، أتمتة سير العمل، تطوير برمجيات مخصصة، وبنية سحابية موثوقة.',
    h1: 'خدمات الذكاء الاصطناعي والأتمتة للتوسع بثقة',
    intro:
      'نقدم أنظمة استقبال ذكية وتقارير تحليلية وأتمتة عمليات ومنصات برمجية مخصصة مع بنية سحابية عالية الاعتمادية في المغرب.',
    keywords: [
      'موظف استقبال بالذكاء الاصطناعي المغرب',
      'محلل ذكاء اصطناعي المغرب',
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
      'أنظمة استقبال ووكلاء ذكاء اصطناعي للعملاء',
      'لوحات تحليل وتقارير ذكاء اصطناعي',
      'هندسة SaaS ومنصات أعمال مخصصة',
      'السحابة و CI/CD ونشر بدون توقف',
    ],
  },
  es: {
    title: 'Servicios de IA, automatizacion y cloud en Marruecos',
    description:
      'Servicios de H.V.A: recepcionista con IA, analista IA, automatizacion de procesos, software a medida e infraestructura cloud confiable.',
    h1: 'Servicios de IA, automatizacion y entrega escalable',
    intro:
      'Entregamos sistemas de recepcionista con IA, analitica operativa, automatizacion de flujos, plataformas SaaS y arquitectura cloud en Marruecos.',
    keywords: [
      'recepcionista con ia marruecos',
      'analista de ia marruecos',
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
      'Recepcionista con IA y agentes conversacionales',
      'Analista IA, reportes y paneles operativos',
      'Ingenieria SaaS y software empresarial',
      'Cloud, CI/CD y despliegues sin caidas',
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
  return buildPageMetadata({
    title: content.title,
    description: content.description,
    path: `/${locale}/services`,
    locale,
    keywords: content.keywords,
    alternates: {
      en: '/en/services',
      fr: '/fr/services',
      ar: '/ar/services',
      es: '/es/services',
      'x-default': '/en/services',
    },
  });
}

export default async function LocaleServicesPage({ params }: LocaleServicesPageProps) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as SupportedLocale)) {
    notFound();
  }

  const content = servicesContent[locale as SupportedLocale];
  const isRtl = locale === 'ar';

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: content.title,
    description: content.description,
    keywords: content.keywords,
    areaServed: ['Tangier', 'Morocco'],
    availableLanguage: locale,
    url: `${SITE_URL}/${locale}/services`,
  };

  return (
    <section
      className="mx-auto max-w-6xl px-6 py-28 md:py-36"
      lang={locale}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <JsonLd data={serviceSchema} />
      <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">{locale.toUpperCase()}</p>
      <h1 className="mb-6 font-serif text-4xl leading-tight text-[#0F172A] md:text-6xl">{content.h1}</h1>
      <p className="max-w-3xl text-lg leading-relaxed text-[#334155]">{content.intro}</p>
      <ul className="mt-8 list-disc space-y-2 pl-5 text-[#0F172A]">
        {content.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </section>
  );
}
