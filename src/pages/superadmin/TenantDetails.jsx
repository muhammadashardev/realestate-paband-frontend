import React, { useEffect, useMemo, useState } from 'react';
import { Search, CheckCircle2, AlertCircle, FileText, Loader2, ShieldCheck, ShieldX } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { approveTenant, getAdminTenantDetails, rejectTenant } from '../../utils/adminService';

const normalizeTenantDetails = (payload) => {
    const user = payload?.user || payload?.data || payload?.tenant || payload || {};
    const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ').trim();
    const statusValue = String(user?.accountStatus || user?.status || 'active').toLowerCase();
    const verificationValue = String(
        user?.verificationStatus ||
        user?.verification ||
        (user?.isVerified === true ? 'approved' : statusValue === 'rejected' ? 'rejected' : statusValue === 'approved' ? 'approved' : 'pending')
    ).toLowerCase();
    const normalizedVerification = verificationValue === 'approved' || verificationValue === 'verified' ? 'approved' : verificationValue === 'rejected' || verificationValue === 'declined' ? 'rejected' : 'pending';
    const normalizedStatus = statusValue === 'suspended' ? 'Suspended' : statusValue === 'rejected' ? 'Rejected' : statusValue === 'approved' ? 'Active' : 'Pending';

    return {
        id: user?.id || user?._id || user?.userId,
        name: fullName || user?.name || user?.fullName || user?.email || 'Unknown user',
        email: user?.email || 'N/A',
        phone: user?.phone || user?.phoneNumber || 'N/A',
        role: user?.role || 'Tenant',
        location: user?.address || user?.city || user?.location || 'N/A',
        verification: normalizedVerification,
        verificationLabel: normalizedVerification === 'approved' ? 'Verified' : normalizedVerification === 'rejected' ? 'Rejected' : 'Pending',
        status: normalizedStatus,
        documents: Array.isArray(user?.documents) ? user.documents : [],
        metadata: user?.metadata || {},
    };
};

export default function TenantDetails() {
    const { id } = useParams();
    const [tenant, setTenant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [rejectionReason, setRejectionReason] = useState('');
    const [actionLoading, setActionLoading] = useState('');
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        const loadTenant = async () => {
            setLoading(true);
            setError('');
            try {
                const payload = await getAdminTenantDetails(id);
                setTenant(normalizeTenantDetails(payload));
            } catch (err) {
                setError(err.message || 'Unable to load tenant details.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadTenant();
        }
    }, [id]);

    const infoFields = useMemo(() => {
        if (!tenant) return [];

        return [
            { label: 'Full Name', value: tenant.name },
            { label: 'Email', value: tenant.email },
            { label: 'Phone Number', value: tenant.phone },
            { label: 'Location', value: tenant.location },
            { label: 'Verification', value: tenant.verificationLabel },
            { label: 'Status', value: tenant.status },
        ];
    }, [tenant]);

    const handleApprove = async () => {
        try {
            setActionLoading('approve');
            setFeedback('');
            await approveTenant(id);
            setTenant((prev) => prev ? { ...prev, verification: 'approved', verificationLabel: 'Verified' } : prev);
            setFeedback('Tenant approved successfully.');
        } catch (err) {
            setError(err.message || 'Unable to approve tenant.');
        } finally {
            setActionLoading('');
        }
    };

    const handleReject = async () => {
        if (!rejectionReason.trim()) {
            setError('Please enter a rejection reason.');
            return;
        }

        try {
            setActionLoading('reject');
            setFeedback('');
            await rejectTenant(id, rejectionReason);
            setTenant((prev) => prev ? { ...prev, verification: 'rejected', verificationLabel: 'Rejected' } : prev);
            setFeedback('Tenant rejected successfully.');
        } catch (err) {
            setError(err.message || 'Unable to reject tenant.');
        } finally {
            setActionLoading('');
        }
    };

    return (
        <div className="flex-1 bg-[#F8F9FA] p-4 md:p-8 lg:p-10 min-h-screen overflow-x-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-200/60">
                <h1 className="text-xl font-bold tracking-tight text-zinc-800 ml-12 md:ml-0">Dashboard</h1>
                <div className="w-full sm:w-72 relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search properties, tenants..."
                        className="w-full bg-gray-100/80 border-0 pl-9 pr-4 py-2 rounded-xl text-xs outline-none"
                    />
                </div>
            </div>

            <div className="my-8">
                <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Tenant Details</h2>
                <p className="text-gray-400 text-sm mt-1">Review user information and request details before making a decision. (ID: {id})</p>
            </div>

            {loading ? (
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center text-zinc-500">
                    <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading tenant details...
                    </div>
                </div>
            ) : error && !tenant ? (
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center text-rose-500">{error}</div>
            ) : tenant ? (
                <>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                        <div className="flex items-center gap-4 self-start sm:self-auto">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" className="w-16 h-16 rounded-full object-cover border" alt="Profile" />
                            <div>
                                <h3 className="text-lg font-bold text-zinc-900">{tenant.name}</h3>
                                <p className="text-xs text-zinc-400 mt-0.5">{tenant.email}</p>
                                <div className="flex gap-2 mt-2">
                                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold">Tenant</span>
                                    <span className="px-2 py-0.5 bg-blue-50 text-blue-500 rounded-full text-[10px] font-bold">✓ {tenant.verificationLabel}</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
                            <button
                                onClick={handleApprove}
                                disabled={actionLoading === 'approve'}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
                            >
                                <ShieldCheck size={14} /> {actionLoading === 'approve' ? 'Approving...' : 'Approve'}
                            </button>
                            <button
                                onClick={handleReject}
                                disabled={actionLoading === 'reject'}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-70 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
                            >
                                <ShieldX size={14} /> {actionLoading === 'reject' ? 'Rejecting...' : 'Reject'}
                            </button>
                        </div>
                    </div>

                    {feedback ? <div className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{feedback}</div> : null}
                    {error ? <div className="mb-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</div> : null}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="text-sm font-bold text-zinc-800 mb-5">Basic Information</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {infoFields.map((field, idx) => (
                                        <div key={idx}>
                                            <label className="text-[11px] font-semibold text-zinc-400 block mb-1.5">{field.label}</label>
                                            <input
                                                type="text"
                                                readOnly
                                                value={field.value}
                                                className="w-full bg-gray-50/80 border-0 p-3 rounded-xl text-xs text-zinc-800 font-medium focus:outline-none"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="text-sm font-bold text-zinc-800 mb-3">Rejection Reason</h3>
                                <textarea
                                    rows="4"
                                    value={rejectionReason}
                                    onChange={(event) => setRejectionReason(event.target.value)}
                                    placeholder="Enter a reason when rejecting this tenant"
                                    className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-1 focus:ring-[#C58940]"
                                />
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="text-sm font-bold text-zinc-800 mb-4 flex items-center gap-2">
                                    <FileText size={16} className="text-blue-500" /> Uploaded Documents
                                </h3>
                                {tenant.documents.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {tenant.documents.map((doc, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50/60 rounded-xl border border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-white rounded-lg text-rose-500 shadow-sm border border-gray-100">
                                                        <FileText size={16} />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xs font-bold text-zinc-800">{doc.name || `Document ${idx + 1}`}</h4>
                                                        <p className="text-[10px] text-zinc-400 mt-0.5">{doc.size || 'Uploaded'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-zinc-500">No uploaded documents were returned by the API.</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                {[{ label: 'CURRENT RENTAL', val: '1' }, { label: 'SUPPORT CASES', val: '6' }, { label: 'TENANT SCORE', val: '4.6' }, { label: 'VERIFICATION STATUS', val: '87%' }].map((box, idx) => (
                                    <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center min-h-[100px]">
                                        <span className="text-[18px] font-black text-zinc-800 tracking-tight">{box.val}</span>
                                        <span className="text-[9px] font-bold text-zinc-400 tracking-wider mt-2 uppercase">{box.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="text-xs font-bold text-zinc-800 mb-4">Verification Status</h3>
                                <div className="space-y-3.5">
                                    {[{ label: 'CNIC Verified', verified: true }, { label: 'Phone Number Verified', verified: true }, { label: 'Employment Verified', verified: false }, { label: 'Documents Submitted', verified: true }].map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between">
                                            <span className="text-xs font-semibold text-zinc-500">{item.label}</span>
                                            {item.verified ? <CheckCircle2 size={16} className="text-emerald-500" /> : <AlertCircle size={16} className="text-rose-400" />}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
}
