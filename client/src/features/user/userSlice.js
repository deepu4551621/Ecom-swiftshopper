// src/features/user/userSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: null,
    userId: null,
    userData:[],
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = action.payload.success;
      state.userId = action.payload.userId;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.userData=[];
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
