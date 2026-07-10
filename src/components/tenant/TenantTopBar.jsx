import React, { useEffect, useState } from 'react';
import { MdMenu, MdSearch, MdNotifications, MdKeyboardArrowDown, MdFavoriteBorder } from 'react-icons/md';
import { useTopBar } from '../../context/TopBarContext';
import { getCurrentUser } from '../../utils/api';
import { Link } from 'react-router-dom';

const TenantTopBar = ({ onMenuOpen }) => {
  const { topBarConfig } = useTopBar();

  const title = topBarConfig?.title || "Dashboard";
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = getCurrentUser();
    if (u) setUser(u);
    const onUserUpdated = () => {
      const fresh = getCurrentUser();
      setUser(fresh);
    };
    window.addEventListener('user-updated', onUserUpdated);
    return () => window.removeEventListener('user-updated', onUserUpdated);
  }, []);

  return (
    <header className="flex items-center justify-between bg-white h-[72px] px-6 border-b border-gray-100/80 sticky top-0 z-30 select-none">
      {/* Left: Mobile menu & Title */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
          onClick={onMenuOpen}
        >
          <MdMenu size={24} />
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-[#112338] tracking-tight">
          {title}
        </h1>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md mx-6 hidden md:block">
        <div className="relative">
          <input
            type="text"
            placeholder="Search properties, agreements..."
            className="w-full rounded-full bg-[#F2F4F7] text-sm text-gray-800 placeholder-gray-400 pl-11 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#B68B39] transition-all"
          />
          <MdSearch className="absolute left-4 top-3 text-gray-400" size={19} />
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-4">
        {/* Heart/Favorites */}
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-all shrink-0 hidden sm:flex">
          <MdFavoriteBorder size={22} className="text-gray-500" />
        </button>

        {/* Notification Bell */}
        <Link to="/tenant/notifications">
          <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-all shrink-0">
            <MdNotifications size={22} className="text-gray-500" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#B68B39] rounded-full border-2 border-white tenant-notif-dot" />
          </button>
        </Link>

        {/* User Info & Avatar */}
        <div className="flex items-center gap-3 border-l border-gray-100 pl-4">
          <img
            src={
              (user && (user.avatar || user.avatarUrl || user.profilePicture)) ||
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80'
            }
            alt={user?.fullName || user?.name || 'Samra'}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100 shrink-0 shadow-sm"
          />
          <div className="hidden sm:flex flex-col text-left leading-none">
            <span className="text-[13.5px] font-extrabold text-[#112338]">{user?.fullName || user?.name || 'Samra'}</span>
            <span className="text-[11px] text-gray-400 mt-1 font-semibold">Tenant</span>
          </div>
          <MdKeyboardArrowDown size={16} className="text-gray-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
};

export default TenantTopBar;
