'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

type CookieRow = {
  name: string;
  provider: string;
  purpose: string;
  lifetime: string;
};

export default function CookiePolicy() {
  const t = useTranslations('CookiePolicy');
  const rows = t.raw('table.rows') as CookieRow[];

  return (
    <>
      <section className="editorial-hero cookie-policy-hero">
        <div className="editorial-shell">
          <p className="editorial-kicker">{t('hero.eyebrow')}</p>
          <h1 className="editorial-title">{t('hero.title')}</h1>
          <p className="editorial-lead">{t('hero.description')}</p>
          <p className="geo-kicker mt-6">{t('hero.updated')}</p>
        </div>
      </section>

      <article className="cookie-policy-page mx-auto max-w-4xl px-6 py-14 lg:px-12">
        <section>
          <h2 className="services-brief-section-title">{t('overview.title')}</h2>
          <p>{t('overview.body')}</p>
        </section>
        <section>
          <h2 className="services-brief-section-title">{t('necessary.title')}</h2>
          <p>{t('necessary.body')}</p>
        </section>
        <section>
          <h2 className="services-brief-section-title">{t('analytics.title')}</h2>
          <p>{t('analytics.body')}</p>
          <p><a href="https://privacy.microsoft.com/privacystatement" className="underline underline-offset-2">{t('analytics.privacyLink')}</a></p>
        </section>
        <section>
          <h2 className="services-brief-section-title">{t('table.title')}</h2>
          <div className="cookie-policy-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{t('table.name')}</th>
                  <th>{t('table.provider')}</th>
                  <th>{t('table.purpose')}</th>
                  <th>{t('table.lifetime')}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>{row.provider}</td>
                    <td>{row.purpose}</td>
                    <td>{row.lifetime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2 className="services-brief-section-title">{t('choices.title')}</h2>
          <p>{t('choices.body')}</p>
        </section>
        <section>
          <h2 className="services-brief-section-title">{t('contact.title')}</h2>
          <p>{t('contact.body')}</p>
          <p>
            <Link href="/privacy-policy" className="text-primary underline underline-offset-2">
              {t('contact.privacyLink')}
            </Link>
          </p>
        </section>
      </article>
    </>
  );
}
