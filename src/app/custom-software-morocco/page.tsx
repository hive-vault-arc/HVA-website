import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@/components/icons';
import FaqSection from '../../components/FaqSection';
import JsonLd from '../../components/JsonLd';
import type { FaqItem } from '../../data/faqs';
import { SITE_URL, absoluteUrl, buildBreadcrumbSchema, buildPageMetadata } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Custom Software Development in Morocco — FastAPI, Next.js, SaaS',
  description:
    'Hive Vault Arc builds custom software for Moroccan businesses. FastAPI backends, Next.js frontends, SaaS platforms, and AI-powered applications. Based in Tangier, serving all of Morocco.',
  path: '/custom-software-morocco',
  keywords: [
    'custom software Morocco',
    'software development Morocco',
    'SaaS development Morocco',
    'web application Morocco',
    'FastAPI development Morocco',
  ],
});

const CUSTOM_SOFTWARE_MOROCCO_FAQS: FaqItem[] = [
  {
    question: 'When should a company choose custom software instead of off-the-shelf tools?',
    answer:
      'Custom software is usually the better option when your core workflow is unique, your team is using multiple disconnected tools, or growth is blocked by manual operations and integration gaps.',
  },
  {
    question: 'What technologies does Hive Vault Arc use for custom software projects?',
    answer:
      'Typical stacks include FastAPI for backend services, Next.js for frontends, PostgreSQL for structured data, and optional AI layers when automation or decision intelligence is part of the scope.',
  },
  {
    question: 'Can Hive Vault Arc build both internal tools and customer-facing platforms?',
    answer:
      'Yes. We build internal systems, SaaS products, customer portals, and hybrid platforms that combine operations and customer experiences in one architecture.',
  },
  {
    question: 'How is delivery managed to reduce project risk?',
    answer:
      'We deliver in milestones with sprint-based checkpoints, shared visibility, and explicit quality gates so scope and risk stay controlled throughout implementation.',
  },
  {
    question: 'Does Hive Vault Arc support software after launch?',
    answer:
      'Yes. We provide post-launch optimization and maintenance support to keep performance, reliability, and feature evolution aligned with business growth.',
  },
];

export default function CustomSoftwareMoroccoPage() {
  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Custom Software Development in Morocco',
    provider: { '@id': `${SITE_URL}/#organization` },
    serviceType: 'Custom Software Development',
    areaServed: [{ '@type': 'Country', name: 'Morocco' }],
    availableLanguage: ['en', 'fr', 'ar', 'es'],
    url: `${SITE_URL}/custom-software-morocco`,
    description:
      'Custom web applications, SaaS products, and AI-enabled systems built for Moroccan businesses with FastAPI and Next.js.',
    image: absoluteUrl('/Images/services/web-application-development-morocco.webp'),
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Custom Software Morocco', path: '/custom-software-morocco' },
  ]);

  return (
    <>
      <JsonLd data={[professionalServiceSchema, breadcrumbSchema]} />

      <div className="bg-neutral text-tertiary">

        {/* ── Hero ── */}
        <section className="editorial-hero">
          <div className="editorial-shell grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
            <div>
              <p className="geo-kicker">National Software Engineering</p>
              <h1 className="editorial-title">Custom Software Built for Moroccan Businesses</h1>
              <p className="editorial-lead max-w-3xl">
                Hive Vault Arc designs and delivers custom software systems that fit how your business really operates. From
                FastAPI-powered backend services to Next.js frontends and full SaaS platforms, we build production-ready
                applications that replace workflow friction with reliable execution and measurable operational control.
              </p>
              <div className="editorial-actions">
                <Link href="/contact" className="editorial-cta sharp-edge">
                  Scope a Software Build
                </Link>
                <Link href="/it-consulting-tangier" className="editorial-link">
                  IT Consulting Guide <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="relative min-h-[18rem] overflow-hidden bg-[#E8EBF0] md:min-h-[25rem]">
              <Image
                src="/Images/blog/custom-crm-system-morocco.webp"
                alt="Production custom CRM interface built around a Moroccan business workflow"
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
              What Custom Software Means in Practical Terms
            </h2>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              Off-the-shelf tools are useful, but they are built for average use cases. When your operation has specific
              process logic, multi-team coordination needs, or sector-specific rules, those tools often create hidden
              costs: duplicate data entry, manual workarounds, and fragmented visibility across departments.
            </p>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              Custom software changes that equation. Instead of adapting your process to tool limitations, the system is
              designed around your process. That improves adoption, reduces operational overhead, and creates better data
              for decision-making because the workflow is captured correctly from the first interaction.
            </p>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              The value is not only in feature customization. It is in compounding execution quality: faster team handoff,
              cleaner process governance, and less time wasted on non-value-adding tasks.
            </p>
          </div>
        </section>

        {/* ── Body sections ── */}
        <section className="mx-auto max-w-5xl space-y-12 px-6 py-14 lg:px-12">
          <article>
            <h2 className="services-brief-section-title">Hive Vault Arc Technology Stack for Delivery</h2>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              We select technology based on reliability, maintainability, and long-term evolution. FastAPI is often used
              for structured backend services with strong API performance and integration flexibility. Next.js enables
              modern web interfaces and SEO-ready frontends for both internal and customer-facing systems. PostgreSQL
              supports dependable data architecture, while AI/ML layers can be added where automation and intelligence
              create measurable value.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="geo-card card-hover">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-primary">Backend</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  FastAPI services, integration logic, workflow orchestration, and secure API design.
                </p>
              </div>
              <div className="geo-card card-hover">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-primary">Frontend</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  Next.js interfaces optimized for speed, usability, and operational clarity.
                </p>
              </div>
              <div className="geo-card card-hover">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-primary">Data Layer</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  PostgreSQL schemas designed for consistency, reporting readiness, and scale.
                </p>
              </div>
              <div className="geo-card card-hover">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-primary">AI Layer</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  Optional automation and intelligence modules for support, lead operations, and decision workflows.
                </p>
              </div>
            </div>
          </article>

          <article>
            <h2 className="services-brief-section-title">Types of Software We Build in Morocco</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="geo-card card-hover">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-primary">SaaS Platforms</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  Productized systems with role-based access, billing-ready architecture, and long-term feature
                  evolution.
                </p>
              </div>
              <div className="geo-card card-hover">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-primary">Internal Tools</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  Operations portals, process dashboards, and team workflows that remove friction from daily execution.
                </p>
              </div>
              <div className="geo-card card-hover">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-primary">AI-Integrated Systems</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  Software platforms that combine workflow logic with AI-assisted routing, support, or insight layers.
                </p>
              </div>
            </div>
          </article>

          <article>
            <h2 className="services-brief-section-title">Build Process: Sprint-Based and Outcome-Led</h2>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              We run software delivery in scoped sprints with explicit checkpoints. Each phase has defined outputs,
              acceptance criteria, and stakeholder review cadence so there is constant visibility into progress, risk,
              and decision points.
            </p>
            <ol className="mt-5 grid gap-4 md:grid-cols-2">
              <li className="geo-card card-hover">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">01 Discovery &amp; Design</p>
                <p className="mt-2 text-sm leading-relaxed text-secondary">
                  Clarify business outcomes, define system boundaries, and lock architecture direction.
                </p>
              </li>
              <li className="geo-card card-hover">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">02 Incremental Build</p>
                <p className="mt-2 text-sm leading-relaxed text-secondary">
                  Ship core modules in iterations with QA controls and shared review points.
                </p>
              </li>
              <li className="geo-card card-hover">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">03 Launch &amp; Stabilize</p>
                <p className="mt-2 text-sm leading-relaxed text-secondary">
                  Deploy to production, monitor system health, and resolve post-launch issues quickly.
                </p>
              </li>
              <li className="geo-card card-hover">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">04 Optimize &amp; Scale</p>
                <p className="mt-2 text-sm leading-relaxed text-secondary">
                  Improve performance, expand capabilities, and align the roadmap to growth-stage priorities.
                </p>
              </li>
            </ol>
          </article>

          <article>
            <h2 className="services-brief-section-title">Build vs Buy: A Practical Decision Lens</h2>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              Many leadership teams hesitate between buying another SaaS tool and funding a custom build. The right
              decision depends on process criticality. If the workflow directly affects revenue, service quality, or
              cross-team execution speed, repeated manual workarounds quickly become more expensive than targeted custom
              development.
            </p>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              We evaluate the decision through manual effort, error and rework, and
              conversion or fulfillment performance gains. When a process is high-frequency and operationally central, a
              custom system often wins because it removes hidden inefficiencies that generic tools cannot address.
            </p>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              The best path is not always full replacement. Sometimes the most effective approach is a hybrid model:
              keep existing tools where they work, and build custom layers where differentiation and control matter most.
              Hive Vault Arc helps define that boundary clearly so investment stays focused.
            </p>
          </article>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="border-t border-[#DDE3EA] bg-white">
          <div className="mx-auto max-w-5xl px-6 py-12 lg:px-12">
            <h2 className="services-brief-section-title">
              Build Software That Matches Your Operating Reality
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-secondary">
              If off-the-shelf tools are slowing your team down, Hive Vault Arc can scope a custom platform that fits your
              process, improves control, and scales with your business model.
            </p>
            <div className="editorial-actions mt-7">
              <Link href="/contact" className="editorial-cta sharp-edge">
                Book Discovery Call
              </Link>
              <Link href="/case-studies/top-tier-crm-transformation-program-real-estate-operations" className="editorial-link">
                Review CRM Case Study <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/digital-services-tangier" className="editorial-link">
                View Full Digital Services Portfolio <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      <FaqSection
        faqs={CUSTOM_SOFTWARE_MOROCCO_FAQS}
        heading="Custom Software Development in Morocco: Frequently Asked Questions"
      />
    </>
  );
}
