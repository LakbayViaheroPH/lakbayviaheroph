import React, { useState, useEffect } from 'react';
import lakbayLogo from '../../images/lakbayviaherologo.jpg'; // Import the logo

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 80, // offset for navbar
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 py-3 ${
        scrolled
          ? 'bg-white shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          {/* Logo Image */}
          <img src={lakbayLogo} alt="LakbayViahero Logo" className="h-10 w-10 rounded-full object-cover mr-3" /> {/* Added rounded-full, object-cover, and explicit width */}
          {/* Location Text */}
          <span className={`font-medium text-sm ${scrolled ? 'text-gray-700' : 'text-white'}`}>
            Pasay City, Metro Manila
          </span>
        </div>
        <div className="hidden md:flex space-x-8">
          {[
            { name: 'Home', id: 'home' }, 
            { name: 'Our Services', id: 'destinations' }, 
            { name: 'About', id: 'about' }, 
            { name: 'Contact', id: 'contact' }
          ].map((item) => (
            <a
              key={item.name}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, `#${item.id}`)}
              className={`font-medium transition-colors ${
                scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>
        <a 
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
        >
          Book Now
        </a>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            className={`p-2 rounded-md ${
              scrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;