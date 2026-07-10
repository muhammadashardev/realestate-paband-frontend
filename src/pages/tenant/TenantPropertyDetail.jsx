import React, { useState, useEffect } from 'react';
import {
  MdLocationOn, MdKingBed, MdBathtub, MdSquareFoot,
  MdLocalParking, MdCheckCircle, MdSecurity, MdPower,
  MdChair, MdAccessTime, MdVerified, MdCheck
} from 'react-icons/md';
import TenantScheduleVisitModal from '../../components/tenant/TenantScheduleVisitModal';
import TenantVisitSuccessModal from '../../components/tenant/TenantVisitSuccessModal';
import { useParams, useLocation } from 'react-router-dom';
import { getProperties, getPropertyById } from '../../utils/propertyService';
import { getPropertyDisplayId } from '../../utils/idHelpers';
import { createVisitRequest } from '../../utils/visitService';

const isPropertyBusinessRouteId = (value) => {
  return typeof value === 'string' && /^OP-\d{3}$/.test(value);
};

const fetchPropertyByRouteId = async (routeId) => {
  try {
    return await getPropertyById(routeId);
  } catch (err) {
    if (!isPropertyBusinessRouteId(routeId)) {
      throw err;
    }

    const results = await getProperties({ propertyId: routeId });
    if (results && results.length) {
      return results[0];
    }

    throw err;
  }
};

/* ─── Property Data ─── */
const sampleProperty = {
  name: 'Skyline Luxury Apartment',
  type: 'APARTMENT',
  location: 'DHA Phase 6, Karachi',
  price: 'PKR 120,000',
  priceUnit: '/month',
  bedrooms: 3,
  bathrooms: 2,
  size: '1800 Sq Ft',
  parking: 'Available',
  furnishing: 'Fully Furnished',
  tenure: 'Min 1 Year',
  status: 'Active',
  verified: true,
  mainImage: 'https://images.unsplash.com/photo-1570129477492-45ec003cf16f?w=800&h=600&fit=crop',
  thumbnails: [
    'https://images.unsplash.com/photo-1570129477492-45ec003cf16f?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&h=200&fit=crop',
  ],
  description: 'Modern luxury apartment located in a secure residential area with nearby schools, shopping centers, and easy access to main roads. This property features high-end finishes, floor-to-ceiling windows with panoramic city views,\n\nand a state-of-the-art kitchen. The building offers top-tier security and a dedicated maintenance team available 24/7.',
  features: [
    { icon: <MdSecurity size={20} className="text-[#112338]" />, label: 'Security', value: '24/7 CCTV' },
    { icon: <MdPower size={20} className="text-[#112338]" />, label: 'Power Backup', value: 'Full Backup' },
  ],
};

const statusOptions = ['Active', 'Occupied', 'Pending Approval', 'Inactive'];

const TenantPropertyDetail = () => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { id } = useParams();
  const location = useLocation();

  const [property, setProperty] = useState(location.state?.property || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(location.state?.property?.image || location.state?.property?.mainImage || null);

  const handleScheduleSubmit = async (formData) => {
    setSubmitError(null);
    setSubmitting(true);
    try {
      const resolvedProperty = property || sampleProperty;
      const propertyId = resolvedProperty?._id || resolvedProperty?.id || resolvedProperty?.propertyId || resolvedProperty?.propertyMongoId || resolvedProperty?.mongoId;
      const contactNumber = `${formData.countryCode || '+92'}${formData.phone || ''}`.trim();

      await createVisitRequest({
        propertyId,
        property: propertyId,
        propertyMongoId: propertyId,
        preferredVisitDate: formData.visitDate,
        visitDate: formData.visitDate,
        preferredTimeSlot: formData.timeSlot,
        timeSlot: formData.timeSlot,
        contactNumber,
        phone: contactNumber,
        numberOfVisitors: formData.visitors ? Number(formData.visitors) : undefined,
        additionalMessage: formData.message,
        message: formData.message,
      });
      setShowScheduleModal(false);
      setShowSuccessModal(true);
    } catch (err) {
      setSubmitError(err.message || 'Unable to submit visit request.');
    } finally {
      setSubmitting(false);
    }
  };

  const buildImageList = (prop) => {
    if (!prop) return [];
    const list = [];
    const pushIf = (v) => { if (v) list.push(v); };

    pushIf(prop.image || prop.mainImage || prop.imageUrl || prop.image_path);

    if (Array.isArray(prop.gallery) && prop.gallery.length) {
      list.push(...prop.gallery);
    } else if (Array.isArray(prop.images) && prop.images.length) {
      list.push(...prop.images);
    } else if (prop.gallery && typeof prop.gallery === 'string') {
      try {
        const parsed = JSON.parse(prop.gallery);
        if (Array.isArray(parsed)) list.push(...parsed);
      } catch (e) {
        // fallback: comma-separated
        list.push(...prop.gallery.split(',').map(s => s.trim()).filter(Boolean));
      }
    }

    // Remove duplicates and falsy
    return Array.from(new Set(list.filter(Boolean)));
  };

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (property) return; // already have it from location.state
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const prop = await fetchPropertyByRouteId(id);
        if (!mounted) return;
        setProperty(prop);
        const imgs = buildImageList(prop);
        setSelectedImage(imgs.length ? imgs[0] : (prop.image || prop.mainImage || null));
      } catch (err) {
        console.error('Failed to load property', err);
        if (!mounted) return;
        setError(err.message || 'Failed to load property');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, [id, property]);

  if (loading && !property) {
    return <div className="p-8 text-center">Loading property…</div>;
  }

  if (error && !property) {
    return <div className="p-8 text-center text-red-600">{error}</div>;
  }

  const active = property || sampleProperty;
  const images = buildImageList(property);

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto">

      {/* ───────── Header ───────── */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#112338] leading-tight tracking-tight">
          Property Details
        </h2>
        <p className="text-gray-500 text-[13px] md:text-[14px] mt-1.5 font-medium">
          Complete overview of your registered property information.
        </p>
      </div>

      {/* ───────── Main Grid ───────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ─── Left Column: Images & Description ─── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Main Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg h-72 sm:h-96 md:h-[420px]">
            <img
              src={selectedImage || active.mainImage || active.image}
              alt={active.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            {/* Verified Badge */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <MdVerified size={14} className="text-emerald-600" />
              <span className="text-[11px] font-bold text-[#112338]">Verified Property</span>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {(images && images.length ? images : (active.thumbnails || [])).map((thumb, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(thumb)}
                className={`tenant-thumb w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${(selectedImage || '').includes(thumb) ? 'border-[#B68B39] shadow-md' : 'border-gray-200 hover:border-gray-300'
                  }`}
              >
                <img
                  src={thumb}
                  alt={`View ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 border-2 border-dashed border-gray-300 cursor-pointer hover:border-gray-400 transition-colors">
              <span className="text-gray-500 text-[11px] font-bold text-center leading-tight">+12 More</span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100/60">
            <h3 className="text-xl font-extrabold text-[#112338] mb-4">Description</h3>
            <p className="text-gray-500 text-[13px] leading-[1.8] font-medium whitespace-pre-line">
              {property?.description || active.description}
            </p>
          </div>

          {/* Features */}
          <div className="flex items-center gap-8 px-2">
            {(property?.features || active.features || []).map((feat, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  {feat.icon || <MdCheckCircle size={18} className="text-[#112338]" />}
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-medium">{feat.label}</p>
                  <p className="text-[13px] font-bold text-[#112338]">{feat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Right Column: Property Info Sidebar ─── */}
        <div className="lg:col-span-1 space-y-6">

          {/* Property Info Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/60 sticky top-6">

            {/* Type Badge */}
            <div className="mb-3">
              <span className="text-[9px] font-bold text-[#B68B39] uppercase tracking-[0.15em] bg-[#B68B39]/10 px-2.5 py-1 rounded-full">
                {property?.type || active.type}
              </span>
            </div>

            {/* Property Name */}
            <h2 className="text-xl font-extrabold text-[#112338] leading-tight mb-1.5">
              {property?.name || active.name}
            </h2>

            {/* Property ID */}
            <div className="text-[11px] text-gray-400 mb-3">
              Property ID: {getPropertyDisplayId(property || active)}
            </div>

            {/* Location */}
            <div className="flex items-center gap-1 text-gray-500 text-[12px] mb-4">
              <MdLocationOn size={14} className="text-[#B68B39]" />
              <span className="font-medium">{property?.location || active.location}</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-[28px] font-extrabold text-[#B68B39] leading-none">
                {property?.price || active.price}
                <span className="text-[14px] font-medium text-gray-400">{property?.priceUnit || active.priceUnit}</span>
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <MdKingBed size={18} className="text-gray-400" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium">Bedrooms</p>
                  <p className="text-[13px] font-bold text-[#112338]">{property?.bedrooms || property?.beds || active.bedrooms} Bedrooms</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <MdBathtub size={18} className="text-gray-400" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium">Bathrooms</p>
                  <p className="text-[13px] font-bold text-[#112338]">{property?.bathrooms || property?.baths || active.bathrooms} Bathrooms</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <MdSquareFoot size={18} className="text-gray-400" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium">Area Size</p>
                  <p className="text-[13px] font-bold text-[#112338]">{property?.size || property?.sqft || active.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <MdLocalParking size={18} className="text-gray-400" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium">Parking</p>
                  <p className="text-[13px] font-bold text-[#112338]">{property?.parking || active.parking}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <MdChair size={18} className="text-gray-400" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium">Furnishing</p>
                  <p className="text-[13px] font-bold text-[#112338]">{property?.furnishing || property?.furnish || active.furnishing}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <MdAccessTime size={18} className="text-gray-400" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium">Tenure</p>
                  <p className="text-[13px] font-bold text-[#112338]">{property?.tenure || active.tenure}</p>
                </div>
              </div>
            </div>

            {/* Property Status */}
            <div className="mb-6">
              <p className="text-[12px] font-bold text-[#112338] mb-3">Property Status</p>
              <div className="grid grid-cols-2 gap-2">
                {statusOptions.map((status, idx) => {
                  const isActive = (property?.status || active.status) === status;
                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-[11px] font-bold cursor-default transition-all border ${isActive
                        ? 'bg-[#ECFDF5] text-[#10B981] border-[#10B981]'
                        : 'bg-[#F9FAFB] text-gray-400 border-transparent'
                        }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#10B981]' : 'bg-gray-300'
                        }`} />
                      {status}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Visit Request Button */}
            <button
              onClick={() => setShowScheduleModal(true)}
              className="w-full py-3 bg-[#112338] text-white font-bold rounded-xl hover:bg-[#0A1A2E] transition-all text-[13px] shadow-md"
            >
              Visit Request
            </button>
          </div>

          {/* Verified Listing Card */}
          <div className="tenant-verified-shimmer bg-gradient-to-br from-[#0A2240] to-[#112338] text-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#B68B39]/20 flex items-center justify-center border border-[#B68B39]/40">
                <MdCheck size={22} className="text-[#B68B39]" />
              </div>
              <h4 className="font-bold text-[14px]">Verified Listing</h4>
            </div>
            <p className="text-[11px] leading-relaxed text-gray-400">
              This property has been manually inspected and verified by our field agents for authenticity and quality standards.
            </p>
          </div>
        </div>
      </div>

      {/* ───────── Modals ───────── */}
      <TenantScheduleVisitModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        onSubmit={handleScheduleSubmit}
        submitting={submitting}
        propertyData={{
          name: property?.name || active.name,
          location: property?.location || active.location,
          price: `${property?.price || active.price} / Month`,
          image: selectedImage || active.mainImage || active.image,
        }}
      />
      {submitError && showScheduleModal && (
        <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700 max-w-2xl">
          {submitError}
        </div>
      )}

      <TenantVisitSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
};

export default TenantPropertyDetail;
