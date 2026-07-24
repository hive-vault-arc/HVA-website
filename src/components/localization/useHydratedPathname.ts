'use client';

import {useSyncExternalStore} from 'react';
import {usePathname} from '@/i18n/navigation';

const subscribeToHydration = () => () => {};

/**
 * Keeps route-dependent attributes deterministic during hydration.
 *
 * next-intl's live pathname can briefly reflect the previous route while a new
 * server response hydrates. Returning `null` for both SSR and the first client
 * snapshot prevents stale active states and locale links from being reconciled
 * against the new page. The live pathname is exposed immediately afterward.
 */
export function useHydratedPathname(): string | null {
  const pathname = usePathname();
  const hasHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );

  return hasHydrated ? pathname : null;
}
