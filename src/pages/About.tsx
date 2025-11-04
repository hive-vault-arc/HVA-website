import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Target, Award, Globe } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import Background3D from '../components/Plasma';

const teamMembers = [
  {
    name: 'Khalid Chalhi',
    role: 'Lead Engineer',
    bio: 'Full-stack developer with expertise in React, Node.js, and cloud architecture.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Ali Amrani',
    role: 'Senior Developer',
    bio: 'Mobile app specialist with a focus on user experience and performance.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  }
];

const values = [
  {
    icon: <Target className="w-8 h-8" />,
    title: 'Client-Focused',
    description: 'We prioritize your business goals and deliver solutions that drive real value.'
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Quality First',
    description: 'We maintain high standards in every line of code and every pixel of design.'
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Local Expertise',
    description: 'We understand the Moroccan market and build solutions that work here.'
  }
];

const About: React.FC = () => {
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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-extrabold leading-tight text-gray-900 mb-6"
          >
            About Our Agency
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl font-light max-w-2xl mx-auto text-gray-600 mb-12"
          >
            We're a team of passionate developers building digital solutions for Moroccan businesses.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900">Our Mission</h2>
            <p className="text-gray-600 text-lg mt-4 max-w-3xl mx-auto">
              To make high-quality digital solutions accessible to businesses in Morocco. We believe that every business, regardless of size, deserves access to modern technology that can help them grow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <Tilt key={i} options={{ max: 15, scale: 1.05, speed: 1000 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative p-8 rounded-2xl bg-white transition-all duration-300 transform hover:-translate-y-2 "
                >
                  <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                    {React.cloneElement(value.icon, { className: "w-8 h-8 text-white" })}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-gray-900 text-center mb-12"
          >
            Meet Our Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl flex items-start gap-6 shadow-sm"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover shadow"
                />
                <div>
                  <h3 className="font-semibold text-xl mb-1 text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-gray-900 text-center mb-12"
          >
            Why Choose Us?
          </motion.h2>
          <div className="space-y-8 max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2 text-gray-900">Experienced Team</h3>
                  <p className="text-gray-600">
                    Our team brings together years of experience in web development, mobile apps, and AI solutions. We've worked with businesses of all sizes and understand what it takes to deliver successful projects.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2 text-gray-900">Business-Focused Approach</h3>
                  <p className="text-gray-600">
                    We don't just write code – we build solutions that solve real business problems. Every project starts with understanding your goals and ends with measurable results.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2 text-gray-900">Local Expertise</h3>
                  <p className="text-gray-600">
                    As a Moroccan agency, we understand the local market, culture, and business needs. This helps us create solutions that are perfectly tailored to your audience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-gray-900 mb-8"
          >
            Ready to Work Together?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            Let's discuss how we can help transform your business with our digital solutions
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/contact"
              className="px-8 py-4 bg-gray-800 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 group"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;