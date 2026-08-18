import {describe, expect, it} from 'vitest';

import {
  newsArticleBySlugQuery,
  paginatedInsightCollectionQuery,
  paginatedInsightsQuery,
  perspectiveBySlugQuery,
  postBySlugQuery,
  researchReportBySlugQuery,
} from './insights';

describe('editorial Sanity projections', () => {
  it.each([
    postBySlugQuery,
    newsArticleBySlugQuery,
    perspectiveBySlugQuery,
    researchReportBySlugQuery,
    paginatedInsightsQuery,
    paginatedInsightCollectionQuery,
  ])('projects optional editorial fields without changing document predicates', (query) => {
    expect(query).toContain('editorialFormat');
    expect(query).toContain('directAnswer');
    expect(query).toContain('methodology');
    expect(query).toContain('limitations');
    expect(query).toContain('primaryCta');
  });
});
