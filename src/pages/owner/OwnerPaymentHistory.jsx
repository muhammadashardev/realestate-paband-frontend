import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MdArrowBack, MdCheckCircle, MdAccessTime, MdError,
  MdTrendingUp, MdSearch, MdFilterList, MdSort,
  MdRemoveRedEye, MdFileDownload, MdChevronLeft, MdChevronRight
} from 'react-icons/md';

/* ── Static Data ── */
const summaryStats = [
  {
    label: 'TOTAL PAID',
    value: '142 Items',
    icon: <MdCheckCircle size={20} className="text-emerald-500" />,
    iconBg: 'bg-emerald-50 border border-emerald-100',
  },
  {
    label: 'PENDING',
    value: '24 Items',
    icon: <MdAccessTime size={20} className="text-amber-500" />,
    iconBg: 'bg-amber-50 border border-amber-100',
  },
  {
    label: 'OVERDUE',
    value: '08 Items',
    icon: <MdError size={20} className="text-red-500" />,
    iconBg: 'bg-red-50 border border-red-100',
  },
  {
    label: 'TOTAL VOLUME',
    value: 'PKR 2.4M',
    icon: <MdTrendingUp size={20} className="text-white" />,
    iconBg: 'bg-[#112338]',
    darkCard: true,
  },
];

const transactionsData = [
  {
    id: 'TXN-1025',
    tenantName: 'Ali Raza',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
    property: 'Skyline Apartment, Unit 4B',
    amount: 'PKR 120,000',
    dueDate: '05 Jan 2026',
    deduction: 'PKR 5k',
    status: 'PAID',
  },
  {
    id: 'TXN-1026',
    tenantName: 'Sarah Malik',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
    property: 'Bahria Villa, Street 12',
    amount: 'PKR 90,000',
    dueDate: '10 Jan 2026',
    deduction: 'PKR 5k',
    status: 'PENDING',
  },
  {
    id: 'TXN-1029',
    tenantName: 'Zaid Ahmed',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
    property: 'DHA Phase 6, H-21',
    amount: 'PKR 145,000',
    dueDate: '15 Jan 2026',
    deduction: 'PKR 5k',
    status: 'PROCESSING',
  },
  {
    id: 'TXN-1030',
    tenantName: 'Zaid Ahmed',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
    property: 'DHA Phase 6, H-21',
    amount: 'PKR 145,000',
    dueDate: '15 Jan 2026',
    deduction: 'PKR 5k',
    status: 'PROCESSING',
  },
];

const statusStyles = {
  PAID: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  PENDING: 'bg-amber-50 text-amber-700 border border-amber-200',
  PROCESSING: 'bg-blue-50 text-blue-700 border border-blue-200',
  OVERDUE: 'bg-red-50 text-red-700 border border-red-200',
};

const OwnerPaymentHistory = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  return (
    <div className="p-4 md:p-7 space-y-6 max-w-[1600px] mx-auto bg-[#F8F9FC] min-h-screen">
      
      {/* ── Top Header with Back Button ── */}
      <div className="flex items-center gap-3.5">
        <button
          onClick={() => navigate('/owner/payments')}
          className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
        >
          <MdArrowBack size={20} />
        </button>
        <div>
          <h2 className="text-xl md:text-[24px] font-extrabold text-[#112338] tracking-tight">
            Payment History
          </h2>
        </div>
      </div>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((stat, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-4 p-4.5 rounded-2xl border transition-all duration-200
              ${stat.darkCard 
                ? 'bg-[#112338] border-[#112338] text-white shadow-lg shadow-[#112338]/10' 
                : 'bg-white border-gray-100/80 text-[#112338] shadow-[0_2px_12px_rgba(0,0,0,0.03)]'}`}
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${stat.iconBg}`}>
              {stat.icon}
            </div>
            <div className="flex-1 leading-none">
              <span className={`text-[10px] font-extrabold tracking-wider ${stat.darkCard ? 'text-gray-400' : 'text-gray-400'}`}>
                {stat.label}
              </span>
              <p className="text-[18px] font-extrabold mt-1.5">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filter Controls ── */}
      <div className="bg-white rounded-2xl p-4 md:p-5 shadow-[0_2px_16px_rgba(0,0,0,0.03)] border border-gray-100/80">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by tenant name, property, or transaction ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-[#F8FAFC] border border-gray-100 text-sm text-gray-800 placeholder-gray-400 pl-11 pr-4 py-3 focus:outline-none focus:border-[#B68B39] focus:ring-1 focus:ring-[#B68B39] transition-all"
            />
            <MdSearch className="absolute left-4 top-3.5 text-gray-400" size={20} />
          </div>

          {/* Filters and Sorting */}
          <div className="flex flex-col sm:flex-row gap-3">
            
            {/* Filter by status */}
            <div className="relative flex-1 sm:w-[170px]">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none rounded-xl bg-[#F8FAFC] border border-gray-100 text-sm text-gray-700 pl-4 pr-10 py-3 focus:outline-none focus:border-[#B68B39] font-semibold"
              >
                <option value="">Filter By Status</option>
                <option value="PAID">Paid</option>
                <option value="PENDING">Pending</option>
                <option value="PROCESSING">Processing</option>
                <option value="OVERDUE">Overdue</option>
              </select>
              <div className="absolute right-4 top-3.5 pointer-events-none text-gray-400">
                <MdFilterList size={18} />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex-1 sm:w-[150px]">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none rounded-xl bg-[#F8FAFC] border border-gray-100 text-sm text-gray-700 pl-4 pr-10 py-3 focus:outline-none focus:border-[#B68B39] font-semibold"
              >
                <option value="latest">Sort: Latest</option>
                <option value="oldest">Sort: Oldest</option>
                <option value="amount-high">Amount: High-Low</option>
                <option value="amount-low">Amount: Low-High</option>
              </select>
              <div className="absolute right-4 top-3.5 pointer-events-none text-gray-400">
                <MdSort size={18} />
              </div>
            </div>

            {/* Search Button */}
            <button className="px-7 py-3 rounded-xl bg-[#B68B39] text-white text-sm font-bold shadow-md shadow-[#B68B39]/20 hover:bg-[#a0762d] active:scale-[0.98] transition-all">
              Search
            </button>

          </div>
        </div>
      </div>

      {/* ── All Transactions Table ── */}
      <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.03)] border border-gray-100/80 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-[17px] font-extrabold text-[#112338]">All Transactions</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/40">
                {['Transaction ID', 'Tenant Name', 'Property', 'Amount', 'Due Date', 'Deduction', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-6 py-4 text-left text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactionsData.map((txn, index) => (
                <tr key={index} className="hover:bg-gray-50/40 transition-colors duration-150">
                  {/* Tx ID */}
                  <td className="px-6 py-4.5 text-[13px] font-bold text-gray-500 whitespace-nowrap">{txn.id}</td>
                  
                  {/* Tenant */}
                  <td className="px-6 py-4.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={txn.avatar}
                        alt={txn.tenantName}
                        loading="lazy"
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-50 shrink-0"
                      />
                      <span className="text-[13.5px] font-bold text-[#112338]">{txn.tenantName}</span>
                    </div>
                  </td>
                  
                  {/* Property */}
                  <td className="px-6 py-4.5 text-[13px] text-gray-500 whitespace-nowrap">{txn.property}</td>
                  
                  {/* Amount */}
                  <td className="px-6 py-4.5 text-[13.5px] font-extrabold text-[#112338] whitespace-nowrap">{txn.amount}</td>
                  
                  {/* Due Date */}
                  <td className="px-6 py-4.5 text-[13px] text-gray-500 whitespace-nowrap">{txn.dueDate}</td>
                  
                  {/* Deduction */}
                  <td className="px-6 py-4.5 text-[13px] text-gray-500 whitespace-nowrap">{txn.deduction}</td>
                  
                  {/* Status */}
                  <td className="px-6 py-4.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${statusStyles[txn.status]}`}>
                      • {txn.status}
                    </span>
                  </td>
                  
                  {/* Actions */}
                  <td className="px-6 py-4.5">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/owner/payments/${txn.id}`}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-[#B68B39]/10 hover:text-[#B68B39] transition-all"
                      >
                        <MdRemoveRedEye size={17} />
                      </Link>
                      <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-[#B68B39]/10 hover:text-[#B68B39] transition-all">
                        <MdFileDownload size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Current Page Total and Export Footer */}
        <div className="px-6 py-4.5 border-t border-gray-100 bg-gray-50/20 flex flex-col sm:flex-row items-center justify-end gap-5">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Current Page Total</span>
            <span className="text-[16px] font-black text-[#112338]">PKR 530,000</span>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#112338] text-white text-[12.5px] font-bold shadow-md hover:bg-[#1f3854] transition-all active:scale-[0.98]">
            <MdFileDownload size={17} /> Export Full Report
          </button>
        </div>
      </div>

      {/* ── Pagination Footer ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
        <span className="text-[12.5px] text-gray-500 font-medium">
          Showing <span className="font-extrabold text-gray-700">1-12</span> of <span className="font-extrabold text-gray-700">738</span>
        </span>

        <div className="flex items-center gap-1.5 select-none">
          <button className="w-9 h-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:bg-gray-50 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all">
            <MdChevronLeft size={20} />
          </button>

          <button className="w-9 h-9 rounded-lg bg-[#112338] text-white text-xs font-bold flex items-center justify-center shadow-sm">
            1
          </button>
          <button className="w-9 h-9 rounded-lg border border-transparent text-gray-600 hover:bg-gray-100 text-xs font-bold flex items-center justify-center transition-colors">
            2
          </button>
          <button className="w-9 h-9 rounded-lg border border-transparent text-gray-600 hover:bg-gray-100 text-xs font-bold flex items-center justify-center transition-colors">
            3
          </button>
          <span className="text-gray-400 text-xs font-bold px-1">...</span>
          <button className="w-9 h-9 rounded-lg border border-transparent text-gray-600 hover:bg-gray-100 text-xs font-bold flex items-center justify-center transition-colors">
            50
          </button>

          <button className="w-9 h-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:bg-gray-50 active:scale-95 transition-all">
            <MdChevronRight size={20} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default OwnerPaymentHistory;
