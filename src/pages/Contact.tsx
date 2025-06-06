import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
    // Handle form submission
    console.log(formData);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-[60vh] flex flex-col justify-center items-center text-center relative" data-aos="fade-up">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="title-serif title-big mb-6 gradient-text">
            Get in Touch
          </h1>
          <div className="title-small mb-12 text-gray-600 max-w-2xl mx-auto">
            Let's discuss how we can help transform your business with our digital solutions
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="modern-section" data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-4">
          <div className="modern-grid-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="modern-card p-8">
                <h2 className="title-serif title-medium mb-8">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="feature-icon">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Email</div>
                      <a href="mailto:contact@agency.com" className="text-purple-dark hover:underline">
                        contact@agency.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="feature-icon">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Phone</div>
                      <a href="tel:+212600000000" className="text-purple-dark hover:underline">
                        +212 600-000-000
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="feature-icon">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Location</div>
                      <div className="text-gray-600">
                        Casablanca, Morocco
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modern-card p-8">
                <h3 className="font-semibold text-lg mb-4">Business Hours</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="modern-card p-8">
              <h2 className="title-serif title-medium mb-8">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="modern-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="modern-input"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="modern-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="modern-input"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="modern-label">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="modern-input"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="modern-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="modern-input"
                    required
                  />
                </div>
                <button type="submit" className="modern-button-primary group w-full">
                  Send Message
                  <Send className="w-4 h-4 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="modern-section bg-gray-50" data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-4">
          <div className="modern-card p-8">
            <h2 className="title-serif title-medium mb-8">Find Us</h2>
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.349348847754!2d-7.6189!3d33.5731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDM0JzIzLjIiTiA3wrAzNycwOC4wIkU!5e0!3m2!1sen!2sma!4v1635000000000!5m2!1sen!2sma"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;