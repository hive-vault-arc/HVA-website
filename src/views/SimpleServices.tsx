import Image from 'next/image';
import {Link} from '@/i18n/navigation';
import {ArrowRight} from '@/components/icons';
import type {AppLocale} from '@/i18n/config';
import type {FaqItem} from '@/data/faqs';
import {STUDIO_COPY} from '@/data/studio-home';
import {getStudioServiceEntries, STUDIO_SERVICE_SLUGS, studioServiceHref} from '@/data/studio-services';
import styles from '@/components/studio/studio.module.css';

const SERVICE_IMAGES = [
  '/Images/semantic/home/strategy-technology-r5-desktop.webp',
  '/Images/semantic/home/ai-software-r5-desktop.webp',
  '/Images/semantic/home/cloud-operations-r5-desktop.webp',
];

// The published FAQ catalogs share this semantic order in all four public languages.
const SERVICE_FAQ_INDICES = [[0, 2, 3], [1, 4, 5], [6, 7, 9]] as const;
const PROCESS_FAQ_INDEX = 8;

type ServiceFaqs = {heading: string; items: FaqItem[]};

function ServiceQuestions({items, label, heading, groupName}: {items: FaqItem[]; label?: string; heading?: string; groupName?: string}) {
  if (!items.length) return null;
  return <div className={groupName ? styles.serviceChapterFaq : styles.serviceProcessFaq} {...(label ? {role: 'group', 'aria-label': label} : {})}>
    {groupName && <div className={styles.serviceChapterFaqHeading}><span>{groupName}</span><h3>{heading}</h3></div>}
    <div className={styles.faqItems}>{items.map(item => <details key={item.question}><summary>{item.question}<span className={styles.faqToggle} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>
  </div>;
}

export default function SimpleServices({locale, services, faqs}: {locale: AppLocale; services: ReturnType<typeof getStudioServiceEntries>; faqs: ServiceFaqs}) {
  const copy = STUDIO_COPY[locale];
  const bySlug = new Map(services.map(service => [service.slug, service]));
  const processFaq = faqs.items[PROCESS_FAQ_INDEX];

  return <div className={styles.innerPage} data-simple-page="services">
    <header className={`${styles.frame} ${styles.innerHero}`}>
      <div><span className={styles.innerEyebrow}>{copy.nav.services}</span><h1>{copy.services.title}</h1><p className={styles.innerLead}>{copy.services.intro}</p>
        <Link className={styles.primary} href="/contact">{copy.hero.primary}<ArrowRight size={18} aria-hidden="true" /></Link></div>
      <div className={styles.innerHeroAside}><p>{copy.challenges.title}</p><ol>{copy.challenges.items.map((challenge, index) => <li key={challenge.title}><a href={`#service-group-${index}`}><span>0{index + 1}</span>{challenge.title}<ArrowRight size={18} aria-hidden="true" /></a></li>)}</ol></div>
    </header>
    <div className={styles.serviceChapters}>{copy.services.groups.map((group, index) => {
      const groupFaqs = SERVICE_FAQ_INDICES[index].map(position => faqs.items[position]).filter((item): item is FaqItem => Boolean(item));
      return <section id={`service-group-${index}`} className={`${styles.frame} ${styles.serviceChapter}`} key={group.label} aria-labelledby={`service-group-title-${index}`}>
        <div className={styles.serviceChapterHeading}><span>0{index + 1} / {group.label}</span><h2 id={`service-group-title-${index}`}>{group.title}</h2><p>{group.description}</p></div>
        <div className={styles.serviceChapterBody}>
          <div className={styles.serviceChapterMedia}><Image src={SERVICE_IMAGES[index]} alt="" fill sizes="(min-width: 1024px) 540px, 100vw" /></div>
          <div className={styles.serviceChapterEntries}>{STUDIO_SERVICE_SLUGS[index].map((slug, serviceIndex) => {
            const service = bySlug.get(slug)!;
            return <article id={`service-${slug}`} key={slug}><div className={styles.serviceEntryTop}><h3>{service.title}</h3><span>{`0${index * 2 + serviceIndex + 1}`}</span></div><p>{service.description}</p>
              {service.bullets.length ? <ul>{service.bullets.slice(0, 3).map(bullet => <li key={bullet}>{bullet}</li>)}</ul> : null}
              {service.detailAvailable ? <Link href={studioServiceHref(service)}>{service.title}<ArrowRight size={18} aria-hidden="true" /></Link> : null}
            </article>;
          })}
          </div>
        </div>
        <ServiceQuestions items={groupFaqs} label={`${group.label}: ${faqs.heading}`} groupName={group.label} heading={faqs.heading} />
      </section>;
    })}</div>
    <section className={`${styles.frame} ${styles.section} ${styles.serviceProcess}`} aria-labelledby="service-process-title"><div className={styles.sectionHeading}><h2 id="service-process-title">{copy.approach.title}</h2><p>{copy.approach.intro}</p></div><div className={styles.serviceProcessGrid}>{copy.approach.phases.map((phase, index) => <article key={phase.name}><span>0{index + 1}</span><h3>{phase.name}</h3><p>{phase.description}</p></article>)}</div>
      {processFaq && <ServiceQuestions items={[processFaq]} />}
    </section>
    <section className={`${styles.frame} ${styles.innerCta}`}><div><h2>{copy.contact.title}</h2><p>{copy.contact.description}</p></div><Link className={styles.primary} href="/contact">{copy.nav.action}<ArrowRight size={18} aria-hidden="true" /></Link></section>
  </div>;
}
