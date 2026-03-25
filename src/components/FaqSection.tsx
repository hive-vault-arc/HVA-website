import type { FaqItem } from '../data/faqs';
import JsonLd from './JsonLd';

type FaqSectionProps = {
  faqs: FaqItem[];
  /** Section heading. Defaults to "Frequently Asked Questions" */
  heading?: string;
  /** Optional Tailwind class(es) applied to the outer <section> */
  className?: string;
  /** Text direction — pass 'rtl' for Arabic locale pages */
  dir?: 'ltr' | 'rtl';
};

/**
 * Server component that renders:
 *   1. A visible <details>/<summary> accordion (satisfies Google's "content must
 *      be visible to the user" requirement for FAQPage schema).
 *   2. A FAQPage JSON-LD <script> tag via <JsonLd> (injected server-side).
 *
 * Because this is a server component it CANNOT be imported inside a 'use client'
 * view. Place it in the app/ route files (page.tsx) after the view component.
 */
export default function FaqSection({
  faqs,
  heading = 'Frequently Asked Questions',
  className = '',
  dir = 'ltr',
}: FaqSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section
      dir={dir}
      className={`border-t border-[#e2e8f0] bg-[#F8FAFC] py-20 ${className}`}
    >
      {/* Inject FAQPage schema — server-rendered, zero hydration cost */}
      <JsonLd data={faqSchema} />

      <div className="mx-auto max-w-4xl px-6 lg:px-14">
        <h2 className="mb-12 font-serif text-3xl font-semibold tracking-tight text-[#0F172A] lg:text-4xl">
          {heading}
        </h2>

        <dl className="divide-y divide-[#e2e8f0]">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="group py-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
                <dt className="text-base font-medium text-[#0F172A] lg:text-lg">
                  {item.question}
                </dt>
                {/* Plus / minus indicator — pure CSS, no JS */}
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex-shrink-0 text-[#2563EB] transition-transform duration-200 group-open:rotate-45"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                  </svg>
                </span>
              </summary>

              <dd className="mt-4 pr-12 text-sm leading-relaxed text-[#475569] lg:text-base">
                {item.answer}
              </dd>
            </details>
          ))}
        </dl>
      </div>
    </section>
  );
}
