import React from 'react';
import {
  MdMoreHoriz, MdAdd, MdAssignment, MdDescription, MdCalendarToday,
  MdTrendingUp, MdTrendingDown, MdFileDownload, MdArrowUpward, MdArrowDownward
} from 'react-icons/md';

/* ─── Stat Card Sparklines ─── */
const Sparkline = ({ points, color }) => {
  return (
    <svg className="w-[120px] h-[48px] shrink-0" viewBox="0 0 100 40">
      <path
        d={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/* ─── Static Data ─── */
const statsData = [
  {
    label: 'Total Properties',
    value: '1,986',
    growth: '15%',
    isUp: true,
    sparklinePoints: 'M5,35 Q20,15 35,28 T65,12 T95,10',
    color: '#10B981'
  },
  {
    label: 'Active Rentals',
    value: '500',
    growth: '7.45%',
    isUp: false,
    sparklinePoints: 'M5,10 Q20,12 35,22 T65,28 T95,36',
    color: '#EF4444'
  },
  {
    label: 'Monthly Earnings',
    value: '300',
    growth: '16.12%',
    isUp: true,
    sparklinePoints: 'M5,30 Q20,18 35,32 T65,15 T95,20',
    color: '#EF4444' // In user's image the monthly earnings trend line is red/pinkish wavy line
  },
];

const quickActions = [
  {
    label: 'ADD PROPERTY',
    icon: () => (
      <span className="text-xl font-bold leading-none">+</span>
    ),
    isAdd: true
  },
  {
    label: 'SURVEY REPORT',
    icon: () => (
      <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 20h9M3 20h9M3 12h18M3 4h18" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    isAdd: false
  },
  {
    label: 'VIEW AGREEMENT',
    icon: () => (
      <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    isAdd: false
  },
  {
    label: 'VIEW UPCOMING VISIT',
    icon: () => (
      <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    isAdd: false
  },
];

const tenants = [
  {
    name: 'Sarah Jenkins',
    desc: 'Viewing Request • Gulberg III, Lahore',
    badge: 'High Match',
    badgeClass: 'bg-[#EBF5FF] text-[#2563EB] border border-[#BFDBFE]/60',
    time: '2h ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
  },
  {
    name: 'Usman Tariq',
    desc: 'Offer Submitted • DHA Phase 5, Karachi',
    badge: 'Pending Docs',
    badgeClass: 'bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]/60',
    time: '5h ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
  },
];

const notifications = [
  {
    title: 'New tenant request received',
    desc: 'Zain Mansoor is interested in Villa 42, Bahria Town.',
    time: '18 mins ago',
    iconBg: 'bg-[#EBF5FF]',
    iconColor: 'text-[#2563EB]',
    icon: () => (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    )
  },
  {
    title: 'Agreement expiring soon',
    desc: 'Property F-7/2 lease ends in 14 days.',
    time: '3 hours ago',
    iconBg: 'bg-[#FFF5F5]',
    iconColor: 'text-[#F87171]',
    icon: () => (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: 'Payment Confirmed',
    desc: 'Received PKR 85,000 from Sarah Malik.',
    time: 'Yesterday',
    iconBg: 'bg-[#EBFDF5]',
    iconColor: 'text-[#34D399]',
    icon: () => (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
];

/* ─── Main Component ─── */
const OwnerDashboard = () => {
  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1600px] mx-auto bg-[#F8F9FC] min-h-screen">

      {/* ───────── Welcome Section ───────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#112338] leading-tight tracking-tight flex items-center gap-2">
            Welcome Back, Samra <span className="animate-bounce">👋</span>
          </h2>
          <p className="text-gray-500 text-[13px] md:text-[14px] mt-1 font-medium">
            Here's what's happening with your properties today.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 text-[13px] font-bold shadow-sm hover:bg-gray-50 active:scale-[0.98] transition-all">
            <MdFileDownload size={17} /> Export Report
          </button>
          <button className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-lg bg-[#B68B39] text-white text-[13px] font-bold shadow-lg shadow-[#B68B39]/20 hover:bg-[#a0762d] active:scale-[0.98] transition-all">
            <span className="text-base font-extrabold">+</span> Add Property
          </button>
        </div>
      </div>

      {/* ───────── Stats Cards ───────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statsData.map((s, i) => (
          <div key={i} className="relative bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100/60 hover:shadow-md transition-shadow duration-300">
            <MdMoreHoriz className="absolute top-5 right-5 text-gray-300 cursor-pointer hover:text-gray-600 transition-colors" size={22} />
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">{s.label}</span>
                <p className="text-[34px] font-extrabold text-[#112338] leading-none mt-2 tracking-tight">{s.value}</p>
                <div className="flex items-center gap-1.5 mt-3">
                  <span className={`text-[11px] font-bold flex items-center gap-0.5 ${s.isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                    {s.isUp ? <MdArrowUpward size={13} /> : <MdArrowDownward size={13} />} {s.growth}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">{s.growthLabel}</span>
                </div>
              </div>
              <Sparkline points={s.sparklinePoints} color={s.color} />
            </div>
          </div>
        ))}
      </div>

      {/* ───────── Statistics Chart + Quick Actions ───────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Statistics Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-[11.5px] text-gray-400 font-bold uppercase tracking-wider">Statistics</p>
              <h3 className="text-[18px] font-extrabold text-[#112338] mt-1 leading-tight flex items-baseline gap-1">
                Total income <span className="text-[12px] font-medium text-gray-400">past 30 days</span>
              </h3>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-bold text-gray-500 shrink-0">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" /> Last Month
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]" /> This Month
              </span>
            </div>
          </div>

          {/* Line Chart Grid SVG */}
          <div className="w-full relative mt-2 pt-2">
            <svg viewBox="0 0 540 220" className="w-full h-auto" style={{ maxHeight: '230px' }}>
              {/* Horizontal grid lines */}
              {[20, 60, 100, 140, 180].map((y, i) => (
                <line key={i} x1="45" y1={y} x2="520" y2={y} stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
              ))}
              {/* Y labels */}
              {[{ y: 24, t: '10k' }, { y: 64, t: '5k' }, { y: 104, t: '1k' }, { y: 144, t: '0' }].map((l, i) => (
                <text key={i} x="8" y={l.y} fontSize="11" fill="#94A3B8" className="font-bold" fontFamily="Outfit,sans-serif">{l.t}</text>
              ))}
              {/* X labels */}
              {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((l, i) => (
                <text key={i} x={115 + i * 115} y="208" textAnchor="middle" fontSize="11" fill="#94A3B8" className="font-bold" fontFamily="Outfit,sans-serif">{l}</text>
              ))}

              {/* Purple Curve (Last Month) */}
              <path
                d="M60,120 C85,95 110,60 135,50 C160,40 185,120 210,60 C235,30 260,160 285,55 C310,40 335,160 360,65 C385,50 410,150 435,55 C460,40 485,120 510,70"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Pink Curve (This Month) */}
              <path
                d="M60,105 C85,115 110,85 135,95 C160,105 185,50 210,80 C235,95 260,110 285,85 C310,65 335,45 360,65 C385,85 410,105 435,90 C460,82 485,75 510,78"
                fill="none"
                stroke="#F43F5E"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100/60">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[18px] font-extrabold text-[#112338]">Quick Actions</h3>
            <MdMoreHoriz className="text-gray-300 cursor-pointer hover:text-gray-600" size={22} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((a, i) => (
              <div
                key={i}
                className={`quick-action-card flex flex-col items-center justify-center gap-3 p-5 rounded-xl border cursor-pointer transition-all duration-200 select-none
                  ${a.isAdd
                    ? 'bg-[#B68B39] border-[#B68B39] text-white shadow-lg shadow-[#B68B39]/20 hover:bg-[#a0762d] active:scale-[0.97]'
                    : 'bg-white border-dashed border-gray-200 text-[#112338] hover:border-[#B68B39]/40 hover:bg-gray-50/50 active:scale-[0.97]'}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${a.isAdd ? 'bg-white/20' : 'bg-gray-50'}`}>
                  {a.icon()}
                </div>
                <span className="text-[10px] font-extrabold tracking-[0.08em] uppercase leading-tight text-center">
                  {a.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ───────── Tenant List + Notifications ───────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Smart Tenant List */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100/60">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[18px] font-extrabold text-[#112338]">Smart Tenant List</h3>
            <a href="#" className="text-[#B68B39] text-[13px] font-bold hover:underline transition-all">View All</a>
          </div>
          <div className="space-y-3.5">
            {tenants.map((t, i) => (
              <div key={i} className="flex items-center gap-4 p-3.5 rounded-xl border border-gray-50 hover:bg-gray-50/50 hover:border-gray-100 transition-all duration-200">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover shrink-0 ring-2 ring-gray-50"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-extrabold text-[#112338]">{t.name}</p>
                  <p className="text-[11.5px] text-gray-500 truncate mt-0.5 font-medium">{t.desc}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-[9.5px] font-extrabold px-2 py-0.5 rounded ${t.badgeClass} uppercase tracking-wider`}>
                      {t.badge}
                    </span>
                    <span className="text-[10.5px] text-gray-400 font-medium">🕐 {t.time}</span>
                  </div>
                </div>
                {/* Gold Circle Checkmark/Verification Button */}
                <button className="w-8 h-8 rounded-full bg-[#B68B39]/10 hover:bg-[#B68B39]/20 flex items-center justify-center shrink-0 transition-colors">
                  <svg className="w-4 h-4 text-[#B68B39]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100/60">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[18px] font-extrabold text-[#112338]">Recent Notifications</h3>
            <MdMoreHoriz className="text-gray-300 cursor-pointer hover:text-gray-600" size={22} />
          </div>
          <div className="space-y-4">
            {notifications.map((n, i) => (
              <div key={i} className="flex items-start gap-3.5 group">
                <div className={`w-9 h-9 rounded-full ${n.iconBg} ${n.iconColor} flex items-center justify-center shrink-0 ring-4 ring-offset-2 ring-transparent group-hover:ring-gray-50 transition-all`}>
                  {n.icon()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-extrabold text-[#112338] leading-snug">{n.title}</p>
                  <p className="text-[11.5px] text-gray-500 mt-0.5 leading-relaxed font-medium">{n.desc}</p>
                  <p className="text-[10px] text-gray-400 mt-1 font-medium flex items-center gap-0.5">🕐 {n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
