'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type DeferredMountProps = {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
  className?: string;
};

export default function DeferredMount({
  children,
  fallback = null,
  rootMargin = '240px 0px',
  threshold = 0,
  once = true,
  className,
}: DeferredMountProps) {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mounted && once) return;
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setMounted(true);
        if (once) observer.disconnect();
      },
      { rootMargin, threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [mounted, once, rootMargin, threshold]);

  return <div ref={ref} className={className}>{mounted ? children : fallback}</div>;
}
