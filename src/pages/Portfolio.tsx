import React from 'react';
import { Link } from 'react-router-dom';
import { MotionConfig, motion } from 'framer-motion';
import { ArrowRight, Cpu, Fingerprint, Pencil, SlidersHorizontal, Sparkles, Zap } from 'lucide-react';
import PageAmbientBackground from '../components/PageAmbientBackground';
import ResponsiveImage from '../components/ui/ResponsiveImage';
import { useAnimationQuality } from '../lib/animationQuality';

type Project = {
  title: string;
  category: string;
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
    image: {
      src: '/Images/aiagent.webp',
      fallbackSrc: '/Images/aiagent.webp',
      sources: [
        {
          srcSet: '/Images/aiagent.webp',
          type: 'image/webp',
          sizes: '(min-width: 1280px) 620px, (min-width: 1024px) 48vw, 100vw',
        },
      ],
    },
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
    image: {
      src: '/Images/CRM.webp',
      fallbackSrc: '/Images/CRM.webp',
      sources: [
        {
          srcSet: '/Images/CRM.webp',
          type: 'image/webp',
          sizes: '(min-width: 1280px) 620px, (min-width: 1024px) 48vw, 100vw',
        },
      ],
    },
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
    icon: <Zap className="w-5 h-5 text-[#0984E3]" />,
    title: 'Fast',
    text: 'Our code is optimized and ready for production.',
  },
  {
    icon: <Cpu className="w-5 h-5 text-[#0984E3]" />,
    title: 'Powerful',
    text: 'Strong logic and reliable systems shipped.',
  },
  {
    icon: <Fingerprint className="w-5 h-5 text-[#0984E3]" />,
    title: 'Security',
    text: 'Safe and stable code that passes strict checks.',
  },
  {
    icon: <Pencil className="w-5 h-5 text-[#0984E3]" />,
    title: 'Customization',
    text: 'Built around your business needs and workflow.',
  },
  {
    icon: <SlidersHorizontal className="w-5 h-5 text-[#0984E3]" />,
    title: 'Clear Control',
    text: 'Full visibility on delivery, status, and decisions.',
  },
  {
    icon: <Sparkles className="w-5 h-5 text-[#0984E3]" />,
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
  const { tier } = useAnimationQuality();
  const glassBlurClass = tier === 'high' ? 'backdrop-blur-sm' : 'backdrop-blur-none';

  return (
    <MotionConfig reducedMotion={tier === 'high' ? 'never' : 'always'}>
      <div className="relative min-h-screen overflow-hidden bg-[#F5F6FA] text-[#1E272E]">
      <PageAmbientBackground />

      <section className="relative pt-32 pb-14">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <p className="text-sm uppercase tracking-[0.22em] text-[#1E272E]/70">Portfolio</p>
            <h1 className="mt-4 text-4xl md:text-6xl font-semibold leading-tight">
              Work that shows how we think, build, and deliver
            </h1>
            <p className="mt-6 text-lg text-[#1E272E]/75 max-w-3xl leading-relaxed">
              Software and machine learning engineering delivered as practical products:
              custom applications, AI assistants, automation workflows, and production-ready releases.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-[#1E272E]/20 bg-[#0984E3]/10 px-6 py-3 font-medium hover:bg-[#0984E3]/20 transition-colors"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full border border-[#1E272E]/20 px-6 py-3 font-medium text-[#1E272E]/90 hover:bg-[#0984E3]/10 transition-colors"
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
            <p className="text-sm uppercase tracking-[0.2em] text-[#1E272E]/60">Selected Work</p>
            <h2 className="mt-2 text-3xl md:text-5xl font-semibold">Recent Projects</h2>
            <p className="mt-4 max-w-3xl text-[#1E272E]/72">
              Case studies showing how we apply software engineering, AI, and automation to solve real operational problems.
            </p>
          </div>

          <div className="space-y-6">
            {projects.map((project, idx) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className={`overflow-hidden rounded-2xl border border-[#1E272E]/12 bg-gradient-to-br from-white/75 to-[#ECF5FD]/55 shadow-[0_18px_40px_rgba(9,132,227,0.08)] ${glassBlurClass}`}
              >
                <div className="grid grid-cols-1 gap-6 p-5 md:p-6 lg:grid-cols-12 lg:items-start">
                  <div
                    className={[
                      'lg:col-span-5',
                      idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1',
                    ].join(' ')}
                  >
                    <div className="aspect-[16/10] overflow-hidden rounded-xl border border-[#1E272E]/10 bg-white/70">
                      <ResponsiveImage
                        alt={project.title}
                        src={project.image.src}
                        fallbackSrc={project.image.fallbackSrc}
                        sources={project.image.sources}
                        sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, 100vw"
                        className="relative h-full w-full"
                        imgClassName="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                        eager={idx === 0}
                      />
                    </div>
                  </div>

                  <div
                    className={[
                      'lg:col-span-7',
                      idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2',
                    ].join(' ')}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-xs uppercase tracking-[0.14em] text-[#1E272E]/62">{project.category}</p>
                      <span className="inline-flex items-center rounded-full border border-[#0984E3]/25 bg-[#0984E3]/10 px-2.5 py-1 text-[11px] font-medium text-[#0984E3]">
                        {project.sections.length} delivery areas
                      </span>
                    </div>
                    <h3 className="mt-2 text-2xl md:text-3xl font-semibold leading-tight">{project.title}</h3>
                    <p className="mt-3 max-w-3xl text-[#1E272E]/76 leading-relaxed">{project.summary}</p>

                    <div className="mt-5 space-y-3">
                      {project.sections.map((section, sectionIndex) => (
                        <details
                          key={section.heading}
                          open={sectionIndex === 0}
                          className="group rounded-lg border border-[#1E272E]/12 bg-white/70 px-4 py-3"
                        >
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                            <span className="text-sm uppercase tracking-[0.12em] text-[#1E272E]/70">{section.heading}</span>
                            <span className="text-xs text-[#0984E3] transition-transform group-open:rotate-45">+</span>
                          </summary>
                          <ul className="mt-3 space-y-1.5 pl-5 text-sm leading-relaxed text-[#1E272E]/86 list-disc">
                            {section.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </details>
                      ))}
                    </div>
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
            <p className="mt-4 text-[#1E272E]/60 text-xl">Everything needed to build, automate, deploy, and maintain reliable software products.</p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[#1E272E]/28 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(241,248,255,0.95))] max-w-5xl mx-auto shadow-[0_16px_40px_rgba(9,132,227,0.08)]">
            {excellenceItems.map((item) => (
              <div
                key={item.title}
                className="p-6 md:p-7 border-b border-r border-[#1E272E]/18 relative overflow-hidden"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 70% 18%, rgba(9,132,227,0.12), transparent 38%), linear-gradient(rgba(30,39,46,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,39,46,0.07) 1px, transparent 1px)',
                  backgroundSize: '100% 100%, 18px 18px, 18px 18px',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.75)',
                }}
              >
                <div className="mb-5">{item.icon}</div>
                <h3 className="text-4xl md:text-3xl font-semibold text-[#1E272E]">{item.title}</h3>
                <p className="mt-3 text-[#1E272E]/82 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-14">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.2em] text-[#1E272E]/60">Client Voice</p>
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
                className="rounded-2xl border border-[#1E272E]/10 bg-gradient-to-br from-white/10 to-white/5 p-7 md:p-8"
              >
                <p className="text-[#1E272E]/85 text-lg leading-relaxed">"{item.quote}"</p>
                <footer className="mt-6">
                  <p className="text-[#1E272E] font-medium">{item.author}</p>
                  <p className="text-[#1E272E]/65 text-sm">{item.role}</p>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-14 mb-10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto rounded-2xl border border-[#1E272E]/10 bg-gradient-to-r from-white/10 to-white/5 p-8 md:p-12">
            <h2 className="text-3xl md:text-5xl text-[#1E272E] font-semibold">Ready to Build Something Great?</h2>
            <p className="text-[#1E272E]/75 mt-4 max-w-2xl mx-auto">
              Share your project goals. We will help you plan the right next move.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0984E3] text-[#F5F6FA] rounded-lg font-medium hover:bg-[#0776CC] transition-colors duration-300"
              >
                Book a Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#0984E3]/10 text-[#1E272E] border border-[#1E272E]/20 rounded-lg font-medium hover:bg-[#0984E3]/20 transition-colors duration-300"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      </div>
    </MotionConfig>
  );
};

export default Portfolio;
