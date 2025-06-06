import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Wrench, Globe, Bot, CheckCircle, Users, TrendingUp, Flag, ArrowRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Background3D from '../components/Background3D';
import HomeBackground from '../components/HomeBackground';

const demoProjects = [
  {
    title: 'Mini Mobile App',
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    desc: 'A simple, beautiful mobile app demo.',
    link: '/portfolio'
  },
  {
    title: 'Dashboard UI',
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    desc: 'Modern dashboard for business management.',
    link: '/portfolio'
  },
  {
    title: 'AI Chatbot',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    desc: 'Conversational AI for customer support.',
    link: '/portfolio'
  }
];

const Home: React.FC = () => {
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
      <Background3D />
      <HomeBackground />
      
      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col justify-center items-center text-center relative" data-aos="fade-up">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="title-serif title-big mb-6 gradient-text">
            We Build, Automate, and Maintain Your Digital Future
          </h1>
          <div className="title-small mb-12 text-gray-600 max-w-2xl mx-auto">
            Affordable mobile apps, web systems, and AI solutions made in Morocco
          </div>
          <div className="flex gap-6 mt-8 justify-center">
            <Link to="/contact" className="modern-button-primary group">
              Get Your Free Quote
              <ArrowRight className="w-4 h-4 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/portfolio" className="modern-button-secondary">
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="modern-section" data-aos="fade-up">
        <h2 className="modern-section-title">Our Services</h2>
        <div className="modern-grid-4 max-w-6xl mx-auto px-4">
          <div className="feature-card">
            <div className="feature-icon">
              <Wrench className="w-8 h-8" />
            </div>
            <div className="font-semibold text-lg mb-2">Maintenance</div>
            <div className="text-gray-600">Keep your systems running smoothly with our expert maintenance plans.</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Smartphone className="w-8 h-8" />
            </div>
            <div className="font-semibold text-lg mb-2">Mobile Apps</div>
            <div className="text-gray-600">Native iOS & Android apps that deliver exceptional user experiences.</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Globe className="w-8 h-8" />
            </div>
            <div className="font-semibold text-lg mb-2">Web & Enterprise</div>
            <div className="text-gray-600">Scalable web applications and enterprise-grade business systems.</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Bot className="w-8 h-8" />
            </div>
            <div className="font-semibold text-lg mb-2">AI & Automation</div>
            <div className="text-gray-600">Intelligent chatbots and automation tools to streamline operations.</div>
          </div>
        </div>
        <div className="text-center mt-12">
          <Link to="/services" className="modern-button-secondary">
            Explore All Services
          </Link>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="modern-section bg-gray-50" data-aos="fade-up">
        <h2 className="modern-section-title">Why Choose Us?</h2>
        <div className="modern-grid-4 max-w-6xl mx-auto px-4">
          <div className="feature-card bg-white">
            <div className="feature-icon">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="font-semibold text-lg mb-2">Fast & Affordable</div>
            <div className="text-gray-600">Quick delivery without compromising quality or breaking the bank.</div>
          </div>
          <div className="feature-card bg-white">
            <div className="feature-icon">
              <Users className="w-8 h-8" />
            </div>
            <div className="font-semibold text-lg mb-2">Real Engineers</div>
            <div className="text-gray-600">Experienced professionals, not just freelancers.</div>
          </div>
          <div className="feature-card bg-white">
            <div className="feature-icon">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div className="font-semibold text-lg mb-2">Business-Focused</div>
            <div className="text-gray-600">Technology solutions that drive real business growth.</div>
          </div>
          <div className="feature-card bg-white">
            <div className="feature-icon">
              <Flag className="w-8 h-8" />
            </div>
            <div className="font-semibold text-lg mb-2">Built for Morocco</div>
            <div className="text-gray-600">Solutions tailored to the local market and business needs.</div>
          </div>
        </div>
      </section>

      {/* Demo Projects */}
      <section className="modern-section" data-aos="fade-up">
        <h2 className="modern-section-title">Demo Projects</h2>
        <div className="modern-grid-3 max-w-6xl mx-auto px-4">
          {demoProjects.map((proj, i) => (
            <div key={i} className="modern-card-hover overflow-hidden">
              <img src={proj.img} alt={proj.title} className="w-full h-56 object-cover" />
              <div className="p-6">
                <div className="font-semibold text-lg mb-2">{proj.title}</div>
                <div className="text-gray-600 mb-4">{proj.desc}</div>
                <Link to={proj.link} className="text-purple-dark font-medium inline-flex items-center hover:underline">
                  View Demo
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="modern-section bg-gray-50" data-aos="fade-up">
        <h2 className="modern-section-title">What Our Clients Say</h2>
        <div className="max-w-3xl mx-auto px-4">
          <div className="testimonial-card">
            <div className="testimonial-quote">"</div>
            <p className="text-gray-700 text-lg mb-6">
              "They helped us go digital fast, and it cost way less than agencies. The team is professional and responsive."
            </p>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-lg">Happy Client</div>
                <div className="text-gray-600">Local Business Owner</div>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;