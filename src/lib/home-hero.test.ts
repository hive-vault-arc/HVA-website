import { describe, expect, it } from 'vitest';

import { buildHomeHeroProof } from './home-hero';
import type { CaseStudy } from './proof';

function study(overrides: Partial<CaseStudy>): CaseStudy {
  return {
    slug: 'sample',
    title: 'Sample case study',
    clientName: 'Sample client',
    industry: 'Technology',
    summary: 'Summary',
    problem: 'Problem',
    systemArchitecture: 'Architecture',
    operationalModules: [],
    integrations: [],
    deploymentStatus: 'Live',
    projectMedia: [],
    hasClientEvidence: false,
    assets: {
      coverImage: '/cover.webp',
      logoLabel: 'Sample client',
    },
    lastUpdated: '2026-07-17',
    ...overrides,
  };
}

describe('buildHomeHeroProof', () => {
  it('returns only CMS-backed client logos and the independent partner logo', () => {
    const result = buildHomeHeroProof([
      study({
        slug: 'immoworld',
        clientName: 'ImmoWorld',
        assets: {
          coverImage: '/cover.webp',
          logoLabel: 'ImmoWorld',
          clientLogo: 'https://cdn.sanity.io/immoworld.webp',
          clientLogoAlt: 'ImmoWorld logo',
        },
      }),
      study({
        slug: 'atlas',
        clientName: 'Atlas Property Group',
      }),
    ]);

    expect(result.trustedPartners).toEqual([
      {
        name: 'ImmoWorld',
        logo: 'https://cdn.sanity.io/immoworld.webp',
        logoAlt: 'ImmoWorld logo',
        href: '/case-studies/immoworld',
        surface: 'dark',
      },
      {
        name: 'Tarik Rami Immobilier',
        logo: '/Images/trustedby/tarik-rami-immobilier-logo.webp',
        logoAlt: 'Tarik Rami Immobilier logo',
        href: '/case-studies/tarik-rami-immobilier',
        surface: 'light',
      },
    ]);
  });

  it('uses the Trusted By logo for the CMS-backed Tarik Rami case study', () => {
    const result = buildHomeHeroProof([
      study({
        slug: 'tarik-rami-immobilier',
        clientName: 'Tarik Rami Immobilier',
        assets: {
          coverImage: '/cover.webp',
          logoLabel: 'Tarik Rami Immobilier',
          clientLogo: 'https://cdn.sanity.io/tarik-rami-logo.webp',
          clientLogoAlt: 'Tarik Rami Immobilier logo',
        },
      }),
    ]);

    expect(result.trustedPartners).toEqual([
      {
        name: 'Tarik Rami Immobilier',
        logo: '/Images/trustedby/tarik-rami-immobilier-logo.webp',
        logoAlt: 'Tarik Rami Immobilier logo',
        href: '/case-studies/tarik-rami-immobilier',
        surface: 'light',
      },
    ]);
  });

  it('uses the high-resolution local Premium Advice logo in the trusted bar', () => {
    const result = buildHomeHeroProof([
      study({
        slug: 'premium-advice-training',
        clientName: 'Premium Advice & Training',
        assets: {
          coverImage: '/cover.webp',
          logoLabel: 'Premium Advice & Training',
          clientLogo: 'https://cdn.sanity.io/low-resolution-premium-logo.webp',
        },
      }),
    ]);

    expect(result.trustedPartners[0]).toMatchObject({
      name: 'Premium Advice & Training',
      logo: '/Images/trustedby/premium-advice-training-logo-hq.webp',
      surface: 'light',
    });
  });

  it('keeps ImmoWorld in the middle regardless of the CMS order', () => {
    const result = buildHomeHeroProof([
      study({
        slug: 'tarik-rami-immobilier',
        clientName: 'Tarik Rami Immobilier',
        assets: {
          coverImage: '/tarik.webp',
          logoLabel: 'Tarik Rami Immobilier',
          clientLogo: 'https://cdn.sanity.io/tarik.webp',
        },
      }),
      study({
        slug: 'premium-advice-training',
        clientName: 'Premium Advice & Training',
        assets: {
          coverImage: '/premium.webp',
          logoLabel: 'Premium Advice & Training',
          clientLogo: 'https://cdn.sanity.io/premium.webp',
        },
      }),
      study({
        slug: 'immoworld',
        clientName: 'ImmoWorld',
        assets: {
          coverImage: '/immoworld.webp',
          logoLabel: 'ImmoWorld',
          clientLogo: 'https://cdn.sanity.io/immoworld.webp',
        },
      }),
    ]);

    expect(result.trustedPartners.map((partner) => partner.name)).toEqual([
      'Premium Advice & Training',
      'ImmoWorld',
      'Tarik Rami Immobilier',
    ]);
  });

  it('deduplicates repeated client records', () => {
    const repeatedClient = study({
      slug: 'premium-advice-second-record',
      clientName: 'Premium Advice & Training',
      assets: {
        coverImage: '/cover.webp',
        logoLabel: 'Premium Advice & Training',
        clientLogo: 'https://cdn.sanity.io/premium-logo.webp',
      },
    });

    const result = buildHomeHeroProof([
      repeatedClient,
      { ...repeatedClient, slug: 'premium-advice-third-record' },
    ]);

    expect(result.trustedPartners.filter((partner) => partner.name === 'Premium Advice & Training')).toHaveLength(1);
  });

  it('keeps fallback partner links on their canonical source locale', () => {
    const result = buildHomeHeroProof(
      [
        study({
          slug: 'immoworld',
          clientName: 'ImmoWorld',
          assets: {
            coverImage: '/cover.webp',
            logoLabel: 'ImmoWorld',
            clientLogo: 'https://cdn.sanity.io/immoworld.webp',
          },
        }),
      ],
      'en',
    );

    expect(result.trustedPartners[0]).toMatchObject({
      href: '/case-studies/immoworld',
      hrefLocale: 'en',
    });
    expect(result.trustedPartners[1]).toMatchObject({
      href: '/case-studies/tarik-rami-immobilier',
      hrefLocale: 'en',
    });
  });
});
