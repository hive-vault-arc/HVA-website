import { describe, expect, it } from 'vitest';
import nextConfig from '../../next.config';

describe('Legacy Redirect Rules', () => {
  it('consolidates the www hostname to the canonical apex domain', async () => {
    const redirects = await (nextConfig.redirects?.() ?? Promise.resolve([]));

    expect(redirects).toEqual(
      expect.arrayContaining([
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'www.hivevaultarc.com',
            },
          ],
          destination: 'https://hivevaultarc.com/:path*',
          permanent: true,
        },
      ])
    );
  });

  it('redirects the indexed Vercel staging hostname to production', async () => {
    const redirects = await (nextConfig.redirects?.() ?? Promise.resolve([]));

    expect(redirects).toEqual(
      expect.arrayContaining([
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'hiva-nine.vercel.app',
            },
          ],
          destination: 'https://hivevaultarc.com/:path*',
          permanent: true,
        },
      ])
    );
  });

  it('contains permanent redirects from legacy URLs to canonical destinations', async () => {
    const redirects = await (nextConfig.redirects?.() ?? Promise.resolve([]));

    expect(redirects).toEqual(
      expect.arrayContaining([
        {
          source: '/insights/blogs',
          destination: '/blog',
          permanent: true,
        },
        {
          source: '/insights/case-studies',
          destination: '/case-studies',
          permanent: true,
        },
        {
          source: '/whoweare/abouthva',
          destination: '/aboutus',
          permanent: true,
        },
        {
          source: '/abouthva/people/:employee',
          destination: '/aboutus/our-people/:employee',
          permanent: true,
        },
        {
          source: '/:locale(en|fr|ar|es)/whoweare/abouthva',
          destination: '/aboutus',
          permanent: true,
        },
        {
          source: '/:locale(en|fr|ar|es)/abouthva/people/:employee',
          destination: '/aboutus/our-people/:employee',
          permanent: true,
        },
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
          source: '/products-systems',
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
          destination: '/capabilities/in-detail',
          permanent: true,
        },
        {
          source: '/:locale(en|fr|ar|es)/services/solution-programs',
          destination: '/capabilities/solution-programs',
          permanent: true,
        },
        {
          source: '/:locale(en|fr|ar|es)/capabilities/in-detail',
          destination: '/capabilities/in-detail',
          permanent: true,
        },
        {
          source: '/:locale(en|fr|ar|es)/capabilities/solution-programs',
          destination: '/capabilities/solution-programs',
          permanent: true,
        },
      ])
    );
  });
});
