import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../utils/api';
import { getNotifications, markNotificationsRead } from '../../utils/notificationService';
import {
  MdNotifications, MdSearch, MdKeyboardArrowDown, MdArrowBack,
  MdCheck, MdDeleteOutline, MdOutlineVisibility,
  MdPersonAddAlt1, MdOutlineReceiptLong, MdVerifiedUser,
  MdHomeWork, MdAssignment, MdAdd, MdClose
} from 'react-icons/md';

// initial fallback sample data (used only if API fails)
const notificationsData = [
  {
    id: 'sample-1',
    type: 'TENANT ACTIVITY',
    color: 'blue',
    title: 'New tenant request received for Skyline Apartment.',
    time: '5 Minutes Ago',
    icon: MdPersonAddAlt1,
    read: false,
    property: 'Skyline Apartment',
    tenant: 'Ali Raza',
    dateFull: '15 Jan 2026 — 4:30 PM',
    status: 'Pending Review',
    message: 'Monthly payment for Skyline Apartment received successfully. The transaction has been processed and reflected in your earnings dashboard.',
  }
];

const categoryColors = {
  blue: { bg: 'bg-[#EFF6FF]', text: 'text-[#3B82F6]', border: 'border-[#3B82F6]', tagBg: 'bg-[#EFF6FF]', dot: 'bg-[#3B82F6]' },
  green: { bg: 'bg-[#ECFDF5]', text: 'text-[#10B981]', border: 'border-[#10B981]', tagBg: 'bg-[#ECFDF5]', dot: 'bg-[#10B981]' },
  yellow: { bg: 'bg-[#FFFBEB]', text: 'text-[#F59E0B]', border: 'border-[#F59E0B]', tagBg: 'bg-[#FFFBEB]', dot: 'bg-[#F59E0B]' },
  cyan: { bg: 'bg-[#F0FDFA]', text: 'text-[#14B8A6]', border: 'border-[#14B8A6]', tagBg: 'bg-[#F0FDFA]', dot: 'bg-[#14B8A6]' },
  red: { bg: 'bg-[#FEF2F2]', text: 'text-[#EF4444]', border: 'border-[#F43F5E]', tagBg: 'bg-[#FEF2F2]', dot: 'bg-[#F43F5E]' }
};

const NotificationCategories = [
  { icon: MdPersonAddAlt1, title: 'Tenant Activity Alerts', desc: 'Tenant requests, profile updates, and visit requests.', color: 'blue' },
  { icon: MdOutlineReceiptLong, title: 'Payment Updates', desc: 'Payment received, pending payments, overdue alerts.', color: 'green' },
  { icon: MdVerifiedUser, title: 'Verification Updates', desc: 'Tenant and property verification status updates.', color: 'yellow' },
  { icon: MdHomeWork, title: 'Property Approval Alerts', desc: 'Property approval and activation notifications.', color: 'cyan' },
  { icon: MdAssignment, title: 'Agreement Notifications', desc: 'Agreement signing, expiry, and renewal alerts.', color: 'red' }
];

const getNotificationTheme = (notification) => {
  const rawColor = notification?.color ?? notification?.category ?? '';
  const normalizedColor = String(rawColor).trim().toLowerCase();

  if (normalizedColor && categoryColors[normalizedColor]) {
    return categoryColors[normalizedColor];
  }

  const type = String(notification?.type || '').toLowerCase();
  if (type.includes('payment') || type.includes('receipt') || type.includes('invoice')) {
    return categoryColors.green;
  }
  if (type.includes('tenant') || type.includes('visit') || type.includes('request') || type.includes('profile')) {
    return categoryColors.blue;
  }
  if (type.includes('verify') || type.includes('verification')) {
    return categoryColors.yellow;
  }
  if (type.includes('property') || type.includes('home')) {
    return categoryColors.cyan;
  }
  if (type.includes('agreement') || type.includes('contract')) {
    return categoryColors.red;
  }

  return categoryColors.blue;
};

const getNotificationIcon = (notification) => notification?.icon || MdNotifications;

export default function OwnerNotifications() {
  const navigate = useNavigate();
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getNotifications({}, true);
      const data = res.notifications ?? res.data ?? res;

      const normalize = (raw) => {
        // backend uses _id and nested fields — normalize to UI shape
        const id = raw._id || raw.id;
        const type = (raw.type || raw.category || '').toUpperCase();
        const title = raw.title || raw.message || '';
        const message = raw.message || raw.title || '';
        const read = Boolean(raw.read);
        const createdAt = raw.createdAt || raw.created_at || null;
        const time = createdAt ? new Date(createdAt).toLocaleString() : raw.time || 'Just now';
        const actor = raw.actor || {};
        const dataObj = raw.data || {};

        // derive property and tenant info
        const property = dataObj.propertyTitle || dataObj.propertyName || dataObj.property || null;
        const propertyId = dataObj.propertyId || dataObj.property_id || null;
        const tenant = actor.fullName || actor.name || dataObj.tenantName || null;

        // date/time full display
        const dateVal = dataObj.rescheduledVisitDate || dataObj.preferredVisitDate || dataObj.visitDate || null;
        const timeSlot = dataObj.rescheduledTimeSlot || dataObj.preferredTimeSlot || dataObj.preferredTimeSlot || dataObj.timeSlot || dataObj.preferredTimeSlot;
        const dateFull = dateVal ? `${new Date(dateVal).toLocaleDateString()} ${timeSlot ? '— ' + timeSlot : ''}` : (raw.dateFull || null);

        return {
          ...raw,
          id,
          type,
          title,
          message,
          read,
          time,
          createdAt,
          actor,
          property,
          propertyId,
          tenant,
          dateFull
        };
      };

      const list = Array.isArray(data) ? data.map(normalize) : [];
      setNotifications(list);
    } catch (err) {
      console.error('Failed to fetch notifications', err);
      setError(err.message || 'Failed to load notifications');
      setNotifications(notificationsData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const id = setInterval(() => fetchNotifications(), 15000); // poll every 15s
    return () => clearInterval(id);
  }, []);

  const markAsRead = async (id) => {
    setNotifications((prev) => prev.map(n => n.id === id ? { ...n, read: true } : n));
    try {
      await markNotificationsRead(id, true);
    } catch (e) {
      console.warn('markAsRead failed', e);
    }
  };

  const markAllAsRead = async () => {
    setNotifications((prev) => prev.map(n => ({ ...n, read: true })));
    try {
      await markNotificationsRead(undefined, true);
    } catch (e) {
      console.warn('markAllAsRead failed', e);
    }
  };

  const deleteNotification = async (id) => {
    setNotifications((prev) => prev.filter(n => n.id !== id));
    try {
      await apiRequest(`/api/profile/notifications/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('deleteNotification failed', e);
    }
  };

  const renderListView = () => (
    <div className="p-6 md:p-8 lg:p-10 max-w-7xl mx-auto font-sans animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#112338] flex items-center gap-2">
            Notifications Center <span className="text-xl">🔔</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Stay updated with real-time alerts, rental activities, and important system updates.
          </p>
        </div>
        <button
          onClick={() => navigate('/owner')}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <MdArrowBack size={18} />
          Return to Dashboard
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Total Alerts</p>
          <p className="text-3xl font-extrabold text-[#112338]">{notifications.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Unread Messages</p>
          <p className="text-3xl font-extrabold text-[#112338]">{notifications.filter(n => !n.read).length}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Action Required</p>
          <p className="text-3xl font-extrabold text-red-500">{notifications.filter(n => !n.read && (n.status === 'Pending' || n.status === 'Pending Review')).length}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="relative flex-1 w-full">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search notifications or activity"
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#B68B39]/20 focus:border-[#B68B39] transition-all"
          />
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap bg-white">
            All Notifications
            <MdKeyboardArrowDown size={18} />
          </button>
          <button onClick={markAllAsRead} className="text-sm font-bold text-[#B68B39] hover:text-[#9A732D] transition-colors whitespace-nowrap px-4">
            Mark All as Read
          </button>
        </div>
      </div>

      {/* Notifications List */}
      {loading && (
        <div className="flex items-center justify-center p-8">
          <div className="text-gray-500">Loading notifications...</div>
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-md text-red-700 mb-4">Error: {error}</div>
      )}
      <div className="space-y-4">
        {(notifications.length ? notifications : notificationsData).map((notif) => {
          const colors = getNotificationTheme(notif);
          const Icon = getNotificationIcon(notif);
          return (
            <div
              key={notif.id}
              className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-start sm:items-center gap-4 cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden group`}
              onClick={() => { setSelectedNotification(notif); if (!notif.read) markAsRead(notif.id); }}
            >
              {/* Left Border accent */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${colors.bg}`} />
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${colors.bg} group-hover:scale-y-110 transition-transform origin-center`} />
              <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-4/5 w-[5px] rounded-r-full ${colors.bg.replace('bg-', 'bg-').replace('100', '500')}`} style={{ backgroundColor: 'currentColor' }} />
              {/* Refined border approach to match image perfectly */}
              <div className={`absolute left-0 top-0 bottom-0 w-[6px] rounded-l-xl ${colors.bg.replace('bg-[', 'bg-[').replace(']', ']').replace('#EFF6FF', '#3B82F6').replace('#ECFDF5', '#10B981').replace('#FFFBEB', '#F59E0B').replace('#F0FDFA', '#14B8A6').replace('#FEF2F2', '#F43F5E')} `} style={{ backgroundColor: colors.border.replace('border-[', '').replace(']', '') }} />


              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colors.bg} ${colors.text} ml-2`}>
                <Icon size={24} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1.5 ${colors.tagBg} ${colors.text}`}>
                    {notif.type}
                    <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                  </span>
                </div>
                <h3 className={`text-[15px] font-semibold truncate ${notif.read ? 'text-gray-600' : 'text-[#112338]'}`}>
                  {notif.title}
                </h3>
                <p className="text-[13px] text-gray-400 mt-1 flex items-center gap-1.5">
                  <MdNotifications size={14} className="opacity-70" />
                  {notif.time}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={(e) => { e.stopPropagation(); setSelectedNotification(notif); if (!notif.read) markAsRead(notif.id); }} className="p-2 text-[#B68B39] hover:bg-[#B68B39]/10 rounded-lg transition-colors" title="View">
                  <MdOutlineVisibility size={18} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); markAsRead(notif.id); }} className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors" title="Mark Read">
                  <MdCheck size={18} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); deleteNotification(notif.id); }} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                  <MdDeleteOutline size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-8">
        <button className="bg-[#112338] hover:bg-[#1A3A60] text-white px-6 py-3 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm">
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Load Earlier Notifications
        </button>
      </div>
    </div>
  );

  const renderDetailView = () => {
    if (!selectedNotification) return null;
    const notif = selectedNotification;
    const isPayment = String(notif?.type || '').toUpperCase() === 'PAYMENT UPDATE';
    const Icon = isPayment ? MdOutlineReceiptLong : getNotificationIcon(notif);
    const colorTheme = isPayment ? categoryColors.green : getNotificationTheme(notif);
    const displayType = isPayment ? 'Payment Update' : String(notif?.type || 'Notification').replace(/_/g, ' ');

    return (
      <div className="p-6 md:p-8 lg:p-10 max-w-7xl mx-auto font-sans animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#112338] flex items-center gap-3">
            Notification Details
            {!notif.read && (
              <span className="text-[11px] font-bold text-[#F59E0B] bg-[#FFFBEB] px-2.5 py-1 rounded-md uppercase tracking-wide border border-[#F59E0B]/20">
                Unread
              </span>
            )}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review complete activity information and related updates.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Notification Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
              {/* Decorative top border line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />

              <div className="flex items-center gap-4 pb-6 border-b border-gray-100 border-dashed">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colorTheme.bg} ${colorTheme.text}`}>
                  <Icon size={28} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Notification Type</p>
                  <h2 className="text-lg font-bold text-[#112338]">
                    {displayType}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-6 gap-x-4 py-6">
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Related Property</p>
                  <p className="text-[15px] font-bold text-[#112338]">{notif.property || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Tenant Name</p>
                  <p className="text-[15px] font-bold text-[#112338]">{notif.tenant || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Date & Time</p>
                  <p className="text-[15px] font-bold text-[#112338]">{notif.dateFull || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <p className="text-[15px] font-bold text-[#112338]">{notif.status || 'Pending'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F9FAFB] rounded-xl p-5 mb-6 border border-gray-100">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Message</p>
                <p className="text-[14px] text-gray-600 leading-relaxed font-medium">
                  {notif.message || notif.title}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => { markAsRead(notif.id); }} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#10B981] px-6 py-3 rounded-xl text-sm font-bold transition-colors">
                  <MdCheck size={18} />
                  Mark as Read
                </button>
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="flex-1 sm:flex-none px-6 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Legend Card */}
            <div className="bg-[#0B1521] rounded-2xl p-6 shadow-lg">
              <h3 className="text-[11px] font-bold text-white/50 uppercase tracking-[0.15em] mb-4">
                System Status Labels Legend
              </h3>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  <span className="text-sm font-semibold text-white/90">Read (Green)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span className="text-sm font-semibold text-white/90">Unread (Yellow)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                  <span className="text-sm font-semibold text-white/90">Important Alert (Red)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:w-[380px] shrink-0 flex flex-col gap-6">
            {/* Categories */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-[#112338] mb-5">Notification Categories</h3>
              <div className="space-y-5">
                {NotificationCategories.map((cat, idx) => {
                  const colors = categoryColors[cat.color];
                  const CatIcon = cat.icon;
                  return (
                    <div key={idx} className="flex gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colors.bg} ${colors.text}`}>
                        <CatIcon size={20} />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-[#112338] mb-0.5">{cat.title}</h4>
                        <p className="text-[12px] text-gray-500 leading-snug">{cat.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Add Promo */}
            <div className="bg-gradient-to-br from-[#C49A45] to-[#A37B2C] rounded-2xl p-6 shadow-lg relative overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow flex flex-col items-center text-center">
              {/* Decorational circles */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black/10 rounded-full blur-2xl group-hover:bg-black/20 transition-colors" />

              <div className="w-12 h-12 rounded-full bg-white/20 border border-white/30 flex items-center justify-center mb-4 relative z-10">
                <MdAdd size={24} className="text-white" />
              </div>
              <h3 className="text-[14px] font-bold text-white uppercase tracking-widest mb-2 relative z-10">
                Quick Add Property
              </h3>
              <p className="text-[13px] text-white/80 leading-relaxed font-medium relative z-10">
                Add a new unit to receive instant notifications about new leads.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {selectedNotification ? renderDetailView() : renderListView()}
    </div>
  );
}
