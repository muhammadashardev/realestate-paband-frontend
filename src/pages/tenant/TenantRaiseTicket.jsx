import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTopBar } from '../../context/TopBarContext';
import { 
  MdArrowBack,
  MdCheckCircle,
  MdOutlineRemoveRedEye,
  MdOutlineDashboard
} from 'react-icons/md';

const TenantRaiseTicket = () => {
  const { setTopBar } = useTopBar();
  const navigate = useNavigate();
  const [priority, setPriority] = useState('Low');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    setTopBar({ title: '' });
  }, [setTopBar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fade-in pb-16">
      
      {/* Header Area */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/tenant/tickets')}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 border border-gray-100/50 shadow-sm transition-all shrink-0"
        >
          <MdArrowBack size={20} />
        </button>
        <div>
          <h1 className="text-[28px] font-bold text-[#112338]">Raise Support Ticket</h1>
          <p className="text-gray-500 text-[14px] mt-1">Describe your issue and submit a maintenance or support request.</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100/50 relative">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#112338] text-[13px] font-bold mb-2">Property Selection</label>
              <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] text-gray-700 focus:outline-none focus:border-[#B68B39] appearance-none">
                <option>Skyline Apartment - Unit 402</option>
                <option>Bahria Villa - Street 12</option>
              </select>
            </div>
            <div>
              <label className="block text-[#112338] text-[13px] font-bold mb-2">Issue Category</label>
              <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] text-gray-700 focus:outline-none focus:border-[#B68B39] appearance-none">
                <option>Plumbing</option>
                <option>Electrical</option>
                <option>HVAC</option>
                <option>Appliance</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[#112338] text-[13px] font-bold mb-2">Priority Level</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button 
                type="button"
                onClick={() => setPriority('Low')}
                className={`py-3.5 rounded-xl text-[14px] font-bold transition-all ${priority === 'Low' ? 'border border-[#B88A44] text-[#B88A44] bg-[#FEF7E6]' : 'border border-gray-200 text-gray-500 hover:bg-gray-50'}`}
              >
                Low
              </button>
              <button 
                type="button"
                onClick={() => setPriority('Medium')}
                className={`py-3.5 rounded-xl text-[14px] font-bold transition-all ${priority === 'Medium' ? 'border border-[#E67E22] text-[#E67E22] bg-[#FFF0E6]' : 'border border-gray-200 text-gray-500 hover:bg-gray-50'}`}
              >
                Medium
              </button>
              <button 
                type="button"
                onClick={() => setPriority('High')}
                className={`py-3.5 rounded-xl text-[14px] font-bold transition-all ${priority === 'High' ? 'border border-[#D93025] text-[#D93025] bg-[#FCE8E8]' : 'border border-gray-200 text-gray-500 hover:bg-gray-50'}`}
              >
                High
              </button>
              <button 
                type="button"
                onClick={() => setPriority('Urgent')}
                className={`py-3.5 rounded-xl text-[14px] font-bold transition-all ${priority === 'Urgent' ? 'border border-[#E50000] text-[#E50000] bg-[#FFCCCC]' : 'border border-gray-200 text-[#D93025] hover:bg-gray-50'}`}
              >
                Urgent
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[#112338] text-[13px] font-bold mb-2">Issue Title</label>
            <input 
              type="text" 
              placeholder="e.g. Kitchen tap leaking continuously"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] text-gray-700 focus:outline-none focus:border-[#B68B39]"
            />
          </div>

          <div>
            <label className="block text-[#112338] text-[13px] font-bold mb-2">Issue Description</label>
            <textarea 
              placeholder="Provide as much detail as possible about the problem..."
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] text-gray-700 focus:outline-none focus:border-[#B68B39] h-32 resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-[#112338] text-[13px] font-bold mb-2">Upload Area</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center bg-[#F8F9FA] hover:bg-[#F2F4F7] transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm text-gray-400">
                {/* Empty circle like in design */}
              </div>
              <h4 className="text-[#112338] font-bold text-[14px] mb-1">Click to upload or drag and drop</h4>
              <p className="text-gray-400 text-[12px]">Upload supporting images or videos related to the issue.</p>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-4">
            <button 
              type="button"
              onClick={() => navigate('/tenant/tickets')}
              className="px-8 py-3.5 bg-white text-gray-500 border border-gray-200 rounded-xl font-bold text-[14px] hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-8 py-3.5 bg-[#B68B39] text-white rounded-xl font-bold text-[14px] hover:bg-[#9c752c] transition-colors shadow-sm"
            >
              Submit Ticket
            </button>
          </div>

        </form>

        {/* Success Modal Overlay */}
        {isSuccessModalOpen && (
          <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center rounded-[24px] backdrop-blur-[2px] animate-fade-in">
            <div className="bg-white p-10 rounded-[32px] w-full max-w-[400px] shadow-2xl flex flex-col items-center text-center mx-4">
              
              <div className="w-20 h-20 bg-[#1E8E3E] text-white rounded-full flex items-center justify-center mb-6 shadow-[0_8px_16px_-6px_rgba(30,142,62,0.5)]">
                <MdCheckCircle size={40} />
              </div>

              <h2 className="text-[26px] font-extrabold text-[#112338] mb-4 leading-tight">Ticket Submitted<br/>Successfully</h2>
              
              <p className="text-gray-500 text-[14px] leading-relaxed mb-8">
                Your ticket <span className="font-bold text-[#112338]">#TIC-1028</span> has been created. Our team will review it and get back to you shortly.
              </p>

              <div className="w-full space-y-3">
                <button 
                  onClick={() => navigate('/tenant/tickets/1028')}
                  className="w-full bg-[#B68B39] text-white py-4 rounded-xl font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-[#9c752c] transition-colors shadow-[0_8px_16px_-6px_rgba(182,139,57,0.4)]"
                >
                  <MdOutlineRemoveRedEye size={20} /> View Ticket
                </button>
                <button 
                  onClick={() => navigate('/tenant')}
                  className="w-full bg-white text-[#112338] border border-gray-200 py-4 rounded-xl font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  <MdOutlineDashboard size={20} /> Back to Dashboard
                </button>
              </div>

            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default TenantRaiseTicket;
