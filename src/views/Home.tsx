import Image from 'next/image';
import {Link} from '@/i18n/navigation';
import {ArrowRight} from '@/components/icons';
import StudioContactForm from '@/components/studio/StudioContactForm';
import StudioHero from '@/components/studio/StudioHero';
import StudioChallengeVisual from '@/components/studio/StudioChallengeVisual';
import StudioArcVisual from '@/components/studio/StudioArcVisual';
import StudioCaseStudies from '@/components/studio/StudioCaseStudies';
import StudioTeam from '@/components/studio/StudioTeam';
import StudioInsights from '@/components/studio/StudioInsights';
import StudioScrollExperience from '@/components/studio/StudioScrollExperience';
import {STUDIO_COPY} from '@/data/studio-home';
import {getStudioServiceEntries, STUDIO_SERVICE_SLUGS, studioServiceHref} from '@/data/studio-services';
import type {AppLocale} from '@/i18n/config';
import type {CaseStudyShowcaseSummary, ClientEvidenceSummary} from '@/lib/proof';
import type {HomeTrustedPartner} from '@/lib/home-hero';
import type {EmployeeProfile} from '@/lib/employee-profiles';
import type {InsightListingItem} from '@/lib/insight-pagination';
import styles from '@/components/studio/studio.module.css';

const SERVICE_IMAGES = ['/Images/semantic/home/plan-operating-model-v1.webp', '/Images/semantic/home/build-operating-model-v1.webp', '/Images/semantic/home/run-operating-model-v1.webp'];

export default function Home({locale, caseStudies, clientQuote, trustedPartners, founderCount, teamMembers, insights, serviceEntries}: {locale: AppLocale; caseStudies: CaseStudyShowcaseSummary[]; clientQuote?: ClientEvidenceSummary; trustedPartners: HomeTrustedPartner[]; founderCount: number; teamMembers: EmployeeProfile[]; insights: InsightListingItem[]; serviceEntries: ReturnType<typeof getStudioServiceEntries>}) {
  const copy = STUDIO_COPY[locale];
  const servicesBySlug = new Map(serviceEntries.map(service => [service.slug, service]));
  return <div className={styles.page} data-skip-site-motion>
    <StudioHero copy={copy.hero} phases={copy.services.groups.map(group => group.label)} serviceCount={copy.services.groups.flatMap(group => group.links).length} founderCount={founderCount} trustedPartners={trustedPartners} caseStudies={caseStudies} workCopy={copy.work} locale={locale} />

    <StudioScrollExperience>
    <section id="challenges" className={`${styles.section} ${styles.challenges}`} aria-labelledby="studio-challenges-title">
      <div className={styles.splitIntro}><span className={styles.chapterNumber} aria-hidden="true">01 /</span><h2 id="studio-challenges-title">{copy.challenges.title}</h2><p>{copy.challenges.intro}</p></div>
      <ol className={styles.challengeList}>{copy.challenges.items.map((item, index) => <li key={item.title} className={styles.challenge} data-studio-reveal data-challenge-phase data-active={index === 0 ? 'true' : undefined}>
        <span className={styles.challengeNumber} aria-hidden="true">0{index + 1}</span>
        <div className={styles.challengeText}><h3>{item.title}</h3><p>{item.description}</p><a className={styles.textLink} href={`#studio-service-${index}`} data-service-link>{item.action}<ArrowRight size={18} aria-hidden="true" /></a></div>
      </li>)}</ol>
      <div className={styles.challengeSignalBridge} data-studio-reveal><StudioChallengeVisual /></div>
    </section>

    <section id="services" className={`${styles.section} ${styles.servicesSection}`} aria-labelledby="studio-services-title">
      <div className={`${styles.frame} ${styles.serviceInner}`}>
      <div className={styles.serviceRail}>
        <span className={styles.chapterNumber} aria-hidden="true">02 /</span>
        <h2 id="studio-services-title">{copy.services.title}</h2>
        <p className={styles.serviceIntro}>{copy.services.intro}</p>
      </div>
      <div className={styles.servicesGrid}>{copy.services.groups.map((service, index) => <article id={`studio-service-${index}`} key={service.label} className={styles.serviceCard} data-service-phase data-active={index === 0 ? 'true' : undefined}>
        <div className={styles.serviceCopy}>
          <div className={styles.serviceIdentity}><span className={styles.serviceOrdinal} aria-hidden="true">0{index + 1}</span><span className={styles.serviceLabel}>{service.label}</span></div>
          <h3>{service.title}</h3><p>{service.description}</p>
          <div className={styles.serviceLinks} data-service-links>{service.links.map((label, linkIndex) => {
            const entry = servicesBySlug.get(STUDIO_SERVICE_SLUGS[index][linkIndex]);
            return <Link key={label} href={entry ? studioServiceHref(entry) : '/capabilities'}>{label}<ArrowRight size={16} aria-hidden="true" /></Link>;
          })}</div>
        </div>
        <div className={styles.serviceMedia}><Image src={SERVICE_IMAGES[index]} alt="" fill sizes="(min-width: 1280px) 50vw, (min-width: 768px) 48vw, 90vw" /><span className={styles.serviceMediaNote}>{copy.services.visualNote}</span></div>
      </article>)}</div>
      </div>
    </section>

    <div className={styles.proofBand}>
      <StudioCaseStudies copy={copy.work} caseStudies={caseStudies} locale={locale} />
      <div className={`${styles.frame} ${styles.proofHandoff}`} data-studio-reveal>
        <div className={styles.proofHandoffRoute} aria-hidden="true"><bdi dir="ltr">03</bdi><span className={styles.proofHandoffTrack} /><bdi dir="ltr">04</bdi></div>
        {clientQuote ? <figure className={styles.proofQuote}>
          <blockquote lang={clientQuote.documentLanguage} dir="auto">{clientQuote.quoteExcerpt}</blockquote>
          <figcaption><strong>{clientQuote.clientName}</strong><span>{copy.work.testimonial} · <bdi dir="ltr">{clientQuote.documentLanguage.toUpperCase()}</bdi></span></figcaption>
        </figure> : <p>{copy.work.bridge}</p>}
        <div className={styles.proofHandoffActions}>
          {clientQuote && <Link className={styles.proofQuoteLink} href={`/case-studies/${clientQuote.slug}`}>{copy.work.open}<ArrowRight size={18} aria-hidden="true" /></Link>}
          <a href="#approach" className={styles.proofHandoffLink}><span className={styles.proofHandoffLinkText}>{copy.work.bridgeAction}</span><span aria-hidden="true"><ArrowRight size={22} /></span></a>
        </div>
      </div>
    </div>

    <section id="approach" className={`${styles.frame} ${styles.section} ${styles.approach}`} aria-labelledby="studio-approach-title">
      <div className={styles.sectionHeading}><span className={styles.chapterNumber} aria-hidden="true">04 /</span><h2 id="studio-approach-title">{copy.approach.title}</h2><p>{copy.approach.intro}</p>
        <StudioArcVisual phases={copy.approach.phases.map(phase => phase.name)} />
      </div>
      <div className={styles.processStack} data-process-timeline>
        <span className={styles.processTrack} data-process-track aria-hidden="true" />
        {copy.approach.phases.map((phase, index) => <article className={styles.phase} data-process-phase data-active={index === 0 ? 'true' : undefined} key={phase.name}>
          <div className={styles.phaseIdentity}><span className={styles.phaseNumber} aria-hidden="true">0{index + 1}</span><span className={styles.phaseName}>{phase.name}</span></div>
          <div className={styles.phaseContent}><h3>{phase.title}</h3><p>{phase.description}</p><ul className={styles.phaseFocus}>{phase.focus.map(point => <li key={point}>{point}</li>)}</ul></div>
        </article>)}</div>
    </section>

    <StudioTeam copy={copy.team} people={teamMembers} />
    <StudioInsights copy={copy.insights} items={insights} locale={locale} />

    <section className={`${styles.frame} ${styles.section} ${styles.split}`} aria-labelledby="studio-faq-title">
      <div className={styles.splitIntro}><span className={styles.chapterNumber} aria-hidden="true">07 /</span><h2 id="studio-faq-title">{copy.faq.title}</h2><p>{copy.faq.intro}</p></div>
      <div className={styles.faqItems}>{copy.faq.items.map((item, index) => <details key={item.question} name="studio-faq" open={index === 0}><summary>{item.question}<span className={styles.faqToggle} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>
    </section>

    <section id="contact" className={`${styles.section} ${styles.contact}`} aria-labelledby="studio-contact-title">
      <div className={`${styles.frame} ${styles.split} ${styles.contactFrame}`}>
        <div className={styles.splitIntro}><span className={styles.chapterNumber} aria-hidden="true">08 /</span><h2 id="studio-contact-title">{copy.contact.title}</h2><p>{copy.contact.description}</p><p className={styles.contactNote}>{copy.contact.note}</p><ul className={styles.callTopics}>{copy.contact.topics.map(topic => <li key={topic}>{topic}</li>)}</ul></div>
        <StudioContactForm copy={copy.contact} locale={locale} />
      </div>
    </section>
    </StudioScrollExperience>
  </div>;
}
