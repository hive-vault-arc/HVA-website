import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Wrench, Globe, Bot, ArrowRight, CheckCircle, Shield, Zap, Clock, Users } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import Background3D from '../components/Background3D';

const maintenancePlans = [
  {
    name: 'Basic',
    price: '800 MAD',
    period: 'per month',
    features: [
      'Weekly system checks',
      'Basic bug fixes',
      'Email support',
      'Performance monitoring'
    ]
  },
  {
    name: 'Professional',
    price: '1,500 MAD',
    period: 'per month',
    features: [
      'Daily system checks',
      'Priority bug fixes',
      '24/7 support',
      'Advanced monitoring',
      'Monthly reports',
      'Security updates'
    ]
  },
  {
    name: 'Enterprise',
    price: '3,000 MAD',
    period: 'per month',
    features: [
      'Real-time monitoring',
      'Instant bug fixes',
      'Dedicated support team',
      'Custom reports',
      'Security audits',
      'Performance optimization'
    ]
  }
];

const mobileAppTiers = [
  {
    name: 'Starter',
    price: '3,500 MAD',
    features: [
      'Basic UI/UX design',
      'Core features only',
      'Single platform (iOS or Android)',
      '3 months support'
    ]
  },
  {
    name: 'Professional',
    price: '7,000 MAD',
    features: [
      'Premium UI/UX design',
      'Advanced features',
      'Both platforms',
      '6 months support',
      'Analytics integration'
    ]
  },
  {
    name: 'Enterprise',
    price: '15,000 MAD',
    features: [
      'Custom design',
      'All features',
      'Both platforms',
      '1 year support',
      'Advanced analytics',
      'Admin dashboard'
    ]
  }
];

const Services: React.FC = () => {
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
      <section className="flex flex-col justify-center items-center text-center relative py-12">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <span
            className="text-gray-600 font-medium text-sm mb-4 block"
          >
            Our Expertise
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-extrabold leading-tight text-gray-900 mb-6"
          >
            Comprehensive Digital Solutions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl font-light max-w-2xl mx-auto text-gray-600 mb-12"
          >
            From mobile apps to AI automation, we provide end-to-end digital solutions for your business.
          </motion.p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="text-gray-600 font-medium mb-4 block">What We Offer</span>
            <h2 className="text-4xl font-bold text-gray-900">Our Core Services</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[ 
              { icon: Smartphone, title: 'Mobile Apps', description: 'Native iOS & Android apps with modern UI/UX design', gradient: 'from-blue-500 to-cyan-500' },
              { icon: Wrench, title: 'Maintenance', description: 'Regular updates and support to keep your systems running', gradient: 'from-purple-500 to-pink-500' },
              { icon: Globe, title: 'Web Systems', description: 'Custom web applications and business systems', gradient: 'from-green-500 to-emerald-500' },
              { icon: Bot, title: 'AI & Automation', description: 'Smart chatbots and automated workflows', gradient: 'from-orange-500 to-red-500' }
            ].map((service, i) => (
              <Tilt key={i} options={{ max: 15, scale: 1.05, speed: 1000 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative p-8 rounded-2xl bg-white transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6 transform transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Plans */}
      <section className="py-12 relative bg-gray-50">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="text-gray-600 font-medium mb-4 block">Plans & Pricing</span>
            <h2 className="text-4xl font-bold text-gray-900">Our Maintenance Plans</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {maintenancePlans.map((plan, i) => (
              <Tilt key={i} options={{ max: 15, scale: 1.05, speed: 1000 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white p-8 rounded-2xl transition-all duration-300 flex flex-col h-full"
                >
                  <div className="text-center mb-6">
                    <h3 className="font-semibold text-xl mb-2 text-gray-900">{plan.name}</h3>
                    <div className="text-3xl font-bold text-blue-600 mb-1">{plan.price}</div>
                    <div className="text-gray-600">{plan.period}</div>
                  </div>
                  <ul className="space-y-3 flex-grow">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center text-gray-600">
                        <CheckCircle className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="mt-8 px-8 py-4 bg-gray-800 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 group inline-flex items-center justify-center w-full"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Development */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="text-gray-600 font-medium mb-4 block">Development Tiers</span>
            <h2 className="text-4xl font-bold text-gray-900">Mobile App Development</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mobileAppTiers.map((tier, i) => (
              <Tilt key={i} options={{ max: 15, scale: 1.05, speed: 1000 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white p-8 rounded-2xl transition-all duration-300 flex flex-col h-full"
                >
                  <div className="text-center mb-6">
                    <h3 className="font-semibold text-xl mb-2 text-gray-900">{tier.name}</h3>
                    <div className="text-3xl font-bold text-blue-600 mb-1">{tier.price}</div>
                    <div className="text-gray-600">Starting from</div>
                  </div>
                  <ul className="space-y-3 flex-grow">
                    {tier.features.map((feature, j) => (
                      <li key={j} className="flex items-center text-gray-600">
                        <CheckCircle className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="mt-8 px-8 py-4 bg-gray-800 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 group inline-flex items-center justify-center w-full"
                  >
                    Get a Quote
                    <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* Web Systems Use Cases */}
      <section className="py-12 relative bg-gray-50">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="text-gray-600 font-medium mb-4 block">Solutions</span>
            <h2 className="text-4xl font-bold text-gray-900">Web Systems Use Cases</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[ 
              { icon: Users, title: 'CRM Systems', description: 'Manage customer relationships and sales pipelines', gradient: 'from-blue-500 to-cyan-500' },
              { icon: Shield, title: 'Inventory Management', description: 'Track and manage your business inventory', gradient: 'from-purple-500 to-pink-500' },
              { icon: Zap, title: 'Business Dashboards', description: 'Real-time analytics and reporting tools', gradient: 'from-green-500 to-emerald-500' }
            ].map((useCase, i) => (
              <Tilt key={i} options={{ max: 15, scale: 1.05, speed: 1000 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative p-8 rounded-2xl bg-white transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${useCase.gradient} rounded-xl flex items-center justify-center mb-6 transform transition-transform duration-300`}>
                    <useCase.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{useCase.title}</h3>
                  <p className="text-gray-600">{useCase.description}</p>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* AI & Automation Examples */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="text-gray-600 font-medium mb-4 block">Innovation</span>
            <h2 className="text-4xl font-bold text-gray-900">AI & Automation Examples</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[ 
              { icon: Bot, title: 'Customer Support Chatbots', description: '24/7 automated customer service', gradient: 'from-blue-500 to-cyan-500' },
              { icon: Clock, title: 'Workflow Automation', description: 'Streamline repetitive business tasks', gradient: 'from-purple-500 to-pink-500' },
              { icon: Zap, title: 'Smart Analytics', description: 'AI-powered business insights', gradient: 'from-green-500 to-emerald-500' }
            ].map((example, i) => (
              <Tilt key={i} options={{ max: 15, scale: 1.05, speed: 1000 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative p-8 rounded-2xl bg-white transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${example.gradient} rounded-xl flex items-center justify-center mb-6 transform transition-transform duration-300`}>
                    <example.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{example.title}</h3>
                  <p className="text-gray-600">{example.description}</p>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 relative bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gray-600 font-medium mb-4 block">Get Started</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Ready to Transform Your Business?</h2>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
              Let's discuss how we can help transform your business with our digital solutions.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link to="/contact" className="px-8 py-4 bg-gray-800 text-white rounded-full font-medium hover:scale-105 transition-all duration-300 group inline-flex items-center">
              Get Your Free Quote
              <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;