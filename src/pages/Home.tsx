import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Brain, Rocket, Cloud, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Background3d from '../components/Plasma';
import ScrollStack, {ScrollStackItem} from '../components/ScrollStack';
import {DIcons} from 'dicons';
import { FullScreenScrollFX, FullScreenFXAPI } from "../components/ui/full-screen-scroll-fx";
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);
import TextType from '../components/TextType';
import LightRays from '../components/LightRays';
import LaserFlow from '../components/LaserFlow';
import ShinyText from '../components/ShinyText';
import { image } from 'framer-motion/client';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';
import LogoLoop from '../components/LogoItem';
import FeatureCardsDemo from '../components/ui/feature-cards-demo';
import EngineeringExcellence from '../components/EngineeringExcellence';
import { TimelineDemo } from '../components/timeline-demo';
import GradualBlur from '../components/GradualBlur';
import { HeroParallaxDemo } from '../components/ui/hero-parallax-demo';
import { WorldMapDemo } from '../components/world-map-demo';

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

  const sections = [
  {
    leftLabel: "Mobile Development",
    title: <>Mobile apps</>,
    rightLabel: "Mobile apps",
    background: "./Images/app.png",
    audioSrc: "/sfx/click-01.mp3",
  },
  {
    leftLabel: "Web Development",
    title: <>Web apps</>,
    rightLabel: "Web apps",
    background: "./Images/web.png",
    audioSrc: "/sfx/whoosh-02.mp3",
  },
  {
    leftLabel: "AI Development",
    title: <>AI apps</>,
    rightLabel: "AI apps",
    background: "./Images/ai.jpg",
    audioSrc: "/sfx/whoosh-02.mp3",
  },
  {
    leftLabel: "SaaS Development",
    title: <>SaaS apps</>,
    rightLabel: "SaaS apps",
    background: "./Images/saas.png",
    audioSrc: "/sfx/whoosh-02.mp3",
  },
  // ...
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
        duration: 0.4,
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
            <h1 className="text-5xl md:text-8xl font-semibold text-white mb-6">
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
                className="px-8 py-4 bg-white/10 text-white border border-white/10 rounded-lg font-medium hover:bg-white/20 transition-colors duration-300 text-lg"
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
            <h2 className="text-7xl font-bold text-white mt-2 mb-4">WHAT WE OFFER</h2>
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
        <div className="container mx-auto px-4 relative z-10 ">
          <div className="max-w-6xl mx-auto ">
            <div className="space-y-2 md:space-y-4 text-center p-4 ">
               
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
      <section className="relative p-14">
        {/* LightRays Background for Engineering Excellence */}
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative mt-20 rounded border border-neutral-100 p-8 shadow-md"
        >
          <div className="w-full overflow-hidden ">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <LightRays
            raysOrigin="top-center"
            raysColor="rgba(0,0,255,1)"
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
            <EngineeringExcellence/>
          </div>
        </motion.div>
         
      </section>

      <div className="mb-10 mt-4  md:mt-6">
          <div className="px-2">
            <div className="relative mx-auto h-full max-w-7xl  md:px-12 md:py-20 [mask-image:radial-gradient(800rem_96rem_at_center,white)]">
              <h1 className="flex select-none text-white flex-col  px-3 py-2 text-center text-5xl font-semibold leading-none tracking-tight md:flex-col md:text-8xl lg:flex-row lg:text-8xl">
                <DIcons.Plus
                  strokeWidth={4}
                  className="text-ali absolute -left-5 -top-5 h-10 w-10 text-white "
                />
                <DIcons.Plus
                  strokeWidth={4}
                  className="text-ali absolute -bottom-5 -left-5 h-10 w-10 text-white"
                />
                <DIcons.Plus
                  strokeWidth={4}
                  className="text-ali absolute -right-5 -top-5 h-10 w-10 text-white"
                />
                <DIcons.Plus
                  strokeWidth={4}
                  className="text-ali absolute color-white -bottom-5 -right-5 h-10 w-10 text-white"
                />
                Redefining Excellence in Software
              </h1>
              <FeatureCardsDemo/>
            </div>
          </div>
          </div>

      {/* Timeline Section with LightRays */}
      <section className="relative overflow-hidden bg-gradient-to-b from-black/5 to-black/10">
        <div className="relative z-10">
          <TimelineDemo/>
        </div>
      </section>

      <section className='p-4'>
       <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-40 p-8 shadow-md"
        >
          <div className="w-full overflow-hidden rounded-xl ">
            <FullScreenScrollFX
            sections={ sections }
            header={<><div>The Creative</div><div>Scope</div></>}
            footer={<div></div>}
            showProgress
            durations={{ change: 0.7, snap: 800 }}
            />
          </div>
        </motion.div>
     </section>
 
      {/* World Map Section */}
      <section className="min-h-screen w-full py-20 rounded-xl overflow-hidden">
        <WorldMapDemo />
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