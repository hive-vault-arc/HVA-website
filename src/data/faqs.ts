import type { SupportedLocale } from '../lib/seo';

export type FaqItem = { question: string; answer: string };
export type FaqSet = FaqItem[];

// Home
export const HOME_FAQS: FaqSet = [
  {
    question: 'What does Hive Vault Arc do?',
    answer:
      'Hive Vault Arc is a technology transformation partner combining strategy, AI engineering, software, cloud infrastructure, and managed operations. We advise, build, and operate across six service pillars so organizations can redesign how work happens and keep production systems improving after launch.',
  },
  {
    question: 'What is the ARC Program?',
    answer:
      'The ARC Program is Hive Vault Arc\'s structured engagement model: Assess (understand the operating state and constraints), Re-engineer (redesign processes, architecture, and systems), and Command (run, stabilize, and improve the production operation). Most ARC engagements run 6–12 weeks and cover strategy through managed evolution.',
  },
  {
    question: 'Does Hive Vault Arc build WhatsApp AI agents?',
    answer:
      'Yes. WhatsApp AI agents are one of Hive Vault Arc\'s core offerings. We build intelligent agents on the WhatsApp Business API that handle lead qualification, customer support, and sales automation. Our production deployments support always-on multilingual workflows, persistent memory, and direct CRM integration.',
  },
  {
    question: 'Is Hive Vault Arc an AI company, a consulting firm, or a software agency?',
    answer:
      'Hive Vault Arc is a technology transformation partner. That means we combine strategy, AI engineering, software delivery, cloud infrastructure, and managed operations in one accountable team. We go beyond advising and beyond building: we own delivery and remain accountable through production.',
  },
  {
    question: 'What kinds of AI solutions does Hive Vault Arc build?',
    answer:
      'We build AI agents for customer-facing operations (WhatsApp, web, voice), internal workflow automation, lead qualification and smart routing systems, AI-powered reporting and decision intelligence dashboards, and full orchestration layers that connect your AI agents with CRM, calendar, and data systems.',
  },
  {
    question: 'What does a digital transformation engagement look like?',
    answer:
      'It starts with a strategic discovery session — we map business goals, operational constraints, and current system realities. From there we define the transformation roadmap, architecture decisions, and delivery scope. Execution runs in clear milestones. We stay involved through deployment, stabilization, and long-term managed evolution.',
  },
  {
    question: 'Can Hive Vault Arc support us after the system is live?',
    answer:
      'Yes. We provide long-term maintenance and managed evolution: reliability monitoring, optimization cycles, roadmap extensions, and architectural guidance as your operations grow. Most clients retain us as a long-term partner.',
  },
  {
    question: 'Do you publish real proof of delivery?',
    answer:
      'Yes. We publish approved case studies with business challenge context, strategy and architecture decisions, integrations, deployment status, and measured outcomes. Where permitted, we include testimonials and supporting evidence blocks.',
  },
  {
    question: 'Where is Hive Vault Arc based and what markets do you serve?',
    answer:
      'We are based in Tangier, Morocco, and serve clients across Morocco and international markets including Europe, North America, and the Middle East. Our team works in English, French, Arabic, and Spanish.',
  },
  {
    question: 'How does pricing work?',
    answer:
      'Pricing is handled after discovery. Commercial scope depends on transformation complexity, AI systems required, integrations, delivery horizon, and maintenance requirements. Discovery is always complimentary.',
  },
];

// Capabilities
export const CAPABILITIES_FAQS: FaqSet = [
  {
    question: "What are Hive Vault Arc's six service pillars?",
    answer:
      'Hive Vault Arc operates across six service pillars: Strategy and Business Consulting, Technology Consulting, AI/Data/Analytics, Software Engineering and Product Development, Cloud and Infrastructure, and Operations and Managed Services. Engagements combine these pillars based on business priorities and operating constraints.',
  },
  {
    question: 'What AI and automation solutions do you deliver?',
    answer:
      'We deliver AI agents, workflow automation, decision intelligence, and AI-enabled reporting systems. Typical deployments include WhatsApp/web/voice agents, orchestration layers, and operational automation linked to CRM and data systems.',
  },
  {
    question: 'What does consulting include at Hive Vault Arc?',
    answer:
      'Consulting includes strategy, architecture decisions, roadmap design, tech function planning, and transformation sequencing. We align executive priorities with execution milestones and stay accountable during delivery.',
  },
  {
    question: 'How do you approach digital transformation programs?',
    answer:
      'We run business and IT modernization from diagnostics to operating rollout. Coverage includes CRM and operations redesign, digital maturity progression, digital ecosystems, agile-at-scale enablement, and platform evolution tied to measurable outcomes.',
  },
  {
    question: 'Do you provide engineering delivery for product and platform builds?',
    answer:
      'Yes. We engineer custom web apps, mobile apps, SaaS platforms, cloud systems, APIs, and integrations. We also deliver CRM modernization and operational platform builds matched to your process model.',
  },
  {
    question: 'What AI, data, and analytics capabilities are included?',
    answer:
      'We provide AI agents, generative AI engineering, predictive analytics, data pipelines, warehouses, executive dashboards, and MLOps. The goal is reliable decision intelligence and repeatable operating leverage.',
  },
  {
    question: 'Do you cover cloud, infrastructure, cybersecurity, and digital risk?',
    answer:
      'Yes. Cloud, infrastructure, cybersecurity, and digital risk are embedded in capability delivery: cloud migration, infrastructure automation, zero-trust design, observability, identity controls, monitoring, and governance for resilient transformation programs.',
  },
  {
    question: 'Do you provide operations and managed services after go-live?',
    answer:
      'Yes. We stay involved after launch through managed operations, application maintenance, performance tuning, AI system management, IT support, and ongoing optimization.',
  },
  {
    question: 'How does ARC work with Hive Vault Arc?',
    answer:
      'ARC runs in three phases: Assess (diagnose constraints and readiness), Re-engineer (redesign processes, architecture, and systems), and Command (run, stabilize, and improve production operations). It is recommended when strategy, build, and long-term operating accountability need to stay connected.',
  },
  {
    question: 'Can Hive Vault Arc stay involved after launch?',
    answer:
      'Yes. We provide long-term maintenance, optimization, and scaling support. Engagements can remain fully managed or evolve through ARC depending on your operating model goals.',
  },
];

// About
export const ABOUT_FAQS: FaqSet = [
  {
    question: 'What is Hive Vault Arc?',
    answer:
      'Hive Vault Arc is a technology transformation partner based in Tangier, Morocco. We combine strategy consulting, AI engineering, software development, cloud infrastructure, and managed operations in one founder-led team, delivering transformation programs from strategy through production without handoffs.',
  },
  {
    question: 'Who is the CEO of Hive Vault Arc?',
    answer:
      'Hive Vault Arc is founder-led. The current founders and their responsibility areas are maintained on the About page.',
  },
  {
    question: 'Qui est le PDG de Hive Vault Arc ?',
    answer:
      'Hive Vault Arc est dirigee par ses cofondateurs. Les profils et perimetres de responsabilite actuels sont maintenus sur la page A propos.',
  },
  {
    question: 'What is the ARC framework?',
    answer:
      'ARC is the Hive Vault Arc delivery model: Assess, Re-engineer, Command. Assess means mapping friction and defining architecture before any code is written. Re-engineer means building AI systems, software, and cloud infrastructure in sprint increments. Command means operating and evolving the systems long-term. The same team runs all three phases, with no handoff between them.',
  },
  {
    question: "What are Hive Vault Arc's six service pillars?",
    answer:
      'Hive Vault Arc delivers across six integrated pillars: (1) Strategy & Business Consulting — operating model redesign and transformation roadmaps; (2) Technology Consulting — enterprise architecture and platform strategy; (3) AI, Data & Analytics — generative AI, autonomous agents, machine learning, and data engineering; (4) Software Engineering & Product — custom software, SaaS platforms, and mobile apps; (5) Cloud & Infrastructure — AWS, Azure, GCP, and infrastructure automation; (6) Operations & Managed Services — ongoing production ownership and application evolution.',
  },
  {
    question: 'Who leads Hive Vault Arc engagements?',
    answer:
      'Hive Vault Arc is founder-led. The current leadership team and responsibility areas are maintained on the About page.',
  },
  {
    question: 'Do you stay involved after the initial build?',
    answer:
      'Yes. That is the Command phase of ARC. We provide managed operations, production monitoring, application evolution, and ongoing optimization. Transformation is only complete when the systems are running and the outcomes are measurable. We do not disappear after go-live.',
  },
  {
    question: 'What industries does Hive Vault Arc serve?',
    answer:
      'Hive Vault Arc operates in eight defined verticals: Real Estate & Construction, Healthcare & Life Sciences, Financial Services, Government & Public Sector, Retail & E-Commerce, Energy & Sustainability, Logistics & Transportation, and Consumer Goods & Luxury. We focus on Morocco and the France-MENA corridor.',
  },
];

// Contact
export const CONTACT_FAQS: FaqSet = [
  {
    question: 'What happens after I submit the contact form?',
    answer:
      'We review your brief and reply within one business day. The first call focuses on your AI, automation, or transformation priorities, constraints, and the best engagement path.',
  },
  {
    question: 'Is the first discovery call paid?',
    answer:
      'No. Discovery is complimentary. It is designed to validate fit, clarify outcomes across AI, automation, and transformation scope, and define next-step options before formal scoping.',
  },
  {
    question: 'Can Hive Vault Arc sign an NDA before deep discussion?',
    answer:
      'Yes. We can sign an NDA before any sensitive system, data, or commercial details are discussed.',
  },
  {
    question: 'Do you publish fixed prices on the website?',
    answer:
      'No. Pricing is discussed after discovery and depends on AI system complexity, transformation scope, engineering load, and maintenance expectations.',
  },
];

// Portfolio
export const PORTFOLIO_FAQS: FaqSet = [
  {
    question: 'What does the portfolio represent?',
    answer:
      'The portfolio represents real AI, automation, and digital transformation programs delivered in production environments. It highlights the intersection of strategy, intelligent automation, and engineering depth.',
  },
  {
    question: 'Are these live systems or demos?',
    answer:
      'These are live or recently deployed production systems — AI agents running customer operations, CRM systems tracking active pipeline, and analytics platforms generating real executive decisions daily.',
  },
  {
    question: 'Do case studies include business and technical context?',
    answer:
      'Yes. We include business challenge, transformation strategy, AI architecture decisions, integrations, deployment status, and operating outcomes so buyers can evaluate depth clearly.',
  },
  {
    question: 'Can you share additional proof privately?',
    answer:
      'Yes. For qualified opportunities, we can share deeper walkthroughs, AI architecture artifacts, and additional references under confidentiality terms.',
  },
  {
    question: 'How should we use the portfolio in our evaluation?',
    answer:
      'Use it to compare your context with similar AI and transformation patterns, then book a discovery call so we can map the right intelligent automation or transformation program for your organization.',
  },
];

// Locale Capabilities
export const LOCALE_CAPABILITIES_FAQS: Record<SupportedLocale, FaqSet> = {
  en: CAPABILITIES_FAQS,
  fr: [
    {
      question: 'Comment Hive Vault Arc se positionne-t-il sur le marché ?',
      answer:
        "Hive Vault Arc est un partenaire de transformation technologique combinant stratégie, ingénierie IA, logiciel, cloud et opérations managées. Nous conseillons, construisons et opérons avec une exécution intégrée de bout en bout.",
    },
    {
      question: "Quels types d'automatisation IA proposez-vous ?",
      answer:
        "Nous déployons des agents IA (WhatsApp, web, voix), l'automatisation des workflows, la qualification de leads, et des tableaux de bord décisionnels. Nous couvrons aussi cybersécurité digitale, deep tech et IoT quand ces briques sont nécessaires au programme.",
    },
    {
      question: 'Que comprend une mission de transformation digitale chez Hive Vault Arc ?',
      answer:
        "Une mission couvre le diagnostic opérationnel, la feuille de route de transformation, les décisions d'architecture, puis le pilotage de l'exécution jusqu'à la mise en production et l'évolution long terme.",
    },
    {
      question: 'Hive Vault Arc peut-il livrer puis maintenir les systèmes ?',
      answer:
        "Oui. Nous assurons la livraison, la stabilisation et la maintenance évolutive pour garder les systèmes IA et les plateformes digitales fiables et alignés avec les objectifs métier.",
    },
    {
      question: 'Travaillez-vous avec startups et entreprises établies ?',
      answer:
        "Oui. Nous adaptons le niveau de cadrage, de gouvernance et d'exécution selon la maturité de l'organisation — d'un déploiement IA rapide à une transformation digitale multi-systèmes.",
    },
    {
      question: 'Comment sont gérées les conditions commerciales ?',
      answer:
        "Les conditions commerciales sont définies après discovery selon le périmètre, y compris les scénarios ARC, la complexité technique, les intégrations et l'effort de maintenance.",
    },
  ],
  ar: [
    {
      question: 'كيف تصف Hive Vault Arc موقعها في السوق؟',
      answer:
        'Hive Vault Arc هي شريك للتحول التقني يجمع بين الاستراتيجية وهندسة الذكاء الاصطناعي والبرمجيات والبنية السحابية والعمليات المُدارة. نستشير ونبني وندير بتنفيذ متكامل من البداية إلى الإنتاج.',
    },
    {
      question: 'ما أنواع حلول الذكاء الاصطناعي التي تقدمونها؟',
      answer:
        'نصمم وننشر وكلاء ذكاء اصطناعي للعمليات المواجهة للعملاء (واتساب، ويب، صوت)، وأتمتة سير العمل الداخلي، وتأهيل العملاء المحتملين، ومساعدي التقارير، ولوحات الذكاء التحليلي، مع تغطية الأمن السيبراني وDeep Tech وIoT عند الحاجة.',
    },
    {
      question: 'ماذا يشمل مسار التحول الرقمي لديكم؟',
      answer:
        'يشمل تشخيص العمليات وتحديد خارطة التحول وقرارات المعمارية ثم قيادة التنفيذ حتى الاطلاق في بيئة التشغيل والتطوير طويل المدى.',
    },
    {
      question: 'هل تتابعون بعد الاطلاق؟',
      answer:
        'نعم. نقدم الاستقرار والتحسين والصيانة التطويرية لضمان استمرارية أنظمة الذكاء الاصطناعي والبنية التقنية مع أهداف الأعمال.',
    },
    {
      question: 'هل تعملون مع شركات ناشئة ومؤسسات كبيرة؟',
      answer:
        'نعم. نكيف نموذج العمل حسب مستوى نضج الشركة — من نشر ذكاء اصطناعي سريع للشركات الناشئة إلى تحولات رقمية متعددة الأنظمة للمؤسسات الكبيرة.',
    },
    {
      question: 'كيف يتم تحديد الأسعار؟',
      answer:
        'يتم تحديد السعر بعد جلسة الاكتشاف بناء على نطاق التحول والتنفيذ، بما في ذلك خيارات ARC، والتعقيد التقني، والتكاملات ومتطلبات الصيانة.',
    },
  ],
  es: [
    {
      question: '¿Cómo se posiciona Hive Vault Arc en el mercado?',
      answer:
        'Hive Vault Arc es un socio de transformación tecnológica que combina estrategia, ingeniería de IA, software, cloud y operaciones gestionadas. Asesoramos, construimos y operamos con ejecución integrada de extremo a extremo.',
    },
    {
      question: '¿Qué soluciones de automatización e IA ofrecéis?',
      answer:
        'Diseñamos y desplegamos agentes de IA para operaciones comerciales (WhatsApp, web, voz), automatización de flujos internos, calificación de leads, asistentes de reporting e inteligencia operativa, con cobertura de ciberseguridad, deep tech e IoT cuando el programa lo requiere.',
    },
    {
      question: '¿Qué incluye un programa de transformación digital con Hive Vault Arc?',
      answer:
        'Incluye diagnóstico operativo, hoja de ruta de transformación, decisiones de arquitectura y acompañamiento de ejecución hasta producción y evolución a largo plazo.',
    },
    {
      question: '¿Pueden mantener los sistemas después del lanzamiento?',
      answer:
        'Sí. Ofrecemos estabilización, optimización y mantenimiento evolutivo para sostener el rendimiento de los sistemas de IA e infraestructura digital.',
    },
    {
      question: '¿Trabajan con startups y empresas consolidadas?',
      answer:
        'Sí. Adaptamos el modelo de trabajo según la madurez organizacional — desde despliegues rápidos de IA para startups hasta transformaciones digitales multi-sistema para empresas establecidas.',
    },
    {
      question: '¿Cómo se define la parte comercial?',
      answer:
        'La estructura comercial se define después del discovery, incluyendo escenarios ARC, según alcance, complejidad técnica, integraciones y necesidades de mantenimiento.',
    },
  ],
};
