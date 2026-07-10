import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FaqSection from '../../components/FaqSection';
import JsonLd from '../../components/JsonLd';
import type { FaqItem } from '../../data/faqs';
import { SITE_URL, absoluteUrl, buildBreadcrumbSchema, buildPageMetadata } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'IT Consulting in Tangier — Technology Strategy & Digital Transformation',
  description:
    'Hive Vault Arc provides IT consulting and digital transformation services to businesses in Tangier and across all Moroccan cities. Technology audits, architecture design, system integration, and AI strategy.',
  path: '/it-consulting-tangier',
  keywords: [
    'IT consulting Tangier',
    'technology consulting Tangier',
    'digital transformation Tangier',
    'IT services Tangier',
    'tech consulting Morocco',
  ],
});

const IT_CONSULTING_TANGIER_FAQS: FaqItem[] = [
  {
    question: 'What does IT consulting include at Hive Vault Arc?',
    answer:
      'It includes technology audits, roadmap definition, architecture planning, execution governance, and hands-on delivery support so strategic decisions become working systems.',
  },
  {
    question: 'Do you only advise, or do you also implement?',
    answer:
      'Hive Vault Arc does both. We provide consulting and stay accountable through implementation, stabilization, and optimization rather than stopping at slide decks.',
  },
  {
    question: 'Can you help modernize a fragmented legacy setup?',
    answer:
      'Yes. We regularly work with fragmented tool stacks and legacy workflows, then design phased modernization plans that avoid operational disruption.',
  },
  {
    question: 'Why work with a Tangier-based consulting team?',
    answer:
      'Local context matters for language, decision rhythms, compliance sensitivity, and stakeholder coordination. Our team combines local presence with global engineering standards.',
  },
  {
    question: 'How do we start an IT consulting engagement?',
    answer:
      'Start with a discovery session. We map current constraints, define target outcomes, and recommend a practical consulting-to-delivery sequence.',
  },
];

export default function ITConsultingTangierPage() {
  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'IT Consulting in Tangier',
    provider: { '@id': `${SITE_URL}/#organization` },
    serviceType: 'IT Consulting',
    areaServed: [
      { '@type': 'Country', name: 'Morocco' },
      {
        '@type': 'City',
        name: 'Tangier',
        containedInPlace: { '@type': 'Country', name: 'Morocco' },
      },
      { '@type': 'City', name: 'Casablanca' },
      { '@type': 'City', name: 'Rabat' },
      { '@type': 'City', name: 'Marrakech' },
      { '@type': 'City', name: 'Fes' },
      { '@type': 'City', name: 'Agadir' },
    ],
    availableLanguage: ['en', 'fr', 'ar', 'es'],
    url: `${SITE_URL}/it-consulting-tangier`,
    description:
      'Technology strategy, architecture design, and digital transformation consulting for businesses operating in Tangier and all Moroccan cities.',
    image: absoluteUrl('/Images/hero/strategic-technology-consulting-tangier-morocco.webp'),
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'IT Consulting Tangier', path: '/it-consulting-tangier' },
  ]);

  return (
    <>
      <JsonLd data={[professionalServiceSchema, breadcrumbSchema]} />

      <div className="bg-neutral text-tertiary">

        {/* ── Hero ── */}
        <section className="editorial-hero">
          <div className="editorial-shell grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
            <div>
              <p className="geo-kicker">Tangier Technology Advisory</p>
              <h1 className="editorial-title">IT Consulting for Tangier&apos;s Growing Businesses</h1>
              <p className="editorial-lead max-w-3xl">
                Hive Vault Arc supports leadership teams in Tangier with consulting that connects strategy to execution. We help you
                decide what to modernize, when to invest, and how to deliver without creating operational instability. We
                support organizations in Tangier, Casablanca, Rabat, Marrakech, Fes, Agadir, and other Moroccan cities. The
                goal is not simply to choose technology; it is to build a reliable operating model for growth.
              </p>
              <div className="editorial-actions">
                <Link href="/contact" className="editorial-cta sharp-edge">
                  Book an IT Discovery
                </Link>
                <Link href="/arc" className="editorial-link">
                  View ARC Framework →
                </Link>
              </div>
            </div>
            <div className="relative min-h-[18rem] overflow-hidden bg-[#E8EBF0] md:min-h-[25rem]">
              <Image
                src="/Images/capabilities/hva-technology-consulting-capability.webp"
                alt="Technology consultants reviewing architecture, workflow, and operating signals"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
          </div>
        </section>

        {/* ── Feature band ── */}
        <section className="border-y border-[#DDE3EA] bg-white">
          <div className="mx-auto max-w-5xl px-6 py-12 lg:px-12">
            <h2 className="services-brief-section-title">
              What Hive Vault Arc Delivers as Your IT Consulting Partner
            </h2>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              IT consulting should reduce decision uncertainty, not add theoretical complexity. Hive Vault Arc starts by
              diagnosing your current architecture, operational bottlenecks, and governance gaps, then translates that
              into a clear roadmap with execution priorities. This includes technical sequencing, ownership boundaries,
              and business impact checkpoints.
            </p>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              We treat consulting as part of delivery. That means architecture advice is tied to implementation
              realities, cost boundaries, and team readiness. You get practical options with tradeoffs, not generic best
              practices disconnected from your market context.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="geo-card card-hover">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-primary">Strategic Layer</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  Technology audit, roadmap design, risk framing, investment prioritization, and transformation
                  governance.
                </p>
              </div>
              <div className="geo-card card-hover">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-primary">Execution Layer</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  Architecture decisions, implementation planning, integration sequencing, and performance tracking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Body sections ── */}
        <section className="mx-auto max-w-5xl space-y-12 px-6 py-14 lg:px-12">
          <article>
            <h2 className="services-brief-section-title">ARC Framework: Assess → Re-engineer → Command</h2>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              Hive Vault Arc uses ARC as a practical consulting-to-delivery path. In <strong>Assess</strong>, we map
              current systems, process friction, and decision bottlenecks. In <strong>Re-engineer</strong>, we redesign
              workflows, define architecture principles, and execute the prioritized build. In <strong>Command</strong>,
              we stabilize production, track operating outcomes, and improve the system over time.
            </p>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              This structure prevents a common failure pattern in consulting engagements: strategy that never becomes
              production. ARC keeps accountability continuous and measurable from planning to operations.
            </p>
          </article>

          <article>
            <h2 className="services-brief-section-title">Core IT Consulting Services in Tangier</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="geo-card card-hover">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-primary">System Architecture</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  Target-state architecture for business-critical systems, with scalability and maintainability built in.
                </p>
              </div>
              <div className="geo-card card-hover">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-primary">Database Design</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  Data model review, normalization strategy, and performance-aware schema planning for operational use.
                </p>
              </div>
              <div className="geo-card card-hover">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-primary">API Development Strategy</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  API design governance, integration contracts, and security principles for stable system communication.
                </p>
              </div>
              <div className="geo-card card-hover">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-primary">Cloud Infrastructure</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  Environment strategy, deployment reliability, observability readiness, and long-term operations posture.
                </p>
              </div>
            </div>
          </article>

          <article>
            <h2 className="services-brief-section-title">Why Local IT Consulting Matters in Tangier</h2>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              Local presence changes execution quality. Tangier organizations often operate across Arabic and French
              communication environments, with decision structures that require both technical rigor and practical
              stakeholder alignment. A local consulting partner can shorten loops between leadership intent and delivery
              action because context is understood directly, not inferred remotely.
            </p>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              Hive Vault Arc combines this local understanding with global engineering standards. You get technical depth that can
              scale beyond local boundaries while still respecting market-specific realities such as regulatory
              sensitivity, bilingual operations, and cross-functional coordination patterns.
            </p>
          </article>

          <article>
            <h2 className="services-brief-section-title">
              Typical Engagement Timeline and What to Expect
            </h2>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              A focused IT consulting engagement usually starts with a two- to four-week discovery and architecture
              window. During this stage we interview stakeholders, inspect systems, map data and process dependencies,
              and define risk boundaries. The output is a practical roadmap that leadership can use for decision-making.
            </p>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              Execution advisory and implementation oversight then run in milestone cycles. Each cycle includes technical
              design review, progress checkpoints, and operating impact validation. This structure gives leadership
              regular clarity on scope movement, timeline confidence, and where additional investment will produce the
              strongest outcomes.
            </p>
            <ul className="mt-5 grid gap-3 text-sm leading-relaxed text-secondary md:grid-cols-3">
              <li className="geo-card card-hover">Phase 1: Audit and architecture baseline.</li>
              <li className="geo-card card-hover">Phase 2: Roadmap with implementation priorities.</li>
              <li className="geo-card card-hover">Phase 3: Advisory through rollout and stabilization.</li>
            </ul>
          </article>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="border-t border-[#DDE3EA] bg-white">
          <div className="mx-auto max-w-5xl px-6 py-12 lg:px-12">
            <h2 className="services-brief-section-title">Need an IT Strategy You Can Actually Execute?</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-secondary">
              We can map your current setup, define the right modernization sequence, and move from consulting decisions
              to production execution with clear ownership.
            </p>
            <div className="editorial-actions mt-7">
              <Link href="/arc" className="editorial-cta sharp-edge">
                Explore ARC
              </Link>
              <Link href="/contact" className="editorial-link">
                Talk to Hive Vault Arc →
              </Link>
              <Link href="/digital-services-tangier" className="editorial-link">
                Explore All Digital Services →
              </Link>
            </div>
          </div>
        </section>
      </div>

      <FaqSection faqs={IT_CONSULTING_TANGIER_FAQS} heading="IT Consulting in Tangier: Frequently Asked Questions" />
    </>
  );
}
