import React from 'react';
import { useLocation } from 'react-router-dom';

const DevModeIndicator = () => {
  const location = useLocation();
  const isDevelopment = import.meta.env.DEV && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  
  // Only show on login and register pages
  const shouldShow = isDevelopment && (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register');

  if (!shouldShow) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-black text-center py-1 px-4 z-50 text-sm font-medium">
      🔧 DEVELOPMENT MODE - Use any email/password to login
    </div>
  );
};

export default DevModeIndicator; 