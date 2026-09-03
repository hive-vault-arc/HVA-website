'use client';

import {useTranslations} from 'next-intl';
import {useCookieConsent} from './CookieConsentProvider';

export default function CookieSettingsButton() {
  const t = useTranslations('Footer');
  const {openSettings} = useCookieConsent();

  return (
    <button type="button" className="site-footer__legal-link site-footer__cookie-settings" onClick={openSettings}>
      {t('cookieSettings')}
    </button>
  );
}
