import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdLocationOn, MdFavorite, MdFavoriteBorder, MdKingBed, MdBathtub, MdSquareFoot, MdDirectionsCar } from 'react-icons/md';
import { getPropertyById } from '../../utils/propertyService';
import { getPropertyDisplayId, getPropertyRouteId } from '../../utils/idHelpers';

const FAV_IDS_KEY = 'paband_fav_ids';
const FAV_MAP_KEY = 'paband_fav_map';

const TenantFavourites = () => {
    const [ids, setIds] = useState([]);
    const [map, setMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const rawIds = JSON.parse(localStorage.getItem(FAV_IDS_KEY) || '[]');
                const rawMap = JSON.parse(localStorage.getItem(FAV_MAP_KEY) || '{}');
                setIds(rawIds);
                setMap(rawMap);

                // Fetch missing property snapshots
                const missing = rawIds.filter(id => !rawMap[id]);
                if (missing.length) {
                    const fetched = { ...rawMap };
                    for (const id of missing) {
                        try {
                            const p = await getPropertyById(id);
                            fetched[id] = p;
                        } catch (e) {
                            console.warn('Failed to fetch favorite property', id, e);
                        }
                    }
                    setMap(fetched);
                    localStorage.setItem(FAV_MAP_KEY, JSON.stringify(fetched));
                }
            } catch (e) {
                console.error('Failed loading favourites', e);
                setError('Failed to load favourites');
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    const unfavorite = (id) => {
        try {
            const rawIds = JSON.parse(localStorage.getItem(FAV_IDS_KEY) || '[]');
            const rawMap = JSON.parse(localStorage.getItem(FAV_MAP_KEY) || '{}');
            const idx = rawIds.indexOf(id);
            if (idx !== -1) rawIds.splice(idx, 1);
            delete rawMap[id];
            localStorage.setItem(FAV_IDS_KEY, JSON.stringify(rawIds));
            localStorage.setItem(FAV_MAP_KEY, JSON.stringify(rawMap));
            setIds(rawIds);
            setMap(rawMap);
        } catch (e) {
            console.warn('Failed to unfavorite', e);
        }
    };

    if (loading) return <div className="p-6 text-center">Loading favourites…</div>;
    if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

    const properties = ids.map(id => map[id]).filter(Boolean);

    if (!properties.length) {
        return <div className="p-6 text-center text-gray-500">You have no favourite properties yet.</div>;
    }

    return (
        <div className="p-4 md:p-8 space-y-6 max-w-[1400px] mx-auto">
            <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#112338]">Favourite Properties</h2>
                <p className="text-gray-500 text-[13px] mt-1.5">Properties you marked as favourite.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map((property) => (
                    <div key={property.id || property._id} className="tenant-property-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100/60">
                        <div className="relative h-52 sm:h-56 overflow-hidden">
                            <img src={property.image || property.mainImage || property.imageUrl} alt={property.name} className="w-full h-full object-cover" />
                            <button onClick={() => unfavorite(property.id || property._id)} className="tenant-heart-btn absolute top-4 right-4 w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all hover:bg-black/60">
                                <MdFavorite size={16} className="text-white" />
                            </button>
                        </div>

                        <div className="p-5">
                            <h3 className="text-[16px] font-extrabold text-[#112338] mb-1">{property.name}</h3>
                            <div className="flex items-center gap-1 text-gray-500 text-[12px] mb-3">
                                <MdLocationOn size={14} className="text-gray-400" />
                                <span className="font-medium">{property.location}</span>
                            </div>
                            <div className="text-[11px] text-gray-400 mb-3">Property ID: {getPropertyDisplayId(property)}</div>

                            <div className="flex items-center gap-4 mb-4 flex-wrap">
                                <div className="flex items-center gap-1.5 text-[11px] text-gray-500"><MdKingBed size={15} className="text-gray-400" /><span className="font-semibold">{property.bedrooms || property.beds} Bedroom</span></div>
                                <div className="flex items-center gap-1.5 text-[11px] text-gray-500"><MdBathtub size={15} className="text-gray-400" /><span className="font-semibold">{property.bathrooms || property.baths} Bathrooms</span></div>
                                <div className="flex items-center gap-1.5 text-[11px] text-gray-500"><MdSquareFoot size={15} className="text-gray-400" /><span className="font-semibold">{property.sqft} sq ft</span></div>
                                <div className="flex items-center gap-1.5 text-[11px] text-gray-500"><MdDirectionsCar size={15} className="text-gray-400" /><span className="font-semibold">{property.garages} Garages</span></div>
                            </div>

                            <div className="h-px bg-gray-100 mb-4" />

                            <div className="flex items-center justify-between">
                                <p className="text-[16px] font-extrabold text-[#112338]">{property.price}</p>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => navigate(`/tenant/property/${getPropertyRouteId(property)}`, { state: { property } })} className="px-4 py-2 bg-[#B68B39] text-white text-[11px] font-bold rounded-lg hover:bg-[#a0762d] transition-all">View Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TenantFavourites;
