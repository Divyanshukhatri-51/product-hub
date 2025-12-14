import React from 'react';
import { IoPersonCircleOutline } from 'react-icons/io5';

const Header = ({ user, title }) => {
  return (
    <header className="w-[92%] md:w-[75%] lg:w-[81%] bg-white shadow-sm border-b border-gray-200 h-16 fixed top-0 md:left-64 right-0 z-10">
      <div className="h-full px-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        
        <div className="flex flex-wrap items-center gap-3">
          <IoPersonCircleOutline size={32} className="text-gray-600" />
          <div>
            <p className="text-sm font-medium text-gray-800">{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;