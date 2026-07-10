import React, { useEffect, useState } from 'react';
import { Search, ShieldAlert, CheckCircle2, Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { activateOwner, getAdminUsers, suspendOwner } from '../../utils/adminService';

const normalizeOwnerDetails = (payload) => {
    const user = payload?.user || payload?.data || payload?.owner || payload || {};
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
        role: user?.role || 'Owner',
        location: user?.address || user?.city || user?.location || 'N/A',
        verification: normalizedVerification,
        verificationLabel: normalizedVerification === 'approved' ? 'Verified' : normalizedVerification === 'rejected' ? 'Rejected' : 'Pending',
        status: normalizedStatus,
        statusValue,
        properties: user?.propertyCount || user?.properties?.length || 0,
        avatar: user?.profilePicture || user?.avatar || user?.photo || user?.image || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
    };
};

export default function OwnerDetailssuper() {
    const { id } = useParams();
    const [owner, setOwner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        const loadOwner = async () => {
            setLoading(true);
            setError('');
            try {
                const payload = await getAdminUsers({ role: 'owner' });
                const users = Array.isArray(payload) ? payload : Array.isArray(payload?.users) ? payload.users : [];
                const matchedOwner = users.find((item) => String(item?.id || item?._id || item?.userId) === String(id));
                setOwner(normalizeOwnerDetails(matchedOwner || payload));
            } catch (err) {
                setError(err.message || 'Unable to load owner details.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadOwner();
        }
    }, [id]);

    const handleOwnerAction = async () => {
        if (!owner) return;

        try {
            setActionLoading(true);
            if (owner.statusValue === 'suspended') {
                await activateOwner(owner.id);
                setOwner((prev) => prev ? { ...prev, status: 'Active', statusValue: 'active' } : prev);
            } else {
                await suspendOwner(owner.id);
                setOwner((prev) => prev ? { ...prev, status: 'Suspended', statusValue: 'suspended' } : prev);
            }
        } catch (err) {
            setError(err.message || 'Unable to update owner status.');
        } finally {
            setActionLoading(false);
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
                <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Owner Details</h2>
                <p className="text-gray-400 text-sm mt-1">Review user information and request details before making a decision. (ID: {id})</p>
            </div>

            {loading ? (
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center text-zinc-500">
                    <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading owner details...
                    </div>
                </div>
            ) : error && !owner ? (
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center text-rose-500">{error}</div>
            ) : owner ? (
                <>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                        <div className="flex items-center gap-4 self-start sm:self-auto">
                            <img src={owner.avatar} className="w-16 h-16 rounded-full object-cover border" alt="Profile" onError={(event) => { event.currentTarget.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop'; }} />
                            <div>
                                <h3 className="text-lg font-bold text-zinc-900">{owner.name}</h3>
                                <p className="text-xs text-zinc-400 mt-0.5">{owner.email}</p>
                                <div className="flex gap-2 mt-2">
                                    <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold">Owner</span>
                                    <span className="px-2 py-0.5 bg-blue-50 text-blue-500 rounded-full text-[10px] font-bold">✓ {owner.verificationLabel}</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleOwnerAction}
                            disabled={actionLoading}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-70 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
                        >
                            <ShieldAlert size={14} /> {actionLoading ? 'Working...' : owner.statusValue === 'suspended' ? 'Activate Owner' : 'Suspend Owner'}
                        </button>
                    </div>

                    {error ? <div className="mb-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</div> : null}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="text-sm font-bold text-zinc-800 mb-5">Basic Information</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {[{ label: 'Full Name', value: owner.name }, { label: 'Email', value: owner.email }, { label: 'Phone Number', value: owner.phone }, { label: 'Location', value: owner.location }, { label: 'Verification', value: owner.verificationLabel }, { label: 'Status', value: owner.status }].map((field, idx) => (
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
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                {[{ label: 'PROPERTIES OWNED', val: owner.properties }, { label: 'VERIFICATION STATUS', val: owner.verificationLabel }].map((box, idx) => (
                                    <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center min-h-[100px]">
                                        <span className="text-lg font-black text-zinc-800 tracking-tight">{box.val}</span>
                                        <span className="text-[9px] font-bold text-zinc-400 tracking-wider mt-2 text-center uppercase leading-tight">{box.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                                <h3 className="text-xs font-bold text-zinc-800 mb-4">Account Status</h3>
                                <div className="space-y-3.5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold text-zinc-500">Current State</span>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${owner.statusValue === 'suspended' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-600'}`}>{owner.status}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold text-zinc-500">Verification</span>
                                        <CheckCircle2 size={16} className="text-emerald-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
}
