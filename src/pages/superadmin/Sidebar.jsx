import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Users, Home, Key, Wrench,
    CreditCard, MessageSquare, Settings, Headphones, Menu
} from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }) {
    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/superadmin' },
        { icon: Users, label: 'Users', path: '/superadmin/tenants' },
        { icon: Home, label: 'Properties', path: '/superadmin/properties' },
        { icon: Key, label: 'Rentals', path: '/superadmin/rentals' },
        { icon: Wrench, label: 'Service Requests', path: '/superadmin/requests' },
        { icon: CreditCard, label: 'Payments', path: '/superadmin/payments' },
    ];

    const preferenceItems = [
        { icon: MessageSquare, label: 'Support & Disputes', path: '/superadmin/support' },
        { icon: Settings, label: 'Settings', path: '/superadmin/settings' },
    ];

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 p-2 bg-[#1E1E1E] text-white rounded-md md:hidden hover:bg-[#2d2d2d]"
            >
                <Menu size={20} />
            </button>

            {/* Sidebar Container */}
            <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#111111] text-gray-400 p-4 flex flex-col justify-between
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:fixed md:h-screen
      `} style={{ overflow: 'hidden' }}>
                <div className="overflow-y-auto no-scrollbar" style={{ maxHeight: '100vh', paddingRight: '6px' }}>
                    {/* Logo Brand */}
                    <div className="flex items-center gap-2 px-2 py-4 mb-4 border-b border-zinc-800">
                        <div className="w-8 h-8 bg-gradient-to-tr from-amber-500 to-yellow-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                            P
                        </div>
                        <span className="text-white font-semibold text-lg tracking-wide">paband.pk</span>
                    </div>

                    {/* Main Menu */}
                    <nav className="space-y-1">
                        {menuItems.map((item, idx) => {
                            const isActive = item.path && (location.pathname === item.path || location.pathname.startsWith(item.path + '/'));
                            return (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        if (item.path) navigate(item.path);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-[#C58940]/10 text-[#C58940] border-l-4 border-[#C58940] rounded-l-none' : 'hover:bg-zinc-900 hover:text-white'}`}
                                >
                                    <item.icon size={18} className={isActive ? 'text-[#C58940]' : 'text-gray-400'} />
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Preferences Section */}
                    <div className="mt-8">
                        <p className="px-4 text-[10px] font-bold tracking-wider text-zinc-500 uppercase mb-2">Preference</p>
                        <nav className="space-y-1">
                            {preferenceItems.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        if (item.path) navigate(item.path);
                                        setIsOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-zinc-900 hover:text-white transition-colors"
                                >
                                    <item.icon size={18} />
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Support Card Bottom */}
                <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800/50 mt-auto">
                    <div className="flex items-start gap-2 mb-2">
                        <Headphones size={18} className="text-[#C58940] mt-0.5" />
                        <div>
                            <h4 className="text-white text-xs font-semibold">Support Center</h4>
                            <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">Need help with property management?</p>
                        </div>
                    </div>
                    <button className="w-full bg-[#C58940] hover:bg-[#b07533] text-white text-xs font-medium py-2 px-3 rounded-xl transition-colors mt-2">
                        Contact Support
                    </button>
                </div>
            </aside>
        </>
    );
}
