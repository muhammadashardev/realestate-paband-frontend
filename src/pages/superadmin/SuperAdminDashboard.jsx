import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Home, Heart, Bell, ChevronRight, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function SuperAdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { title: 'Total Owners & Tenants', value: '1,245', tag: 'ACTIVE', tagBg: 'bg-emerald-50 text-emerald-600', iconColor: 'text-amber-600', bg: 'bg-amber-50/50' },
    { title: 'Properties', value: '456', tag: 'VERIFIED', tagBg: 'bg-amber-50 text-amber-600', iconColor: 'text-amber-700', bg: 'bg-amber-50/40' },
    { title: 'Verification Status', value: '142 Completed', tag: 'SUCCESS', tagBg: 'bg-emerald-50 text-emerald-600', iconColor: 'text-amber-600', bg: 'bg-amber-50/50' },
    { title: 'Disputes & Complaints', value: '9 Open', tag: 'PENDING', tagBg: 'bg-rose-50 text-rose-500', iconColor: 'text-rose-600', bg: 'bg-rose-50/30' },
  ];

  const approvals = [
    { title: 'Skyline Residence Approval', desc: 'New properties to interestion approval.' },
    { title: 'Property Unit 202 Review', desc: 'New service rervices, starting review.' },
    { title: 'Vendor Coordination', desc: 'Awaiting quotation creation.' },
    { title: 'Payment Verification', desc: 'Invoice ID: INV-1056' },
  ];

  const activities = [
    { type: 'tenant', title: 'New tenant request received', desc: 'Zain Mansoor is interested in Villa 42, Bahria Town.', time: '3 hours ago', iconBg: 'bg-blue-50 text-blue-500' },
    { type: 'expiry', title: 'Agreement expiring soon', desc: 'Property F-7/2 lease ends in 14 days.', time: '3 hours ago', iconBg: 'bg-rose-50 text-rose-400' },
    { type: 'expiry', title: 'Agreement expiring soon', desc: 'Property F-7/2 lease ends in 14 days.', time: '3 hours ago', iconBg: 'bg-rose-50 text-rose-400' },
    { type: 'payment', title: 'Payment Confirmed', desc: 'Received PKR 85,000 from Sarah Malik.', time: 'Yesterday', iconBg: 'bg-purple-50 text-purple-500' },
  ];

  const topAreas = [
    { name: 'DHA', count: '1924 Properties', width: 'w-full' },
    { name: 'Clifton', count: '1924 Properties', width: 'w-[85%]' },
    { name: 'Gulshan', count: '1924 Properties', width: 'w-[75%]' },
    { name: 'Nazimabad', count: '1924 Properties', width: 'w-[50%]' },
    { name: 'Bahria', count: '4 Properties', width: 'w-[20%]', min: true },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-[#111111] font-sans antialiased">
      {/* Sidebar imported here */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-x-hidden  z-0">
        {/* Top Navbar Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-200/60">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-800 ml-12 md:ml-0">Dashboard</h1>
          <div className="flex items-center gap-4 self-end sm:self-auto">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-zinc-500">
              <Heart size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative text-zinc-500">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="Profile" className="w-9 h-9 rounded-full object-cover border border-zinc-200" />
              <div className="text-left hidden sm:block">
                <p className="text-sm font-semibold text-zinc-800 leading-none">Ali</p>
                <span className="text-[11px] text-zinc-400 font-medium">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Welcome Section */}
        <div className="my-8">
          <h2 className="text-3xl font-extrabold flex items-center gap-2 text-zinc-900 tracking-tight">
            Welcome Back <span className="animate-pulse">👋</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1">Here's what's happening across Paband today.</p>
        </div>

        {/* 4 Stats Grid Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between min-h-[140px]">
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-xl ${stat.bg} ${stat.iconColor}`}>
                  <Home size={18} />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider ${stat.tagBg}`}>
                  {stat.tag}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-xs font-medium text-zinc-400">{stat.title}</p>
                <p className="text-2xl font-bold text-zinc-800 mt-1 tracking-tight">{stat.value}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Center Split: Approval & Recent Activity */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Approval Center */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
            <h3 className="text-lg font-bold text-zinc-800 mb-5">Approval Center</h3>
            <div className="space-y-3">
              {approvals.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-all group bg-white">
                  <div className="flex items-start gap-4">
                    <div className="w-1.5 h-10 bg-[#C58940] rounded-full self-center"></div>
                    <div className="p-2 bg-amber-50 rounded-full text-amber-700 self-center">
                      <Clock size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-800">{item.title}</h4>
                      <p className="text-xs text-zinc-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-zinc-300 group-hover:text-zinc-500 transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-zinc-800 mb-5">Recent Activity</h3>
            <div className="space-y-4">
              {activities.map((act, idx) => (
                <div key={idx} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className={`p-2 rounded-xl shrink-0 ${act.iconBg}`}>
                    <CheckCircle size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-zinc-800 truncate">{act.title}</h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-2 leading-relaxed">{act.desc}</p>
                    <span className="text-[10px] text-zinc-300 font-medium mt-1 block">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Areas Analytics Bars */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-zinc-800 mb-6">Top Areas</h3>
          <div className="space-y-4">
            {topAreas.map((area, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="w-20 text-xs font-semibold text-zinc-600">{area.name}</span>
                <div className="flex-1 bg-gray-50 h-9 rounded-lg overflow-hidden relative">
                  <div className={`h-full ${area.width} bg-[#C58940] rounded-lg flex items-center justify-end px-4 transition-all duration-500`}>
                    <span className={`text-xs font-bold ${area.min ? 'text-zinc-700 absolute left-24' : 'text-white'}`}>
                      {area.count}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
