import React, { useEffect, useRef } from 'react';
import heroBg from '../../images/hero-bg.jpg';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null); // Ref for the background div

  useEffect(() => {
    let frameId: number;
    const handleScroll = () => {
      if (!sectionRef.current || !bgRef.current) return;

      const scrollPosition = window.scrollY;
      
      // Text fade effect
      const textOpacity = Math.max(1 - scrollPosition / 700, 0);
      const textElement = sectionRef.current.querySelector('.hero-content') as HTMLElement;
      if (textElement) {
        textElement.style.opacity = textOpacity.toString();
      }

      // Background parallax effect - RE-ENABLED
      const sectionRect = sectionRef.current.getBoundingClientRect();
      if (sectionRect.bottom > 0 && sectionRect.top < window.innerHeight) {
        const parallaxFactor = 0.3; 
        bgRef.current.style.transform = `translateY(${scrollPosition * parallaxFactor}px)`;
      }
      // End of parallax effect block
    };

    const onScroll = () => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  const handleHeroButtonClick = (targetId: string) => {
    const target = document.querySelector(targetId);
    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 80, // offset for navbar
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden" // Added overflow-hidden
      // Removed direct background image style from section
    >
      {/* Inner div for parallax background */}
      <div
        ref={bgRef}
        className="absolute top-0 left-0 w-full h-[150%] bg-center bg-cover z-[-1]" // Increased height for parallax range
        style={{ backgroundImage: `url(${heroBg})`, willChange: 'transform' }} // will-change hint
      />

      <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div> {/* Overlay */} 
      
      {/* Ensure hero-content is above the overlay */}
      <div className="hero-content relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
          <span className="block">
            <span style={{ color: '#00004B' }}>Lakbay</span>
            <span style={{ color: '#EFBF04' }}>Viahero</span>
            <span style={{ color: '#00004B' }}>.ph</span>
          </span>
          <span className="block mt-8 text-4xl md:text-5xl lg:text-6xl">𝘛𝘢𝘬𝘦 𝘵𝘩𝘦 𝘑𝘰𝘶𝘳𝘯𝘦𝘺, 𝘞𝘦'𝘭𝘭 𝘏𝘢𝘯𝘥𝘭𝘦 𝘵𝘩𝘦 𝘙𝘦𝘴𝘵!</span>
        </h1>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button 
            onClick={() => handleHeroButtonClick('#destinations')}
            className="px-8 py-3 bg-blue-900 text-white rounded-full font-medium hover:bg-blue-700 transform transition hover:scale-105 duration-300"
          >
            Start Your Journey
          </button>
          <button 
            onClick={() => handleHeroButtonClick('#about')}
            className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-blue-600 transform transition hover:scale-105 duration-300"
          >
            Learn More
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <svg className="w-8 h-8 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;