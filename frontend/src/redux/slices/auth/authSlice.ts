import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signUp, signIn, signOut, refreshToken } from '../../../api/authApi';
import { extractErrorMessage } from '../../utilities/errorUtils';
import { AuthError, AuthResponse, AuthState, LoginCredentials, RegisterData } from './authTypes';

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

// Async thunk for user signup
export const signup = createAsyncThunk<
  AuthResponse, // Return type of the payload creator
  RegisterData, // Type of the argument to the payload creator
  { rejectValue: AuthError } // Extra options to pass the error shape
>(
  'auth/signup',
  async (userData, thunkAPI) => {
    try {
      const data = await signUp(userData); // Assume signUp is defined elsewhere
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error)); // Handle errors with specific shape
    }
  }
);

// Async thunk for user signin
export const signin = createAsyncThunk<
  AuthResponse,
  LoginCredentials,
  { rejectValue: AuthError }
>(
  'auth/signin',
  async (credentials, thunkAPI) => {
    try {
      const data = await signIn(credentials); // Assume signIn is defined elsewhere
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Async thunk for user signout
export const signout = createAsyncThunk<void>(
  'auth/signout',
  async () => {
    await signOut(); // Assume signOut is defined elsewhere
  }
);


// Async thunk for refreshing the token
export const refreshAuthToken = createAsyncThunk<
  AuthResponse,
  void,
  { rejectValue: AuthError }
>(
  'auth/refreshAuthToken',
  async (_, thunkAPI) => {
    try {
      const data = await refreshToken(); // Assume refreshToken is defined elsewhere
      return data;
    } catch (error) {
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
        state.error = action.payload as AuthError;
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
        state.error = action.payload as AuthError;
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
        state.error = action.payload as AuthError;
      });
  },
});

export default authSlice.reducer;