import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Send, Sparkles, Workflow } from 'lucide-react';
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion';
import { useAnimationQuality } from '../lib/animationQuality';
import PageAmbientBackground from '../components/PageAmbientBackground';

type ContactStatus = {
  type: 'success' | 'error';
  message: string;
} | null;

const CONTACT_EMAIL = 'hello@hiva.com';
const CONTACT_PHONE = '+212600000000';

const conversationStarters = [
  {
    title: 'AI Receptionist & Agents',
    detail: 'Front-desk AI, support agents, and role-based operational workflows.',
  },
  {
    title: 'AI Analyst Systems',
    detail: 'Reporting, dashboards, and insight pipelines for faster decisions.',
  },
  {
    title: 'Automation & Custom Platforms',
    detail: 'Internal systems, API orchestration, and process automation.',
  },
  {
    title: 'Delivery & Reliability',
    detail: 'CI/CD workflows, monitoring, security, and production readiness.',
  },
];

const Contact: React.FC = () => {
  const { motionReduced } = useAnimationQuality();
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const heroShift = useTransform(scrollYProgress, [0, 0.35], [0, 30]);

  const mapSectionRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<ContactStatus>(null);

  useEffect(() => {
    const target = mapSectionRef.current;
    if (!target || typeof IntersectionObserver === 'undefined') {
      setShouldLoadMap(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px 0px', threshold: 0.05 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setStatus(null);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const endpoint = (import.meta.env.VITE_CONTACT_API_URL as string | undefined)?.trim();

      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(`Submission failed with status ${response.status}`);
        }

        setStatus({
          type: 'success',
          message: 'Thank you. Your message was sent successfully.',
        });
      } else {
        const subject = `[HIVA] ${formData.subject}`;
        const body = [`Name: ${formData.name}`, `Email: ${formData.email}`, '', formData.message].join('\n');
        const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;

        setStatus({
          type: 'success',
          message: 'Your email client was opened. Please send the drafted message.',
        });
      }

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch {
      setStatus({
        type: 'error',
        message: 'We could not send your message right now. Please try again or email us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MotionConfig reducedMotion={motionReduced ? 'always' : 'never'}>
      <div className="relative isolate min-h-screen overflow-hidden bg-[#F5F6FA] text-[#1E272E]">
        <motion.div
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#0984E3] via-[#4CA6EC] to-[#00CEC9]"
          style={{ scaleX: progressScale }}
        />
        <PageAmbientBackground className="-z-10" />

        <section className="relative pb-12 pt-32 md:pt-40 md:pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              style={{ y: heroShift }}
              className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#1E272E]/58">Contact</p>
                <h1 className="mt-4 max-w-5xl font-serif text-5xl leading-[0.95] md:text-7xl">Let’s map your next build.</h1>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#1E272E]/76">
                  Share what you are building and where your bottlenecks are. We will help you define the right technical
                  scope, priorities, and delivery path.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex items-center gap-2 bg-[#0984E3] px-6 py-3 text-[#F5F6FA] transition-colors hover:bg-[#0776CC]"
                  >
                    Email Us
                    <Mail className="h-4 w-4" />
                  </a>
                  <a
                    href={`tel:${CONTACT_PHONE}`}
                    className="inline-flex items-center gap-2 bg-white/85 px-6 py-3 text-[#1E272E] shadow-[0_12px_26px_rgba(9,132,227,0.08)] transition-colors hover:bg-[#ECF5FD]"
                  >
                    Call +212 600-000-000
                  </a>
                </div>
              </div>

              <aside className="bg-white/82 p-6 shadow-[0_16px_38px_rgba(9,132,227,0.1)] md:p-7">
                <p className="text-xs uppercase tracking-[0.18em] text-[#1E272E]/58">Conversation Starters</p>
                <div className="mt-4 space-y-3">
                  {conversationStarters.map((item) => (
                    <div key={item.title} className="bg-[#F2F7FD] px-4 py-3">
                      <p className="text-sm font-semibold text-[#1E272E]">{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#1E272E]/72">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </motion.div>
          </div>
        </section>

        <section className="relative py-10 md:py-14">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-4 lg:sticky lg:top-28 lg:h-fit">
                <motion.article
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white/84 p-7 text-[#1E272E] shadow-[0_16px_34px_rgba(9,132,227,0.1)] md:p-8"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-[#1E272E]/58">Direct Channels</p>
                  <div className="mt-5 space-y-4">
                    <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-start gap-3 text-[#1E272E]/86 hover:text-[#1E272E]">
                      <Mail className="mt-0.5 h-5 w-5 text-[#0984E3]" />
                      <span>{CONTACT_EMAIL}</span>
                    </a>
                    <a href={`tel:${CONTACT_PHONE}`} className="flex items-start gap-3 text-[#1E272E]/86 hover:text-[#1E272E]">
                      <Phone className="mt-0.5 h-5 w-5 text-[#0984E3]" />
                      <span>+212 600-000-000</span>
                    </a>
                    <div className="flex items-start gap-3 text-[#1E272E]/86">
                      <MapPin className="mt-0.5 h-5 w-5 text-[#0984E3]" />
                      <span>Tangier, Morocco - Technopark</span>
                    </div>
                  </div>

                  <div className="mt-8 bg-[#ECF5FD] px-4 py-4">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#1E272E]/56">Response Window</p>
                    <p className="mt-2 text-2xl font-semibold">Within 24 hours</p>
                    <p className="mt-1 text-sm text-[#1E272E]/72">Monday to Friday, 9:00 to 18:00 (GMT+1)</p>
                  </div>
                </motion.article>

                <motion.article
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.38, delay: 0.04 }}
                  className="bg-white/84 p-6 shadow-[0_14px_30px_rgba(9,132,227,0.1)]"
                >
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#1E272E]/58">Preparation Notes</p>
                  <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[#1E272E]/78">
                    <li className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0984E3]" />
                      <span>Share your business goal and expected timeline.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0984E3]" />
                      <span>Describe current blockers in operations or product delivery.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0984E3]" />
                      <span>Tell us whether you need AI agents, analyst flows, or full ecosystem delivery.</span>
                    </li>
                  </ul>
                  <Link
                    to="/services"
                    className="mt-4 inline-flex items-center gap-2 text-sm text-[#0984E3] transition-colors hover:text-[#0668b4]"
                  >
                    Review service lines
                    <Workflow className="h-4 w-4" />
                  </Link>
                </motion.article>

                <motion.article
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.38, delay: 0.08 }}
                  className="bg-[#ECF5FD] p-6 text-[#1E272E] shadow-[0_12px_26px_rgba(9,132,227,0.08)]"
                >
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#1E272E]/56">What Happens Next</p>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#1E272E]/76">
                    <li>1. We review your context and constraints.</li>
                    <li>2. We send a practical scope and execution direction.</li>
                    <li>3. We align priorities and start delivery planning.</li>
                  </ul>
                </motion.article>
              </div>

              <motion.article
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="bg-white/84 p-7 shadow-[0_16px_36px_rgba(9,132,227,0.1)] md:p-8"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-[#1E272E]/58">Project Intake</p>
                <h2 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">Send Your Brief</h2>
                <p className="mt-3 max-w-2xl text-[#1E272E]/74">
                  Include your goal, current blockers, and timeline. We will respond with practical next steps.
                </p>

                <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#1E272E]/76">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-[#F2F7FD] px-4 py-3 text-[#1E272E] placeholder:text-[#1E272E]/40 focus:outline-none focus:ring-2 focus:ring-[#0984E3]/25"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#1E272E]/76">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-[#F2F7FD] px-4 py-3 text-[#1E272E] placeholder:text-[#1E272E]/40 focus:outline-none focus:ring-2 focus:ring-[#0984E3]/25"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-2 block text-sm font-medium text-[#1E272E]/76">
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-[#F2F7FD] px-4 py-3 text-[#1E272E] placeholder:text-[#1E272E]/40 focus:outline-none focus:ring-2 focus:ring-[#0984E3]/25"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-[#1E272E]/76">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-[#F2F7FD] px-4 py-3 text-[#1E272E] placeholder:text-[#1E272E]/40 focus:outline-none focus:ring-2 focus:ring-[#0984E3]/25"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 bg-[#0984E3] px-6 py-3 font-medium text-[#F5F6FA] transition-colors hover:bg-[#0776CC] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="h-4 w-4" />
                  </button>

                  {status && (
                    <p className={`text-sm ${status.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}`} role="status">
                      {status.message}
                    </p>
                  )}
                </form>
              </motion.article>
            </div>
          </div>
        </section>

        <section className="relative pb-16 pt-8 md:pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.38 }}
              className="bg-white/84 p-7 shadow-[0_16px_34px_rgba(9,132,227,0.1)] md:p-8"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#1E272E]/58">Location</p>
                  <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Find Us in Tangier</h2>
                </div>
                <span className="inline-flex items-center gap-2 bg-[#ECF5FD] px-3 py-1.5 text-xs uppercase tracking-[0.1em] text-[#0984E3]">
                  <Sparkles className="h-3.5 w-3.5" />
                  On-site Meetings
                </span>
              </div>

              <div ref={mapSectionRef} className="min-h-[420px] overflow-hidden bg-[#EEF5FC]">
                {shouldLoadMap ? (
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103599.61833546984!2d-5.916869989721443!3d35.76338544764214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b875cf04c132d%3A0x76bfc571bfb4e17a!2sTangier!5e0!3m2!1sen!2sma!4v1749336870988!5m2!1sen!2sma"
                    width="100%"
                    height="420"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="HIVA location map"
                  />
                ) : (
                  <div className="flex h-[420px] w-full items-center justify-center text-sm text-[#1E272E]/60">
                    Map loads when this section becomes visible
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
};

export default Contact;
