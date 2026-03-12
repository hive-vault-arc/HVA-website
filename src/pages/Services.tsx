import React from 'react';
import { Link } from 'react-router-dom';
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import { useAnimationQuality } from '../lib/animationQuality';
import PageAmbientBackground from '../components/PageAmbientBackground';
import HeroCurvedShapes from '../components/HeroCurvedShapes';

type ServiceLine = {
  icon: React.ReactNode;
  title: string;
  summary: string;
  outcomes: string[];
  tone: 'light' | 'dark';
};

type Capability = {
  icon: React.ReactNode;
  title: string;
  detail: string;
};

const serviceLines: ServiceLine[] = [
  {
    icon: <Bot className="h-5 w-5" />,
    title: 'AI Receptionist & Agent Operations',
    summary: 'Customer-facing and internal AI agents that respond, route, and execute routine workflows continuously.',
    outcomes: ['AI receptionist for WhatsApp and web', 'Lead qualification and smart routing', 'Operational agent actions'],
    tone: 'dark',
  },
  {
    icon: <Database className="h-5 w-5" />,
    title: 'AI Analyst & Decision Intelligence',
    summary: 'Analyst copilots that organize data, generate reports, and support faster operational decisions.',
    outcomes: ['AI analyst reporting copilots', 'Executive and ops dashboards', 'Insight workflows tied to KPIs'],
    tone: 'light',
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    title: 'Automation & Custom Platforms',
    summary: 'Custom software systems and process automation aligned with how your business actually works.',
    outcomes: ['Internal systems and portals', 'API orchestration and integrations', 'Workflow automations by department'],
    tone: 'light',
  },
  {
    icon: <Cloud className="h-5 w-5" />,
    title: 'Delivery Ecosystem & Reliability',
    summary: 'CI/CD, deployment workflows, and reliability patterns for stable releases and long-term maintainability.',
    outcomes: ['Deployment pipelines', 'Monitoring and incident response', 'Security and reliability safeguards'],
    tone: 'dark',
  },
];

const capabilities: Capability[] = [
  {
    icon: <Code2 className="h-5 w-5 text-[#0984E3]" />,
    title: 'Software Product Engineering',
    detail: 'Production-ready web and mobile systems with clear architecture ownership.',
  },
  {
    icon: <Bot className="h-5 w-5 text-[#0984E3]" />,
    title: 'AI Receptionist Systems',
    detail: 'Always-on front-desk automation for conversations, qualification, and scheduling.',
  },
  {
    icon: <Database className="h-5 w-5 text-[#0984E3]" />,
    title: 'AI Analyst Reporting',
    detail: 'Decision support workflows for reporting, insight extraction, and operational control.',
  },
  {
    icon: <Workflow className="h-5 w-5 text-[#0984E3]" />,
    title: 'Workflow Orchestration',
    detail: 'Automated handoffs between tools, teams, and systems with fewer manual bottlenecks.',
  },
  {
    icon: <Cloud className="h-5 w-5 text-[#0984E3]" />,
    title: 'CI/CD and Deployment',
    detail: 'Repeatable release flows with quality gates and deployment confidence.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-[#0984E3]" />,
    title: 'Security and Reliability',
    detail: 'Controls, hardening, and observability for dependable operations.',
  },
];

const deliveryFlow = [
  { step: 'Discover', detail: 'Clarify goals, constraints, and the delivery scope.' },
  { step: 'Design', detail: 'Define architecture, workflows, and implementation priorities.' },
  { step: 'Build', detail: 'Deliver incrementally with review checkpoints and QA.' },
  { step: 'Scale', detail: 'Stabilize, optimize, and continuously improve outcomes.' },
];
const deliveryAccentWidths = ['26%', '50%', '72%', '96%'];

const serviceHeroCurves = [
  { label: 'Agents', value: '01', height: 176, tone: 'violet' as const },
  { label: 'Ops', value: '02', height: 222, tone: 'teal' as const },
  { label: 'Scale', value: '03', height: 268, tone: 'blue' as const },
];

const Services: React.FC = () => {
  const { motionReduced } = useAnimationQuality();
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const heroShift = useTransform(scrollYProgress, [0, 0.35], [0, 42]);

  return (
    <MotionConfig reducedMotion={motionReduced ? 'always' : 'never'}>
      <div className="relative isolate min-h-screen overflow-hidden bg-[#F5F6FA] text-[#1E272E]">
        <motion.div
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#0984E3] via-[#4CA6EC] to-[#00CEC9]"
          style={{ scaleX: progressScale }}
        />
        <PageAmbientBackground className="-z-10" />

        <section className="relative pb-14 pt-32 md:pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              style={{ y: heroShift }}
              className="relative py-5 md:py-8"
            >
              <div className="pointer-events-none absolute -left-14 top-10 h-24 w-64 rounded-full bg-[#0984E3]/10 blur-3xl" />
              <div className="pointer-events-none absolute right-[28%] top-0 h-28 w-72 rounded-full bg-[#00CEC9]/10 blur-3xl" />
              <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(9,132,227,0.45),transparent)]" />
              <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,206,201,0.4),transparent)]" />
              <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#1E272E]/60">Services</p>
                  <h1 className="mt-4 max-w-5xl font-serif text-5xl font-semibold leading-[0.94] md:text-7xl">
                    Systems that move
                    <br />
                    faster than your
                    <br />
                    <span className="text-[#0984E3]">bottlenecks.</span>
                  </h1>
                  <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#1E272E]/78">
                    We build practical ecosystems for modern businesses: AI agents, AI receptionist systems, AI analyst
                    workflows, custom software platforms, and process automation connected end to end.
                  </p>
                  <div className="mt-9 flex flex-wrap gap-3">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-[#1E272E] px-7 py-3 text-[#F5F6FA] transition-colors hover:bg-[#0984E3]"
                    >
                      Start a Project
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/portfolio"
                      className="inline-flex items-center gap-2 bg-white/90 px-7 py-3 text-[#1E272E] shadow-[0_12px_26px_rgba(9,132,227,0.08)] transition-colors hover:bg-[#ECF5FD]"
                    >
                      View Case Studies
                    </Link>
                  </div>
                </div>

                <div className="relative flex flex-col gap-5 lg:pl-2">
                  <div className="pointer-events-none absolute -left-10 top-6 h-20 w-20 rounded-full bg-[#0984E3]/12 blur-2xl" />
                  <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-[#00CEC9]/10 blur-2xl" />
                  <p className="relative max-w-lg text-lg leading-relaxed text-[#1E272E]/78">
                    One operating layer for growth and control.
                  </p>
                  <div className="relative space-y-2">
                    {[
                      'AI receptionist + support agents',
                      'Analyst systems + automation workflows',
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-[#1E272E]/82">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0984E3]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <HeroCurvedShapes items={serviceHeroCurves} badgeText="Execution Layer" />

                  <p className="text-xs tracking-[0.12em] text-[#1E272E]/72">
                    AI + Custom Systems. End-to-end. Worldwide.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative py-10 md:py-14">
          <div className="container mx-auto px-4">
            <div className="mb-8 max-w-4xl">
              <p className="text-xs uppercase tracking-[0.2em] text-[#1E272E]/60">Core Service Lines</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold leading-[1.02] md:text-6xl">What We Actually Deliver</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {serviceLines.map((line, index) => (
                <motion.article
                  key={line.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.22 }}
                  transition={{ duration: 0.42, delay: index * 0.05 }}
                  className={[
                    'p-7 shadow-[0_18px_38px_rgba(9,132,227,0.1)]',
                    line.tone === 'dark'
                      ? 'bg-[linear-gradient(130deg,#1E272E_0%,#0984E3_100%)] text-[#F5F6FA]'
                      : 'bg-white/85 text-[#1E272E]',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={[
                        'inline-flex p-2',
                        line.tone === 'dark' ? 'bg-white/14 text-[#F5F6FA]' : 'bg-[#ECF5FD] text-[#0984E3]',
                      ].join(' ')}
                    >
                      {line.icon}
                    </span>
                    <p
                      className={[
                        'text-xs uppercase tracking-[0.16em]',
                        line.tone === 'dark' ? 'text-[#F5F6FA]/72' : 'text-[#1E272E]/58',
                      ].join(' ')}
                    >
                      Service Line
                    </p>
                  </div>
                  <h3 className="mt-4 text-3xl font-semibold leading-tight">{line.title}</h3>
                  <p className={line.tone === 'dark' ? 'mt-3 text-[#F5F6FA]/88' : 'mt-3 text-[#1E272E]/74'}>{line.summary}</p>
                  <ul className="mt-5 space-y-2">
                    {line.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className={[
                            'mt-0.5 h-4 w-4 shrink-0',
                            line.tone === 'dark' ? 'text-[#F5F6FA]' : 'text-[#0984E3]',
                          ].join(' ')}
                        />
                        <span className={line.tone === 'dark' ? 'text-[#F5F6FA]/92' : 'text-[#1E272E]/82'}>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#1E272E]/60">Capability Catalog</p>
                <h2 className="mt-3 font-serif text-4xl font-semibold leading-[1.02] md:text-5xl">Detailed Engineering Capabilities</h2>
              </div>
              <p className="max-w-3xl text-lg leading-relaxed text-[#1E272E]/76">
                From AI receptionist and analyst systems to workflow automation and deployment reliability, our capability
                set is designed as one connected delivery ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {capabilities.map((capability, index) => (
                <motion.article
                  key={capability.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.36, delay: index * 0.04 }}
                  className="bg-white/82 p-5 shadow-[0_14px_30px_rgba(9,132,227,0.08)] transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="inline-flex bg-[#ECF5FD] p-2">{capability.icon}</div>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight">{capability.title}</h3>
                  <p className="mt-2 leading-relaxed text-[#1E272E]/74">{capability.detail}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative pb-10 pt-8 md:pb-14 md:pt-10">
          <div className="container mx-auto px-4">
            <div className="mb-5 md:mb-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[#1E272E]/60">Execution Flow</p>
              <h2 className="mt-2 font-serif text-3xl font-semibold leading-[1.02] md:text-4xl">How Delivery Moves to Production</h2>
            </div>

            <div className="relative overflow-hidden border border-[#1E272E]/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(236,245,253,0.62))] p-3 shadow-[0_12px_28px_rgba(9,132,227,0.08)] md:p-4">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[10%] right-[10%] top-[2.2rem] hidden h-[2px] bg-gradient-to-r from-[#0984E3]/45 via-[#4CA6EC]/45 to-[#00CEC9]/45 xl:block"
              />
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
              {deliveryFlow.map((step, index) => (
                <motion.article
                  key={step.step}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.34, delay: index * 0.05 }}
                  className="relative overflow-visible border border-[#1E272E]/10 bg-white/84 p-4 pt-7 shadow-[0_8px_20px_rgba(9,132,227,0.08)] md:p-5 md:pt-8"
                >
                  <div className="absolute -top-4 left-4 inline-flex h-9 min-w-9 items-center justify-center border border-[#0984E3]/35 bg-[#ECF5FD] px-2 text-lg font-semibold text-[#0984E3] md:h-10 md:min-w-10">
                    {`0${index + 1}`}
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#0984E3]/80">{`STEP ${index + 1}`}</p>
                  <h3 className="mt-2 text-3xl font-semibold leading-none md:text-4xl">{step.step}</h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-[#1E272E]/74 md:text-lg">{step.detail}</p>
                  <div
                    aria-hidden="true"
                    className="mt-4 h-[3px] bg-gradient-to-r from-[#0984E3] to-[#5DC6C4]"
                    style={{ width: deliveryAccentWidths[index] ?? '100%' }}
                  />
                </motion.article>
              ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative pb-16 pt-2 md:pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden bg-[#1E272E] px-8 py-10 text-[#F5F6FA] shadow-[0_20px_48px_rgba(30,39,46,0.28)]"
            >
              <div className="pointer-events-none absolute -right-24 -top-20 h-56 w-56 rounded-full bg-[#0984E3]/34 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 left-[8%] h-48 w-48 rounded-full bg-[#00CEC9]/24 blur-3xl" />
              <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#F5F6FA]/65">Next Step</p>
                  <h2 className="mt-3 max-w-3xl font-serif text-3xl font-semibold leading-[1.02] md:text-5xl">
                    Need AI agents, an AI analyst system, automations, or a full custom ecosystem?
                  </h2>
                  <p className="mt-4 max-w-2xl text-[#F5F6FA]/82">
                    Share your operational goals and constraints. We will propose a practical scope and delivery path you
                    can execute with confidence.
                  </p>
                </div>
                <div className="grid gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-[#0984E3] px-6 py-3 text-[#F5F6FA] transition-colors hover:bg-[#0776CC]"
                  >
                    Book a Call
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/portfolio"
                    className="inline-flex items-center justify-center gap-2 bg-[#F5F6FA]/12 px-6 py-3 text-[#F5F6FA] transition-colors hover:bg-[#F5F6FA]/20"
                  >
                    Explore Delivered Work
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
};

export default Services;
