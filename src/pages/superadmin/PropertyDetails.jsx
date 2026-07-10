import React, { useEffect, useMemo, useState } from 'react';
import { Search, Bell, Shield, ShieldCheck, Zap } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getAdminPropertyDetails, updateAdminPropertyStatus } from '../../utils/adminService';

const fallbackImage = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop';

const normalizePropertyImages = (property) => {
    const values = [property?.gallery, property?.images, property?.photos, property?.media, property?.image, property?.imageUrl, property?.mainImage, property?.thumbnail, property?.coverImage];
    const images = [];

    const addValue = (value) => {
        if (!value) return;

        if (Array.isArray(value)) {
            value.forEach(addValue);
            return;
        }

        if (typeof value === 'string') {
            const trimmed = value.trim();
            if (!trimmed) return;

            if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
                try {
                    addValue(JSON.parse(trimmed));
                    return;
                } catch {
                    // ignore malformed JSON and fall back to the raw string
                }
            }

            if (trimmed.includes(',')) {
                trimmed.split(',').forEach((part) => addValue(part.trim()));
                return;
            }

            images.push(trimmed);
            return;
        }

        if (typeof value === 'object') {
            const candidate = value.url || value.src || value.path || value.image || value.imageUrl || value.link || value.file || value.thumbnailUrl;
            if (typeof candidate === 'string' && candidate.trim()) {
                images.push(candidate.trim());
            }
            if (Array.isArray(value.images)) {
                value.images.forEach(addValue);
            }
            if (Array.isArray(value.gallery)) {
                value.gallery.forEach(addValue);
            }
        }
    };

    values.forEach(addValue);
    return [...new Set(images.filter(Boolean))];
};

const getDisplayValue = (value, fallback = '—') => (value ?? fallback);

export default function PropertyDetails() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');

    useEffect(() => {
        const loadProperty = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const response = await getAdminPropertyDetails(id);
                const payload = response?.property || response?.data || response || null;
                setProperty(payload);
                setSelectedStatus(payload?.status || '');
            } catch (err) {
                setError(err.message || 'Failed to load property details');
            } finally {
                setLoading(false);
            }
        };

        loadProperty();
    }, [id]);

    const specItems = useMemo(() => [
        { label: 'Bedrooms', value: getDisplayValue(property?.bedrooms, '—') },
        { label: 'Bathrooms', value: getDisplayValue(property?.bathrooms, '—') },
        { label: 'Area Size', value: getDisplayValue(property?.size || property?.areaSize, '—') },
        { label: 'Parking', value: getDisplayValue(property?.parking, '—') },
        { label: 'Furnishing', value: getDisplayValue(property?.furnishing, '—') },
        { label: 'Tenure', value: getDisplayValue(property?.tenure, '—') },
    ], [property]);

    const galleryImages = useMemo(() => normalizePropertyImages(property), [property]);
    const thumbnails = useMemo(() => (galleryImages.length > 0 ? galleryImages.slice(0, 4) : [fallbackImage]), [galleryImages]);

    const handleStatusChange = async (nextStatus) => {
        if (!id || saving) return;
        try {
            setSaving(true);
            await updateAdminPropertyStatus(id, {
                status: nextStatus,
                isPublished: property?.isPublished ?? true,
            });
            setSelectedStatus(nextStatus);
            setProperty((current) => current ? { ...current, status: nextStatus } : current);
        } catch (err) {
            setError(err.message || 'Failed to update property status');
        } finally {
            setSaving(false);
        }
    };

    const handlePublishToggle = async (nextPublished) => {
        if (!id || saving) return;
        try {
            setSaving(true);
            await updateAdminPropertyStatus(id, {
                status: selectedStatus || property?.status || 'pending',
                isPublished: nextPublished,
            });
            setProperty((current) => current ? { ...current, isPublished: nextPublished, status: current?.status || 'pending' } : current);
        } catch (err) {
            setError(err.message || 'Failed to update publishing state');
        } finally {
            setSaving(false);
        }
    };

    const propertyStatus = property?.status || 'Pending';
    const propertyTitle = property?.title || property?.name || property?.propertyName || 'Property';
    const propertyLocation = property?.city || property?.location || property?.address?.city || 'Location not provided';
    const propertyPrice = property?.price || property?.rent || property?.monthlyRent || property?.pricePerMonth || '—';
    const ownerName = property?.owner?.name || property?.owner?.fullName || property?.ownerName || 'Owner not provided';
    const tenantName = property?.tenant?.name || property?.tenantName || property?.currentTenant?.name || 'No tenant assigned';

    return (
        <div className="flex-1 bg-[#F8F9FA] p-4 md:p-8 lg:p-10 min-h-screen overflow-x-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-200/60">
                <h1 className="text-xl font-bold tracking-tight text-zinc-800 ml-12 md:ml-0">Dashboard</h1>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                    <div className="w-full sm:w-64 relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search properties, tenants..."
                            className="w-full bg-gray-100/80 border-0 pl-9 pr-4 py-2 rounded-xl text-xs outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-3 justify-end">
                        <button className="p-2 hover:bg-gray-100 rounded-full text-zinc-400"><Bell size={18} /></button>
                        <div className="flex items-center gap-2">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" className="w-8 h-8 rounded-full object-cover" alt="Profile" />
                            <div className="text-left hidden sm:block">
                                <p className="text-xs font-bold text-zinc-800 leading-none">Usama</p>
                                <span className="text-[9px] text-zinc-400 font-medium">Property Owner</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Property Details</h2>
                    <p className="text-gray-400 text-sm mt-1">Review property information and manage moderation status. (ID: {id})</p>
                </div>
                <span className={`self-start sm:self-auto px-3 py-1 rounded-full text-[11px] font-bold tracking-wide ${property?.isPublished ? 'bg-emerald-50 text-emerald-600' : 'bg-zinc-100 text-zinc-600'}`}>
                    {property?.isPublished ? 'Published' : 'Unpublished'}
                </span>
            </div>

            {loading ? (
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center text-zinc-500">Loading property details…</div>
            ) : error ? (
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center text-rose-500">{error}</div>
            ) : !property ? (
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center text-zinc-500">No property data found.</div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                            <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-zinc-900">
                                <img src={galleryImages[0] || fallbackImage} className="w-full h-full object-cover" alt={propertyTitle} />
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                {thumbnails.slice(0, 4).map((src, idx) => (
                                    <div key={`${src}-${idx}`} className="h-20 sm:h-24 rounded-xl overflow-hidden bg-zinc-100">
                                        <img src={src} className="w-full h-full object-cover" alt="Thumbnail" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="text-sm font-bold text-zinc-900 mb-4">Description</h3>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                {getDisplayValue(property?.description, 'No description provided for this listing.')}
                            </p>
                            <div className="mt-6 flex flex-wrap gap-4 pt-4 border-t border-gray-50">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-amber-50 rounded-xl text-amber-700"><Shield size={14} /></div>
                                    <div>
                                        <p className="text-[10px] text-zinc-400 font-medium">Security</p>
                                        <p className="text-xs font-bold text-zinc-800">{getDisplayValue(property?.security, '24/7 CCTV')}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-amber-50 rounded-xl text-amber-700"><Zap size={14} /></div>
                                    <div>
                                        <p className="text-[10px] text-zinc-400 font-medium">Power Backup</p>
                                        <p className="text-xs font-bold text-zinc-800">{getDisplayValue(property?.powerBackup, 'Full Backup')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <span className="bg-amber-50 text-[#C58940] text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">⭐ Featured</span>
                            <h3 className="text-lg font-black text-zinc-900 mt-2">{propertyTitle}</h3>
                            <p className="text-[11px] text-zinc-400 mt-1">📍 {propertyLocation}</p>
                            <p className="text-xl font-black text-[#C58940] mt-4">{propertyPrice === '—' ? propertyPrice : `PKR ${propertyPrice}`} <span className="text-xs font-medium text-zinc-400">/ month</span></p>
                            <div className="grid grid-cols-2 gap-y-4 gap-x-2 my-6 pt-4 border-t border-gray-50">
                                {specItems.map((spec, idx) => (
                                    <div key={`${spec.label}-${idx}`} className="flex flex-col">
                                        <span className="text-[10px] font-medium text-zinc-400">{spec.label}</span>
                                        <span className="text-xs font-bold text-zinc-800 mt-0.5">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-zinc-400 mb-3 uppercase tracking-wider">Property Status</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => handleStatusChange('active')}
                                        disabled={saving}
                                        className={`p-2 text-xs font-semibold rounded-xl text-left pl-3 ${selectedStatus === 'active' || propertyStatus.toLowerCase() === 'active' ? 'text-emerald-600 bg-emerald-50 border border-emerald-200/50' : 'text-zinc-400 bg-gray-50/50'}`}
                                    >
                                        Active
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange('pending')}
                                        disabled={saving}
                                        className={`p-2 text-xs font-semibold rounded-xl text-left pl-3 ${selectedStatus === 'pending' ? 'text-amber-600 bg-amber-50 border border-amber-200/50' : 'text-zinc-400 bg-gray-50/50'}`}
                                    >
                                        Pending
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange('inactive')}
                                        disabled={saving}
                                        className={`p-2 text-xs font-semibold rounded-xl text-left pl-3 ${selectedStatus === 'inactive' ? 'text-zinc-700 bg-zinc-100 border border-zinc-200' : 'text-zinc-400 bg-gray-50/50'}`}
                                    >
                                        Inactive
                                    </button>
                                    <button
                                        onClick={() => handlePublishToggle(!(property?.isPublished ?? false))}
                                        disabled={saving}
                                        className={`p-2 text-xs font-semibold rounded-xl text-left pl-3 ${property?.isPublished ? 'text-emerald-600 bg-emerald-50 border border-emerald-200/50' : 'text-zinc-400 bg-gray-50/50'}`}
                                    >
                                        {property?.isPublished ? 'Published' : 'Unpublished'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm text-center flex flex-col items-center">
                            <div className="w-10 h-10 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-700 font-bold mb-3">🏢</div>
                            <span className="text-[9px] font-bold text-zinc-400 tracking-wider uppercase">Property Owner</span>
                            <h4 className="text-xs font-black text-zinc-900 mt-1">{ownerName}</h4>
                            <button className="w-full mt-4 bg-[#C58940] hover:bg-[#ad7432] text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors shadow-sm">View Owner</button>
                        </div>

                        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                            <div className="flex gap-4 items-center">
                                <div className="relative">
                                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop" className="w-12 h-12 rounded-xl object-cover" alt="Tenant avatar" />
                                    <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full border-2 border-white"><ShieldCheck size={10} /></span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <span className="text-[9px] text-zinc-400 font-bold tracking-tight">MOVE-IN DATE</span>
                                        <span className="text-[10px] font-bold text-zinc-800">{getDisplayValue(property?.moveInDate, '—')}</span>
                                    </div>
                                    <div className="flex justify-between items-start mt-1">
                                        <span className="text-[9px] text-zinc-400 font-bold tracking-tight">CONTRACT DURATION</span>
                                        <span className="text-[10px] font-bold text-zinc-800">{getDisplayValue(property?.contractDuration, '—')}</span>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-sm font-black text-zinc-900 mt-4">{tenantName}</h4>
                            <button className="w-full mt-3 border border-amber-600/30 text-[#C58940] bg-amber-50/10 hover:bg-amber-50/40 text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors">View Tenant</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
