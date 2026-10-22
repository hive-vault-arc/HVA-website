import type {AppLocale} from '@/i18n/config';
import type {CapabilityProfile} from '@/lib/capabilities';
import type {CapabilityDomain} from '@/lib/capabilities-content';
import {STUDIO_COPY} from './studio-home';

export type LocalizedServiceSummary = Pick<CapabilityDomain, 'id' | 'briefLine' | 'briefBullets'>;

export const STUDIO_SERVICE_SLUGS = [
  ['strategy-business', 'technology-consulting'],
  ['ai-data-analytics', 'software-engineering'],
  ['cloud-infrastructure', 'operations-managed'],
] as const;

export function getStudioServiceEntries(locale: AppLocale, capabilities: CapabilityProfile[], localizedSummaries: LocalizedServiceSummary[]) {
  const bySlug = new Map(capabilities.map((capability) => [
    capability.translationTargets?.find((target) => target.language === 'en')?.slug ?? capability.slug,
    capability,
  ]));
  const fallbackBySlug = new Map(localizedSummaries.map((summary) => [summary.id, summary]));
  return STUDIO_COPY[locale].services.groups.flatMap((group, groupIndex) =>
    STUDIO_SERVICE_SLUGS[groupIndex].map((slug, serviceIndex) => {
      const profile = bySlug.get(slug);
      const fallback = fallbackBySlug.get(slug);
      return {
        slug,
        detailSlug: profile?.slug ?? slug,
        groupIndex,
        title: profile?.title || group.links[serviceIndex],
        description: profile?.briefLine || fallback?.briefLine || group.description,
        bullets: profile?.briefBullets?.length ? profile.briefBullets : fallback?.briefBullets ?? [],
        detailAvailable: Boolean(profile),
      };
    }),
  );
}

export function studioServiceHref(service: ReturnType<typeof getStudioServiceEntries>[number]) {
  return service.detailAvailable
    ? `/capabilities/${service.detailSlug}`
    : `/capabilities#service-${service.slug}`;
}
