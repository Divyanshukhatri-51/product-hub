import React, { useState } from 'react';
import Input from '../Common/Input';
import Button from '../Common/Button';
import { validateEmail } from '../../utils/validation';

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(email);
    } catch (err) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
      <div className="w-[50%] p-5">
        <img src="/login-side.png" alt="prods-login" className='h-132 rounded-2xl'/>
      </div>
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full md:w-[50%] max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="Logo" className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Enter your email to receive OTP</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            error={error}
            required
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Sending OTP...' : 'Send OTP'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>We'll send a 6-digit code to your email</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;