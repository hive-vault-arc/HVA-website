export const CONSENT_COOKIE_NAME = 'hva_consent_v1';
export const CONSENT_VERSION = 1 as const;
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

export type ConsentPreferences = {
  version: typeof CONSENT_VERSION;
  necessary: true;
  analytics: boolean;
  advertising: false;
  decidedAt: string;
};

export function createConsentPreferences(analytics: boolean): ConsentPreferences {
  return {
    version: CONSENT_VERSION,
    necessary: true,
    analytics,
    advertising: false,
    decidedAt: new Date().toISOString(),
  };
}

function isConsentPreferences(value: unknown): value is ConsentPreferences {
  if (typeof value !== 'object' || value === null) return false;

  const candidate = value as Partial<ConsentPreferences>;
  return (
    candidate.version === CONSENT_VERSION &&
    candidate.necessary === true &&
    typeof candidate.analytics === 'boolean' &&
    candidate.advertising === false &&
    typeof candidate.decidedAt === 'string' &&
    Number.isFinite(Date.parse(candidate.decidedAt)) &&
    Date.parse(candidate.decidedAt) <= Date.now() &&
    Date.now() - Date.parse(candidate.decidedAt) < CONSENT_MAX_AGE_SECONDS * 1000
  );
}

export function readConsentCookie(): ConsentPreferences | null {
  if (typeof document === 'undefined') return null;

  const encodedValue = document.cookie
    .split(/;\s*/)
    .find((part) => part.startsWith(`${CONSENT_COOKIE_NAME}=`))
    ?.slice(CONSENT_COOKIE_NAME.length + 1);

  if (!encodedValue) return null;

  try {
    const value: unknown = JSON.parse(decodeURIComponent(encodedValue));
    return isConsentPreferences(value) ? value : null;
  } catch {
    return null;
  }
}

export function writeConsentCookie(value: ConsentPreferences): void {
  if (typeof document === 'undefined') return;

  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = [
    `${CONSENT_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(value))}`,
    'Path=/',
    `Max-Age=${CONSENT_MAX_AGE_SECONDS}`,
    'SameSite=Lax',
  ].join('; ') + secure;
}
