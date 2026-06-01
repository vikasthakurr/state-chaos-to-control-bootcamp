// ============================================================
// store/index.js — Redux Store Configuration with Persist
// ============================================================
//
// This is where everything comes together:
// 1. We combine all slices into a root reducer
// 2. We wrap it with persistReducer (redux-persist)
// 3. We create the store with configureStore (Redux Toolkit)
// 4. We create a persistor to control rehydration
//
// KEY CONCEPTS:
// - configureStore: sets up the store with good defaults
//   (Redux DevTools, thunk middleware, etc.)
// - persistReducer: wraps your reducer to auto-save state
// - persistStore: creates the persistor that manages
//   saving/loading state from storage
// ============================================================

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
// redux-persist/lib/storage can have ESM/CJS interop issues with Vite.
// We create a simple storage engine directly using the localStorage API.
const storage = {
  getItem: (key) => {
    return Promise.resolve(localStorage.getItem(key))
  },
  setItem: (key, value) => {
    return Promise.resolve(localStorage.setItem(key, value))
  },
  removeItem: (key) => {
    return Promise.resolve(localStorage.removeItem(key))
  },
}

// Import all slice reducers
import counterReducer from './slices/counterSlice'
import userReducer from './slices/userSlice'
import todosReducer from './slices/todosSlice'

// ─── Step 1: Combine all reducers ───────────────────────────
const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  todos: todosReducer,
})

// ─── Step 2: Configure persistence ─────────────────────────
const persistConfig = {
  key: 'root', // key in localStorage
  version: 1, // schema version (useful for migrations)
  storage, // storage engine (localStorage)

  // OPTIONAL: whitelist — only persist these slices
  // whitelist: ['user', 'todos'],

  // OPTIONAL: blacklist — persist everything EXCEPT these
  // blacklist: ['counter'],
}

// Wrap the root reducer with persist capabilities
const persistedReducer = persistReducer(persistConfig, rootReducer)

// ─── Step 3: Create the Redux store ────────────────────────
export const store = configureStore({
  reducer: persistedReducer,

  // Redux-persist dispatches special actions (FLUSH, REHYDRATE, etc.)
  // We need to tell the serializable check middleware to ignore them
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// ─── Step 4: Create the persistor ──────────────────────────
// The persistor is used by <PersistGate> to delay rendering
// until the persisted state has been retrieved and saved to redux
export const persistor = persistStore(store)
