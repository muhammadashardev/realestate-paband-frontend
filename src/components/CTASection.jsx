import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' },
  }),
};
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();
  return (
  <section className="py-20 md:py-24 bg-[#112338]">
    <div className="max-w-3xl mx-auto px-6 text-center">
      <motion.h2
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        className="text-4xl md:text-[48px] font-extrabold text-white leading-tight mb-5"
      >
        Start Renting with<br />Confidence Today
      </motion.h2>
      <motion.p
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
        className="text-gray-400 text-sm leading-relaxed mb-10 font-medium"
      >
        Join thousands of property owners and tenants who have simplified<br className="hidden sm:block" />
        their rental experience with Paband.pk.
      </motion.p>
      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <button 
            onClick={() => navigate('/properties')}
            className="px-8 py-4 bg-brand-gold text-white font-bold rounded-lg hover:bg-yellow-600 transition-colors shadow-lg shadow-brand-gold/30 w-full sm:w-auto"
          >
          Browse Properties
        </button>
        <button className="px-8 py-3.5 rounded-full bg-transparent text-white font-bold text-sm border-2 border-white/40 hover:bg-white hover:text-[#112338] transition-all duration-300">
          List Your Property
        </button>
      </motion.div>
    </div>
  </section>
  );
};

export default CTASection;
