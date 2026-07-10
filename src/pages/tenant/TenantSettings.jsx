import React, { useEffect, useState } from 'react';
import {
    Heart, Camera, Bell, LifeBuoy, LogOut, Trash2, Lock, AlertTriangle
} from 'lucide-react';
import {
    getProfile,
    updateProfile,
    uploadAvatar,
    changePassword,
    getNotificationPreferences,
    updateNotificationPreferences,
    apiRequest,
    logout,
} from '../../utils/api';

export default function TenantSettings() {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [fullName, setFullName] = useState('Arslan Mahmood');
    const [email, setEmail] = useState('arslan.mahmood@example.com');
    const [phone, setPhone] = useState('+92 3001234567');
    const [emergencyPhone, setEmergencyPhone] = useState('+92 3219876543');
    const [address, setAddress] = useState('Apartment 402, Skyline Tower, DHA Phase 6, Karachi');
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const [notifications, setNotifications] = useState({
        paymentAlerts: true,
        agreementUpdates: true,
        emailNotifications: true,
        visitNotifications: true,
        ticketReplies: false,
        smsAlerts: false,
    });

    const toggleNotification = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const user = await getProfile();
                if (user) {
                    setFullName(user.fullName || user.name || fullName);
                    setEmail(user.email || email);
                    setPhone(user.phoneNumber || phone);
                    setAddress(user.address || address);
                    // possible avatar fields from backend
                    const possibleAvatar = user.avatar || user.avatarUrl || user.profilePicture || user.photo;
                    if (possibleAvatar) setAvatarUrl(possibleAvatar);
                }

                const prefs = await getNotificationPreferences();
                if (prefs) {
                    setNotifications((prev) => ({ ...prev, ...prefs }));
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleProfileSave = async () => {
        try {
            setLoading(true);
            await updateProfile({ fullName, phoneNumber: phone, address, email });
            setMessage({ type: 'success', text: 'Profile updated.' });
        } catch (e) {
            setMessage({ type: 'error', text: e.message || 'Update failed' });
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const handleAvatarChange = async (file) => {
        if (!file) return;
        setAvatarFile(file);
        const form = new FormData();
        form.append('avatar', file);
        try {
            setLoading(true);
            const res = await uploadAvatar(form);
            // try to extract returned avatar url
            const newAvatar = res?.avatar || res?.user?.avatar || res?.user?.avatarUrl || res?.avatarUrl || null;
            if (newAvatar) {
                setAvatarUrl(newAvatar);
                // persist to localStorage user if present so other UI can reflect change
                try {
                    const raw = localStorage.getItem('user');
                    if (raw) {
                        const u = JSON.parse(raw);
                        u.avatar = newAvatar;
                        u.avatarUrl = newAvatar;
                        localStorage.setItem('user', JSON.stringify(u));
                        // notify other components in same window
                        window.dispatchEvent(new Event('user-updated'));
                    }
                } catch (err) {
                    // ignore
                }
            } else {
                // fallback: preview local file
                try {
                    const preview = URL.createObjectURL(file);
                    setAvatarUrl(preview);
                } catch (err) {
                    // ignore
                }
            }
            setMessage({ type: 'success', text: 'Avatar uploaded.' });
        } catch (e) {
            setMessage({ type: 'error', text: e.message || 'Upload failed' });
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [deletePassword, setDeletePassword] = useState('');
    const [deleteAgree, setDeleteAgree] = useState(false);

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match.' });
            setTimeout(() => setMessage(null), 2500);
            return;
        }
        try {
            setLoading(true);
            await changePassword({ currentPassword, newPassword, confirmPassword });
            setMessage({ type: 'success', text: 'Password changed.' });
            setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
        } catch (e) {
            setMessage({ type: 'error', text: e.message || 'Password change failed' });
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const handleSaveNotifications = async () => {
        try {
            setLoading(true);
            await updateNotificationPreferences(notifications);
            setMessage({ type: 'success', text: 'Notification preferences saved.' });
        } catch (e) {
            setMessage({ type: 'error', text: e.message || 'Save failed' });
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(null), 2500);
        }
    };

    const handleDeleteAccount = async (password) => {
        try {
            setLoading(true);
            await apiRequest('/api/profile/delete', { method: 'POST', body: { password } });
            // on success, clear local auth and redirect to home
            await logout();
            window.location.href = '/';
        } catch (e) {
            setMessage({ type: 'error', text: e.message || 'Delete failed' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F6FA] p-6">
            <div className="max-w-[1200px] mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-zinc-900">Account Settings</h1>
                        <p className="text-sm text-zinc-500 mt-1">Manage your tenant profile, security preferences, and account settings from one place.</p>
                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    <div className="lg:col-span-2 space-y-6">
                        <section className="bg-white rounded-2xl border border-zinc-100 p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4 border-b border-zinc-50 pb-3">
                                <span className="text-amber-600 text-lg">👤</span>
                                <h3 className="text-md font-bold text-zinc-950">Personal Information</h3>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                                <div className="relative group">
                                    <img src={avatarUrl || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop'} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-zinc-100" />
                                    <label className="absolute bottom-0 right-0 bg-[#B28247] p-1.5 rounded-full text-white cursor-pointer hover:bg-[#966D3A] transition-colors shadow-sm">
                                        <Camera size={14} />
                                        <input type="file" className="hidden" onChange={(e) => handleAvatarChange(e.target.files && e.target.files[0])} />
                                    </label>
                                </div>
                                <div className="text-center sm:text-left">
                                    <p className="text-xs font-semibold text-zinc-800 mb-2">Profile Picture</p>
                                    <div className="flex gap-2 justify-center sm:justify-start">
                                        <button className="bg-[#B28247] hover:bg-[#966D3A] text-white text-xs font-medium px-4 py-2 rounded-lg">Upload New</button>
                                        <button className="border border-zinc-200 hover:bg-zinc-50 text-zinc-500 text-xs font-medium px-4 py-2 rounded-lg">Remove</button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputField label="Full Name" value={fullName} onChange={setFullName} />
                                <InputField label="Email Address" type="email" value={email} onChange={setEmail} />
                                <InputField label="Phone Number" value={phone} onChange={setPhone} />
                                <InputField label="Emergency Contact Number" value={emergencyPhone} onChange={setEmergencyPhone} />
                                <div className="sm:col-span-2"><InputField label="Residential Address" value={address} onChange={setAddress} /></div>
                                <div className="sm:col-span-2"><InputField label="Residential Address" value={address} onChange={setAddress} /></div>
                            </div>

                            <div className="mt-4 flex items-center gap-3">
                                <button onClick={handleProfileSave} className="bg-[#B28247] hover:bg-[#966D3A] text-white text-xs font-medium px-4 py-2 rounded-lg">Save Profile</button>
                                <button onClick={() => { setFullName(''); setEmail(''); setPhone(''); setAddress(''); }} className="border border-zinc-200 hover:bg-zinc-50 text-zinc-500 text-xs font-medium px-4 py-2 rounded-lg">Reset</button>
                                {message && <span className={`text-xs ${message.type === 'error' ? 'text-red-600' : 'text-emerald-600'}`}>{message.text}</span>}
                            </div>
                        </section>

                        <section className="bg-white rounded-2xl border border-zinc-100 p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4 border-b border-zinc-50 pb-3">
                                <span className="text-amber-600 text-lg">🛡️</span>
                                <h3 className="text-md font-bold text-zinc-950">Security & Privacy</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <InputField label="Current Password" type="password" value={currentPassword} onChange={setCurrentPassword} placeholder="••••••••" />
                                <InputField label="New Password" type="password" value={newPassword} onChange={setNewPassword} placeholder="Enter new password" />
                                <InputField label="Confirm Password" type="password" value={confirmPassword} onChange={setConfirmPassword} placeholder="Re-type password" />
                            </div>
                            <div className="mt-4">
                                <button onClick={handleChangePassword} className="bg-[#B28247] hover:bg-[#966D3A] text-white text-xs font-medium px-4 py-2 rounded-lg">Change Password</button>
                            </div>
                        </section>

                        <section className="bg-white rounded-2xl border border-zinc-100 p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4 border-b border-zinc-50 pb-3">
                                <span className="text-amber-600 text-lg">🔔</span>
                                <h3 className="text-md font-bold text-zinc-950">Notification Preferences</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                                <ToggleRow title="Payment Alerts" desc="Rent due, receipts, and failure notices" active={notifications.paymentAlerts} onClick={() => toggleNotification('paymentAlerts')} />
                                <ToggleRow title="Visit Notifications" desc="Property viewing and visit confirmations" active={notifications.visitNotifications} onClick={() => toggleNotification('visitNotifications')} />
                                <ToggleRow title="Agreement Updates" desc="New contracts, renewals, and e-signatures" active={notifications.agreementUpdates} onClick={() => toggleNotification('agreementUpdates')} />
                                <ToggleRow title="Ticket Replies" desc="Support and maintenance request updates" active={notifications.ticketReplies} onClick={() => toggleNotification('ticketReplies')} />
                                <ToggleRow title="Email Notifications" desc="Direct updates to your primary email inbox" active={notifications.emailNotifications} onClick={() => toggleNotification('emailNotifications')} />
                                <ToggleRow title="SMS Alerts" desc="High priority mobile text notifications" active={notifications.smsAlerts} onClick={() => toggleNotification('smsAlerts')} />
                            </div>
                            <div className="mt-3">
                                <button onClick={handleSaveNotifications} className="bg-[#B28247] hover:bg-[#966D3A] text-white text-xs font-medium px-4 py-2 rounded-lg">Save Notification Preferences</button>
                            </div>
                        </section>
                    </div>

                    <div className="space-y-6 lg:sticky lg:top-8">
                        <div className="bg-white rounded-2xl border border-zinc-100 p-5 shadow-sm text-center sm:text-left">
                            <h4 className="text-xs font-bold text-zinc-900 mb-4 uppercase tracking-wider">Current Account Status</h4>
                            <div className="flex items-center justify-between bg-emerald-50/50 border border-emerald-100/80 rounded-xl p-3 mb-6">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 leading-none">Membership</p>
                                        <p className="text-xs font-bold text-emerald-700 mt-0.5">Verified Tenant</p>
                                    </div>
                                </div>
                                <span className="text-emerald-400 text-xs font-bold">›</span>
                            </div>

                            <div className="flex flex-col items-center py-2">
                                <p className="text-xs font-semibold text-zinc-400 mb-4">Trust Reliability Score</p>
                                <div className="relative w-28 h-28 flex items-center justify-center mb-4">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="56" cy="56" r="48" stroke="#EAEAEA" strokeWidth="8" fill="transparent" />
                                        <circle cx="56" cy="56" r="48" stroke="#10B981" strokeWidth="8" fill="transparent" strokeDasharray={2 * Math.PI * 48} strokeDashoffset={(2 * Math.PI * 48) * (1 - 0.95)} strokeLinecap="round" />
                                    </svg>
                                    <span className="absolute text-2xl font-black text-zinc-900">95%</span>
                                </div>
                                <p className="text-[11px] text-zinc-400 text-center max-w-[200px] leading-relaxed">You have an excellent reliability score based on your payment history.</p>
                            </div>
                        </div>

                        <div className="bg-[#0B192C] text-white rounded-2xl p-5 shadow-md">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">Regional Preferences</h4>
                            <label className="text-[11px] font-semibold text-zinc-300 block mb-1.5">LANGUAGE SELECTION</label>
                            <select className="w-full bg-[#1E2A38] border border-zinc-700 rounded-xl px-3 py-2.5 text-xs font-medium text-zinc-100 focus:outline-none focus:border-amber-500 cursor-pointer">
                                <option>English (United States)</option>
                                <option>Urdu (Pakistan)</option>
                            </select>
                        </div>

                        <div className="bg-white rounded-2xl border border-zinc-100 p-5 shadow-sm">
                            <h4 className="text-xs font-bold text-zinc-900 mb-4 uppercase tracking-wider">Account Actions</h4>
                            <div className="space-y-2">
                                <button onClick={() => setShowLogoutModal(true)} className="w-full bg-[#FFFDF9] hover:bg-amber-50/50 text-zinc-700 text-xs font-semibold py-3 px-4 rounded-xl border border-amber-100/70 flex items-center justify-between">➡️ Logout Account</button>
                                <button onClick={() => setShowDeleteModal(true)} className="w-full bg-red-50/30 hover:bg-red-50 text-red-600 text-xs font-semibold py-3 px-4 rounded-xl border border-red-100/60 flex items-center justify-between">🗑️ Delete Permanently</button>
                            </div>
                        </div>
                    </div>
                </div>

                {showLogoutModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center border border-zinc-100">
                            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600 border border-amber-100">
                                <LogOut size={22} />
                            </div>
                            <h3 className="text-md font-bold text-zinc-950 mb-1">Logout Account</h3>
                            <p className="text-xs text-zinc-500 px-2 leading-relaxed">Are you sure you want to logout from your account? You will need to login again to access your dashboard and rental management features.</p>
                            <div className="bg-[#FFFDF9] border border-amber-100/80 rounded-xl p-2.5 my-4 text-[11px] text-amber-800 flex items-center justify-center gap-2">🔐 Your current session will be securely ended.</div>
                            <div className="space-y-2">
                                <button onClick={async () => { try { await logout(); window.location.href = '/'; } catch (e) { console.error(e); setShowLogoutModal(false); } }} className="w-full bg-[#B28247] hover:bg-[#966D3A] text-white text-xs font-semibold py-2.5 rounded-xl">Logout</button>
                                <button onClick={() => setShowLogoutModal(false)} className="w-full border border-zinc-200 hover:bg-zinc-50 text-zinc-600 text-xs font-semibold py-2.5 rounded-xl">Cancel</button>
                            </div>
                        </div>
                    </div>
                )}

                {showDeleteModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-zinc-100 overflow-hidden">
                            <div className="bg-red-50 px-4 py-2 flex items-center gap-2 border-b border-red-100">
                                <AlertTriangle size={14} className="text-red-600" />
                                <span className="text-[10px] font-black uppercase tracking-wider text-red-700">Danger Zone</span>
                            </div>
                            <div className="p-6">
                                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4 text-red-600 border border-red-100"><Trash2 size={22} /></div>
                                <h3 className="text-md font-bold text-zinc-950 mb-1">Delete Account Permanently</h3>
                                <p className="text-xs text-red-600 font-medium flex items-center gap-1.5 mb-5">⚠️ This action is permanent and cannot be undone.</p>
                                <div className="grid grid-cols-2 gap-2 mb-5">
                                    <DataLossItem label="Profile info" />
                                    <DataLossItem label="Property records" />
                                    <DataLossItem label="Agreements" />
                                    <DataLossItem label="Payment history" />
                                    <DataLossItem label="Tenant records" />
                                    <DataLossItem label="Notifications" />
                                </div>
                                <div className="mb-4 text-left">
                                    <label className="text-[11px] font-bold text-zinc-500 block mb-1">Confirm Password</label>
                                    <div className="relative">
                                        <input type="password" value={deletePassword} onChange={(e) => setDeletePassword(e.target.value)} placeholder="Enter your password" className="w-full bg-[#FFFDF9] border border-zinc-200 rounded-xl pl-3 pr-10 py-2.5 text-xs text-zinc-800 focus:outline-none focus:border-red-400" />
                                        <Lock size={14} className="absolute right-3.5 top-3.5 text-zinc-400" />
                                    </div>
                                </div>
                                <label className="flex items-start gap-2.5 cursor-pointer mb-6 text-left">
                                    <input type="checkbox" checked={deleteAgree} onChange={(e) => setDeleteAgree(e.target.checked)} className="mt-0.5 rounded border-zinc-300 text-red-600 focus:ring-red-500" />
                                    <span className="text-[11px] text-zinc-500 font-medium leading-tight">I understand that this action is permanent and my data cannot be recovered.</span>
                                </label>
                                <div className="space-y-2">
                                    <button onClick={async () => { if (!deleteAgree) { setMessage({ type: 'error', text: 'Please confirm acknowledgement.' }); setTimeout(() => setMessage(null), 2000); return; } await handleDeleteAccount(deletePassword); }} className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-3 rounded-xl uppercase tracking-wider">Permanently Delete Account</button>
                                    <button onClick={() => setShowDeleteModal(false)} className="w-full border border-zinc-200 hover:bg-zinc-50 text-zinc-600 text-xs font-semibold py-2.5 rounded-xl">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function InputField({ label, type = 'text', value, onChange, placeholder }) {
    return (
        <div className="w-full text-left">
            <label className="text-[11px] font-bold text-zinc-500 block mb-1">{label}</label>
            <input type={type} value={value} onChange={onChange ? (e) => onChange(e.target.value) : undefined} placeholder={placeholder}
                className="w-full bg-[#FFFDF9] border border-amber-100/70 rounded-xl px-3.5 py-2.5 text-xs text-zinc-800 font-medium placeholder-zinc-400 focus:outline-none focus:border-[#B28247]" />
        </div>
    );
}

function ToggleRow({ title, desc, active, onClick }) {
    return (
        <div className="flex items-center justify-between py-2 text-left">
            <div className="pr-4">
                <h4 className="text-xs font-bold text-zinc-800">{title}</h4>
                <p className="text-[10px] text-zinc-400 mt-0.5 leading-relaxed">{desc}</p>
            </div>
            <button onClick={onClick} className={`w-10 h-5 shrink-0 rounded-full transition-colors relative flex items-center ${active ? 'bg-[#B28247]' : 'bg-zinc-200'}`}>
                <span className={`w-4 h-4 bg-white rounded-full absolute shadow-sm transition-transform ${active ? 'translate-x-[22px]' : 'translate-x-[2px]'}`} />
            </button>
        </div>
    );
}

function DataLossItem({ label }) {
    return (
        <div className="flex items-center gap-2 border border-zinc-100/80 px-3 py-2 rounded-xl text-zinc-500 text-xs font-medium bg-zinc-50/30">
            <span className="text-red-400 text-[10px]">✕</span>
            <span>{label}</span>
        </div>
    );
}
