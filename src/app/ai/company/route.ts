import { NextResponse } from 'next/server';
import { CAPABILITY_SOLUTION_PROGRAM_DETAILS } from '../../../lib/capabilities-content';
import { getAllPosts } from '../../../lib/blog';
import { getAllCapabilityProfiles } from '../../../lib/capabilities';
import { getAllEmployeeProfiles } from '../../../lib/employee-profiles';
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

const LAST_UPDATED = '2026-07-09';

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
  const [
    caseStudies,
    posts,
    capabilityProfiles,
    newsArticles,
    perspectives,
    researchReports,
    employeeProfiles,
  ] = await Promise.all([
    getAllCaseStudies(),
    getAllPosts(),
    getAllCapabilityProfiles(),
    getAllNewsArticles(),
    getAllPerspectives(),
    getAllResearchReports(),
    getAllEmployeeProfiles(),
  ]);
  const aliases = Array.from(new Set([BRAND_ABBREVIATION, BRAND_INITIALISM, ...BRAND_ALIASES, ...BRAND_SEARCH_VARIANTS]));
  const founderProfiles = employeeProfiles.filter((member) => member.profileType === 'coFounder');
  const people = employeeProfiles.map((member) => ({
    name: member.name,
    slug: member.slug,
    role: member.position,
    profileType: member.profileType,
    responsibility: member.summary,
    image: absoluteUrl(member.profileImage),
    profileUrl: absoluteUrl(`/abouthva/people/${member.slug}`),
    linkedinUrl: member.linkedinUrl,
    knowsAbout: member.expertise,
  }));

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
        founders: founderProfiles.map((member) => ({
          name: member.name,
          slug: member.slug,
          role: member.position,
          schemaJobTitle: member.position,
          profileType: member.profileType,
          responsibility: member.summary,
          image: absoluteUrl(member.profileImage),
          profileUrl: absoluteUrl(`/abouthva/people/${member.slug}`),
          linkedinUrl: member.linkedinUrl,
          knowsAbout: member.expertise,
        })),
        people,
        services: capabilityProfiles.map((capability) => ({
          id: capability.slug,
          name: capability.title,
          shortName: capability.shortTitle,
          summary: capability.briefLine,
          strategicContext: capability.strategicContext,
          executionContext: capability.executionContext,
          capabilities: capability.subCapabilities,
          relatedOutcomes: capability.relatedOutcomes,
          url: absoluteUrl(`/capabilities/${capability.slug}`),
          image: absoluteUrl(capability.heroImage),
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
