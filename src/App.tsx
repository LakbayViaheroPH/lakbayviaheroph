import React, { useEffect } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Destinations from './components/Destinations';
import QuotesSection from './components/QuotesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Enable smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href') || '');
        if (target) {
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - 80, // offset for navbar
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Update title
    document.title = 'LakbayViahero. - Take the Journey, We’ll Handle the Rest!';
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
    };
  }, []);
  
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <About />
      <Destinations />
      <QuotesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;