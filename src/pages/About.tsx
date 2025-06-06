import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Target, Award, Globe } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
    <div>
      {/* Hero Section */}
      <section className="min-h-[60vh] flex flex-col justify-center items-center text-center relative" data-aos="fade-up">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="title-serif title-big mb-6 gradient-text">
            About Our Agency
          </h1>
          <div className="title-small mb-12 text-gray-600 max-w-2xl mx-auto">
            We're a team of passionate developers building digital solutions for Moroccan businesses
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="modern-section" data-aos="fade-up">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="modern-section-title">Our Mission</h2>
          <p className="text-gray-600 text-lg mb-8 text-center">
            To make high-quality digital solutions accessible to businesses in Morocco. We believe that every business, regardless of size, deserves access to modern technology that can help them grow.
          </p>
          <div className="modern-grid-3 max-w-6xl mx-auto">
            {values.map((value, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">
                  {value.icon}
                </div>
                <div className="font-semibold text-lg mb-2">{value.title}</div>
                <div className="text-gray-600">{value.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="modern-section bg-gray-50" data-aos="fade-up">
        <h2 className="modern-section-title">Meet Our Team</h2>
        <div className="modern-grid-2 max-w-6xl mx-auto px-4">
          {teamMembers.map((member, i) => (
            <div key={i} className="modern-card p-8">
              <div className="flex items-start gap-6">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-xl mb-1">{member.name}</div>
                  <div className="text-purple-dark font-medium mb-3">{member.role}</div>
                  <div className="text-gray-600">{member.bio}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="modern-section" data-aos="fade-up">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="modern-section-title">Why Choose Us?</h2>
          <div className="space-y-8">
            <div className="feature-card">
              <div className="flex items-start gap-4">
                <div className="feature-icon">
                  <Users className="w-8 h-8" />
                </div>
                <div>
                  <div className="font-semibold text-lg mb-2">Experienced Team</div>
                  <div className="text-gray-600">
                    Our team brings together years of experience in web development, mobile apps, and AI solutions. We've worked with businesses of all sizes and understand what it takes to deliver successful projects.
                  </div>
                </div>
              </div>
            </div>
            <div className="feature-card">
              <div className="flex items-start gap-4">
                <div className="feature-icon">
                  <Target className="w-8 h-8" />
                </div>
                <div>
                  <div className="font-semibold text-lg mb-2">Business-Focused Approach</div>
                  <div className="text-gray-600">
                    We don't just write code – we build solutions that solve real business problems. Every project starts with understanding your goals and ends with measurable results.
                  </div>
                </div>
              </div>
            </div>
            <div className="feature-card">
              <div className="flex items-start gap-4">
                <div className="feature-icon">
                  <Globe className="w-8 h-8" />
                </div>
                <div>
                  <div className="font-semibold text-lg mb-2">Local Expertise</div>
                  <div className="text-gray-600">
                    As a Moroccan agency, we understand the local market, culture, and business needs. This helps us create solutions that are perfectly tailored to your audience.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="modern-section bg-gray-50" data-aos="fade-up">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="title-serif title-medium mb-6">Ready to Work Together?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help transform your business with our digital solutions
          </p>
          <Link to="/contact" className="modern-button-primary group">
            Get in Touch
            <ArrowRight className="w-4 h-4 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;