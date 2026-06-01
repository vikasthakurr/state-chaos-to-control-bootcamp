# React Redux + Redux Persist — Showcase

> **Session:** From State Chaos to Control  
> A hands-on demo showing how to manage and persist state in React applications.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `@reduxjs/toolkit` | Official Redux toolset — simplifies store setup, reducers, and actions |
| `react-redux` | React bindings for Redux — provides `useSelector`, `useDispatch`, `<Provider>` |
| `redux-persist` | Automatically saves Redux state to storage (localStorage) and rehydrates on load |

---

## 🏗️ Project Structure

```
src/
├── store/
│   ├── index.js              # Store config + persist setup
│   └── slices/
│       ├── counterSlice.js   # Simple counter (increment/decrement/reset)
│       ├── userSlice.js      # User login + theme preference
│       └── todosSlice.js     # CRUD todo list
├── components/
│   ├── Counter.jsx           # Uses useSelector + useDispatch
│   ├── UserProfile.jsx       # Login/logout with persisted session
│   ├── TodoList.jsx          # Full CRUD with persisted array
│   └── PersistDemo.jsx       # Visualizes localStorage contents
├── App.jsx                   # Main layout
├── main.jsx                  # Provider + PersistGate setup
└── App.css                   # Styles
```

---

## 🧠 Core Concepts

### 1. Redux Toolkit — The Modern Way

```js
// OLD way (too much boilerplate)
const INCREMENT = 'counter/increment'
function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case INCREMENT: return { ...state, value: state.value + 1 }
    default: return state
  }
}

// NEW way with createSlice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 }  // Immer handles immutability!
  }
})
```

### 2. Store Setup

```js
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    todos: todosReducer,
  }
})
```

### 3. Using in Components

```jsx
import { useSelector, useDispatch } from 'react-redux'
import { increment } from './store/slices/counterSlice'

function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return <button onClick={() => dispatch(increment())}>{count}</button>
}
```

### 4. Adding Redux Persist

```js
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['user'],  // only persist specific slices
  // blacklist: ['counter'], // persist everything except these
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({ reducer: persistedReducer })
const persistor = persistStore(store)
```

### 5. Wrapping the App

```jsx
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

<Provider store={store}>
  <PersistGate loading={<Loading />} persistor={persistor}>
    <App />
  </PersistGate>
</Provider>
```

---

## 🔑 Key Takeaways

1. **Redux Toolkit** eliminates boilerplate — no more action type constants, switch statements, or manual immutability.
2. **createSlice** auto-generates action creators and action types from your reducer functions.
3. **Immer** (built into RTK) lets you write "mutating" logic that actually produces immutable updates.
4. **redux-persist** saves your entire Redux state tree to localStorage automatically.
5. **PersistGate** delays rendering until state is rehydrated from storage.
6. Use **whitelist/blacklist** to control which slices get persisted.
7. The **middleware config** must ignore redux-persist's internal actions to avoid serialization warnings.

---

## 🧪 Try This

1. Increment the counter, add some todos, and login
2. **Refresh the page** — everything is still there!
3. Open DevTools → Application → Local Storage → look for `persist:root`
4. Click "Purge All Persisted State" to clear everything
5. Try the Redux DevTools browser extension to see actions in real-time

---

## 📚 Further Reading

- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [React Redux Docs](https://react-redux.js.org/)
- [Redux Persist GitHub](https://github.com/rt2zz/redux-persist)
- [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)
