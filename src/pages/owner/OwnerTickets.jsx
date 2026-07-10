import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdSearch, MdMoreHoriz, MdVisibility, MdReply, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useTopBar } from '../../context/TopBarContext';

const mockTickets = [
  {
    id: 'TXN-1025',
    tenant: { name: 'Ali Raza', avatar: 'https://i.pravatar.cc/150?u=ali' },
    property: 'Skyline Apartment, Unit 4B',
    category: 'Plumbing',
    priority: 'High',
    status: 'OPEN',
  },
  {
    id: 'TXN-1026',
    tenant: { name: 'Ali Raza', avatar: 'https://i.pravatar.cc/150?u=ali' },
    property: 'Skyline Apartment, Unit 4B',
    category: 'Electricity',
    priority: 'Medium',
    status: 'IN PROGRESS',
  },
  {
    id: 'TXN-1027',
    tenant: { name: 'Ali Raza', avatar: 'https://i.pravatar.cc/150?u=ali' },
    property: 'Skyline Apartment, Unit 4B',
    category: 'Agreements',
    priority: 'Low',
    status: 'OPEN',
  },
  {
    id: 'TXN-1028',
    tenant: { name: 'Ali Raza', avatar: 'https://i.pravatar.cc/150?u=ali' },
    property: 'Skyline Apartment, Unit 4B',
    category: 'Plumbing',
    priority: 'High',
    status: 'CLOSED',
  },
];

const StatCard = ({ title, value, subtitle, highlightColor }) => (
  <div className="bg-white rounded-xl p-5 border border-gray-100 flex flex-col gap-2 shadow-sm">
    <div className="flex justify-between items-center w-full">
      <span className="text-[13px] font-semibold text-gray-500">{title}</span>
      <MdMoreHoriz className="text-gray-400" />
    </div>
    <div className="flex items-end gap-2 mt-1">
      <span className={`text-[28px] font-extrabold leading-none ${highlightColor || 'text-[#1A3A60]'}`}>
        {value}
      </span>
      <span className={`text-[12px] font-medium mb-1 ${highlightColor || 'text-gray-400'}`}>
        {subtitle}
      </span>
    </div>
  </div>
);

const OwnerTickets = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { setTopBar, resetTopBar } = useTopBar();

  useEffect(() => {
    setTopBar({
      title: 'Support Tickets',
    });
    return () => resetTopBar();
  }, [setTopBar, resetTopBar]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'OPEN': return 'text-[#FF8A00] bg-[#FF8A00]/10';
      case 'IN PROGRESS': return 'text-[#3B82F6] bg-[#3B82F6]/10';
      case 'CLOSED': return 'text-[#EF4444] bg-[#EF4444]/10';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[28px] font-extrabold text-[#1A3A60] tracking-tight mb-2">Support Tickets</h1>
        <p className="text-[14px] text-gray-500 font-medium">
          Manage tenant issues, maintenance requests, and property-related complaints.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Tickets" value="15" subtitle="Active Tickets" />
        <StatCard title="Pending Tickets" value="05" subtitle="Awaiting Response" highlightColor="text-[#FF8A00]" />
        <StatCard title="Resolved Tickets" value="08" subtitle="Successfully Closed" highlightColor="text-[#10B981]" />
        <StatCard title="Urgent Issues" value="02" subtitle="High Priority" highlightColor="text-[#EF4444]" />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search by ticket ID, tenant name, or property"
            className="w-full h-[46px] pl-11 p-3 bg-white border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#B68B39] focus:ring-1 focus:ring-[#B68B39] transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <select className="h-[46px] px-4 bg-white border border-gray-200 rounded-lg text-[14px] font-medium text-gray-700 focus:outline-none focus:border-[#B68B39] w-[160px] appearance-none cursor-pointer bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYgOUwxMiAxNUwxOCA5IiBzdHJva2U9IiM2QjcyODAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=')] bg-no-repeat bg-[position:right_12px_center] pr-10">
            <option>All Tickets</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Closed</option>
          </select>
          <button className="h-[46px] px-8 bg-[#B68B39] text-white rounded-lg text-[14px] font-bold hover:bg-[#a0762d] transition-colors">
            Search
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-[18px] font-extrabold text-[#1A3A60]">All Tickets</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="px-6 py-4 text-[12px] font-bold text-[#1A3A60] whitespace-nowrap">Ticket ID</th>
                <th className="px-6 py-4 text-[12px] font-bold text-[#1A3A60] whitespace-nowrap">Tenant Name</th>
                <th className="px-6 py-4 text-[12px] font-bold text-[#1A3A60] whitespace-nowrap">Property</th>
                <th className="px-6 py-4 text-[12px] font-bold text-[#1A3A60] whitespace-nowrap">Issue Category</th>
                <th className="px-6 py-4 text-[12px] font-bold text-[#1A3A60] whitespace-nowrap">Priority</th>
                <th className="px-6 py-4 text-[12px] font-bold text-[#1A3A60] whitespace-nowrap text-center">Status</th>
                <th className="px-6 py-4 text-[12px] font-bold text-[#1A3A60] whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockTickets.map((ticket, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5 text-[13px] font-medium text-gray-500 whitespace-nowrap">
                    {ticket.id}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img src={ticket.tenant.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-[14px] font-bold text-[#1A3A60]">{ticket.tenant.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-[13px] font-medium text-gray-500 max-w-[180px] leading-tight">
                      {ticket.property}
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-[14px] font-bold text-[#1A3A60]">
                    {ticket.category}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-[13px] font-medium text-gray-500">
                    {ticket.priority}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-center">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${getStatusStyle(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => navigate(`/owner/tickets/${ticket.id}`)}
                        className="w-8 h-8 rounded-lg bg-[#B68B39]/10 text-[#B68B39] flex items-center justify-center hover:bg-[#B68B39] hover:text-white transition-colors"
                        title="View Details"
                      >
                        <MdVisibility size={16} />
                      </button>
                      {ticket.status !== 'CLOSED' && (
                        <button className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors">
                          <MdReply size={16} className="rotate-180" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mb-8">
        <span className="text-[13px] font-bold text-[#1A3A60]">Showing 1-12 of 738</span>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            <MdChevronLeft size={20} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#0F2841] text-white font-bold text-[13px]">
            1
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 font-bold text-[13px] hover:bg-gray-50 transition-colors">
            2
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 font-bold text-[13px] hover:bg-gray-50 transition-colors">
            3
          </button>
          <span className="w-9 h-9 flex items-center justify-center text-gray-400 font-bold">...</span>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 font-bold text-[13px] hover:bg-gray-50 transition-colors">
            50
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            <MdChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerTickets;
