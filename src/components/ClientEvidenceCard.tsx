import Image from 'next/image';
import { ExternalLink, FileText } from 'lucide-react';
import type { ClientEvidence, ClientEvidenceSummary } from '../lib/proof';

type EvidenceDisplay = Pick<
  ClientEvidenceSummary,
  | 'clientName'
  | 'documentTitle'
  | 'documentLanguage'
  | 'issuedOn'
  | 'quoteExcerpt'
  | 'signatoryName'
  | 'signatoryRole'
  | 'clientLogo'
  | 'clientLogoAlt'
> & {
  testimonialPdf?: ClientEvidence['testimonialPdf'];
};

type ClientEvidenceCardProps = {
  evidence: EvidenceDisplay;
  industry?: string;
  variant?: 'rail' | 'detail';
  showQuote?: boolean;
  className?: string;
};

const LANGUAGE_NAMES: Record<string, string> = {
  ar: 'Arabic',
  en: 'English',
  es: 'Spanish',
  fr: 'French',
};

const RTL_LANGUAGES = new Set(['ar', 'fa', 'he', 'ur']);

export function getEvidenceLanguageCode(language: string) {
  return language.trim().toLowerCase().split(/[-_]/)[0] || 'en';
}

export function getEvidenceDirection(language: string): 'ltr' | 'rtl' {
  return RTL_LANGUAGES.has(getEvidenceLanguageCode(language)) ? 'rtl' : 'ltr';
}

function getLanguageName(language: string) {
  const code = getEvidenceLanguageCode(language);
  return LANGUAGE_NAMES[code] ?? language;
}

function formatIssueDate(isoDate?: string) {
  if (!isoDate) return undefined;

  const date = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return isoDate;

  return new Intl.DateTimeFormat('en-GB', {
    month: 'long',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(date);
}

function formatFileSize(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) return 'size unavailable';
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;

  const megabytes = bytes / (1024 * 1024);
  return `${megabytes >= 10 ? Math.round(megabytes) : megabytes.toFixed(1)} MB`;
}

export default function ClientEvidenceCard({
  evidence,
  industry,
  variant = 'detail',
  showQuote = false,
  className = '',
}: ClientEvidenceCardProps) {
  const languageCode = getEvidenceLanguageCode(evidence.documentLanguage);
  const direction = getEvidenceDirection(evidence.documentLanguage);
  const languageName = getLanguageName(evidence.documentLanguage);
  const issuedOn = formatIssueDate(evidence.issuedOn);
  const pdfSize = evidence.testimonialPdf ? formatFileSize(evidence.testimonialPdf.size) : undefined;
  const meta = [languageName, issuedOn].filter(Boolean).join(' · ');

  return (
    <article className={`client-evidence-card client-evidence-card--${variant} ${className}`.trim()}>
      <div className="client-evidence-card__identity">
        <div className="client-evidence-card__logo" aria-hidden={!evidence.clientLogo}>
          {evidence.clientLogo ? (
            <Image
              src={evidence.clientLogo}
              alt={evidence.clientLogoAlt}
              fill
              sizes="6rem"
            />
          ) : (
            <span>{evidence.clientName.slice(0, 2).toUpperCase()}</span>
          )}
        </div>
        <div>
          {industry ? <span className="client-evidence-card__industry">{industry}</span> : null}
          <strong>{evidence.clientName}</strong>
          <span className="client-evidence-card__available">Client letter available</span>
        </div>
      </div>

      <div className="client-evidence-card__document">
        <div className="client-evidence-card__document-mark" aria-hidden="true">
          <FileText strokeWidth={1.5} />
          <span>PDF</span>
        </div>
        <div className="client-evidence-card__document-copy">
          <span>Client reference letter</span>
          <strong>{evidence.documentTitle}</strong>
          {meta ? <span className="client-evidence-card__meta">{meta}</span> : null}
        </div>
      </div>

      {showQuote && evidence.quoteExcerpt ? (
        <figure className="client-evidence-card__quote" lang={languageCode} dir={direction}>
          <blockquote>{evidence.quoteExcerpt}</blockquote>
          {evidence.signatoryName || evidence.signatoryRole ? (
            <figcaption>
              {evidence.signatoryName ? <strong>{evidence.signatoryName}</strong> : null}
              {evidence.signatoryRole ? <span>{evidence.signatoryRole}</span> : null}
            </figcaption>
          ) : null}
        </figure>
      ) : null}

      {evidence.testimonialPdf ? (
        <div className="client-evidence-card__action">
          <a
            href={evidence.testimonialPdf.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open client reference letter for ${evidence.clientName} — PDF, ${pdfSize} (opens in a new tab)`}
          >
            <span>Open client reference letter — PDF, {pdfSize}</span>
            <ExternalLink aria-hidden="true" strokeWidth={1.6} />
          </a>
          <span className="client-evidence-card__new-tab">Opens in a new tab</span>
        </div>
      ) : null}
    </article>
  );
}
