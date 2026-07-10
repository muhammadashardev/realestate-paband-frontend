import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTopBar } from '../../context/TopBarContext';
import { 
  MdSearch, 
  MdFilterList,
  MdCheckCircle,
  MdCalendarToday,
  MdAccountBalanceWallet,
  MdReceipt,
  MdAccountBalance,
  MdLanguage,
  MdCreditCard,
  MdChevronRight,
  MdFileDownload,
  MdChevronLeft
} from 'react-icons/md';

const TenantPayments = () => {
  const { setTopBar } = useTopBar();

  useEffect(() => {
    setTopBar({ title: '' });
  }, [setTopBar]);

  const payments = [
    {
      id: 'PAY-1025',
      propertyTitle: 'Skyline Apartment',
      propertySub: 'Unit 402, Block A',
      date: '05 Jan 2026',
      amount: 'PKR 120,000',
      method: 'Bank Transfer',
      methodIcon: MdAccountBalance,
      status: 'Paid'
    },
    {
      id: 'PAY-1026',
      propertyTitle: 'Bahria Villa',
      propertySub: 'Street 12, Phase 8',
      date: 'Pending',
      amount: 'PKR 90,000',
      method: 'Online Payment',
      methodIcon: MdLanguage,
      status: 'Pending'
    },
    {
      id: 'PAY-1027',
      propertyTitle: 'City Heights',
      propertySub: 'Suite 1205, Main Road',
      date: '02 Dec 2025',
      amount: 'PKR 75,000',
      method: 'Card Payment',
      methodIcon: MdCreditCard,
      status: 'Processing'
    }
  ];

  const getStatusStyles = (status) => {
    switch(status) {
      case 'Paid': return 'bg-[#E6F4EA] text-[#1E8E3E]';
      case 'Pending': return 'bg-[#FEF7E6] text-[#B88A44]';
      case 'Processing': return 'bg-[#E8F0FE] text-[#1A73E8]';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in pb-16">
      
      {/* Header */}
      <div>
        <h1 className="text-[32px] font-bold text-[#112338] tracking-tight">Payments & Transactions</h1>
        <p className="text-gray-500 mt-2 text-[15px]">Manage your rental payments, transaction history, and payment receipts securely.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Status Card */}
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100/50 flex flex-col justify-between">
          <div className="w-10 h-10 bg-[#E6F4EA] rounded-full flex items-center justify-center text-[#1E8E3E] mb-4">
            <MdCheckCircle size={20} />
          </div>
          <div>
            <p className="text-gray-400 text-[12px] font-bold uppercase tracking-wider mb-1">Current Rent Status</p>
            <h3 className="text-[22px] font-extrabold text-[#1E8E3E] leading-tight">Paid Successfully</h3>
            <p className="text-gray-400 text-[12px] mt-2 leading-relaxed">Your latest rental payment has been completed.</p>
          </div>
        </div>

        {/* Upcoming Card */}
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100/50 flex flex-col justify-between">
          <div className="w-10 h-10 bg-[#F8F9FA] rounded-full flex items-center justify-center text-[#B68B39] mb-4">
            <MdCalendarToday size={20} />
          </div>
          <div>
            <p className="text-gray-400 text-[12px] font-bold uppercase tracking-wider mb-1">Upcoming Due Date</p>
            <h3 className="text-[22px] font-extrabold text-[#112338] leading-tight">05 Feb 2026</h3>
            <p className="text-gray-400 text-[12px] mt-2 leading-relaxed">Next rental payment deadline.</p>
          </div>
        </div>

        {/* Total Card */}
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100/50 flex flex-col justify-between">
          <div className="w-10 h-10 bg-[#E8F0FE] rounded-full flex items-center justify-center text-[#1A73E8] mb-4">
            <MdAccountBalanceWallet size={20} />
          </div>
          <div>
            <p className="text-gray-400 text-[12px] font-bold uppercase tracking-wider mb-1">Total Payments</p>
            <h3 className="text-[22px] font-extrabold text-[#112338] leading-tight">PKR 720,000</h3>
            <p className="text-gray-400 text-[12px] mt-2 leading-relaxed">Total completed payments.</p>
          </div>
        </div>

        {/* Pending Card */}
        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100/50 flex flex-col justify-between">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 mb-4">
            <MdReceipt size={20} />
          </div>
          <div>
            <p className="text-gray-400 text-[12px] font-bold uppercase tracking-wider mb-1">Pending Amount</p>
            <h3 className="text-[22px] font-extrabold text-[#112338] leading-tight">PKR 0 Pending</h3>
            <p className="text-gray-400 text-[12px] mt-2 leading-relaxed">No outstanding rental dues.</p>
          </div>
        </div>

      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-[20px] shadow-sm border border-gray-100/50">
        <div className="relative flex-1">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by payment ID, property, or receipt number" 
            className="w-full bg-[#F8F9FA] rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#B68B39] transition-all"
          />
        </div>
        <div className="flex gap-3">
          <select className="bg-[#F8F9FA] rounded-xl px-5 py-3 text-sm font-medium text-[#112338] outline-none appearance-none min-w-[140px] cursor-pointer">
            <option>All Payments</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Processing</option>
          </select>
          <button className="bg-[#112338] text-white rounded-xl px-6 py-3 text-sm font-bold flex items-center gap-2 hover:bg-[#1a3554] transition-colors shrink-0">
            <MdFilterList size={18} />
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[20px] shadow-sm border border-gray-100/50 overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-500 font-extrabold">
                <th className="py-5 px-6">Payment ID</th>
                <th className="py-5 px-6">Property</th>
                <th className="py-5 px-6">Payment Date</th>
                <th className="py-5 px-6">Amount</th>
                <th className="py-5 px-6">Payment Method</th>
                <th className="py-5 px-6">Status</th>
                <th className="py-5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {payments.map((payment, idx) => (
                <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-[#112338]">{payment.id}</td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#112338]">{payment.propertyTitle}</span>
                      <span className="text-[12px] text-gray-400 mt-0.5">{payment.propertySub}</span>
                    </div>
                  </td>
                  <td className={`py-4 px-6 font-medium ${payment.date === 'Pending' ? 'text-gray-300 italic' : 'text-gray-600'}`}>
                    {payment.date}
                  </td>
                  <td className="py-4 px-6 font-extrabold text-[#112338]">{payment.amount}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-gray-600 font-medium">
                      <payment.methodIcon size={16} className="text-gray-400" />
                      {payment.method}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide inline-flex ${getStatusStyles(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/tenant/payments/receipt/${payment.id.split('-')[1]}`} className="w-8 h-8 rounded-lg bg-[#F8F9FA] text-[#B68B39] flex items-center justify-center hover:bg-[#F0E6D2] transition-colors">
                        <MdChevronRight size={20} />
                      </Link>
                      <button className="w-8 h-8 rounded-lg bg-[#F8F9FA] text-[#B68B39] flex items-center justify-center hover:bg-[#F0E6D2] transition-colors">
                        <MdFileDownload size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm text-gray-500">Showing 3 of 42 completed transactions</span>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
              <MdChevronLeft size={20} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#B68B39] text-white font-bold text-sm">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors font-semibold text-sm">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors font-semibold text-sm">
              3
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
              <MdChevronRight size={20} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TenantPayments;
