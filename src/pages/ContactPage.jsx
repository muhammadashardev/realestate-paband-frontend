import React, { useEffect } from 'react';
import { 
  FaWhatsapp, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaPaperPlane,
  FaStar,
  FaClock,
  FaCheck
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#F8F3EA] min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative h-[600px] flex flex-col items-center justify-center text-center px-4">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Modern house at dusk" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl mx-auto ">
          <div className="text-white/80 text-sm font-semibold mb-4 tracking-wide">
            <span className="cursor-pointer hover:text-white transition" onClick={() => navigate('/')}>Home</span> 
            <span className="mx-2">&gt;</span> 
            <span className="text-white">Contact</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">We're Here to Help You</h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed font-medium">
            Whether you're looking for your dream rental or want to list your premium property, our team at Paband.pk is ready to assist you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/923000000000" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 bg-[#B68B39] text-white font-bold rounded-xl shadow-lg hover:bg-[#9B742E] transition-all flex items-center justify-center gap-3 text-lg">
              <FaWhatsapp className="text-xl" /> Chat on WhatsApp
            </a>
            <a href="tel:+923000000000" className="px-8 py-3.5 bg-white text-[#1E3A5F] font-bold rounded-xl shadow-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-3 text-lg">
              <FaPhoneAlt className="text-lg" /> Call Support Now
            </a>
          </div>
        </div>
      </section>

      {/* Contact Cards Section (Overlapping) */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 -mt-24 md:-mt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Call Us */}
          <div className="bg-white rounded-[24px] p-8 flex flex-col items-center text-center shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100/50">
            <div className="w-14 h-14 rounded-full bg-[#B68B39]/10 flex items-center justify-center mb-5">
              <FaPhoneAlt className="text-[#B68B39] text-xl" />
            </div>
            <h3 className="text-xl font-extrabold text-[#1E3A5F] mb-3">Call Us</h3>
            <p className="text-gray-500 text-sm font-medium mb-6 leading-relaxed flex-grow">Immediate support for urgent inquiries.</p>
            <p className="text-[#B68B39] font-bold text-lg">+92 21 34567890</p>
          </div>

          {/* Card 2: WhatsApp */}
          <div className="bg-white rounded-[24px] p-8 flex flex-col items-center text-center shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100/50">
            <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mb-5">
              <FaWhatsapp className="text-green-500 text-2xl" />
            </div>
            <h3 className="text-xl font-extrabold text-[#1E3A5F] mb-3">WhatsApp</h3>
            <p className="text-gray-500 text-sm font-medium mb-6 leading-relaxed flex-grow">The fastest way to get a response.</p>
            <a href="https://wa.me/923000000000" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-[#B68B39] text-white font-bold rounded-xl hover:bg-[#9B742E] transition-colors text-sm shadow-md">
              Chat Now
            </a>
          </div>

          {/* Card 3: Email */}
          <div className="bg-white rounded-[24px] p-8 flex flex-col items-center text-center shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100/50">
            <div className="w-14 h-14 rounded-full bg-[#B68B39]/10 flex items-center justify-center mb-5">
              <FaEnvelope className="text-[#B68B39] text-xl" />
            </div>
            <h3 className="text-xl font-extrabold text-[#1E3A5F] mb-3">Email</h3>
            <p className="text-gray-500 text-sm font-medium mb-6 leading-relaxed flex-grow">Send us a detailed message.</p>
            <p className="text-[#1E3A5F] font-bold">support@paband.pk</p>
          </div>

          {/* Card 4: Visit Us */}
          <div className="bg-white rounded-[24px] p-8 flex flex-col items-center text-center shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100/50">
            <div className="w-14 h-14 rounded-full bg-[#B68B39]/10 flex items-center justify-center mb-5">
              <FaMapMarkerAlt className="text-[#B68B39] text-xl" />
            </div>
            <h3 className="text-xl font-extrabold text-[#1E3A5F] mb-3">Visit Us</h3>
            <p className="text-gray-500 text-sm font-medium mb-6 leading-relaxed flex-grow">Meet our team in person.</p>
            <p className="text-[#1E3A5F] font-bold text-sm">DHA Phase 1, Karachi</p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          {/* Left: Form */}
          <div className="flex-1 w-full">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E3A5F] mb-4">Send us a message</h2>
            <p className="text-gray-500 font-medium mb-10 leading-relaxed max-w-lg">
              Fill out the form below and our team will get back to you within 2 business hours. Your property journey starts here.
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-gray-800 uppercase tracking-wider">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full px-5 py-4 rounded-xl bg-white border-none shadow-[0_2px_10px_rgba(0,0,0,0.02)] focus:ring-2 focus:ring-[#B68B39] focus:outline-none transition-all placeholder-gray-400 font-medium text-gray-800" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-gray-800 uppercase tracking-wider">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full px-5 py-4 rounded-xl bg-white border-none shadow-[0_2px_10px_rgba(0,0,0,0.02)] focus:ring-2 focus:ring-[#B68B39] focus:outline-none transition-all placeholder-gray-400 font-medium text-gray-800" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-800 uppercase tracking-wider">Phone Number</label>
                <input type="tel" placeholder="+92 300 0000000" className="w-full px-5 py-4 rounded-xl bg-white border-none shadow-[0_2px_10px_rgba(0,0,0,0.02)] focus:ring-2 focus:ring-[#B68B39] focus:outline-none transition-all placeholder-gray-400 font-medium text-gray-800" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-800 uppercase tracking-wider">How can we help?</label>
                <textarea rows="5" placeholder="I am interested in..." className="w-full px-5 py-4 rounded-xl bg-white border-none shadow-[0_2px_10px_rgba(0,0,0,0.02)] focus:ring-2 focus:ring-[#B68B39] focus:outline-none transition-all placeholder-gray-400 font-medium text-gray-800 resize-none"></textarea>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
                <button type="button" className="w-full sm:w-auto px-8 py-4 bg-[#B68B39] text-white font-bold rounded-xl hover:bg-[#9B742E] transition-all flex items-center justify-center gap-3 shadow-lg">
                  Submit Message <FaPaperPlane className="text-sm" />
                </button>
                <p className="text-xs text-gray-500 font-medium flex-1 text-center sm:text-left">
                  By submitting, you agree to our <a href="#" className="text-[#B68B39] hover:underline">Privacy Policy</a>.
                </p>
              </div>
            </form>
          </div>

          {/* Right: Image and Testimonial */}
          <div className="flex-1 w-full relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 lg:left-12 lg:translate-x-0 z-10 w-12 h-12 rounded-full border-4 border-[#F8F3EA] overflow-hidden shadow-lg bg-white flex items-center justify-center">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            
            <div className="rounded-[32px] overflow-hidden relative shadow-2xl h-[500px] lg:h-[600px] w-full">
              <img src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Beautiful house" className="w-full h-full object-cover" />
              
              {/* Testimonial Overlay */}
              <div className="absolute bottom-6 left-6 right-12 bg-white/95 backdrop-blur-sm rounded-[24px] p-6 shadow-xl max-w-[320px]">
                <div className="flex text-[#F59E0B] gap-1 mb-3 text-sm">
                  <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                </div>
                <p className="text-[#1E3A5F] font-bold text-[15px] italic leading-snug mb-3">
                  "Paband.pk made finding a house in Karachi so effortless."
                </p>
                <p className="text-gray-500 text-sm font-semibold">— Ahmed Siddiqui</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How your inquiry is handled */}
      <section className="bg-[#111827] py-24 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">How your inquiry is handled</h2>
          <p className="text-gray-400 font-medium mb-20 max-w-2xl mx-auto">
            We take every request seriously and route it to the right department immediately.
          </p>

          <div className="relative flex flex-col md:flex-row justify-between items-center md:items-start gap-12 md:gap-0">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-[2px] bg-white/10 z-0"></div>

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center flex-1">
              <div className="w-16 h-16 rounded-full bg-[#B68B39]/20 border border-[#B68B39]/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(182,139,57,0.2)]">
                <FaPaperPlane className="text-[#B68B39] text-xl" />
              </div>
              <h4 className="text-white font-bold text-lg mb-2">Submitted</h4>
              <p className="text-gray-500 text-xs font-medium max-w-[140px]">Request received instantly</p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center flex-1">
              <div className="w-16 h-16 rounded-full bg-[#B68B39]/20 border border-[#B68B39]/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(182,139,57,0.2)]">
                <svg className="w-6 h-6 text-[#B68B39]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" opacity="0"/>
                  <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.53 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                </svg>
              </div>
              <h4 className="text-white font-bold text-lg mb-2">Routed</h4>
              <p className="text-gray-500 text-xs font-medium max-w-[140px]">Sent to specialized team</p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center flex-1">
              <div className="w-16 h-16 rounded-full bg-[#B68B39]/20 border border-[#B68B39]/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(182,139,57,0.2)]">
                <svg className="w-6 h-6 text-[#B68B39]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <h4 className="text-white font-bold text-lg mb-2">Assigned</h4>
              <p className="text-gray-500 text-xs font-medium max-w-[140px]">Personal manager assigned</p>
            </div>

            {/* Step 4 */}
            <div className="relative z-10 flex flex-col items-center flex-1">
              <div className="w-16 h-16 rounded-full bg-[#B68B39]/20 border border-[#B68B39]/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(182,139,57,0.2)]">
                <FaCheck className="text-[#B68B39] text-xl" />
              </div>
              <h4 className="text-white font-bold text-lg mb-2">Response</h4>
              <p className="text-gray-500 text-xs font-medium max-w-[140px]">Expert answer in hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Come Visit Us Section */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="bg-[#F2EADB] rounded-[32px] p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12 shadow-sm border border-[#E8DFC9]">
          
          {/* Left Details */}
          <div className="flex-1 w-full text-left">
            <h5 className="text-[#B68B39] font-bold text-xs tracking-[0.2em] uppercase mb-4">Head Office</h5>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E3A5F] mb-10">Come visit us</h2>
            
            <div className="space-y-8">
              {/* Detail 1 */}
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-[#B68B39]/20 flex items-center justify-center shrink-0 mt-1">
                  <FaMapMarkerAlt className="text-[#B68B39] text-lg" />
                </div>
                <div>
                  <h4 className="text-[#1E3A5F] font-extrabold text-lg mb-1">Karachi Office</h4>
                  <p className="text-gray-600 font-medium text-sm">DHA Phase 2, Karachi, Pakistan</p>
                </div>
              </div>
              
              {/* Detail 2 */}
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-[#B68B39]/20 flex items-center justify-center shrink-0 mt-1">
                  <FaClock className="text-[#B68B39] text-lg" />
                </div>
                <div>
                  <h4 className="text-[#1E3A5F] font-extrabold text-lg mb-1">Working Hours</h4>
                  <p className="text-gray-600 font-medium text-sm">Available on 24/7</p>
                </div>
              </div>
              
              {/* Detail 3 */}
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-[#B68B39]/20 flex items-center justify-center shrink-0 mt-1">
                  <FaPhoneAlt className="text-[#B68B39] text-lg" />
                </div>
                <div>
                  <h4 className="text-[#1E3A5F] font-extrabold text-lg mb-1">Contact Numbers</h4>
                  <p className="text-gray-600 font-medium text-sm">+92 21 111-PABAND<br/>+92 300 1234567</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Map Image */}
          <div className="flex-1 w-full h-[350px] md:h-[400px] relative rounded-[24px] overflow-hidden shadow-lg border-4 border-white">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80" alt="Map" className="w-full h-full object-cover filter contrast-125 sepia-[.3]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1E3A5F] text-white px-4 py-2 rounded-lg font-bold text-xs shadow-xl flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#B68B39]" /> Paband.pk HQ
            </div>
          </div>

        </div>
      </section>

      {/* Footer Padding Adjustment (since Footer has relative mt-40 and overlapping newsletter) */}
      <div className="h-12"></div>
    </div>
  );
};

export default ContactPage;
