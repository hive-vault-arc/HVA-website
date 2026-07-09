import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FaqSection from '../../components/FaqSection';
import JsonLd from '../../components/JsonLd';
import type { FaqItem } from '../../data/faqs';
import { SITE_URL, absoluteUrl, buildBreadcrumbSchema, buildPageMetadata } from '../../lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Digital Services in Tangier — AI, Software & IT Consulting',
  description:
    'Hive Vault Arc delivers end-to-end digital services in Tangier: AI agents, custom software, IT consulting, and digital transformation programs. Tangier-based team, global engineering standards.',
  path: '/digital-services-tangier',
  keywords: [
    'digital services Tangier',
    'digital services Tanger',
    'digital agency Tangier',
    'IT services Tangier Morocco',
    'technology services Tangier',
    'digital transformation Tangier',
    'software development Tangier',
    'AI services Tangier',
    'tech company Tangier',
    'digital services Morocco',
  ],
});

const DIGITAL_SERVICES_TANGIER_FAQS: FaqItem[] = [
  {
    question: 'What digital services does Hive Vault Arc offer in Tangier?',
    answer:
      'Hive Vault Arc delivers AI agents and WhatsApp automation, IT consulting and technology strategy, custom software and SaaS development, digital transformation programs, CRM engineering, and cloud infrastructure — all from a team based in Tangier, Morocco.',
  },
  {
    question: 'Is Hive Vault Arc just an advice firm or do you also build and deliver?',
    answer:
      'Both. Hive Vault Arc consults and builds. Every engagement includes strategy, architecture, and hands-on delivery. We stay accountable through production launch and ongoing optimization — not just the advisory phase.',
  },
  {
    question: 'How do digital services from a Tangier firm differ from international agencies?',
    answer:
      'A Tangier-based team brings local business context, Arabic and French fluency, alignment with Moroccan regulatory requirements, and direct communication without timezone delays. Hive Vault Arc pairs that local presence with international engineering standards and production case studies.',
  },
  {
    question: 'What types of businesses in Tangier does Hive Vault Arc work with?',
    answer:
      'Primarily Moroccan SMEs in Real Estate, Healthcare, Logistics, and Finance, plus French companies with Morocco operations and global startups that need AI or software infrastructure. We have production case studies in Real Estate.',
  },
  {
    question: 'How long does a typical digital services engagement take?',
    answer:
      'Focused engagements — such as an AI agent deployment or a CRM transformation — typically run 6 to 12 weeks. Broader digital transformation programs span longer timelines with staged milestones and defined checkpoints.',
  },
];

const pillars = [
  {
    title: 'AI & Automation',
    href: '/ai-agents-tangier',
    text: 'AI agents, WhatsApp automation, lead qualification, and customer operations workflows designed for multilingual teams in Tangier.',
  },
  {
    title: 'IT Consulting',
    href: '/it-consulting-tangier',
    text: 'Technology audits, architecture decisions, modernization roadmaps, and implementation governance that stay connected to delivery.',
  },
  {
    title: 'Custom Software',
    href: '/custom-software-morocco',
    text: 'FastAPI backends, Next.js frontends, SaaS products, CRM systems, and internal platforms built around your operating reality.',
  },
];

const services = [
  'AI Agents & WhatsApp Automation',
  'IT Consulting & Technology Strategy',
  'Custom Software & SaaS Development',
  'Digital Transformation Programs',
  'CRM & Operations Systems',
  'Cloud Infrastructure & DevOps',
];

const arcSteps = [
  {
    step: 'Audit',
    text: 'Map business goals, existing tools, process friction, data quality, and the workflows where digital services can create measurable value first.',
  },
  {
    step: 'Roadmap',
    text: 'Define the transformation sequence, architecture, delivery milestones, integration risks, and internal ownership model before implementation starts.',
  },
  {
    step: 'Craft',
    text: 'Build, deploy, stabilize, and improve the system in production with clear checkpoints instead of handing over a document and disappearing.',
  },
];

const caseStudies = [
  {
    title: 'Multilingual WhatsApp AI Agent',
    href: '/case-studies/multilingual-whatsapp-ai-agent',
    image: '/Images/case-studies/whatsapp-ai-agent-operations-case-study-morocco.webp',
    stats: ['< 18s response time', '85% manual triage reduction'],
  },
  {
    title: 'CRM Transformation Program',
    href: '/case-studies/top-tier-crm-transformation-program-real-estate-operations',
    image: '/Images/case-studies/zoho-crm-transformation-case-study-morocco.webp',
    stats: ['$2.4M pipeline visible', '40% less manual data entry'],
  },
];

export default function DigitalServicesTangierPage() {
  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Digital Services in Tangier',
    provider: { '@id': `${SITE_URL}/#organization` },
    serviceType: 'Digital Services',
    areaServed: [
      { '@type': 'Country', name: 'Morocco' },
      { '@type': 'City', name: 'Tangier', containedInPlace: { '@type': 'Country', name: 'Morocco' } },
      { '@type': 'City', name: 'Casablanca' },
      { '@type': 'City', name: 'Rabat' },
      { '@type': 'City', name: 'Marrakech' },
      { '@type': 'AdministrativeArea', name: 'Tanger-Tetouan-Al Hoceima' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Hive Vault Arc Digital Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Agent Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'IT Consulting' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Software Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Transformation Programs' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'WhatsApp Automation' } },
      ],
    },
    availableLanguage: ['en', 'fr', 'ar', 'es'],
    url: `${SITE_URL}/digital-services-tangier`,
    description:
      'Hive Vault Arc delivers end-to-end digital services in Tangier: AI agents, custom software, IT consulting, and digital transformation programs.',
    image: absoluteUrl('/Images/brand/hva-ai-software-agency-tangier.webp'),
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Digital Services Tangier', path: '/digital-services-tangier' },
  ]);

  return (
    <>
      <JsonLd data={[professionalServiceSchema, breadcrumbSchema]} />

      <main className="bg-neutral text-tertiary">
        <section className="editorial-hero">
          <div className="editorial-shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="geo-kicker">Digital Services Tangier</p>
              <h1 className="editorial-title">Digital Services Built for Tangier Businesses</h1>
              <p className="editorial-lead max-w-3xl">
                Hive Vault Arc is a Tangier-based digital services firm for businesses that need more than a website vendor. We
                combine <Link href="/ai-agents-tangier" className="editorial-link">AI agents</Link>, IT consulting,
                custom software, cloud infrastructure, and digital transformation delivery into one accountable
                engagement model. Moroccan SMEs, French companies operating locally, and global teams use us when
                strategy has to become a working system.
              </p>
              <div className="editorial-actions">
                <Link href="/contact" className="editorial-cta sharp-edge">
                  Start with a Discovery Call
                </Link>
                <Link href="/services-digitaux-tanger" className="editorial-link">
                  Version Française →
                </Link>
              </div>
            </div>
            <div className="relative min-h-[18rem] overflow-hidden bg-[#E8EBF0] md:min-h-[25rem]">
              <Image
                src="/Images/brand/hva-ai-software-agency-tangier.webp"
                alt="Hive Vault Arc digital services team in Tangier, Morocco"
                fill
                priority
                className="object-cover grayscale"
                sizes="(max-width: 1024px) 100vw, 38vw"
              />
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-6xl gap-px bg-[#DDE3EA] px-6 py-12 md:grid-cols-3 lg:px-12">
            {pillars.map((pillar) => (
              <Link key={pillar.href} href={pillar.href} className="group bg-white p-6 transition-colors hover:bg-[#F7F8FA]">
                <h2 className="font-headline text-2xl leading-tight text-[#1A2535]">{pillar.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-secondary">{pillar.text}</p>
                <span className="mt-6 inline-flex text-sm font-bold text-primary">Explore →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl space-y-14 px-6 py-16 lg:px-12">
          <article>
            <h2 className="services-brief-section-title">What Are Digital Services?</h2>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              For a Moroccan SME owner, digital services should mean the full set of capabilities that make the business
              easier to operate, measure, and scale. It is not only branding, social media, or website design. It
              includes the strategy behind technology decisions, the software that runs daily work, the automation that
              reduces repetitive tasks, and the infrastructure that keeps everything reliable.
            </p>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              A real digital services partner helps you decide what to modernize first, then builds the systems needed to
              make that decision real. That can mean an AI WhatsApp agent for inbound messages, a CRM workflow for sales
              visibility, a custom portal for operations, or a cloud deployment model that improves release speed and
              reliability.
            </p>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              Hive Vault Arc frames digital services as one connected operating layer: consulting, architecture, engineering,
              rollout, and long-term improvement. The goal is practical transformation, not disconnected tools.
            </p>
          </article>

          <article>
            <h2 className="services-brief-section-title">Hive Vault Arc&apos;s Full Digital Services Offering</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div key={service} className="geo-card">
                  <h3 className="font-headline text-xl leading-tight text-[#1A2535]">{service}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-secondary">
                    Delivered through discovery, architecture, implementation, and production support so each service
                    connects to business outcomes.
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article>
            <h2 className="services-brief-section-title">Why Tangier Businesses Choose Hive Vault Arc</h2>
            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              <div className="geo-card">
                <h3 className="font-headline text-xl text-[#1A2535]">Local Context</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  We understand Tangier business rhythms, Arabic and French communication, Moroccan compliance
                  sensitivity, and the speed required by local commercial teams.
                </p>
              </div>
              <div className="geo-card">
                <h3 className="font-headline text-xl text-[#1A2535]">Global Standard</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  Our work uses production-grade engineering, clear delivery checkpoints, and case-study-backed
                  operating results instead of theoretical advisory only.
                </p>
              </div>
              <div className="geo-card">
                <h3 className="font-headline text-xl text-[#1A2535]">Full Spectrum</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  Strategy, implementation, integrations, software, AI, cloud, and maintenance stay under one accountable
                  team, reducing handoff risk.
                </p>
              </div>
            </div>
          </article>

          <article>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className="services-brief-section-title">The ARC Process Snapshot</h2>
              <Link href="/arc" className="editorial-link">
                View ARC Framework →
              </Link>
            </div>
            <ol className="mt-6 grid gap-4 md:grid-cols-3">
              {arcSteps.map((item, index) => (
                <li key={item.step} className="geo-card">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 font-headline text-2xl text-[#1A2535]">{item.step}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-secondary">{item.text}</p>
                </li>
              ))}
            </ol>
          </article>

          <article>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className="services-brief-section-title">Production Results</h2>
              <Link href="/case-studies" className="editorial-link">
                View All Case Studies →
              </Link>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {caseStudies.map((study) => (
                <Link key={study.href} href={study.href} className="group grid bg-white md:grid-cols-[0.95fr_1.05fr]">
                  <div className="relative min-h-[14rem] overflow-hidden bg-[#E8EBF0]">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover grayscale transition duration-500 group-hover:grayscale-0"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-headline text-2xl leading-tight text-[#1A2535] group-hover:text-primary">
                      {study.title}
                    </h3>
                    <ul className="mt-5 space-y-3">
                      {study.stats.map((stat) => (
                        <li key={stat} className="text-sm font-semibold text-secondary">
                          {stat}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-6 inline-flex text-sm font-bold text-primary">Read proof →</span>
                  </div>
                </Link>
              ))}
            </div>
          </article>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-6 py-14 lg:px-12">
            <h2 className="services-brief-section-title">Start with a Discovery Call</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-secondary">
              If you are comparing digital agencies, IT providers, or software partners in Tangier, start with the
              business process first. We will map where AI, software, consulting, and cloud support can create the
              strongest measurable impact.
            </p>
            <div className="editorial-actions mt-7">
              <Link href="/contact" className="editorial-cta sharp-edge">
                Book Discovery Call
              </Link>
              <Link href="/capabilities" className="editorial-link">
                Explore Capabilities →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FaqSection
        faqs={DIGITAL_SERVICES_TANGIER_FAQS}
        heading="Digital Services in Tangier: Frequently Asked Questions"
      />
    </>
  );
}
