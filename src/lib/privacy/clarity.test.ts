import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {CONSENT_COOKIE_NAME, createConsentPreferences, writeConsentCookie} from './consent';

const sdk = vi.hoisted(() => ({init: vi.fn(), consentV2: vi.fn(), consent: vi.fn()}));
vi.mock('@microsoft/clarity', () => ({default: sdk}));

beforeEach(() => { vi.resetModules(); vi.clearAllMocks(); });
afterEach(() => {
  for (const name of [CONSENT_COOKIE_NAME, '_clck', '_clsk']) {
    document.cookie = `${name}=; Path=/; Max-Age=0`;
  }
});

describe('Clarity consent boundary', () => {
  it('never initializes without explicit consent', async () => {
    const {enableClarity} = await import('./clarity');
    await enableClarity('test-project');
    expect(sdk.init).not.toHaveBeenCalled();
  });

  it('initializes once and grants analytics only', async () => {
    writeConsentCookie(createConsentPreferences(true));
    const {enableClarity} = await import('./clarity');
    await enableClarity('test-project');
    await enableClarity('test-project');
    expect(sdk.init).toHaveBeenCalledTimes(1);
    expect(sdk.consentV2).toHaveBeenLastCalledWith({ad_Storage: 'denied', analytics_Storage: 'granted'});
  });

  it('cancels initialization if consent is withdrawn during import', async () => {
    writeConsentCookie(createConsentPreferences(true));
    const {enableClarity, revokeClarity} = await import('./clarity');
    const pending = enableClarity('test-project');
    writeConsentCookie(createConsentPreferences(false));
    revokeClarity();
    await pending;
    expect(sdk.init).not.toHaveBeenCalled();
  });

  it('cancels initialization when the component unmounts', async () => {
    writeConsentCookie(createConsentPreferences(true));
    const {enableClarity} = await import('./clarity');
    const controller = new AbortController();
    const pending = enableClarity('test-project', controller.signal);
    controller.abort();
    await pending;
    expect(sdk.init).not.toHaveBeenCalled();
  });

  it('denies both storage categories and deletes only Clarity cookies on withdrawal', async () => {
    writeConsentCookie(createConsentPreferences(true));
    const {enableClarity, revokeClarity} = await import('./clarity');
    await enableClarity('test-project');
    document.cookie = '_clck=test; Path=/';
    document.cookie = '_clsk=test; Path=/';
    writeConsentCookie(createConsentPreferences(false));
    revokeClarity();
    expect(sdk.consentV2).toHaveBeenLastCalledWith({ad_Storage: 'denied', analytics_Storage: 'denied'});
    expect(sdk.consent).toHaveBeenCalledWith(false);
    expect(document.cookie).not.toContain('_clck=');
    expect(document.cookie).not.toContain('_clsk=');
    expect(document.cookie).toContain(`${CONSENT_COOKIE_NAME}=`);
  });

  it('does not admit localhost or preview hostnames to production tracking', async () => {
    const {isClarityHostAllowed} = await import('./clarity');
    expect(isClarityHostAllowed('hivevaultarc.com')).toBe(true);
    expect(isClarityHostAllowed('www.hivevaultarc.com')).toBe(true);
    for (const hostname of ['localhost', '127.0.0.1', 'hive-vault-arc-website.vercel.app', 'hivevaultarc.com.example.com']) {
      expect(isClarityHostAllowed(hostname)).toBe(false);
    }
  });
});
