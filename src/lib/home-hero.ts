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
const TARIK_RAMI_LOGO = '/Images/trustedby/tarik-rami-immobilier-logo.webp';

function normalizePartnerName(name: string): string {
  return name.trim().toLocaleLowerCase();
}

function partnerPresentation(name: string, logo: string): Pick<HomeTrustedPartner, 'logo' | 'surface'> {
  const normalizedName = normalizePartnerName(name);

  if (normalizedName.includes('premium advice')) {
    return { logo: PREMIUM_ADVICE_LOGO, surface: 'light' };
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

  const tarikRamiKey = normalizePartnerName('Tarik Rami Immobilier');

  if (!seenClients.has(tarikRamiKey)) {
    trustedPartners.push({
      name: 'Tarik Rami Immobilier',
      logo: TARIK_RAMI_LOGO,
      logoAlt: 'Tarik Rami Immobilier logo',
      surface: 'light',
    });
  }

  return { trustedPartners };
}
