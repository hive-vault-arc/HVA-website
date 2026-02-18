import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import Background3d from '../components/Plasma';
import GradualBlur from '../components/GradualBlur';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire backend/email service
    console.log(formData);
  };

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
            <p className="text-sm uppercase tracking-[0.22em] text-white/70">Contact</p>
            <h1 className="mt-4 text-4xl md:text-6xl font-semibold leading-tight">
              Let&apos;s discuss your project
            </h1>
            <p className="mt-6 text-lg text-white/75 max-w-3xl leading-relaxed">
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
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8">
                <h2 className="text-3xl md:text-4xl font-semibold mb-8">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-purple-200" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Email</p>
                      <a href="mailto:contact@agency.com" className="text-white/75 hover:text-white transition-colors">
                        contact@agency.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-purple-200" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Phone</p>
                      <a href="tel:+212600000000" className="text-white/75 hover:text-white transition-colors">
                        +212 600-000-000
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-purple-200" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Location</p>
                      <p className="text-white/75">Casablanca, Morocco</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8">
                <h3 className="text-2xl font-semibold mb-6">Business Hours</h3>
                <div className="space-y-3 text-white/80">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
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
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8"
            >
              <h2 className="text-3xl md:text-4xl font-semibold mb-8">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-white/80 text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/15 bg-black/30 py-3 px-4 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-300/60"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/15 bg-black/30 py-3 px-4 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-300/60"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-white/80 text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/15 bg-black/30 py-3 px-4 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-300/60"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-white/80 text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full rounded-xl border border-white/15 bg-black/30 py-3 px-4 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-300/60"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-black px-5 py-3 font-medium hover:bg-white/90 transition-colors"
                >
                  Send Message
                  <Send className="w-4 h-4" />
                </button>
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
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-8">Find Us</h2>
            <div className="rounded-xl overflow-hidden border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103599.61833546984!2d-5.916869989721443!3d35.76338544764214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b875cf04c132d%3A0x76bfc571bfb4e17a!2sTangier!5e0!3m2!1sen!2sma!4v1749336870988!5m2!1sen!2sma"
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <GradualBlur target="page" position="bottom" height="5rem" strength={2} divCount={5} curve="bezier" exponential opacity={1} />
    </div>
  );
};

export default Contact;

