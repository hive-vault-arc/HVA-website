import {describe, expect, it} from 'vitest';
import type {ClientEvidenceSummary} from './proof';
import {selectHomeClientQuote} from './home-client-quote';

const evidence: ClientEvidenceSummary[] = [
  {slug: 'academy', caseStudyTitle: 'Academy', clientName: 'Premium Advice & Training', industry: 'Education', documentTitle: 'Client letter', documentLanguage: 'fr', quoteExcerpt: 'Un témoignage vérifié.', clientLogoAlt: ''},
  {slug: 'crm', caseStudyTitle: 'CRM', clientName: 'ImmoWorld', industry: 'Real estate', documentTitle: 'Client letter', documentLanguage: 'en', quoteExcerpt: 'A verified testimonial.', clientLogoAlt: ''},
  {slug: 'unselected', caseStudyTitle: 'Other', clientName: 'Other', industry: 'Services', documentTitle: 'Client letter', documentLanguage: 'es', quoteExcerpt: 'Una cita verificada.', clientLogoAlt: ''},
];

describe('homepage client quote', () => {
  it('uses a selected project in the visitor language when available', () => {
    expect(selectHomeClientQuote(evidence, new Set(['academy', 'crm']), 'fr')?.slug).toBe('academy');
  });

  it('uses the original English source when the visitor language has no approved quote', () => {
    expect(selectHomeClientQuote(evidence, new Set(['academy', 'crm']), 'ar')?.slug).toBe('crm');
  });

  it('does not substitute unrelated projects or an empty excerpt', () => {
    expect(selectHomeClientQuote(evidence, new Set(['academy', 'crm']), 'es')?.slug).toBe('crm');
    expect(selectHomeClientQuote([{...evidence[0], quoteExcerpt: '  '}], new Set(['academy']), 'fr')).toBeUndefined();
    expect(selectHomeClientQuote(evidence, new Set(['missing']), 'en')).toBeUndefined();
  });
});
