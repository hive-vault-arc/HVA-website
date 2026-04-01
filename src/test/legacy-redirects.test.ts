import { describe, expect, it } from 'vitest';
import nextConfig from '../../next.config';

describe('Legacy Services Redirect Rules', () => {
  it('contains permanent redirects from legacy services URLs to capabilities URLs', async () => {
    const redirects = await (nextConfig.redirects?.() ?? Promise.resolve([]));

    expect(redirects).toEqual(
      expect.arrayContaining([
        {
          source: '/services',
          destination: '/capabilities',
          permanent: true,
        },
        {
          source: '/services/in-detail',
          destination: '/capabilities/in-detail',
          permanent: true,
        },
        {
          source: '/services/solution-programs',
          destination: '/capabilities/solution-programs',
          permanent: true,
        },
        {
          source: '/:locale(en|fr|ar|es)/services',
          destination: '/:locale/capabilities',
          permanent: true,
        },
        {
          source: '/:locale(en|fr|ar|es)/services/in-detail',
          destination: '/:locale/capabilities/in-detail',
          permanent: true,
        },
        {
          source: '/:locale(en|fr|ar|es)/services/solution-programs',
          destination: '/:locale/capabilities/solution-programs',
          permanent: true,
        },
      ])
    );
  });
});
