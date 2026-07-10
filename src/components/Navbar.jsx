import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;
  const isSubpage = currentPath !== '/';

  const getStoredAuth = () => {
    const token = window.localStorage.getItem('accessToken') || window.localStorage.getItem('token');
    const raw = window.localStorage.getItem('user');
    let user = null;
    if (raw) {
      try { user = JSON.parse(raw); } catch { user = null; }
    }
    return { token, user };
  };

  const handleLoginClick = () => {
    const { token, user } = getStoredAuth();
    if (token && user) {
      const role = (user.role || '').toLowerCase();
      if (role === 'owner') return navigate('/owner');
      if (role === 'tenant') return navigate('/tenant');
      return navigate('/');
    }

    // not logged in -> go to auth page
    navigate('/auth');
  };

  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // Helper to handle navigation for mobile
  const handleMobileNav = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSubpage
      ? 'bg-white text-brand-dark shadow-md border-b border-gray-100'
      : 'bg-white/10 backdrop-blur-md text-white border-b border-white/10'
      }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Exact Logo Mockup from Screenshot */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer select-none">
          {/* Custom SVG Diamond House Logo - 3D Animated */}
          <motion.div
            className="relative w-10 h-10 flex items-center justify-center shrink-0"
            style={{ perspective: 1000 }}
            whileHover={{ scale: 1.1 }}
          >
            {/* Diamond Shield Border */}
            <motion.div
              className={`absolute inset-0 border-2 rounded-xl rotate-45 transition-colors duration-300 ${isSubpage ? 'border-[#1E3A5F]' : 'border-white'}`}
              animate={{ rotateZ: [45, 405] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            {/* 3D Spinning Inner Shield */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              {/* House roof & gold tick checkmark */}
              <svg className="w-6 h-6 z-10 drop-shadow-md" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12l9-9 9 9" stroke={isSubpage ? "#16A34A" : "#4ADE80"} />
                <path d="M9 21v-6a3 3 0 0 1 6 0v6" stroke={isSubpage ? "#16A34A" : "#4ADE80"} />
                <path d="M8 12l3 3 5-5" stroke="#B68B39" strokeWidth="3" />
              </svg>
            </motion.div>
          </motion.div>

          <div className="flex flex-col">
            <div className="flex items-baseline">
              <span className={`font-extrabold text-xl tracking-tight transition-colors duration-300 ${isSubpage ? 'text-[#1E3A5F]' : 'text-white'
                }`}>paband</span>
              <span className="text-[#16A34A] font-extrabold text-xl">.pk</span>
            </div>
            <span className={`text-[7px] font-bold tracking-[0.25em] -mt-1 opacity-70 transition-colors duration-300 ${isSubpage ? 'text-gray-500' : 'text-gray-200'
              }`}>DIGITAL RENTAL SYSTEM</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-semibold text-sm">
          <Link
            to="/"
            className={`transition-colors py-2 relative group ${currentPath === '/'
              ? (isSubpage ? 'text-[#B68B39]' : 'text-white')
              : (isSubpage ? 'text-[#1E3A5F] hover:text-[#B68B39]' : 'text-gray-200 hover:text-white')
              }`}
          >
            Home
            {currentPath === '/' && (
              <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B68B39]" />
            )}
          </Link>

          <Link
            to="/about"
            className={`transition-colors py-2 relative group ${currentPath === '/about'
              ? 'text-[#B68B39]'
              : (isSubpage ? 'text-[#1E3A5F] hover:text-[#B68B39]' : 'text-gray-200 hover:text-white')
              }`}
          >
            About Us
            {currentPath === '/about' && (
              <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B68B39]" />
            )}
          </Link>

          <Link
            to="/properties"
            className={`transition-colors py-2 relative group ${currentPath === '/properties'
              ? 'text-[#B68B39]'
              : (isSubpage ? 'text-[#1E3A5F] hover:text-[#B68B39]' : 'text-gray-200 hover:text-white')
              }`}
          >
            Properties
            {currentPath === '/properties' && (
              <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B68B39]" />
            )}
          </Link>
          <Link
            to="/features"
            className={`transition-colors py-2 relative group ${currentPath === '/features'
              ? 'text-[#B68B39]'
              : (isSubpage ? 'text-[#1E3A5F] hover:text-[#B68B39]' : 'text-gray-200 hover:text-white')
              }`}
          >
            Features
            {currentPath === '/features' && (
              <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B68B39]" />
            )}
          </Link>

          <Link
            to="/contact"
            className={`transition-colors py-2 relative group ${currentPath === '/contact'
              ? 'text-[#B68B39]'
              : (isSubpage ? 'text-[#1E3A5F] hover:text-[#B68B39]' : 'text-gray-200 hover:text-white')
              }`}
          >
            Contact
            {currentPath === '/contact' && (
              <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B68B39]" />
            )}
          </Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://wa.me/923000000000"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 hover:scale-105 ${isSubpage
              ? 'bg-white border-gray-200 text-[#16A34A] hover:bg-gray-50 shadow-sm'
              : 'bg-white/20 border-white/30 text-green-400 hover:bg-white/30'
              }`}
          >
            <FaWhatsapp className="text-xl" />
          </a>

          <button
            onClick={handleLoginClick}
            className={`px-6 py-2 rounded-lg border font-semibold text-sm transition-all duration-300 ${isSubpage
              ? 'border-gray-300 text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white'
              : 'border-white/50 text-white hover:bg-white hover:text-brand-dark'
              }`}>
            Login
          </button>

          <button className="px-6 py-2.5 rounded-lg bg-[#B68B39] text-white font-bold text-sm shadow-md hover:bg-[#9B742E] transition-all duration-300 hover:shadow-lg">
            List Your Property
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex md:hidden items-center gap-3">
          <a
            href="https://wa.me/923000000000"
            className={`w-9 h-9 rounded-full flex items-center justify-center border ${isSubpage ? 'border-gray-200 text-[#16A34A]' : 'border-white/30 text-green-400'
              }`}
          >
            <FaWhatsapp className="text-lg" />
          </a>
          <button
            onClick={toggleMenu}
            className={`p-2 rounded-lg transition-colors ${isSubpage ? 'text-[#1E3A5F] hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
          >
            {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white text-[#1E3A5F] border-t border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4 font-semibold text-sm">
              <button
                onClick={() => handleMobileNav('/')}
                className={`text-left py-2 border-b border-gray-50 ${currentPath === '/' ? 'text-[#B68B39]' : ''}`}
              >
                Home
              </button>
              <button
                onClick={() => handleMobileNav('/about')}
                className={`text-left py-2 border-b border-gray-50 ${currentPath === '/about' ? 'text-[#B68B39]' : ''}`}
              >
                About Us
              </button>
              <button
                onClick={() => handleMobileNav('/properties')}
                className={`text-left py-2 border-b border-gray-50 ${currentPath === '/properties' ? 'text-[#B68B39]' : ''}`}
              >
                Properties
              </button>
              <button
                onClick={() => handleMobileNav('/features')}
                className={`text-left py-2 border-b border-gray-50 ${currentPath === '/features' ? 'text-[#B68B39]' : ''}`}
              >
                Features
              </button>
              <button
                onClick={() => handleMobileNav('/contact')}
                className={`text-left py-2 border-b border-gray-50 ${currentPath === '/contact' ? 'text-[#B68B39]' : ''}`}
              >
                Contact
              </button>

              <div className="flex flex-col gap-3 pt-2">
                <button onClick={() => { setIsOpen(false); handleLoginClick(); }} className="w-full py-2.5 rounded-lg border border-gray-300 text-[#1E3A5F] font-semibold text-center hover:bg-gray-50">
                  Login
                </button>
                <button className="w-full py-2.5 rounded-lg bg-[#B68B39] text-white font-bold text-center hover:bg-[#9B742E]">
                  List Your Property
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
