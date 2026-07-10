import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdLocationOn, MdKingBed, MdBathtub, MdSquareFoot, MdDescription, MdFileDownload, MdPhone, MdKeyboardArrowRight, MdPayment, MdConfirmationNumber } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { useTopBar } from '../../context/TopBarContext';

const TenantRentalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setTopBar, resetTopBar } = useTopBar();

  useEffect(() => {
    setTopBar({ 
      title: 'Rental Details',
    });
    return () => resetTopBar();
  }, [setTopBar, resetTopBar]);

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto">
      {/* Page Header (Actions on right) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl md:text-[28px] font-extrabold text-[#112338] leading-tight tracking-tight">
          Rental Details
        </h2>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#B68B39] text-white text-[13px] font-bold rounded-xl hover:bg-[#a0762d] transition-all shadow-sm">
            <MdDescription size={18} />
            Open Agreement
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#B68B39] text-[#B68B39] text-[13px] font-bold rounded-xl hover:bg-[#FDFBF7] transition-all shadow-sm">
            <MdFileDownload size={18} />
            Download
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Content (Main Details) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/60 overflow-hidden">
            {/* Image Section */}
            <div className="relative h-[280px] sm:h-[360px] md:h-[420px]">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
                alt="Skyline Luxury Apartment"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="px-3 py-1.5 bg-[#10B981] text-white text-[10px] font-bold tracking-wider rounded-md uppercase">
                  Occupied
                </div>
                <div className="px-3 py-1.5 bg-[#10B981] text-white text-[10px] font-bold tracking-wider rounded-md uppercase">
                  Active Agreement
                </div>
              </div>
            </div>

            {/* Property Info Content */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 border-b border-gray-100/80 pb-6">
                <div>
                  <h3 className="text-2xl md:text-[26px] font-extrabold text-[#112338] mb-2 leading-tight">
                    Skyline Luxury Apartment
                  </h3>
                  <div className="flex items-center gap-1.5 text-gray-500 text-[13px]">
                    <MdLocationOn size={16} className="text-[#B68B39]" />
                    <span className="font-medium">DHA Phase 6, Karachi</span>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1">Monthly Rent</p>
                  <p className="text-[24px] font-extrabold text-[#B68B39]">PKR 120,000</p>
                </div>
              </div>

              {/* Features List */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <MdKingBed size={20} className="text-gray-400" />
                  <span className="text-[13px] font-medium text-gray-600">3 Bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdBathtub size={20} className="text-gray-400" />
                  <span className="text-[13px] font-medium text-gray-600">2 Bathrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdSquareFoot size={20} className="text-gray-400" />
                  <span className="text-[13px] font-medium text-gray-600">1,200 Sq Ft</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-[15px] font-extrabold text-[#112338] mb-3">Description</h4>
                <p className="text-gray-500 text-[13px] leading-relaxed font-medium">
                  Modern furnished apartment with secure environment and premium facilities. Located in the heart of DHA Phase 6, this property offers panoramic views of the city skyline, dedicated parking, and 24/7 high-speed security surveillance.
                </p>
              </div>
            </div>
          </div>

          {/* Rental Information */}
          <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/60 p-6 md:p-8">
            <h4 className="text-[16px] font-extrabold text-[#112338] mb-6">Rental Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Move-in Date</p>
                <p className="text-[14px] font-extrabold text-[#112338]">12 Jan 2026</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Contract Duration</p>
                <p className="text-[14px] font-extrabold text-[#112338]">12 Months</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Rental Expiry</p>
                <p className="text-[14px] font-extrabold text-[#EF4444]">12 Jan 2027</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Content */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Owner Card */}
          <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/60 p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#FDF8F0] flex items-center justify-center mx-auto mb-4 border border-[#F3E6D0]">
               <div className="w-8 h-8 bg-[#DDB976] rounded-md flex flex-col justify-end p-1">
                 <div className="flex gap-0.5 justify-center mb-0.5">
                   <div className="w-1 h-1 bg-white rounded-sm"></div>
                   <div className="w-1 h-1 bg-white rounded-sm"></div>
                 </div>
                 <div className="flex gap-0.5 justify-center">
                   <div className="w-1 h-1 bg-white rounded-sm"></div>
                   <div className="w-1 h-1 bg-white rounded-sm"></div>
                 </div>
                 <div className="w-2 h-2.5 bg-white mx-auto mt-0.5 rounded-t-sm"></div>
               </div>
            </div>
            <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.15em] mb-1">
              Property Owner
            </p>
            <h4 className="text-[16px] font-extrabold text-[#112338] mb-6 leading-tight">
              Ahmed Builders &<br/>Management
            </h4>

            <div className="space-y-3">
              <button className="w-full py-3 bg-[#00E676] text-white text-[13px] font-bold rounded-xl hover:bg-[#00C853] transition-all flex items-center justify-center gap-2 shadow-sm shadow-[#00E676]/20">
                <FaWhatsapp size={18} />
                WhatsApp
              </button>
              <button className="w-full py-3 bg-[#B68B39] text-white text-[13px] font-bold rounded-xl hover:bg-[#a0762d] transition-all flex items-center justify-center gap-2 shadow-sm shadow-[#B68B39]/20">
                <MdPhone size={18} />
                Call Owner
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <button className="w-full bg-[#FDFBF7] border border-[#F3E6D0] hover:bg-[#F9F4EA] transition-colors p-4 rounded-2xl flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#B68B39] flex items-center justify-center">
                  <MdPayment size={16} className="text-white" />
                </div>
                <span className="text-[14px] font-extrabold text-[#112338]">View Payments</span>
              </div>
              <MdKeyboardArrowRight size={20} className="text-[#B68B39] group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full bg-[#FDFBF7] border border-[#F3E6D0] hover:bg-[#F9F4EA] transition-colors p-4 rounded-2xl flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#B68B39] flex items-center justify-center">
                  <MdConfirmationNumber size={16} className="text-white" />
                </div>
                <span className="text-[14px] font-extrabold text-[#112338]">Raise Support Ticket</span>
              </div>
              <MdKeyboardArrowRight size={20} className="text-[#B68B39] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Status Legend */}
          <div className="bg-[#112338] rounded-2xl p-6 text-white shadow-lg">
            <h4 className="text-[14px] font-extrabold mb-5">Status Legend</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                <span className="text-[12px] font-medium text-gray-300">Active Rental</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                <span className="text-[12px] font-medium text-gray-300">Pending Agreement</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                <span className="text-[12px] font-medium text-gray-300">Expired Rental</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                <span className="text-[12px] font-medium text-gray-300">Renewed Contract</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantRentalDetails;
