'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {GoogleAnalytics} from '@next/third-parties/google';
import {
  createConsentPreferences,
  readConsentCookie,
  writeConsentCookie,
  type ConsentPreferences,
} from '@/lib/privacy/consent';
import {revokeClarity} from '@/lib/privacy/clarity';
import {clearGoogleAnalyticsCookies, queueGoogleAnalyticsConsent} from '@/lib/privacy/google-analytics';

type CookieConsentContextValue = {
  isReady: boolean;
  isSettingsOpen: boolean;
  preferences: ConsentPreferences | null;
  acceptAnalytics: () => void;
  rejectOptional: () => void;
  savePreferences: (analytics: boolean) => Promise<void>;
  openSettings: () => void;
  closeSettings: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

type CookieConsentProviderProps = {
  analyticsMeasurementId?: string;
  children: ReactNode;
};

export function CookieConsentProvider({analyticsMeasurementId, children}: CookieConsentProviderProps) {
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGoogleAnalyticsReady, setIsGoogleAnalyticsReady] = useState(false);
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    const storedPreferences = readConsentCookie();
    if (analyticsMeasurementId) {
      queueGoogleAnalyticsConsent(storedPreferences?.analytics === true);
      setIsGoogleAnalyticsReady(storedPreferences?.analytics === true);
    }
    setPreferences(storedPreferences);
    setIsReady(true);
  }, [analyticsMeasurementId]);

  useEffect(() => {
    const refresh = () => {
      const next = readConsentCookie();
      if (preferences?.analytics === true && next?.analytics !== true) {
        try {
          revokeClarity();
          clearGoogleAnalyticsCookies();
        } finally {
          window.location.reload();
        }
      } else if (next?.decidedAt !== preferences?.decidedAt) {
        if (analyticsMeasurementId) {
          queueGoogleAnalyticsConsent(next?.analytics === true);
          setIsGoogleAnalyticsReady(next?.analytics === true);
        }
        setPreferences(next);
      }
    };
    const channel = typeof BroadcastChannel === 'function'
      ? new BroadcastChannel('hva-cookie-preferences') : null;
    channelRef.current = channel;
    if (channel) channel.onmessage = refresh;
    window.addEventListener('focus', refresh);
    const interval = window.setInterval(refresh, 60_000);
    return () => {
      channel?.close();
      channelRef.current = null;
      window.removeEventListener('focus', refresh);
      window.clearInterval(interval);
    };
  }, [analyticsMeasurementId, preferences?.analytics, preferences?.decidedAt]);

  const savePreferences = useCallback(async (analytics: boolean) => {
    const previous = readConsentCookie();
    const next = createConsentPreferences(analytics);

    writeConsentCookie(next);
    channelRef.current?.postMessage('changed');
    if (analyticsMeasurementId) {
      queueGoogleAnalyticsConsent(analytics);
      setIsGoogleAnalyticsReady(analytics);
    }
    setPreferences(next);
    setIsSettingsOpen(false);

    if (previous?.analytics === true && analytics === false) {
      try {
        revokeClarity();
        clearGoogleAnalyticsCookies();
      } finally {
        // Unload the recorder rather than leaving it running in cookieless mode.
        window.location.reload();
      }
    }
  }, [analyticsMeasurementId]);

  const value = useMemo<CookieConsentContextValue>(() => ({
    isReady,
    isSettingsOpen,
    preferences,
    acceptAnalytics: () => void savePreferences(true),
    rejectOptional: () => void savePreferences(false),
    savePreferences,
    openSettings: () => setIsSettingsOpen(true),
    closeSettings: () => setIsSettingsOpen(false),
  }), [isReady, isSettingsOpen, preferences, savePreferences]);

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      {isGoogleAnalyticsReady && analyticsMeasurementId ? <GoogleAnalytics gaId={analyticsMeasurementId} /> : null}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent(): CookieConsentContextValue {
  const value = useContext(CookieConsentContext);
  if (!value) throw new Error('useCookieConsent must be used inside CookieConsentProvider');
  return value;
}
