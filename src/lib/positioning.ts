export const POSITIONING_LOCALES = ['en', 'fr', 'ar', 'es'] as const;
export type PositioningLocale = (typeof POSITIONING_LOCALES)[number];

export type MarketIdentity = {
  headline: string;
  shortDescriptor: string;
  longDescriptor: string;
  proofStatement: string;
};

export type CapabilityCluster = {
  strategyConsulting: string[];
  aiAutomation: string[];
  customEngineering: string[];
  modernizationCloudData: string[];
};

export type MessagingRules = {
  forbiddenPhrases: string[];
  allowedSearchIntentPhrases: string[];
};

type LocaleMessaging = {
  identity: MarketIdentity;
  capabilities: CapabilityCluster;
  serviceEquivalence: string;
};

export const POSITIONING_BY_LOCALE: Record<PositioningLocale, LocaleMessaging> = {
  en: {
    identity: {
      headline: 'AI & Automation · Digital Transformation · Technology Consulting',
      shortDescriptor:
        'Hive Vault Arc (H.V.A) is an AI-powered digital transformation and technology consulting firm.',
      longDescriptor:
        'Hive Vault Arc (H.V.A) is an AI-powered digital transformation and technology consulting firm. We design and deploy intelligent automation, build custom software and AI agents, lead end-to-end digital transformation programs, and deliver the cloud and data infrastructure that makes it all run — with consulting rigor at every stage.',
      proofStatement:
        'From strategic roadmap to production operations, we own the full delivery arc with measurable outcomes and long-term partnership accountability.',
    },
    capabilities: {
      strategyConsulting: [
        'Digital transformation advisory and roadmap design',
        'Operational diagnostics and business process redesign',
        'Technology strategy for growth-stage and established businesses',
      ],
      aiAutomation: [
        'AI agents for customer operations, sales, and internal workflows',
        'Intelligent workflow automation and orchestration',
        'Decision intelligence, reporting assistants, and AI analytics',
      ],
      customEngineering: [
        'Custom software, SaaS, and enterprise systems development',
        'CRM engineering, migration, and deep integration',
        'Web and mobile application delivery',
      ],
      modernizationCloudData: [
        'Legacy modernization and architecture refactoring',
        'Cloud infrastructure, DevOps, and CI/CD engineering',
        'Data pipelines, observability, and reliability engineering',
      ],
    },
    serviceEquivalence: 'Our capabilities are our services.',
  },
  fr: {
    identity: {
      headline: 'IA & Automatisation · Transformation Digitale · Conseil Technologique',
      shortDescriptor:
        "Hive Vault Arc (H.V.A) est une entreprise d'IA, de transformation digitale et de conseil technologique.",
      longDescriptor:
        "Hive Vault Arc (H.V.A) est une entreprise d'IA, de transformation digitale et de conseil technologique. Nous concevons et déployons des agents IA et des automatisations intelligentes, développons des logiciels sur mesure, pilotons des programmes de transformation digitale de bout en bout, et mettons en place l'infrastructure cloud et data — avec une rigueur de conseil à chaque étape.",
      proofStatement:
        'De la feuille de route stratégique à la production, nous pilotons le cycle complet de livraison avec des résultats mesurables et un partenariat long terme.',
    },
    capabilities: {
      strategyConsulting: [
        'Conseil en transformation digitale et conception de feuille de route',
        "Diagnostic opérationnel et refonte des processus métier",
        'Stratégie technologique pour entreprises en croissance et établies',
      ],
      aiAutomation: [
        'Agents IA pour opérations clients, ventes et workflows internes',
        'Automatisation intelligente des processus et orchestration',
        "Intelligence décisionnelle, assistants de reporting et analytics IA",
      ],
      customEngineering: [
        'Développement logiciel sur mesure, SaaS et systèmes d\'entreprise',
        'Ingénierie CRM, migration et intégration avancée',
        'Applications web et mobile',
      ],
      modernizationCloudData: [
        'Modernisation des systèmes legacy et refactorisation d\'architecture',
        'Infrastructure cloud, DevOps et pipelines CI/CD',
        'Pipelines de données, observabilité et ingénierie de fiabilité',
      ],
    },
    serviceEquivalence: 'Nos capacités sont nos services.',
  },
  ar: {
    identity: {
      headline: 'الذكاء الاصطناعي والأتمتة · التحول الرقمي · الاستشارات التقنية',
      shortDescriptor:
        'Hive Vault Arc \u200F(H.V.A) هي شركة متخصصة في الذكاء الاصطناعي، التحول الرقمي، والاستشارات التقنية.',
      longDescriptor:
        'Hive Vault Arc \u200F(H.V.A) هي شركة متخصصة في الذكاء الاصطناعي، التحول الرقمي، والاستشارات التقنية. نصمم وننشر وكلاء ذكاء اصطناعي وأتمتة ذكية، نطور برمجيات مخصصة وأنظمة متكاملة، نقود برامج التحول الرقمي الشاملة، ونبني البنية السحابية والبيانية — بمنهجية استشارية في كل مرحلة.',
      proofStatement:
        'من خارطة الطريق الاستراتيجية إلى التشغيل الفعلي، نمتلك دورة التسليم الكاملة بنتائج قابلة للقياس وشراكة طويلة الأمد.',
    },
    capabilities: {
      strategyConsulting: [
        'استشارات التحول الرقمي وتصميم خارطة الطريق',
        'تشخيص العمليات وإعادة تصميم العمليات التجارية',
        'استراتيجية تقنية للشركات الناشئة والمؤسسات القائمة',
      ],
      aiAutomation: [
        'وكلاء ذكاء اصطناعي لعمليات العملاء والمبيعات والعمليات الداخلية',
        'أتمتة سير العمل الذكية والتنسيق',
        'الذكاء التحليلي، مساعدو التقارير، وتحليلات الذكاء الاصطناعي',
      ],
      customEngineering: [
        'تطوير برمجيات مخصصة وأنظمة SaaS وأنظمة المؤسسات',
        'هندسة أنظمة CRM والترحيل والتكامل المتقدم',
        'تطبيقات الويب والموبايل',
      ],
      modernizationCloudData: [
        'تحديث الأنظمة القديمة وإعادة هيكلة البنية التقنية',
        'البنية السحابية وDevOps وهندسة CI/CD',
        'خطوط البيانات والمراقبة وهندسة الموثوقية',
      ],
    },
    serviceEquivalence: 'قدراتنا هي خدماتنا.',
  },
  es: {
    identity: {
      headline: 'IA y Automatización · Transformación Digital · Consultoría Tecnológica',
      shortDescriptor:
        'Hive Vault Arc (H.V.A) es una firma de IA, transformación digital y consultoría tecnológica.',
      longDescriptor:
        'Hive Vault Arc (H.V.A) es una firma de IA, transformación digital y consultoría tecnológica. Diseñamos y desplegamos agentes de IA y automatización inteligente, desarrollamos software a medida, lideramos programas de transformación digital de extremo a extremo, y construimos la infraestructura cloud y de datos — con rigor consultivo en cada etapa.',
      proofStatement:
        'Desde la hoja de ruta estratégica hasta la operación en producción, gestionamos el ciclo completo de entrega con resultados medibles y una alianza a largo plazo.',
    },
    capabilities: {
      strategyConsulting: [
        'Consultoría de transformación digital y diseño de hoja de ruta',
        'Diagnóstico operativo y rediseño de procesos de negocio',
        'Estrategia tecnológica para empresas en crecimiento y consolidadas',
      ],
      aiAutomation: [
        'Agentes de IA para operaciones comerciales, ventas y flujos internos',
        'Automatización inteligente de procesos y orquestación',
        'Inteligencia operativa, asistentes de reporting y analítica con IA',
      ],
      customEngineering: [
        'Desarrollo de software a medida, SaaS y sistemas empresariales',
        'Ingeniería de CRM, migración e integración avanzada',
        'Aplicaciones web y móviles',
      ],
      modernizationCloudData: [
        'Modernización de sistemas legacy y refactorización de arquitectura',
        'Infraestructura cloud, DevOps y pipelines CI/CD',
        'Pipelines de datos, observabilidad e ingeniería de confiabilidad',
      ],
    },
    serviceEquivalence: 'Nuestras capacidades son nuestros servicios.',
  },
};

export const MESSAGING_RULES: MessagingRules = {
  forbiddenPhrases: [
    'agency-first',
    'just an AI agency',
    'chatbot shop',
    'tool builder only',
    'pure consulting only',
  ],
  allowedSearchIntentPhrases: [
    'AI agency Morocco',
    'software agency Tangier',
    'automation agency Morocco',
    'digital transformation company Morocco',
    'AI automation firm Morocco',
  ],
};

export function getLocaleMessaging(locale?: string): LocaleMessaging {
  if (!locale || !(locale in POSITIONING_BY_LOCALE)) {
    return POSITIONING_BY_LOCALE.en;
  }
  return POSITIONING_BY_LOCALE[locale as PositioningLocale];
}

export const CANONICAL_MARKET_IDENTITY = POSITIONING_BY_LOCALE.en.identity;
export const CANONICAL_CAPABILITIES = POSITIONING_BY_LOCALE.en.capabilities;
