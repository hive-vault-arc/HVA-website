'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164} from '../lib/seo';

type LabelDetail = {label: string; detail: string};
type RetentionRow = {category: string; period: string};
type Authority = {audience: string; name: string; description: string; href: string; domain: string};

function BulletList({items}: {items: string[]}) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-secondary">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

function LabelDetailList({items}: {items: LabelDetail[]}) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-secondary">
      {items.map((item) => (
        <li key={item.label}><strong>{item.label}</strong> — {item.detail}</li>
      ))}
    </ul>
  );
}

export default function PrivacyPolicy() {
  const t = useTranslations('Privacy');
  const collection = t.raw('collection.items') as LabelDetail[];
  const purposes = t.raw('purposes.items') as string[];
  const legalBases = t.raw('legalBasis.items') as LabelDetail[];
  const retention = t.raw('retention.rows') as RetentionRow[];
  const recipients = t.raw('sharing.recipients') as LabelDetail[];
  const rights = t.raw('rights.items') as LabelDetail[];
  const authorities = t.raw('authorities.items') as Authority[];
  const security = t.raw('security.items') as string[];

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
          <h2 className="services-brief-section-title">{t('controller.title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">{t('controller.intro')}</p>
          <div className="geo-card card-hover mt-5 space-y-1">
            <p className="text-sm font-semibold text-[#1A2535]">Hive Vault Arc</p>
            <p className="text-sm text-secondary">{t('controller.location')}</p>
            <p className="text-sm text-secondary">
              {t('common.email')}{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline underline-offset-2">{CONTACT_EMAIL}</a>
            </p>
            <p className="text-sm text-secondary">
              {t('common.phone')}{' '}
              <a href={`tel:${CONTACT_PHONE_E164}`} className="text-primary underline underline-offset-2">{CONTACT_PHONE_DISPLAY}</a>
            </p>
          </div>
        </article>

        <article className="mb-12">
          <h2 className="services-brief-section-title">{t('collection.title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">{t('collection.intro')}</p>
          <LabelDetailList items={collection} />
        </article>

        <article className="mb-12">
          <h2 className="services-brief-section-title">{t('purposes.title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">{t('purposes.intro')}</p>
          <BulletList items={purposes} />
        </article>

        <article className="mb-12">
          <h2 className="services-brief-section-title">{t('legalBasis.title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">{t('legalBasis.intro')}</p>
          <LabelDetailList items={legalBases} />
        </article>

        <article className="mb-12">
          <h2 className="services-brief-section-title">{t('cookies.title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">{t('cookies.body')}</p>
        </article>

        <article className="mb-12">
          <h2 className="services-brief-section-title">{t('retention.title')}</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-sm text-secondary">
              <thead>
                <tr className="border-b border-neutral-200 text-left">
                  <th className="pb-3 pr-6 font-semibold text-[#1A2535]">{t('retention.category')}</th>
                  <th className="pb-3 font-semibold text-[#1A2535]">{t('retention.period')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {retention.map((row) => (
                  <tr key={row.category}>
                    <td className="py-3 pr-6">{row.category}</td>
                    <td className="py-3">{row.period}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="mb-12">
          <h2 className="services-brief-section-title">{t('sharing.title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">{t('sharing.intro')}</p>
          <LabelDetailList items={recipients} />
          <p className="mt-4 text-sm leading-relaxed text-secondary">{t('sharing.closing')}</p>
        </article>

        <article className="mb-12">
          <h2 className="services-brief-section-title">{t('transfers.title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">{t('transfers.body')}</p>
        </article>

        <article className="mb-12">
          <h2 className="services-brief-section-title">{t('rights.title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">{t('rights.intro')}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rights.map((item) => (
              <div key={item.label} className="geo-card card-hover space-y-1">
                <p className="text-sm font-semibold text-[#1A2535]">{item.label}</p>
                <p className="text-xs leading-relaxed text-secondary">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-relaxed text-secondary">
            {t('rights.exercisePrefix')}{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline underline-offset-2">{CONTACT_EMAIL}</a>
            {t('rights.exerciseSuffix')}
          </p>
        </article>

        <article className="mb-12">
          <h2 className="services-brief-section-title">{t('authorities.title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">{t('authorities.intro')}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {authorities.map((authority) => (
              <div key={authority.name} className="geo-card card-hover space-y-1">
                <p className="geo-kicker">{authority.audience}</p>
                <p className="text-sm font-semibold text-[#1A2535]">{authority.name}</p>
                <p className="text-sm text-secondary">{authority.description}</p>
                <a href={authority.href} target="_blank" rel="noreferrer noopener" className="text-xs text-primary underline underline-offset-2">
                  {authority.domain}
                </a>
              </div>
            ))}
          </div>
        </article>

        <article className="mb-12">
          <h2 className="services-brief-section-title">{t('security.title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">{t('security.intro')}</p>
          <BulletList items={security} />
        </article>

        <article className="mb-12">
          <h2 className="services-brief-section-title">{t('automated.title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">{t('automated.body')}</p>
        </article>

        <article className="mb-12">
          <h2 className="services-brief-section-title">{t('changes.title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">{t('changes.body')}</p>
        </article>

        <article className="mb-12">
          <h2 className="services-brief-section-title">{t('contact.title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">{t('contact.intro')}</p>
          <div className="geo-card card-hover mt-5 space-y-1">
            <p className="text-sm font-semibold text-[#1A2535]">{t('contact.label')}</p>
            <p className="text-sm text-secondary">Hive Vault Arc</p>
            <p className="text-sm text-secondary">
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline underline-offset-2">{CONTACT_EMAIL}</a>
            </p>
            <p className="mt-1 text-xs text-secondary">{t('contact.response')}</p>
          </div>
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
