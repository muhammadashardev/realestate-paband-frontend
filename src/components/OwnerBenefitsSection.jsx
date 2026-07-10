import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaUserShield, FaClipboardList, FaChartLine, FaLock } from 'react-icons/fa';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' },
  }),
};

const ownerCards = [
  { icon: <FaUserShield />,   title: 'Verified Tenants',  desc: 'AI-driven matching with credit checks and identity verification for peace of mind.', color: '#B68B39' },
  { icon: <FaClipboardList />, title: 'Easy Listing',      desc: 'Smart listing tools that optimize your property details for maximum visibility.',     color: '#16A34A' },
  { icon: <FaChartLine />,    title: 'Rental Insights',   desc: 'Real-time market analytics to help you price your property competitively.',           color: '#1E3A5F' },
  { icon: <FaLock />,         title: 'Secure Payments',   desc: 'AI-driven matching with credit checks and identity verification for peace of mind.', color: '#B68B39' },
];

const OwnerBenefitsSection = () => (
  <section className="py-20 md:py-28 bg-[#F8F3EA]">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

        {/* Left – text + property image */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mb-6 shadow-sm border border-gray-100">
            <FaShieldAlt className="text-[#1E3A5F] text-xs" />
            <span className="text-xs font-bold text-[#1E3A5F] tracking-wide">Owner benefits</span>
          </div>
          <h2 className="text-4xl md:text-[44px] font-extrabold text-[#1E3A5F] leading-tight mb-5">
            Built for Property<br />Owners
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-md font-medium">
            Maximize your rental yields while minimizing management stress with our integrated landlord suite.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full max-w-[380px] aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white"
          >
            <img src="/white_villa.png" alt="Property" className="w-full h-full object-cover" />
          </motion.div>
        </motion.div>

        {/* Right – 2×2 card grid */}
        <div className="grid grid-cols-2 gap-5 self-center">
          {ownerCards.map((card, i) => (
            <motion.div
              key={i} custom={i}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100/80 hover:shadow-lg transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${card.color}18` }}
              >
                <span style={{ color: card.color }} className="text-xl">{card.icon}</span>
              </div>
              <h4 className="font-bold text-[#1E3A5F] text-[15px] mb-2">{card.title}</h4>
              <p className="text-gray-500 text-xs leading-relaxed font-medium">{card.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  </section>
);

export default OwnerBenefitsSection;
