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
import {
  createConsentPreferences,
  readConsentCookie,
  writeConsentCookie,
  type ConsentPreferences,
} from '@/lib/privacy/consent';
import {revokeClarity} from '@/lib/privacy/clarity';

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

export function CookieConsentProvider({children}: {children: ReactNode}) {
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    setPreferences(readConsentCookie());
    setIsReady(true);
  }, []);

  useEffect(() => {
    const refresh = () => {
      const next = readConsentCookie();
      if (preferences?.analytics === true && next?.analytics !== true) {
        try { revokeClarity(); } finally { window.location.reload(); }
      } else if (next?.decidedAt !== preferences?.decidedAt) {
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
  }, [preferences?.analytics, preferences?.decidedAt]);

  const savePreferences = useCallback(async (analytics: boolean) => {
    const previous = readConsentCookie();
    const next = createConsentPreferences(analytics);

    writeConsentCookie(next);
    channelRef.current?.postMessage('changed');
    setPreferences(next);
    setIsSettingsOpen(false);

    if (previous?.analytics === true && analytics === false) {
      try {
        revokeClarity();
      } finally {
        // Unload the recorder rather than leaving it running in cookieless mode.
        window.location.reload();
      }
    }
  }, []);

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

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent(): CookieConsentContextValue {
  const value = useContext(CookieConsentContext);
  if (!value) throw new Error('useCookieConsent must be used inside CookieConsentProvider');
  return value;
}
