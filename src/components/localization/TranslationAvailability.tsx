'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type {AppLocale} from '@/i18n/config';

export type TranslationRoutes = Partial<Record<AppLocale, string>>;

type TranslationContextValue = {
  routes: TranslationRoutes;
  setRoutes: (routes: TranslationRoutes) => void;
};

const TranslationContext = createContext<TranslationContextValue | null>(null);

export function TranslationAvailabilityProvider({children}: {children: ReactNode}) {
  const [routes, setRoutes] = useState<TranslationRoutes>({});
  const value = useMemo(() => ({routes, setRoutes}), [routes]);

  return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
}

export function TranslationTargets({routes}: {routes: TranslationRoutes}) {
  const setRoutes = useContext(TranslationContext)?.setRoutes;
  const serializedRoutes = JSON.stringify(routes);

  useEffect(() => {
    if (!setRoutes) return;
    setRoutes(JSON.parse(serializedRoutes) as TranslationRoutes);
    return () => setRoutes({});
  }, [serializedRoutes, setRoutes]);

  return null;
}

export function useTranslationRoutes(): TranslationRoutes {
  return useContext(TranslationContext)?.routes ?? {};
}
