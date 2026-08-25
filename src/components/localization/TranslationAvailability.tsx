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
  const stableRoutes = useMemo(
    () => ({
      ...(routes.en ? {en: routes.en} : {}),
      ...(routes.fr ? {fr: routes.fr} : {}),
      ...(routes.es ? {es: routes.es} : {}),
      ...(routes.ar ? {ar: routes.ar} : {}),
    }),
    [routes.en, routes.fr, routes.es, routes.ar],
  );

  useEffect(() => {
    if (!setRoutes) return;
    setRoutes(stableRoutes);
    return () => setRoutes({});
  }, [setRoutes, stableRoutes]);

  return null;
}

export function useTranslationRoutes(): TranslationRoutes {
  return useContext(TranslationContext)?.routes ?? {};
}
