import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Wrench, Globe, Bot, CheckCircle, Users, ArrowRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion, useScroll } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from '@react-spring/web';
import Background3D from '../components/Background3D';
import HomeBackground from '../components/HomeBackground';
import LogoImage from '../Images/Logo.png';
import Home1Image from '../Images/Home1.png';

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
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic'
    });
  }, []);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const springProps = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0px)' : 'translateY(50px)' },
    config: { tension: 300, friction: 20 }
  });

  return (
    <div className="overflow-hidden ">
      <Background3D />
      <HomeBackground />

      {/* Hero Section - Asymmetric Design */}
      <section className="flex items-center relative py-20">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20">
          {/* Left Content Area - Spans 5 columns */}
          <div className="lg:col-span-5 space-y-8 text-gray-900">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4 border border-blue-100"
            >
              Welcome to the Future
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-7xl font-extrabold leading-tight text-gray-900"
            >
              Innovate <br />
              Create <br />
              Transform
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl font-light max-w-md text-gray-600"
            >
              We're crafting the future of digital experiences with cutting-edge technology and creative solutions.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center gap-6 pt-4"
            >
              <Link
                to="#"
                className="px-8 py-4 bg-gray-800 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Get Started
              </Link>
              <Link
                to="#"
                className="text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium group"
              >
                Learn More
                <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Right Image Collage - Spans 7 columns */}
          <div className="lg:col-span-7 relative w-full h-[600px] z-30 flex items-center justify-center">
            <div
              className="w-[500px] h-[500px] flex items-center justify-center bg-white rounded-lg overflow-hidden"
              style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)', opacity: 0.3 }}
            >
              <img
                src={LogoImage}
                alt="Abstract Shape Image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Dynamic Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <span className="text-gray-600 font-medium mb-4 block">Our Services</span>
            <h2 className="text-4xl font-bold text-gray-900">What We Do Best</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Wrench,
                title: 'Maintenance',
                color: 'blue',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Smartphone,
                title: 'Mobile Apps',
                color: 'purple',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: Globe,
                title: 'Web & Enterprise',
                color: 'green',
                gradient: 'from-green-500 to-emerald-500'
              },
              {
                icon: Bot,
                title: 'AI & Automation',
                color: 'orange',
                gradient: 'from-orange-500 to-red-500'
              }
            ].map((service, i) => (
              <Tilt key={i} options={{ max: 15, scale: 1.05, speed: 1000 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6 transform transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600">Keep your systems running smoothly with our expert maintenance plans.</p>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section - Asymmetric Layout */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <animated.div ref={ref} style={springProps} className="lg:col-span-5 space-y-8 text-gray-900">
              <span className="text-gray-600 font-medium mb-4 block">Why Choose Us</span>
              <h2 className="text-5xl font-serif font-bold">
                Transforming Ideas Into Reality
              </h2>
              <p className="text-xl text-gray-600">
                We combine technical expertise with business understanding to deliver solutions that drive real growth.
              </p>
              <div className="space-y-6">
                {[
                  {
                    icon: CheckCircle,
                    title: 'Fast & Affordable',
                    color: 'green',
                    gradient: 'from-green-500 to-emerald-500'
                  },
                  {
                    icon: Users,
                    title: 'Real Engineers',
                    color: 'purple',
                    gradient: 'from-purple-500 to-pink-500'
                  }
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.2 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center flex-shrink-0 transform transition-transform duration-300`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600">Quick delivery without compromising quality or breaking the bank.</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </animated.div>

            <div className="lg:col-span-7">
              <Tilt options={{ max: 25, scale: 1.05, speed: 1000 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative w-full h-[500px] rounded-3xl overflow-hidden flex items-center justify-center"
                >
                  <img
                    src={Home1Image}
                    alt="Team Collaboration"
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </motion.div>
              </Tilt>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Projects Section - Dynamic Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <span className="text-gray-600 font-medium mb-4 block">Our Work</span>
            <h2 className="text-5xl font-serif font-bold text-gray-900">Featured Projects</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {demoProjects.map((proj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl transition-all duration-300 flex flex-col p-6 border border-gray-200 hover:shadow-lg"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-lg mb-4">
                  <img
                    src={proj.img}
                    alt={proj.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-gray-900">{proj.title}</h3>
                  <p className="mb-4 text-gray-600 text-lg">{proj.desc}</p>
                  <Link
                    to={proj.link}
                    className="inline-flex items-center text-blue-600 font-medium hover:underline"
                  >
                    View Demo
                    <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Adjustments for new theme */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Tilt options={{ max: 15, scale: 1.02, speed: 1000 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="rounded-3xl p-12 relative text-gray-900"
              >
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white text-4xl font-serif">
                  "
                </div>
                <p className="text-2xl mb-8 leading-relaxed">
                  "They helped us go digital fast, and it cost way less than agencies. The team is professional and responsive."
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold">Happy Client</h4>
                    <p className="text-gray-600">Local Business Owner</p>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Tilt>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 