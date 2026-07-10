import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTopBar } from '../../context/TopBarContext';
import { 
  MdArrowBack,
  MdFileDownload,
  MdWaterDrop,
  MdReply,
  MdFileUpload,
  MdOutlineRemoveCircleOutline,
  MdCheckCircle,
  MdPerson,
  MdAutorenew,
  MdLightbulbOutline
} from 'react-icons/md';

const TenantTicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setTopBar } = useTopBar();

  useEffect(() => {
    setTopBar({ title: '' });
  }, [setTopBar]);

  const ticketId = `TIC-${id || '1025'}`;

  return (
    <div className="p-8 max-w-7xl mx-auto animate-fade-in pb-16">
      
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/tenant/tickets')}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 border border-gray-100/50 shadow-sm transition-all shrink-0"
          >
            <MdArrowBack size={20} />
          </button>
          <div>
            <h1 className="text-[28px] font-bold text-[#112338]">Ticket Details</h1>
            <p className="text-gray-500 text-[14px] mt-1">Reviewing issue status and conversation history.</p>
          </div>
        </div>
        <button className="bg-white text-[#112338] px-5 py-2.5 border border-gray-200 rounded-xl font-bold text-[13px] flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm whitespace-nowrap">
          <MdFileDownload size={18} /> Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Ticket Info Card */}
          <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100/50">
            
            {/* Header section of card */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-[24px] font-extrabold text-[#112338]">{ticketId}</h2>
                  <span className="px-3 py-1 bg-[#E8F0FE] text-[#1A73E8] rounded-full text-[12px] font-bold">In Progress</span>
                </div>
                <p className="text-gray-500 text-[15px]">Skyline Luxury Apartment — Unit 402</p>
              </div>
              <div className="text-right">
                <span className="inline-block px-2.5 py-1 bg-[#FCE8E8] text-[#D93025] rounded text-[10px] font-extrabold uppercase tracking-widest mb-2">HIGH PRIORITY</span>
                <p className="text-gray-400 text-[12px]">Submitted: 15 Jan 2026</p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-100">
              <div>
                <p className="text-gray-400 text-[11px] font-extrabold uppercase tracking-widest mb-3">ISSUE TYPE</p>
                <div className="flex items-center gap-2 font-bold text-[#112338] text-[15px]">
                  <MdWaterDrop className="text-[#1A73E8]" size={20} />
                  Water Leakage
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-[11px] font-extrabold uppercase tracking-widest mb-3">ASSIGNED PROFESSIONAL</p>
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80" alt="David Miller" className="w-8 h-8 rounded-full object-cover" />
                  <span className="font-bold text-[#112338] text-[15px]">David Miller (Plumber)</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-[#112338] font-bold text-[16px] mb-3">Issue Description</h3>
              <p className="text-[#222222] text-[15px] leading-relaxed">
                Water leakage observed near kitchen ceiling causing wall damage. The moisture is spreading towards the electrical sockets, making it a safety hazard.
              </p>
            </div>

            {/* Evidence */}
            <div>
              <p className="text-gray-400 text-[11px] font-extrabold uppercase tracking-widest mb-4">ATTACHED EVIDENCE (3)</p>
              <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&h=200&q=80" alt="Evidence 1" className="w-[180px] h-[120px] rounded-xl object-cover" />
                <img src="https://images.unsplash.com/photo-1595814436676-4654b971a1cb?auto=format&fit=crop&w=300&h=200&q=80" alt="Evidence 2" className="w-[180px] h-[120px] rounded-xl object-cover" />
                <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=300&h=200&q=80" alt="Evidence 3" className="w-[180px] h-[120px] rounded-xl object-cover" />
              </div>
            </div>
          </div>

          {/* Conversation Thread */}
          <div>
            <h3 className="text-[#112338] font-bold text-[18px] mb-6 pl-2">Conversation Thread</h3>
            <div className="space-y-6">
              
              {/* Tenant Message */}
              <div className="flex gap-4">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80" alt="Sarah" className="w-10 h-10 rounded-full object-cover shrink-0" />
                <div className="bg-white rounded-2xl rounded-tl-none p-5 shadow-sm border border-gray-100/50 flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-[#112338] text-[14px]">Sarah Jenkins (Tenant)</h4>
                    <span className="text-gray-400 text-[12px]">15 Jan, 09:20 AM</span>
                  </div>
                  <p className="text-[#222222] text-[14px] leading-relaxed">
                    The leakage issue is getting worse after rainfall last night. It's now dripping directly onto the kitchen counter. Can we expedite the inspection?
                  </p>
                </div>
              </div>

              {/* Management Message */}
              <div className="flex gap-4 justify-end">
                <div className="bg-[#FEF7E6] rounded-2xl rounded-tr-none p-5 shadow-sm border border-[#F0E6D2] flex-1 max-w-[90%]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-[12px]">15 Jan, 11:45 AM</span>
                    <h4 className="font-bold text-[#112338] text-[14px]">Management Support</h4>
                  </div>
                  <p className="text-[#222222] text-[14px] leading-relaxed text-right">
                    Our maintenance team has been assigned and will visit tomorrow morning between 9:00 AM and 11:00 AM. David Miller will be your technician.
                  </p>
                </div>
                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&h=150&q=80" alt="Admin" className="w-10 h-10 rounded-full object-cover shrink-0" />
              </div>

            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Actions Card */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100/50">
            <h3 className="text-[#112338] font-bold text-[16px] mb-5">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-[#B68B39] text-white py-3.5 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-[#9c752c] transition-colors shadow-sm">
                <MdReply size={18} /> Reply to Ticket
              </button>
              <button className="w-full bg-[#F8F9FA] text-[#112338] py-3.5 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
                <MdFileUpload size={18} /> Upload More Images
              </button>
              <button className="w-full bg-white text-[#D93025] border border-gray-100 py-3.5 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-red-50 transition-colors">
                <MdOutlineRemoveCircleOutline size={18} /> Close Ticket
              </button>
            </div>
          </div>

          {/* Activity Log Card */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100/50">
            <h3 className="text-[#112338] font-bold text-[16px] mb-6">Activity Log</h3>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
              
              {/* Timeline Item 1 */}
              <div className="relative flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#1E8E3E] text-white flex items-center justify-center shrink-0 z-10 shadow-[0_0_0_4px_white]">
                  <MdCheckCircle size={16} />
                </div>
                <div className="pt-1.5">
                  <h4 className="text-[13px] font-bold text-[#112338]">Ticket Created</h4>
                  <p className="text-gray-400 text-[11px] mt-0.5">15 Jan 2026, 09:15 AM</p>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#1A73E8] text-white flex items-center justify-center shrink-0 z-10 shadow-[0_0_0_4px_white]">
                  <MdPerson size={16} />
                </div>
                <div className="pt-1.5">
                  <h4 className="text-[13px] font-bold text-[#112338]">Agent Assigned</h4>
                  <p className="text-gray-400 text-[11px] mt-0.5">15 Jan 2026, 10:30 AM</p>
                  <p className="text-[#1A73E8] text-[12px] font-medium mt-1">Assigned to: Support Team</p>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="relative flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#1A73E8] text-white flex items-center justify-center shrink-0 z-10 shadow-[0_0_0_4px_white]">
                  <MdAutorenew size={16} />
                </div>
                <div className="pt-1.5">
                  <h4 className="text-[13px] font-bold text-[#112338]">Status Changed: In Progress</h4>
                  <p className="text-gray-400 text-[11px] mt-0.5">15 Jan 2026, 11:45 AM</p>
                </div>
              </div>

            </div>
          </div>

          {/* Did you know Card */}
          <div className="bg-[#112338] rounded-[24px] p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B68B39]/20 blur-3xl rounded-full pointer-events-none"></div>
            
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-[#B68B39] mb-4 relative z-10">
              <MdLightbulbOutline size={18} />
            </div>
            <h3 className="font-bold text-[15px] mb-2 relative z-10">Did you know?</h3>
            <p className="text-gray-300 text-[13px] leading-relaxed relative z-10">
              Urgent tickets are usually resolved within 4-6 hours. You can request an emergency contractor for issues involving electricity or main water lines.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TenantTicketDetail;
