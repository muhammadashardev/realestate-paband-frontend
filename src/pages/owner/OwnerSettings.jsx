import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTopBar } from '../../context/TopBarContext';
import {
  MdPerson,
  MdLock,
  MdNotifications,
  MdLanguage,
  MdReportProblem,
  MdCloudUpload,
  MdDelete,
  MdCheck,
  MdExitToApp,
  MdClose,
  MdLockOutline,
  MdCheckCircle,
  MdKey,
  MdWarning,
  MdError,
  MdVisibility,
  MdVisibilityOff
} from 'react-icons/md';
import {
  getProfile,
  updateProfile,
  uploadAvatar,
  changePassword,
  getNotificationPreferences,
  updateNotificationPreferences,
  logout as logoutApi
} from '../../utils/api';
import { logout as clearAuthState } from '../../store/slices/authSlice';

// Default mock image for Ahmed Khan profile picture
const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80";

const OwnerSettings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setTopBar, resetTopBar } = useTopBar();
  const fileInputRef = useRef(null);

  // Form States
  const [profilePic, setProfilePic] = useState(DEFAULT_AVATAR);
  const [fullname, setFullname] = useState('Ahmed Khan');
  const [email, setEmail] = useState('ahmed.khan@example.com');
  const [phone, setPhone] = useState('');

  // Security States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Notification Preferences States
  const [notifications, setNotifications] = useState({
    tenantActivity: true,
    payments: true,
    agreementExpiry: true,
    ticketUpdates: true,
    inspectionUpdates: true,
    emailNotifications: true,
    smsNotifications: true,
  });

  // Regional Settings
  const [language, setLanguage] = useState('English');
  const [timezone, setTimezone] = useState('Auto Detect');

  // Modal States
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Modal Input Validation for Delete Account
  const [deleteConfirmPassword, setDeleteConfirmPassword] = useState('');
  const [deleteCheckbox, setDeleteCheckbox] = useState(false);
  const [showDeletePass, setShowDeletePass] = useState(false);

  // Loading States for actions
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState(null);

  // Synchronize dynamic header config with top bar
  useEffect(() => {
    setTopBar({
      title: "Settings",
      profileName: "Samra",
      profileAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
    });
    return () => resetTopBar();
  }, [setTopBar, resetTopBar]);

  // Load profile and notification preferences from API
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const user = await getProfile();
        if (!mounted || !user) return;
        setProfilePic(user.profilePicture || DEFAULT_AVATAR);
        setFullname(user.fullName || user.fullname || fullname);
        setEmail(user.email || email);
        setPhone(user.phoneNumber || phone);

        const prefs = await getNotificationPreferences();
        if (prefs && mounted) {
          setNotifications({
            tenantActivity: !!prefs.tenantActivityAlerts,
            payments: !!prefs.paymentNotifications,
            agreementExpiry: !!prefs.agreementExpiryAlerts,
            ticketUpdates: !!prefs.ticketUpdates,
            inspectionUpdates: !!prefs.inspectionUpdates,
            emailNotifications: !!prefs.emailNotifications,
            smsNotifications: !!prefs.smsNotifications,
          });
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    };
    load();
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show customized Toast notifications
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Profile Image Upload Handlers
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => setProfilePic(reader.result);
    reader.readAsDataURL(file);

    // Upload to server
    const formData = new FormData();
    formData.append('avatar', file);
    (async () => {
      try {
        const res = await uploadAvatar(formData);
        if (res && res.profilePicture) {
          setProfilePic(res.profilePicture);
          showToast('Profile picture uploaded');
        } else {
          showToast('Profile picture uploaded', 'success');
        }
      } catch (err) {
        console.error('Avatar upload failed', err);
        showToast('Failed to upload avatar', 'error');
      }
    })();
  };

  const handleRemovePhoto = () => {
    setProfilePic(DEFAULT_AVATAR);
    showToast("Profile photo reverted to default.");
    // Try to inform backend (best-effort)
    (async () => {
      try {
        await updateProfile({ profilePicture: null });
      } catch (err) {
        // ignore
      }
    })();
  };

  // Checkbox toggle handler
  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Reset form to initial state on Cancel
  const handleCancel = () => {
    setFullname('Ahmed Khan');
    setEmail('ahmed.khan@example.com');
    setPhone('');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setNotifications({
      tenantActivity: true,
      payments: true,
      agreementExpiry: true,
      ticketUpdates: true,
      inspectionUpdates: true,
      emailNotifications: true,
      smsNotifications: true,
    });
    setLanguage('English');
    setTimezone('Auto Detect');
    showToast("Changes discarded. Form reset to default values.", "info");
  };

  // Save changes handler
  const handleSaveChanges = (e) => {
    e.preventDefault();

    // Validations
    if (!fullname.trim()) {
      showToast("Please enter your full name.", "error");
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      showToast("Please enter a valid email address.", "error");
      return;
    }

    if (currentPassword || newPassword || confirmPassword) {
      if (!currentPassword) {
        showToast("Please enter your current password to make changes.", "error");
        return;
      }
      if (newPassword.length < 6) {
        showToast("New password must be at least 6 characters.", "error");
        return;
      }
      if (newPassword !== confirmPassword) {
        showToast("New password and confirm password do not match.", "error");
        return;
      }
    }

    const save = async () => {
      setIsSaving(true);
      try {
        // Update basic profile
        await updateProfile({
          fullName: fullname,
          email,
          phoneNumber: phone,
        });

        // Change password if requested
        if (currentPassword || newPassword || confirmPassword) {
          await changePassword({
            currentPassword,
            newPassword,
            confirmPassword,
          });
          showToast('Password updated successfully');
        }

        // Update notification preferences (map local keys to API keys)
        const prefsPayload = {
          tenantActivityAlerts: !!notifications.tenantActivity,
          paymentNotifications: !!notifications.payments,
          agreementExpiryAlerts: !!notifications.agreementExpiry,
          ticketUpdates: !!notifications.ticketUpdates,
          inspectionUpdates: !!notifications.inspectionUpdates,
          emailNotifications: !!notifications.emailNotifications,
          smsNotifications: !!notifications.smsNotifications,
        };
        await updateNotificationPreferences(prefsPayload);

        showToast('Settings and profile updated successfully!');
        setTopBar({
          title: 'Settings',
          profileName: fullname,
          profileAvatar: profilePic,
        });

        // Reset password fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } catch (err) {
        console.error('Save failed', err);
        showToast(err.message || 'Failed to save changes', 'error');
      } finally {
        setIsSaving(false);
      }
    };

    save();
  };

  // Confirm logout
  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    try {
      await logoutApi();
      dispatch(clearAuthState());
      setShowLogoutModal(false);
      navigate('/auth', { replace: true });
    } catch (err) {
      console.error('Owner logout failed', err);
      dispatch(clearAuthState());
      setShowLogoutModal(false);
      navigate('/auth', { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Confirm delete account
  const handleDeleteConfirm = () => {
    if (!deleteConfirmPassword) {
      showToast("Please enter your password to confirm account deletion.", "error");
      return;
    }
    if (!deleteCheckbox) {
      showToast("Please check the confirmation box to proceed.", "error");
      return;
    }

    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setShowDeleteModal(false);
      showToast("Account deleted successfully.", "error");
      navigate('/auth');
    }, 2000);
  };

  return (
    <div
      className="p-4 md:p-8 space-y-6 mx-auto bg-[#F5F6FA] min-h-screen relative font-sans text-gray-800"
      style={{ maxWidth: '900px' }}
    >

      {/* Toast Alert popup */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[999] flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border transition-all duration-300 transform translate-y-0 scale-100 animate-bounce
          ${toast.type === 'success' ? 'bg-[#EBFDF5] text-[#10B981] border-[#A7F3D0]' :
            toast.type === 'error' ? 'bg-[#FFF5F5] text-[#EF4444] border-[#FEE2E2]' :
              'bg-blue-50 text-blue-700 border-blue-200'}`}>
          {toast.type === 'success' ? <MdCheckCircle size={22} /> : <MdError size={22} />}
          <span className="text-[13.5px] font-bold">{toast.message}</span>
        </div>
      )}

      {/* Main Settings Header */}
      <div className="space-y-1.5 pb-2">
        <h2 className="text-[28px] font-extrabold text-[#112338] leading-tight tracking-tight">
          Settings
        </h2>
        <p className="text-gray-500 text-[13.5px] font-medium leading-relaxed">
          Manage your profile information, account preferences, security settings, and platform access from one place.
        </p>
      </div>

      <form onSubmit={handleSaveChanges} className="space-y-6">

        {/* SECTION 1: PROFILE DETAILS */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.01)] space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <div className="w-8 h-8 rounded-lg bg-[#B68B39]/10 flex items-center justify-center text-[#B68B39]">
              <MdPerson size={20} />
            </div>
            <h3 className="text-[16px] font-bold text-[#112338] tracking-tight">Profile Details</h3>
          </div>

          {/* Profile Picture Uploader */}
          <div className="space-y-3">
            <label className="text-[12.5px] font-bold text-gray-500 uppercase tracking-wider block">
              Profile Picture
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="relative group shrink-0">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-gray-100 shadow-inner"
                />
                <button
                  type="button"
                  onClick={handleUploadClick}
                  className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MdCloudUpload size={20} className="text-white" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={handleUploadClick}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#B68B39] text-white text-[12.5px] font-bold hover:bg-[#a0762d] active:scale-[0.98] transition-all"
                >
                  <MdCloudUpload size={16} /> Upload Photo
                </button>
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-gray-500 text-[12.5px] font-bold hover:bg-gray-50 hover:text-gray-700 active:scale-[0.98] transition-all"
                >
                  <MdDelete size={16} /> Remove Photo
                </button>
              </div>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-[12.5px] font-bold text-[#112338]">Fullname</label>
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Ahmed Khan"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[13.5px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#B68B39] focus:ring-1 focus:ring-[#B68B39] transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[12.5px] font-bold text-[#112338]">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ahmed.khan@example.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[13.5px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#B68B39] focus:ring-1 focus:ring-[#B68B39] transition-all"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-[12.5px] font-bold text-[#112338]">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="plz add your phone number"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[13.5px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#B68B39] focus:ring-1 focus:ring-[#B68B39] transition-all"
              />
            </div>
          </div>

        </div>

        {/* SECTION 2: SECURITY SETTINGS */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.01)] space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <div className="w-8 h-8 rounded-lg bg-[#B68B39]/10 flex items-center justify-center text-[#B68B39]">
              <MdLock size={20} />
            </div>
            <h3 className="text-[16px] font-bold text-[#112338] tracking-tight">Security Settings</h3>
          </div>

          <div className="space-y-4">
            <span className="text-[13.5px] font-bold text-[#112338] block">Change Password</span>

            {/* Current Password */}
            <div className="space-y-1.5">
              <label className="text-[12.5px] font-bold text-gray-500">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrentPass ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full border border-gray-200 rounded-xl pl-4 pr-11 py-3 text-[13.5px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#B68B39] focus:ring-1 focus:ring-[#B68B39] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPass ? <MdVisibilityOff size={19} /> : <MdVisibility size={19} />}
                </button>
              </div>
            </div>

            {/* New Passwords (2 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[12.5px] font-bold text-gray-500">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPass ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full border border-gray-200 rounded-xl pl-4 pr-11 py-3 text-[13.5px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#B68B39] focus:ring-1 focus:ring-[#B68B39] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPass ? <MdVisibilityOff size={19} /> : <MdVisibility size={19} />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[12.5px] font-bold text-gray-500">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full border border-gray-200 rounded-xl pl-4 pr-11 py-3 text-[13.5px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#B68B39] focus:ring-1 focus:ring-[#B68B39] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPass ? <MdVisibilityOff size={19} /> : <MdVisibility size={19} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 3: NOTIFICATION PREFERENCES */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.01)] space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <div className="w-8 h-8 rounded-lg bg-[#B68B39]/10 flex items-center justify-center text-[#B68B39]">
              <MdNotifications size={20} />
            </div>
            <h3 className="text-[16px] font-bold text-[#112338] tracking-tight">Notification Preferences</h3>
          </div>

          <div className="divide-y divide-gray-100">
            {/* Preference rows */}
            {[
              { id: 'tenantActivity', title: 'Tenant Activity Alerts' },
              { id: 'payments', title: 'Payment Notifications' },
              { id: 'agreementExpiry', title: 'Agreement Expiry Alerts' },
              { id: 'ticketUpdates', title: 'Ticket Updates' },
              { id: 'inspectionUpdates', title: 'Inspector Updates' },
              { id: 'emailNotifications', title: 'Email Notifications' },
              { id: 'smsNotifications', title: 'SMS Notifications' }
            ].map((pref) => (
              <div
                key={pref.id}
                onClick={() => toggleNotification(pref.id)}
                className="flex items-center justify-between py-4 cursor-pointer hover:bg-gray-50/50 transition-colors px-1 select-none"
              >
                <span className="text-[13.5px] font-semibold text-gray-700">{pref.title}</span>
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={notifications[pref.id]}
                    onChange={() => { }} // handled by row click
                    className="sr-only"
                  />
                  <div
                    className={`rounded-md flex items-center justify-center border transition-all duration-200
                      ${notifications[pref.id]
                        ? 'bg-[#B68B39] border-[#B68B39] text-white shadow-sm shadow-[#B68B39]/20'
                        : 'border-gray-300 bg-white'}`}
                    style={{ width: '22px', height: '22px' }}
                  >
                    {notifications[pref.id] && <MdCheck size={15} strokeWidth={1.5} />}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* SECTION 4: REGIONAL SETTINGS */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.01)] space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <div className="w-8 h-8 rounded-lg bg-[#B68B39]/10 flex items-center justify-center text-[#B68B39]">
              <MdLanguage size={20} />
            </div>
            <h3 className="text-[16px] font-bold text-[#112338] tracking-tight">Regional Settings</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5 relative">
              <label className="text-[12.5px] font-bold text-[#112338]">Language Selection</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white text-[13.5px] text-gray-700 focus:outline-none focus:border-[#B68B39] appearance-none cursor-pointer"
              >
                <option>English</option>
                <option>Urdu</option>
                <option>Arabic</option>
                <option>Spanish</option>
              </select>
              <div className="absolute right-4 bottom-3.5 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="space-y-1.5 relative">
              <label className="text-[12.5px] font-bold text-[#112338]">Time Zone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white text-[13.5px] text-gray-700 focus:outline-none focus:border-[#B68B39] appearance-none cursor-pointer"
              >
                <option>Auto Detect</option>
                <option>(GMT+05:00) Pakistan Standard Time</option>
                <option>(GMT+00:00) Greenwich Mean Time</option>
                <option>(GMT-05:00) Eastern Standard Time</option>
              </select>
              <div className="absolute right-4 bottom-3.5 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 5: ACCOUNT MANAGEMENT */}
        <div className="bg-[#FFF8F8] border border-[#FEE2E2] rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-[#FEE2E2] pb-4">
            <div className="w-8 h-8 rounded-lg bg-[#EF4444]/10 flex items-center justify-center text-[#EF4444]">
              <MdReportProblem size={20} />
            </div>
            <h3 className="text-[16px] font-bold text-[#EF4444] tracking-tight">Account Management</h3>
          </div>

          <div className="bg-white rounded-xl border border-[#FEE2E2] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 text-left">
              <span className="text-[14px] font-bold text-[#EF4444] block">Delete Account</span>
              <p className="text-gray-500 text-[12.5px] font-medium leading-relaxed">
                Permanently remove account and data.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="px-5 py-2.5 rounded-lg bg-[#EF4444] text-white text-[13px] font-bold hover:bg-[#DC2626] active:scale-[0.98] transition-all text-center shrink-0"
            >
              Delete
            </button>
          </div>

        </div>

        {/* BOTTOM ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-gray-200/60">
          <button
            type="submit"
            disabled={isSaving}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#B68B39] text-white text-[13.5px] font-bold shadow-lg shadow-[#B68B39]/20 hover:bg-[#a0762d] active:scale-[0.98] transition-all disabled:opacity-75"
          >
            {isSaving ? (
              <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <MdCheck size={18} />
            )}
            Save Changes
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="w-full sm:w-auto px-7 py-3 rounded-xl border border-gray-200 bg-white text-gray-500 text-[13.5px] font-bold hover:bg-gray-50 active:scale-[0.98] transition-all text-center"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => setShowLogoutModal(true)}
            className="w-full sm:w-auto sm:ml-auto flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl border border-gray-200 bg-white text-gray-500 hover:text-gray-700 text-[13.5px] font-bold hover:bg-gray-50 active:scale-[0.98] transition-all"
          >
            <MdExitToApp size={18} /> Logout Account
          </button>
        </div>

      </form>

      {/* MODAL 1: LOGOUT MODAL OVERLAY */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md transition-all duration-300 p-4"
          style={{ zIndex: 9999 }}
        >
          <div
            className="bg-white rounded-3xl p-6 md:p-8 w-full shadow-2xl border border-gray-50 animate-in fade-in zoom-in duration-200 relative overflow-hidden mx-4"
            style={{ maxWidth: '420px' }}
          >

            {/* Close Cross icon */}
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute right-4 top-4 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all"
            >
              <MdClose size={20} />
            </button>

            <div className="flex flex-col items-center text-center space-y-4 pt-2">

              {/* Yellowish Circle Icon */}
              <div className="w-14 h-14 rounded-full bg-[#FCF8EC] flex items-center justify-center text-[#B68B39] border border-[#F6EED4]">
                <MdExitToApp size={28} />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-black text-[#112338]">Logout Account</h3>
              <p className="text-gray-500 text-[13.5px] leading-relaxed px-1">
                Are you sure you want to logout from your account? You will need to login again to access your dashboard and rental management features.
              </p>

              {/* Key warning tip box */}
              <div className="w-full bg-[#EBF6FC] border border-[#CFE7F7] rounded-xl p-3.5 flex items-center gap-3 text-left">
                <div className="text-[#3B82F6] shrink-0">
                  <MdKey size={22} className="rotate-45" />
                </div>
                <p className="text-[#3B82F6] text-[12.5px] font-bold leading-normal">
                  Your current session will be securely ended.
                </p>
              </div>

              {/* Buttons */}
              <div className="w-full pt-2 flex flex-col gap-2.5">
                <button
                  onClick={handleLogoutConfirm}
                  disabled={isLoggingOut}
                  className="w-full py-3 rounded-xl bg-[#B68B39] text-white text-[13.5px] font-bold shadow-lg shadow-[#B68B39]/20 hover:bg-[#a0762d] active:scale-[0.98] transition-all disabled:opacity-75 flex items-center justify-center"
                >
                  {isLoggingOut ? (
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Logout"
                  )}
                </button>
                <button
                  onClick={() => setShowLogoutModal(false)}
                  disabled={isLoggingOut}
                  className="w-full py-3 rounded-xl border border-gray-200 text-gray-500 text-[13.5px] font-bold hover:bg-gray-50 active:scale-[0.98] transition-all"
                >
                  Cancel
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: DELETE ACCOUNT (DANGER ZONE) MODAL OVERLAY */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/65 backdrop-blur-md transition-all duration-300 p-4"
          style={{ zIndex: 9999 }}
        >
          <div
            className="bg-white rounded-3xl w-full shadow-2xl border border-red-100 animate-in fade-in zoom-in duration-200 relative overflow-hidden mx-4"
            style={{ maxWidth: '460px' }}
          >

            {/* Red header: "DANGER ZONE" */}
            <div className="bg-[#FFF5F5] border-b border-[#FEE2E2] px-6 py-4 flex items-center justify-between text-red-600">
              <div className="flex items-center gap-2">
                <MdWarning size={18} className="text-red-500" />
                <span className="text-[12px] font-bold uppercase tracking-widest">DANGER ZONE</span>
              </div>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmPassword('');
                  setDeleteCheckbox(false);
                }}
                className="p-1 rounded-full text-red-400 hover:text-red-600 hover:bg-red-50 transition-all"
              >
                <MdClose size={18} />
              </button>
            </div>

            <div className="p-6 md:p-8 flex flex-col items-center text-center space-y-5">

              {/* Red Trash Icon */}
              <div className="w-14 h-14 rounded-full bg-[#FFF5F5] flex items-center justify-center text-[#EF4444] border border-[#FEE2E2]">
                <MdDelete size={28} />
              </div>

              {/* Title & Info */}
              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-[#112338]">Delete Account Permanently</h3>
                <div className="flex items-center justify-center gap-1.5 text-[#EF4444]">
                  <MdError size={16} />
                  <span className="text-[12.5px] font-bold">This action is permanent and cannot be undone.</span>
                </div>
              </div>

              {/* Assets Grid */}
              <div className="w-full grid grid-cols-2 gap-2 text-left pt-1">
                {[
                  'Profile info', 'Property records',
                  'Agreements', 'Payment history',
                  'Tenant records', 'Notifications'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-[12.5px] font-semibold text-gray-500">
                    <span className="text-[#EF4444] font-bold text-[11px]">✕</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Confirm Password Verification */}
              <div className="w-full space-y-1.5 text-left">
                <label className="text-[12px] font-bold text-gray-500">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showDeletePass ? "text" : "password"}
                    value={deleteConfirmPassword}
                    onChange={(e) => setDeleteConfirmPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full border border-gray-200 rounded-xl pl-4 pr-11 py-3 text-[13.5px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowDeletePass(!showDeletePass)}
                    className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showDeletePass ? <MdVisibilityOff size={19} /> : <MdVisibility size={19} />}
                  </button>
                </div>
              </div>

              {/* Confirmation Checkbox */}
              <div
                onClick={() => setDeleteCheckbox(!deleteCheckbox)}
                className="w-full flex items-start gap-3 text-left cursor-pointer select-none py-1"
              >
                <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border shrink-0 transition-all duration-200
                  ${deleteCheckbox
                    ? 'bg-[#EF4444] border-[#EF4444] text-white shadow-sm shadow-red-100'
                    : 'border-gray-300 bg-white'}`}>
                  {deleteCheckbox && <MdCheck size={14} strokeWidth={2} />}
                </div>
                <span className="text-gray-500 text-[12.5px] font-semibold leading-relaxed">
                  I understand that this action is permanent and my data cannot be recovered.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="w-full pt-1 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting || !deleteCheckbox || !deleteConfirmPassword}
                  className={`w-full py-3 rounded-xl text-white text-[13.5px] font-bold transition-all flex items-center justify-center
                    ${(!deleteCheckbox || !deleteConfirmPassword)
                      ? 'bg-[#FDA4AF] cursor-not-allowed opacity-80'
                      : 'bg-[#EF4444] hover:bg-[#DC2626] active:scale-[0.98] shadow-lg shadow-red-100'}`}
                >
                  {isDeleting ? (
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    "PERMANENTLY DELETE ACCOUNT"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteConfirmPassword('');
                    setDeleteCheckbox(false);
                  }}
                  disabled={isDeleting}
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

export default OwnerSettings;
