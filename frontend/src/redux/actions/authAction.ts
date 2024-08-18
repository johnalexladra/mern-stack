import axios from 'axios';
import { Dispatch } from 'redux';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../types/actionTypes';
import { AuthActionTypes } from '../types/authTypes';

// Login action creator
export const login = (username: string, password: string) => async (dispatch: Dispatch<AuthActionTypes>) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axios.post('/api/login', { username, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token); // Store token in localStorage
    dispatch({ type: LOGIN_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

// Logout action creator
export const logout = () => (dispatch: Dispatch<AuthActionTypes>) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
};
