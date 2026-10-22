'use client';

import {Suspense, useEffect, useId, useRef, useState} from 'react';
import type {MouseEventHandler} from 'react';
import Logo from '@/components/Logo';
import {Link, usePathname} from '@/i18n/navigation';
import LocaleSwitcher from '@/components/localization/LocaleSwitcher';
import {ArrowRight, Menu, X} from '@/components/icons';
import styles from './studio.module.css';

type NavigationLink = {href: '/capabilities' | '/case-studies' | '/aboutus' | '/insights' | '/contact'; label: string};

interface StudioNavigationProps {
  links: readonly NavigationLink[];
  action: NavigationLink;
  menuLabel: string;
  closeLabel: string;
}

export default function StudioNavigation({links, action, menuLabel, closeLabel}: StudioNavigationProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const desktopLinksRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const update = () => { header.dataset.scrolled = String(window.scrollY > 24); };
    update();
    window.addEventListener('scroll', update, {passive: true});
    return () => window.removeEventListener('scroll', update);
  }, []);

  const handleHomeClick: MouseEventHandler<HTMLAnchorElement> = event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    setOpen(false);
    if (new URL(event.currentTarget.href).pathname !== window.location.pathname) return;
    event.preventDefault();
    window.history.replaceState(window.history.state, '', event.currentTarget.href);
    window.scrollTo({top: 0, behavior: 'instant'});
  };

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector('a')?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onResize = () => {
      if (desktopLinksRef.current && getComputedStyle(desktopLinksRef.current).display !== 'none') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <header className={styles.header} ref={headerRef} data-site-navigation>
      <nav className={`${styles.frame} ${styles.navigation}`} aria-label={menuLabel}>
        <div className={styles.navLogo} data-navigation-logo><Logo kind="wordmark" onClick={handleHomeClick} /></div>
        <div className={styles.desktopLinks} ref={desktopLinksRef} data-navigation-links>{links.map(({href, label}) => <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined}>{label}</Link>)}</div>
        <div className={styles.navActions}>
          <Link className={`${styles.primary} ${styles.navCta}`} href={action.href} data-navigation-action>{action.label}<ArrowRight size={18} aria-hidden="true" /></Link>
          <div className={styles.headerLocale}><Suspense><LocaleSwitcher /></Suspense></div>
          <button ref={triggerRef} className={styles.menuButton} aria-label={open ? closeLabel : menuLabel} aria-expanded={open} aria-controls={open ? menuId : undefined} data-navigation-toggle onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
      {open && <div ref={panelRef} id={menuId} className={styles.mobileLinks} data-navigation-panel>
        {links.map(({href, label}) => <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</Link>)}
        <Link className={styles.primary} href={action.href} onClick={() => setOpen(false)}>{action.label}<ArrowRight size={18} aria-hidden="true" /></Link>
        <div className={styles.mobileLocale}><Suspense><LocaleSwitcher mobile /></Suspense></div>
      </div>}
    </header>
  );
}
