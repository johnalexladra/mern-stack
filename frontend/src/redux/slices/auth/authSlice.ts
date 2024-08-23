import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signUp, signIn, signOut, refreshToken } from '../../../api/authApi';
import { AuthState, LoginCredentials, RegisterData } from './types';
import { extractErrorMessage } from '../../../utilities/errorUtils';

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

// Async thunk for user signup
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData: RegisterData, thunkAPI) => {
    try {
      const data = await signUp(userData);
      return data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Async thunk for user signin
export const signin = createAsyncThunk(
  'auth/signin',
  async (credentials: LoginCredentials, thunkAPI) => {
    try {
      const data = await signIn(credentials);
      return data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Async thunk for user signout
export const signout = createAsyncThunk('auth/signout', async () => {
  await signOut();
});

// Async thunk for refreshing the token
export const refreshAuthToken = createAsyncThunk(
  'auth/refreshAuthToken',
  async (_, thunkAPI) => {
    try {
      const data = await refreshToken();
      return data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Sign Up
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Sign In
      .addCase(signin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Sign Out
      .addCase(signout.fulfilled, (state) => {
        state.user = null;
        localStorage.removeItem('token');
      })
      // Refresh Token
      .addCase(refreshAuthToken.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(refreshAuthToken.fulfilled, (state, action) => {
        state.status = 'succeeded';
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(refreshAuthToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;