import React from 'react';
import {render, screen} from '@testing-library/react';
import {CaseStudyOutcomes} from './CaseStudyDetail';
import {CASE_STUDIES} from '@/lib/proof';
import type {CaseStudy, CaseStudyOutcome} from '@/lib/proof';

const baseStudy = CASE_STUDIES.find(
  (study) =>
    study.slug ===
    'top-tier-crm-transformation-program-real-estate-operations',
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
    context: 'Tour-to-lease conversion improved after standardizing the pipeline.',
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

describe('CaseStudyOutcomes', () => {
  it('renders benchmark and named-system results from the case-study record', () => {
    const study: CaseStudy = {...baseStudy, publishedOutcomes: outcomes};

    render(<CaseStudyOutcomes study={study} />);

    expect(
      screen.getByRole('heading', {name: 'The operating record, in numbers.'}),
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
