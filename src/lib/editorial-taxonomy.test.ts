import {describe, expect, it} from 'vitest';

import {
  EDITORIAL_FORMATS,
  EDITORIAL_TOPICS,
  getEditorialTopicImage,
  resolveEditorialFields,
} from './editorial-taxonomy';

describe('editorial taxonomy', () => {
  it('keeps the approved stable format and topic keys', () => {
    expect(EDITORIAL_FORMATS).toEqual([
      'operating-note',
      'evidence-brief',
      'industry-guide',
      'case',
      'founder-view',
    ]);
    expect(EDITORIAL_TOPICS).toHaveLength(5);
  });

  it('maps legacy records without overriding valid CMS values', () => {
    expect(resolveEditorialFields('fix-the-workflow-before-ai')).toMatchObject({
      editorialFormat: 'operating-note',
      topics: ['ai-operational-systems', 'custom-software-automation'],
    });

    expect(
      resolveEditorialFields('fix-the-workflow-before-ai', {
        editorialFormat: 'founder-view',
        topics: ['data-cloud-reliability'],
      }),
    ).toMatchObject({
      editorialFormat: 'founder-view',
      topics: ['data-cloud-reliability'],
    });
  });

  it('ignores unknown CMS values and returns a safe empty taxonomy', () => {
    expect(
      resolveEditorialFields('unknown-record', {
        editorialFormat: 'memo' as never,
        topics: ['unknown-topic' as never],
      }),
    ).toEqual({
      editorialFormat: undefined,
      topics: [],
      directAnswer: undefined,
      evidenceType: undefined,
      primaryCta: undefined,
    });
  });

  it('resolves editorial cover art from the first approved topic', () => {
    expect(
      getEditorialTopicImage([
        'custom-software-automation',
        'data-cloud-reliability',
      ]),
    ).toBe(
      '/Images/insights/editorial/custom-software-automation-2400x1350.webp',
    );
    expect(getEditorialTopicImage(undefined, '/fallback.webp')).toBe(
      '/fallback.webp',
    );
    expect(
      getEditorialTopicImage(
        ['custom-software-automation'],
        'https://cdn.sanity.io/images/project/production/cms-cover.webp',
      ),
    ).toBe('https://cdn.sanity.io/images/project/production/cms-cover.webp');
  });
});
