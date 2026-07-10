import type { ContentSection } from './blog';
import {
  getAllSanityNewsArticles,
  getAllSanityResearchReports,
  getSanityNewsArticleBySlug,
  getSanityResearchReportBySlug,
} from './sanity-content';
import { withSanityFallback } from '../sanity/lib/fetch';
import type { ContentSeo } from './content-seo';

export type InsightCard = {
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
  tag: string;
  readTime?: string;
  coverImage?: string;
  coverAlt?: string;
  seo?: ContentSeo;
};

export type NewsArticle = InsightCard & {
  subtitle: string;
  category: string;
  sources: { label: string; url: string }[];
  tags: string[];
  sections: ContentSection[];
};

export type ResearchReport = InsightCard & {
  subtitle?: string;
  authors: { name: string; role: string; initials: string }[];
  keywords: string[];
  sources: { label: string; url: string }[];
  sections: ContentSection[];
};

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    title: 'NVIDIA RTX Spark: The Local AI Superchip That Could Change Private Agents',
    slug: 'nvidia-rtx-spark-local-ai-superchip-private-agents',
    subtitle:
      'NVIDIA and Microsoft are moving the AI PC conversation from light assistants to serious on-device agents, with unified memory, CUDA, and Windows-native security controls at the center.',
    category: 'AI Hardware',
    summary:
      'A news analysis of NVIDIA RTX Spark, the new Windows superchip platform built for local AI agents, local LLMs, and private on-device workflows.',
    publishedAt: '2026-06-04',
    readTime: '7 min read',
    tag: 'News Article',
    coverImage: '/Images/news-articles/nvidia-rtx-spark-local-ai-superchip.webp',
    coverAlt:
      'Minimalist editorial illustration of a unified AI superchip with local agent nodes and warm circuit traces.',
    tags: [
      'NVIDIA RTX Spark',
      'local AI agents',
      'local LLMs',
      'private AI',
      'unified memory',
      'AI PCs',
    ],
    sources: [
      {
        label: 'NVIDIA Newsroom - NVIDIA and Microsoft Reinvent Windows PCs for the Age of Personal AI',
        url: 'https://nvidianews.nvidia.com/news/nvidia-microsoft-windows-pcs-agents-rtx-spark',
      },
      {
        label: 'NVIDIA RTX Spark Product Page',
        url: 'https://www.nvidia.com/en-us/products/rtx-spark/',
      },
      {
        label: 'Microsoft Windows Experience Blog - RTX Spark on Windows PCs',
        url: 'https://blogs.windows.com/windowsexperience/2026/05/31/introducing-a-powerful-new-chapter-for-windows-pcs-accelerated-by-nvidia-rtx-spark/',
      },
      {
        label: 'Microsoft Windows Blog - Surface RTX Spark Dev Box',
        url: 'https://blogs.windows.com/blog/2026/06/02/building-the-next-generation-of-devices-for-developers-surface-rtx-spark-dev-box/',
      },
      {
        label: "Tom's Hardware - RTX Spark Superchip at Computex 2026",
        url: 'https://www.tomshardware.com/laptops/nvidia-unveils-rtx-spark-superchip-at-computex-2026-new-platform-promises-to-turn-windows-into-an-agentic-ai-os-with-arm-cpu-blackwell-gpu-and-128gb-unified-memory',
      },
    ],
    sections: [
      {
        type: 'paragraph',
        content:
          'NVIDIA has introduced RTX Spark, a new superchip platform for Windows laptops and compact desktops aimed at what the company calls the age of personal AI. Some coverage refers to the silicon family as N1 or N1X, but the public platform name NVIDIA is using is RTX Spark.',
      },
      {
        type: 'paragraph',
        content:
          'The important shift is not that another fast chip exists. It is that NVIDIA is putting an Arm CPU, Blackwell RTX GPU, fifth-generation Tensor Cores, CUDA support, and a large unified memory pool into one personal-computing platform. That combination is aimed directly at local agents, local LLMs, creators, developers, and users who want more AI work to happen on their own machine instead of inside a remote cloud session.',
      },
      {
        type: 'stat-block',
        stats: [
          { value: '1 PFLOP', label: 'Up to FP4 AI performance', source: 'NVIDIA' },
          { value: '128GB', label: 'Up to unified memory', source: 'NVIDIA / Microsoft' },
          { value: '6,144', label: 'Up to Blackwell RTX CUDA cores', source: 'NVIDIA' },
          { value: '20-core', label: 'NVIDIA Grace CPU design', source: 'NVIDIA / Microsoft' },
        ],
      },
      {
        type: 'heading',
        content: 'What Was Announced',
      },
      {
        type: 'paragraph',
        content:
          'NVIDIA and Microsoft announced RTX Spark at the end of May 2026, with RTX Spark-powered Windows laptops and small desktop PCs expected from Microsoft Surface, ASUS, Dell, HP, Lenovo, MSI, and later Acer and GIGABYTE. The platform is designed for thin-and-light devices and compact developer systems, not only large workstation towers.',
      },
      {
        type: 'paragraph',
        content:
          'NVIDIA says the platform can run demanding local workloads, including 120-billion-parameter LLMs with long agent context, advanced creative pipelines, local AI video generation, and GPU-accelerated development stacks. Microsoft is also tuning Windows for RTX Spark with scheduler work, unified-memory support, Windows ML, TensorRT integration, Prism emulation improvements, and security primitives for agent containment.',
      },
      {
        type: 'heading',
        content: 'Why Unified Memory Matters',
      },
      {
        type: 'paragraph',
        content:
          'The bottleneck for local AI is often not raw compute alone. It is memory. A powerful consumer GPU may be fast, but if the model does not fit into available VRAM, the experience becomes constrained, slow, or impossible. Unified memory changes the operating model because CPU, GPU, and AI workloads can draw from a larger shared pool.',
      },
      {
        type: 'paragraph',
        content:
          'That matters for local LLMs because bigger models, longer context windows, local document search, coding agents, multimodal workflows, and persistent tool-using agents all consume memory quickly. RTX Spark does not remove every constraint, but it moves the ceiling high enough that serious local AI work becomes practical on a personal device.',
      },
      {
        type: 'pullquote',
        content:
          'The game changer is not simply more performance. It is local AI headroom: enough memory and acceleration for agents to reason over private context without sending every task to the cloud.',
        attribution: 'Hive Vault Arc analysis',
      },
      {
        type: 'heading',
        content: 'Why This Is Important for Private Local Agents',
      },
      {
        type: 'paragraph',
        content:
          'Most people use cloud LLMs because they are powerful, convenient, and always available. The tradeoff is that sensitive prompts, files, customer records, financial plans, legal drafts, medical notes, or strategy documents may leave the local device depending on the product and configuration. For many teams, that is the core trust issue.',
      },
      {
        type: 'paragraph',
        content:
          'A local-first agent architecture changes the risk profile. The model can run on-device. Embeddings can be created locally. A vector database can live on the machine or private network. The agent can inspect local files under explicit permissions. Conversations can remain offline by default, with cloud escalation treated as an intentional exception rather than the normal path.',
      },
      {
        type: 'list',
        items: [
          'Private conversations: local chats with sensitive business context do not need to round-trip to an external model provider for every answer.',
          'Local retrieval: documents, contracts, project notes, and codebases can be indexed and searched on the user device.',
          'Long-running agents: coding, research, analysis, and operations agents can work with more context and fewer memory failures.',
          'Lower experimentation cost: developers can test model variants and agent workflows without paying for every token during early prototyping.',
          'Better enterprise control: IT teams can combine local execution with policy, containment, encryption, and explicit cloud-fallback rules.',
        ],
      },
      {
        type: 'heading',
        content: 'Local Does Not Automatically Mean Safe',
      },
      {
        type: 'paragraph',
        content:
          'The privacy story still depends on implementation. A machine with RTX Spark can run local models, but an application may still send prompts, telemetry, files, or tool outputs to cloud services. Agent permissions can also become dangerous if they are too broad. Local AI reduces exposure only when the software stack is designed around local execution, transparent permissions, and controlled data flow.',
      },
      {
        type: 'paragraph',
        content:
          'This is why Microsoft and NVIDIA are emphasizing agent containment, identity, policy, and user control alongside hardware performance. The next competitive frontier is not only how fast an agent can think, but what it is allowed to touch, what it is allowed to send outside the device, and how clearly the user can see that boundary.',
      },
      {
        type: 'heading',
        content: 'What Hive Vault Arc Is Watching',
      },
      {
        type: 'paragraph',
        content:
          'For Hive Vault Arc, RTX Spark is interesting because it supports the same direction we see in serious AI transformation work: local-first where privacy matters, cloud where scale or frontier capability is required, and a governance layer that decides which path is appropriate for each task.',
      },
      {
        type: 'paragraph',
        content:
          'If the platform ships with strong thermals, reliable developer tooling, broad app support, and accessible pricing, RTX Spark could make private AI agents much more realistic for founders, consultants, developers, lawyers, clinics, finance teams, and operators who want AI help without exposing every conversation to a third-party system.',
      },
      {
        type: 'paragraph',
        content:
          'The practical takeaway is clear: the local AI era is no longer only a hobbyist workstation story. It is moving into everyday PCs. The firms that prepare now - with local model strategy, data governance, agent permissions, and secure workflow design - will be better positioned when this hardware becomes available in the fall.',
      },
    ],
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

const FALLBACK_RESEARCH_REPORTS: ResearchReport[] = RESEARCH_REPORTS.map((report) => ({
  ...report,
  subtitle: report.summary,
  authors: [],
  keywords: [],
  sources: [],
  sections: [{ type: 'paragraph', content: report.summary }],
}));

export const INSIGHTS_CATEGORIES = [
  { label: 'Blogs', href: '/blog' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'News Articles', href: '/insights/news-articles' },
  { label: 'Perspectives', href: '/insights/perspectives' },
  { label: 'Research Reports', href: '/insights/research-reports' },
] as const;

export function getAllNewsArticles(): Promise<NewsArticle[]> {
  return withSanityFallback(getAllSanityNewsArticles, () => NEWS_ARTICLES, 'news article');
}

export function getNewsArticleBySlug(slug: string): Promise<NewsArticle | null> {
  return withSanityFallback(
    () => getSanityNewsArticleBySlug(slug),
    () => NEWS_ARTICLES.find((article) => article.slug === slug) ?? null,
    'news article'
  );
}

export async function getRelatedNewsArticles(currentSlug: string, limit = 3): Promise<NewsArticle[]> {
  const articles = await getAllNewsArticles();
  return articles.filter((article) => article.slug !== currentSlug).slice(0, limit);
}

export function getAllResearchReports(): Promise<ResearchReport[]> {
  return withSanityFallback(
    getAllSanityResearchReports,
    () => FALLBACK_RESEARCH_REPORTS,
    'research report'
  );
}

export function getResearchReportBySlug(slug: string): Promise<ResearchReport | null> {
  return withSanityFallback(
    () => getSanityResearchReportBySlug(slug),
    () => FALLBACK_RESEARCH_REPORTS.find((report) => report.slug === slug) ?? null,
    'research report'
  );
}

export async function getRelatedResearchReports(currentSlug: string, limit = 3): Promise<ResearchReport[]> {
  const reports = await getAllResearchReports();
  return reports.filter((report) => report.slug !== currentSlug).slice(0, limit);
}
