import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdSearch, MdVisibility, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { getTenants } from '../../utils/tenantService';

const OwnerTenants = () => {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState([]);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Request');
  const [filteredTenants, setFilteredTenants] = useState([]);
  
  // Active Search/Filter triggers
  const [activeSearch, setActiveSearch] = useState('');
  const [activeStatus, setActiveStatus] = useState('All Request');

  useEffect(() => {
    // Load tenants from service
    const list = getTenants();
    setTenants(list);
    setFilteredTenants(list);
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = tenants;

    if (activeSearch.trim()) {
      const q = activeSearch.toLowerCase();
      result = result.filter(
        t =>
          t.name.toLowerCase().includes(q) ||
          t.propertyTitle.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q)
      );
    }

    if (activeStatus !== 'All Request') {
      result = result.filter(t => t.status === activeStatus);
    }

    setFilteredTenants(result);
  }, [tenants, activeSearch, activeStatus]);

  const handleSearch = (e) => {
    e.preventDefault();
    setActiveSearch(searchQuery);
    setActiveStatus(statusFilter);
  };

  // Helper styles for request Status badge
  const getStatusStyles = (status) => {
    switch (status) {
      case 'New Request':
        return 'bg-[#EBF5FF] text-[#2563EB]';
      case 'Under Review':
        return 'bg-[#F1F5F9] text-[#475569]';
      case 'Approved':
        return 'bg-[#EBFDF5] text-[#10B981]';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  // Helper styles for Verification badge
  const getVerificationStyles = (v) => {
    switch (v) {
      case 'Verified':
        return 'bg-[#EBFDF5] text-[#10B981]';
      case 'Pending':
        return 'bg-[#FFFBEB] text-[#D97706]';
      default:
        return 'bg-gray-100 text-gray-400';
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1600px] mx-auto bg-[#F8F9FC] min-h-screen">
      
      {/* Page Header */}
      <div>
        <h2 className="text-[28px] font-extrabold text-[#112338] leading-tight tracking-tight">
          Tenant List
        </h2>
        <p className="text-gray-500 text-[13px] md:text-[14px] mt-1.5 font-medium">
          Review, manage, and respond to incoming tenant inquiries and rental requests.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-white p-4 rounded-xl border border-gray-100/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
        <div className="relative md:col-span-7">
          <input
            type="text"
            placeholder="Search by tenant name, property, or request ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-200 rounded-lg text-[13.5px] text-gray-800 placeholder-gray-400 pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#B68B39] transition-all font-medium"
          />
          <MdSearch className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
        </div>
        <div className="relative md:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full border border-gray-200 rounded-lg text-[13.5px] text-gray-700 bg-white px-3 py-2.5 focus:outline-none focus:border-[#B68B39] appearance-none cursor-pointer font-medium"
          >
            <option>All Request</option>
            <option>New Request</option>
            <option>Under Review</option>
            <option>Approved</option>
          </select>
          <div className="absolute right-3.5 top-3.5 pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <button
          type="submit"
          className="md:col-span-2 py-2.5 rounded-lg bg-[#B68B39] text-white text-[13.5px] font-bold hover:bg-[#a0762d] active:scale-[0.98] transition-all text-center tracking-wide shadow-sm shadow-[#B68B39]/10"
        >
          Search
        </button>
      </form>

      {/* Tenants Table Container */}
      <div className="bg-white rounded-xl border border-gray-100/60 shadow-[0_4px_20px_rgba(0,0,0,0.015)] overflow-hidden">
        <div className="p-5 border-b border-gray-100/80 bg-white">
          {/* Matches the spelling 'All Tanant' exactly from the screenshot mock design */}
          <h3 className="text-[17px] font-extrabold text-[#112338] tracking-tight">All Tanant</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                <th className="px-6 py-4">Tenant Name</th>
                <th className="px-6 py-4">Property</th>
                <th className="px-6 py-4">Move-In Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Verification</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100/80">
              {filteredTenants.length > 0 ? (
                filteredTenants.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50/40 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-10 h-10 rounded-lg object-cover ring-2 ring-gray-50 shrink-0"
                        />
                        <span className="font-bold text-[#112338] text-[13.5px]">
                          {t.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13.5px] text-gray-500 font-medium">
                      {t.propertyTitle}
                    </td>
                    <td className="px-6 py-4 text-[13.5px] text-gray-500 font-medium">
                      {t.moveInDate}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full ${getStatusStyles(t.status)} tracking-wide`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full ${getVerificationStyles(t.verification)} tracking-wide`}>
                        {t.verification}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => navigate(`/owner/tenants/${t.id}`)}
                          className="px-4 py-1.5 rounded-lg border border-[#B68B39]/80 text-[#B68B39] text-[11px] font-extrabold hover:bg-[#B68B39] hover:text-white transition-all flex items-center gap-1.5 active:scale-[0.97]"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>View</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-gray-400 text-sm">
                    No tenant requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Custom Pagination Footer */}
        <div className="p-5 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
          <div className="text-[13px] text-gray-500 font-semibold">
            Showing 1-12 of 738
          </div>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 rounded border border-gray-200 text-gray-400 flex items-center justify-center hover:bg-gray-50 hover:text-gray-600 transition-all disabled:opacity-40" disabled>
              <MdChevronLeft size={18} />
            </button>
            <button className="w-8 h-8 rounded bg-[#112338] text-white text-[13px] font-bold flex items-center justify-center shadow-md">
              1
            </button>
            <button className="w-8 h-8 rounded border border-gray-200 text-gray-500 text-[13px] font-semibold flex items-center justify-center hover:bg-gray-50 hover:text-gray-700 transition-all">
              2
            </button>
            <button className="w-8 h-8 rounded border border-gray-200 text-gray-500 text-[13px] font-semibold flex items-center justify-center hover:bg-gray-50 hover:text-gray-700 transition-all">
              3
            </button>
            <span className="text-gray-400 px-1 text-[13px] font-semibold">...</span>
            <button className="w-8 h-8 rounded border border-gray-200 text-gray-500 text-[13px] font-semibold flex items-center justify-center hover:bg-gray-50 hover:text-gray-700 transition-all">
              50
            </button>
            <button className="w-8 h-8 rounded border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-50 hover:text-gray-700 transition-all">
              <MdChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OwnerTenants;
