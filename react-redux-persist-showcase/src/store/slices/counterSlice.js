// ============================================================
// counterSlice.js — A simple Redux Toolkit slice
// ============================================================
// A "slice" is a collection of Redux reducer logic and actions
// for a single feature of your app.
// createSlice automatically generates action creators and
// action types based on the reducer functions you provide.
// ============================================================

import { createSlice } from '@reduxjs/toolkit'

// Initial state for the counter feature
const initialState = {
  value: 0,
  history: [], // track every change for demo purposes
}

const counterSlice = createSlice({
  name: 'counter', // used as prefix for action types: "counter/increment"

  initialState,

  // Reducers — each function here becomes an action creator automatically
  reducers: {
    // Action: counter/increment
    increment: (state) => {
      state.value += 1
      state.history.push(`+1 → ${state.value}`)
    },

    // Action: counter/decrement
    decrement: (state) => {
      state.value -= 1
      state.history.push(`-1 → ${state.value}`)
    },

    // Action: counter/incrementByAmount
    // Uses "prepare" callback pattern for custom payload
    incrementByAmount: (state, action) => {
      state.value += action.payload
      state.history.push(`+${action.payload} → ${state.value}`)
    },

    // Action: counter/reset
    reset: (state) => {
      state.value = 0
      state.history = []
    },
  },
})

// Export the auto-generated action creators
export const { increment, decrement, incrementByAmount, reset } =
  counterSlice.actions

// Selector — a function to extract data from the store state
export const selectCount = (state) => state.counter.value
export const selectHistory = (state) => state.counter.history

// Export the reducer to be used in store configuration
export default counterSlice.reducer
