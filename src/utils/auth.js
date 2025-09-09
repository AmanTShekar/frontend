// src/utils/auth.js
import store from '../redux/store';
import { logout as logoutAction } from '../redux/reducer/authSlice';

// Get current user from localStorage
export const getUser = () => {
  try {
    const auth = JSON.parse(localStorage.getItem('auth'));
    return auth?.user || null;
  } catch {
    return null;
  }
};

// Get current role ("admin" or "user")
export const getRole = () => {
  try {
    const auth = JSON.parse(localStorage.getItem('auth'));
    return auth?.userType || null;
  } catch {
    return null;
  }
};

// Logout function
export const logout = () => {
  store.dispatch(logoutAction());
  window.location.href = '/login';
};
