'use client';

import {useEffect, useRef, useState} from 'react';
import {TrustedPartnerLogo} from '@/components/TrustedByBar';
import type {HomeTrustedPartner} from '@/lib/home-hero';
import styles from './studio.module.css';

export default function StudioHeroLogos({partners}: {partners: HomeTrustedPartner[]}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pointerInside = useRef(false);
  const visible = useRef(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (partners.length < 2) return;
    const root = rootRef.current;
    if (!root) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver(entries => {
      visible.current = entries[0]?.isIntersecting ?? false;
    }, {threshold: .35});
    observer.observe(root);
    const interval = window.setInterval(() => {
      if (reducedMotion.matches || document.hidden || !visible.current || pointerInside.current || root.contains(document.activeElement)) return;
      setOffset(current => (current + 1) % partners.length);
    }, 8000);
    return () => {
      window.clearInterval(interval);
      observer.disconnect();
    };
  }, [partners.length]);

  const ordered = partners.map((_, index) => partners[(index + offset) % partners.length]);
  return <div ref={rootRef} className={styles.heroClientLogos} onPointerEnter={() => {pointerInside.current = true;}} onPointerLeave={() => {pointerInside.current = false;}}>
    {ordered.map(partner => {
      const className = `${styles.clientLogo} ${styles.heroClientLogo} ${partner.surface === 'dark' ? styles.darkClientLogo : ''}`;
      return <div className={styles.heroLogoSlot} key={`${partner.name}-${offset}`}><TrustedPartnerLogo partner={partner} caseStudyLabel={partner.logoAlt} className={className} sizes="(min-width: 768px) 140px, 30vw" eager /></div>;
    })}
  </div>;
}
