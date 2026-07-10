import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const ContactSection = () => {
  return (
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
            Get in Touch <br/> with Us
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
  );
};

export default ContactSection;
