import React from 'react';
import { motion } from 'framer-motion';

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Property Onboarding",
      description: "We register and manage your property through our structured system, ensuring all details",
    },
    {
      number: "02",
      title: "Tenant Matching & Verification",
      description: "Our team identifies suitable tenants and conducts complete background verification",
    },
    {
      number: "03",
      title: "Secure Rental Management",
      description: "From agreements to ongoing support, we handle the entire rental process with transparency",
    }
  ];

  return (
    <section className="py-20 px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        {/* Left Side: Large Image */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2"
        >
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" 
            alt="Modern house exterior" 
            className="w-full h-[600px] object-cover rounded-[30px] shadow-xl"
          />
        </motion.div>

        {/* Right Side: Steps */}
        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white mb-6 shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
              <span className="text-sm font-semibold tracking-wider text-gray-700 uppercase">HOW IT WORK</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-brand-text mb-12 leading-tight">
              Renting Made Simple <br/> with Paband
            </h2>
          </motion.div>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 flex items-start gap-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative"
              >
                <div className="text-5xl font-bold text-gray-600 mt-1">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-text mb-2">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
