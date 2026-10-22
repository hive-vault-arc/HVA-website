import type {CSSProperties} from 'react';
import styles from './studio.module.css';

const signals = [
  {y: 39, line: 'M48 39H188M226 39H445', detail: 'M48 51H143M226 51H338', gap: 'M195 25V53M219 25V53M195 25H219M195 53H219M202 45L212 33', travel: 140},
  {y: 110, line: 'M48 110H270M308 110H445', detail: 'M48 122H188M308 122H382', gap: 'M277 96V124M301 96V124M277 96H301M277 124H301M284 116L294 104', travel: 222},
  {y: 181, line: 'M48 181H122M160 181H445', detail: 'M48 193H90M160 193H334', gap: 'M129 167V195M153 167V195M129 167H153M129 195H153M136 187L146 175', travel: 74},
] as const;

export default function StudioChallengeVisual() {
  return <div className={styles.challengeVisual} aria-hidden="true">
    <svg viewBox="0 0 480 220" fill="none" role="presentation" focusable="false">
      <path className={styles.challengeGuide} d="M20 74H460M20 146H460" />
      {signals.map((signal, index) => <g key={signal.y} className={styles.challengeSignal} data-challenge-signal data-active={index === 0 ? 'true' : undefined}>
        <path className={styles.challengeLane} d={signal.line} />
        <path className={styles.challengeLaneDetail} d={signal.detail} />
        <rect className={styles.challengeStart} x="22" y={signal.y - 10} width="18" height="20" />
        <rect className={styles.challengeEnd} x="445" y={signal.y - 10} width="18" height="20" />
        <path className={styles.challengeGap} d={signal.gap} />
        <rect className={styles.challengePacket} x="48" y={signal.y - 4} width="12" height="8" style={{'--challenge-travel': `${signal.travel}px`} as CSSProperties} />
      </g>)}
    </svg>
  </div>;
}
