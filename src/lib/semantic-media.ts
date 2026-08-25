import type {AppLocale} from '@/i18n/config';

export type SemanticMediaDefinition = {
  desktopSrc: string;
  mobileSrc?: string;
  altKey: string;
  /** English and French are authored with the raster; other locale copy may safely fall back while a CMS alt takes precedence. */
  alt: Pick<Record<AppLocale, string>, 'en' | 'fr'> & Partial<Record<AppLocale, string>>;
  ratio: {
    desktop: '16:9' | '16:10' | '16:7' | '2:1' | '1:1';
    mobile: '16:9' | '16:10' | '4:5' | '1:1';
  };
  fit: {
    desktop: 'cover' | 'contain';
    mobile: 'cover' | 'contain';
  };
  objectPosition: {
    desktop: string;
    mobile: string;
  };
  locked: boolean;
};

function media(definition: SemanticMediaDefinition): SemanticMediaDefinition {
  return definition;
}

export const SEMANTIC_MEDIA = {
  arc: {
    assess: media({
      desktopSrc: '/Images/semantic/arc/assess-r5-desktop.webp',
      mobileSrc: '/Images/semantic/arc/assess-r5-mobile.webp',
      altKey: 'arc.assess',
      alt: {
        en: 'Hands reviewing an application inventory, audit evidence, and a prioritized software backlog on a discovery table',
        fr: 'Mains examinant un inventaire applicatif, des preuves d’audit et un backlog logiciel priorisé sur une table de cadrage',
      },
      ratio: {desktop: '2:1', mobile: '16:10'},
      fit: {desktop: 'cover', mobile: 'cover'},
      objectPosition: {desktop: '50% 50%', mobile: '50% 50%'},
      locked: false,
    }),
    reengineer: media({
      desktopSrc: '/Images/semantic/arc/reengineer-r5-desktop.webp',
      mobileSrc: '/Images/semantic/arc/reengineer-r5-mobile.webp',
      altKey: 'arc.reengineer',
      alt: {
        en: 'Consultant refining web and mobile architecture modules beside integration notes and source-control evidence',
        fr: 'Consultant affinant des modules d’architecture web et mobile près de notes d’intégration et de preuves de gestion de code',
      },
      ratio: {desktop: '2:1', mobile: '16:10'},
      fit: {desktop: 'cover', mobile: 'cover'},
      objectPosition: {desktop: '50% 50%', mobile: '50% 50%'},
      locked: false,
    }),
    command: media({
      desktopSrc: '/Images/semantic/arc/command-r5-desktop.webp',
      mobileSrc: '/Images/semantic/arc/command-r5-mobile.webp',
      altKey: 'arc.command',
      alt: {
        en: 'Software operations station showing service health, release status, incident timing, redundant equipment, and a runbook',
        fr: 'Poste d’opérations logicielles montrant la santé des services, les mises en production, les incidents, la redondance et un runbook',
      },
      ratio: {desktop: '2:1', mobile: '16:10'},
      fit: {desktop: 'cover', mobile: 'cover'},
      objectPosition: {desktop: '50% 50%', mobile: '50% 50%'},
      locked: false,
    }),
  },
  capabilities: {
    strategyBusiness: media({
      desktopSrc: '/Images/semantic/capabilities/strategy-business-r5.webp',
      altKey: 'capabilities.strategyBusiness',
      alt: {
        en: 'Hands organizing an IT application portfolio, roadmap priorities, budget evidence, and delivery decisions',
        fr: 'Mains organisant un portefeuille applicatif IT, les priorités de feuille de route, le budget et les décisions de livraison',
      },
      ratio: {desktop: '16:9', mobile: '16:9'},
      fit: {desktop: 'cover', mobile: 'cover'},
      objectPosition: {desktop: '50% 50%', mobile: '50% 50%'},
      locked: false,
    }),
    technologyConsulting: media({
      desktopSrc: '/Images/semantic/capabilities/technology-consulting-r5.webp',
      altKey: 'capabilities.technologyConsulting',
      alt: {
        en: 'Two male consultants planning software architecture, application layers, prototypes, and system integrations',
        fr: 'Deux consultants planifiant l’architecture logicielle, les couches applicatives, les prototypes et les intégrations',
      },
      ratio: {desktop: '16:9', mobile: '16:9'},
      fit: {desktop: 'cover', mobile: 'cover'},
      objectPosition: {desktop: '50% 50%', mobile: '50% 50%'},
      locked: false,
    }),
    aiData: media({
      desktopSrc: '/Images/semantic/capabilities/ai-data-r5.webp',
      altKey: 'capabilities.aiData',
      alt: {
        en: 'Data-engineering workspace combining model evaluation, pipeline evidence, compute hardware, and a cobalt processing form',
        fr: 'Espace data réunissant évaluation de modèles, preuves de pipelines, matériel de calcul et forme de traitement cobalt',
      },
      ratio: {desktop: '16:9', mobile: '16:9'},
      fit: {desktop: 'cover', mobile: 'cover'},
      objectPosition: {desktop: '50% 50%', mobile: '50% 50%'},
      locked: false,
    }),
    softwareEngineering: media({
      desktopSrc: '/Images/semantic/capabilities/software-engineering-r5.webp',
      altKey: 'capabilities.softwareEngineering',
      alt: {
        en: 'Software developer coding and testing a web and mobile application with separate test devices and component notes',
        fr: 'Développeur codant et testant une application web et mobile avec des appareils de test séparés et des notes de composants',
      },
      ratio: {desktop: '16:9', mobile: '16:9'},
      fit: {desktop: 'cover', mobile: 'cover'},
      objectPosition: {desktop: '50% 50%', mobile: '50% 50%'},
      locked: false,
    }),
    cloudInfrastructure: media({
      desktopSrc: '/Images/semantic/capabilities/cloud-infrastructure-r5.webp',
      altKey: 'capabilities.cloudInfrastructure',
      alt: {
        en: 'Cloud engineering workspace with deployment, infrastructure-as-code, container health, and orderly server depth',
        fr: 'Espace d’ingénierie cloud avec déploiement, infrastructure as code, santé des conteneurs et serveurs ordonnés',
      },
      ratio: {desktop: '16:9', mobile: '16:9'},
      fit: {desktop: 'cover', mobile: 'cover'},
      objectPosition: {desktop: '50% 50%', mobile: '50% 50%'},
      locked: false,
    }),
    operationsManaged: media({
      desktopSrc: '/Images/semantic/capabilities/operations-managed-r5.webp',
      altKey: 'capabilities.operationsManaged',
      alt: {
        en: 'Software operations desk with observability, release handover, incident notes, on-call device, and a working runbook',
        fr: 'Poste d’opérations logicielles avec observabilité, transfert de version, notes d’incident, appareil d’astreinte et runbook',
      },
      ratio: {desktop: '16:9', mobile: '16:9'},
      fit: {desktop: 'cover', mobile: 'cover'},
      objectPosition: {desktop: '50% 50%', mobile: '50% 50%'},
      locked: false,
    }),
  },
  home: {
    strategyTechnology: media({
      desktopSrc: '/Images/semantic/home/strategy-technology-r5-desktop.webp',
      mobileSrc: '/Images/semantic/home/strategy-technology-r5-mobile.webp',
      altKey: 'home.strategyTechnology',
      alt: {
        en: 'Software transformation workspace combining application priorities, roadmap decisions, and target architecture',
        fr: 'Espace de transformation logicielle réunissant priorités applicatives, décisions de feuille de route et architecture cible',
      },
      ratio: {desktop: '2:1', mobile: '16:9'},
      fit: {desktop: 'cover', mobile: 'cover'},
      objectPosition: {desktop: '50% 50%', mobile: '50% 50%'},
      locked: false,
    }),
    aiSoftware: media({
      desktopSrc: '/Images/semantic/home/ai-software-r5-desktop.webp',
      mobileSrc: '/Images/semantic/home/ai-software-r5-mobile.webp',
      altKey: 'home.aiSoftware',
      alt: {
        en: 'Software product workspace with web and mobile app previews, code, testing notes, and developer tools',
        fr: 'Espace de développement logiciel avec aperçus web et mobile, code, notes de test et outils de développement',
      },
      ratio: {desktop: '2:1', mobile: '16:9'},
      fit: {desktop: 'cover', mobile: 'cover'},
      objectPosition: {desktop: '50% 50%', mobile: '50% 50%'},
      locked: false,
    }),
    cloudOperations: media({
      desktopSrc: '/Images/semantic/home/cloud-operations-r5-desktop.webp',
      mobileSrc: '/Images/semantic/home/cloud-operations-r5-mobile.webp',
      altKey: 'home.cloudOperations',
      alt: {
        en: 'Cloud platform workspace with deployment stages, service-health views, a compact server appliance, and an operational runbook',
        fr: 'Espace de plateforme cloud avec étapes de déploiement, vues de santé des services, appareil serveur compact et runbook opérationnel',
      },
      ratio: {desktop: '2:1', mobile: '16:9'},
      fit: {desktop: 'cover', mobile: 'cover'},
      objectPosition: {desktop: '50% 50%', mobile: '50% 50%'},
      locked: false,
    }),
    arcOperatingModel: media({
      desktopSrc: '/Images/home/arc-operating-model-session.webp',
      altKey: 'home.arcOperatingModel',
      alt: {
        en: 'Team hands reviewing a delivery blueprint, notebooks, and technical documents on a navy worktable',
        fr: 'Mains d’équipe examinant un plan de livraison, des carnets et des documents techniques sur une table bleu marine',
      },
      ratio: {desktop: '16:10', mobile: '16:10'},
      fit: {desktop: 'cover', mobile: 'cover'},
      objectPosition: {desktop: '50% 50%', mobile: '50% 50%'},
      locked: true,
    }),
  },
  industries: {
    realEstate: media({
      desktopSrc: '/Images/industries/real-estate-crm-lead-operations-morocco.webp',
      altKey: 'industries.realEstate',
      alt: {
        en: 'Modern residential property development representing real estate operations in Morocco',
        fr: 'Programme résidentiel moderne représentant les opérations immobilières au Maroc',
      },
      ratio: {desktop: '16:7', mobile: '4:5'},
      fit: {desktop: 'cover', mobile: 'cover'},
      objectPosition: {desktop: '50% 52%', mobile: '50% 52%'},
      locked: true,
    }),
    healthcare: media({
      desktopSrc: '/Images/semantic/industries/healthcare-r3-desktop.webp',
      mobileSrc: '/Images/semantic/industries/healthcare-r3-mobile.webp',
      altKey: 'industries.healthcare',
      alt: {
        en: 'Clinical diagnostics workspace with sample handling, secure medical software, authentication, and analyzer equipment',
        fr: 'Espace de diagnostic clinique avec traitement d’échantillons, logiciel médical sécurisé, authentification et analyseur',
      },
      ratio: {desktop: '16:7', mobile: '4:5'},
      fit: {desktop: 'cover', mobile: 'cover'},
      objectPosition: {desktop: '50% 50%', mobile: '50% 50%'},
      locked: false,
    }),
    finance: media({
      desktopSrc: '/Images/semantic/industries/finance-r3-desktop.webp',
      mobileSrc: '/Images/semantic/industries/finance-r3-mobile.webp',
      altKey: 'industries.finance',
      alt: {
        en: 'Secure banking operations desk with transaction workflow, authentication devices, compliance evidence, and deal documents',
        fr: 'Poste bancaire sécurisé avec flux de transactions, dispositifs d’authentification, conformité et dossiers financiers',
      },
      ratio: {desktop: '16:7', mobile: '4:5'},
      fit: {desktop: 'cover', mobile: 'cover'},
      objectPosition: {desktop: '50% 50%', mobile: '50% 50%'},
      locked: false,
    }),
    government: media({
      desktopSrc: '/Images/semantic/industries/government-r3-desktop.webp',
      mobileSrc: '/Images/semantic/industries/government-r3-mobile.webp',
      altKey: 'industries.government',
      alt: {
        en: 'Digital civic service counter with document scanning, queue tools, and a self-service kiosk',
        fr: 'Guichet public numérique avec numérisation de documents, gestion de file et borne libre-service',
      },
      ratio: {desktop: '16:7', mobile: '4:5'},
      fit: {desktop: 'cover', mobile: 'cover'},
      objectPosition: {desktop: '50% 50%', mobile: '50% 50%'},
      locked: false,
    }),
    retail: media({
      desktopSrc: '/Images/semantic/industries/retail-r3-desktop.webp',
      mobileSrc: '/Images/semantic/industries/retail-r3-mobile.webp',
      altKey: 'industries.retail',
      alt: {
        en: 'Retail fulfillment station with inventory software, barcode scanner, packaged orders, labels, and organized stock',
        fr: 'Poste de préparation retail avec logiciel de stock, scanner, commandes emballées, étiquettes et inventaire organisé',
      },
      ratio: {desktop: '16:7', mobile: '4:5'},
      fit: {desktop: 'cover', mobile: 'cover'},
      objectPosition: {desktop: '50% 50%', mobile: '50% 50%'},
      locked: false,
    }),
    energy: media({
      desktopSrc: '/Images/semantic/industries/energy-r3-desktop.webp',
      mobileSrc: '/Images/semantic/industries/energy-r3-mobile.webp',
      altKey: 'industries.energy',
      alt: {
        en: 'Renewable grid operations with protected switchgear, battery storage, solar generation, and monitoring software',
        fr: 'Opérations de réseau renouvelable avec appareillage protégé, stockage batterie, production solaire et logiciel de suivi',
      },
      ratio: {desktop: '16:7', mobile: '4:5'},
      fit: {desktop: 'cover', mobile: 'cover'},
      objectPosition: {desktop: '50% 50%', mobile: '50% 50%'},
      locked: false,
    }),
    logistics: media({
      desktopSrc: '/Images/semantic/industries/logistics-r3-desktop.webp',
      mobileSrc: '/Images/semantic/industries/logistics-r3-mobile.webp',
      altKey: 'industries.logistics',
      alt: {
        en: 'Warehouse-to-port logistics operation with shipment software, scanning gate, pallet movement, and container handling',
        fr: 'Opération logistique de l’entrepôt au port avec logiciel d’expédition, portique de scan, palettes et conteneurs',
      },
      ratio: {desktop: '16:7', mobile: '4:5'},
      fit: {desktop: 'cover', mobile: 'cover'},
      objectPosition: {desktop: '50% 50%', mobile: '50% 50%'},
      locked: false,
    }),
    consumerLuxury: media({
      desktopSrc: '/Images/semantic/industries/consumer-luxury-r3-desktop.webp',
      mobileSrc: '/Images/semantic/industries/consumer-luxury-r3-mobile.webp',
      altKey: 'industries.consumerLuxury',
      alt: {
        en: 'Product quality studio with material samples, precision inspection, packaging, and digital traceability',
        fr: 'Studio de contrôle produit avec échantillons de matériaux, inspection de précision, emballage et traçabilité numérique',
      },
      ratio: {desktop: '16:7', mobile: '4:5'},
      fit: {desktop: 'cover', mobile: 'cover'},
      objectPosition: {desktop: '50% 50%', mobile: '50% 50%'},
      locked: false,
    }),
    method: media({
      desktopSrc: '/Images/semantic/industries/method-r3-desktop.webp',
      mobileSrc: '/Images/semantic/industries/method-r3-mobile.webp',
      altKey: 'industries.method',
      alt: {
        en: 'Cross-industry research table with anonymized evidence, operating samples, concise notes, and a restrained software view',
        fr: 'Table de recherche multisectorielle avec preuves anonymisées, échantillons opérationnels, notes et vue logicielle sobre',
      },
      ratio: {desktop: '2:1', mobile: '16:10'},
      fit: {desktop: 'cover', mobile: 'cover'},
      objectPosition: {desktop: '50% 50%', mobile: '50% 50%'},
      locked: false,
    }),
  },
  programs: {
    cloudReliability: media({
      desktopSrc: '/Images/semantic/programs/cloud-reliability-card.webp',
      mobileSrc: '/Images/semantic/programs/cloud-reliability-mobile.webp',
      altKey: 'programs.cloudReliability',
      alt: {
        en: 'Cloud reliability engineer checking redundant server rows, failover equipment, and availability status',
        fr: 'Ingénieur cloud contrôlant des rangées de serveurs redondantes, le basculement et la disponibilité',
      },
      ratio: {desktop: '16:9', mobile: '16:10'},
      fit: {desktop: 'cover', mobile: 'cover'},
      objectPosition: {desktop: '50% 50%', mobile: '50% 50%'},
      locked: false,
    }),
    cloudReliabilitySquare: media({
      desktopSrc: '/Images/semantic/programs/cloud-reliability-square.webp',
      mobileSrc: '/Images/semantic/programs/cloud-reliability-mobile.webp',
      altKey: 'programs.cloudReliability',
      alt: {
        en: 'Cloud reliability engineer checking redundant server rows, failover equipment, and availability status',
        fr: 'Ingénieur cloud contrôlant des rangées de serveurs redondantes, le basculement et la disponibilité',
      },
      ratio: {desktop: '1:1', mobile: '16:10'},
      fit: {desktop: 'cover', mobile: 'cover'},
      objectPosition: {desktop: '50% 50%', mobile: '50% 50%'},
      locked: false,
    }),
  },
} as const;

export function semanticMediaAlt(
  definition: SemanticMediaDefinition,
  locale: AppLocale,
): string {
  return definition.alt[locale] ?? definition.alt.en;
}
