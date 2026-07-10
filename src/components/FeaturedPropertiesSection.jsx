import React from 'react';
import { motion } from 'framer-motion';
import { FaBed, FaBath, FaVectorSquare, FaCar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ image, title, location, beds, baths, sqft, garages, price, index }) => {
  const navigate = useNavigate();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
    >
      <div className="h-56 overflow-hidden relative">
        <img src={image} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-brand-text mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-6">{location}</p>
        
        <div className="grid grid-cols-2 gap-y-4 mb-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FaBed className="text-gray-400" />
            <span>{beds} Bedrooms</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBath className="text-gray-400" />
            <span>{baths} Bathrooms</span>
          </div>
          <div className="flex items-center gap-2">
            <FaVectorSquare className="text-gray-400" />
            <span>{sqft} sq ft</span>
          </div>
          {garages && (
            <div className="flex items-center gap-2">
              <FaCar className="text-gray-400" />
              <span>{garages} Garages</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="font-bold text-lg text-brand-text">RS {price}</div>
          <button 
            onClick={() => navigate('/detail')}
            className="px-4 py-2 bg-brand-gold text-white text-sm font-medium rounded hover:bg-yellow-600 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedPropertiesSection = () => {
  const navigate = useNavigate();
  const properties = [
    {
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
      title: "Luxury Family Home",
      location: "DHA (Defence Housing Authority)",
      beds: 4,
      baths: 3,
      sqft: "720",
      garages: 1,
      price: "150,000"
    },
    {
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
      title: "Equestrian Estate",
      location: "Clifton - Karachi",
      beds: 4,
      baths: 3,
      sqft: "720",
      garages: 1,
      price: "150,000"
    },
    {
      image: "https://images.unsplash.com/photo-1600607687931-cebf10cb4cb0?q=80&w=2070&auto=format&fit=crop",
      title: "Mountain View Condos",
      location: "North Nazimabad",
      beds: 4,
      baths: 3,
      sqft: "720",
      garages: 1,
      price: "150,000"
    }
  ];

  return (
    <section className="py-20 px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-brand-text leading-tight">
            Featured Rental <br/> Properties
          </h2>
        </motion.div>
        
        <motion.button 
          onClick={() => navigate('/properties')}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-6 md:mt-0 px-6 py-3 bg-[#A88241] text-white font-medium rounded hover:bg-yellow-700 transition-colors"
        >
          View All Properties
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((prop, idx) => (
          <PropertyCard key={idx} index={idx} {...prop} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedPropertiesSection;
