import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { MotionConfig, motion } from 'framer-motion';
import PageAmbientBackground from '../components/PageAmbientBackground';
import { useAnimationQuality } from '../lib/animationQuality';

type ContactStatus = {
  type: 'success' | 'error';
  message: string;
} | null;

const CONTACT_EMAIL = 'hello@hiiva.com';
const CONTACT_PHONE = '+212600000000';

const Contact: React.FC = () => {
  const { tier } = useAnimationQuality();
  const glassBlurClass = tier === 'high' ? 'backdrop-blur-sm' : 'backdrop-blur-none';
  const mapSectionRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
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
      [e.target.name]: e.target.value
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
        const subject = `[HIIVA] ${formData.subject}`;
        const body = [
          `Name: ${formData.name}`,
          `Email: ${formData.email}`,
          '',
          formData.message,
        ].join('\n');
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
        message: ''
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
            <p className="text-sm uppercase tracking-[0.22em] text-[#1E272E]/70">Contact</p>
            <h1 className="mt-4 text-4xl md:text-6xl font-semibold leading-tight">
              Let&apos;s discuss your project
            </h1>
            <p className="mt-6 text-lg text-[#1E272E]/75 max-w-3xl leading-relaxed">
              Share what you are building. We will help you define the right next steps.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className={`rounded-2xl border border-[#1E272E]/10 bg-gradient-to-br from-white/10 to-white/5 ${glassBlurClass} p-8`}>
                <h2 className="text-3xl md:text-4xl font-semibold mb-8">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#0984E3]/10 border border-[#1E272E]/15 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#0984E3]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1E272E]">Email</p>
                      <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#1E272E]/75 hover:text-[#1E272E] transition-colors">
                        {CONTACT_EMAIL}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#0984E3]/10 border border-[#1E272E]/15 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#0984E3]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1E272E]">Phone</p>
                      <a href={`tel:${CONTACT_PHONE}`} className="text-[#1E272E]/75 hover:text-[#1E272E] transition-colors">
                        +212 600-000-000
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#0984E3]/10 border border-[#1E272E]/15 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#0984E3]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1E272E]">Location</p>
                      <p className="text-[#1E272E]/75">Tangier, Morocco - Technopark</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`rounded-2xl border border-[#1E272E]/10 bg-gradient-to-br from-white/10 to-white/5 ${glassBlurClass} p-8`}>
                <h3 className="text-2xl font-semibold mb-6">Business Hours</h3>
                <div className="space-y-3 text-[#1E272E]/80">
                  <div className="flex justify-between border-b border-[#1E272E]/10 pb-2">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-[#1E272E]/10 pb-2">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`rounded-2xl border border-[#1E272E]/10 bg-gradient-to-br from-white/10 to-white/5 ${glassBlurClass} p-8`}
            >
              <h2 className="text-3xl md:text-4xl font-semibold mb-8">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-[#1E272E]/80 text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#1E272E]/15 bg-white py-3 px-4 text-[#1E272E] placeholder:text-[#1E272E]/40 focus:outline-none focus:border-[#0984E3]/60"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[#1E272E]/80 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#1E272E]/15 bg-white py-3 px-4 text-[#1E272E] placeholder:text-[#1E272E]/40 focus:outline-none focus:border-[#0984E3]/60"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-[#1E272E]/80 text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#1E272E]/15 bg-white py-3 px-4 text-[#1E272E] placeholder:text-[#1E272E]/40 focus:outline-none focus:border-[#0984E3]/60"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-[#1E272E]/80 text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full rounded-xl border border-[#1E272E]/15 bg-white py-3 px-4 text-[#1E272E] placeholder:text-[#1E272E]/40 focus:outline-none focus:border-[#0984E3]/60"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0984E3] text-[#F5F6FA] px-5 py-3 font-medium hover:bg-[#0776CC] transition-colors"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="w-4 h-4" />
                </button>
                {status && (
                  <p
                    className={`text-sm ${status.type === 'success' ? 'text-emerald-300' : 'text-rose-300'}`}
                    role="status"
                  >
                    {status.message}
                  </p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-10 mb-10">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className={`rounded-2xl border border-[#1E272E]/10 bg-gradient-to-br from-white/10 to-white/5 ${glassBlurClass} p-8`}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-8">Find Us</h2>
            <div ref={mapSectionRef} className="rounded-xl overflow-hidden border border-[#1E272E]/10 min-h-[420px] bg-[#1E272E]/25">
              {shouldLoadMap ? (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103599.61833546984!2d-5.916869989721443!3d35.76338544764214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b875cf04c132d%3A0x76bfc571bfb4e17a!2sTangier!5e0!3m2!1sen!2sma!4v1749336870988!5m2!1sen!2sma"
                  width="100%"
                  height="420"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="h-[420px] w-full flex items-center justify-center text-[#1E272E]/60 text-sm">
                  Map loads when section becomes visible
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

