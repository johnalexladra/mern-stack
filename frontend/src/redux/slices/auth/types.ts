// src/features/auth/types.ts

// Define the structure of the user object
export interface User {
  username: string;
  // Add additional user fields if necessary
}

// Define the structure of the authentication state
export interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Define the structure of login credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Define the structure of the login response from the API
export interface LoginResponse {
  user: User;
  accessToken: string; // Add additional fields if necessary
  refreshToken?: string; // Optional, if using refresh tokens
}

// Define the structure of the response for token refresh
export interface RefreshResponse {
  user: User;
  accessToken: string; // New access token
  refreshToken?: string; // Optional, if refresh token is updated
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
}

export interface RegisterResponse {
  email: string;
  token: string;
}

export interface ErrorResponse {
  message: string;
}