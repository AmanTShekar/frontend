// src/redux/reducer/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Safely parse localStorage
let storedAuth = null;
try {
  storedAuth = JSON.parse(localStorage.getItem('auth'));
} catch (err) {
  storedAuth = null;
}

const initialState = storedAuth && storedAuth.isLoggedIn
  ? storedAuth
  : { isLoggedIn: false, user: null, userType: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.userType = action.payload.userType;
      localStorage.setItem('auth', JSON.stringify(state));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.userType = null;
      localStorage.removeItem('auth');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
