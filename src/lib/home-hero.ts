import type { CaseStudy } from './proof';

export type HomeHeroMetric = {
  label: string;
  value: string;
};

export type HomeTrustedPartner = {
  href: string;
  logo: string;
  logoAlt: string;
  name: string;
};

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
    const clientKey = study.clientName.trim().toLocaleLowerCase();

    if (!logo || seenClients.has(clientKey)) return [];
    seenClients.add(clientKey);

    return [
      {
        name: study.clientName,
        logo,
        logoAlt: study.assets.clientLogoAlt ?? `${study.clientName} logo`,
        href: `/case-studies/${study.slug}`,
      },
    ];
  });

  return { metrics, trustedPartners };
}
