import {readConsentCookie} from './consent';

type ClaritySdk = (typeof import('@microsoft/clarity'))['default'];

let initialized = false;
let consentRevision = 0;
let sdk: ClaritySdk | undefined;
let sdkPromise: Promise<ClaritySdk> | undefined;

async function getClarity(): Promise<ClaritySdk> {
  sdkPromise ??= import('@microsoft/clarity').then((module) => {
    sdk = module.default;
    return sdk;
  }).catch((error: unknown) => {
    sdkPromise = undefined;
    throw error;
  });
  return sdkPromise;
}

export function isClarityHostAllowed(hostname: string): boolean {
  return hostname === 'hivevaultarc.com' || hostname === 'www.hivevaultarc.com';
}

export async function enableClarity(projectId: string, signal?: AbortSignal): Promise<void> {
  if (signal?.aborted || readConsentCookie()?.analytics !== true) return;

  const revision = consentRevision;
  const Clarity = await getClarity();
  // Consent can change while the SDK chunk is loading.
  if (signal?.aborted || revision !== consentRevision || readConsentCookie()?.analytics !== true) return;

  if (!initialized) {
    Clarity.init(projectId);
    initialized = true;
  }

  Clarity.consentV2({
    ad_Storage: 'denied',
    analytics_Storage: 'granted',
  });
}

export function revokeClarity(): void {
  consentRevision += 1;
  try {
    if (initialized && sdk) {
      sdk.consentV2({ad_Storage: 'denied', analytics_Storage: 'denied'});
      sdk.consent(false);
    }
  } finally {
    try { window.sessionStorage.removeItem('_cltk'); } catch { /* Storage may be disabled. */ }
    // Also clear cookies if an ad blocker prevented the remote SDK from loading.
    for (const name of ['_clck', '_clsk']) {
      for (const domain of ['', window.location.hostname, '.hivevaultarc.com']) {
        document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax${domain ? `; Domain=${domain}` : ''}`;
      }
    }
  }
}
