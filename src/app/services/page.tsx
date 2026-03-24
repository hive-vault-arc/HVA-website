import type { Metadata } from 'next';
import Services from '../../views/Services';
import JsonLd from '../../components/JsonLd';
import { GLOBAL_KEYWORDS, buildPageMetadata, mergeKeywords } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'AI Receptionist, Automation, SaaS & Cloud Services in Morocco',
  description:
    'Explore H.V.A service lines: AI receptionist systems, AI analyst reporting, workflow automation, custom software platforms, and cloud reliability engineering.',
  path: '/services',
  keywords: mergeKeywords(GLOBAL_KEYWORDS, [
    'AI receptionist implementation for businesses',
    'AI analyst dashboards for executives',
    'custom CRM development and migration',
    'ERP and CRM integration services',
    'workflow automation for operations teams',
    'devops and CI/CD setup for product teams',
    'cloud migration and deployment partner',
    'mobile app development for companies',
    'web app development for internal operations',
    'migration from legacy systems to modern cloud',
    'service company for app deployment Morocco',
    'team to automate sales and support workflows',
    'services IA pour entreprise au Maroc',
    'migration CRM et intégration API Maroc',
    'développement application web et mobile entreprise Maroc',
    'خدمات استقبال ذكي وتحليل أعمال بالذكاء الاصطناعي',
    'ترحيل CRM وتكامل الأنظمة في المغرب',
    'desarrollo de software empresarial y automatizacion marruecos',
    'migracion de sistemas legacy a cloud en marruecos',
  ]),
  alternates: {
    en: '/en/services',
    fr: '/fr/services',
    ar: '/ar/services',
    es: '/es/services',
    'x-default': '/en/services',
  },
});

export default function Page() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI, Automation, Software and Cloud Services',
    provider: {
      '@type': 'ProfessionalService',
      name: 'Hive Vault Arc',
      areaServed: ['Tangier', 'Morocco'],
    },
    areaServed: ['Tangier', 'Morocco'],
    serviceType: [
      'AI Receptionist Systems',
      'AI Analyst Reporting',
      'Workflow Automation',
      'Custom SaaS Engineering',
      'Cloud Infrastructure',
      'CI/CD and DevOps',
    ],
    availableLanguage: ['en', 'fr', 'ar', 'es'],
    keywords: mergeKeywords(GLOBAL_KEYWORDS, [
      'AI receptionist systems',
      'AI analyst and decision intelligence',
      'custom platform development',
      'cloud reliability engineering',
    ]),
    url: 'https://www.hiva.ma/services',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.hiva.ma/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://www.hiva.ma/services',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is an AI agent and how can it help my business in Tangier?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An AI agent is an autonomous software system that can handle tasks like answering customer calls, qualifying leads, generating reports, and automating workflows — without human intervention. In Tangier, H.V.A builds custom AI agents for reception, sales support, and business analytics, helping local businesses operate 24/7 and scale without proportional headcount growth.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does H.V.A build AI agents in Tangier, Morocco?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. H.V.A (Hive Vault Arc) is an AI agent development agency based in Tangier, Morocco. We design and deploy AI receptionist systems, AI analyst tools, and workflow automation agents for Moroccan businesses and international clients. We operate in Arabic, French, Spanish, and English.',
        },
      },
      {
        '@type': 'Question',
        name: 'What types of AI agents does H.V.A build?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'H.V.A builds three core types of AI agents: (1) AI Receptionists — voice and chat agents that handle inbound calls, WhatsApp messages, and appointment bookings; (2) AI Analysts — agents that pull business data, generate dashboards, and surface insights for decision-makers; (3) Workflow Automation Agents — systems that automate sales pipelines, support queues, and internal operations using tools like Zapier, Make, and custom APIs.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does it cost to build an AI agent in Morocco?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The cost of building an AI agent in Morocco depends on complexity, integrations, and scale. H.V.A offers fixed-scope projects starting from discovery and design through to full deployment. Contact us for a scoped estimate specific to your use case.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can H.V.A build a WhatsApp AI chatbot for my business in Morocco?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. H.V.A builds WhatsApp AI chatbots that handle customer inquiries, bookings, and support in Arabic, French, Spanish, and English — fully integrated with the WhatsApp Business API. These are used by businesses in Tangier and across Morocco to automate customer communication.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between an AI agent and a chatbot?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A chatbot follows fixed scripts and decision trees. An AI agent uses large language models (LLMs) and tool integrations to reason, plan, and take actions — like booking appointments, updating CRM records, or generating reports — based on context. H.V.A builds AI agents, not simple chatbots.',
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema, faqSchema]} />
      <Services />
    </>
  );
}

