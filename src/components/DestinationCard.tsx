import React, { useState } from 'react';
import { Destination } from '../types';

interface DestinationCardProps {
  destination: Destination;
  onCardClick: (destination: Destination) => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onCardClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleReadMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCardClick(destination);
  };

  return (
    <div 
      className="relative h-96 w-full cursor-pointer perspective"
      onClick={handleFlip}
    >
      <div 
        className={`relative preserve-3d transition-all duration-500 w-full h-full ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{ willChange: 'transform' }}
      >
        {/* Front of card */}
        <div 
          className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-lg group"
        >
          <img 
            src={destination.image} 
            alt={destination.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy" 
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{destination.name}</h3>
              <p className="text-sm text-white">{destination.shortDescription}</p>
            </div>
          </div>
        </div>
        
        {/* Back of card */}
        <div 
          className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-xl p-6 shadow-lg flex flex-col justify-between"
        >
          <div>
            <h3 className="text-2xl font-semibold text-black uppercase tracking-wide mb-2">{destination.name}</h3>
            <hr className="w-12 border-t-2 border-blue-900 mb-4" />
            <p className="text-black italic leading-relaxed mb-4">{destination.fullDescription}</p>
          </div>
          
          <button
            onClick={handleReadMore}
            className="self-start mt-4 px-6 py-2 bg-blue-900 text-white rounded-full font-medium hover:bg-blue-700 transition-colors duration-300"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;