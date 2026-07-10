import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaArrowRight, 
  FaCheck, 
  FaShieldAlt, 
  FaRegComments, 
  FaSlidersH, 
  FaHandshake, 
  FaHeadset, 
  FaFileContract, 
  FaUserShield, 
  FaRegHandshake, 
  FaMapMarkedAlt, 
  FaClipboardList, 
  FaGlobeAsia, 
  FaTimes,
  FaCheckCircle
} from 'react-icons/fa';

const AboutPage = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="bg-[#F8F3EA] text-brand-dark min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative h-[480px] md:h-[550px] overflow-hidden flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000')" 
          }}
        >
          {/* Black Gradient Overlays to Match Screenshot perfectly */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white flex flex-col items-center">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm md:text-base font-semibold text-gray-300 mb-6 drop-shadow-md">
            <span className="hover:text-brand-gold cursor-pointer transition-colors">Home</span>
            <span className="text-brand-gold">•</span>
            <span className="text-white">About Us</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mb-8 drop-shadow-lg">
            Built for Trust.<br />
            Designed for Better Renting.
          </h1>

          {/* Bottom Banner with rating & avatars inside Hero */}
          <div className="absolute bottom-8 right-6 md:right-12 flex items-center gap-4 bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            {/* User satisfaction */}
            <div className="flex flex-col items-end text-right">
              <div className="flex items-center gap-1.5">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="font-extrabold text-white text-sm">4.9/5</span>
              </div>
              <span className="text-[10px] text-gray-300 font-medium">User Satisfaction</span>
            </div>

            {/* Avatar group */}
            <div className="flex -space-x-2.5">
              <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop" alt="User 1" />
              <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop" alt="User 2" />
              <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop" alt="User 3" />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-brand-gold text-white text-[10px] font-bold flex items-center justify-center">+18k</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Mission & Vision Section */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Side: Overlapping Images */}
          <div className="w-full lg:w-[48%] relative flex justify-center py-8">
            {/* Background gold decoration */}
            <div className="absolute top-1/2 left-4 w-40 h-40 rounded-full border-[20px] border-[#B68B39]/20 -translate-y-1/2 -z-10"></div>
            
            {/* Background Sunset Modern Villa (Large back image) */}
            <div className="w-[82%] aspect-[4/3] rounded-[32px] overflow-hidden shadow-xl border-4 border-white translate-x-12 translate-y-[-16px]">
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200" 
                alt="Modern villa sunset" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Foreground Faisal Mosque Card (Vertical front image) */}
            <div className="absolute bottom-[-16px] left-4 w-[48%] aspect-[3/4] bg-white p-3 rounded-[28px] shadow-2xl border border-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1627972982748-52236d51d45d?q=80&w=800" 
                alt="Faisal Mosque Islamabad" 
                className="w-full h-full object-cover rounded-[20px]"
              />
            </div>
          </div>

          {/* Right Side: Mission & Vision Content */}
          <div className="w-full lg:w-[52%]">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200/80 shadow-sm mb-6">
                <span className="text-xs font-bold text-gray-600 uppercase tracking-widest flex items-center gap-1.5">
                  <FaArrowRight className="text-[10px] text-[#B68B39] rotate-[-45deg]" /> Our Mission & Vision
                </span>
              </div>

              {/* Mission Row */}
              <div className="mb-10 flex gap-5 items-start">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-brand-dark flex items-center justify-center shadow-lg">
                  <FaShieldAlt className="text-2xl text-[#B68B39]" />
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-brand-dark mb-3">Mission</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium">
                    To eliminate stress, uncertainty, and conflict in rental relationships by providing a structured, transparent, and fully managed system for property owners and tenants across Pakistan.
                  </p>
                </div>
              </div>

              {/* Vision Row */}
              <div className="flex gap-5 items-start">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-brand-dark flex items-center justify-center shadow-lg">
                  <FaRegComments className="text-2xl text-[#B68B39]" />
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-brand-dark mb-3">Vision</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium">
                    To set the standard for rental management in Pakistan by becoming the most trusted platform that ensures security, transparency, and peace of mind for every property owner and tenant. We aim to create a future where property owners and tenants can engage with complete confidence.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Putting an End to Unmanaged Rentals Section */}
      <section className="py-20 bg-[#F3ECE0]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Side: Content */}
          <div className="w-full lg:w-[50%]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200/80 shadow-sm mb-6">
                <span className="text-xs font-bold text-gray-600 uppercase tracking-widest flex items-center gap-1.5">
                  <FaArrowRight className="text-[10px] text-[#B68B39] rotate-[-45deg]" /> The Problem We Solve
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold text-brand-dark mb-6 leading-tight">
                Putting an end to<br />
                Unmanaged Rentals
              </h2>

              <p className="text-gray-600 font-medium leading-relaxed mb-10 text-sm md:text-base">
                After a rental deal is done, there is no structured system to manage tenants, payments, or disputes resulting in stress, risk, and uncertainty. This is the gap we are built to solve.
              </p>

              {/* List of features */}
              <div className="space-y-5">
                {[
                  "100% Manually Verified Properties",
                  "Direct-to-Owner Communication Channels",
                  "No Hidden Brokerage Fees or Surprises"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-[#B68B39]/10 border border-[#B68B39]/20 flex items-center justify-center text-[#B68B39] transition-all group-hover:bg-[#B68B39] group-hover:text-white">
                      <FaCheck className="text-xs" />
                    </div>
                    <span className="font-bold text-sm md:text-base text-brand-dark">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side: 4 Rounded Grid Images */}
          <div className="w-full lg:w-[50%] grid grid-cols-2 gap-5">
            {/* Top Left: Glass Building */}
            <div className="rounded-[28px] overflow-hidden shadow-lg aspect-square border-2 border-white hover:scale-103 transition-transform duration-300">
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600" alt="Office Building" className="w-full h-full object-cover" />
            </div>

            {/* Top Right: Keys */}
            <div className="rounded-[28px] overflow-hidden shadow-lg aspect-square border-2 border-white hover:scale-103 transition-transform duration-300 mt-6">
              <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600" alt="Gold Keys" className="w-full h-full object-cover" />
            </div>

            {/* Bottom Left: Apartment */}
            <div className="rounded-[28px] overflow-hidden shadow-lg aspect-square border-2 border-white hover:scale-103 transition-transform duration-300 -mt-6">
              <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600" alt="Apartment Highrise" className="w-full h-full object-cover" />
            </div>

            {/* Bottom Right: Modern Living Room */}
            <div className="rounded-[28px] overflow-hidden shadow-lg aspect-square border-2 border-white hover:scale-103 transition-transform duration-300">
              <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600" alt="Modern Living Room" className="w-full h-full object-cover" />
            </div>
          </div>

        </div>
      </section>

      {/* 4. The Excellence We Offer Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200/80 shadow-sm mb-6 mx-auto">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-widest flex items-center gap-1.5">
              <FaArrowRight className="text-[10px] text-[#B68B39] rotate-[-45deg]" /> Why Paband?
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-brand-dark mb-4">
            The Excellence We Offer
          </h2>
        </motion.div>

        {/* 4 Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              title: "Verified Listings",
              desc: "No ghost listings. Every property is visited and verified by our field agents.",
              icon: <FaSlidersH className="text-2xl" />
            },
            {
              title: "Secure Contracts",
              desc: "Digitally signed, legally binding tenancy agreements compliant with local laws.",
              icon: <FaFileContract className="text-2xl" />
            },
            {
              title: "Market Expertise",
              desc: "Local insights and valuation data to help you make informed decisions.",
              icon: <FaHandshake className="text-2xl" />
            },
            {
              title: "24/7 Concierge",
              desc: "Dedicated support for both tenants and landlords throughout the lease period.",
              icon: <FaHeadset className="text-2xl" />
            }
          ].map((card, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              className="bg-white p-8 rounded-[36px] shadow-lg border border-gray-100 flex flex-col items-start text-left relative overflow-hidden group min-h-[280px]"
            >
              {/* Icon Container with gold round decoration */}
              <div className="w-12 h-12 rounded-xl bg-[#B68B39]/10 text-[#B68B39] flex items-center justify-center mb-6 transition-all group-hover:bg-[#B68B39] group-hover:text-white">
                {card.icon}
              </div>

              <h4 className="text-xl font-extrabold text-brand-dark mb-3 tracking-tight">{card.title}</h4>
              <p className="text-gray-500 font-medium text-sm leading-relaxed mb-8">{card.desc}</p>

              {/* Bottom Right Golden Circle Arrow */}
              <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-[#B68B39] text-white flex items-center justify-center shadow-md hover:bg-[#9B742E] transition-all hover:scale-110 cursor-pointer">
                <FaArrowRight className="text-xs rotate-[-45deg]" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. What We Focus On Section (Community Image Backdrop) */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Image of Suburban Community */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000')" 
          }}
        >
          {/* Subtle dark tint to improve contrast */}
          <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"></div>
        </div>

        {/* Content Box */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left Glassmorphic Container */}
          <div className="w-full lg:w-[48%] bg-white/70 backdrop-blur-lg border border-white/40 p-8 md:p-12 rounded-[40px] shadow-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200/50 shadow-sm mb-6">
              <span className="text-xs font-bold text-gray-600 uppercase tracking-widest flex items-center gap-1.5">
                <FaArrowRight className="text-[10px] text-[#B68B39] rotate-[-45deg]" /> Our Mission & Vision
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-brand-dark mb-6">
              What We Focus On
            </h2>

            <p className="text-gray-700 leading-relaxed font-semibold text-sm md:text-base">
              We aim to simplify the entire rental process through robust documentation, tenant verification, and ongoing management, ensuring every interaction is secure, reliable, and hassle-free.
            </p>
          </div>

          {/* Right Cards: 4 highlights */}
          <div className="w-full lg:w-[52%] grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Structured Rental System", icon: <FaClipboardList className="text-[#B68B39] text-xl" /> },
              { title: "Verified Tenant Screening System", icon: <FaUserShield className="text-[#B68B39] text-xl" /> },
              { title: "Transparent Agreements", icon: <FaRegHandshake className="text-[#B68B39] text-xl" /> },
              { title: "Expanding Across Pakistan", icon: <FaGlobeAsia className="text-[#B68B39] text-xl" /> }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 rounded-[24px] shadow-xl flex items-center gap-5 border border-white hover:scale-102 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#B68B39]/10 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <span className="font-extrabold text-sm md:text-base text-brand-dark tracking-tight leading-snug">{item.title}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Our Future Roadmap Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Side Roadmap Info */}
          <div className="w-full lg:w-[50%]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200/80 shadow-sm mb-6">
                <span className="text-xs font-bold text-gray-600 uppercase tracking-widest flex items-center gap-1.5">
                  <FaArrowRight className="text-[10px] text-[#B68B39] rotate-[-45deg]" /> New Roadmap
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold text-brand-dark mb-6 leading-tight">
                Now introduced<br />
                Our Future Roadmap
              </h2>

              <p className="text-gray-600 font-medium leading-relaxed mb-8 text-sm md:text-base">
                Paband was created to solve the everyday challenges people face in Pakistan's real estate market: fake listings, lack of trust, and complicated processes. We're starting with Karachi to build a platform that truly understands local needs and delivers a trustworthy property experience.
              </p>

              {/* Roadmap Bullet points */}
              <div className="space-y-4 mb-8">
                {[
                  "Pakistan first digital property rental and management services",
                  "Soon we will expand to major cities",
                  "Will scale gradually nationwide."
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <span className="w-3 h-3 rounded-full bg-[#B68B39] mt-1.5 shrink-0"></span>
                    <span className="text-brand-dark font-bold text-sm md:text-base leading-snug">{item}</span>
                  </div>
                ))}
              </div>

              {/* Button & headset pill row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <button className="px-8 py-3 rounded-xl bg-[#B68B39] text-white font-extrabold text-sm shadow-md hover:bg-[#9B742E] transition-all duration-300">
                  View Details
                </button>
                
                {/* How can we help you pill */}
                <div className="flex items-center gap-3 px-5 py-2.5 bg-white rounded-full shadow-lg border border-gray-100 hover:scale-105 transition-all select-none">
                  <span className="text-xs font-bold text-[#1E3A5F]">How can we help you?</span>
                  <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0">
                    <FaHeadset className="text-[10px]" />
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

          {/* Right Side Overlapping Mosque/Monument Images */}
          <div className="w-full lg:w-[50%] relative flex justify-center py-6">
            {/* Background Mosque/Minar */}
            <div className="w-[85%] aspect-[1.3] rounded-[36px] overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200" 
                alt="Lahore Monument Sunset" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Foreground Faisal Mosque Card Overlay */}
            <div className="absolute top-[-20px] right-4 w-[60%] aspect-[1.4] rounded-[28px] overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800" 
                alt="Faisal Mosque Islamabad" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default AboutPage;
