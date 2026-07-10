import React from 'react';
import { Search, Bell, Download, FileText, ShieldCheck } from 'lucide-react';
import { useParams } from 'react-router-dom';

export default function RentalDetails() {
    const { id } = useParams();

    const trackingData = [
        { month: 'January', date: '5 Jan', status: 'Paid', sClass: 'bg-emerald-50 text-emerald-600' },
        { month: 'February', date: '5 Feb', status: 'Paid', sClass: 'bg-emerald-50 text-emerald-600' },
        { month: 'March', date: '5 March', status: 'Pending', sClass: 'bg-rose-50 text-rose-400' },
    ];

    return (
        <div className="flex-1 bg-[#F8F9FA] p-4 md:p-8 lg:p-10 min-h-screen overflow-x-hidden">
            {/* Top Search & Profile Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-200/60">
                <h1 className="text-xl font-bold tracking-tight text-zinc-800 ml-12 md:ml-0">Dashboard</h1>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                    <div className="w-full sm:w-64 relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search properties, tenants..."
                            className="w-full bg-gray-100/80 border-0 pl-9 pr-4 py-2 rounded-xl text-xs outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-3 justify-end">
                        <button className="p-2 hover:bg-gray-100 rounded-full text-zinc-400"><Bell size={18} /></button>
                        <div className="flex items-center gap-2">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" className="w-8 h-8 rounded-full object-cover" alt="Profile" />
                            <div className="text-left hidden sm:block">
                                <p className="text-xs font-bold text-zinc-800 leading-none">Usama</p>
                                <span className="text-[9px] text-zinc-400 font-medium">Property Owner</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Title Header Area */}
            <div className="my-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Rental Details</h2>
                    <p className="text-gray-400 text-sm mt-1">Review user information and request details before making a decision. (ID: {id})</p>
                </div>
                <div className="flex items-center gap-3 self-start sm:self-auto">
                    <button className="bg-[#C58940] hover:bg-[#ad7432] text-white text-xs font-semibold py-2 px-4 rounded-xl transition-colors shadow-sm">Terminate Rental</button>
                    <button className="border border-gray-200 bg-white hover:bg-gray-50 text-zinc-600 text-xs font-semibold py-2 px-4 rounded-xl transition-colors inline-flex items-center gap-2"><Download size={14} /> Download</button>
                </div>
            </div>

            {/* Main Structural Twin Grid Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Form Content block */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Main Visual Image Banner Container */}
                    <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm relative">
                        <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-zinc-900 relative">
                            <img src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Showcase structural villa" />
                            <div className="absolute top-4 left-4 flex gap-2">
                                <span className="bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Occupied</span>
                                <span className="bg-emerald-400 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Active Agreement</span>
                            </div>
                        </div>

                        <div className="mt-5 flex justify-between items-start gap-4">
                            <div>
                                <h3 className="text-xl font-black text-zinc-900">Skyline Luxury Apartment</h3>
                                <p className="text-[11px] text-zinc-400 mt-1">📍 DHA Phase 6, Karachi</p>
                                <div className="flex gap-4 text-zinc-400 text-[11px] font-medium mt-4">
                                    <span>🛏️ 3 Bedrooms</span>
                                    <span>🛁 2 Bathrooms</span>
                                    <span>📐 1,200 Sq Ft</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] font-bold text-zinc-400 tracking-wider block uppercase">Monthly Rent</span>
                                <p className="text-xl font-black text-[#C58940] mt-0.5">PKR 120,000</p>
                            </div>
                        </div>

                        <div className="mt-5 pt-4 border-t border-gray-50">
                            <h4 className="text-xs font-bold text-zinc-900 mb-2">Description</h4>
                            <p className="text-xs text-zinc-400 leading-relaxed">Modern furnished apartment with secure environment and premium amenities. Located in the heart of DHA Phase 6, this property offers panoramic views of the city skyline, dedicated parking, and 24/7 high-speed security surveillance.</p>
                        </div>
                    </div>

                    {/* Rental Meta Timeline Block info */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm grid grid-cols-2 gap-4">
                        <div>
                            <span className="text-[10px] font-bold text-zinc-400 tracking-wider block uppercase">Contract Duration</span>
                            <p className="text-xs font-bold text-zinc-800 mt-1">12 Months</p>
                        </div>
                        <div>
                            <span className="text-[10px] font-bold text-zinc-400 tracking-wider block uppercase">Rental Expiry</span>
                            <p className="text-xs font-bold text-rose-500 mt-1">12 Jan 2027</p>
                        </div>
                    </div>

                    {/* Rent Tracking Linear Datatable lists */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="text-sm font-bold text-zinc-900 mb-1">Rent Tracking</h3>
                        <p className="text-gray-400 text-xs mb-4">View and manage all current previous rentals</p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs font-medium">
                                <thead>
                                    <tr className="text-zinc-400 text-[10px] font-bold tracking-wider border-b border-gray-100">
                                        <th className="pb-3">Month</th>
                                        <th className="pb-3">Due Date</th>
                                        <th className="pb-3 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 text-zinc-600">
                                    {trackingData.map((row, idx) => (
                                        <tr key={idx}>
                                            <td className="py-3.5 font-bold text-zinc-800">{row.month}</td>
                                            <td className="py-3.5 text-zinc-400">{row.date}</td>
                                            <td className="py-3.5 text-right"><span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide ${row.sClass}`}>{row.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Side Widgets Sticky Bar items */}
                <div className="space-y-6">
                    <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm text-center flex flex-col items-center">
                        <div className="w-10 h-10 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-700 font-bold mb-3">🏢</div>
                        <span className="text-[9px] font-bold text-zinc-400 tracking-wider uppercase">Property Owner</span>
                        <h4 className="text-xs font-black text-zinc-900 mt-1">Ahmed Builders & Management</h4>
                        <button className="w-full mt-4 bg-[#C58940] hover:bg-[#ad7432] text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors shadow-sm">View Owner</button>
                    </div>

                    <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-3">
                        <h4 className="text-xs font-bold text-zinc-900 mb-2">Attached Files</h4>
                        <div className="flex items-center justify-between p-2.5 bg-amber-50/20 border border-amber-100/20 rounded-xl">
                            <div className="flex items-center gap-2 min-w-0">
                                <div className="p-2 bg-amber-50 rounded-xl text-amber-700 shrink-0"><FileText size={14} /></div>
                                <div className="min-w-0">
                                    <p className="text-xs font-bold text-zinc-800 truncate">Rental Agreement.pdf</p>
                                    <p className="text-[9px] text-zinc-400 font-medium">7.2 MB • PDF</p>
                                </div>
                            </div>
                            <button className="p-1.5 text-amber-700 hover:bg-amber-100/50 rounded-lg transition-colors"><Download size={14} /></button>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex gap-4 items-center">
                            <div className="relative">
                                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop" className="w-12 h-12 rounded-xl object-cover" alt="Tenant avatar" />
                                <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full border-2 border-white"><ShieldCheck size={10} /></span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <span className="text-[9px] text-zinc-400 font-bold tracking-tight">MOVE-IN DATE</span>
                                    <span className="text-[10px] font-bold text-zinc-800">12 Jan 2026</span>
                                </div>
                                <div className="flex justify-between items-start mt-1">
                                    <span className="text-[9px] text-zinc-400 font-bold tracking-tight">CONTRACT DURATION</span>
                                    <span className="text-[10px] font-bold text-zinc-800">12 Months</span>
                                </div>
                            </div>
                        </div>
                        <h4 className="text-sm font-black text-zinc-900 mt-4">Ali Raza</h4>
                        <button className="w-full mt-3 border border-amber-600/30 text-[#C58940] bg-amber-50/10 hover:bg-amber-50/40 text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors">View Tenant</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
