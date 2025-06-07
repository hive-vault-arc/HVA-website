import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, Users, Code, Smartphone, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import Background3D from '../components/Background3D';

const Portfolio: React.FC = () => {

  const demoProjects = [
    {
      title: 'EatsNow',
      type: 'Mobile App',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
      description: 'A food delivery mobile application with a user-friendly interface and efficient ordering system.',
      features: ['User Authentication', 'Browse Restaurants', 'Place Orders', 'Payment Integration'],
      link: '#',
      icon: <Smartphone className="w-8 h-8" />
    },
    {
      title: 'InventoryMaster',
      type: 'Web Dashboard',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      description: 'A comprehensive web dashboard for managing inventory, sales, and stock.',
      features: ['Stock Management', 'Sales Tracking', 'Reporting', 'User Roles'],
      link: '#',
      icon: <Code className="w-8 h-8" />
    },
    {
      title: 'LegalBot',
      type: 'AI Agent',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      description: 'An AI-powered legal assistant that helps users understand legal documents and find relevant information.',
      features: ['Document Analysis', 'Information Retrieval', 'NLP Queries', 'Summarization'],
      link: '#',
      icon: <Bot className="w-8 h-8" />
    },
  ];

  const testimonials = [
    {
      quote: 'Working with this agency was a game-changer for our business. Their expertise in mobile app development helped us launch our product faster than we thought possible.',
      author: 'Aisha Rahmani',
      role: 'Founder, TechStart',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    },
    {
      quote: 'The web dashboard they built for us streamlined our operations and significantly improved our efficiency. The team was professional and delivered beyond our expectations.',
      author: 'Omar Benali',
      role: 'Operations Manager, SupplyChain Solutions',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
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
      <section className="flex flex-col justify-center items-center text-center relative py-20">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4"
          >
            Our Portfolio
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-extrabold leading-tight text-gray-900 mb-6"
          >
            Our Work Speaks for Itself
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl font-light max-w-2xl mx-auto text-gray-600 mb-12"
          >
            We build digital solutions that drive growth and make an impact.
          </motion.p>
        </div>
      </section>

      {/* Demo Projects Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="text-gray-600 font-medium mb-4 block">Featured Projects</span>
            <h2 className="text-4xl font-bold text-gray-900">Our Latest Work</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {demoProjects.map((project, index) => (
              <Tilt key={index} options={{ max: 15, scale: 1.05, speed: 1000 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl transition-all duration-300 flex flex-col bg-white hover:shadow-lg"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                        {React.cloneElement(project.icon, { className: "w-6 h-6 text-white" })}
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900">{project.title}</h3>
                        <p className="text-blue-600 font-medium">{project.type}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6">{project.description}</p>
                    <div className="space-y-3 mb-6">
                      {project.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-gray-600">
                          <ArrowRight className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      to={project.link}
                      className="inline-flex items-center text-blue-600 font-medium hover:underline group"
                    >
                      View Demo
                      <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-gray-600 font-medium mb-4 block">Coming Soon</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Client Projects in Progress</h2>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
              We are currently working on exciting projects for our clients. Check back soon to see them featured here!
            </p>
            <div className="flex justify-center gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-600">In Development</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-600">Client Projects</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="text-gray-600 font-medium mb-4 block">Testimonials</span>
            <h2 className="text-4xl font-bold text-gray-900">What Our Clients Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Tilt key={index} options={{ max: 15, scale: 1.02, speed: 1000 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl flex flex-col justify-between shadow-sm"
                >
                  <div className="flex items-start gap-6 mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">{testimonial.author}</h4>
                      <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                  <div className="text-yellow-400 flex">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-gray-600 font-medium mb-4 block">Get Started</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Ready to Start Your Project?</h2>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
              Let's discuss your ideas and turn them into a reality. Contact us for a free consultation and estimate.
            </p>
            <Link
              to="/contact"
              className="px-8 py-4 bg-gray-800 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 group inline-flex items-center"
            >
              Get Your Free Quote
              <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;