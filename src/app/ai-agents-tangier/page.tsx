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

      <main className="bg-neutral text-tertiary">

        {/* ── Hero ── */}
        <section className="editorial-hero">
          <div className="editorial-shell">
            <p className="geo-kicker">Tangier Local AI Services</p>
            <h1 className="editorial-title">AI Agents Built for Tangier Businesses</h1>
            <p className="editorial-lead max-w-3xl">
              H.V.A helps teams in Tangier deploy practical AI agents that answer customer questions, qualify new leads,
              and keep operations moving even outside business hours. We also support deployments in Casablanca, Rabat,
              Marrakech, Fes, Agadir, and other Moroccan cities. We design each system around your real workflow, so the
              agent becomes a working part of daily execution rather than a disconnected chatbot experiment.
            </p>
            <div className="editorial-actions">
              <Link href="/contact" className="editorial-cta sharp-edge">
                Start AI Discovery
              </Link>
              <Link href="/capabilities" className="editorial-link">
                Explore Capabilities →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Feature band ── */}
        <section className="border-y border-[#e2e8f0] bg-white">
          <div className="mx-auto grid max-w-5xl gap-6 px-6 py-10 md:grid-cols-3 lg:px-12">
            <article className="geo-card card-hover">
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Local Context</h2>
              <p className="mt-2 text-sm leading-relaxed text-secondary">
                Built for Tangier sales and operations realities, while fully deployable across all Moroccan cities with
                multilingual communication and fast inbound response standards.
              </p>
            </article>
            <article className="geo-card card-hover">
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Core Use Cases</h2>
              <p className="mt-2 text-sm leading-relaxed text-secondary">
                WhatsApp reception, lead qualification, customer support triage, and routing to the right person at the
                right time.
              </p>
            </article>
            <article className="geo-card card-hover">
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Delivery Model</h2>
              <p className="mt-2 text-sm leading-relaxed text-secondary">
                ARC-style execution from audit to rollout, with measurable KPIs and post-launch optimization support.
              </p>
            </article>
          </div>
        </section>

        {/* ── Body sections ── */}
        <section className="mx-auto max-w-5xl space-y-12 px-6 py-14 lg:px-12">
          <article>
            <h2 className="services-brief-section-title">What Is an AI Agent?</h2>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              An AI agent is a software worker that can understand requests, apply decision logic, and execute defined
              actions inside your systems. In practical terms for a Tangier SME, that means the agent can read an
              incoming WhatsApp message, identify intent, ask qualification questions, and either provide a direct
              answer or route the request to a human owner with full context.
            </p>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              Unlike basic scripted bots, production AI agents operate with stronger context handling. They can connect
              to your lead data, apply your business rules, and keep conversation quality consistent across Arabic,
              French, and English touchpoints. This reduces response delays, lowers repetitive workload for your team,
              and improves conversion reliability because every inbound inquiry follows a structured path.
            </p>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              The real value is not just speed. It is operational consistency. Your team stops relying on individual
              memory for frequent questions, follow-up timing, and qualification criteria. The system handles that
              layer automatically and creates cleaner data for leadership decisions.
            </p>
          </article>

          <article>
            <h2 className="services-brief-section-title">H.V.A AI Agent Offerings in Tangier</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <div className="geo-card card-hover">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-primary">WhatsApp Agent</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  Always-on WhatsApp handling for inbound questions, service detail requests, and initial lead capture.
                  Designed for response speed and clean conversation routing.
                </p>
              </div>
              <div className="geo-card card-hover">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-primary">Lead Qualification Agent</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  Structured qualification logic that collects key commercial data, scores opportunity quality, and
                  passes complete context to your sales team.
                </p>
              </div>
              <div className="geo-card card-hover">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-primary">Customer Support Agent</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  FAQ resolution, first-line support triage, and escalation orchestration so human teams focus on
                  high-value or sensitive cases.
                </p>
              </div>
            </div>
          </article>

          <article>
            <h2 className="services-brief-section-title">
              Why Tangier Businesses Are Accelerating AI Adoption
            </h2>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              Tangier companies are scaling in a market where customers expect immediate replies and multilingual
              support across channels. Morocco&apos;s broader digital and AI agenda, including Maroc IA 2030, has pushed AI
              from trend discussion into operational planning. At the same time, regional growth forecasts for AI
              markets remain strong, and business surveys increasingly show AI investment moving from pilot budgets into
              core execution plans.
            </p>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              In this environment, waiting creates execution drag. Teams that adopt AI agents early can respond faster,
              preserve lead quality, and reduce manual workload without adding headcount at the same pace as message
              volume growth. The main advantage is not hype; it is control over response quality and process discipline.
            </p>
          </article>

          <article>
            <h2 className="services-brief-section-title">How H.V.A Executes: ARC Process Snapshot</h2>
            <ol className="mt-5 grid gap-4 md:grid-cols-2">
              <li className="geo-card card-hover">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">01 Diagnose</p>
                <p className="mt-2 text-sm leading-relaxed text-secondary">
                  Map current inquiry flow, bottlenecks, and target business outcomes. We define where AI brings direct
                  measurable value first.
                </p>
              </li>
              <li className="geo-card card-hover">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">02 Design</p>
                <p className="mt-2 text-sm leading-relaxed text-secondary">
                  Define conversation architecture, escalation rules, integrations, and quality controls for production
                  readiness.
                </p>
              </li>
              <li className="geo-card card-hover">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">03 Deploy</p>
                <p className="mt-2 text-sm leading-relaxed text-secondary">
                  Launch staged rollout, validate response quality, and align internal team workflows with the new AI
                  operating layer.
                </p>
              </li>
              <li className="geo-card card-hover">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">04 Optimize</p>
                <p className="mt-2 text-sm leading-relaxed text-secondary">
                  Track KPIs, refine prompts and routing logic, and improve conversion or support performance over
                  monthly optimization cycles.
                </p>
              </li>
            </ol>
          </article>

          <article>
            <h2 className="services-brief-section-title">
              Readiness Checklist Before You Deploy an AI Agent
            </h2>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              The most successful Tangier deployments start with clear operational inputs. Teams identify the top
              message categories, define qualification criteria, and agree on escalation ownership before launch. This
              preparation reduces rollout friction and avoids the common issue of deploying an agent without a stable
              process backbone.
            </p>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              We also recommend setting KPI baselines early: first-response time, qualified lead rate, conversion
              follow-up speed, and support resolution cycle. When those baselines are documented, performance gains from
              automation become visible quickly and leadership can make better scaling decisions.
            </p>
            <ul className="mt-5 grid gap-3 text-sm leading-relaxed text-secondary md:grid-cols-2">
              <li className="geo-card">Define top 10 inquiry intents and response standards.</li>
              <li className="geo-card">Document qualification rules used by sales teams today.</li>
              <li className="geo-card">Assign escalation owner per business line and time window.</li>
              <li className="geo-card">Track metrics weekly and tune prompts based on real traffic.</li>
            </ul>
          </article>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="border-t border-[#e2e8f0] bg-white">
          <div className="mx-auto max-w-5xl px-6 py-12 lg:px-12">
            <h2 className="services-brief-section-title">Ready to Launch AI Agents in Tangier?</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-secondary">
              If your team is handling repetitive inbound messages and lead triage manually, we can map an AI agent plan
              that starts with your highest-impact workflow and moves fast toward production.
            </p>
            <div className="editorial-actions mt-7">
              <Link href="/contact" className="editorial-cta sharp-edge">
                Book Discovery Call
              </Link>
              <Link href="/case-studies/multilingual-whatsapp-ai-agent" className="editorial-link">
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
