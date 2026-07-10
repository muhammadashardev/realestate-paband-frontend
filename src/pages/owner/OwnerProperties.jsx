import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdSearch, MdVisibility, MdEdit, MdDelete, MdChevronLeft, MdChevronRight, MdAdd
} from 'react-icons/md';
import { getOwnerProperties, deleteProperty } from '../../utils/propertyService';
import { useAuth } from '../../hooks/useAuth';

const OwnerProperties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Properties');
  const [filteredProperties, setFilteredProperties] = useState([]);

  // Active Search/Filter Trigger (only filter on click Search or filter change)
  const [activeSearch, setActiveSearch] = useState('');
  const [activeStatus, setActiveStatus] = useState('All Properties');

  // Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);

  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);

  // Load properties for the authenticated owner and clear stale state on token change
  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    const fetchProperties = async () => {
      setProperties([]);
      setFilteredProperties([]);
      setLoading(true);

      try {
        const list = await getOwnerProperties({}, { signal: controller.signal });
        if (!isActive) return;
        setProperties(list || []);
        setFilteredProperties(list || []);
      } catch (error) {
        if (error.name === 'AbortError') {
          return;
        }
        console.error('Failed to load owner properties:', error);
        if (!isActive) return;
        setProperties([]);
        setFilteredProperties([]);
      } finally {
        if (!isActive) return;
        setLoading(false);
      }
    };

    if (token) {
      fetchProperties();
    } else {
      setProperties([]);
      setFilteredProperties([]);
      setLoading(false);
    }

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [token]);

  // Filter logic
  useEffect(() => {
    let result = properties;

    if (activeSearch.trim()) {
      const q = activeSearch.toLowerCase();
      result = result.filter(
        p =>
          (p.title?.toLowerCase().includes(q)) ||
          (p.location?.toLowerCase().includes(q)) ||
          (p.propertyType?.toLowerCase().includes(q))
      );
    }

    if (activeStatus !== 'All Properties') {
      result = result.filter(p => p.status === activeStatus);
    }

    setFilteredProperties(result);
  }, [properties, activeSearch, activeStatus]);

  const handleSearch = (e) => {
    e.preventDefault();
    setActiveSearch(searchQuery);
    setActiveStatus(statusFilter);
  };

  const openDeleteModal = (property) => {
    setPropertyToDelete(property);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setPropertyToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (propertyToDelete) {
      try {
        await deleteProperty(propertyToDelete.id || propertyToDelete._id);
        // Remove from local state
        setProperties(properties.filter(p => (p.id || p._id) !== (propertyToDelete.id || propertyToDelete._id)));
        closeDeleteModal();
      } catch (error) {
        console.error('Failed to delete property:', error);
        alert('Failed to delete property. Please try again.');
      }
    }
  };

  // Helper to format currency
  const formatCurrency = (amount) => {
    return `PKR ${parseInt(amount).toLocaleString()}`;
  };

  // Helper to get status pill styles
  const getStatusStyles = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-[#EBFDF5] text-[#10B981] border border-[#A7F3D0]/60';
      case 'Occupied':
        return 'bg-[#EBF5FF] text-[#3B82F6] border border-[#BFDBFE]/60';
      case 'Pending Approval':
        return 'bg-[#FFF3EB] text-[#F97316] border border-[#FED7AA]/60';
      default:
        return 'bg-gray-100 text-gray-500 border border-gray-200';
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1600px] mx-auto bg-[#F8F9FC] min-h-screen relative">

      {/* Header section with page info & "+ Add New Property" */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[28px] font-extrabold text-[#112338] leading-tight tracking-tight">
            My Properties
          </h2>
          <p className="text-gray-500 text-[13px] md:text-[14.5px] mt-1 font-medium">
            Manage, monitor, and update all your rental properties from one centralized dashboard.
          </p>
        </div>
        <button
          onClick={() => navigate('/owner/properties/add')}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#B68B39] text-white text-[13.5px] font-bold shadow-lg shadow-[#B68B39]/20 hover:bg-[#a0762d] active:scale-[0.98] transition-all shrink-0"
        >
          <MdAdd size={18} /> Add New Property
        </button>
      </div>

      {/* Filter and Search Bar */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-white p-4 rounded-xl border border-gray-100/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
        <div className="relative md:col-span-7">
          <input
            type="text"
            placeholder="Search by property title, city, or location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-200 rounded-lg text-[13.5px] text-gray-800 placeholder-gray-400 pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#B68B39] transition-all"
          />
          <MdSearch className="absolute left-3.5 top-3.5 text-gray-400" size={17} />
        </div>
        <div className="relative md:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full border border-gray-200 rounded-lg text-[13.5px] text-gray-700 bg-white px-3 py-2.5 focus:outline-none focus:border-[#B68B39] appearance-none cursor-pointer"
          >
            <option>All Properties</option>
            <option>Active</option>
            <option>Occupied</option>
            <option>Pending Approval</option>
          </select>
          <div className="absolute right-3.5 top-3.5 pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <button
          type="submit"
          className="md:col-span-2 py-2.5 rounded-lg bg-[#B68B39] text-white text-[13.5px] font-bold hover:bg-[#a0762d] active:scale-[0.98] transition-all text-center"
        >
          Search
        </button>
      </form>

      {/* Properties Table Card */}
      <div className="bg-white rounded-xl border border-gray-100/60 shadow-[0_4px_20px_rgba(0,0,0,0.015)] overflow-hidden">
        <div className="p-5 border-b border-gray-100/80">
          <h3 className="text-[17px] font-extrabold text-[#112338]">All Properties</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                <th className="px-6 py-4">Property Title</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Rent Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Added Date</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100/80">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                    Loading your properties...
                  </td>
                </tr>
              ) : filteredProperties.length > 0 ? (
                filteredProperties.map((p) => (
                  <tr key={p._id || p.id} className="hover:bg-gray-50/40 transition-colors group">
                    <td className="px-6 py-4 font-bold text-[#112338] text-[13.5px]">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image || 'https://via.placeholder.com/50?text=No+Image'}
                          alt={p.title}
                          className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-100"
                        />
                        <span className="font-semibold text-gray-800 hover:text-[#B68B39] cursor-pointer transition-colors" onClick={() => navigate(`/owner/properties/${p.propertyId || p._id || p.id}`)}>
                          {p.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13.5px] text-gray-500 font-medium">{p.propertyType || p.type || 'N/A'}</td>
                    <td className="px-6 py-4 text-[13.5px] text-gray-500 font-medium">{p.location}</td>
                    <td className="px-6 py-4 text-[13.5px] text-[#112338] font-bold">{p.price ? formatCurrency(p.price) : 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[11.5px] font-bold px-2.5 py-0.5 rounded-full ${getStatusStyles(p.status)}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[13.5px] text-gray-500 font-medium">{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'N/A'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* View action button */}
                        <button
                          onClick={() => navigate(`/owner/properties/${p.propertyId || p._id || p.id}`)}
                          title="View Details"
                          className="w-8 h-8 rounded-lg bg-[#B68B39]/10 text-[#B68B39] flex items-center justify-center hover:bg-[#B68B39]/20 transition-all"
                        >
                          <MdVisibility size={16} />
                        </button>
                        {/* Edit action button */}
                        <button
                          onClick={() => navigate(`/owner/properties/edit/${p.propertyId || p._id || p.id}`)}
                          title="Edit Property"
                          className="w-8 h-8 rounded-lg bg-[#B68B39]/10 text-[#B68B39] flex items-center justify-center hover:bg-[#B68B39]/20 transition-all"
                        >
                          <MdEdit size={16} />
                        </button>
                        {/* Delete action button */}
                        <button
                          onClick={() => openDeleteModal(p)}
                          title="Delete Property"
                          className="w-8 h-8 rounded-lg bg-[#FFF5F5] text-[#EF4444] flex items-center justify-center hover:bg-[#FEE2E2] transition-all"
                        >
                          <MdDelete size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-gray-400 text-sm">
                    No properties found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Custom Pagination Footer */}
        <div className="p-5 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
          <div className="text-[13.5px] text-gray-500 font-medium">
            Showing 1-{filteredProperties.length} of {filteredProperties.length}
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg border border-gray-200 text-gray-400 flex items-center justify-center hover:bg-gray-50 hover:text-gray-600 transition-all disabled:opacity-40" disabled>
              <MdChevronLeft size={18} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-[#003B30] text-white text-[13px] font-bold flex items-center justify-center shadow-md">
              1
            </button>
            <button className="w-8 h-8 rounded-lg border border-gray-200 text-gray-500 text-[13px] font-semibold flex items-center justify-center hover:bg-gray-50 hover:text-gray-700 transition-all">
              2
            </button>
            <button className="w-8 h-8 rounded-lg border border-gray-200 text-gray-500 text-[13px] font-semibold flex items-center justify-center hover:bg-gray-50 hover:text-gray-700 transition-all">
              3
            </button>
            <span className="text-gray-400 px-1 text-[13px] font-semibold">...</span>
            <button className="w-8 h-8 rounded-lg border border-gray-200 text-gray-500 text-[13px] font-semibold flex items-center justify-center hover:bg-gray-50 hover:text-gray-700 transition-all">
              50
            </button>
            <button className="w-8 h-8 rounded-lg border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-50 hover:text-gray-700 transition-all">
              <MdChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Property Modal (Overlay) */}
      {deleteModalOpen && propertyToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-[2px] transition-all duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl border border-gray-50/80 animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center space-y-4">

              {/* Red Trash Bin Icon Container */}
              <div className="w-14 h-14 rounded-full bg-[#FFF5F5] flex items-center justify-center text-[#EF4444] border border-[#FEE2E2]">
                <MdDelete size={28} />
              </div>

              {/* Title and Subtitle */}
              <h3 className="text-xl font-bold text-[#112338]">Delete Property</h3>
              <p className="text-gray-500 text-[13.5px] leading-relaxed">
                Are you sure you want to remove <span className="font-semibold text-gray-700">"{propertyToDelete.title}"</span> from your account?
              </p>

              {/* Action Buttons */}
              <div className="w-full pt-4 space-y-2">
                <button
                  onClick={handleDeleteConfirm}
                  className="w-full py-3 rounded-xl bg-[#B68B39] text-white text-[13.5px] font-bold shadow-lg shadow-[#B68B39]/20 hover:bg-[#a0762d] active:scale-[0.98] transition-all"
                >
                  Yes, Delete Property
                </button>
                <button
                  onClick={closeDeleteModal}
                  className="w-full py-3 rounded-xl border border-gray-200 text-gray-500 text-[13.5px] font-bold hover:bg-gray-50 active:scale-[0.98] transition-all"
                >
                  Cancel
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default OwnerProperties;
