'use client';

import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

const EMPLOYEE_HASHES = new Set(['khalid-chalhi', 'ali-amrani', 'oubay-ghamat']);
const RETRY_DELAYS = [80, 180, 360, 700, 1200] as const;

function revealEmployeeHashTarget(): boolean {
  const id = window.location.hash.slice(1);
  if (!EMPLOYEE_HASHES.has(id)) return false;

  const target = document.getElementById(id);
  if (!target) return false;

  const rect = target.getBoundingClientRect();
  const currentScroll =
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0;
  const top = Math.max(
    0,
    rect.top +
      currentScroll -
      Math.max(96, (window.innerHeight - rect.height) / 2),
  );

  window.scrollTo({top, behavior: 'auto'});
  return true;
}

export default function EmployeeHashScroller() {
  const pathname = usePathname();

  useEffect(() => {
    const timeoutIds: number[] = [];
    let nestedFrame = 0;

    const scheduleReveal = () => {
      revealEmployeeHashTarget();
      requestAnimationFrame(revealEmployeeHashTarget);
      requestAnimationFrame(() => {
        nestedFrame = requestAnimationFrame(revealEmployeeHashTarget);
      });

      RETRY_DELAYS.forEach((delay) => {
        timeoutIds.push(window.setTimeout(revealEmployeeHashTarget, delay));
      });
    };

    scheduleReveal();
    window.addEventListener('hashchange', scheduleReveal);
    window.addEventListener('pageshow', scheduleReveal);

    return () => {
      window.removeEventListener('hashchange', scheduleReveal);
      window.removeEventListener('pageshow', scheduleReveal);
      timeoutIds.forEach(window.clearTimeout);
      cancelAnimationFrame(nestedFrame);
    };
  }, [pathname]);

  return null;
}
