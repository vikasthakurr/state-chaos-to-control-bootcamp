// ============================================================
// userSlice.js — Demonstrates persisting user preferences
// ============================================================
// This slice stores user info and theme preference.
// Combined with redux-persist, these values survive page
// refreshes and browser restarts (stored in localStorage).
// ============================================================

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  theme: 'system', // 'light' | 'dark' | 'system'
  isLoggedIn: false,
}

const userSlice = createSlice({
  name: 'user',

  initialState,

  reducers: {
    // Simulate a login — in real apps this would come from an API
    login: (state, action) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.isLoggedIn = true
    },

    // Clear user data on logout
    logout: (state) => {
      state.name = ''
      state.email = ''
      state.isLoggedIn = false
    },

    // Toggle between themes
    setTheme: (state, action) => {
      state.theme = action.payload // 'light' | 'dark' | 'system'
    },
  },
})

// Export actions
export const { login, logout, setTheme } = userSlice.actions

// Selectors
export const selectUser = (state) => state.user
export const selectTheme = (state) => state.user.theme
export const selectIsLoggedIn = (state) => state.user.isLoggedIn

export default userSlice.reducer
