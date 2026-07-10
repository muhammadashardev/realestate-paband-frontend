import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative mt-40 bg-[#112338] pt-36 pb-8 text-white">

      {/* Newsletter Subscription Banner (Overlapping) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl px-6">
        <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-2xl border border-gray-100/50 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="text-3xl font-extrabold text-brand-dark mb-2">Subscribe Our Newsletter</h3>
            <p className="text-gray-500 font-semibold">Ready to Simplify Your Rental Experience?</p>
          </div>
          <div className="flex w-full md:w-auto max-w-md bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden p-1.5 focus-within:border-[#B68B39] transition-all">
            <input
              type="email"
              placeholder="Enter email address here"
              className="w-full px-4 py-3 bg-transparent text-brand-dark font-semibold text-sm focus:outline-none placeholder-gray-400"
            />
            <button className="px-6 py-3 bg-[#B68B39] text-white font-bold rounded-xl hover:bg-[#9B742E] transition-colors whitespace-nowrap text-sm shadow-md">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/10 pb-16">
        {/* Brand Col */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-3 mb-6 select-none">
            {/* Custom SVG Diamond House Logo */}
            <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
              <div className="absolute inset-0 border border-white/80 rounded-lg rotate-45"></div>
              <svg className="w-5 h-5 z-10" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12l9-9 9 9" stroke="#4ADE80" />
                <path d="M9 21v-6a3 3 0 0 1 6 0v6" stroke="#4ADE80" />
                <path d="M8 12l3 3 5-5" stroke="#B68B39" strokeWidth="3" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span className="font-extrabold text-lg tracking-tight text-white">paband</span>
                <span className="text-[#16A34A] font-extrabold text-lg">.pk</span>
              </div>
              <span className="text-[6px] font-bold tracking-[0.25em] -mt-1 text-gray-300">DIGITAL RENTAL SYSTEM</span>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-sm font-medium">
            We aim to eliminate confusion, reduce disputes, and bring complete clarity to rental transactions.
          </p>

          {/* Social media icons with gold rounded circle matching screenshot */}
          <div className="flex gap-4">
            {[
              { icon: <FaFacebookF />, url: "#" },
              { icon: <FaInstagram />, url: "#" },
              { icon: <FaTwitter />, url: "#" },
              { icon: <FaLinkedinIn />, url: "#" }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                className="w-10 h-10 rounded-full border border-gray-400/30 bg-[#B68B39] text-white flex items-center justify-center hover:bg-[#9B742E] transition-all hover:scale-105 shadow-md"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Contact Us Col */}
        <div className="bg-white/5 rounded-[32px] p-8 border border-white/5 shadow-xl backdrop-blur-sm">
          <h4 className="text-xl font-extrabold mb-6 text-[#B68B39] text-center tracking-tight">Contact Us</h4>
          <div className="space-y-4 text-xs md:text-sm font-semibold">
            {/* Email */}
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#B68B39] flex items-center justify-center shrink-0 shadow-md">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <span className="text-gray-200">info@paband.pk</span>
            </div>
            {/* Address */}
            <div className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#B68B39] flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <span className="text-gray-200 leading-relaxed">Office 302, 3rd Floor, Al-Khaleej Tower, Shaheed-e-Millat Road, Karachi, Pakistan</span>
            </div>
            {/* Phone */}
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#B68B39] flex items-center justify-center shrink-0 shadow-md">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <span className="text-gray-200">+92 (300) 123-4567 / +92 (21) 3456-7890</span>
            </div>
          </div>
        </div>

        {/* Quick Links Col */}
        <div className="pl-0 md:pl-12 flex flex-col items-start md:items-center">
          <div className="text-left">
            <h4 className="text-xl font-extrabold mb-6 text-[#B68B39] tracking-tight">Quick Links</h4>
            <ul className="space-y-4 text-sm font-semibold text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-xs text-[#B68B39]">&gt;</span> Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-xs text-[#B68B39]">&gt;</span> Listing</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-xs text-[#B68B39]">&gt;</span> Property</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-xs text-[#B68B39]">&gt;</span> Blog</a></li>
              <li><a href="/owner" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-xs text-[#B68B39]">&gt;</span> Owner Dashboard</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 font-semibold">
        <div className="flex items-center gap-3 mb-4 md:mb-0 select-none">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center text-white font-extrabold text-sm shadow-md">C</div>
            <span className="leading-snug">Designed and hosted by <br /><span className="font-extrabold text-white">Codesinc.</span></span>
          </div>
        </div>
        <p className="text-center md:text-left">© 2026 paband.pk — All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
