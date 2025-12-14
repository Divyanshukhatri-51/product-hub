import React, { useState, useRef, useEffect } from 'react';
import Button from '../Common/Button';
import { validateOTP } from '../../utils/validation';

const OTPForm = ({ email, onSubmit, onResend }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');

    if (!validateOTP(otpString)) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(otpString);
    } catch (err) {
      setError(err.message || 'Invalid OTP');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
      <div className="w-[50%] p-5">
        <img src="/login-side.png" alt="prods-login" className='h-132 rounded-2xl'/>
      </div>
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <img src="https://cdn-icons-png.flaticon.com/512/6195/6195699.png" alt="OTP" className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Enter OTP</h1>
          <p className="text-gray-600">We sent a code to</p>
          <p className="text-primary font-medium">{email}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-14 text-center text-2xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  error ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            ))}
          </div>

          {error && (
            <div className="text-center text-red-500 text-sm">{error}</div>
          )}

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={onResend}
              className="text-primary hover:text-indigo-700 font-medium text-sm"
            >
              Resend OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPForm;