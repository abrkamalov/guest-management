import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AddGuestPage from './pages/AddGuestPage/AddGuestPage';
import GuestDetailPage from './pages/GuestDetailPage/GuestDetailPage';
import { ROUTES } from './utils/constants';
import Sidebar from './components/Sidebar/Sidebar';
import styles from './App.module.css';

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className={styles.app}>
      <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} isMobile={isMobile} />
      <main className={`${styles.main} ${isMobile ? styles.fullWidth : ''}`}>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.ADD_GUEST} element={<AddGuestPage />} />
          <Route path={ROUTES.GUEST_DETAIL} element={<GuestDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
