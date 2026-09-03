'use client';

import {useEffect} from 'react';
import {enableClarity, isClarityHostAllowed} from '@/lib/privacy/clarity';
import {useCookieConsent} from './CookieConsentProvider';

const projectId = process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_PROJECT_ID?.trim();
const isEnabled = process.env.NEXT_PUBLIC_ENABLE_MICROSOFT_CLARITY === 'true';

export default function MicrosoftClarity() {
  const {isReady, preferences} = useCookieConsent();

  useEffect(() => {
    if (!isEnabled || !projectId || !isReady || preferences?.analytics !== true ||
        !isClarityHostAllowed(window.location.hostname)) return;

    const controller = new AbortController();
    void enableClarity(projectId, controller.signal).catch((error: unknown) => {
      if (!controller.signal.aborted && process.env.NODE_ENV !== 'production') {
        console.error('Microsoft Clarity initialization failed', error);
      }
    });

    return () => {
      controller.abort();
    };
  }, [isReady, preferences?.analytics]);

  return null;
}
