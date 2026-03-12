import React from 'react';
import { Link } from 'react-router-dom';
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  CloudCog,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import ResponsiveImage from '../components/ui/ResponsiveImage';
import { useAnimationQuality } from '../lib/animationQuality';
import PageAmbientBackground from '../components/PageAmbientBackground';

type Project = {
  title: string;
  category: string;
  summary: string;
  image: {
    src: string;
    fallbackSrc?: string;
    sources?: Array<{
      srcSet: string;
      media?: string;
      type?: string;
      sizes?: string;
    }>;
  };
  outcomes: string[];
  stack: string[];
};

const projects: Project[] = [
  {
    title: 'Smart WhatsApp AI Assistant',
    category: 'AI Agent System',
    summary:
      'A multilingual assistant that turns incoming WhatsApp conversations into qualified leads, scheduled actions, and CRM-ready records.',
    image: {
      src: '/Images/aiagent.webp',
      fallbackSrc: '/Images/aiagent.webp',
      sources: [
        {
          srcSet: '/Images/aiagent.webp',
          type: 'image/webp',
          sizes: '(min-width: 1024px) 220px, 100vw',
        },
      ],
    },
    outcomes: [
      '24/7 lead qualification and routing',
      'Context-aware conversations in Arabic, French, and English',
      'Automatic scheduling and CRM lead creation',
    ],
    stack: ['AI Receptionist', 'CRM Sync', 'Security Controls'],
  },
  {
    title: 'Complete Real-Estate CRM Platform',
    category: 'Business Platform',
    summary:
      'An operations CRM designed for qualification, pipeline movement, scheduling, team collaboration, and project inventory control.',
    image: {
      src: '/Images/CRM.webp',
      fallbackSrc: '/Images/CRM.webp',
      sources: [
        {
          srcSet: '/Images/CRM.webp',
          type: 'image/webp',
          sizes: '(min-width: 1024px) 220px, 100vw',
        },
      ],
    },
    outcomes: [
      'Pipeline visibility from first contact to closing',
      'Role-based access and accountability by team',
      'Integrated scheduling and internal collaboration',
    ],
    stack: ['Custom CRM', 'Workflow Automation', 'Reporting Analytics'],
  },
];

const proofBlocks = [
  {
    icon: <Bot className="h-5 w-5" />,
    title: 'Agent Workflows',
    detail: 'AI receptionist and operational agents integrated with real business processes.',
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: 'Decision Clarity',
    detail: 'Reporting and analyst pipelines built for measurable operational control.',
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    title: 'Automation Layer',
    detail: 'From intake to delivery, workflows are structured to reduce manual friction.',
  },
  {
    icon: <CloudCog className="h-5 w-5" />,
    title: 'Production Delivery',
    detail: 'CI/CD, monitoring, and reliability patterns aligned with long-term scale.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: 'Secure By Default',
    detail: 'Validation, rate limits, and control layers are included from day one.',
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: 'AI-Ready Products',
    detail: 'Practical AI features where they improve speed, quality, and decisions.',
  },
];

const Portfolio: React.FC = () => {
  const { motionReduced } = useAnimationQuality();
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const heroCopyY = useTransform(scrollYProgress, [0, 0.35], [0, 35]);

  return (
    <MotionConfig reducedMotion={motionReduced ? 'always' : 'never'}>
      <div className="relative isolate min-h-screen overflow-hidden bg-[#F5F6FA] text-[#1E272E]">
        <motion.div
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#0984E3] via-[#4CA6EC] to-[#00CEC9]"
          style={{ scaleX: progressScale }}
        />
        <PageAmbientBackground className="-z-10" />

        <section className="relative pt-32 pb-14 md:pt-40 md:pb-18">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.56 }}
              style={{ y: heroCopyY }}
              className="relative overflow-hidden rounded-[32px] border border-[#1E272E]/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.86),rgba(236,245,253,0.72))] p-6 shadow-[0_20px_44px_rgba(9,132,227,0.1)] md:p-10"
            >
              <div className="pointer-events-none absolute -right-24 top-0 h-48 w-48 rounded-full bg-[#0984E3]/12 blur-3xl" />
              <div className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-[#00CEC9]/10 blur-3xl" />

              <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#1E272E]/60">Portfolio</p>
                  <h1 className="mt-4 max-w-5xl text-5xl font-semibold leading-[0.92] md:text-7xl">
                    Practical systems.
                    <br />
                    Real outcomes.
                    <br />
                    <span className="text-[#0984E3]">Built to hold.</span>
                  </h1>
                  <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#1E272E]/78">
                    Selected delivery snapshots across AI agents, AI receptionist workflows, AI analyst systems, and custom
                    business platforms engineered for production.
                  </p>
                  <div className="mt-9 flex flex-wrap gap-3">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-[#0984E3] px-7 py-3 text-[#F5F6FA] transition-colors hover:bg-[#0776CC]"
                    >
                      Start Your Project
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-2 bg-white/90 px-7 py-3 text-[#1E272E] shadow-[0_10px_24px_rgba(9,132,227,0.08)] transition-colors hover:bg-[#ECF5FD]"
                    >
                      Explore Services
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <p className="max-w-lg text-xl leading-relaxed text-[#1E272E]/78">
                    Compact case snapshots built to show what matters most: outcomes, architecture decisions, and delivery discipline.
                  </p>

                  <div className="space-y-2.5">
                    {[
                      'AI receptionist and agent operations',
                      'AI analyst reporting workflows',
                      'Automation, CI/CD, and reliability coverage',
                    ].map((line) => (
                      <div key={line} className="flex items-start gap-2.5 text-sm leading-relaxed text-[#1E272E]/82">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0984E3]" />
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Cases', value: String(projects.length), className: 'h-24 bg-[linear-gradient(180deg,#E3F3FF_0%,#BFE3FF_100%)]' },
                      { label: 'Domains', value: '6+', className: 'h-32 bg-[linear-gradient(180deg,#EAF7F6_0%,#C7F0E7_100%)]' },
                      { label: 'Stability', value: 'Prod', className: 'h-40 bg-[linear-gradient(180deg,#ECF2FF_0%,#D2E3FF_100%)]' },
                    ].map((pillar) => (
                      <div key={pillar.label} className={`rounded-t-[40px] rounded-b-xl px-3 py-3 ${pillar.className}`}>
                        <p className="text-lg font-semibold text-[#1E272E]">{pillar.value}</p>
                        <p className="text-[11px] uppercase tracking-[0.12em] text-[#1E272E]/70">{pillar.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.2em] text-[#1E272E]/58">Selected Work</p>
              <h2 className="mt-2 text-4xl font-semibold leading-tight md:text-6xl">Case Intelligence</h2>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#1E272E]/74">
                Compact case studies focused on outcomes, architecture intent, and delivery clarity.
              </p>
            </div>

            <div className="space-y-4">
              {projects.map((project, idx) => (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.23 }}
                  transition={{ duration: 0.42, delay: idx * 0.06 }}
                  className="bg-white/84 p-5 shadow-[0_14px_30px_rgba(9,132,227,0.1)] md:p-6"
                >
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-[220px_1fr]">
                    <div className="overflow-hidden bg-[#ECF3FC]">
                      <ResponsiveImage
                        alt={project.title}
                        src={project.image.src}
                        fallbackSrc={project.image.fallbackSrc}
                        sources={project.image.sources}
                        sizes="(min-width: 1024px) 220px, 100vw"
                        className="relative h-full w-full"
                        imgClassName="h-full w-full object-cover"
                        eager={idx === 0}
                      />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex bg-[#0984E3]/12 px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-[#0984E3]">
                          {project.category}
                        </span>
                        {project.stack.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex bg-[#ECF5FD] px-2.5 py-1 text-[11px] uppercase tracking-[0.1em] text-[#1E272E]/65"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">{project.title}</h3>
                      <p className="mt-3 max-w-3xl leading-relaxed text-[#1E272E]/78">{project.summary}</p>
                      <ul className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2">
                        {project.outcomes.map((outcome) => (
                          <li key={outcome} className="flex items-start gap-2.5 text-sm leading-relaxed text-[#1E272E]/82">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0984E3]" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-14 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <h2 className="mx-auto max-w-5xl text-5xl font-semibold leading-[0.96] text-[#1E272E] md:text-8xl">
                Redefining Modern
                <br />
                Software Excellence
              </h2>
              <p className="mt-10 text-xs uppercase tracking-[0.2em] text-[#1E272E]/58">Delivery Signature</p>
              <h3 className="mt-3 text-3xl font-semibold leading-tight text-[#1E272E] md:text-5xl">Power. Speed. Control.</h3>
              <p className="mx-auto mt-3 max-w-4xl text-base leading-relaxed text-[#1E272E]/72 md:text-[1.55rem]">
                Everything needed to build, automate, deploy, and maintain reliable software products.
              </p>
            </motion.div>

            <div className="mt-10 overflow-hidden border border-[#1E272E]/12 bg-white/84">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {proofBlocks.map((block, index) => (
                  <motion.article
                    key={block.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    className={[
                      'relative min-h-[170px] border border-[#1E272E]/10 p-5 md:p-6',
                      'bg-[linear-gradient(rgba(30,39,46,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(30,39,46,0.055)_1px,transparent_1px)] bg-[size:26px_26px]',
                      index % 2 === 0 ? 'bg-[#F8FAFD]' : 'bg-[#F4F8FD]',
                    ].join(' ')}
                  >
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_28%_24%,rgba(9,132,227,0.09),transparent_52%)]" />
                    <div className="relative z-10">
                      <div className="inline-flex text-[#0984E3]">{block.icon}</div>
                      <h4 className="mt-3 text-3xl font-semibold tracking-tight text-[#1E272E] md:text-[2.1rem]">
                        {block.title}
                      </h4>
                      <p className="mt-2 max-w-md text-base leading-relaxed text-[#1E272E]/82 md:text-xl">
                        {block.detail}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative pb-16 pt-8 md:pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.24 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden bg-[linear-gradient(130deg,#ECF5FD_0%,#D9EDFF_100%)] px-8 py-10 text-[#1E272E] shadow-[0_18px_40px_rgba(9,132,227,0.14)]"
            >
              <div className="pointer-events-none absolute -right-24 -top-20 h-56 w-56 rounded-full bg-[#0984E3]/18 blur-3xl" />
              <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#1E272E]/62">Next Move</p>
                  <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
                    Want your project to be the next case snapshot?
                  </h2>
                  <p className="mt-4 max-w-2xl text-[#1E272E]/76">
                    Share your goals and constraints. We will map the right architecture and execution path for your team.
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
                    to="/services"
                    className="inline-flex items-center justify-center gap-2 bg-white px-6 py-3 text-[#1E272E] transition-colors hover:bg-[#ECF5FD]"
                  >
                    Review Services
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

export default Portfolio;
