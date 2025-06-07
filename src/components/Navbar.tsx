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
    <nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-light tracking-tight text-gray-900 font-serif">DevCraft</span>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/about" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium font-serif">About</Link>
          <Link to="/portfolio" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium font-serif">Portfolio</Link>
          <Link to="/services" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium font-serif">Services</Link>
          <Link to="/pricing" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium font-serif">Pricing</Link>
          <Link to="/contact" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium font-serif">Contact</Link>
          <Link to="/blog" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium font-serif">Blog</Link>
        </div>
        <div className="flex items-center">
          <a href="#" className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center text-sm font-serif">
            Book a Call <ArrowUpRight className="inline-block w-3 h-3 ml-1" />
          </a>
          <button 
            className="md:hidden ml-4 text-gray-700 text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-white`}>
        <div className="flex flex-col space-y-2 px-6 py-4">
          <Link to="/about" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium block py-2 font-serif" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          <Link to="/portfolio" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium block py-2 font-serif" onClick={() => setIsMobileMenuOpen(false)}>Portfolio</Link>
          <Link to="/services" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium block py-2 font-serif" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
          <Link to="/pricing" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium block py-2 font-serif" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
          <Link to="/contact" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium block py-2 font-serif" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          <Link to="/blog" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium block py-2 font-serif" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
          <a href="#" className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center text-sm mt-4 font-serif" onClick={() => setIsMobileMenuOpen(false)}>
            Book a Call <ArrowUpRight className="inline-block w-3 h-3 ml-1" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 