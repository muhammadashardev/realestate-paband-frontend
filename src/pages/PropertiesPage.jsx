import React, { useState, useEffect } from 'react';
import ThreeLoader from '../components/ThreeLoader';
import { motion } from 'framer-motion';
import { FaBed, FaBath, FaVectorSquare, FaCar, FaPhoneAlt, FaEnvelope, FaWhatsapp, FaCheck } from 'react-icons/fa';

// Reuse property cards structure
import { useNavigate } from 'react-router-dom';
import { getProperties } from '../utils/propertyService';

const PropertyCard = ({ _id, id, image, title, location, beds, baths, sqft, garages, price, index }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
    >
      <div className="h-56 overflow-hidden relative">
        <img src={image} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-brand-text mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-6">{location}</p>

        <div className="grid grid-cols-2 gap-y-4 mb-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FaBed className="text-gray-400" />
            <span>{beds} Bedrooms</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBath className="text-gray-400" />
            <span>{baths} Bathrooms</span>
          </div>
          <div className="flex items-center gap-2">
            <FaVectorSquare className="text-gray-400" />
            <span>{sqft} sq ft</span>
          </div>
          {garages && (


            <div className="flex items-center gap-2">
              <FaCar className="text-gray-400" />
              <span>{garages} Garages</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="font-bold text-lg text-brand-text">RS {price}</div>
          <button
            onClick={() => navigate(`/detail?id=${_id || id}`)}
            className="px-4 py-2 bg-brand-gold text-white text-sm font-medium rounded hover:bg-yellow-600 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const FeatureCard = ({ title, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-brand-dark/50 border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors"
  >
    <div className="w-12 h-12 rounded-full bg-[#B68B39] flex items-center justify-center mb-4 text-white">
      <FaCheck />
    </div>
    <h4 className="text-white font-medium text-sm md:text-base leading-snug">
      {title.split('\\n').map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i !== title.split('\\n').length - 1 && <br />}
        </React.Fragment>
      ))}
    </h4>
  </motion.div>
);

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProps = async () => {
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (err) {
        setError(err.message || 'Failed to load properties');
      } finally {
        setLoading(false);
      }
    };
    fetchProps();
  }, []);

  if (showLoader) return <ThreeLoader onComplete={() => setShowLoader(false)} />;

  return (
    <div className="font-sans min-h-screen bg-brand-light selection:bg-brand-gold selection:text-white">
      {/* Navbar (Internal inside this page if standalone, but it is rendered by parent App.jsx. Let's render it here as well or standard layout) */}

      {/* Properties Page Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center rounded-b-[40px] overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144&auto=format&fit=crop")', // City skyscrapers placeholder
          }}
        >
          <div className="absolute inset-0 bg-brand-dark/50 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-dark/20 to-brand-dark/80"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          >
            Explore All Rental <br /> Properties
          </motion.h1>
        </div>
      </section>

      {/* Grid of properties */}
      <section className="py-20 px-8 max-w-7xl mx-auto relative">


        <div className="text-center mb-16 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-brand-text"
          >
            Featured Rental Properties
          </motion.h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20 w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B68B39]"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10 w-full font-semibold">{error}</div>
        ) : properties.length === 0 ? (
          <div className="text-center text-gray-500 py-10 w-full font-semibold">No properties found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {properties.map((prop, idx) => (
              <PropertyCard key={prop._id || prop.id || idx} index={idx} {...prop} />
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Paband Section */}
      <section className="bg-[#112338] py-20 px-8 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Side: Images Collage */}
          <div className="w-full lg:w-1/2 relative h-[600px] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="absolute left-0 bottom-10 w-2/3 h-2/3 rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1935&auto=format&fit=crop"
                alt="City view"
                className="w-full h-full object-cover"
              />
              {/* Join Us Badge */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-xl py-3 px-6 shadow-lg flex flex-col items-center gap-2 w-[80%] max-w-[200px]">
                <span className="text-sm font-bold text-brand-text whitespace-nowrap">10k+ People Join us</span>
                <div className="flex -space-x-3">
                  <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=1" alt="User" />
                  <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=2" alt="User" />
                  <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=3" alt="User" />
                  <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=4" alt="User" />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-900 text-white flex items-center justify-center text-xs font-bold z-10">+</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="absolute right-0 top-10 w-1/2 h-[80%] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1600607687931-cebf10cb4cb0?q=80&w=2070&auto=format&fit=crop"
                alt="Modern building"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Right Side: Features */}
          <div className="w-full lg:w-1/2 pl-0 lg:pl-10">
            <motion.h2
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white mb-12"
            >
              Why Choose Paband?
            </motion.h2>

            <div className="grid grid-cols-2 gap-6">
              <FeatureCard title="Verified\ntenants" delay={0.1} />
              <FeatureCard title="Secure\nTransactions" delay={0.2} />
              <FeatureCard title="Transparent\nPricing" delay={0.3} />
              <FeatureCard title="Ongoing\nSupport" delay={0.4} />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-8 max-w-7xl mx-auto">
        {/* Top Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center mb-16"
        >
          <div className="mb-6 md:mb-0 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-4">
              Need Help? Talk to Our Expert.
            </h2>
            <p className="text-gray-500">
              To become Pakistan's most trusted rental management platform, starting from Karachi and expanding nationwide.
            </p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button className="flex items-center justify-center gap-2 px-6 py-3 border border-[#B68B39] text-[#B68B39] font-medium rounded hover:bg-yellow-50 transition-colors w-full md:w-auto">
              <FaPhoneAlt className="text-sm" />
              +123 456 789
            </button>
            <button className="px-6 py-3 bg-[#B68B39] text-white font-medium rounded hover:bg-yellow-600 transition-colors w-full md:w-auto">
              Contact Now
            </button>
          </div>
        </motion.div>

        {/* Main Contact Area */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-brand-dark rounded-[40px] p-8 md:p-16 flex flex-col lg:flex-row gap-16 relative"
        >
          {/* Decorative Top Badge */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex -space-x-3 bg-white p-1 rounded-full shadow-md">
            <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=5" alt="Expert 1" />
            <div className="w-10 h-10 rounded-full border-2 border-white bg-green-700 text-white flex items-center justify-center font-bold">S</div>
          </div>

          {/* Left Side: Info */}
          <div className="w-full lg:w-5/12 text-white">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#B68B39]"></span>
              <span className="text-xs font-semibold tracking-wider text-gray-300">Contact Now</span>
            </div>

            <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Get in Touch <br /> with Us
            </h3>

            <p className="text-gray-400 mb-10 leading-relaxed text-sm">
              Have a question, need help, or want to list your property? Our team is here to assist you.
            </p>

            <div className="mb-10">
              <h4 className="font-bold mb-6">Contact Information</h4>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#B68B39] flex items-center justify-center text-white shrink-0">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Phone Number</p>
                    <p className="font-medium">+(123) 456-789</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#B68B39] flex items-center justify-center text-white shrink-0">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Email Address</p>
                    <p className="font-medium">info@domainname.com</p>
                  </div>
                </div>
              </div>
            </div>

            <button className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl transition-colors font-medium">
              <FaWhatsapp className="text-green-400 text-xl" />
              Chat on WhatsApp
            </button>
          </div>

          {/* Right Side: Form */}
          <div className="w-full lg:w-7/12 bg-[#1C2F45] rounded-3xl p-8 md:p-10 border border-white/5">
            <h3 className="text-3xl font-bold text-white mb-8">Get in touch</h3>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="First Name*" className="w-full bg-[#2A3F54] border border-transparent focus:border-[#B68B39] rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none transition-colors" />
                <input type="text" placeholder="Last Name*" className="w-full bg-[#2A3F54] border border-transparent focus:border-[#B68B39] rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none transition-colors" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="tel" placeholder="Phone Number*" className="w-full bg-[#2A3F54] border border-transparent focus:border-[#B68B39] rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none transition-colors" />
                <input type="email" placeholder="Email Address*" className="w-full bg-[#2A3F54] border border-transparent focus:border-[#B68B39] rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none transition-colors" />
              </div>
              <textarea placeholder="Write Message Here..." rows="5" className="w-full bg-[#2A3F54] border border-transparent focus:border-[#B68B39] rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none transition-colors resize-none"></textarea>

              <button type="button" className="px-8 py-3 bg-[#B68B39] text-white font-medium rounded hover:bg-yellow-600 transition-colors flex items-center gap-2 mt-4">
                Submit Message
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </form>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default PropertiesPage;
