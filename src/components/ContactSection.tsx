import React, { useRef, useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import lakbayLogo from '../../images/lakbayviaherologo.jpg';
import contactBg from '../../images/wholebg.jpg';
import { sendContactFormEmailViaProxy } from '../services/emailProxyService';

const serviceOptions = [
  { id: 'flights', name: 'FLIGHTS' },
  { id: 'hotels', name: 'HOTELS' },
  { id: 'holiday_packages', name: 'HOLIDAY PACKAGES' },
  { id: 'ferry', name: 'FERRY TICKETS' },
  { id: 'bus', name: 'BUS TICKETS' },
  { id: 'ground_transportation', name: 'GROUND TRANSPORTATION' },
  { id: 'visa_assistance', name: 'VISA ASSISTANCE' },
  { id: 'travel_insurance', name: 'TRAVEL INSURANCE' },
];

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    subject: '',
    service: '',
    message: '',
    referral: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [submitMessage, setSubmitMessage] = useState('');
  
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
    const handleSelectService = (e: Event) => {
      const serviceNameFromModal = (e as CustomEvent<string>).detail;
      const matchedOption = serviceOptions.find(
        opt => opt.name.toLowerCase() === serviceNameFromModal.toLowerCase()
      );
      if (matchedOption) {
        setFormData(prev => ({ ...prev, service: matchedOption.name }));
      } 
    };
    window.addEventListener('selectService', handleSelectService as EventListener);
    return () => window.removeEventListener('selectService', handleSelectService as EventListener);
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    try {
      console.log("Form submission started");
      
      let result;
      
      // Check if we're in development environment
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Use the proxy service for development
        console.log("Using proxy service for development");
        const proxyResult = await sendContactFormEmailViaProxy(formData);
        result = proxyResult;
      } else {
        // Use the Vercel serverless function for production
        console.log("Using Vercel serverless function for production");
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        result = await response.json();
      }
      
      console.log("Form submission result:", result);
      
      // Set the status based on the result
      setSubmitStatus(result.success ? 'success' : 'error');
      setSubmitMessage(result.message);
      
      // If successful, reset the form
      if (result.success) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          subject: '',
          service: '',
          message: '',
          referral: ''
        });
      }
    } catch (error) {
      // Handle any potential errors
      console.error("Form submission error:", error);
      setSubmitStatus('error');
      setSubmitMessage('An unexpected error occurred. Please try again later.');
    }
    
    setIsSubmitting(false);
  };
  
  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 px-4 bg-scroll bg-center bg-cover opacity-0 transition-opacity duration-1000"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url(${contactBg})`
      }}
    >
      {/* Top fade from previous section */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-t from-transparent to-white pointer-events-none" />
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#00004B' }}>Contact Us</h2>
          <div className="w-20 h-1 mx-auto mb-8" style={{ backgroundColor: '#EFBF04' }}></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ready to start your adventure? Get in touch with our team and we'll help you plan the perfect trip.
          </p>
        </div>
        
        {/* Centered container for the form panel */}
        <div className="max-w-2xl mx-auto"> {/* Adjusted max-width for centered single element */} 
          <div className="bg-white rounded-xl p-8 shadow-lg"> 
            <h3 className="text-2xl font-bold text-yellow-500 mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Email */} 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
                </div>
              </div>
              {/* Phone & Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
                </div>
              </div>
              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
              </div>
              {/* Service Dropdown */}
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                <select id="service" name="service" value={formData.service} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                  <option value="">Select a service</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt.id} value={opt.name}>{opt.name}</option>
                  ))}
                </select>
              </div>
              {/* Referral */}
              <div>
                <label htmlFor="referral" className="block text-sm font-medium text-gray-700 mb-1">Referral (Optional)</label>
                <input type="text" id="referral" name="referral" value={formData.referral} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
              </div>
              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" disabled={isSubmitting}></textarea>
              </div>
              {/* Submit Button */}
              <button 
                type="submit" 
                className={`flex items-center justify-center w-full px-6 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-700 transform transition hover:scale-105 duration-300 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitting}
              >
                <Send size={18} className="mr-2" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitStatus && (
                <div className={`mt-4 text-center p-3 rounded-lg ${
                  submitStatus === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      {/* Bottom fade to next section (if any) - adjust to-color as needed */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-gray-100 pointer-events-none" />
    </section>
  );
};

export default ContactSection;