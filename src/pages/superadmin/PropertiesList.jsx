import React, { useEffect, useMemo, useState } from 'react';
import { Search, Eye, ChevronLeft, ChevronRight, Home, Heart, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAdminProperties } from '../../utils/adminService';

const fallbackImage = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=100&auto=format&fit=crop';

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

const getPropertyImage = (property) => normalizePropertyImages(property)[0] || fallbackImage;
const getPropertyId = (property) => property?.id || property?._id || property?.propertyId;
const getPropertyName = (property) => property?.title || property?.name || property?.propertyName || 'Unnamed Property';
const getPropertyOwner = (property) => property?.owner?.name || property?.owner?.fullName || property?.ownerName || property?.owner?.email || '—';
const getPropertyArea = (property) => property?.city || property?.location || property?.address?.city || property?.area || '—';
const getPropertyType = (property) => property?.propertyType || property?.type || property?.category || '—';
const getPropertyTenant = (property) => property?.tenant?.name || property?.tenantName || property?.currentTenant?.name || '—';
const getPropertyStatus = (property) => property?.status || (property?.isPublished ? 'Published' : 'Draft');
const getStatusClasses = (status = '') => {
    const normalized = `${status}`.toLowerCase();
    if (normalized.includes('active') || normalized.includes('published')) return 'bg-emerald-50 text-emerald-600';
    if (normalized.includes('pending') || normalized.includes('review')) return 'bg-amber-50 text-amber-600';
    if (normalized.includes('inactive') || normalized.includes('draft') || normalized.includes('unpublish')) return 'bg-zinc-100 text-zinc-600';
    return 'bg-blue-50 text-blue-600';
};

export default function PropertiesList() {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    useEffect(() => {
        const loadProperties = async () => {
            try {
                setLoading(true);
                const response = await getAdminProperties();
                const rows = response?.properties || response?.data || response || [];
                setProperties(Array.isArray(rows) ? rows : []);
            } catch (err) {
                setError(err.message || 'Failed to load properties');
            } finally {
                setLoading(false);
            }
        };

        loadProperties();
    }, []);

    const filteredProperties = useMemo(() => {
        return properties.filter((property) => {
            const term = searchTerm.toLowerCase();
            const matchesSearch = !term || [getPropertyName(property), getPropertyArea(property), getPropertyOwner(property)].join(' ').toLowerCase().includes(term);
            const matchesType = !selectedType || `${getPropertyType(property)}`.toLowerCase() === selectedType.toLowerCase();
            const matchesStatus = !selectedStatus || `${getPropertyStatus(property)}`.toLowerCase() === selectedStatus.toLowerCase();
            return matchesSearch && matchesType && matchesStatus;
        });
    }, [properties, searchTerm, selectedType, selectedStatus]);

    const propertyStats = useMemo(() => {
        const total = properties.length;
        const published = properties.filter((property) => `${getPropertyStatus(property)}`.toLowerCase().includes('active') || property?.isPublished).length;
        const pending = properties.filter((property) => `${getPropertyStatus(property)}`.toLowerCase().includes('pending') || `${getPropertyStatus(property)}`.toLowerCase().includes('review')).length;
        const featured = properties.filter((property) => property?.isFeatured || property?.featured).length;

        return [
            { title: 'Total Properties', value: total, tag: 'ACTIVE', tagBg: 'bg-emerald-50 text-emerald-600', iconBg: 'bg-amber-50/60 text-amber-700' },
            { title: 'Published', value: published, tag: 'VERIFIED', tagBg: 'bg-amber-50 text-amber-700', iconBg: 'bg-amber-50/60 text-amber-700' },
            { title: 'Pending Review', value: pending, tag: 'PENDING', tagBg: 'bg-rose-50 text-rose-500', iconBg: 'bg-amber-50/60 text-amber-700' },
            { title: 'Featured', value: featured, tag: 'SUCCESS', tagBg: 'bg-emerald-50 text-emerald-600', iconBg: 'bg-amber-50/60 text-amber-700' },
        ];
    }, [properties]);

    return (
        <div className="flex-1 bg-[#F8F9FA] p-4 md:p-8 lg:p-10 min-h-screen overflow-x-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-200/60">
                <h1 className="text-xl font-bold tracking-tight text-zinc-800 ml-12 md:ml-0">Dashboard</h1>
                <div className="flex items-center gap-4 self-end sm:self-auto">
                    <button className="p-2 hover:bg-gray-100 rounded-full text-zinc-400"><Heart size={18} /></button>
                    <button className="p-2 hover:bg-gray-100 rounded-full text-zinc-400 relative">
                        <Bell size={18} />
                        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                    </button>
                    <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200">
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" className="w-8 h-8 rounded-full object-cover" alt="user" />
                        <div className="text-left hidden sm:block">
                            <p className="text-xs font-bold text-zinc-800 leading-none">Ali</p>
                            <span className="text-[10px] text-zinc-400 font-medium">Tenant</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-8">
                <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Properties</h2>
                <p className="text-gray-400 text-sm mt-1">Manage all listings across the platform.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {propertyStats.map((card, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between min-h-[135px]">
                        <div className="flex justify-between items-start">
                            <div className={`p-2 rounded-xl ${card.iconBg}`}>
                                <Home size={16} />
                            </div>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider ${card.tagBg}`}>
                                {card.tag}
                            </span>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs font-medium text-zinc-400">{card.title}</p>
                            <p className="text-2xl font-bold text-zinc-800 mt-1 tracking-tight">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                <div className="w-full md:w-96 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Search by property name, city, or owner"
                        className="w-full bg-amber-50/10 border border-amber-100/30 pl-9 pr-4 py-2.5 rounded-xl text-xs outline-none"
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <select value={selectedType} onChange={(event) => setSelectedType(event.target.value)} className="flex-1 md:w-40 bg-amber-50/10 border border-amber-100/30 p-2.5 rounded-xl text-xs text-zinc-500 outline-none">
                        <option value="">Property Type</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Villa">Villa</option>
                        <option value="House">House</option>
                        <option value="Office">Office</option>
                    </select>
                    <select value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value)} className="flex-1 md:w-40 bg-amber-50/10 border border-amber-100/30 p-2.5 rounded-xl text-xs text-zinc-500 outline-none">
                        <option value="">Status</option>
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Draft">Draft</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-amber-50/10 text-zinc-400 text-[11px] font-bold tracking-wider border-b border-gray-100">
                                <th className="p-4 pl-6">Property</th>
                                <th className="p-4">Owner</th>
                                <th className="p-4">Area</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Tenant</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-xs font-medium text-zinc-600">
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="p-6 text-center text-zinc-500">Loading properties…</td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="7" className="p-6 text-center text-rose-500">{error}</td>
                                </tr>
                            ) : filteredProperties.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="p-6 text-center text-zinc-500">No properties found.</td>
                                </tr>
                            ) : filteredProperties.map((property, index) => {
                                const propertyId = getPropertyId(property);
                                const status = getPropertyStatus(property);
                                return (
                                    <tr key={propertyId || `${getPropertyName(property)}-${index}`} className="hover:bg-gray-50/30 transition-colors">
                                        <td className="p-4 pl-6 flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-zinc-200 overflow-hidden shrink-0">
                                                <img src={getPropertyImage(property)} className="w-full h-full object-cover" alt={getPropertyName(property)} />
                                            </div>
                                            <span className="font-bold text-zinc-900">{getPropertyName(property)}</span>
                                        </td>
                                        <td className="p-4 text-zinc-500">{getPropertyOwner(property)}</td>
                                        <td className="p-4 text-zinc-400">{getPropertyArea(property)}</td>
                                        <td className="p-4 text-zinc-400">{getPropertyType(property)}</td>
                                        <td className="p-4 text-zinc-500">{getPropertyTenant(property)}</td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide ${getStatusClasses(status)}`}>
                                                {status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button onClick={() => navigate(`/superadmin/properties/${propertyId}`)} className="p-2 bg-amber-50/60 hover:bg-amber-100/80 rounded-xl text-amber-700 transition-colors inline-flex items-center justify-center">
                                                <Eye size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
                <p className="text-xs font-medium text-zinc-400">Showing {filteredProperties.length} result{filteredProperties.length === 1 ? '' : 's'}</p>
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
