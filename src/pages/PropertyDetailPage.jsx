import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, FaComment, FaMapMarkerAlt, FaBed, FaBath, FaVectorSquare, 
  FaSearch, FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaChevronLeft, 
  FaChevronRight, FaCheck 
} from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPropertyById } from '../utils/propertyService';

const PropertyDetailPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get('id');
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!propertyId) {
        setError('No property ID provided');
        setLoading(false);
        return;
      }
      try {
        const data = await getPropertyById(propertyId);
        setProperty(data);
      } catch (err) {
        setError(err.message || 'Failed to load property details.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [propertyId]);

  const galleryImages = property && property.gallery && property.gallery.length > 0 
    ? property.gallery 
    : [property?.image || "https://images.unsplash.com/photo-1600607687931-cebf10cb4cb0?q=80&w=2070&auto=format&fit=crop"];

  const handlePrevGallery = () => {
    setGalleryIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextGallery = () => {
    setGalleryIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="font-sans min-h-screen bg-brand-light selection:bg-brand-gold selection:text-white">
      
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[450px] flex items-center justify-center rounded-b-[40px] overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1600607687931-cebf10cb4cb0?q=80&w=2070&auto=format&fit=crop")', // Dark modern house exterior
          }}
        >
          <div className="absolute inset-0 bg-brand-dark/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-dark/20 to-brand-dark/80"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16 flex flex-col items-center">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-gray-300 text-sm mb-4">
            <span className="hover:text-white cursor-pointer" onClick={() => navigate('/')}>Home</span>
            <span>&gt;</span>
            <span className="text-brand-gold font-semibold">Property Detail</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
          >
            Property Detail
          </motion.h1>

          <p className="text-gray-300 max-w-xl mb-8 leading-relaxed">
            Whether you're looking for your dream rental or want to list your premium property, our team at Paband.pk is ready to assist you every step of the way.
          </p>

          {/* Rating stack */}
          <div className="flex items-center gap-4 bg-black/30 backdrop-blur-md rounded-full px-6 py-2 border border-white/10">
            <div className="flex items-center gap-1 text-yellow-400">
              <span>★</span>
              <span className="text-white font-bold text-sm">4.9/5</span>
            </div>
            <span className="text-xs text-gray-300 border-l border-white/20 pl-3">User Satisfaction</span>
            <div className="flex -space-x-2 border-l border-white/20 pl-3">
              <img className="w-6 h-6 rounded-full border border-white object-cover" src="https://i.pravatar.cc/100?img=1" alt="" />
              <img className="w-6 h-6 rounded-full border border-white object-cover" src="https://i.pravatar.cc/100?img=2" alt="" />
              <img className="w-6 h-6 rounded-full border border-white object-cover" src="https://i.pravatar.cc/100?img=3" alt="" />
              <div className="w-6 h-6 rounded-full border border-white bg-[#B68B39] text-white flex items-center justify-center text-[8px] font-bold">+10k</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content grid */}
      {loading ? (
        <section className="py-32 flex justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#B68B39]"></div>
        </section>
      ) : error ? (
        <section className="py-20 text-center">
          <p className="text-red-500 font-semibold">{error}</p>
          <button onClick={() => navigate('/properties')} className="mt-4 px-6 py-2 bg-[#B68B39] text-white rounded-lg hover:bg-yellow-600 transition-colors">Back to Properties</button>
        </section>
      ) : (
      <section className="py-16 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
        
        {/* Left Column (Content) */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Main image & Details */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6"
          >
            <div className="rounded-2xl overflow-hidden h-[450px]">
              <img 
                src={property?.image || "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop"} 
                alt={property?.title || "Property"} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Badges/Tags */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-500">
              {property?.featured && <span className="bg-brand-gold text-white px-3 py-1.5 rounded-md">Featured</span>}
              <span className="flex items-center gap-1.5">
                <FaCalendarAlt className="text-brand-gold" />
                {property?.yearBuilt || 'N/A'}
              </span>
              <span className="bg-gray-100 px-3 py-1.5 rounded-md text-gray-600">{property?.status || 'For Rent'}</span>
            </div>

            <h2 className="text-3xl font-bold text-brand-text leading-tight">
              {property?.title || 'Property Details'}
            </h2>

            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <FaMapMarkerAlt className="text-brand-gold shrink-0" />
              <span>{property?.location || 'Location not available'}</span>
            </div>

            {property?.description && (
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            )}
          </motion.div>

          {/* Properties Details Block */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6"
          >
            <h3 className="text-2xl font-bold text-brand-text border-b border-gray-100 pb-4">
              PROPERTIES DETAILS
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500 font-medium">Property ID</span>
                <span className="font-bold text-brand-text">{property?.propertyId || property?._id?.slice(-6).toUpperCase() || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500 font-medium">Lot Area</span>
                <span className="font-bold text-brand-text">{property?.lotArea || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500 font-medium">Home Area</span>
                <span className="font-bold text-brand-text">{property?.homeArea || property?.sqft ? `${property?.sqft} sqft` : 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500 font-medium">Beds</span>
                <span className="font-bold text-brand-text">{property?.beds ?? 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500 font-medium">Rooms</span>
                <span className="font-bold text-brand-text">{property?.rooms ?? 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500 font-medium">Price</span>
                <span className="font-bold text-[#B68B39]">{property?.price || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500 font-medium">Baths</span>
                <span className="font-bold text-brand-text">{property?.baths ?? 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500 font-medium">Status</span>
                <span className="font-bold text-brand-text">{property?.status || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-50 md:col-span-2">
                <span className="text-gray-500 font-medium">Year Built</span>
                <span className="font-bold text-brand-text">{property?.yearBuilt || 'N/A'}</span>
              </div>
            </div>
          </motion.div>

          {/* Facts and Features Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-brand-text">FACTS AND FEATURES</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Bed Count card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 flex items-start gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#B68B39]/10 flex items-center justify-center text-[#B68B39] shrink-0">
                  <FaBed className="text-lg" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 mb-1">Total Bed Count</h4>
                  <p className="font-bold text-sm text-[#B68B39]">4 Beds</p>
                </div>
              </div>

              {/* Bath card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 flex items-start gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#B68B39]/10 flex items-center justify-center text-[#B68B39] shrink-0">
                  <FaBath className="text-lg" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 mb-1">Bathroom for Use</h4>
                  <p className="font-bold text-sm text-[#B68B39]">2 Bathroom</p>
                </div>
              </div>

              {/* Area card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 flex items-start gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#B68B39]/10 flex items-center justify-center text-[#B68B39] shrink-0">
                  <FaVectorSquare className="text-lg" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 mb-1">Total Area Size</h4>
                  <p className="font-bold text-sm text-[#B68B39]">6×8 m²</p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Floor Plans Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6"
          >
            <h3 className="text-2xl font-bold text-brand-text">FLOOR PLANS</h3>
            <div className="relative border border-gray-100 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center p-8 h-[400px]">
              {/* Layout Map/Blueprint SVG */}
              <svg viewBox="0 0 800 500" className="w-full h-full max-h-[350px] opacity-75">
                <rect x="50" y="50" width="700" height="400" fill="none" stroke="#2b4c6f" strokeWidth="2" strokeDasharray="5,5" />
                {/* Rooms */}
                <rect x="50" y="50" width="250" height="200" fill="none" stroke="#2b4c6f" strokeWidth="2" />
                <text x="175" y="150" textAnchor="middle" fill="#2b4c6f" className="text-xs font-bold font-sans">BEDROOM 1</text>

                <rect x="300" y="50" width="450" height="200" fill="none" stroke="#2b4c6f" strokeWidth="2" />
                <text x="525" y="150" textAnchor="middle" fill="#2b4c6f" className="text-xs font-bold font-sans">LIVING ROOM</text>

                <rect x="50" y="250" width="200" height="200" fill="none" stroke="#2b4c6f" strokeWidth="2" />
                <text x="150" y="350" textAnchor="middle" fill="#2b4c6f" className="text-xs font-bold font-sans">KITCHEN</text>

                <rect x="250" y="250" width="250" height="200" fill="none" stroke="#2b4c6f" strokeWidth="2" />
                <text x="375" y="350" textAnchor="middle" fill="#2b4c6f" className="text-xs font-bold font-sans">BEDROOM 2</text>

                <rect x="500" y="250" width="250" height="200" fill="none" stroke="#2b4c6f" strokeWidth="2" />
                <text x="625" y="350" textAnchor="middle" fill="#2b4c6f" className="text-xs font-bold font-sans">DINING / BATH</text>
              </svg>

              <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600">
                <FaChevronLeft />
              </button>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600">
                <FaChevronRight />
              </button>
            </div>
          </motion.div>

          {/* Properties Amenities Checklist */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6"
          >
            <h3 className="text-2xl font-bold text-brand-text pb-4 border-b border-gray-100">
              PROPERTIES AMENITIES
            </h3>
            
            <p className="text-gray-500 text-sm">
              Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam hendrerit urna. Pellentesque sit amet sapien mattis ligula consectetuer, ultrices Maecenas.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-6 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#B68B39]/10 text-[#B68B39] flex items-center justify-center text-xs shrink-0"><FaCheck /></span>
                <span>Air Condition</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#B68B39]/10 text-[#B68B39] flex items-center justify-center text-xs shrink-0"><FaCheck /></span>
                <span>Recreation Center</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#B68B39]/10 text-[#B68B39] flex items-center justify-center text-xs shrink-0"><FaCheck /></span>
                <span>Refrigerator</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#B68B39]/10 text-[#B68B39] flex items-center justify-center text-xs shrink-0"><FaCheck /></span>
                <span>Gym Faucitis</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#B68B39]/10 text-[#B68B39] flex items-center justify-center text-xs shrink-0"><FaCheck /></span>
                <span>Microwave</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#B68B39]/10 text-[#B68B39] flex items-center justify-center text-xs shrink-0"><FaCheck /></span>
                <span>Window Covering</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#B68B39]/10 text-[#B68B39] flex items-center justify-center text-xs shrink-0"><FaCheck /></span>
                <span>Swimming Pool</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#B68B39]/10 text-[#B68B39] flex items-center justify-center text-xs shrink-0"><FaCheck /></span>
                <span>Basketball Court</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#B68B39]/10 text-[#B68B39] flex items-center justify-center text-xs shrink-0"><FaCheck /></span>
                <span>Car Washer</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#B68B39]/10 text-[#B68B39] flex items-center justify-center text-xs shrink-0"><FaCheck /></span>
                <span>High Speed Wifi</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#B68B39]/10 text-[#B68B39] flex items-center justify-center text-xs shrink-0"><FaCheck /></span>
                <span>Fire Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#B68B39]/10 text-[#B68B39] flex items-center justify-center text-xs shrink-0"><FaCheck /></span>
                <span>24/7 CCTV</span>
              </div>
            </div>
          </motion.div>

          {/* Properties Gallery (Slider) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6"
          >
            <h3 className="text-2xl font-bold text-brand-text">PROPERTIES GALLERY</h3>
            <div className="relative rounded-2xl overflow-hidden h-[400px]">
              <img 
                src={galleryImages[galleryIndex]} 
                alt="Gallery" 
                className="w-full h-full object-cover transition-all duration-500"
              />
              <button 
                onClick={handlePrevGallery}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600"
              >
                <FaChevronLeft />
              </button>
              <button 
                onClick={handleNextGallery}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600"
              >
                <FaChevronRight />
              </button>
            </div>
          </motion.div>

          {/* Map Location Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6"
          >
            <h3 className="text-2xl font-bold text-brand-text">PROPERTIES LOCATION</h3>
            
            <div className="rounded-2xl overflow-hidden h-[350px] relative border border-gray-100">
              {/* Abstract Map Graphic */}
              <iframe 
                title="Property Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.3725656110823!2d74.3413813!3d31.5173367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919045a27bfeb35%3A0xc3cf9e3e7f4e82b4!2sDHA%20Phase%203%2C%20Lahore!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk" 
                className="w-full h-full border-0" 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>

        </div>

        {/* Right Column (Sidebar) */}
        <div className="space-y-8">
          
          {/* Widget 1: Search */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-4">
            <h4 className="font-bold text-brand-text text-lg">Search Here</h4>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-gray-50 border border-gray-200 focus:border-[#B68B39] rounded-xl px-4 py-3 text-sm placeholder-gray-400 outline-none transition-colors pr-10"
              />
              <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm cursor-pointer hover:text-brand-gold transition-colors" />
            </div>
          </div>

          {/* Widget 2: Paband Profile Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-6">
            {/* Logo */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-brand-dark rounded-full flex items-center justify-center font-bold text-white text-2xl shadow-md mb-2">P</div>
              <h4 className="font-bold text-xl text-brand-text">Paband .pk</h4>
              <p className="text-xs text-[#B68B39] font-medium tracking-wide">Properties rental site</p>
            </div>
            
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Lorem ipsum dolor sit amet consectetur adipiscing elit Ut massa mi. Aliquam in hendrerit Pellentesque.
            </p>

            {/* Social stack */}
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-brand-gold hover:text-white transition-colors text-gray-500"><FaFacebookF className="text-xs" /></a>
              <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-brand-gold hover:text-white transition-colors text-gray-500"><FaTwitter className="text-xs" /></a>
              <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-brand-gold hover:text-white transition-colors text-gray-500"><FaYoutube className="text-xs" /></a>
              <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-brand-gold hover:text-white transition-colors text-gray-500"><FaInstagram className="text-xs" /></a>
            </div>
          </div>

          {/* Widget 3: Book Message form */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
            <h4 className="font-bold text-brand-text text-lg">Message for Book</h4>
            
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="Name*" 
                className="w-full bg-gray-50 border border-gray-200 focus:border-[#B68B39] rounded-xl px-4 py-3 text-sm placeholder-gray-400 outline-none transition-colors" 
              />
              <input 
                type="email" 
                placeholder="Email*" 
                className="w-full bg-gray-50 border border-gray-200 focus:border-[#B68B39] rounded-xl px-4 py-3 text-sm placeholder-gray-400 outline-none transition-colors" 
              />
              <textarea 
                placeholder="Message" 
                rows="4" 
                className="w-full bg-gray-50 border border-gray-200 focus:border-[#B68B39] rounded-xl px-4 py-3 text-sm placeholder-gray-400 outline-none transition-colors resize-none"
              ></textarea>
              
              <button 
                type="button" 
                className="w-full py-3 bg-[#B68B39] text-white font-medium rounded-xl hover:bg-yellow-600 transition-colors"
              >
                Submit Now
              </button>
            </form>
          </div>

        </div>

      </section>
      )}
    </div>
  );
};

export default PropertyDetailPage;
