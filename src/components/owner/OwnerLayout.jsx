import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import OwnerSidebar from './OwnerSidebar';
import OwnerTopBar from './OwnerTopBar';
import { TopBarProvider } from '../../context/TopBarContext';
import '../../styles/owner-dashboard.css';

const OwnerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <TopBarProvider>
      <div className="flex h-screen bg-[#F5F6FA] overflow-hidden font-sans">
        <OwnerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex flex-col flex-1 md:ml-[240px] overflow-hidden">
          <OwnerTopBar onMenuOpen={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto bg-[#F5F6FA] p-0">
            <Outlet />
          </main>
        </div>
      </div>
    </TopBarProvider>
  );
};

export default OwnerLayout;
