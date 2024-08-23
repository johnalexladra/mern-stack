import { LoginCredentials, RegisterData } from '../redux/slices/auth/types';
import axiosInstance from './axiosInstance';

// Function to handle user signin
export const signIn = async (credentials: LoginCredentials) => {
  const response = await axiosInstance.post('/auth/signin', credentials);
  return response.data;
};

// Function to handle user signup
export const signUp = async (userData: RegisterData) => {
  const response = await axiosInstance.post('/auth/signup', userData);
  return response.data;
};

// Function to handle user signout
export const signOut = async () => {
  await axiosInstance.post('/auth/signout');
};

// Function to refresh the authentication token
export const refreshToken = async () => {
  const response = await axiosInstance.post('/auth/refresh-token');
  return response.data;
};