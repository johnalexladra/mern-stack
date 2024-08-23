import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  withCredentials: true,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request and response interceptors for handling tokens
axiosInstance.interceptors.request.use(
  config => {
    // TODO: Get the token from the store
    const token = localStorage.getItem('authToken'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Handle token expiration, etc.
    if (error.response && error.response.status === 401) {
      // For example, you can dispatch a logout action here
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;