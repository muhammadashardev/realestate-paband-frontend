import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MdMoreHoriz, MdFileDownload, MdHistory, MdCheckCircle,
  MdWarning, MdRemoveRedEye
} from 'react-icons/md';

/* ── Static Data ── */
const statCards = [
  {
    id: 'total',
    label: 'TOTAL MONTHLY EARNINGS',
    value: 'PKR 450,000',
    growth: '12.8%',
    growthLabel: 'vs last month',
    sub: 'Total rental income received this month.',
    isUp: true,
    barColor: '#B68B39',
    barWidth: '72%',
  },
  {
    id: 'paid',
    label: 'PAID PAYMENTS',
    value: '08 Received',
    sub: 'Successfully completed rental payments.',
    dot: '#16A34A',
    barColor: '#16A34A',
    barWidth: '80%',
  },
  {
    id: 'pending',
    label: 'PENDING PAYMENTS',
    value: '03 Pending',
    sub: 'Payments awaiting confirmation.',
    dot: '#F59E0B',
    barColor: '#F59E0B',
    barWidth: '30%',
  },
  {
    id: 'overdue',
    label: 'OVERDUE PAYMENTS',
    value: '02 Overdue',
    sub: 'Payments delayed beyond due date.',
    dot: '#EF4444',
    barColor: '#EF4444',
    barWidth: '20%',
  },
];

const paymentActivities = [
  {
    type: 'confirmed',
    title: 'Payment Confirmed',
    desc: 'Received PKR 85,000 from Sarah Malik.',
    time: '9 mins ago',
    icon: <MdCheckCircle size={18} className="text-emerald-500" />,
    iconBg: 'bg-emerald-50',
  },
  {
    type: 'overdue',
    title: 'Overdue Payment',
    desc: 'PKR 120,000 pending from Talak Javed.',
    time: '2 hours ago',
    icon: <MdWarning size={18} className="text-red-500" />,
    iconBg: 'bg-red-50',
  },
  {
    type: 'confirmed',
    title: 'Payment Confirmed',
    desc: 'Received PKR 85,000 from Sarah Malik.',
    time: '9 mins ago',
    icon: <MdCheckCircle size={18} className="text-emerald-500" />,
    iconBg: 'bg-emerald-50',
  },
];

const transactions = [
  {
    id: 'TXN-1025',
    tenant: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=70',
    property: 'Gulberg III, Lahore',
    amount: 'PKR 85,000',
    date: 'Oct 24, 2023',
    status: 'paid',
  },
  {
    id: 'TXN-1026',
    tenant: 'Usman Tariq',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=70',
    property: 'DHA Phase 5, Karachi',
    amount: 'PKR 120,000',
    date: 'Oct 22, 2023',
    status: 'pending',
  },
  {
    id: 'TXN-1027',
    tenant: 'Zain Mansoor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&h=80&q=70',
    property: 'Villa 42, Bahria Town',
    amount: 'PKR 95,000',
    date: 'Oct 15, 2023',
    status: 'overdue',
  },
];

const statusStyle = {
  paid: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  pending: 'bg-amber-50 text-amber-700 border border-amber-200',
  overdue: 'bg-red-50 text-red-600 border border-red-200',
};

/* ── Income Chart (SVG) ── */
const IncomeChart = () => (
  <svg viewBox="0 0 520 200" className="w-full h-auto" style={{ maxHeight: 200 }}>
    {/* Grid lines */}
    {[30, 70, 110, 150].map((y, i) => (
      <line key={i} x1="40" y1={y} x2="510" y2={y} stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
    ))}
    {/* Y Labels */}
    {[{ y: 34, t: '500k' }, { y: 74, t: '100k' }, { y: 114, t: '50k' }, { y: 154, t: '0' }].map((l, i) => (
      <text key={i} x="0" y={l.y} fontSize="10" fill="#94A3B8" fontFamily="Outfit,sans-serif">{l.t}</text>
    ))}
    {/* X Labels */}
    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((l, i) => (
      <text key={i} x={68 + i * 82} y="188" textAnchor="middle" fontSize="10" fill="#94A3B8" fontFamily="Outfit,sans-serif">{l}</text>
    ))}
    {/* Last Period - Pink */}
    <path
      d="M60,140 C90,110 115,90 145,95 C175,100 200,50 230,60 C260,70 285,130 315,75 C345,55 370,140 400,65 C430,50 460,110 500,90"
      fill="none" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    />
    {/* Current Period - Purple */}
    <path
      d="M60,120 C90,130 115,115 145,120 C175,125 200,80 230,100 C260,115 285,100 315,95 C345,85 370,105 400,90 C430,82 460,95 500,82"
      fill="none" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    />
    {/* Dot on current period */}
    <circle cx="315" cy="95" r="5" fill="#8B5CF6" />
    <circle cx="315" cy="95" r="8" fill="#8B5CF6" fillOpacity="0.2" />
  </svg>
);

/* ── Main Component ── */
const OwnerPayments = () => {
  return (
    <div className="p-4 md:p-7 space-y-6 max-w-[1600px] mx-auto bg-[#F8F9FC] min-h-screen">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-[26px] font-extrabold text-[#112338] leading-tight tracking-tight">
            Payments &amp; Earnings
          </h2>
          <p className="text-gray-400 text-[13px] mt-1">
            Monitor rental income, payment activity, and transaction records from one centralized dashboard.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 text-[13px] font-bold shadow-sm hover:bg-gray-50 active:scale-[0.98] transition-all">
            <MdFileDownload size={17} /> Export Report
          </button>
          <Link
            to="/owner/payments/history"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#B68B39] text-white text-[13px] font-bold shadow-lg shadow-[#B68B39]/20 hover:bg-[#a0762d] active:scale-[0.98] transition-all"
          >
            <MdHistory size={17} /> View History
          </Link>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.04)] border border-gray-100/80 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-extrabold tracking-widest text-gray-400 uppercase">{card.label}</span>
              <MdMoreHoriz size={18} className="text-gray-300 cursor-pointer hover:text-gray-500 transition-colors" />
            </div>

            <div className="flex items-center gap-2 mb-1">
              {card.dot && (
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: card.dot }} />
              )}
              <p className="text-[18px] md:text-[20px] font-extrabold text-[#112338] leading-tight">{card.value}</p>
            </div>

            {card.growth && (
              <div className="flex items-center gap-1 mb-2">
                <span className="text-[11px] font-bold text-emerald-500">▲ {card.growth}</span>
                <span className="text-[11px] text-gray-400">{card.growthLabel}</span>
              </div>
            )}

            <p className="text-[11px] text-gray-400 mb-3 leading-snug">{card.sub}</p>

            {/* Progress bar */}
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: card.barWidth, backgroundColor: card.barColor }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── Chart + Payment Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Income Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] border border-gray-100/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <p className="text-[11px] font-extrabold tracking-widest text-gray-400 uppercase">Statistics</p>
              <h3 className="text-[18px] font-extrabold text-[#112338] mt-0.5">Total income</h3>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-bold text-gray-500 shrink-0">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EC4899]" /> Last Period
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" /> Current Period
              </span>
            </div>
          </div>
          <IncomeChart />
        </div>

        {/* Payment Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] border border-gray-100/80">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[16px] font-extrabold text-[#112338]">Payment Activity</h3>
            <MdMoreHoriz size={18} className="text-gray-300 cursor-pointer hover:text-gray-500 transition-colors" />
          </div>
          <div className="space-y-4">
            {paymentActivities.map((act, i) => (
              <div key={i} className="flex items-start gap-3 group">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${act.iconBg}`}>
                  {act.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-[#112338] leading-snug">{act.title}</p>
                  <p className="text-[11.5px] text-gray-500 mt-0.5 leading-relaxed">{act.desc}</p>
                  <p className="text-[10.5px] text-gray-400 mt-1">🕐 {act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent Transactions ── */}
      <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.04)] border border-gray-100/80">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h3 className="text-[17px] font-extrabold text-[#112338]">Recent Transactions</h3>
          <Link
            to="/owner/payments/history"
            className="text-[#B68B39] text-[13px] font-bold hover:underline transition-all"
          >
            View All
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {['Tenant Name', 'Property', 'Amount', 'Date', 'Status', 'Action'].map((h) => (
                  <th key={h} className="px-6 py-3.5 text-left text-[10.5px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/70 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={tx.avatar}
                        alt={tx.tenant}
                        loading="lazy"
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100 shrink-0"
                      />
                      <span className="text-[13.5px] font-bold text-[#112338]">{tx.tenant}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-gray-500 whitespace-nowrap">{tx.property}</td>
                  <td className="px-6 py-4 text-[13.5px] font-extrabold text-[#112338] whitespace-nowrap">{tx.amount}</td>
                  <td className="px-6 py-4 text-[13px] text-gray-500 whitespace-nowrap">{tx.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide ${statusStyle[tx.status]}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/owner/payments/${tx.id}`}
                      className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-[#B68B39]/10 hover:bg-[#B68B39]/20 text-[#B68B39] transition-colors"
                    >
                      <MdRemoveRedEye size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OwnerPayments;
