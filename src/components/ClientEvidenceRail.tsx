import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { ClientEvidenceSummary } from '../lib/proof';
import ClientEvidenceCard from './ClientEvidenceCard';

export default function ClientEvidenceRail({
  evidence,
}: {
  readonly evidence: readonly ClientEvidenceSummary[];
}) {
  if (evidence.length === 0) return null;

  return (
    <section className="client-evidence-rail" aria-labelledby="client-evidence-heading">
      <div className="client-evidence-rail__shell">
        <header className="client-evidence-rail__header">
          <p id="client-evidence-heading">Client evidence</p>
          <span>Approved reference letters supporting published delivery work.</span>
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
              aria-label={`Read the ${item.clientName} case study. Client reference letter available.`}
            >
              <ClientEvidenceCard evidence={item} industry={item.industry} variant="rail" />
              <span className="client-evidence-rail__case-study">Read case study</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
