import {describe, expect, it} from 'vitest';
import {
  CRM_MODERNIZATION_PROGRAM_SLUG,
  DEFAULT_SOLUTION_PROGRAM_MEDIA,
  mediaFromCaseStudyRecord,
} from './solution-program-media';

describe('solution program proof media', () => {
  it('derives href, cover image, and alt text from the same case-study record', () => {
    const proof = {
      slug: 'top-tier-crm-transformation-program-real-estate-operations',
      title: 'ImmoWorld CRM Operating System',
      assets: {
        coverImage: 'https://cdn.sanity.io/immoworld-crm-cover.webp',
        coverAlt: 'ImmoWorld real estate projects and operations dashboard',
      },
    };

    const media = mediaFromCaseStudyRecord(
      proof,
      DEFAULT_SOLUTION_PROGRAM_MEDIA[CRM_MODERNIZATION_PROGRAM_SLUG],
    );

    expect(media).toMatchObject({
      proofHref: `/case-studies/${proof.slug}`,
      cardImage: proof.assets.coverImage,
      stageImage: proof.assets.coverImage,
      mobileImage: proof.assets.coverImage,
      alt: proof.assets.coverAlt,
    });
  });
});
