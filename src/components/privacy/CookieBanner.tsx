'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {useCookieConsent} from './CookieConsentProvider';

export default function CookieBanner() {
  const t = useTranslations('CookieConsent');
  const {isReady, preferences, acceptAnalytics, rejectOptional, openSettings} = useCookieConsent();

  if (!isReady || preferences) return null;

  return (
    <section className="cookie-consent-banner" role="region" aria-label={t('banner.title')}>
      <div className="cookie-consent-banner__copy">
        <h2>{t('banner.title')}</h2>
        <p>{t('banner.body')}</p>
        <p className="cookie-consent-banner__details">
          <Link href="/privacy-policy">{t('links.privacy')}</Link>
          <span aria-hidden="true">·</span>
          <Link href="/cookie-policy">{t('links.cookiePolicy')}</Link>
        </p>
      </div>
      <div className="cookie-consent-banner__actions">
        <button type="button" className="cookie-consent-button cookie-consent-button--primary" onClick={rejectOptional}>
          {t('actions.reject')}
        </button>
        <button type="button" className="cookie-consent-button cookie-consent-button--secondary" onClick={openSettings}>
          {t('actions.customize')}
        </button>
        <button type="button" className="cookie-consent-button cookie-consent-button--primary" onClick={acceptAnalytics}>
          {t('actions.accept')}
        </button>
      </div>
    </section>
  );
}
