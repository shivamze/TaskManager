import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';

const Layout = () => {
  const { loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white text-black">
        <p className="text-xl font-semibold">Checking session...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen relative">
      
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
        onClick={() => setSidebarOpen(true)}
      >
        <HiMenuAlt3 size={24} />
      </button>

      <main className="flex-1 p-4 pt-16 md:pt-4 overflow-y-auto ml-0 md:ml-7">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
