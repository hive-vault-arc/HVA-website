import {afterEach, describe, expect, it} from 'vitest';
import robots from './robots';

const originalPolicy = process.env.AI_TRAINING_CRAWL_POLICY;

afterEach(() => {
  if (originalPolicy === undefined) delete process.env.AI_TRAINING_CRAWL_POLICY;
  else process.env.AI_TRAINING_CRAWL_POLICY = originalPolicy;
});

describe('crawler policy', () => {
  it('allows search retrieval while denying model training by default', () => {
    delete process.env.AI_TRAINING_CRAWL_POLICY;
    const result = robots();

    expect(result.sitemap).toBe('https://hivevaultarc.com/sitemap.xml');
    expect(result.rules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userAgent: expect.arrayContaining(['Googlebot', 'OAI-SearchBot', 'ChatGPT-User']),
          allow: expect.arrayContaining(['/']),
        }),
        {
          userAgent: ['GPTBot', 'ClaudeBot', 'Google-Extended'],
          disallow: '/',
        },
      ]),
    );
  });

  it('allows training crawlers only after an explicit company setting', () => {
    process.env.AI_TRAINING_CRAWL_POLICY = 'allow';
    const result = robots();

    expect(result.rules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userAgent: ['GPTBot', 'ClaudeBot', 'Google-Extended'],
          allow: expect.arrayContaining(['/']),
        }),
      ]),
    );
  });
});
