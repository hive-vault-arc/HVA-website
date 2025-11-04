import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Brain, Rocket, Cloud, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Background3d from '../components/Plasma';
import TextType from '../components/TextType';
import LightRays from '../components/LightRays';
import LaserFlow from '../components/LaserFlow';
import ShinyText from '../components/ShinyText';
import { image } from 'framer-motion/client';
import CardSwap, { Card } from '../components/CardSwap';

const Home: React.FC = () => {
  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Custom Software Solutions',
      description: 'Tailored solutions designed specifically for your business needs and challenges.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI Integration',
      description: 'Leverage the power of artificial intelligence to transform your business processes.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'SaaS Development',
      description: 'Scalable cloud-based solutions that grow with your business.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: 'Web and App Development',
      description: 'Custom web and app development tailored to your business needs.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ];

  const projects = [
    {
      title: 'AI-Powered Analytics',
      category: 'AI Integration',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'Enterprise SaaS',
      category: 'SaaS Development',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'Custom CRM',
      category: 'Custom Software',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }
  ];

  const whyUs = [
    '10+ Years of Industry Experience',
    'Dedicated Project Managers',
    'Agile Development Process',
    '24/7 Support & Maintenance',
    'Competitive Pricing',
    'Proven Track Record'
  ];

  return (
    <div className="h-full">
      <Background3d 
        color="#CF9FFF"
        speed={0.6}
        direction="forward"
        scale={1.1}
        opacity={0.8}
        mouseInteractive={true}/>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 "></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 "></div>
        </div>
        <div className="container mx-auto px-4 z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <TextType 
              text={["We build Software", "We custom software", "We solve software"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
            </h1>
            <p className="text-xl  mb-8 max-w-2xl mx-auto">
              <ShinyText
              text=' We build custom software, AI solutions, and SaaS platforms that drive growth and innovation for your business.'/>
             
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
            
              <Link
                to="/portfolio"
                className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-lg font-medium hover:bg-white/20 transition-colors duration-300 text-lg"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative min-h-screen w-full overflow-hidden py-20">
        {/* LaserFlow Divider */}
        <div className="absolute inset-0 w-full h-[150vh] pointer-events-none">
          <LaserFlow 
            className="absolute top-[85%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl"
            horizontalBeamOffset={0}
            verticalBeamOffset={0}
            color='#CF9FFF'
            flowStrength={0.5}
            wispIntensity={0.8}
            fogIntensity={0.3}
          />
        </div>
        
        <div className="container mx-auto relative z-10 px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mt-2 mb-4">Our Services</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative mx-10">
            {/* Left Column */}
            <div className="space-y-4 mx-20 ">
              {services.slice(0, Math.ceil(services.length / 2)).map((service, index) => (
                <motion.div
                  key={`left-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="w-[100%] bg-white/4 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden relative group"
                >
                  {/* Grid dotted background */}
                  <div className="absolute inset-0 w-full h-full opacity-30 group-hover:opacity-50 transition-opacity duration-300" 
                    style={{
                      backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                      WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 40%, transparent 100%)',
                      maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 40%, transparent 100%)',
                      color: 'rgba(255, 255, 255, 0.5)'
                    }}
                  ></div>
                  <div className="p-6 relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white mb-6">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-white">{service.title}</h3>
                    <div className="h-px bg-gradient-to-r from-transparent via-purple/100 to-transparent my-4"></div>
                    <p className="text-gray-300 mb-4">{service.description}</p>
                  </div>
                  {service.image && (
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="mx-auto w-1/2 h-full object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>
                  )
                }</motion.div>
              ))}
            </div>
            
            {/* Right Column */}
            <div className="space-y-4 mx-20">
              {services.slice(Math.ceil(services.length / 2)).map((service, index) => (
                <motion.div
                  key={`right-${index}`}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="w-[100%] bg-white/4 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden relative group"
                >
                  {/* Grid dotted background */}
                  <div className="absolute inset-0 w-full h-full opacity-30 group-hover:opacity-50 transition-opacity duration-300" 
                    style={{
                      backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                      WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 40%, transparent 100%)',
                      maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 40%, transparent 100%)',
                      color: 'rgba(255, 255, 255, 0.5)'
                    }}
                  ></div>
                  <div className="p-6 relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white mb-6">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-white">{service.title}</h3>
                    <div className="h-px bg-gradient-to-r from-transparent via-purple/100 to-transparent my-4"></div>
                    <p className="text-gray-300 mb-4">{service.description}</p>
                  </div>
                  {service.image && (
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="mx-auto w-1/2 h-full rounded-xl object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Code Showcase Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6 max-w-2xl mx-auto lg:mx-0">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Clean & Efficient <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Code</span>
              </h2>
              <p className="text-gray-300 text-lg">
                  We write scalable, optimized and high level code, ready to be shipped.
              </p>
              <div className="pt-4 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-gray-300">Production-ready code</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-gray-300">Responsive, scalable, secure and accessible</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                  <span className="text-gray-300">Modern frameworks and libraries</span>
                </div>
              </div>
            </div>
            
            {/* Right Column - CardSwap */}
            <div className="relative h-[500px] lg:h-[500px] w-full">
              <CardSwap
                cardDistance={50}
                verticalDistance={60}
                delay={5000}
                pauseOnHover={true}
                easing="elastic"
              >
                <Card className="p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                  <div className="text-blue-400 text-sm font-mono mb-2">// React Component</div>
                  <pre className="text-gray-200 text-sm overflow-auto">
                    {`function Button({ children }) {
                    return (
                      <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 
                        text-white rounded-lg transition-colors">
                        {children}
                      </button>
                    );
                  }`}
                  </pre>
                </Card>
                
                <Card className="p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                  <div className="text-purple-400 text-sm font-mono mb-2">// API Fetch</div>
                  <pre className="text-gray-200 text-sm overflow-auto">
                    {`async function fetchData(url) {
                    try {
                      const response = await fetch(url);
                      if (!response.ok) throw new Error('Network error');
                      return await response.json();
                    } catch (error) {
                      console.error('Fetch error:', error);
                      throw error;
                    }
                  }`}
                  </pre>
                </Card>
                
                <Card className="p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                  <div className="text-green-400 text-sm font-mono mb-2">// Tailwind Config</div>
                  <pre className="text-gray-200 text-sm overflow-auto">
                    {`module.exports = {
                    theme: {
                      extend: {
                        colors: {
                          primary: {
                            DEFAULT: '#3B82F6',
                            dark: '#2563EB',
                          },
                        },
                        fontFamily: {
                          sans: ['Inter', 'sans-serif'],
                        },
                      },
                    },
                    plugins: [],
                  }`}
                  </pre>
                </Card>
              </CardSwap>
            </div>
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section className="relative py-20 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-medium">Our Work</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Recent Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore some of our latest work and see how we've helped businesses transform their operations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm text-blue-600 font-medium">{project.category}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">{project.title}</h3>
                  <button className="mt-4 text-blue-600 font-medium flex items-center group-hover:translate-x-1 transition-transform duration-300">
                    View Project <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/portfolio"
              className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-300"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-blue-600 font-medium">Why Choose Us</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-6">We Deliver Exceptional Results</h2>
              <p className="text-gray-600 mb-8">
                Our team of experts is dedicated to providing top-notch software solutions that drive real business value. 
                We combine technical expertise with industry knowledge to deliver outstanding results.
              </p>
              <ul className="space-y-3">
                {whyUs.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Let's Build Something Amazing</h3>
              <p className="text-gray-600 mb-8">
                Ready to take your business to the next level? Get in touch with us today to discuss your project and 
                discover how we can help you achieve your goals.
              </p>
              <Link
                to="/contact"
                className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
              >
                Get a Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;