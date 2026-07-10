import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaLock, FaTag, FaChartLine } from 'react-icons/fa';

const items = [
  { icon: <FaShieldAlt />, label: 'VERIFIED LISTINGS' },
  { icon: <FaLock />,      label: 'SECURE TRANSACTIONS' },
  { icon: <FaTag />,       label: 'TRANSPARENT PRICING' },
  { icon: <FaChartLine />, label: 'MARKET EXPERTISE' },
];

const FeaturesBar = () => (
  <section className="bg-gradient-to-r from-[#F8F3EA] via-[#F5EDDF] to-[#F0E6D2] border-t border-[#E8DCC8]">
    <div className="max-w-6xl mx-auto px-6 py-7 grid grid-cols-2 md:grid-cols-4 gap-6">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="flex items-center justify-center gap-3"
        >
          <span className="text-[#B68B39] text-xl">{item.icon}</span>
          <span className="text-[#1E3A5F] font-bold text-xs tracking-[0.12em] uppercase">
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  </section>
);

export default FeaturesBar;
