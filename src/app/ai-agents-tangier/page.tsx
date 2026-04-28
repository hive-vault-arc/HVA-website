import type { Metadata } from 'next';
import Link from 'next/link';
import FaqSection from '../../components/FaqSection';
import JsonLd from '../../components/JsonLd';
import type { FaqItem } from '../../data/faqs';
import { SITE_URL, absoluteUrl, buildBreadcrumbSchema, buildPageMetadata } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'AI Agents in Tangier — Automate Your Business | Hive Vault Arc',
  description:
    'Custom AI agents for Tangier businesses and teams across all Moroccan cities. WhatsApp automation, lead qualification, and intelligent customer support built by H.V.A.',
  path: '/ai-agents-tangier',
  keywords: [
    'AI agents Tangier',
    'AI automation Tangier',
    'WhatsApp AI Tangier',
    'chatbot Tangier',
    'artificial intelligence Tangier',
  ],
});

const AI_AGENTS_TANGIER_FAQS: FaqItem[] = [
  {
    question: 'What type of Tangier businesses benefit most from AI agents?',
    answer:
      'Companies with high daily message volume and repetitive inquiry handling see the fastest gains, especially real estate agencies, clinics, logistics operators, and service businesses that manage leads through WhatsApp.',
  },
  {
    question: 'Can H.V.A build an AI agent in Arabic and French for my team in Tangier?',
    answer:
      'Yes. H.V.A designs multilingual agents that can handle Arabic, French, English, and Spanish conversations, with business-specific tone and escalation rules that match your local operations.',
  },
  {
    question: 'How long does an AI agent deployment usually take?',
    answer:
      'A focused deployment normally takes 4 to 8 weeks, depending on integrations, workflow complexity, and review cycles. Broader, multi-system programs can run longer in staged milestones.',
  },
  {
    question: 'Do you connect AI agents to existing CRM and calendar tools?',
    answer:
      'Yes. We regularly integrate with CRM, calendar, and operations systems so the agent does not stay isolated and can update lead status, create tasks, and trigger follow-up workflows automatically.',
  },
  {
    question: 'What happens after the agent goes live?',
    answer:
      'H.V.A supports post-launch monitoring, tuning, and governance so your team can improve quality, response precision, and conversion performance as message volume grows.',
  },
];

export default function AIAgentsTangierPage() {
  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'AI Agent Development in Tangier',
    provider: { '@id': `${SITE_URL}/#organization` },
    serviceType: 'AI Agent Development',
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
      {
        '@type': 'AdministrativeArea',
        name: 'Tanger-Tetouan-Al Hoceima',
      },
    ],
    availableLanguage: ['en', 'fr', 'ar', 'es'],
    url: `${SITE_URL}/ai-agents-tangier`,
    description:
      'H.V.A builds AI agents for Tangier businesses and organizations across all Moroccan cities for customer support, lead qualification, and WhatsApp-first automation workflows.',
    image: absoluteUrl('/Images/hero/ai-powered-transformation-operations-tangier-morocco.webp'),
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'AI Agents Tangier', path: '/ai-agents-tangier' },
  ]);

  return (
    <>
      <JsonLd data={[professionalServiceSchema, breadcrumbSchema]} />

      <main className="bg-[#F8FAFC] text-[#0F172A]">
        <section className="mx-auto max-w-5xl px-6 pb-10 pt-28 lg:px-12 lg:pt-32">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">
            Tangier Local AI Services
          </p>
          <h1 className="font-headline text-4xl font-medium leading-[1.06] tracking-tight md:text-6xl">
            AI Agents Built for Tangier Businesses
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#475569]">
            H.V.A helps teams in Tangier deploy practical AI agents that answer customer questions, qualify new leads,
            and keep operations moving even outside business hours. We also support deployments in Casablanca, Rabat,
            Marrakech, Fes, Agadir, and other Moroccan cities. We design each system around your real workflow, so the
            agent becomes a working part of daily execution rather than a disconnected chatbot experiment.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="sharp-edge bg-[#0F172A] px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#2563EB]"
            >
              Start AI Discovery
            </Link>
            <Link
              href="/capabilities"
              className="text-xs font-bold uppercase tracking-[0.14em] text-[#2563EB] transition-colors hover:text-[#1d4ed8]"
            >
              Explore Capabilities →
            </Link>
          </div>
        </section>

        <section className="border-y border-[#e2e8f0] bg-white">
          <div className="mx-auto grid max-w-5xl gap-6 px-6 py-10 md:grid-cols-3 lg:px-12">
            <article>
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-[#2563EB]">Local Context</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                Built for Tangier sales and operations realities, while fully deployable across all Moroccan cities with
                multilingual communication and fast inbound response standards.
              </p>
            </article>
            <article>
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-[#2563EB]">Core Use Cases</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                WhatsApp reception, lead qualification, customer support triage, and routing to the right person at the
                right time.
              </p>
            </article>
            <article>
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-[#2563EB]">Delivery Model</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                ARC-style execution from audit to rollout, with measurable KPIs and post-launch optimization support.
              </p>
            </article>
          </div>
        </section>

        <section className="mx-auto max-w-5xl space-y-12 px-6 py-14 lg:px-12">
          <article>
            <h2 className="font-headline text-3xl font-medium text-[#0F172A]">What Is an AI Agent?</h2>
            <p className="mt-4 text-base leading-relaxed text-[#475569]">
              An AI agent is a software worker that can understand requests, apply decision logic, and execute defined
              actions inside your systems. In practical terms for a Tangier SME, that means the agent can read an
              incoming WhatsApp message, identify intent, ask qualification questions, and either provide a direct
              answer or route the request to a human owner with full context.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#475569]">
              Unlike basic scripted bots, production AI agents operate with stronger context handling. They can connect
              to your lead data, apply your business rules, and keep conversation quality consistent across Arabic,
              French, and English touchpoints. This reduces response delays, lowers repetitive workload for your team,
              and improves conversion reliability because every inbound inquiry follows a structured path.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#475569]">
              The real value is not just speed. It is operational consistency. Your team stops relying on individual
              memory for frequent questions, follow-up timing, and qualification criteria. The system handles that
              layer automatically and creates cleaner data for leadership decisions.
            </p>
          </article>

          <article>
            <h2 className="font-headline text-3xl font-medium text-[#0F172A]">H.V.A AI Agent Offerings in Tangier</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <div className="border border-[#e2e8f0] bg-white p-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#2563EB]">WhatsApp Agent</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                  Always-on WhatsApp handling for inbound questions, service detail requests, and initial lead capture.
                  Designed for response speed and clean conversation routing.
                </p>
              </div>
              <div className="border border-[#e2e8f0] bg-white p-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#2563EB]">Lead Qualification Agent</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                  Structured qualification logic that collects key commercial data, scores opportunity quality, and
                  passes complete context to your sales team.
                </p>
              </div>
              <div className="border border-[#e2e8f0] bg-white p-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#2563EB]">Customer Support Agent</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                  FAQ resolution, first-line support triage, and escalation orchestration so human teams focus on
                  high-value or sensitive cases.
                </p>
              </div>
            </div>
          </article>

          <article>
            <h2 className="font-headline text-3xl font-medium text-[#0F172A]">
              Why Tangier Businesses Are Accelerating AI Adoption
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#475569]">
              Tangier companies are scaling in a market where customers expect immediate replies and multilingual
              support across channels. Morocco's broader digital and AI agenda, including Maroc IA 2030, has pushed AI
              from trend discussion into operational planning. At the same time, regional growth forecasts for AI
              markets remain strong, and business surveys increasingly show AI investment moving from pilot budgets into
              core execution plans.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#475569]">
              In this environment, waiting creates execution drag. Teams that adopt AI agents early can respond faster,
              preserve lead quality, and reduce manual workload without adding headcount at the same pace as message
              volume growth. The main advantage is not hype; it is control over response quality and process discipline.
            </p>
          </article>

          <article>
            <h2 className="font-headline text-3xl font-medium text-[#0F172A]">How H.V.A Executes: ARC Process Snapshot</h2>
            <ol className="mt-5 grid gap-4 md:grid-cols-2">
              <li className="border border-[#e2e8f0] bg-white p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2563EB]">01 Diagnose</p>
                <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                  Map current inquiry flow, bottlenecks, and target business outcomes. We define where AI brings direct
                  measurable value first.
                </p>
              </li>
              <li className="border border-[#e2e8f0] bg-white p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2563EB]">02 Design</p>
                <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                  Define conversation architecture, escalation rules, integrations, and quality controls for production
                  readiness.
                </p>
              </li>
              <li className="border border-[#e2e8f0] bg-white p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2563EB]">03 Deploy</p>
                <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                  Launch staged rollout, validate response quality, and align internal team workflows with the new AI
                  operating layer.
                </p>
              </li>
              <li className="border border-[#e2e8f0] bg-white p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2563EB]">04 Optimize</p>
                <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                  Track KPIs, refine prompts and routing logic, and improve conversion or support performance over
                  monthly optimization cycles.
                </p>
              </li>
            </ol>
          </article>

          <article>
            <h2 className="font-headline text-3xl font-medium text-[#0F172A]">
              Readiness Checklist Before You Deploy an AI Agent
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#475569]">
              The most successful Tangier deployments start with clear operational inputs. Teams identify the top
              message categories, define qualification criteria, and agree on escalation ownership before launch. This
              preparation reduces rollout friction and avoids the common issue of deploying an agent without a stable
              process backbone.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#475569]">
              We also recommend setting KPI baselines early: first-response time, qualified lead rate, conversion
              follow-up speed, and support resolution cycle. When those baselines are documented, performance gains from
              automation become visible quickly and leadership can make better scaling decisions.
            </p>
            <ul className="mt-5 grid gap-3 text-sm leading-relaxed text-[#475569] md:grid-cols-2">
              <li className="border border-[#e2e8f0] bg-white p-4">Define top 10 inquiry intents and response standards.</li>
              <li className="border border-[#e2e8f0] bg-white p-4">Document qualification rules used by sales teams today.</li>
              <li className="border border-[#e2e8f0] bg-white p-4">Assign escalation owner per business line and time window.</li>
              <li className="border border-[#e2e8f0] bg-white p-4">Track metrics weekly and tune prompts based on real traffic.</li>
            </ul>
          </article>
        </section>

        <section className="border-t border-[#e2e8f0] bg-white">
          <div className="mx-auto max-w-5xl px-6 py-12 lg:px-12">
            <h2 className="font-headline text-3xl font-medium text-[#0F172A]">Ready to Launch AI Agents in Tangier?</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#475569]">
              If your team is handling repetitive inbound messages and lead triage manually, we can map an AI agent plan
              that starts with your highest-impact workflow and moves fast toward production.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="sharp-edge bg-[#2563EB] px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#1d4ed8]"
              >
                Book Discovery Call
              </Link>
              <Link
                href="/case-studies/multilingual-whatsapp-ai-agent"
                className="text-xs font-bold uppercase tracking-[0.14em] text-[#2563EB] transition-colors hover:text-[#1d4ed8]"
              >
                View AI Case Study →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FaqSection faqs={AI_AGENTS_TANGIER_FAQS} heading="AI Agents in Tangier: Frequently Asked Questions" />
    </>
  );
}
