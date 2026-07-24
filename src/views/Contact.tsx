'use client';

import React, { useRef, useState } from 'react';
import {useLocale, useTranslations} from 'next-intl';
import Image from 'next/image';
import { ArrowRight, Globe2, Mail, Phone } from '@/components/icons';
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion';
import { useAnimationQuality } from '../lib/animationQuality';
import SectionBrandMark from '../components/SectionBrandMark';
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164 } from '../lib/seo';

type ContactStatus = {
  type: 'success' | 'error';
  message: string;
} | null;

const CONTACT_EMAILS = [CONTACT_EMAIL];
const CONTACT_PHONES = [
  { raw: CONTACT_PHONE_E164, label: CONTACT_PHONE_DISPLAY },
];

const Contact: React.FC = () => {
  const locale = useLocale();
  const t = useTranslations('Contact');
  const { motionReduced } = useAnimationQuality();
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const [formData, setFormData] = useState({ name: '', email: '', company: '', industry: '', teamSize: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<ContactStatus>(null);
  const lastSubmitAt = useRef<number>(0);
  const RATE_LIMIT_MS = 30_000;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setStatus(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastSubmitAt.current < RATE_LIMIT_MS) {
      const secondsLeft = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitAt.current)) / 1000);
      setStatus({ type: 'error', message: t('rateLimit', {seconds: secondsLeft}) });
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
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error(`Submission failed with status ${response.status}`);
        lastSubmitAt.current = Date.now();
        setStatus({ type: 'success', message: t('success') });
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
        ].filter(Boolean).join('\n');
        const mailto = `mailto:${CONTACT_EMAILS.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        globalThis.location.href = mailto;
        lastSubmitAt.current = Date.now();
        setStatus({ type: 'success', message: t('emailOpened') });
      }
      setFormData({ name: '', email: '', company: '', industry: '', teamSize: '', message: '' });
    } catch {
      setStatus({
        type: 'error',
        message: t('directError'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MotionConfig reducedMotion={motionReduced ? 'always' : 'never'}>
      <div className="relative min-h-[100dvh] bg-[#FFFFFF] text-[#1A2535]">

        {/* Scroll progress bar */}
        <motion.div
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#E8A838] via-[#F0C15A] to-[#F0C15A]"
          style={{ scaleX: progressScale }}
        />

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="contact-hero relative mx-auto max-w-7xl px-6 pt-28 pb-16 sm:px-8 md:pt-36 md:pb-20">
          <motion.div
            className="contact-hero__content max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <SectionBrandMark size="md" className="contact-hero__mark mb-6" />
            <h1 className="contact-hero__title font-headline text-[#1A2535] mb-8">
              {t('title')}
            </h1>
            <p className="contact-hero__lead font-body text-[#566274]">
              {t('lead')}
            </p>
          </motion.div>
          {/* Architectural accent line */}
          <div className="contact-hero__rail absolute top-24 right-8 hidden lg:block w-px h-64 bg-slate-200/60" />
        </section>

        {/* ── Main grid ────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-8 md:pb-32">
          <h2 className="sr-only">{t('sectionLabel')}</h2>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-24">

            {/* Left column — contact info + map */}
            <motion.div
              className="lg:col-span-4 space-y-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-12">

                {/* Region */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <Globe2 className="w-5 h-5 text-[#E8A838] shrink-0" strokeWidth={1.5} />
                    <h3 className="text-xs font-label font-bold uppercase tracking-widest text-[#566274]">{t('operatingRegion')}</h3>
                  </div>
                  <p className="text-lg font-body leading-relaxed text-[#1A2535]">
                    {t('location')}<br />{' '}
                    {t('remote')}
                  </p>
                </div>

                {/* Email */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <Mail className="w-5 h-5 text-[#E8A838] shrink-0" strokeWidth={1.5} />
                    <h3 className="text-xs font-label font-bold uppercase tracking-widest text-[#566274]">{t('inquiries')}</h3>
                  </div>
                  {CONTACT_EMAILS.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="block min-h-11 text-lg font-body text-[#1A2535] transition-colors hover:text-[#E8A838] [overflow-wrap:anywhere]"
                    >
                      {email}
                    </a>
                  ))}
                </div>

                {/* Phone */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <Phone className="w-5 h-5 text-[#E8A838] shrink-0" strokeWidth={1.5} />
                    <h3 className="text-xs font-label font-bold uppercase tracking-widest text-[#566274]">{t('directLine')}</h3>
                  </div>
                  {CONTACT_PHONES.map((phone) => (
                    <a
                      key={phone.raw}
                      href={`tel:${phone.raw}`}
                      className="block min-h-11 text-lg font-body text-[#1A2535] transition-colors hover:text-[#E8A838]"
                    >
                      {phone.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="bg-[#ECEFF3] aspect-square w-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-neutral-200/50 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
                <Image
                  src="/Images/locations/tangier-morocco-office-location.webp"
                  alt={t('mapAlt')}
                  fill
                  className="w-full h-full object-cover grayscale opacity-80 transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                  <div className="absolute inset-x-4 bottom-4 bg-white px-4 py-2 shadow-sm sm:inset-x-auto sm:left-6 sm:bottom-6">
                  <span className="text-xs font-label font-bold uppercase tracking-tighter text-[#1A2535]">
                    {t('mapLabel')}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right column — form + quote */}
            <motion.div
              className="lg:col-span-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Form card */}
              <div className="relative bg-white p-6 sm:p-8 md:p-12 lg:p-16">
                <div className="absolute inset-0 border border-slate-200/30 pointer-events-none" />
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-label font-bold uppercase tracking-widest text-[#566274] mb-2"
                      >
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
                        className="w-full bg-transparent border-0 border-b py-3 px-0 focus:outline-none text-lg font-body text-[#1A2535] placeholder:text-slate-300"
                        style={{ borderImage: 'linear-gradient(to right, transparent, #E8A838 22%, #E8A838 78%, transparent) 1' }}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-label font-bold uppercase tracking-widest text-[#566274] mb-2"
                      >
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
                        className="w-full bg-transparent border-0 border-b py-3 px-0 focus:outline-none text-lg font-body text-[#1A2535] placeholder:text-slate-300"
                        style={{ borderImage: 'linear-gradient(to right, transparent, #E8A838 22%, #E8A838 78%, transparent) 1' }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* Company */}
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-xs font-label font-bold uppercase tracking-widest text-[#566274] mb-2"
                      >
                        {t('company')}
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder={t('companyPlaceholder')}
                        maxLength={120}
                        className="w-full bg-transparent border-0 border-b py-3 px-0 focus:outline-none text-lg font-body text-[#1A2535] placeholder:text-slate-300"
                        style={{ borderImage: 'linear-gradient(to right, transparent, #E8A838 22%, #E8A838 78%, transparent) 1' }}
                      />
                    </div>

                    {/* Industry */}
                    <div>
                      <label
                        htmlFor="industry"
                        className="block text-xs font-label font-bold uppercase tracking-widest text-[#566274] mb-2"
                      >
                        {t('industry')}
                      </label>
                      <input
                        id="industry"
                        name="industry"
                        type="text"
                        value={formData.industry}
                        onChange={handleChange}
                        placeholder={t('industryPlaceholder')}
                        maxLength={80}
                        className="w-full bg-transparent border-0 border-b py-3 px-0 focus:outline-none text-lg font-body text-[#1A2535] placeholder:text-slate-300"
                        style={{ borderImage: 'linear-gradient(to right, transparent, #E8A838 22%, #E8A838 78%, transparent) 1' }}
                      />
                    </div>
                  </div>

                  {/* Team size */}
                  <div>
                    <label
                      htmlFor="teamSize"
                      className="block text-xs font-label font-bold uppercase tracking-widest text-[#566274] mb-2"
                    >
                      {t('teamSize')}
                    </label>
                    <div className="flex flex-wrap gap-3 pt-1">
                      {['1–10', '11–50', '51–200', '200+'].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, teamSize: prev.teamSize === size ? '' : size }))}
                          className={`min-h-11 px-4 py-2 text-xs font-label font-bold uppercase tracking-widest border transition-colors ${
                            formData.teamSize === size
                              ? 'bg-[#1A2535] text-white border-[#1A2535]'
                              : 'bg-transparent text-[#566274] border-slate-200 hover:border-[#E8A838] hover:text-[#E8A838]'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project brief */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-label font-bold uppercase tracking-widest text-[#566274] mb-2"
                    >
                      {t('brief')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t('briefPlaceholder')}
                      required
                      maxLength={5000}
                      className="w-full bg-transparent border-0 border-b py-3 px-0 focus:outline-none text-lg font-body text-[#1A2535] placeholder:text-slate-300 resize-none"
                      style={{ borderImage: 'linear-gradient(to right, transparent, #E8A838 22%, #E8A838 78%, transparent) 1' }}
                    />
                  </div>

                  {/* CTA row */}
                  <div className="flex flex-col justify-between gap-8 pt-6 md:flex-row md:items-center">
                    <p className="text-sm font-body text-[#566274] max-w-xs leading-relaxed">
                      {t('privacyNote')}
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="sharp-edge group flex min-h-11 w-full items-center justify-center gap-3 bg-[#1A2535] px-10 py-5 font-label text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[#E8A838] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
                    >
                      {isSubmitting ? t('sending') : t('send')}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {status && (
                    <output
                      className={`text-sm font-body ${status.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}
                    >
                      {status.message}
                    </output>
                  )}
                </form>
              </div>

              {/* Quote block */}
              <div className="mt-12 bg-[#F7F8FA] p-6 sm:p-8 lg:p-12 relative overflow-hidden">
                <div className="relative z-10">
                  <span
                    aria-hidden="true"
                    className="font-headline italic text-[#E8A838]/20 text-[6rem] leading-none absolute -top-4 -left-2 select-none"
                  >
                    "
                  </span>
                  <p className="text-2xl md:text-3xl font-headline italic text-[#1A2535] leading-snug">
                    “{t('quote')}”
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="w-12 h-px bg-[#E8A838]" />
                    <span className="text-sm font-label font-bold uppercase tracking-widest text-[#566274]">
                      {t('quoteAttribution')}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>
      </div>
    </MotionConfig>
  );
};

export default Contact;
