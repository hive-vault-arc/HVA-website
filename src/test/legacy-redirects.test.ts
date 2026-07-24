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
          source: '/fr/whoweare/abouthva',
          destination: '/fr/qui-sommes-nous',
          permanent: true,
        },
        {
          source: '/fr/abouthva/people/:employee',
          destination: '/fr/qui-sommes-nous/equipe/:employee',
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
          source: '/fr/services',
          destination: '/fr/expertises',
          permanent: true,
        },
        {
          source: '/fr/services/in-detail',
          destination: '/fr/expertises/en-detail',
          permanent: true,
        },
        {
          source: '/fr/services/solution-programs',
          destination: '/fr/expertises/programmes-solutions',
          permanent: true,
        },
        {
          source: '/fr/capabilities/in-detail',
          destination: '/fr/expertises/en-detail',
          permanent: true,
        },
        {
          source: '/fr/capabilities/solution-programs',
          destination: '/fr/expertises/programmes-solutions',
          permanent: true,
        },
        {
          source: '/fr/capabilities/:slug',
          destination: '/fr/expertises/:slug',
          permanent: true,
        },
        {
          source: '/en/:path*',
          destination: '/:path*',
          permanent: true,
        },
        {
          source: '/services-digitaux-tanger',
          destination: '/fr/services-digitaux-tanger',
          permanent: true,
        },
      ])
    );
  });
});
