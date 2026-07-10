import React, { useState } from 'react';
import { ArrowLeft, Check, X, FileText, Download, CloudUpload, Search, Bell } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import QuoteFormModal from './QuoteFormModal';

export default function ServiceRequestDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);

    return (
        <div className="flex-1 bg-[#F8F9FA] p-4 md:p-8 lg:p-10 min-h-screen overflow-x-hidden">
            {/* Top Navbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-200/60">
                <h1 className="text-xl font-bold tracking-tight text-zinc-800 ml-12 md:ml-0">Dashboard</h1>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                    <div className="w-full sm:w-64 relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input type="text" placeholder="Search..." className="w-full bg-gray-100 border-0 pl-9 pr-4 py-2 rounded-xl text-xs outline-none" />
                    </div>
                    <div className="flex items-center gap-3 justify-end">
                        <button className="p-2 hover:bg-gray-100 rounded-full text-zinc-400"><Bell size={18} /></button>
                        <div className="flex items-center gap-2">
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" className="w-8 h-8 rounded-full object-cover" alt="Profile" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Back Button & Header Actions */}
            <div className="my-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-2 bg-white border border-gray-200 rounded-full text-zinc-600 hover:bg-gray-50">
                        <ArrowLeft size={16} />
                    </button>
                    <div>
                        <h2 className="text-2xl font-black text-zinc-900 leading-tight">Property Inspection Request</h2>
                        <div className="flex items-center gap-3 mt-1.5">
                            <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Awaiting Confirmation</span>
                            <span className="text-xs text-zinc-400">Request ID: {id}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 self-end sm:self-auto">
                    <button className="px-5 py-2 bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold rounded-xl transition-colors">Reject</button>
                    <button className="px-5 py-2 bg-[#C58940] hover:bg-[#ad7432] text-white text-xs font-bold rounded-xl transition-colors shadow-sm">Approve</button>
                </div>
            </div>

            {/* Grid Blueprint Structure Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Main Stream Stack */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Requested By Profile Card */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-xs font-black text-zinc-800 uppercase tracking-wider mb-3">Requested By</h3>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-zinc-100 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" alt="requester" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h4 className="text-sm font-bold text-zinc-900">Ali Raza</h4>
                                    <span className="bg-emerald-50 text-emerald-600 text-[9px] font-bold px-2 py-0.2 rounded-full">✓ Verified Tenant</span>
                                </div>
                                <p className="text-xs text-zinc-400 mt-0.5">📧 a.raza@paband.com &nbsp;&nbsp; 📞 +92321456789</p>
                            </div>
                        </div>
                    </div>

                    {/* Service Meta Details Box */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                        <h3 className="text-xs font-black text-zinc-800 uppercase tracking-wider">Service Information</h3>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                                <span className="text-[10px] text-zinc-400 font-bold block uppercase tracking-tight">Inspection Type</span>
                                <p className="font-bold text-zinc-800 mt-0.5">Move-Out Inspection</p>
                            </div>
                            <div>
                                <span className="text-[10px] text-zinc-400 font-bold block uppercase tracking-tight">Preferred Date</span>
                                <p className="font-bold text-zinc-800 mt-0.5">15 Jan 2026</p>
                            </div>
                        </div>
                        <div className="pt-2">
                            <span className="text-[10px] text-zinc-400 font-bold block uppercase tracking-tight">Notes</span>
                            <p className="text-zinc-500 mt-1 leading-relaxed">Tenant requested inspection before final handover next month.</p>
                        </div>
                    </div>

                    {/* Admin Internal Remark log notes */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-xs font-black text-zinc-800 uppercase tracking-wider mb-2">Admin Notes</h3>
                        <div className="bg-gray-50/70 p-3.5 rounded-xl border border-gray-100 text-xs text-zinc-500 leading-relaxed">
                            Property reviewed. Suitable for management support.
                        </div>
                    </div>

                    {/* Detailed Financial Summary Box */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                        <h3 className="text-xs font-black text-zinc-800 uppercase tracking-wider">Payment Summary</h3>
                        <div className="divide-y divide-gray-50 text-xs font-medium">
                            <div className="flex justify-between py-2"><span className="text-zinc-400">Net Amount</span><span className="text-zinc-800 font-bold">PKR 120,000</span></div>
                            <div className="flex justify-between py-2"><span className="text-zinc-400">Transaction ID</span><span className="text-zinc-500">TXN-45896</span></div>
                            <div className="flex justify-between py-2"><span className="text-zinc-400">Paid Date</span><span className="text-zinc-800 font-bold">16 Jan 2026</span></div>
                        </div>
                    </div>

                    {/* Interactive File Dropzone Box */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-xs font-black text-zinc-800 uppercase tracking-wider mb-3">📍 Upload Report</h3>
                        <div className="border border-dashed border-zinc-200 bg-gray-50/30 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
                            <div className="p-3 bg-amber-50 rounded-full text-amber-700 mb-3"><CloudUpload size={20} /></div>
                            <h4 className="text-xs font-bold text-zinc-800">Drag & drop your Files here</h4>
                            <p className="text-[10px] text-zinc-400 mt-1 max-w-sm">Upload up to 10 high-quality photos showing different areas of the property.</p>
                            <button className="mt-4 bg-white border border-gray-200 hover:bg-gray-50 text-zinc-700 text-xs font-bold py-2 px-4 rounded-xl shadow-sm transition-colors">Browse Files</button>
                        </div>
                    </div>

                    {/* Historical Billing logs Table */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-xs font-black text-zinc-800 uppercase tracking-wider mb-3">Billing History</h3>
                        <div className="space-y-2 text-xs font-medium">
                            <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl">
                                <span className="text-zinc-800 font-bold">Management Support</span>
                                <span className="text-zinc-500">PKR 12,000</span>
                                <span className="text-zinc-400">Jan 2026</span>
                                <span className="text-emerald-600 font-bold text-[11px]">Paid</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl">
                                <span className="text-zinc-800 font-bold">Management Support</span>
                                <span className="text-zinc-500">PKR 12,000</span>
                                <span className="text-zinc-400">July 2026</span>
                                <span className="text-amber-600 font-bold text-[11px]">Due Payment</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Stack Widgets Column Bar */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="h-44 w-full bg-zinc-800 relative">
                            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="Apartment asset preview" />
                            <span className="absolute top-3 right-3 bg-zinc-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded-md">Apartment</span>
                        </div>
                        <div className="p-4">
                            <h4 className="text-sm font-black text-zinc-900">Skyline Luxury Apartment</h4>
                            <p className="text-[11px] text-zinc-400 mt-0.5">📍 DHA Phase 6, Karachi</p>
                            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-50">
                                <span className="text-[10px] font-bold text-zinc-400">Rent</span>
                                <p className="text-sm font-black text-[#C58940]">PKR 120,000 <span className="text-[9px] font-medium text-zinc-400">/ month</span></p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                        <h4 className="text-xs font-black text-zinc-800 uppercase tracking-wider mb-1">Quick Actions</h4>
                        <button
                            onClick={() => setIsQuoteOpen(true)}
                            className="w-full bg-[#C58940] hover:bg-[#ad7432] text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-colors shadow-sm"
                        >
                            Send Quote
                        </button>
                        <button className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-100 text-zinc-700 font-bold text-xs py-2.5 px-4 rounded-xl transition-colors">
                            Mark as Active
                        </button>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                        <h4 className="text-xs font-black text-zinc-800 uppercase tracking-wider mb-1">Reports & Documents</h4>
                        <div className="flex items-center justify-between p-2.5 bg-rose-50/20 border border-rose-100/10 rounded-xl text-xs">
                            <div className="flex items-center gap-2 min-w-0">
                                <div className="p-2 bg-rose-50 text-rose-500 rounded-lg shrink-0"><FileText size={14} /></div>
                                <div className="min-w-0"><p className="font-bold text-zinc-800 truncate">Inspection Report PDF</p><p className="text-[9px] text-zinc-400">2.4 MB</p></div>
                            </div>
                            <button className="p-1.5 text-zinc-400 hover:text-zinc-600"><Download size={14} /></button>
                        </div>

                        <div className="flex items-center justify-between p-2.5 bg-blue-50/20 border border-blue-100/10 rounded-xl text-xs">
                            <div className="flex items-center gap-2 min-w-0">
                                <div className="p-2 bg-blue-50 text-blue-500 rounded-lg shrink-0"><FileText size={14} /></div>
                                <div className="min-w-0"><p className="font-bold text-zinc-800 truncate">Property Photos</p><p className="text-[9px] text-zinc-400">12 files</p></div>
                            </div>
                            <button className="p-1.5 text-zinc-400 hover:text-zinc-600"><Download size={14} /></button>
                        </div>

                        <button className="w-full mt-2 border border-amber-600/20 bg-amber-50/10 hover:bg-amber-50/40 text-[#C58940] text-xs font-bold py-2 px-4 rounded-xl transition-colors inline-flex items-center justify-center gap-2">
                            📥 Download Report
                        </button>
                    </div>
                </div>
            </div>

            <QuoteFormModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
        </div>
    );
}
