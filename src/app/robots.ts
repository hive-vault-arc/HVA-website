import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/seo';

const crawlAllowPaths = ['/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: crawlAllowPaths },
      // OpenAI / ChatGPT
      { userAgent: 'GPTBot', allow: crawlAllowPaths },
      { userAgent: 'OAI-SearchBot', allow: crawlAllowPaths },
      { userAgent: 'ChatGPT-User', allow: crawlAllowPaths },
      // Perplexity
      { userAgent: 'PerplexityBot', allow: crawlAllowPaths },
      // Anthropic / Claude
      { userAgent: 'ClaudeBot', allow: crawlAllowPaths },
      { userAgent: 'anthropic-ai', allow: crawlAllowPaths },
      // Google Gemini + AI Overviews
      { userAgent: 'Google-Extended', allow: crawlAllowPaths },
      // Microsoft Copilot (Bing)
      { userAgent: 'Bingbot', allow: crawlAllowPaths },
      // Meta AI
      { userAgent: 'FacebookBot', allow: crawlAllowPaths },
      // Apple
      { userAgent: 'Applebot', allow: crawlAllowPaths },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
