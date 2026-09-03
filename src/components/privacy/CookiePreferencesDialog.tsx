'use client';

import {useEffect, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {X} from '@/components/icons';
import {useCookieConsent} from './CookieConsentProvider';

export default function CookiePreferencesDialog() {
  const t = useTranslations('CookieConsent');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const {isSettingsOpen, preferences, closeSettings, savePreferences} = useCookieConsent();
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    if (isSettingsOpen) setAnalytics(preferences?.analytics ?? false);
  }, [isSettingsOpen, preferences?.analytics]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isSettingsOpen && !dialog.open) dialog.showModal();
    if (!isSettingsOpen && dialog.open) dialog.close();
  }, [isSettingsOpen]);

  useEffect(() => {
    if (!isSettingsOpen) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => { document.documentElement.style.overflow = previousOverflow; };
  }, [isSettingsOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="cookie-preferences-dialog"
      aria-labelledby="cookie-preferences-title"
      onClose={closeSettings}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        const controls = event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input:not(:disabled)');
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
    >
      <form
        className="cookie-preferences-dialog__content"
        onSubmit={(event) => {
          event.preventDefault();
          void savePreferences(analytics);
        }}
      >
        <header className="cookie-preferences-dialog__header">
          <div>
            <h2 id="cookie-preferences-title">{t('dialog.title')}</h2>
            <p>{t('dialog.intro')}</p>
          </div>
          <button type="button" className="cookie-preferences-dialog__close" onClick={closeSettings} aria-label={t('dialog.close')}>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <div className="cookie-preferences-dialog__choices">
          <section className="cookie-choice" aria-labelledby="cookie-necessary-title">
            <div>
              <h3 id="cookie-necessary-title">{t('dialog.necessary.title')}</h3>
              <p>{t('dialog.necessary.description')}</p>
            </div>
            <label className="cookie-toggle">
              <input type="checkbox" checked disabled aria-label={t('dialog.necessary.title')} />
              <span aria-hidden="true" />
              <strong>{t('dialog.necessary.alwaysOn')}</strong>
            </label>
          </section>

          <section className="cookie-choice" aria-labelledby="cookie-analytics-title">
            <div>
              <h3 id="cookie-analytics-title">{t('dialog.analytics.title')}</h3>
              <p>{t('dialog.analytics.description')}</p>
              <p className="cookie-choice__vendor">{t('dialog.analytics.vendor')}</p>
            </div>
            <label className="cookie-toggle">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
                aria-label={t('dialog.analytics.title')}
              />
              <span aria-hidden="true" />
              <strong>{analytics ? t('dialog.analytics.enabled') : t('dialog.analytics.disabled')}</strong>
            </label>
          </section>
        </div>

        <footer className="cookie-preferences-dialog__footer">
          <p>
            <Link href="/privacy-policy" onClick={closeSettings}>{t('links.privacy')}</Link>
            <span aria-hidden="true"> · </span>
            <Link href="/cookie-policy" onClick={closeSettings}>{t('links.cookiePolicy')}</Link>
          </p>
          <div>
            <button type="button" className="cookie-consent-button cookie-consent-button--secondary" onClick={closeSettings}>
              {t('dialog.cancel')}
            </button>
            <button type="submit" className="cookie-consent-button cookie-consent-button--primary">
              {t('dialog.save')}
            </button>
          </div>
        </footer>
      </form>
    </dialog>
  );
}
