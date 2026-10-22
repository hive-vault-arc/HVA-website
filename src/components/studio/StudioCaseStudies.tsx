import Image from 'next/image';
import {Link} from '@/i18n/navigation';
import {ArrowRight} from '@/components/icons';
import type {StudioCopy} from '@/data/studio-home';
import type {CaseStudyShowcaseSummary} from '@/lib/proof';
import type {AppLocale} from '@/i18n/config';
import {isSanityCdnImage} from '@/lib/image-delivery';
import StudioCaseStudyRail from './StudioCaseStudyRail';
import styles from './studio.module.css';

interface StudioCaseStudiesProps {
  copy: StudioCopy['work'];
  caseStudies: CaseStudyShowcaseSummary[];
  locale: AppLocale;
}

function previewSentence(text: string, locale: AppLocale): string {
  const segment = new Intl.Segmenter(locale, {granularity: 'sentence'}).segment(text)[Symbol.iterator]().next().value?.segment;
  return (segment || text).trim();
}

function previewWords(text: string, locale: AppLocale, limit: number): string {
  const sentence = previewSentence(text, locale);
  const words = sentence.split(/\s+/);
  return words.length > limit ? `${words.slice(0, limit).join(' ').replace(/[,.،؛:]+$/, '')}…` : sentence;
}

export default function StudioCaseStudies({copy, caseStudies, locale}: StudioCaseStudiesProps) {
  const projects = caseStudies.slice(0, 3);
  return <section id="work" className={`${styles.frame} ${styles.caseSection}`} aria-labelledby="studio-work-title">
    <span className={styles.chapterNumber} aria-hidden="true">03 /</span>
    {projects.length ? <StudioCaseStudyRail title={copy.title} intro={copy.intro} previousLabel={copy.previous} nextLabel={copy.next} count={projects.length}>
      {projects.map((study, index) => <li key={study.slug} className={styles.caseSlide}>
        <Link className={styles.caseCard} href={`/case-studies/${study.slug}`} locale={study.sourceLocale || locale} aria-label={`${copy.open}: ${study.title}`}>
          <div className={styles.caseMedia}><Image src={study.assets.coverImage} alt={study.assets.coverAlt || study.title} fill
            sizes="(min-width: 1200px) 40vw, (min-width: 640px) 48vw, 84vw" unoptimized={isSanityCdnImage(study.assets.coverImage)} /></div>
          <div className={styles.caseCaption}>
            <bdi className={styles.caseIndex} dir="ltr" aria-hidden="true">{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</bdi>
            <div className={styles.caseStory}>
              <span className={styles.caseClient}>{study.clientName} <span aria-hidden="true">/</span> {study.industry}</span>
              <h3>{study.title}</h3>
              {(study.problem || study.summary) && <div className={styles.caseNarrative}>
                {study.problem && <div><span className={styles.caseNarrativeLabel}>{copy.challenge}</span><p lang={study.sourceLocale || locale} dir="auto">{previewWords(study.problem, study.sourceLocale || locale, 16)}</p></div>}
                {study.summary && <div><span className={styles.caseNarrativeLabel}>{copy.delivery}</span><p lang={study.sourceLocale || locale} dir="auto">{previewWords(study.summary, study.sourceLocale || locale, 18)}</p></div>}
              </div>}
              {study.sourceLocale && study.sourceLocale !== locale && <p className={styles.caseFallbackNote}>{copy.english}</p>}
            </div>
            <span className={styles.caseOpen}>{copy.open}<span className={styles.caseArrow} aria-hidden="true"><ArrowRight size={20} /></span></span>
          </div>
        </Link>
      </li>)}
    </StudioCaseStudyRail> : <>
      <div className={styles.caseHeading}><div><h2 id="studio-work-title">{copy.title}</h2><p className={styles.caseIntro}>{copy.intro}</p></div></div>
      <Link className={styles.secondary} href="/case-studies">{copy.empty}<ArrowRight size={18} aria-hidden="true" /></Link>
    </>}
  </section>;
}
