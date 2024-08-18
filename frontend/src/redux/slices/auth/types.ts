// src/features/auth/types.ts

export interface User {
  // id: string;
  username: string;
  token: string;
}

export interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  username: string;
  token: string;
}
