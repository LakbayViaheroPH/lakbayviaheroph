import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Destination } from '../types';
import { createPortal } from 'react-dom';

interface DestinationModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
}

const DestinationModal: React.FC<DestinationModalProps> = ({ 
  destination, 
  isOpen, 
  onClose 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('mousedown', handleClickOutside);
      // Restore scrolling
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !destination) return null;

  const handleBook = () => {
    onClose();
    // Notify contact form of selected service
    window.dispatchEvent(new CustomEvent('selectService', { detail: destination!.name }));
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div 
        ref={modalRef}
        className={`bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto animate-modalFadeIn`}
      >
        <div className="relative">
          <img 
            src={destination.image} 
            alt={destination.name} 
            className="w-full h-64 md:h-80 object-cover rounded-t-xl"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors duration-300"
          >
            <X size={24} className="text-white" />
          </button>
        </div>
        
        <div className="p-6 md:p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{destination.name}</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">{destination.fullDescription}</p>
          
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <span className="text-gray-500">Experience the magic of the Philippines</span>
            <button
              onClick={handleBook}
              className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors duration-300"
            >
              Book This Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default DestinationModal;