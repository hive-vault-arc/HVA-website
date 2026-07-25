import React from 'react';
import {render, screen} from '@testing-library/react';
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
    caption: 'A shared view of pipeline and lead status.',
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
    caption: 'Requirements and next steps in one record.',
    disclosure: 'Illustrative interface data.',
    publicationStatus: 'approved',
  },
];

describe('CaseStudyProjectMedia', () => {
  it('renders nothing when a case study has no approved project media', () => {
    const {container} = render(
      <CaseStudyProjectMedia items={[]} label="Project interface" />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('preserves the media sequence, accessible descriptions, captions, and disclosure', () => {
    render(<CaseStudyProjectMedia items={media} label="Project interface" />);

    expect(screen.getByRole('region', {name: 'Project interface'})).toBeInTheDocument();
    expect(screen.getByAltText(media[0].alt)).toHaveAttribute('width', '1600');
    expect(screen.getByAltText(media[1].alt)).toHaveAttribute('height', '1120');
    expect(screen.getByText(media[0].caption!)).toBeInTheDocument();
    expect(screen.getAllByText('Illustrative interface data.')).toHaveLength(1);
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
});
