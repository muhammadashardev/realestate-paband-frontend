import React, { useEffect, useMemo, useState } from 'react';
import { Search, Eye, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAdminUsers } from '../../utils/adminService';

const normalizeUsers = (payload) => {
    const users = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.users)
            ? payload.users
            : Array.isArray(payload?.data)
                ? payload.data
                : Array.isArray(payload?.results)
                    ? payload.results
                    : [];

    return users.map((user, index) => {
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
            id: user?.id || user?._id || user?.userId || index,
            name: fullName || user?.name || user?.fullName || user?.email || 'Unknown user',
            role: user?.role || 'Tenant',
            phone: user?.phone || user?.phoneNumber || 'N/A',
            location: user?.address || user?.city || user?.location || 'N/A',
            verification: normalizedVerification,
            verificationLabel: normalizedVerification === 'approved' ? 'Verified' : normalizedVerification === 'rejected' ? 'Rejected' : 'Pending',
            status: normalizedStatus,
            statusValue,
            email: user?.email || 'N/A',
            avatar: user?.avatar || user?.profilePicture || user?.image || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
        };
    });
};

const getVerificationStyles = (verification) => {
    switch (verification) {
        case 'approved':
        case 'verified':
            return 'text-emerald-600 bg-emerald-50';
        case 'rejected':
            return 'text-rose-500 bg-rose-50';
        default:
            return 'text-amber-500 bg-amber-50';
    }
};

const getStatusStyles = (status) => {
    return status === 'Suspended'
        ? 'bg-rose-50 text-rose-500'
        : 'bg-emerald-50 text-emerald-600';
};

export default function TenantsList() {
    const navigate = useNavigate();
    const location = useLocation();
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [verificationFilter, setVerificationFilter] = useState('all');

    const isTenantsActive = location.pathname === '/superadmin' || location.pathname.startsWith('/superadmin/tenants');
    const isOwnersActive = location.pathname.startsWith('/superadmin/owners');

    useEffect(() => {
        const loadTenants = async () => {
            setLoading(true);
            setError('');
            try {
                const payload = await getAdminUsers({ role: 'tenant', search: searchTerm || undefined });
                setTenants(normalizeUsers(payload));
            } catch (err) {
                setError(err.message || 'Unable to load tenants right now.');
                setTenants([]);
            } finally {
                setLoading(false);
            }
        };

        const timer = window.setTimeout(loadTenants, 250);
        return () => window.clearTimeout(timer);
    }, [searchTerm]);

    const filteredTenants = useMemo(() => {
        if (verificationFilter === 'all') {
            return tenants;
        }

        return tenants.filter((tenant) => tenant.verification === verificationFilter);
    }, [tenants, verificationFilter]);

    return (
        <div className="flex-1 bg-[#F8F9FA] p-4 md:p-8 lg:p-10 min-h-screen overflow-x-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-200/60">
                <h1 className="text-xl font-bold tracking-tight text-zinc-800 ml-12 md:ml-0">Dashboard</h1>
                <div className="w-full sm:w-72 relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search tenants..."
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        className="w-full bg-gray-100/80 border-0 pl-9 pr-4 py-2 rounded-xl text-xs focus:ring-1 focus:ring-[#C58940] outline-none"
                    />
                </div>
            </div>

            <div className="my-8">
                <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Tenants List</h2>
                <p className="text-gray-400 text-sm mt-1">Manage owners and tenants across the platform.</p>
            </div>

            <div className="flex gap-2 p-1.5 bg-gray-100/50 w-fit rounded-2xl mb-8">
                <button onClick={() => navigate('/superadmin/tenants')} className={`${isTenantsActive ? 'bg-[#C58940] text-white' : 'text-zinc-600'} px-8 py-2.5 rounded-xl font-medium text-sm shadow-sm transition-all`}>
                    Tenants
                </button>
                <button onClick={() => navigate('/superadmin/owners')} className={`${isOwnersActive ? 'bg-[#C58940] text-white' : 'text-zinc-600'} px-8 py-2.5 rounded-xl font-medium text-sm transition-all`}>
                    Owners
                </button>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                <div className="w-full md:w-96 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        className="w-full bg-amber-50/20 border border-amber-100/60 pl-9 pr-4 py-2.5 rounded-xl text-xs outline-none"
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <select
                        value={verificationFilter}
                        onChange={(event) => setVerificationFilter(event.target.value)}
                        className="flex-1 md:w-40 bg-amber-50/20 border border-amber-100/60 p-2.5 rounded-xl text-xs text-zinc-600 outline-none"
                    >
                        <option value="all">All Verification</option>
                        <option value="approved">Verified</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-amber-50/10 text-zinc-400 text-[11px] font-bold tracking-wider border-b border-gray-100">
                                <th className="p-4 pl-6">User</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Phone</th>
                                <th className="p-4">Location</th>
                                <th className="p-4">Verification</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-xs font-medium text-zinc-700">
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="p-8 text-center text-zinc-500">
                                        <div className="flex items-center justify-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Loading tenants...
                                        </div>
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="7" className="p-8 text-center text-rose-500">{error}</td>
                                </tr>
                            ) : filteredTenants.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="p-8 text-center text-zinc-500">No tenants found.</td>
                                </tr>
                            ) : (
                                filteredTenants.map((tenant) => (
                                    <tr key={tenant.id} className="hover:bg-gray-50/40 transition-colors">
                                        <td className="p-4 pl-6 flex items-center gap-3">
                                            <img src={tenant.avatar} className="w-8 h-8 rounded-full object-cover" alt="avatar" onError={(event) => { event.currentTarget.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop'; }} />
                                            <div>
                                                <div className="font-bold text-zinc-900">{tenant.name}</div>
                                                <div className="text-[10px] text-zinc-400">{tenant.email}</div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-zinc-400">{tenant.role}</td>
                                        <td className="p-4 text-zinc-500">{tenant.phone}</td>
                                        <td className="p-4 text-zinc-800">{tenant.location}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide ${getVerificationStyles(tenant.verification)}`}>
                                                {tenant.verificationLabel}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide ${getStatusStyles(tenant.status)}`}>
                                                {tenant.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button onClick={() => navigate(`/superadmin/tenants/${tenant.id}`)} className="p-2 bg-amber-50/60 hover:bg-amber-100/80 rounded-xl text-amber-700 transition-colors inline-flex items-center justify-center">
                                                <Eye size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
                <p className="text-xs font-medium text-zinc-400">Showing {filteredTenants.length} result{filteredTenants.length === 1 ? '' : 's'}</p>
                <div className="flex items-center gap-1">
                    <button className="p-2 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 text-zinc-400">
                        <ChevronLeft size={16} />
                    </button>
                    <button className="w-8 h-8 rounded-xl bg-zinc-900 text-white font-bold text-xs flex items-center justify-center">1</button>
                    <button className="w-8 h-8 rounded-xl bg-white border border-gray-200 text-zinc-600 font-bold text-xs flex items-center justify-center hover:bg-gray-50">2</button>
                    <button className="w-8 h-8 rounded-xl bg-white border border-gray-200 text-zinc-600 font-bold text-xs flex items-center justify-center hover:bg-gray-50">3</button>
                    <span className="px-1 text-zinc-400 text-xs">...</span>
                    <button className="w-8 h-8 rounded-xl bg-white border border-gray-200 text-zinc-600 font-bold text-xs flex items-center justify-center hover:bg-gray-50">50</button>
                    <button className="p-2 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 text-zinc-400">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
