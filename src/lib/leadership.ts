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
    tag: 'Strategy · AI · Software Engineering',
    role: 'Founder & CEO',
    frenchRole: 'Fondateur & PDG',
    schemaJobTitle: 'Founder & CEO',
    image: '/Images/team/khalid-chalhi-hva-co-founder.webp',
    description:
      'Founder & CEO of Hive Vault Arc, leading strategy, AI engineering, and software execution for H.V.A transformation programs.',
    frenchDescription:
      'Fondateur et PDG de Hive Vault Arc, responsable de la stratégie, de l\'ingénierie IA et de l\'exécution logicielle des programmes H.V.A.',
    knowsAbout: ['Strategy Consulting', 'AI Engineering', 'Software Engineering', 'Technology Transformation'],
  },
  {
    slug: 'ali-amrani',
    name: 'Ali Amrani',
    tag: 'Product · Systems · Full-Stack',
    role: 'Co-Founder & Full-Stack Engineer',
    frenchRole: 'Co-fondateur & Ingénieur Full-Stack',
    schemaJobTitle: 'Co-Founder & Full-Stack Engineer',
    image: '/Images/team/ali-amrani-hva-co-founder.webp',
    description:
      'Co-Founder of Hive Vault Arc, leading product systems, full-stack engineering, and delivery architecture for H.V.A.',
    frenchDescription:
      'Co-fondateur de Hive Vault Arc, responsable des systèmes produit, de l\'ingénierie full-stack et de l\'architecture de livraison H.V.A.',
    knowsAbout: ['Full-Stack Engineering', 'Product Systems', 'Software Architecture', 'Technology Delivery'],
  },
  {
    slug: 'oubay-ghamat',
    name: 'Oubay Ghamat',
    tag: 'Cloud · Infrastructure · Operations',
    role: 'Co-Founder & Cloud Engineer',
    frenchRole: 'Co-fondateur & Ingénieur Cloud',
    schemaJobTitle: 'Co-Founder & Cloud Engineer',
    image: '/Images/team/oubay-ghamat-hva-co-founder.webp',
    description:
      'Co-Founder of Hive Vault Arc, leading cloud infrastructure, operations, and production reliability for H.V.A systems.',
    frenchDescription:
      'Co-fondateur de Hive Vault Arc, responsable de l\'infrastructure cloud, des opérations et de la fiabilité en production des systèmes H.V.A.',
    knowsAbout: ['Cloud Infrastructure', 'Managed Operations', 'Production Reliability', 'DevOps'],
  },
];

export const HVA_CEO_ANSWER =
  'Khalid Chalhi is Founder & CEO of Hive Vault Arc (H.V.A). H.V.A is led by its three co-founders: Khalid Chalhi, Ali Amrani, and Oubay Ghamat.';

export const HVA_CEO_ANSWER_FR =
  'Khalid Chalhi est le fondateur et PDG de Hive Vault Arc (H.V.A). H.V.A est dirigée par ses trois co-fondateurs : Khalid Chalhi, Ali Amrani et Oubay Ghamat.';

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
