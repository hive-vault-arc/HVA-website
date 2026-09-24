import type {AppLocale} from '@/i18n/config';
import {sanityFetch, withSanityFallback} from '@/sanity/lib/fetch';
import {urlForImage} from '@/sanity/lib/image';
import {approvedOrganizationProfileQuery} from '@/sanity/queries/site';
import type {ApprovedOrganizationProfileQueryResult} from '@/sanity/sanity.types';

export type OrganizationProfile = {
  brandName?: string;
  legalName?: string;
  canonicalWebsite?: string;
  publicEmail?: string;
  publicTelephones?: string[];
  locations?: string[];
  serviceAreas?: string[];
  sameAs?: string[];
  reviewedAt?: string;
  logoUrl?: string;
  descriptions: Partial<Record<AppLocale, string>>;
};

export type OrganizationFacts = {
  brandName: string;
  legalName: string;
  canonicalWebsite: string;
  description: string;
  publicEmail: string;
  publicTelephones: readonly string[];
  serviceAreas: readonly string[];
  sameAs: readonly string[];
  logoUrl?: string;
};

export function resolveOrganizationFacts(
  profile: OrganizationProfile | null,
  locale: AppLocale,
  fallback: OrganizationFacts,
): OrganizationFacts {
  return {
    brandName: profile?.brandName || fallback.brandName,
    legalName: profile?.legalName || fallback.legalName,
    canonicalWebsite: profile?.canonicalWebsite || fallback.canonicalWebsite,
    description: profile?.descriptions[locale] || fallback.description,
    publicEmail: profile?.publicEmail || fallback.publicEmail,
    publicTelephones: profile?.publicTelephones?.length
      ? profile.publicTelephones
      : fallback.publicTelephones,
    serviceAreas: profile?.serviceAreas?.length ? profile.serviceAreas : fallback.serviceAreas,
    sameAs: profile?.sameAs?.length ? profile.sameAs : fallback.sameAs,
    logoUrl: profile?.logoUrl || fallback.logoUrl,
  };
}

export async function getApprovedOrganizationProfile(): Promise<OrganizationProfile | null> {
  return withSanityFallback(
    async () => {
      const profile = await sanityFetch<ApprovedOrganizationProfileQueryResult>({
        query: approvedOrganizationProfileQuery,
        tags: ['organizationProfile', 'companyEntity'],
        revalidate: 86400,
      });
      if (!profile) return null;

      const descriptions = Object.fromEntries(
        profile.descriptions.flatMap(({_key, value}) =>
          _key && value ? [[_key, value.trim()]] : [],
        ),
      ) as Partial<Record<AppLocale, string>>;

      return {
        brandName: profile.brandName,
        legalName: profile.legalName ?? undefined,
        canonicalWebsite: profile.canonicalWebsite,
        publicEmail: profile.publicEmail ?? undefined,
        publicTelephones: profile.publicTelephones ?? undefined,
        locations: profile.locations ?? undefined,
        serviceAreas: profile.serviceAreas ?? undefined,
        sameAs: profile.sameAs ?? undefined,
        reviewedAt: profile.reviewedAt,
        logoUrl: profile.logo?.asset
          ? urlForImage(profile.logo).width(1024).fit('max').format('webp').url()
          : undefined,
        descriptions,
      };
    },
    () => null,
    'approved organization profile',
  );
}
