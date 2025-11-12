import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Brain, Rocket, Cloud, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Background3d from '../components/Plasma';
import ScrollStack, {ScrollStackItem} from '../components/ScrollStack';
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);
import TextType from '../components/TextType';
import LightRays from '../components/LightRays';
import LaserFlow from '../components/LaserFlow';
import ShinyText from '../components/ShinyText';
import { image } from 'framer-motion/client';

import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';
import LogoLoop from '../components/LogoItem';
import EngineeringExcellence from '../components/EngineeringExcellence';
import { TimelineDemo } from '../components/timeline-demo';
import GradualBlur from '../components/GradualBlur';
import { HeroParallaxDemo } from '../components/ui/hero-parallax-demo';
;

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
  const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

// Alternative with image sources
const imageLogos = [
  { src: "/logos/company1.png", alt: "Company 1", href: "https://company1.com" },
  { src: "/logos/company2.png", alt: "Company 2", href: "https://company2.com" },
  { src: "/logos/company3.png", alt: "Company 3", href: "https://company3.com" },
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

  const highlightTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!highlightTextRef.current) return;

    const text = highlightTextRef.current;
    const words = text.querySelectorAll('span');
    
    // Clear any existing styles
    gsap.set(words, { 
      y: 50,
      opacity: 0,
      display: 'inline-block',
      willChange: 'transform, opacity'
    });
    
    // Create the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: text,
        start: 'top 80%',
        end: 'top 30%',
        toggleActions: 'play none none none',
        once: true
      }
    });
    
    // Animate each word with a slight delay
    words.forEach((word, i) => {
      tl.to(word, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: i * 0.1
      }, '>');
    });

    // Clean up
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

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
         <GradualBlur
            target="parent"
            position="bottom"
            height="6rem"
            strength={2}
            divCount={5}
            curve="bezier"
            exponential={true}
            opacity={1}
          />
      </section>

      {/* Services Section */}
      <section className="relative min-h-screen w-full overflow-hidden py-20">
        {/* LaserFlow Divider */}
        <div className="absolute inset-0 w-full h-[150vh] pointer-events-none">
          <LaserFlow 
            className="absolute top-[90%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl"
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
            <div className="space-y-4 mx-20">
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
                  <div className="p-8 relative z-10 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-[#4F1AD6] rounded-xl flex items-center justify-center text-white mb-6 shadow-lg">
                      {React.cloneElement(service.icon, { size: 28 })}
                    </div>
                    <h3 className="text-3xl font-light mb-4 text-white">{service.title}</h3>
                    <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-purple-400 to-transparent my-2"></div>
                    <p className="text-gray-300 mb-6 max-w-md">{service.description}</p>
                  </div>
                  {service.image && (
                    <div className="relative w-full h-42 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="mx-auto w-1/2 h-full p-2 object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
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
                  <div className="p-8 relative z-10 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-[#4F1AD6] rounded-xl flex items-center justify-center text-white mb-6 shadow-lg">
                      {React.cloneElement(service.icon, { size: 32 })}
                    </div>
                    <h3 className="text-3xl font-light mb-4 text-white">{service.title}</h3>
                    <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-purple-400 to-transparent my-2"></div>
                    <p className="text-gray-300 mb-6 max-w-md">{service.description}</p>
                  </div>
                  {service.image && (
                    <div className="relative w-full h-44 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="mx-auto w-1/2 h-full p-2 object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
         <GradualBlur
            target="parent"
            position="bottom"
            height="3rem"
            strength={2}
            divCount={5}
            curve="bezier"
            exponential={true}
            opacity={1}
          />
      </section>

      {/* Monochrome Typography Section */}
      <section className="relative py-40 overflow-hidden ">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-2 md:space-y-4 text-center">
              <p className="text-white/70 text-sm md:text-base font-mono tracking-widest mb-6">INNOVATION MEETS PRECISION</p>
              <h2 
                ref={highlightTextRef} 
                className="text-5xl md:text-8xl lg:text-9xl font-black leading-none text-white"
              >
                <span className="inline-block">CRAFTING</span><br/>
                <span className="inline-block">DIGITAL</span><br/>
                <span className="inline-block">EXPERIENCES</span>
                <span className="inline-block">AND</span><br/>
                <span className="inline-block">BEYOND</span><br/>
                
              </h2>
              <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mt-20 font-light leading-relaxed">
                Where every pixel has purpose and every interaction tells a story. 
                We don't just build websites—we create digital landmarks.
              </p>
              
            </div>
          </div>
        </div>
      
      </section>
       <div style={{ height: '200px', position: 'relative', overflow: 'hidden', color: 'white' , marginBottom: '10%'}}>
        <h1 className="text-white/90 text-2xl lg:text-4xl md:text-xl mb-8 mx-auto text-center font-light leading-relaxed">TECHNOLOGY PARTNERS AND TECH STACK</h1>
      <LogoLoop
        logos={techLogos}
        speed={100}
        direction="left"
        logoHeight={48}
        gap={40}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="black"
        ariaLabel="Technology partners"
      />
    </div>
      
      {/* Engineering Excellence Section with LightRays */}
      <section className="relative">
        {/* LightRays Background for Engineering Excellence */}
        <div className="absolute pointer-events-none">
          <LightRays
            raysOrigin="top-center"
            raysColor="rgba(147, 51, 234, 0.15)"
            raysSpeed={0.3}
            lightSpread={1.2}
            rayLength={1.8}
            followMouse={true}
            mouseInfluence={0.15}
            noiseAmount={0.03}
            distortion={0.01}
            className="w-full h-full"
          />
        </div>
        <div className="relative z-10 py-20">
          <EngineeringExcellence/>
        </div>
         <GradualBlur
            target="parent"
            position="top"
            height="6rem"
            strength={2}
            divCount={5}
            curve="bezier"
            exponential={true}
            opacity={1}
          />
      </section>

      {/* Timeline Section with LightRays */}
      <section className="relative overflow-hidden bg-gradient-to-b from-black/5 to-black/10">
        
        <div className="relative z-10">
          <TimelineDemo/>
        </div>
      </section>
     

     {/* Projects Section */}
    <section className="min-h-screen w-full py-20 ">
          <HeroParallaxDemo />    
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
      <GradualBlur
       target="page"
        position="bottom"
        height="6rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential={true}
        opacity={1}
        />
    </div>
    
  );
};

export default Home;