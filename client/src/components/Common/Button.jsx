import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  type = 'button',
  disabled = false,
  className = '',
  fullWidth = false
}) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center';
  
  const variants = {
    primary: 'bg-indigo-500 text-white hover:bg-indigo-700 focus:ring-primary active:transform active:scale-95',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 active:transform active:scale-95',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 active:transform active:scale-95',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary active:transform active:scale-95'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;