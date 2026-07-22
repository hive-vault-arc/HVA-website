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
    deploymentScale: 'Production',
    deploymentStatus: 'Live',
    measuredOutcomes: [],
    hasClientEvidence: false,
    assets: {
      coverImage: '/cover.png',
      logoLabel: 'Sample client',
    },
    lastUpdated: '2026-07-17',
    ...overrides,
  };
}

describe('buildHomeHeroProof', () => {
  it('selects real high-signal metrics and only CMS-backed client logos', () => {
    const result = buildHomeHeroProof([
      study({
        slug: 'immoworld',
        clientName: 'ImmoWorld',
        measuredOutcomes: [
          { label: 'Active Users', value: '94', context: 'Production users' },
          { label: 'Monthly Pipeline Tracked', value: '$2.4M', context: 'CRM pipeline' },
          { label: 'Manual Data Entry', value: '-40%', context: 'Reduction after launch' },
        ],
        assets: {
          coverImage: '/cover.png',
          logoLabel: 'ImmoWorld',
          clientLogo: 'https://cdn.sanity.io/immoworld.png',
          clientLogoAlt: 'ImmoWorld logo',
        },
      }),
      study({
        slug: 'atlas',
        clientName: 'Atlas Property Group',
        measuredOutcomes: [
          { label: 'Manual Triage Reduction', value: '85%', context: 'Lead operations' },
          { label: 'Qualified Meetings Booked', value: '+43%', context: 'Lead operations' },
        ],
      }),
    ]);

    expect(result.metrics).toHaveLength(3);
    expect(result.metrics.map((metric) => metric.value)).toEqual(
      expect.arrayContaining(['$2.4M', '85%', '+43%'])
    );
    expect(result.trustedPartners).toEqual([
      {
        name: 'ImmoWorld',
        logo: 'https://cdn.sanity.io/immoworld.png',
        logoAlt: 'ImmoWorld logo',
        href: '/case-studies/immoworld',
        surface: 'dark',
      },
      {
        name: 'Tarik Rami Immobilier',
        logo: '/Images/trustedby/tarik-rami-immobilier-logo.webp',
        logoAlt: 'Tarik Rami Immobilier logo',
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
          coverImage: '/cover.png',
          logoLabel: 'Premium Advice & Training',
          clientLogo: 'https://cdn.sanity.io/low-resolution-premium-logo.jpg',
        },
      }),
    ]);

    expect(result.trustedPartners[0]).toMatchObject({
      name: 'Premium Advice & Training',
      logo: '/Images/trustedby/premium-advice-training-logo-hq.webp',
      surface: 'light',
    });
  });

  it('falls back to documented aggregate counts when fewer than three numeric outcomes exist', () => {
    const result = buildHomeHeroProof([
      study({
        industry: 'Education',
        measuredOutcomes: [{ label: 'Journey Coverage', value: 'End-to-end', context: 'Scope' }],
      }),
    ]);

    expect(result.metrics).toEqual([
      { value: '1', label: 'Published case studies' },
      { value: '1', label: 'Industries represented' },
      { value: '1', label: 'Measured outcomes documented' },
    ]);
  });
});
