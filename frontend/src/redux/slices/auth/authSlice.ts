import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User, LoginCredentials, LoginResponse } from './types';
import axios from 'axios';

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  status: 'idle',
  error: null
};

// Define async thunk
export const loginUser = createAsyncThunk<User, LoginCredentials, { rejectValue: string }>(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post<LoginResponse>(import.meta.env.VITE_APP_URL + '/auth/signin', credentials);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || 'Failed to login');
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
      state.status = 'idle';
      localStorage.removeItem('user');
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
      });
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
