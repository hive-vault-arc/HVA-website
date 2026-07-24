import {Link} from '@/i18n/navigation';
import type { CSSProperties } from 'react';
import type { ClientEvidenceSummary } from '../lib/proof';
import ClientEvidenceCard from './ClientEvidenceCard';
import {useTranslations} from 'next-intl';

export default function ClientEvidenceRail({
  evidence,
}: {
  readonly evidence: readonly ClientEvidenceSummary[];
}) {
  const t = useTranslations('Evidence');
  if (evidence.length === 0) return null;

  return (
    <section className="client-evidence-rail" aria-labelledby="client-evidence-heading">
      <div className="client-evidence-rail__shell">
        <header className="client-evidence-rail__header">
          <p id="client-evidence-heading">{t('railTitle')}</p>
          <span>{t('railDescription')}</span>
        </header>

        <div
          className="client-evidence-rail__track"
          style={{ '--client-evidence-count': evidence.length } as CSSProperties}
        >
          {evidence.map((item) => (
            <Link
              key={item.slug}
              href={`/case-studies/${item.slug}`}
              className="client-evidence-rail__link"
              aria-label={t('railAria', {client: item.clientName})}
            >
              <ClientEvidenceCard evidence={item} industry={item.industry} variant="rail" />
              <span className="client-evidence-rail__case-study">{t('readCaseStudy')}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
