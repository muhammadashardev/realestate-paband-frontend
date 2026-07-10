import React, { useState, useEffect } from 'react';
import {
  MdCalendarToday, MdMoreHoriz, MdSearch, MdPhone, MdVisibility,
  MdAccessTime, MdHome, MdBuild, MdCheckCircle, MdWarning, MdShare,
  MdStar, MdArrowBack, MdKeyboardArrowDown, MdFileDownload, MdInfo,
  MdSupportAgent, MdCheck, MdChat, MdMap, MdPictureAsPdf, MdCircleNotifications
} from 'react-icons/md';
import { useTopBar } from '../../context/TopBarContext';
import { getOwnerVisits, getOwnerVisitRequest, updateOwnerVisitStatus } from '../../utils/visitService';

/* ─── Premium Images & Mockups ─── */
const PROPERTY_IMAGE = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"; // Premium Apartment Building
const TENANT_AVATAR = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80"; // Professional Headshot (Ali Raza)
const USAMA_AVATAR = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"; // Usama
const SAMRA_AVATAR = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"; // Samra

// Gallery Photos for Inspection Report
const GALLERY_PHOTOS = [
  { url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80", label: "PROPERTY EXTERIOR" },
  { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=80", label: "LIVING AREA" },
  { url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=400&q=80", label: "BEDROOM" },
  { url: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=400&q=80", label: "PARKING AREA" },
];

export default function OwnerVisits() {
  const { setTopBar, resetTopBar } = useTopBar();

  // Screen state navigation:
  // 1: Manage Schedule (Dashboard)
  // 2: All Upcoming Visits (Table List)
  // 3: Visit Details
  // 4: Reschedule Visit Form
  // 5: Property Inspection Report
  const [currentScreen, setCurrentScreen] = useState(1);
  const [selectedVisitId, setSelectedVisitId] = useState(null);

  // API Data states
  const [visitRequests, setVisitRequests] = useState([]);
  const [currentVisitDetail, setCurrentVisitDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusActionLoading, setStatusActionLoading] = useState(false);
  const [statusActionError, setStatusActionError] = useState('');
  const [statusUpdateSuccess, setStatusUpdateSuccess] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 1
  });

  // App dynamic states
  const [showRescheduleSuccess, setShowRescheduleSuccess] = useState(false);
  const [rescheduleData, setRescheduleData] = useState({
    date: '20 Jan 2026',
    time: '05:30 PM',
    reason: ''
  });

  // Table search & filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Visits');

  // Inspection report status
  const [reportStatus, setReportStatus] = useState('Excellent Condition');

  // Helper function to switch screen & reset transient state
  const goToScreen = (screenNumber) => {
    setCurrentScreen(screenNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fetch all visits data
  const fetchVisits = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
      };
      if (statusFilter !== 'All Visits') {
        params.status = statusFilter.toLowerCase();
      }
      const response = await getOwnerVisits(params);
      if (response?.visitRequests) {
        setVisitRequests(response.visitRequests);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      }
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch visits');
      console.error('Error fetching visits:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch visit details
  const fetchVisitDetails = async (visitId) => {
    setLoading(true);
    try {
      const response = await getOwnerVisitRequest(visitId);
      if (response?.visitRequest) {
        setCurrentVisitDetail(response.visitRequest);
      }
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch visit details');
      console.error('Error fetching visit details:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch visits on component mount and when filters change
  useEffect(() => {
    fetchVisits();
  }, [pagination.page, statusFilter]);

  // Fetch visit details when visiting detail screen with a selected visit
  useEffect(() => {
    if (currentScreen === 3 && selectedVisitId) {
      fetchVisitDetails(selectedVisitId);
    }
  }, [currentScreen, selectedVisitId]);

  const getNormalizedStatus = (status) => (status || '').toLowerCase();

  const handleOwnerStatusUpdate = async (nextStatus, extraData = {}) => {
    const visitId = selectedVisitId || currentVisitDetail?._id;
    if (!visitId) {
      setStatusActionError('Please select a visit first.');
      return false;
    }

    setStatusActionLoading(true);
    setStatusActionError('');
    setStatusUpdateSuccess('');

    try {
      await updateOwnerVisitStatus(visitId, {
        status: nextStatus,
        ownerResponseMessage: extraData.ownerResponseMessage || statusMessage || '',
        rescheduledVisitDate: extraData.rescheduledVisitDate || null,
        rescheduledTimeSlot: extraData.rescheduledTimeSlot || null,
      });

      await fetchVisitDetails(visitId);
      await fetchVisits();
      setStatusUpdateSuccess(`Visit ${nextStatus} successfully.`);
      setStatusMessage('');
      return true;
    } catch (err) {
      setStatusActionError(err.message || 'Failed to update visit status');
      return false;
    } finally {
      setStatusActionLoading(false);
    }
  };

  const handleConfirmReschedule = async (e) => {
    e.preventDefault();
    const success = await handleOwnerStatusUpdate('rescheduled', {
      ownerResponseMessage: rescheduleData.reason || 'Visit rescheduled by owner.',
      rescheduledVisitDate: rescheduleData.date,
      rescheduledTimeSlot: rescheduleData.time,
    });

    if (success) {
      setShowRescheduleSuccess(true);
      goToScreen(3);
    }
  };

  // Helper function to get status badge styling
  const getStatusStyle = (status) => {
    const normalizedStatus = getNormalizedStatus(status);
    const styles = {
      pending: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100', label: 'Pending' },
      approved: { bg: 'bg-[#EBFDF5]', text: 'text-[#10B981]', border: 'border-[#A7F3D0]/60', label: 'Approved' },
      scheduled: { bg: 'bg-[#EBFDF5]', text: 'text-[#10B981]', border: 'border-[#A7F3D0]/60', label: 'Scheduled' },
      completed: { bg: 'bg-[#EBF5FF]', text: 'text-blue-600', border: 'border-blue-100', label: 'Completed' },
      rescheduled: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100', label: 'Rescheduled' },
      rejected: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100', label: 'Rejected' },
      cancelled: { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200', label: 'Cancelled' },
    };
    return styles[normalizedStatus] || styles.pending;
  };

  // Update TopBar title and profile picture dynamically depending on screen views to match Figma 100%
  useEffect(() => {
    let title = "Property Visits & Inspections";
    let profileName = "Usama";
    let profileAvatar = USAMA_AVATAR;

    if (currentScreen === 3 || currentScreen === 4) {
      title = "Dashboard";
      profileName = "Samra";
      profileAvatar = SAMRA_AVATAR;
    } else if (currentScreen === 5) {
      title = "My Properties";
      profileName = "Samra";
      profileAvatar = SAMRA_AVATAR;
    }

    setTopBar({
      title,
      profileName,
      profileAvatar
    });

    return () => resetTopBar();
  }, [currentScreen, setTopBar, resetTopBar]);

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1600px] mx-auto bg-[#F8F9FC] min-h-screen relative font-sans text-gray-800">

    

      {/* Screen Back Action (only rendered on sub-pages where context navigation needs helper buttons) */}
      {currentScreen > 1 && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => goToScreen(currentScreen === 4 ? 3 : 1)}
            className="flex items-center gap-2 text-gray-500 hover:text-[#B68B39] text-[13px] font-bold transition-all"
          >
            <MdArrowBack size={18} /> Back to Schedule
          </button>
        </div>
      )}


      {/* =========================================================================
          SCREEN 1: MANAGE SCHEDULE (DASHBOARD) - Image 1
          ========================================================================= */}
      {currentScreen === 1 && (
        <div className="space-y-6 transition-all duration-300 animate-[fadeIn_0.4s_ease-out]">

          {/* Dashboard Header Banner */}
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#112338] leading-tight tracking-tight flex items-center gap-2">
              Manage Schedule <span className="animate-[bounce_2s_infinite]">👋</span>
            </h2>
            <p className="text-gray-500 text-[13px] md:text-[14px] mt-1 font-medium max-w-2xl leading-relaxed">
              Manage property visit schedules, inspection updates, and tenant visit requests from one place.
            </p>
          </div>

          {/* Cards Row (4 Metric Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* Card 1: Upcoming Visits */}
            <div className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.015)] border border-gray-100/80 relative hover:shadow-md transition-shadow">
              <MdMoreHoriz className="absolute top-4 right-4 text-gray-300 cursor-pointer hover:text-gray-600" size={20} />
              <span className="text-[10.5px] text-gray-400 font-bold uppercase tracking-wider">Upcoming Visits</span>
              <p className="text-[22px] md:text-[24px] font-extrabold text-[#112338] leading-tight mt-2.5">
                {visitRequests.filter(v => ['pending', 'approved', 'scheduled'].includes(getNormalizedStatus(v.status))).length.toString().padStart(2, '0')} Scheduled Visits
              </p>
              <p className="text-[11.5px] text-gray-400 mt-2 font-medium leading-relaxed">
                Upcoming property meetings and inspections.
              </p>
            </div>

            {/* Card 2: Inspection Reports (Interactive Link to Screen 5) */}
            <div
              onClick={() => goToScreen(5)}
              className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.015)] border border-gray-100/80 relative hover:shadow-md transition-all cursor-pointer group"
            >
              <MdMoreHoriz className="absolute top-4 right-4 text-gray-300 group-hover:text-gray-600" size={20} />
              <span className="text-[10.5px] text-gray-400 font-bold uppercase tracking-wider">Inspection Reports</span>
              <p className="text-[22px] md:text-[24px] font-extrabold text-[#112338] leading-tight mt-2.5 group-hover:text-[#B68B39] transition-colors">
                {visitRequests.filter(v => v.status === 'completed').length.toString().padStart(2, '0')} Reports Available
              </p>
              <p className="text-[11.5px] text-gray-400 mt-2 font-medium leading-relaxed mb-2">
                Recent inspection reports and updates.
              </p>
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 bg-emerald-50 text-[#10B981] border border-emerald-100 rounded tracking-wide uppercase inline-block">
                {new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
              </span>
            </div>

            {/* Card 3: Visit Requests */}
            <div className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.015)] border border-gray-100/80 relative hover:shadow-md transition-shadow">
              <MdMoreHoriz className="absolute top-4 right-4 text-gray-300 cursor-pointer hover:text-gray-600" size={20} />
              <span className="text-[10.5px] text-gray-400 font-bold uppercase tracking-wider">Visit Requests</span>
              <p className="text-[22px] md:text-[24px] font-extrabold text-[#D97706] leading-tight mt-2.5">
                {visitRequests.length.toString().padStart(2, '0')} Requests
              </p>
              <p className="text-[11.5px] text-gray-400 mt-2 font-medium leading-relaxed">
                Pending tenant visit requests.
              </p>
            </div>

            {/* Card 4: Rescheduled Visits */}
            <div className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.015)] border border-gray-100/80 relative hover:shadow-md transition-shadow">
              <MdMoreHoriz className="absolute top-4 right-4 text-gray-300 cursor-pointer hover:text-gray-600" size={20} />
              <span className="text-[10.5px] text-gray-400 font-bold uppercase tracking-wider">Rescheduled Visits</span>
              <p className="text-[22px] md:text-[24px] font-extrabold text-[#EF4444] leading-tight mt-2.5">
                {visitRequests.filter(v => getNormalizedStatus(v.status) === 'rescheduled').length.toString().padStart(2, '0')} Rescheduled
              </p>
              <p className="text-[11.5px] text-gray-400 mt-2 font-medium leading-relaxed">
                Updated meeting schedules.
              </p>
            </div>

          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Column 1 & 2: Upcoming Visit Details */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.015)] border border-gray-100/80 flex flex-col justify-between">

              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[17px] font-extrabold text-[#112338]">Upcoming Visit Details</h3>
                  <button
                    onClick={() => goToScreen(2)}
                    className="text-[#B68B39] text-[12.5px] font-extrabold hover:underline active:scale-95 transition-all"
                  >
                    View All Visits
                  </button>
                </div>

                <div className="space-y-4">

                  {loading && currentScreen === 1 ? (
                    <div className="text-center py-6">
                      <p className="text-gray-500 text-[13px]">Loading visits...</p>
                    </div>
                  ) : visitRequests.length > 0 ? (
                    visitRequests.slice(0, 3).map((visit) => {
                      const statusStyle = getStatusStyle(visit.status);
                      const visitDate = new Date(visit.preferredVisitDate);
                      const dateStr = visitDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

                      return (
                        <div key={visit._id} className="flex items-center justify-between gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all duration-200 group">
                          <div className="flex items-center gap-4">
                            {/* Left Icon */}
                            <div className="w-11 h-11 rounded-full bg-blue-50/80 flex items-center justify-center text-blue-500 shrink-0">
                              <MdHome size={22} />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-[13.5px] font-extrabold text-[#112338]">
                                {visit.property?.title || 'Property Visit'} {visit.property?.propertyId && `(${visit.property.propertyId})`}
                              </h4>
                              <p className="text-[11.5px] text-gray-400 mt-0.5 font-medium truncate">
                                {visit.property?.location || 'Location'} • {dateStr} - {visit.preferredTimeSlot}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            {/* Status tag */}
                            <span className={`text-[9.5px] font-bold px-2.5 py-1 rounded ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border} uppercase tracking-wider select-none`}>
                              {statusStyle.label}
                            </span>
                            {/* Eye Action button */}
                            <button
                              onClick={() => {
                                setSelectedVisitId(visit._id);
                                goToScreen(3);
                              }}
                              className="w-8 h-8 rounded-lg border border-gray-200/80 flex items-center justify-center text-gray-400 hover:text-[#B68B39] hover:bg-white hover:border-[#B68B39] shadow-sm transition-all"
                              title="View Details"
                            >
                              <MdVisibility size={16} />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500 text-[13px]">No visits found</p>
                    </div>
                  )}

                </div>
              </div>

            </div>

            {/* Column 3: Recent Updates */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.015)] border border-gray-100/80">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[17px] font-extrabold text-[#112338]">Recent Updates</h3>
                <MdMoreHoriz className="text-gray-300 hover:text-gray-600 cursor-pointer" size={20} />
              </div>

              <div className="space-y-4">

                {/* Update 1 */}
                <div className="flex items-start gap-3.5 p-1 rounded-lg hover:bg-gray-50/50 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#EBF5FF] text-blue-500 flex items-center justify-center shrink-0">
                    <MdChat size={18} />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-[12.5px] font-extrabold text-[#112338] leading-tight">
                      New visit request
                    </h5>
                    <p className="text-[11.5px] text-gray-500 mt-0.5 leading-snug font-medium">
                      Ali Khan wants to view Villa 12.
                    </p>
                    <p className="text-[9.5px] text-gray-400 font-semibold mt-1 flex items-center gap-1">
                      <MdAccessTime size={11} /> 10 mins ago
                    </p>
                  </div>
                </div>

                {/* Update 2 */}
                <div className="flex items-start gap-3.5 p-1 rounded-lg hover:bg-gray-50/50 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                    <MdCalendarToday size={18} />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-[12.5px] font-extrabold text-[#112338] leading-tight">
                      Visit Rescheduled
                    </h5>
                    <p className="text-[11.5px] text-gray-500 mt-0.5 leading-snug font-medium">
                      Inspection for Apt 4B moved to Friday.
                    </p>
                    <p className="text-[9.5px] text-gray-400 font-semibold mt-1 flex items-center gap-1">
                      <MdAccessTime size={11} /> 3 hours ago
                    </p>
                  </div>
                </div>

                {/* Update 3 */}
                <div className="flex items-start gap-3.5 p-1 rounded-lg hover:bg-gray-50/50 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#10B981] flex items-center justify-center shrink-0">
                    <MdCheckCircle size={18} />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-[12.5px] font-extrabold text-[#112338] leading-tight">
                      Report Completed
                    </h5>
                    <p className="text-[11.5px] text-gray-500 mt-0.5 leading-snug font-medium">
                      Quarterly report for House 7 is ready.
                    </p>
                    <p className="text-[9.5px] text-gray-400 font-semibold mt-1 flex items-center gap-1">
                      <MdAccessTime size={11} /> Yesterday
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Bottom Row: Statistics Visit Trends Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.015)] border border-gray-100/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Statistics</p>
                <h3 className="text-[17px] font-extrabold text-[#112338] mt-0.5">Visit Trends</h3>
              </div>
              <div className="flex items-center gap-4 text-[10.5px] font-bold text-gray-500 shrink-0">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" /> Inspections
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]" /> Viewings
                </span>
              </div>
            </div>

            {/* Custom SVG Bezier Line Chart */}
            <div className="w-full relative mt-2 pt-2 overflow-x-auto">
              <svg viewBox="0 0 1000 320" className="w-full min-w-[700px] h-auto" style={{ maxHeight: '300px' }}>
                {/* Horizontal Grid lines */}
                {[40, 110, 180, 250].map((y, i) => (
                  <line key={i} x1="60" y1={y} x2="960" y2={y} stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                ))}

                {/* Y Axis labels */}
                {[
                  { y: 44, t: '500k' },
                  { y: 114, t: '100k' },
                  { y: 184, t: '50k' },
                  { y: 254, t: '0' }
                ].map((lbl, i) => (
                  <text key={i} x="20" y={lbl.y} fontSize="11" fill="#94A3B8" className="font-extrabold" fontFamily="Outfit, sans-serif">{lbl.t}</text>
                ))}

                {/* X Axis labels */}
                {[
                  { x: 100, t: 'Week 1' },
                  { x: 380, t: 'Week 2' },
                  { x: 660, t: 'Week 3' },
                  { x: 940, t: 'Week 4' }
                ].map((lbl, i) => (
                  <text key={i} x={lbl.x} y="295" textAnchor="middle" fontSize="11" fill="#94A3B8" className="font-extrabold" fontFamily="Outfit, sans-serif">{lbl.t}</text>
                ))}

                {/* Purple Curve (Inspections) */}
                <path
                  d="M100,200 C150,150 180,165 240,165 C300,165 330,230 360,250 C390,270 410,180 460,170 C510,160 540,260 600,278 C660,296 700,210 750,195 C800,180 840,240 890,260 C940,280 960,180 980,170"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Pink Curve (Viewings) */}
                <path
                  d="M100,210 C150,190 200,200 250,210 C300,220 330,170 360,180 C390,190 410,250 460,235 C510,220 540,180 600,175 C660,170 700,250 750,230 C800,210 830,160 890,175 C940,190 960,150 980,160"
                  fill="none"
                  stroke="#F43F5E"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

        </div>
      )}


      {/* =========================================================================
          SCREEN 2: ALL UPCOMING VISITS (TABLE) - Image 2
          ========================================================================= */}
      {currentScreen === 2 && (
        <div className="space-y-6 transition-all duration-300 animate-[fadeIn_0.4s_ease-out]">

          {/* Top Row Metric Mini-Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* Card 1 */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#EBF5FF] text-blue-500 flex items-center justify-center shrink-0">
                <MdCalendarToday size={20} />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Today's Visits</span>
                <p className="text-[20px] font-extrabold text-[#112338] mt-0.5">03</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#EBFDF5] text-emerald-500 flex items-center justify-center shrink-0">
                <MdCheckCircle size={20} />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Completed</span>
                <p className="text-[20px] font-extrabold text-[#112338] mt-0.5">12</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                <MdAccessTime size={20} />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Pending</span>
                <p className="text-[20px] font-extrabold text-[#112338] mt-0.5">05</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Reports Due</span>
                <p className="text-[20px] font-extrabold text-[#112338] mt-0.5">02</p>
              </div>
            </div>

          </div>

          {/* Search, Filter dropdown, and Search button bar */}
          <div className="bg-white p-4 rounded-xl border border-gray-100/80 shadow-sm flex flex-col md:flex-row items-center gap-4">

            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <MdSearch size={19} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-[13px] rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#B68B39] font-medium transition-all"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative w-full md:w-60">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2.5 text-[13px] text-gray-700 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-[#B68B39] font-semibold cursor-pointer"
              >
                <option value="All Visits">Filter by Status: All Visits</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
              <MdKeyboardArrowDown size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Gold Search Button */}
            <button className="w-full md:w-36 py-2.5 bg-[#B68B39] text-white rounded-lg font-bold text-[13px] shadow-md hover:bg-[#a0762d] active:scale-[0.98] transition-all shrink-0">
              Search
            </button>

          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.015)] overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-[17px] font-extrabold text-[#112338]">All Upcoming Visits</h3>
              <MdMoreHoriz size={22} className="text-gray-300 cursor-pointer" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-gray-50/70 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    <th className="py-4 px-6">Tenant Name</th>
                    <th className="py-4 px-6">Property</th>
                    <th className="py-4 px-6">Visit Date</th>
                    <th className="py-4 px-6 text-center">Status</th>
                    <th className="py-4 px-6">Time</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-[13px] font-medium text-gray-700">

                  {loading ? (
                    <tr>
                      <td colSpan="6" className="py-6 px-6 text-center text-gray-500">
                        Loading visits...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="6" className="py-6 px-6 text-center text-red-500">
                        Error: {error}
                      </td>
                    </tr>
                  ) : visitRequests.length > 0 ? (
                    visitRequests.map((visit) => {
                      const statusStyle = getStatusStyle(visit.status);
                      const visitDate = new Date(visit.preferredVisitDate);
                      const dateStr = visitDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });

                      return (
                        <tr key={visit._id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-4 px-6 flex items-center gap-3">
                            <img
                              src={visit.tenant?.profilePicture || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80"}
                              alt="Tenant"
                              className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100"
                            />
                            <span className="font-extrabold text-[#112338]">{visit.tenant?.fullName || 'N/A'}</span>
                          </td>
                          <td className="py-4 px-6 text-[#112338]">{visit.property?.title || 'N/A'}</td>
                          <td className="py-4 px-6 text-gray-500 font-semibold">{dateStr}</td>
                          <td className="py-4 px-6 text-center">
                            <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border} uppercase tracking-wide inline-block`}>
                              {statusStyle.label}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-gray-500 font-semibold">{visit.preferredTimeSlot}</td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  if (visit.tenant?.phoneNumber) {
                                    window.location.href = `tel:${visit.tenant.phoneNumber}`;
                                  }
                                }}
                                className="p-2 rounded-lg bg-[#B68B39]/10 text-[#B68B39] hover:bg-[#B68B39]/20 transition-all"
                                title="Call Tenant"
                              >
                                <MdPhone size={15} />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedVisitId(visit._id);
                                  goToScreen(3);
                                }}
                                className="p-2 rounded-lg bg-[#B68B39]/10 text-[#B68B39] hover:bg-[#B68B39]/20 transition-all"
                                title="View Details"
                              >
                                <MdVisibility size={15} />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedVisitId(visit._id);
                                  goToScreen(4);
                                }}
                                className="p-2 rounded-lg bg-[#B68B39]/10 text-[#B68B39] hover:bg-[#B68B39]/20 transition-all"
                                title="Reschedule"
                              >
                                <MdCalendarToday size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-6 px-6 text-center text-gray-500">
                        No visits found
                      </td>
                    </tr>
                  )}

                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}


      {/* =========================================================================
          SCREEN 3: VISIT DETAILS - Image 3
          ========================================================================= */}
      {currentScreen === 3 && (
        <div className="space-y-6 transition-all duration-300 animate-[fadeIn_0.4s_ease-out]">

          {/* Green Alert Banner (conditionally visible after rescheduling on Screen 4) */}
          {showRescheduleSuccess && (
            <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 p-4 rounded-xl flex items-center justify-between gap-3 shadow-sm relative transition-all">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <MdCheck size={20} />
                </div>
                <div>
                  <p className="text-[13px] font-extrabold">Visit rescheduled successfully.</p>
                </div>
              </div>
              <button
                onClick={() => setShowRescheduleSuccess(false)}
                className="text-emerald-500 hover:text-emerald-800 text-[11px] font-bold"
              >
                Close
              </button>
            </div>
          )}

          {/* Top Actions Row */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold text-[#112338]">Visit Details</h2>
              <p className="text-gray-500 text-[12.5px] mt-0.5 font-medium">
                Review complete property visit information and meeting details.
              </p>
            </div>
            <button className="flex items-center gap-2 px-4.5 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 text-[12.5px] font-bold shadow-sm hover:bg-gray-50 active:scale-[0.98] transition-all">
              <MdFileDownload size={18} /> Export Details
            </button>
          </div>

          {/* Main Grid split layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left Column (Main details) */}
            <div className="lg:col-span-2 space-y-6">

              {/* Card 1: Tenant Information */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80 relative">
                <MdMoreHoriz className="absolute top-6 right-6 text-gray-300 cursor-pointer" size={22} />
                <h3 className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-4">Tenant Information</h3>

                {loading ? (
                  <div className="text-center py-6 text-gray-500">Loading...</div>
                ) : currentVisitDetail?.tenant ? (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4.5">
                    <img
                      src={currentVisitDetail.tenant.profilePicture || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80"}
                      alt="Tenant Headshot"
                      className="w-16 h-16 rounded-full object-cover ring-4 ring-gray-50"
                    />
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h4 className="text-[17px] font-extrabold text-[#112338]">{currentVisitDetail.tenant.fullName}</h4>
                        <span className="text-[9.5px] font-bold px-2 py-0.5 bg-[#EBFDF5] text-[#10B981] border border-[#10B981]/20 rounded-full uppercase tracking-wider">
                          Verified Tenant
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2.5 text-[12px] text-gray-500 font-medium flex-wrap">
                        <span>{currentVisitDetail.tenant.phoneNumber}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                          <MdStar size={15} /> 4.8 Rating
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">No tenant information available</div>
                )}
              </div>

              {/* Card 2: Property Information */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
                <h3 className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-4">Property Information</h3>

                {currentVisitDetail?.property ? (
                  <div className="flex flex-col sm:flex-row gap-5">
                    <img
                      src={currentVisitDetail.property.image || PROPERTY_IMAGE}
                      alt="Property"
                      className="w-full sm:w-48 h-32 rounded-xl object-cover ring-1 ring-gray-100 shrink-0"
                    />
                    <div className="flex flex-col justify-center">
                      <h4 className="text-[17px] font-extrabold text-[#112338]">{currentVisitDetail.property.title}</h4>
                      <p className="text-[12.5px] text-gray-400 mt-2 font-semibold flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#B68B39]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {currentVisitDetail.property.city}, {currentVisitDetail.property.location}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">No property information available</div>
                )}
              </div>

              {/* Card 3: Visit Information */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
                <h3 className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-4">Visit Information</h3>

                {currentVisitDetail ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

                    {/* Date Column */}
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center shrink-0 border border-gray-100">
                        <MdCalendarToday size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Date</p>
                        <p className="text-[13px] font-extrabold text-[#112338] mt-0.5">
                          {showRescheduleSuccess ? rescheduleData.date : new Date(currentVisitDetail.preferredVisitDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    {/* Time Column */}
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center shrink-0 border border-gray-100">
                        <MdAccessTime size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Time</p>
                        <p className="text-[13px] font-extrabold text-[#112338] mt-0.5">
                          {showRescheduleSuccess ? rescheduleData.time : currentVisitDetail.preferredTimeSlot}
                        </p>
                      </div>
                    </div>

                    {/* Visitors Column */}
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center shrink-0 border border-gray-100">
                        <MdHome size={18} className="text-gray-500" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Visitors</p>
                        <p className="text-[13px] font-extrabold text-[#112338] mt-0.5">{currentVisitDetail.numberOfVisitors || '1'} Person(s)</p>
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">No visit information available</div>
                )}
              </div>

              {/* Card 4: Additional Notes */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
                <h3 className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-4">Additional Notes</h3>

                <div className="bg-[#F8F9FC] border-l-4 border-[#B68B39] p-4.5 rounded-r-xl">
                  <p className="text-[13px] text-gray-600 italic font-medium leading-relaxed">
                    {currentVisitDetail?.additionalMessage || "No additional notes provided."}
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column (Actions / Map / Callouts) */}
            <div className="space-y-6">

              {/* Card 1: Manage Visit (Status / Reschedule / Contact) */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80 space-y-4">
                <h3 className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Manage Visit</h3>

                {statusActionError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-600">
                    {statusActionError}
                  </div>
                )}

                {statusUpdateSuccess && (
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-[12px] text-emerald-700">
                    {statusUpdateSuccess}
                  </div>
                )}

                <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block">
                  Owner Response Message
                </label>
                <textarea
                  rows={3}
                  value={statusMessage}
                  onChange={(e) => setStatusMessage(e.target.value)}
                  placeholder="Add a note for the tenant"
                  className="w-full rounded-xl border border-gray-200 bg-[#F8F9FC] px-3 py-2 text-[12px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#B68B39]"
                />

                <div className="grid gap-2">
                  <button
                    type="button"
                    onClick={() => handleOwnerStatusUpdate('approved', { ownerResponseMessage: statusMessage || 'Visit approved by owner.' })}
                    disabled={statusActionLoading}
                    className="w-full rounded-xl bg-[#10B981] px-3 py-2.5 text-[13px] font-bold text-white transition-all hover:bg-[#0f946c] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {statusActionLoading ? 'Updating...' : 'Approve Visit'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOwnerStatusUpdate('rejected', { ownerResponseMessage: statusMessage || 'Visit rejected by owner.' })}
                    disabled={statusActionLoading}
                    className="w-full rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-[13px] font-bold text-red-600 transition-all hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {statusActionLoading ? 'Updating...' : 'Reject Visit'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOwnerStatusUpdate('completed', { ownerResponseMessage: statusMessage || 'Visit completed by owner.' })}
                    disabled={statusActionLoading}
                    className="w-full rounded-xl border border-blue-200 bg-blue-50 px-3 py-2.5 text-[13px] font-bold text-blue-600 transition-all hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {statusActionLoading ? 'Updating...' : 'Mark Completed'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOwnerStatusUpdate('cancelled', { ownerResponseMessage: statusMessage || 'Visit cancelled by owner.' })}
                    disabled={statusActionLoading}
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-[13px] font-bold text-gray-700 transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {statusActionLoading ? 'Updating...' : 'Cancel Visit'}
                  </button>
                </div>

                <button
                  onClick={() => goToScreen(4)}
                  className="w-full py-3 rounded-xl border border-[#B68B39] text-[#B68B39] text-[13px] font-bold hover:bg-[#B68B39]/5 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <MdCalendarToday size={16} /> Reschedule
                </button>

                <button className="w-full py-3 rounded-xl border border-[#112338] text-[#112338] text-[13px] font-bold hover:bg-gray-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                  <MdChat size={16} /> Contact Tenant
                </button>
              </div>

              {/* Card 2: Property Location (Mock Vector Map) */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
                <h3 className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-4">Property Location</h3>

                {/* Map Vector SVG Container */}
                <div className="w-full h-40 bg-[#E8ECEF] rounded-xl relative overflow-hidden shadow-inner border border-gray-100 flex items-center justify-center">
                  <svg className="w-full h-full opacity-60" viewBox="0 0 200 120">
                    <path d="M 0,20 L 200,20 M 0,60 L 200,60 M 0,100 L 200,100 M 30,0 L 30,120 M 100,0 L 100,120 M 170,0 L 170,120" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" />
                    <path d="M 50,0 Q 80,40 120,60 T 200,90" fill="none" stroke="#94A3B8" strokeWidth="4" />
                    <circle cx="120" cy="60" r="25" fill="#B68B39" fillOpacity="0.1" />
                    <circle cx="120" cy="60" r="10" fill="#B68B39" fillOpacity="0.25" />
                  </svg>
                  {/* Pin icon overlay */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-[#B68B39] text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                      <MdHome size={16} />
                    </div>
                  </div>
                </div>

                <p className="text-[11.5px] text-gray-400 mt-4 leading-relaxed font-semibold">
                  The property is located in Sector 2, DHA Phase 6. Close to Bukhari Commercial and 5 mins from Sea View.
                </p>
              </div>

              {/* Card 3: Support Callout Banner (Dark Navy blue bg) */}
              <div className="bg-[#112338] text-white rounded-2xl p-6 shadow-lg border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-8 -translate-y-8" />

                <span className="text-[9px] text-[#B68B39] font-extrabold uppercase tracking-widest">Need Assistance?</span>
                <p className="text-[12.5px] text-gray-300 mt-2 leading-relaxed font-medium">
                  Our team can help coordinate the inspection and logistics.
                </p>
                <button className="w-full mt-4 py-2.5 rounded-xl bg-[#B68B39] text-[#112338] text-[12px] font-bold hover:bg-[#a0762d] hover:text-white active:scale-[0.98] transition-all shadow-lg shadow-[#B68B39]/10">
                  Talk to Expert
                </button>
              </div>

            </div>

          </div>

        </div>
      )}


      {/* =========================================================================
          SCREEN 4: RESCHEDULE VISIT FORM - Image 4
          ========================================================================= */}
      {currentScreen === 4 && (
        <div className="space-y-6 transition-all duration-300 animate-[fadeIn_0.4s_ease-out] max-w-3xl mx-auto">

          <div className="pb-1">
            <span className="text-[10px] text-[#B68B39] font-extrabold tracking-widest uppercase block">
              Reschedule Action
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#112338] mt-1.5">Reschedule Visit</h2>
            <p className="text-gray-500 text-[12.5px] mt-1 font-medium leading-relaxed">
              Update the property visit schedule and notify the tenant automatically.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-100/80">
            <form onSubmit={handleConfirmReschedule} className="space-y-6">

              {/* Custom Tenant Header card inside form */}
              <div className="bg-[#F8F9FC] p-4.5 rounded-xl border border-gray-100/60 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={TENANT_AVATAR}
                    alt="Tenant Headshot"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                  />
                  <div>
                    <h4 className="text-[14px] font-extrabold text-[#112338]">Ali Raza</h4>
                    <p className="text-[11.5px] text-gray-400 mt-0.5 font-semibold">
                      Skyline Luxury Apartment • DHA Phase 6
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] font-bold px-2 py-0.5 bg-gray-200/80 text-gray-500 rounded uppercase tracking-wider inline-block mb-1">
                    Original
                  </span>
                  <p className="text-[12px] font-extrabold text-gray-500">15 Jan, 4:00 PM</p>
                </div>
              </div>

              {/* Date Input */}
              <div className="space-y-2">
                <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block">
                  New Visit Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={rescheduleData.date}
                    onChange={(e) => setRescheduleData({ ...rescheduleData, date: e.target.value })}
                    className="w-full pl-4 pr-12 py-3 text-[13px] text-gray-700 bg-[#F1F3F6]/50 rounded-xl border border-gray-200 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#B68B39] font-bold tracking-wide transition-all"
                  />
                  <MdCalendarToday size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Time Input */}
              <div className="space-y-2">
                <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block">
                  New Visit Time
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={rescheduleData.time}
                    onChange={(e) => setRescheduleData({ ...rescheduleData, time: e.target.value })}
                    className="w-full px-4 py-3 text-[13px] text-gray-700 bg-[#F1F3F6]/50 rounded-xl border border-gray-200 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#B68B39] font-bold tracking-wide transition-all"
                  />
                  <MdAccessTime size={17} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Reschedule Reason Text Area */}
              <div className="space-y-2">
                <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block">
                  Reschedule Reason
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter reason for rescheduling"
                  value={rescheduleData.reason}
                  onChange={(e) => setRescheduleData({ ...rescheduleData, reason: e.target.value })}
                  className="w-full p-4 text-[13px] text-gray-700 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#B68B39] font-medium leading-relaxed transition-all"
                />
              </div>

              {/* Form Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#B68B39] text-white text-[13px] font-bold rounded-xl shadow-md hover:bg-[#a0762d] active:scale-[0.98] transition-all"
                >
                  Confirm Reschedule
                </button>
                <button
                  type="button"
                  onClick={() => goToScreen(3)}
                  className="w-full sm:w-auto px-8 py-3.5 border border-gray-200 text-gray-700 text-[13px] font-bold rounded-xl hover:bg-gray-50 active:scale-[0.98] transition-all"
                >
                  Cancel
                </button>
              </div>

              {/* Footer Notice */}
              <p className="text-[11px] text-gray-400 text-center pt-2 font-semibold">
                Tenant will be notified via SMS and email immediately.
              </p>

            </form>
          </div>

        </div>
      )}


      {/* =========================================================================
          SCREEN 5: PROPERTY INSPECTION REPORT - Image 5
          ========================================================================= */}
      {currentScreen === 5 && (
        <div className="space-y-6 transition-all duration-300 animate-[fadeIn_0.4s_ease-out]">

          {/* Audit Log Title Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
            <div>
              <span className="text-[10px] text-[#B68B39] font-extrabold tracking-widest uppercase block">
                Audit Log
              </span>
              <h2 className="text-xl md:text-2xl font-extrabold text-[#112338] mt-1.5">Property Inspection Report</h2>
              <p className="text-gray-500 text-[12.5px] mt-1 font-medium leading-relaxed">
                Review inspection findings and property condition updates.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 text-[12.5px] font-bold shadow-sm hover:bg-gray-50 active:scale-[0.98] transition-all">
                <MdShare size={17} /> Share Report
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#B68B39] text-white text-[12.5px] font-bold shadow-md hover:bg-[#a0762d] active:scale-[0.98] transition-all">
                <MdPictureAsPdf size={17} /> Download PDF
              </button>
            </div>
          </div>

          {/* Main Grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left/Center main report details */}
            <div className="lg:col-span-2 space-y-6">

              {/* Card 1: Property Information */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
                <div className="flex items-center gap-2.5 mb-5 border-b border-gray-50 pb-3">
                  <span className="w-1.5 h-4 rounded-full bg-[#B68B39]" />
                  <h3 className="text-[14px] font-extrabold text-[#112338] uppercase tracking-wide">Property Information</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6">

                  {/* Point 1 */}
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Property Name</span>
                    <p className="text-[13px] font-extrabold text-[#112338] mt-1">Skyline Luxury Apartment</p>
                  </div>

                  {/* Point 2 */}
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Inspection Date</span>
                    <p className="text-[13px] font-extrabold text-[#112338] mt-1">15 Jan 2026</p>
                  </div>

                  {/* Point 3 */}
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Inspector</span>
                    <p className="text-[13px] font-extrabold text-[#112338] mt-1 flex items-center gap-1.5">
                      <MdSupportAgent size={16} className="text-[#B68B39]" /> Paband Inspection Team
                    </p>
                  </div>

                  {/* Point 4 */}
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Location</span>
                    <p className="text-[13px] font-extrabold text-[#112338] mt-1">DHA Phase 6, Lahore</p>
                  </div>

                </div>
              </div>

              {/* Card 2: Inspection Checklist */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
                <div className="flex items-center gap-2.5 mb-5 border-b border-gray-50 pb-3">
                  <span className="w-1.5 h-4 rounded-full bg-[#B68B39]" />
                  <h3 className="text-[14px] font-extrabold text-[#112338] uppercase tracking-wide">Inspection Checklist</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* Checklist Point 1 */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 border border-gray-100">
                    <MdCheckCircle className="text-emerald-500 shrink-0" size={20} />
                    <span className="text-[12.5px] font-bold text-gray-700">Property Condition Good</span>
                  </div>

                  {/* Checklist Point 2 */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 border border-gray-100">
                    <MdCheckCircle className="text-emerald-500 shrink-0" size={20} />
                    <span className="text-[12.5px] font-bold text-gray-700">Utilities Functional</span>
                  </div>

                  {/* Checklist Point 3 */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 border border-gray-100">
                    <MdCheckCircle className="text-emerald-500 shrink-0" size={20} />
                    <span className="text-[12.5px] font-bold text-gray-700">Security Verified</span>
                  </div>

                  {/* Checklist Point 4 */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 border border-gray-100">
                    <MdCheckCircle className="text-emerald-500 shrink-0" size={20} />
                    <span className="text-[12.5px] font-bold text-gray-700">Documentation Checked</span>
                  </div>

                </div>
              </div>

              {/* Card 3: Inspector Notes */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
                <div className="flex items-center gap-2.5 mb-4 border-b border-gray-50 pb-3">
                  <span className="w-1.5 h-4 rounded-full bg-[#B68B39]" />
                  <h3 className="text-[14px] font-extrabold text-[#112338] uppercase tracking-wide">Inspector Notes</h3>
                </div>

                <div className="bg-[#F8F9FC] border-l-4 border-[#B68B39] p-5 rounded-r-xl">
                  <p className="text-[13px] text-gray-600 italic font-medium leading-relaxed">
                    "Property is in excellent condition with all facilities functioning properly. The recent paint job in the living area looks fresh, and all smart locks have been tested and verified. Tenant has maintained the premises exceptionally well."
                  </p>
                </div>
              </div>

              {/* Card 4: Uploaded Images (4 Photo Grid) */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
                <div className="flex items-center justify-between gap-4 mb-5 border-b border-gray-50 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-4 rounded-full bg-[#B68B39]" />
                    <h3 className="text-[14px] font-extrabold text-[#112338] uppercase tracking-wide">Uploaded Images</h3>
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    4 High-res photos
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {GALLERY_PHOTOS.map((photo, index) => (
                    <div key={index} className="relative rounded-xl overflow-hidden aspect-[4/3] group border border-gray-100 shadow-sm">
                      <img
                        src={photo.url}
                        alt={photo.label}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Dark Overlay at the bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                        <span className="text-[10.5px] font-extrabold text-white tracking-widest uppercase">
                          {photo.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column details */}
            <div className="space-y-6">

              {/* Card 1: Report Status Selection */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80 space-y-4">
                <h3 className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-2">Report Status</h3>

                <div className="space-y-3">

                  {/* Excellent Condition Option */}
                  <div
                    onClick={() => setReportStatus('Excellent Condition')}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${reportStatus === 'Excellent Condition'
                      ? 'bg-[#EBFDF5] border-[#10B981] text-[#10B981]'
                      : 'border-gray-200 text-gray-500 hover:bg-gray-50/50'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${reportStatus === 'Excellent Condition' ? 'bg-[#10B981]' : 'bg-gray-400'}`} />
                      <span className="text-[12.5px] font-extrabold">Excellent Condition</span>
                    </div>
                    {reportStatus === 'Excellent Condition' && <MdCheckCircle size={18} />}
                  </div>

                  {/* Maintenance Required Option */}
                  <div
                    onClick={() => setReportStatus('Maintenance Required')}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${reportStatus === 'Maintenance Required'
                      ? 'bg-amber-50 border-amber-500 text-amber-600'
                      : 'border-gray-200 text-gray-500 hover:bg-gray-50/50'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${reportStatus === 'Maintenance Required' ? 'bg-amber-500' : 'bg-gray-400'}`} />
                      <span className="text-[12.5px] font-extrabold">Maintenance Required</span>
                    </div>
                    {reportStatus === 'Maintenance Required' && <MdWarning size={18} />}
                  </div>

                  {/* Immediate Attention Needed Option */}
                  <div
                    onClick={() => setReportStatus('Immediate Attention Needed')}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${reportStatus === 'Immediate Attention Needed'
                      ? 'bg-red-50 border-red-500 text-red-600'
                      : 'border-gray-200 text-gray-500 hover:bg-gray-50/50'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${reportStatus === 'Immediate Attention Needed' ? 'bg-red-500' : 'bg-gray-400'}`} />
                      <span className="text-[12.5px] font-extrabold">Immediate Attention Needed</span>
                    </div>
                    {reportStatus === 'Immediate Attention Needed' && <MdWarning size={18} />}
                  </div>

                </div>
              </div>

              {/* Card 2: Support Coordinator Block */}
              <div className="bg-[#112338] text-white rounded-2xl p-6 shadow-lg border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-8 -translate-y-8" />

                <span className="text-[9px] text-[#B68B39] font-extrabold uppercase tracking-widest">Support</span>
                <h4 className="text-[14px] font-extrabold mt-3 leading-tight text-white">
                  Questions about this report?
                </h4>
                <p className="text-[12px] text-gray-300 mt-2 leading-relaxed font-medium">
                  Our inspection specialists are available to discuss findings in detail.
                </p>
                <button className="w-full mt-4 py-2.5 rounded-xl bg-[#B68B39] text-[#112338] text-[12px] font-bold hover:bg-[#a0762d] hover:text-white active:scale-[0.98] transition-all shadow-lg shadow-[#B68B39]/10">
                  Speak to Inspector
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
