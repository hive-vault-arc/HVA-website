import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

const Pricing: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to an API
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! We will contact you shortly.');
    setFormData({
      name: '',
      email: '',
      service: '',
      description: ''
    });
  };

  const pricingTiers = [
    {
      name: 'MVP App',
      price: 'From 3,500 MAD',
      description: 'Launch your idea quickly with a Minimum Viable Product.',
      features: [
        'Basic Features',
        'Responsive Design',
        'User Authentication',
        'Simple Database',
        'Deployment',
        '30 Days Support',
      ],
      link: '/contact'
    },
    {
      name: 'Maintenance',
      price: 'From 800 MAD/month',
      description: 'Keep your existing digital product running smoothly.',
      features: [
        'Bug Fixing',
        'Security Updates',
        'Performance Monitoring',
        'Content Updates (basic)',
        'Regular Backups',
        'Email Support',
      ],
      link: '/contact'
    },
    {
      name: 'AI Chatbot',
      price: 'From 4,000 MAD',
      description: 'Automate customer support or internal tasks with AI.',
      features: [
        'Natural Language Processing',
        'Integration with Platforms',
        'Customizable Responses',
        'Basic Analytics',
        'Deployment Assistance',
        '60 Days Support',
      ],
      link: '/contact'
    },
    {
      name: 'Automation Tool',
      price: 'From 4,000 MAD',
      description: 'Streamline business processes to save time and resources.',
      features: [
        'Task Automation',
        'Data Integration',
        'Custom Workflows',
        'Reporting',
        'Deployment Assistance',
        '60 Days Support',
      ],
      link: '/contact'
    },
  ];

  useEffect(() => {
    AOS.init({ 
      duration: 1000, 
      once: true,
      offset: 100,
      easing: 'ease-out-cubic'
    });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-[60vh] flex flex-col justify-center items-center text-center relative" data-aos="fade-up">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="title-serif title-big mb-6 gradient-text">
            Affordable Excellence
          </h1>
          <div className="title-small mb-12 text-gray-600 max-w-2xl mx-auto">
            High-quality digital solutions that fit your budget.
          </div>
        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section className="modern-section" data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="title-serif title-medium text-center mb-12">Our Pricing</h2>
          <div className="modern-grid-4 gap-8">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className="modern-card p-8 flex flex-col justify-between h-full"
                data-aos="fade-up"
                data-aos-delay={100 * index}
              >
                <div>
                  <h3 className="font-semibold text-xl mb-4 text-purple-dark">{tier.name}</h3>
                  <div className="title-medium font-bold mb-6">{tier.price}</div>
                  <p className="text-gray-600 mb-8 flex-grow">{tier.description}</p>
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  to={tier.link}
                  className="modern-button-primary group w-full text-center"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 text-gray-600">
            <p>We offer discounts to startups and small businesses. Contact us for a free personalized estimate.</p>
          </div>
        </div>
      </section>

      {/* Get a Quote Section */}
      <section className="modern-section bg-gray-50" data-aos="fade-up">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="title-serif title-medium mb-8">Need a Custom Quote?</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Every project is unique. Tell us about your needs, and we'll provide a tailored estimate.
          </p>
          <div className="modern-card p-8 text-left">
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
                  <label htmlFor="service" className="modern-label">Interested Service</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="modern-input"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="MVP App">MVP App</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="AI Chatbot">AI Chatbot</option>
                    <option value="Automation Tool">Automation Tool</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="description" className="modern-label">Project Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="modern-input"
                    required
                  />
                </div>
                <button type="submit" className="modern-button-primary group w-full">
                  Get Free Quote
                  <ArrowRight className="w-4 h-4 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {/* You can add an FAQ section here if needed */}

    </div>
  );
};

export default Pricing;