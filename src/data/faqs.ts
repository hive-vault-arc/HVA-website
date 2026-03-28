import type { SupportedLocale } from '../lib/seo';

export type FaqItem = { question: string; answer: string };
export type FaqSet = FaqItem[];

// Home
export const HOME_FAQS: FaqSet = [
  {
    question: 'What does H.V.A do?',
    answer:
      'H.V.A is an AI-powered digital transformation and technology consulting firm. We work across three pillars: (1) AI agents and intelligent automation — building systems that handle operations, qualify leads, and run workflows continuously; (2) digital transformation programs — end-to-end modernization of how your business operates through cloud, data, and custom software; and (3) technology consulting — strategic advisory, roadmap design, and architecture decisions that align your technology investments with business outcomes.',
  },
  {
    question: 'Is H.V.A an AI company, a consulting firm, or a software agency?',
    answer:
      'All three — and that combination is intentional. We lead with AI and automation because that is where the highest operational leverage is right now. We run it through digital transformation programs so change actually sticks. And we back everything with consulting rigor so strategy and execution stay aligned. We go beyond advising and beyond building — we own delivery and remain accountable through production.',
  },
  {
    question: 'What kinds of AI solutions does H.V.A build?',
    answer:
      'We build AI agents for customer-facing operations (WhatsApp, web, voice), internal workflow automation, lead qualification and smart routing systems, AI-powered reporting and decision intelligence dashboards, and full orchestration layers that connect your AI agents with CRM, calendar, and data systems.',
  },
  {
    question: 'What does a digital transformation engagement look like?',
    answer:
      'It starts with a strategic discovery session — we map business goals, operational constraints, and current system realities. From there we define the transformation roadmap, architecture decisions, and delivery scope. Execution runs in clear milestones. We stay involved through deployment, stabilization, and long-term managed evolution.',
  },
  {
    question: 'Can H.V.A support us after the system is live?',
    answer:
      'Yes. We provide long-term maintenance and managed evolution: reliability monitoring, optimization cycles, roadmap extensions, and architectural guidance as your operations grow. Most clients retain us as a long-term partner.',
  },
  {
    question: 'Do you publish real proof of delivery?',
    answer:
      'Yes. We publish approved case studies with business challenge context, strategy and architecture decisions, integrations, deployment status, and measured outcomes. Where permitted, we include testimonials and supporting evidence blocks.',
  },
  {
    question: 'Where is H.V.A based and what markets do you serve?',
    answer:
      'We are based in Tangier, Morocco, and serve clients across Morocco and international markets including Europe, North America, and the Middle East. Our team works in English, French, Arabic, and Spanish.',
  },
  {
    question: 'How does pricing work?',
    answer:
      'Pricing is handled after discovery. Commercial scope depends on transformation complexity, AI systems required, integrations, delivery horizon, and maintenance requirements. Discovery is always complimentary.',
  },
];

// Services
export const SERVICES_FAQS: FaqSet = [
  {
    question: 'What are H.V.A\'s core service areas?',
    answer:
      'Our three core pillars are: AI and intelligent automation (agents, workflow systems, decision intelligence), digital transformation programs (end-to-end modernization, cloud, data, IT upgrades), and technology consulting (strategy, roadmaps, architecture advisory). Most engagements combine elements from all three.',
  },
  {
    question: 'What AI and automation solutions do you deliver?',
    answer:
      'We design and deploy AI agents for customer operations (WhatsApp, web, voice), automated lead qualification and routing, internal workflow orchestration, AI-powered reporting assistants, and decision intelligence dashboards. Every system integrates with the tools your team already uses.',
  },
  {
    question: 'What does technology consulting include at H.V.A?',
    answer:
      'Technology consulting includes operational diagnostics, transformation strategy, architecture decisions, roadmap design, risk planning, and transformation sequencing. We align executive goals with concrete execution milestones — and then execute against them.',
  },
  {
    question: 'How do you approach digital transformation programs?',
    answer:
      'We run transformation programs end-to-end: discovery and diagnostics, roadmap and architecture design, engineering execution, and managed evolution. This lifecycle model ensures business and technical continuity from strategy through long-term production operations.',
  },
  {
    question: 'Can H.V.A deliver custom software, CRM, and mobile systems?',
    answer:
      'Yes. We build custom software platforms, CRM systems, operational portals, mobile apps, and SaaS products that match your process model, data structure, and team responsibilities.',
  },
  {
    question: 'Do you handle IT modernization and legacy upgrades?',
    answer:
      'Yes. We modernize legacy systems by redesigning architecture, migrating critical workloads, integrating existing tools, and upgrading delivery pipelines while protecting business continuity.',
  },
  {
    question: 'What cloud and data services are included?',
    answer:
      'We provide cloud architecture, CI/CD, DevOps, security hardening, observability, data pipelines, and reporting systems to ensure infrastructure reliability and decision-quality data.',
  },
  {
    question: 'Can we engage H.V.A as a long-term partner?',
    answer:
      'Yes. Many clients retain H.V.A as a long-term transformation partner for managed evolution, roadmap expansion, optimization sprints, and ongoing technical leadership.',
  },
  {
    question: 'Do you work with startups and established firms?',
    answer:
      'Yes. We support startups needing rapid AI and automation deployment and established firms undergoing deeper digital transformation, process redesign, and multi-system modernization.',
  },
  {
    question: 'How long do transformation engagements take?',
    answer:
      'Focused AI automation programs can launch in weeks. Broader digital transformation programs — involving modernization, cloud migration, and multi-system integration — run across phased quarters with clear milestones.',
  },
];

// About
export const ABOUT_FAQS: FaqSet = [
  {
    question: 'Who leads H.V.A engagements?',
    answer:
      'H.V.A is founder-led. The same engineering leaders who shape AI strategy, automation architecture, and transformation roadmaps stay involved through delivery, deployment, and long-term maintenance.',
  },
  {
    question: 'What makes H.V.A different from a typical consulting firm or AI agency?',
    answer:
      'We sit at the intersection of three disciplines that are usually siloed: strategic consulting, AI and intelligent automation, and digital transformation engineering. We do not hand off between advisory and delivery layers — the same team owns strategy through production. That end-to-end accountability is what separates us from advice-only consultants and build-only agencies.',
  },
  {
    question: 'What is your partnership style with client teams?',
    answer:
      'We operate as a strategic and technical partner to leadership teams. We co-define AI and transformation priorities, communicate in transparent milestones, and transfer operational clarity across business and engineering stakeholders.',
  },
  {
    question: 'Do you stay involved after the initial build?',
    answer:
      'Yes. We provide stabilization, optimization, and managed evolution so AI systems and digital infrastructure remain reliable and aligned with changing business requirements.',
  },
  {
    question: 'What principles guide your delivery?',
    answer:
      'Outcome accountability, architecture quality, and end-to-end ownership guide every engagement. We prioritize intelligent systems that remain measurable, maintainable, and scalable over time.',
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
    question: 'Can H.V.A sign an NDA before deep discussion?',
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

// Locale Services
export const LOCALE_SERVICES_FAQS: Record<SupportedLocale, FaqSet> = {
  en: SERVICES_FAQS,
  fr: [
    {
      question: 'Comment H.V.A se positionne-t-il sur le marché ?',
      answer:
        "H.V.A est une entreprise d'IA, de transformation digitale et de conseil technologique. Nous combinons agents IA et automatisation intelligente, programmes de transformation digitale, et conseil stratégique — avec une exécution technique intégrée de bout en bout.",
    },
    {
      question: "Quels types d'automatisation IA proposez-vous ?",
      answer:
        "Nous concevons et déployons des agents IA pour les opérations clients (WhatsApp, web, voix), l'automatisation des workflows internes, la qualification de leads, les assistants de reporting, et les tableaux de bord d'intelligence décisionnelle.",
    },
    {
      question: 'Que comprend une mission de transformation digitale chez H.V.A ?',
      answer:
        "Une mission couvre le diagnostic opérationnel, la feuille de route de transformation, les décisions d'architecture, puis le pilotage de l'exécution jusqu'à la mise en production et l'évolution long terme.",
    },
    {
      question: 'H.V.A peut-il livrer puis maintenir les systèmes ?',
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
        "Les conditions commerciales sont définies après discovery, selon le périmètre IA, la complexité technique, les intégrations et l'effort de maintenance.",
    },
  ],
  ar: [
    {
      question: 'كيف تصف H.V.A موقعها في السوق؟',
      answer:
        'H.V.A هي شركة ذكاء اصطناعي وتحول رقمي واستشارات تقنية. نجمع بين وكلاء الذكاء الاصطناعي والأتمتة الذكية، وبرامج التحول الرقمي الشامل، والاستشارات الاستراتيجية — مع تنفيذ تقني متكامل من البداية إلى النهاية.',
    },
    {
      question: 'ما أنواع حلول الذكاء الاصطناعي التي تقدمونها؟',
      answer:
        'نصمم وننشر وكلاء ذكاء اصطناعي للعمليات المواجهة للعملاء (واتساب، ويب، صوت)، وأتمتة سير العمل الداخلي، وتأهيل العملاء المحتملين، ومساعدي التقارير، ولوحات الذكاء التحليلي.',
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
        'يتم تحديد السعر بعد جلسة الاكتشاف بناء على نطاق الذكاء الاصطناعي والتحول، والتعقيد التقني، والتكاملات ومتطلبات الصيانة.',
    },
  ],
  es: [
    {
      question: '¿Cómo se posiciona H.V.A en el mercado?',
      answer:
        'H.V.A es una firma de IA, transformación digital y consultoría tecnológica. Combinamos agentes de IA y automatización inteligente, programas de transformación digital de extremo a extremo, y asesoría estratégica — con ejecución técnica integrada.',
    },
    {
      question: '¿Qué soluciones de automatización e IA ofrecéis?',
      answer:
        'Diseñamos y desplegamos agentes de IA para operaciones comerciales (WhatsApp, web, voz), automatización de flujos internos, calificación de leads, asistentes de reporting e inteligencia operativa para decisiones ejecutivas.',
    },
    {
      question: '¿Qué incluye un programa de transformación digital con H.V.A?',
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
        'La estructura comercial se define después del discovery, según el alcance de IA y transformación, complejidad técnica, integraciones y necesidades de mantenimiento.',
    },
  ],
};
