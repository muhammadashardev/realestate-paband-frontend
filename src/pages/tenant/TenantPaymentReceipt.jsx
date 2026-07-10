import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTopBar } from '../../context/TopBarContext';
import { 
  MdCheckCircle,
  MdArrowBack,
  MdFileDownload,
  MdShare,
  MdBusiness
} from 'react-icons/md';

const TenantPaymentReceipt = () => {
  const { setTopBar } = useTopBar();
  const navigate = useNavigate();

  useEffect(() => {
    setTopBar({ title: '' });
  }, [setTopBar]);

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fade-in pb-16 flex flex-col items-center">
      
      {/* Success Alert */}
      <div className="w-full max-w-2xl bg-[#E6F4EA] border border-[#1E8E3E]/20 text-[#1E8E3E] px-6 py-4 rounded-xl flex items-center gap-3 mb-8 shadow-sm">
        <MdCheckCircle size={20} />
        <span className="font-semibold text-sm text-[#1E8E3E]">Your rental payment has been verified successfully.</span>
      </div>

      {/* Receipt Card */}
      <div className="w-full max-w-2xl bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Card Header (Amounts) */}
        <div className="p-10 flex flex-col items-center border-b border-dashed border-gray-200">
          <div className="flex items-center gap-1.5 bg-[#E6F4EA] text-[#1E8E3E] px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E8E3E]"></span>
            SUCCESSFUL PAYMENT
          </div>
          <p className="text-gray-400 text-[12px] font-bold uppercase tracking-widest mb-2">TOTAL PAYMENT</p>
          <h1 className="text-[42px] font-extrabold text-[#112338]">PKR 120,000</h1>
        </div>

        {/* Card Body (Details) */}
        <div className="p-10 space-y-8">
          
          <div className="flex justify-between">
            <div>
              <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-1">RECEIPT ID</p>
              <p className="text-[#112338] font-bold text-[14px]">RCT-1025</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-1">PAYMENT DATE</p>
              <p className="text-[#112338] font-bold text-[14px]">05 Jan 2026</p>
            </div>
          </div>

          <div>
            <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-2">PROPERTY</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F8F9FA] rounded-lg flex items-center justify-center text-gray-400">
                <MdBusiness size={20} />
              </div>
              <p className="text-[#112338] font-bold text-[14px]">Skyline Luxury Apartment, Unit 402</p>
            </div>
          </div>

          <div className="flex justify-between items-center bg-[#F8F9FA] p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&h=150&q=80" alt="Ali Raza" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">TENANT</p>
                <p className="text-[#112338] font-bold text-[14px]">Ali Raza</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">METHOD</p>
              <p className="text-[#112338] font-bold text-[14px]">Bank Transfer</p>
            </div>
          </div>

          <div className="space-y-4 pt-2 border-t border-dashed border-gray-200">
            <div className="flex justify-between items-center text-[14px]">
              <span className="text-gray-500 font-medium">Base Rent</span>
              <span className="text-[#112338] font-bold">PKR 110,000</span>
            </div>
            <div className="flex justify-between items-center text-[14px]">
              <span className="text-gray-500 font-medium">Maintenance Fee</span>
              <span className="text-[#112338] font-bold">PKR 10,000</span>
            </div>
            <div className="flex justify-between items-center text-[16px] pt-4 font-extrabold">
              <span className="text-[#112338]">Total Verified</span>
              <span className="text-[#112338]">PKR 120,000</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="flex-1 bg-[#112338] text-white py-3.5 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-[#1a3554] transition-colors">
              <MdFileDownload size={18} /> Download PDF Receipt
            </button>
            <button className="flex-1 bg-white text-[#112338] border border-gray-200 py-3.5 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <MdShare size={18} /> Share Receipt
            </button>
          </div>

        </div>
      </div>

      <button 
        onClick={() => navigate('/tenant/payments')}
        className="mt-8 text-gray-500 text-[14px] font-medium flex items-center gap-2 hover:text-[#112338] transition-colors"
      >
        <MdArrowBack size={18} /> Back to Payments
      </button>

    </div>
  );
};

export default TenantPaymentReceipt;
