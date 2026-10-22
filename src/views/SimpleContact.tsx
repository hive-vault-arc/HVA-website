import {Link} from '@/i18n/navigation';
import {ArrowRight} from '@/components/icons';
import StudioContactForm from '@/components/studio/StudioContactForm';
import type {AppLocale} from '@/i18n/config';
import {CONTACT_EMAIL, CONTACT_PHONES} from '@/lib/seo';
import {STUDIO_COPY} from '@/data/studio-home';
import styles from '@/components/studio/studio.module.css';

export default function SimpleContact({locale}: {locale: AppLocale}) {
  const copy = STUDIO_COPY[locale];
  return <div className={styles.innerPage} data-simple-page="contact">
    <section className={`${styles.frame} ${styles.contactPageGrid}`} aria-labelledby="contact-page-title">
      <div className={styles.contactPageIntro}><div className={styles.contactPageHeading}><span className={styles.innerEyebrow}>{copy.nav.contact}</span><h1 id="contact-page-title">{copy.contact.title}</h1><p className={styles.innerLead}>{copy.contact.description}</p></div>
        <div className={styles.contactPageSteps}><h2>{copy.contact.note}</h2><ol>{copy.contact.topics.map((topic, index) => <li key={topic}><span>0{index + 1}</span>{topic}</li>)}</ol></div>
        <div className={styles.contactPageDetails}><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}<ArrowRight size={18} aria-hidden="true" /></a>{CONTACT_PHONES.map(phone => <a key={phone.e164} href={`tel:${phone.e164}`}>{phone.display}<ArrowRight size={18} aria-hidden="true" /></a>)}</div>
      </div>
      <div className={styles.contactPageForm}><StudioContactForm copy={copy.contact} locale={locale} /></div>
    </section>
    <section className={`${styles.frame} ${styles.innerCta}`}><div><h2>{copy.work.title}</h2><p>{copy.work.intro}</p></div><Link className={styles.primary} href="/case-studies">{copy.nav.work}<ArrowRight size={18} aria-hidden="true" /></Link></section>
  </div>;
}
