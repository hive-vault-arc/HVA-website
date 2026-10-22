'use client';

import type {ReactNode} from 'react';
import {usePathname} from '@/i18n/navigation';
import SiteMotion from '@/components/motion/SiteMotion';
import styles from './studio.module.css';

export default function RouteShell({children, afterContent, header, footer}: {
  children: ReactNode; afterContent?: ReactNode; header: ReactNode; footer: ReactNode;
}) {
  const isHome = usePathname() === '/';
  return <div className={`${styles.siteShell} ${isHome ? styles.shell : ''}`} data-simple-home={isHome ? 'true' : undefined}>
    {header}
    <SiteMotion>{children}{!isHome && afterContent}</SiteMotion>
    {footer}
  </div>;
}
