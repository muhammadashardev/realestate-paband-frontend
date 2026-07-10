import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTopBar } from '../../context/TopBarContext';
import { 
  MdAdd, 
  MdSearch,
  MdOutlineRemoveRedEye,
  MdOutlineAssignment,
  MdAutorenew,
  MdCheckCircleOutline,
  MdArchive,
  MdArrowUpward,
  MdArrowDownward,
  MdRemove,
  MdChevronLeft,
  MdChevronRight
} from 'react-icons/md';

const TenantTickets = () => {
  const { setTopBar } = useTopBar();
  const navigate = useNavigate();

  useEffect(() => {
    setTopBar({ title: '' });
  }, [setTopBar]);

  const tickets = [
    {
      id: 'TIC-1025',
      property: 'Skyline Apartment',
      issueType: 'Water Leakage',
      submittedOn: '15 Jan 2026',
      priority: 'High',
      status: 'Open'
    },
    {
      id: 'TIC-1026',
      property: 'Bahria Villa',
      issueType: 'Electricity Issue',
      submittedOn: '12 Jan 2026',
      priority: 'Medium',
      status: 'In Progress'
    },
    {
      id: 'TIC-1027',
      property: 'City Heights',
      issueType: 'AC Maintenance',
      submittedOn: '05 Jan 2026',
      priority: 'Low',
      status: 'Resolved'
    }
  ];

  const getPriorityStyle = (priority) => {
    switch(priority) {
      case 'High': 
        return { bg: 'bg-[#FCE8E8]', text: 'text-[#D93025]', icon: <MdArrowUpward size={12} className="mr-1" /> };
      case 'Medium': 
        return { bg: 'bg-[#FFF0E6]', text: 'text-[#E67E22]', icon: <MdRemove size={12} className="mr-1" /> };
      case 'Low': 
        return { bg: 'bg-[#F8F9FA]', text: 'text-[#6C757D]', icon: <MdArrowDownward size={12} className="mr-1" /> };
      default: 
        return { bg: 'bg-gray-100', text: 'text-gray-600', icon: null };
    }
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Open': 
        return { bg: 'bg-[#FEF7E6]', text: 'text-[#B88A44]', dot: 'bg-[#B88A44]' };
      case 'In Progress': 
        return { bg: 'bg-[#E8F0FE]', text: 'text-[#1A73E8]', dot: 'bg-[#1A73E8]' };
      case 'Resolved': 
        return { bg: 'bg-[#E6F4EA]', text: 'text-[#1E8E3E]', dot: 'bg-[#1E8E3E]' };
      case 'Closed': 
        return { bg: 'bg-gray-100', text: 'text-gray-500', dot: 'bg-gray-500' };
      default: 
        return { bg: 'bg-gray-100', text: 'text-gray-500', dot: 'bg-gray-500' };
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-[32px] font-bold text-[#112338] tracking-tight">Tickets & Support</h1>
          <p className="text-gray-500 mt-2 text-[15px]">Report property-related issues, maintenance requests, and track support ticket progress.</p>
        </div>
        <button 
          onClick={() => navigate('/tenant/tickets/new')}
          className="bg-[#B68B39] text-white px-6 py-3 rounded-xl font-bold text-[14px] flex items-center gap-2 hover:bg-[#9c752c] transition-colors whitespace-nowrap"
        >
          <MdAdd size={20} /> Raise New Ticket
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Open Tickets */}
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100/50 flex flex-col justify-between relative">
          <span className="absolute top-6 right-6 bg-[#F8F9FA] text-gray-500 px-2 py-1 rounded-md text-[10px] font-extrabold uppercase">Active</span>
          <div className="w-10 h-10 bg-[#FEF7E6] rounded-xl flex items-center justify-center text-[#B88A44] mb-4">
            <MdOutlineAssignment size={20} />
          </div>
          <div>
            <h3 className="text-[32px] font-extrabold text-[#112338] leading-tight">02</h3>
            <p className="text-gray-500 text-[14px] mt-1">Open Tickets</p>
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100/50 flex flex-col justify-between relative">
          <span className="absolute top-6 right-6 bg-[#F8F9FA] text-gray-500 px-2 py-1 rounded-md text-[10px] font-extrabold uppercase">Ongoing</span>
          <div className="w-10 h-10 bg-[#E8F0FE] rounded-xl flex items-center justify-center text-[#1A73E8] mb-4">
            <MdAutorenew size={20} />
          </div>
          <div>
            <h3 className="text-[32px] font-extrabold text-[#112338] leading-tight">01</h3>
            <p className="text-gray-500 text-[14px] mt-1">In Progress</p>
          </div>
        </div>

        {/* Resolved Tickets */}
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100/50 flex flex-col justify-between relative">
          <span className="absolute top-6 right-6 bg-[#F8F9FA] text-gray-500 px-2 py-1 rounded-md text-[10px] font-extrabold uppercase">Fixed</span>
          <div className="w-10 h-10 bg-[#E6F4EA] rounded-xl flex items-center justify-center text-[#1E8E3E] mb-4">
            <MdCheckCircleOutline size={20} />
          </div>
          <div>
            <h3 className="text-[32px] font-extrabold text-[#112338] leading-tight">05</h3>
            <p className="text-gray-500 text-[14px] mt-1">Resolved Tickets</p>
          </div>
        </div>

        {/* Closed Cases */}
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100/50 flex flex-col justify-between relative">
          <span className="absolute top-6 right-6 bg-[#F8F9FA] text-gray-500 px-2 py-1 rounded-md text-[10px] font-extrabold uppercase">Archived</span>
          <div className="w-10 h-10 bg-[#F8F9FA] rounded-xl flex items-center justify-center text-gray-400 mb-4">
            <MdArchive size={20} />
          </div>
          <div>
            <h3 className="text-[32px] font-extrabold text-[#112338] leading-tight">03</h3>
            <p className="text-gray-500 text-[14px] mt-1">Closed Cases</p>
          </div>
        </div>

      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4 bg-white p-3 rounded-[24px] shadow-sm border border-gray-100/50 justify-between items-center">
        <div className="relative w-full lg:max-w-sm pl-2">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by ticket ID, issue type, or property..." 
            className="w-full bg-transparent pl-10 pr-4 py-2.5 text-sm focus:outline-none text-gray-700"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 hide-scrollbar px-2">
          {['All', 'Open', 'In Progress', 'Resolved', 'Closed'].map((filter, idx) => (
            <button 
              key={idx}
              className={`px-5 py-2.5 rounded-full text-[13px] font-bold whitespace-nowrap transition-colors
                ${filter === 'All' ? 'bg-[#112338] text-white' : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[20px] shadow-sm border border-gray-100/50 overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] uppercase tracking-widest text-gray-400 font-extrabold">
                <th className="py-5 px-6">Ticket ID</th>
                <th className="py-5 px-6">Property</th>
                <th className="py-5 px-6">Issue Type</th>
                <th className="py-5 px-6">Submitted On</th>
                <th className="py-5 px-6">Priority</th>
                <th className="py-5 px-6">Status</th>
                <th className="py-5 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {tickets.map((ticket, idx) => {
                const pStyle = getPriorityStyle(ticket.priority);
                const sStyle = getStatusStyle(ticket.status);
                
                return (
                  <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6 font-bold text-[#112338]">{ticket.id}</td>
                    <td className="py-5 px-6 text-gray-500">{ticket.property}</td>
                    <td className="py-5 px-6 font-semibold text-[#112338]">{ticket.issueType}</td>
                    <td className="py-5 px-6 text-gray-500">{ticket.submittedOn}</td>
                    <td className="py-5 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-md text-[11px] font-bold ${pStyle.bg} ${pStyle.text}`}>
                        {pStyle.icon}
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="py-5 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold ${sStyle.bg} ${sStyle.text}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${sStyle.dot}`}></div>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex justify-center">
                        <Link to={`/tenant/tickets/${ticket.id.split('-')[1]}`} className="w-8 h-8 rounded-lg bg-[#FFF0E6] text-[#B68B39] flex items-center justify-center hover:bg-[#F0E6D2] transition-colors">
                          <MdOutlineRemoveRedEye size={18} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-[13px] text-gray-400 font-medium">Showing 1 to 3 of 10 tickets</span>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
              <MdChevronLeft size={20} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#B68B39] text-white font-bold text-sm">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 transition-colors font-semibold text-sm">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 transition-colors font-semibold text-sm">
              3
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
              <MdChevronRight size={20} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TenantTickets;
