import React from 'react';
import { MdMenu, MdSearch, MdNotifications, MdKeyboardArrowDown } from 'react-icons/md';
import { useTopBar } from '../../context/TopBarContext';
const OwnerTopBar = ({ onMenuOpen }) => {
  const { topBarConfig } = useTopBar();

  // Dynamic context configs with fallbacks to preserve default dashboard views
  const title = topBarConfig?.title || "Dashboard";
  const profileName = topBarConfig?.profileName || "Samra";
  const profileAvatar = topBarConfig?.profileAvatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80";

  return (
    <header className="flex items-center justify-between bg-white h-[72px] px-6 border-b border-gray-100/80 sticky top-0 z-30 select-none">
      {/* Left: Mobile menu & Dynamic Title matching design specs */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
          onClick={onMenuOpen}
        >
          <MdMenu size={24} />
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-[#112338] tracking-tight transition-all duration-300">
          {title}
        </h1>
      </div>

      {/* Center: Search properties, tenants... */}
      <div className="flex-1 max-w-md mx-6 hidden md:block">
        <div className="relative">
          <input
            type="text"
            placeholder="Search properties, tenants..."
            className="w-full rounded-full bg-[#F2F4F7] text-sm text-gray-800 placeholder-gray-400 pl-11 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#B68B39] transition-all"
          />
          <MdSearch className="absolute left-4 top-3 text-gray-400" size={19} />
        </div>
      </div>

      {/* Right: Notifications & User Profile */}
      <div className="flex items-center gap-5">
        {/* Notification Bell */}
        <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-all shrink-0">
          <MdNotifications size={22} className="text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#B68B39] rounded-full border-2 border-white notif-dot" />
        </button>

        {/* User Info & Avatar */}
        <div className="flex items-center gap-3 border-l border-gray-100 pl-5">
          <img
            src={profileAvatar}
            alt={profileName}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100 shrink-0 shadow-sm"
          />
          <div className="hidden sm:flex flex-col text-left leading-none">
            <span className="text-[13.5px] font-extrabold text-[#112338]">{profileName}</span>
            <span className="text-[11px] text-gray-400 mt-1 font-semibold">Property Owner</span>
          </div>
          <MdKeyboardArrowDown size={16} className="text-gray-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
};

export default OwnerTopBar;

