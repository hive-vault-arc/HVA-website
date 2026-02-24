import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/about', label: 'About' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/services', label: 'Services' },
  ];

  return (
    <header className="fixed top-2 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50">
      <nav 
        className={`transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`flex items-center justify-between h-16 px-6 rounded-full transition-all duration-300 w-full ${
              isScrolled 
                ? 'bg-[#F5F6FA]/90 backdrop-blur-md border border-[#1E272E]/12 shadow-[0_8px_24px_rgba(9,132,227,0.12)]' 
                : 'bg-transparent'
            }`}
          >
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-light tracking-tight text-[#1E272E] font-serif">
                HIVA
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-[#F5F6FA] bg-[#0984E3]'
                      : 'text-[#1E272E]/72 hover:text-[#1E272E] hover:bg-[#0984E3]/10'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link 
                to="/contact"
                aria-label="Book a call"
                className="ml-2 px-4 py-2 bg-[#1E272E] text-[#F5F6FA] rounded-full text-sm font-medium hover:bg-[#0984E3] transition-all duration-300 flex items-center"
              >
                Book a Call
                <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-[#1E272E]/70 hover:text-[#1E272E] hover:bg-[#0984E3]/10 focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="px-4 pt-2 pb-4 space-y-1 bg-[#F5F6FA]/95 backdrop-blur-lg rounded-2xl mx-4 mt-2 border border-[#1E272E]/12 shadow-[0_8px_24px_rgba(9,132,227,0.14)]">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 text-base font-medium rounded-lg ${
                  location.pathname === item.path
                    ? 'text-[#F5F6FA] bg-[#0984E3]'
                    : 'text-[#1E272E]/72 hover:text-[#1E272E] hover:bg-[#0984E3]/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                to="/contact"
                aria-label="Book a call"
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-full text-base font-medium text-[#F5F6FA] bg-[#1E272E] hover:bg-[#0984E3] transition-colors duration-200"
              >
                Book a Call
                <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar; 
