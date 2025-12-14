import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../../context/AuthContext';
import { logout as authLogout } from '../../services/authService';

const MainLayout = ({ children, title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    authLogout();
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-gray-50">
      <Sidebar onLogout={handleLogout} />
      <Header user={user} title={title} />
      <main className="md:ml-60 pt-8">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;