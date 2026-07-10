import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

const FeatureCard = ({ title, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-brand-dark/50 border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors"
  >
    <div className="w-12 h-12 rounded-full bg-[#B68B39] flex items-center justify-center mb-4 text-white">
      <FaCheck />
    </div>
    <h4 className="text-white font-medium text-sm md:text-base leading-snug">
      {title.split('\\n').map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i !== title.split('\\n').length - 1 && <br />}
        </React.Fragment>
      ))}
    </h4>
  </motion.div>
);

const WhyChooseSection = () => {
  return (
    <section className="bg-[#112338] py-20 px-8 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        
        {/* Left Side: Images Collage */}
        <div className="w-full lg:w-1/2 relative h-[600px] flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="absolute left-0 bottom-10 w-2/3 h-2/3 rounded-3xl overflow-hidden shadow-2xl z-10"
          >
            <img 
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1935&auto=format&fit=crop" 
              alt="City view" 
              className="w-full h-full object-cover"
            />
            {/* Join Us Badge */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-xl py-3 px-6 shadow-lg flex flex-col items-center gap-2 w-[80%] max-w-[200px]">
              <span className="text-sm font-bold text-brand-text whitespace-nowrap">10k+ People Join us</span>
              <div className="flex -space-x-3">
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=1" alt="User" />
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=2" alt="User" />
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=3" alt="User" />
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=4" alt="User" />
                <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-900 text-white flex items-center justify-center text-xs font-bold z-10">+</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="absolute right-0 top-10 w-1/2 h-[80%] rounded-3xl overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1600607687931-cebf10cb4cb0?q=80&w=2070&auto=format&fit=crop" 
              alt="Modern building" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Right Side: Features */}
        <div className="w-full lg:w-1/2 pl-0 lg:pl-10">
          <motion.h2 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-12"
          >
            Why Choose Paband?
          </motion.h2>

          <div className="grid grid-cols-2 gap-6">
            <FeatureCard title="Verified\ntenants" delay={0.1} />
            <FeatureCard title="Secure\nTransactions" delay={0.2} />
            <FeatureCard title="Transparent\nPricing" delay={0.3} />
            <FeatureCard title="Ongoing\nSupport" delay={0.4} />
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseSection;
