type GoogleConsentSettings = {
  ad_storage: 'denied';
  ad_user_data: 'denied';
  ad_personalization: 'denied';
  analytics_storage: 'denied' | 'granted';
};

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

const deniedConsent: GoogleConsentSettings = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
};

export function queueGoogleAnalyticsConsent(analyticsGranted: boolean): void {
  if (typeof window === 'undefined') return;

  window.dataLayer ??= [];
  window.gtag ??= (...args: unknown[]) => window.dataLayer?.push(args);
  window.gtag('set', {
    allow_ad_personalization_signals: false,
    allow_google_signals: false,
  });
  window.gtag('consent', 'default', deniedConsent);

  if (analyticsGranted) {
    window.gtag('consent', 'update', {
      ...deniedConsent,
      analytics_storage: 'granted',
    } satisfies GoogleConsentSettings);
  }
}

function expireCookie(name: string, domain?: string): void {
  document.cookie = [
    `${name}=`,
    'Path=/',
    'Max-Age=0',
    'SameSite=Lax',
    domain ? `Domain=${domain}` : '',
  ].filter(Boolean).join('; ');
}

export function clearGoogleAnalyticsCookies(): void {
  if (typeof document === 'undefined') return;

  const cookieNames = document.cookie
    .split(/;\s*/)
    .map((cookie) => cookie.split('=', 1)[0])
    .filter((name) => name === '_ga' || name.startsWith('_ga_'));

  const hostname = window.location.hostname;
  const domains = [undefined, hostname];
  if (hostname.endsWith('.hivevaultarc.com')) domains.push('.hivevaultarc.com');

  for (const name of cookieNames) {
    for (const domain of domains) expireCookie(name, domain);
  }
}
