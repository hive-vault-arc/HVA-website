import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Background3d from '../components/Plasma';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';
import GradualBlur from '../components/GradualBlur';

type ServiceTrack = {
  title: string;
  summary: string;
  deliverables: string[];
  outcomes: string[];
};

const serviceTracks: ServiceTrack[] = [
  {
    title: 'Mobile Product Development',
    summary:
      'Production-ready iOS and Android experiences focused on usability, performance, and long-term maintainability.',
    deliverables: [
      'Product strategy and feature roadmap',
      'UX flows, wireframes, and high-fidelity UI',
      'Cross-platform or native implementation',
      'Release management and store deployment',
    ],
    outcomes: [
      'Fast and reliable mobile experience',
      'High retention through polished UX',
      'Scalable architecture for future releases',
    ],
  },
  {
    title: 'Web Platforms and Internal Systems',
    summary:
      'Secure and scalable platforms for operations, customer experience, and data-driven decision-making.',
    deliverables: [
      'Custom dashboards and admin portals',
      'CRM, operations, and workflow systems',
      'Role-based access and security controls',
      'API integrations with your existing tools',
    ],
    outcomes: [
      'Reduced manual work and process friction',
      'Higher operational visibility',
      'Improved reliability for daily business use',
    ],
  },
  {
    title: 'AI and Automation',
    summary:
      'Practical AI features and automation pipelines that improve response times and cut repetitive workload.',
    deliverables: [
      'AI assistants and support workflows',
      'Document and data processing automation',
      'Intelligent routing and triage systems',
      'Analytics and model performance monitoring',
    ],
    outcomes: [
      'Faster service delivery',
      'Lower operational cost per task',
      'Better consistency across repetitive processes',
    ],
  },
  {
    title: 'SaaS Engineering and Scale',
    summary:
      'End-to-end SaaS architecture and delivery designed for growth, reliability, and observable performance.',
    deliverables: [
      'Multi-tenant architecture planning',
      'Authentication, billing, and subscriptions',
      'Cloud deployment and CI/CD pipelines',
      'Monitoring, logging, and incident readiness',
    ],
    outcomes: [
      'Faster iteration with stable releases',
      'Enterprise-grade reliability and uptime',
      'Strong foundation for scaling users and features',
    ],
  },
];

const deliveryPhases = [
  {
    title: 'Discovery and Scoping',
    detail:
      'We align on goals, user needs, constraints, and delivery priorities before implementation begins.',
    points: ['Business objectives and KPIs', 'Solution blueprint and milestones', 'Technical scope and timeline'],
    accent: 'from-fuchsia-500/30 to-violet-500/10',
  },
  {
    title: 'Design and Architecture',
    detail:
      'We design the experience and architecture together so product, engineering, and business stay aligned.',
    points: ['UX/UI system and interaction model', 'Data model and API contracts', 'Security and reliability baselines'],
    accent: 'from-cyan-500/30 to-blue-500/10',
  },
  {
    title: 'Build and Integrate',
    detail:
      'We deliver in short iterations with clear demos, QA, and integration checkpoints.',
    points: ['Feature delivery in sprints', 'Integration and regression testing', 'Infrastructure and release pipeline'],
    accent: 'from-emerald-500/30 to-teal-500/10',
  },
  {
    title: 'Launch and Optimize',
    detail:
      'Post-launch, we monitor, optimize, and iterate based on usage patterns and performance.',
    points: ['Go-live and operational handover', 'Monitoring and performance tuning', 'Roadmap for next growth phase'],
    accent: 'from-orange-500/30 to-amber-500/10',
  },
];

const Services: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <Background3d
        color="#CF9FFF"
        speed={0.5}
        direction="forward"
        scale={1.05}
        opacity={0.75}
        mouseInteractive={false}
      />

      <section className="relative pt-32 pb-14">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <p className="text-sm uppercase tracking-[0.22em] text-white/70">Services</p>
            <h1 className="mt-4 text-4xl md:text-6xl font-semibold leading-tight">
              Digital Engineering for teams that need quality and momentum
            </h1>
            <p className="mt-6 text-lg text-white/75 max-w-3xl leading-relaxed">
              HIIVA helps companies design, build, and scale software products. We focus on clear delivery,
              robust architecture, and measurable outcomes. No public pricing is shown, every engagement is scoped
              around your exact business needs.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-medium hover:bg-white/20 transition-colors"
              >
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white/90 hover:bg-white/10 transition-colors"
              >
                View Case Studies
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-10">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.2em] text-white/60">What We Offer</p>
            <h2 className="mt-2 text-3xl md:text-5xl font-semibold">Service Tracks</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {serviceTracks.map((track, idx) => (
              <motion.article
                key={track.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-7 md:p-8"
          >
                <div>
                  <p className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70">
                    Service {idx + 1}
                  </p>
                  <h3 className="text-2xl font-semibold mt-4">{track.title}</h3>
                  <p className="mt-2 text-white/75 leading-relaxed">{track.summary}</p>
                </div>

                <div className="mt-7">
                  <p className="text-sm uppercase tracking-[0.14em] text-white/60">Scope Includes</p>
                  <ul className="mt-3 space-y-2">
                    {track.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-white/85">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/50 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7">
                  <p className="text-sm uppercase tracking-[0.14em] text-white/60">Expected Outcomes</p>
                  <ul className="mt-3 space-y-2">
                    {track.outcomes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-white/85">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-300/80 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.2em] text-white/60">How We Deliver</p>
            <h2 className="mt-2 text-3xl md:text-5xl font-semibold">Execution Framework</h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/20 backdrop-blur-md">
            <ScrollStack
              className="overflow-visible"
              useWindowScroll
              itemDistance={90}
              itemScale={0.02}
              itemStackDistance={24}
              stackPosition="14%"
              scaleEndPosition="8%"
              baseScale={0.9}
            >
              {deliveryPhases.map((phase) => (
                <ScrollStackItem
                  key={phase.title}
                  itemClassName={`h-auto min-h-[18rem] md:min-h-[20rem] border border-white/10 bg-gradient-to-br ${phase.accent} backdrop-blur-lg`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-semibold">{phase.title}</h3>
                      <p className="mt-3 text-white/80 max-w-3xl leading-relaxed">{phase.detail}</p>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
                    {phase.points.map((point) => (
                      <div
                        key={point}
                        className="rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white/90"
                      >
                        {point}
                      </div>
                    ))}
                  </div>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
        </div>
      </section>

      <section className="relative py-16 mb-10">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/10 to-white/5 p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-white/60">Engagement Model</p>
                <h2 className="mt-2 text-3xl md:text-5xl font-semibold">Custom Scoping, Zero Public Pricing</h2>
                <p className="mt-5 text-white/80 leading-relaxed max-w-2xl">
                  We scope each engagement around your product goals, technical constraints, and delivery timeline.
                  If you share your project context, we provide a structured proposal with timeline, scope, and team plan.
                </p>
              </div>
              <div className="space-y-3">
                <div className="rounded-xl border border-white/15 bg-black/30 p-4 flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-fuchsia-300/90 shrink-0" />
                  <p className="text-white/90">Dedicated team and communication rhythm</p>
                </div>
                <div className="rounded-xl border border-white/15 bg-black/30 p-4 flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300/90 shrink-0" />
                  <p className="text-white/90">Clear milestones and release visibility</p>
                </div>
                <div className="rounded-xl border border-white/15 bg-black/30 p-4 flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-300/90 shrink-0" />
                  <p className="text-white/90">Quality, security, and maintainability by default</p>
                </div>
                <Link
                  to="/contact"
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white text-black px-5 py-3 font-medium hover:bg-white/90 transition-colors"
                >
                  Contact Us to Discuss Your Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GradualBlur target="page" position="bottom" height="5rem" strength={2} divCount={5} curve="bezier" exponential opacity={1} />
    </div>
  );
};

export default Services;
