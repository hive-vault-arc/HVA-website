'use client';

import {ArrowDown, ArrowUpRight} from '@/components/icons';
import {Link} from '@/i18n/navigation';
import styles from '@/components/studio/studio.module.css';

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
    <section className={styles.editorialHero} aria-labelledby={titleId}>
      <div className={`${styles.frame} ${styles.editorialHeroGrid}`}>
        <div className={styles.editorialHeroTitle}>
          <p className={styles.innerEyebrow}>{eyebrow}</p>
          <h1
            id={titleId}
            aria-label={headlineItalic || headline}
          >
            {headlineItalic || headline}
          </h1>
        </div>

        <div className={styles.editorialHeroContext}>
          <p>{description}</p>
          <div className={styles.editorialHeroStat}>
            <strong>{total.toString().padStart(2, '0')}</strong>
            <span>{countLabel.replace(new RegExp(`^${total}\\s*`), '')}</span>
          </div>
          <div className={styles.editorialHeroLinks}>
            <Link href={browseHref}>
              {browseLabel}
              <ArrowDown aria-hidden="true" />
            </Link>
            {secondaryLink ? (
              <Link
                href={secondaryLink.href}
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
