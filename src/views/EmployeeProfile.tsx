'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react';
import { useCallback, useState, type CSSProperties, type MouseEvent } from 'react';
import type { EmployeeProfile } from '../lib/employee-profiles';
import BottomCTA from '../components/BottomCTA';
import SectionBrandMark from '../components/SectionBrandMark';

type Props = {
  profile: EmployeeProfile;
  relatedProfiles: EmployeeProfile[];
};

function itemKey(fallback: string, key?: string) {
  return key ?? fallback;
}

export default function EmployeeProfileView({ profile, relatedProfiles }: Props) {
  const router = useRouter();
  const [isLeavingForTeam, setIsLeavingForTeam] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const teamHref = `/whoweare/abouthva#${profile.slug}`;
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
    <main className={`employee-profile-page${isLeavingForTeam ? ' employee-profile-page--leaving-team' : ''}`}>
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-[#E8A838]"
        style={{ scaleX: progressScale }}
      />

      <section className="employee-profile-hero">
        <div className="site-frame employee-profile-hero__grid">
          <div className="employee-profile-hero__copy">
            <nav aria-label="Breadcrumb" className="employee-profile-breadcrumb">
              <a href={teamHref} onClick={handleTeamBackClick}>
                <ArrowLeft className="h-4 w-4" />
                About Hive Vault Arc
              </a>
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
                Start a Conversation
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
              <p>Focus</p>
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
              <h2>Profile</h2>
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
                <h2>Experience</h2>
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
                <h2>Education</h2>
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
              <h2>More From The Team</h2>
              <a href={teamHref} onClick={handleTeamBackClick}>
                Back to team
              </a>
            </div>
            <div className="employee-profile-related__grid">
              {relatedProfiles.map((item) => (
                <Link key={item.slug} href={`/abouthva/people/${item.slug}`} className="employee-profile-related__item">
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
        headline="Work With The People Who Own The Outcome"
        subtext="Hive Vault Arc keeps strategy, engineering, and operations close to the same senior team from discovery through production."
        primaryLabel="Book a Discovery Call"
        primaryHref="/contact"
        secondaryLabel="Meet the Team"
        secondaryHref="/whoweare/abouthva"
      />
    </main>
  );
}
