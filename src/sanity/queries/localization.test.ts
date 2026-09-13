import {describe, expect, it} from 'vitest';
import {
  allCaseStudiesQuery,
  allNewsArticlesQuery,
  allPerspectivesQuery,
  allPostsQuery,
  allResearchReportsQuery,
  caseStudyBySlugQuery,
  newsArticleBySlugQuery,
  perspectiveBySlugQuery,
  postBySlugQuery,
  researchReportBySlugQuery,
} from './insights';
import {
  allCapabilityProfilesQuery,
  capabilityProfileBySlugQuery,
  featuredCapabilityProfilesQuery,
} from './capabilities';
import {
  allEmployeeProfilesQuery,
  employeeProfileBySlugQuery,
  featuredEmployeeProfilesQuery,
} from './people';

const localizedQueries = [
  allPostsQuery,
  postBySlugQuery,
  allNewsArticlesQuery,
  newsArticleBySlugQuery,
  allPerspectivesQuery,
  perspectiveBySlugQuery,
  allResearchReportsQuery,
  researchReportBySlugQuery,
  allCaseStudiesQuery,
  caseStudyBySlugQuery,
  allCapabilityProfilesQuery,
  featuredCapabilityProfilesQuery,
  capabilityProfileBySlugQuery,
  allEmployeeProfilesQuery,
  featuredEmployeeProfilesQuery,
  employeeProfileBySlugQuery,
];

describe('public localized GROQ queries', () => {
  it.each(localizedQueries)('filters by locale and approval status', (query) => {
    const source = String(query);
    expect(source).toContain('language == $locale');
    expect(source).toContain('translationStatus == "approved"');
    expect(source).toContain('$preview == true');
  });

  it.each([
    postBySlugQuery,
    newsArticleBySlugQuery,
    perspectiveBySlugQuery,
    researchReportBySlugQuery,
    caseStudyBySlugQuery,
    capabilityProfileBySlugQuery,
    employeeProfileBySlugQuery,
  ])('scopes detail lookup to the localized slug', (query) => {
    expect(String(query)).toContain('slug.current == $slug');
  });

  it.each([
    caseStudyBySlugQuery,
    capabilityProfileBySlugQuery,
    employeeProfileBySlugQuery,
  ])('filters the completed translation-target array after dereferencing it', (query) => {
    const source = String(query);
    expect(source).toContain('"translationTargets": (*[');
    expect(source).toContain(
      '})[translationStatus == "approved" && noIndex != true]'
    );
  });

  it('keeps project media publication-gated and detail-only', () => {
    const detailQuery = String(caseStudyBySlugQuery);

    expect(detailQuery).toContain('"projectMedia"');
    expect(detailQuery).toContain('publicationStatus == "approved"');
    expect(detailQuery).toContain('defined(permissionConfirmedOn)');
    expect(detailQuery).toContain('length(permissionReference) > 0');
    expect(detailQuery).toContain('metadata.dimensions.width');
    expect(detailQuery).toContain('metadata.dimensions.height');
    expect(String(allCaseStudiesQuery)).not.toContain('"projectMedia"');
  });
});
