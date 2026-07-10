import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTopBar } from '../../context/TopBarContext';
import {
  MdFileDownload,
  MdCheckCircle,
  MdOutlineDescription,
  MdKeyboardArrowRight,
  MdCalendarToday,
  MdShield,
} from 'react-icons/md';
import { getAgreementById, signAgreement } from '../../utils/api';

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
  propertyAddress: item.propertyAddress || item.location || 'Location pending',
  tenantName: item.tenantName || 'Tenant',
  monthlyRent: formatMoney(item.monthlyRent),
  durationMonths: item.durationMonths || '12',
  startDate: formatDate(item.startDate),
  endDate: formatDate(item.endDate),
  status: formatStatus(item.status),
  documentUrl: item.documentUrl || '',
  signatureStatus: item.signatureStatus || 'pending',
  ...item,
});

const TenantAgreementPreview = () => {
  const { id } = useParams();
  const { setTopBar, resetTopBar } = useTopBar();
  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [signing, setSigning] = useState(false);

  useEffect(() => {
    setTopBar({ title: 'Agreement Preview' });
    return () => resetTopBar();
  }, [setTopBar, resetTopBar]);

  useEffect(() => {
    const fetchAgreement = async () => {
      try {
        setLoading(true);
        const data = await getAgreementById(id);
        setAgreement(normalizeAgreement(data));
      } catch (err) {
        setError(err.message || 'Unable to load agreement.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAgreement();
  }, [id]);

  const handleSign = async () => {
    try {
      setSigning(true);
      const updated = await signAgreement(id, {
        role: 'tenant',
        signatureUrl: '/uploads/signatures/tenant.png',
        documentUrl: `/uploads/agreements/${id || 'agreement'}-signed.pdf`,
      });
      setAgreement(normalizeAgreement(updated));
    } catch (err) {
      setError(err.message || 'Unable to sign agreement.');
    } finally {
      setSigning(false);
    }
  };

  const terms = [
    {
      title: 'Monthly rent terms',
      desc: 'Rent is payable in advance by the 5th of every month. A late fee of PKR 2,000 applies after the 10th.',
    },
    {
      title: 'Security deposit policy',
      desc: "A security deposit equivalent to 2 months' rent is required, refundable upon completion of the lease term.",
    },
    {
      title: 'Property maintenance terms',
      desc: "The landlord is responsible for structural repairs. Minor day-to-day maintenance is the tenant's responsibility.",
    },
    {
      title: 'Payment schedule',
      desc: 'Payments must be made via bank transfer or the online portal using the provided invoice references.',
    },
    {
      title: 'Tenant responsibilities',
      desc: 'Tenant must maintain the property in good condition, observe noise levels, and adhere to community guidelines.',
    },
  ];

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 mb-3">
            <Link to="/tenant" className="hover:text-gray-600 transition-colors">Dashboard</Link>
            <span>›</span>
            <Link to="/tenant/agreements" className="hover:text-gray-600 transition-colors">Rental Agreements</Link>
            <span>›</span>
            <span className="text-[#B68B39]">Agreement Preview</span>
          </div>
          <h2 className="text-2xl md:text-[32px] font-extrabold text-[#112338] leading-tight tracking-tight">Agreement Preview</h2>
        </div>

        <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-[#B68B39] text-[#B68B39] text-[13px] font-bold rounded-xl hover:bg-[#FDFBF7] transition-all shadow-sm shrink-0">
          <MdFileDownload size={18} /> Download PDF
        </button>
      </div>

      {loading && <div className="rounded-[24px] bg-white p-6 text-sm text-gray-600">Loading agreement details...</div>}
      {!loading && error && <div className="rounded-[24px] bg-white p-6 text-sm text-red-600">{error}</div>}

      {!loading && agreement && (
        <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-[24px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/60 p-6 md:p-8">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-gray-400">Agreement Summary</p>
                  <h3 className="text-[20px] font-extrabold text-[#112338] mt-1">Rental agreement details</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide ${agreement.status === 'Active' ? 'bg-[#E8FDF3] text-[#10B981]' : 'bg-[#FFF7ED] text-[#B68B39]'}`}>
                  {agreement.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-[#F9FAFB] p-4">
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">Agreement ID</p>
                  <p className="text-[14px] font-extrabold text-[#112338]">{agreement.agreementNumber}</p>
                </div>
                <div className="rounded-2xl bg-[#F9FAFB] p-4">
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">Property Name</p>
                  <p className="text-[14px] font-extrabold text-[#112338]">{agreement.propertyName}</p>
                </div>
                <div className="rounded-2xl bg-[#F9FAFB] p-4">
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">Tenant Name</p>
                  <p className="text-[14px] font-extrabold text-[#112338]">{agreement.tenantName}</p>
                </div>
                <div className="rounded-2xl bg-[#F9FAFB] p-4">
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">Rental Amount</p>
                  <p className="text-[16px] font-extrabold text-[#B68B39]">{agreement.monthlyRent}</p>
                </div>
                <div className="rounded-2xl bg-[#F9FAFB] p-4">
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">Contract Duration</p>
                  <p className="text-[14px] font-extrabold text-[#112338]">{agreement.durationMonths} Months</p>
                </div>
                <div className="rounded-2xl bg-[#F9FAFB] p-4">
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">Lease Period</p>
                  <p className="text-[14px] font-extrabold text-[#112338]">{agreement.startDate} – {agreement.endDate}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[24px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/60 p-6 md:p-8">
              <div className="mb-6">
                <h3 className="text-[18px] font-extrabold text-[#112338] mb-1.5">Agreement Terms</h3>
                <p className="text-[13px] font-medium text-gray-500">Detailed clauses agreed upon by the property management and tenant.</p>
              </div>

              <div className="space-y-4">
                {terms.map((term, index) => (
                  <div key={index} className="bg-[#FCFBF8] border border-gray-100 rounded-2xl p-5 flex items-start gap-4">
                    <div className="mt-0.5">
                      <MdCheckCircle size={20} className="text-[#10B981]" />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-extrabold text-[#112338] mb-1">{term.title}</h4>
                      <p className="text-[12px] font-medium text-gray-500 leading-relaxed">{term.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-[24px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/60 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#E8FDF3] flex items-center justify-center text-[#10B981]">
                  <MdShield size={20} />
                </div>
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400">Signature Status</p>
                  <p className="text-[14px] font-extrabold text-[#112338]">{!agreement.tenantSignedAt ? 'Pending signature' : 'Signed'}</p>
                </div>
              </div>
              <button
                onClick={handleSign}
                disabled={signing || !!agreement.tenantSignedAt}
                className="w-full rounded-xl bg-[#0A2240] px-4 py-3 text-[13px] font-bold text-white disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {signing ? 'Signing...' : 'Sign Agreement'}
              </button>
            </div>

            <div className="bg-white rounded-[24px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/60 p-6">
              <h3 className="text-[15px] font-extrabold text-[#112338] mb-4">Attached Files</h3>
              <div className="space-y-3">
                <div className="bg-[#FDFBF7] border border-[#F3E6D0] rounded-2xl p-4 flex items-center justify-between group cursor-pointer hover:bg-[#F9F4EA] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F3E6D0] flex items-center justify-center shrink-0">
                      <MdOutlineDescription size={20} className="text-[#B68B39]" />
                    </div>
                    <div>
                      <p className="text-[13px] font-extrabold text-[#112338] leading-tight mb-1">Rental Agreement PDF</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">2.4 MB • PDF</p>
                    </div>
                  </div>
                  <MdFileDownload size={20} className="text-[#B68B39] group-hover:scale-110 transition-transform" />
                </div>

                <div className="bg-[#FDFBF7] border border-[#F3E6D0] rounded-2xl p-4 flex items-center justify-between group cursor-pointer hover:bg-[#F9F4EA] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F3E6D0] flex items-center justify-center shrink-0">
                      <MdOutlineDescription size={20} className="text-[#B68B39]" />
                    </div>
                    <div>
                      <p className="text-[13px] font-extrabold text-[#112338] leading-tight mb-1">Property Terms Doc</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">1.1 MB • PDF</p>
                    </div>
                  </div>
                  <MdFileDownload size={20} className="text-[#B68B39] group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[24px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/60 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#FDF8F0] flex items-center justify-center border border-[#F3E6D0] text-[#B68B39]">
                  <MdCalendarToday size={20} />
                </div>
                <div>
                  <p className="text-[14px] font-extrabold text-[#112338]">Need Help?</p>
                  <p className="text-[11px] font-medium text-gray-400">Support available 24/7</p>
                </div>
              </div>
              <button className="w-full bg-[#FDFBF7] border border-[#F3E6D0] hover:bg-[#F9F4EA] transition-colors p-3.5 rounded-xl flex items-center justify-center gap-2 text-[13px] font-extrabold text-[#B68B39] group">
                Raise Support Ticket
                <MdKeyboardArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantAgreementPreview;
