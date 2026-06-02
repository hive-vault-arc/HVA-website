import Link from 'next/link';
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164 } from '../lib/seo';

export default function LegalMentions() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="editorial-hero">
        <div className="editorial-shell">
          <p className="editorial-kicker">Legal Information</p>
          <h1 className="editorial-title">Legal Mentions</h1>
          <p className="editorial-lead">
            In accordance with Moroccan commercial and digital publication law (Law 31-08 on
            consumer protection, Code de Commerce) and standard digital publishing practice,
            the following legal information applies to the site hivevaultarc.com.
          </p>
          <p className="geo-kicker mt-6">Last updated: May 3, 2026</p>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="mx-auto max-w-4xl px-6 py-14 lg:px-12">

        {/* 1 — Publisher */}
        <article className="mb-12">
          <h2 className="services-brief-section-title">1. Site Publisher</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            The site <strong>hivevaultarc.com</strong> is published by:
          </p>
          <div className="geo-card card-hover mt-5 space-y-1">
            <p className="text-sm font-semibold text-[#1A2535]">Hive Vault Arc</p>
            <p className="text-sm text-secondary">Tangier, Tanger-Tetouan-Al Hoceima, Morocco</p>
            <p className="text-sm text-secondary">
              Email:{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary underline underline-offset-2"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
            <p className="text-sm text-secondary">
              Phone:{' '}
              <a href={`tel:${CONTACT_PHONE_E164}`} className="text-primary underline underline-offset-2">
                {CONTACT_PHONE_DISPLAY}
              </a>
            </p>
          </div>
        </article>

        {/* 2 — Publication Director */}
        <article className="mb-12">
          <h2 className="services-brief-section-title">2. Publication Director</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            The publication director of hivevaultarc.com is:
          </p>
          <div className="geo-card card-hover mt-5 space-y-1">
            <p className="text-sm font-semibold text-[#1A2535]">Khalid Chalhi</p>
            <p className="text-sm text-secondary">Founder &amp; CEO, Hive Vault Arc</p>
            <p className="text-sm text-secondary">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary underline underline-offset-2"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </article>

        {/* 3 — Hosting */}
        <article className="mb-12">
          <h2 className="services-brief-section-title">3. Hosting</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            The site is hosted by:
          </p>
          <div className="geo-card card-hover mt-5 space-y-1">
            <p className="text-sm font-semibold text-[#1A2535]">Vercel Inc.</p>
            <p className="text-sm text-secondary">340 Pine Street Suite 5</p>
            <p className="text-sm text-secondary">San Francisco, CA 94104, United States</p>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer noopener"
              className="text-xs text-primary underline underline-offset-2"
            >
              vercel.com
            </a>
          </div>
        </article>

        {/* 4 — Intellectual Property */}
        <article className="mb-12">
          <h2 className="services-brief-section-title">4. Intellectual Property</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            All content on hivevaultarc.com — texts, images, graphics, logos, icons, software,
            and any other elements — is protected by Moroccan copyright law under Law No. 2-00
            on copyright and related rights, as well as applicable international conventions.
          </p>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            Any reproduction, representation, modification, publication, or adaptation of any part
            of the site, by any means or process, is prohibited without prior written authorisation
            from Hive Vault Arc. Unauthorised use of the site or any of its elements constitutes
            copyright infringement sanctioned by Articles 64 et seq. of Law 2-00.
          </p>
        </article>

        {/* 5 — Limitation of Liability */}
        <article className="mb-12">
          <h2 className="services-brief-section-title">5. Limitation of Liability</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            Hive Vault Arc endeavours to keep the information published on this site accurate and
            up to date. However, Hive Vault Arc cannot guarantee the accuracy, completeness, or currency
            of this information.
          </p>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            Hive Vault Arc accepts no liability for:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-secondary">
            <li>Errors or omissions in information available on the site.</li>
            <li>
              The content of third-party sites linked from this site — Hive Vault Arc does not control
              these sites and is not responsible for them.
            </li>
            <li>
              Direct or indirect damages resulting from access to the site or use of the
              information it contains.
            </li>
            <li>
              Temporary service interruptions due to maintenance operations or technical causes
              beyond our control.
            </li>
          </ul>
        </article>

        {/* 6 — Personal Data */}
        <article className="mb-12">
          <h2 className="services-brief-section-title">6. Personal Data and CNDP</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            The collection and processing of personal data via this site is governed by{' '}
            <strong>Moroccan Law 09-08</strong> on the protection of individuals with regard to
            the processing of personal data, under the supervision of the{' '}
            <strong>Commission Nationale de contrôle de la protection des Données Personnelles
            (CNDP)</strong>.
          </p>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            For full details on how we collect, use, and protect your data, please refer to our{' '}
            <Link href="/privacy-policy" className="text-primary underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>
        </article>

        {/* 7 — Governing Law */}
        <article className="mb-12">
          <h2 className="services-brief-section-title">7. Governing Law and Jurisdiction</h2>
          <div className="geo-card card-hover mt-5 space-y-3">
            <p className="geo-kicker">Jurisdiction clause</p>
            <p className="text-sm leading-relaxed text-secondary">
              This site and its legal notices are governed by <strong>Moroccan law</strong>.
              In the event of a dispute relating to the use of hivevaultarc.com, and in the
              absence of an amicable resolution, the courts of{' '}
              <strong>Tangier (Morocco)</strong> shall have exclusive jurisdiction, subject to
              mandatory consumer protection provisions applicable to EU residents.
            </p>
            <p className="text-xs text-secondary">
              Applicable law: Moroccan Code de Commerce, Law 31-08, Law 09-08.
            </p>
          </div>
        </article>

        {/* 8 — Cookies */}
        <article className="mb-12">
          <h2 className="services-brief-section-title">8. Cookies</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            hivevaultarc.com uses essential technical cookies required for site operation, as well
            as analytics cookies subject to your prior consent. For more information and to manage
            your preferences, see the &quot;Cookies and Tracking Technologies&quot; section of
            our{' '}
            <Link href="/privacy-policy" className="text-primary underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>
        </article>

      </div>

      {/* ── CTA ── */}
      <div className="border-t border-neutral-200 bg-white px-6 py-14 text-center">
        <p className="text-sm uppercase tracking-widest text-secondary">Legal questions?</p>
        <p className="mt-3 text-2xl font-semibold text-[#1A2535]">
          Our team is available to help.
        </p>
        <Link href="/contact" className="editorial-cta sharp-edge mt-6 inline-flex">
          Contact Us
        </Link>
      </div>
    </>
  );
}
