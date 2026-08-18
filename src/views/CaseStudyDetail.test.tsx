import React from 'react';
import {render, screen, within} from '@testing-library/react';
import CaseStudyDetail, {
  CaseStudyHeadlineMetrics,
  CaseStudyOutcomes,
  formatCaseStudyHeadlineMetric,
} from './CaseStudyDetail';
import {CASE_STUDIES} from '@/lib/proof';
import type {
  CaseStudy,
  CaseStudyHeadlineMetric,
  CaseStudyOutcome,
  CaseStudyProjectMedia,
} from '@/lib/proof';

const baseStudy = CASE_STUDIES.find(
  (study) =>
    study.slug === 'top-tier-crm-transformation-program-real-estate-operations',
)!;

const outcomes: CaseStudyOutcome[] = [
  {
    _key: 'throughput-lift',
    scope: 'benchmark',
    category: 'throughput',
    value: '3–6x',
    label: 'Throughput lift',
    context: 'Sustained throughput improvement within the first 90 days.',
  },
  {
    _key: 'cycle-time-reduction',
    scope: 'benchmark',
    category: 'cycleTime',
    value: '30–60%',
    label: 'Cycle time reduction',
    context: 'Faster cycles by removing hidden handoffs and rework.',
  },
  {
    _key: 'operating-margin-lift',
    scope: 'benchmark',
    category: 'operatingMargin',
    value: '15–25%',
    label: 'Operating margin lift',
    context: 'Margin expansion through constraint removal and better flow.',
  },
  {
    _key: 'lead-response',
    scope: 'caseStudy',
    category: 'responseTime',
    value: '40%',
    label: 'Faster lead response',
    context: 'Lead response time improved after centralizing intake.',
  },
  {
    _key: 'tour-to-lease',
    scope: 'caseStudy',
    category: 'conversion',
    value: '25%',
    label: 'Lift in tour-to-lease conversion',
    context:
      'Tour-to-lease conversion improved after standardizing the pipeline.',
  },
  {
    _key: 'team-visibility',
    scope: 'caseStudy',
    category: 'visibility',
    value: '100%',
    label: 'Real-time visibility across teams',
    context: 'Teams share one live operating view.',
  },
];

const placedMedia: CaseStudyProjectMedia[] = [
  {
    _key: 'challenge-proof',
    image: 'https://cdn.sanity.io/images/0zprc9fo/production/challenge.webp',
    width: 1600,
    height: 900,
    deviceType: 'desktop',
    placement: 'afterChallenge',
    evidenceType: 'fixtureBacked',
    alt: 'Challenge workflow before consolidation.',
    disclosure: 'Illustrative interface data.',
    publicationStatus: 'approved',
  },
  {
    _key: 'solution-proof',
    image: 'https://cdn.sanity.io/images/0zprc9fo/production/solution.webp',
    width: 1600,
    height: 900,
    deviceType: 'desktop',
    placement: 'afterArchitecture',
    evidenceType: 'deliveredInterface',
    alt: 'Delivered operating system interface.',
    disclosure: 'Illustrative interface data.',
    publicationStatus: 'approved',
  },
  {
    _key: 'module-proof',
    image: 'https://cdn.sanity.io/images/0zprc9fo/production/modules.webp',
    width: 600,
    height: 1120,
    deviceType: 'phone',
    placement: 'afterChallenge',
    evidenceType: 'deliveredInterface',
    alt: 'Mobile workflow module.',
    disclosure: 'Illustrative interface data.',
    publicationStatus: 'approved',
  },
];

const headlineMetrics: CaseStudyHeadlineMetric[] = [
  {
    _key: 'throughput-range',
    valueType: 'multiplierRange',
    minimum: 3,
    maximum: 6,
    label: 'Throughput lift',
    context: 'Approved transformation benchmark.',
    basis: 'benchmark',
  },
  {
    _key: 'lead-response',
    valueType: 'percentage',
    value: 40,
    label: 'Faster lead response',
    context: 'Approved named-system result.',
    basis: 'verifiedResult',
  },
  {
    _key: 'modules',
    valueType: 'number',
    value: 8,
    unit: 'modules',
    label: 'Operational modules',
    context: 'Scope count from the approved CMS record.',
    basis: 'systemScope',
  },
];

describe('CaseStudyHeadlineMetrics', () => {
  it('formats scalar, interval, percentage, multiplier, and unit values', () => {
    expect(formatCaseStudyHeadlineMetric(headlineMetrics[0], 'en')).toBe(
      '3–6×',
    );
    expect(formatCaseStudyHeadlineMetric(headlineMetrics[1], 'en')).toBe('40%');
    expect(formatCaseStudyHeadlineMetric(headlineMetrics[1], 'fr')).toBe(
      '40\u00a0%',
    );
    expect(formatCaseStudyHeadlineMetric(headlineMetrics[2], 'en')).toBe(
      '8\u00a0modules',
    );
  });

  it('renders approved CMS metrics and their evidence basis', () => {
    render(<CaseStudyHeadlineMetrics metrics={headlineMetrics} />);

    expect(screen.getByLabelText('Case study numbers')).toBeInTheDocument();
    expect(screen.getByText('3–6×')).toBeInTheDocument();
    expect(screen.getByText('Published benchmark')).toBeInTheDocument();
    expect(screen.getByText('Verified result')).toBeInTheDocument();
    expect(screen.getByText('System scope')).toBeInTheDocument();
  });

  it('omits the strip when no CMS metrics are supplied', () => {
    const {container} = render(<CaseStudyHeadlineMetrics metrics={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});

describe('CaseStudyOutcomes', () => {
  it('renders benchmark and named-system results from the case-study record', () => {
    const study: CaseStudy = {...baseStudy, publishedOutcomes: outcomes};

    render(<CaseStudyOutcomes study={study} />);

    expect(
      screen.getByRole('heading', {
        name: 'The operating record, in numbers.',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('Transformation benchmarks'),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('ImmoWorld operating results'),
    ).toBeInTheDocument();

    outcomes.forEach((outcome) => {
      expect(screen.getByText(outcome.value)).toBeInTheDocument();
      expect(screen.getByText(outcome.label)).toBeInTheDocument();
      expect(screen.getByText(outcome.context)).toBeInTheDocument();
    });
  });

  it('omits the section when the case-study record has no published outcomes', () => {
    const study: CaseStudy = {...baseStudy, publishedOutcomes: []};
    const {container} = render(<CaseStudyOutcomes study={study} />);

    expect(container).toBeEmptyDOMElement();
  });
});

describe('CaseStudyDetail', () => {
  it('keeps the full CMS client dossier attached to the hero visual', () => {
    const study: CaseStudy = {
      ...baseStudy,
      clientName: 'Premium Advice & Training',
      industry: 'Education & Professional Training',
      deploymentStatus:
        'Delivered digital academy; operational metrics pending client confirmation',
      projectMedia: [],
      headlineMetrics: [],
      publishedOutcomes: [],
      hasClientEvidence: true,
      clientEvidence: {
        documentTitle: 'Premium Advice & Training testimonial',
        documentLanguage: 'fr',
        quoteExcerpt:
          'HIVE VAULT ARC a transformé notre façon de délivrer nos formations.',
        signatoryName: 'GASMI Marouane',
        signatoryRole: 'Chef de projet & Consultant junior',
        testimonialPdf: {
          url: 'https://cdn.sanity.io/files/0zprc9fo/production/testimonial.pdf',
          mimeType: 'application/pdf',
          size: 840000,
        },
      },
    };

    const {container} = render(
      <CaseStudyDetail study={study} relatedStudies={[]} />,
    );
    const heroVisual = container.querySelector<HTMLElement>(
      '.case-study-template__hero-visual',
    );

    expect(heroVisual).not.toBeNull();
    expect(within(heroVisual!).getByText(study.clientName)).toBeInTheDocument();
    expect(within(heroVisual!).getByText(study.industry)).toBeInTheDocument();
    expect(
      within(heroVisual!).getByText(study.deploymentStatus),
    ).toBeInTheDocument();
    expect(
      within(heroVisual!).getByText(study.clientEvidence!.quoteExcerpt!),
    ).toBeInTheDocument();
    expect(within(heroVisual!).getByText('GASMI Marouane')).toBeInTheDocument();
    expect(
      within(heroVisual!).getByText('Chef de projet & Consultant junior'),
    ).toBeInTheDocument();
    expect(
      within(heroVisual!).getByRole('link', {name: 'Open testimonial'}),
    ).toHaveAttribute('href', study.clientEvidence!.testimonialPdf!.url);
  });

  it('uses one fixed dossier sequence and attaches media to its CMS placement', () => {
    const study: CaseStudy = {
      ...baseStudy,
      projectMedia: placedMedia,
      headlineMetrics,
      publishedOutcomes: [],
    };

    const {container} = render(
      <CaseStudyDetail study={study} relatedStudies={[]} />,
    );

    expect(
      screen.getByRole('heading', {level: 1, name: study.title}),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {name: 'Business challenge'}),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {name: 'Solution delivered'}),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {name: 'Modules activated'}),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {name: 'Stack & integrations'}),
    ).toBeInTheDocument();

    const challenge = container.querySelector<HTMLElement>('#challenge');
    const solution = container.querySelector<HTMLElement>('#solution');
    const narrative = container.querySelector<HTMLElement>(
      '.case-study-template__narrative',
    );
    const systems = container.querySelector<HTMLElement>(
      '.case-study-template__systems',
    );
    const modules = container.querySelector<HTMLElement>(
      '.case-study-template__modules',
    );
    const proofMedia = container.querySelector<HTMLElement>(
      '.case-study-template__narrative-media',
    );
    const integrations = container.querySelector<HTMLElement>(
      '.case-study-template__integrations',
    );
    const metrics = container.querySelector<HTMLElement>(
      '.case-study-template__headline-metrics',
    );

    expect(challenge).not.toBeNull();
    expect(solution).not.toBeNull();
    expect(narrative).not.toBeNull();
    expect(systems).not.toBeNull();
    expect(modules).not.toBeNull();
    expect(proofMedia).not.toBeNull();
    expect(integrations).not.toBeNull();
    expect(metrics).not.toBeNull();
    expect(
      within(narrative!).getByAltText(placedMedia[0].alt),
    ).toBeInTheDocument();
    expect(
      within(proofMedia!).getByAltText(placedMedia[2].alt),
    ).toBeInTheDocument();
    expect(
      within(proofMedia!).getAllByRole('img'),
    ).toHaveLength(2);
    expect(
      within(proofMedia!).getByRole('button', {
        name: 'Next desktop screen',
      }),
    ).toBeInTheDocument();
    expect(
      within(proofMedia!).queryByRole('button', {
        name: 'Next mobile screen',
      }),
    ).not.toBeInTheDocument();
    expect(
      narrative!.querySelector('.case-study-project-media'),
    ).not.toBeNull();
    expect(
      narrative!.compareDocumentPosition(modules!) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      systems!.compareDocumentPosition(integrations!) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      integrations!.compareDocumentPosition(metrics!) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      container.querySelector(
        '.case-study-template__hero .case-study-template__headline-metrics',
      ),
    ).toBeNull();
  });

  it('collapses the optional media stage while preserving modules, stack, and metrics order', () => {
    const study: CaseStudy = {
      ...baseStudy,
      projectMedia: [],
      headlineMetrics,
      publishedOutcomes: [],
    };

    const {container} = render(
      <CaseStudyDetail study={study} relatedStudies={[]} />,
    );

    expect(
      screen.getByRole('heading', {name: 'Business challenge'}),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {name: 'Solution delivered'}),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {name: 'Modules activated'}),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {name: 'Stack & integrations'}),
    ).toBeInTheDocument();
    expect(
      container.querySelectorAll('.case-study-project-media'),
    ).toHaveLength(0);
    const modules = container.querySelector<HTMLElement>(
      '.case-study-template__modules',
    )!;
    const integrations = container.querySelector<HTMLElement>(
      '.case-study-template__integrations',
    )!;
    const metrics = container.querySelector<HTMLElement>(
      '.case-study-template__headline-metrics',
    )!;
    expect(
      modules.compareDocumentPosition(integrations) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      integrations.compareDocumentPosition(metrics) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      screen.queryByRole('heading', {name: 'Client testimonial'}),
    ).not.toBeInTheDocument();
  });

  it('supports a non-software case without screenshots, modules, integrations, or empty shells', () => {
    const study: CaseStudy = {
      ...baseStudy,
      engagementType: 'advisoryTransformation',
      operationalModules: [],
      integrations: [],
      projectMedia: [],
      headlineMetrics,
      publishedOutcomes: [],
    };

    const {container} = render(
      <CaseStudyDetail study={study} relatedStudies={[]} />,
    );

    expect(
      screen.getByRole('heading', {name: 'Business challenge'}),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {name: 'Solution delivered'}),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', {name: 'Modules activated'}),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', {name: 'Stack & integrations'}),
    ).not.toBeInTheDocument();
    expect(container.querySelector('.case-study-template__systems')).toBeNull();
    expect(
      container.querySelectorAll('.case-study-project-media'),
    ).toHaveLength(0);
    expect(
      container.querySelector('.case-study-template__headline-metrics'),
    ).not.toBeNull();
  });

  it('shows approved testimonial imagery only when the CMS record supplies it', () => {
    const study: CaseStudy = {
      ...baseStudy,
      projectMedia: [],
      headlineMetrics: [],
      publishedOutcomes: [],
      hasClientEvidence: true,
      clientEvidence: {
        documentTitle:
          'Official client testimonial — ImmoWorld Luxury Real Estate',
        documentLanguage: 'en',
        quoteExcerpt:
          'ImmoWorld did not have to adapt to a generic system; Hive Vault Arc designed the CRM around the reality of our real-estate operations.',
        signatoryRole: 'Founder & CEO',
        testimonialImage: {
          url: 'https://cdn.sanity.io/images/0zprc9fo/production/testimonial.webp',
          width: 1276,
          height: 1702,
          alt: 'Signed and stamped ImmoWorld client testimonial.',
        },
      },
    };

    render(<CaseStudyDetail study={study} relatedStudies={[]} />);

    expect(
      screen.getByRole('heading', {name: 'Client testimonial'}),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText('Signed and stamped ImmoWorld client testimonial.'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(study.clientEvidence!.quoteExcerpt!),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(study.clientEvidence!.quoteExcerpt!),
    ).toHaveLength(1);
  });
});
