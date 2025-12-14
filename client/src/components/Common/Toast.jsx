import React, { useEffect } from 'react';
import { IoCheckmarkCircle, IoCloseCircle, IoClose } from 'react-icons/io5';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const types = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-500',
      text: 'text-green-800',
      icon: <IoCheckmarkCircle className="text-green-500 shrink-0" size={24} />
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-500',
      text: 'text-red-800',
      icon: <IoCloseCircle className="text-red-500 shrink-0" size={24} />
    }
  };

  const style = types[type];

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`${style.bg} ${style.border} border-l-4 p-4 rounded-lg shadow-lg min-w-[300px] max-w-[500px] flex items-center gap-3`}>
        {style.icon}
        <p className={`${style.text} flex-1 font-medium`}>{message}</p>
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-white shrink-0"
          aria-label="Close toast"
        >
          <IoClose size={20} />
        </button>
      </div>
    </div>
  );
};

export default Toast;