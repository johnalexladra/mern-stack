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

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add authorization headers or modify the request config here
    // e.g., add authentication headers
    // 
    // TODO: Get the token from the store
    const token = localStorage.getItem('authToken'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the response data here, 
    // e.g., handling pagination
    return response;
  },
  (error) => {
    // Handle errors globally if needed

    // Handle token expiration, etc.
    if (error.response && error.response.status === 401) {
      // For example, you can dispatch a logout action here
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;