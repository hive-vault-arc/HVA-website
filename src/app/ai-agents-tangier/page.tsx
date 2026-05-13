import type { Metadata } from 'next';
import Image from 'next/image';
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
      { '@type': 'City', name: 'Tangier', containedInPlace: { '@type': 'Country', name: 'Morocco' } },
      { '@type': 'City', name: 'Casablanca' },
      { '@type': 'City', name: 'Rabat' },
      { '@type': 'City', name: 'Marrakech' },
      { '@type': 'City', name: 'Fes' },
      { '@type': 'City', name: 'Agadir' },
      { '@type': 'AdministrativeArea', name: 'Tanger-Tetouan-Al Hoceima' },
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

      <main className="bg-[#f7f9fb] text-[#191c1e]">

        {/* ── Hero ── */}
        <section className="px-6 lg:px-14 pt-28 pb-20 md:pt-36 md:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-[1400px] mx-auto">
          <div className="lg:col-span-7 z-10">
            <span className="inline-block px-3 py-1 bg-[#e0e3e5] text-[#2563EB] font-body text-[10px] tracking-[0.2em] uppercase font-bold mb-6">
              Local Enterprise Innovation
            </span>
            <h1 className="font-headline text-[3.6rem] md:text-[5.5rem] leading-[0.95] tracking-tight text-[#0F172A] mb-8">
              AI Agents Built for{' '}
              <em className="italic text-[#2563EB]">Tangier</em>{' '}
              Businesses
            </h1>
            <p className="text-xl font-body font-light text-[#475569] max-w-xl leading-relaxed mb-10">
              The ARC framework brings architectural precision to local enterprise. H.V.A engineers autonomous agents
              that handle WhatsApp reception, lead qualification, and customer support across Arabic, French, and English
              — designed for Tangier realities, deployable across all Moroccan cities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="editorial-cta sharp-edge"
              >
                Start AI Discovery
              </Link>
              <Link href="/capabilities" className="editorial-link">
                Explore Capabilities →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-[520px] lg:h-[620px]">
            <Image
              src="/Images/hero/ai-powered-transformation-operations-tangier-morocco.webp"
              alt="AI-powered business operations in Tangier, Morocco"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
              style={{ filter: 'grayscale(0.35) contrast(1.08)' }}
            />
            <div className="absolute -bottom-5 -left-5 bg-white p-7 w-60 shadow-2xl">
              <p className="font-headline italic text-xl mb-2 text-[#0F172A]">&ldquo;The curator&apos;s touch.&rdquo;</p>
              <p className="font-body text-[10px] tracking-widest uppercase text-[#475569]">ARC Phase 01: Insights</p>
            </div>
          </div>
        </section>

        {/* ── Value Props ── */}
        <section className="bg-[#f2f4f6] px-6 lg:px-14 py-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: 'Local Context',
                body: 'Built for Tangier sales and operations realities, while fully deployable across all Moroccan cities with multilingual communication and fast inbound response standards.',
              },
              {
                number: '02',
                title: 'Core Use Cases',
                body: 'WhatsApp reception, lead qualification, customer support triage, and routing to the right person at the right time — for manufacturing, logistics, and premium service sectors.',
              },
              {
                number: '03',
                title: 'Delivery Model',
                body: 'ARC-style execution from audit to rollout, with measurable KPIs and post-launch optimization support. Zero-friction integration with existing legacy systems.',
              },
            ].map((card) => (
              <div
                key={card.number}
                className="bg-white p-12 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-10 h-10 bg-[#2563EB]/10 flex items-center justify-center mb-8">
                  <span className="font-body text-xs font-bold text-[#2563EB] tracking-widest">{card.number}</span>
                </div>
                <h3 className="font-headline text-2xl mb-4 text-[#0F172A]">{card.title}</h3>
                <p className="text-[#475569] font-body leading-relaxed text-sm">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Educational Editorial ── */}
        <section className="px-6 lg:px-14 py-32 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
            <div className="md:w-1/3">
              <h2 className="font-headline text-5xl leading-tight sticky top-32 text-[#0F172A]">
                What Is an<br />
                <span className="italic text-[#2563EB]">AI Agent?</span>
              </h2>
            </div>
            <div className="md:w-2/3">
              <p className="text-2xl font-body font-light text-[#191c1e] leading-relaxed mb-12">
                Unlike basic scripted bots, an <strong className="font-bold">AI Agent</strong> is an autonomous software
                worker. It doesn&apos;t just respond — it <em className="italic">executes</em>. It reasons through tasks,
                utilizes external tools, and manages complex workflows with minimal human oversight.
              </p>
              <p className="text-base font-body text-[#475569] leading-relaxed mb-12">
                In practical terms for a Tangier SME, that means the agent can read an incoming WhatsApp message,
                identify intent, ask qualification questions, and either provide a direct answer or route the request to
                a human owner with full context. The real value is operational consistency — your team stops relying on
                individual memory for frequent questions, follow-up timing, and qualification criteria.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-4 border-t border-[#e2e8f0] pt-10">
                <div>
                  <h4 className="font-body text-xs tracking-widest uppercase font-bold mb-4 text-[#2563EB]">
                    01. Autonomous Execution
                  </h4>
                  <p className="text-[#475569] font-body text-sm leading-relaxed">
                    The agent determines the best sequence of actions to achieve a goal — whether scheduling a shipment
                    or qualifying a high-value lead — without constant human input.
                  </p>
                </div>
                <div>
                  <h4 className="font-body text-xs tracking-widest uppercase font-bold mb-4 text-[#2563EB]">
                    02. Tool Integration
                  </h4>
                  <p className="text-[#475569] font-body text-sm leading-relaxed">
                    Our agents connect directly to your CRM, WhatsApp Business API, and inventory systems to act as a
                    digital extension of your team — with clean data output.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Offerings Bento Grid ── */}
        <section className="px-6 lg:px-14 py-24 bg-[#e0e3e5]/30">
          <div className="max-w-7xl mx-auto">
            <div className="mb-14 flex flex-wrap justify-between items-end gap-4">
              <div>
                <span className="font-body text-[10px] tracking-widest uppercase text-[#475569]">The Curated Suite</span>
                <h2 className="font-headline text-5xl mt-2 text-[#0F172A]">Specialized Agent Types</h2>
              </div>
              <Link
                href="/capabilities"
                className="font-body text-xs tracking-widest uppercase font-bold border-b border-[#0F172A] pb-1 text-[#0F172A] hover:text-[#2563EB] hover:border-[#2563EB] transition-colors duration-200"
              >
                View Full Capabilities →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* WhatsApp — large */}
              <div className="md:col-span-8 group relative bg-white overflow-hidden p-12 min-h-[380px] flex flex-col justify-end">
                <div
                  className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-700"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, rgba(37,99,235,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.15) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
                <div className="relative z-10">
                  <div className="w-10 h-10 bg-[#2563EB]/10 flex items-center justify-center mb-6">
                    <svg className="w-5 h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h3 className="font-headline text-4xl mb-4 text-[#0F172A]">WhatsApp Automation</h3>
                  <p className="text-[#475569] font-body max-w-md text-sm leading-relaxed">
                    24/7 customer engagement on the platform Tangier uses most. Automate inquiries, bookings, and
                    customer support with native-level fluency in Arabic, French, and English.
                  </p>
                </div>
              </div>

              {/* Lead Gen — dark */}
              <div className="md:col-span-4 bg-[#1A2535] text-white p-12 flex flex-col justify-between min-h-[380px]">
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center mb-6">
                  <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-headline text-3xl mb-4 text-white">Lead Generation</h3>
                  <p className="text-white/65 font-body text-sm leading-relaxed">
                    Proactive identification and qualification of high-intent prospects across digital channels, with
                    structured context passed directly to your sales team.
                  </p>
                </div>
              </div>

              {/* Support — light */}
              <div className="md:col-span-4 bg-[#f2f4f6] p-12 flex flex-col justify-between">
                <div className="w-10 h-10 bg-[#2563EB]/10 flex items-center justify-center mb-6">
                  <svg className="w-5 h-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-headline text-3xl mb-4 text-[#0F172A]">Customer Support</h3>
                  <p className="text-[#475569] font-body text-sm leading-relaxed">
                    Resolve 80% of routine tickets instantly, freeing your team for high-complexity cases that require
                    human judgment and relationship management.
                  </p>
                </div>
              </div>

              {/* Custom Engineering — wide */}
              <div className="md:col-span-8 bg-white p-12 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1">
                  <span className="font-body text-[10px] tracking-widest uppercase font-bold text-[#475569] mb-4 block">
                    Bespoke R&amp;D
                  </span>
                  <h3 className="font-headline text-3xl mb-4 text-[#0F172A]">Custom ARC Engineering</h3>
                  <p className="text-[#475569] font-body text-sm leading-relaxed mb-6">
                    Need something bespoke? We engineer proprietary agents for specialized industrial and logistical
                    workflows — from Free Zone manufacturing to premium service operations.
                  </p>
                  <Link
                    href="/contact"
                    className="font-body text-xs tracking-widest font-bold uppercase border border-[#e2e8f0] px-6 py-3 inline-block hover:border-[#2563EB] hover:text-[#2563EB] transition-colors duration-200"
                  >
                    Inquire for R&amp;D
                  </Link>
                </div>
                <div className="w-full md:w-44 h-44 bg-[#f2f4f6] flex items-center justify-center flex-shrink-0">
                  <div
                    className="w-full h-full opacity-40"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, rgba(37,99,235,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.5) 1px, transparent 1px)',
                      backgroundSize: '18px 18px',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Process Snapshot ── */}
        <section className="px-6 lg:px-14 py-32 max-w-7xl mx-auto">
          <h2 className="font-headline text-5xl mb-20 text-center italic text-[#0F172A]">
            The ARC Process Snapshot
          </h2>
          <div className="relative">
            <div className="hidden md:block absolute top-[3.25rem] left-0 w-full h-px bg-[#e2e8f0]" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Diagnose', body: 'Map current inquiry flow, bottlenecks, and target business outcomes. We define where AI brings direct measurable value first.' },
                { step: '02', title: 'Design', body: 'Define conversation architecture, escalation rules, integrations, and quality controls for production readiness.' },
                { step: '03', title: 'Deploy', body: 'Launch staged rollout, validate response quality, and align internal team workflows with the new AI operating layer.' },
                { step: '04', title: 'Optimize', body: 'Track KPIs, refine prompts and routing logic, and improve conversion or support performance over monthly cycles.' },
              ].map((item) => (
                <div key={item.step} className="bg-[#f7f9fb] px-6 py-8 text-center">
                  <div className="w-12 h-12 bg-[#1A2535] text-white flex items-center justify-center mx-auto mb-6 font-body text-xs font-bold tracking-widest">
                    {item.step}
                  </div>
                  <h4 className="font-headline text-xl mb-2 text-[#0F172A]">{item.title}</h4>
                  <p className="text-[#475569] text-sm font-body leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Readiness Checklist ── */}
        <section className="bg-[#f2f4f6] px-6 lg:px-14 py-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              <div className="lg:w-2/5">
                <span className="font-body text-[10px] tracking-[0.22em] uppercase font-bold text-[#2563EB] mb-4 block">
                  Before You Deploy
                </span>
                <h2 className="font-headline text-4xl leading-tight text-[#0F172A] mb-6">
                  Readiness Checklist
                </h2>
                <p className="font-body text-sm leading-relaxed text-[#475569]">
                  The most successful Tangier deployments start with clear operational inputs. Teams identify top message
                  categories, define qualification criteria, and agree on escalation ownership before launch. This
                  preparation reduces rollout friction and avoids deploying an agent without a stable process backbone.
                </p>
                <p className="font-body text-sm leading-relaxed text-[#475569] mt-4">
                  We recommend setting KPI baselines early: first-response time, qualified lead rate, conversion
                  follow-up speed, and support resolution cycle.
                </p>
              </div>
              <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'intents',    text: 'Define top 10 inquiry intents and response standards.' },
                  { id: 'rules',      text: 'Document qualification rules used by sales teams today.' },
                  { id: 'escalation', text: 'Assign escalation owner per business line and time window.' },
                  { id: 'metrics',    text: 'Track metrics weekly and tune prompts based on real traffic.' },
                  { id: 'kpis',       text: 'Set baseline KPIs before launch so gains are measurable.' },
                  { id: 'alignment',  text: 'Align internal team on agent scope and human override protocols.' },
                ].map((item) => (
                  <div key={item.id} className="bg-white p-5 border-l-2 border-[#2563EB]">
                    <p className="font-body text-sm leading-relaxed text-[#475569]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="px-6 lg:px-14 py-32 text-center relative overflow-hidden bg-[#1A2535] text-white">
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className="pointer-events-none absolute -right-24 -top-20 h-64 w-64 rounded-full bg-[#2563EB]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-[8%] h-56 w-56 rounded-full bg-[#3b82f6]/15 blur-3xl" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="font-body text-[10px] tracking-[0.22em] uppercase font-bold text-[#2563EB] mb-6">Next Step</p>
            <h2 className="font-headline text-[3.5rem] md:text-[5rem] leading-[0.95] mb-8">
              Ready to{' '}
              <em className="italic text-white/60">Launch?</em>
            </h2>
            <p className="text-xl font-body font-light text-white/65 mb-12 max-w-xl mx-auto leading-relaxed">
              Join the vanguard of Tangier businesses leveraging the ARC framework. Start your diagnostic phase today
              and move from manual triage to autonomous execution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="sharp-edge bg-white text-[#1A2535] px-12 py-5 font-body text-sm font-bold uppercase tracking-[0.15em] hover:bg-[#2563EB] hover:text-white transition-colors duration-200 inline-flex items-center justify-center"
              >
                Book Discovery Call
              </Link>
              <Link
                href="/case-studies/multilingual-whatsapp-ai-agent"
                className="sharp-edge border border-white/20 text-white px-12 py-5 font-body text-sm font-bold uppercase tracking-[0.15em] hover:bg-white/10 transition-colors duration-200 inline-flex items-center justify-center"
              >
                View AI Case Study
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FaqSection faqs={AI_AGENTS_TANGIER_FAQS} heading="AI Agents in Tangier: Frequently Asked Questions" />
    </>
  );
}
