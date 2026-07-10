import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MdChevronLeft, MdFolder, MdChatBubble, MdPeople, MdCalendarToday,
  MdInfo, MdCheckCircle, MdCancel, MdOutlineRemoveRedEye, MdFileDownload
} from 'react-icons/md';
import { getTenantById, updateTenantStatus } from '../../utils/tenantService';
import { getPropertyById } from '../../utils/propertyService';

const OwnerTenantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tenant, setTenant] = useState(null);
  const [property, setProperty] = useState(null);
  const [isApproving, setIsApproving] = useState(false);

  useEffect(() => {
    const tData = getTenantById(id);
    if (tData) {
      setTenant(tData);
      const pData = getPropertyById(tData.propertyId);
      setProperty(pData);
    }
  }, [id]);

  if (!tenant) {
    return (
      <div className="p-8 text-center bg-[#F8F9FC] min-h-screen">
        <p className="text-gray-500 font-semibold">Tenant request not found.</p>
        <button
          onClick={() => navigate('/owner/tenants')}
          className="mt-4 px-4 py-2 bg-[#B68B39] text-white rounded-lg text-sm font-bold"
        >
          Back to Tenant List
        </button>
      </div>
    );
  }

  const handleApprove = () => {
    setIsApproving(true);
    // Simulate API delay
    setTimeout(() => {
      updateTenantStatus(tenant.id, 'Approved');
      // Reload updated tenant details
      const updatedTenant = getTenantById(tenant.id);
      setTenant(updatedTenant);
      setIsApproving(false);
    }, 800);
  };

  // Helper to format currency
  const formatCurrency = (amount) => {
    return `PKR ${parseInt(amount).toLocaleString()}`;
  };

  // Document Icon Picker
  const getDocIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('cnic')) {
      return (
        <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
      );
    } else if (n.includes('salary')) {
      return (
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      );
    } else if (n.includes('employment')) {
      return (
        <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        </div>
      );
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1600px] mx-auto bg-[#F8F9FC] min-h-screen">
      
      {/* Back button & Title Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/owner/tenants')}
            className="flex items-center gap-1 text-[#B68B39] text-[13px] font-bold hover:underline mb-2 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Tenant List</span>
          </button>
          <h2 className="text-[28px] font-extrabold text-[#112338] leading-tight tracking-tight">
            Tenant Details
          </h2>
          <p className="text-gray-500 text-[13px] md:text-[14px] mt-1 font-medium">
            Review tenant information and request details before making a decision.
          </p>
        </div>

        {/* Top-Right Status Badge */}
        <div className="shrink-0">
          {tenant.status === 'Approved' ? (
            <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#EBFDF5] text-[#10B981] border border-[#A7F3D0]/60 text-[13px] font-extrabold shadow-sm tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" /> Approved
            </span>
          ) : tenant.status === 'Under Review' ? (
            <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]/60 text-[13px] font-extrabold shadow-sm tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#D97706]" /> Under Review
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#EBF5FF] text-[#2563EB] border border-[#BFDBFE]/60 text-[13px] font-extrabold shadow-sm tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#2563EB]" /> New Request
            </span>
          )}
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Tenant Details Profile, Message, Documents) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Profile Summary */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100/60 shadow-[0_4px_20px_rgba(0,0,0,0.015)]">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              {/* Large Avatar with check badge */}
              <div className="relative shrink-0 select-none">
                <img
                  src={tenant.avatar}
                  alt={tenant.name}
                  className="w-24 h-24 rounded-2xl object-cover border border-gray-100"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white shadow-sm">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              {/* Title & Badge Details */}
              <div className="flex-1 text-center sm:text-left space-y-3.5 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-2.5">
                  <h3 className="text-xl font-extrabold text-[#112338] tracking-tight">{tenant.name}</h3>
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#EBFDF5] text-[#10B981] border border-[#A7F3D0]/40 text-[10px] font-black tracking-wider uppercase">
                    ✓ Verified Tenant
                  </span>
                </div>
                
                <p className="text-[#2563EB] text-[13.5px] font-bold tracking-wide">
                  {tenant.profession}
                </p>

                {/* Grid details boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="bg-gray-50/60 p-3.5 rounded-xl border border-gray-100/40 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block leading-none">Family Members</span>
                      <span className="text-[13.5px] font-extrabold text-[#112338] mt-1 block leading-none">{tenant.familyMembers}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50/60 p-3.5 rounded-xl border border-gray-100/40 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block leading-none">Preferred Move-In</span>
                      <span className="text-[13.5px] font-extrabold text-[#112338] mt-1 block leading-none">{tenant.preferredMoveIn}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Card 2: Tenant Message */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100/60 shadow-[0_4px_20px_rgba(0,0,0,0.015)] space-y-4">
            <div className="flex items-center gap-2 text-[#112338]">
              <span className="text-lg">💬</span>
              <h3 className="text-[15px] font-extrabold">Tenant Message</h3>
            </div>
            
            <div className="bg-[#F0F7FF] border-l-4 border-[#2563EB] p-4 rounded-r-xl">
              <p className="text-slate-600 italic text-[13.5px] leading-relaxed font-medium">
                "{tenant.message}"
              </p>
            </div>
          </div>

          {/* Card 3: Uploaded Documents */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100/60 shadow-[0_4px_20px_rgba(0,0,0,0.015)] space-y-4">
            <div className="flex items-center gap-2 text-[#112338]">
              <span className="text-lg">📁</span>
              <h3 className="text-[15px] font-extrabold">Uploaded Documents</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tenant.documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50/60 hover:bg-gray-50/90 rounded-xl p-4 flex items-center justify-between border border-gray-100/80 transition-all group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {getDocIcon(doc.name)}
                    <div className="min-w-0">
                      <span className="text-[13px] font-bold text-[#112338] block truncate leading-tight">
                        {doc.name}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase mt-1 block leading-none">
                        {doc.type} • {doc.size}
                      </span>
                    </div>
                  </div>

                  {/* Document View Icon */}
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    title="View Document"
                    className="w-7 h-7 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center transition-colors border border-blue-100/20 shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (Property Summary & Verification Checklist) */}
        <div className="space-y-6">
          
          {/* Card 1: Property Overview Card */}
          {property && (
            <div className="bg-white rounded-2xl p-3 border border-gray-100/60 shadow-[0_4px_20px_rgba(0,0,0,0.015)]">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-44 object-cover"
                />
                <span className="absolute top-3 right-3 bg-[#112338]/85 text-white border border-white/10 text-[9.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                  {property.type}
                </span>
              </div>
              <div className="p-2 pt-3">
                <h4 className="text-[15.5px] font-extrabold text-[#112338] tracking-tight">
                  {property.title}
                </h4>
                <p className="text-[11.5px] text-gray-400 font-bold mt-1.5 flex items-center gap-0.5">
                  📍 {property.location}
                </p>
                <div className="my-3.5 border-t border-gray-100" />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-gray-400 font-extrabold uppercase tracking-wide">Requested Rent</span>
                  <span className="text-[15.5px] font-black text-[#112338]">
                    {formatCurrency(property.rent)} <span className="text-[11px] font-bold text-gray-400">/ Month</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Card 2: Verification Status Check list */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100/60 shadow-[0_4px_20px_rgba(0,0,0,0.015)] space-y-4">
            <h3 className="text-[15px] font-extrabold text-[#112338] tracking-tight">
              Verification Status
            </h3>

            <div className="space-y-3.5">
              {/* Row 1: CNIC Verified */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-[#B68B39]/10 text-[#B68B39] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  </div>
                  <span className="text-[12.5px] font-bold text-gray-600">CNIC Verified</span>
                </div>
                {tenant.verifications.cnicVerified ? (
                  <div className="w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px] shadow-sm shadow-emerald-500/10">✓</div>
                ) : (
                  <div className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-extrabold shadow-sm shadow-red-500/10">✕</div>
                )}
              </div>

              {/* Row 2: Phone Verified */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-[#B68B39]/10 text-[#B68B39] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 00.996.808H12m0 0H9m3 0l.548-2.2a1 1 0 01.94-.725H19a2 2 0 012 2v3.28a1 1 0 01-.72l-2.25 2.25a1 1 0 00-.31.707V19a2 2 0 01-2 2h-3.28a1 1 0 01-.94-.725l-.548-2.2a1 1 0 00-.996-.808H12m0 0H9m3 0l-1.04 1.04" />
                    </svg>
                  </div>
                  <span className="text-[12.5px] font-bold text-gray-600">Phone Number Verified</span>
                </div>
                {tenant.verifications.phoneVerified ? (
                  <div className="w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px] shadow-sm shadow-emerald-500/10">✓</div>
                ) : (
                  <div className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-extrabold shadow-sm shadow-red-500/10">✕</div>
                )}
              </div>

              {/* Row 3: Employment Verified */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-[#B68B39]/10 text-[#B68B39] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-[12.5px] font-bold text-gray-600">Employment Verified</span>
                </div>
                {tenant.verifications.employmentVerified ? (
                  <div className="w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px] shadow-sm shadow-emerald-500/10">✓</div>
                ) : (
                  <div className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-extrabold shadow-sm shadow-red-500/10">✕</div>
                )}
              </div>

              {/* Row 4: Documents Submitted */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-[#B68B39]/10 text-[#B68B39] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-[12.5px] font-bold text-gray-600">Documents Submitted</span>
                </div>
                {tenant.verifications.documentsSubmitted ? (
                  <div className="w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px] shadow-sm shadow-emerald-500/10">✓</div>
                ) : (
                  <div className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-extrabold shadow-sm shadow-red-500/10">✕</div>
                )}
              </div>
            </div>

            {/* Need Approval Action Button */}
            <div className="pt-2">
              {tenant.status === 'Approved' ? (
                <div className="w-full py-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 font-extrabold text-[13.5px] text-center flex items-center justify-center gap-1.5 shadow-sm">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Tenant Approved</span>
                </div>
              ) : (
                <button
                  onClick={handleApprove}
                  disabled={isApproving}
                  className="w-full py-3 rounded-lg bg-[#B68B39] text-white text-[13.5px] font-bold hover:bg-[#a0762d] active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-[#B68B39]/10"
                >
                  {isApproving ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Approving Request...</span>
                    </>
                  ) : (
                    <span>Need Approval</span>
                  )}
                </button>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default OwnerTenantDetail;
