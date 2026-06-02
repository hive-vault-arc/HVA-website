export type LeadershipMember = {
  slug: string;
  name: string;
  tag: string;
  role: string;
  frenchRole: string;
  schemaJobTitle: string;
  image: string;
  description: string;
  frenchDescription: string;
  knowsAbout: string[];
};

export const HVA_LEADERSHIP: LeadershipMember[] = [
  {
    slug: 'khalid-chalhi',
    name: 'Khalid Chalhi',
    tag: 'Responsible for Strategy · AI · Software Engineering',
    role: 'Co-Founder & CEO',
    frenchRole: 'Co-fondateur & CEO',
    schemaJobTitle: 'Co-Founder & CEO',
    image: '/Images/team/khalid-chalhi-hva-co-founder.webp',
    description:
      'Co-Founder & CEO of Hive Vault Arc, responsible for strategy, AI engineering, and software execution for Hive Vault Arc transformation programs.',
    frenchDescription:
      'Co-fondateur & CEO de Hive Vault Arc, responsable de la stratégie, de l\'ingénierie IA et de l\'exécution logicielle des programmes Hive Vault Arc.',
    knowsAbout: ['Strategy Consulting', 'AI Engineering', 'Software Engineering', 'Technology Transformation'],
  },
  {
    slug: 'ali-amrani',
    name: 'Ali Amrani',
    tag: 'Responsible for Product · Systems · Full-Stack',
    role: 'Co-Founder & CEO',
    frenchRole: 'Co-fondateur & CEO',
    schemaJobTitle: 'Co-Founder & CEO',
    image: '/Images/team/ali-amrani-hva-co-founder-portrait.jpeg',
    description:
      'Co-Founder & CEO of Hive Vault Arc, responsible for product systems, full-stack engineering, and delivery architecture for Hive Vault Arc.',
    frenchDescription:
      'Co-fondateur & CEO de Hive Vault Arc, responsable des systèmes produit, de l\'ingénierie full-stack et de l\'architecture de livraison Hive Vault Arc.',
    knowsAbout: ['Full-Stack Engineering', 'Product Systems', 'Software Architecture', 'Technology Delivery'],
  },
  {
    slug: 'oubay-ghamat',
    name: 'Oubay Ghamat',
    tag: 'Responsible for Cloud · Infrastructure · Operations',
    role: 'Co-Founder & CEO',
    frenchRole: 'Co-fondateur & CEO',
    schemaJobTitle: 'Co-Founder & CEO',
    image: '/Images/team/oubay-ghamat-hva-co-founder.webp',
    description:
      'Co-Founder & CEO of Hive Vault Arc, responsible for cloud infrastructure, operations, and production reliability for Hive Vault Arc systems.',
    frenchDescription:
      'Co-fondateur & CEO de Hive Vault Arc, responsable de l\'infrastructure cloud, des opérations et de la fiabilité en production des systèmes Hive Vault Arc.',
    knowsAbout: ['Cloud Infrastructure', 'Managed Operations', 'Production Reliability', 'DevOps'],
  },
];

export const HVA_CEO_ANSWER =
  'Hive Vault Arc is led by three Co-Founders & CEOs: Khalid Chalhi, Ali Amrani, and Oubay Ghamat. Each founder owns a distinct responsibility area across strategy, product/software, and cloud operations.';

export const HVA_CEO_ANSWER_FR =
  'Hive Vault Arc est dirigée par trois co-fondateurs & CEOs : Khalid Chalhi, Ali Amrani et Oubay Ghamat. Chaque fondateur possède un périmètre de responsabilité distinct entre stratégie, produit/logiciel et opérations cloud.';

export const HVA_LEADERSHIP_SEARCH_KEYWORDS = [
  'CEO of HVA',
  'CEO of Hive Vault Arc',
  'Hive Vault Arc CEO',
  'HVA founders',
  'Hive Vault Arc founders',
  'founder-led leadership team HVA',
  'PDG de HVA',
  'PDG Hive Vault Arc',
  'fondateurs HVA',
  'fondateurs Hive Vault Arc',
  'direction Hive Vault Arc',
  'équipe dirigeante HVA',
];
