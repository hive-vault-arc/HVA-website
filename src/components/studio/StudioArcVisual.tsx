import styles from './studio.module.css';

const ARC_LETTERS = ['A', 'R', 'C'] as const;

export default function StudioArcVisual({phases}: {phases: string[]}) {
  return <div className={styles.arcVisual} aria-hidden="true">
    <div className={styles.arcVisualWord} dir="ltr">
      {ARC_LETTERS.map((letter, index) => <span key={letter} className={styles.arcVisualLetter} data-process-signal data-active={index === 0 ? 'true' : undefined}>{letter}</span>)}
    </div>
    <div className={styles.arcVisualNames} dir="ltr">
      {phases.map(phase => <span key={phase} dir="auto">{phase}</span>)}
    </div>
  </div>;
}
