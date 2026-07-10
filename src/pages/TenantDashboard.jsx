import React, { useState } from 'react';
import { FiMapPin, FiCheck, FiX } from 'react-icons/fi';
import { MdBathtub } from 'react-icons/md';
import { BiBed } from 'react-icons/bi';
import { FaRuler } from 'react-icons/fa';
import VisitRequestModal from '../components/VisitRequestModal';

const TenantDashboard = () => {
  const [showVisitModal, setShowVisitModal] = useState(false);

  // Sample property data
  const propertyData = {
    name: 'Skyline Luxury Apartment',
    location: 'DHA Phase 6, Karachi',
    image: 'https://images.unsplash.com/photo-1570129477492-45ec003cf16f?w=800&h=600&fit=crop',
    price: 'PKR 120,000',
    bedrooms: 3,
    bathrooms: 2,
    size: '1800 sq ft',
    status: 'Active',
    occupancy: 'Available',
    parking: 'Yes',
    furnishing: 'Fully Furnished',
    minYear: 'Min 1 Year',
    verified: true,
    features: ['24/7 Security', 'Rooftop Access', 'Modern Kitchen', 'Air Conditioning'],
    description: 'Modern luxury apartment located in a secure residential area with nearby schools, shopping centers, and easy access to main roads. Features high-end finishes, floor-to-ceiling windows with panoramic city views, and dedicated maintenance team available 24/7.'
  };

  return (
    <div className="min-h-screen bg-[#F8F3EA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-[#1a2332]">Property Details</h1>
          <p className="text-gray-600 mt-2">Complete overview of your registered property information.</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Large Image Section */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg h-96 sm:h-[450px]">
              <img 
                src={propertyData.image}
                alt={propertyData.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full">
                <p className="text-xs font-bold text-[#1a2332]">✓ Verified Property</p>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[1, 2, 3, 4].map((idx) => (
                <div
                  key={idx}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0 border-2 border-gray-200 cursor-pointer hover:border-[#b8860b] transition"
                >
                  <img 
                    src={propertyData.image}
                    alt={`View ${idx}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0 border-2 border-dashed border-gray-300">
                <span className="text-gray-500 font-bold">+12 More</span>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-[#1a2332] mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {propertyData.description}
              </p>
            </div>

            {/* Features List */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#1a2332] mb-4">Key Features</h3>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                {propertyData.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#b8860b]/10 flex items-center justify-center">
                      <FiCheck className="text-[#b8860b]" size={16} />
                    </div>
                    <span className="text-gray-700 font-medium text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visit Request Section */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-2xl p-6 sm:p-8 border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-blue-900 mb-2">Schedule Your Visit</h3>
              <p className="text-blue-700 text-sm mb-4">
                Ready to view this property? Click the button below to request a property visit with the owner.
              </p>
              <button
                onClick={() => setShowVisitModal(true)}
                className="px-6 py-3 bg-[#b8860b] text-white font-bold rounded-lg hover:bg-[#9a7109] transition-all shadow-md hover:shadow-lg"
              >
                Schedule Visit Request →
              </button>
            </div>

          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Property Info Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6">
              
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[#1a2332]">{propertyData.name}</h2>
                <div className="flex items-center gap-1 text-gray-600 mt-1">
                  <FiMapPin size={16} />
                  <span className="text-sm">{propertyData.location}</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-gray-100">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Monthly Rent</p>
                <p className="text-3xl font-bold text-[#b8860b] mt-1">{propertyData.price}</p>
                <p className="text-xs text-gray-400 mt-1">Per Month</p>
              </div>

              {/* Basic Info Grid */}
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BiBed className="text-[#b8860b]" size={18} />
                    <span className="text-gray-600 text-sm">Bedrooms</span>
                  </div>
                  <span className="font-bold text-[#1a2332]">{propertyData.bedrooms}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MdBathtub className="text-[#b8860b]" size={18} />
                    <span className="text-gray-600 text-sm">Bathrooms</span>
                  </div>
                  <span className="font-bold text-[#1a2332]">{propertyData.bathrooms}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaRuler className="text-[#b8860b]" size={16} />
                    <span className="text-gray-600 text-sm">Size</span>
                  </div>
                  <span className="font-bold text-[#1a2332]">{propertyData.size}</span>
                </div>
              </div>

              {/* Status Badges */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm font-medium">Property Status</span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                    ✓ {propertyData.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm font-medium">Occupancy</span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                    {propertyData.occupancy}
                  </span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Parking</span>
                  <span className="font-bold text-[#1a2332]">{propertyData.parking}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Furnishing</span>
                  <span className="font-bold text-[#1a2332]">{propertyData.furnishing}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Lease Duration</span>
                  <span className="font-bold text-[#1a2332]">{propertyData.minYear}</span>
                </div>
              </div>

              {/* Primary CTA Button */}
              <button
                onClick={() => setShowVisitModal(true)}
                className="w-full py-3 bg-[#b8860b] text-white font-bold rounded-lg hover:bg-[#9a7109] transition-all shadow-md hover:shadow-lg mb-3"
              >
                Visit Request
              </button>

              {/* Secondary Button */}
              <button className="w-full py-2 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all">
                Contact Owner
              </button>

            </div>

            {/* Verification Badge */}
            <div className="bg-gradient-to-br from-[#0A2240] to-[#1a2332] text-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#b8860b]/20 flex items-center justify-center border border-[#b8860b]">
                  <FiCheck className="text-[#b8860b]" size={20} />
                </div>
                <h4 className="font-bold">Verified Listing</h4>
              </div>
              <p className="text-xs leading-relaxed text-gray-300">
                This property has been verified and authenticated by our Paband team for authenticity and quality standards.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Visit Request Modal */}
      <VisitRequestModal 
        isOpen={showVisitModal} 
        onClose={() => setShowVisitModal(false)}
        propertyData={{
          name: propertyData.name,
          location: propertyData.location,
          image: propertyData.image
        }}
      />
    </div>
  );
};

export default TenantDashboard;
