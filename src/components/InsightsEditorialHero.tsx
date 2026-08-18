'use client';

import {ArrowDown, ArrowUpRight} from '@/components/icons';
import {Link} from '@/i18n/navigation';

type SecondaryLink = {
  readonly label: string;
  readonly href: string;
};

type Props = {
  readonly eyebrow: string;
  readonly headline: string;
  readonly headlineItalic?: string;
  readonly description: string;
  readonly total: number;
  readonly countLabel: string;
  readonly browseLabel: string;
  readonly browseHref?: string;
  readonly secondaryLink?: SecondaryLink;
  readonly titleId?: string;
};

export default function InsightsEditorialHero({
  eyebrow,
  headline,
  headlineItalic,
  description,
  total,
  countLabel,
  browseLabel,
  browseHref = '#publication-index',
  secondaryLink,
  titleId = 'insight-index-title',
}: Readonly<Props>) {
  return (
    <section className="insight-index-v2__hero" aria-labelledby={titleId}>
      <div className="site-frame-wide insight-index-v2__hero-grid">
        <div className="insight-index-v2__hero-title">
          <p className="insight-index-v2__hero-eyebrow">{eyebrow}</p>
          <h1
            id={titleId}
            aria-label={
              headlineItalic ? `${headline} ${headlineItalic}` : headline
            }
          >
            {headline}
            {headlineItalic ? <span>{headlineItalic}</span> : null}
          </h1>
        </div>

        <div className="insight-index-v2__hero-context">
          <p>{description}</p>
          <div className="insight-index-v2__hero-stat">
            <strong>{total.toString().padStart(2, '0')}</strong>
            <span>{countLabel}</span>
          </div>
          <div className="insight-index-v2__hero-links">
            <Link href={browseHref} className="insight-index-v2__browse-link">
              {browseLabel}
              <ArrowDown aria-hidden="true" />
            </Link>
            {secondaryLink ? (
              <Link
                href={secondaryLink.href}
                className="insight-index-v2__secondary-link"
              >
                {secondaryLink.label}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
