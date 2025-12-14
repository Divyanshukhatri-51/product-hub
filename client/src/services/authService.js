// import API from './api';
import API from "./api";

export const sendOTP = async (email) => {
  const response = await API.post('/auth/send-otp', { email });
  return response.data;
};

export const verifyOTP = async (email, otp) => {
  const response = await API.post('/auth/verify-otp', { email, otp });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};