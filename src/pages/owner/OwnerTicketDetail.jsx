import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdAccessTime, MdSend } from 'react-icons/md';
import { useTopBar } from '../../context/TopBarContext';

const mockTickets = [
  {
    id: 'TXN-1025',
    tenant: { name: 'Ali Raza', avatar: 'https://i.pravatar.cc/150?u=ali' },
    property: 'Skyline Apartment, Unit 4B',
    category: 'Plumbing Issue',
    priority: 'High',
    status: 'OPEN',
    date: '15 Jan 2026',
    desc: 'Water leakage detected under the kitchen sink causing floor damage.',
    images: [
      { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop', name: 'Kitchen Sink Area' },
      { url: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?q=80&w=2070&auto=format&fit=crop', name: 'Water Leakage Photo' },
      { url: 'https://images.unsplash.com/photo-1621217036224-11883770d10b?q=80&w=2070&auto=format&fit=crop', name: 'Floor Damage Image' }
    ]
  },
  {
    id: 'TXN-1026',
    tenant: { name: 'Ali Raza', avatar: 'https://i.pravatar.cc/150?u=ali' },
    property: 'Skyline Apartment, Unit 4B',
    category: 'Electricity',
    priority: 'Medium',
    status: 'IN PROGRESS',
    date: '16 Jan 2026',
    desc: 'Short circuit in the corridor light fixture. Sparks when switched on.',
    images: []
  },
  {
    id: 'TXN-1027',
    tenant: { name: 'Ali Raza', avatar: 'https://i.pravatar.cc/150?u=ali' },
    property: 'Skyline Apartment, Unit 4B',
    category: 'Agreements',
    priority: 'Low',
    status: 'OPEN',
    date: '17 Jan 2026',
    desc: 'Requesting copies of the signed rental agreement for office record.',
    images: []
  },
  {
    id: 'TXN-1028',
    tenant: { name: 'Ali Raza', avatar: 'https://i.pravatar.cc/150?u=ali' },
    property: 'Skyline Apartment, Unit 4B',
    category: 'Plumbing',
    priority: 'High',
    status: 'CLOSED',
    date: '14 Jan 2026',
    desc: 'Bathroom drain clogging issue resolved by service team.',
    images: []
  }
];

const OwnerTicketDetail = () => {
  const { setTopBar, resetTopBar } = useTopBar();
  const { id } = useParams();

  // Find corresponding ticket, or default to the first mock ticket if not found
  const ticket = mockTickets.find(t => t.id === id) || mockTickets[0];

  useEffect(() => {
    setTopBar({
      title: 'Ticket Details',
    });
    return () => resetTopBar();
  }, [setTopBar, resetTopBar]);

  const getStatusStyle = (status) => {
    switch (status?.toUpperCase()) {
      case 'OPEN': return 'text-[#FF8A00] bg-[#FF8A00]/10';
      case 'IN PROGRESS': return 'text-[#3B82F6] bg-[#3B82F6]/10';
      case 'CLOSED': return 'text-[#EF4444] bg-[#EF4444]/10';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority?.toUpperCase()) {
      case 'HIGH': return 'text-[#EF4444] bg-[#EF4444]/10';
      case 'MEDIUM': return 'text-[#3B82F6] bg-[#3B82F6]/10';
      case 'LOW': return 'text-gray-500 bg-gray-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500">
            <MdAccessTime size={18} />
          </div>
          <h1 className="text-[28px] font-extrabold text-[#1A3A60] tracking-tight">Ticket Details</h1>
        </div>
        <p className="text-[14px] text-gray-500 font-medium">
          Review tenant issue details and respond directly through the system.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
        {/* Left Column */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          {/* Ticket Info Card */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex flex-wrap items-center justify-between border-b border-gray-50 pb-6 mb-6 gap-4">
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">TICKET ID</span>
                <span className="text-[22px] font-extrabold text-[#1A3A60]">{ticket.id}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap shrink-0 ${getPriorityStyle(ticket.priority)}`}>
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${ticket.priority?.toUpperCase() === 'HIGH' ? 'bg-[#EF4444]' : ticket.priority?.toUpperCase() === 'MEDIUM' ? 'bg-[#3B82F6]' : 'bg-gray-400'}`}></span>
                  {ticket.priority} Priority
                </span>
                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap shrink-0 ${getStatusStyle(ticket.status)}`}>
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${ticket.status?.toUpperCase() === 'OPEN' ? 'bg-[#FF8A00]' : ticket.status?.toUpperCase() === 'IN PROGRESS' ? 'bg-[#3B82F6]' : 'bg-[#EF4444]'}`}></span>
                  {ticket.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4 mb-6">
              <div>
                <span className="text-[12px] font-medium text-gray-400 block mb-2">Tenant Name</span>
                <div className="flex items-center gap-2">
                  <img src={ticket.tenant.avatar} alt={ticket.tenant.name} className="w-6 h-6 rounded-full object-cover" />
                  <span className="text-[14px] font-bold text-[#1A3A60]">{ticket.tenant.name}</span>
                </div>
              </div>
              <div>
                <span className="text-[12px] font-medium text-gray-400 block mb-2">Property</span>
                <span className="text-[14px] font-bold text-[#1A3A60]">{ticket.property}</span>
              </div>
              <div>
                <span className="text-[12px] font-medium text-gray-400 block mb-2">Issue Category</span>
                <span className="text-[14px] font-bold text-[#1A3A60]">{ticket.category}</span>
              </div>
              <div>
                <span className="text-[12px] font-medium text-gray-400 block mb-2">Submitted Date</span>
                <span className="text-[14px] font-bold text-[#1A3A60]">{ticket.date}</span>
              </div>
            </div>

            <div className="border-t border-gray-50 pt-6">
              <span className="text-[12px] font-medium text-gray-400 block mb-2">Issue Description</span>
              <p className="text-[14px] font-medium text-[#1A3A60] leading-relaxed">
                {ticket.desc}
              </p>
            </div>
          </div>

          {/* Uploaded Images Card */}
          {ticket.images && ticket.images.length > 0 && (
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-[16px] font-extrabold text-[#1A3A60] mb-5">Uploaded Images</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {ticket.images.map((img, idx) => (
                  <div key={idx} className="flex flex-col gap-3">
                    <img src={img.url} alt={img.name} className="w-full h-32 object-cover rounded-xl" />
                    <span className="text-[12px] font-medium text-gray-500 text-center">{img.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Conversation */}
        <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0">
          <div className="bg-white rounded-xl flex flex-col border border-gray-100 shadow-sm">
            <div className="p-5 border-b border-gray-50">
              <h2 className="text-[16px] font-extrabold text-[#1A3A60]">Conversation</h2>
            </div>
            
            <div className="p-5 flex-1 flex flex-col gap-6 overflow-y-auto min-h-[300px]">
              {/* Tenant Message */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <img src={ticket.tenant.avatar} alt={ticket.tenant.name} className="w-6 h-6 rounded-full object-cover" />
                  <span className="text-[13px] font-bold text-[#1A3A60]">{ticket.tenant.name}</span>
                  <span className="text-[11px] font-medium text-gray-400 ml-1">10:45 AM</span>
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-4 w-[90%]">
                  <p className="text-[13px] font-medium text-[#1A3A60] leading-relaxed">
                    The leakage has increased since yesterday and requires urgent repair.
                  </p>
                </div>
              </div>

              {/* Owner/You Message */}
              <div className="flex flex-col gap-2 items-end">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium text-gray-400 mr-1">11:20 AM</span>
                  <span className="text-[13px] font-bold text-[#1A3A60]">You</span>
                  <img src="https://i.pravatar.cc/150?u=owner" alt="You" className="w-6 h-6 rounded-full object-cover" />
                </div>
                <div className="bg-[#0F2841] rounded-2xl rounded-tr-sm p-4 w-[90%]">
                  <p className="text-[13px] font-medium text-white leading-relaxed">
                    Maintenance team has been informed and inspection is scheduled tomorrow.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-gray-50">
              <textarea 
                placeholder="Write your response..."
                className="w-full h-[100px] resize-none border border-gray-200 rounded-xl p-4 text-[13px] font-medium text-[#1A3A60] focus:outline-none focus:border-[#B68B39] focus:ring-1 focus:ring-[#B68B39] mb-4 bg-gray-50/50 transition-all"
              ></textarea>
              <button className="w-full py-3.5 bg-[#B68B39] text-white rounded-xl text-[14px] font-bold hover:bg-[#a0762d] transition-colors flex items-center justify-center gap-2 active:scale-[0.99]">
                <MdSend size={18} />
                Send Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerTicketDetail;
