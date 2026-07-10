
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MdChair, MdEdit, MdDelete, MdArrowBack, MdOutlineSecurity, MdOutlinePower
} from 'react-icons/md';
import { FaBed, FaBath, FaWarehouse, FaMapMarkerAlt, FaRuler, FaRegCalendarAlt, FaCheckCircle, FaTrashAlt } from 'react-icons/fa';
import { getPropertyById, saveProperty, deleteProperty } from '../../utils/propertyService';
import { useTopBar } from '../../context/TopBarContext';

const OwnerPropertyDetail = () => {
  const { setTopBar } = useTopBar();
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    // Validate that ID exists before fetching
    if (!id) {
      console.error('No property ID provided');
      return;
    }

    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id);
        if (data) {
          setProperty(data);
          setTopBar({ title: data.title, subtitle: data.location });
        }
      } catch (error) {
        console.error('Failed to fetch property:', error);
      }
    };
    fetchProperty();
  }, [id, setTopBar]);

  if (!property) {
    return (
      <div className="p-8 text-center bg-[#F8F9FC] min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 font-semibold">Property not found.</p>
        <button
          onClick={() => navigate('/owner/properties')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#B68B39] text-white text-sm font-bold shadow-md hover:bg-[#a0762d] transition-all"
        >
          Back to Properties
        </button>
      </div>
    );
  }

  const propertyId = property?.id || property?._id || property?.propertyId;
  const propertyType = property?.propertyType || property?.type || 'N/A';
  const rentAmount = property?.price ?? property?.rent ?? 0;
  const bedroomCount = property?.bedrooms ?? property?.beds ?? 'N/A';
  const bathroomCount = property?.bathrooms ?? property?.baths ?? 'N/A';
  const sizeAmount = property?.size ?? property?.sqft ?? 'N/A';
  const parkingAvailable = property?.parking ?? false;
  const furnishing = property?.furnishing ?? 'Unfurnished';
  const tenureLabel = property?.tenure || property?.rentalPeriod || 'Min 1 Year';

  // Update status in local state and localStorage
  const handleStatusChange = (newStatus) => {
    const updated = { ...property, status: newStatus };
    setProperty(updated);
    saveProperty(updated);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${property.title}"?`)) {
      deleteProperty(propertyId);
      navigate('/owner/properties');
    }
  };

  // Helper to format currency
  const formatCurrency = (amount) => {
    return `PKR ${parseInt(amount || 0).toLocaleString()}`;
  };

  // Standard thumbnails setup
  const galleryImages = property?.gallery?.length > 0
    ? property.gallery
    : property?.images?.length > 0
      ? property.images
      : [property?.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&auto=format&fit=crop'];

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1600px] mx-auto bg-[#F8F9FC] min-h-screen">

      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/owner/properties')}
          className="flex items-center gap-2 text-gray-500 hover:text-[#B68B39] text-sm font-bold transition-all"
        >
          <MdArrowBack size={18} className="translate-y-[0.5px]" /> Back to Properties
        </button>
      </div>

      {/* Main title and subtitle */}
      <div>
        <h2 className="text-[28px] font-extrabold text-[#112338] leading-tight tracking-tight">
          Property Details
        </h2>
        <p className="text-gray-500 text-[13px] md:text-[14.5px] mt-1 font-medium">
          Complete overview of your registered property information.
        </p>
      </div>

      {/* Two Column Layout matching Image 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left Column (Images, Description, Amenities) */}
        <div className="lg:col-span-8 space-y-6">

          {/* Main Large Image Box */}
          <div className="relative h-[480px] bg-white rounded-3xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.015)] border border-gray-100/60">
            <img
              src={galleryImages[activeImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            {/* Verified badge */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-[2px] shadow-sm border border-gray-100">
              <FaCheckCircle className="text-[#10B981] text-xs" />
              <span className="text-[10.5px] font-bold text-[#112338] tracking-wide">Verified Property</span>
            </div>
          </div>

          {/* Thumbnail Gallery Row */}
          {galleryImages.length > 1 && (
            <div className="grid grid-cols-4 md:grid-cols-5 gap-3.5">
              {galleryImages.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative h-[86px] rounded-xl overflow-hidden cursor-pointer border-2 transition-all hover:scale-[1.03]
                    ${activeImageIndex === index ? 'border-[#B68B39]' : 'border-transparent'}`}
                >
                  <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                  {/* +12 More overlay on the last thumbnail if there are many */}
                  {index === 3 && galleryImages.length > 4 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-[12px] font-extrabold select-none">
                      +{galleryImages.length - 4} More
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Description Card */}
          <div className="bg-white rounded-3xl p-7 shadow-[0_4px_25px_rgba(0,0,0,0.015)] border border-gray-100/60 space-y-4">
            <h3 className="text-[17px] font-extrabold text-[#112338] border-b border-gray-100/80 pb-3">Description</h3>
            <p className="text-[13.5px] text-gray-500 font-medium leading-relaxed">
              {property.description}
            </p>

            {/* Custom security / backup specs card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3.5 p-4 rounded-xl border border-gray-50 bg-[#F9FAFB]/50">
                <div className="w-10 h-10 rounded-lg bg-[#B68B39]/10 flex items-center justify-center text-[#B68B39]">
                  <MdOutlineSecurity size={20} />
                </div>
                <div>
                  <p className="text-gray-400 text-[10.5px] font-bold uppercase tracking-wider">Security</p>
                  <p className="text-[#112338] text-[13.5px] font-bold mt-0.5">{property.security || '24/7 CCTV'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-xl border border-gray-50 bg-[#F9FAFB]/50">
                <div className="w-10 h-10 rounded-lg bg-[#B68B39]/10 flex items-center justify-center text-[#B68B39]">
                  <MdOutlinePower size={20} />
                </div>
                <div>
                  <p className="text-gray-400 text-[10.5px] font-bold uppercase tracking-wider">Power Backup</p>
                  <p className="text-[#112338] text-[13.5px] font-bold mt-0.5">{property.powerBackup || 'Full Backup'}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (Specifications, Property Status, Action Buttons) */}
        <div className="lg:col-span-4 space-y-6">

          {/* Main Specifications Card */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.015)] border border-gray-100/60 space-y-5">
            <div>
              <span className="text-[9.5px] font-extrabold px-2 py-0.5 rounded bg-[#B68B39]/15 text-[#B68B39] uppercase tracking-wider">
                {propertyType}
              </span>
              <h3 className="text-xl font-extrabold text-[#112338] mt-2 leading-snug">{property.title}</h3>
              <p className="text-gray-400 text-[12.5px] font-medium flex items-center gap-1 mt-1">
                <FaMapMarkerAlt className="text-gray-300 text-xs shrink-0" /> {property.location}
              </p>
            </div>

            <div className="text-[26px] font-extrabold text-[#B68B39] tracking-tight">
              {formatCurrency(rentAmount)} <span className="text-gray-400 text-[13.5px] font-semibold">/month</span>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-4 border-t border-b border-gray-100 py-5">
              <div className="flex items-center gap-2.5">
                <FaBed className="text-gray-300 text-sm shrink-0" />
                <span className="text-[13px] text-gray-700 font-semibold">{bedroomCount} Bedrooms</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FaBath className="text-gray-300 text-sm shrink-0" />
                <span className="text-[13px] text-gray-700 font-semibold">{bathroomCount} Bathrooms</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FaRuler className="text-gray-300 text-sm shrink-0" />
                <span className="text-[13px] text-gray-700 font-semibold">{sizeAmount} Sq Ft</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FaWarehouse className="text-gray-300 text-sm shrink-0" />
                <span className="text-[13px] text-gray-700 font-semibold">{parkingAvailable ? 'Available' : 'None'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MdChair className="text-gray-300 text-base shrink-0" />
                <span className="text-[13px] text-gray-700 font-semibold">{furnishing}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FaRegCalendarAlt className="text-gray-300 text-sm shrink-0" />
                <span className="text-[13px] text-gray-700 font-semibold">{tenureLabel}</span>
              </div>
            </div>

            {/* Property Status Radio Selector */}
            <div className="space-y-2.5">
              <p className="text-[11.5px] text-gray-400 font-bold uppercase tracking-wider">Property Status</p>

              <div className="grid grid-cols-2 gap-2">
                {['Active', 'Occupied', 'Pending Approval', 'Inactive'].map((status) => {
                  const isSelected = property.status === status;
                  let colorClass = '';

                  if (isSelected) {
                    if (status === 'Active') colorClass = 'bg-[#EBFDF5] border-[#10B981] text-[#10B981]';
                    else if (status === 'Occupied') colorClass = 'bg-[#EBF5FF] border-[#3B82F6] text-[#3B82F6]';
                    else if (status === 'Pending Approval') colorClass = 'bg-[#FFF3EB] border-[#F97316] text-[#F97316]';
                    else colorClass = 'bg-gray-100 border-gray-400 text-gray-700';
                  } else {
                    colorClass = 'bg-gray-50/50 border-gray-100 hover:bg-gray-50 text-gray-400';
                  }

                  return (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className={`flex items-center gap-2 px-3 py-2 border rounded-xl text-[12px] font-bold transition-all ${colorClass}`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0
                        ${status === 'Active' ? 'bg-[#10B981]' : ''}
                        ${status === 'Occupied' ? 'bg-[#3B82F6]' : ''}
                        ${status === 'Pending Approval' ? 'bg-[#F97316]' : ''}
                        ${status === 'Inactive' ? 'bg-gray-400' : ''}
                      `} />
                      {status}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 space-y-2">
              <button
                onClick={() => navigate(`/owner/properties/edit/${propertyId}`)}
                className="w-full py-3.5 rounded-xl bg-[#0C1E36] hover:bg-[#142A45] text-white text-[13.5px] font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <MdEdit size={16} /> Edit Property
              </button>

              <button
                onClick={handleDelete}
                className="w-full py-3 rounded-xl border border-dashed border-[#EF4444]/20 hover:border-[#EF4444]/40 text-[#EF4444] text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all bg-[#FFF5F5]/30 hover:bg-[#FFF5F5]"
              >
                <FaTrashAlt size={12} /> Delete Property
              </button>
            </div>

          </div>

          {/* Verified Listing Badge Card */}
          <div className="bg-[#0A2240] text-white rounded-3xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] space-y-3.5 relative overflow-hidden">
            {/* Visual gradient orb */}
            <div className="absolute right-0 bottom-0 w-32 h-32 rounded-full bg-[#B68B39]/10 blur-xl pointer-events-none" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B68B39]/15 flex items-center justify-center text-[#B68B39] border border-[#B68B39]/30 shrink-0">
                <FaCheckCircle size={20} />
              </div>
              <h4 className="text-[15px] font-extrabold">Verified Listing</h4>
            </div>

            <p className="text-[12.5px] text-gray-300 leading-relaxed font-medium">
              This property has been manually inspected and verified by our field agents for authenticity and quality standards.
            </p>

            <a href="#" className="inline-block text-[#B68B39] hover:underline text-[12px] font-bold">
              Learn more about our process
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};

export default OwnerPropertyDetail;
