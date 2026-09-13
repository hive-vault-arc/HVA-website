'use client';

import type {ElementType} from 'react';
import React, {useRef, useState} from 'react';
import Image from 'next/image';
import {useLocale, useTranslations} from 'next-intl';
import {FaGithub, FaLinkedinIn, FaTiktok, FaXTwitter} from 'react-icons/fa6';
import {
  ArrowUpRight,
  Facebook,
  Globe2,
  Instagram,
  Mail,
  Phone,
} from '@/components/icons';
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_E164,
  SOCIAL_PROFILES,
} from '../lib/seo';
import {trackGenerateLead} from '@/lib/analytics-events';
import styles from './Contact.module.css';

type ContactStatus = {
  type: 'success' | 'error';
  message: string;
} | null;

const CONTACT_EMAILS = [CONTACT_EMAIL];
const CONTACT_PHONES = [
  {raw: CONTACT_PHONE_E164, label: CONTACT_PHONE_DISPLAY},
];

const SOCIAL_ICONS: Record<(typeof SOCIAL_PROFILES)[number]['label'], ElementType> = {
  LinkedIn: FaLinkedinIn,
  GitHub: FaGithub,
  Instagram,
  Facebook,
  X: FaXTwitter,
  TikTok: FaTiktok,
};

const TEAM_SIZES = ['1–10', '11–50', '51–200', '200+'] as const;

const Contact: React.FC = () => {
  const locale = useLocale();
  const t = useTranslations('Contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    industry: '',
    teamSize: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<ContactStatus>(null);
  const lastSubmitAt = useRef<number>(0);
  const RATE_LIMIT_MS = 30_000;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setStatus(null);
    setFormData((current) => ({...current, [event.target.name]: event.target.value}));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const now = Date.now();

    if (now - lastSubmitAt.current < RATE_LIMIT_MS) {
      const secondsLeft = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitAt.current)) / 1000);
      setStatus({type: 'error', message: t('rateLimit', {seconds: secondsLeft})});
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const endpoint = process.env.NEXT_PUBLIC_CONTACT_API_URL?.trim();
      const payload = {
        ...formData,
        subject: t('subject'),
        locale,
        sourceUrl: globalThis.location.href,
        formIdentifier: 'contact-discovery',
      };

      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Submission failed with status ${response.status}`);
        }

        lastSubmitAt.current = Date.now();
        setStatus({type: 'success', message: t('success')});
        trackGenerateLead({locale, formId: 'contact-discovery'});
      } else {
        const subject = `[Hive Vault Arc] ${t('subject')}`;
        const body = [
          `Name: ${formData.name}`,
          `Email: ${formData.email}`,
          formData.company ? `Company: ${formData.company}` : '',
          formData.industry ? `Industry: ${formData.industry}` : '',
          formData.teamSize ? `Team Size: ${formData.teamSize}` : '',
          '',
          formData.message,
        ]
          .filter(Boolean)
          .join('\n');
        const mailto = `mailto:${CONTACT_EMAILS.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        globalThis.location.href = mailto;
        lastSubmitAt.current = Date.now();
        setStatus({type: 'success', message: t('emailOpened')});
      }

      setFormData({name: '', email: '', company: '', industry: '', teamSize: '', message: ''});
    } catch {
      setStatus({type: 'error', message: t('directError')});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="site-frame">
          <div className={styles.headerGrid}>
            <div>
              <p className={styles.pageLabel}>
                <span aria-hidden="true" />
                {t('eyebrow')}
              </p>
              <h1 className={styles.title}>{t('title')}</h1>
            </div>
            <p className={styles.lead}>{t('lead')}</p>
          </div>
        </div>
      </header>

      <section className={styles.contactSection} aria-labelledby="contact-form-heading">
        <div className={`site-frame ${styles.contactGrid}`}>
          <div className={styles.formPanel} data-clarity-mask="true">
            <div className={styles.formHeader}>
              <div>
                <h2 id="contact-form-heading">{t('formHeading')}</h2>
                <p>{t('formIntro')}</p>
              </div>
              <p className={styles.requiredNote}>{t('requiredNote')}</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label htmlFor="name">
                    {t('name')}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('namePlaceholder')}
                    required
                    maxLength={100}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="email">
                    {t('email')}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('emailPlaceholder')}
                    required
                    maxLength={254}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="company">{t('company')}</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={t('companyPlaceholder')}
                    maxLength={120}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="industry">{t('industry')}</label>
                  <input
                    id="industry"
                    name="industry"
                    type="text"
                    value={formData.industry}
                    onChange={handleChange}
                    placeholder={t('industryPlaceholder')}
                    maxLength={80}
                  />
                </div>
              </div>

              <fieldset className={styles.teamSize}>
                <legend>{t('teamSize')}</legend>
                <div>
                  {TEAM_SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      aria-pressed={formData.teamSize === size}
                      onClick={() => {
                        setStatus(null);
                        setFormData((current) => ({
                          ...current,
                          teamSize: current.teamSize === size ? '' : size,
                        }));
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className={styles.field}>
                <label htmlFor="message">
                  {t('brief')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('briefPlaceholder')}
                  required
                  maxLength={5000}
                />
              </div>

              <div className={styles.formFooter}>
                <p>{t('privacyNote')}</p>
                <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                  {isSubmitting ? t('sending') : t('send')}
                </button>
              </div>

              {status && (
                <output
                  className={styles.status}
                  data-tone={status.type}
                  role="status"
                  aria-live="polite"
                >
                  {status.message}
                </output>
              )}
            </form>
          </div>

          <aside className={styles.contactRail} aria-labelledby="contact-details-heading">
            <div>
              <h2 id="contact-details-heading" className={styles.railHeading}>
                {t('detailsHeading')}
              </h2>
              <address className={styles.contactList}>
                <div className={styles.contactItem}>
                  <Mail className={styles.detailIcon} aria-hidden="true" />
                  <div>
                    <h3>{t('inquiries')}</h3>
                    {CONTACT_EMAILS.map((email) => (
                      <a key={email} href={`mailto:${email}`}>
                        {email}
                      </a>
                    ))}
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <Phone className={styles.detailIcon} aria-hidden="true" />
                  <div>
                    <h3>{t('directLine')}</h3>
                    {CONTACT_PHONES.map((phone) => (
                      <a key={phone.raw} href={`tel:${phone.raw}`}>
                        {phone.label}
                      </a>
                    ))}
                  </div>
                </div>
              </address>
            </div>

            <nav className={styles.socials} aria-labelledby="contact-social-heading">
              <h2 id="contact-social-heading" className={styles.railHeading}>
                {t('socialHeading')}
              </h2>
              <ul>
                {SOCIAL_PROFILES.map((profile) => {
                  const SocialIcon = SOCIAL_ICONS[profile.label];
                  return (
                    <li key={profile.label}>
                      <a href={profile.url} target="_blank" rel="noreferrer noopener">
                        <SocialIcon className={styles.socialIcon} aria-hidden="true" />
                        <span>{profile.label}</span>
                        <ArrowUpRight className={styles.socialArrow} aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <blockquote className={styles.quote}>
              <p>“{t('quote')}”</p>
              <footer>{t('quoteAttribution')}</footer>
            </blockquote>
          </aside>
        </div>
      </section>

      <section className={styles.locationSection} aria-labelledby="contact-location-heading">
        <div className={`site-frame-wide ${styles.locationGrid}`}>
          <figure className={styles.map}>
            <Image
              src="/Images/locations/tangier-morocco-office-location.webp"
              alt={t('mapAlt')}
              fill
              quality={90}
              className={styles.mapImage}
              sizes="(max-width: 767px) 100vw, (max-width: 1199px) 64vw, 70vw"
            />
            <figcaption>{t('mapLabel')}</figcaption>
          </figure>

          <div className={styles.locationCopy}>
            <Globe2 className={styles.locationIcon} aria-hidden="true" />
            <h2 id="contact-location-heading">{t('operatingRegion')}</h2>
            <p>{t('location')}</p>
            <p>{t('remote')}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
