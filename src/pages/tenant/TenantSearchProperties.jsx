import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MdSearch, MdFavoriteBorder, MdFavorite, MdLocationOn,
  MdKingBed, MdBathtub, MdSquareFoot, MdDirectionsCar,
  MdFilterList
} from 'react-icons/md';
import { getProperties, getPropertyById } from '../../utils/propertyService';
import { getPropertyRouteId } from '../../utils/idHelpers';


/* ─── Property Data ─── */
const propertiesData = [
  {
    id: 1,
    name: 'Luxury Family Home',
    location: 'DHA Defence Housing Authority',
    bedrooms: 6,
    bathrooms: 3,
    sqft: 720,
    garages: 1,
    price: 'Rs 150,000',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    isFav: false,
  },
  {
    id: 2,
    name: 'Equestrian Family Home',
    location: 'Gulshan-e-Johar',
    bedrooms: 6,
    bathrooms: 3,
    sqft: 720,
    garages: 1,
    price: 'Rs 150,000',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    isFav: false,
  },
  {
    id: 3,
    name: 'Luxury Family Home',
    location: 'DHA Defence Housing Authority',
    bedrooms: 6,
    bathrooms: 3,
    sqft: 720,
    garages: 1,
    price: 'Rs 150,000',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    isFav: false,
  },
  {
    id: 4,
    name: 'Equestrian Family Home',
    location: 'Gulshan-e-Johar',
    bedrooms: 6,
    bathrooms: 3,
    sqft: 720,
    garages: 1,
    price: 'Rs 150,000',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    isFav: false,
  },
];

const TenantSearchProperties = () => {
  const [favorites, setFavorites] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState(propertiesData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Filters
  const [typeFilter, setTypeFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [bedroomFilter, setBedroomFilter] = useState('');
  const [furnishingFilter, setFurnishingFilter] = useState('');
  const navigate = useNavigate();

  // LocalStorage keys
  const FAV_IDS_KEY = 'paband_fav_ids';
  const FAV_MAP_KEY = 'paband_fav_map';

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAV_IDS_KEY);
      const ids = raw ? JSON.parse(raw) : [];
      const favObj = {};
      ids.forEach(id => { favObj[id] = true; });
      setFavorites(favObj);
    } catch (e) {
      console.warn('Failed to load favorites from storage', e);
    }
  }, []);

  const saveFavoriteData = (ids, map) => {
    try {
      localStorage.setItem(FAV_IDS_KEY, JSON.stringify(ids));
      localStorage.setItem(FAV_MAP_KEY, JSON.stringify(map || {}));
    } catch (e) {
      console.warn('Failed to save favorites to storage', e);
    }
  };

  const toggleFav = (id, propObj) => {
    setFavorites(prev => {
      const next = { ...prev };
      const rawIds = JSON.parse(localStorage.getItem(FAV_IDS_KEY) || '[]');
      const rawMap = JSON.parse(localStorage.getItem(FAV_MAP_KEY) || '{}');

      if (next[id]) {
        // unfavorite
        delete next[id];
        const idx = rawIds.indexOf(id);
        if (idx !== -1) rawIds.splice(idx, 1);
        delete rawMap[id];
      } else {
        // favorite
        next[id] = true;
        if (!rawIds.includes(id)) rawIds.push(id);
        // store a lightweight snapshot of the property for quick display
        rawMap[id] = propObj || rawMap[id] || { id };
      }

      saveFavoriteData(rawIds, rawMap);
      return next;
    });
  };

  const fetchProperties = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const fetched = await getProperties(filters);
      setProperties(fetched && fetched.length ? fetched : []);
      console.log('Fetched properties:', fetched);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError(err.message || 'Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Derive dynamic options from current properties and active filters
  const getUnique = (arr) => Array.from(new Set(arr.filter(Boolean)));

  const allTypes = getUnique(properties.map(p => p.propertyType || p.type || p.propertyTypeName));
  const filteredByType = typeFilter ? properties.filter(p => (p.propertyType || p.type || p.propertyTypeName) === typeFilter) : properties;
  const allCities = getUnique(filteredByType.map(p => p.city || p.location || p.address || p.town));

  // Bedrooms: normalize numeric values while keeping option values unique
  const bedroomValues = Array.from(
    new Map(
      getUnique(properties.map(p => p.bedrooms || p.beds || p.noOfBeds))
        .filter(Boolean)
        .map(v => {
          const n = Number(v);
          if (!n) return null;
          const normalizedValue = n >= 4 ? '4+' : `${n}`;
          const label = n >= 4 ? '4+ Bed' : `${n} Bed`;
          return [normalizedValue, { value: normalizedValue, label }];
        })
        .filter(Boolean)
    ).values()
  );

  const priceValues = getUnique(properties.map(p => p.price || p.rent || p.priceLabel || p.price_range));
  const furnishingValues = getUnique(properties.map(p => p.furnishing || p.furnish || p.furnishingStatus));

  const applyFilters = () => {
    const filters = {};
    if (typeFilter) filters.propertyType = typeFilter;
    if (cityFilter) filters.city = cityFilter;
    if (priceFilter) filters.priceRange = priceFilter;
    if (bedroomFilter) {
      // send numeric beds where possible
      const m = bedroomFilter.match(/(\d+)/);
      filters.beds = m ? m[1] : bedroomFilter;
    }
    if (furnishingFilter) filters.furnishing = furnishingFilter;
    if (searchQuery) filters.q = searchQuery;
    fetchProperties(filters);
  };

  const handleViewDetails = async (id) => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const prop = await getPropertyById(id);
      console.log('Fetched property details:', prop);
      navigate(`/tenant/property/${getPropertyRouteId(prop)}`, { state: { property: prop } });
    } catch (err) {
      console.error('Error fetching property:', err);
      setError(err.message || 'Failed to fetch property');
    } finally {
      setLoading(false);
    }
  };

  // Debounced auto-search: run when searchQuery or any filter changes
  useEffect(() => {
    const handler = setTimeout(() => {
      applyFilters();
    }, 350);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, typeFilter, cityFilter, priceFilter, bedroomFilter, furnishingFilter]);

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1400px] mx-auto">

      {/* ───────── Header ───────── */}
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#112338] leading-tight tracking-tight">
          Search Properties
        </h2>
        <p className="text-gray-500 text-[13px] md:text-[14px] mt-1.5 font-medium">
          Browse verified rental properties managed through the Paband platform.
        </p>
      </div>

      {/* ───────── Search Bar ───────── */}
      <div className="relative">
        <div className="flex items-center bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 pl-4">
            <MdSearch size={22} className="text-[#B68B39]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') fetchProperties({ q: searchQuery }); }}
            placeholder="Search by city, area, or property name"
            className="flex-1 px-3 py-3.5 text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
          />
        </div>
      </div>

      {/* ───────── Filter Row ───────── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          {/* Filter Labels */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 flex-1">
            {/* Property Type */}
            <div>
              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">PROPERTY TYPE</label>
              <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setCityFilter(''); }} className="tenant-filter-select w-full border border-gray-200 rounded-lg px-3 py-2 text-[12px] font-semibold text-[#112338] bg-white focus:outline-none focus:border-[#B68B39] transition-colors">
                <option value="">Any</option>
                {allTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">CITY</label>
              <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} className="tenant-filter-select w-full border border-gray-200 rounded-lg px-3 py-2 text-[12px] font-semibold text-[#112338] bg-white focus:outline-none focus:border-[#B68B39] transition-colors">
                <option value="">Any</option>
                {allCities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">PRICE RANGE</label>
              <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} className="tenant-filter-select w-full border border-gray-200 rounded-lg px-3 py-2 text-[12px] font-semibold text-[#112338] bg-white focus:outline-none focus:border-[#B68B39] transition-colors">
                <option value="">Any</option>
                {priceValues.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">BEDROOMS</label>
              <select value={bedroomFilter} onChange={(e) => setBedroomFilter(e.target.value)} className="tenant-filter-select w-full border border-gray-200 rounded-lg px-3 py-2 text-[12px] font-semibold text-[#112338] bg-white focus:outline-none focus:border-[#B68B39] transition-colors">
                <option value="">Any</option>
                {bedroomValues.map((b) => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
            </div>

            {/* Furnishing */}
            <div>
              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">FURNISHING</label>
              <select value={furnishingFilter} onChange={(e) => setFurnishingFilter(e.target.value)} className="tenant-filter-select w-full border border-gray-200 rounded-lg px-3 py-2 text-[12px] font-semibold text-[#112338] bg-white focus:outline-none focus:border-[#B68B39] transition-colors">
                <option value="">Any</option>
                {furnishingValues.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Apply Filters Button */}
          <button onClick={applyFilters} className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#B68B39] text-white text-[12px] font-bold rounded-lg hover:bg-[#a0762d] active:scale-[0.98] transition-all shadow-md shadow-[#B68B39]/20 shrink-0 self-end lg:self-center">
            <MdFilterList size={16} />
            Apply Filters
          </button>
        </div>
      </div>

      {/* ───────── Property Cards Grid ───────── */}
      {loading && (
        <div className="text-center py-6">Loading properties…</div>
      )}
      {error && (
        <div className="text-center py-4 text-red-600">{error}</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(properties || []).map((property) => (
          <div
            key={property.id}
            className="tenant-property-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100/60"
          >
            {/* Property Image */}
            <div className="relative h-52 sm:h-56 overflow-hidden">
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              {/* Favorite Button */}
              <button
                onClick={() => toggleFav(property.id, property)}
                className="tenant-heart-btn absolute top-4 right-4 w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all hover:bg-black/60"
              >
                {favorites[property.id] ? (
                  <MdFavorite size={16} className="text-white" />
                ) : (
                  <MdFavoriteBorder size={16} className="text-white" />
                )}
              </button>
            </div>

            {/* Property Info */}
            <div className="p-5">
              <h3 className="text-[16px] font-extrabold text-[#112338] mb-1">{property.name}</h3>
              <div className="flex items-center gap-1 text-gray-500 text-[12px] mb-3">
                <MdLocationOn size={14} className="text-gray-400" />
                <span className="font-medium">{property.location}</span>
              </div>

              {/* Specs Row */}
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <MdKingBed size={15} className="text-gray-400" />
                  <span className="font-semibold">{property.bedrooms} Bedroom</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <MdBathtub size={15} className="text-gray-400" />
                  <span className="font-semibold">{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <MdSquareFoot size={15} className="text-gray-400" />
                  <span className="font-semibold">{property.sqft} sq ft</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <MdDirectionsCar size={15} className="text-gray-400" />
                  <span className="font-semibold">{property.garages} Garages</span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100 mb-4" />

              {/* Price & Actions */}
              <div className="flex items-center justify-between">
                <p className="text-[16px] font-extrabold text-[#112338]">{property.price}</p>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 border border-gray-200 text-[11px] font-bold text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
                    Visit Request
                  </button>
                  <button
                    onClick={() => handleViewDetails(property.id)}
                    className="px-4 py-2 bg-[#B68B39] text-white text-[11px] font-bold rounded-lg hover:bg-[#a0762d] transition-all"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenantSearchProperties;
