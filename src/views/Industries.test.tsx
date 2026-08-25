import {INDUSTRY_CARD_CONFIG} from './Industries';

describe('industry card media', () => {
  it('keeps the Real Estate directory card on the approved sector image', () => {
    const realEstate = INDUSTRY_CARD_CONFIG.find((card) => card.id === 'real-estate');

    expect(realEstate).toMatchObject({
      href: '/case-studies/top-tier-crm-transformation-program-real-estate-operations',
      image: '/Images/industries/real-estate-crm-lead-operations-morocco.webp',
    });
    expect(realEstate?.image).not.toContain('cdn.sanity.io');
  });
});
