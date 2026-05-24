import Link from 'next/link';
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164 } from '../lib/seo';

export default function PrivacyPolicy() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="editorial-hero">
        <div className="editorial-shell">
          <p className="editorial-kicker">Compliance &amp; Data Protection</p>
          <h1 className="editorial-title">Privacy Policy</h1>
          <p className="editorial-lead">
            Hive Vault Arc is committed to protecting your personal data in compliance
            with Moroccan Law 09-08 on the protection of individuals with regard to the processing
            of personal data (CNDP), as well as the General Data Protection Regulation (GDPR)
            applicable to residents of the European Union under its extraterritorial scope.
          </p>
          <p className="geo-kicker mt-6">Last updated: May 3, 2026</p>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="mx-auto max-w-4xl px-6 py-14 lg:px-12">

        {/* 1 — Data Controller */}
        <article className="mb-12">
          <h2 className="services-brief-section-title">1. Data Controller</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            The data controller for personal data collected via <strong>hivevaultarc.com</strong> is:
          </p>
          <div className="geo-card card-hover mt-5 space-y-1">
            <p className="text-sm font-semibold text-[#1A2535]">Hive Vault Arc</p>
            <p className="text-sm text-secondary">Tangier, Tanger-Tetouan-Al Hoceima, Morocco</p>
            <p className="text-sm text-secondary">
              Email:{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline underline-offset-2">
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

        {/* 2 — Data Collected */}
        <article className="mb-12">
          <h2 className="services-brief-section-title">2. Data We Collect</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            We collect only the data strictly necessary for the purposes described below:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-secondary">
            <li>
              <strong>Contact form</strong> — name, email address, phone number (optional),
              company name (optional), industry (optional), team size (optional), message.
            </li>
            <li>
              <strong>Server logs</strong> — IP address, browser type and version, pages visited,
              request timestamps.
            </li>
            <li>
              <strong>Analytics data</strong> — aggregated navigation metrics (page views, session
              duration) collected via Vercel Analytics.
            </li>
          </ul>
        </article>

        {/* 3 — Purposes */}
        <article className="mb-12">
          <h2 className="services-brief-section-title">3. Purposes of Processing</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            Your data is processed for the following purposes:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-secondary">
            <li>Responding to your contact requests and enquiries about our services.</li>
            <li>Drafting and delivering commercial proposals and service agreements.</li>
            <li>Improving website performance and user experience.</li>
            <li>Complying with applicable legal and regulatory obligations.</li>
          </ul>
        </article>

        {/* 4 — Legal Basis */}
        <article className="mb-12">
          <h2 className="services-brief-section-title">4. Legal Basis for Processing</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            Each processing activity rests on a legal basis compliant with Article 6 of the GDPR
            and Article 4 of Law 09-08:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-secondary">
            <li>
              <strong>Consent</strong> — contact form: you voluntarily submit your information
              to us.
            </li>
            <li>
              <strong>Performance of a contract</strong> — processing necessary to fulfil an
              agreed service engagement.
            </li>
            <li>
              <strong>Legitimate interest</strong> — server logs and anonymised analytics for
              site security and improvement.
            </li>
          </ul>
        </article>

        {/* 5 — Cookies */}
        <article className="mb-12">
          <h2 className="services-brief-section-title">5. Cookies and Tracking Technologies</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            The site uses two categories of cookies:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-secondary">
            <li>
              <strong>Essential cookies</strong> — technically required for site operation
              (security, navigation). Active by default; no consent required.
            </li>
            <li>
              <strong>Analytics cookies</strong> — audience measurement via Vercel Analytics.
              These cookies are disabled until you have given explicit consent.
            </li>
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-secondary">
            You can modify your cookie preferences at any time through your browser settings.
          </p>
        </article>

        {/* 6 — Retention */}
        <article className="mb-12">
          <h2 className="services-brief-section-title">6. Data Retention</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-sm text-secondary">
              <thead>
                <tr className="border-b border-neutral-200 text-left">
                  <th className="pb-3 pr-6 font-semibold text-[#1A2535]">Data category</th>
                  <th className="pb-3 font-semibold text-[#1A2535]">Retention period</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                <tr>
                  <td className="py-3 pr-6">Contact form data</td>
                  <td className="py-3">2 years from last contact</td>
                </tr>
                <tr>
                  <td className="py-3 pr-6">Server logs</td>
                  <td className="py-3">12 months</td>
                </tr>
                <tr>
                  <td className="py-3 pr-6">Client data (active contracts)</td>
                  <td className="py-3">5 years after end of commercial relationship</td>
                </tr>
                <tr>
                  <td className="py-3 pr-6">Cookie consent</td>
                  <td className="py-3">3 years</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        {/* 7 — Sharing */}
        <article className="mb-12">
          <h2 className="services-brief-section-title">7. Data Sharing and Recipients</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            We never sell your personal data. Authorised recipients are strictly limited to the
            technical sub-processors necessary to operate the site:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-secondary">
            <li>
              <strong>Vercel Inc.</strong> — site hosting and deployment (San Francisco, CA, USA).
            </li>
            <li>
              <strong>Vercel Analytics</strong> — anonymised audience measurement.
            </li>
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-secondary">
            None of your data is shared with third parties for advertising or marketing purposes.
          </p>
        </article>

        {/* 8 — International Transfers */}
        <article className="mb-12">
          <h2 className="services-brief-section-title">8. International Data Transfers</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            Data hosted on Vercel servers (USA) involves a transfer outside the European Economic
            Area, governed by <strong>Standard Contractual Clauses (SCCs)</strong> approved by
            the European Commission under Article 46 of the GDPR. For transfers outside Morocco,
            Hive Vault Arc complies with the requirements of Article 43 of Law 09-08 and applicable
            authorisations from the CNDP.
          </p>
        </article>

        {/* 9 — Your Rights */}
        <article className="mb-12">
          <h2 className="services-brief-section-title">9. Your Rights</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            Under the GDPR (Articles 15–22) and Law 09-08, you have the following rights:
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { right: "Right of Access", detail: "Obtain a copy of your data being processed." },
              { right: "Right to Rectification", detail: "Correct inaccurate or incomplete data." },
              { right: "Right to Erasure", detail: "Request deletion of your data (right to be forgotten)." },
              { right: "Right to Restriction", detail: "Temporarily suspend processing of your data." },
              { right: "Right to Portability", detail: "Receive your data in a structured, machine-readable format." },
              { right: "Right to Object", detail: "Object to processing based on legitimate interest." },
            ].map(({ right, detail }) => (
              <div key={right} className="geo-card card-hover space-y-1">
                <p className="text-sm font-semibold text-[#1A2535]">{right}</p>
                <p className="text-xs leading-relaxed text-secondary">{detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-relaxed text-secondary">
            To exercise your rights, send your request to{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline underline-offset-2">{CONTACT_EMAIL}</a>
            {'. We are committed to responding within '}<strong>30 days</strong>{'.'}
          </p>
        </article>

        {/* 10 — Supervisory Authorities */}
        <article className="mb-12">
          <h2 className="services-brief-section-title">10. Supervisory Authorities</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            If you believe the processing of your data infringes your rights, you may lodge a
            complaint with the competent authority:
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="geo-card card-hover space-y-1">
              <p className="geo-kicker">Users in Morocco</p>
              <p className="text-sm font-semibold text-[#1A2535]">CNDP</p>
              <p className="text-sm text-secondary">
                Commission Nationale de contrôle de la Protection des Données Personnelles
              </p>
              <a
                href="https://www.cndp.ma"
                target="_blank"
                rel="noreferrer noopener"
                className="text-xs text-primary underline underline-offset-2"
              >
                www.cndp.ma
              </a>
            </div>
            <div className="geo-card card-hover space-y-1">
              <p className="geo-kicker">Users in the EU</p>
              <p className="text-sm font-semibold text-[#1A2535]">CNIL (France) or local DPA</p>
              <p className="text-sm text-secondary">
                Data Protection Authority of your country of residence
              </p>
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noreferrer noopener"
                className="text-xs text-primary underline underline-offset-2"
              >
                www.cnil.fr
              </a>
            </div>
          </div>
        </article>

        {/* 11 — Security */}
        <article className="mb-12">
          <h2 className="services-brief-section-title">11. Data Security</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            Hive Vault Arc implements appropriate technical and organisational measures to protect your
            data against loss, unauthorised access, disclosure, or accidental destruction:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-secondary">
            <li>Encryption of data in transit via HTTPS / TLS 1.3.</li>
            <li>Strict access controls on systems holding personal data.</li>
            <li>Documented security incident response procedures.</li>
            <li>Regular review of user access rights.</li>
          </ul>
        </article>

        {/* 12 — Automated Decision-Making */}
        <article className="mb-12">
          <h2 className="services-brief-section-title">12. Automated Decision-Making and Profiling</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            hivevaultarc.com does not carry out any fully automated decision-making or profiling
            within the meaning of Article 22 of the GDPR. No algorithm makes decisions with legal
            or similarly significant effects on you based on your data.
          </p>
        </article>

        {/* 13 — Changes */}
        <article className="mb-12">
          <h2 className="services-brief-section-title">13. Changes to This Policy</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            Hive Vault Arc reserves the right to update this Privacy Policy at any time to reflect changes
            in its practices or applicable legal obligations. In the event of a material change,
            you will be notified by email (if you have provided your address) or via a notice on
            the site. The &quot;Last updated&quot; date at the top of this page will always be
            revised accordingly.
          </p>
        </article>

        {/* 14 — Contact */}
        <article className="mb-12">
          <h2 className="services-brief-section-title">14. Contact Us</h2>
          <p className="mt-4 text-base leading-relaxed text-secondary">
            For any questions regarding this policy or to exercise your rights, contact our team:
          </p>
          <div className="geo-card card-hover mt-5 space-y-1">
            <p className="text-sm font-semibold text-[#1A2535]">Data Protection Contact</p>
            <p className="text-sm text-secondary">Hive Vault Arc</p>
            <p className="text-sm text-secondary">
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline underline-offset-2">
                {CONTACT_EMAIL}
              </a>
            </p>
            <p className="text-xs text-secondary mt-1">Response time: 30 days maximum</p>
          </div>
        </article>

      </div>

      {/* ── CTA ── */}
      <div className="border-t border-neutral-200 bg-white px-6 py-14 text-center">
        <p className="text-sm uppercase tracking-widest text-secondary">Have a question?</p>
        <p className="mt-3 text-2xl font-semibold text-[#1A2535]">
          Get in touch with our team directly.
        </p>
        <Link href="/contact" className="editorial-cta sharp-edge mt-6 inline-flex">
          Contact Us
        </Link>
      </div>
    </>
  );
}
