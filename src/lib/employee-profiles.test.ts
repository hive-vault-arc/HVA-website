import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

vi.mock('../sanity/lib/fetch', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../sanity/lib/fetch')>();
  return {
    ...actual,
    sanityFetch: vi.fn(),
  };
});

import {sanityFetch} from '../sanity/lib/fetch';
import {
  getEmployeeProfileBySlug,
  getFeaturedEmployeeProfiles,
} from './employee-profiles';

describe('employee profile resilience', () => {
  beforeEach(() => {
    vi.mocked(sanityFetch).mockRejectedValue({
      code: 'ESOCKETTIMEDOUT',
      message: 'Socket timed out on request',
    });
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('keeps all featured founders on the About page during a CMS timeout', async () => {
    const profiles = await getFeaturedEmployeeProfiles('en');

    expect(profiles.map((profile) => profile.name)).toEqual([
      'Khalid Chalhi',
      'Ali Amrani',
      'Oubay Ghamat',
    ]);
    expect(profiles.every((profile) => profile.profileImage.endsWith('.webp'))).toBe(true);
  });

  it('localizes the founder fallback for the French About page', async () => {
    const profiles = await getFeaturedEmployeeProfiles('fr');

    expect(profiles[0]?.position).toBe('Cofondateur et CEO');
    expect(profiles[0]?.responsibilityTag).toContain('Stratégie');
  });

  it('keeps individual founder pages available during a CMS timeout', async () => {
    const profile = await getEmployeeProfileBySlug('ali-amrani', 'en');

    expect(profile?.name).toBe('Ali Amrani');
    expect(profile?.profileImage).toBe('/Images/team/ali-amrani-founder-2026.webp');
  });
});
