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
      'Oubaye El Ghammat Ghori',
    ]);
    expect(profiles.map((profile) => profile.position)).toEqual([
      'Co-Founder & CEO',
      'Co-Founder & CTO',
      'Co-Founder & COO',
    ]);
    expect(profiles[1]?.profileImage).toBe('/Images/team/ali-amrani-founder-2026.webp');
    expect(profiles.every((profile) => profile.profileImage.endsWith('.webp'))).toBe(true);
  });

  it('localizes the founder fallback for the French About page', async () => {
    const profiles = await getFeaturedEmployeeProfiles('fr');

    expect(profiles.map((profile) => profile.position)).toEqual([
      'Cofondateur et CEO',
      'Cofondateur et CTO',
      'Cofondateur et COO',
    ]);
    expect(profiles[0]?.responsibilityTag).toContain('Strategy');
  });

  it('keeps individual founder pages available during a CMS timeout', async () => {
    const profile = await getEmployeeProfileBySlug('ali-amrani', 'en');

    expect(profile?.name).toBe('Ali Amrani');
    expect(profile?.position).toBe('Co-Founder & CTO');
    expect(profile?.profileImage).toBe('/Images/team/ali-amrani-founder-2026.webp');
    expect(profile?.experience).toHaveLength(3);
    expect(profile?.education[0]?.institution).toBe(
      "Ecole Marocaine des Sciences de l'Ingenieur",
    );
    expect(profile?.operatingPrinciple).toBe(
      'A technical decision is useful only when the team can operate it.',
    );
  });
});
