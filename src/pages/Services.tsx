import React from 'react';
import { Link } from 'react-router-dom';
import { MotionConfig, motion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import PageAmbientBackground from '../components/PageAmbientBackground';
import { useAnimationQuality } from '../lib/animationQuality';

type ServicePillar = {
  id: string;
  title: string;
  summary: string;
  outcomes: string[];
  featured?: boolean;
};

type ServiceDomain = {
  icon: React.ReactNode;
  title: string;
  description: string;
  deliverables: string[];
};

const servicePillars: ServicePillar[] = [
  {
    id: '01',
    title: 'Software Engineering and Automation',
    summary: 'Custom software systems and process automation engineered around your business workflows.',
    outcomes: ['Web and mobile applications', 'Internal tools and operations software', 'API integrations and automation flows'],
  },
  {
    id: '02',
    title: 'AI Assistants and ML Features',
    summary: 'Practical AI implementations that improve speed, decision-making, and customer interactions.',
    outcomes: ['AI assistants and chatbots', 'Model training and evaluation', 'AI-powered product features'],
    featured: true,
  },
  {
    id: '03',
    title: 'Deployment, CI/CD, and Monitoring',
    summary: 'Reliable release workflows and production monitoring for stable day-to-day operations.',
    outcomes: ['Deployment workflows', 'CI/CD pipelines', 'Monitoring, alerts, and maintenance'],
  },
];

const serviceDomains: ServiceDomain[] = [
  {
    icon: <Code2 className="h-5 w-5 text-[#0984E3]" />,
    title: 'Software Product Engineering',
    description: 'From product idea to production-ready software with clear technical ownership.',
    deliverables: ['Architecture and scope planning', 'Frontend, backend, and mobile implementation', 'Testing, QA, and release management'],
  },
  {
    icon: <Bot className="h-5 w-5 text-[#0984E3]" />,
    title: 'AI Assistants and Chatbots',
    description: 'Business-focused AI assistants that automate communication and support workflows.',
    deliverables: ['WhatsApp and web chat assistants', 'Lead qualification and scoring', 'Context-aware conversation automation'],
  },
  {
    icon: <Cloud className="h-5 w-5 text-[#0984E3]" />,
    title: 'Deployment and CI/CD Workflows',
    description: 'Deployment pipelines and release workflows that keep delivery fast and stable.',
    deliverables: ['Build and release pipeline setup', 'Automated testing in CI/CD', 'Monitoring and incident readiness'],
  },
  {
    icon: <Workflow className="h-5 w-5 text-[#0984E3]" />,
    title: 'Integrations and Workflow Automation',
    description: 'Connect systems and automate handoffs to reduce manual work and delays.',
    deliverables: ['API and third-party integrations', 'Workflow and process orchestration', 'Business automation pipelines'],
  },
  {
    icon: <Database className="h-5 w-5 text-[#0984E3]" />,
    title: 'ML Models, Data, and Reporting',
    description: 'Model development and data foundations that support measurable product outcomes.',
    deliverables: ['Model training and evaluation workflows', 'Data model and schema design', 'Operational and performance dashboards'],
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-[#0984E3]" />,
    title: 'Security and Reliability',
    description: 'Production standards for access control, auditability, and service continuity.',
    deliverables: ['Access and permissions model', 'Security controls and checks', 'Reliability and maintenance planning'],
  },
];

const capabilityMatrix: ServiceDomain[] = [
  ...serviceDomains,
  {
    icon: <Code2 className="h-6 w-6 text-[#0984E3]" />,
    title: 'Software Engineering and Automation',
    description: 'Custom software systems and process automation engineered around your business workflows.',
    deliverables: ['Web and mobile applications', 'Internal tools and operations software', 'API integrations and automation flows'],
  },
  {
    icon: <Bot className="h-6 w-6 text-[#0984E3]" />,
    title: 'AI Assistants and ML Features',
    description: 'Practical AI implementations that improve speed, decision-making, and customer interactions.',
    deliverables: ['AI assistants and chatbots', 'Model training and evaluation', 'AI-powered product features'],
  },
];

const deliveryFlow = [
  {
    step: 'Discover',
    detail: 'Align on goals, constraints, and measurable outcomes.',
  },
  {
    step: 'Design',
    detail: 'Define architecture, user flows, and execution plan.',
  },
  {
    step: 'Build',
    detail: 'Deliver in milestones with QA, demos, and feedback loops.',
  },
  {
    step: 'Scale',
    detail: 'Optimize performance, reliability, and roadmap continuity.',
  },
];

const Services: React.FC = () => {
  const { motionReduced } = useAnimationQuality();
  const glassBlurClass = 'backdrop-blur-none';

  return (
    <MotionConfig reducedMotion={motionReduced ? 'always' : 'never'}>
      <div className="relative min-h-screen overflow-hidden bg-[#F5F6FA] text-[#1E272E]">
        <PageAmbientBackground />

        <section className="relative pt-32 pb-14">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-[#1E272E]/65">Services</p>
                <h1 className="mt-4 text-4xl md:text-6xl font-semibold leading-[0.98]">
                  Engineering Services That Move Business Forward
                </h1>
                <p className="mt-6 text-lg text-[#1E272E]/78 max-w-3xl leading-relaxed">
                  We are software, computer science, and machine learning engineers building practical digital products.
                  Our work includes automation software, AI assistants, ML-powered features, and production delivery workflows.
                  We deploy, monitor, and improve systems continuously, without positioning ourselves as an infrastructure-as-a-service provider.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 border border-[#1E272E]/20 bg-[#0984E3]/10 px-6 py-3 font-medium hover:bg-[#0984E3]/20 transition-colors"
                  >
                    Start a Project
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/portfolio"
                    className="inline-flex items-center gap-2 border border-[#1E272E]/20 px-6 py-3 font-medium text-[#1E272E]/90 hover:bg-[#0984E3]/10 transition-colors"
                  >
                    View Case Studies
                  </Link>
                </div>
              </motion.div>

              <motion.aside
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className={`border border-[#1E272E]/15 bg-[#0984E3]/[0.04] ${glassBlurClass} p-6`}
              >
                <p className="text-xs uppercase tracking-[0.16em] text-[#1E272E]/60">At a Glance</p>
                <div className="mt-4 space-y-3">
                  {[
                    'Custom software systems and business automation',
                    'AI assistants, chatbots, and ML-powered product features',
                    'Deployment workflows, CI/CD pipelines, and monitoring',
                  ].map((line) => (
                    <div key={line} className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 mt-1 text-[#0984E3] shrink-0" />
                      <p className="text-[#1E272E]/88 text-sm leading-relaxed">{line}</p>
                    </div>
                  ))}
                </div>
              </motion.aside>
            </div>
          </div>
        </section>

        <section className="relative py-10">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.2em] text-[#1E272E]/60">Core Service Lines</p>
              <h2 className="mt-2 text-3xl md:text-5xl font-semibold">What We Actually Deliver</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {servicePillars.map((pillar, index) => (
                <motion.article
                  key={pillar.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.07 }}
                  className={[
                    'border p-6',
                    pillar.featured
                      ? 'border-[#0984E3]/70 bg-[#0984E3] text-[#F5F6FA] shadow-[0_18px_40px_rgba(9,132,227,0.25)]'
                      : `border-[#1E272E]/15 bg-[#0984E3]/[0.04] ${glassBlurClass} text-[#1E272E]`,
                  ].join(' ')}
                >
                  <p className={pillar.featured ? 'text-[#F5F6FA]/80 text-sm font-semibold' : 'text-[#0984E3] text-sm font-semibold'}>
                    {pillar.id}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight">{pillar.title}</h3>
                  <p className={pillar.featured ? 'mt-3 text-[#F5F6FA]/90' : 'mt-3 text-[#1E272E]/75'}>{pillar.summary}</p>
                  <div className="mt-6 space-y-2">
                    {pillar.outcomes.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <CheckCircle2 className={pillar.featured ? 'h-4 w-4 mt-0.5 text-[#F5F6FA] shrink-0' : 'h-4 w-4 mt-0.5 text-[#0984E3] shrink-0'} />
                        <span className={pillar.featured ? 'text-[#F5F6FA]/90 text-sm' : 'text-[#1E272E]/85 text-sm'}>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-12">
          <div className="container mx-auto px-4">
            <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.15fr] lg:items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#1E272E]/60">Service Catalog</p>
                <h2 className="mt-2 text-3xl md:text-5xl font-semibold">Detailed Engineering Capabilities</h2>
              </div>
              <p className="text-[#1E272E]/82 text-lg leading-relaxed max-w-3xl">
                From AI assistants to production software delivery, our engineering capabilities cover the practical systems
                your business needs to automate operations, ship faster, and maintain reliability in real use.
              </p>
            </div>

            <div className="overflow-hidden border border-[#1E272E]/16 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
                {capabilityMatrix.map((domain, index) => (
                  <motion.article
                    key={domain.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.42, delay: index * 0.04 }}
                    className="group relative min-h-[260px] border border-[#1E272E]/14 bg-[#F5F6FA]/65 overflow-hidden"
                  >
                    <div className="relative z-10 h-full flex flex-col p-5 transition-opacity duration-250 md:group-hover:opacity-0">
                      <p className="text-[#1E272E] text-[40px] md:text-[38px] leading-[1.05] font-medium tracking-[-0.01em]">
                        {domain.title}
                      </p>
                      <div className="mt-auto flex items-end justify-between pt-8">
                        <span className="inline-flex items-center justify-center rounded-md border border-[#0984E3]/30 bg-[#0984E3]/10 p-2">
                          {domain.icon}
                        </span>
                        <ArrowRight className="h-5 w-5 text-[#0984E3]/75 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>

                    <div
                      className={[
                        'absolute inset-0 z-20 p-5 transition-all duration-250',
                        'opacity-100 translate-y-0 md:opacity-0 md:translate-y-1 md:group-hover:opacity-100 md:group-hover:translate-y-0',
                        index % 2 === 0
                          ? 'bg-gradient-to-br from-[#0984E3] to-[#00CEC9]'
                          : 'bg-gradient-to-br from-[#1E272E] to-[#0984E3]',
                      ].join(' ')}
                    >
                      <p className="text-white text-[30px] md:text-[28px] leading-[1.08] font-semibold tracking-[-0.01em]">
                        {domain.title}
                      </p>
                      <p className="mt-3 text-white/95 text-[15px] leading-relaxed">{domain.description}</p>
                      <ul className="mt-4 space-y-1.5">
                        {domain.deliverables.slice(0, 3).map((deliverable) => (
                          <li key={deliverable} className="flex items-start gap-2 text-[14px] text-white/95 leading-relaxed">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/90 shrink-0" />
                            <span>{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex items-center justify-end">
                        <ArrowRight className="h-5 w-5 text-white/95" />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                {
                  label: 'Software Engineering',
                  detail: 'Custom systems, web and mobile applications, and business workflow automation.',
                },
                {
                  label: 'Applied AI & ML',
                  detail: 'AI assistants, chatbots, and machine-learning powered product features.',
                },
                {
                  label: 'Delivery Operations',
                  detail: 'Deployment pipelines, CI/CD workflows, and monitoring for stable operations.',
                },
              ].map((item) => (
                <div key={item.label} className="border border-[#1E272E]/12 bg-white p-4">
                  <p className="text-sm uppercase tracking-[0.14em] text-[#0984E3]">{item.label}</p>
                  <p className="mt-2 text-[#1E272E]/76 text-sm leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="mb-8 mt-12">
              <p className="text-xs uppercase tracking-[0.2em] text-[#1E272E]/60">Service Catalog</p>
              <h3 className="mt-2 text-2xl md:text-4xl font-semibold">Execution Coverage</h3>
              <p className="mt-3 text-[#1E272E]/76 max-w-3xl">
                Every capability above is delivered through one engineering flow: discover, design, build, and scale.
              </p>
            </div>
          </div>
        </section>

        <section className="relative py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.2em] text-[#1E272E]/60">Execution Flow</p>
              <h2 className="mt-2 text-3xl md:text-5xl font-semibold">How Delivery Moves From Idea to Production</h2>
            </div>

            <div className="relative mt-10 overflow-hidden rounded-2xl border border-[#1E272E]/14 bg-gradient-to-br from-white to-[#ECF5FD]/45 p-4 md:p-6">
              <div className="pointer-events-none absolute left-[10%] right-[10%] top-[48px] hidden xl:block h-[2px] bg-gradient-to-r from-[#0984E3]/15 via-[#0984E3]/55 to-[#0984E3]/15" />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {deliveryFlow.map((item, index) => (
                  <motion.article
                    key={item.step}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.36, delay: index * 0.05 }}
                    className="group relative rounded-xl border border-[#1E272E]/12 bg-white/95 p-5 pt-8 shadow-[0_8px_24px_rgba(9,132,227,0.08)]"
                  >
                    <div className="absolute left-5 top-0 -translate-y-1/2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0984E3]/35 bg-[#F5F6FA] text-sm font-semibold text-[#0984E3] shadow-[0_4px_14px_rgba(9,132,227,0.18)]">
                        {`0${index + 1}`}
                      </div>
                    </div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#0984E3]/75">Step {index + 1}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-[#1E272E]">{item.step}</h3>
                    <p className="mt-3 text-sm text-[#1E272E]/75 leading-relaxed">{item.detail}</p>
                    <div className="mt-5 h-1 w-full rounded-full bg-[#1E272E]/8">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#0984E3] to-[#00CEC9]"
                        style={{ width: `${(index + 1) * 25}%` }}
                      />
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-14 mb-10">
          <div className="container mx-auto px-4">
            <div className={`border border-[#1E272E]/12 bg-gradient-to-r from-white/10 to-white/5 ${glassBlurClass} p-8 md:p-10`}>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#1E272E]/60">Next Step</p>
                  <h2 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight">
                    Share Your Product Context, We Define the Right Service Path
                  </h2>
                  <p className="mt-4 text-[#1E272E]/78 max-w-2xl">
                    Tell us what you are building, where the bottlenecks are, and what timeline you are targeting.
                    We will propose scope, priorities, and an execution model aligned to your business outcome.
                  </p>
                </div>
                <div className="space-y-3">
                  <Link
                    to="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 bg-[#0984E3] text-[#F5F6FA] px-6 py-3 font-medium hover:bg-[#0776CC] transition-colors"
                  >
                    Book a Call
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/portfolio"
                    className="inline-flex w-full items-center justify-center gap-2 border border-[#1E272E]/20 bg-[#0984E3]/10 px-6 py-3 font-medium text-[#1E272E] hover:bg-[#0984E3]/15 transition-colors"
                  >
                    Explore Delivered Work
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
};

export default Services;
