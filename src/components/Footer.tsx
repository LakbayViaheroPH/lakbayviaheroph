import React from 'react';
import { MapPin, Mail, Phone, Facebook, Instagram, Linkedin } from 'lucide-react';
import lakbayLogo from '../../images/lakbayviaherologo.jpg';

const Footer: React.FC = () => {
  return (
    <footer className="text-white pt-16 pb-8" style={{ backgroundColor: '#00004B' }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img src={lakbayLogo} alt="LakbayViahero Logo" className="h-12 w-12 rounded-full object-cover mr-3" />
              <span className="font-bold text-xl text-yellow-500">LakbayViahero.ph</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted travel hero in the Philippines and beyond.
            </p>
          </div>
          
          {/* NEW: Core Values / Points */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2 text-yellow-500">Why Choose Us?</h3>
            <ul className="space-y-3">
              <li>
                <h4 className="font-semibold text-gray-200">Personalization</h4>
                <p className="text-gray-400 text-sm">It's all about YOU.</p>
              </li>
              <li>
                <h4 className="font-semibold text-gray-200">Technology</h4>
                <p className="text-gray-400 text-sm">Fast, efficient, and user-friendly.</p>
              </li>
              <li>
                <h4 className="font-semibold text-gray-200">Human Touch</h4>
                <p className="text-gray-400 text-sm">We go beyond transactions.</p>
              </li>
              <li>
                <h4 className="font-semibold text-gray-200">Peace of Mind</h4>
                <p className="text-gray-400 text-sm">We're your travel partner, more than a place to book trips.</p>
              </li>
            </ul>
          </div>
          
          {/* Contact Details Column - Modify Socials */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2 text-yellow-500">Get In Touch</h3>
            <div className="space-y-4">
              {/* Icon-only social links */}
              <div className="flex space-x-4 mb-4">
                <a href="https://www.tiktok.com/@lakbayviahero" title="TikTok" className="text-yellow-500 hover:text-yellow-400 transition-colors">
                  <svg fill="currentColor" width="18px" height="18px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve">
                    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/lakbayviahero.ph" title="Facebook" className="text-yellow-500 hover:text-yellow-400 transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="https://www.instagram.com/lakbayviahero.ph" title="Instagram" className="text-yellow-500 hover:text-yellow-400 transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="https://www.linkedin.com/company/lakbayviahero-ph" title="LinkedIn" className="text-yellow-500 hover:text-yellow-400 transition-colors">
                  <Linkedin size={18} />
                </a>
              </div>
              <div className="pt-2">
                <h4 className="font-semibold text-gray-200 mb-2">Bookings & Inquiries:</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Mail size={18} className="text-blue-900" />
                    <span className="text-gray-400 text-sm">info@lakbayviaheroph.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone size={18} className="text-blue-900" />
                    <span className="text-gray-400 text-sm">+63 915-800-9384 / +63 918-908-3125</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} LakbayViahero.ph. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;