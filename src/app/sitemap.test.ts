import {describe, expect, it, vi} from 'vitest';
import {PUBLIC_LOCALES} from '@/i18n/config';
import {ROUTE_MANIFEST} from '@/i18n/route-manifest';

vi.mock('@/lib/blog', () => ({getAllPosts: vi.fn().mockResolvedValue([])}));
vi.mock('@/lib/capabilities', () => ({getAllCapabilityProfiles: vi.fn().mockResolvedValue([])}));
vi.mock('@/lib/proof', () => ({
  getAllCaseStudies: vi.fn().mockResolvedValue([
    {
      slug: 'private-demonstration',
      seo: {noIndex: true},
    },
  ]),
}));
vi.mock('@/lib/employee-profiles', () => ({getAllEmployeeProfiles: vi.fn().mockResolvedValue([])}));
vi.mock('@/lib/insights', () => ({
  getAllNewsArticles: vi.fn().mockResolvedValue([]),
  getAllResearchReports: vi.fn().mockResolvedValue([]),
}));
vi.mock('@/lib/perspectives', () => ({getAllPerspectives: vi.fn().mockResolvedValue([])}));

import sitemap from './sitemap';

describe('sitemap authority and inventory', () => {
  it('emits stable canonical static entries and excludes utility resources', async () => {
    const first = await sitemap();
    const second = await sitemap();
    const expectedCount =
      Object.values(ROUTE_MANIFEST).filter((route) => route.indexable).length *
      PUBLIC_LOCALES.length;

    expect(first).toHaveLength(expectedCount);
    expect(first).toEqual(second);
    expect(new Set(first.map((entry) => entry.url)).size).toBe(first.length);
    expect(first.every((entry) => new URL(entry.url).origin === 'https://hivevaultarc.com')).toBe(true);
    expect(first.some((entry) => entry.url.endsWith('/ai/company'))).toBe(false);
    expect(first.some((entry) => entry.url.endsWith('/links'))).toBe(false);
    expect(first.some((entry) => entry.url.includes('private-demonstration'))).toBe(false);
    expect(first.every((entry) => entry.lastModified === undefined)).toBe(true);

    for (const entry of first) {
      const languages = entry.alternates?.languages ?? {};
      expect(Object.values(languages).every((url) =>
        new URL(String(url)).origin === 'https://hivevaultarc.com',
      )).toBe(true);
    }
  });
});
