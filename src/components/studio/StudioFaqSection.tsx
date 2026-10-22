import JsonLd from '@/components/JsonLd';
import type {FaqItem} from '@/data/faqs';
import styles from './studio.module.css';

export default function StudioFaqSection({heading, faqs}: {heading: string; faqs: FaqItem[]}) {
  if (!faqs.length) return null;
  return <section className={`${styles.frame} ${styles.section} ${styles.innerFaq}`} aria-labelledby="inner-faq-title">
    <JsonLd data={{'@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(item => ({'@type': 'Question', name: item.question, acceptedAnswer: {'@type': 'Answer', text: item.answer}}))}} />
    <div className={styles.innerFaqGrid}><h2 id="inner-faq-title">{heading}</h2><div className={styles.faqItems}>{faqs.map(item => <details key={item.question}><summary>{item.question}<span className={styles.faqToggle} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div></div>
  </section>;
}
