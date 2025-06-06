import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, Users } from 'lucide-react';

const Portfolio: React.FC = () => {

  const demoProjects = [
    {
      title: 'EatsNow',
      type: 'Mobile App (Coming Soon)',
      image: 'https://via.placeholder.com/600x400?text=EatsNow',
      description: 'A food delivery mobile application with a user-friendly interface and efficient ordering system.',
      features: ['User Authentication', 'Browse Restaurants', 'Place Orders', 'Payment Integration'],
      link: '#',
    },
    {
      title: 'InventoryMaster',
      type: 'Web Dashboard',
      image: 'https://via.placeholder.com/600x400?text=InventoryMaster',
      description: 'A comprehensive web dashboard for managing inventory, sales, and stock.',
      features: ['Stock Management', 'Sales Tracking', 'Reporting', 'User Roles'],
      link: '#',
    },
    {
      title: 'LegalBot',
      type: 'AI Agent',
      image: 'https://via.placeholder.com/600x400?text=LegalBot',
      description: 'An AI-powered legal assistant that helps users understand legal documents and find relevant information.',
      features: ['Document Analysis', 'Information Retrieval', 'NLP Queries', 'Summarization'],
      link: '#',
    },
  ];

  const testimonials = [
    {
      quote: 'Working with this agency was a game-changer for our business. Their expertise in mobile app development helped us launch our product faster than we thought possible.',
      author: 'Aisha Rahmani',
      role: 'Founder, TechStart',
      rating: 5
    },
    {
      quote: 'The web dashboard they built for us streamlined our operations and significantly improved our efficiency. The team was professional and delivered beyond our expectations.',
      author: 'Omar Benali',
      role: 'Operations Manager, SupplyChain Solutions',
      rating: 5
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
            Our Work Speaks for Itself
          </h1>
          <div className="title-small mb-12 text-gray-600 max-w-2xl mx-auto">
            We build digital solutions that drive growth and make an impact.
          </div>
        </div>
      </section>

      {/* Demo Projects Section */}
      <section className="modern-section" data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="title-serif title-medium text-center mb-12">Demo Projects</h2>
          <div className="modern-grid-3 gap-8">
            {demoProjects.map((project, index) => (
              <div key={index} className="modern-card p-6 flex flex-col justify-between h-full" data-aos="fade-up" data-aos-delay={index * 100}>
                <img src={project.image} alt={project.title} className="rounded-lg mb-6" />
                <h3 className="font-semibold text-xl mb-2 text-purple-dark flex-grow">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{project.type}</p>
                <p className="text-gray-700 mb-6">{project.description}</p>
                <div className="space-y-2 mb-6">
                  {project.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-gray-600 text-sm">
                       <ArrowRight className="w-4 h-4 text-purple-dark mr-2 flex-shrink-0" />
                       <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Link to={project.link} className="inline-flex items-center text-purple-dark hover:underline font-semibold">
                  View Demo
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="modern-section bg-gray-50" data-aos="fade-up">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <h2 className="title-serif title-medium mb-8">Client Projects Coming Soon</h2>
           <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
             We are currently working on exciting projects for our clients. Check back soon to see them featured here!
           </p>
           <div className="flex justify-center space-x-8 text-purple-dark">
             <Clock className="w-12 h-12" />
             <Users className="w-12 h-12" />
           </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="modern-section" data-aos="fade-up">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="title-serif title-medium mb-12">What Our Clients Say</h2>
            <div className="modern-grid-2 gap-8">
               {testimonials.map((testimonial, index) => (
                 <div key={index} className="modern-card p-8 text-center flex flex-col justify-between" data-aos="fade-up" data-aos-delay={index * 100}>
                    <p className="text-gray-700 italic mb-6 flex-grow">"{testimonial.quote}"</p>
                    <div className="text-yellow-400 mb-4 flex justify-center">
                       {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current" />
                       ))}
                    </div>
                    <div>
                       <div className="font-semibold text-purple-dark">{testimonial.author}</div>
                       <div className="text-gray-600 text-sm">{testimonial.role}</div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA Section */}
       <section className="modern-section bg-purple-dark text-white" data-aos="fade-up">
         <div className="max-w-4xl mx-auto px-4 text-center">
           <h2 className="title-serif title-medium mb-8">Ready to Start Your Project?</h2>
           <p className="text-purple-100 mb-12 max-w-2xl mx-auto">
             Let's discuss your ideas and turn them into a reality. Contact us for a free consultation and estimate.
           </p>
           <Link to="/contact" className="modern-button-secondary group">
             Get Your Free Quote
             <ArrowRight className="w-4 h-4 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
           </Link>
         </div>
       </section>

    </div>
  );
};

export default Portfolio;