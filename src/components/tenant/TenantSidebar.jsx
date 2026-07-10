import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MdDashboard, MdFavorite, MdHome, MdCalendarToday, MdPayment,
  MdDescription, MdNotifications, MdSettings, MdConfirmationNumber,
  MdSupportAgent, MdClose, MdSearch
} from 'react-icons/md';

const navItems = [
  { label: 'Dashboard', icon: MdDashboard, path: '/tenant', exact: true },
  { label: 'Favourite Properties', icon: MdFavorite, path: '/tenant/favourites' },
  { label: 'My Rentals', icon: MdHome, path: '/tenant/rentals' },
  { label: 'Visits', icon: MdCalendarToday, path: '/tenant/visits' },
  { label: 'Payments', icon: MdPayment, path: '/tenant/payments' },
  { label: 'My Agreements', icon: MdDescription, path: '/tenant/agreements' },
];

const prefItems = [
  { label: 'Notifications', icon: MdNotifications, path: '/tenant/notifications' },
  { label: 'Settings', icon: MdSettings, path: '/tenant/settings' },
  { label: 'Tickets', icon: MdConfirmationNumber, path: '/tenant/tickets' },
];

const TenantSidebar = ({ isOpen, onClose }) => {
  const { pathname } = useLocation();

  const isActive = (path, exact) =>
    exact ? pathname === path : pathname === path || pathname.startsWith(path + '/');

  // Check if search properties is active
  const isSearchActive = pathname === '/tenant/search' || pathname.startsWith('/tenant/property/');

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`tenant-sidebar fixed top-0 left-0 h-full w-[240px] bg-black z-50 flex flex-col transition-transform duration-300 border-r border-white/5
          ${isOpen ? 'translate-x-0' : ' md:translate-x-0'}`}
      >
        {/* Logo and Brand */}
        <div className="px-5 pt-6 pb-4 flex flex-col shrink-0 relative">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 select-none">
              {/* Custom Shield Logo */}
              <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
                <svg className="w-full h-full" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="18" fill="#112338" stroke="#B68B39" strokeWidth="1.5" />
                  <path
                    d="M20 9.5L28 13.5V20.5C28 25.5 24.5 29.5 20 31C15.5 29.5 12 25.5 12 20.5V13.5L20 9.5Z"
                    fill="#1A3A60"
                    stroke="#B68B39"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M16.5 20.5L19 23L24.5 17.5"
                    stroke="white"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-extrabold text-[18px] text-white tracking-tight">
                  paband<span className="text-white font-medium">.pk</span>
                </span>
                <span className="text-[7px] font-semibold tracking-[0.08em] text-[#B68B39] mt-1 uppercase">
                  TRUSTED RENTAL ECOSYSTEM
                </span>
              </div>
            </Link>
            <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
              <MdClose size={20} />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-5 h-px bg-white/5 mb-3" />

        {/* Main Nav */}
        <nav className="px-4 flex-1 overflow-y-auto space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.path, item.exact);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-[13.5px] font-semibold transition-all duration-200 relative group border
                  ${
                    active
                      ? 'text-[#B68B39] border-[#B68B39] bg-transparent'
                      : 'text-gray-400 border-transparent hover:text-white hover:bg-white/[0.03]'
                  }`}
              >
                <item.icon
                  size={19}
                  className={active ? 'text-[#B68B39]' : 'text-gray-500 group-hover:text-gray-300'}
                />
                <span className="flex-1 leading-none">{item.label}</span>
              </Link>
            );
          })}

          {/* Search Properties - special item with highlight */}
          <Link
            to="/tenant/search"
            onClick={onClose}
            className={`flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-[13.5px] font-semibold transition-all duration-200 relative group border
              ${
                isSearchActive
                  ? 'text-black bg-[#B68B39] border-[#B68B39]'
                  : 'text-gray-400 border-transparent hover:text-white hover:bg-white/[0.03]'
              }`}
            style={isSearchActive ? {} : {}}
          >
            <MdSearch
              size={19}
              className={isSearchActive ? 'text-black' : 'text-gray-500 group-hover:text-gray-300'}
            />
            <span className="flex-1 leading-none">Search Properties</span>
          </Link>

          {/* Preference Section */}
          <div className="pt-6 pb-2 px-4">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#B68B39]/80 uppercase">
              PREFERENCE
            </span>
          </div>

          {prefItems.map((item) => {
            const active = isActive(item.path, true);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-[13.5px] font-semibold transition-all duration-200 relative group border
                  ${
                    active
                      ? 'text-[#B68B39] border-[#B68B39] bg-transparent'
                      : 'text-gray-400 border-transparent hover:text-white hover:bg-white/[0.03]'
                  }`}
              >
                <item.icon
                  size={19}
                  className={active ? 'text-[#B68B39]' : 'text-gray-500 group-hover:text-gray-300'}
                />
                <span className="flex-1 leading-none">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Support Center Card */}
        <div className="mx-4 mb-5 mt-4 rounded-xl border border-white/5 bg-[#141416] p-4 shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-[#B68B39]/10 flex items-center justify-center">
              <MdSupportAgent size={16} className="text-[#B68B39]" />
            </div>
            <span className="text-white text-[13px] font-bold">Support Center</span>
          </div>
          <p className="text-gray-400 text-[11px] leading-relaxed mb-3">
            Need help with property management?
          </p>
          <button className="w-full py-2 rounded-lg bg-[#B68B39] text-white text-[11.5px] font-bold hover:bg-[#a0762d] active:scale-[0.98] transition-all">
            Contact Support
          </button>
        </div>
      </aside>
    </>
  );
};

export default TenantSidebar;
