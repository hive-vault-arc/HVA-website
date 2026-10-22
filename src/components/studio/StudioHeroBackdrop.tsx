'use client';

import {useId} from 'react';
import styles from './studio.module.css';

export default function StudioHeroBackdrop({core = false}: {core?: boolean}) {
  const id = useId();

  return <div className={core ? styles.heroCoreBackdrop : styles.heroBackdrop} aria-hidden="true">
    <svg viewBox="0 0 1600 640" preserveAspectRatio="xMidYMid slice" focusable="false">
      <defs>
        <linearGradient id={`${id}-amber`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--color-primary)" stopOpacity=".12" />
          <stop offset=".48" stopColor="var(--color-primary)" stopOpacity=".28" />
          <stop offset="1" stopColor="var(--color-primary)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-navy`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--surface)" stopOpacity=".22" />
          <stop offset=".48" stopColor="var(--surface)" stopOpacity=".07" />
          <stop offset="1" stopColor="var(--surface)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-light`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--surface)" stopOpacity=".12" />
          <stop offset="1" stopColor="var(--surface)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className={styles.heroWave}>
        <path d="M-300 470C-40 580 120 130 420 155S790 635 1120 335 1510-65 1900 95V960H-300Z" fill={`url(#${id}-amber)`} stroke="var(--color-primary)" strokeOpacity=".35" strokeWidth="3" />
      </g>
      <g className={`${styles.heroWave} ${styles.heroWaveNavy}`}>
        <path d="M-300 710C10 690 160 550 390 530S820-100 1160 90 1460 450 1900 315V960H-300Z" fill={`url(#${id}-navy)`} stroke="var(--surface)" strokeOpacity=".2" strokeWidth="2.5" />
      </g>
      <g className={`${styles.heroWave} ${styles.heroWaveLight}`}>
        <path d="M-300 595C110 280 390 680 700 535S1170 80 1470 360 1700 440 1900 380V960H-300Z" fill={`url(#${id}-light)`} />
      </g>
    </svg>
  </div>;
}
