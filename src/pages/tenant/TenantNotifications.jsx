import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdNotifications, MdCheckCircle } from 'react-icons/md';
import { getNotifications, markNotificationsRead } from '../../utils/notificationService';

const TenantNotifications = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const response = await getNotifications({ unreadOnly: false });
                const data = response.notifications ?? response.data ?? response;
                setNotifications(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message || 'Unable to load notifications');
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    const handleMarkRead = async (id) => {
        try {
            await markNotificationsRead(id);
            setNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)));
        } catch (err) {
            console.warn('mark read failed', err);
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between gap-4 mb-6">
                <button
                    onClick={() => navigate('/tenant')}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                    <MdArrowBack size={18} /> Back to Tenant Home
                </button>
                <div className="flex items-center gap-3">
                    <MdNotifications size={28} className="text-[#B68B39]" />
                    <div>
                        <h1 className="text-2xl font-bold text-[#112338]">Notifications</h1>
                        <p className="text-sm text-gray-500">Your visit alerts, owner updates, and system messages.</p>
                    </div>
                </div>
            </div>

            {loading && <div className="text-gray-500">Loading notifications…</div>}
            {error && <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-red-700">{error}</div>}

            <div className="grid gap-4">
                {notifications.length === 0 && !loading && (
                    <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center text-gray-500">
                        No notifications found.
                    </div>
                )}

                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`rounded-2xl border p-5 shadow-sm transition ${notification.read ? 'border-gray-100 bg-white' : 'border-[#B68B39]/20 bg-[#FFFBEB]'}`}
                    >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <MdCheckCircle size={18} className={notification.read ? 'text-green-500' : 'text-[#B68B39]'} />
                                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{notification.type || 'Notification'}</p>
                                </div>
                                <h2 className="text-lg font-bold text-[#112338]">{notification.title}</h2>
                            </div>
                            <button
                                onClick={() => handleMarkRead(notification.id)}
                                className="self-start rounded-full bg-[#B68B39] px-4 py-2 text-sm font-semibold text-white hover:bg-[#9A732D] transition"
                            >
                                Mark Read
                            </button>
                        </div>
                        {notification.message && <p className="mt-4 text-sm text-gray-600">{notification.message}</p>}
                        <div className="mt-4 text-xs text-gray-400">{notification.time || notification.date || ''}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TenantNotifications;
