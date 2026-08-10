import React from 'react';
import {render, screen, within} from '@testing-library/react';
import Portfolio from './Portfolio';
import type {PortfolioCaseStudy} from '@/lib/proof';

vi.mock('@/lib/animationQuality', () => ({
  useAnimationQuality: () => ({
    tier: 'low',
    motionReduced: true,
    plasmaMaxDpr: 0.5,
    plasmaTargetFps: 8,
    splineEnabled: false,
    splineMouseSensitivity: 0.45,
    splineMouseUpdateIntervalMs: 66,
    splineInteractive: false,
  }),
}));

const projects: PortfolioCaseStudy[] = [
  {
    slug: 'real-estate-one',
    title: 'Real estate operating system',
    clientName: 'Client One',
    industry: 'Luxury Real Estate',
    summary: 'A governed real estate operating system.',
    deploymentStatus: 'Live in production',
    assets: {coverImage: '/Images/case-studies/immoworld-crm-transformation-case-study-morocco.webp'},
  },
  {
    slug: 'real-estate-two',
    title: 'Property workflow platform',
    clientName: 'Client Two',
    industry: 'Real Estate Operations',
    summary: 'A second real estate delivery.',
    deploymentStatus: 'Delivered',
    assets: {coverImage: '/Images/case-studies/immoworld-crm-transformation-case-study-morocco.webp'},
  },
  {
    slug: 'education-platform',
    title: 'Digital learning platform',
    clientName: 'Client Three',
    industry: 'Education & Professional Training',
    summary: 'A production learning platform.',
    deploymentStatus: 'Live in production',
    assets: {coverImage: '/Images/case-studies/premium-advice-keepzen-digital-academy.webp'},
  },
];

describe('Portfolio', () => {
  it('renders the supplied case-study catalogue and selects a mixed-industry featured pair', () => {
    const {container} = render(<Portfolio projects={projects} />);
    const featuredRegion = screen.getByLabelText('Featured case studies');

    expect(container.querySelectorAll('[data-portfolio-project]')).toHaveLength(3);
    expect(within(featuredRegion).getByText('Real estate operating system')).toBeInTheDocument();
    expect(within(featuredRegion).getByText('Digital learning platform')).toBeInTheDocument();
    expect(within(featuredRegion).queryByText('Property workflow platform')).not.toBeInTheDocument();
    expect(
      screen.getAllByRole('link', {name: 'Open case study: Property workflow platform'}),
    ).toHaveLength(1);
  });
});
