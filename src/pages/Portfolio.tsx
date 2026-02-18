import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Fingerprint, Pencil, SlidersHorizontal, Sparkles, Zap } from 'lucide-react';
import Background3d from '../components/Plasma';
import GradualBlur from '../components/GradualBlur';

type Project = {
  title: string;
  category: string;
  image: string;
  summary: string;
  sections: Array<{
    heading: string;
    items: string[];
  }>;
};

const projects: Project[] = [
  {
    title: 'Smart WhatsApp AI Assistant',
    category: 'AI Assistant',
    image: '/Images/aiagent.png',
    summary:
      'Handles client conversations on WhatsApp 24/7 in Arabic, French, and English, then converts interactions into qualified business actions.',
    sections: [
      {
        heading: 'Key Capabilities',
        items: [
          'Understands client needs: budget, location preferences, property type, and number of rooms.',
          'Searches properties from internal inventory and external portals including Amanah.ma, Manafie.ma, and Aafer Immobilier.',
          'Combines results to return best-match options for each client profile.',
          'Creates structured CRM leads from every WhatsApp conversation.',
          'Schedules calls and visits automatically based on client intent.',
          'Remembers conversation context and long-term client preferences.',
          'Scores lead quality from 0-100 based on engagement and buying intent.',
        ],
      },
      {
        heading: 'Security Features',
        items: [
          "Verifies incoming WhatsApp requests using Meta's signature validation.",
          'Applies rate limiting: 60 requests/minute per IP and 10 requests/minute per phone.',
          'Redacts sensitive data such as phone numbers and tokens in logs.',
          "Prevents duplicate processing so the same message can't be handled twice.",
        ],
      },
    ],
  },
  {
    title: 'Complete CRM System',
    category: 'Business Platform',
    image: '/Images/CRM.png',
    summary:
      'A full CRM for real-estate operations covering lead qualification, deal movement, scheduling, project inventory, and team coordination.',
    sections: [
      {
        heading: 'Lead Management',
        items: [
          'Automatic capture from every WhatsApp conversation.',
          'AI-based qualification scoring for lead quality.',
          'Complete activity timeline across all interactions.',
          'Smart conversion from hot leads to active deals.',
        ],
      },
      {
        heading: 'Deal Pipeline',
        items: [
          'Tracks progress from first contact to closing.',
          'Schedules and monitors property visits.',
          'Moves deals through custom sales stages.',
          'Assigns deals to specific projects/properties.',
        ],
      },
      {
        heading: 'Schedule & Reminders',
        items: [
          'Supports Calls, Visits, and Messages workflows.',
          'Auto-creates follow-ups from AI conversation signals.',
          'Tracks states: Pending, Completed, Cancelled, Overdue.',
          'Assigns schedules to responsible agents.',
        ],
      },
      {
        heading: 'Project, Team, and Access',
        items: [
          'Manages property catalog and unit availability by type/floor.',
          'Provides search and filtering across projects and units.',
          'Enables role-based access: Admin, Manager, Agent.',
          'Includes internal real-time messaging and performance analytics.',
          'Uses user approval workflows to control system access.',
        ],
      },
    ],
  },
];

const excellenceItems = [
  {
    icon: <Zap className="w-5 h-5 text-violet-400" />,
    title: 'Fast',
    text: 'Our code is optimized and ready for production.',
  },
  {
    icon: <Cpu className="w-5 h-5 text-violet-400" />,
    title: 'Powerful',
    text: 'Strong logic and reliable systems shipped.',
  },
  {
    icon: <Fingerprint className="w-5 h-5 text-violet-400" />,
    title: 'Security',
    text: 'Safe and stable code that passes strict checks.',
  },
  {
    icon: <Pencil className="w-5 h-5 text-violet-400" />,
    title: 'Customization',
    text: 'Built around your business needs and workflow.',
  },
  {
    icon: <SlidersHorizontal className="w-5 h-5 text-violet-400" />,
    title: 'Clear Control',
    text: 'Full visibility on delivery, status, and decisions.',
  },
  {
    icon: <Sparkles className="w-5 h-5 text-violet-400" />,
    title: 'AI Ready',
    text: 'Ready to adopt practical AI where it adds value.',
  },
];

const testimonials = [
  {
    quote: 'HIIVA helped us launch faster with a product that felt polished from day one.',
    author: 'Aisha Rahmani',
    role: 'Founder',
  },
  {
    quote: 'The team was clear, reliable, and focused. Delivery stayed on track from start to finish.',
    author: 'Omar Benali',
    role: 'Operations Manager',
  },
];

const Portfolio: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <Background3d
        color="#CF9FFF"
        speed={0.5}
        direction="forward"
        scale={1.05}
        opacity={0.75}
        mouseInteractive={false}
        maxDprCap={1}
        targetFpsCap={24}
        visibilityThreshold={0.15}
      />

      <section className="relative pt-32 pb-14">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <p className="text-sm uppercase tracking-[0.22em] text-white/70">Portfolio</p>
            <h1 className="mt-4 text-4xl md:text-6xl font-semibold leading-tight">
              Work that shows how we think, build, and deliver
            </h1>
            <p className="mt-6 text-lg text-white/75 max-w-3xl leading-relaxed">
              We focus on clear outcomes, dependable execution, and products that perform in real use.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-medium hover:bg-white/20 transition-colors"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white/90 hover:bg-white/10 transition-colors"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-10">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.2em] text-white/60">Selected Work</p>
            <h2 className="mt-2 text-3xl md:text-5xl font-semibold">Recent Projects</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.14em] text-white/60">{project.category}</p>
                  <h3 className="mt-2 text-2xl font-semibold">{project.title}</h3>
                  <p className="mt-3 text-white/75 leading-relaxed">{project.summary}</p>
                  <div className="mt-5 space-y-4">
                    {project.sections.map((section) => (
                      <div key={section.heading}>
                        <p className="text-sm uppercase tracking-[0.14em] text-white/60">{section.heading}</p>
                        <ul className="mt-2 space-y-1.5 text-white/88 text-sm leading-relaxed list-disc pl-5">
                          {section.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-14">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-8xl font-semibold leading-[0.95]">Redefining Modern Software Excellence</h2>
            <p className="mt-20 text-4xl md:text-6xl font-semibold">Power. Speed. Control.</p>
            <p className="mt-4 text-white/60 text-xl">Everything you need to build fast, secure, scalable apps.</p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-white/40 max-w-5xl mx-auto">
            {excellenceItems.map((item) => (
              <div
                key={item.title}
                className="p-6 md:p-7 border-b border-r border-white/30 bg-black/40 relative overflow-hidden"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 70% 20%, rgba(255,255,255,0.08), transparent 35%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                  backgroundSize: '100% 100%, 18px 18px, 18px 18px',
                }}
              >
                <div className="mb-5">{item.icon}</div>
                <h3 className="text-4xl md:text-3xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-white/85 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-14">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.2em] text-white/60">Client Voice</p>
            <h2 className="mt-2 text-3xl md:text-5xl font-semibold">What Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((item, idx) => (
              <motion.blockquote
                key={item.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-7 md:p-8"
              >
                <p className="text-white/85 text-lg leading-relaxed">"{item.quote}"</p>
                <footer className="mt-6">
                  <p className="text-white font-medium">{item.author}</p>
                  <p className="text-white/65 text-sm">{item.role}</p>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-14 mb-10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-gradient-to-r from-white/10 to-white/5 p-8 md:p-12">
            <h2 className="text-3xl md:text-5xl text-white font-semibold">Ready to Build Something Great?</h2>
            <p className="text-white/75 mt-4 max-w-2xl mx-auto">
              Share your project goals. We will help you plan the right next move.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
              >
                Book a Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white border border-white/20 rounded-lg font-medium hover:bg-white/20 transition-colors duration-300"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <GradualBlur target="page" position="bottom" height="5rem" strength={2} divCount={5} curve="bezier" exponential opacity={1} />
    </div>
  );
};

export default Portfolio;
