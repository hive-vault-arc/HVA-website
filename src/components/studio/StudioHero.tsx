import {Link} from '@/i18n/navigation';
import {ArrowRight} from '@/components/icons';
import type {StudioCopy} from '@/data/studio-home';
import type {AppLocale} from '@/i18n/config';
import type {HomeTrustedPartner} from '@/lib/home-hero';
import type {CaseStudyShowcaseSummary} from '@/lib/proof';
import StudioHeroAnchor from './StudioHeroAnchor';
import StudioHeroBackdrop from './StudioHeroBackdrop';
import StudioHeroGallery from './StudioHeroGallery';
import StudioHeroLogos from './StudioHeroLogos';
import StudioHeroMotion from './StudioHeroMotion';
import StudioHeroSystemGraphic from './StudioHeroSystemGraphic';
import styles from './studio.module.css';

interface StudioHeroProps {
  copy: StudioCopy['hero'];
  phases: string[];
  serviceCount: number;
  founderCount: number;
  trustedPartners: HomeTrustedPartner[];
  caseStudies: CaseStudyShowcaseSummary[];
  workCopy: StudioCopy['work'];
  locale: AppLocale;
}

function HeroFacts({copy, serviceCount, founderCount, className}: {copy: StudioCopy['hero']; serviceCount: number; founderCount: number; className: string}) {
  return <ul className={`${styles.heroFacts} ${className}`} aria-label={copy.factsLabel}>
    <li><a href="#services"><strong>{serviceCount}</strong><span>{copy.servicePillars}</span></a></li>
    {founderCount > 0 && <li><Link href="/aboutus"><strong>{founderCount}</strong><span>{copy.coFounders}</span></Link></li>}
  </ul>;
}

export default function StudioHero({copy, phases, serviceCount, founderCount, trustedPartners, caseStudies, workCopy, locale}: StudioHeroProps) {
  const projects = caseStudies.slice(0, 3);
  return <section className={styles.heroStage} aria-labelledby="studio-hero-title" data-studio-hero>
    <StudioHeroBackdrop core />
    <div className={`${styles.frame} ${styles.hero}`}>
      <div className={styles.heroCore}>
        <div className={styles.heroLead}>
          <div className={styles.heroOffer}>
            <div className={styles.heroIntro}>
              <ol className={styles.heroSequence} aria-label={phases.join(', ')}>{phases.map((phase, index) => <li key={phase}><span aria-hidden="true">0{index + 1}</span>{phase}</li>)}</ol>
              <h1 id="studio-hero-title">{copy.title} {copy.accentLead} <mark>{copy.accentFocus}</mark></h1>
            </div>
            <div className={styles.heroBrief}>
              <p className={styles.heroBenefit}>{copy.benefit}</p>
              <p className={styles.heroDescription}>{copy.description}</p>
            </div>
            <div className={styles.heroActions}>
              <StudioHeroAnchor className={styles.primary} href="#contact"><span>{copy.primary}</span><span className={styles.heroActionArrow} aria-hidden="true"><ArrowRight size={20} /></span></StudioHeroAnchor>
              <StudioHeroAnchor className={styles.secondary} href="#work"><span>{copy.secondary}</span><ArrowRight size={18} aria-hidden="true" /></StudioHeroAnchor>
            </div>
          </div>
          <div className={styles.heroSystemPanel}>
            <StudioHeroMotion pauseLabel={copy.pauseMotion} resumeLabel={copy.resumeMotion} />
            <StudioHeroSystemGraphic phases={phases} />
            {trustedPartners.length > 0 && <HeroFacts copy={copy} serviceCount={serviceCount} founderCount={founderCount} className={styles.heroFactsInline} />}
          </div>
        </div>
        <div className={styles.heroVisual}>
          <StudioHeroGallery projects={projects} locale={locale} workCopy={workCopy} />
        </div>
        <div className={styles.heroProof} data-has-clients={trustedPartners.length > 0}>
          {trustedPartners.length > 0 && <div className={styles.heroClients}>
            <p>{copy.clients}</p>
            <StudioHeroLogos partners={trustedPartners.slice(0, 3)} />
          </div>}
          <HeroFacts copy={copy} serviceCount={serviceCount} founderCount={founderCount} className={styles.heroFactsProof} />
        </div>
      </div>
    </div>
  </section>;
}
