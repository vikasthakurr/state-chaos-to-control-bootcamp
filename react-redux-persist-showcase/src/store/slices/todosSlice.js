// ============================================================
// todosSlice.js — Demonstrates a more complex slice with CRUD
// ============================================================
// Shows how Redux Toolkit handles arrays of objects,
// and how redux-persist keeps your todo list intact
// even after closing the browser.
// ============================================================

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  nextId: 1,
}

const todosSlice = createSlice({
  name: 'todos',

  initialState,

  reducers: {
    addTodo: (state, action) => {
      state.items.push({
        id: state.nextId,
        text: action.payload,
        completed: false,
        createdAt: new Date().toISOString(),
      })
      state.nextId += 1
    },

    toggleTodo: (state, action) => {
      const todo = state.items.find((item) => item.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },

    removeTodo: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },

    clearCompleted: (state) => {
      state.items = state.items.filter((item) => !item.completed)
    },
  },
})

export const { addTodo, toggleTodo, removeTodo, clearCompleted } =
  todosSlice.actions

// Selectors
export const selectTodos = (state) => state.todos.items
export const selectActiveTodos = (state) =>
  state.todos.items.filter((item) => !item.completed)
export const selectCompletedTodos = (state) =>
  state.todos.items.filter((item) => item.completed)

export default todosSlice.reducer
