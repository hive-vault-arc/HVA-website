import Image from 'next/image';
import {Link} from '@/i18n/navigation';
import {ArrowRight} from '@/components/icons';
import type {StudioCopy} from '@/data/studio-home';
import type {InsightListingItem} from '@/lib/insight-pagination';
import {isSanityCdnImage} from '@/lib/image-delivery';
import StudioCaseStudyRail from './StudioCaseStudyRail';
import styles from './studio.module.css';

export default function StudioInsights({copy, items, locale}: {copy: StudioCopy['insights']; items: InsightListingItem[]; locale: string}) {
  if (!items.length) return null;
  return <section className={`${styles.frame} ${styles.section} ${styles.insightsSection}`} aria-labelledby="studio-insights-title">
    <span className={styles.chapterNumber} aria-hidden="true">06 /</span>
    <StudioCaseStudyRail kind="insights" titleId="studio-insights-title" title={copy.title} intro={copy.intro} previousLabel={copy.previous} nextLabel={copy.next} count={items.length}>
      {items.map((item, index) => <li className={styles.caseSlide} key={item.id}>
        <Link className={`${styles.caseCard} ${styles.insightCard}`} href={item.href} locale={item.sourceLocale} aria-label={item.title}>
          <div className={styles.insightTop}>
            <span className={styles.insightIndex} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <div className={styles.insightMeta}><span>{item.tag}</span>{item.sourceLocale !== locale && <span>{copy.fallback}</span>}</div>
          </div>
          {item.image && <div className={styles.insightMedia}><Image src={item.image} alt="" fill sizes="(min-width: 960px) 448px, (min-width: 640px) 44vw, 85vw" unoptimized={isSanityCdnImage(item.image)} /></div>}
          <div className={styles.insightCaption}>
            <h3>{item.title}</h3>
            <div className={styles.insightFoot}>
              <p>{item.excerpt}</p>
              {item.coverDisclosure && <small className={styles.insightDisclosure}>{item.coverDisclosure}</small>}
              <span className={styles.insightArrow} aria-hidden="true"><ArrowRight size={18} /></span>
            </div>
          </div>
        </Link>
      </li>)}
    </StudioCaseStudyRail>
    <Link className={styles.textLink} href="/insights">{copy.action}<ArrowRight size={18} aria-hidden="true" /></Link>
  </section>;
}
