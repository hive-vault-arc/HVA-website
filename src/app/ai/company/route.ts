import { NextResponse } from 'next/server';
import { CAPABILITY_DOMAINS, CAPABILITY_SOLUTION_PROGRAM_DETAILS } from '../../../lib/capabilities-content';
import { HVA_LEADERSHIP } from '../../../lib/leadership';
import { getAllPosts } from '../../../lib/blog';
import { getAllNewsArticles, getAllResearchReports } from '../../../lib/insights';
import { getAllPerspectives } from '../../../lib/perspectives';
import { getAllCaseStudies } from '../../../lib/proof';
import {
  absoluteUrl,
  BRAND_ABBREVIATION,
  BRAND_ALIASES,
  BRAND_INITIALISM,
  BRAND_SEARCH_VARIANTS,
  BUSINESS_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_E164,
  SOCIAL_PROFILE_URLS,
  SITE_URL,
} from '../../../lib/seo';

export const revalidate = 86400;

const LAST_UPDATED = '2026-05-24';

const serviceSummaries: Record<string, string> = {
  'strategy-business':
    'Business and digital transformation strategy, operating model design, diagnostics, process redesign, and transformation sequencing.',
  'technology-consulting':
    'Enterprise architecture, technology roadmaps, platform strategy, systems integration, IT modernization, and infrastructure design.',
  'ai-data-analytics':
    'Production AI agents, generative AI engineering, data pipelines, business intelligence, predictive analytics, and AI operations.',
  'software-engineering':
    'Custom software, SaaS platforms, enterprise applications, web and mobile products, APIs, integrations, and DevOps engineering.',
  'cloud-infrastructure':
    'Cloud migration, infrastructure automation, security architecture, observability, resilience, and cloud operations.',
  'operations-managed-services':
    'Managed operations, application maintenance, automation operations, AI system management, support workflows, and shared services.',
};

const importantPages = {
  home: absoluteUrl('/'),
  capabilities: absoluteUrl('/capabilities'),
  capabilitiesInDetail: absoluteUrl('/capabilities/in-detail'),
  solutionPrograms: absoluteUrl('/capabilities/solution-programs'),
  arcFramework: absoluteUrl('/arc'),
  industries: absoluteUrl('/industries'),
  portfolio: absoluteUrl('/whoarewe/portfolio'),
  about: absoluteUrl('/whoweare/abouthva'),
  contact: absoluteUrl('/contact'),
  insights: absoluteUrl('/insights'),
  blog: absoluteUrl('/blog'),
  caseStudies: absoluteUrl('/case-studies'),
  aiAgentsTangier: absoluteUrl('/ai-agents-tangier'),
  aiAgentsMorocco: absoluteUrl('/ai-agents-morocco'),
  itConsultingTangier: absoluteUrl('/it-consulting-tangier'),
  customSoftwareMorocco: absoluteUrl('/custom-software-morocco'),
  digitalServicesTangier: absoluteUrl('/digital-services-tangier'),
  servicesDigitauxTanger: absoluteUrl('/services-digitaux-tanger'),
  llms: absoluteUrl('/llms.txt'),
  llmsFull: absoluteUrl('/llms-full.txt'),
  companyJson: absoluteUrl('/ai/company'),
};

export async function GET() {
  const [caseStudies, posts, newsArticles, perspectives, researchReports] = await Promise.all([
    getAllCaseStudies(),
    getAllPosts(),
    getAllNewsArticles(),
    getAllPerspectives(),
    getAllResearchReports(),
  ]);
  const aliases = Array.from(new Set([BRAND_ABBREVIATION, BRAND_INITIALISM, ...BRAND_ALIASES, ...BRAND_SEARCH_VARIANTS]));

  return NextResponse.json(
    {
      schemaVersion: '1.0',
      lastUpdated: LAST_UPDATED,
      company: {
        name: BUSINESS_NAME,
        legalName: BUSINESS_NAME,
        shortName: BRAND_ABBREVIATION,
        alternateNames: aliases,
        description:
          'Hive Vault Arc is a technology transformation partner based in Tangier, Morocco. The company combines strategy consulting, AI engineering, custom software development, cloud infrastructure, and managed operations in one founder-led delivery team.',
        website: SITE_URL,
        email: CONTACT_EMAIL,
        telephone: CONTACT_PHONE_E164,
        formattedTelephone: CONTACT_PHONE_DISPLAY,
        location: {
          city: 'Tangier',
          region: 'Tanger-Tetouan-Al Hoceima',
          country: 'Morocco',
          countryCode: 'MA',
          coordinates: {
            latitude: 35.7595,
            longitude: -5.834,
          },
          remoteDelivery: true,
        },
        marketsServed: ['Morocco', 'France', 'Europe', 'North Africa', 'MENA', 'Remote delivery worldwide'],
        languages: ['English', 'French', 'Arabic', 'Spanish'],
        founders: HVA_LEADERSHIP.map((member) => ({
          name: member.name,
          slug: member.slug,
          role: member.role,
          schemaJobTitle: member.schemaJobTitle,
          responsibility: member.description,
          image: absoluteUrl(member.image),
          profileUrl: `${absoluteUrl('/whoweare/abouthva')}#${member.slug}`,
          knowsAbout: member.knowsAbout,
        })),
        services: CAPABILITY_DOMAINS.map((domain) => ({
          id: domain.id,
          name: domain.title,
          summary: serviceSummaries[domain.id] ?? domain.strategicContext,
          capabilities: domain.subCapabilities,
          relatedOutcomes: domain.relatedOutcomes,
        })),
        solutionPrograms: CAPABILITY_SOLUTION_PROGRAM_DETAILS.map((program) => ({
          slug: program.slug,
          name: program.name,
          category: program.category,
          summary: program.summary,
          modules: program.modules,
          integrations: program.integrations,
          deliveryModel: program.deliveryModel,
          outcomes: program.outcomes,
          proofLinks: program.proofLinks.map((path) => absoluteUrl(path)),
        })),
        caseStudies: caseStudies.map((study) => ({
          slug: study.slug,
          title: study.title,
          clientName: study.clientName,
          industry: study.industry,
          summary: study.summary,
          status: study.deploymentStatus,
          url: absoluteUrl(`/case-studies/${study.slug}`),
          outcomes: study.measuredOutcomes.map((outcome) => ({
            label: outcome.label,
            value: outcome.value,
            context: outcome.context,
          })),
        })),
        insights: {
          blogPosts: posts.map((post) => ({
            type: 'blog',
            slug: post.slug,
            title: post.title,
            summary: post.excerpt,
            category: post.category,
            publishedAt: post.publishedAt,
            url: absoluteUrl(`/blog/${post.slug}`),
            tags: post.tags,
          })),
          newsArticles: newsArticles.map((article) => ({
            type: 'newsArticle',
            slug: article.slug,
            title: article.title,
            summary: article.summary,
            category: article.category,
            publishedAt: article.publishedAt,
            url: absoluteUrl(`/insights/news-articles/${article.slug}`),
            tags: article.tags,
          })),
          perspectives: perspectives.map((perspective) => ({
            type: 'perspective',
            slug: perspective.slug,
            title: perspective.title,
            summary: perspective.summary,
            publishedAt: perspective.publishedAt,
            url: absoluteUrl(`/insights/perspectives/${perspective.slug}`),
            keywords: perspective.keywords,
          })),
          researchReports: researchReports.map((report) => ({
            type: 'researchReport',
            slug: report.slug,
            title: report.title,
            summary: report.summary,
            publishedAt: report.publishedAt,
            url: absoluteUrl('/insights/research-reports'),
          })),
        },
        industries: [
          'Real Estate & Construction',
          'Healthcare & Life Sciences',
          'Financial Services',
          'Government & Public Sector',
          'Retail & E-Commerce',
          'Energy & Sustainability',
          'Logistics & Transportation',
          'Consumer Goods & Luxury',
        ],
        aiCapabilities: [
          'AI agents',
          'WhatsApp automation',
          'Lead qualification',
          'Customer support triage',
          'CRM workflow automation',
          'Multilingual conversational AI',
          'Data engineering',
          'Business intelligence dashboards',
          'Workflow orchestration',
          'Managed AI operations',
        ],
        socialProfiles: SOCIAL_PROFILE_URLS,
        importantPages,
      },
      crawlResources: {
        robots: absoluteUrl('/robots.txt'),
        sitemap: absoluteUrl('/sitemap.xml'),
        llms: absoluteUrl('/llms.txt'),
        llmsFull: absoluteUrl('/llms-full.txt'),
      },
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    }
  );
}
