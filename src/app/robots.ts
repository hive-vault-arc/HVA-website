import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/seo';

const crawlAllowPaths = ['/', '/llms.txt', '/llms-full.txt', '/ai/company'];
const crawlDisallowPaths = ['/admin/', '/api/private/'];

const searchAndRetrievalCrawlerAgents = [
  'Googlebot',
  'Bingbot',
  'OAI-SearchBot',
  'Claude-SearchBot',
  'PerplexityBot',
  'Applebot',
  'ChatGPT-User',
  'Claude-User',
  'Perplexity-User',
];

const trainingCrawlerAgents = [
  'GPTBot',
  'ClaudeBot',
  'Google-Extended',
];

const previewCrawlerAgents = [
  'facebookexternalhit',
  'FacebookBot',
  'Twitterbot',
  'LinkedInBot',
  'Slackbot',
  'Discordbot',
  'WhatsApp',
];

export default function robots(): MetadataRoute.Robots {
  const allowTrainingCrawlers = process.env.AI_TRAINING_CRAWL_POLICY === 'allow';

  return {
    rules: [
      { userAgent: '*', allow: crawlAllowPaths, disallow: crawlDisallowPaths },
      {
        userAgent: searchAndRetrievalCrawlerAgents,
        allow: crawlAllowPaths,
        disallow: crawlDisallowPaths,
      },
      {
        userAgent: previewCrawlerAgents,
        allow: crawlAllowPaths,
        disallow: crawlDisallowPaths,
      },
      allowTrainingCrawlers
        ? {
            userAgent: trainingCrawlerAgents,
            allow: crawlAllowPaths,
            disallow: crawlDisallowPaths,
          }
        : {
            userAgent: trainingCrawlerAgents,
            disallow: '/',
          },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
