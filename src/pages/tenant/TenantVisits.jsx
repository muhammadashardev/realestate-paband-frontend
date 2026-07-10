import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTopBar } from '../../context/TopBarContext';
import { getMyVisitRequests, cancelVisitRequest, rescheduleVisit } from '../../utils/visitService';
import { getVisitDisplayId, getVisitBackendId } from '../../utils/idHelpers';
import {
  MdSearch,
  MdOutlineRemoveRedEye,
  MdClose,
  MdSchedule,
  MdCheckCircle,
  MdHourglassEmpty,
  MdAssignmentTurnedIn,
  MdCancel
} from 'react-icons/md';

const TenantVisits = () => {
  const { setTopBar } = useTopBar();
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [searchQuery, setSearchQuery] = useState('');
  const [cancellingId, setCancellingId] = useState(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleBackendId, setRescheduleBackendId] = useState(null);
  const [rescheduleData, setRescheduleData] = useState({ date: '', time: '', reason: '' });
  const [rescheduling, setRescheduling] = useState(false);

  useEffect(() => {
    // Clear top bar title as per design (title is on the page)
    setTopBar({ title: '' });
  }, [setTopBar]);

  const fetchVisits = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getMyVisitRequests();
      const fetchedVisits = response?.visitRequests || response?.visits || response?.data || response || [];
      setVisits(Array.isArray(fetchedVisits) ? fetchedVisits : []);
    } catch (err) {
      setError(err.message || 'Failed to load your visits.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisits();
  }, []);

  const formatDate = (value) => {
    if (!value) return 'N/A';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusStyles = (status) => {
    const normalized = (status || '').toLowerCase();
    switch (normalized) {
      case 'approved': return 'bg-[#E6F4EA] text-[#1E8E3E]';
      case 'pending': return 'bg-[#FEF7E6] text-[#B88A44]';
      case 'rejected': return 'bg-[#FCE8E8] text-[#D93025]';
      case 'rescheduled': return 'bg-[#E8F0FE] text-[#1A73E8]';
      case 'completed': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const enrichVisit = (visit) => {
    const backendId = getVisitBackendId(visit) || 'unknown';
    const displayId = getVisitDisplayId(visit);
    const propertyName = visit?.property?.title || visit?.property?.name || visit?.propertyTitle || visit?.propertyName || 'Property';
    const image = visit?.property?.image || visit?.property?.thumbnail || visit?.property?.photos?.[0] || visit?.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=150&h=150&q=80';
    const visitDate = formatDate(visit?.preferredVisitDate || visit?.visitDate || visit?.scheduledDate);
    const timeSlot = visit?.preferredTimeSlot || visit?.timeSlot || visit?.scheduledTime || 'TBD';
    const status = visit?.status || visit?.requestStatus || 'Unknown';
    const requestedOn = formatDate(visit?.createdAt || visit?.requestedOn || visit?.submittedAt);

    const actions = ['view'];
    const normalizedStatus = (status || '').toLowerCase();
    // Tenant can cancel or reschedule when visit is pending/approved/scheduled/rescheduled
    if (['pending', 'approved', 'scheduled', 'rescheduled'].includes(normalizedStatus)) {
      actions.push('cancel');
      actions.push('reschedule');
    }

    return { ...visit, id: displayId, backendId, propertyName, image, visitDate, timeSlot, status, requestedOn, actions };
  };

  const allVisits = visits.map(enrichVisit);

  useEffect(() => {
    const visitMap = allVisits.reduce((map, visit) => {
      if (visit.id && visit.backendId) {
        map[visit.id] = visit.backendId;
      }
      return map;
    }, {});
    localStorage.setItem('paband_visit_id_map', JSON.stringify(visitMap));
  }, [allVisits]);

  const filteredVisits = allVisits.filter((visit) => {
    const matchesStatus = statusFilter === 'All Statuses' || (visit.status || '').toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch = searchQuery.trim() === '' || [visit.id, visit.propertyName, visit.property?.location]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const summaryCards = [
    { title: 'Scheduled Visits', count: allVisits.filter((visit) => ['pending', 'approved', 'scheduled', 'rescheduled'].includes((visit.status || '').toLowerCase())).length.toString().padStart(2, '0'), icon: MdCheckCircle },
    { title: 'Pending Approvals', count: allVisits.filter((visit) => (visit.status || '').toLowerCase() === 'pending').length.toString().padStart(2, '0'), icon: MdHourglassEmpty },
    { title: 'Visits Completed', count: allVisits.filter((visit) => (visit.status || '').toLowerCase() === 'completed').length.toString().padStart(2, '0'), icon: MdAssignmentTurnedIn },
    { title: 'Rejected Request', count: allVisits.filter((visit) => (visit.status || '').toLowerCase() === 'rejected').length.toString().padStart(2, '0'), icon: MdCancel },
  ];

  const handleCancelVisit = async (visitId) => {
    if (!visitId) return;
    setCancellingId(visitId);
    try {
      await cancelVisitRequest(visitId);
      await fetchVisits();
    } catch (err) {
      setError(err.message || 'Unable to cancel visit request.');
    } finally {
      setCancellingId(null);
    }
  };

  const openRescheduleModal = (backendId, visit) => {
    setRescheduleBackendId(backendId);
    setRescheduleData({
      date: visit?.preferredVisitDate || visit?.visitDate || '',
      time: visit?.preferredTimeSlot || visit?.timeSlot || '',
      reason: ''
    });
    setShowRescheduleModal(true);
  };

  const handleConfirmReschedule = async (e) => {
    e.preventDefault();
    if (!rescheduleBackendId) return;
    setRescheduling(true);
    try {
      await rescheduleVisit(rescheduleBackendId, {
        rescheduledVisitDate: rescheduleData.date,
        rescheduledTimeSlot: rescheduleData.time,
        tenantResponseMessage: rescheduleData.reason || 'Tenant requested reschedule.'
      });
      setShowRescheduleModal(false);
      setRescheduleBackendId(null);
      setRescheduleData({ date: '', time: '', reason: '' });
      await fetchVisits();
    } catch (err) {
      setError(err.message || 'Failed to reschedule visit.');
    } finally {
      setRescheduling(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in pb-16">

      {/* Header */}
      <div>
        <h1 className="text-[32px] font-bold text-[#112338] tracking-tight">My Property Visits</h1>
        <p className="text-gray-500 mt-2 text-[15px]">Track all your scheduled, pending, approved, and completed property visits from one place.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-[20px] p-6 flex flex-col items-center justify-center text-center shadow-sm border border-gray-100/50">
            <div className="w-12 h-12 bg-[#B68B39] rounded-full flex items-center justify-center text-white mb-4">
              <card.icon size={24} />
            </div>
            <h3 className="text-3xl font-extrabold text-[#112338]">{card.count}</h3>
            <p className="text-gray-500 text-sm mt-1">{card.title}</p>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-[20px] shadow-sm border border-gray-100/50">
        <div className="relative flex-1">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by property name, city, or visit ID"
            className="w-full bg-[#F8F9FA] rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#B68B39] transition-all"
          />
        </div>
        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#F8F9FA] rounded-xl px-5 py-3 text-sm font-medium text-[#112338] outline-none appearance-none min-w-[140px] cursor-pointer"
          >
            <option>All Statuses</option>
            <option>Approved</option>
            <option>Pending</option>
            <option>Rejected</option>
            <option>Completed</option>
            <option>Rescheduled</option>
          </select>
          <select
            className="bg-[#F8F9FA] rounded-xl px-5 py-3 text-sm font-medium text-[#112338] outline-none appearance-none min-w-[130px] cursor-pointer"
          >
            <option>Latest First</option>
            <option>Oldest First</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[20px] shadow-sm border border-gray-100/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[13px] text-[#112338] font-extrabold">
                <th className="py-5 px-6 font-extrabold">Visit ID</th>
                <th className="py-5 px-6 font-extrabold">Property</th>
                <th className="py-5 px-6 font-extrabold">Visit Date</th>
                <th className="py-5 px-6 font-extrabold">Time Slot</th>
                <th className="py-5 px-6 font-extrabold">Status</th>
                <th className="py-5 px-6 font-extrabold">Requested On</th>
                <th className="py-5 px-6 font-extrabold">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500">Loading visits...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-red-600">{error}</td>
                </tr>
              ) : filteredVisits.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500">No visits found.</td>
                </tr>
              ) : (
                filteredVisits.map((visit, idx) => (
                  <tr key={visit.id || idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-[#B68B39]">{visit.id}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img src={visit.image} alt={visit.propertyName} className="w-10 h-10 rounded-lg object-cover" />
                        <span className="font-semibold text-[#112338]">{visit.propertyName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-500">{visit.visitDate}</td>
                    <td className="py-4 px-6 text-gray-500">{visit.timeSlot}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${getStatusStyles(visit.status)}`}>
                        {visit.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-400 text-[13px]">{visit.requestedOn}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Link to={`/tenant/visits/${visit.id}`} className="p-2 bg-[#F8F9FA] rounded-lg text-[#B68B39] hover:bg-[#F0E6D2] transition-colors">
                          <MdOutlineRemoveRedEye size={18} />
                        </Link>
                        {visit.actions.includes('cancel') && (
                          <button
                            onClick={() => handleCancelVisit(visit.backendId)}
                            disabled={cancellingId === visit.id}
                            className="p-2 bg-[#FCE8E8] rounded-lg text-[#D93025] hover:bg-[#FAD1D1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <MdClose size={18} />
                          </button>
                        )}
                        {visit.actions.includes('reschedule') && (
                          <button onClick={() => openRescheduleModal(visit.backendId, visit)} className="p-2 bg-[#F8F9FA] rounded-lg text-[#B68B39] hover:bg-[#F0E6D2] transition-colors">
                            <MdSchedule size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-extrabold text-[#112338] mb-2">Reschedule Visit</h3>
            <p className="text-sm text-gray-500 mb-4">Choose a new date and time for your visit. The owner will be notified.</p>
            <form onSubmit={handleConfirmReschedule} className="space-y-4">
              <div>
                <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block mb-1">New Date</label>
                <input type="date" value={rescheduleData.date} onChange={(e) => setRescheduleData({ ...rescheduleData, date: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200" required />
              </div>
              <div>
                <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block mb-1">New Time</label>
                <input type="time" value={rescheduleData.time} onChange={(e) => setRescheduleData({ ...rescheduleData, time: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200" required />
              </div>
              <div>
                <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Reason (optional)</label>
                <textarea rows="3" value={rescheduleData.reason} onChange={(e) => setRescheduleData({ ...rescheduleData, reason: e.target.value })} className="w-full p-3 rounded-xl border border-gray-200" placeholder="Reason for rescheduling (optional)" />
              </div>
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setShowRescheduleModal(false)} className="px-4 py-2 rounded-xl border border-gray-200">Cancel</button>
                <button type="submit" disabled={rescheduling} className="px-4 py-2 rounded-xl bg-[#B68B39] text-white font-bold">{rescheduling ? 'Rescheduling...' : 'Confirm'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantVisits;
