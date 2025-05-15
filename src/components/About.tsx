import React, { useEffect, useRef } from 'react';
import { MapPin, Compass, Globe, Award } from 'lucide-react';
import aboutBg from '../../images/wholebg3.jpg';

const About: React.FC = () => {
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
  
  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 px-4 bg-scroll bg-center bg-cover opacity-0 transition-opacity duration-1000"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${aboutBg})`
      }}
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#00004B' }}>About Us</h2>
          <div className="w-20 h-1 mx-auto mb-8" style={{ backgroundColor: '#EFBF04' }}></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            All great journeys begin with a dream. Lakbay Viahero Co., doing business under the name and style of LakbayViahero.ph, was created to eliminate the stress and confusion that often comes with travel planning.
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
            We recognized a gap in the market: too many tabs open, unclear paperwork, and unreliable service. Our solution? A tech-enabled, human-centered travel platform that simplifies every step. We don't just book trips—we deliver seamless experiences built on trust, technology, and a personal touch.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <MapPin size={36} className="text-blue-900" />,
              title: 'Unique Destinations',
              description: 'We take you to breathtaking locations off the beaten path.'
            },
            {
              icon: <Compass size={36} className="text-blue-900" />,
              title: 'Tailored Experiences',
              description: 'Every journey is customized to your preferences and interests.'
            },
            {
              icon: <Globe size={36} className="text-blue-900" />,
              title: 'Local Expertise',
              description: 'Our guides provide authentic cultural insights and connections.'
            },
            {
              icon: <Award size={36} className="text-blue-900" />,
              title: 'Premium Service',
              description: 'Expect nothing but the highest quality in every aspect of your trip.'
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center transform hover:-translate-y-1"
            >
              <div className="mb-4 inline-block p-3 bg-blue-100 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#00004B' }}>{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-blue-900 text-white rounded-full font-medium hover:bg-blue-700 transform transition hover:scale-105 duration-300">
            Learn More About Us
          </button>
        </div>
      </div>
      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-white pointer-events-none" />
    </section>
  );
};

export default About;