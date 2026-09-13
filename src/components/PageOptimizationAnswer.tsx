'use client';

import {usePathname} from 'next/navigation';
import EditorialAnswerPanel from '@/components/EditorialAnswerPanel';
import type {RoutedPageOptimization} from '@/lib/page-optimization';

type PageOptimizationAnswerProps = {
  optimizations: RoutedPageOptimization[];
};

function normalizePathname(pathname: string): string {
  if (pathname === '/') return pathname;
  return pathname.replace(/\/+$/, '');
}

export default function PageOptimizationAnswer({optimizations}: PageOptimizationAnswerProps) {
  const pathname = normalizePathname(usePathname());
  const optimization = optimizations.find(
    (candidate) => normalizePathname(candidate.pathname) === pathname,
  );

  return optimization ? <EditorialAnswerPanel editorial={optimization} /> : null;
}
