'use client';

import Image from 'next/image';
import {Link} from '@/i18n/navigation';
import {useRouter} from '@/i18n/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ExternalLink } from '@/components/icons';
import { useCallback, useState, type CSSProperties, type MouseEvent } from 'react';
import type { EmployeeProfile } from '../lib/employee-profiles';
import BottomCTA from '../components/BottomCTA';
import SectionBrandMark from '../components/SectionBrandMark';
import {useTranslations} from 'next-intl';
import {isSanityCdnImage} from '../lib/image-delivery';

type Props = {
  profile: EmployeeProfile;
  relatedProfiles: EmployeeProfile[];
};

function itemKey(fallback: string, key?: string) {
  return key ?? fallback;
}

export default function EmployeeProfileView({ profile, relatedProfiles }: Props) {
  const t = useTranslations('DynamicContent');
  const router = useRouter();
  const [isLeavingForTeam, setIsLeavingForTeam] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const teamHref = `/aboutus#${profile.slug}`;
  const handleTeamBackClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        router.push(teamHref);
        return;
      }

      setIsLeavingForTeam(true);
      window.setTimeout(() => router.push(teamHref), 430);
    },
    [router, teamHref],
  );

  return (
    <div className={`employee-profile-page${isLeavingForTeam ? ' employee-profile-page--leaving-team' : ''}`}>
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-[#E8A838]"
        style={{ scaleX: progressScale }}
      />

      <section className="employee-profile-hero">
        <div className="site-frame employee-profile-hero__grid">
          <div className="employee-profile-hero__copy">
            <nav aria-label={t('breadcrumb')} className="employee-profile-breadcrumb">
              <Link href={teamHref} onClick={handleTeamBackClick}>
                <ArrowLeft className="h-4 w-4" />
                {t('aboutHiva')}
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{profile.name}</span>
            </nav>

            <div className="employee-profile-mark">
              <SectionBrandMark size="sm" />
              <span>{profile.responsibilityTag || profile.position}</span>
            </div>

            <h1>{profile.name}</h1>
            <p className="employee-profile-role">{profile.position}</p>
            <p className="employee-profile-summary">{profile.summary}</p>

            <div className="employee-profile-actions">
              {profile.linkedinUrl && (
                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              <Link href="/contact">
                {t('bookCall')}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <figure
            className="employee-profile-portrait"
            style={{ viewTransitionName: `employee-profile-${profile.slug}` } as CSSProperties}
          >
            <Image
              src={profile.profileImage}
              alt={profile.profileImageAlt}
              fill
              priority
              unoptimized={isSanityCdnImage(profile.profileImage)}
              className={profile.slug === 'ali-amrani' ? 'employee-profile-portrait__ali' : undefined}
              sizes="(max-width: 900px) calc(100vw - 2rem), 42vw"
            />
          </figure>
        </div>
      </section>

      <section className="employee-profile-body">
        <div className="site-frame employee-profile-body__grid">
          <motion.aside
            className="employee-profile-aside"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.4 }}
          >
            <div>
              <p>{t('employee.focus')}</p>
              <ul>
                {profile.expertise.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.aside>

          <div className="employee-profile-main">
            <motion.section
              className="employee-profile-story"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.4 }}
            >
              <h2>{t('employee.profile')}</h2>
              <p>{profile.story}</p>
            </motion.section>

            {profile.experience.length > 0 && (
              <motion.section
                className="employee-profile-section"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.4 }}
              >
                <h2>{t('employee.experience')}</h2>
                <ol className="employee-profile-timeline">
                  {profile.experience.map((item, index) => (
                    <li key={itemKey(`${item.role}-${index}`, item._key)}>
                      <div className="employee-profile-timeline__marker" aria-hidden="true" />
                      <div>
                        <div className="employee-profile-timeline__topline">
                          <h3>{item.role}</h3>
                          {item.period && <span>{item.period}</span>}
                        </div>
                        <p className="employee-profile-timeline__org">
                          {[item.organization, item.location].filter(Boolean).join(' · ')}
                        </p>
                        {item.summary && <p className="employee-profile-timeline__summary">{item.summary}</p>}
                        {item.highlights && item.highlights.length > 0 && (
                          <ul className="employee-profile-highlights">
                            {item.highlights.map((highlight) => (
                              <li key={highlight}>{highlight}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </motion.section>
            )}

            {profile.education.length > 0 && (
              <motion.section
                className="employee-profile-section"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.4 }}
              >
                <h2>{t('employee.education')}</h2>
                <div className="employee-profile-education">
                  {profile.education.map((item, index) => (
                    <article key={itemKey(`${item.institution}-${index}`, item._key)}>
                      <h3>{item.institution}</h3>
                      {item.credential && <p>{item.credential}</p>}
                      {item.period && <span>{item.period}</span>}
                      {item.summary && <em>{item.summary}</em>}
                    </article>
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        </div>
      </section>

      {relatedProfiles.length > 0 && (
        <section className="employee-profile-related">
          <div className="site-frame">
            <div className="employee-profile-related__heading">
              <h2>{t('employee.moreTeam')}</h2>
              <Link href={teamHref} onClick={handleTeamBackClick}>
                {t('employee.backTeam')}
              </Link>
            </div>
            <div className="employee-profile-related__grid">
              {relatedProfiles.map((item) => (
                <Link key={item.slug} href={`/aboutus/our-people/${item.slug}`} className="employee-profile-related__item">
                  <span>{item.name}</span>
                  <em>{item.position}</em>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <BottomCTA
        variant="light"
        headline={t('employee.bottomTitle')}
        subtext={t('employee.bottomDescription')}
        primaryLabel={t('bookCall')}
        primaryHref="/contact"
        secondaryLabel={t('employee.meetTeam')}
        secondaryHref="/aboutus"
      />
    </div>
  );
}
