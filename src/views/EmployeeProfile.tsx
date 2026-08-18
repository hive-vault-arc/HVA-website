'use client';

import Image from 'next/image';
import type {CSSProperties} from 'react';
import {useTranslations} from 'next-intl';
import {ArrowLeft, ArrowUpRight, ExternalLink} from '@/components/icons';
import {Link} from '@/i18n/navigation';
import type {EmployeeProfile} from '../lib/employee-profiles';
import {isSanityCdnImage} from '../lib/image-delivery';

type Props = {
  profile: EmployeeProfile;
  relatedProfiles: EmployeeProfile[];
};

export default function EmployeeProfileView({profile, relatedProfiles}: Props) {
  const t = useTranslations('DynamicContent');
  const teamHref = `/aboutus#${profile.slug}`;
  const selectedExperience = profile.experience.slice(0, 3);
  const education = profile.education[0];

  return (
    <main className="founder-profile-page">
      <section className="founder-profile-hero">
        <div className="site-frame founder-profile-hero__layout">
          <figure
            className="founder-profile-portrait"
            style={{viewTransitionName: `employee-profile-${profile.slug}`} as CSSProperties}
          >
            <Image
              src={profile.profileImage}
              alt={profile.profileImageAlt}
              fill
              priority
              quality={90}
              unoptimized={isSanityCdnImage(profile.profileImage)}
              sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 42vw, 34vw"
            />
          </figure>

          <div className="founder-profile-hero__copy">
            <Link href={teamHref} className="founder-profile-back">
              <ArrowLeft aria-hidden="true" size={16} />
              {t('employee.backTeam')}
            </Link>

            <p className="founder-profile-eyebrow">{t('employee.leadership')}</p>
            <h1>{profile.name}</h1>
            <p className="founder-profile-role">{profile.position}</p>
            <p className="founder-profile-summary">{profile.summary}</p>
            <p className="founder-profile-story">{profile.story}</p>

            <div className="founder-profile-actions">
              <Link href="/contact">
                {t('bookCall')}
                <ArrowUpRight aria-hidden="true" className="founder-profile-inline-icon" size={16} />
              </Link>
              {profile.linkedinUrl && (
                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                  <ExternalLink aria-hidden="true" className="founder-profile-inline-icon" size={15} />
                </a>
              )}
            </div>
          </div>

          <div className="founder-profile-details">
            <div className="founder-profile-focus">
              <p className="founder-profile-detail-label">{t('employee.focus')}</p>
              <p className="founder-profile-responsibility">
                {profile.responsibilityTag || profile.position}
              </p>
              <ul className="founder-profile-expertise" aria-label={t('employee.focus')}>
                {profile.expertise.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {profile.operatingPrinciple && (
              <aside className="founder-profile-principle">
                <p className="founder-profile-detail-label">{t('employee.operatingPrinciple')}</p>
                <p>{profile.operatingPrinciple}</p>
              </aside>
            )}
          </div>
        </div>
      </section>

      {(selectedExperience.length > 0 || education) && (
        <section className="founder-profile-career">
          <div className="site-frame">
            <div className="founder-profile-career__header">
              <div>
                <p className="founder-profile-eyebrow">{t('employee.background')}</p>
                <h2>{t('employee.selectedExperience')}</h2>
              </div>

              {education && (
                <div className="founder-profile-education">
                  <p>{t('employee.education')}</p>
                  <strong>{education.institution}</strong>
                  {education.credential && <span>{education.credential}</span>}
                  {education.period && <time>{education.period}</time>}
                </div>
              )}
            </div>

            {selectedExperience.length > 0 && (
              <ol className="founder-profile-experience">
                {selectedExperience.map((item, index) => (
                  <li key={item._key ?? `${item.role}-${index}`}>
                    <span className="founder-profile-experience__number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="founder-profile-experience__role">
                      <h3>{item.role}</h3>
                      <p>{[item.organization, item.location].filter(Boolean).join(' / ')}</p>
                    </div>
                    {item.summary && <p className="founder-profile-experience__summary">{item.summary}</p>}
                    {item.period && <time>{item.period}</time>}
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>
      )}

      <section className="founder-profile-related">
        <div className="site-frame founder-profile-related__layout">
          <div>
            <p className="founder-profile-eyebrow">{t('employee.otherFounders')}</p>
            <h2>{t('employee.meetTeam')}</h2>
          </div>

          <div className="founder-profile-related__links">
            {relatedProfiles.map((item) => (
              <Link key={item.slug} href={`/aboutus/our-people/${item.slug}`}>
                <span className="founder-profile-related__name">{item.name}</span>
                <small className="founder-profile-related__role">{item.position}</small>
                <ArrowUpRight aria-hidden="true" className="founder-profile-related__arrow" size={17} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
