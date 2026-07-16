import React from 'react';
import { render, screen } from '@testing-library/react';
import ClientEvidenceCard from './ClientEvidenceCard';
import ClientEvidenceRail from './ClientEvidenceRail';
import type { ClientEvidenceSummary } from '../lib/proof';

const summary: ClientEvidenceSummary = {
  slug: 'acme-operating-system',
  caseStudyTitle: 'Acme Operating System',
  clientName: 'Acme Group',
  industry: 'Industrial Services',
  documentTitle: 'Acme delivery reference letter',
  documentLanguage: 'en',
  quoteExcerpt: 'The delivered system is now part of our daily operations.',
  signatoryName: 'Samira Amrani',
  signatoryRole: 'Operations Director',
  clientLogoAlt: 'Acme Group logo',
};

describe('Client evidence', () => {
  it('hides the homepage rail when there is no approved evidence', () => {
    const { container } = render(<ClientEvidenceRail evidence={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('links homepage evidence only to its HTML case study', () => {
    const { container } = render(<ClientEvidenceRail evidence={[summary]} />);
    const caseStudyLink = screen.getByRole('link', {
      name: /read the acme group case study/i,
    });

    expect(caseStudyLink).toHaveAttribute('href', '/case-studies/acme-operating-system');
    expect(screen.getByText('Client letter available')).toBeInTheDocument();
    expect(container.querySelector('a[href$=".pdf"]')).not.toBeInTheDocument();
    expect(container.querySelector('iframe, object, embed')).not.toBeInTheDocument();
  });

  it('renders an original-language RTL excerpt and an explicit direct PDF action', () => {
    const { container } = render(
      <ClientEvidenceCard
        evidence={{
          ...summary,
          documentLanguage: 'ar',
          quoteExcerpt: 'أصبح النظام جزءاً من عملياتنا اليومية.',
          testimonialPdf: {
            url: 'https://cdn.sanity.io/files/project/production/acme-letter.pdf',
            mimeType: 'application/pdf',
            size: 840000,
          },
        }}
        industry={summary.industry}
        showQuote
      />
    );

    const quote = container.querySelector('figure[lang="ar"][dir="rtl"]');
    const pdfLink = screen.getByRole('link', {
      name: /open client reference letter for acme group.*pdf, 820 kb.*opens in a new tab/i,
    });

    expect(quote).toHaveTextContent('أصبح النظام جزءاً من عملياتنا اليومية.');
    expect(pdfLink).toHaveAttribute(
      'href',
      'https://cdn.sanity.io/files/project/production/acme-letter.pdf'
    );
    expect(pdfLink).toHaveAttribute('target', '_blank');
    expect(pdfLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(container.querySelector('iframe, object, embed')).not.toBeInTheDocument();
  });
});
