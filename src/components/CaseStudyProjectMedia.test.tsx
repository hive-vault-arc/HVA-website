import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import CaseStudyProjectMedia from './CaseStudyProjectMedia';
import type {CaseStudyProjectMedia as ProjectMedia} from '@/lib/proof';

const media: ProjectMedia[] = [
  {
    _key: 'dashboard',
    image: 'https://cdn.sanity.io/images/0zprc9fo/production/dashboard.webp',
    width: 1600,
    height: 970,
    deviceType: 'desktop',
    placement: 'afterArchitecture',
    evidenceType: 'fixtureBacked',
    alt: 'CRM dashboard with lead and opportunity funnels.',
    disclosure: 'Illustrative interface data.',
    publicationStatus: 'approved',
  },
  {
    _key: 'lead',
    image: 'https://cdn.sanity.io/images/0zprc9fo/production/lead.webp',
    width: 600,
    height: 1120,
    deviceType: 'phone',
    placement: 'afterArchitecture',
    evidenceType: 'conceptualInterface',
    alt: 'Mobile lead profile with qualification and ownership.',
    disclosure: 'Illustrative interface data.',
    publicationStatus: 'approved',
  },
];

const additionalMedia: ProjectMedia[] = [
  {
    ...media[0],
    _key: 'dashboard-detail',
    image: 'https://cdn.sanity.io/images/0zprc9fo/production/dashboard-detail.webp',
    alt: 'CRM dashboard with the detailed pipeline view.',
  },
  {
    ...media[1],
    _key: 'lead-follow-up',
    image: 'https://cdn.sanity.io/images/0zprc9fo/production/lead-follow-up.webp',
    alt: 'Mobile follow-up workflow with a scheduled visit.',
  },
];

describe('CaseStudyProjectMedia', () => {
  it('renders nothing when a case study has no approved project media', () => {
    const {container} = render(
      <CaseStudyProjectMedia items={[]} label="Project interface" />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('preserves the media sequence and accessible descriptions without captions', () => {
    render(<CaseStudyProjectMedia items={media} label="Project interface" />);

    expect(screen.getByRole('region', {name: 'Project interface'})).toBeInTheDocument();
    expect(screen.getByAltText(media[0].alt)).toHaveAttribute('width', '1600');
    expect(screen.getByAltText(media[1].alt)).toHaveAttribute('height', '1120');
    expect(screen.queryByText('A shared view of pipeline and lead status.')).not.toBeInTheDocument();
    expect(screen.queryByText('Illustrative interface data.')).not.toBeInTheDocument();
  });

  it('keeps author order when device types are interleaved', () => {
    render(
      <CaseStudyProjectMedia
        items={[media[1], media[0]]}
        label="Project interface"
      />,
    );

    expect(
      screen.getAllByRole('img').map((image) => image.getAttribute('alt')),
    ).toEqual([media[1].alt, media[0].alt]);
  });

  it('labels only the device groups that are present', () => {
    render(
      <CaseStudyProjectMedia
        items={[media[0]]}
        label="Project interface"
        mediaLabels={{
          desktop: {eyebrow: '01 / DESKTOP PROOF', title: 'Desktop workflow'},
          phone: {eyebrow: '02 / MOBILE PROOF', title: 'Mobile workflow'},
        }}
      />,
    );

    expect(screen.getByRole('heading', {name: 'Desktop workflow'})).toBeInTheDocument();
    expect(screen.queryByRole('heading', {name: 'Mobile workflow'})).not.toBeInTheDocument();
  });

  it('shows independent controls only for device groups with multiple screens', () => {
    render(
      <CaseStudyProjectMedia
        items={[media[0], additionalMedia[0], media[1]]}
        label="Project interface"
        mediaLabels={{
          desktop: {
            eyebrow: '01 / DESKTOP PROOF',
            title: 'Desktop workflow',
            previousLabel: 'Previous desktop screen',
            nextLabel: 'Next desktop screen',
          },
          phone: {
            eyebrow: '02 / MOBILE PROOF',
            title: 'Mobile workflow',
            previousLabel: 'Previous mobile screen',
            nextLabel: 'Next mobile screen',
          },
        }}
      />,
    );

    const desktopNext = screen.getByRole('button', {
      name: 'Next desktop screen',
    });
    expect(desktopNext).toBeInTheDocument();
    expect(
      screen.queryByRole('button', {name: 'Next mobile screen'}),
    ).not.toBeInTheDocument();

    fireEvent.click(desktopNext);
    expect(screen.getByAltText(additionalMedia[0].alt)).toBeInTheDocument();
    expect(screen.getByText('02 / 02')).toBeInTheDocument();
  });
});
