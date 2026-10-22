import Image from 'next/image';
import {Link} from '@/i18n/navigation';
import {ArrowRight} from '@/components/icons';
import EditorialAnswerPanel from '@/components/EditorialAnswerPanel';
import type {CapabilityProfile, CapabilityProfileSummary} from '@/lib/capabilities';
import {isSanityCdnImage} from '@/lib/image-delivery';
import styles from '@/components/studio/studio.module.css';

type Labels = {
  services: string;
  start: string;
  atAGlance: string;
  contextTitle: string;
  strategicContext: string;
  executionContext: string;
  coverageTitle: string;
  scopeDescription: string;
  outcomesTitle: string;
  relatedTitle: string;
  bottomTitle: string;
  bottomDescription: string;
  bottomPrimary: string;
};

export default function SimpleCapabilityDetail({
  capability,
  relatedCapabilities,
  labels,
}: {
  capability: CapabilityProfile;
  relatedCapabilities: CapabilityProfileSummary[];
  labels: Labels;
}) {
  return <div className={styles.innerPage} data-simple-page="service-detail">
    <header className={`${styles.frame} ${styles.capabilityDetailHero}`}>
      <div className={styles.capabilityDetailIntro}>
        <Link href="/capabilities" className={styles.innerEyebrow}>{labels.services}</Link>
        {capability.kicker && <p className={styles.capabilityDetailKicker}>{capability.kicker}</p>}
        <h1>{capability.title}</h1>
        <p className={styles.innerLead}>{capability.briefLine}</p>
        <Link className={styles.primary} href="/contact">{labels.start}<ArrowRight size={18} aria-hidden="true" /></Link>
      </div>
      <figure className={styles.capabilityDetailMedia}>
        <Image src={capability.heroImage} alt={capability.heroImageAlt} fill priority sizes="(min-width: 768px) 48vw, calc(100vw - 2rem)" unoptimized={isSanityCdnImage(capability.heroImage)} />
      </figure>
    </header>

    {capability.briefBullets.length > 0 && <section className={styles.capabilityDetailBrief} aria-label={labels.atAGlance}>
      <div className={styles.frame}>
        <h2>{labels.atAGlance}</h2>
        <ul>{capability.briefBullets.map(item => <li key={item}>{item}</li>)}</ul>
      </div>
    </section>}

    {(capability.strategicContext || capability.executionContext) && <section className={`${styles.frame} ${styles.capabilityDetailContext}`} aria-labelledby="service-context-title">
      <div className={styles.sectionHeading}><h2 id="service-context-title">{labels.contextTitle}</h2></div>
      <div className={styles.capabilityDetailContextRows}>
        {capability.strategicContext && <article><h3>{labels.strategicContext}</h3><p>{capability.strategicContext}</p></article>}
        {capability.executionContext && <article><h3>{labels.executionContext}</h3><p>{capability.executionContext}</p></article>}
      </div>
    </section>}

    <EditorialAnswerPanel editorial={capability} />

    {capability.subCapabilities.length > 0 && <section className={styles.capabilityDetailScope} aria-labelledby="service-scope-title">
      <div className={`${styles.frame} ${styles.capabilityDetailScopeGrid}`}>
        <div className={styles.sectionHeading}><h2 id="service-scope-title">{labels.coverageTitle}</h2><p>{labels.scopeDescription}</p></div>
        <ul>{capability.subCapabilities.map(item => <li key={item}>{item}</li>)}</ul>
      </div>
    </section>}

    {capability.relatedOutcomes.length > 0 && <section className={`${styles.frame} ${styles.capabilityDetailOutcomes}`} aria-labelledby="service-outcomes-title">
      <h2 id="service-outcomes-title">{labels.outcomesTitle}</h2>
      <ul>{capability.relatedOutcomes.map(item => <li key={item}>{item}</li>)}</ul>
    </section>}

    {relatedCapabilities.length > 0 && <section className={`${styles.frame} ${styles.section} ${styles.caseDetailRelated}`} aria-labelledby="service-related-title">
      <h2 id="service-related-title">{labels.relatedTitle}</h2>
      <div>{relatedCapabilities.map(related => <Link key={related.slug} href={`/capabilities/${related.slug}`}><span>{related.shortTitle || related.title}</span><strong>{related.briefLine}</strong><ArrowRight size={18} aria-hidden="true" /></Link>)}</div>
    </section>}

    <section className={`${styles.frame} ${styles.innerCta}`}><div><h2>{labels.bottomTitle}</h2><p>{labels.bottomDescription}</p></div><Link className={styles.primary} href="/contact">{labels.bottomPrimary}<ArrowRight size={18} aria-hidden="true" /></Link></section>
  </div>;
}
