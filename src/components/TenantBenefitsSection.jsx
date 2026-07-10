import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaCheckCircle, FaMoneyBillWave, FaSearch } from 'react-icons/fa';
import { getProperties } from '../utils/propertyService';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' },
  }),
};

const tenantFeatures = [
  {
    icon: <FaCheckCircle />,
    title: 'Verified Listings Only',
    desc: 'Every property undergoes a strict verification process to prevent fraud.',
  },
  {
    icon: <FaMoneyBillWave />,
    title: 'No Hidden Charges',
    desc: 'Transparent fee structure with no surprise brokerage costs or hidden taxes.',
  },
  {
    icon: <FaSearch />,
    title: 'Smart Search Filters',
    desc: 'Find exactly what you need with advanced neighborhood and amenity filters.',
  },
];
const fetchProperties = async () => {
  try {
    const properties = await getProperties();
    console.log('Fetched properties:', properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
  }
}

const TenantBenefitsSection = () => (
  <section className="py-20 md:py-28 bg-[#F8F3EA]">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
        {/* Left */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mb-6 shadow-sm border border-gray-100">
            <FaShieldAlt className="text-[#1E3A5F] text-xs" />
            <span className="text-xs font-bold text-[#1E3A5F] tracking-wide">Tenant benefits</span>
          </div>
          <h2 className="text-4xl md:text-[44px] font-extrabold text-[#1E3A5F] leading-tight mb-5">
            Designed for Tenants
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-md font-medium">
            Find your next home with confidence using our tenant-centric browsing and booking platform.
          </p>
          <div className="space-y-5">
            {tenantFeatures.map((f, i) => (
              <motion.div
                key={i} custom={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100/80 hover:shadow-md transition-shadow"
              >
                
                <div>
                  <h4 className="font-bold text-[#1E3A5F] text-[15px] mb-1">{f.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed font-medium">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right – stacked images */}
        <div className="relative flex justify-end items-start mt-8 lg:mt-16 min-h-[420px]">
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
            className="w-[58%] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10"
          >
            <img src="/city_night_view.png" alt="City night view" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }}
            className="absolute left-0 top-[38%] w-[58%] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-20"
          >
            <img src="/white_villa.png" alt="Modern villa" className="w-full h-full object-cover" />
          </motion.div>
          <div className="absolute bottom-[8%] right-[10%] w-24 h-24 rounded-full bg-[#B68B39]/20 z-0" />
        </div>
      </div>
    </div>
  </section>
);

export default TenantBenefitsSection;
