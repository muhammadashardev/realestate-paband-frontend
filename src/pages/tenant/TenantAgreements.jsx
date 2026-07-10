import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTopBar } from '../../context/TopBarContext';
import {
  MdOutlineDescription,
  MdEventNote,
  MdKeyboardArrowRight,
  MdFileDownload,
  MdShield,
  MdNotificationsNone,
} from 'react-icons/md';
import { getAgreements } from '../../utils/api';

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const formatMoney = (value) => {
  if (value === null || value === undefined || value === '') return '-';
  return `PKR ${Number(value).toLocaleString()}`;
};

const formatStatus = (status = '') => {
  const normalized = `${status}`.replace(/_/g, ' ').trim();
  if (!normalized) return 'Pending';
  return normalized.replace(/\b\w/g, (char) => char.toUpperCase());
};

const normalizeAgreement = (item = {}) => ({
  id: item._id || item.id || item.agreementNumber || 'N/A',
  agreementNumber: item.agreementNumber || item.id || 'N/A',
  propertyName: item.propertyName || 'Property',
  location: item.propertyAddress || item.location || 'Location pending',
  periodStart: formatDate(item.startDate),
  periodEnd: formatDate(item.endDate),
  duration: item.durationMonths ? `${item.durationMonths} Months Duration` : 'Duration pending',
  status: formatStatus(item.status),
  rent: formatMoney(item.monthlyRent),
  deposit: formatMoney(item.securityDeposit),
  nextAction: item.status === 'active'
    ? 'Agreement is active and ready for reference.'
    : item.status === 'pending_tenant_signature'
      ? 'Please review and sign the agreement.'
      : 'Waiting for review or activation.',
  ...item,
});

const TenantAgreements = () => {
  const { setTopBar, resetTopBar } = useTopBar();
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setTopBar({ title: 'My Agreements' });
    return () => resetTopBar();
  }, [setTopBar, resetTopBar]);

  useEffect(() => {
    const fetchAgreements = async () => {
      try {
        setLoading(true);
        const data = await getAgreements();
        const normalized = Array.isArray(data) ? data.map(normalizeAgreement) : [];
        setAgreements(normalized);
      } catch (err) {
        setError(err.message || 'Unable to load agreements right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchAgreements();
  }, []);

  const activeAgreement = agreements.find((item) => item.status.toLowerCase() === 'active') || agreements[0] || null;

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-[28px] font-extrabold text-[#112338] leading-tight tracking-tight">Rental Agreements</h2>
          <p className="text-gray-500 text-[13px] md:text-[14px] mt-1.5 font-medium">Review, sign, and manage your rental agreements digitally and securely.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-xl border border-[#E3D1A3] text-[#B68B39] bg-[#FCF7EA] text-[13px] font-bold">Download All</button>
          <button className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-[13px] font-bold text-gray-700">Need Help</button>
        </div>
      </div>

      {loading && <div className="rounded-[24px] bg-white p-6 text-sm text-gray-600">Loading agreements...</div>}
      {!loading && error && <div className="rounded-[24px] bg-white p-6 text-sm text-red-600">{error}</div>}

      {!loading && !error && (
        <>
          <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
            <div className="bg-white rounded-[24px] p-6 md:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/60">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-gray-400">Current Agreement</p>
                  <h3 className="text-[22px] font-extrabold text-[#112338] mt-1">{activeAgreement ? activeAgreement.propertyName : 'No agreement found'}</h3>
                </div>
                {activeAgreement && (
                  <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide ${activeAgreement.status === 'Active' ? 'bg-[#E8FDF3] text-[#10B981]' : 'bg-[#FFF7ED] text-[#B68B39]'}`}>
                    {activeAgreement.status}
                  </span>
                )}
              </div>

              {activeAgreement ? (
                <>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-[#F9FAFB] p-4">
                      <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Agreement ID</p>
                      <p className="mt-2 text-[14px] font-extrabold text-[#112338]">{activeAgreement.agreementNumber}</p>
                    </div>
                    <div className="rounded-2xl bg-[#F9FAFB] p-4">
                      <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Monthly Rent</p>
                      <p className="mt-2 text-[14px] font-extrabold text-[#112338]">{activeAgreement.rent}</p>
                    </div>
                    <div className="rounded-2xl bg-[#F9FAFB] p-4">
                      <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Security Deposit</p>
                      <p className="mt-2 text-[14px] font-extrabold text-[#112338]">{activeAgreement.deposit}</p>
                    </div>
                    <div className="rounded-2xl bg-[#F9FAFB] p-4">
                      <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Lease Period</p>
                      <p className="mt-2 text-[14px] font-extrabold text-[#112338]">{activeAgreement.periodStart} – {activeAgreement.periodEnd}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link to={`/tenant/agreements/${activeAgreement.id}`} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A2240] text-white text-[13px] font-bold hover:bg-[#11315c] transition-all">
                      <MdOutlineDescription size={18} /> Open Agreement
                    </Link>
                    <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E3D1A3] text-[#B68B39] bg-[#FCF7EA] text-[13px] font-bold">
                      <MdFileDownload size={18} /> Download PDF
                    </button>
                  </div>
                </>
              ) : null}
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EDF4FF] flex items-center justify-center text-[#4F46E5]">
                    <MdEventNote size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400">Next Step</p>
                    <p className="text-[14px] font-extrabold text-[#112338]">{activeAgreement ? activeAgreement.nextAction : 'No agreement available yet.'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E8FDF3] flex items-center justify-center text-[#10B981]">
                    <MdShield size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400">Secure Sign</p>
                    <p className="text-[14px] font-extrabold text-[#112338]">Digital signature ready</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/60 overflow-hidden">
            <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100">
              <h3 className="text-[18px] font-extrabold text-[#112338]">Agreement History</h3>
              <div className="flex items-center gap-2 text-[12px] font-bold text-gray-500">
                <MdNotificationsNone size={16} /> Updates available
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left border-collapse">
                <thead>
                  <tr className="bg-[#FCFBF8] border-y border-gray-100">
                    <th className="py-4 px-6 text-[11px] font-extrabold text-gray-400 tracking-wider uppercase w-[15%]">Agreement ID</th>
                    <th className="py-4 px-6 text-[11px] font-extrabold text-gray-400 tracking-wider uppercase w-[30%]">Property</th>
                    <th className="py-4 px-6 text-[11px] font-extrabold text-gray-400 tracking-wider uppercase w-[20%]">Period</th>
                    <th className="py-4 px-6 text-[11px] font-extrabold text-gray-400 tracking-wider uppercase w-[15%]">Status</th>
                    <th className="py-4 px-6 text-[11px] font-extrabold text-gray-400 tracking-wider uppercase w-[20%] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {agreements.map((agr, idx) => (
                    <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-5 px-6">
                        <span className="text-[13px] font-extrabold text-[#112338]">{agr.agreementNumber}</span>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#FDF8F0] flex items-center justify-center shrink-0 border border-[#F3E6D0]">
                            <svg className="w-4 h-4 text-[#DDB976]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14H7v-2h4v2zm0-4H7v-2h4v2zm0-4H7V7h4v2zm6 8h-4v-2h4v2zm0-4h-4v-2h4v2zm0-4h-4V7h4v2z" /></svg>
                          </div>
                          <div>
                            <p className="text-[14px] font-extrabold text-[#112338] leading-tight mb-1">{agr.propertyName}</p>
                            <p className="text-[11px] font-medium text-gray-400">{agr.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <p className="text-[12px] font-bold text-[#112338] mb-1">{agr.periodStart} – {agr.periodEnd}</p>
                        <p className="text-[11px] font-medium text-gray-400">{agr.duration}</p>
                      </td>
                      <td className="py-5 px-6">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-bold ${agr.status === 'Active' ? 'bg-[#E6FCF5] text-[#10B981]' : 'bg-[#FFF1F2] text-[#EF4444]'}`}>
                          {agr.status}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/tenant/agreements/${agr.id}`} className="w-8 h-8 rounded-lg bg-[#FDF8F0] text-[#B68B39] flex items-center justify-center hover:bg-[#F3E6D0] transition-colors">
                            <MdKeyboardArrowRight size={20} />
                          </Link>
                          <button className="w-8 h-8 rounded-lg bg-[#FDF8F0] text-[#B68B39] flex items-center justify-center hover:bg-[#F3E6D0] transition-colors">
                            <MdFileDownload size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TenantAgreements;
