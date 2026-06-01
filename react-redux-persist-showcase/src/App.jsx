// ============================================================
// App.jsx — Main Application Component
// ============================================================
// Showcases React Redux + Redux Persist in action.
// All state is managed through Redux and automatically
// persisted to localStorage.
// ============================================================

import Counter from './components/Counter'
import TodoList from './components/TodoList'
import UserProfile from './components/UserProfile'
import PersistDemo from './components/PersistDemo'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>⚛️ React Redux + Persist</h1>
        <p className="subtitle">
          State management that survives page refreshes
        </p>
        <div className="badge-row">
          <span className="badge">@reduxjs/toolkit</span>
          <span className="badge">react-redux</span>
          <span className="badge">redux-persist</span>
        </div>
      </header>

      <main className="app-grid">
        <Counter />
        <UserProfile />
        <TodoList />
        <PersistDemo />
      </main>

      <footer className="app-footer">
        <p>
          💡 <strong>Try this:</strong> Interact with the components above, then
          refresh the page. All state is preserved!
        </p>
        <p className="tech-note">
          State is stored in <code>localStorage</code> under the key{' '}
          <code>persist:root</code>
        </p>
      </footer>
    </div>
  )
}

export default App
