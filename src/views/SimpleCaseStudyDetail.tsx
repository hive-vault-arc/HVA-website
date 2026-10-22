import Image from 'next/image';
import {Link} from '@/i18n/navigation';
import {ArrowRight} from '@/components/icons';
import type {CaseStudy} from '@/lib/proof';
import type {AppLocale} from '@/i18n/config';
import {isSanityCdnImage} from '@/lib/image-delivery';
import {STUDIO_COPY} from '@/data/studio-home';
import styles from '@/components/studio/studio.module.css';

type Labels = {client: string; industry: string; status: string; challenge: string; architecture: string; modules: string; projectMedia: string; outcomes: string; testimonial: string; openTestimonial: string; more: string};

export default function SimpleCaseStudyDetail({locale, study, relatedStudies, labels}: {locale: AppLocale; study: CaseStudy; relatedStudies: CaseStudy[]; labels: Labels}) {
  const copy = STUDIO_COPY[locale];
  const media = study.projectMedia.filter(item => item.publicationStatus === 'approved' && item.image);
  const outcomes = study.publishedOutcomes.filter(item => item.scope === 'caseStudy');
  return <div className={styles.innerPage} data-simple-page="case-detail">
    <header className={`${styles.frame} ${styles.caseDetailHero}`}><div className={styles.caseDetailIntro}><Link href="/case-studies" className={styles.innerEyebrow}>{copy.nav.work}</Link><h1>{study.title}</h1><p className={styles.innerLead}>{study.summary}</p>
      <dl className={styles.caseDetailFacts}><div><dt>{labels.client}</dt><dd>{study.clientName}</dd></div><div><dt>{labels.industry}</dt><dd>{study.industry}</dd></div><div><dt>{labels.status}</dt><dd>{study.deploymentStatus}</dd></div></dl>
    </div><figure className={styles.caseDetailCover}><div><Image src={study.assets.coverImage} alt={study.assets.coverAlt || study.title} fill priority sizes="(min-width: 1024px) 720px, 100vw" unoptimized={isSanityCdnImage(study.assets.coverImage)} /></div>{study.coverDisclosure && <figcaption>{study.coverDisclosure}</figcaption>}</figure></header>
    <div className={styles.caseDetailStory}>
      <section className={`${styles.frame} ${styles.caseDetailChapter}`}><span>01</span><div><h2>{labels.challenge}</h2><p>{study.problem}</p></div></section>
      <section className={`${styles.frame} ${styles.caseDetailChapter}`}><span>02</span><div><h2>{labels.architecture}</h2><p>{study.systemArchitecture}</p>{study.integrations.length > 0 && <ul className={styles.caseDetailTags}>{study.integrations.map(item => <li key={item}>{item}</li>)}</ul>}</div></section>
      {study.operationalModules.length > 0 && <section className={`${styles.frame} ${styles.caseDetailChapter}`}><span>03</span><div><h2>{labels.modules}</h2><ul className={styles.caseDetailModules}>{study.operationalModules.map(item => <li key={item}>{item}</li>)}</ul></div></section>}
    </div>
    {media.length > 0 && <section className={`${styles.frame} ${styles.section} ${styles.caseDetailGallery}`} aria-labelledby="case-detail-media-title"><div className={styles.sectionHeading}><h2 id="case-detail-media-title">{labels.projectMedia}</h2></div><div>{media.map(item => <figure key={item._key}><div><Image src={item.image} alt={item.alt} fill sizes="(min-width: 1024px) 560px, 100vw" unoptimized={isSanityCdnImage(item.image)} /></div>{item.disclosure && <figcaption>{item.disclosure}</figcaption>}</figure>)}</div></section>}
    {(outcomes.length > 0 || study.deploymentStatus || study.clientEvidence?.quoteExcerpt) && <section className={`${styles.frame} ${styles.section} ${styles.caseDetailProof}`} aria-labelledby="case-detail-proof-title"><h2 id="case-detail-proof-title">{labels.outcomes}</h2><div><p className={styles.caseDetailStatus}>{study.deploymentStatus}</p>{outcomes.length > 0 && <ul>{outcomes.map(item => <li key={item._key}><strong>{item.value}</strong><span>{item.label}</span><p>{item.context}</p></li>)}</ul>}{study.hasClientEvidence && study.clientEvidence?.quoteExcerpt && <blockquote><p>“{study.clientEvidence.quoteExcerpt}”</p><footer>{study.clientEvidence.signatoryName || study.clientName}{study.clientEvidence.signatoryRole && `, ${study.clientEvidence.signatoryRole}`}</footer>{study.clientEvidence.testimonialPdf?.url && <a href={study.clientEvidence.testimonialPdf.url} target="_blank" rel="noopener noreferrer">{labels.openTestimonial}<ArrowRight size={18} aria-hidden="true" /></a>}</blockquote>}</div></section>}
    {relatedStudies.length > 0 && <section className={`${styles.frame} ${styles.section} ${styles.caseDetailRelated}`} aria-labelledby="case-detail-related-title"><h2 id="case-detail-related-title">{labels.more}</h2><div>{relatedStudies.slice(0, 2).map(related => <Link href={`/case-studies/${related.slug}`} locale={related.language ?? locale} key={related.slug}><span>{related.clientName}</span><strong>{related.title}</strong><ArrowRight size={18} aria-hidden="true" /></Link>)}</div></section>}
    <section className={`${styles.frame} ${styles.innerCta}`}><div><h2>{copy.contact.title}</h2><p>{copy.contact.description}</p></div><Link className={styles.primary} href="/contact">{copy.nav.action}<ArrowRight size={18} aria-hidden="true" /></Link></section>
  </div>;
}
