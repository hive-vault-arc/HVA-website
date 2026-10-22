import Image from 'next/image';
import {Link} from '@/i18n/navigation';
import {ArrowRight} from '@/components/icons';
import type {AppLocale} from '@/i18n/config';
import type {EmployeeProfile} from '@/lib/employee-profiles';
import type {CaseStudyShowcaseSummary} from '@/lib/proof';
import {isSanityCdnImage} from '@/lib/image-delivery';
import {STUDIO_COPY} from '@/data/studio-home';
import studio from '@/components/studio/studio.module.css';
import styles from './about.module.css';

interface SimpleAboutProps {
  locale: AppLocale;
  teamMembers: EmployeeProfile[];
  caseStudies: CaseStudyShowcaseSummary[];
}

export default function SimpleAbout({locale, teamMembers, caseStudies}: SimpleAboutProps) {
  const copy = STUDIO_COPY[locale];
  const founders = teamMembers.filter(member => member.profileType === 'coFounder').slice(0, 3);
  const featuredProject = caseStudies[0];
  const otherProjects = caseStudies.slice(1, 3);
  const fallbackFounder = founders[0];

  return <div className={`${studio.innerPage} ${styles.page}`} data-simple-page="about">
    <header className={`${studio.frame} ${styles.hero}`} aria-labelledby="about-title">
      <div className={styles.heroMeta}>
        <span>{copy.nav.about}</span>
        <span>{copy.aboutPage.location}</span>
      </div>
      <h1 id="about-title">{copy.aboutPage.title}</h1>
      <div className={styles.heroCard}>
        {(featuredProject || fallbackFounder) && <figure className={styles.heroMedia}>
          {featuredProject ? <Link href={`/case-studies/${featuredProject.slug}`} locale={featuredProject.sourceLocale || locale} aria-label={`${copy.work.open}: ${featuredProject.clientName} — ${featuredProject.title}`}>
            <Image src={featuredProject.assets.coverImage} alt={featuredProject.assets.coverAlt || featuredProject.title} fill priority sizes="(min-width: 1024px) 720px, (min-width: 640px) 70vw, 100vw" unoptimized={isSanityCdnImage(featuredProject.assets.coverImage)} />
          </Link> : fallbackFounder && <Link href={`/aboutus/our-people/${fallbackFounder.slug}`} aria-label={fallbackFounder.name}>
            <Image src={fallbackFounder.profileImage} alt={fallbackFounder.profileImageAlt || fallbackFounder.name} fill priority sizes="(min-width: 1024px) 720px, (min-width: 640px) 70vw, 100vw" unoptimized={isSanityCdnImage(fallbackFounder.profileImage)} />
          </Link>}
          <figcaption>{featuredProject?.clientName || fallbackFounder?.name}</figcaption>
        </figure>}
        <div className={styles.heroStatement}>
          <span className={styles.kicker}>{copy.approach.eyebrow}</span>
          <p>{copy.aboutPage.intro}</p>
          <div className={styles.heroStatementBottom}>
            <div className={styles.founderFact}><strong>{founders.length}</strong><span>{copy.hero.coFounders}</span></div>
            <Link className={styles.heroAction} href="/contact">{copy.nav.action}<ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </header>

    <section className={`${studio.frame} ${styles.approach}`} aria-labelledby="about-approach-title" data-about-section="approach">
      <div className={styles.sectionIntro}>
        <span className={styles.kicker}>{copy.approach.eyebrow}</span>
        <h2 id="about-approach-title">{copy.approach.title}</h2>
        <p>{copy.approach.intro}</p>
      </div>
      <div className={styles.timeline}>
        {copy.approach.phases.map((phase, index) => <article key={phase.name}>
          <span className={styles.timelineNumber}>0{index + 1}</span>
          <h3>{phase.name}</h3>
          <p>{phase.description}</p>
          <ul>{phase.focus.map(point => <li key={point}>{point}</li>)}</ul>
        </article>)}
      </div>
    </section>

    {otherProjects.length > 0 && <section className={`${studio.frame} ${styles.work}`} aria-labelledby="about-work-title" data-about-section="work">
      <div className={styles.sectionIntro}>
        <span className={styles.kicker}>{copy.nav.work}</span>
        <h2 id="about-work-title">{copy.work.title}</h2>
        <p>{copy.work.intro}</p>
        <Link className={styles.sectionAction} href="/case-studies">{copy.hero.secondary}<ArrowRight size={18} aria-hidden="true" /></Link>
      </div>
      <div className={styles.workGrid}>{otherProjects.map(project => <article key={project.slug} className={styles.workCard}>
        <Link href={`/case-studies/${project.slug}`} locale={project.sourceLocale || locale} aria-label={`${copy.work.open}: ${project.clientName} — ${project.title}`}>
          <span className={styles.workMedia}><Image src={project.assets.coverImage} alt={project.assets.coverAlt || project.title} fill sizes="(min-width: 1024px) 580px, (min-width: 640px) 46vw, 90vw" unoptimized={isSanityCdnImage(project.assets.coverImage)} /></span>
          <span className={styles.workCaption}><span>{project.clientName}</span><strong>{project.title}</strong><ArrowRight size={20} aria-hidden="true" /></span>
        </Link>
      </article>)}</div>
    </section>}

    <section className={`${studio.frame} ${styles.founders}`} aria-labelledby="about-founders-title" data-about-section="founders">
      <div className={styles.sectionIntro}>
        <span className={styles.kicker}>{copy.team.title}</span>
        <h2 id="about-founders-title">{copy.aboutPage.founders}</h2>
        <p>{copy.team.intro}</p>
      </div>
      <div className={styles.founderGrid}>{founders.map(person => <article key={person.slug} className={styles.founder}>
        <div className={styles.founderImage}><Image src={person.profileImage} alt={person.profileImageAlt || person.name} fill sizes="(min-width: 1024px) 580px, (min-width: 640px) 46vw, 90vw" unoptimized={isSanityCdnImage(person.profileImage)} /></div>
        <div className={styles.founderCopy}><span>{person.position}</span><h3>{person.name}</h3><p>{person.summary}</p><Link href={`/aboutus/our-people/${person.slug}`} aria-label={`${copy.team.action}: ${person.name}`}>{copy.team.action}<ArrowRight size={18} aria-hidden="true" /></Link></div>
      </article>)}</div>
    </section>

    <section className={`${studio.frame} ${styles.cta}`} aria-labelledby="about-cta-title"><div><span className={styles.kicker}>{copy.contact.eyebrow}</span><h2 id="about-cta-title">{copy.contact.title}</h2><p>{copy.contact.description}</p></div><Link className={studio.primary} href="/contact">{copy.nav.action}<ArrowRight size={18} aria-hidden="true" /></Link></section>
  </div>;
}
