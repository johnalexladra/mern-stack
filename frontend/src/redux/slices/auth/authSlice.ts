import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, AuthState, LoginCredentials, LoginResponse, RefreshResponse } from '../auth/types';
import axios from 'axios';

// Initialize state from localStorage
const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  status: 'idle',
  error: null,
  accessToken: localStorage.getItem('accessToken') || null,
};

// Async thunk for login
export const loginUser = createAsyncThunk<User, LoginCredentials, { rejectValue: string }>(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post<LoginResponse>(import.meta.env.VITE_API_URL + '/auth/signin', credentials);
      const { user, accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      return user; // Return only the user
      // return response.data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || 'Failed to login');
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

// Async thunk for token refresh
export const refreshToken = createAsyncThunk<User, void, { rejectValue: string }>(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post<RefreshResponse>('/api/refresh', {
        refreshToken: localStorage.getItem('refreshToken')
      });
      localStorage.setItem('accessToken', response.data.accessToken);
      return response.data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || 'Failed to refresh token');
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
      })
      .addCase(refreshToken.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.error = action.payload || 'Token refresh failed';
        // TODO: Optionally redirect to login
      });
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
