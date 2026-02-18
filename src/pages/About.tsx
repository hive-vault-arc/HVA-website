import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Globe, ShieldCheck, Target, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const teamMembers = [
  {
    name: 'Khalid Chalhi',
    role: 'Co-Founder & Software Engineer',
    bio: 'Computer science engineer focused on architecture, platform reliability, and delivery execution.',
  },
  {
    name: 'Ali Amrani',
    role: 'Co-Founder & Full-Stack Engineer',
    bio: 'Computer science engineer focused on product development, frontend systems, and API architecture.',
  },
  {
    name: 'Oubay Ghamat',
    role: 'Co-Founder & Cloud Engineer',
    bio: 'Computer science engineer focused on cloud infrastructure, deployment workflows, and scalability.',
  },
];

const principles = [
  {
    icon: <Target className="h-5 w-5" />,
    title: 'Outcome-Driven',
    description: 'Every milestone maps to a concrete business objective and measurable impact.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: 'Quality by Default',
    description: 'Performance, security, and maintainability are treated as baseline requirements.',
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: 'Regional Context',
    description: 'We design for market realities in Morocco and MENA without sacrificing global standards.',
  },
];

const executionPoints = [
  'Structured scope with clear ownership',
  'Architecture decisions documented early',
  'Incremental delivery with review checkpoints',
  'Long-term support and optimization planning',
];

const About: React.FC = () => {
  return (
    <div className="relative overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(139,92,246,0.25),transparent_45%),radial-gradient(circle_at_85%_10%,rgba(56,189,248,0.2),transparent_40%),linear-gradient(180deg,#05060a_0%,#04050a_100%)]" />

      <section className="relative container mx-auto px-4 pt-28 pb-14 md:pt-36 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-5xl"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-white/65">About HIIVA</p>
          <h1 className="mt-4 text-5xl font-semibold leading-[0.95] md:text-7xl">
            A Software & Cloud
            <br />
            Engineering Company
          </h1>
          <p className="mt-7 max-w-3xl text-lg text-white/80">
            We build custom digital systems, AI-powered applications, and scalable platforms for modern businesses.
            Our focus is clear execution, dependable architecture, and outcomes that hold up in production.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white px-7 py-3 text-black transition-colors hover:bg-white/90"
            >
              Start a Project
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 px-7 py-3 text-white transition-colors hover:bg-white/15"
            >
              Explore Services
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="relative container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {principles.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-sm"
            >
              <div className="mb-4 inline-flex rounded-lg border border-white/20 bg-white/10 p-2 text-purple-200">
                {item.icon}
              </div>
              <h2 className="text-2xl font-medium">{item.title}</h2>
              <p className="mt-3 text-white/75">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="relative container mx-auto px-4 py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-white/15 bg-gradient-to-r from-white/[0.09] via-white/[0.05] to-white/[0.03] p-7 md:p-10"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">Execution Standard</p>
          <h2 className="mt-4 text-4xl font-semibold md:text-5xl">How We Work</h2>
          <p className="mt-4 max-w-3xl text-white/75">
            We keep delivery structured and transparent so stakeholders always know what is being built, why it matters,
            and how risk is managed.
          </p>
          <div className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-2">
            {executionPoints.map((point) => (
              <div key={point} className="flex items-start gap-3 rounded-xl border border-white/15 bg-black/20 px-4 py-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-purple-300" />
                <span className="text-white/90">{point}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="relative container mx-auto px-4 py-10 md:py-14">
        <div className="mb-8 flex items-center gap-3">
          <Users className="h-5 w-5 text-white/70" />
          <h2 className="text-3xl font-semibold md:text-4xl">Team</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {teamMembers.map((member, index) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.07 }}
              className="rounded-2xl border border-white/15 bg-white/[0.05] p-6"
            >
              <h3 className="text-xl font-medium">{member.name}</h3>
              <p className="mt-1 text-sm text-purple-200">{member.role}</p>
              <p className="mt-3 text-white/75">{member.bio}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="relative container mx-auto px-4 pt-6 pb-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl border border-white/15 bg-white/[0.06] p-8 text-center"
        >
          <h2 className="text-3xl font-semibold md:text-5xl">Ready to Build With Us?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">
            Share your goals and constraints. We will outline the right technical path and delivery model for your team.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-lg border border-white bg-white px-7 py-3 text-black transition-colors hover:bg-white/90"
          >
            Book a Call
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
