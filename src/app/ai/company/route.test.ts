import {describe, expect, it, vi} from 'vitest';

vi.mock('../../../lib/blog', () => ({getAllPosts: vi.fn().mockResolvedValue([])}));
vi.mock('../../../lib/capabilities', () => ({
  getAllCapabilityProfiles: vi.fn().mockResolvedValue([]),
}));
vi.mock('../../../lib/employee-profiles', () => ({
  getAllEmployeeProfiles: vi.fn().mockResolvedValue([]),
}));
vi.mock('../../../lib/insights', () => ({
  getAllNewsArticles: vi.fn().mockResolvedValue([]),
  getAllResearchReports: vi.fn().mockResolvedValue([]),
}));
vi.mock('../../../lib/perspectives', () => ({
  getAllPerspectives: vi.fn().mockResolvedValue([]),
}));
vi.mock('../../../lib/proof', () => ({
  getAllCaseStudies: vi.fn().mockResolvedValue([]),
}));

import {COMPANY_ENTITY_FACTS} from '../../../lib/entity-facts';
import {GET} from './route';

describe('/ai/company', () => {
  it('uses canonical company facts and never emits a preview hostname', async () => {
    const response = await GET();
    const body = await response.json();
    const serialized = JSON.stringify(body);

    expect(response.headers.get('cache-control')).toBe(
      'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    );
    expect(body).toMatchObject({
      schemaVersion: '2.0',
      canonicalResource: 'https://hivevaultarc.com/ai/company',
      company: {
        name: COMPANY_ENTITY_FACTS.publicBrandName,
        website: COMPANY_ENTITY_FACTS.canonicalWebsite,
        email: COMPANY_ENTITY_FACTS.publicEmail,
        telephone: COMPANY_ENTITY_FACTS.publicPhoneE164,
        languages: COMPANY_ENTITY_FACTS.supportedLanguages,
        marketsServed: COMPANY_ENTITY_FACTS.marketsServed,
      },
      governance: {
        entityFactReviewStatus: COMPANY_ENTITY_FACTS.review.status,
      },
    });
    expect(serialized).not.toContain('hive-vault-arc-website.vercel.app');
    expect(serialized).not.toContain('hiva-nine.vercel.app');
  });
});
