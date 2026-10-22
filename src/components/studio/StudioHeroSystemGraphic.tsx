import styles from './studio.module.css';

export default function StudioHeroSystemGraphic({phases}: {phases: string[]}) {
  return <div className={styles.heroSystem} aria-hidden="true">
    <svg className={styles.heroSystemSvg} viewBox="0 0 520 360" fill="none" preserveAspectRatio="xMidYMid meet">
      <g className={styles.heroSystemEnergy}>
        <path className={styles.heroSystemEnergyGlow} d="M-40 78C48 45 86 172 164 150S267 104 342 190 460 325 560 250" />
        <path className={styles.heroSystemEnergyDots} d="M-40 78C48 45 86 172 164 150S267 104 342 190 460 325 560 250" />
      </g>
      <path className={styles.heroSystemGrid} d="M0 45.5H520M0 90.5H520M0 135.5H520M0 180.5H520M0 225.5H520M0 270.5H520M0 315.5H520M40.5 0V360M80.5 0V360M120.5 0V360M160.5 0V360M200.5 0V360M240.5 0V360M280.5 0V360M320.5 0V360M360.5 0V360M400.5 0V360M440.5 0V360M480.5 0V360" />
      <path className={styles.heroSystemBase} d="M0 90H52M468 90H520M0 180H52M468 180H520M0 270H52M468 270H520" />
      <path className={styles.heroSystemFlow} d="M0 90H52M468 90H520" pathLength="100" />
      <path className={`${styles.heroSystemFlow} ${styles.heroSystemFlowTwo}`} d="M0 180H52M468 180H520" pathLength="100" />
      <path className={`${styles.heroSystemFlow} ${styles.heroSystemFlowThree}`} d="M0 270H52M468 270H520" pathLength="100" />
      <rect className={styles.heroSystemPacket} x="0" y="86" width="14" height="8" />
      <rect className={`${styles.heroSystemPacket} ${styles.heroSystemPacketTwo}`} x="0" y="176" width="14" height="8" />
      <rect className={`${styles.heroSystemPacket} ${styles.heroSystemPacketThree}`} x="0" y="266" width="14" height="8" />
      <rect className={styles.heroSystemNode} x="16" y="78" width="24" height="24" />
      <rect className={styles.heroSystemNode} x="16" y="168" width="24" height="24" />
      <rect className={styles.heroSystemNode} x="16" y="258" width="24" height="24" />
      <rect className={styles.heroSystemOutput} x="480" y="78" width="24" height="24" />
      <rect className={styles.heroSystemOutput} x="480" y="168" width="24" height="24" />
      <rect className={styles.heroSystemOutput} x="480" y="258" width="24" height="24" />
      <rect className={styles.heroSystemOutputHalo} x="475" y="73" width="34" height="34" />
      <rect className={`${styles.heroSystemOutputHalo} ${styles.heroSystemOutputHaloTwo}`} x="475" y="163" width="34" height="34" />
      <rect className={`${styles.heroSystemOutputHalo} ${styles.heroSystemOutputHaloThree}`} x="475" y="253" width="34" height="34" />
    </svg>
    <div className={styles.heroSystemLanes}>
      {phases.slice(0, 3).map((phase, index) => <div className={styles.heroSystemLane} key={`${index}-${phase}`}>
        <span className={styles.heroSystemInlineNode} />
        <span className={styles.heroSystemLaneNumber}>0{index + 1}</span>
        <strong>{phase}</strong>
        <span className={styles.heroSystemLanePulse}><span /></span>
        <span className={styles.heroSystemInlineOutput} />
      </div>)}
    </div>
  </div>;
}
