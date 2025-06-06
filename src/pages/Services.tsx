import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Wrench, Globe, Bot, ArrowRight, CheckCircle, Shield, Zap, Clock, Users } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
    <div>
      {/* Hero Section */}
      <section className="min-h-[60vh] flex flex-col justify-center items-center text-center relative" data-aos="fade-up">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="title-serif title-big mb-6 gradient-text">
            Comprehensive Digital Solutions
          </h1>
          <div className="title-small mb-12 text-gray-600 max-w-2xl mx-auto">
            From mobile apps to AI automation, we provide end-to-end digital solutions for your business
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="modern-section" data-aos="fade-up">
        <h2 className="modern-section-title">Our Services</h2>
        <div className="modern-grid-4 max-w-6xl mx-auto px-4">
          <div className="feature-card">
            <div className="feature-icon">
              <Smartphone className="w-8 h-8" />
            </div>
            <div className="font-semibold text-lg mb-2">Mobile Apps</div>
            <div className="text-gray-600">Native iOS & Android apps with modern UI/UX design</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Wrench className="w-8 h-8" />
            </div>
            <div className="font-semibold text-lg mb-2">Maintenance</div>
            <div className="text-gray-600">Regular updates and support to keep your systems running</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Globe className="w-8 h-8" />
            </div>
            <div className="font-semibold text-lg mb-2">Web Systems</div>
            <div className="text-gray-600">Custom web applications and business systems</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Bot className="w-8 h-8" />
            </div>
            <div className="font-semibold text-lg mb-2">AI & Automation</div>
            <div className="text-gray-600">Smart chatbots and automated workflows</div>
          </div>
        </div>
      </section>

      {/* Maintenance Plans */}
      <section className="modern-section bg-gray-50" data-aos="fade-up">
        <h2 className="modern-section-title">Maintenance Plans</h2>
        <div className="modern-grid-3 max-w-6xl mx-auto px-4">
          {maintenancePlans.map((plan, i) => (
            <div key={i} className="modern-card p-8">
              <div className="text-center mb-6">
                <div className="font-semibold text-xl mb-2">{plan.name}</div>
                <div className="text-3xl font-bold text-purple-dark mb-1">{plan.price}</div>
                <div className="text-gray-600">{plan.period}</div>
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center text-gray-600">
                    <CheckCircle className="w-5 h-5 text-purple-dark mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile App Pricing */}
      <section className="modern-section" data-aos="fade-up">
        <h2 className="modern-section-title">Mobile App Development</h2>
        <div className="modern-grid-3 max-w-6xl mx-auto px-4">
          {mobileAppTiers.map((tier, i) => (
            <div key={i} className="modern-card p-8">
              <div className="text-center mb-6">
                <div className="font-semibold text-xl mb-2">{tier.name}</div>
                <div className="text-3xl font-bold text-purple-dark mb-1">{tier.price}</div>
                <div className="text-gray-600">Starting from</div>
              </div>
              <ul className="space-y-3">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-center text-gray-600">
                    <CheckCircle className="w-5 h-5 text-purple-dark mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Web Systems Use Cases */}
      <section className="modern-section bg-gray-50" data-aos="fade-up">
        <h2 className="modern-section-title">Web Systems Use Cases</h2>
        <div className="modern-grid-3 max-w-6xl mx-auto px-4">
          <div className="feature-card">
            <div className="feature-icon">
              <Users className="w-8 h-8" />
            </div>
            <div className="font-semibold text-lg mb-2">CRM Systems</div>
            <div className="text-gray-600">Manage customer relationships and sales pipelines</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Shield className="w-8 h-8" />
            </div>
            <div className="font-semibold text-lg mb-2">Inventory Management</div>
            <div className="text-gray-600">Track and manage your business inventory</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Zap className="w-8 h-8" />
            </div>
            <div className="font-semibold text-lg mb-2">Business Dashboards</div>
            <div className="text-gray-600">Real-time analytics and reporting tools</div>
          </div>
        </div>
      </section>

      {/* AI & Automation Examples */}
      <section className="modern-section" data-aos="fade-up">
        <h2 className="modern-section-title">AI & Automation Examples</h2>
        <div className="modern-grid-3 max-w-6xl mx-auto px-4">
          <div className="feature-card">
            <div className="feature-icon">
              <Bot className="w-8 h-8" />
            </div>
            <div className="font-semibold text-lg mb-2">Customer Support Chatbots</div>
            <div className="text-gray-600">24/7 automated customer service</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Clock className="w-8 h-8" />
            </div>
            <div className="font-semibold text-lg mb-2">Workflow Automation</div>
            <div className="text-gray-600">Streamline repetitive business tasks</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Zap className="w-8 h-8" />
            </div>
            <div className="font-semibold text-lg mb-2">Smart Analytics</div>
            <div className="text-gray-600">AI-powered business insights</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="modern-section bg-gray-50" data-aos="fade-up">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="title-serif title-medium mb-6">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help transform your business with our digital solutions
          </p>
          <Link to="/contact" className="modern-button-primary group">
            Get Your Free Quote
            <ArrowRight className="w-4 h-4 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;