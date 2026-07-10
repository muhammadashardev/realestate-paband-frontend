import React from 'react';
import { Calendar, X } from 'lucide-react';

export default function QuoteFormModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-xl border border-gray-100 transform transition-all relative max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-black text-zinc-900 text-center w-full">Quote Form</h3>
                    <button onClick={onClose} className="absolute top-5 right-5 p-1.5 hover:bg-gray-100 rounded-full text-zinc-400 transition-colors">
                        <X size={16} />
                    </button>
                </div>

                <div className="bg-[#222] text-white p-3 rounded-2xl flex items-center gap-3.5 mb-5">
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-zinc-800">
                        <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" alt="asset view thumbnail" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-black truncate">Skyline Luxury Apartment</h4>
                        <p className="text-[10px] text-zinc-400 mt-0.5">📍 DHA Phase 6, Karachi</p>
                        <p className="text-[11px] font-bold text-amber-400 mt-1">PKR 120,000 / Month</p>
                    </div>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-4 text-xs font-medium">
                    <div>
                        <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">Property Area</label>
                        <input
                            type="text"
                            defaultValue="120 Sq Yards"
                            className="w-full bg-gray-50 border border-gray-100 px-3.5 py-2.5 rounded-xl outline-none text-zinc-800 font-semibold"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">Quote Amount</label>
                        <input
                            type="text"
                            placeholder="PKR 12,000"
                            className="w-full bg-gray-50 border border-gray-100 px-3.5 py-2.5 rounded-xl outline-none text-zinc-800 font-semibold"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">Valid Until</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Select Date (DD/MM/YYYY)"
                                className="w-full bg-gray-50 border border-gray-100 px-3.5 py-2.5 rounded-xl outline-none text-zinc-500 font-semibold pr-10"
                            />
                            <Calendar size={14} className="absolute right-3.5 top-3 text-zinc-400" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wide mb-1.5">Notes</label>
                        <textarea
                            rows={3}
                            placeholder="Tell us more about your visit requirements..."
                            className="w-full bg-gray-50 border border-gray-100 px-3.5 py-2.5 rounded-xl outline-none text-zinc-500 resize-none font-medium leading-relaxed"
                        />
                    </div>

                    <div className="pt-2 space-y-2">
                        <button className="w-full bg-[#C58940] hover:bg-[#ad7432] text-white font-bold py-3 rounded-xl transition-colors shadow-md text-xs tracking-wide">
                            Send Quote 🚀
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-zinc-500 font-bold py-2.5 rounded-xl transition-colors text-xs"
                        >
                            Cancel
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}
