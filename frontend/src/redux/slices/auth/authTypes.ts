// Define the shape of auth slice state
export interface AuthState {
  user: {
    id: string;
    username: string;
    email: string;
  } | null;
  token?: string | null;
  refreshToken?: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: AuthError | null;
}

// Include the auth state in the root state
export interface RootState {
  auth: AuthState;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Define response and error types
export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export interface AuthError {
  message: string;
}