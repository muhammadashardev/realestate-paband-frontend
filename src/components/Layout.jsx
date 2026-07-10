import React, { useEffect, memo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <main className={isHome ? 'pt-0' : 'pt-[72px] md:pt-[76px]'}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
