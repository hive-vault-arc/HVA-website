import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/seo';

const crawlAllowPaths = ['/', '/llms.txt', '/llms-full.txt', '/ai/company'];
const crawlDisallowPaths = ['/links', '/admin/', '/api/private/'];

const searchAndAiCrawlerAgents = [
  // Search engines and AI search/indexing crawlers.
  'Googlebot',
  'Bingbot',
  'OAI-SearchBot',
  'Claude-SearchBot',
  'PerplexityBot',
  'Applebot',
  // User-triggered AI retrieval.
  'ChatGPT-User',
  'Claude-User',
  'Perplexity-User',
  // Training and AI-use crawlers intentionally allowed for public pages.
  'GPTBot',
  'ClaudeBot',
  'anthropic-ai',
  'Google-Extended',
  // Social and chat preview crawlers.
  'facebookexternalhit',
  'FacebookBot',
  'Twitterbot',
  'LinkedInBot',
  'Slackbot',
  'Discordbot',
  'WhatsApp',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: crawlAllowPaths, disallow: crawlDisallowPaths },
      {
        userAgent: searchAndAiCrawlerAgents,
        allow: crawlAllowPaths,
        disallow: crawlDisallowPaths,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
