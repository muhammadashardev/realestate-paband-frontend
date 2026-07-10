import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdSearch, MdLocationOn, MdKeyboardArrowDown } from 'react-icons/md';
import { useTopBar } from '../../context/TopBarContext';

const TenantMyRentals = () => {
  const { setTopBar, resetTopBar } = useTopBar();

  useEffect(() => {
    setTopBar({ title: 'My Rentals' });
    return () => resetTopBar();
  }, [setTopBar, resetTopBar]);

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-[28px] font-extrabold text-[#112338] leading-tight tracking-tight">
          My Rentals
        </h2>
        <p className="text-gray-500 text-[13px] md:text-[14px] mt-1.5 font-medium">
          Manage your active rentals, agreements, and property information from one place.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Active Rentals */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/60 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#EBF3FF] flex shrink-0 items-center justify-center">
            {/* simple shape for active rentals */}
            <div className="w-5 h-5 rounded-[4px] bg-[#C1D8F8]" />
          </div>
          <div>
            <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-1">Active Rentals</p>
            <h3 className="text-[#112338] text-[22px] font-extrabold leading-tight">01 Active Rental</h3>
            <p className="text-gray-400 text-[11px] font-medium mt-1">Currently connected rental properties</p>
          </div>
        </div>

        {/* Agreements */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/60 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#E6FCF5] flex shrink-0 items-center justify-center">
             <div className="relative">
                <div className="w-5 h-6 rounded-[4px] bg-[#9EE8D0] flex flex-col justify-center items-center gap-1">
                  <div className="w-2.5 h-0.5 bg-white rounded-full"/>
                  <div className="w-2.5 h-0.5 bg-white rounded-full"/>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#10B981] rounded-full border border-white flex items-center justify-center">
                   <svg className="w-1.5 h-1.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
             </div>
          </div>
          <div>
            <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-1">Agreements</p>
            <h3 className="text-[#112338] text-[22px] font-extrabold leading-tight">01 Active<br/>Agreement</h3>
            <p className="text-gray-400 text-[11px] font-medium mt-1">Digitally managed rental contracts</p>
          </div>
        </div>

        {/* Payment Status */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/60 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#F3F4F6] flex shrink-0 items-center justify-center">
            <div className="w-6 h-4 rounded-[4px] bg-[#112338] flex flex-col justify-between p-1">
               <div className="w-1.5 h-1 bg-white/20 rounded-[1px]"/>
               <div className="w-3 h-0.5 bg-white/50 rounded-[1px] self-end"/>
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-1">Payment Status</p>
            <h3 className="text-[#112338] text-[22px] font-extrabold leading-tight">No Pending<br/>Payments</h3>
            <p className="text-gray-400 text-[11px] font-medium mt-1">Status indicator</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 bg-white p-3 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/60">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Search by property name or agreement ID"
            className="w-full bg-[#F9FAFB] rounded-xl pl-10 pr-4 py-2.5 text-[13px] text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#B68B39] transition-all"
          />
          <MdSearch size={18} className="absolute left-3.5 top-3 text-gray-400" />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 pl-2 pr-1">
          <span className="text-[12px] font-medium text-gray-400">Filter by:</span>
          <div className="flex items-center gap-2 bg-[#F9FAFB] px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <span className="text-[13px] font-bold text-[#112338]">All Properties</span>
            <MdKeyboardArrowDown size={16} className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* Property Card */}
      <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/60 overflow-hidden flex flex-col lg:flex-row">
        {/* Left: Image */}
        <div className="lg:w-[320px] shrink-0 relative h-[240px] lg:h-auto">
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
            alt="Skyline Luxury Apartment"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            <span className="text-[11px] font-bold text-[#10B981]">Active Rental</span>
          </div>
        </div>

        {/* Right: Content */}
        <div className="p-6 md:p-8 flex-1 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl md:text-[22px] font-extrabold text-[#112338] mb-1.5 leading-tight">
                Skyline Luxury Apartment
              </h3>
              <div className="flex items-center gap-1.5 text-gray-500 text-[13px]">
                <MdLocationOn size={16} className="text-[#B68B39]" />
                <span className="font-medium">DHA Phase 6, Karachi</span>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1">Monthly Rent</p>
              <p className="text-[20px] font-extrabold text-[#112338]">PKR 120,000</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-auto pb-6 border-b border-gray-100/80">
            <div className="px-3 py-1.5 bg-[#E6FCF5] text-[#10B981] text-[11px] font-bold rounded-md">
              Active Agreement
            </div>
            <div className="px-3 py-1.5 bg-[#F3F4F6] text-gray-600 text-[11px] font-bold rounded-md">
              12 Months Contract
            </div>
            <div className="px-3 py-1.5 bg-[#F3F4F6] text-gray-600 text-[11px] font-bold rounded-md flex items-center gap-1.5">
               <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Move-in: 12 Jan 2026
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 flex flex-wrap items-center justify-between gap-3">
             <div className="flex flex-wrap items-center gap-3">
               <Link
                 to="/tenant/rentals/1"
                 className="px-5 py-2.5 bg-[#112338] text-white text-[13px] font-bold rounded-xl hover:bg-[#0A1A2E] transition-all shadow-sm"
               >
                 View Details
               </Link>
               <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-[13px] font-bold rounded-xl hover:bg-gray-50 transition-all">
                 Open Agreement
               </button>
               <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-[13px] font-bold rounded-xl hover:bg-gray-50 transition-all">
                 Payment History
               </button>
             </div>
             
             <button className="px-5 py-2.5 bg-white border border-[#E0E7FF] text-[#4F46E5] text-[13px] font-bold rounded-xl hover:bg-[#EEF2FF] transition-all ml-auto">
               Raise Ticket
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantMyRentals;
