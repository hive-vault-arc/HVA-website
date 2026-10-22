import {describe, expect, it} from 'vitest';
import type {CapabilityProfile} from '@/lib/capabilities';
import {getStudioServiceEntries, studioServiceHref} from './studio-services';
import en from '../../messages/en.json';
import es from '../../messages/es.json';
import ar from '../../messages/ar.json';

const localized = {es, ar};

describe('studio services', () => {
  it.each(['es', 'ar'] as const)('keeps all six visible services when %s CMS profiles are absent', (locale) => {
    const summaries = localized[locale].CapabilitiesDetail.pillars.items;
    const services = getStudioServiceEntries(locale, [], summaries);
    expect(services).toHaveLength(6);
    expect(services.every((service) => service.title && service.description && !service.detailAvailable)).toBe(true);
    expect(new Set(services.map((service) => service.slug)).size).toBe(6);
    expect(new Set(services.map((service) => service.description)).size).toBe(6);
    expect(services.every((service) => service.description === summaries.find((item) => item.id === service.slug)?.briefLine && service.bullets.length > 0)).toBe(true);
    expect(services.map(studioServiceHref)).toEqual(services.map(service => `/capabilities#service-${service.slug}`));
  });

  it('uses an approved CMS profile when it exists', () => {
    const profile = {
      slug: 'strategy-business',
      title: 'Approved strategy title',
      briefLine: 'Approved strategy summary',
      briefBullets: ['Approved deliverable'],
    } as CapabilityProfile;
    const [service] = getStudioServiceEntries('en', [profile], en.CapabilitiesDetail.pillars.items);
    expect(service).toMatchObject({
      title: profile.title,
      description: profile.briefLine,
      bullets: profile.briefBullets,
      detailAvailable: true,
    });
  });

  it.each([
    {locale: 'es' as const, slug: 'estrategia-negocio'},
    {locale: 'ar' as const, slug: 'استراتيجية-الا-عمال'},
  ])('links the %s published profile by its localized slug', ({locale, slug}) => {
    const profile = {
      language: locale,
      slug,
      title: 'Localized strategy title',
      briefLine: 'Localized strategy summary',
      briefBullets: ['Localized deliverable'],
      translationTargets: [{language: 'en', translationStatus: 'approved', slug: 'strategy-business'}],
    } as CapabilityProfile;
    const [service] = getStudioServiceEntries(locale, [profile], localized[locale].CapabilitiesDetail.pillars.items);
    expect(service).toMatchObject({
      slug: 'strategy-business',
      detailSlug: slug,
      title: profile.title,
      detailAvailable: true,
    });
    expect(studioServiceHref(service)).toBe(`/capabilities/${slug}`);
  });
});
