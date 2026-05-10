export const POSITIONING_LOCALES = ['en', 'fr', 'ar', 'es'] as const;
export type PositioningLocale = (typeof POSITIONING_LOCALES)[number];

export type MarketIdentity = {
  headline: string;
  shortDescriptor: string;
  longDescriptor: string;
  proofStatement: string;
};

export type CapabilityCluster = {
  strategyBusiness: string[];
  technologyConsulting: string[];
  aiDataAnalytics: string[];
  softwareEngineering: string[];
  cloudInfrastructure: string[];
  operationsManaged: string[];
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
      headline: 'Technology Transformation Partner · Strategy · AI Engineering · Operations',
      shortDescriptor:
        'Hive Vault Arc (H.V.A) is a technology transformation partner combining strategy, AI engineering, and managed operations.',
      longDescriptor:
        'Hive Vault Arc (H.V.A) is a technology transformation partner. We advise, build, and operate — combining strategy and business consulting, technology consulting, AI engineering, custom software development, cloud infrastructure, and managed operations in one firm. From the first whiteboard to production systems running in the market, we own the full delivery arc.',
      proofStatement:
        'We redesign how organizations operate using technology — and we stay until it works. Same team. Strategy through production. No handoff.',
    },
    capabilities: {
      strategyBusiness: [
        'Business and digital transformation strategy',
        'Operational diagnostics and process redesign',
        'Innovation strategy and market expansion via technology',
      ],
      technologyConsulting: [
        'Enterprise architecture and technology roadmaps',
        'Platform strategy and systems integration',
        'IT modernization and infrastructure design',
      ],
      aiDataAnalytics: [
        'AI agents for customer operations, sales, and internal workflows',
        'Generative AI strategy and engineering',
        'Data engineering, business intelligence, and predictive analytics',
      ],
      softwareEngineering: [
        'Custom software, SaaS platforms, and enterprise systems',
        'Web and mobile application delivery',
        'API development and DevOps engineering',
      ],
      cloudInfrastructure: [
        'AWS, Azure, and GCP cloud migration and native development',
        'Infrastructure automation, security architecture, and zero-trust design',
        'Observability, disaster recovery, and managed cloud services',
      ],
      operationsManaged: [
        'Managed operations and application maintenance post-launch',
        'Automation operations and AI system management',
        'Business process outsourcing and shared services',
      ],
    },
    serviceEquivalence: 'Our six service pillars are our delivery model.',
  },
  fr: {
    identity: {
      headline: 'Partenaire de Transformation Technologique · Stratégie · IA · Opérations',
      shortDescriptor:
        "Hive Vault Arc (H.V.A) est un partenaire de transformation technologique combinant stratégie, ingénierie IA et opérations managées.",
      longDescriptor:
        "Hive Vault Arc (H.V.A) est un partenaire de transformation technologique. Nous conseillons, construisons et opérons — en combinant conseil en stratégie, conseil technologique, ingénierie IA, développement logiciel sur mesure, infrastructure cloud et opérations managées dans une seule équipe. De la première réunion stratégique aux systèmes en production, nous pilotons le cycle complet de livraison.",
      proofStatement:
        'Nous redessinons la façon dont les organisations opèrent grâce à la technologie — et nous restons jusqu\'à ce que ça fonctionne. Même équipe. De la stratégie à la production. Sans rupture.',
    },
    capabilities: {
      strategyBusiness: [
        'Stratégie de transformation digitale et d\'entreprise',
        'Diagnostic opérationnel et refonte des processus métier',
        'Stratégie d\'innovation et expansion marché par la technologie',
      ],
      technologyConsulting: [
        'Architecture d\'entreprise et feuilles de route technologiques',
        'Stratégie de plateformes et intégration des systèmes',
        'Modernisation IT et conception d\'infrastructure',
      ],
      aiDataAnalytics: [
        'Agents IA pour opérations clients, ventes et workflows internes',
        'Stratégie et ingénierie IA générative',
        'Ingénierie de données, business intelligence et analytique prédictive',
      ],
      softwareEngineering: [
        'Logiciels sur mesure, plateformes SaaS et systèmes d\'entreprise',
        'Applications web et mobile',
        'Développement d\'API et ingénierie DevOps',
      ],
      cloudInfrastructure: [
        'Migration cloud AWS, Azure et GCP et développement natif',
        'Automatisation d\'infrastructure, architecture de sécurité et zero-trust',
        'Observabilité, reprise après sinistre et services cloud managés',
      ],
      operationsManaged: [
        'Opérations managées et maintenance applicative post-lancement',
        'Gestion des opérations d\'automatisation et des systèmes IA',
        'Externalisation des processus métier et services partagés',
      ],
    },
    serviceEquivalence: 'Nos six piliers de service constituent notre modèle de livraison.',
  },
  ar: {
    identity: {
      headline: 'شريك التحول التقني · الاستراتيجية · هندسة الذكاء الاصطناعي · العمليات',
      shortDescriptor:
        'Hive Vault Arc ‏(H.V.A) هي شريك للتحول التقني يجمع بين الاستراتيجية وهندسة الذكاء الاصطناعي والعمليات المُدارة.',
      longDescriptor:
        'Hive Vault Arc ‏(H.V.A) هي شريك للتحول التقني. نستشير ونبني وندير — بدمج الاستراتيجية التجارية والاستشارات التقنية وهندسة الذكاء الاصطناعي وتطوير البرمجيات والبنية السحابية والعمليات المُدارة في فريق واحد. من أول اجتماع استراتيجي إلى الأنظمة التشغيلية في الإنتاج، نمتلك دورة التسليم الكاملة.',
      proofStatement:
        'نعيد تصميم طريقة عمل المؤسسات باستخدام التكنولوجيا — ونبقى حتى تنجح. نفس الفريق. من الاستراتيجية إلى الإنتاج. بلا فجوات.',
    },
    capabilities: {
      strategyBusiness: [
        'استراتيجية التحول التجاري والرقمي',
        'تشخيص العمليات وإعادة تصميم العمليات التجارية',
        'استراتيجية الابتكار والتوسع في الأسواق عبر التقنية',
      ],
      technologyConsulting: [
        'هندسة المؤسسات وخرائط الطريق التقنية',
        'استراتيجية المنصات وتكامل الأنظمة',
        'تحديث البنية التقنية وتصميم البنية التحتية',
      ],
      aiDataAnalytics: [
        'وكلاء ذكاء اصطناعي لعمليات العملاء والمبيعات والعمليات الداخلية',
        'استراتيجية وهندسة الذكاء الاصطناعي التوليدي',
        'هندسة البيانات وذكاء الأعمال والتحليلات التنبؤية',
      ],
      softwareEngineering: [
        'برمجيات مخصصة ومنصات SaaS وأنظمة المؤسسات',
        'تطبيقات الويب والموبايل',
        'تطوير APIs وهندسة DevOps',
      ],
      cloudInfrastructure: [
        'ترحيل السحابة AWS وAzure وGCP والتطوير السحابي الأصيل',
        'أتمتة البنية التحتية وهندسة الأمان والثقة الصفرية',
        'المراقبة والتعافي من الكوارث والخدمات السحابية المُدارة',
      ],
      operationsManaged: [
        'العمليات المُدارة وصيانة التطبيقات بعد الإطلاق',
        'إدارة عمليات الأتمتة وأنظمة الذكاء الاصطناعي',
        'الاستعانة بمصادر خارجية للعمليات التجارية والخدمات المشتركة',
      ],
    },
    serviceEquivalence: 'ركائزنا الست هي نموذج تسليمنا.',
  },
  es: {
    identity: {
      headline: 'Socio de Transformación Tecnológica · Estrategia · IA · Operaciones',
      shortDescriptor:
        'Hive Vault Arc (H.V.A) es un socio de transformación tecnológica que combina estrategia, ingeniería de IA y operaciones gestionadas.',
      longDescriptor:
        'Hive Vault Arc (H.V.A) es un socio de transformación tecnológica. Asesoramos, construimos y operamos — combinando consultoría estratégica, consultoría tecnológica, ingeniería de IA, desarrollo de software a medida, infraestructura cloud y operaciones gestionadas en un solo equipo. Desde la primera reunión estratégica hasta los sistemas en producción, gestionamos el ciclo completo de entrega.',
      proofStatement:
        'Rediseñamos cómo operan las organizaciones usando tecnología — y nos quedamos hasta que funciona. El mismo equipo. De la estrategia a la producción. Sin interrupciones.',
    },
    capabilities: {
      strategyBusiness: [
        'Estrategia de transformación empresarial y digital',
        'Diagnóstico operativo y rediseño de procesos de negocio',
        'Estrategia de innovación y expansión de mercado mediante tecnología',
      ],
      technologyConsulting: [
        'Arquitectura empresarial y hojas de ruta tecnológicas',
        'Estrategia de plataformas e integración de sistemas',
        'Modernización IT y diseño de infraestructura',
      ],
      aiDataAnalytics: [
        'Agentes de IA para operaciones comerciales, ventas y flujos internos',
        'Estrategia e ingeniería de IA generativa',
        'Ingeniería de datos, business intelligence y analítica predictiva',
      ],
      softwareEngineering: [
        'Software a medida, plataformas SaaS y sistemas empresariales',
        'Aplicaciones web y móviles',
        'Desarrollo de APIs e ingeniería DevOps',
      ],
      cloudInfrastructure: [
        'Migración cloud a AWS, Azure y GCP y desarrollo cloud-native',
        'Automatización de infraestructura, arquitectura de seguridad y zero-trust',
        'Observabilidad, recuperación ante desastres y servicios cloud gestionados',
      ],
      operationsManaged: [
        'Operaciones gestionadas y mantenimiento de aplicaciones post-lanzamiento',
        'Gestión de operaciones de automatización y sistemas de IA',
        'Externalización de procesos de negocio y servicios compartidos',
      ],
    },
    serviceEquivalence: 'Nuestros seis pilares de servicio son nuestro modelo de entrega.',
  },
};

export const MESSAGING_RULES: MessagingRules = {
  forbiddenPhrases: [
    'agency-first',
    'just an AI agency',
    'chatbot shop',
    'tool builder only',
    'pure consulting only',
    'software vendor',
    'handoff after delivery',
  ],
  allowedSearchIntentPhrases: [
    'technology transformation partner Morocco',
    'AI engineering firm Morocco',
    'digital transformation company Morocco',
    'technology consulting firm Tangier',
    'managed operations Morocco',
    'AI agency Morocco',
    'software development Morocco',
    'IT consulting Tangier',
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
