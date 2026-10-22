import Image from 'next/image';
import {Link} from '@/i18n/navigation';
import {ArrowRight} from '@/components/icons';
import type {EmployeeProfile} from '@/lib/employee-profiles';
import type {StudioCopy} from '@/data/studio-home';
import {isSanityCdnImage} from '@/lib/image-delivery';
import styles from './studio.module.css';

export default function StudioTeam({copy, people}: {copy: StudioCopy['team']; people: EmployeeProfile[]}) {
  const founders = people.filter(person => person.profileType === 'coFounder' && person.profileImage).slice(0, 3);
  if (!founders.length) return null;

  return <section className={`${styles.section} ${styles.teamSection}`} aria-labelledby="studio-team-title">
    <div className={styles.frame}>
      <div className={styles.sectionHeading}><span className={styles.chapterNumber} aria-hidden="true">05 /</span><h2 id="studio-team-title">{copy.title}</h2><p>{copy.intro}</p></div>
      <div className={styles.teamGrid}>{founders.map(person => <article className={styles.teamPerson} key={person.slug} data-studio-reveal>
        <div className={styles.teamPortrait}><Image src={person.profileImage} alt={person.profileImageAlt || person.name} fill sizes="(min-width: 1024px) 430px, (min-width: 640px) 45vw, 90vw" unoptimized={isSanityCdnImage(person.profileImage)} /></div>
        <div className={styles.teamIdentity}><h3>{person.name}</h3><p>{person.position}</p></div>
      </article>)}</div>
      <Link className={styles.textLink} href="/aboutus">{copy.action}<ArrowRight size={18} aria-hidden="true" /></Link>
    </div>
  </section>;
}
