import type { Metadata } from 'next';
import Link from 'next/link';
import FaqSection from '../../components/FaqSection';
import JsonLd from '../../components/JsonLd';
import type { FaqItem } from '../../data/faqs';
import { SITE_URL, absoluteUrl, buildBreadcrumbSchema, buildPageMetadata } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'AI Agents in Morocco — WhatsApp Automation & Intelligent Systems | H.V.A',
  description:
    'H.V.A builds AI agents for Moroccan businesses. WhatsApp lead qualification, automated customer ops, and custom AI systems. Serving all of Morocco from Tangier.',
  path: '/ai-agents-morocco',
  keywords: [
    'AI agents Morocco',
    'AI automation Morocco',
    'WhatsApp AI Morocco',
    'artificial intelligence Morocco',
    'AI consulting Morocco',
  ],
});

const AI_AGENTS_MOROCCO_FAQS: FaqItem[] = [
  {
    question: 'Do you only work with companies in Tangier?',
    answer:
      'No. H.V.A is based in Tangier and serves organizations across Morocco, including Casablanca, Rabat, Marrakech, Agadir, and distributed teams operating nationally.',
  },
  {
    question: 'What is included in an AI agent implementation?',
    answer:
      'Typical scope includes discovery, workflow design, conversation logic, integration with tools like CRM or calendars, testing, rollout, and post-launch tuning support.',
  },
  {
    question: 'Can H.V.A build sector-specific AI agents?',
    answer:
      'Yes. We design agents around sector workflows, especially for real estate, healthcare, logistics, and finance where response discipline and process quality directly affect revenue or service performance.',
  },
  {
    question: 'How is pricing usually structured?',
    answer:
      'Most engagements include an initial setup phase and a recurring optimization or operations layer. Final pricing is scoped after discovery based on complexity, integrations, and KPI expectations.',
  },
  {
    question: 'How do we start?',
    answer:
      'The first step is a discovery call. We review your current message flow, identify high-impact automation opportunities, and propose a practical phased rollout plan.',
  },
];

export default function AIAgentsMoroccoPage() {
  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'AI Agent Development in Morocco',
    provider: { '@id': `${SITE_URL}/#organization` },
    serviceType: 'AI Agent Development',
    areaServed: [{ '@type': 'Country', name: 'Morocco' }],
    availableLanguage: ['en', 'fr', 'ar', 'es'],
    url: `${SITE_URL}/ai-agents-morocco`,
    description:
      'National AI agent delivery for Moroccan companies, including WhatsApp automation, lead qualification, and intelligent customer operations.',
    image: absoluteUrl('/Images/hero/ai-powered-transformation-operations-tangier-morocco.webp'),
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'AI Agents Morocco', path: '/ai-agents-morocco' },
  ]);

  return (
    <>
      <JsonLd data={[professionalServiceSchema, breadcrumbSchema]} />

      <main className="bg-[#F8FAFC] text-[#0F172A]">
        <section className="mx-auto max-w-5xl px-6 pb-10 pt-28 lg:px-12 lg:pt-32">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">National AI Services</p>
          <h1 className="font-headline text-4xl font-medium leading-[1.06] tracking-tight md:text-6xl">
            Morocco&apos;s AI Agent Partner
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#475569]">
            H.V.A delivers AI agents for companies across Morocco that need faster customer response, cleaner lead
            qualification, and more reliable day-to-day operations. We combine consulting, engineering, and deployment
            ownership so the agent is integrated into your real business workflows, not left as a standalone tool.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="sharp-edge bg-[#0F172A] px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#2563EB]"
            >
              Request National Rollout Plan
            </Link>
            <Link
              href="/ai-agents-tangier"
              className="text-xs font-bold uppercase tracking-[0.14em] text-[#2563EB] transition-colors hover:text-[#1d4ed8]"
            >
              See Tangier Guide →
            </Link>
          </div>
        </section>

        <section className="border-y border-[#e2e8f0] bg-white">
          <div className="mx-auto max-w-5xl px-6 py-12 lg:px-12">
            <h2 className="font-headline text-3xl font-medium text-[#0F172A]">The Moroccan AI Opportunity</h2>
            <p className="mt-4 text-base leading-relaxed text-[#475569]">
              Morocco&apos;s AI momentum is now operational, not theoretical. National digital policy direction,
              including Maroc IA 2030, is accelerating how teams think about automation readiness and AI capability
              building. Market outlooks for AI in Morocco and the wider region continue to show strong expansion
              potential, with growth assumptions around the high-twenties CAGR range in several forecasts.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#475569]">
              Business behavior reflects that shift. Leadership teams in multiple sectors are moving budget from pilot
              experimentation to practical execution, and many industry surveys now indicate that a large majority of
              businesses are planning or increasing AI investment. The gap is no longer awareness; it is implementation
              discipline.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#475569]">
              That is where AI agents matter most. They create immediate operating impact by improving response speed,
              reducing manual triage overhead, and making customer operations measurable across channels.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl space-y-12 px-6 py-14 lg:px-12">
          <article>
            <h2 className="font-headline text-3xl font-medium text-[#0F172A]">H.V.A AI Agent Stack in Morocco</h2>
            <p className="mt-4 text-base leading-relaxed text-[#475569]">
              We build with a stack chosen for production reliability and extensibility. A typical delivery includes
              WhatsApp Business API for customer interaction, orchestration logic through n8n or equivalent workflow
              infrastructure, backend services in FastAPI for control and integration, and structured data layers that
              keep every interaction trackable.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#475569]">
              The architecture is tailored to your workflow. Some teams need high-speed lead routing, others need
              support triage, and others need operations assistants that combine both. We design the agent around those
              priorities and align escalation to your team structure so handoffs are clear and practical.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="border border-[#e2e8f0] bg-white p-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#2563EB]">Core Layer</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                  Conversation intelligence, intent handling, qualification logic, and channel-aware response rules.
                </p>
              </div>
              <div className="border border-[#e2e8f0] bg-white p-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#2563EB]">Operations Layer</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                  CRM synchronization, routing workflows, escalation management, analytics, and KPI tracking.
                </p>
              </div>
            </div>
          </article>

          <article>
            <h2 className="font-headline text-3xl font-medium text-[#0F172A]">Industries We Support Across Morocco</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="border border-[#e2e8f0] bg-white p-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#2563EB]">Real Estate</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                  Lead qualification, property inquiry handling, and pipeline routing to sales teams by readiness level.
                </p>
              </div>
              <div className="border border-[#e2e8f0] bg-white p-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#2563EB]">Healthcare</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                  Appointment support, FAQ triage, and patient communication workflows with controlled escalation.
                </p>
              </div>
              <div className="border border-[#e2e8f0] bg-white p-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#2563EB]">Logistics</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                  Dispatch communication support, status handling, and operator workflow coordination under load.
                </p>
              </div>
              <div className="border border-[#e2e8f0] bg-white p-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#2563EB]">Finance</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                  Pre-screening, onboarding guidance, and structured handoff to advisors or account managers.
                </p>
              </div>
            </div>
          </article>

          <article>
            <h2 className="font-headline text-3xl font-medium text-[#0F172A]">Case Study Reference</h2>
            <p className="mt-4 text-base leading-relaxed text-[#475569]">
              H.V.A has already deployed multilingual conversational AI in production scenarios where lead quality and
              response speed directly affected pipeline performance. You can review a public example in our WhatsApp AI
              case study and see how architecture decisions translated into operational outcomes.
            </p>
            <p className="mt-5">
              <Link
                href="/case-studies/multilingual-whatsapp-ai-agent"
                className="text-sm font-bold uppercase tracking-[0.14em] text-[#2563EB] transition-colors hover:text-[#1d4ed8]"
              >
                Read WhatsApp AI Case Study →
              </Link>
            </p>
          </article>

          <article>
            <h2 className="font-headline text-3xl font-medium text-[#0F172A]">Typical Pricing Ranges</h2>
            <p className="mt-4 text-base leading-relaxed text-[#475569]">
              For organizations that need early budget orientation, a focused WhatsApp AI deployment often starts in the
              range of <strong>MAD 15K to MAD 40K</strong> for initial setup, with an ongoing optimization layer often
              in the range of <strong>MAD 2K to MAD 6K per month</strong>. Final pricing depends on integrations,
              channel scope, and KPI accountability requirements.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#475569]">
              We recommend treating these values as guidance, not fixed catalog pricing. Discovery is where scope is
              translated into a reliable execution plan and commercial structure.
            </p>
          </article>

          <article>
            <h2 className="font-headline text-3xl font-medium text-[#0F172A]">
              National Rollout Governance: How to Scale Without Losing Quality
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#475569]">
              Moving from one location to a national operation requires governance discipline. A response flow that works
              in one branch can fail when multiple teams, regions, and customer segments enter the system. H.V.A
              structures national AI agent programs around shared standards: intent taxonomy, escalation policy, response
              tone controls, and KPI ownership at both central and local levels.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#475569]">
              This governance layer protects quality while scale increases. Teams in Casablanca or Rabat can maintain
              local nuance, but they still operate inside a common architecture for reporting and improvement. That means
              leadership can compare performance across regions and prioritize upgrades based on measurable results.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#475569]">
              The best pattern is phased expansion: launch one high-impact workflow, validate reliability, extend to
              additional use cases, then roll out region-by-region. This keeps risk controlled and avoids large,
              unmanageable deployment waves.
            </p>
          </article>
        </section>

        <section className="border-t border-[#e2e8f0] bg-white">
          <div className="mx-auto max-w-5xl px-6 py-12 lg:px-12">
            <h2 className="font-headline text-3xl font-medium text-[#0F172A]">Build AI Agents That Actually Run in Production</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#475569]">
              If your team is ready to move from AI discussions to measurable operations, H.V.A can define a phased
              rollout plan tailored to your Moroccan market context and internal capacity.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="sharp-edge bg-[#2563EB] px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#1d4ed8]"
              >
                Book Discovery Call
              </Link>
              <Link
                href="/capabilities/in-detail"
                className="text-xs font-bold uppercase tracking-[0.14em] text-[#2563EB] transition-colors hover:text-[#1d4ed8]"
              >
                Explore In Detail →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FaqSection faqs={AI_AGENTS_MOROCCO_FAQS} heading="AI Agents in Morocco: Frequently Asked Questions" />
    </>
  );
}
