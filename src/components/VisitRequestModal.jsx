import React from 'react';
import { FiX, FiCheck, FiPhone } from 'react-icons/fi';

const VisitRequestModal = ({ isOpen, onClose, propertyData }) => {
  if (!isOpen) return null;

  const defaultProperty = {
    name: 'Skyline Luxury Apartment',
    location: 'DHA Phase 6, Karachi',
    image: 'https://images.unsplash.com/photo-1570129477492-45ec003cf16f?w=400&h=300&fit=crop',
  };

  const property = propertyData || defaultProperty;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto transform transition-all duration-300 scale-100 opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Close Button */}
          <div className="flex justify-end p-4 sm:p-6 border-b border-gray-100">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="Close modal"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Main Content */}
          <div className="px-4 sm:px-6 pb-6 sm:pb-8">
            {/* Success Icon - Centered */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#b8860b]/20 to-[#9a7109]/20 rounded-full blur-xl animate-pulse" />
                <div className="relative w-20 h-20 bg-gradient-to-br from-[#b8860b] to-[#9a7109] rounded-full flex items-center justify-center shadow-lg">
                  <FiCheck size={40} className="text-white stroke-[3]" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#1a2332] mb-3">
              Visit Request<br className="sm:hidden" /> Submitted
            </h2>

            {/* Description */}
            <p className="text-center text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">
              Your property visit request has been sent and is now being processed. The property owner will review your request and confirm the visit schedule.
            </p>

            {/* Property Card - Dark Background */}
            <div className="bg-gradient-to-br from-[#1a2332] to-[#242f42] rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                {/* Property Image */}
                <div className="flex-shrink-0">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover shadow-md"
                  />
                </div>

                {/* Property Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-sm sm:text-base truncate">
                    {property.name}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm truncate">
                    📍 {property.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Info Box - Blue Background */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6 flex gap-3">
              <div className="flex-shrink-0 pt-0.5">
                <FiPhone className="text-blue-600" size={18} />
              </div>
              <div className="flex-1">
                <p className="text-blue-900 font-semibold text-xs sm:text-sm mb-1">
                  What's Next?
                </p>
                <p className="text-blue-700 text-xs sm:text-sm leading-relaxed">
                  The property owner will contact you within 24 hours to confirm your property visit schedule.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Primary Button */}
              <button
                onClick={onClose}
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-[#b8860b] to-[#9a7109] text-white font-bold rounded-lg hover:from-[#9a7109] hover:to-[#7a5607] transition-all duration-200 text-sm sm:text-base shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Back to Home →
              </button>

              {/* Secondary Button */}
              <button
                onClick={onClose}
                className="w-full py-2 sm:py-3 text-gray-700 bg-gray-50 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisitRequestModal;
