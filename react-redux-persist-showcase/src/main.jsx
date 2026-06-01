// ============================================================
// main.jsx — App Entry Point with Redux Provider & PersistGate
// ============================================================
//
// TWO key wrappers are needed:
//
// 1. <Provider store={store}>
//    Makes the Redux store available to all components via
//    useSelector and useDispatch hooks.
//
// 2. <PersistGate loading={null} persistor={persistor}>
//    Delays rendering until persisted state is retrieved
//    from localStorage and loaded into Redux.
//    The `loading` prop shows a fallback while rehydrating.
//
// ============================================================

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Step 1: Provide the Redux store to the entire app */}
    <Provider store={store}>
      {/* Step 2: Wait for persisted state to be loaded */}
      <PersistGate loading={<div className="loading">Loading...</div>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
