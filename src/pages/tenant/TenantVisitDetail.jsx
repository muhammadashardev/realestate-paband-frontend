import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTopBar } from '../../context/TopBarContext';
import { cancelVisitRequest, getMyVisitRequestById, rescheduleVisit } from '../../utils/visitService';
import { getVisitDisplayId } from '../../utils/idHelpers';
import {
  MdArrowBack,
  MdLocationOn,
  MdCalendarToday,
  MdSchedule,
  MdPhone,
  MdEmail,
  MdCall,
  MdClose,
  MdOutlineRemoveCircleOutline,
  MdOutlineAssignment,
  MdCheckCircle
} from 'react-icons/md';
import { FaBed, FaBath, FaVectorSquare } from 'react-icons/fa';

const TenantVisitDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setTopBar } = useTopBar();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState(null);
  const [visit, setVisit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleData, setRescheduleData] = useState({ date: '', time: '', reason: '' });
  const [rescheduling, setRescheduling] = useState(false);

  useEffect(() => {
    setTopBar({ title: '' });
  }, [setTopBar]);

  useEffect(() => {
    const fetchVisit = async () => {
      setLoading(true);
      setError(null);
      try {
        const visitMap = JSON.parse(localStorage.getItem('paband_visit_id_map') || '{}');
        const backendId = visitMap[id] || id;
        const response = await getMyVisitRequestById(backendId);
        const visitData = response?.visitRequest || response?.data || response;
        if (!visitData) {
          throw new Error('Visit not found');
        }
        setVisit({
          ...visitData,
          backendId,
          id: getVisitDisplayId(visitData),
        });
      } catch (err) {
        setError(err.message || 'Failed to load visit details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVisit();
    }
  }, [id]);

  // Expose fetchVisit for reloading after reschedule
  // (The function above is recreated on each effect run; create a helper wrapper)
  const reloadVisit = async () => {
    try {
      const visitMap = JSON.parse(localStorage.getItem('paband_visit_id_map') || '{}');
      const backendId = visitMap[id] || id;
      const response = await getMyVisitRequestById(backendId);
      const visitData = response?.visitRequest || response?.data || response;
      if (visitData) {
        setVisit({ ...visitData, backendId, id: getVisitDisplayId(visitData) });
      }
    } catch (err) {
      // ignore
    }
  };

  const openRescheduleFromDetail = () => {
    if (!visit) return;
    setRescheduleData({
      date: visit?.preferredVisitDate || visit?.visitDate || '',
      time: visit?.preferredTimeSlot || visit?.timeSlot || '',
      reason: ''
    });
    setShowRescheduleModal(true);
  };

  const handleConfirmRescheduleSubmit = async (e) => {
    e.preventDefault();
    if (!visit?.backendId) return;
    setRescheduling(true);
    try {
      await rescheduleVisit(visit.backendId, {
        rescheduledVisitDate: rescheduleData.date,
        rescheduledTimeSlot: rescheduleData.time,
        tenantResponseMessage: rescheduleData.reason || 'Tenant requested reschedule.'
      });
      setShowRescheduleModal(false);
      await reloadVisit();
    } catch (err) {
      setError(err.message || 'Failed to reschedule visit.');
    } finally {
      setRescheduling(false);
    }
  };

  const visitLabel = getVisitDisplayId(visit || { id });

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto animate-fade-in pb-16">
        <div className="bg-white rounded-[20px] p-8 shadow-sm border border-gray-100/50 text-center text-gray-600">
          Loading visit details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-7xl mx-auto animate-fade-in pb-16">
        <div className="bg-white rounded-[20px] p-8 shadow-sm border border-red-100/50 text-center text-red-700">
          {error}
        </div>
      </div>
    );
  }

  const propertyName = visit?.property?.title || visit?.property?.name || visit?.propertyTitle || 'Skyline Luxury Apartment';
  const propertyLocation = visit?.property?.location || visit?.property?.address || 'DHA Phase 6, Karachi';
  const imageUrl = visit?.property?.image || visit?.property?.thumbnail || visit?.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80';
  const description = visit?.property?.description || visit?.description || 'Experience elevated living in this premium 3-bedroom luxury apartment. Featuring floor-to-ceiling windows, high-end finishing, and state-of-the-art amenities including a rooftop pool and private gym access.';
  const beds = visit?.property?.bedrooms || visit?.bedrooms || 3;
  const baths = visit?.property?.bathrooms || visit?.bathrooms || 2;
  const area = visit?.property?.area || visit?.area || '2,400';
  const statusLabel = visit?.status || visit?.requestStatus || 'Approved';
  const visitDate = visit?.preferredVisitDate || visit?.visitDate || '18 Jan 2026';
  const visitTime = visit?.preferredTimeSlot || visit?.timeSlot || '04:00 PM — 05:00 PM';
  const requestedOn = visit?.createdAt || visit?.requestedOn || '15 Jan 2026';
  const requestId = visit?.requestId || getVisitDisplayId(visit) || '9821034-BA';
  const owner = visit?.owner || visit?.property?.owner || {};
  const ownerName = owner?.fullName || owner?.name || 'Ahmed Siddiqui';
  const ownerEmail = owner?.email || 'a.siddiqui@paband.com';
  const ownerPhone = owner?.phoneNumber || owner?.phone || '+92 321 445 6789';
  const ownerImage = owner?.profilePicture || owner?.avatar || owner?.photo || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80';
  const normalizedStatus = (visit?.status || visit?.requestStatus || '').toLowerCase();

  return (
    <div className="p-8 max-w-7xl mx-auto animate-fade-in pb-16">

      {/* Header Area */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/tenant/visits')}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 border border-gray-100/50 shadow-sm transition-all"
        >
          <MdArrowBack size={20} />
        </button>
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-[28px] font-bold text-[#112338]">Visit Details – {visitLabel}</h1>
          </div>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="px-3 py-1 bg-[#E6F4EA] text-[#1E8E3E] rounded-full text-[12px] font-bold">{statusLabel}</span>
            <span className="text-gray-500 text-[13px]">Request ID: {requestId}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">

          {/* Property Info Card */}
          <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100/50 flex flex-col md:flex-row gap-6">
            <img
              src={imageUrl}
              alt={propertyName}
              className="w-full md:w-[280px] h-[200px] object-cover rounded-xl"
            />
            <div className="flex-1 flex flex-col">
              <h2 className="text-2xl font-bold text-[#112338]">{propertyName}</h2>
              <div className="flex items-center gap-1.5 text-gray-500 mt-1 mb-4">
                <MdLocationOn size={18} className="text-[#B68B39]" />
                <span className="text-[14px]">{propertyLocation}</span>
              </div>
              <p className="text-gray-500 text-[13.5px] leading-relaxed flex-1">
                {description}
              </p>

              <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-[#112338] font-bold text-sm">
                  <span className="w-8 h-8 rounded-lg bg-[#F8F9FA] flex items-center justify-center text-[#B68B39]"><FaBed /></span>
                  {beds} Beds
                </div>
                <div className="flex items-center gap-2 text-[#112338] font-bold text-sm">
                  <span className="w-8 h-8 rounded-lg bg-[#F8F9FA] flex items-center justify-center text-[#B68B39]"><FaBath /></span>
                  {baths} Baths
                </div>
                <div className="flex items-center gap-2 text-[#112338] font-bold text-sm">
                  <span className="w-8 h-8 rounded-lg bg-[#F8F9FA] flex items-center justify-center text-[#B68B39]"><FaVectorSquare /></span>
                  {area} sqft
                </div>
              </div>
            </div>
          </div>

          {/* Visit Progress Timeline */}
          <div className="bg-white rounded-[20px] p-8 shadow-sm border border-gray-100/50">
            <h3 className="text-lg font-bold text-[#112338] mb-8">Visit Progress</h3>

            <div className="relative flex justify-between items-start max-w-2xl mx-auto px-4">
              {/* Lines */}
              <div className="absolute top-6 left-12 right-12 h-0.5 bg-gray-100 -z-10"></div>
              <div className="absolute top-6 left-12 w-1/2 h-0.5 bg-[#B68B39] -z-10"></div>

              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#B68B39] text-white flex items-center justify-center mb-3">
                  <MdOutlineAssignment size={20} />
                </div>
                <span className="text-[#112338] font-bold text-[14px]">Requested</span>
                <span className="text-gray-400 text-[12px] mt-1 text-center">15 Jan 2026, 10:30 AM</span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#B68B39] text-white flex items-center justify-center mb-3">
                  <MdSchedule size={20} />
                </div>
                <span className="text-[#112338] font-bold text-[14px]">Reviewing</span>
                <span className="text-gray-400 text-[12px] mt-1 text-center">15 Jan 2026, 02:45 PM</span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#F8F9FA] border-2 border-[#B68B39] text-[#B68B39] flex items-center justify-center mb-3">
                  <MdCheckCircle size={20} />
                </div>
                <span className="text-[#112338] font-bold text-[14px]">Approved</span>
                <span className="text-gray-400 text-[12px] mt-1 text-center">16 Jan 2026, 11:15 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">

          {/* Schedule Details Card */}
          <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100/50">
            <h3 className="text-[16px] font-bold text-[#112338] mb-6">Schedule Details</h3>

            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F8F9FA] flex items-center justify-center text-[#B68B39] shrink-0">
                  <MdCalendarToday size={18} />
                </div>
                <div>
                  <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-0.5">Visit Date</p>
                  <p className="text-[#112338] font-bold text-[14px]">{visitDate}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F8F9FA] flex items-center justify-center text-[#B68B39] shrink-0">
                  <MdSchedule size={18} />
                </div>
                <div>
                  <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-0.5">Time Slot</p>
                  <p className="text-[#112338] font-bold text-[14px]">{visitTime}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100 flex justify-between items-center text-[13px]">
              <span className="text-gray-500">Requested On</span>
              <span className="font-bold text-[#112338]">{requestedOn}</span>
            </div>
          </div>

          {/* Property Management */}
          <div className="bg-[#112338] rounded-[20px] p-6 text-white shadow-lg relative overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#B68B39]/20 blur-3xl rounded-full pointer-events-none"></div>

            <h3 className="text-[16px] font-bold mb-6">Property Management</h3>

            <div className="flex gap-4 mb-6 relative z-10">
              <img
                src={ownerImage}
                alt={ownerName}
                className="w-12 h-12 rounded-full object-cover border-2 border-white/10"
              />
              <div>
                <h4 className="font-bold text-white text-[15px]">{ownerName}</h4>
                <p className="text-gray-400 text-[12px]">Property Manager</p>
              </div>
            </div>

            <div className="space-y-3 mb-6 relative z-10">
              <div className="flex items-center gap-3 text-[13px] text-gray-300">
                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[#B68B39]">
                  <MdPhone size={12} />
                </div>
                {ownerPhone}
              </div>
              <div className="flex items-center gap-3 text-[13px] text-gray-300">
                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[#B68B39]">
                  <MdEmail size={12} />
                </div>
                {ownerEmail}
              </div>
            </div>

            <button className="w-full bg-white text-[#112338] py-3 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors relative z-10">
              <MdCall size={18} />
              Call Manager
            </button>
          </div>

          <div className="flex justify-center mt-6">
            <div className="flex gap-3">
              {['pending', 'approved', 'scheduled', 'rescheduled'].includes(normalizedStatus) && (
                <button
                  onClick={() => setShowRescheduleModal(true)}
                  className="text-[#B68B39] text-[14px] font-bold flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <MdSchedule size={18} />
                  Reschedule Visit
                </button>
              )}

              <button
                onClick={() => setIsCancelModalOpen(true)}
                className="text-[#D93025] text-[14px] font-bold flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <MdOutlineRemoveCircleOutline size={18} />
                Cancel Visit Request
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Cancel Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#F8F9FA] w-full max-w-lg rounded-[24px] overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setIsCancelModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2"
            >
              <MdClose size={24} />
            </button>

            <div className="p-8 pb-10 flex flex-col items-center">

              <div className="w-16 h-16 bg-[#FCE8E8] text-[#D93025] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <MdOutlineRemoveCircleOutline size={32} />
              </div>

              <h2 className="text-[24px] font-bold text-[#112338] mb-3">Cancel Property Visit?</h2>
              <p className="text-gray-500 text-[14px] text-center mb-6 leading-relaxed max-w-sm">
                Are you sure you want to cancel this scheduled property visit? Once cancelled, your visit slot may no longer be available and you may need to request a new schedule again.
              </p>

              {/* Property Snapshot */}
              <div className="w-full bg-white rounded-[16px] p-4 border border-gray-100 shadow-sm flex items-center gap-4 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=150&q=80"
                  alt="Skyline"
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-[#112338] text-[15px]">Skyline Luxury Apartment</h4>
                    <span className="px-2 py-0.5 bg-[#E6F4EA] text-[#1E8E3E] rounded-md text-[10px] font-extrabold uppercase tracking-wide">Approved</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-[12px]">
                    <MdLocationOn size={14} className="text-[#B68B39]" /> DHA Phase 6, Karachi
                  </div>
                  <div className="flex gap-4 mt-2 pt-2 border-t border-gray-50 text-[12px]">
                    <div className="flex items-center gap-1.5 text-[#112338] font-semibold">
                      <MdCalendarToday className="text-[#B68B39]" /> 18 Jan 2026
                    </div>
                    <div className="flex items-center gap-1.5 text-[#112338] font-semibold">
                      <MdSchedule className="text-[#B68B39]" /> 04:00 PM - 05:00 PM
                    </div>
                  </div>
                </div>
              </div>

              {/* Reason Textarea */}
              <div className="w-full mb-6 text-left">
                <label className="block text-[12px] font-bold text-[#112338] mb-2">
                  Reason for Cancellation <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  placeholder="Unavailable on selected timing."
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#B68B39] focus:ring-1 focus:ring-[#B68B39] resize-none h-20"
                ></textarea>
              </div>

              {/* Consequences */}
              <div className="w-full bg-white rounded-[16px] p-5 border border-gray-100 shadow-sm text-left mb-8">
                <h4 className="text-[11px] font-extrabold text-[#112338] uppercase tracking-wider mb-3">Cancelling this visit will:</h4>
                <ul className="space-y-2.5">
                  <li className="flex items-center gap-2.5 text-[13px] text-gray-600">
                    <span className="w-4 h-4 rounded-full bg-[#FCE8E8] text-[#D93025] flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 bg-[#D93025] rounded-full"></div>
                    </span>
                    Remove your scheduled slot
                  </li>
                  <li className="flex items-center gap-2.5 text-[13px] text-gray-600">
                    <span className="w-4 h-4 rounded-full bg-[#FCE8E8] text-[#D93025] flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 bg-[#D93025] rounded-full"></div>
                    </span>
                    Notify the management team
                  </li>
                  <li className="flex items-center gap-2.5 text-[13px] text-gray-600">
                    <span className="w-4 h-4 rounded-full bg-[#FCE8E8] text-[#D93025] flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 bg-[#D93025] rounded-full"></div>
                    </span>
                    Update your visit status immediately
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="w-full space-y-3">
                {cancelError && (
                  <div className="w-full mb-4 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
                    {cancelError}
                  </div>
                )}
                <button
                  onClick={async () => {
                    setCancelError(null);
                    setCancelling(true);
                    try {
                      await cancelVisitRequest(visit?.backendId || visit?._id || id);
                      setIsCancelModalOpen(false);
                      navigate('/tenant/visits');
                    } catch (err) {
                      setCancelError(err.message || 'Unable to cancel visit request.');
                    } finally {
                      setCancelling(false);
                    }
                  }}
                  disabled={cancelling}
                  className="w-full bg-[#E50000] text-white py-3.5 rounded-xl font-bold text-[15px] hover:bg-[#CC0000] transition-colors shadow-[0_8px_16px_-6px_rgba(229,0,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cancelling ? 'Cancelling…' : 'Yes, Cancel Visit'}
                </button>
                <button
                  onClick={() => setIsCancelModalOpen(false)}
                  className="w-full bg-white text-[#112338] border border-gray-200 py-3.5 rounded-xl font-bold text-[15px] hover:bg-gray-50 transition-colors"
                >
                  Keep My Visit
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-[24px] overflow-hidden shadow-2xl relative p-6">
            <button onClick={() => setShowRescheduleModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2">
              <MdClose size={22} />
            </button>
            <h2 className="text-2xl font-extrabold text-[#112338] mb-2">Reschedule Visit</h2>
            <p className="text-gray-500 mb-4">Select a new date and time for your visit. The owner will be notified.</p>
            <form onSubmit={handleConfirmRescheduleSubmit} className="space-y-4">
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
                <button type="submit" disabled={rescheduling} className="px-4 py-2 rounded-xl bg-[#B68B39] text-white font-bold">{rescheduling ? 'Rescheduling...' : 'Confirm Reschedule'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default TenantVisitDetail;
