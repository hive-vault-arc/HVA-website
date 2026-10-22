import Logo from '@/components/Logo';
import CookieSettingsButton from '@/components/privacy/CookieSettingsButton';
import {Link} from '@/i18n/navigation';
import {CONTACT_EMAIL} from '@/lib/seo';
import type {StudioCopy} from '@/data/studio-home';
import styles from './studio.module.css';

export default function StudioFooter({copy}: {copy: StudioCopy}) {
  return <footer className={styles.footer}>
    <div className={`${styles.frame} ${styles.footerTop}`}>
      <div className={styles.footerBrand}><Logo kind="wordmark" light /><p>{copy.footer.tagline}</p></div>
      <nav aria-label={copy.nav.contact}>
        <Link href="/capabilities">{copy.nav.services}</Link><Link href="/case-studies">{copy.nav.work}</Link><Link href="/aboutus">{copy.nav.about}</Link><Link href="/insights">{copy.nav.insights}</Link><Link href="/contact">{copy.nav.contact}</Link>
      </nav>
    </div>
    <div className={`${styles.frame} ${styles.footerBottom}`}>
      <p>© {new Date().getFullYear()} {copy.footer.copyright}</p>
      <div><Link href="/privacy-policy">{copy.footer.privacy}</Link><Link href="/cookie-policy">{copy.footer.cookies}</Link><Link href="/mentions-legales">{copy.footer.legal}</Link><CookieSettingsButton /><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></div>
    </div>
  </footer>;
}
