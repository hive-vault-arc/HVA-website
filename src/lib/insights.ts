export type InsightCard = {
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
  tag: string;
};

export const NEWS_ARTICLES: InsightCard[] = [
  {
    title: 'Operational AI in Morocco: 2026 Field Notes',
    slug: 'operational-ai-morocco-2026-field-notes',
    summary:
      'A practical briefing on how Moroccan teams are moving from pilot AI features to production operating workflows.',
    publishedAt: '2026-03-20',
    tag: 'News Article',
  },
  {
    title: 'Cloud Modernization Budgets Shift Toward Reliability',
    slug: 'cloud-modernization-budgets-shift-toward-reliability',
    summary:
      'Why decision-makers are prioritizing uptime, observability, and release confidence over feature velocity alone.',
    publishedAt: '2026-03-14',
    tag: 'News Article',
  },
  {
    title: 'CRM Transformation Programs Gain Executive Ownership',
    slug: 'crm-transformation-programs-gain-executive-ownership',
    summary:
      'How leadership teams are treating CRM as an operating capability, not a tool implementation project.',
    publishedAt: '2026-03-02',
    tag: 'News Article',
  },
];

export const PERSPECTIVES: InsightCard[] = [
  {
    title: 'Why Consulting and Engineering Must Stay in One Loop',
    slug: 'consulting-and-engineering-one-loop',
    summary:
      'A perspective on why strategy decks fail without a tightly coupled delivery and maintenance model.',
    publishedAt: '2026-03-22',
    tag: 'Perspective',
  },
  {
    title: 'The Hidden Cost of Fragmented Operations',
    slug: 'hidden-cost-fragmented-operations',
    summary:
      'Where execution drift appears when sales, support, and reporting systems evolve without architecture ownership.',
    publishedAt: '2026-03-08',
    tag: 'Perspective',
  },
  {
    title: 'Transformation Velocity Comes From Governance, Not Hype',
    slug: 'transformation-velocity-from-governance',
    summary:
      'How operating cadence, decision rights, and measurable checkpoints accelerate modernization outcomes.',
    publishedAt: '2026-02-25',
    tag: 'Perspective',
  },
];

export const RESEARCH_REPORTS: InsightCard[] = [
  {
    title: 'AI Operations Benchmark: Service Response and Conversion',
    slug: 'ai-operations-benchmark-response-conversion',
    summary:
      'A report covering response latency, qualification quality, and conversion patterns across multilingual AI operations.',
    publishedAt: '2026-03-12',
    tag: 'Research Report',
  },
  {
    title: 'Digital Transformation Execution Patterns in Mid-Market Firms',
    slug: 'digital-transformation-execution-patterns-mid-market',
    summary:
      'A research review of delivery models, failure points, and successful governance loops in mid-market transformation.',
    publishedAt: '2026-02-28',
    tag: 'Research Report',
  },
  {
    title: 'Cloud Reliability Readiness Index 2026',
    slug: 'cloud-reliability-readiness-index-2026',
    summary:
      'An engineering-focused report on deployment posture, incident prevention, and observability maturity.',
    publishedAt: '2026-02-18',
    tag: 'Research Report',
  },
];

export const INSIGHTS_CATEGORIES = [
  { label: 'Blogs', href: '/insights/blogs' },
  { label: 'Case Studies', href: '/insights/case-studies' },
  { label: 'News Articles', href: '/insights/news-articles' },
  { label: 'Perspectives', href: '/insights/perspectives' },
  { label: 'Research Reports', href: '/insights/research-reports' },
] as const;
