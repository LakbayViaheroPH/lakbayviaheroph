import React, { useEffect, useState, useRef } from 'react';
import { quotes } from '../data/quotes';

const QuotesSection: React.FC = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 100; // milliseconds per character when typing
  const deletingSpeed = 50; // milliseconds per character when deleting
  const delayAfterTyping = 2000; // pause after fully typed
  const delayAfterDeleting = 500; // pause after fully deleted
  
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentQuote = quotes[currentQuoteIndex].text;
      
      if (isTyping) {
        if (displayText.length < currentQuote.length) {
          // Still typing
          setDisplayText(currentQuote.substring(0, displayText.length + 1));
        } else {
          // Finished typing, pause before deleting
          setIsTyping(false);
          setTimeout(() => {
            setIsDeleting(true);
          }, delayAfterTyping);
        }
      } else if (isDeleting) {
        if (displayText.length > 0) {
          // Still deleting
          setDisplayText(displayText.substring(0, displayText.length - 1));
        } else {
          // Finished deleting, move to next quote and start typing again
          setIsDeleting(false);
          setTimeout(() => {
            setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
            setIsTyping(true);
          }, delayAfterDeleting);
        }
      }
    }, isTyping ? typingSpeed : isDeleting ? deletingSpeed : 0);
    
    return () => clearTimeout(timeout);
  }, [currentQuoteIndex, displayText, isTyping, isDeleting]);
  
  return (
    <section
      ref={sectionRef}
      className="relative h-[500px] flex items-center justify-center bg-scroll bg-center bg-cover opacity-0 transition-opacity duration-1000"
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">
          <span className="block">Discover</span>
        </h2>
        
        <div className="h-24 flex items-center justify-center">
          <p className="text-2xl md:text-3xl text-yellow-500 font-light">
            <span className="inline-block min-h-[1.5em]">{displayText}</span>
            <span className={`inline-block w-0.5 h-8 bg-white ml-1 align-middle ${isTyping || isDeleting ? 'animate-blink' : 'opacity-0'}`}></span>
          </p>
        </div>
        
        <button className="mt-8 px-8 py-3 bg-white text-blue-900 rounded-full font-medium hover:bg-blue-50 transform transition hover:scale-105 duration-300">
          Start Your Journey
        </button>
      </div>
    </section>
  );
};

export default QuotesSection;