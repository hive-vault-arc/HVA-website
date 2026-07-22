import type { CaseStudy } from './proof';

export type HomeHeroMetric = {
  label: string;
  value: string;
};

export type HomeTrustedPartner = {
  href?: string;
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

type MetricCandidate = HomeHeroMetric & {
  order: number;
  score: number;
};

function metricSignalScore(label: string, value: string): number {
  let score = 0;

  if (/[%$]/.test(value)) score += 5;
  if (/^[+\-<]/.test(value.trim())) score += 2;
  if (/users|pipeline|reduction|response|meetings/i.test(label)) score += 3;
  if (value.length <= 10) score += 1;

  return score;
}

function fallbackMetrics(studies: CaseStudy[]): HomeHeroMetric[] {
  const industries = new Set(studies.map((study) => study.industry).filter(Boolean));
  const documentedOutcomes = studies.reduce(
    (total, study) => total + study.measuredOutcomes.length,
    0
  );

  return [
    { value: String(studies.length), label: 'Published case studies' },
    { value: String(industries.size), label: 'Industries represented' },
    { value: String(documentedOutcomes), label: 'Measured outcomes documented' },
  ];
}

export function buildHomeHeroProof(studies: CaseStudy[]): {
  metrics: HomeHeroMetric[];
  trustedPartners: HomeTrustedPartner[];
} {
  const metricCandidates: MetricCandidate[] = studies.flatMap((study, studyIndex) =>
    study.measuredOutcomes
      .filter((metric) => /\d/.test(metric.value))
      .map((metric, metricIndex) => ({
        label: metric.label,
        value: metric.value.trim(),
        order: studyIndex * 100 + metricIndex,
        score: metricSignalScore(metric.label, metric.value),
      }))
  );

  metricCandidates.sort((left, right) => right.score - left.score || left.order - right.order);

  const selectedMetrics = metricCandidates.slice(0, 3).map(({ label, value }) => ({
    label,
    value,
  }));
  const metrics = selectedMetrics.length === 3 ? selectedMetrics : fallbackMetrics(studies);

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

  return { metrics, trustedPartners };
}
