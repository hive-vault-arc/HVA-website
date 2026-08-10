import type { CaseStudy } from './proof';
import type {AppLocale} from '@/i18n/config';

export type HomeTrustedPartner = {
  href?: string;
  hrefLocale?: AppLocale;
  logo: string;
  logoAlt: string;
  name: string;
  surface: 'light' | 'dark';
};

const PREMIUM_ADVICE_LOGO = '/Images/trustedby/premium-advice-training-logo-hq.webp';
const IMMOWORLD_LOGO = '/Images/trustedby/logo.webp';
const TARIK_RAMI_LOGO = '/Images/trustedby/tarik-rami-immobilier-logo.webp';
const TRUSTED_PARTNER_ORDER = ['premium advice', 'immoworld', 'tarik rami'] as const;
const TRUSTED_PARTNER_FALLBACKS = [
  {
    name: 'Premium Advice & Training',
    logo: PREMIUM_ADVICE_LOGO,
    logoAlt: 'Premium Advice & Training logo',
    href: '/case-studies/premium-advice-training-keepzen-digital-academy',
    surface: 'light',
  },
  {
    name: 'ImmoWorld',
    logo: IMMOWORLD_LOGO,
    logoAlt: 'ImmoWorld Luxury Real Estate logo',
    href: '/case-studies/top-tier-crm-transformation-program-real-estate-operations',
    surface: 'dark',
  },
  {
    name: 'Tarik Rami Immobilier',
    logo: TARIK_RAMI_LOGO,
    logoAlt: 'Tarik Rami Immobilier logo',
    href: '/case-studies/tarik-rami-immobilier',
    surface: 'light',
  },
] satisfies Array<Omit<HomeTrustedPartner, 'hrefLocale'>>;

function normalizePartnerName(name: string): string {
  return name.trim().toLocaleLowerCase();
}

function trustedPartnerRank(name: string): number {
  const normalizedName = normalizePartnerName(name);
  const rank = TRUSTED_PARTNER_ORDER.findIndex((partnerName) =>
    normalizedName.includes(partnerName),
  );

  return rank === -1 ? TRUSTED_PARTNER_ORDER.length : rank;
}

function partnerPresentation(name: string, logo: string): Pick<HomeTrustedPartner, 'logo' | 'surface'> {
  const normalizedName = normalizePartnerName(name);

  if (normalizedName.includes('premium advice')) {
    return { logo: PREMIUM_ADVICE_LOGO, surface: 'light' };
  }

  if (normalizedName.includes('tarik rami')) {
    return { logo: TARIK_RAMI_LOGO, surface: 'light' };
  }

  if (normalizedName.includes('immoworld')) {
    return { logo, surface: 'dark' };
  }

  return { logo, surface: 'light' };
}

export function buildHomeHeroProof(
  studies: CaseStudy[],
  hrefLocale?: AppLocale,
): {
  trustedPartners: HomeTrustedPartner[];
} {
  const seenClients = new Set<string>();
  const trustedPartners = studies.flatMap<HomeTrustedPartner>((study) => {
    const logo = study.assets.clientLogo;
    const clientKey = normalizePartnerName(study.clientName);

    if (!logo || seenClients.has(clientKey)) return [];
    seenClients.add(clientKey);

    const presentation = partnerPresentation(study.clientName, logo);

    return [
      {
        name: study.clientName,
        logo: presentation.logo,
        logoAlt: study.assets.clientLogoAlt ?? `${study.clientName} logo`,
        href: `/case-studies/${study.slug}`,
        ...(hrefLocale ? {hrefLocale} : {}),
        surface: presentation.surface,
      },
    ];
  });

  for (const fallbackPartner of TRUSTED_PARTNER_FALLBACKS) {
    const clientKey = normalizePartnerName(fallbackPartner.name);
    if (seenClients.has(clientKey)) continue;

    seenClients.add(clientKey);
    trustedPartners.push({
      ...fallbackPartner,
      ...(hrefLocale ? {hrefLocale} : {}),
    });
  }

  trustedPartners.sort(
    (firstPartner, secondPartner) =>
      trustedPartnerRank(firstPartner.name) - trustedPartnerRank(secondPartner.name),
  );

  return { trustedPartners };
}
