import {beforeEach, describe, expect, it} from 'vitest';
import {clearGoogleAnalyticsCookies, queueGoogleAnalyticsConsent} from './google-analytics';

describe('Google Analytics consent boundary', () => {
  beforeEach(() => {
    delete window.gtag;
    delete window.dataLayer;
    for (const name of ['_ga', '_ga_TEST', 'unrelated_cookie']) {
      document.cookie = `${name}=; Path=/; Max-Age=0`;
    }
  });

  it('queues denied defaults before granting only analytics storage', () => {
    queueGoogleAnalyticsConsent(true);

    expect(window.dataLayer).toEqual([
      ['set', {
        allow_ad_personalization_signals: false,
        allow_google_signals: false,
      }],
      ['consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
      }],
      ['consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'granted',
      }],
    ]);
  });

  it('keeps analytics storage denied when optional analytics are rejected', () => {
    queueGoogleAnalyticsConsent(false);

    expect(window.dataLayer).toHaveLength(2);
    expect(window.dataLayer?.[1]?.[2]).toMatchObject({analytics_storage: 'denied'});
  });

  it('clears only GA cookies after withdrawal', () => {
    document.cookie = '_ga=visitor; Path=/';
    document.cookie = '_ga_TEST=session; Path=/';
    document.cookie = 'unrelated_cookie=keep; Path=/';

    clearGoogleAnalyticsCookies();

    expect(document.cookie).not.toContain('_ga=');
    expect(document.cookie).not.toContain('_ga_TEST=');
    expect(document.cookie).toContain('unrelated_cookie=keep');
  });
});
