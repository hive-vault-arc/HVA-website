import Image from 'next/image';
import {Link} from '@/i18n/navigation';
import {ArrowRight} from '@/components/icons';
import type {AppLocale} from '@/i18n/config';
import type {CaseStudy} from '@/lib/proof';
import {isSanityCdnImage} from '@/lib/image-delivery';
import {STUDIO_COPY} from '@/data/studio-home';
import styles from '@/components/studio/studio.module.css';

export default function SimpleCaseStudies({locale, sourceLocale, studies}: {locale: AppLocale; sourceLocale: AppLocale; studies: CaseStudy[]}) {
  const copy = STUDIO_COPY[locale];
  return <div className={styles.innerPage} data-simple-page="case-studies">
    <header className={`${styles.frame} ${styles.innerHero} ${styles.caseIndexHero}`}>
      <div><span className={styles.innerEyebrow}>{copy.nav.work}</span><h1>{copy.work.title}</h1><p className={styles.innerLead}>{copy.work.intro}</p></div>
      <div className={styles.caseIndexIntro}><span>{studies.length.toString().padStart(2, '0')}</span><p>{copy.nav.work}</p></div>
    </header>
    <div className={styles.caseIndexList}>{studies.map((study, index) => {
      const challenge = study.problem || study.summary;
      const delivery = study.systemArchitecture || study.summary;
      const duplicatedStory = challenge.trim() === delivery.trim();
      return <article className={`${styles.frame} ${styles.caseIndexItem}`} key={study.slug}>
      <div className={styles.caseIndexMedia}><Image src={study.assets.coverImage} alt={study.assets.coverAlt || study.title} fill sizes="(min-width: 1024px) 680px, 100vw" unoptimized={isSanityCdnImage(study.assets.coverImage)} /></div>
      <div className={styles.caseIndexCopy}><div className={styles.caseIndexMeta}><span>{`0${index + 1}`} / {study.industry}</span>{(study.language ?? sourceLocale) !== locale && <span>{copy.work.english}</span>}</div>
        <h2>{study.clientName}</h2><h3>{study.title}</h3>
        <div className={styles.caseIndexFacts}><div><span>{duplicatedStory ? copy.work.scope : copy.work.challenge}</span><p>{challenge}</p></div>{!duplicatedStory && <div><span>{copy.work.delivery}</span><p>{delivery}</p></div>}{duplicatedStory && study.operationalModules.length > 0 && <div><span>{copy.work.delivery}</span><p>{study.operationalModules.slice(0, 3).join(' · ')}</p></div>}</div>
        <Link className={styles.textLink} href={`/case-studies/${study.slug}`} locale={study.language ?? sourceLocale}>{copy.work.open}<ArrowRight size={18} aria-hidden="true" /></Link>
      </div>
    </article>})}</div>
    <section className={`${styles.frame} ${styles.innerCta}`}><div><h2>{copy.contact.title}</h2><p>{copy.contact.description}</p></div><Link className={styles.primary} href="/contact">{copy.nav.action}<ArrowRight size={18} aria-hidden="true" /></Link></section>
  </div>;
}
