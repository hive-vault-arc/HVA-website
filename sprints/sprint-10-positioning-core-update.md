# Sprint 10 — Positioning Core Update

> **Priority:** CRITICAL — All brand language across the site flows from this file. Must be done before Sprints 11–16.
> **Estimated effort:** 1–2 hours
> **Blocking:** Sprints 11, 13, 14, 15 all pull from `CANONICAL_MARKET_IDENTITY` and locale messaging.

---

## What This Sprint Is

H.V.A has repositioned from "AI-powered digital transformation and technology consulting firm" to **"technology transformation partner"** — a firm that combines Strategy, AI Engineering, Software, and Managed Operations across the full lifecycle.

The old headline (`AI & Automation · Digital Transformation · Technology Consulting`) and shortDescriptor are no longer accurate. The new positioning emphasizes:
- Full-lifecycle delivery (advise, build, operate) — not just consulting or AI
- Technology transformation partner — not agency, not consulting firm alone
- The ARC model: Assess → Re-engineer → Command

This sprint updates `src/lib/positioning.ts` across all 4 locales (en, fr, ar, es), restructures the `CapabilityCluster` type to match the 6 service pillars, and updates `MESSAGING_RULES`.

---

## Tasks

### Task 10.1 — Update the `CapabilityCluster` type

**File:** `src/lib/positioning.ts`

The current `CapabilityCluster` type has 4 keys that no longer map to H.V.A's 6 service pillars. Replace the type definition:

Find:
```typescript
export type CapabilityCluster = {
  strategyConsulting: string[];
  aiAutomation: string[];
  customEngineering: string[];
  modernizationCloudData: string[];
};
```

Replace with:
```typescript
export type CapabilityCluster = {
  strategyBusiness: string[];
  technologyConsulting: string[];
  aiDataAnalytics: string[];
  softwareEngineering: string[];
  cloudInfrastructure: string[];
  operationsManaged: string[];
};
```

---

### Task 10.2 — Update the English (`en`) locale

**File:** `src/lib/positioning.ts`

Find:
```typescript
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
```

Replace with:
```typescript
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
```

---

### Task 10.3 — Update the French (`fr`) locale

**File:** `src/lib/positioning.ts`

Find:
```typescript
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
```

Replace with:
```typescript
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
```

---

### Task 10.4 — Update the Arabic (`ar`) locale

**File:** `src/lib/positioning.ts`

Find:
```typescript
  ar: {
    identity: {
      headline: 'الذكاء الاصطناعي والأتمتة · التحول الرقمي · الاستشارات التقنية',
      shortDescriptor:
        'Hive Vault Arc ‏(H.V.A) هي شركة متخصصة في الذكاء الاصطناعي، التحول الرقمي، والاستشارات التقنية.',
      longDescriptor:
        'Hive Vault Arc ‏(H.V.A) هي شركة متخصصة في الذكاء الاصطناعي، التحول الرقمي، والاستشارات التقنية. نصمم وننشر وكلاء ذكاء اصطناعي وأتمتة ذكية، نطور برمجيات مخصصة وأنظمة متكاملة، نقود برامج التحول الرقمي الشاملة، ونبني البنية السحابية والبيانية — بمنهجية استشارية في كل مرحلة.',
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
```

Replace with:
```typescript
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
```

---

### Task 10.5 — Update the Spanish (`es`) locale

**File:** `src/lib/positioning.ts`

Find:
```typescript
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
```

Replace with:
```typescript
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
```

---

### Task 10.6 — Update `MESSAGING_RULES`

**File:** `src/lib/positioning.ts`

Find:
```typescript
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
```

Replace with:
```typescript
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
```

---

### Task 10.7 — Verify TypeScript compilation

After all replacements, run:

```bash
npx tsc --noEmit
```

Fix any type errors caused by components still referencing the old `CapabilityCluster` keys (`strategyConsulting`, `aiAutomation`, `customEngineering`, `modernizationCloudData`). Search for all usages:

```bash
grep -r "strategyConsulting\|aiAutomation\|customEngineering\|modernizationCloudData" src/
```

Update any component that destructures or reads the old keys to use the new keys (`strategyBusiness`, `technologyConsulting`, `aiDataAnalytics`, `softwareEngineering`, `cloudInfrastructure`, `operationsManaged`).

---

## Acceptance Criteria

- [ ] `CANONICAL_MARKET_IDENTITY.headline` is `'Technology Transformation Partner · Strategy · AI Engineering · Operations'`
- [ ] `CANONICAL_MARKET_IDENTITY.shortDescriptor` references "technology transformation partner"
- [ ] All 4 locales (en, fr, ar, es) updated with new identity and capabilities
- [ ] `CapabilityCluster` type has 6 keys matching the 6 service pillars
- [ ] `MESSAGING_RULES.allowedSearchIntentPhrases` includes "technology transformation partner Morocco"
- [ ] `npx tsc --noEmit` passes with zero errors
- [ ] `npm run build` completes without errors

---

## Exit Criteria

- [ ] `grep -r "AI-powered digital transformation" src/` returns zero results
- [ ] `grep -r "AI & Automation · Digital Transformation" src/` returns zero results
- [ ] `grep -r "strategyConsulting\|aiAutomation\|customEngineering\|modernizationCloudData" src/` returns zero results (all old keys gone)
- [ ] Build passes locally
