import type { SupportedLocale } from '../lib/seo';

export type FaqItem = { question: string; answer: string };
export type FaqSet = FaqItem[];

// ─── Home ────────────────────────────────────────────────────────────────────

export const HOME_FAQS: FaqSet = [
  {
    question: 'What does H.V.A build?',
    answer:
      'H.V.A (Hive Vault Arc) builds four types of digital systems: AI agents and receptionist systems that automate customer interactions; custom software systems such as CRM, enterprise SaaS, and internal portals; cloud and DevOps infrastructure on AWS and Azure; and mobile and web applications. We serve businesses in Tangier, across Morocco, and internationally.',
  },
  {
    question: 'Where is H.V.A based, and does it work with international clients?',
    answer:
      'H.V.A is headquartered in Tangier, Morocco. We work with clients locally in Morocco and with international companies who need an experienced AI and software engineering partner operating at global standards. Our team communicates in English, French, Arabic, and Spanish.',
  },
  {
    question: 'How long does it take H.V.A to deliver a software or AI project?',
    answer:
      'Timelines depend on scope. A focused AI receptionist or chatbot project typically takes 4 to 8 weeks. A custom software or CRM system typically runs 8 to 20 weeks. We follow a four-stage delivery process — Discover, Design, Build, Scale — with sprint-based checkpoints so you have visibility at every stage.',
  },
  {
    question: 'What industries does H.V.A work with?',
    answer:
      'H.V.A has delivered systems for real estate agencies, healthcare clinics, construction companies, logistics operators, and general SMEs across Morocco. Our AI and software solutions are built for the specific workflows, languages, and compliance requirements of each industry — not generic off-the-shelf tools.',
  },
  {
    question: 'How do I start a project with H.V.A?',
    answer:
      'The first step is a discovery call. You share your goals, constraints, and timeline. We map the highest-impact opportunities, propose a focused scope, and agree on a delivery model before any work begins. Contact us through the form on our website or by phone to book a session.',
  },
  {
    question: 'Does H.V.A publish real deployment proof or only marketing claims?',
    answer:
      'H.V.A publishes production case studies with named systems, technical architecture, integrations, deployment status, and measured outcomes. We also share approved screenshots and client-attributed testimonials where publication rights are granted.',
  },
  {
    question: 'What does "we operate the operating system of your business" mean?',
    answer:
      'It means H.V.A designs, builds, and operates one coordinated system layer across customer operations, revenue workflows, executive reporting, and cloud reliability. Instead of isolated project deliverables, you get one operating rhythm that improves over time.',
  },
  {
    question: 'How does pricing work with H.V.A?',
    answer:
      'H.V.A keeps pricing private and defines it after a discovery call. Commercial structure depends on scope, integrations, complexity, and deployment requirements.',
  },
];

// ─── Services ────────────────────────────────────────────────────────────────

export const SERVICES_FAQS: FaqSet = [
  // Original 6 — kept verbatim
  {
    question: 'What is an AI agent and how can it help my business in Tangier?',
    answer:
      'An AI agent is an autonomous software system that can handle tasks like answering customer calls, qualifying leads, generating reports, and automating workflows — without human intervention. In Tangier, H.V.A builds custom AI agents for reception, sales support, and business analytics, helping local businesses operate 24/7 and scale without proportional headcount growth.',
  },
  {
    question: 'Does H.V.A build AI agents in Tangier, Morocco?',
    answer:
      'Yes. H.V.A (Hive Vault Arc) is an AI-driven business transformation partner based in Tangier, Morocco. We design and deploy AI receptionist systems, AI analyst tools, and workflow automation agents for Moroccan businesses and international clients. We operate in Arabic, French, Spanish, and English.',
  },
  {
    question: 'What types of AI agents does H.V.A build?',
    answer:
      'H.V.A builds three core types of AI agents: (1) AI Receptionists — voice and chat agents that handle inbound calls, WhatsApp messages, and appointment bookings; (2) AI Analysts — agents that pull business data, generate dashboards, and surface insights for decision-makers; (3) Workflow Automation Agents — systems that automate sales pipelines, support queues, and internal operations using tools like Zapier, Make, and custom APIs.',
  },
  {
    question: 'How much does it cost to build an AI agent in Morocco?',
    answer:
      'The cost of building an AI agent in Morocco depends on complexity, integrations, and scale. H.V.A offers fixed-scope projects starting from discovery and design through to full deployment. Contact us for a scoped estimate specific to your use case.',
  },
  {
    question: 'Can H.V.A build a WhatsApp AI chatbot for my business in Morocco?',
    answer:
      'Yes. H.V.A builds WhatsApp AI chatbots that handle customer inquiries, bookings, and support in Arabic, French, Spanish, and English — fully integrated with the WhatsApp Business API. These are used by businesses in Tangier and across Morocco to automate customer communication.',
  },
  {
    question: 'What is the difference between an AI agent and a chatbot?',
    answer:
      'A chatbot follows fixed scripts and decision trees. An AI agent uses large language models (LLMs) and tool integrations to reason, plan, and take actions — like booking appointments, updating CRM records, or generating reports — based on context. H.V.A builds AI agents, not simple chatbots.',
  },
  // 4 new additions covering the other three service lines
  {
    question: 'What custom software does H.V.A build for businesses in Morocco?',
    answer:
      'H.V.A builds CRM systems tailored to Moroccan business workflows (Arabic, French, multilingual), enterprise SaaS systems, internal operations portals, and API architectures. Unlike off-the-shelf SaaS, these systems are engineered for your specific process, data model, and user base — giving you a competitive advantage no vendor subscription can replicate.',
  },
  {
    question: 'Can H.V.A migrate our existing CRM or legacy system to a modern operating system?',
    answer:
      'Yes. H.V.A specialises in CRM migration, ERP integration, and legacy system modernisation. We audit your current system, design the migration path to minimise data loss and downtime, and rebuild the system with modern architecture — with full support for Arabic and French interfaces where required.',
  },
  {
    question: 'What cloud and DevOps services does H.V.A provide?',
    answer:
      'H.V.A deploys and manages cloud infrastructure on AWS and Azure. Services include infrastructure setup, CI/CD pipeline implementation, automated deployment with zero-downtime release strategies, security hardening, monitoring, and on-call reliability support. We also provide DevOps consulting for engineering teams that need process improvements without full outsourcing.',
  },
  {
    question: 'Does H.V.A build mobile applications for Android and iOS?',
    answer:
      'Yes. H.V.A builds multi-device mobile applications using Flutter and native Android frameworks. We deliver fully owned, production-ready applications — not white-label templates — with custom backend integration, API architecture, and ongoing maintenance support.',
  },
  {
    question: 'Can H.V.A prove technical depth before we start an engagement?',
    answer:
      'Yes. During evaluation, we provide architecture snapshots, integration maps, and KPI evidence from approved deployments (for example AI WhatsApp systems, CRM operating systems, and executive analytics dashboards). Where required, deeper technical walkthroughs can be shared under NDA.',
  },
];

// ─── About ───────────────────────────────────────────────────────────────────

export const ABOUT_FAQS: FaqSet = [
  {
    question: 'Who are the founders of H.V.A?',
    answer:
      'H.V.A was founded by three engineers: Khalid Chalhi (Architecture & Delivery), Ali Amrani (Product & Systems), and Oubay Ghamat (Cloud & Scale). Together they bring over four years of engineering experience, two shipped commercial products, and end-to-end coverage from system design to cloud deployment.',
  },
  {
    question: 'What makes H.V.A different from other software agencies in Morocco?',
    answer:
      'H.V.A is a founding-team-led engineering firm, not a staff augmentation agency. Every project is led by the same engineers who designed the architecture. We work outcome-first — every milestone is tied to a measurable business result — and we take end-to-end ownership from discovery through to production.',
  },
  {
    question: 'Does H.V.A work on long-term projects or one-off builds?',
    answer:
      'Both. H.V.A takes on focused, fixed-scope projects (AI agent deployment, CRM builds, cloud setup) and longer-term partnerships where we serve as the engineering team for a product roadmap. Post-delivery, we offer reliability monitoring and scale planning as optional ongoing services.',
  },
  {
    question: "What is H.V.A's delivery process?",
    answer:
      'Every H.V.A engagement follows four stages: Business Discovery (align goals, map blockers, agree scope); System Design (architecture, milestones, risk); Build and Validate (sprint-based delivery with QA and demos); and Stabilize and Scale (handover, monitoring, scale planning). Clients have full visibility at every step.',
  },
  {
    question: 'Is H.V.A able to work with startups or only established companies?',
    answer:
      'H.V.A works with both startups and established companies. For startups, we help validate and build the core product efficiently, avoiding over-engineering. For established businesses, we focus on modernising operations, adding AI capabilities, and scaling infrastructure. The scope and approach adapts to where you are.',
  },
];

// ─── Contact ─────────────────────────────────────────────────────────────────

export const CONTACT_FAQS: FaqSet = [
  {
    question: 'How quickly does H.V.A respond to inquiries?',
    answer:
      'We respond to all project inquiries within 24 hours on business days. After an initial response, we schedule a discovery call within 48 hours to understand your requirements in detail before any proposal is made.',
  },
  {
    question: 'Does H.V.A offer a free initial consultation?',
    answer:
      'Yes. The discovery call is complimentary. During this session, we review your current situation, identify the highest-impact opportunities, and outline a realistic scope and timeline. There is no obligation to proceed.',
  },
  {
    question: 'What information should I prepare before contacting H.V.A?',
    answer:
      'The more context you share, the better the initial call will be. Useful information includes: your core business objective, the problem you want to solve, any existing systems involved, your approximate timeline, and your budget range. Even a rough brief is enough to get started.',
  },
  {
    question: 'Can H.V.A sign an NDA before we discuss our project?',
    answer:
      'Yes. H.V.A routinely signs mutual NDAs before detailed project discussions. If you require one, mention it in your initial message and we will send one before the first discovery call.',
  },
];

// ─── Portfolio ───────────────────────────────────────────────────────────────

export const PORTFOLIO_FAQS: FaqSet = [
  {
    question: 'What types of projects has H.V.A delivered?',
    answer:
      'H.V.A has delivered AI receptionist systems for multilingual customer operations, CRM operating systems for real estate and healthcare businesses, cloud infrastructure with CI/CD for product engineering teams, and mobile applications for Android and iOS. All systems are built for production use — not prototypes.',
  },
  {
    question: 'Does H.V.A share case studies or past client work?',
    answer:
      'H.V.A shares portfolio work that clients have approved for publication. Contact us directly if you want to see specific examples relevant to your industry or use case — we can discuss relevant prior work under NDA when required.',
  },
  {
    question: 'Can H.V.A provide references from past clients?',
    answer:
      'Yes. We provide references upon request during the evaluation stage of an engagement. Reference calls can be arranged with past clients who have consented to be contacted.',
  },
  {
    question: 'How does H.V.A ensure quality across its delivered projects?',
    answer:
      'Quality is built in from the start, not added at the end. Every H.V.A project includes architecture review, sprint-based QA checkpoints, security hardening, and automated testing before production deployment. Our delivery model makes reliability a non-negotiable — not a premium add-on.',
  },
  {
    question: 'What proof details are included in H.V.A case studies?',
    answer:
      'Each case study is documented with five evidence blocks: system built, stack and integrations, deployment status, measured outcomes, and client quote. This format helps buyers evaluate real technical maturity instead of generic claims.',
  },
];

// ─── Locale Services ─────────────────────────────────────────────────────────

export const LOCALE_SERVICES_FAQS: Record<SupportedLocale, FaqSet> = {
  // English reuses the main services set
  en: SERVICES_FAQS,

  // French — 6 highest-intent questions for the French-speaking Moroccan market
  fr: [
    {
      question: "Qu'est-ce qu'un agent IA et comment peut-il aider mon entreprise ?",
      answer:
        "Un agent IA est un système logiciel autonome capable de gérer des tâches comme répondre aux demandes clients, qualifier des leads, générer des rapports et automatiser des processus — sans intervention humaine. H.V.A conçoit des agents IA pour la réception, le support commercial et l'analyse métier, permettant aux entreprises marocaines d'opérer 24h/24 sans augmenter les effectifs.",
    },
    {
      question: 'H.V.A développe-t-il des chatbots WhatsApp pour les entreprises au Maroc ?',
      answer:
        "Oui. H.V.A développe des chatbots IA WhatsApp qui gèrent les demandes clients, les réservations et le support en arabe, français, espagnol et anglais — entièrement intégrés à l'API WhatsApp Business. Ces solutions sont utilisées par des entreprises à Tanger et dans tout le Maroc pour automatiser leur communication client.",
    },
    {
      question: 'Quels types de logiciels sur mesure H.V.A développe-t-il ?',
      answer:
        'H.V.A développe des systèmes CRM adaptés aux flux de travail des entreprises marocaines, des plateformes SaaS d\'entreprise, des portails opérationnels internes et des architectures API. Contrairement aux outils SaaS génériques, ces systèmes sont conçus pour votre processus spécifique.',
    },
    {
      question: 'H.V.A peut-il migrer notre CRM ou système existant vers une plateforme moderne ?',
      answer:
        "Oui. H.V.A se spécialise dans la migration CRM, l'intégration ERP et la modernisation des systèmes legacy. Nous auditons votre système actuel, concevons le plan de migration et reconstruisons la plateforme avec une architecture moderne incluant le support arabe et français.",
    },
    {
      question: 'Quels services cloud et DevOps H.V.A propose-t-il ?',
      answer:
        "H.V.A déploie et gère l'infrastructure cloud sur AWS et Azure : mise en place de l'infrastructure, implémentation de pipelines CI/CD, déploiement automatisé sans temps d'arrêt, durcissement de la sécurité, monitoring et support de fiabilité.",
    },
    {
      question: 'Comment démarrer un projet avec H.V.A ?',
      answer:
        "La première étape est un appel de découverte. Vous partagez vos objectifs et contraintes. Nous cartographions les opportunités à fort impact, proposons un périmètre ciblé et convenons d'un modèle de livraison avant le début des travaux.",
    },
  ],

  // Arabic — 6 highest-intent questions (RTL-safe plain text)
  ar: [
    {
      question: 'ما هو وكيل الذكاء الاصطناعي وكيف يمكنه مساعدة عملي؟',
      answer:
        'وكيل الذكاء الاصطناعي هو نظام برمجي مستقل قادر على التعامل مع مهام مثل الرد على استفسارات العملاء وتأهيل العملاء المحتملين وتوليد التقارير وأتمتة سير العمل — دون تدخل بشري. تبني H.V.A وكلاء ذكاء اصطناعي مخصصين لأعمال الاستقبال والمبيعات والتحليل، مما يتيح للشركات المغربية العمل على مدار الساعة دون توسيع فريق العمل.',
    },
    {
      question: 'هل تبني H.V.A روبوتات دردشة على واتساب للشركات في المغرب؟',
      answer:
        'نعم. تبني H.V.A روبوتات دردشة ذكاء اصطناعي على واتساب تتعامل مع استفسارات العملاء والحجوزات والدعم باللغات العربية والفرنسية والإسبانية والإنجليزية — مع تكامل كامل مع واجهة برمجة تطبيقات واتساب للأعمال.',
    },
    {
      question: 'ما أنواع البرمجيات المخصصة التي تطورها H.V.A؟',
      answer:
        'تطور H.V.A أنظمة CRM مُصمَّمة لسير عمل الشركات المغربية، ومنصات SaaS للمؤسسات، وبوابات عمليات داخلية، وهياكل API. هذه الأنظمة مصممة لعملية عملك المحددة، وليست أدوات جاهزة عامة.',
    },
    {
      question: 'هل يمكن لـ H.V.A ترحيل نظام CRM أو النظام الحالي لدينا إلى منصة حديثة؟',
      answer:
        'نعم. تتخصص H.V.A في ترحيل CRM وتكامل ERP وتحديث الأنظمة القديمة. نُراجع نظامك الحالي، ونُصمم مسار الترحيل، ونُعيد بناء المنصة ببنية حديثة مع دعم كامل للواجهات العربية والفرنسية.',
    },
    {
      question: 'ما خدمات السحابة والـ DevOps التي تقدمها H.V.A؟',
      answer:
        'تنشر H.V.A وتدير البنية التحتية السحابية على AWS وAzure: إعداد البنية التحتية، وتنفيذ خطوط CI/CD، والنشر الآلي بدون توقف، وتصليب الأمان، والمراقبة، ودعم الموثوقية.',
    },
    {
      question: 'كيف أبدأ مشروعاً مع H.V.A؟',
      answer:
        'الخطوة الأولى هي مكالمة اكتشاف. تشارك أهدافك وقيودك، ونُحدد الفرص عالية التأثير، ونقترح نطاقاً مركزاً، ونتفق على نموذج التسليم قبل البدء في أي عمل.',
    },
  ],

  // Spanish — 6 highest-intent questions for Spanish-speaking clients
  es: [
    {
      question: '¿Qué es un agente de IA y cómo puede ayudar a mi negocio?',
      answer:
        'Un agente de IA es un sistema de software autónomo capaz de gestionar tareas como responder consultas de clientes, cualificar leads, generar informes y automatizar flujos de trabajo — sin intervención humana. H.V.A desarrolla agentes de IA personalizados para recepción, soporte de ventas y análisis de negocio, permitiendo a las empresas marroquíes operar 24/7 sin aumentar la plantilla.',
    },
    {
      question: '¿H.V.A desarrolla chatbots de WhatsApp para empresas en Marruecos?',
      answer:
        'Sí. H.V.A desarrolla chatbots de IA para WhatsApp que gestionan consultas de clientes, reservas y soporte en árabe, francés, español e inglés — con integración completa con la API de WhatsApp Business.',
    },
    {
      question: '¿Qué tipo de software a medida desarrolla H.V.A?',
      answer:
        'H.V.A desarrolla sistemas CRM adaptados a los flujos de trabajo de empresas marroquíes, plataformas SaaS empresariales, portales operativos internos y arquitecturas API diseñadas para su proceso específico.',
    },
    {
      question: '¿Puede H.V.A migrar nuestro CRM o sistema existente a una plataforma moderna?',
      answer:
        'Sí. H.V.A se especializa en migración de CRM, integración de ERP y modernización de sistemas legacy, reconstruyendo la plataforma con arquitectura moderna e interfaz en árabe y francés cuando sea necesario.',
    },
    {
      question: '¿Qué servicios cloud y DevOps ofrece H.V.A?',
      answer:
        'H.V.A despliega y gestiona infraestructura cloud en AWS y Azure: configuración de infraestructura, implementación de pipelines CI/CD, despliegue automatizado sin caídas, endurecimiento de seguridad, monitorización y soporte de fiabilidad.',
    },
    {
      question: '¿Cómo empiezo un proyecto con H.V.A?',
      answer:
        'El primer paso es una llamada de descubrimiento. Compartís vuestros objetivos y restricciones. Mapeamos las oportunidades de mayor impacto, proponemos un alcance enfocado y acordamos un modelo de entrega antes de comenzar.',
    },
  ],
};
