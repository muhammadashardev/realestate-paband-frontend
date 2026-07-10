import React from 'react';
import { motion } from 'framer-motion';

const PropertyTypeCard = ({ image, title, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative h-[450px] rounded-3xl overflow-hidden group cursor-pointer"
    >
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80"></div>
      
      <div className="absolute bottom-0 left-0 p-8 w-full">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      </div>
      
      {/* Decorative dots in background - implemented with pseudo elements or absolute divs if needed */}
    </motion.div>
  );
};

const PropertyTypesSection = () => {
  const types = [
    {
      title: "Apartments",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1935&auto=format&fit=crop"
    },
    {
      title: "Bunglows",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Commercial space",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-20 px-8 max-w-7xl mx-auto relative">
      {/* Decorative dot pattern */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-24 h-48 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(#B68B39 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>
      
      <div className="text-center mb-16 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-brand-text"
        >
          Type of properties <br/> that we manage
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {types.map((type, idx) => (
          <PropertyTypeCard key={idx} index={idx} {...type} />
        ))}
      </div>
    </section>
  );
};

export default PropertyTypesSection;
