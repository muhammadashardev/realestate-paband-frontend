import React from 'react';
import { Search, Eye, ChevronLeft, ChevronRight, Heart, Bell, Wrench, FileEdit, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ServiceRequestsList({ onViewDetails }) {
    const navigate = useNavigate();

    const stats = [
        { title: 'Total Requests', value: '1245', tag: 'ACTIVE', tagBg: 'bg-emerald-50 text-emerald-600', iconBg: 'bg-amber-50 text-amber-700', icon: Wrench },
        { title: 'Pending Review', value: '22', tag: 'VERIFIED', tagBg: 'bg-amber-50 text-amber-700', iconBg: 'bg-amber-50 text-amber-700', icon: FileEdit },
        { title: 'Awaiting Payment', value: '14', tag: 'PENDING', tagBg: 'bg-rose-50 text-rose-400', iconBg: 'bg-amber-50 text-amber-700', icon: Clock },
        { title: 'Completed Services', value: '122', tag: 'SUCCESS', tagBg: 'bg-emerald-50 text-emerald-600', iconBg: 'bg-amber-50 text-amber-700', icon: CheckCircle },
    ];

    const tableData = [
        { id: 'SR-1025', service: 'Property Inspection', requester: 'Ahmed Khan', property: 'Skyline Apartment', payment: 'Awaiting', pClass: 'text-amber-600', status: 'Unpaid', sClass: 'bg-rose-50 text-rose-400' },
        { id: 'SR-1026', service: 'Property Management Request', requester: 'Ahmed Khan', property: 'Skyline Apartment', payment: 'Paid', pClass: 'text-emerald-600', status: 'Active', sClass: 'bg-blue-50 text-blue-500' },
        { id: 'SR-1027', service: 'Vendor Coordination', requester: 'Ahmed Khan', property: 'Skyline Apartment', payment: 'Paid', pClass: 'text-emerald-600', status: 'Completed', sClass: 'bg-emerald-50 text-emerald-600' },
        { id: 'SR-1028', service: 'Property Inspection', requester: 'Ahmed Khan', property: 'Skyline Apartment', payment: 'Awaiting', pClass: 'text-amber-600', status: 'Unpaid', sClass: 'bg-rose-50 text-rose-400' },
        { id: 'SR-1029', service: 'Property Inspection', requester: 'Ahmed Khan', property: 'Skyline Apartment', payment: 'Awaiting', pClass: 'text-amber-600', status: 'Unpaid', sClass: 'bg-rose-50 text-rose-400' },
    ];

    return (
        <div className="flex-1 bg-[#F8F9FA] p-4 md:p-8 lg:p-10 min-h-screen overflow-x-hidden">
            {/* Top Header Navbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-200/60">
                <h1 className="text-xl font-bold tracking-tight text-zinc-800 ml-12 md:ml-0">Dashboard</h1>
                <div className="flex items-center gap-4 self-end sm:self-auto">
                    <button className="p-2 hover:bg-gray-100 rounded-full text-zinc-400"><Heart size={18} /></button>
                    <button className="p-2 hover:bg-gray-100 rounded-full text-zinc-400 relative">
                        <Bell size={18} />
                        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                    </button>
                    <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200">
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" className="w-8 h-8 rounded-full object-cover" alt="user" />
                        <div className="text-left hidden sm:block">
                            <p className="text-xs font-bold text-zinc-800 leading-none">Ali</p>
                            <span className="text-[10px] text-zinc-400 font-medium">Tenant</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Title Description */}
            <div className="my-8">
                <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Service Requests</h2>
                <p className="text-gray-400 text-sm mt-1">Manage service requests, quotations, payments, progress tracking and completed services.</p>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {stats.map((card, idx) => {
                    const IconComponent = card.icon;
                    return (
                        <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between min-h-[135px]">
                            <div className="flex justify-between items-start">
                                <div className={`p-2 rounded-xl bg-amber-50 text-amber-700`}>
                                    <IconComponent size={16} />
                                </div>
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider ${card.tagBg}`}>
                                    {card.tag}
                                </span>
                            </div>
                            <div className="mt-4">
                                <p className="text-xs font-medium text-zinc-400">{card.title}</p>
                                <p className="text-2xl font-bold text-zinc-800 mt-1 tracking-tight">{card.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Action and Custom Filter Bars */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                <div className="w-full md:w-96 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by property name, city, or request ID"
                        className="w-full bg-[#FCFBF9] border border-gray-100 pl-9 pr-4 py-2.5 rounded-xl text-xs outline-none"
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <select className="flex-1 md:w-40 bg-[#FCFBF9] border border-gray-100 p-2.5 rounded-xl text-xs text-zinc-500 outline-none">
                        <option>All Services</option>
                    </select>
                    <select className="flex-1 md:w-40 bg-[#FCFBF9] border border-gray-100 p-2.5 rounded-xl text-xs text-zinc-500 outline-none">
                        <option>Status</option>
                    </select>
                </div>
            </div>

            {/* Main Struct Datatable */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#FCFBF9] text-zinc-700 text-[11px] font-bold tracking-wider border-b border-gray-100">
                                <th className="p-4 pl-6">Request ID</th>
                                <th className="p-4">Service</th>
                                <th className="p-4">Requested By</th>
                                <th className="p-4">Property</th>
                                <th className="p-4">Payment</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-xs font-medium text-zinc-500">
                            {tableData.map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                                    <td className="p-4 pl-6 text-zinc-400 font-semibold">{row.id}</td>
                                    <td className="p-4 text-zinc-800 font-semibold">{row.service}</td>
                                    <td className="p-4 text-zinc-500">{row.requester}</td>
                                    <td className="p-4 text-zinc-500">{row.property}</td>
                                    <td className={`p-4 font-bold ${row.pClass}`}>{row.payment}</td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide ${row.sClass}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <button
                                            onClick={() => (onViewDetails ? onViewDetails(row.id) : navigate(`/superadmin/requests/${encodeURIComponent(row.id)}`))}
                                            className="p-2 bg-amber-50 hover:bg-amber-100/70 rounded-xl text-amber-700 transition-colors inline-flex items-center justify-center"
                                        >
                                            <Eye size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Custom Pagination Footer component */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
                <p className="text-xs font-medium text-zinc-400">Showing 1-12 of <span className="text-zinc-800 font-bold">738</span></p>
                <div className="flex items-center gap-1">
                    <button className="p-2 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 text-zinc-400">
                        <ChevronLeft size={16} />
                    </button>
                    <button className="w-8 h-8 rounded-xl bg-[#003A2B] text-white font-bold text-xs flex items-center justify-center">1</button>
                    <button className="w-8 h-8 rounded-xl bg-white border border-gray-200 text-zinc-600 font-bold text-xs flex items-center justify-center hover:bg-gray-50">2</button>
                    <button className="w-8 h-8 rounded-xl bg-white border border-gray-200 text-zinc-600 font-bold text-xs flex items-center justify-center hover:bg-gray-50">3</button>
                    <span className="px-1 text-zinc-400 text-xs">...</span>
                    <button className="w-8 h-8 rounded-xl bg-white border border-gray-200 text-zinc-600 font-bold text-xs flex items-center justify-center hover:bg-gray-50">50</button>
                    <button className="p-2 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 text-zinc-400">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
