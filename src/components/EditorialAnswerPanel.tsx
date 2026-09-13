'use client';

import {useTranslations} from 'next-intl';
import type {EditorialContentFields} from '@/lib/editorial-taxonomy';
import styles from './EditorialAnswerPanel.module.css';

type AnswerContent = Pick<
  EditorialContentFields,
  | 'answerQuestion'
  | 'directAnswer'
  | 'keyTakeaways'
  | 'answerEvidence'
  | 'methodology'
  | 'limitations'
>;

type EditorialAnswerPanelProps = {
  editorial: AnswerContent;
};

export default function EditorialAnswerPanel({editorial}: EditorialAnswerPanelProps) {
  const t = useTranslations('ArticleUi');
  const hasAnswer = Boolean(editorial.directAnswer?.trim());
  const hasTakeaways = Boolean(editorial.keyTakeaways?.length);
  const hasEvidence = Boolean(editorial.answerEvidence?.length);
  const hasReviewDetail = Boolean(editorial.methodology?.trim() || editorial.limitations?.trim());

  if (!hasAnswer && !hasTakeaways && !hasEvidence && !hasReviewDetail) return null;

  return (
    <section className={styles.section} aria-labelledby="editorial-answer-title">
      <div className={`site-frame ${styles.frame}`}>
        <div className={styles.answer}>
          <p className={styles.eyebrow}>{t('directAnswer')}</p>
          <h2 id="editorial-answer-title">
            {editorial.answerQuestion?.trim() || t('directAnswer')}
          </h2>
          {editorial.directAnswer ? <p className={styles.response}>{editorial.directAnswer}</p> : null}
        </div>

        {editorial.keyTakeaways?.length ? (
          <div className={styles.takeaways}>
            <h3>{t('keyTakeaways')}</h3>
            <ul>
              {editorial.keyTakeaways.map((takeaway) => (
                <li key={takeaway}>{takeaway}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {editorial.answerEvidence?.length ? (
          <div className={styles.evidence}>
            <h3>{t('sources')}</h3>
            <ul>
              {editorial.answerEvidence.map((source) => (
                <li key={`${source.url}:${source.label}`}>
                  <a href={source.url}>{source.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {editorial.methodology || editorial.limitations ? (
          <div className={styles.reviewDetail}>
            {editorial.methodology ? (
              <div>
                <h3>{t('methodology')}</h3>
                <p>{editorial.methodology}</p>
              </div>
            ) : null}
            {editorial.limitations ? (
              <div>
                <h3>{t('limitations')}</h3>
                <p>{editorial.limitations}</p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
