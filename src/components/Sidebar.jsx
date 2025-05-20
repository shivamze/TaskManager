import React from 'react';
import Lottie from 'lottie-react';
import animation from '../assets/animation/Animation - sign.json';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Sidebar({ isOpen, setIsOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/home');
  };

  return (
    <div
      className={`
        bg-blue-800 text-white fixed top-0 left-0 h-full w-72 z-40 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:block
      `}
    >
      <div className="bg-amber-400 flex items-center justify-between py-2 px-3">
        <div className="flex items-center gap-2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv8a2YftkCyxt7LPQ2I-tc5tQgydVpHWsFPA&s"
            alt="logo"
            className="w-8 h-8 rounded"
          />
          <h1 className="font-extrabold text-2xl">TASKZEN</h1>
        </div>
        <button
          className="md:hidden text-black text-xl"
          onClick={() => setIsOpen(false)}
        >
          ✖
        </button>
      </div>

      <div className="flex flex-col items-center flex-1 py-6 px-4">
        {!user ? (
          <>
            <Lottie animationData={animation} loop={true} className="w-40 h-40 mt-15 mb-3" />
            <button
              onClick={() => {
                navigate('/signin');
                setIsOpen(false);
              }}
              className="bg-white text-blue-800 px-5 py-2 font-bold cursor-pointer hover:bg-blue-100 transition"
            >
              Sign In
            </button>
          </>
        ) : (
          <div className="w-full flex flex-col gap-4">
            <button onClick={() => { navigate('/'); setIsOpen(false); }} className="sidebar-btn">📋 Todo</button>
            <button onClick={() => { navigate('/notes'); setIsOpen(false); }} className="sidebar-btn">📝 Notes</button>
            <button onClick={() => { navigate('/bookmarks'); setIsOpen(false); }} className="sidebar-btn">🔖 Bookmarks</button>
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="sidebar-btn bg-red-600 hover:bg-red-700 text-white"
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
