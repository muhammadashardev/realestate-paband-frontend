import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TenantSidebar from './TenantSidebar';
import TenantTopBar from './TenantTopBar';
import { TopBarProvider } from '../../context/TopBarContext';
import '../../styles/tenant-dashboard.css';

const TenantLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <TopBarProvider>
      <div className="flex h-screen bg-[#F5F6FA] overflow-hidden font-sans">
        <TenantSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex flex-col flex-1 md:ml-[240px] overflow-hidden">
          <TenantTopBar onMenuOpen={() => setSidebarOpen(true)} />
          <main className="tenant-main flex-1 overflow-y-auto bg-[#F5F6FA] p-0">
            <Outlet />
          </main>
        </div>
      </div>
    </TopBarProvider>
  );
};

export default TenantLayout;
