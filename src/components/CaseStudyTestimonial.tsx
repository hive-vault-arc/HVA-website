import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {ExternalLink} from '@/components/icons';
import {getEvidenceDirection, getEvidenceLanguageCode} from '@/components/ClientEvidenceCard';
import {isSanityCdnImage} from '@/lib/image-delivery';
import type {ClientEvidence} from '@/lib/proof';

type Props = {
  readonly evidence?: ClientEvidence;
};

export default function CaseStudyTestimonial({evidence}: Props) {
  const t = useTranslations('DynamicContent');
  const testimonialImage = evidence?.testimonialImage;

  if (!evidence || !testimonialImage) return null;

  const evidenceLanguage = getEvidenceLanguageCode(evidence.documentLanguage);
  const evidenceDirection = getEvidenceDirection(evidence.documentLanguage);

  return (
    <section
      className="case-study-template__testimonial"
      aria-labelledby="case-study-testimonial-title"
    >
      <div
        className="case-study-template__testimonial-copy"
        lang={evidenceLanguage}
        dir={evidenceDirection}
      >
        <h2 id="case-study-testimonial-title">{t('caseSections.testimonial')}</h2>
        <p>{evidence.documentTitle}</p>

        {evidence.quoteExcerpt ? <blockquote>{evidence.quoteExcerpt}</blockquote> : null}

        {evidence.signatoryName || evidence.signatoryRole ? (
          <div className="case-study-template__testimonial-signatory">
            {evidence.signatoryName ? <strong>{evidence.signatoryName}</strong> : null}
            {evidence.signatoryRole ? <span>{evidence.signatoryRole}</span> : null}
          </div>
        ) : null}

        {evidence.testimonialPdf ? (
          <a
            href={evidence.testimonialPdf.url}
            target="_blank"
            rel="noopener noreferrer"
            className="case-study-template__external-link"
          >
            {t('openTestimonial')}
            <ExternalLink aria-hidden="true" />
          </a>
        ) : null}
      </div>

      <a
        href={testimonialImage.url}
        target="_blank"
        rel="noopener noreferrer"
        className="case-study-template__testimonial-document"
        aria-label={`${t('openTestimonial')}: ${evidence.documentTitle}`}
      >
        <Image
          src={testimonialImage.url}
          alt={testimonialImage.alt}
          width={testimonialImage.width}
          height={testimonialImage.height}
          unoptimized={isSanityCdnImage(testimonialImage.url)}
          placeholder={testimonialImage.lqip ? 'blur' : 'empty'}
          blurDataURL={testimonialImage.lqip}
          sizes="(max-width: 759px) calc(100vw - 5rem), min(48vw, 44rem)"
        />
        <span>
          {t('openTestimonial')}
          <ExternalLink aria-hidden="true" />
        </span>
      </a>
    </section>
  );
}
