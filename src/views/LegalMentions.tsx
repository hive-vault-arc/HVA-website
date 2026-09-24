'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {CONTACT_EMAIL, CONTACT_PHONES} from '../lib/seo';

export default function LegalMentions() {
  const t = useTranslations('Legal');
  const liabilityItems = t.raw('liability.items') as string[];

  return (
    <>
      <section className="editorial-hero">
        <div className="editorial-shell">
          <p className="editorial-kicker">{t('hero.eyebrow')}</p>
          <h1 className="editorial-title">{t('hero.title')}</h1>
          <p className="editorial-lead">{t('hero.description')}</p>
          <p className="geo-kicker mt-6">{t('hero.updated')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-14 lg:px-12">
        <article className="mb-12">
          <h2 className="services-brief-section-title">{t('publisher.title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">{t('publisher.intro')}</p>
          <div className="geo-card card-hover mt-5 space-y-1">
            <p className="text-sm font-semibold text-[#1A2535]">Hive Vault Arc</p>
            <p className="text-sm text-secondary">{t('publisher.location')}</p>
            <p className="text-sm text-secondary">
              {t('common.email')}{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline underline-offset-2">{CONTACT_EMAIL}</a>
            </p>
            <p className="text-sm text-secondary">
              {t('common.phone')}{' '}
              <span className="inline-flex flex-wrap gap-x-3 gap-y-1">
                {CONTACT_PHONES.map(({e164, display}) => (
                  <a key={e164} href={`tel:${e164}`} className="text-primary underline underline-offset-2">
                    {display}
                  </a>
                ))}
              </span>
            </p>
          </div>
        </article>

        <article className="mb-12">
          <h2 className="services-brief-section-title">{t('director.title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">{t('director.intro')}</p>
          <div className="geo-card card-hover mt-5 space-y-1">
            <p className="text-sm font-semibold text-[#1A2535]">Khalid Chalhi</p>
            <p className="text-sm text-secondary">{t('director.role')}</p>
            <p className="text-sm text-secondary">
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline underline-offset-2">{CONTACT_EMAIL}</a>
            </p>
          </div>
        </article>

        <article className="mb-12">
          <h2 className="services-brief-section-title">{t('hosting.title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">{t('hosting.intro')}</p>
          <div className="geo-card card-hover mt-5 space-y-1">
            <p className="text-sm font-semibold text-[#1A2535]">Vercel Inc.</p>
            <p className="text-sm text-secondary">440 N Barranca Avenue #4133</p>
            <p className="text-sm text-secondary">{t('hosting.location')}</p>
            <a href="https://vercel.com" target="_blank" rel="noreferrer noopener" className="text-xs text-primary underline underline-offset-2">vercel.com</a>
          </div>
        </article>

        <article className="mb-12">
          <h2 className="services-brief-section-title">{t('intellectualProperty.title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">{t('intellectualProperty.bodyOne')}</p>
          <p className="mt-4 text-base leading-relaxed text-secondary">{t('intellectualProperty.bodyTwo')}</p>
        </article>

        <article className="mb-12">
          <h2 className="services-brief-section-title">{t('liability.title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">{t('liability.intro')}</p>
          <p className="mt-4 text-base leading-relaxed text-secondary">{t('liability.leadIn')}</p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-secondary">
            {liabilityItems.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>

        <article className="mb-12">
          <h2 className="services-brief-section-title">{t('personalData.title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">{t('personalData.body')}</p>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            {t('personalData.linkPrefix')}{' '}
            <Link href="/privacy-policy" className="text-primary underline underline-offset-2">{t('personalData.linkLabel')}</Link>.
          </p>
        </article>

        <article className="mb-12">
          <h2 className="services-brief-section-title">{t('jurisdiction.title')}</h2>
          <div className="geo-card card-hover mt-5 space-y-3">
            <p className="geo-kicker">{t('jurisdiction.eyebrow')}</p>
            <p className="text-sm leading-relaxed text-secondary">{t('jurisdiction.body')}</p>
            <p className="text-xs text-secondary">{t('jurisdiction.laws')}</p>
          </div>
        </article>

        <article className="mb-12">
          <h2 className="services-brief-section-title">{t('cookies.title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            {t('cookies.body')}{' '}
            <Link href="/cookie-policy" className="text-primary underline underline-offset-2">{t('cookies.linkLabel')}</Link>.
          </p>
        </article>
      </div>

      <div className="border-t border-neutral-200 bg-white px-6 py-14 text-center">
        <p className="text-sm uppercase tracking-widest text-secondary">{t('cta.eyebrow')}</p>
        <p className="mt-3 text-2xl font-semibold text-[#1A2535]">{t('cta.title')}</p>
        <Link href="/contact" className="editorial-cta sharp-edge mt-6 inline-flex">{t('cta.label')}</Link>
      </div>
    </>
  );
}
