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
    <nav className={`navbar-blur fixed w-full top-0 left-0 z-50 ${isScrolled ? 'scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-light tracking-tight title-serif gradient-text">DevCraft</span>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/portfolio" className="nav-link">Portfolio</Link>
          <Link to="/services" className="nav-link">Services</Link>
          <Link to="/pricing" className="nav-link">Pricing</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/blog" className="nav-link">Blog</Link>
        </div>
        <div className="flex items-center">
          <a href="#" className="nav-cta hidden md:inline-block">
            Book a Call <ArrowUpRight className="inline-block w-3 h-3 ml-1" />
          </a>
          <button 
            className="md:hidden ml-4 text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
      <div className={`md:hidden ${isMobileMenuOpen ? '' : 'hidden'} bg-white/95 border-t border-gray-100`}>
        <div className="flex flex-col space-y-2 px-6 py-4">
          <Link to="/about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          <Link to="/portfolio" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Portfolio</Link>
          <Link to="/services" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
          <Link to="/pricing" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
          <Link to="/contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          <Link to="/blog" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
          <a href="#" className="nav-cta" onClick={() => setIsMobileMenuOpen(false)}>
            Book a Call <ArrowUpRight className="inline-block w-3 h-3 ml-1" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 