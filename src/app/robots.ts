import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // OpenAI / ChatGPT
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      // Perplexity
      { userAgent: 'PerplexityBot', allow: '/' },
      // Anthropic / Claude
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      // Google Gemini + AI Overviews
      { userAgent: 'Google-Extended', allow: '/' },
      // Microsoft Copilot (Bing)
      { userAgent: 'Bingbot', allow: '/' },
      // Meta AI
      { userAgent: 'FacebookBot', allow: '/' },
      // Apple
      { userAgent: 'Applebot', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
