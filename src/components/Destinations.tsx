import React, { useState, useEffect, useRef } from 'react';
import DestinationCard from './DestinationCard';
import DestinationModal from './DestinationModal';
import { destinations } from '../data/destinations';
import { Destination } from '../types';
import servicesBg from '../../images/wholebg2.jpg';

const Destinations: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
          }
        });
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

  const handleCardClick = (destination: Destination) => {
    setSelectedDestination(destination);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section
      id="destinations"
      ref={sectionRef}
      className="relative py-20 px-4 bg-scroll bg-center bg-cover opacity-0 transition-opacity duration-1000"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.92)), url(${servicesBg})`
      }}
    >
      {/* Top fade from previous section */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-t from-transparent to-white pointer-events-none" />
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-4">Services Offered</h2>
          <div className="w-20 h-1 bg-blue-900 mx-auto mb-8"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div 
              key={destination.id} 
              className="transform transition duration-500 hover:-translate-y-2"
            >
              <DestinationCard 
                destination={destination} 
                onCardClick={handleCardClick} 
              />
            </div>
          ))}
        </div>
      </div>
      
      <DestinationModal 
        destination={selectedDestination} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-white pointer-events-none" />
    </section>
  );
};

export default Destinations;