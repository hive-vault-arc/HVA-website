import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import Background3D from '../components/Plasma';

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
    <div className="overflow-hidden">
      <Background3D />

      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center relative py-12">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <span
            className="text-gray-600 font-medium text-sm mb-4 block"
          >
            Our Pricing
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-extrabold leading-tight text-gray-900 mb-6"
          >
            Flexible Plans for Every Need
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl font-light max-w-2xl mx-auto text-gray-600 mb-12"
          >
            High-quality digital solutions that fit your budget.
          </motion.p>
        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section className="py-12 relative">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900">Flexible Plans for Every Need</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingTiers.map((tier, index) => (
              <Tilt key={index} options={{ max: 15, scale: 1.05, speed: 1000 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl flex flex-col justify-between h-full transition-all duration-300"
                >
                  <div>
                    <h3 className="font-semibold text-xl mb-4 text-gray-900">{tier.name}</h3>
                    <div className="text-3xl font-bold text-blue-600 mb-6">{tier.price}</div>
                    <p className="text-gray-600 mb-8 flex-grow">{tier.description}</p>
                    <ul className="space-y-2 mb-8">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    to={tier.link}
                    className="px-8 py-4 bg-gray-800 text-white rounded-full font-medium hover:scale-105 transition-all duration-300 group inline-flex items-center justify-center"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </Tilt>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mt-12 text-gray-600"
          >
            <p>We offer discounts to startups and small businesses. Contact us for a free personalized estimate.</p>
          </motion.div>
        </div>
      </section>

      {/* Get a Quote Section */}
      <section className="py-12 relative bg-white">
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gray-600 font-medium mb-4 block">Custom Solutions</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Need a Custom Quote?</h2>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
              Every project is unique. Tell us about your needs, and we'll provide a tailored estimate.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white p-8 rounded-2xl text-left shadow-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition-colors duration-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition-colors duration-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="service" className="block text-gray-700 text-sm font-bold mb-2">Interested Service</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition-colors duration-200 bg-white"
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
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Project Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition-colors duration-200"
                  required
                />
              </div>
              <button type="submit" className="px-8 py-4 bg-gray-800 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 group w-full inline-flex items-center justify-center">
                Get Free Quote
                <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;