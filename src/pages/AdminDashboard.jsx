import React from 'react';
import { FaUsers, FaBuilding, FaCheckCircle, FaExclamationCircle, FaBell, FaBars } from 'react-icons/fa';

const StatCard = ({ label, value, accent }) => (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-2`}>
        <div className="text-sm text-gray-400">{label}</div>
        <div className="text-2xl font-bold text-brand-text">{value}</div>
        <div className="text-xs text-gray-400 mt-1">{accent}</div>
    </div>
);

const ApprovalItem = ({ title, subtitle, avatar }) => (
    <div className="flex items-center gap-4 bg-white/60 p-3 rounded-lg border border-white/10">
        <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover border-2 border-white" />
        <div className="flex-1">
            <div className="font-medium text-sm text-brand-text">{title}</div>
            <div className="text-xs text-gray-500">{subtitle}</div>
        </div>
        <button className="px-3 py-1 bg-[#B68B39] text-white rounded text-sm">Review</button>
    </div>
);

const AdminDashboard = () => {
    const topAreas = [
        { area: 'DHA', count: 1924 },
        { area: 'Clifton', count: 1524 },
        { area: 'Gulshan', count: 1204 },
        { area: 'Nazimabad', count: 724 },
        { area: 'Bahria', count: 4 },
    ];

    return (
        <div className="min-h-screen bg-brand-light font-sans text-sm">
            <div className="flex">
                {/* Sidebar */}
                <aside className="w-72 bg-[#0f1724] text-white min-h-screen p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-full bg-[#B68B39] flex items-center justify-center font-bold">P</div>
                            <div>
                                <div className="font-bold">paband.pk</div>
                                <div className="text-xs text-gray-300">Admin</div>
                            </div>
                        </div>

                        <nav className="space-y-3 mt-6">
                            <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-white/5"> <FaUsers /> <span>Dashboard</span></div>
                            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/3"> <FaBuilding /> <span>Properties</span></div>
                            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/3"> <FaBell /> <span>Notifications</span></div>
                            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/3"> <FaExclamationCircle /> <span>Requests</span></div>
                        </nav>
                    </div>

                    <div className="text-xs text-gray-400">
                        <div className="mb-4">Support Center</div>
                        <button className="w-full px-3 py-2 rounded bg-[#B68B39] text-white">Contact Support</button>
                    </div>
                </aside>

                {/* Main content */}
                <main className="flex-1 p-10">
                    <header className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-brand-text">Welcome Back 👋</h1>
                            <div className="text-gray-500">Here's what's happening across Paband today.</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-white rounded-full p-2 shadow-sm"><FaBars /></div>
                            <div className="flex items-center gap-3">
                                <img src="https://i.pravatar.cc/100?img=12" alt="admin" className="w-10 h-10 rounded-full" />
                                <div className="text-right">
                                    <div className="font-medium">Ali</div>
                                    <div className="text-xs text-gray-500">Admin</div>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-2">
                            <div className="text-sm text-gray-400">Total Owners & Tenants</div>
                            <div className="text-2xl font-bold text-brand-text">1245</div>
                            <div className="text-xs text-gray-400 mt-1">Active</div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-2">
                            <div className="text-sm text-gray-400">Properties</div>
                            <div className="text-2xl font-bold text-brand-text">456</div>
                            <div className="text-xs text-gray-400 mt-1">Verified</div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-2">
                            <div className="text-sm text-gray-400">Verification Status</div>
                            <div className="text-2xl font-bold text-brand-text">142 Completed</div>
                            <div className="text-xs text-gray-400 mt-1">Success</div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-2">
                            <div className="text-sm text-gray-400">Disputes & Complaints</div>
                            <div className="text-2xl font-bold text-brand-text">9 Open</div>
                            <div className="text-xs text-gray-400 mt-1">Pending</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-lg mb-4">Approval Center</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-4 bg-white/60 p-3 rounded-lg border border-white/10">
                                    <img src="https://i.pravatar.cc/100?img=7" alt="avatar" className="w-10 h-10 rounded-full object-cover border-2 border-white" />
                                    <div className="flex-1">
                                        <div className="font-medium text-sm text-brand-text">Skyline Apartments</div>
                                        <div className="text-xs text-gray-500">New property pending approval</div>
                                    </div>
                                    <button className="px-3 py-1 bg-[#B68B39] text-white rounded text-sm">Review</button>
                                </div>
                                <div className="flex items-center gap-4 bg-white/60 p-3 rounded-lg border border-white/10">
                                    <img src="https://i.pravatar.cc/100?img=8" alt="avatar" className="w-10 h-10 rounded-full object-cover border-2 border-white" />
                                    <div className="flex-1">
                                        <div className="font-medium text-sm text-brand-text">Property Listing #124</div>
                                        <div className="text-xs text-gray-500">New service request for review</div>
                                    </div>
                                    <button className="px-3 py-1 bg-[#B68B39] text-white rounded text-sm">Review</button>
                                </div>
                                <div className="flex items-center gap-4 bg-white/60 p-3 rounded-lg border border-white/10">
                                    <img src="https://i.pravatar.cc/100?img=9" alt="avatar" className="w-10 h-10 rounded-full object-cover border-2 border-white" />
                                    <div className="flex-1">
                                        <div className="font-medium text-sm text-brand-text">Vendor Coordination</div>
                                        <div className="text-xs text-gray-500">Awaiting quotation confirmation</div>
                                    </div>
                                    <button className="px-3 py-1     bg-[#B68B39] text-white rounded text-sm">Review</button>
                                </div>
                                <div className="flex items-center gap-4 bg-white/60 p-3 rounded-lg border border-white/10">
                                    <img src="https://i.pravatar.cc/100?img=10" alt="avatar" className="w-10 h-10 rounded-full object-cover border-2 border-white" />
                                    <div className="flex-1">
                                        <div className="font-medium text-sm text-brand-text">Payment Verification</div>
                                        <div className="text-xs text-gray-500">Invoice ID: INV-1056</div>
                                    </div>
                                    <button className="px-3 py-1 bg-[#B68B39] text-white rounded text-sm">Review</button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#B68B39] mt-2"></div>
                                    <div>
                                        <div className="font-medium">New tenant request received</div>
                                        <div className="text-xs text-gray-500">2 hours ago</div>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-gray-300 mt-2"></div>
                                    <div>
                                        <div className="font-medium">Agreement expiring soon</div>
                                        <div className="text-xs text-gray-500">1 day left</div>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-gray-300 mt-2"></div>
                                    <div>
                                        <div className="font-medium">Payment Confirmed</div>
                                        <div className="text-xs text-gray-500">3 days ago</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Top Areas */}
                    <div className="mt-10 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg mb-6">Top Areas</h3>
                        <div className="space-y-4">
                            {topAreas.map((t) => (
                                <div key={t.area} className="flex items-center gap-4">
                                    <div className="w-28 text-sm font-medium text-gray-700">{t.area}</div>
                                    <div className="flex-1">
                                        <div className="bg-gray-100 h-6 rounded-full overflow-hidden">
                                            <div className="h-6 bg-[#B68B39] rounded-full" style={{ width: `${Math.min(100, Math.round((t.count / (topAreas[0].count || 1)) * 100))}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="w-32 text-right text-sm font-semibold">{t.count} Properties</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
