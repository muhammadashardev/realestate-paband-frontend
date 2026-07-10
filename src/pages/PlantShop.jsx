import React from 'react';
import { FiSearch, FiShoppingBag, FiMenu, FiPlay, FiChevronRight } from 'react-icons/fi';

const PlantShop = () => {
  return (
    <div className="min-h-screen bg-[#131b14] text-white font-sans relative overflow-x-hidden pb-20">
      
      {/* Background ambient glow effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-900/30 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-green-900/20 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Navbar */}
      <nav className="container mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-orange-400 rounded-sm rounded-tr-xl rounded-bl-xl"></div>
          <span className="text-xl font-bold tracking-wider">Planto.</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <a href="#" className="text-white font-medium">Home</a>
          <a href="#" className="hover:text-white transition-colors">Plants Type ▾</a>
          <a href="#" className="hover:text-white transition-colors">More</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-gray-300 hover:text-white"><FiSearch size={20} /></button>
          <button className="text-gray-300 hover:text-white"><FiShoppingBag size={20} /></button>
          <button className="text-gray-300 hover:text-white md:hidden"><FiMenu size={24} /></button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-12 pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Breath Natureal
            </h1>
            <p className="text-gray-400 text-sm md:text-base mb-8 max-w-md leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex items-center gap-6">
              <button className="px-8 py-3 rounded-full border border-white/30 hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium">
                Explore
              </button>
              <button className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <FiPlay size={16} className="ml-1" />
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Live Demo...</span>
              </button>
            </div>

            {/* Review Glass Card */}
            <div className="mt-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 max-w-xs relative group hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-3 mb-3">
                <img src="https://i.pravatar.cc/150?img=47" alt="User" className="w-10 h-10 rounded-full" />
                <div>
                  <h4 className="text-sm font-semibold">alena Patel</h4>
                  <div className="flex text-yellow-500 text-[10px]">
                    ★★★★★
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...
              </p>
            </div>
          </div>

          {/* Right Content - Hero Card */}
          <div className="relative flex justify-end">
             <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-6 pb-8 w-full max-w-sm relative">
                {/* Plant Image overlaying the card */}
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 drop-shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1604762524889-3e2fcc145683?auto=format&fit=crop&q=80&w=600" 
                      alt="Calathea Plant" 
                      className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
                    />
                </div>
                
                <div className="mt-36 pt-4">
                  <p className="text-gray-400 text-xs mb-2">Trendy House Plant</p>
                  <div className="flex items-end justify-between mb-6">
                    <h3 className="text-2xl font-semibold">Calathea plant</h3>
                    <FiChevronRight className="text-gray-400 cursor-pointer hover:text-white" size={24} />
                  </div>
                  <button className="w-full py-3 rounded-full border border-white/30 hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium">
                    Buy Now
                  </button>
                  <div className="flex justify-center gap-2 mt-6">
                    <div className="w-6 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                    <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Centered Heading with Background Plant Image Effect */}
      <section className="relative py-20 flex justify-center items-center overflow-hidden">
         {/* Background large plant image blurred */}
         <div className="absolute inset-0 opacity-40 mix-blend-overlay flex justify-center items-center pointer-events-none">
            <img 
               src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800"
               alt="Background Plant"
               className="w-[800px] h-[800px] object-cover rounded-full blur-sm"
            />
         </div>
         <h2 className="text-4xl md:text-5xl font-bold relative z-10 drop-shadow-lg text-center">
            Our Trendy plants
         </h2>
      </section>

      {/* Product List Section */}
      <section className="container mx-auto px-6 py-12 flex flex-col gap-16 relative z-10">
        
        {/* Card 1 */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full max-w-4xl mx-auto relative group">
           <div className="w-full md:w-1/2 flex justify-center md:justify-start relative">
             {/* Offset Image to break out of card slightly */}
             <div className="w-64 h-64 md:w-80 md:h-80 md:absolute md:-top-16 md:-left-12 drop-shadow-2xl z-20">
               <img 
                 src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=600" 
                 alt="Small Decs" 
                 className="w-full h-full object-cover rounded-3xl group-hover:scale-105 transition-transform duration-500"
               />
             </div>
           </div>
           <div className="w-full md:w-1/2 md:pl-16">
             <h3 className="text-2xl font-semibold mb-4">For Small Decs Ai Plat</h3>
             <p className="text-gray-400 text-xs md:text-sm mb-6 leading-relaxed">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
             </p>
             <p className="text-xl font-bold mb-6">Rs. 599/-</p>
             <div className="flex gap-4">
               <button className="px-8 py-2 rounded-full border border-white/30 hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium">
                 Explore
               </button>
               <button className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
                 <FiShoppingBag size={16} />
               </button>
             </div>
           </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16 w-full max-w-4xl mx-auto relative group">
           <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
             {/* Offset Image to break out of card slightly */}
             <div className="w-64 h-64 md:w-80 md:h-80 md:absolute md:-top-16 md:-right-12 drop-shadow-2xl z-20">
               <img 
                 src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&q=80&w=600" 
                 alt="Fresh Decs" 
                 className="w-full h-full object-cover rounded-3xl group-hover:scale-105 transition-transform duration-500"
               />
             </div>
           </div>
           <div className="w-full md:w-1/2 md:pr-16">
             <h3 className="text-2xl font-semibold mb-4">For Fresh Decs Ai Plat</h3>
             <p className="text-gray-400 text-xs md:text-sm mb-6 leading-relaxed">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
             </p>
             <p className="text-xl font-bold mb-6">Rs. 579/-</p>
             <div className="flex gap-4">
               <button className="px-8 py-2 rounded-full border border-white/30 hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium">
                 Explore
               </button>
               <button className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
                 <FiShoppingBag size={16} />
               </button>
             </div>
           </div>
        </div>

      </section>

    </div>
  );
};

export default PlantShop;
