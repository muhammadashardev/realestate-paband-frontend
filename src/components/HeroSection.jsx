import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center rounded-b-[40px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop")', // Dubai skyline placeholder
        }}
      >
        <div className="absolute inset-0 bg-brand-dark/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-dark/20 to-brand-dark/80"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          Discover Verified <br /> Rental Properties
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto"
        >
          Paband is a property management company helping owners manage their property and also place tenants with proper verification and documentation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => navigate('/properties')}
            className="flex-1 bg-[#B68B39] hover:bg-[#9B742E] text-white px-8 py-4 rounded-xl font-bold transition-all hover:shadow-lg hover:-translate-y-0.5 text-center"
          >
            Explore Property Type
          </button>
          <button className="px-8 py-4 rounded-full bg-white text-brand-text font-medium hover:bg-gray-100 transition-colors w-full sm:w-auto text-lg">
            List Your Property
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
