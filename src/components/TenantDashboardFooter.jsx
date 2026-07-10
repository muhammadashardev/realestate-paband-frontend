import React from 'react';
import { FiCheck, FiPhone } from 'react-icons/fi';

const TenantDashboardFooter = ({ onViewVisitClick }) => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Visit Request Success Section */}
        <div 
          onClick={onViewVisitClick}
          className="cursor-pointer group bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 sm:p-8 mb-8 border border-gray-200 hover:border-[#b8860b] hover:shadow-lg transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            {/* Left: Success Icon & Text */}
            <div className="flex items-start gap-4 flex-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#b8860b] to-[#9a7109] rounded-full flex items-center justify-center flex-shrink-0 group-hover:shadow-lg transition-shadow">
                <FiCheck size={32} className="text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-[#1a2332] mb-1 group-hover:text-[#b8860b] transition">
                  Visit Request Submitted
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-2">
                  Your property visit request has been sent successfully
                </p>
                <div className="flex items-center gap-2 text-blue-600 text-xs sm:text-sm font-medium">
                  <FiPhone size={14} />
                  <span>Owner will contact you within 24 hours</span>
                </div>
              </div>
            </div>

            {/* Right: CTA Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewVisitClick();
              }}
              className="w-full sm:w-auto px-6 py-2 sm:py-3 bg-[#b8860b] text-white rounded-lg font-semibold hover:bg-[#9a7109] transition-colors duration-200 text-sm sm:text-base flex-shrink-0"
            >
              View Details →
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8 border-t border-gray-200">
          <div>
            <h4 className="font-semibold text-[#1a2332] mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-[#b8860b] transition text-sm">My Properties</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#b8860b] transition text-sm">Visit Requests</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#b8860b] transition text-sm">Messages</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#1a2332] mb-4 text-sm">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-[#b8860b] transition text-sm">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#b8860b] transition text-sm">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#b8860b] transition text-sm">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#1a2332] mb-4 text-sm">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-[#b8860b] transition text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#b8860b] transition text-sm">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#b8860b] transition text-sm">Disclaimer</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#1a2332] mb-4 text-sm">Follow Us</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-[#b8860b] transition text-sm">Facebook</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#b8860b] transition text-sm">Twitter</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#b8860b] transition text-sm">Instagram</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-gray-600 text-sm">
            © 2024 Paband. All rights reserved. | Powered by Paband Technologies
          </p>
        </div>
      </div>
    </footer>
  );
};

export default TenantDashboardFooter;
