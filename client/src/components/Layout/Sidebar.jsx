import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoHomeOutline, IoCubeOutline, IoLogOutOutline, IoMenuOutline, IoCloseOutline } from 'react-icons/io5';

const Sidebar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: '/home', icon: IoHomeOutline, label: 'Home' },
    { path: '/products', icon: IoCubeOutline, label: 'Products' }
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        {isOpen ? <IoCloseOutline size={24} /> : <IoMenuOutline size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-screen w-64 bg-linear-to-b from-indigo-600 to-indigo-800 text-white shadow-xl z-40 transition-transform duration-300 md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="Logo" className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold">ProductHub</h1>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-indigo-600 shadow-lg'
                      : 'hover:bg-indigo-700'
                  }`
                }
              >
                <item.icon size={22} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 mt-8 w-full"
          >
            <IoLogOutOutline size={22} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;