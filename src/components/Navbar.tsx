import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 backdrop-blur-md rounded-full w-[90%] max-w-6xl ${isScrolled ? 'bg-black/30 shadow-lg' : 'bg-black/20'} border border-white/10`}>
      <div className="flex items-center justify-between h-16 px-8 mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-light tracking-tight text-white font-serif">DevCraft</span>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/about" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium font-serif">About</Link>
          <Link to="/portfolio" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium font-serif">Portfolio</Link>
          <Link to="/services" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium font-serif">Services</Link>
          <Link to="/pricing" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium font-serif">Pricing</Link>
          <Link to="/contact" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium font-serif">Contact</Link>
          <Link to="/blog" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium font-serif">Blog</Link>
        </div>
        <div className="flex items-center">
          <a href="#" className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center text-sm font-serif">
            Book a Call <ArrowUpRight className="inline-block w-3 h-3 ml-1" />
          </a>
          <button 
            className="md:hidden ml-4 text-white text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-black/80 backdrop-blur-md`}>
        <div className="flex flex-col space-y-2 px-6 py-4">
          <Link to="/about" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium block py-3 px-4 hover:bg-white/10 rounded-lg font-serif" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          <Link to="/portfolio" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium block py-3 px-4 hover:bg-white/10 rounded-lg font-serif" onClick={() => setIsMobileMenuOpen(false)}>Portfolio</Link>
          <Link to="/services" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium block py-3 px-4 hover:bg-white/10 rounded-lg font-serif" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
          <Link to="/pricing" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium block py-3 px-4 hover:bg-white/10 rounded-lg font-serif" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
          <Link to="/contact" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium block py-3 px-4 hover:bg-white/10 rounded-lg font-serif" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          <Link to="/blog" className="text-gray-200 hover:text-white transition-colors duration-200 font-medium block py-3 px-4 hover:bg-white/10 rounded-lg font-serif" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
          <a href="#" className="px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-100 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center text-sm mt-4 font-serif w-full justify-center" onClick={() => setIsMobileMenuOpen(false)}>
            Book a Call <ArrowUpRight className="inline-block w-3 h-3 ml-1" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 