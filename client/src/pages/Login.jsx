import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';
import OTPForm from '../components/Auth/OTPForm';
import Toast from '../components/Common/Toast';
import { sendOTP, verifyOTP } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [step, setStep] = useState('email'); // 'email' or 'otp'
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSendOTP = async (emailValue) => {
    try {
      await sendOTP(emailValue);
      setEmail(emailValue);
      setStep('otp');
      setToast({ message: 'OTP sent successfully!', type: 'success' });
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOTP = async (otp) => {
    try {
      const response = await verifyOTP(email, otp);
      login(response.user, response.token);
      setToast({ message: 'Login successful!', type: 'success' });
      setTimeout(() => navigate('/home'), 1000);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Invalid OTP');
    }
  };

  const handleResendOTP = async () => {
    try {
      await sendOTP(email);
      setToast({ message: 'OTP resent successfully!', type: 'success' });
    } catch (error) {
      setToast({ message: 'Failed to resend OTP', type: 'error' });
    }
  };

  return (
    <>
      {step === 'email' ? (
        <LoginForm onSubmit={handleSendOTP} />
      ) : (
        <OTPForm
          email={email}
          onSubmit={handleVerifyOTP}
          onResend={handleResendOTP}
        />
      )}
      
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default Login;