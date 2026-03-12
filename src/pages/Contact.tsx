import React, { useState } from 'react';
import { ArrowUpRight, Mail, MapPin, Phone, Send } from 'lucide-react';
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion';
import { useAnimationQuality } from '../lib/animationQuality';
import PageAmbientBackground from '../components/PageAmbientBackground';

type ContactStatus = {
  type: 'success' | 'error';
  message: string;
} | null;

const CONTACT_EMAILS = ['khalid.chelhi@outlook.fr', 'ali.amrani.dev@gmail.com'];
const CONTACT_PHONES = [
  { raw: '+212688270772', label: '+212688270772' },
  { raw: '+212691918296', label: '+212 691-918296' },
];
const COMPANY_ADDRESS = 'AVENUE TARIK IBN ZIAD N 38 ETAGE 6 N 32 TANGER';
const MAP_QUERY = encodeURIComponent(COMPANY_ADDRESS);
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;

const Contact: React.FC = () => {
  const { motionReduced } = useAnimationQuality();
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const heroShift = useTransform(scrollYProgress, [0, 0.35], [0, 30]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<ContactStatus>(null);

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
      const payload = {
        ...formData,
        subject: 'Project Inquiry',
      };

      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Submission failed with status ${response.status}`);
        }

        setStatus({
          type: 'success',
          message: 'Thank you. Your message was sent successfully.',
        });
      } else {
        const subject = '[H.V.A] Project Inquiry';
        const body = [`Name: ${formData.name}`, `Email: ${formData.email}`, '', formData.message].join('\n');
        const mailto = `mailto:${CONTACT_EMAILS.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;

        setStatus({
          type: 'success',
          message: 'Your email client was opened. Please send the drafted message.',
        });
      }

      setFormData({
        name: '',
        email: '',
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

        <section className="relative pb-12 pt-32 md:pb-14 md:pt-40">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              style={{ y: heroShift }}
              className="relative py-5 md:py-8"
            >
              <div className="pointer-events-none absolute -left-14 top-10 h-24 w-64 rounded-full bg-[#0984E3]/10 blur-3xl" />
              <div className="pointer-events-none absolute right-[28%] top-0 h-28 w-72 rounded-full bg-[#00CEC9]/10 blur-3xl" />
              <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(9,132,227,0.45),transparent)]" />
              <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,206,201,0.4),transparent)]" />
              <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#1E272E]/60">Contact</p>
                  <h1 className="mt-4 max-w-5xl font-serif text-5xl leading-[0.95] md:text-7xl">
                    Let’s build
                    <br />
                    your next
                    <br />
                    <span className="text-[#0984E3]">system.</span>
                  </h1>
                  <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#1E272E]/78">
                    Send a short brief. We reply within 24 hours.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={`mailto:${CONTACT_EMAILS[0]}`}
                      className="inline-flex items-center gap-2 bg-[#1E272E] px-6 py-3 text-[#F5F6FA] transition-colors hover:bg-[#0984E3]"
                    >
                      Email Us
                      <Mail className="h-4 w-4" />
                    </a>
                    <a
                      href={`tel:${CONTACT_PHONES[0].raw}`}
                      className="inline-flex items-center gap-2 bg-white/78 px-6 py-3 text-[#1E272E] transition-colors hover:bg-[#ECF5FD]"
                    >
                      {CONTACT_PHONES[0].label}
                    </a>
                    <a
                      href={`tel:${CONTACT_PHONES[1].raw}`}
                      className="inline-flex items-center gap-2 bg-white/78 px-6 py-3 text-[#1E272E] transition-colors hover:bg-[#ECF5FD]"
                    >
                      {CONTACT_PHONES[1].label}
                    </a>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-[#1E272E]/78 lg:pb-2">
                  {CONTACT_EMAILS.map((email) => (
                    <a key={email} href={`mailto:${email}`} className="flex items-start gap-2.5 hover:text-[#1E272E]">
                      <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#0984E3]" />
                      <span>{email}</span>
                    </a>
                  ))}
                  <div className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0984E3]" />
                    <span>{COMPANY_ADDRESS}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative py-10 md:py-14">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.38 }}
                className="space-y-4 lg:sticky lg:top-28"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[#1E272E]/58">Direct Contact</p>
                <div className="space-y-3">
                  {CONTACT_EMAILS.map((email) => (
                    <a
                      key={`primary-${email}`}
                      href={`mailto:${email}`}
                      className="flex items-center justify-between rounded-full bg-white/66 px-4 py-3 text-[#1E272E]/86 transition-colors hover:bg-white/90"
                    >
                      <span>{email}</span>
                      <ArrowUpRight className="h-4 w-4 text-[#0984E3]" />
                    </a>
                  ))}
                  {CONTACT_PHONES.map((phone) => (
                    <a
                      key={`primary-${phone.raw}`}
                      href={`tel:${phone.raw}`}
                      className="flex items-center justify-between rounded-full bg-white/66 px-4 py-3 text-[#1E272E]/86 transition-colors hover:bg-white/90"
                    >
                      <span>{phone.label}</span>
                      <Phone className="h-4 w-4 text-[#0984E3]" />
                    </a>
                  ))}
                </div>
                <p className="text-sm text-[#1E272E]/62">Monday to Friday, 9:00 to 18:00 (GMT+1)</p>
              </motion.div>

              <motion.article
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="relative overflow-hidden rounded-[42px] bg-[linear-gradient(150deg,rgba(255,255,255,0.62),rgba(236,245,253,0.38))] p-7 shadow-[0_16px_36px_rgba(9,132,227,0.1)] md:p-8"
              >
                <div className="pointer-events-none absolute -left-10 top-6 h-24 w-24 rounded-full bg-[#0984E3]/12 blur-2xl" />
                <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-[#00CEC9]/12 blur-2xl" />
                <p className="text-xs uppercase tracking-[0.18em] text-[#1E272E]/58">Project Brief</p>
                <h2 className="mt-3 font-serif text-4xl font-semibold leading-[1.02] md:text-5xl">Send a message</h2>
                <p className="mt-2 max-w-2xl text-[#1E272E]/72">Name, email, and what you need.</p>

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
                        className="w-full rounded-2xl bg-white/80 px-4 py-3 text-[#1E272E] placeholder:text-[#1E272E]/40 focus:outline-none focus:ring-2 focus:ring-[#0984E3]/25"
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
                        className="w-full rounded-2xl bg-white/80 px-4 py-3 text-[#1E272E] placeholder:text-[#1E272E]/40 focus:outline-none focus:ring-2 focus:ring-[#0984E3]/25"
                        required
                      />
                    </div>
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
                      className="w-full rounded-[22px] bg-white/80 px-4 py-3 text-[#1E272E] placeholder:text-[#1E272E]/40 focus:outline-none focus:ring-2 focus:ring-[#0984E3]/25"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0984E3] px-6 py-3 font-medium text-[#F5F6FA] transition-colors hover:bg-[#0776CC] disabled:cursor-not-allowed disabled:opacity-70"
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
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.38 }}
              className="relative overflow-hidden bg-[linear-gradient(128deg,#1E272E_0%,#2A4D79_48%,#0984E3_100%)] px-7 py-8 text-[#F5F6FA] shadow-[0_20px_42px_rgba(9,132,227,0.22)] md:px-10 md:py-10"
            >
              <div className="pointer-events-none absolute -right-20 -top-16 h-52 w-52 rounded-full bg-[#4CA6EC]/24 blur-3xl" />
              <div className="relative z-10 grid grid-cols-1 gap-5 md:grid-cols-[1.15fr_0.85fr] md:items-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#F5F6FA]/68">Office</p>
                  <h2 className="mt-2 max-w-4xl font-serif text-2xl leading-tight md:text-4xl">{COMPANY_ADDRESS}</h2>
                </div>
                <div className="flex md:justify-end">
                  <a
                    href={MAP_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/10 px-5 py-3 text-sm font-medium text-[#F5F6FA] backdrop-blur-sm transition-colors hover:bg-white/18"
                  >
                    Open in Google Maps
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
};

export default Contact;
