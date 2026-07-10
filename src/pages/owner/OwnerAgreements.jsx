import React, { useEffect, useState } from 'react';
import {
  MdPrint,
  MdOutlineFileDownload,
  MdCheckCircle,
  MdOutlineChat,
  MdShield,
  MdHistory,
  MdDescription,
  MdCalendarToday,
  MdLock,
  MdWarning,
  MdCancel,
  MdSend,
  MdAdd,
  MdSearch,
} from 'react-icons/md';
import { FaFilePdf, FaFileContract, FaFolderOpen, FaHourglassHalf } from 'react-icons/fa';
import { createAgreement, getAgreements, sendAgreement, updateAgreementStatus, signAgreement } from '../../utils/api';
import { getOwnerProperties } from '../../utils/propertyService';
import AgreementCreateModal from '../../components/owner/AgreementCreateModal';

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
  tenantName: item.tenantName || item.tenant?.fullName || item.tenant?.name || 'Tenant',
  ownerName: item.ownerName || item.owner?.fullName || item.owner?.name || 'Owner',
  propertyName: item.propertyName || item.property?.title || item.property?.name || 'Property',
  propertyAddress: item.propertyAddress || item.property?.address || item.property?.city || item.location || 'Location pending',
  monthlyRent: formatMoney(item.monthlyRent ?? item.rent),
  securityDeposit: formatMoney(item.securityDeposit ?? item.deposit),
  paymentDay: item.paymentDay || '5th of every month',
  startDate: formatDate(item.startDate),
  endDate: formatDate(item.endDate),
  status: formatStatus(item.status),
  signatureStatus: item.signatureStatus || 'pending',
  documentUrl: item.documentUrl || '',
  ...item,
});

const OwnerAgreements = () => {
  const [viewState, setViewState] = useState('active');
  const [agreementsList, setAgreementsList] = useState([]);
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState('');
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const loadAgreements = async () => {
    try {
      setLoading(true);
      const [agreementData, ownerProperties] = await Promise.all([
        getAgreements(),
        getOwnerProperties().catch(() => []),
      ]);

      setProperties(ownerProperties);
      const list = Array.isArray(agreementData) ? agreementData : agreementData?.agreements || [];
      const normalized = list.map(normalizeAgreement);
      setAgreementsList(normalized);
      
      if (normalized.length > 0) {
        setSelectedAgreement(normalized[0]);
      } else {
        setSelectedAgreement(null);
      }
    } catch (err) {
      setError(err.message || 'Unable to load agreements.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAgreements();
  }, []);

  const handleSend = async () => {
    if (!selectedAgreement?.id) return;
    try {
      setActionLoading('send');
      const updated = await sendAgreement(selectedAgreement.id);
      const normalized = normalizeAgreement(updated);
      setAgreementsList(prev => prev.map(agr => agr.id === selectedAgreement.id ? normalized : agr));
      setSelectedAgreement(normalized);
    } catch (err) {
      setError(err.message || 'Unable to send agreement.');
    } finally {
      setActionLoading('');
    }
  };

  const handleActivate = async () => {
    if (!selectedAgreement?.id) return;
    try {
      setActionLoading('activate');
      const updated = await updateAgreementStatus(selectedAgreement.id, 'active');
      const normalized = normalizeAgreement(updated);
      setAgreementsList(prev => prev.map(agr => agr.id === selectedAgreement.id ? normalized : agr));
      setSelectedAgreement(normalized);
    } catch (err) {
      setError(err.message || 'Unable to activate agreement.');
    } finally {
      setActionLoading('');
    }
  };

  const handleSign = async () => {
    if (!selectedAgreement?.id) return;
    try {
      setActionLoading('sign');
      const updated = await signAgreement(selectedAgreement.id, {
        role: 'owner',
        signatureUrl: '/uploads/signatures/owner.png',
        documentUrl: `/uploads/agreements/${selectedAgreement.id}-signed.pdf`,
      });
      const normalized = normalizeAgreement(updated);
      setAgreementsList(prev => prev.map(agr => agr.id === selectedAgreement.id ? normalized : agr));
      setSelectedAgreement(normalized);
    } catch (err) {
      setError(err.message || 'Unable to sign agreement.');
    } finally {
      setActionLoading('');
    }
  };

  const handleCancel = async () => {
    if (!selectedAgreement?.id) return;
    try {
      setActionLoading('cancel');
      const updated = await updateAgreementStatus(selectedAgreement.id, {
        status: 'cancelled',
        cancelledReason: 'Cancelled from owner dashboard',
        notes: 'Agreement cancelled by owner',
      });
      const normalized = normalizeAgreement(updated);
      setAgreementsList(prev => prev.map(agr => agr.id === selectedAgreement.id ? normalized : agr));
      setSelectedAgreement(normalized);
    } catch (err) {
      setError(err.message || 'Unable to cancel agreement.');
    } finally {
      setActionLoading('');
    }
  };

  const handleCreateAgreement = async (payload) => {
    try {
      setCreateLoading(true);
      setError('');
      const created = await createAgreement(payload);
      setCreateModalOpen(false);
      await loadAgreements();
    } catch (err) {
      setError(err.message || 'Unable to create agreement.');
    } finally {
      setCreateLoading(false);
    }
  };

  const filteredList = agreementsList.filter((agr) => {
    const status = agr.status?.toLowerCase() || '';
    const matchesStatus =
      viewState === 'active'
        ? status === 'active'
        : viewState === 'pending'
        ? (status.includes('pending') || status === 'draft')
        : (status === 'expired' || status === 'cancelled' || status === 'terminated');

    if (!matchesStatus) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        agr.propertyName?.toLowerCase().includes(q) ||
        agr.tenantName?.toLowerCase().includes(q) ||
        agr.agreementNumber?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  useEffect(() => {
    if (filteredList.length > 0) {
      const exists = filteredList.find((agr) => agr.id === selectedAgreement?.id);
      if (!exists) {
        setSelectedAgreement(filteredList[0]);
      }
    } else {
      setSelectedAgreement(null);
    }
  }, [viewState, agreementsList, searchQuery]);

  const documentList = [
    { title: 'Rental Agreement PDF', size: 'Signed Copy • 2.4 MB', icon: <FaFilePdf className="text-red-500" size={24} /> },
    { title: 'Payment Terms & Schedule', size: 'Annex A • 1.1 MB', icon: <FaFileContract className="text-blue-500" size={24} /> },
    { title: 'Attached ID Documents', size: '3 Files • 4.5 MB', icon: <FaFolderOpen className="text-gray-500" size={24} /> },
  ];

  const getSelectedStatusConfig = () => {
    const status = selectedAgreement?.status?.toLowerCase() || '';
    if (status === 'active') {
      return { label: 'Active', badgeClass: 'bg-[#EBFDF5] text-[#10B981]' };
    } else if (status.includes('pending') || status === 'draft') {
      return { label: formatStatus(status), badgeClass: 'bg-[#EFF6FF] text-[#3B82F6]' };
    } else {
      return { label: formatStatus(status), badgeClass: 'bg-[#FFF1F2] text-[#EF4444]' };
    }
  };

  const statusConfig = selectedAgreement ? getSelectedStatusConfig() : { label: '', badgeClass: '' };

  const renderPlaceholder = () => (
    <div className="bg-white rounded-[24px] p-12 text-center border border-gray-100/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
      <div className="w-16 h-16 bg-[#FDF8F0] border border-[#F3E6D0] rounded-full flex items-center justify-center text-[#B68B39] mx-auto">
        <MdDescription size={32} />
      </div>
      <h3 className="text-[18px] font-extrabold text-[#112338]">No Agreements Found</h3>
      <p className="text-gray-500 text-[13.5px] max-w-sm mx-auto font-medium">
        There are no agreements matching the selected status filter. Create a new agreement or search for another term.
      </p>
      <button onClick={() => setCreateModalOpen(true)} className="px-4 py-2 bg-[#B68B39] rounded-xl text-[13px] font-bold text-white hover:bg-[#a0762d] transition-all shadow-sm">
        Create Agreement
      </button>
    </div>
  );

  const renderDigitalVerification = (agr) => (
    <div className="bg-white rounded-[24px] p-6 md:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/60">
      <h3 className="text-[16px] font-extrabold text-[#112338] mb-5">Digital Verification</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className={`flex items-center justify-between p-4 rounded-xl border ${agr.ownerSignedAt ? 'border-[#10B981]/20 bg-[#EBFDF5]/40 text-[#10B981]' : 'border-gray-200 bg-gray-50 text-gray-500'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
              <MdCheckCircle size={20} className={agr.ownerSignedAt ? 'text-[#10B981]' : 'text-gray-400'} />
            </div>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider mb-0.5">OWNER SIGNATURE</p>
              <p className="text-[13px] font-bold text-[#112338]">{agr.ownerSignedAt ? `Signed on ${formatDate(agr.ownerSignedAt)}` : 'Pending Signature'}</p>
            </div>
          </div>
          <span className="text-[12px] font-extrabold">{agr.ownerSignedAt ? 'Verified' : 'Pending'}</span>
        </div>
        <div className={`flex items-center justify-between p-4 rounded-xl border ${agr.tenantSignedAt ? 'border-[#10B981]/20 bg-[#EBFDF5]/40 text-[#10B981]' : 'border-gray-200 bg-gray-50 text-gray-500'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
              <MdCheckCircle size={20} className={agr.tenantSignedAt ? 'text-[#10B981]' : 'text-gray-400'} />
            </div>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider mb-0.5">TENANT SIGNATURE</p>
              <p className="text-[13px] font-bold text-[#112338]">{agr.tenantSignedAt ? `Signed on ${formatDate(agr.tenantSignedAt)}` : 'Pending Signature'}</p>
            </div>
          </div>
          <span className="text-[12px] font-extrabold">{agr.tenantSignedAt ? 'Verified' : 'Pending'}</span>
        </div>
      </div>
    </div>
  );

  const renderDocumentsList = () => (
    <div className="bg-white rounded-[24px] p-6 md:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/60">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[16px] font-extrabold text-[#112338]">Agreement Documents</h3>
        <button className="text-[12px] font-extrabold text-[#B68B39] hover:underline">Download All (.zip)</button>
      </div>
      <div className="space-y-3">
        {documentList.map((doc, index) => (
          <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-[#F9FAFB]/50 hover:bg-gray-50 transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div>{doc.icon}</div>
              <div>
                <p className="text-[13.5px] font-bold text-[#112338]">{doc.title}</p>
                <p className="text-[11.5px] font-medium text-gray-400 mt-0.5">{doc.size}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <MdPrint size={18} className="hover:text-gray-700 transition-colors" />
              <MdOutlineFileDownload size={20} className="hover:text-[#B68B39] transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderActiveContent = (agr) => {
    const summaryFields = [
      { label: 'Tenant Name', value: agr.tenantName || 'Tenant' },
      { label: 'Property', value: agr.propertyName || 'Property' },
      { label: 'Agreement ID', value: agr.agreementNumber || 'AGR-1001' },
      { label: 'Monthly Rent', value: agr.monthlyRent || 'PKR 0' },
      { label: 'Security Deposit', value: agr.securityDeposit || 'PKR 0' },
      { label: 'Payment Day', value: agr.paymentDay || '5th of every month' },
    ];

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-[24px] p-6 md:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/60">
          <div className="flex items-center justify-between border-b border-gray-100/80 pb-4 mb-5">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-gray-400">Contract Overview</p>
              <h3 className="text-[20px] font-extrabold text-[#112338] mt-1">Agreement details</h3>
            </div>
            <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide ${statusConfig.badgeClass}`}>
              {statusConfig.label}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {summaryFields.map((field, index) => (
              <div key={index} className="rounded-2xl bg-[#F9FAFB] p-4">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">{field.label}</p>
                <p className="text-[14px] font-extrabold text-[#112338]">{field.value}</p>
              </div>
            ))}
          </div>
        </div>

        {renderDigitalVerification(agr)}
        {renderDocumentsList()}
      </div>
    );
  };

  const renderPendingContent = (agr) => (
    <div className="space-y-6">
      <div className="bg-white rounded-[24px] p-6 md:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/60">
        <div className="flex items-center justify-between border-b border-gray-100/80 pb-4 mb-5">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-gray-400">Signature Tracking</p>
            <h3 className="text-[18px] font-extrabold text-[#112338] mt-1">Waiting for signatures</h3>
          </div>
          <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide ${statusConfig.badgeClass}`}>
            {statusConfig.label}
          </span>
        </div>

        <div className="space-y-5">
          <div className={`rounded-2xl border p-4 ${agr.ownerSignedAt ? 'border-[#10B981]/20 bg-[#EBFDF5]/40' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-2">
              <MdCheckCircle className={agr.ownerSignedAt ? 'text-[#10B981]' : 'text-gray-400'} size={16} />
              <h4 className="text-[14px] font-bold text-[#112338]">Owner Signature</h4>
            </div>
            <p className="text-[12px] font-medium text-gray-600">
              {agr.ownerSignedAt ? `Completed on ${formatDate(agr.ownerSignedAt)}` : 'Pending action from owner (You)'}
            </p>
          </div>
          <div className={`rounded-2xl border p-4 ${agr.tenantSignedAt ? 'border-[#10B981]/20 bg-[#EBFDF5]/40' : 'border-[#F97316]/20 bg-[#FFF7ED]'}`}>
            <div className="flex items-center gap-2 mb-2">
              <MdOutlineChat className={agr.tenantSignedAt ? 'text-[#10B981]' : 'text-[#F97316]'} size={16} />
              <h4 className="text-[14px] font-bold text-[#112338]">Tenant Signature</h4>
            </div>
            <p className="text-[12px] font-medium text-gray-600">
              {agr.tenantSignedAt ? `Completed on ${formatDate(agr.tenantSignedAt)}` : `Pending action. Request sent to ${agr.tenantName}`}
            </p>
          </div>
        </div>
      </div>

      {renderDigitalVerification(agr)}

      <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/60">
        <h3 className="text-[14px] font-extrabold text-[#112338] mb-4">Agreement Details</h3>
        <div className="space-y-4">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">PROPERTY</p>
            <p className="text-[13px] font-bold text-[#112338] leading-snug">{agr.propertyName}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">RENT</p>
              <p className="text-[13.5px] font-extrabold text-[#112338]">{agr.monthlyRent}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">DURATION</p>
              <p className="text-[13.5px] font-extrabold text-[#112338]">{agr.durationMonths} Months</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExpiredContent = (agr) => (
    <div className="space-y-6">
      <div className="bg-white rounded-[24px] p-6 md:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/60">
        <div className="flex items-center justify-between border-b border-gray-100/80 pb-4 mb-5">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Expired On</p>
            <p className="text-[20px] font-extrabold text-[#112338] mt-1">Expired / Cancelled Contract</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide ${statusConfig.badgeClass}`}>
            {statusConfig.label}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-[#FEF2F2] p-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Ended On</p>
            <p className="text-[14px] font-extrabold text-[#112338]">{agr.endDate || 'N/A'}</p>
          </div>
          <div className="rounded-2xl bg-[#FFF7ED] p-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Tenant Status</p>
            <p className="text-[14px] font-extrabold text-[#112338]">Inactive / Closed</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[24px] p-6 md:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/60">
        <h3 className="text-[15px] font-extrabold text-[#112338] mb-4">Recommended Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button onClick={() => setCreateModalOpen(true)} className="rounded-xl bg-[#0A2240] p-5 text-white text-left hover:bg-[#11315c] transition-colors">
            <h4 className="text-[14px] font-extrabold">Renewal Request</h4>
            <p className="text-[11.5px] text-gray-300 font-medium mt-0.5">Create a new 12-month contract with updated terms</p>
          </button>
          <button className="rounded-xl bg-white border border-gray-200 p-5 text-left hover:bg-gray-50 transition-colors cursor-not-allowed opacity-50" disabled>
            <h4 className="text-[14px] font-extrabold text-[#112338]">Contact Admin</h4>
            <p className="text-[11.5px] text-gray-500 font-medium mt-0.5">Send message</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderDetailPane = () => {
    if (!selectedAgreement) {
      return renderPlaceholder();
    }

    const isPending =
      selectedAgreement.status?.toLowerCase().includes('pending') ||
      selectedAgreement.status?.toLowerCase() === 'draft';

    const isExpired =
      selectedAgreement.status?.toLowerCase() === 'expired' ||
      selectedAgreement.status?.toLowerCase() === 'cancelled' ||
      selectedAgreement.status?.toLowerCase() === 'terminated';

    return (
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          {selectedAgreement.status?.toLowerCase() === 'active' && renderActiveContent(selectedAgreement)}
          {isPending && renderPendingContent(selectedAgreement)}
          {isExpired && renderExpiredContent(selectedAgreement)}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/60">
            {selectedAgreement.status?.toLowerCase() === 'active' && (
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#FFF3EB] flex items-center justify-center text-[#F97316]"><FaHourglassHalf size={14} /></div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Contract Expiry</p>
                    <p className="text-[14px] font-extrabold text-[#112338]">{selectedAgreement.endDate || '01 Jan 2027'}</p>
                  </div>
                </div>
              </div>
            )}

            {selectedAgreement.status?.toLowerCase() === 'active' && (
              <div className="bg-[#F8F9FC] rounded-xl p-4 border border-gray-100 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11.5px] font-bold text-gray-500">Time Remaining</span>
                  <span className="text-[11.5px] font-extrabold text-[#112338]">{selectedAgreement.durationMonths} Months</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#B68B39] h-1.5 rounded-full" style={{ width: '8.3%' }}></div>
                </div>
              </div>
            )}

            <h4 className="text-[13.5px] font-extrabold text-[#112338] mb-4">Quick Actions</h4>
            <div className="space-y-2.5">
              {!selectedAgreement.ownerSignedAt && !['active', 'cancelled', 'expired', 'terminated'].includes(selectedAgreement.status?.toLowerCase()) && (
                <button
                  onClick={handleSign}
                  disabled={actionLoading === 'sign'}
                  className="w-full py-3 bg-[#0A2240] text-white rounded-xl text-[12.5px] font-bold hover:bg-[#11315c] transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <MdCheckCircle size={16} /> {actionLoading === 'sign' ? 'Signing...' : 'Sign Agreement'}
                </button>
              )}

              {['pending_owner_signature', 'draft', 'pending'].includes(selectedAgreement.status?.toLowerCase()) && (
                <button
                  onClick={handleSend}
                  disabled={actionLoading === 'send'}
                  className="w-full py-3 bg-[#B68B39] text-white rounded-xl text-[12.5px] font-bold hover:bg-[#a0762d] transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <MdSend size={16} /> {actionLoading === 'send' ? 'Sending...' : 'Send Agreement'}
                </button>
              )}

              {!['active', 'cancelled', 'expired', 'terminated'].includes(selectedAgreement.status?.toLowerCase()) && (
                <button
                  onClick={handleActivate}
                  disabled={actionLoading === 'activate'}
                  className="w-full py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-[12.5px] font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <MdCheckCircle size={16} /> {actionLoading === 'activate' ? 'Updating...' : 'Activate Agreement'}
                </button>
              )}

              {!['cancelled', 'expired', 'terminated'].includes(selectedAgreement.status?.toLowerCase()) && (
                <button
                  onClick={handleCancel}
                  disabled={actionLoading === 'cancel'}
                  className="w-full py-3 bg-white border border-[#FECACA] text-[#DC2626] rounded-xl text-[12.5px] font-bold hover:bg-[#FEF2F2] transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <MdCancel size={16} /> {actionLoading === 'cancel' ? 'Cancelling...' : 'Cancel Agreement'}
                </button>
              )}
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/60">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#FDF8F0] flex items-center justify-center border border-[#F3E6D0] text-[#B68B39]"><MdLock size={20} /></div>
              <div>
                <p className="text-[14px] font-extrabold text-[#112338]">Secure Smart Contract</p>
                <p className="text-[11px] font-medium text-gray-400">Protected by Paband verification</p>
              </div>
            </div>
            <div className="rounded-2xl bg-[#F8FAFC] p-4 text-[12px] font-medium text-gray-600 leading-relaxed">
              Any changes to the agreement require approval from both parties and generate a new version for audit purposes.
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#F5F6FA] pb-12">
      <AgreementCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateAgreement}
        loading={createLoading}
        properties={properties}
      />

      <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <h2 className="text-[28px] font-extrabold text-[#112338] leading-tight tracking-tight">Agreement Management</h2>
            <p className="text-gray-500 text-[13.5px] mt-1 font-medium">Review contract details, verify signatures, and manage agreement actions from one place.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setCreateModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-[#B68B39] rounded-xl text-[13px] font-bold text-white hover:bg-[#a0762d] transition-all shadow-sm">
              <MdAdd size={18} /> Create Agreement
            </button>
            {selectedAgreement && (
              <>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
                  <MdPrint size={18} /> Print
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#0A2240] rounded-xl text-[13px] font-bold text-white hover:bg-[#11315c] transition-all shadow-sm">
                  <MdOutlineFileDownload size={18} /> Download PDF
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-white p-4 rounded-[20px] border border-gray-100/60 shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
          <div className="md:col-span-7 flex flex-wrap gap-2">
            {['active', 'pending', 'expired'].map((state) => (
              <button
                key={state}
                onClick={() => setViewState(state)}
                className={`px-4 py-2 rounded-full text-[12px] font-extrabold uppercase tracking-wide transition-all ${
                  viewState === state ? 'bg-[#112338] text-white' : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
                }`}
              >
                {state === 'active' ? 'Active' : state === 'pending' ? 'Pending' : 'Expired'}
              </button>
            ))}
          </div>

          <div className="md:col-span-5 relative">
            <input
              type="text"
              placeholder="Search by property, tenant, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-[13px] font-medium outline-none focus:border-[#B68B39] transition-all"
            />
            <MdSearch size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
          </div>
        </div>

        {loading && <div className="rounded-[24px] bg-white p-6 text-sm text-gray-600">Loading agreements...</div>}
        {!loading && error && <div className="rounded-[24px] bg-white p-6 text-sm text-red-600">{error}</div>}

        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 bg-white rounded-[24px] border border-gray-100/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
              <div className="p-5 border-b border-gray-50 bg-[#FCFBF8]">
                <h3 className="text-[15px] font-extrabold text-[#112338]">
                  {viewState === 'active' ? 'Active Contracts' : viewState === 'pending' ? 'Pending Action' : 'Expired & Inactive'} ({filteredList.length})
                </h3>
              </div>
              <div className="max-h-[600px] overflow-y-auto divide-y divide-gray-50">
                {filteredList.length === 0 ? (
                  <div className="p-8 text-center text-gray-400 text-[13px] font-medium">No agreements found.</div>
                ) : (
                  filteredList.map((agr) => {
                    const isSelected = selectedAgreement?.id === agr.id;
                    return (
                      <div
                        key={agr.id}
                        onClick={() => setSelectedAgreement(agr)}
                        className={`p-4 cursor-pointer transition-all hover:bg-slate-50 flex items-start gap-3 border-l-4 ${
                          isSelected ? 'bg-slate-50/80 border-[#B68B39]' : 'border-transparent'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#FDF8F0] flex items-center justify-center shrink-0 border border-[#F3E6D0]">
                          {agr.property?.image ? (
                            <img src={agr.property.image} alt="" className="w-full h-full object-cover rounded-xl" />
                          ) : (
                            <svg className="w-4 h-4 text-[#DDB976]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14H7v-2h4v2zm0-4H7v-2h4v2zm0-4H7V7h4v2zm6 8h-4v-2h4v2zm0-4h-4v-2h4v2zm0-4h-4V7h4v2z" />
                            </svg>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[13.5px] font-extrabold text-[#112338] truncate">{agr.propertyName}</p>
                          <p className="text-[11.5px] text-gray-500 font-medium truncate mt-0.5">Tenant: {agr.tenantName}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-[12px] font-extrabold text-[#B68B39]">{agr.monthlyRent}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                              agr.status?.toLowerCase() === 'active'
                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                : agr.status?.toLowerCase().includes('pending')
                                ? 'bg-blue-50 text-blue-600 border border-blue-100'
                                : 'bg-rose-50 text-rose-600 border border-rose-100'
                            }`}>
                              {formatStatus(agr.status)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="lg:col-span-8">
              {renderDetailPane()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerAgreements;
