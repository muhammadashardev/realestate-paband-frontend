import React from 'react';
import { Link } from 'react-router-dom';
import {
  MdHome, MdDescription, MdVerified, MdPayment,
  MdCalendarToday, MdAccessTime, MdPhone, MdSearch,
  MdArrowForwardIos, MdLocationOn, MdCheckCircle
} from 'react-icons/md';
import { FiCheck, FiSearch, FiCalendar, FiCreditCard, FiChevronRight } from 'react-icons/fi';

/* ─── Status Cards Data ─── */
const statusCards = [
  {
    icon: <MdHome size={24} className="text-white" />,
    iconBg: 'bg-gradient-to-br from-[#0A2240] to-[#112338]',
    badge: 'ACTIVE',
    badgeColor: 'bg-emerald-500',
    label: 'Rental Status',
    value: 'Skyline Luxury Apt',
    hasImage: true,
    image: 'https://images.unsplash.com/photo-1570129477492-45ec003cf16f?w=400&h=300&fit=crop',
  },
  {
    icon: <MdDescription size={24} className="text-[#B68B39]" />,
    iconBg: 'bg-[#B68B39]/10',
    badge: 'VERIFIED',
    badgeColor: 'bg-[#B68B39]',
    label: 'Agreement Status',
    value: 'Legally Secured',
    hasImage: false,
  },
  {
    icon: <MdVerified size={24} className="text-emerald-600" />,
    iconBg: 'bg-emerald-50',
    badge: 'SUCCESS',
    badgeColor: 'bg-emerald-500',
    label: 'Verification Status',
    value: 'Full Documented',
    hasImage: false,
  },
  {
    icon: <MdPayment size={24} className="text-[#112338]" />,
    iconBg: 'bg-blue-50',
    badge: 'NO PENDING',
    badgeColor: 'bg-[#112338]',
    label: 'Payment Overview',
    value: 'Paid On Time',
    hasImage: false,
  },
];

/* ─── Upcoming Visits Data ─── */
const upcomingVisits = [
  {
    name: 'Skyline Luxury',
    badge: 'APPROVED',
    badgeColor: 'bg-emerald-500',
    location: 'DHA Phase 6',
    date: 'Oct 12, 2026',
    time: '10:30 AM',
    image: 'https://images.unsplash.com/photo-1570129477492-45ec003cf16f?w=400&h=300&fit=crop',
    avatarColor: 'bg-[#B68B39]',
  },
  {
    name: 'Skyline Luxury',
    badge: 'APPROVED',
    badgeColor: 'bg-emerald-500',
    location: 'DHA Phase 6',
    date: 'Oct 12, 2026',
    time: '30 AM',
    image: 'https://images.unsplash.com/photo-1570129477492-45ec003cf16f?w=400&h=300&fit=crop',
    avatarColor: 'bg-emerald-600',
    avatarLetter: 'S',
  },
];

/* ─── Quick Actions Data ─── */
const quickActions = [
  {
    icon: <FiSearch size={20} className="text-[#B68B39]" />,
    title: 'Search Properties',
    desc: 'Find your dream home',
    link: '/tenant/search',
  },
  {
    icon: <FiCalendar size={20} className="text-[#B68B39]" />,
    title: 'Schedule Visit',
    desc: 'Book a new viewing',
    link: '/tenant/visits',
  },
  {
    icon: <FiCreditCard size={20} className="text-[#B68B39]" />,
    title: 'View Payments',
    desc: 'View payment history',
    link: '/tenant/payments',
  },
];

/* ─── Timeline Data ─── */
const timelineItems = [
  {
    icon: <MdCheckCircle size={20} className="text-emerald-600" />,
    iconBg: 'bg-emerald-50',
    title: 'Account Verified',
    desc: 'Verification process completed by the Paband auditing team.',
    date: 'OCT 10, 2026',
    dateColor: 'text-emerald-600',
  },
  {
    icon: <MdCheckCircle size={20} className="text-blue-600" />,
    iconBg: 'bg-blue-50',
    title: 'Visit Approved: Skyline Luxury Apt',
    desc: 'Owner has approved your visit request for DHA Phase 6 apartment.',
    date: 'OCT 08, 2024',
    dateColor: 'text-blue-600',
  },
  {
    icon: <MdCheckCircle size={20} className="text-[#B68B39]" />,
    iconBg: 'bg-[#B68B39]/10',
    title: 'Visit Request Sent',
    desc: 'Requested a viewing for 2 properties in DHA and Bahria Town.',
    date: 'OCT 07, 2024',
    dateColor: 'text-[#B68B39]',
  },
  {
    icon: <MdCheckCircle size={20} className="text-gray-400" />,
    iconBg: 'bg-gray-100',
    title: 'Agreement Generation (Upcoming)',
    desc: 'System will generate agreement once visit is successful.',
    date: 'ESTIMATED OCT 18',
    dateColor: 'text-gray-400',
  },
];

/* ─── Main Component ─── */
const TenantDashboardHome = () => {
  return (
    <div className="p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto">

      {/* ───────── Welcome Section ───────── */}
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#112338] leading-tight tracking-tight flex items-center gap-2">
          Welcome Back <span className="text-2xl md:text-3xl">👋</span>
        </h2>
        <p className="text-gray-500 text-[13px] md:text-[14px] mt-1.5 font-medium">
          Manage your rental activities, scheduled visits, and verification status in one place.
        </p>
      </div>

      {/* ───────── Status Cards Row ───────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusCards.map((card, i) => (
          <div
            key={i}
            className={`tenant-status-card relative rounded-2xl overflow-hidden shadow-sm border border-gray-100/60 ${
              card.hasImage
                ? 'bg-gradient-to-br from-[#0A2240] to-[#112338] text-white min-h-[140px]'
                : 'bg-white p-5'
            }`}
          >
            {/* Badge */}
            <div className={`absolute top-3 right-3 ${card.badgeColor} text-white text-[8px] font-extrabold px-2.5 py-0.5 rounded-full tracking-wider uppercase`}>
              {card.badge}
            </div>

            {card.hasImage ? (
              /* Dark card with image */
              <div className="p-5 flex flex-col justify-end h-full relative z-10">
                <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center mb-3 border border-white/10`}>
                  {card.icon}
                </div>
                <p className="text-[11px] text-gray-300 font-medium uppercase tracking-wider">{card.label}</p>
                <p className="text-[15px] font-extrabold mt-0.5 text-white">{card.value}</p>
              </div>
            ) : (
              /* Light card */
              <div className="flex flex-col">
                <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center mb-3`}>
                  {card.icon}
                </div>
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">{card.label}</p>
                <p className="text-[15px] font-extrabold mt-0.5 text-[#112338]">{card.value}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ───────── Upcoming Visits + Quick Actions ───────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Upcoming Visits */}
        <div className="lg:col-span-2">
          <h3 className="text-[18px] font-extrabold text-[#112338] mb-4">Upcoming Visits</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {upcomingVisits.map((visit, i) => (
              <div
                key={i}
                className="tenant-visit-card bg-gradient-to-br from-[#0A2240] to-[#112338] rounded-2xl overflow-hidden shadow-md"
              >
                {/* Visit Image */}
                <div className="relative h-28 overflow-hidden">
                  <img
                    src={visit.image}
                    alt={visit.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2240] to-transparent" />
                </div>

                {/* Visit Info */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white font-bold text-[14px]">{visit.name}</h4>
                    <span className={`${visit.badgeColor} text-white text-[7px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider`}>
                      {visit.badge}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-[11px] mb-3">
                    <MdLocationOn size={12} />
                    <span>{visit.location}</span>
                  </div>

                  {/* Date & Time */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1.5 text-gray-300 text-[11px]">
                      <MdCalendarToday size={12} className="text-gray-400" />
                      <span>{visit.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-300 text-[11px]">
                      <MdAccessTime size={12} className="text-gray-400" />
                      <span>{visit.time}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="flex-1 py-2 bg-[#B68B39] text-white text-[11px] font-bold rounded-lg hover:bg-[#a0762d] transition-all">
                      View Details
                    </button>
                    <button className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                      <MdPhone size={16} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-[18px] font-extrabold text-[#112338] mb-4">Quick Actions</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100/60 divide-y divide-gray-50">
            {quickActions.map((action, i) => (
              <Link
                key={i}
                to={action.link}
                className="tenant-quick-action flex items-center gap-4 p-4 first:rounded-t-2xl last:rounded-b-2xl"
              >
                <div className="w-10 h-10 rounded-xl bg-[#B68B39]/10 flex items-center justify-center shrink-0">
                  {action.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] font-bold text-[#112338]">{action.title}</p>
                  <p className="text-[11px] text-gray-400 font-medium mt-0.5">{action.desc}</p>
                </div>
                <FiChevronRight size={16} className="text-gray-300 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ───────── Rental Activity Timeline ───────── */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100/60">
        <h3 className="text-[18px] font-extrabold text-[#112338] mb-6">Rental Activity Timeline</h3>
        <div className="space-y-6">
          {timelineItems.map((item, i) => (
            <div key={i} className="tenant-timeline-item flex items-start gap-4">
              <div className={`w-8 h-8 rounded-full ${item.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-[14px] font-bold text-[#112338]">{item.title}</h4>
                  <span className={`text-[11px] font-bold ${item.dateColor} uppercase tracking-wider shrink-0`}>
                    {item.date}
                  </span>
                </div>
                <p className="text-[12px] text-gray-500 mt-1 font-medium leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TenantDashboardHome;
